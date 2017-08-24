<template>
  <div id="app">
    <uploadImg :url="'https://file.fengrongwang.com/cos/get_sign.jsonp'" :savePath="'/lpf/test/'" :imgWidth="'260px;'"></uploadImg>
  </div>
</template>

<script>
import uploadImg from './components/uploadImg'


export default {
  name: 'app',
  components: {
    uploadImg
  }
}
</script>

<style>

</style>
