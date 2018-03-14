<template lang="html" v-if="todos.length" tag="div">
  <div class="ui three stackable cards">
    <div class="todo-container ui center">
      <transition-group name="fade" tag="ul">
        <li v-for="todo in todos" :key="todo">
          <todo class="todont" v-on:delete-todo="deleteTodo" v-on:complete-todo="completeTodo" :todo.sync="todo" ></todo>
        </li>
      </transition-group>
    </div>
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
        len: this.todos.length,
        new_len: this.todos.length
      }
    },
    methods: {
      deleteTodo(todo) {
        const todoIndex = this.todos.indexOf(todo);
        this.todos.splice(todoIndex, 1);
        this.new_len = this.todos.length;
        this.changed();
        this.len = this.new_len;
        // this.todos[todoIndex].done = true;
      },
      completeTodo(todo) {
        const todoIndex = this.todos.indexOf(todo);
        this.todos[todoIndex].done = true;
        // this.todos[todoIndex].className = 'ui  card right';
        // console.log(this.todos[todoIndex].className + ' 3u01r8' +this.todos[todoIndex].done);
      },
      changed() {
        console.log(this.len == this.new_len);
        return this.len == this.new_len;
      }
    }
};
</script>
<style lang="css" scoped>
  .col {
    display: inline-block;
    text-align: center;
  }
  ul {
    list-style-type: none;
  }
  .todont {
    /* position: absolute; */
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

</style>
