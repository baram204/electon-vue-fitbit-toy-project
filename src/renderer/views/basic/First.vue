<template>
    <div>
        <md># 기본</md>
        <md>## 라이프 싸이클</md>

        <md> 먼저 템플릿, 데이터, 메소드를 준비한다.</md>
        <codemirror v-model="prepareDataAndMethod" :options="cmOptions"></codemirror>

        <md> 그리고 각 라이프 싸이클마다 `$el`, `$ref`, `$ref['template']` ,`데이터`, `메소드`를 표시해본다.</md>
        <codemirror v-model="commonCode" :options="cmOptions"></codemirror>

        <md>### beforeCreate</md>

        <md watches="source" :source="beforeCreate"></md>
        <codemirror v-model="beforeCreateRes" :options="cmOptions"></codemirror>

        <md>### created</md>

        <md :source="created"></md>
        <codemirror v-model="createdRes" :options="cmOptions"></codemirror>

        <md>### beforeMount</md>

        <md :source="beforeMount"></md>
        <codemirror v-model="beforeMountRes" :options="cmOptions"></codemirror>

        <md>### mounted</md>

        <md :source="mounted"></md>
        <codemirror v-model="mountedRes" :options="cmOptions"></codemirror>

        <md>### updated 를 위해서 데이터 갱신 버튼!</md>
        <lifecycle></lifecycle>

        <md>### beforeUpdate</md>

        <md :source="beforeUpdate"></md>
        <codemirror v-model="beforeUpdateRes" :options="cmOptions"></codemirror>

        <md>### updated</md>

        <md :source="updated"></md>
        <codemirror v-model="updatedRes" :options="cmOptions"></codemirror>
    </div>
</template>

