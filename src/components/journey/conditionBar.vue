<template>
	<div class="condition-bar">
	    <ul :class="[mode, mode=='center' ? (journeyType==3 ? 'col-3' : 'col-2') : '']" >
            <li v-if="destId !== undefined">
                <a id="destSearch">{{destName ? destName : '目的地选择'}}<i></i></a>
            </li>{{{space}}}<li class="sort">
	            <a @click="sort=sort !=1 && sort !=2 ? 2 : sort^3" :class="{up:sort==2,down:sort==1}">价格<i></i></a>
	        </li>{{{space}}}<li class="sort">
	            <a @click="sort=sort !=3 && sort !=4 ? 3 : sort^7" :class="{up:sort==4,down:sort==3}">评价数<i></i></a>
	        </li>{{{space}}}<li class="car" v-if="journeyType==3">
	            <a @click="trafficType=trafficType^3" :class="[car, {active:trafficType==2}]"><i></i>是否带车</a>
	        </li>{{{space}}}<li v-if="mode==justify" class="justify-fix"></li>
	    </ul>
	</div>
</template>
<script>
import { JOURNEY_TYPE_GUIDE } from '../../common/constants';
	export default {
		data() {
			return {
				guide: JOURNEY_TYPE_GUIDE,
			}
		},
		props: {
			destId: Number,
			destName: String,
			sort: Number,
			trafficType: {
				type: Number,
				default: 1,
			},
			journeyType: Number,
			mode: {
				type: String,
				default: 'center',
			},
		},
		computed: {
			space() {
				return this.mode == 'justify' ? '&nbsp;' : '';
			}
		},
	};
</script>
<style lang="scss" scoped>
.condition-bar{
    padding: 0 10px;
    height: 47px;
    background-color: #fff;

    ul{
    	&.justify {
	    	text-align: justify;
	    }

	    &.center li{
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

		li{
		    display: inline-block;
		    vertical-align: middle;

		    a{
			    display: block;
			    line-height: 47px;
			    font-size: 14px;
			    color: #666;

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

			&.justify-fix{
			    display: inline-block;
			    width: 100%;
			    height: 0;
			    overflow: hidden;
			}
		}
	}
}
</style>
