import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
      name: 'Home',
      component: require('@/components/Structure').default,
      children: [
        {
          path: 'home',
          name: '홈페이지',
          component: require('@/views/Home').default
        },
        {
          path: 'basic',
          name: '기초',
          redirect: '/basic/basic',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'basic',
              name: '기초 화면',
              component: require('@/views/basic/Basic').default
            },
            {
              path: 'instance',
              name: '뷰 인스턴스',
              component: require('@/views/basic/Instance').default
            },
            {
              path: 'components',
              name: '뷰 컴포넌트',
              component: require('@/views/basic/Components').default
            }
          ]
        },
        {
          path: 'components',
          name: '컴포넌트들',
          // redirect: '/basic/basic',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'markdown',
              name: '마크다운',
              component: require('@/views/components/markdown').default
            },
            {
              path: 'instance',
              name: '뷰 인스턴스',
              component: require('@/views/basic/Instance').default
            },
            {
              path: 'components',
              name: '뷰 컴포넌트',
              component: require('@/views/basic/Components').default
            }
          ]
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
