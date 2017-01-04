<template>
  <div style="overflow: hidden;">
    <header>服务及定价</header>
    <section>
      <h3>参考价格</h3>
      <p>请根据您提供的服务，选择服务类型，并制定参考价格。根据服务类型车型不同，您可以制定多个价格，供游客预订和咨询时作为参考。</p>
      <div class="input-wrapper"
           v-for="(price,index) in prices">
        <ul class="cols-2">
          <li>
            <input readonly placeholder="向导服务类型"
                   @click="selectVehicle(index)"
                   v-model="price.name" />
            <i class="iconfont icon-down-arrow"></i>
          </li><li>
            <i class="iconfont icon-rmb"></i>
            <input type="number" maxlength="30"
                   v-model="price.price"/>
            <span class="unit font-16"
                  v-text="price.unit"></span>
          </li>
        </ul>
        <ul>
          <li>
            <input maxlength="30" placeholder="价格标题，概括车型，服务时长等，如“凯美瑞五座8小时”"
                   v-model="price.intro"/>
          </li>
        </ul>
      </div>
      <div class="btn-wrapper">
        <ul class="cols-2">
          <li><a @click="addPriceItem">+&nbsp;增加</a></li><li><a @click="delPriceItem">删除</a></li>
          </li>
        </ul>
      </div>
    </section>
    <section>
      <h3>费用包含</h3>
      <p>请列出已包含价格，表现出服务收费的清晰合理。</p>
      <div class="badge-wrapper">
        <ul>
          <li v-for="(fee, index) in feeList">
            <input type="checkbox"
                   v-model="includeCharges"
                   :id="index"
                   :value="fee">
            <label :for="index">{{ fee }}</label>
          </li>
        </ul>
      </div>
    </section>
    <section>
      <h3>费用不包含</h3>
      <p>可能会是：超时服务费，向导餐补费，小费，游客或向导景点门票等。根据您的服务项目和当地消费水平自行填写，用于告知游客可能会存在的未收费项目，并在与游客沟通中充分说明行程内可能会产生的费用及合理性。</p>
      <div class="input-wrapper"
           v-for="extraCharge in extraCharges">
        <ul>
          <li>
            <input maxlength="30" 
                   placeholder="费用名称，例如“迪士尼乐园票”"
                   v-model="extraCharge.name"/>
          </li><li>
            <input maxlength="30" 
                   placeholder="费用说明，例如“成人票￥500”"
                   v-model="extraCharge.intro"/>
          </li>
        </ul>
      </div>
      <div class="btn-wrapper">
        <ul>
          <li><a @click="addExceptPrice">+&nbsp;增加</a></li>
        </ul>
      </div>
    </section>
    <footer>
      <a class="last" @click="lastStep">上一步</a><a class="next" @click="nextStep">下一步&nbsp;（2&nbsp;/&nbsp;4）</a>
    </footer>
  </div>
</template>
<script>
import cImg from '../../../components/common/image';
import Popup from '../../../components/common/popup';
let Picker;
export default {
  props: {
    userInfo: Object,
    journey: Object,
  },
  data() {
    return {
      currPopupIndex: 0,
      prices: this.journey.prices,
      extraCharges: this.journey.extraCharges,
      feeList: ['向导指引','中文解说','燃油费','过路费','停车费','拥堵费','进城费','保险费','高速费','小费','超时费','餐费','矿泉水','景点门费'],
      includeCharges: this.journey.includeCharges,
      vehicles: [{name:'徒步向导——/天', unit:'/天'},{name:'带车向导(5座)——天/车', unit:'天/车'},{name:'带车向导(7座)——天/车', unit:'天/车'},{name:'带车向导(9座)——天/车', unit:'天/车'},{name:'其它', unit:'/天'}],
    };
  },
  computed: {
    introduce() {
      return this.userInfo.selfIntroduction;
    }
  },
  components: {
    cImg,
  },
  mounted() {
    let _this = this;
    Picker = Popup.fromComponent({component: 'picker/Index', valueKey: 'name', values: this.vehicles, onConfirm(values) {
      _this.prices[_this.currPopupIndex].name = values[0].name;
      _this.prices[_this.currPopupIndex].unit = values[0].unit;
    }});
  },
  methods: {
    selectVehicle(index) {
      this.currPopupIndex = index;
      if(Picker) {
        Picker.show();
      }
    },
    addPriceItem() {
      this.prices.push({name: '', price: '', unit: '天/车'});
    },
    delPriceItem() {
      this.prices.pop();
    },
    addExceptPrice() {
      this.extraCharges.push({name: '', intro: ''});
    },
    delExceptPrice() {
      this.extraCharges.pop();
    },
    lastStep() {
      this.$router.push({ name: 'intro' });
    },
    nextStep() {
      this.$emit('cache-journey', {includeCharges: this.includeCharges});
      this.$router.push({ name: 'unsubscribe'});
    },
  },
};
</script>
<style lang="scss" scoped>

  .input-wrapper, .btn-wrapper {
    margin-top: 0.26rem;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
    font-size: 0;

    ul {
      margin: 0 0.32rem;
      border-bottom: 1px solid #ccc;
      z-index: 2;

      &:last-child {
        border-bottom: 0;
      }

      &.cols-2 {
        position: relative;

        li {
          display: inline-block;
          width: 50%;
          border-bottom: 0;

          &:nth-child(odd) {
            padding-right: 0.32rem;

            input {
              padding-right: 1em;
            }
          }

          &:nth-child(even) {
            padding-left: 0.32rem;

            input {
              padding: 0 2.5em 0 1em;
            }
          }
        }

        &:before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          width: 1px;
          height: 0.8rem;
          border-right: 1px solid #ccc;
          margin: auto;
          z-index: 2;
        }
      }

      li {
        position: relative;
        height: 1.387rem;
        border-bottom: 1px solid #ccc;

        input {
          width: 100%;
          height: 100%;
          padding: 0.45rem 0;
          border: 0;
          outline: none;
        }

        &:last-child {
          border-bottom: 0;
        }
      }
    }
  }

  .input-wrapper {
    .unit {
      position: absolute;
      right: 0;
      line-height: 1.387rem;
    }
  }

  .btn-wrapper {
    margin: 0.16rem 0;

    ul li {
      width: 100%;
      line-height: 1.387rem;

      a {
        display: block;
        text-align: center;
        color: #ff5f6a;
      }
    }
  }

  .badge-wrapper {
    margin: 0 0.32rem;

    ul {
      margin: -0.1875rem;

      li {
        display: inline-block;
        width: 33.33%;
        padding: 0.1875rem;

        label {
          display: block;
          height: 1.01rem;
          line-height: 0.987rem;
          border-radius: 0.533rem;
          border: 1px solid #ccc;
          text-align: center;
          color: #999;
        }

        input[type=checkbox] {
          display: none;

          &:checked + label {
            border-color: #ff5f6a;
            color: #ff5f6a;
          }
        }
      }
    }
  }

  .iconfont {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    &.icon-down-arrow {
      right: 0.32rem;
      color: #c7c7c7;
    }

    &.icon-rmb {
      left: 0.32rem;
    }
  }

  [data-dpr = '1'] .iconfont {
      font-size: 16px;
  }

  [data-dpr = '2'] .iconfont {
      font-size: 32px;
  }

  [data-dpr = '3'] .iconfont {
      font-size: 48px;
  }
</style>