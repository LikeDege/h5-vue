<template>
  <div>
    <header class="journey-title" v-if="$route.query.journeyType">
        <h2>{{$route.query.journeyType | transJourneyType}}</h2>
    </header>
    <city-grid v-if="$route.query.searchBy=='destination'"
               :dest-id="$route.query.destId"  
               :dest-type="$route.query.destType" 
               :dest-name="$route.query.destName" 
               :city-id="conditions.destId"
               @update-city="conditions.destId=$event"></city-grid>
    <journey-type-bar v-if="$route.query.searchBy!='journeyType'" 
                      :journey-type="conditions.filterCondition.journeyTypes[0]"
                      @update-jrnytype="conditions.filterCondition.journeyTypes=[$event]"></journey-type-bar>
    <search-bar v-show="$route.query.searchBy == 'journeyType' || conditions.filterCondition.journeyTypes[0]" 
                :optional-dest="$route.query.destNamesearchBy != 'destination'"
                :dest-name="$route.query.destName"
                :journey-type="conditions.filterCondition.journeyTypes[0]"
                :sort="conditions.filterCondition.sort"
                @update-sort="conditions.filterCondition.sort=$event"
                :traffic-type="conditions.filterCondition.trafficType"
                @update-traffic-type="conditions.filterCondition.trafficType=$event"></search-bar>
    <journey-list :journeys="journeys"></journey-list>
  </div>
</template>

<script>
  import cityGrid from '../../components/destination/cityGrid';
  import journeyTypeBar from '../../components/journey/typeBar1';
  import searchBar from '../../components/journey/searchBar';
  import journeyList from '../../components/journey/list';
  import { getJourneyList } from '../../services/journey';
  import { SERACH_TYPE_DEST, SERACH_TYPE_KEYWORD } from '../../common/constants';
  export default {
    data() {
      // 关键字查询
      let keyword = this.$route.query.keyword;
      let data = {
        journeys: [],
        conditions: {
            type: keyword ? SERACH_TYPE_KEYWORD : SERACH_TYPE_DEST,
            pageNo: 1,
            pageSize: 6,
            destId: undefined,
            keyword: keyword,
            filterCondition: {journeyTypes:[], sort: undefined, trafficType: undefined},
        },
      };
      let journeyType = this.$route.query.journeyType;
      journeyType && (data.conditions.filterCondition.journeyTypes.push(parseInt(journeyType)));
      let destId = this.$route.query.destId;
      destId && (data.conditions.destId = parseInt(destId));
      return data;
    },
    components: {
      cityGrid,
      journeyTypeBar,
      searchBar,
      journeyList,
    },
    created () {
      this.query();
    },
    methods: {
      query() {
        return getJourneyList(this, this.conditions).then(response => {this.journeys = response.data}, err => console.log(err));
      },
    },
    watch: {
      conditions: {
        handler: function (val, oldVal) { this.query(); },
        deep: true
      }
    },
  };
</script>

<style lang="scss" scoped>
  .journey-title {
    position: relative;
    height: 40px;
    background-color: #fff;

    h2 {
      font-size: 16px;
      color: #999;
      line-height: 40px;
      text-align: center;
      font-weight: normal;
      border-bottom: 1px solid #eaeaea;
    }
  }
</style>
