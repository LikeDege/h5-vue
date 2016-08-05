<template>
    <div class="swiper-wrap">
        <div class="swiper" :style="{width: swiperW + 'px'}">
            <figure v-for="(index, item) in items" :style="{width: screenW+'px', left: (-screenW * index) + 'px', transform: currSlideIdx == index ?  currentSlide : currSlideIdx > index ? leftSlide : rightSlide}">
                <a class="img-wrap" href="{{item.actionUrl}}">
                    <img v-lazy="item.imgPath+'@1e_1c_'+bannerW+'w_'+bannerH+'h'" width="{{bannerW}}" height="{{bannerH}}" />
                </a>
            </figure>
        </div>
        <div class="dots">
            <ul>
                <li v-for="(index,item) in items" :class="['dot', {active: index==currSlideIdx}]"></li>
            </ul>
        </div>
    </div>
</template>
<script>
  export default {
	data() {
		return {
			currSlideIdx: 0,
			currInterval: 0,
		}
	},
    props: ['items'],
    computed: {
		screenW() {
			return window.innerWidth>screen.availWidth?screen.availWidth:window.innerWidth;
		},
		swiperW() {
			if(this.items){
				return this.screenW * this.items.length;
			}
		},
		bannerW() {
			return this.screenW;
		},
		bannerH() {
			return parseInt(this.screenW * 0.75);
		},
		currentSlide() {
			return 'translate(0px, 0px) translateZ(0px)';
		},
		leftSlide() {
			return 'translate(-'+this.screenW+'px, 0px) translateZ(0px)';
		},
		rightSlide() {
			return 'translate('+this.screenW+'px, 0px) translateZ(0px)';
		},
    },
    ready() {
    	clearInterval(this.currInterval);
    	this.currInterval = setInterval(()=>{
    		this.currSlideIdx = (this.currSlideIdx + 1) % 4;
    	},3000);
    },
    beforeDestory() {
    	clearInterval(this.currInterval);
    },
  };
</script>
<style lang="scss" scoped>
	.swiper-wrap {
		position: relative;

		.swiper {
			overflow: hidden;
			> figure {
				position: relative;
			    float: left;
			    margin: 0px;
	    		transition-duration: 400ms;
		    }

		    .img-wrap {
				display: block;
				font-size: 0;
			}
		}
		
		.dots {
		    position: absolute;
		    bottom: 2px;
		    width: 100%;
		    margin: 0;
		    padding: 0;
		    text-align: center;

		    .dot{
			    display: inline-block;
		    	margin:0 5px;
			    width: 12px;
			    height: 12px;
			    background-color: #ccc;
			    border-radius: 50%;
			    opacity: 0.6;

			    &.active {
					background-color: #fff;
				    opacity: 1;
				}
			}
		}
	}
</style>
