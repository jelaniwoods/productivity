<template lang="html">
  <table>
    <tr>
      <td class="col">

          <h3> Pending Tasks</h3>

      </td>
      <td class="col">
          <h3> Completed Tasks</h3>
      </td>
    </tr>

    <tr>
      <td class="col">
          <todo v-on:delete-todo="deleteTodo" v-on:complete-todo="completeTodo" v-for="todo in todos.filter(todo => {return todo.done === false})" :todo.sync="todo"></todo>

      </td>
      <td class="col">
          <todo v-on:delete-todo="deleteTodo" v-for="todo in todos.filter(todo => {return todo.done === true})" :todo.sync="todo"></todo>

      </td>

    </tr>
  </table>

</template>

<script>
import Todo from './Todo';
import Stopwatch from './Stopwatch';

export default {
  props: ['todos'],
    components: {
      Todo,
      Stopwatch
    },
    methods: {
      deleteTodo(todo) {
        const todoIndex = this.todos.indexOf(todo);
        this.todos.splice(todoIndex, 1);
      },
      completeTodo(todo) {
        const todoIndex = this.todos.indexOf(todo);
        // this.todos[todoIndex].done = true;
        console.log(this.todos[todoIndex].done + "{{{}}}");
        this.todos[todoIndex].done = true;

      },
    },
};
</script>
<style lang="css" scoped>
  .col {
    /* display: inline-block; */
    text-align: center;
  }
  table {
  border: 2px solid blueviolet;
  margin: 0 auto;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #42b983;
  color: rgba(255,255,255,0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  background-color: #f9f9f9;
  min-width: 482px;
}

th, td {
  /* min-width: 120px; */
  padding: 10px 20px;
}

</style>
