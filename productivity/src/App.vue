<template lang="html">

  <div>
    <todo-list v-bind:todos="todos"></todo-list>
    <create-todo v-on:create-todo="createTodo"></create-todo>
  </div>

</template>

<script>

// import todo from './components/Todo.vue'
import createTodo from './components/CreateTodo.vue'
import todoList from './components/TodoList.vue'


export default {

  components: {
    // 'todo': todo,
    'create-todo':  createTodo,
    'todo-list': todoList
  },
  data() {

    return {
      todos: [{
        title: 'Todo A',
        project: 'Project A',
        done: false,
      }]
    };
  },
  methods: {
    createTodo(newTodo) {
      this.todos.push(newTodo);
    }
  }

}


</script>

<style lang="css">


</style>
