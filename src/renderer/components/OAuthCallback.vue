<template>
    <div class="oauth-callback">
        {{ $route.params }}
    </div>
</template>

<script>
  export default {
    name: 'oauth-callback',
    created () {
      this.setOauthInStorage()
      this.setOauthInVue()
      this.$router.push('/excercise/fitbit')
    },
    methods: {
      setOauthInStorage () {
        localStorage.setItem('fitbitOauthToken', this.$route.params.token)
        localStorage.setItem('fitbitOauthExpiresIn', this.$route.params.expiresIn)
        localStorage.setItem('fitbitOauthAccountUserId', this.$route.params.accountUserId)
      },
      setOauthInVue () {
        this.$fitbit.token = this.$route.params.token
        this.$fitbit.expiresIn = this.$route.params.expiresIn
        this.$fitbit.accountUserId = this.$route.params.accountUserId
        this.$fitbit.isLoggedIn = this.$fitbit.token !== undefined
        this.$axios.defaults.headers.common = {
          'Authorization': 'Bearer ' + this.$fitbit.token
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
</style>