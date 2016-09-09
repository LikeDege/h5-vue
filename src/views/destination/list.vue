<template>
  <div>
    <spinner :show="loading"></spinner>
    <template v-if="!loading">
      <search-box ref="searchBox"
                  :autocomplete="true"
                  @update-keyword="updateKeyword($event)"></search-box>
      <hot-dest-grid v-show="!keyword"
                     :hot-dests="destinationList.searchHotDestinations" 
                     :journey-type="$route.query.journeyType"></hot-dest-grid>
      <dest-list ref="destList"
                 :dests="destinationList.destinationBases"
                 :journey-type="$route.query.journeyType"
                 :keyword="keyword"
                 :anchor-offset="topNavHeight"
                 @update-anchor="updateNav($event)"></dest-list>
      <list-nav v-show="!keyword"
                ref="listNav"
                :nav="nav"
                :style="listNavStyle"
                @update-nav="scrollToAnchor($event)"></list-nav>
    </template>
  </div>
</template>

<script>
  import spinner from '../../components/common/spinner';
  import searchBox from '../../components/common/searchBox';
  import hotDestGrid from '../../components/destination/hotGrid1';
  import destList from '../../components/destination/list';
  import listNav from '../../components/common/listNav';
  import { getDestinationList } from '../../services/destination';
  export default {
    data() {
      return {
        keyword: '',
        destinationList: {},
        nav: 'HOT',
        topNavHeight: 50,
        anchors: [],
        loading: true,
        listNavStyle: {},
      };
    },
    components: {
      spinner,
      searchBox,
      hotDestGrid,
      destList,
      listNav,
    },
    created() {
      this.query();
    },
    methods: {
      query() {
        this.loading=true;
        return getDestinationList(this, this.$route.query.journeyType).then(response => {
            this.loading=false;
            this.destinationList = response;
        }, err => {
            this.loading=false;
            console.log(err);
        });
      },
      updateListNavTop() {
      },
      updateKeyword(keyword) {
        this.keyword = keyword;
      },
      updateNav(nav) {
        this.nav = nav;
      },
      scrollToAnchor(anchor) {
        let target = document.querySelector('[data-anchor="' + anchor + '"]');
        if(target) {
          let newScrollTop = (document.documentElement.scrollTop || document.body.scrollTop) - this.topNavHeight + target.getBoundingClientRect().top;
          window.scrollTo(0, newScrollTop);
        }
      },
      listenAnchor() {
        // 所有锚点
        this.anchors.length == 0 && (this.anchors = document.querySelectorAll("[data-anchor]"));
        for(let i=0;i<this.anchors.length;i++){
          // 减掉锚点偏移量
          let rectTop = this.anchors[i].getBoundingClientRect().top - this.topNavHeight,
              rectBottom = this.anchors[i].getBoundingClientRect().bottom - this.topNavHeight,
              nextRectTop = this.anchors[i + 1].getBoundingClientRect().top - this.topNavHeight;
          if (rectTop >= 0 || rectBottom > 0 || nextRectTop > 0) { //两个锚点之间处于可见区域
              this.nav = this.anchors[i].getAttribute("data-anchor");
              break;
          }
        }

        // 更新右侧导航
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if(scrollTop == 0) {
          this.listNavStyle = {transform: 'none'};
        } else {
          scrollTop > this.topNavHeight && (scrollTop = this.topNavHeight);
          this.listNavStyle = {transform: 'translate(0px, '+ (-scrollTop) +'px) translateZ(0px)'};
        }
      },
    },
    mounted() {
      // 菜单导航条高度
      this.topNavHeight = document.querySelector('.top-nav').offsetHeight;
      window.addEventListener('scroll', this.listenAnchor);
    },
    beforeDestroy() {
      window.removeEventListener('scroll',this.listenAnchor);
    },
  };
</script>

<style lang="scss" scoped>
  
</style>
