<template>
  <div class="picker" 
       :class="{ 'picker-3d': rotateEffect }">
    <div class="picker-toolbar" v-if="showToolbar"><slot></slot></div>
    <div class="picker-items">
      <picker-slot v-for="slot in slots"
                   :valueKey="valueKey"
                   :values="slot.values || []"
                   :text-align="slot.textAlign || 'center'"
                   :visible-item-count="visibleItemCount"
                   :class-name="slot.className"
                   :flex="slot.flex"
                   v-model="values[slot.valueIndex]"
                   :rotate-effect="rotateEffect"
                   :divider="slot.divider"
                   :content="slot.content"
                   @input="slotValueChange"></picker-slot>
      <div class="picker-center-highlight"
           :style="{marginTop: highLightMarginTop+'px'}"></div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'mt-picker',
    componentName: 'picker',
    props: {
      slots: {
        type: Array
      },
      showToolbar: {
        type: Boolean,
        default: false
      },
      visibleItemCount: {
        type: Number,
        default: 5
      },
      valueKey: String,
      rotateEffect: {
        type: Boolean,
        default: false
      }
    },
    created() {
      var slots = this.slots || [];
      this.values = [];
      var values = this.values;
      var valueIndexCount = 0;
      slots.forEach(function(slot) {
        if (!slot.divider) {
          slot.valueIndex = valueIndexCount++;
          values[slot.valueIndex] = (slot.values || [])[slot.defaultIndex || 0];
        }
      });
    },
    methods: {
      slotValueChange() {
        this.$emit('change', this, this.values);
      },
      getSlot(slotIndex) {
        var slots = this.slots || [];
        var count = 0;
        var target;
        var children = this.$children.filter(child => child.$options.name === 'picker-slot');
        slots.forEach(function(slot, index) {
          if (!slot.divider) {
            if (slotIndex === count) {
              target = children[index];
            }
            count++;
          }
        });
        return target;
      },
      getSlotValue(index) {
        var slot = this.getSlot(index);
        if (slot) {
          return slot.value;
        }
        return null;
      },
      setSlotValue(index, value) {
        var slot = this.getSlot(index);
        if (slot) {
          slot.currentValue = value;
        }
      },
      getSlotValues(index) {
        var slot = this.getSlot(index);
        if (slot) {
          return slot.mutatingValues;
        }
        return null;
      },
      setSlotValues(index, values) {
        var slot = this.getSlot(index);
        if (slot) {
          slot.mutatingValues = values;
        }
      },
      getValues() {
        return this.values;
      },
      setValues(values) {
        var slotCount = this.slotCount;
        values = values || [];
        if (slotCount !== values.length) {
          throw new Error('values length is not equal slot count.');
        }
        values.forEach((value, index) => {
          this.setSlotValue(index, value);
        });
      }
    },
    computed: {
      values() {
        var slots = this.slots || [];
        var values = [];
        slots.forEach(function(slot) {
          if (!slot.divider) values.push(slot.value);
        });
        return values;
      },
      slotCount() {
        var slots = this.slots || [];
        var result = 0;
        slots.forEach(function(slot) {
          if (!slot.divider) result++;
        });
        return result;
      },
      highLightMarginTop() {
        var itemHeight = (42 / 75) * window.rem;
        return parseInt(-itemHeight + itemHeight * (this.visibleItemCount % 2 - 1));
      },
    },
    components: {
      PickerSlot: require('./PickerSlot.vue')
    }
  };
</script>
<style lang="scss">
  @import "~sass/base.scss";
  @import "~sass/mixin.scss";
  
  .picker {
    overflow: hidden;
    background-color: #fff;
  }
  .picker-toolbar {
    padding: 0 px2rem(24);
    height: px2rem(84);
    line-height: px2rem(82);
    text-align: right;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    background: #f5f5f5;
    color: $primary;
    @include huge-fs();
  }
  .picker-items {
    display: flex;
    justify-content: center;
    magrin: px2rem(18) 0;
    padding: 0;
    text-align: right;
    font-size: 24px;
    position: relative;
  }
  .picker-center-highlight {
    height: px2rem(84);
    box-sizing: border-box;
    position: absolute;
    left: 0;
    width: 100%;
    top: 50%;
    pointer-events: none
  }
  .picker-center-highlight:before,
  .picker-center-highlight:after {
    content: '';
    position: absolute;
    height: 1px;
    width: 100%;
    background-color: #999;
    display: block;
    z-index: 15;
    transform: scaleY(0.5);
  }
  .picker-center-highlight:before {
    left: 0;
    top: 0;
    bottom: auto;
    right: auto;
  }
  .picker-center-highlight:after {
    left: 0;
    bottom: 0;
    right: auto;
    top: auto;
  }
</style>
