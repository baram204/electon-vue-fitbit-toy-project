<template>
    <b-container fluid>
        <vue-markdown>## 핏빗 API 요청</vue-markdown>

        <b-row>
            <b-col sm="3"><label>Fitbit Client ID :</label></b-col>
            <b-col sm="9">
                <b-form-input v-model="fitbitClientId"></b-form-input>
            </b-col>
        </b-row>
        <login :fitbitClientId="fitbitClientId"></login>

        <p>{{$route.params}}</p>

    </b-container>
</template>

<script>
  export default {
    name: 'fitbit',
    components: {
      'login': {
        props: ['fitbitClientId'],
        template: `<div>
<b-button :pressed="false" variant="success" :href="authReq" target="_self">권한허용요청</b-button><br/>
</div>`,
        data () {
          return {
            // fitbitClientId: '',
            redirect_url: 'http%3A%2F%2Flocalhost%3A9080',
            response_type: 'token',
            scope: 'activity%20profile%20heartrate%20location%20nutrition%20sleep%20weight',

            show: false
          }
        },
        computed: {
          authReq () {
            return `https://www.fitbit.com/oauth2/authorize` +
              `?client_id=${this.fitbitClientId}` +
              `&redirect_uri=${this.redirect_url}` +
              `&response_type=${this.response_type}` +
              `&scope=${this.scope}` +
              `&expires_in=2592000`
          }
        },
        created () {
          this.show = Object.keys(this.user).length > 0
          if (!this.show) {
            // let webApiUrl = 'https://api.fitbit.com/1/user/-/profile.json'
            // let tokenStr = this.$fitbit.token
            // this.$axios.get(webApiUrl, {headers: {'Authorization': `Bearer ${tokenStr}`}})
            // this.$axios.get(webApiUrl)
            this.$axios({
              url: 'https://api.fitbit.com/1/user/' + this.$fitbit.accountUserId + '/profile.json',
              method: 'GET'
            }).then((resp) => console.log(resp))
          }
        },
        methods: {
          check () {
            this.checked = !this.checked
          }
        }
      }
    },
    data () {
      return {
        fitbitClientId: ''
      }
    }
  }
</script>

<style scoped>
    img.profile {
        border: 3px solid #fff;
        border-radius: 50%;
        box-shadow: 2px 2px 5px #ccc
    }
</style>
