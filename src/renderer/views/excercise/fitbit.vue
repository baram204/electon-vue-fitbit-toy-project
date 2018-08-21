<template>
    <b-container>

        <md>### 핏빗 API 요청</md>

        <b-row>
            <label>Fitbit Client ID :</label>
        </b-row>
        <b-row>
            <b-form-input v-model="fitbitClientId"></b-form-input>

        </b-row>

        <login :fitbitClientId="fitbitClientId"></login>

        <b-table
                stacked
                :items="[{
                    token : this.$fitbit.token,
                    userId : this.$fitbit.accountUserId,
                    expiresIn : this.$fitbit.expiresIn,
                    isLoggedIn : this.$fitbit.isLoggedIn,
                }]"
                :fields="{
                    userId : {label: 'userId'},
                    expiresIn : {label: 'expiresIn'},
                    isLoggedIn : {label: 'isLoggedIn'},
                    token : {label: 'token'},
                }"
        >
            <template slot="token" slot-scope="row" class="word-wrap">
                <p class="word-wrap">{{row.value}}</p>
            </template>

        </b-table>


    </b-container>
</template>

<script>
  export default {
    name: 'fitbit',
    components: {
      'login': {
        props: ['fitbitClientId'],
        template: `
<div>
    <b-row>
        <b-button :pressed="false" variant="success" :href="authReq" target="_self">권한허용요청</b-button><br/>
    </b-row>
    <b-row>
        <b-input plaintext :value="fitbitClientId"></b-input>
    </b-row>
    <b-row>
        <b-input plaintext :value="authReq"></b-input>
    </b-row>
</div>`,
        data () {
          return {}
        },
        computed: {
          authReq () {
            return 'https://www.fitbit.com/oauth2/authorize?client_id=' + this.fitbitClientId + '&response_type=token&scope=activity%20profile&expires_in=2592000'
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
    methods:
      {}
  }
</script>

<style scoped>
.word-wrap{
    width: 300px;
    display: inline-block;
    word-wrap: break-word;
}
</style>
