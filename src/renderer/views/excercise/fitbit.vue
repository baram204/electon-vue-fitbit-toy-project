<template>
    <b-container>
        <md>## 핏빗 API 요청</md>
        <br/>
        <md>### 엑세스 토큰 및 기타 정보 얻어오기</md>
        <br/>
        <b-button :pressed="false" variant="success" href="https://dev.fitbit.com/apps" target="_blank">클라이언트 ID 조사
        </b-button>
        <br/>
        <br/>
        <login :fitbitClientId="fitbitClientId"></login>
        <br/>
        <resTable :items="accessRes.items" :fields="accessRes.fields" :stacked="true" :show="show"></resTable>

        <br/>
        <md>### 프로파일 정보 얻어와 표시</md>
        <br/>
        <profile :user="user" :show="show"></profile>

        <br/>
        <md>### 수면 정보를 얻어와 표시</md>
        <br/>
        <resTable :items="sleepLogsList" :fields="sleepRes.fields" :stacked="false" :show="show"></resTable>
    </b-container>
</template>

<script>
  import BasicRenderComp from '../../components/BasicRenderComp'

  export default {
    name: 'fitbit',
    components: {
      BasicRenderComp,
      'login': {
        props: ['fitbitClientId'],
        template: `
                    <b-input-group prepend="Fitbit Client ID ">
                        <b-form-input v-model="fitbitClientId" ></b-form-input>
                        <b-input-group-append>
                            <b-button :pressed="false" variant="success" :href="authReq" target="_self"
                            @click="saveClientId">권한허용요청</b-button><br/>
                        </b-input-group-append>
                    </b-input-group>
                     `,
        data () {
          return {}
        },
        computed: {
          authReq () {
            const uri = 'https://www.fitbit.com/oauth2/authorize?client_id=' + this.fitbitClientId + '&response_type=token&scope=activity+sleep+profile+weight+nutrition+heartrate&expires_in=2592000'
            return encodeURI(uri)
          }
        },
        methods: {
          check () {
            this.checked = !this.checked
          },
          saveClientId () {
            this.$fitbit.clientId = this.fitbitClientId
          }
        }
      },
      'resTable': {
        props: ['items', 'fields', 'stacked', 'show'],
        template: `
<section>
    <b-table
    v-if="this.show"
            :stacked="this.stacked"
            :items="this.items"
            :fields="this.fields"
            >
        <template slot="token" slot-scope="row">
            <b-form-textarea :value="row.value" :rows="6" :max-rows="10" plaintext></b-form-textarea>
        </template>

        <template slot="date" slot-scope="row">
        {{ row.value }}
            {{ [row.value] | moment("dddd")}}
        </template>

        <template slot="hour" slot-scope="row">
            {{row.value | duration('as','minutes')}} 분 -
           약 {{row.value | duration('humanize')}}
        </template>
    </b-table>
      <div v-else>
        <div class="uk-text-center">
          <div class="uk-padding">
            <p><i class="fa fa-refresh fa-spin fa-5x"></i></p>
            <h3 style="opacity: 0.7">
            {{ this.fields.date ? '핏빗 수면정보 로딩 중' : '핏빗 인증 정보 로딩 중'}}
</h3>
          </div>
        </div>
      </div>
</section>`,
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
      },
      'profile': {
        props: ['user', 'show'],
        template: `
<transition name="fade" mode="out-in">
    <section class="user" v-if="show">

        <b-card title="프로파일"
          :img-src="user.avatar150"
          img-alt="profile"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2">
            <p class="card-text">
                {{ user.fullName }}
                <br>
                <span style="opacity: 0.7; font-size: 0.8em">member since: {{ user.memberSince }}</span>
            </p>
        </b-card>

        <b-row v-for="badge, index in user.topBadges">
            <b-col sm="4" md="4" lg="3" xl="2">
            <img :src="badge.image125px" :alt="'badge-' + index"/>
            </b-col>
            <b-col>
                <b-row><h5>{{ badge.shortName }}</h5></b-row>
                <b-row><p>{{ badge.marketingDescription }}</p></b-row>
            </b-col>
        </b-row>

    </section>
      <div v-else>
        <div class="uk-text-center">
          <div class="uk-padding">
            <p><i class="fa fa-refresh fa-spin fa-5x"></i></p>
            <h3 style="opacity: 0.7">핏빗 사용자 로딩 중...</h3>
          </div>
        </div>
      </div>
    </transition>`,
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
        fitbitClientId: this.$fitbit.clientId ? this.$fitbit.clientId : '',
        accessRes: {
          items: [{
            token: this.$fitbit.token,
            userId: this.$fitbit.accountUserId,
            expiresIn: this.$fitbit.expiresIn,
            isLoggedIn: this.$fitbit.isLoggedIn
          }],
          fields: {
            userId: {label: 'userId'},
            expiresIn: {label: 'expiresIn'},
            isLoggedIn: {label: 'isLoggedIn'},
            token: {label: 'token'}
          }
        },
        sleepRes: {
          items: [],
          fields: {
            date: {label: '일자'},
            hour: {label: '기간'}
          }
        },
        show: false
      }
    },
    computed: {
      user: {
        get () {
          return this.$store.getters.fitbit.user !== '' ? this.$store.getters.fitbit.user : ''
        },

        set (val) {
          var self = this
          if (Object.keys(val).length > 0) {
            setTimeout(function () {
              self.show = true
            }, 1000)
          }
        }

      },
      sleepLogsList: {
        get () {
          return this.$store.getters.fitbit.sleepLogList !== '' ? this.$store.getters.fitbit.sleepLogList.map((daily) =>
            ({date: daily.dateOfSleep, hour: daily.duration})) : ''
        },
        set (val) {
          var self = this
          if (Object.keys(val).length > 0) {
            setTimeout(function () {
              self.show = true
            }, 1000)
          }
        }
      }

    },
    created () {
      this.$moment.locale('kr')
      this.$moment.updateLocale('kr', {
        weekdays: [
          '일', '월', '화', '수', '목', '금', '토'
        ],
        weekdaysShort: [
          '일', '월', '화', '수', '목', '금', '토'
        ],
        relativeTime: {
          future: 'in %s',
          past: '%s 전',
          s: '몇 초 전',
          ss: '%d 초',
          m: 'a 분',
          mm: '%d 분',
          h: 'an 시',
          hh: '%d 시간',
          d: '일',
          dd: '%d 일',
          M: '월',
          MM: '%d 월',
          y: '연',
          yy: '%d 연'
        }
      })
      this.show = Object.keys(this.user).length > 0
      if (!this.show) {
        var self = this
        this.$axios.all([
          self.$store.dispatch('fetchProfile', this.$fitbit),
          self.$store.dispatch('fetchSleepLogList', {fitbit: this.$fitbit, afterDate: '2018-07-23'})
        ])
      }
    },
    watch: {}
  }
</script>

<style scoped>
    .word-wrap {
        width: 300px;
        display: inline-block;
        word-wrap: break-word;
    }
</style>
