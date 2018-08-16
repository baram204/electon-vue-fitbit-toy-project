import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/oauth-callback/:token/:expiresIn/:accountUserId',
      name: 'OAuth Callback Token',
      component: require('@/components/OAuthCallback').default
    },
    {
      path: '/',
      beforeEnter: (to, from, next) => {
        console.log(from.params)
        next()
      },
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
          path: '/basic/:name',
          name: '입문',
          // redirect: '/basic/basic',
          component: require('@/components/BasicRenderComp').default
        },
        {
          path: '/advance/:name',
          name: '심화',
          // redirect: '/basic/basic',
          component: require('@/components/AdvanceRenderComp').default
        },
        {
          path: '/excercise/:name',
          name: '예시',
          // redirect: '/basic/basic',
          component: require('@/components/ExcerciseRenderComp').default
        }
        // 아래는 순정 라우터 설정, 위의 다이나믹 컴포넌트 렌더링 처리해서 필요 없음
        // {
        //   path: 'basic',
        //   name: '기초',
        //   redirect: '/basic/basic',
        //   component: {
        //     render (c) { return c('router-view') }
        //   },
        //   children: [
        //     {
        //       path: 'basic',
        //       name: '기초 화면',
        //       component: require('@/views/basic/Basic').default
        //     },
        //     {
        //       path: 'instance',
        //       name: '뷰 인스턴스',
        //       component: require('@/views/basic/Instance').default
        //     },
        //     {
        //       path: 'components',
        //       name: '뷰 컴포넌트',
        //       component: require('@/views/basic/Components').default
        //     }
        //   ]
        // },
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
