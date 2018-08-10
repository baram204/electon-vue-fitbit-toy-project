<template>
    <div>
        <h3>컴포넌트 페이지 입니다.{{newval}}</h3><br/>
        <router-link to="/basic">기초로 이동</router-link>
        <br/>
        <router-link to="/home">홈으로 이동</router-link>
        <br/>
        <router-link to="/basic/component">컴포넌트로 이동</router-link>
        <br/>
    </div>
</template>

<script>
  export default {
    name: 'Components',
    data () {
      return {
        newval: 'val'
      }
    },
    created () {
      alert('hello')
    }
  }
</script>

<style scoped>

</style>
