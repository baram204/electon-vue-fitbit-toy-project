<template>
    <div class="clearAllContainer">
        <span class="clearAllBtn" @click="clearTodo">모두 비우기</span>
    </div>
</template>

<script>
  export default {
    name: 'todofooter',
    data () {
      return {
        newTodoItem: '',
        strg: [],
        key: `todoListExercise`
      }
    },
    methods: {
      clearTodo () {
        // localStorage.clear()
        localStorage.setItem(this.key, JSON.stringify(this.strg))
      }
    }
  }
</script>

<style scoped>
    .clearAllContainer {
        width: 8.5rem;
        height: 50px;
        line-height: 50px;
        background-color: white;
        border-radius: 5px;
        margin: 0 auto;
    }

    .clearAllBtn {
        color: #e20303;
        display: black;
    }
</style>