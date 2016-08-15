<template>
  <div>
    <header class="journey-title" v-if="$route.query.journeyType">
        <h2>{{$route.query.journeyType | transJourneyType}}</h2>
    </header>
    <template v-if="$route.query.destId">
      <city-list :dest-id="$route.query.destId" :dest-type="$route.query.destType" :dest-name="$route.query.destName" :city-id.sync="conditions.destId"></city-list>
      <journey-type-list :journey-type.sync="conditions.filterCondition.journeyTypes[0]"></journey-type-list>
    </template>
    <condition-bar v-show="!$route.query.destId || conditions.filterCondition.journeyTypes[0]" :journey-type.sync="conditions.filterCondition.journeyTypes[0]" :sort.sync="conditions.filterCondition.sort" :traffic-type.sync="conditions.filterCondition.trafficType" ></condition-bar>
    <journey-list :journeys="journeys"></journey-list>
  </div>
</template>

<script>
  import cityList from '../../components/destination/cityList';
  import journeyTypeList from '../../components/journey/typeList1';
  import conditionBar from '../../components/journey/conditionBar';
  import journeyList from '../../components/journey/list';
  import { getJourneyList } from '../../services/journey';
  export default {
    data() {
      let data =  {
              journeys: [],
              conditions: {
                  type: 1,
                  pageNo: 1,
                  pageSize: 6,
                  destId: undefined,
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
      cityList,
      journeyTypeList,
      conditionBar,
      journeyList,
    },
    route: {
      data(transition) {
          return this.query();
      },
    },
    ready() {
      window.addEventListener("popstate", function() {
        console.log(2);                             
      });
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
