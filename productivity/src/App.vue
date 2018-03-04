<template lang="html">
  <div id="app">
    <h1>Productivity</h1>
    <todo-list v-bind:todos="todos"></todo-list>
    <div class="spacer"></div>
    <create-todo v-on:create-todo="createTodo"></create-todo>
  </div>
</template>

<script>
import createTodo from './components/CreateTodo.vue'
import todoList from './components/TodoList.vue'
import Stopwatch from './components/Stopwatch';

export default {
  components: {
    'create-todo':  createTodo,
    'todo-list': todoList,
    Stopwatch
  },
  data() {
    return {
      todos: [{
        title: 'Todo A',
        project: 'Project A',
        done: false,
        created: true,
        timer: {}
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

  #app {
    margin: 0 auto;
    text-align: center;
    max-width: 1200px;
  }
  .spacer {
    padding-top: 50px;
  }

</style>
