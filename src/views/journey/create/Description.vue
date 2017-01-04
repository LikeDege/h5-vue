<template>
  <div style="overflow: hidden;">
    <header>体验描述</header>
    <section>
      <p>请图文结合，详细描述您推荐当地景点及游玩体验，作为游客出行及预订您服务的参考。</p>
      <div class="textarea-wrapper"
           v-for="(itemContent, index) in journeyDayItems[0].journeyItem.itemContents">
        <div :id="'fileContainer'+index" :class="{'disabled': isUploadings[index]}">
          <div :id="'file'+index" class="img-wrapper">
            <div v-if="itemContent.photo.url">
              <c-img :options="{src:itemContent.photo.url, width:imgWidth, e:1, c:1}"></c-img>
            </div>
            <div class="select-file font-16"
                 v-else> 
                <template v-if="isUploadings[index]&&!itemContent.photo.url">
                  {{progress[index]}}%
                </template>
                <template v-else>
                  <i class="iconfont icon-camera"></i>
                  <div>选择照片</div>
                </template>
            </div>
          </div>
          <file-uploader :container="'fileContainer'+index"
                         :button="'file'+index"
                         :path="'road/u_'+journeyId%100+'/'+journeyId+'/'"
                         v-bind:multiSelection="false"
                         @upload-success="uploadSuccess($event, index)"
                         @upload-start="uploadStart(index)"
                         @upload-progress="uploadProgress($event, index)"
                         @upload-error="uploadError(index)"></file-uploader>
        </div>
        <div style="font-size: 0;">
          <textarea placeholder="请配合图片输入文字，对景点及游玩体验进行详细描述" 
                    @input="checkLength(index)"
                    v-model.trim="itemContent.intro"></textarea>
        </div>
        <span>还剩{{limitIntroLen - itemContent.intro.length}}字</span>
      </div>
      <div class="btn-wrapper">
        <ul>
          <li><a @click="addJourneyItem">+增加</a></li>
        </ul>
      </div>
    </section>
    <footer :class="{'disabled': isUploading}">
      <a class="last" @click="lastStep">上一步</a><a class="next" @click="nextStep">提交并预览&nbsp;（4&nbsp;/&nbsp;4）</a>
    </footer>
  </div>
</template>
<script>
import cImg from '../../../components/common/image';
import fileUploader from '../../../components/common/fileUploader/index';

export default {
  props: {
    userInfo: Object,
    journey: Object,
  },
  data() {
    return {
      limitIntroLen: 500,
      imgWidth: (window.innerWidth - 48) * 0.5,
      journeyId: this.journey.id,
      journeyDayItems: this.journey.journeyDayItems,
      isUploadings: [false],
      progress: [0],
    };
  },
  components: {
    cImg,
    fileUploader,
  },
  computed: {
    isUploading() {
      return this.isUploadings.some((item)=>{
        return item;
      });
    }
  },
  methods: {
    addJourneyItem() {
      this.journeyDayItems[0].journeyItem.itemContents.push({photo: {clip: false, url: ''}, intro: ''});
      this.isUploadings.push(false);
      this.progress.push(0);
    },
    lastStep() {
      this.$router.push({ name: 'unsubscribe'});
    },
    nextStep() {
      this.$emit('save-journey');
    },
    checkLength(index) {
      let target = this.journeyDayItems[0].journeyItem.itemContents[index].intro;
      if (target.length > this.limitIntroLen) {
        this.journeyDayItems[0].journeyItem.itemContents[index].intro = target.substr(0, this.limitIntroLen);
      }
    },
    uploadSuccess(url, index) {
      this.journeyDayItems[0].journeyItem.itemContents[index].photo.url = url;
      this.$set(this.isUploadings, index, false);
    },
    uploadStart(index) {
      this.$set(this.isUploadings, index, true);
      this.journeyDayItems[0].journeyItem.itemContents[index].photo.url = '';
    },
    uploadProgress(progress, index) {
      this.$set(this.progress, index, progress);
    },
    uploadError(index) {
      this.$set(this.isUploadings, index, false);
      this.$set(this.progress, index, 0);
    },
  },
};
</script>
<style lang="scss" scoped>
  @import "~sass/base.scss";

  .disabled {
    pointer-events: none;
  }

  .btn-wrapper {
    margin-top: 0.26rem;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    background-color: #fff;

    ul li {
      width: 100%;
      height: 1.387rem;
      line-height: 1.387rem;
      border-bottom: 0;

      a {
        display: block;
        text-align: center;
        color: #ff5f6a;
      }
    }
  }

  .img-wrapper {
    position: relative;
    height: 4.35rem;
    margin-bottom: 0.32rem;
    border-bottom: 1px solid #ccc;

    .select-file {
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      width: px2rem(160);
      margin: auto;
      color: #c7c7c7;
      text-align: center;
      transform: translateY(-50%);

      div {
        margin-top: px2rem(14);
      }
    }
  }

  [data-dpr = '1'] .iconfont {
      font-size: 35px;
  }

  [data-dpr = '2'] .iconfont {
      font-size: 70px;
  }

  [data-dpr = '3'] .iconfont {
      font-size: 105px;
  }

  .textarea-wrapper {
    position: relative;
    margin: 0.26rem 0;
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

    &>span {
      float: right;
      color: #c7c7c7;
    }
  }
</style>