<template>
    <div class="inputBox shadow">
        <input type="text" v-model="newTodoItem"
        placeholder="하고 싶은 것을 입력하세요"
        v-on:keyup.enter="addTodo">
        <span class="addContainer" v-on:click="addTodo">
            <i class="addBtn fa fa-plus" aria-hidden="true"></i>
        </span>
    </div>
</template>

<script>
  export default {
    name: 'todoinput',
    data () {
      return {
        newTodoItem: ''
      }
    },
    methods: {
      // 할일 추가
      addTodo () {
        // console.log(this.newTodoItem)
        return this.newTodoItem !== ''
          // 즉시실행 익명함수
          ? (() => {
            // 공백 제거 후
            const value = this.newTodoItem && this.newTodoItem.trim()
            // 로컬 스토리지에 (키,값) 쌍으로 저장한다.
            localStorage.setItem(value, value)
            // 인풋창은 비우기
            this.clearInput()
          })()
          // 비어있으면 로컬 스토리지에 집어넣지 않는다.
          : ''
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