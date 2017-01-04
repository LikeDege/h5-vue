<template>
  <div style="overflow: hidden;">
    <header>请选择图片</header>
    <section>
      <div class="img-wrapper">
        <ul>
          <li v-for="(imgUrl, index) in imgUrls">
              <label :for="index">
                <c-img :options="{src:imgUrl, width:imgWidth, e:1, c:1}"></c-img>
              </label>
              <input type="radio"
                     v-if="type=='single'"
                     v-model="tSelectedImg"
                     :id="index"
                     :value="imgUrl">
              <input type="checkbox"
                     v-else
                     v-model="tSelectedImg"
                     :id="index"
                     :value="imgUrl">
              <i class="iconfont icon-tick"></i>
          </li>
        </ul>
      </div>
    </section>
    <footer>
      <a @click="submit">提交</a>
    </footer>
  </div>
</template>
<script>
import cImg from './image';
export default {
  props: {
    imgUrls: Array,
    selectedImg: [String, Array],
    type: String,
  },
  data() {
    return {
      imgWidth: (window.innerWidth - (0.9 * window.rem)) / 2,
      tSelectedImg: this.selectedImg,
    };
  },
  computed: {
  },
  components: {
    cImg,
  },
  methods: {
    submit() {
      this.$emit('select-img', this.tSelectedImg);
    }
  },
};
</script>
<style lang="scss" scoped>

  header {
    margin: 0.45rem 0;
  }

  .img-wrapper {
    margin: 0 0.32rem;

    ul {
      margin: -0.16rem;

      li {
        display: inline-block;
        position: relative;
        width: 50%;
        padding: 0.16rem;
        font-size: 0;
      }
    }
  }

  .iconfont {
    position: absolute;
    top: 0.373rem;
    right: 0.373rem;
    color: #ccc;

    &:before {
      background-color: #fff;
      border-radius: 50%;
    }
  }

  input[type=radio]:checked + i, input[type=checkbox]:checked + i {
      color: #0cc260;
  }

  [data-dpr = '1'] .iconfont {
    font-size: 24px;
  }

  [data-dpr = '2'] .iconfont {
    font-size: 48px;
  }

  [data-dpr = '3'] .iconfont {
    font-size: 72px;
  }

  footer a {
    display: block;
    text-align: center;
    color: #fff;
    background-color: #ff5f6a;
  }

</style>