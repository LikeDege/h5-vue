<template>
  <div :class="['spinner',{'show':show}]">
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  </div>
</template>

<script>
export default {
  props: ['show']
}
</script>

<style lang="scss">
.spinner {
  height: 100px;
  line-height: 100px;
  vertical-align: middle;
  text-align: center;
  display: none;

  &.show {
    display: block;
  }

  .bounce1, .bounce2, .bounce3 {
    width: 10px;
    height: 10px;
    border-radius: 100%;
    display: inline-block;
    animation: spinner-bounce 1.4s infinite ease-in-out both;
    background-color: #ff5f69;
  }

  .bounce1 {
    animation-delay: -0.32s;
  }

  .bounce2 {
    animation-delay: -0.16s;
  }
}
@keyframes spinner-bounce {
  0%, 80%, 100% {
    transform: scale(0);
  } 40% {
    transform: scale(1.0);
  }
}
</style>