<template>
	<div class="search-bar">
	    <ul :class="colClas" >
            <li v-if="optionalDest">
                <a v-link="{ name: 'destinationList', query: {journeyType: journeyType} }">{{destName ? destName : '目的地选择'}}<i></i></a>
            </li><li class="sort">
	            <a @click="toggleSort(0)" :class="prcClas">价格<i></i></a>
	        </li><li class="sort">
	            <a @click="toggleSort(1)" :class="cmtClas">评价数<i></i></a>
	        </li><li class="car" v-if="journeyType==journeyTypeGuide">
	            <a @click="toggleTraffic" :class="trafficClas"><i></i>是否带车</a>
	        </li>
	    </ul>
	</div>
</template>
<script>
	import { JRNY_TYPE_GUIDE, SORT_JRNY_PRC_DESC, SORT_JRNY_PRC_ASC, SORT_JRNY_CMT_DESC, SORT_JRNY_CMT_ASC, TRAFFIC_TYPE_CAR } from '../../common/constants';
	export default {
		data() {
			return {
				journeyTypeGuide: JRNY_TYPE_GUIDE,
			}
		},
		props: {
			optionalDest: Boolean,
			destId: Number,
			destName: String,
			sort: Number,
			trafficType: Number,
			journeyType: Number,
		},
		computed: {
			colClas() {
				return [this.optionalDest && this.journeyType==JRNY_TYPE_GUIDE ? 'col-4' : (this.optionalDest || this.journeyType==JRNY_TYPE_GUIDE ? 'col-3' : 'col-2')];
			},
			prcClas() {
				return {up:this.sort==SORT_JRNY_PRC_ASC,down:this.sort==SORT_JRNY_PRC_DESC};
			},
			cmtClas() {
				return {up:this.sort==SORT_JRNY_CMT_ASC,down:this.sort==SORT_JRNY_CMT_DESC};
			},
			trafficClas() {
				return ['car', {active:this.trafficType==TRAFFIC_TYPE_CAR}];
			},
		},
		methods: {
			toggleSort(flag) {
				if(flag == 0) {
					(this.sort == SORT_JRNY_PRC_ASC) ? (this.sort = SORT_JRNY_PRC_DESC) : (this.sort = SORT_JRNY_PRC_ASC);
				} else {
					(this.sort == SORT_JRNY_CMT_ASC) ? (this.sort = SORT_JRNY_CMT_DESC) : (this.sort = SORT_JRNY_CMT_ASC);
				}
			},
			toggleTraffic() {
				this.trafficType = (this.trafficType===undefined ? TRAFFIC_TYPE_CAR : undefined);
			},
		},
	};
</script>
<style lang="scss" scoped>
.search-bar{
    padding: 0 10px;
    height: 47px;
    background-color: #fff;

    ul{
	    li{
		    text-align: center;

		    &.col-2 li:nth-child(1) {
			    padding-right: 5px;
			}

			&.col-2 li:nth-child(2) {
			    padding-left: 5px;
			}
		}

	    &.col-2 li{
		    width: 50%;
		}

		&.col-3 li{
		    width: 33.333%;
		}

		&.col-4 li{
		    width: 25%;
		}

		li{
		    display: inline-block;
		    vertical-align: middle;

		    a{
			    display: block;
			    line-height: 47px;
			    font-size: 14px;
			    color: #666;
			    text-overflow: ellipsis;
			    white-space: nowrap;
			    overflow: hidden;

			    i{
				    display: inline-block;
				    width: 14px;
				    height: 14px;
				    background: url("http://pic.8pig.com/img/h5/new/common/sprite.png") no-repeat;
				    background-position: -13px -103px;
				    -webkit-background-size:128px 116px;
				    background-size:128px 116px;
				    vertical-align: middle;
				}
			}

			&.car a {
				i{
				    background:none;
				    background-color: #E8E8E8;
				    -webkit-border-radius:3px;
				    -moz-border-radius:3px;
				    border-radius:3px;
				}

				&.active i:after{
				    content: '\20';
				    display: block;
				    width: 100%;
				    height: 100%;
				    background: url("http://pic.8pig.com/img/h5/new/common/sprite.png") no-repeat;
				    -webkit-background-size:128px 116px;
				    background-size:128px 116px;
				    background-position: -65px -103px;
				}
			}

			&.sort a {
				i{
				    vertical-align: middle;
				    background-position: -52px -103px;
				}

				&.up i{
				    background-position: -39px -103px;
				}

				&.down i{
				    background-position: -26px -103px;
				}
			}
		}
	}
}
</style>
