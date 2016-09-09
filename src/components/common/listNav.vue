<template>
  <div class="aside-nav" :style="style">
    <ul @click="updateNav($event)">
        <li><a :class="{'active': nav=='HOT'}" data-value="HOT">热门</a></li>
        <li><a :class="{'active': nav=='A'}" data-value="A">A</a></li>
        <li><a :class="{'active': nav=='B'}" data-value="B">B</a></li>
        <li><a :class="{'active': nav=='C'}" data-value="C">C</a></li>
        <li><a :class="{'active': nav=='D'}" data-value="D">D</a></li>
        <li><a :class="{'active': nav=='E'}" data-value="E">E</a></li>
        <li><a :class="{'active': nav=='F'}" data-value="F">F</a></li>
        <li><a :class="{'active': nav=='G'}" data-value="G">G</a></li>
        <li><a :class="{'active': nav=='H'}" data-value="H">H</a></li>
        <li><a :class="{'active': nav=='I'}" data-value="I">I</a></li>
        <li><a :class="{'active': nav=='J'}" data-value="J">J</a></li>
        <li><a :class="{'active': nav=='K'}" data-value="K">K</a></li>
        <li><a :class="{'active': nav=='L'}" data-value="L">L</a></li>
        <li><a :class="{'active': nav=='M'}" data-value="M">M</a></li>
        <li><a :class="{'active': nav=='N'}" data-value="N">N</a></li>
        <li><a :class="{'active': nav=='O'}" data-value="O">O</a></li>
        <li><a :class="{'active': nav=='P'}" data-value="P">P</a></li>
        <li><a :class="{'active': nav=='Q'}" data-value="Q">Q</a></li>
        <li><a :class="{'active': nav=='R'}" data-value="R">R</a></li>
        <li><a :class="{'active': nav=='S'}" data-value="S">S</a></li>
        <li><a :class="{'active': nav=='T'}" data-value="T">T</a></li>
        <li><a :class="{'active': nav=='U'}" data-value="U">U</a></li>
        <li><a :class="{'active': nav=='V'}" data-value="V">V</a></li>
        <li><a :class="{'active': nav=='W'}" data-value="W">W</a></li>
        <li><a :class="{'active': nav=='X'}" data-value="X">X</a></li>
        <li><a :class="{'active': nav=='Y'}" data-value="Y">Y</a></li>
        <li><a :class="{'active': nav=='Z'}" data-value="Z">Z</a></li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: ['nav','style'],
    methods: {
      updateNav(e) {
          this.$emit('update-nav', e.target.getAttribute("data-value"));
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
    transition-duration: 200ms;

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
