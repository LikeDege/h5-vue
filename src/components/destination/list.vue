<template>
<div class="dest-list">
    <ul>
        <li v-for="(idx,dest) in dests" v-show="isShow(dest.nameCn, dest.nameEn.toLowerCase(), dest.spelling.toLowerCase())" :class="{'bold': dest.type == country}">
        	<a v-link="{ name: 'journeyList', query: { destId: dest.id, destName: dest.nameCn, journeyType: journeyType, searchBy: 'journeyType' }}">
		        <div class="cn">{{dest.nameCn}}</div>
		        <div class="en">{{dest.nameEn}}</div>
	        </a>
        </li>
    </ul>
</div>
</template>
<script>
  import { DEST_TYPE_COUNTRY } from '../../common/constants';
  export default {
  	data() {
  		return {
  			country: DEST_TYPE_COUNTRY,
  		};
  	},
    props: ['dests', 'keyword', 'nav', 'journeyType'],
    computed: {
    	lCKeyword() { //转为小写
    		return (this.keyword || '').toLowerCase();
    	}
    },
    methods: {
    	isShow(nameCn, nameEn, spelling) {
    		return !this.keyword || nameCn.indexOf(this.keyword) >= 0 || spelling.indexOf(this.lCKeyword) >= 0 || nameEn.indexOf(this.lCKeyword) >= 0;
    	}
    },
    watch: {
    	nav() {

    	}
    }
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
