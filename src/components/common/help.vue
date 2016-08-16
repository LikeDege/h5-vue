<template>
  <div class="help">
    <ul>
      <li><a href="http://test.h5.8pig.com/flow.html"><i class="icon-booking"></i><p>预定流程</p></a></li><li>
      <a href="http://test.h5.8pig.com/faq.html"><i class="icon-faq"></i><p>常见问题</p></a></li><li>
      <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.android.pig.travel"><i class="icon-download"></i><p>下载APP</p></a></li><li>
      <a href="http://test.h5.8pig.com/security.html"><i class="icon-security"></i><p>安全保障</p></a></li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  .help {
    ul {
      width: 100%;
      background-color: #fff;
      border-bottom: 1px solid #eaeaea;

      li {
        position: relative;
        float: left;
        width: 50%;
        border-top:1px solid #eaeaea;

        &:nth-child(odd){
            border-right: 1px solid #eaeaea;
        }

        a {
            display: block;
            height: 50px;
            line-height: 50px;
            text-align: center;

          i {
            display: inline-block;
            width: 30px;
            height: 30px;
            background: url("http://pic.8pig.com/img/h5/new/common/sprite.png") no-repeat;
            background-size:128px 116px;
            vertical-align: middle;

            &.icon-booking {
               background-position: 0 -54px;
            }

            &.icon-faq {
              background-position: -30px -54px;
            }

            &.icon-download {
              background-position: -60px -54px;
            }

            &.icon-security {
              background-position: -90px -54px;
            }
          }

          p {
              display: inline-block;
              margin: 0;
              font-size: 18px;
              color: #333;
          }
        }
      }
   }
 }

</style>
