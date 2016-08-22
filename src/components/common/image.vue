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
                imgUrl += '1e_1c_' + this.imgWidth * 2 + 'w_' + this.imgHeight * 2 + 'h';
            } else if(this.options.cdn == 'qiniu'){
                imgUrl += '?';
                if(this.options.cX || this.options.cY || this.options.cW || this.options.cH) {
                    imgUrl += 'imageMogr2/crop/!' + this.options.cW + 'x' + this.options.cH + 'a' + this.options.cX + 'a' + this.options.cY + '|';
                }
                imgUrl += 'imageView2/1/w/' + this.imgWidth * 2 + '/h/' + this.imgHeight * 2;
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
<style lang="scss" scoped>
img {
    transition:all 0.4s linear;
}

img[lazy=loading] {
    opacity: .3;
}

img[lazy=loaded] {
    opacity: 1;
}
</style>
