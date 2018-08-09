<template>
    <div class="app">
        <AppHeader/>
        <div class="app-body">
            <vue2-sidebar heading="뷰연습" :links="links" :header-links="header">
                <main class="main">
                    <div class="container-fluid">
                        <router-view></router-view>
                    </div>
                </main>
            </vue2-sidebar>
        </div>
    </div>
</template>

<script>
  import Vue2Sidebar from 'vue2-sidebar'

  export default {
    name: 'Structure',
    components: {'vue2-sidebar': Vue2Sidebar},
    data () {
      return {
        links: [
          {
            label: '홈',
            href: '#/'
          },
          {
            label: '기초',
            href: '#/basic',
            links: [
              {label: '뷰인스턴스', href: '#/basic/instance'},
              {label: '뷰컴포넌트', href: '#/basic/component'}
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
