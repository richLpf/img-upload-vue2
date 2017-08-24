# img-upload-vue2

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run e2e tests
npm run e2e

# run all tests
npm test
```
# 结合腾讯云cos开发的接口，进行图片上传，回调;图片种类为png/jpeg/jpg

# install & Useage

- As global component
import Vue from 'vue'
import uploadImg from 'uploadImg'
Vue.component('uploadImg',uploadImg)

- As partial component
// in some component
import uploadImg from 'uploadImg'
export default {
  components: {
    uploadImg
  }
}

# Sample
<uploadImg :url="'https://file.fengrongwang.com/cos/get_sign.jsonp'" :savePath="'/lpf/test/'" :imgWidth="'300px;'"></uploadImg>

# Props
| Name     |   Type   | Description | Optional value | Default |
|----------|  :----:  |-------------|----------------|---------|
| url      |    ——    |             |                |         |
| savePath |  String  |             |   /temp/pi/    |         |
| imgWidth |  String  |   >=200px   |    260px       |         |
| imgHeight|  String  |   >=120px   |    150px       |         |





For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
