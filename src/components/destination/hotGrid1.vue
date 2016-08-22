<template>
<div class="hot-grid">
    <ul>
        <li v-for="(idx,hotDest) in hotDests">
            <a v-link="{ name: 'journeyList', query: { destId: hotDest.destinationId, destName: hotDest.nameCn, journeyType: journeyType, searchBy: 'journeyType' }}">
                <div class="cn">{{hotDest.nameCn}}</div>
                <div class="en">{{hotDest.nameEn}}</div>
            </a>
        </li>
    </ul>
</div>
</template>
<script>
  export default {
    props: ['hotDests','journeyType'],
  };
</script>
<style lang="scss" scoped>
.hot-grid {
    padding: 5px;
    overflow: hidden;

	ul li {
	    float: left;
	    width: 33.3%;
	    padding: 5px;

	    a {
		    display: block;
		    height: 100%;
		    text-align: center;
		    background-color: #fff;
		    -webkit-border-radius:5px;
		    -moz-border-radius:5px;
		    border-radius:5px;

		    .cn{
			    margin: 0;
			    padding-top: 5px;
			    line-height: 24px;
			    font-size: 14px;
			    color: #666;
			}

			.en{
			    margin: 0;
			    font-size: 12px;
			    color: #c8c8c8;
			    padding-bottom: 5px;
			}
		}
	}
}

</style>
