<template lang="html">
  <div>
    <!-- <p class="tasks">Completed Tasks: {{todos.filter(todo => {return todo.done === true}).length}}</p>
    <p class="tasks">Pending Tasks: {{todos.filter(todo => {return todo.done === false}).length}}</p> -->
    <div class="col">
      <h3> Pending Tasks</h3>
      <todo id="pending" v-on:delete-todo="deleteTodo" v-on:complete-todo="completeTodo" v-for="todo in todos.filter(todo => {return todo.done === false})" :todo.sync="todo"></todo>

    </div>
    <div class="col">
      <h3> Completed Tasks</h3>
      <todo id="completed" v-on:delete-todo="deleteTodo" v-for="todo in todos.filter(todo => {return todo.done === true})" :todo.sync="todo"></todo>

    </div>
  </div>
</template>

<script>

import Todo from './Todo';


export default {

  props: ['todos'],
    components: {
      Todo,
    },
    methods: {
      deleteTodo(todo) {

        const todoIndex = this.todos.indexOf(todo);
        this.todos.splice(todoIndex, 1);

      },
      completeTodo(todo) {
        const todoIndex = this.todos.indexOf(todo);
        this.todos[todoIndex].done = true;
        console.log(this.todos[todoIndex].done + "{{{}}}");
        this.todos[todoIndex].done = true;

      },
    },
};
</script>

<style lang="css" scoped>
  .col {
    display: inline-block;
  }
  #completed {
    /* display: inline-block; */
  }
</style>
