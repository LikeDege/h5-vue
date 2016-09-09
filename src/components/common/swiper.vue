<template>
    <div class="swiper-wrap">
        <div class="swiper" :style="{width: swiperW+'px'}"  @touchstart.stop="onTouchStart" >
            <figure v-for="(item, index) in items" 
                    :style="{width: screenW+'px', left: (-screenW * index)+'px', transform: trans.transforms[index], transitionDuration:trans.durations[index]}" >
                <a class="img-wrap" :href="item.actionUrl">
                    <c-img :options="{src:item.imgPath, width:screenW, e:1, c:1}"></c-img>
                </a>
            </figure>
        </div>
        <div class="dots">
            <ul>
                <li v-for="(item, index) in items" 
                    :class="['dot', {active: index==currentSlide}]" 
                    @click="goToSlide(index)"></li>
            </ul>
        </div>
    </div>
</template>
<script>
import cImg from '../common/image';
export default {
    data() {
    	return {
    		timer: 0,
            delta: 0,
            dragging: false,
            transitionDuration: 400,
            lastSlide: 0,
            currentSlide: 0,
            screenW: window.innerWidth,
    	}
    },
    props: {items:{type: Array,default() {return []}}},
    components: {
        cImg,
    },
    computed: {
    	swiperW() {
    		return this.screenW * this.items.length;
    	},
        trans() {
            let trans = {transforms:new Array(this.items.length),durations:new Array(this.items.length)};
            for(let i=0;i<this.items.length;i++) {
                let index = i, delta = 0, duration = this.transitionDuration;
                if(this.delta != 0) {
                    if(Math.abs(index - this.currentSlide) < 2) {
                        delta = this.delta;
                        duration = 0;
                    }
                }else if(Math.abs(this.lastSlide - this.currentSlide) > 1 && index != this.lastSlide && index != this.currentSlide) {
                    duration = 0;
                }
                let transtalteX = (this.currentSlide == index ?  0 : this.currentSlide > index ? - this.screenW : this.screenW) + delta;
                trans.transforms[index] = "translate("+transtalteX+"px, 0px) translateZ(0px)";
                trans.durations[index] = duration + "ms";
            }
            return trans;
        },
    },
    methods: {
        goToSlide(slide) {
            clearInterval(this.timer);
            this.lastSlide = this.currentSlide;
            this.currentSlide = slide;
            setTimeout(this.autoSwipe, this.transitionDuration);
        },
        onTouchStart(e) {
            clearInterval(this.timer);
            this.dragging = true;
            this.startPos = e.changedTouches[0].pageX;
            this.delta = 0;
            this.startTime = new Date().getTime();

            document.addEventListener('touchmove', this.onTouchMove);
            document.addEventListener('touchend', this.onTouchEnd);
        },
        onTouchMove(e) {
            if(!this.dragging) return;
            this.delta = e.changedTouches[0].pageX - this.startPos;
            if (Math.abs(this.delta) > 0) {
                e.preventDefault();
            }
        },
        onTouchEnd(e) {
            if(!this.dragging) return;
            let isQuickAction = new Date().getTime() - this.startTime < 1000;
            // 进入下一滑块
            if ((this.delta > 100 || (isQuickAction && this.delta > 15)) && this.currentSlide > 0 ) {
                this.lastSlide = this.currentSlide;
                this.currentSlide--;
            } else if ((this.delta < -100 || (isQuickAction && this.delta < -15)) && this.currentSlide < this.items.length - 1) {
                this.lastSlide = this.currentSlide;
                this.currentSlide++;
            }
            // 回到原位
            this.delta = 0;
            document.removeEventListener('touchmove', this.onTouchMove);
            document.removeEventListener('touchend', this.onTouchEnd);
            this.autoSwipe();
            this.dragging = false;
        },
        autoSwipe() {
            clearInterval(this.timer);
            this.timer = setInterval(()=>{
                this.lastSlide = this.currentSlide;
                this.currentSlide = (this.currentSlide + 1) % this.items.length;
            },3000);
        },
        resize() {
            clearInterval(this.timer);
            this.screenW = window.innerWidth;
            this.$nextTick(()=>{
                this.autoSwipe();
            });
        },
    },
    mounted() {
    	this.autoSwipe();
        // 图片根据窗口自适应
        window.addEventListener('resize', this.resize);
    },
    beforeDestroy() {
    	clearInterval(this.timer);
        window.removeEventListener('resize', this.resize);
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
            transition: transform;
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
