<template>
	<div class="search-box">
	    <i class="icon icon-search">&#xe602;</i>
	    <input type="text" class="search-text" placeholder="想去哪里?"/>
	    <a class="cancel"><i class="icon icon-cancel">&#xe637;</i></a>
	</div>
</template>
<style lang="scss" scoped>
	.search-box {
	    position: relative;
	    padding: 8px 10px;
	    background-color: #fff;

	    .icon-search {
		    position: absolute;
		    top: 17px;
		    left: 22px;
		    height: 16px;
		    line-height: 16px;
		    font-size: 16px;
		    color: #999;
		}

		.search-text {
		    width: 100%;
		    height: 34px;
		    padding-left: 35px;
		    font-size: 16px;
		    background-color: #eaeaea;
		    color: #333;
		    border: 0;
		    -webkit-border-radius:25px;
		    -moz-border-radius:25px;
		    border-radius:25px;
		    outline: none;

			&::-webkit-input-placeholder {
			    color:#999;
			}
		}

		.cancel {
		    position: absolute;
		    top: 17px;
		    right: 20px;
		}

		.icon-cancel {
		    height: 16px;
		    line-height: 16px;
		    font-size: 16px;
		    color: #999;
		}
	}
</style>