<template lang="html">
  <div>
    <!-- <p class="tasks">Completed Tasks: {{todos.filter(todo => {return todo.done === true}).length}}</p>
    <p class="tasks">Pending Tasks: {{todos.filter(todo => {return todo.done === false}).length}}</p> -->
    <h3> Pending Tasks</h3>
    <todo v-on:delete-todo="deleteTodo" v-on:complete-todo="completeTodo" v-for="todo in todos.filter(todo => {return todo.done === false})" :todo.sync="todo"></todo>
    <h3> Completed Tasks</h3>
    <todo v-on:delete-todo="deleteTodo" v-on:complete-todo="completeTodo" v-for="todo in todos.filter(todo => {return todo.done === true})" :todo.sync="todo"></todo>
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
        console.log(this.todos[todoIndex].done + "{{{}}}");
        this.todos[todoIndex].done = true;

      },
    },
};
</script>

<style lang="css">
</style>
