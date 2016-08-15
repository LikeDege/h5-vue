<template>
    <img v-lazy="imgUrl" width="{{imgWidth}}px" height="{{imgHeight}}px" class="{{options.class}}"/>
</template>
<script>
  export default {
    props: ['options'],
    computed: {
		imgUrl() {
            let imgUrl = this.options.src;
            if(this.options.cdn == 'ali') {
                imgUrl += '@';
                if(this.options.cX || this.options.cY || this.options.cW || this.options.cH) {
                    imgUrl += this.options.cX + '-' + this.options.cY + '-' + this.options.cW + '-' + this.options.cH + 'a_';
                }
                imgUrl += '1e_1c_' + this.imgWidth + 'w_' + this.imgHeight + 'h';
            } else if(this.options.cdn == 'qiniu'){
                imgUrl += '?';
                if(this.options.cX || this.options.cY || this.options.cW || this.options.cH) {
                    imgUrl += 'imageMogr2/crop/!' + this.options.cW + 'x' + this.options.cH + 'a' + this.options.cX + 'a' + this.options.cY + '|';
                }
                imgUrl += 'imageView2/1/w/' + this.imgWidth + '/h/' + this.imgHeight;
            }
            return imgUrl;
		},
        imgWidth() {
            return parseInt(this.options.width);
        },
        imgHeight() {
            return parseInt(this.options.width * (this.options.scale ? this.options.scale : 0.75));
        },
    },
  };
</script>
<style lang="scss">
</style>
