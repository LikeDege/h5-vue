<template>
  <transition name="toast-pop">
    <div class="toast" v-if="visible" :class="customClass">
      <i class="icon" :class="iconClass" v-if="iconClass !== ''"></i>
      <span class="text" :style="{ 'padding-top': iconClass === '' ? '0' : '10px' }">{{ message }}</span>
    </div>
  </transition>
</template>
<script>
  export default {
    props: {
      message: String,
      className: {
        type: String,
        default: ''
      },
      position: {
        type: String,
        default: 'middle'
      },
      iconClass: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        visible: false
      };
    },
    computed: {
      customClass() {
        var classes = [];
        switch (this.position) {
          case 'top':
            classes.push('is-placetop');
            break;
          case 'bottom':
            classes.push('is-placebottom');
            break;
          default:
            classes.push('is-placemiddle');
        }
        classes.push(this.iconClass ? 'large-padding' : 'big-padding');
        classes.push(this.className);
        return classes.join(' ');
      }
    }
  };
</script>
<style lang="scss" scoped>
    @import "~sass/base.scss";
    @import "~sass/mixin.scss";

    .toast {
      position: fixed;
      max-width: 80%;
      border-radius: 5px;
      background: rgba(0, 0, 0, 0.7);
      color: #fff;
      box-sizing: border-box;
      text-align: center;
      z-index: 1000;
      transition: opacity .3s linear;
  
      &.is-placetop {
        top: 50px;
        left: 50%;
        transform: translate(-50%, 0);
      }
      
      &.is-placemiddle {
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      
      &.is-placebottom {
        bottom: 50px;
        left: 50%;
        transform: translate(-50%, 0);
      }

      .icon {
        display: block;
        text-align: center;
        font-size: 56px;
      }
      
      .text {
        display: block;
        text-align: center;
        @include big-fs;
      }
      
    }

    .large-padding {
      padding: px2rem(40);
    }

    .big-padding {
      padding: px2rem(20);
    }

    .toast-pop-enter, .toast-pop-leave-active {
      opacity: 0;
    }
</style>