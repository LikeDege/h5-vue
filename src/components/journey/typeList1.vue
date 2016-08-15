<template>
    <div class="journey-type">
	    <ul>
	        <li>
	            <a @click.stop="journeyType=guide" :class="{selected: journeyType==guide}">
	                <i class="icon-guide"></i>
	                <span>向导服务</span>
	            </a>
	        </li><li>
	            <a @click.stop="journeyType=feature" :class="{selected: journeyType==feature}">
	                <i class="icon-feature"></i>
	                <span>特色项目</span>
	            </a>
	        </li><li>
	            <a @click.stop="journeyType=airport" :class="{selected: journeyType==airport}">
	                <i class="icon-airport"></i>
	                <span>机场接送</span>
	            </a>
	        </li><li>
	            <a @click.stop="journeyType=longLine" :class="{selected: journeyType==longLine}">
	                <i class="icon-long-line"></i>
	                <span>长线玩法</span>
	            </a>
	        </li>
	    </ul>
    </div>
</template>
<script>
  import { getCityList } from '../../services/destination';
  import { JOURNEY_TYPE_LONGLINE, JOURNEY_TYPE_FEATURE, JOURNEY_TYPE_GUIDE, JOURNEY_TYPE_AIRPORT } from '../../common/constants';
  export default {
  	data() {
  		return {
  			longLine: JOURNEY_TYPE_LONGLINE,
  			feature: JOURNEY_TYPE_FEATURE,
  			guide: JOURNEY_TYPE_GUIDE,
  			airport: JOURNEY_TYPE_AIRPORT,
  		}
  	},
    props: {
    	journeyType: Number,
    },
    created() {
		let params = this.destType == 2 ? {countryId: this.destId} : {provinceId: this.destId};
		getCityList(this, params).then(response => {this.cities = response}, err => console.log(err));
    },
  };
</script>
<style lang="scss" scoped>
.journey-type {
    background-color: #fff;

    ul {
	    width: 100%;
	    float: none;
	    border-bottom: 1px solid #eaeaea;

	    li {
		    width: 25%;
		    display: inline-block;

		    a {
			    display: block;
			    padding: 12px 0;
			    color: #999;

				i {
				    display: block;
				    margin: 0 auto 10px;
				    width: 24px;
				    height: 24px;
				    -webkit-background-image: url("http://pic.8pig.com/img/h5/new/common/sprite1.png");
				    background-image: url("http://pic.8pig.com/img/h5/new/common/sprite1.png");
				    background-repeat: no-repeat;
				    -webkit-background-size:96px 48px;
				    background-size:96px 48px;
				}

				&.selected {
				    color: #ff5f69!important;

				    .icon-guide {
						background-position: 0 -24px;
					}
					.icon-feature {
						background-position: -24px -24px;
					}
					.icon-airport {
						background-position: -48px -24px;
					}
					.icon-long-line {
						background-position: -72px -24px;
					}
				}

				.icon-guide {
				    background-position: 0 0;
				}

				.icon-feature {
				    background-position: -24px 0;
				}

				.icon-airport {
				    background-position: -48px 0;
				}

				.icon-long-line {
				    background-position: -72px 0;
				}

				span {
				    display: block;
				    text-align: center;
				    font-size: 14px;
				}
			}
		}
	}
} 
</style>
