<template>
    <router-view></router-view>
</template>

<script>
export default {
  computed: {
    hideNav() {
      return this.$route.matched.some(m => m.meta.hideNav);
    }
  }
};
</script>

<style lang="scss">

  * {
    box-sizing: border-box;
  }

  body {
      text-size-adjust: none;
      -webkit-tap-highlight-color:rgba(0,0,0,0);
      font-family: Helvetica,sans-serif;
  }

  [data-dpr = '1'] body {
      font-size: 14px;
  }

  [data-dpr = '2'] body {
      font-size: 28px;
  }

  [data-dpr = '3'] body {
      font-size: 42px;
  }

  input,textarea {
      -webkit-appearance:none;
  }

  html, body, ul, h1, h2, h3 {
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
  }

  ul {
    overflow: hidden;
  }

  a:link,
  a:visited {
    text-decoration: none;
  }

  #app {
    height: 100%;
  }

  li {
    list-style: none;
  }

  a {
    color: #666;
    text-decoration: none;
  }

  img {
    max-width: 100%;
  }

  .main {
    overflow: hidden;
    min-height: 100%;
  }


</style>
