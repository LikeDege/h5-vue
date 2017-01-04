<template>
  <div>
    <spinner :show='loading'></spinner>
    <router-view v-if='!loading'
                 :user-info="userInfo"
                 :journey="journey"
                 @cache-journey="cacheJourney($event)"
                 @save-journey="saveJourney()"></router-view>
    <div style="height: 1.39rem;"></div>
  </div>
</template>
<script>
import spinner from '../../../components/common/spinner';
import post from '../../../common/ajax';
import wxLogin from '../../../utils/wxLogin';

export default {
  data() {
    let strJourney = window.sessionStorage ? window.sessionStorage.getItem('journey') : '';
    let journey = strJourney ? JSON.parse(strJourney) : {id: 0, name: '', type: 3, cover: {url: ''}, summary: '', prices: [{name:'', price: '', unit: '天/车', intro: ''},{name:'', price: '', unit: '天/车'}], includeCharges: [], extraCharges: [{name: '', intro: ''}], unsubscribePolicy: {name: '中等', value: 2}, tips: '', journeyDayItems: [{dayNo: 1, journeyItem: {citys:[], itemContents: [{photo: {url: ''}, intro: ''}]}}]};
    return {
      userInfo: {},
      journey: journey,
      loading: true,
    }
  },
  computed: {
  },
  components: {
    spinner,
  },
  created() {
    this.getUserFullInfo();
  },
  methods: {
    async getUserFullInfo() {
      let result = await post('/user/getUserFullInfo');
      if(result && result.returnCode == 0) {
        this.userInfo = result.data;
        this.loading = false;
      } else {
        wxLogin();
      }
    },
    cacheJourney(journey) {
      this.journey = {...this.journey, ...journey};
      window.sessionStorage && window.sessionStorage.setItem('journey', JSON.stringify(this.journey));
      console.log(this.journey)
    },
    async saveJourney() {
      let journey = {...this.journey}, prices = [];
      journey.prices.forEach((item)=>{
        if (item.name || item.intro || item.price) {
          let temp = [];
          item.name && (temp.push(item.name));
          item.intro && (temp.push(item.intro));
          prices.push({name: temp.join(':'), price: item.price, unit: item.unit});
        }
      });
      journey.prices = prices;
      journey.includeCharges = journey.includeCharges.map((item)=>{
        return {name: item, intro: ''};
      });
      journey.extraCharges = journey.extraCharges.filter((item)=>{
        return item.name || item.intro;
      });
      journey.unsubscribePolicy = journey.unsubscribePolicy.value;

      journey.journeyDayItems[0].journeyItem.itemContents = journey.journeyDayItems[0].journeyItem.itemContents.filter((item)=>{
        return item.photo.url || item.intro;
      });

      let result = await post('/journey/v2/saveJourney', journey);
      if(result && result.returnCode == 0) {
        window.sessionStorage && window.sessionStorage.removeItem('journey');
        this.$router.push({ name: 'succ'});
      }
    }
  },
};
</script>
<style lang="scss">
  @import "~assets/css/iconfont.css";
  body {
    background-color: #f5f5f5;
  }

  header {
    margin: 0.64rem 0;
    font-weight: bold;
    text-align: center;
  }

  [data-dpr = '1'] header,
  [data-dpr = '1'] .btn-wrapper a {
      font-size: 18px;
  }

  [data-dpr = '2'] header,
  [data-dpr = '2'] .btn-wrapper a {
      font-size: 36px;
  }

  [data-dpr = '3'] header,
  [data-dpr = '3'] .btn-wrapper a {
      font-size: 54px;
  }

  [data-dpr = '1'] input,
  [data-dpr = '1'] textarea,
  [data-dpr = '1'] .font-16 {
      font-size: 16px;
  }

  [data-dpr = '2'] input,
  [data-dpr = '2'] textarea,
  [data-dpr = '2'] .font-16 {
      font-size: 32px;
  }

  [data-dpr = '3'] input,
  [data-dpr = '3'] textarea,
  [data-dpr = '3'] .font-16 {
      font-size: 48px;
  }

  [data-dpr = '1'] h3 {
    font-size: 16px;
  }

  [data-dpr = '2'] h3 {
    font-size: 32px;
  }

  [data-dpr = '3'] h3 {
    font-size: 48px;
  }

  [data-dpr = '1'] footer a {
    font-size: 19px;
  }

  [data-dpr = '2'] footer a {
    font-size: 38px;
  }

  [data-dpr = '3'] footer a {
    font-size: 57px;
  }

  section {
    margin: 0.26rem 0;

    h3 {
      margin: 0.53rem 0.32rem 0.26rem;
      font-weight: normal;
    }

    p {
      margin: 0.26rem 0.32rem;
      line-height: 1.5;
      color: #999;
    }
  }

  footer {
    display: block;
    position: fixed;
    bottom: -1px;
    width: 100%;
    height: 1.39rem;
    line-height: 1.39rem;
    z-index: 100;

    a {
      display: inline-block;
      width: 100%;
      text-align: center;
      color: #fff;
      background-color: #ff5f6a;

      &.last {
        width: 33.33%;
        color: #ff5f6a;
        background-color: #fff;
      }

      &.next {
        width: 66.67%;
        color: #fff;
        background-color: #ff5f6a;
      }
    }
  }
</style>
