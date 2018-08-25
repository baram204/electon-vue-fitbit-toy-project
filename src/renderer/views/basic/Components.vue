<template>
    <div>
        <md># 컴포넌트 페이지</md>
        <br/>
        <md>## 부모에서 하위 컴포넌트로 자료 전달</md>
        <br/>
        <child-component :toChild="fromParent" @></child-component>
        <vuep :template="temp" ></vuep>

        {{temp}}
    </div>
</template>

<script>
  import Vuep from '../../components/vuep/components/playground'
  import '../../components/vuep/style/vuep.css'

  var temp = require('./features.html')

  export default {
    name: 'Components',
    components: {
      'vuep': Vuep,
      // prop 을 통해 상위에서 하위로 데이터 전달
      'child-component': {
        props: ['toChild'],
        template: `<p>부모로부터 보내진 자료는 {{ toChild }} 입니다.</p>`
      }
    },
    methods: {
      printT (t) {
        this.t = t
      }
    },
    data () {
      return {
        fromParent: '부모로부터 온 자료',
        fromChild: '자식으로부터 온 자료',
        t: '',
        temp: temp,
        code: `
        <!-- dsefs-->
          <template>
          <div>템플릿</div>
          </template>`
      }
    }
  }
</script>

<style scoped>

</style>
