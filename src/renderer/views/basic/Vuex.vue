<template>
    <div>
        <md># 뷰엑스</md>
        <md></md>
        <md>### 설치</md>
        <md></md>
        <hl language="javascript" :code="install"></hl>
        <md></md>
        <md>### 초기화</md>
        <md></md>
        <md>일반</md>
        <hl language="javascript" :code="initialize1"></hl>
        <md></md>
        <md>전역 인스턴스에 넣어줌</md>
        <hl language="javascript" :code="initialize2"></hl>
        <md></md>
        <md>### 저장소 Store</md>
        <md></md>
        <md>보통 설치하면 `/src/store.js`가 뷰엑스 파일.
            vue-electron 에서는 `/src/renderer/store/index.js`가 뷰엑스 파일.
            여기다가 자료, 뮤테이션, 액션, 개터 그리고 다른 것들을 정의한다.
        </md>
        <md>일단 Store 를 만들어 보자</md>
        <md></md>
        <md>`/src/renderer/store/index.js`</md>
        <hl language="javascript" :code="createStore"></hl>
        <md></md>

        <md>### 상태 State</md>
        <md></md>
        <md>먼저 상태를 저장해보자.</md>
        <hl language="javascript" :code="setState"></hl>
        <md></md>

        <md>#### 상태 접근</md>
        <md></md>
        <md>그리고 접근을 해보자.</md>
        <md></md>
        <md></md>
        <hl language="javascript" :code="`import { state } from 'vuex'`"></hl>
        <md>일반 초기화 시 그냥 store.state.name 변수 사용</md>
        <md></md>
        <hl language="javascript" :code="`store.state.name // 지훈`"></hl>
        <md></md>
        <md>전역 인스턴스로 초기화 해서 전역의 this.$store.state.name 내부에 있을 때</md>
        <hl language="javascript" :code="`this.$store.state.name // 지훈`"></hl>
        <b-card title="결과"> {{this.$store.state.name}}</b-card>
        <br/>
        <md>#### MapState 로 좀 덜 치자</md>
        <md></md>
        <p>매번 <b-badge>store</b-badge> 나 <b-badge>this.$store</b-badge> 를 치기 귀찮다면 방법이 있다.</p>
        <md></md>
        <hl language="javascript" :code="`
<script>
    import { mapState } from 'vuex'

    export default {
      name: 'HelloWorld',
      computed: mapState([
        'title'
      ])
    }
</script>
        `"></hl>
        <p>위처럼 하면 this.title 로 할 수 있다.</p>
        <p>만약 여러 개를 에디터가 없으니 코드고 뭐고 html 이랑 여러 태그를 써야 하니 작성하는데 시간이 너무 걸린다. 그냥 .. 구현만 하자.</p>
    </div>
</template>

<script>
  export default {
    name: 'Vuex',
    data () {
      return {
        install: 'npm install vuex --save',
        initialize1: 'import Vue from \'vue\'\n' +
          'import Vuex from \'vuex\'\n' +
          'Vue.use(Vuex)',
        initialize2: `
new Vue({
    components: {App},
    store,
    template: '<App/>'
}).$mount('#app')`,
        createStore: `
export default new Vuex.Store({
  state: {
    // 현재 상태
    title: '뷰엑스에 저장된 title 변수'
  },
  getters: {
    // 현재 상태를 기반으로 지연 계산된 상태, vue 의 computed 속성과 비슷하다.
  },
  mutations: {
    // 현재 상태를 변형(mutate)한다.
  },
  actions: {
    // 서버로부터 자료를 가져와서, 현재 상태를 변형하기 위해 mutations 로 보낸다.
  }
})

// store 변수에 Vuex.Store 를 저장한 다음에 내보내서
 export const store = new Vuex.Store({})
// 요렇게 가져다가 쓸 수도 있다.
import { store } from '/path/to/file'
`,
        setState: `
state:{
  name:'지훈',
  age:20,
  dob:'2017/04/08/'
 }`,
        accessState1: `store.state.name // Alicia Vikander`,
        accessState2: `this.$store.state.name // Alicia Vikander`
      }
    }
    // computed: mapState([
    //   'title'
    // ]]
  }
</script>

<style scoped>

</style>