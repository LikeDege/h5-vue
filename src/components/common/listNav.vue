<template>
  <div class="aside-nav">
    <ul @click="scrollTo($event)">
        <li><a>热门</a></li>
        <li><a>A</a></li>
        <li><a>B</a></li>
        <li><a>C</a></li>
        <li><a>D</a></li>
        <li><a>E</a></li>
        <li><a>F</a></li>
        <li><a>G</a></li>
        <li><a>H</a></li>
        <li><a>I</a></li>
        <li><a>J</a></li>
        <li><a>K</a></li>
        <li><a>L</a></li>
        <li><a>M</a></li>
        <li><a>N</a></li>
        <li><a>O</a></li>
        <li><a>P</a></li>
        <li><a>Q</a></li>
        <li><a>R</a></li>
        <li><a>S</a></li>
        <li><a>T</a></li>
        <li><a>U</a></li>
        <li><a>V</a></li>
        <li><a>W</a></li>
        <li><a>X</a></li>
        <li><a>Y</a></li>
        <li><a>Z</a></li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      };
    },
    props: ['nav'],
    methods: {
      scrollTo(e) {
        this.nav = e.target.innerHTML;
      }
    },
  };
</script>
<style lang="scss" scoped>
.aside-nav {
    position: fixed;
    top: 100px;
    right: 0;
    z-index: 100;
    width: 35px;
    text-align: center;
    transition-duration: 300ms;

    &.slide-up {
      transform: translate3d(0,-80px,0);
    }

    a {
      display: block;
      width: 35px;
      height: 15px;
      font-size: 11px;
      text-align: center;
      color:#666;

      &.active{
        color:#ff5f69;
      }
  }
}
</style>