<script>
  export default {
    name: 'First',
    props: ['change'],
    components: {
      lifecycle: {
        template: `
<div ref="template">
<b-button v-on:click="message = '내용을 변경합니다'">데이타 내용 변경</b-button>
    {{ message }}
</div>`,
        data () {
          return {
            message: '데이터 속성값'
          }
        },
        methods: {
          checkData () {
            return console.log(this.message + `을 메서드로 체크!`)
          }
        },
        beforeCreate: function () {
          console.log('beforeCreate-----------------------')
          console.log(`$el : ${this.$el}`)
          console.log(`$refs : ${this.$refs}`)
          console.log(this.$refs)
          console.log(`$refs.template : ${this.$refs['template']}`)
          console.log(this.$refs.template)
          console.log(`데이터 : ${this.message}`)
          console.log(`메소드 :`)
          this.checkData()
        },
        created: function () {
          console.log('created-----------------------')
          console.log(`$el : ${this.$el}`)
          console.log(`$refs : ${this.$refs}`)
          console.log(this.$refs)
          console.log(`$refs.template : ${this.$refs['template']}`)
          console.log(this.$refs.template)
          console.log(`데이터 : ${this.message}`)
          console.log(`메소드 :`)
          this.checkData()
        },
        beforeMount: function () {
          console.log('beforeMount-----------------------')
          console.log(`$el : ${this.$el}`)
          console.log(`$refs : ${this.$refs}`)
          console.log(this.$refs)
          console.log(`$refs.template : ${this.$refs['template']}`)
          console.log(this.$refs.template)
          console.log(`데이터 : ${this.message}`)
          console.log(`메소드 :`)
          this.checkData()
        },
        mounted: function () {
          console.log('mounted-----------------------')
          console.log(`$el : ${this.$el}`)
          console.log(`$refs : ${this.$refs}`)
          console.log(this.$refs)
          console.log(`$refs.template : ${this.$refs['template']}`)
          console.log(this.$refs.template)
          console.log(`데이터 : ${this.message}`)
          console.log(`메소드 :`)
          this.checkData()
        },
        beforeUpdate: function () {
          console.log('beforeUpdate-----------------------')
          console.log(`$el : ${this.$el}`)
          console.log(`$refs : ${this.$refs}`)
          console.log(this.$refs)
          console.log(`$refs.template : ${this.$refs['template']}`)
          console.log(this.$refs.template)
          console.log(`데이터 : ${this.message}`)
          console.log(`메소드 :`)
          this.checkData()
        },
        updated: function () {
          console.log('updated-----------------------')
          console.log(`$el : ${this.$el}`)
          console.log(`$refs : ${this.$refs}`)
          console.log(this.$refs)
          console.log(`$refs.template : ${this.$refs['template']}`)
          console.log(this.$refs.template)
          console.log(`데이터 : ${this.message}`)
          console.log(`메소드 :`)
          this.checkData()
        }
      }
    },
    data () {
      return {
        message: '',
        prepareDataAndMethod: `
template: \`
<div ref="template">
    {{ message }}
</div>\`,
data () {
  return {
    message: '데이터 속성값'
  }
},
methods: {
  checkData () {
    console.log(this.message)
  }
},
        `,
        commonCode: `
beforeCreate: function () {
    console.log('라이프싸이클이름-----------------------')
  console.log(\`$el : ${this.$el}\`)
  console.log(\`$refs : ${this.$refs}\`)
  console.log(this.$refs)
  console.log(\`$refs.template : ${this.$refs['template']}\`)
  console.log(this.$refs.template)
  console.log(\`데이터 : ${this.message}\`)
  console.log(\`메소드 :\`)
},
`,
        beforeCreate: `
- d
- g
- x
        `,
        created: `

        `,
        beforeMount: `
        `,
        mounted: `
        `,
        beforeUpdate: `
        `,
        updated: `
        `,
        beforeCreateRes: `
beforeCreate-----------------------
First.vue?7acc:80 $el : undefined
First.vue?7acc:81 $refs : [object Object]
First.vue?7acc:82 Object {}
First.vue?7acc:83 $refs.template : undefined
First.vue?7acc:84 undefined
First.vue?7acc:85 데이터 : undefined
First.vue?7acc:86 메소드 :
vue.esm.js?efeb:591 [Vue warn]: Error in beforeCreate hook: "TypeError: this.checkData is not a function",
TypeError: this.checkData is not a function
`,
        createdRes: `
created-----------------------
First.vue?7acc:91 $el : undefined
First.vue?7acc:92 $refs : [object Object]
First.vue?7acc:93 Object {}
First.vue?7acc:94 $refs.template : undefined
First.vue?7acc:95 undefined
First.vue?7acc:96 데이터 : 데이터 속성값
First.vue?7acc:97 메소드 :
First.vue?7acc:75 데이터 속성값을 메서드로 체크,
`,
        beforeMountRes: `
beforeMount-----------------------
First.vue?7acc:102 $el : undefined
First.vue?7acc:103 $refs : [object Object]
First.vue?7acc:104 Object {}template: undefined__proto__: Object
First.vue?7acc:105 $refs.template : undefined
First.vue?7acc:106 undefined
First.vue?7acc:107 데이터 : 데이터 속성값
First.vue?7acc:108 메소드 :
First.vue?7acc:75 데이터 속성값을 메서드로 체크!`,
        mountedRes: `

mounted-----------------------
First.vue?7acc:113 $el : [object HTMLDivElement]
First.vue?7acc:114 $refs : [object Object]
First.vue?7acc:115 Object {template: div}
First.vue?7acc:116 $refs.template : [object HTMLDivElement]
<div data-v-28a63aa1=""><button type="button" class="btn btn-secondary">데이타 내용 변경</button>
    데이터 속성값
</div>
First.vue?7acc:118 데이터 : 데이터 속성값
First.vue?7acc:119 메소드 :
First.vue?7acc:75 데이터 속성값을 메서드로 체크!
}`,
        beforeUpdateRes: `
beforeUpdate-----------------------
First.vue?7acc:118 $el : [object HTMLDivElement]
First.vue?7acc:119 $refs : [object Object]
First.vue?7acc:120 Object {template: div}
First.vue?7acc:121 $refs.template : [object HTMLDivElement]
<div data-v-28a63aa1=""><button type="button" class="btn btn-secondary">데이타 내용 변경</button>
    내용을 변경합니다
</div>
First.vue?7acc:123 데이터 : 내용을 변경합니다
First.vue?7acc:124 메소드 :
First.vue?7acc:69 내용을 변경합니다을 메서드로 체크!`,
        updatedRes: `
mounted-----------------------
updated-----------------------
First.vue?7acc:139 $el : [object HTMLDivElement]
First.vue?7acc:140 $refs : [object Object]
First.vue?7acc:141 Object {template: div}
First.vue?7acc:142 $refs.template : [object HTMLDivElement]
<div data-v-28a63aa1=""><button type="button" class="btn btn-secondary">데이타 내용 변경</button>
    내용을 변경합니다
</div>
First.vue?7acc:144 데이터 : 내용을 변경합니다
First.vue?7acc:145 메소드 :
First.vue?7acc:79 내용을 변경합니다을 메서드로 체크!
`,
        cmOptions: {
          // codemirror options
          tabSize: 4,
          mode: 'text/javascript',
          lineNumbers: true,
          line: true
        }
      }
    }
  }
</script>

<style scoped>

</style>
