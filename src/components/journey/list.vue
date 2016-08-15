<template>
    <div class="journey-list">
        <ul>
            <li v-for="journey in journeys">
                <a :href="'http://test.h5.8pig.com/journey.html?id='+journey.id">
                    <div class="pic">
                        <span class="new-tag" v-if="journey.new">NEW</span>
                        <c-img  v-if="journey.photo" :options="{cdn:'ali', src:journey.imgUrl, cX:journey.photo.x, cY:journey.photo.y, cW:journey.photo.w, cH:journey.photo.h, width:imgW}" ></c-img>
                        <c-img v-else :options="{cdn:'ali', width:145, height:97}" ></c-img>
                        <span class="price">{{ journey.displayPrice?journey.displayPrice:'￥'+journey.price }}</span>
                        <div class="triangle">
                            <div class="triangle-left"></div>
                            <div class="triangle-right"></div>
                        </div>
                    </div>
                    <div class="chief">
                        <p>{{ journey.name }}</p>
                        <span>{{ journey.type | transJourneyType }}·<template v-if="journey.commentCount">{{ journey.commentCount || 0 }}条评价·</template>{{ journey.address }}</span>
                    </div>
                </a>
            </li>
        </ul>
    </div>
</template>
<script>
  import cImg from '../common/image';
  export default {
    props: ['journeys'],
    components: {
    	cImg,
    },
    computed: {
    	imgW() {
    		let screenW = window.innerWidth>screen.availWidth?screen.availWidth:window.innerWidth;
    		return (screenW - 30) / 2;
    	}
    }
  }
</script>
<style lang="scss" scoped>
.journey-list {
    position: relative;

	ul {
	    padding: 5px;
	    overflow: hidden;

	    li {
		    float: left;
		    width: 50%;
		    padding: 5px;

		    a {
			    display: block;
			    border-bottom: 1px solid #ccc;
			}

			.pic {
			    position: relative;
			    overflow: hidden;

			    &>img {
				    display: block;
				    width: 100%;
				}

				.new-tag {
				    position: absolute;
				    transform: rotate(-45deg);
				    top: -6px;
				    left: -23px;
				    color: #fff;
				    background-color: #ff5f69;
				    padding: 20px 20px 4px;
				}
			}

			.price {
			    padding: 4px;
			    position: absolute;
			    bottom: 8px;
			    left: 7px;
			    color: #fff;
			    background-color: rgba(0,0,0,0.5);
			}

			.chief {
			    background-color: #fff;
			    padding: 5px;

			    &>p {
				    font-size: 14px;
				    color: #000;
				    margin: 0;
				    line-height: 1.5em;
				    max-height: 42px;
				    overflow: hidden;
				    text-overflow: ellipsis;
				    white-space: nowrap;
				}

				&>span {
				    font-size: 12px;
				    color: #999;
				    line-height: 1.5em;
				    display: block;
				    overflow: hidden;
				    text-overflow: ellipsis;
				    white-space: nowrap;
				}
			}
		}
	}
}

.triangle {
    height: 3px;
    position: absolute;
    bottom: 0;
    width: 100%;
    overflow: hidden;

    .triangle-left {
	    border-right: 3px solid transparent;
	    border-bottom: 3px solid #fff;
	    width: 10px;
	    float: left;
	}

	.triangle-right {
	    border-left: 3px solid transparent;
	    border-bottom: 3px solid #fff;
	    margin-left: 10px;
	}
}
</style>
