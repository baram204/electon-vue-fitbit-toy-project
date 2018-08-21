<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'vue-elec-prac'
  }
</script>

<style lang="scss">

  @import '~bootstrap/dist/css/bootstrap.css';
  @import '~bootstrap-vue/dist/bootstrap-vue.css';
  // Import Main styles for this application
  @import './assets/scss/style';

  // for CodeMirror height shrink
  // https://github.com/surmon-china/vue-codemirror/issues/48
  // https://codemirror.net/demo/resize.html

  .CodeMirror {
    border: 1px solid #eee;
    height: auto;
  }


</style>
