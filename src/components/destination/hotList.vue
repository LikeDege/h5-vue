<template>
<div class="hot-list">
	<ul>
        <li v-for="(idx,hotDest) in dests" v-if="idx < 6">
            <a href="http://test.h5.8pig.com/place.html?pid={{hotDest.destinationId}}">
                <img v-lazy="hotDest.imgUrl+'@1e_1c_'+hotDestImgW+'w'" class="bg" width="{{hotDestImgW}}" height="{{hotDestImgH}}" />
            </a>
            <div class="name">{{hotDest.nameCn}}</div>
        </li>
    </ul>
</div>
</template>
<script>
  export default {
    props: ['dests'],
    computed: {
      screenW() {
        return window.innerWidth>screen.availWidth?screen.availWidth:window.innerWidth;
      },
      hotDestImgW() {
        return parseInt((this.screenW - 40) / 3);
      },
      hotDestImgH() {
        return parseInt(this.hotDestImgW * 0.86);
      },
    },
  };
</script>
<style lang="scss" scoped>
.hot-list {
    width: 100%;
    background-color: #fff;

	ul {
	    width: 100%;
	    padding: 0 5px;

	    li {
		    float: left;;
		    width: 33.3%;
		    position: relative;
		    overflow: hidden;
		    padding: 0px;

		    a {
			    display: block;
			    padding: 5px;
			    overflow: hidden;
			    font-size: 0;

			    .bg {
				    width: 100%;
				    min-height: 80px;
				    min-width: 93px;
				    border-radius: 5px;
				    background-color:#f2f2f2;
			    }
		    }

		    .name {
			    margin: 10px 0;
			    text-align: center;
			    font-size: 18px;
			    color: #333;
			}
	    }
	}
}
</style>
