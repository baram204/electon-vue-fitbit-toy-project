<template>
    <!-- keep-alive 는 컴포넌트 변경되어도 파괴 후 새로 만들지 않고
    이전 계속 유지한다. 즉, 뭘 해놓으면 상태가 유지된다.-->
    <!--<div>-->
    <!--<keep-alive>-->
    <div>
        <div>{{$route.params}}</div>
        <component :is="dynamicComponent"></component>
    </div>
    <!--</keep-alive>-->
    <!--</div>-->
</template>

<script>
  export default {
    name: 'AdvanceRenderComp',
    components: {
      'fitbit': require('@/views/excercise/fitbit').default
      // 'project': require('@/views/advance/project').default,
      // 'instance': require('@/views/advance/instance').default,
      // 'component': require('@/views/advance/component').default,
      // 'router': require('@/views/advance/router').default,
      // 'axios': require('@/views/advance/axios').default,
      // 'template': require('@/views/advance/template').default,
      // 'excercise': require('@/views/advance/excercise').default,
      // 'vuex': require('@/views/advance/vuex').default,
      // 'webpack': require('@/views/advance/webpack').default
    },
    computed: {
      dynamicComponent () {
        // 파라미터 한개로 동적 렌더링 하려면.. 위에 components 등록하고 아래처럼 호출하면 됨
        return this.$route.params.name
      }
    }
    // created () {
    //   this.AdvanceRenderComp = '' + this.$route.params.name
    // }

  }
</script>

<style scoped>

</style>
