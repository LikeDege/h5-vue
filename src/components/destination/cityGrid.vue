<template>
<div class="city-grid">
    <header><h3>{{ destName }}</h3></header>
    <ul v-if="cities.length > 0">
        <li><a @click="update(destId)" :class="{active:destId==cityId}">全部</a></li>
        <li v-for="(city,idx) in cities" :class="{hidden: isHidden(idx)}">
            <a @click="update(city.id)" :class="{active:city.id==cityId}">{{ city.nameCn }}</a>
        </li>
        <li v-if="isShowMore()" class="more">
        	<a @click="toggleMore">{{isOpen ? '收起' : '更多'}}<i>{{isOpen ? '&#xe61b' : '&#xe61a'}}</i></a>
        </li>
    </ul>
</div>
</template>
<script>
  import { DEST_TYPE_COUNTRY } from '../../common/constants';
  import { getCityList } from '../../services/destination';
  export default {
  	data() {
  		return {
  			cities: [],
  			isOpen: false,
  		};
  	},
    props: ['destName','destId','destType','cityId'],
    created() {
		let params = this.destType == DEST_TYPE_COUNTRY ? {countryId: this.destId} : {provinceId: this.destId};
		getCityList(this, params).then(response => {this.cities = response}, err => console.log(err));
    },
    methods: {
    	update(cityId) {
    		this.$emit('update-city', cityId);
    	},
    	isHidden(idx) {
    		return idx>=6 && !this.isOpen;
    	},
    	isShowMore() {
    		return this.cities && this.cities.length>8;
    	},
    	toggleMore() {
    		this.isOpen = !this.isOpen;
    	},
    }
  };
</script>
<style lang="scss" scoped>
.city-grid {
    background-color: #fff;

    header {
    	padding: 10px 10px 0;
    	background-color: #fff;

    	h3 {
    		font-size: 20px;
		    border-left: 4px solid #666;
		    padding-left: 10px;
		    font-weight: normal;
    	}
    }

    ul {
	    padding: 7px;
	    overflow: hidden;
    	border-bottom: 1px solid #eaeaea;

	    li {
		    padding: 3px;
		    width: 25%;
		    float: left;

		    a {
			    display: block;
			    border: 1px solid #ccc;
			    height: 29px;
			    line-height: 27px;
			    font-size: 14px;
			    color: #666;
			    text-align: center;
			    overflow: hidden;
			    white-space: nowrap;
			    text-overflow: ellipsis;
			    border-radius: 15px;

			    &.active {
				    color: #ff5f69;
				    border-color: #ff5f69;
				}
			}

			&.more {
			    float: right;
			    position: relative;

			    a {
				    color: #ff5f69;
				    border: 0;

				    i {
					    vertical-align: middle;
					    font-family:"iconfont";
					    font-style: normal;
					    color: #ff5f69;
					}
				}
			}

			&.hidden {
				display: none;
			    opacity: 0;
			}
		}
	}

	&>a {
	    color: #ff5f69;
	    font-size: 12px;
	    float: right;
	    margin-right: 10px;
	    height: 29px;
	    line-height: 29px;
	}
}
</style>
