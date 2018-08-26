<template>
    <div>
        <md># 컴포넌트 페이지</md>
        <br/>
        <md>## 부모에서 하위 컴포넌트로 자료 전달</md>
        <br/>
        <b-card title="결과">
            <child-component :toChild="fromParent"></child-component>
        </b-card>
        <br/>
        <md>## 자식에서 부모 컴포넌트로 이벤트 전달하기</md>
        <br/>
        <b-card title="결과">
            <child-component :toChild="fromParent" v-on:show-log="printText"></child-component>
        </b-card>
        <br/>
        <md>## 이벤트 버스를 사용해서 컴포넌트 간 통신</md>
        <br/>
        <b-card title="결과">
            <eventBus-component></eventBus-component>
        </b-card>
    </div>
</template>

<script>
  import Vue from 'vue'
  import hljs from 'highlight.js'

  // Register the language if it's not supported by default
  hljs.registerLanguage('swift', require('highlight.js/lib/languages/javascript'))

  // 컴포넌트 간 통신을 위해서 중간다리 역할을 해주는 뷰 인스턴스 만들기
  var eventBus = new Vue()

  export default {
    name: 'Components',
    components: {
      // prop 을 통해 상위에서 하위로 데이터 전달
      'child-component': {
        props: ['toChild'],
        template: `<p>부모로부터 보내진 자료는 {{ toChild }} 입니다.</p>`,
        methods: {
          showLog () {
            this.$emit('show-log')
          }
        },
        mounted () {
          this.showLog()
        },
        data () {
          return {
            fromEventBus: ''
          }
        }
      },
      'eventBus-component': {
        template: `<p>부모로부터 보내진 자료는 {{ toChild }} 입니다.</p>`,
        created () {
          eventBus.$on('triggerEventBus', (value) => {
            console.log('던달받은 값 : ', value)
            this.toChild = value
          })
        },
        data () {
          return {
            toChild: ''
          }
        }
      }
    },
    mounted () {
      eventBus.$emit('triggerEventBus', '<b>이벤트버스 데이터 값</b>')
    },
    methods: {
      printText () {
        this.fromParent = 'from 자식'
      }
    },
    data () {
      return {
        cmOptions: {
          // codemirror options
          tabSize: 4,
          mode: 'Text/javascript',
          lineNumbers: true,
          line: true
        },
        fromParent: 'from 부모',
        fromChild: 'from 자식'
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

