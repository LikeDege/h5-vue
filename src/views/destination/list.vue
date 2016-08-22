<template>
  <div>
    <search-box :keyword.sync="keyword"></search-box>
    <hot-dest-grid :hot-dests="destinationList.searchHotDestinations" :journey-type="$route.query.journeyType" v-show="!keyword"></hot-dest-grid>
    <dest-list :dests="destinationList.destinationBases" :journey-type="$route.query.journeyType" :keyword="keyword" :nav.sync="nav"></dest-list>
    <list-nav :nav.sync="nav" v-show="!keyword"></list-nav>
  </div>
</template>

<script>
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
        nav: '热门',
      };
    },
    components: {
      searchBox,
      hotDestGrid,
      destList,
      listNav,
    },
    route: {
      data(transition) {
          return this.query();
      },
    },
    methods: {
      query() {
        return getDestinationList(this, this.$route.query.journeyType).then(response => {this.destinationList = response}, err => console.log(err));
      },
    },
  };
</script>

<style lang="scss" scoped>

</style>
