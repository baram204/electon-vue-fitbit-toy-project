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
        <p>매번
            <b-badge>store</b-badge>
            나
            <b-badge>this.$store</b-badge>
            를 치기 귀찮다면 방법이 있다.
        </p>
        <md></md>
        <hl language="javascript" :code="`
<script>
    import { mapState } from 'vuex'

    export default {
      name: 'HelloWorld',
      computed: mapState([
        'name'
      ])
    }
</script>
        `"></hl>
        <p>위처럼 하면 this.name 이라는 계산된 속성을 호출해서, 내부에 담긴 name 값을 가져올 수 있다.</p>
        <br/>
        <p>맵 스테이트로 여러개의 변수를 가져온 다음, 그것을 비구조화 연산자를 통해서 한꺼번에 할당할 수도 있다.</p>
        <br/>
        <hl language="javascript" :code="`
<script>
    import { mapState } from 'vuex'

    export default {
      name: 'HelloWorld',
      computed: ...mapState([
        'name','age','dob'
      ])
    }
</script>
        `"></hl>

        <hl language="javascript" :code="`<p>{{this.name}}, {{this.age}}, {{this.dob}}</p>`"></hl>
        <b-card title="결과">
            <p>{{this.name}}, {{this.age}}, {{this.dob}}</p>
        </b-card>
        <p>자 여기까지 하면 다 된 거 같은데, 해당 변수를 수정하려면 뮤테이트를 사용해야 한다.</p>

        <md>## 변이 Mutation</md>

        <p>뮤테이트는 스테이트를 수정할 권리를 가진 객체다.</p>
        <hl language="javascript" :code="`
updateName(state, name) => {
   state.name = name
  }
        `"></hl>
        <p>State 매개변수는 현재 어플리케이션의 스테이트. Payload 는 선택적인 매개변수인데 변경할 자료를 주는 추가적인 것이다.</p>

        <hl language="javascript" :code="`
  state: {
    // 현재 상태
    name: '지훈',
    age: 20,
    dob: '20/08/1990'
  },
  mutations: {
    // 현재 상태를 변형(mutate)한다.
    updateName (state, name) {
      state.name = name
    }
  },
        `
"></hl>

        <md>#### 뮤테이션 호출</md>
        <md></md>
        <md>store 객체로 호출 가능하다.</md>
        <md></md>
        <hl language="javascript" :code="`store.commit('updateName','Alicia')'`"></hl>
        <p>객체 스타일로 호출</p>
        <hl language="javascript" :code="`
store.commit({
  type: 'updateName',
  name: 'Alicia'
})`"></hl>
        <p>이거보다 편한 호출방법이 있을까? 있다. mapMutation!</p>
        <hl language="javascript" :code="`import { mapMutations } from 'vuex'`"></hl>
        <p></p>
        <hl language="javascript" :code="`
methods:{
   ...mapMutations(['updateName'])
  }
// this.updateName('Alicia') 하면 store 내부의 뮤테이션을 호출하고, 그럼 state 가 갱신된다.
`"></hl>
        <p>실제 사용할 이름은 새로 지어줄 수 있다.</p>
        <hl language="javascript" :code="`
methods:{
   ...mapMutations({ editName: 'updateName'})
  }
// this.editName('Alicia') 하면 store 내부의 뮤테이션을 호출하고, 그럼 state 가 갱신된다.
`"></hl>

        <p></p>
        <p></p>

        <p>이제 컴포넌트는 요렇게 생김</p>
        <hl language="javascript" :code="`
<script>
    import { mapState, mapMutations } from 'vuex'

    export default {
      name: 'HelloWorld',
      computed: ...mapState([
        'name','age','dob'
      ]),
      methods:{
        ...mapMutations({ editName: 'updateName'})
      }
    }
</script>
        `"></hl>

        <p>실습해볼까?</p>
        <hl language="javascript"
            :code="`<p>{{this.editName('지지훈')}} {{this.name}}  {{this.editName('지훈')}} {{this.name}}</p>`"></hl>

        <b-card titl="결과"><p>{{this.editName('지지훈')}} {{this.name}} {{this.editName('지훈')}} {{this.name}}</p></b-card>
        <p></p>


        <p>뮤테이션은 동기다. 호출하면 바로 답이 온다. 그러면 만약에 다른 서버에 자료를 요청하고 받는 비동기의 경우라면?</p>


        <md>## 행동 Actions</md>

        <p>액션은 비동기 행위를 넣고, 그 행위가 끝나면 뮤테이션을 커밋해 비동기 결과물을 전송하는 역학을 한다.</p>

        <md :source="`
1. 서버에 사용자 데이터를 요청한다.
2. 서버로부터 응답을 받고 응답에 자료가 있으면 상태(state)를 변경(mutate)하고, 자료 없으면 오류를 발생한다.
3. 변경된 상태와 연관된 컴포넌트는 뷰 인스턴스에 의해서 다시 그려진다.
`">
        </md>
        <p>context store 를 향한 참조. Payload 는 선택적인 매개변수인데 변경할 자료를 주는 추가적인 것이다.</p>
        <md :source="`
변형은 context.mutate(‘updateName’ , ‘Alicia’ )
읽기는 context.state.name`"></md>


        <p>액션 만들어보자</p>


        <hl language="javascript" :code="`
