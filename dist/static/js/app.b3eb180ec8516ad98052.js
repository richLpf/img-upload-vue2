webpackJsonp([1],[,,function(t,e,i){function n(t){i(10)}var a=i(0)(i(4),i(17),n,null,null);t.exports=a.exports},,function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(15),a=i.n(n);e.default={name:"app",components:{uploadImg:a.a}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n;e.default={name:"uploadImg",props:{url:{default:"",type:String},savePath:{default:"/temp/pic/",type:String},imgWidth:{default:"260px",type:String},imgHeight:{default:"150px",type:String}},data:function(){return{file:"",fileList:[],uploading:!1,status:"ready",percent:0,src:"",errText:"",cosObj:{sign:"",appid:"",bucket:"",region:""},percentComplete:Number,showImgList:[]}},methods:{preventDefaultEvent:function(t){document.addEventListener(t,function(t){t.preventDefault()},!1)},handleFileChange:function(t){var e=this.$refs.inputer;this.file=e.files,this.submit()},addDropSupport:function(){var t=this;this.$refs.box.addEventListener("drop",function(e){e.preventDefault(),t.file=e.dataTransfer.files,t.submit()})},submit:function(){var t=this;if(this.errText="",this.fileList=[],0!==this.file.length){for(var e=0;e<this.file.length;e++)this.fileList.push(this.file[e]);var i=new FormData;this.fileList.forEach(function(e){if(console.info("item",e.name),!/\.(jpg|jpeg|png|JPG|PNG)$/.test(e.name))return void(t.errText="仅支持png,jpeg,jpg格式图片");i.append(e.name,e),t.httpRequest(e)})}},httpRequest:function(t){var e=this;e.percentComplete=0,n.uploadFile(function(t){var i=t.data.source_url;e.showImgList.push(i)},function(t){t=t||{},e.errText=t.responseText||"error"},function(t){e.uploading=!0,e.percentComplete=Math.floor(100*t)/100,1==t&&(e.uploading=!1)},this.cosObj.bucket,this.getNewName(t),t,0)},getNewName:function(t){var e="";e+=this.savePath;for(var i="ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",n=i.length,a=0;a<12;a++)e+=i.charAt(Math.floor(Math.random()*n));var s=t.name.split(".");return e+="."+s[s.length-1]},upload:function(){var t=this;t.$jsonp(t.url,null,function(e,i){e?console.info("err",e):(t.cosObj.sign=i.sign,t.cosObj.appid=i.appid,t.cosObj.bucket=i.bucket,t.cosObj.region=i.region,n=new CosCloud({appid:t.cosObj.appid,bucket:t.cosObj.bucket,region:t.cosObj.region,getAppSign:function(e){e(t.cosObj.sign)}}))})},toDelate:function(t){this.removeByValue(this.showImgList,t)},removeByValue:function(t,e){for(var i=0;i<t.length;i++)if(t[i]==e)return t.splice(i,1),t}},mounted:function(){var t=this;return this.upload(),["dragleave","drop","dragenter","dragover"].forEach(function(e){t.preventDefaultEvent(e)}),this.addDropSupport(),parseInt(this.imgWidth)<200?void(this.errText="上传框宽度不能小于200px"):parseInt(this.imgHeight)<120?void(this.errText="上传框高度不能小于120px"):void 0}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(3),a=i(2),s=i.n(a),r=i(1),o=i.n(r);n.a.prototype.$jsonp=o.a,n.a.config.productionTip=!1,new n.a({el:"#app",template:"<App/>",components:{App:s.a}})},,,function(t,e){},function(t,e){},,,function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABTElEQVRYR+1XwVEDMRCTKoASQgWECoAKgAoIHUAFQAWEDpIKCBVACZSQdJAOxChjM77kAj7fDfnYT89aq9XuzWmJAx/2yS/pHsARgDXJ1xKsYgIh+UuS9JLkZ1cSfQg8AXgcjICkCwBvAI67VlEQvwZwRnL5o0CLpAW4nZ7ckZylBFz5JCgwAnAb4OYAlp2gm8FtWB7aqcNaZyC04yPg7AyXpJHl2yYlaUzyK73/C6szAUlOcArghuQiJkta+E7yOrn3bO0tpoSAAvgzSX8JmyPJn+D5RlYybW0lUBWoClQFqgJVgarAvykwCy5qRdIuKP6mBydgszEGMCVpcxkT2dJ5T1ikrmgIR+TKHtJkuf7Q1g2Ad4fokHbsXY4jys2XE3ey7SX3LiaS7PeuclAzY+Yk7bob59fNKPTPQ9T3NOYiBStezfoyiu8PTuAbzjSoMCCGlqwAAAAASUVORK5CYII="},function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAgCAYAAACLmoEDAAACS0lEQVRYR7WY/VECQQzF31agVKBWIFagVqBUoFRgrECt4EIFSgVCBUoFagVqBWIFOG9njzmOw9mPXGYY+WMv9yObvCQ6GJiIDAFcAeBffvYBLAG8h89UVfm9yFzJ0yJyCKACcBnhZwbgVlW/Is52HsmGFZEzAM8hirHvZ7RHqvoa+0DzXBZsAH3JeWF45jwHOBk2XP1bYkTbv4sRPklNiRzYp1BMBYH1j7LorlOcJMGGqmdUrYzRjVaJVNh7AHdWpAAeVJU+oywVllV8GuU57tBCVakqUZYK+1NYWFuFpqqDKFIAqbCrWMex51Q1mmHnwaClF6E7sVP1bexs7HLzXRq8BRt09BFAdC718CtYG+O2Dm/AZrbQHli9y63WvIY11NBfAEwbCj6HnFJba7GHFRGOdJ9Glc5BhblHvxZSxwgfqeqyhlUAN6UhCMWxHhdD/rND7RX6nqiquBBV6mep8fqH7aIQETFKhwFhmVus/lLjYM0b2jKjdBgT1mKK+rdtGqXDnLClRdB5/e3wGqTDwgJ25/V3AJcEphg2aWoK6UCJzDEPW5Kz1L+kbVVEcmVySljqIrfUZHPOUUk2YKuqWtSOKIvOueOm49VqRSmLWd3bPKNaZ/nCUuH2zpsjn8EWXAP7Fl53MLN1pSdYv/40ZwNW6saVJedFP5H94Li6ng3C0MH/URG4KB2MI8vrJ6jfgNvzLIE5MR3kRNU4Z79ZiM1VvWtT4LjIHM6awowiOyEDr74ZtP92MA7QlBh++D0q2pmwjGK9g812afcfrYj0UYjDjy8AAAAASUVORK5CYII="},function(t,e,i){function n(t){i(9)}var a=i(0)(i(5),i(16),n,null,null);t.exports=a.exports},function(t,e,i){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{overflow:"hidden"}},[n("div",{staticClass:"uploadImg"},[n("div",{ref:"box",staticClass:"img-inputer",style:"width:"+t.imgWidth+";height:"+t.imgHeight+";"},[n("img",{staticClass:"upload-pic",attrs:{src:i(14)}}),t._v(" "),n("p",{staticClass:"img-inputer-tit"},[t._v("点击或拖拽选择图片")]),t._v(" "),n("label",{staticClass:"img-inputer__label",attrs:{for:"xFile"}}),t._v(" "),n("input",{ref:"inputer",attrs:{type:"file",id:"xFile",multiple:"multiple",accept:"image/png,image/jpeg"},on:{change:t.handleFileChange}}),t._v(" "),n("transition",{attrs:{name:"vip-fade"}},[t.errText.length?n("div",{staticClass:"img-inputer-err"},[t._v(t._s(t.errText))]):t._e()]),t._v(" "),t.uploading?n("div",{staticClass:"progress-bar"},[n("div",{staticClass:"pro-bar-box"},[n("div",{staticClass:"pro-bar",style:"width:"+180*t.percentComplete+"px;"},[t._v(t._s(100*t.percentComplete+"%"))])])]):t._e()],1)]),t._v(" "),n("div",{staticClass:"imgWrap"},t._l(t.showImgList,function(e){return n("div",{staticClass:"imgBox",on:{click:function(i){t.toDelate(e)}}},[n("img",{style:"width:"+t.imgWidth+";height:"+t.imgHeight+";",attrs:{src:e,alt:""}}),t._v(" "),t._m(0,!0)])}))])},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{staticClass:"delate-shadow"},[n("img",{staticClass:"delate",attrs:{src:i(13),alt:"删除",title:"删除"}})])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"app"}},[i("uploadImg",{attrs:{url:"https://file.fengrongwang.com/cos/get_sign.jsonp",savePath:"/lpf/test/",imgWidth:"260px;"}})],1)},staticRenderFns:[]}}],[6]);
//# sourceMappingURL=app.b3eb180ec8516ad98052.js.map