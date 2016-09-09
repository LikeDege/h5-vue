<template>
    <img v-lazy="imgUrl" :style="{width: imgWidth+'px', height: imgHeight+'px'}" :class="[options.class]"/>
</template>
<script>
  export default {
    props: ['options'],
    computed: {
		imgUrl() {
            let {cdn,src,cX,cY,cW,cH,e,c,l} = this.options;
            let width = this.imgWidth * 2,height=this.imgHeight * 2;
            // 转number类型
            (cX = +cX,cY = +cY,cX = +cY,cX = +cY);
            if(cdn === undefined) {
                if(src.indexOf('pic.8pig.com') > -1) {
                    cdn = 'ali';
                } else if(src.indexOf('pic2.8pig.com') > -1) {
                    cdn = 'qiniu';
                }
            }
            // 阿里OSS 图片服务地址：https://help.aliyun.com/document_detail/32217.html?spm=5176.doc32206.6.481.U6maCU
            if(cdn == 'ali') {
                src += '@';
                // 先裁剪指定区域
                if(cX || cY || cW || cH) {
                    cW = cW > 4096 ? 4096 : cW;
                    cH = cH > 4096 ? 4096 : cH;
                    src += cX + '-' + cY + '-' + cW + '-' + cH + 'a_';
                }
                width > 0 && (src+=(width > 4096 ? 4096 : width) + 'w_');
                height > 0 && (src+=(height > 4096 ? 4096 : height) + 'h_');
                e !== undefined && (src+=e + 'e_');
                c !== undefined && (src+=c + 'c_');
                l !== undefined && (src+=l + 'l');
                src.lastIndexOf('_') == src.length - 1 && (src = src.slice(0, src.length-1));
            } else if(cdn == 'qiniu'){ //七牛 图片服务地址：http://developer.qiniu.com/article/index.html#dora-api-handbook
                src += '?';
                // 先裁剪指定区域
                if(cX || cY || cW || cH) {
                    src += 'imageMogr2/crop/!' + cW + 'x' + cH + 'a' + cX + 'a' + cY + '|';
                }
                if(width > 0 || height > 0) {
                    // 只指定宽度或高度时，使用模式2，模式1等比缩放并居中裁剪，模式3等比缩放不裁剪
                    src += 'imageView2/' + (width > 0 && height > 0 ? (c == 1 ? 1 : 3) : 2);
                    width > 0 && (src+='/w/' + width);
                    height > 0 && (src+='/h/' + height);
                }
                src.lastIndexOf('|') == src.length - 1 && (src = src.slice(0, src.length-1));
            }
            return src;
		},
        imgWidth() {
            return parseInt(+this.options.width);
        },
        imgHeight() {
            return parseInt(+this.options.width * (this.options.scale ? this.options.scale : 0.75));
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
