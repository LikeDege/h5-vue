<template>
  <div style="overflow: hidden;">
    <header>退改及其它</header>
    <section>
      <h3>退改规则</h3>
      <p>请根据实际情况设定退改规则，当已预订服务的游客提出退订或改期时使用来保障您的权利。</p>
      <div class="input-wrapper">
        <ul>
          <li>
            <input readonly 
                   @click="selectUnsubscribePolicy()"
                   v-model="unsubscribePolicy.name" />
            <i class="iconfont icon-down-arrow"></i>
          </li>
        </ul>
      </div>
      <p>所选方案是“中等”<br/>
      行程开始前10天以上退订，退还已付订金的100%<br/>
      行程开始前3-10天退订，退还已付订金的50%<br/>
      行程开始前3天以内退订，已付订金不予退还。</p>
    </section>
    <section>
      <h3>其它说明</h3>
      <p>价格里未能填写但可能会发生的情况提前声明，或填写提示游客当地的注意事项。</p>
      <div class="textarea-wrapper">
        <div style="font-size: 0;">
        <textarea :placeholder="preTips" 
                  @input="checkLength"
                  v-model="tips"></textarea>
        </div>
        <span>还剩{{spaceIntroLen}}字</span>
      </div>
    </section>
    <footer>
      <a class="last" @click="lastStep">上一步</a><a class="next" @click="nextStep">下一步&nbsp;（3&nbsp;/&nbsp;4）</a>
    </footer>
  </div>
</template>
<script>
import Popup from '../../../components/common/popup';
let Picker;
export default {
  props: {
    userInfo: Object,
    journey: Object,
  },
  data() {
    return {
      unsubscribePolicy: this.journey.unsubscribePolicy,
      unsubscribePolicys: [{name: '严格', value: 1},{name: '中等', value: 2},{name: '灵活', value: 3}],
      tips: this.journey.tips,
      preTips: '*费用不包含因交通延阻、罢工、天气、飞机、机器故障、航班取消或更改时间等不可抗力原因所导致的额外费用。',
      limitIntroLen: 500,
      spaceIntroLen: 500,
    };
  },
  computed: {
  },
  mounted() {
    let _this = this;
    Picker = Popup.fromComponent({component: 'picker/Index', valueKey: 'name', values: this.unsubscribePolicys, onConfirm(values) {
      _this.unsubscribePolicy.name = values[0].name;
      _this.unsubscribePolicy.value = values[0].value;
    }});
  },
  methods: {
    selectUnsubscribePolicy() {
      if(Picker) {
        Picker.show();
      }
    },
    checkLength() {
      if (this.tips.length > this.limitIntroLen) {
        this.tips = this.tips.substr(0, this.limitIntroLen);
      }
      this.spaceIntroLen = this.limitIntroLen - this.tips.length;
    },
    lastStep() {
      this.$router.push({ name: 'price'});
    },
    nextStep() {
      let journey = {tips: this.tips ? this.tips : this.preTips};
      this.$emit('cache-journey', journey);
      this.$router.push({ name: 'desc'});
    },
  },
};
</script>
<style lang="scss" scoped>
  .input-wrapper {
    margin-top: 0.26rem;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
    font-size: 0;

    ul {
      margin: 0 0.32rem;

      li {
        height: 1.387rem;

        input {
          width: 100%;
          height: 100%;
          padding: 0.45rem 0;
          border: 0;
          outline: none;
        }
      }
    }
  }

  .textarea-wrapper {
    position: relative;
    padding: 0.32rem;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
    overflow: hidden;

    textarea {
      width: 100%;
      height: 3.9rem;
      line-height: 1.5;
      border: 0;
      resize: none;
      outline: none;
    }

    span {
      float: right;
      color: #c7c7c7;
    }
  }

</style>