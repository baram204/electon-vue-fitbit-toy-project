<template>
    <!-- keep-alive 는 컴포넌트 변경되어도 파괴 후 새로 만들지 않고
    이전 계속 유지한다. 즉, 뭘 해놓으면 상태가 유지된다.-->
    <!--<div>-->
    <!--<keep-alive>-->
    <!--<div>-->
        <!--<div>{{$route.params}}</div>-->
        <component :is="dynamicComponent"></component>
    <!--</div>-->
    <!--</keep-alive>-->
    <!--</div>-->
</template>

<script>
  export default {
    name: 'BasicRenderComp',
    components: {
      'first': require('@/views/basic/First').default,
      // 'project': require('@/views/basic/project').default,
      'instance': require('@/views/basic/Instance').default,
      'components': require('@/views/basic/Components').default,
      // 'router': require('@/views/basic/router').default,
      // 'axios': require('@/views/basic/axios').default,
      // 'template': require('@/views/basic/template').default,
      // 'excercise': require('@/views/basic/excercise').default,
      'vuex': require('@/views/basic/Vuex').default
      // 'webpack': require('@/views/basic/webpack').default
    },
    computed: {
      dynamicComponent () {
        // 파라미터 한개로 동적 렌더링 하려면.. 위에 components 등록하고 아래처럼 호출하면 됨
        return this.$route.params.name
      }
    }
    // created () {
    //   this.BasicRenderComp = '' + this.$route.params.name
    // }

  }
</script>

<style scoped>

</style>
