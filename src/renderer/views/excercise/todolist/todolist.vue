<template>
    <section>
        <ul>
            <!--<li v-for="(value, key, index) in todoItems" :key="key" class="shadow">-->
            <li v-for="(todoItem, index) in strg" :key="key" class="shadow">
                <i class="checkBtn fa fa-check" aria-hidden="true"></i>

                {{todoItem.value}}
                <span class="removeBtn" @click="removeTodo(todoItem, index)">
                    <i class="fa fa-trash-alt" area-hidden="true"></i>
                </span>
            </li>
        </ul>
        <!--<pre>{{strg}}</pre>-->
    </section>
</template>

<script>
  export default {
    name: 'todolist',
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
      removeTodo (todoItem, index) {
        // this.strg = this._.without(this.strg, todoItem)
        // 부수효과가 있는데 일단 책에서 하라니까 한다.
        this.strg.splice(index, 1)
        // 로컬 스토리지에 (키,값) 쌍으로 저장한다.
        localStorage.setItem(this.key, JSON.stringify(this.strg))
      }
    }
  }
</script>

<style scoped>
    ul {
        list-style-type: none;
        padding-left: 0px;
        margin-top: 0;
        text-align: left;
    }

    li {
        display: flex;
        min-height: 50px;
        height: 50px;
        line-height: 50px;
        margins: 0.5rem 0;
        padding: 0 0.9rem;
        background: white;
        border-radius: 5px;
    }

    /*em {*/
    /*text-overflow: ellipsis;*/
    /*width: 300px;*/
    /*}*/

    .checkBtn {
        line-height: 45px;
        color: #62acde;
        margin-right: 5px;
    }

    .removeBtn {
        margin-left: auto;
        color: #de4343;
    }
</style>