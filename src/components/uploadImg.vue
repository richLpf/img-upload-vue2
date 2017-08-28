<template>
  <div style='overflow:hidden;'>
    <div class='uploadImg'>
      <div class='img-inputer' :style="'width:'+ imgWidth+';height:'+imgHeight+';'" ref='box'>
        <img class='upload-pic' src='../assets/upload.png'>
        <p class='img-inputer-tit'>点击或拖拽选择图片</p>
        <label for="xFile" class="img-inputer__label"></label>
          <input
          type="file"
          id="xFile"
          multiple="multiple"
          accept="image/png,image/jpeg"
          @change='handleFileChange'
          ref='inputer'>
        <transition name="vip-fade">
            <div class="img-inputer-err" v-if="errText.length">{{errText}}</div>
        </transition>
        <div class='progress-bar' v-if='uploading'>
            <div class='pro-bar-box'>
               <div class='pro-bar' :style="'width:'+(percentComplete*180)+'px;'">{{(percentComplete*100)+'%'}}</div>
            </div>
        </div>
      </div>
    </div>
    <div class='imgWrap'>
      <div class='imgBox' v-for='imgItem in showImgList' @click="toDelate(imgItem)">
        <img :src="imgItem" :style="'width:'+ imgWidth+';height:'+imgHeight+';'" alt="">
        <span class='delate-shadow'>
          <img class="delate" src="../assets/delate.png" alt="删除" title='删除'>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
var cos;
  export default {
    name:'uploadImg',
    props:{
      url:{
        default:'',
        type:String
      },
      savePath:{
        default:'/temp/pic/',
        type:String
      },
      imgWidth:{
        default:'260px',
        type:String
      },
      imgHeight:{
        default:'150px',
        type:String
      }
    },
    data () {
      return {
        file:'',
        fileList:[],
        uploading:false,
        status:'ready',
        percent:0,
        src:'',
        errText:'',
        cosObj:{
          sign:'',
          appid:'',
          bucket:'',
          region:''
        },
        percentComplete:Number,
        showImgList:[]
      }
    },
    methods:{
      //阻止默认事件
      preventDefaultEvent(eventName){
        document.addEventListener(eventName,function(e){
          e.preventDefault();
        },false);
      },
      //选择要上传的图片
      handleFileChange (e) {
        let inputDOM = this.$refs.inputer;
        this.file = inputDOM.files;
        this.submit();
      },
      addDropSupport () {
        let Box = this.$refs.box;
        Box.addEventListener('drop',(e)=>{
          e.preventDefault();
          this.file = e.dataTransfer.files;
          this.submit();
        })
      },
      //生成要上传的图片列表
      submit(){
        if(!this.url){
          this.errText = "请填写需要上传的腾讯云url";
          return
        }
        this.errText = ''
        this.fileList = [];
        if(this.file.length === 0){
          return 
        }else{
          for(let i=0;i<this.file.length;i++){
            this.fileList.push(this.file[i]);
          }
        }
        //初始化一个formData数据
        const formData = new FormData()
        this.fileList.forEach((item)=>{
          console.info('item',item.name)
          if(!/\.(jpg|jpeg|png|JPG|PNG)$/.test(item.name)){
            this.errText = '仅支持png,jpeg,jpg格式图片'
            return
          }
          formData.append(item.name,item)
          this.httpRequest(item)
        })  
      },
      httpRequest (file) {
        var _this = this;
        _this.percentComplete = 0;
        cos.uploadFile(function (result) {
          var imgUrl = result.data.source_url;
          _this.showImgList.push(imgUrl);

        }, function (result) {
          result = result || {};
          _this.errText = result.responseText || 'error';

        }, function (curr) {
          _this.uploading = true;
          _this.percentComplete = Math.floor(curr*100)/100;
          if(curr==1){
            _this.uploading = false;
          }
        }, 
        this.cosObj.bucket, this.getNewName(file), file, 0);
      },
      getNewName (file) {
        var name = '';
        name += this.savePath;
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        var maxPos = $chars.length;
        for(let i=0;i<12;i++){
          name += $chars.charAt(Math.floor(Math.random()*maxPos));
        }
        var arr = file.name.split(".")
        var postfix = arr[arr.length - 1]

        name += '.' + postfix
        return name;
      },
      upload () {
        if(!this.url){
          return
        }
        var _this = this;
        _this.$jsonp(_this.url,null,function(err,data){
          if(err){
            //如果验证失败
            console.info('err',err)
          }else{
            _this.cosObj.sign = data.sign;
            _this.cosObj.appid = data.appid;
            _this.cosObj.bucket = data.bucket;
            _this.cosObj.region = data.region;

            cos = new CosCloud({
              appid:_this.cosObj.appid,
              bucket:_this.cosObj.bucket,
              region:_this.cosObj.region,
              getAppSign:function(cb){
                cb(_this.cosObj.sign);
              }
            })
          }
        })
      },
      toDelate (demo) {
        this.removeByValue(this.showImgList,demo);
      },
      removeByValue(arr, val) {
        for(var i=0; i<arr.length; i++) {
          if(arr[i] == val) {
            arr.splice(i, 1);
            return arr;
          }
        }
      }
    },
    mounted () {
      //首先腾讯云验证
      this.upload();
      //阻止冒泡
      ['dragleave','drop','dragenter','dragover'].forEach(e=>{
        this.preventDefaultEvent(e);
      });
      this.addDropSupport();
      if(parseInt(this.imgWidth)<200){
        this.errText = '上传框宽度不能小于200px'
        return
      }
      if(parseInt(this.imgHeight)<120){
        this.errText = '上传框高度不能小于120px'
        return
      }
    }
  }
</script>
<style>
  @import '../assets/main.css'
</style>
