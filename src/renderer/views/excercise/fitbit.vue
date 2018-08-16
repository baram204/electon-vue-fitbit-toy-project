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


    </b-container>
</template>

<script>
  export default {
    name: 'fitbit',
    components: {
      'login': {
        props: ['fitbitClientId'],
        template: `<b-button :pressed="false" variant="success" :href="authReq" target="_blank">권한허용요청</b-button><br/>`,
        data () {
          return {
            authReq: 'https://www.fitbit.com/oauth2/authorize?client_id=' + this.fitbitClientId + '&response_type=token&scope=activity%20profile&expires_in=2592000',
            fitbitClientId: ''
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
    },
    methods: {
      login () {
        window.location.href = 'https://www.fitbit.com/oauth2/authorize?client_id=' + this.fitbitClientId + '&response_type=token&scope=activity%20profile&expires_in=2592000'
      }
    }
  }
</script>

<style scoped>

</style>
