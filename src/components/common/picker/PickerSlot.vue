<template>
  <div class="picker-slot"
       :class="classNames"
       :style="flexStyle">
    <div class="picker-slot-wrapper"
         v-if="!divider"
         ref="wrapper"
         :class="{ dragging: dragging }"
         :style="{ height: contentHeight + 'px' }">
      <div class="picker-item"
            v-for="(itemValue, index) in mutatingValues"
            :class="[{ 'picker-selected': itemValue === currentValue}, { 'picker-top-gradient': index === topGradientIndex}, { 'picker-bottom-gradient': index === bottomGradientIndex} ]">
        {{ typeof itemValue === 'object' && itemValue[valueKey] ? itemValue[valueKey] : itemValue }}
      </div>
    </div>
    <div v-if="divider">{{ content }}</div>
  </div>
</template>
<script>
  import draggable from './draggable';
  import translateUtil from './translate';
  import { once } from '../../../libs/event';
  import { addClass, removeClass } from '../../../libs/class';
  import '../../../libs/raf';
  var rotateElement = function(element, angle) {
    if (!element) return;
    var transformProperty = translateUtil.transformProperty;
    element.style[transformProperty] = element.style[transformProperty].replace(/rotateX\(.+?deg\)/gi, '') + ` rotateX(${angle}deg)`;
  };
  const ITEM_HEIGHT = (82 /75) * window.rem;
  const VISIBLE_ITEMS_ANGLE_MAP = {
    3: -45,
    5: -20,
    7: -15
  };
  export default {
    name: 'picker-slot',
    props: {
      values: {
        type: Array,
        default() {
          return [];
        }
      },
      value: {},
      visibleItemCount: {
        type: Number,
        default: 5
      },
      valueKey: String,
      rotateEffect: {
        type: Boolean,
        default: false
      },
      divider: {
        type: Boolean,
        default: false
      },
      textAlign: {
        type: String,
        default: 'center'
      },
      flex: {},
      className: {},
      content: {}
    },
    data() {
      return {
        currentValue: this.value,
        mutatingValues: this.values,
        dragging: false,
        animationFrameId: null
      };
    },
    computed: {
      flexStyle() {
        return {
          'flex': this.flex,
          '-webkit-box-flex': this.flex,
          '-moz-box-flex': this.flex,
          '-ms-flex': this.flex
        };
      },
      topGradientIndex() {
        return this.valueIndex - Math.floor(this.visibleItemCount / 2);
      },
      bottomGradientIndex() {
        return this.valueIndex + Math.floor(this.visibleItemCount / 2);
      },
      classNames() {
        const PREFIX = 'picker-slot-';
        let resultArray = [];
        if (this.rotateEffect) {
          resultArray.push(PREFIX + 'absolute');
        }
        let textAlign = this.textAlign || 'center';
        resultArray.push(PREFIX + textAlign);
        if (this.divider) {
          resultArray.push(PREFIX + 'divider');
        }
        if (this.className) {
          resultArray.push(this.className);
        }
        return resultArray.join(' ');
      },
      contentHeight() {
        return ITEM_HEIGHT * this.visibleItemCount;
      },
      valueIndex() {
        return this.mutatingValues.indexOf(this.currentValue);
      },
      dragRange() {
        var values = this.mutatingValues;
        var visibleItemCount = this.visibleItemCount;
        return [ -ITEM_HEIGHT * (values.length - Math.ceil(visibleItemCount / 2)), ITEM_HEIGHT * Math.floor(visibleItemCount / 2) ];
      }
    },
    methods: {
      value2Translate(value) {
        var values = this.mutatingValues;
        var valueIndex = values.indexOf(value);
        var offset = Math.floor(this.visibleItemCount / 2);
        if (valueIndex !== -1) {
          return (valueIndex - offset) * -ITEM_HEIGHT;
        }
      },
      translate2Value(translate) {
        translate = Math.round(translate / ITEM_HEIGHT) * ITEM_HEIGHT;
        var index = -(translate - Math.floor(this.visibleItemCount / 2) * ITEM_HEIGHT) / ITEM_HEIGHT;
        return this.mutatingValues[index];
      },
      updateRotate: function(currentTranslate, pickerItems) {
        if (this.divider) return;
        var dragRange = this.dragRange;
        var wrapper = this.$refs.wrapper;
        if (!pickerItems) {
          pickerItems = wrapper.querySelectorAll('.picker-item');
        }
        if (currentTranslate === undefined) {
          currentTranslate = translateUtil.getElementTranslate(wrapper).top;
        }
        var itemsFit = Math.ceil(this.visibleItemCount / 2);
        var angleUnit = VISIBLE_ITEMS_ANGLE_MAP[this.visibleItemCount] || -20;
        [].forEach.call(pickerItems, (item, index) => {
          var itemOffsetTop = index * ITEM_HEIGHT;
          var translateOffset = dragRange[1] - currentTranslate;
          var itemOffset = itemOffsetTop - translateOffset;
          var percentage = itemOffset / ITEM_HEIGHT;
          var angle = angleUnit * percentage;
          if (angle > 180) angle = 180;
          if (angle < -180) angle = -180;
          rotateElement(item, angle);
          if (Math.abs(percentage) > itemsFit) {
            addClass(item, 'picker-item-far');
          } else {
            removeClass(item, 'picker-item-far');
          }
        });
      },
      planUpdateRotate: function() {
        var el = this.$refs.wrapper;
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = requestAnimationFrame(() => {
          this.updateRotate();
        });
        once(el, translateUtil.transitionEndProperty, () => {
          this.animationFrameId = null;
          cancelAnimationFrame(this.animationFrameId);
        });
      },
      initEvents() {
        var el = this.$refs.wrapper;
        var dragState = {};
        var velocityTranslate, prevTranslate, pickerItems;
        draggable(el, {
          start: (event) => {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
            dragState = {
              range: this.dragRange,
              start: new Date(),
              startLeft: event.pageX,
              startTop: event.pageY,
              startTranslateTop: translateUtil.getElementTranslate(el).top
            };
            pickerItems = el.querySelectorAll('.picker-item');
          },
          drag: (event) => {
            this.dragging = true;
            dragState.left = event.pageX;
            dragState.top = event.pageY;
            var deltaY = dragState.top - dragState.startTop;
            var translate = dragState.startTranslateTop + deltaY;
            translateUtil.translateElement(el, null, translate);
            velocityTranslate = translate - prevTranslate || translate;
            prevTranslate = translate;
            if (this.rotateEffect) {
              this.updateRotate(prevTranslate, pickerItems);
            }
          },
          end: () => {
            this.dragging = false;
            var momentumRatio = 7;
            var currentTranslate = translateUtil.getElementTranslate(el).top;
            var duration = new Date() - dragState.start;
            var momentumTranslate;
            if (duration < 300) {
              momentumTranslate = currentTranslate + velocityTranslate * momentumRatio;
            }
            var dragRange = dragState.range;
            this.$nextTick(() => {
              var translate;
              if (momentumTranslate) {
                translate = Math.round(momentumTranslate / ITEM_HEIGHT) * ITEM_HEIGHT;
              } else {
                translate = Math.round(currentTranslate / ITEM_HEIGHT) * ITEM_HEIGHT;
              }
              translate = Math.max(Math.min(translate, dragRange[1]), dragRange[0]);
              translateUtil.translateElement(el, null, translate);
              this.currentValue = this.translate2Value(translate);
              if (this.rotateEffect) {
                this.planUpdateRotate();
              }
            });
            dragState = {};
          }
        });
      },
      doOnValueChange() {
        var value = this.currentValue;
        var wrapper = this.$refs.wrapper;
        translateUtil.translateElement(wrapper, null, this.value2Translate(value));
      },
      doOnValuesChange() {
        var el = this.$el;
        var items = el.querySelectorAll('.picker-item');
        [].forEach.call(items, (item, index) => {
          translateUtil.translateElement(item, null, ITEM_HEIGHT * index);
        });
        if (this.rotateEffect) {
          this.planUpdateRotate();
        }
      }
    },
    mounted() {
      this.ready = true;
      this.$emit('input', this.currentValue);
      if (!this.divider) {
        this.initEvents();
        this.doOnValueChange();
      }
      if (this.rotateEffect) {
        this.doOnValuesChange();
      }
    },
    watch: {
      values(val) {
        this.mutatingValues = val;
      },
      mutatingValues(val) {
        if (this.valueIndex === -1) {
          this.currentValue = (val || [])[0];
        }
        if (this.rotateEffect) {
          this.$nextTick(() => {
            this.doOnValuesChange();
          });
        }
      },
      currentValue(val) {
        this.doOnValueChange();
        if (this.rotateEffect) {
          this.planUpdateRotate();
        }
        this.$emit('input', val);
      }
    }
  };
