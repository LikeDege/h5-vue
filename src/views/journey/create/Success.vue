<template>
  <div style="overflow: hidden;">
    <section>
      <div class="img-wrapper">
        <i></i>
      </div>
    </section>
    <header>录入向导服务已完成</header>
    <section>
      <p>8只小猪将在2个工作日内联系您并完成审核，<br/>请保持通讯通畅，通过审核后在平台正式上线，<br/>接触海量客源。</p>
      <p style="margin: 1.125rem 0 0.36rem;color:#666;">——&nbsp;更多玩法录用与修改&nbsp;——</p>
      <p style="margin: 0.36rem 0 2.64rem">如机场接送、单项体验 、长线玩法、一日游等<br/>请在电脑登录www.8pig.com操作。</p>
      <p class="dashed">立即下载8只小猪APP，体验更完善的功能<br/>——与游客沟通行程，接收订单消息，收入提现等。98%的达人向导都下载了哦。</p>
    </section>
    <footer>
      <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.android.pig.travel">下载8只小猪APP</a>
    </footer>
  </div>
</template>
<script>
import cImg from '../../../components/common/image';
export default {
  props: {
    userInfo: Object,
  },
  data() {
    return {
      limitIntroLen: 1400,
      screenW: window.innerWidth,
    };
  },
  computed: {
    introduce() {
      return this.userInfo.selfIntroduction
    }
  },
  components: {
    cImg,
  },
  methods: {

  },
};
</script>
<style lang="scss" scoped>
  header {
    margin: 0.45rem 0;
  }

  .img-wrapper {
    margin: 2.03125rem 0 0.45rem;
    line-height: 4.35rem;

    i {
      display: block;
      width: 2.51rem;
      height: 2.51rem;
      background-image: url("http://pic.8pig.com/img/h5/new/common/success.png");
      background-repeat: no-repeat;
      background-size: 2.51rem 2.51rem;
      margin: auto;
    }
  }

  p {
    text-align: center;

    &.dashed {
      padding: 0.213rem 0;
      border: 0.03125rem dashed #ccc;
    }
  }

</style>