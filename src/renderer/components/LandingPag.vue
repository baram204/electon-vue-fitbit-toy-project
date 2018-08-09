<template>
    <div class="wrap">
        <vue2-sidebar heading="뷰연습" :links="links" :header-links="header"></vue2-sidebar>
    </div>
</template>

<script>
  import Vue2Sidebar from 'vue2-sidebar'

  export default {
    name: 'landing-page',
    components: {'vue2-sidebar': Vue2Sidebar},
    data () {
      return {
        links: [
          {
            label: '홈',
            href: '/',
            links: [
              {
                label: '기초',
                href: '/home',
                links: [
                  {label: '뷰인스턴스', href: '/home1'},
                  {label: '뷰컴포넌트', href: '/home1'}
                ]
              }
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


