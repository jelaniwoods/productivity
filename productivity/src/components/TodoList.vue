<template lang="html">
  <!-- <table>
    <tr>
      <td class="col">

          <h3> Pending Tasks</h3>

      </td>
      <td class="col">
          <h3> Completed Tasks</h3>
      </td>
    </tr> -->

    <!-- <tr>
      <td class="col">
          <todo v-on:delete-todo="deleteTodo" v-on:complete-todo="completeTodo" v-for="todo in todos.filter(todo => {return todo.done === false})" :todo.sync="todo"></todo>
      </td>
      <td class="col">
          <todo v-on:delete-todo="deleteTodo" v-for="todo in todos.filter(todo => {return todo.done === true})" :todo.sync="todo"></todo>
      </td>

    </tr> -->
    <!-- </table> -->
    <div class="">
      <div class="">
        <div class="titles ui left">
          <h2>Pending</h2>
        </div>
        <div class="titles ui right">
          <h2>Completed</h2>
        </div>
      </div>
      <todo  v-show="!done" v-on:delete-todo="deleteTodo" v-on:complete-todo="completeTodo" v-for="todo in todos" :todo.sync="todo"></todo>
    </div>

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
    data() {
      return {

      }
    },
    methods: {
      deleteTodo(todo) {
        const todoIndex = this.todos.indexOf(todo);
        this.todos.splice(todoIndex, 1);
      },
      completeTodo(todo) {
        const todoIndex = this.todos.indexOf(todo);
        this.todos[todoIndex].done = true;
        // this.todos[todoIndex].className = 'ui  card right';
        // console.log(this.todos[todoIndex].className + ' 3u01r8' +this.todos[todoIndex].done);
      },
    },
};
</script>
<style lang="css" scoped>
  .col {
    display: inline-block;
    text-align: center;
  }


</style>
