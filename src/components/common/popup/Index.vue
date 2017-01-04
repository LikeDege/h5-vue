<template>
  <transition :name="'popup-'+direction">
    <div class="popup popup-dialog"
         v-show="visible"
         :style="{height:height, overflow: height == '100%' ? 'auto' : 'visible'}">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import Popup from './popup'

export default {
  props: {
    show: Boolean,
    height: {
      type: String,
      default: 'auto'
    },
    hideOnBlur: {
      type: Boolean,
      default: true
    },
    direction: {
      type: String,
      default: 'bottom',
    },
  },
  data () {
    return {
      hasFirstShow: false,
    }
  },
  computed: {
    visible() {
      return this.show
    }
  },
  mounted () {
    const _this = this
    this.popup = new Popup({
      container: _this.$el,
      innerHTML: '',
      hideOnBlur: _this.hideOnBlur,
      onOpen (dialog) {
        _this.$emit('update-show', true);
      },
      onClose (dialog) {
        _this.$emit('update-show', false);
      }
    })
  },
  watch: {
    visible (val) {
      if(val) {
        document.querySelector('.popup-mask') && document.querySelector('.popup-mask').classList.add('popup-show');
      } else {
        document.querySelector('.popup-mask') && document.querySelector('.popup-mask').classList.remove('popup-show');
      }
    },
  },
  beforeDestroy () {
    this.popup.destroy()
  }
}
</script>

<style lang="scss">
  .popup-dialog {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 101;
    transition-property: transform;
    transition-duration: 300ms;
  }
  .popup-mask {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(147, 147, 147, 0.4);
    opacity: 0;
    tap-highlight-color: rgba(0,0,0,0);
    z-index: -1;
  }
  .popup-mask.popup-show {
    opacity: 1;
    z-index: 100;
    transition: opacity 0.3s;
  }
  .popup-bottom-enter,.popup-bottom-leave-active {
    transform: translate3d(0, 100%, 0);
  }
  .popup-right-enter,.popup-right-leave-active {
    transform: translate3d(100%, 0, 0);
  }
</style>
