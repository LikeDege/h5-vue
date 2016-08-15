<template>
    <div class="journey-type">
        <ul>
            <li><a v-link="{name: 'journeyList', query: {journeyType: guide}}"><i class="icon-guide"></i>
                <p>向导服务</p></a></li>
            <li><a v-link="{name: 'journeyList', query: {journeyType: airport}}"><i class="icon-airport"></i>
                <p>机场接送</p></a></li>
            <li><a v-link="{name: 'journeyList', query: {journeyType: feature}}"><i class="icon-feature"></i>
                <p>特色项目</p></a></li>
            <li><a v-link="{name: 'journeyList', query: {journeyType: longLine}}"><i class="icon-long-line"></i>
                <p>长线玩法</p></a></li>
        </ul>
    </div>
</template>
<script>
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
	}
</script>
<style lang="scss" scoped>

.journey-type{
    background-color: #fff;

    ul li {
	    float: left;
	    width: 25%;
	    text-align: center;

	    a {
		    display: block;
		    padding: 15px 0;

		    i {
			    display: block;
			    margin: 0 auto 13px;
			    width: 47px;
			    height: 47px;
			    border-radius:10px;
		        overflow: hidden;

			    &:after {
			        content: '\20';
				    display: block;
				    margin: 6px auto 0;
				    width: 32px;
    				height: 32px;
				    background: url("http://pic.8pig.com/img/h5/new/common/sprite.png") no-repeat;
				    background-size:128px 116px;
			    }

			    &.icon-guide {
			    	background-color: #ff4c4c;

			    	&:after {
						background-position: 0px -21px;
					}
				}
				&.icon-airport {
			    	background-color: #f93;
			    	
			    	&:after {
						background-position: -32px -21px;
					}
				}
				&.icon-feature {
			    	background-color: #ff7e33;
			    	
			    	&:after {
						background-position: -64px -21px;
					}
				}
				&.icon-long-line {
			    	background-color: #f53;
			    	
			    	&:after {
						background-position: -96px -21px;
					}
				}
			}
		}

		p {
		    margin:0;
		    font-size: 14px;
		    color: #333;
		}
	}
}
</style>
