<template>
    <div class="app">
        <vue2-sidebar heading="뷰연습" :links="links" :header-links="header">
            <router-view></router-view>
        </vue2-sidebar>
    </div>
</template>

<script>
  export default {
    name: 'Structure',
    components: {
      'vue2-sidebar': require('@/components/sidebar/Vue2Sidebar').default
    },
    data () {
      return {
        links: [
          {
            label: '홈',
            href: '#/home'
          },
          // {
          //   label: '기초',
          //   // href: '#/basic',
          //   links: [
          //     {label: '뷰인스턴스', href: '#/basic/instance'},
          //     {label: '뷰컴포넌트', href: '#/basic/components'}
          //   ]
          // },
          {
            label: '입문',
            // href: '#/basic',
            links: [
              {label: '기초페이지', href: '#/basic/first'},
              {label: '플젝구성', href: '#/basic/project'},
              {label: '인스턴스', href: '#/basic/instance'},
              {label: '컴포넌트', href: '#/basic/components'},
              {label: '라우터', href: '#/basic/router'},
              {label: 'HTTP axios 통신', href: '#/basic/axios'},
              {label: '템플릿', href: '#/basic/template'},
              {label: '실습 Todo', href: '#/basic/excercise'},
              {label: 'vuex', href: '#/basic/vuex'},
              {label: '웹팩', href: '#/basic/webpack'}
            ]
          },
          {
            label: '심화예시',
            // href: '#/advance',
            links: [
              {label: '기초페이지', href: '#/advance/first'},
              {label: '플젝구성', href: '#/advance/project'},
              {label: '인스턴스', href: '#/advance/instance'},
              {label: '컴포넌트', href: '#/advance/component'},
              {label: '라우터', href: '#/advance/router'},
              {label: 'HTTP axios 통신', href: '#/advance/axios'},
              {label: '템플릿', href: '#/advance/template'},
              {label: '실습 Todo', href: '#/advance/excercise'},
              {label: 'vuex', href: '#/advance/vuex'},
              {label: '웹팩', href: '#/advance/webpack'}
            ]
          }
        ],
        header: [
          {label: 'Header #1', href: '#/header1'},
          {label: 'Header #2', href: '#/header2'},
          {label: 'Header #3', href: '#/header3', icon: 'fa-glass'}
        ]
      }
    }
  }
</script>

<style scoped>

</style>
