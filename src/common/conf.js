export const TEST_API_DOMAIN = "http://api3.8pig.com";
export const PROD_API_DOMAIN = "";
export const TEST_API = TEST_API_DOMAIN + "/8pig-api";
export const PROD_API = PROD_API_DOMAIN + "/8pig-api";
export const API = process.env.NODE_ENV === "production" ? PROD_API : (process.env.NODE_ENV === "testing" ? TEST_API : "/8pig-api");
export const WX_LOGIN_API = API + "/wechatservice/login?state=";

export const CDN_TYPE = 2; //1阿里,2七牛

export const PIC_DOMAIN_OPTION = [
    {
        uploadUrl: 'http://pic.8pig.com',
        showUrl: 'http://pic.8pig.com/',
        tokenUrl: 'http://api.8pig.com/front/aliyun/uptoken?key=',
        appShowUrl: 'http://pic.8pig.com/'
    },
    {
        uploadUrl: 'http://upload.qiniu.com',
        showUrl: 'http://pic2.8pig.com/',
        tokenUrl: 'http://api.8pig.com/front/qiniu/uptoken',
        appShowUrl: 'http://pic.8pig.com/'
    }
]
export const PIC_DOMAIN_PRIVATE = {
    uploadUrl: 'http://8pig-private.oss-cn-shenzhen.aliyuncs.com',
    showUrl: 'http://api.8pig.com/8pig-api/common/private/img?imgUrl=',
    tokenUrl: 'http://api.8pig.com/front/aliyun/uptoken?key=',
    appShowUrl: 'http://api.8pig.com/8pig-api/common/private/img?imgUrl='
}