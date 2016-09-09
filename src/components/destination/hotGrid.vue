<template>
<div class="hot-grid">
	<ul>
        <li v-for="(hotDest, idx) in dests" v-if="idx < 6">
   		 	<router-link :to="{ name: 'journeyList', query: { destId: hotDest.destinationId, destType: hotDest.type, destName: hotDest.nameCn, searchBy: 'destination' } }">
                <c-img :options="{src:hotDest.imgUrl, class:'bg', width:hotDestImgW, scale:0.86, e:1, c:1}"></c-img>
            </router-link>
            <div class="name">{{hotDest.nameCn}}</div>
        </li>
    </ul>
</div>
</template>
<script>
  import cImg from '../common/image';
  export default {
    props: ['dests'],
    components: {
    	cImg,
    },
    computed: {
      screenW() {
        return window.innerWidth>screen.availWidth?screen.availWidth:window.innerWidth;
      },
      hotDestImgW() {
        return parseInt((this.screenW - 40) / 3);
      },
    },
  };
</script>
<style lang="scss" scoped>
.hot-grid {
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
