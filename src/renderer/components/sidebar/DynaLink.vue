<template>
    <div :is="isRoute ? 'router-link' : 'a'" :href="link.href" :to="link.to" :replace="link.replace"
         :active-class="'parent-active'" :exact-active-class="'active'">
        <i class="icon fa fa-fw" :class="{[link.icon]: true}" v-if="link.icon"></i>
        {{link.label}}
    </div>
</template>

<script>
  export default {
    props: ['link'],
    computed: {
      isRoute () {
        return this.$router && (this.link.to || this.link.component)
      }
    }
  }
</script>
