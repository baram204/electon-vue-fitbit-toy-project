<template>
    <div id="todolist">
        <TodoHeader></TodoHeader>
        <!--하위 이벤트는 부모 addTodo 가 연결됨-->
        <TodoInput v-on:callParentAddTodo ="addTodo"></TodoInput>

        <TodoList v-bind:pStrg="strg"></TodoList>
        <TodoFooter v-on:removeAll="clearTodo"></TodoFooter>
    </div>
</template>

<script>
  export default {
    name: 'todolist',
    components: {
      'TodoHeader': require('@/views/excercise/todolist/todoheader').default,
      'TodoInput': require('@/views/excercise/todolist/todoinput').default,
      'TodoList': require('@/views/excercise/todolist/todolist').default,
      'TodoFooter': require('@/views/excercise/todolist/todofooter').default
    },
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
      addTodo (value) {
        const keys = this._.map(this.strg,
          obj => {
            // console.log(obj.key)
            return obj.key
          })

        // console.log(keys)
        const valKey = keys.length === 0 ? 1 : this._.max(keys) + 1

        // console.log(valKey)
        this.strg.push(({key: valKey, value: value}))

        localStorage.setItem(this.key, JSON.stringify(this.strg))
      },
      clearTodo () {
        // localStorage.clear()
        this.strg = []
        localStorage.setItem(this.key, JSON.stringify(this.strg))
      }

    }
  }
</script>

<style scoped>


    #todolist {
        /* 앱 전체에 적용될 스타일들 */
        text-align: center;
        background-color: #F6F6F8;
    }

    input {
        border-style: groove;
        width: 200px;
    }

    button {
        border-style: groove;
    }

    .shadow {
        box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
    }
</style>

<!--

0. 반응성 - bootstrap 사용해서 해결
1. 아이콘 - npm i --save @fortawesome/fontawesome-free


-->