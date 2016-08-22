<template>
  <div :class="['spinner-wrap',{ show: show }]">
    <svg class="spinner"  width="44px" height="44px" viewBox="0 0 44 44">
      <circle class="path" fill="none" stroke-width="4" stroke-linecap="round" cx="22" cy="22" r="20"></circle>
    </svg>
  <div>
</template>

<script>
export default {
  props: ['show']
}
</script>

<style lang="scss" scoped>
$offset : 126;
$duration : 1.4s;

.spinner-wrap {
  text-align: center;
  display:none;
  opacity: 0;
  transition: opacity .15s ease;

  &.show {
    display:block;
    opacity: 1;
    animation-play-state: running;
  }
}

.spinner {
  vertical-align: middle;
  animation: rotator $duration linear infinite;
  animation-play-state: paused;

  .path {
    stroke: #ff6600;
    stroke-dasharray: $offset;
    stroke-dashoffset: 0;
    transform-origin: center;
    animation: dash 1.4s ease-in-out infinite;
  }
}

@keyframes rotator {
  0% {
    transform: scale(0.5) rotate(0deg);
  }
  100% {
    transform: scale(0.5) rotate(270deg);
  }
}

@keyframes dash {
  0% {
    stroke-dashoffset: $offset
  }
  50% {
    stroke-dashoffset: ($offset/2);
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: $offset;
    transform: rotate(450deg);
  }
}
</style>
