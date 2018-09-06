<template>
    <div class="inputBox shadow">
        <input type="text" v-model="newTodoItem"
               placeholder="하고 싶은 것을 입력하세요"
               v-on:keyup.enter="addTodo">
        <span class="addContainer" v-on:click="addTodo">
            <i class="addBtn fa fa-plus" aria-hidden="true"></i>
        </span>
        <!--{{strg}}-->
    </div>
</template>

<script>
  export default {
    name: 'todoinput',
    created () {
      const loaded = [...JSON.parse(localStorage.getItem(this.key))]
      this.strg = loaded === null ? []
        : loaded
    },
    data () {
      return {
        newTodoItem: '',
        strg: [],
        key: `todoListExercise`
      }
    },
    methods: {
      // 할일 추가
      addTodo () {
        // 공백 제거 후
        const value = this.newTodoItem && this.newTodoItem.trim()

        // 이벤트 호출하면서 값도 넘김
        this.$emit('callParentAddTodo', value)
        // 인풋창은 비우기
        this.clearInput()
      },
      // 인풋 비우기
      clearInput () {
        this.newTodoItem = ''
      }
    }
  }
</script>

<style scoped>

    input:focus {
        outline: none;
    }

    .inputBox {
        background: white;
        height: 50px;
        line-height: 50px;
        border-radius: 5px;
    }

    .inputBox input {
        border-style: none;
        font-size: 0.9rem;
    }

    .addContainer {
        width: 50px;
        float: right;
        background: linear-gradient(to right, #6478FB, #8763FB);
    }

    .addBtn {
        color: white;
        vertical-align: middle;
    }

</style>