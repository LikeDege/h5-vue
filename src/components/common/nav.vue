<template>
	<nav>
		<a v-link="{name: 'index'}" class="brand">
      <img src="http://pic.8pig.com/img/h5/new/common/logo.png" alt="8pig-logo">
    </a>
		<ul class="navbar">
			<li><a v-link="{name: 'index'}">首页</a></li>
      <li><a href="http://test.h5.8pig.com/destList.html">目的地</a></li>
      <li><a href="http://test.h5.8pig.com/consult.html">咨询</a></li>
      <li><a href="http://test.h5.8pig.com/aboutUs.html">关于我们</a></li>
		</ul>
	</nav>
</template>

<script>
  export default {
    ready() {

    },
    methods: {
    },
  };
</script>

<style lang="scss" scoped>
  nav {
    position: fixed;
    top: 0;
    width: 100%;
    overflow: hidden;
    background-color: #fff;
    padding: 0 10px;
    border-bottom: 1px solid #eaeaea;
    z-index: 1;
  }

  .brand {
    display: inline-block;
    width: 92px;
    height: 49px;
    padding: 14px 0;
    font-size: 0;
  }

  .navbar {
    float: right;
    display: inline-block;

    li {
      float: left;
    }

    a {
      display: block;
      font-size: 14px;
      padding: 15px 5px;
      color: #666;
    }
  }

</style>
