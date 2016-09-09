<template>
  <div class="dest-list">
    <ul>
      <li v-for="(dest,idx) in filteredData" 
          :key="dest.id"
          :class="boldClas(dest.type)"
          :data-anchor="anchor(idx,dests)">
        <router-link :to="{name: 'journeyList', query: { destId: dest.id, destName: dest.nameCn, journeyType: journeyType, searchBy: 'journeyType'}}">
	        <div class="cn">{{dest.nameCn}}</div>
	        <div class="en">{{dest.nameEn}}</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { DEST_TYPE_COUNTRY } from '../../common/constants';
export default {
  props: {
    dests: Array,
    journeyType: [String, Number],
    keyword: {
      type: String,
      default: '',
    },
  },
  computed: {
  	lCKeyword() { //转为小写
  		return this.keyword.toLowerCase();
  	},
    filteredData() {
      let keyword = this.keyword && this.keyword.toLowerCase();
      let data = this.dests;
      data = data.filter(function (row) {
        return ['nameCn','nameEn','spelling'].some(function (key) {
          return String(row[key]).toLowerCase().indexOf(keyword) > -1;
        })
      });
      return data;
    },
  },
  methods: {
    boldClas(destType) {
      // 国家加粗
      return destType == DEST_TYPE_COUNTRY ? ['bold'] : '';
    },
  	isShow({nameCn, nameEn, spelling}) {
  		return !this.keyword || nameCn.indexOf(this.keyword) >= 0 || spelling.toLowerCase().indexOf(this.lCKeyword) >= 0 || nameEn.toLowerCase().indexOf(this.lCKeyword) >= 0;
  	},
    anchor(index, dests) {
      let currItem = dests[index],
          lastItem = dests[index-1];
      // 各个字母的锚点
      if(currItem.spelling) {
          let firstLetter = currItem.spelling[0].toUpperCase();
          if(index==0 || (lastItem.spelling && firstLetter != lastItem.spelling[0].toUpperCase())) {
            return firstLetter;
          }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.dest-list {
  padding: 0 10px;
  background-color: #fff;

  ul li {
    border-bottom: 1px solid #eaeaea;

    &.bold {
    	font-weight: bold;
    }

    &:last-child {
	    border: 0;
    }

	a {
	    display: block;
	    height: 47px;

	    .cn{
		    margin: 0;
		    padding-top: 5px;
		    line-height: 24px;
		    font-size: 14px;
		    color: #666;
  		}

  		.en{
  		    margin: 0;
  		    font-size: 12px;
  		    color: #c8c8c8;
  		    padding-bottom: 5px;
  		}
    }
	}
}
</style>
