<template>
<div class="city-grid">
    <header><h3>{{ destName }}</h3></header>
    <ul v-if="cities.length > 0">
        <li><a @click="update(destId)" :class="{active:destId==cityId}">全部</a></li>
        <li v-for="(idx,city) in cities" :class="{hidden:idx>=6 && !isOpen}">
            <a @click="update(city.id)" :class="{active:city.id==cityId}">{{ city.nameCn }}</a>
        </li>
        <li v-if="cities && cities.length>8" class="more">
        	<a @click="this.isOpen = !this.isOpen">{{isOpen ? '收起' : '更多'}}<i>{{isOpen ? '&#xe61b' : '&#xe61a'}}</i></a>
        </li>
    </ul>
</div>
</template>
<script>
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
		let params = this.destType == 2 ? {countryId: this.destId} : {provinceId: this.destId};
		getCityList(this, params).then(response => {this.cities = response}, err => console.log(err));
    },
    methods: {
    	update(cityId) {
    		this.cityId = cityId;
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
