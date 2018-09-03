<template>
    <div id="todolist">
        <TodoHeader></TodoHeader>
        <TodoInput></TodoInput>
        <TodoList></TodoList>
        <TodoFooter></TodoFooter>
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