</script>
<style lang="scss">
  @import "~sass/base.scss";
  @import "~sass/mixin.scss";

  [data-dpr = '1'] .picker-slot {
      font-size: 21px;
  }

  [data-dpr = '2'] .picker-slot {
      font-size: 42px;
  }

  [data-dpr = '3'] .picker-slot {
      font-size: 63px;
  }

  [data-dpr = '1'] .picker-item.picker-selected {
      font-size: 22px;
  }

  [data-dpr = '2'] .picker-item.picker-selected {
      font-size: 44px;
  }

  [data-dpr = '3'] .picker-item.picker-selected {
      font-size: 66px;
  }

  .picker-slot {
    position: relative;
    overflow: hidden;
    max-height: 100%;
  }
  .picker-slot.picker-slot-left {
    text-align: left;
  }
  .picker-slot.picker-slot-center {
    text-align: center;
  }
  .picker-slot.picker-slot-right {
    text-align: right;
  }
  .picker-slot.picker-slot-divider {
    color: #000;
    display: flex;
    align-items: center
  }
  .picker-slot-wrapper {
    transition-duration: 0.3s;
    transition-timing-function: ease-out;
    backface-visibility: hidden;
  }
  .picker-slot-wrapper.dragging,
  .picker-slot-wrapper.dragging .picker-item {
    transition-duration: 0s;
  }
  .picker-item {
    height: px2rem(82);
    line-height: px2rem(82);
    padding: 0 10px;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #999;
    left: 0;
    top: 0;
    width: 100%;
    box-sizing: border-box;
    transition-duration: .3s;
    backface-visibility: hidden;

    &.picker-top-gradient {
      background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(214, 214, 214, 1)), to(rgba(153, 153, 153, 1)));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    &.picker-bottom-gradient {
      background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(153, 153, 153, 1)), to(rgba(214, 214, 214, 1)));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .picker-slot-absolute .picker-item {
    position: absolute;
  }
  .picker-item.picker-item-far {
    pointer-events: none
  }
  .picker-item.picker-selected {
    color: #000;
    transform: translate3d(0, 0, 0) rotateX(0);
  }
  .picker-3d .picker-items {
    overflow: hidden;
    perspective: 700px;
  }
  .picker-3d .picker-item,
  .picker-3d .picker-slot,
  .picker-3d .picker-slot-wrapper {
    transform-style: preserve-3d
  }
  .picker-3d .picker-slot {
    overflow: visible
  }
  .picker-3d .picker-item {
    transform-origin: center center;
    backface-visibility: hidden;
    transition-timing-function: ease-out
  }
</style>