getUserData(context,payload){
      // 서버로부터 자료를 가져온다
            axios.get('www.api.yourdomain').then((response)=>{
      // state 를 mutate 하기 위해서 자료를 store 에 커밋한다.
            context.commit('loadUserData',response)
      })
    }
`"></hl>

        <p></p>
        <hl language="javascript" :code="`
  state: {
    // 현재 상태
    name: '지훈',
    age: 20,
    dob: '20/08/1990'
  },
  mutations: {
    // 현재 상태를 변형(mutate)한다.
    updateName (state, name) {
      state.name = name
    }
  },
  actions: {
      getUserData(context,payload){
      // 서버로부터 자료를 가져온다
            axios.get('www.api.yourdomain').then((response)=>{
      // state 를 mutate 하기 위해서 자료를 store 에 커밋한다.
            context.commit('loadUserData',response)
      })
    }
  }
        `
"></hl>
        <p></p>

        <p>이제 컴포넌트는 요렇게 생김</p>
        <hl language="javascript" :code="`
<script>
    import { mapState, mapMutations, mapActions } from 'vuex'

    export default {
      name: 'HelloWorld',
      computed: ...mapState([
        'name','age','dob'
      ]),
      methods:{
        ...mapMutations({ editName: 'updateName'}),
        ...mapActions(['getUserData'])
      }
    }
</script>
        `"></hl>

        <p></p>
        <p>store.dispatch('getUserData') 요렇게 스토어 객체로 호출할 수도 있고</p>
        <p>this.getUserData 로 mapActions 헬퍼로 생성된 method 를 호출할 수도 있다.</p>
        <p></p>


        <md>## 게터 Getter</md>

        <p>게터는 state 를 지연된 계산해서 가져오는 것. 마치 computed 속성과 같다.</p>

        <p>state 는 현재 상태 값. getter 는 선택적인 건데, 해당 게터 내부에서 다른 게터를 사용하게 해준다.</p>
        <hl language="javascript" :code="`
getters:{
   isAdult(state,getters){
    return state.age >=18 ? true : false
   }
  }
        `"></hl>


        <p>게터 호출</p>
        <hl language="javascript" :code="`store.getters.isAdult;`"></hl>
        <p></p>
        <p>컴포넌트에서는 mapGetters helper 로 뿌려서 호출</p>

        <p></p>
        <hl language="javascript" :code="`
  state: {
    // 현재 상태
    name: '지훈',
    age: 20,
    dob: '20/08/1990'
  },
  mutations: {
    // 현재 상태를 변형(mutate)한다.
    updateName (state, name) {
      state.name = name
    }
  },
  actions: {
      getUserData(context,payload){
      // 서버로부터 자료를 가져온다
            axios.get('www.api.yourdomain').then((response)=>{
      // state 를 mutate 하기 위해서 자료를 store 에 커밋한다.
            context.commit('loadUserData',response)
      })
    }
  },
  getters:{
   isAdult(state,getters){
    return state.age >=18 ? true : false
   }
  }

        `
"></hl>
        <p></p>

        <p>이제 컴포넌트는 요렇게 생김</p>
        <hl language="javascript" :code="`
<script>
    import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

    export default {
      name: 'HelloWorld',
      computed: ...mapState(['name','age','dob']),
                 ...mapGetters(['isAdult'])

      methods:{
        ...mapMutations({ editName: 'updateName'}),
        ...mapActions(['getUserData'])
      }
    }
</script>
        `"></hl>

        <md>### 계산된 속성</md>
        <p>만약에 게터 속성을 뮤테이트 하려고 하면, 세터가 없다고 한다. 그러니 계산된 속성에 다음과 같이 $store 를 사용하는 게터 세터를 구현하는 것도 방법이다. </p>

        <hl language="javascript" :code="`
<script>

    export default {
      name: 'HelloWorld',
      computed: {
      ...mapState(['name', 'age', 'dob']),
      ...mapGetters(['isAdult']),

      // isAdult 는 Mutate 할 수 없다. 그래서 아래처럼 state 를 가져와서 직접 변형하고 세팅하는 계산된 속성을 작성한다.
      name: {
        // getter
        get: () => {
          return this.$store.state.name
        },
        // setter
        set: (newValue) => {
          this.$store.dispatch('updateName', newValue)
        }
      }
    },
    }
</script>
        `"></hl>

        <p>mapMutations, mapActions 는 메소드에 있어야 하고 mapState, mapGetters 계산된 속성에 있어야 한다.</p>
        <p>mapMutations, mapActions 는 동기, 즉시 실행-결과반응이고 mapState, mapGetters 원본 변경시 지연된 계산으로 된다.</p>
        <p>그냥 마크다운으로 글을 썼음 편할텐데. html 태그를 가지고 글 쓰니까 빡친다. 아 힘들어!! 스트레스 쌓여!! 악!!</p>
        <b-card
                img-src="https://cdn-images-1.medium.com/max/800/1*vmhxmp5jRp-4Rtfh3skrgQ.png"
        ></b-card>
    </div>


</template>

<script>
  import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'

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
    },
    computed: {
      ...mapState(['age', 'dob']),
      ...mapGetters(['isAdult']),
      name: {
        // getter
        get: () => {
          // return this.$store.state.name
        },
        // setter
        set: (newValue) => {
          // store.dispatch('updateName', newValue)
        }
      }
    },
    methods: {
      ...mapMutations({editName: 'updateName'}),
      ...mapActions(['getUserData'])
    }
  }
</script>

<style scoped>

</style>