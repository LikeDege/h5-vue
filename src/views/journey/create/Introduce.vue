<template>
  <div style="overflow: hidden;">
    <image-picker v-if="showImgPicker"
                  :img-urls="userInfo.bgImgs ? userInfo.bgImgs : []"
                  :selected-img="coverImg"
                  type="single"
                  @select-img="selectImg($event)"></image-picker>
    <div v-show="showMain">
    <header>名称及概括</header>
    <section>
      <h3>向导服务名称</h3>
      <p>请给您的向导服务取一个名称，例如“带你玩转马德里”</p>
      <div class="input-wrapper">
        <input maxlength="12" placeholder="填写玩法名称"
               v-model="journeyName"/>
      </div>
    </section>
    <section>
      <h3>个人简介</h3>
      <p>介绍自己的个人情况，对当地的了解，有什么值得推荐给游客的亮点等，能够让游客更放心地选择您。</p>
      <div class="textarea-wrapper">
        <div style="font-size: 0;">
        <textarea placeholder="大家好，我是刘力戈，你们可以叫我力哥，目前是洛杉矶一家创意工场的创始人。我曾在互联网在线音乐行业混迹，做着数据分析那严谨的事，却长着一颗不着四六的文艺脑袋。在一个非常普通的日子，湛蓝的天空飘着几朵白云，万里......" 
        @input="checkLength"
        v-model.trim="summary"></textarea>
        </div>
        <span>还剩{{spaceIntroLen}}字</span>
      </div>
    </section>
    <section>
      <h3>设置向导服务封面</h3>
      <p>这是游客对你的第一印象</p>
      <div class="img-wrapper">
        <a v-if="coverImg"
           @click="switchCover">
          <c-img :options="{src:coverImg, width:imgWidth, e:1, c:1}"></c-img>
        </a>
        <span class="font-16"
              v-text="coverImg ? '点击图片可更换' : '请先上传生活照'"></span>
      </div>
    </section>
    <footer>
      <a @click="saveJourney">下一步&nbsp;（1&nbsp;/&nbsp;4）</a>
    </footer>
    </div>
  </div>
</template>
<script>
import cImg from '../../../components/common/image';
import imagePicker from '../../../components/common/ImagePicker';
import post from '../../../common/ajax';
export default {
  props: {
    userInfo: {
      type: Object,
      default: function () {
        return {}
      }
    },
    journey: Object,
  },
  data() {
    return {
      journeyName: this.journey.name,
      showMain: true,
      showImgPicker: false,
      imgWidth: window.innerWidth - (0.64 * window.rem),
      coverImg: this.journey.cover.url ? this.journey.cover.url : (this.userInfo.bgImgs && this.userInfo.bgImgs.length > 0 ? this.userInfo.bgImgs[0] : ''),
      summary: this.journey.summary ? this.journey.summary : this.userInfo.selfIntroduction,
      limitIntroLen: 1400,
      spaceIntroLen: this.userInfo.selfIntroduction ? 1400 - this.userInfo.selfIntroduction.length : 1400,
    };
  },
  computed: {
  },
  components: {
    cImg,
    imagePicker,
  },
  methods: {
    async saveJourney() {
      if(this.journey.id == 0) {
        let result = await post('/journey/create', {name: this.journeyName, type: 3});
        if(result && result.returnCode == 0) {
          this.nextStep(result.data);
        }
      } else {
        this.nextStep(this.journey.id);
      }
    },
    nextStep(journeyId) {
      let journey = {id: journeyId, name: this.journeyName, cover: {url: this.coverImg}, summary: this.summary};
      this.$emit('cache-journey', journey);
      this.$router.push({ name: 'price'});
    },
    selectImg(value) {
      this.coverImg = value;
      this.showImgPicker = false;
      this.showMain = true;
    },
    switchCover() {
      this.showImgPicker = true;
      this.showMain = false;
    },
    checkLength() {
      if (this.summary.length > this.limitIntroLen) {
        this.summary = this.summary.substr(0, this.limitIntroLen);
      }
      this.spaceIntroLen = this.limitIntroLen - this.summary.length;
    },
  },
};
</script>
<style lang="scss" scoped>
  .input-wrapper {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    font-size: 0;

    input {
      width: 100%;
      padding: 0.42rem 0.32rem;
      border: 0;
      border-bottom: 1px solid #ccc;
      outline: none;
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

  .img-wrapper {
    margin: 0.26rem 0.32rem 0.85rem;

    a {
      display: block;
      font-size: 0;
    }

    span {
      display: block;
      margin: 0.26rem;
      text-align: center;
      color: #999;
    }
  }
</style>