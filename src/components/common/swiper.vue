<template>
    <div class="swiper-wrap">
        <div class="swiper" :style="{width: swiperW + 'px'}"  @touchstart.stop="onTouchStart" >
            <figure v-for="(index, item) in items" :style="{width: screenW+'px', left: (-screenW * index) + 'px', transform: transforms[index], transitionDuration:transitionDuration}" >
                <a class="img-wrap" href="{{item.actionUrl}}">
                    <c-img :options="{cdn:'ali', src:item.imgPath, width:screenW}"></c-img>
                </a>
            </figure>
        </div>
        <div class="dots">
            <ul>
                <li v-for="(index,item) in items" :class="['dot', {active: index==currentSlide}]" @click="goToSlide(index)"></li>
            </ul>
        </div>
    </div>
</template>
<script>
  import cImg from '../common/image';
  export default {
	data() {
		return {
			currentSlide: 0,
			timer: 0,
            delta: 0,
            dragging: false,
            transitionDuration: '400ms',
		}
	},
    props: {items:{type: Array,default() {return []}}},
    components: {
        cImg,
    },
    computed: {
		screenW() {
			return window.innerWidth>screen.availWidth?screen.availWidth:window.innerWidth;
		},
		swiperW() {
			return this.screenW * this.items.length;
		},
        transforms() {
            let transforms = new Array(this.items.length);
            for(let i=0;i<this.items.length;i++){
                let transtalteX = 0 == i ?  0 : 0 > i ? - this.screenW : this.screenW;
                transforms[i] = "translate("+transtalteX+"px, 0px) translateZ(0px)";
            }
            return transforms;
        },
    },
    methods: {
        goToSlide(slide) {
            this.currentSlide = slide;
            clearInterval(this.timer);
            this.autoTransform(slide);
            setTimeout(this.autoSwipe, 400);
        },
        autoTransform(slide) {
            this.transitionDuration = "400ms";
            let figures = document.querySelectorAll("figure");
            for(let i=0;i<this.items.length;i++){
                let transtalteX = slide == i ?  0 : slide > i ? - this.screenW : this.screenW;
                figures[i].style.transform = "translate("+transtalteX+"px, 0px) translateZ(0px)";
            }
        },
        move(offset) {
            this.transitionDuration = "0ms";
            let figures = document.querySelectorAll("figure");
            for(let i =-1;i<2;i++){
                let index = this.currentSlide + i;
                if(index > -1 && index < this.items.length) {
                    let translateX = this.currentSlide == index ?  0 : this.currentSlide > index ? -this.screenW : this.screenW;
                    figures[index].style.transform = "translate("+(translateX+offset)+"px, 0px) translateZ(0px)";
                }
            }
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
            this.move(this.delta);
            if (Math.abs(this.delta) > 0) {
                e.preventDefault();
            }
        },
        onTouchEnd(e) {
            if(!this.dragging) return;
            let isQuickAction = new Date().getTime() - this.startTime < 1000;
            if ((this.delta > 100 || (isQuickAction && this.delta > 15)) && this.currentSlide > 0 ) {
                this.currentSlide--;
            } else if ((this.delta < -100 || (isQuickAction && this.delta < -15)) && this.currentSlide < this.items.length - 1) {
                this.currentSlide++;
            } 
            this.autoTransform(this.currentSlide);

            document.removeEventListener('touchmove', this.onTouchMove);
            document.removeEventListener('touchend', this.onTouchEnd);
            this.autoSwipe();
            this.dragging = false;
        },
        autoSwipe() {
            this.transitionDuration = "400ms";
            clearInterval(this.timer);
            this.timer = setInterval(()=>{
                this.currentSlide = (this.currentSlide + 1) % this.items.length;
                this.autoTransform(this.currentSlide);
            },3000);
        }
    },
    ready() {
    	this.autoSwipe();
    },
    beforeDestroy() {
    	clearInterval(this.timer);
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
