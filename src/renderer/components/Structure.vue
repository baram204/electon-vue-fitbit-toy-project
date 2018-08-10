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
          {
            label: '기초',
            // href: '#/basic',
            links: [
              {label: '뷰인스턴스', href: '#/basic/instance'},
              {label: '뷰컴포넌트', href: '#/basic/components'}
            ]
          },
          {
            label: '기초',
            // href: '#/basic',
            links: [
              {label: '뷰인스턴스', href: '#/basic/instance'},
              {label: '뷰컴포넌트', href: '#/basic/components'}
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
