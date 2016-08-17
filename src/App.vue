<template>
  <div id="app">
    <c-nav></c-nav>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import cNav from './components/common/nav';

export default {
  components: {
    cNav
  },
};
</script>

<style lang="scss">

  * {
    box-sizing: border-box;
  }

  body {
      -webkit-tap-highlight-color:rgba(0,0,0,0);
      font: 14px 'Microsoft YaHei', 微软雅黑, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;
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
    background: #f2f2f2;
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
    color: #CCC;
    text-decoration: none;
  }

  img {
    max-width: 100%;
  }

  .main {
    overflow: hidden;
    min-height: 100%;
    margin-top:50px;
  }

  @font-face {
    font-family: "iconfont";
    src: url('./assets/font/iconfont.woff') format('woff'), /* chrome、firefox */
       url('./assets/font/iconfont.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
       url('./assets/font/iconfont.svg#iconfont') format('svg'); /* iOS 4.1- */
  }

  .icon {
    font-family: "iconfont";
    font-style: inherit;
    font-size: 32px;
    line-height: 36px;
  }
</style>
