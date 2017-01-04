<template>
 <div>
    <spinner :show='loading'></spinner>
    <template v-if='!loading'>
      <search-box></search-box>
      <swiper :items='homePage.homeBanners'></swiper>
      <journey-type-bar></journey-type-bar>
      <div>
          <h3 class="title">热门目的地</h3>
              <a class="more" href="http://test.h5.8pig.com/destList.html">更多</a>
          <hot-dest-grid :dests='homePage.hotDestinations'></hot-dest-grid>
      </div>
      <div>
          <h3 class="title ">推荐达人</h3>
          <guide-list :guides='homePage.guideListInfos'></guide-list>
      </div>
      <div>
          <h3 class="title">帮助信息</h3>
          <help></help>
      </div>
    </template>
  </div>
</template>

<script>
  import spinner from '../components/common/spinner';
  import searchBox from '../components/common/searchBox';
  import swiper from '../components/common/swiper';
  import journeyTypeBar from '../components/journey/typeBar';
  import hotDestGrid from '../components/destination/hotGrid';
  import guideList from '../components/guide/list';
  import help from '../components/common/help';
  import { getHomePage } from '../services';
  export default {
    data() {
      return {
        homePage: {homeBanners:[],hotDestinations:[],guideListInfos:[]},
        loading: true,
      };
    },
    components: {
      spinner,
      searchBox,
      swiper,
      journeyTypeBar,
      hotDestGrid,
      guideList,
      help,
    },
    created () {
      this.fetchData();
    },
    methods: {
      fetchData () {
        this.loading = true;
        getHomePage(this).then(response => {
          this.loading = false;
          this.homePage = response;
        }, err => {
          this.loading = false;
          console.log(err);
        });
      }
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
