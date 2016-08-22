<template>
<div class="guide-list">
	<ul>
		<li class="item" v-for="guide in guides">
	        <a href="http://test.h5.8pig.com/guide.html?id={{guide.id}}">
	            <div class="img-box">
	                <div class="avatar">
	                	<c-img :options="{cdn:'ali', src:guide.avatar, width:60, scale:1}"></c-img>
	                </div>
	                <c-img :options="{cdn:'ali', src:guide.bgImg, width:guideBgImgW, scale:0.58, class:'bg'}"></c-img>
	            </div>
	            <h4>{{guide.nickname}}&nbsp;<span>{{guide.country.nameCn}}•{{guide.country.nameEn}}</span></h4>
	        </a>
	        <a href="http://test.h5.8pig.com/journey.html?id={{guide.recommend.id}}">
	            <div class="journey">我推荐的玩法:{{guide.recommend.name}}</div>
	        </a>
	        <a href="http://test.h5.8pig.com/guide.html?id={{guide.id}}">
	            <p>{{guide.journeyCount}}条旅行特色玩法&nbsp;&nbsp;{{guide.guideStatistic.commentCount}}条评价</p>
	            <div class="tags">
	                <ul>
	                    <li v-for="tag in guide.tags">{{tag.name}}</li>
	                </ul>
	            </div>
	        </a>
	    </li>
    </ul>
</div>
</template>
<script>
  import cImg from '../common/image';
  export default {
    props: ['guides'],
    components: {
    	cImg,
    },
    computed: {
      screenW() {
        return window.innerWidth>screen.availWidth?screen.availWidth:window.innerWidth;
      },
      guideBgImgW() {
        return this.screenW - 20;
      },
    },
  };
</script>
<style lang="scss" scoped>

.guide-list {
	background-color: #fff;

	.item {
    	margin:0 10px 20px;
    }

    .item + .item{
	    margin-top: -5px;
	}

	a {
	    display: block;
	    height: 100%;

	    &>p{
		    margin: 0;
		    font-size: 14px;
		    color: #999;
		}
	}

	.avatar {
	    position: absolute;
	    bottom:-32.5px;
	    right: 20px;
	    width: 65px;
	    height: 65px;
	    -webkit-border-radius:65px;
	    -moz-border-radius:65px;
	    border-radius:65px;
	    background-color: #fff;

	    img {
		    display: block;
		    margin:2.5px;
		    width: 60px;
		    height: 60px;
		    border-radius:60px;
		}
	}

	.img-box {
	    position: relative;

	    .bg{
		    width: 100%;
		    border-radius:5px;
		    vertical-align: top;
		}
	}

	h4 {
	    margin:8px 90px 14px 0;
	    line-height: 20px;
	    font-size: 18px;
	    color: #333;
	    white-space: nowrap;
	    overflow: hidden;

	    span{
		    font-size: 14px;
		    color: #999;
		}
	}

	.journey{
	    margin-bottom: 5px;
	    font-size: 16px;
	    color: #333;
	}

	.tags{
	    margin-top: 5px;

	    ul{
		    margin-left: -10px;
		    overflow: hidden;

		    li {
			    float: left;
			    margin: 0 0 5px 10px;
			    padding: 0 6px;
			    border: 1px solid #dcdcdc;
			    color: #b4b4b4;
			    line-height: 24px;
			    border-radius:5px;
			}
		}
	}
}


@media screen and (max-width: 342px) {
    .guide-list .item h4{
        font-size: 15px;

	    span {
	        font-size: 12px;
	    }
	    div {
	        font-size: 12px;
	    }
    }
}

</style>
