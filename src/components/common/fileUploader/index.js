import Vue from 'vue';
import crypto from 'crypto';
import { get } from '../../../common/ajax';
import plupload from './../../../libs/plupload.full.min';
import { CDN_TYPE, PIC_DOMAIN_OPTION, PIC_DOMAIN_PRIVATE } from '../../../common/conf';

export default Vue.component('file-uploader', {
    render(h) { return '' },
    props: {
            path: String,
            maxFileCount: Number,
            multiSelection: {
              type: Boolean,
              default: true,
            },
            isPrivate: {
              type: Boolean,
              default: false,
            },
            button: String,
            container: String,
    },
    data () {
        return {
            urls: {},
        }
    },
    computed: {
        picOption () {
            return this.isPrivate===true?PIC_DOMAIN_PRIVATE:PIC_DOMAIN_OPTION[CDN_TYPE-1]
        }
    },
    mounted () {
        let _this = this
        let uploader = new plupload.Uploader({
            url: _this.picOption.uploadUrl,
            container: _this.container,
            browse_button: _this.button,
            filters: {
                mime_types : [ //只允许上传图片
                    { title : "Image files", extensions : "jpg,png,jpeg" }
                ],
                prevent_duplicates : true //不允许选取重复文件
            },
            multipart: true,
            multipart_params: {
            },
            multi_selection: _this.multiSelection,
            max_retries: 0,
            resize: {
                preserve_headers: false
            },
            init: {
                FilesAdded: function(up, files){
                    let maxFileCount = this.maxFileCount || 5;
                    if (files.length > maxFileCount) {
                        // 删除
                        up.splice(0, up.files.length);
                        alert('最多只能选择' + maxFileCount + '张');
                        return;
                    }
                    _this.$emit('upload-start')
                    up.start()
                },
                BeforeUpload: function (up, file) {
                    _this.beforeUpload(up, file);
                },
                UploadProgress: function (up, file) {
                    _this.$emit('upload-progress', file.percent)
                },
                FileUploaded: function (up, file,response) {
                    let data = JSON.parse(response.response)
                    _this.uploadSuccess(file, data)
                },
                UploadComplete: function (up, files) {
                    _this.$emit('upload-complete', files)
                },
                Error: function (err) {
                    _this.uploadError(err)
                },
            }
        })
        uploader.init()
    },
    methods: {
        uploadSuccess (file, data) {
            this.$emit('upload-success', this.urls[file.id])
        },
        async beforeUpload (up, file) {
            let key = this.getFileName(file)
            this.urls[file.id] = this.picOption.appShowUrl + key
            let data = await get(this.picOption.tokenUrl, {})
            if (data && data.token) {
                data.key = key
                up.setOption('multipart_params', data)
            } else {
                up.setOption('multipart_params', undefined)
            }
        },
        getFileName (file) {
            let md5 = crypto.createHash('md5');
            md5.update(file.name + (+new Date));
            let start = file.name.lastIndexOf(".");
            return this.path + md5.digest('hex') + 
                    file.name.substr(start).replace(/(@.*$)|(\?.*$)/g,''); 
        },
        uploadError(err) {
            let errMsg
            switch (err.code) {
                case plupload.IMAGE_DIMENSIONS_ERROR:
                case plupload.FILE_SIZE_ERROR:
                    errMsg = '文件过大';
                    break;
                case plupload.FILE_EXTENSION_ERROR:
                    errMsg = '文件类型错误';
                    break;
                case plupload.IMAGE_FORMAT_ERROR:
                    errMsg = '图片格式错误';
                    break;
                case plupload.HTTP_ERROR:
                    errMsg = '网络错误';
                    break;
                case plupload.IO_ERROR:
                    errMsg = '文件读取错误';
                    break;
                case plupload.FILE_DUPLICATE_ERROR:
                    errMsg = '不能选取重复的文件';
                    break;
                default:
                    errMsg = '上传失败';
            }
            alert(errMsg)
            this.$emit('upload-error', err)
        },
    }
  })