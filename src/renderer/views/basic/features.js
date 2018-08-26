var fromParent = `<template>
    // 부모 템플릿
    <child-component :toChild="fromParent" @></child-component>
</template>
<script>
  export default {
    // 자식 컴포넌트 정의하면서 props 지정
    components: {
      // prop 을 통해 상위에서 하위로 데이터 전달
      'child-component': {
        props: ['toChild'],
        template: \`<p>부모로부터 보내진 자료는 {{ toChild }} 입니다.</p>\`
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
        fromChild: '자식으로부터 온 자료',
    ......
  }`