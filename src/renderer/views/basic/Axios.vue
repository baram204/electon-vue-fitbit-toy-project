<template>
    <div>
        <h3>Axios 테스트</h3>
        <p>typicode/json-server 를 사용합니다. https://github.com/typicode/json-server 에서 설치하고 기본 json 고대로 사용</p>
        <button @click="getData"> json-server 로부터 모든 자료를 요청해서 가져옵니다</button>
        <b-card title="posts">
            <pre>{{posts}}</pre>
        </b-card>
        <b-card title="comments">
            <b-media v-for="cmt in comments" :key="comments.index">
                <b-img slot="aside" blank blank-color="#ccc" width="64" alt="placeholder"/>
                <h5 class="mt-0">{{cmt.title}}</h5>
                <p>{{cmt.body}}</p>
                <b-media v-for="subCmt in cmt.comments" :key="cmt.comments.index">
                    <b-img slot="aside" blank blank-color="#ccc" width="64" alt="placeholder"/>
                    <h5 class="mt-0">{{subCmt.title}}</h5>
                    <p class="mb-0">
                        <b-form inline>
                            <b-form-input v-model="subCmt.body"></b-form-input>
                            <b-button @click="putIt(cmt)">수정요청</b-button>
                        </b-form>
                    </p>
                </b-media>
            </b-media>
        </b-card>
        <b-card title="profile">
            <pre>{{profile}}</pre>
        </b-card>


    </div>
</template>

<script>
  export default {
    name: 'Axios',
    data () {
      return {
        posts: '로딩 전',
        comments: '로딩 전',
        profile: '로딩 전'
      }
    },
    methods: {
      getData () {
        this.getPosts()
        this.getComments()
        this.getProfile()
      },
      getPosts () {
        this.$axios.get('http://localhost:3000/posts').then((res) => {
          this.posts = res.data
        }).catch()
      },
      getComments () {
        this.$axios.get('http://localhost:3000/comments').then((res) => {
          this.comments = res.data
        }).catch()
      },
      getProfile () {
        this.$axios.get('http://localhost:3000/profile').then((res) => {
          this.profile = res.data
        }).catch()
      },
      putIt (cmt) {
        this.$axios.put('http://localhost:3000/comments/1', {...cmt}).then((res) => {
          this.getData()
          console.log(res)
        }).catch()
      }
    }
  }
</script>

<style scoped>

</style>
