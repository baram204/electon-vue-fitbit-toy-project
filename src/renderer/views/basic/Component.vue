<template>
    <div>
        <h3>컴포넌트 페이지 입니다.{{newval}}</h3><br/>
        <router-link to="/basic">기초로 이동</router-link>
        <br/>
        <router-link to="/home">홈으로 이동</router-link>
        <br/>
        <router-link to="/basic/component">컴포넌트로 이동</router-link>
        <br/>
    </div>
</template>

<script>
  export default {
    name: 'Component',
    data () {
      return {
        newval: 'val'
      }
    },
    created () {
      alert('hello')
    }
  }
</script>

### 뭔가 화면이 덜 된 거 같은 이유

css 적용이 안 된 것인가 확인했으나 적용 됨

![](https://goo.gl/dVNv7B)

아! 부트스트랩이랑 함께 쓰는 컴포넌트구나! 즉, 부트스트랩을 적용해야함.

부트 스트랩은 다음 글에서 다루는 것이 좋겠다.


### (별개의 글로 분리 요망) scss 로더로 scss 사용하기

일반적으로 style 은 내부에 기술한다.

```html
<template>
    <div class="example">{{ msg }}</div>
</template>

<script>
  export default {
    ......
  }
</script>

<style>
    .example {
        color: red;
    }
</style>
```

하지만 scss 를 사용하려면? 바로 [scss 로더를 설치](https://simulatedgreg.gitbooks.io/electron-vue/content/en/using_pre-processors.html)후 [확장자 안써도 사용하기 처리](https://vue-loader.vuejs.org/guide/pre-processors.html#sass)를 해줘야한다.

설치

```bash
npm install --save-dev sass-loader node-sass
```

.electron-vue/webpack.renderer.config.js
```
module: {
rules: [
......
{
test: /.scss$/,
use: [
'vue-style-loader',
'css-loader',
'sass-loader'
]
},
......
```


그래서 `main.js` 에다가 로드할 css 경로만 적어주면 된다.

보통 css 는 최상위에 설정을 하니, 최상위 루트인 `src/renderer/components/LandingPage.vue` 에 기술을 해주자.

src/renderer/components/LandingPage.vue
```
<!--<style lang="scss">-->
<!--// Import Main styles for this application-->
<!--@import './assets/scss/style';-->
<!--</style>-->

```

<style scoped>

</style>
