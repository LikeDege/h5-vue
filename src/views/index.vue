<template>
    <search-box></search-box>
    <swiper :items='homePage.homeBanners' ></swiper>
    <journey-type-list></journey-type-list>
    <div>
        <div class="title">
            <h3>热门目的地</h3>
            <a class="more" href="http://test.h5.8pig.com/destList.html">更多</a>
        </div>
        <hot-dest-list :dests='homePage.hotDestinations'></hot-dest-list>
    </div>
    <div>
        <div class="title"><h3>推荐达人</h3></div>
        <guide-list :guides='homePage.guideListInfos'></guide-list>
    </div>
    <div>
      <div class="title"><h3>帮助信息</h3></div>
      <c-footer></c-footer>
    </div>
</template>

<script>
  import searchBox from '../components/common/searchBox';
  import swiper from '../components/common/swiper';
  import journeyTypeList from '../components/journey/typeList';
  import hotDestList from '../components/destination/hotList';
  import guideList from '../components/guide/list';
  import cFooter from '../components/common/footer';
  import { getHomePage } from '../service';
  export default {
    data() {
      return {homePage: {}};
    },
    components: {
      searchBox,
      swiper,
      journeyTypeList,
      hotDestList,
      guideList,
      cFooter,
    },
    route: {
      data() {
        // 获取首页数据
        getHomePage(this.$http).then(response => {this.homePage = response}, err => console.log(err));
      },
    },
  };

</script>

<style lang="scss" scoped>
  .title {
      position: relative;
      width: 100%;
      height: 52px;
      line-height: 52px;
      margin-top: 12px;
      padding: 0 10px;
      background-color: #fff;

      h3 {
        float: left;
        font-size: 18px;
        line-height: 52px;
        font-weight: normal;
        color: #333;
        text-indent: 14px;

        &:before {
          content: '\20';
          position: absolute;
          top:18px;
          left: 10px;
          width: 3px;
          height: 15px;
          background-color: #ff5f69;
          overflow: hidden;
        }
      }

      .more {
            position: relative;
            float: right;
            padding-right: 16px;
            color: #999;
            font-size: 14px;

            &:after{
              content: '\20';
              position: absolute;
              right: 0;
              top:20px;
              display: block;
              width: 13px;
              height: 13px;
              background: url("http://pic.8pig.com/img/h5/new/common/sprite.png") no-repeat;
              background-position: -78px -103px;
              background-size:128px 116px;
          }
      }
  }
</style>
