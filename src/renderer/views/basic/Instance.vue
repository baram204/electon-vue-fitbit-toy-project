<!--<template>
    <div>
        <div>
            <h3>인스턴스 페이지 입니다.</h3><br/>
            <router-link to="/basic">기초로 이동</router-link><br/>
            <router-link to="/home">홈으로 이동</router-link><br/>
            <router-link to="/basic/component">컴포넌트로 이동</router-link><br/>
        </div>
    </div>
</template>-->

<template>

    <div>
        <b-table striped hover :items="items"></b-table>
        <!-- Single button triggers two b-collapse components -->
        <b-btn v-b-toggle.collapseA.collapseB>Toggle Both Collapse A and B</b-btn>

        <!-- elements to collapse -->
        <b-collapse id="collapseA" class="mt-2">
            <b-card>
                I am collapsable content A!
            </b-card>
        </b-collapse>
        <b-collapse id="collapseB" class="mt-2">
            <b-card>
                I am collapsable content B!
            </b-card>
        </b-collapse>
    </div>
</template>

<script>
  const items = [
    {isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald'},
    {isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw'},
    {isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson'},
    {isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney'}
  ]

  export default {
    name: 'Instance',
    data () {
      return {
        items: items
      }
    }
  }
</script>

<style scoped>

</style>
