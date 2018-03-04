<template lang="html">
  <div class="ui three stackable cards">

    <transition-group name="fade" mode="out-in">
      <div v-if="todos.length" class="todo-container" key="full">
          <todo v-on:delete-todo="deleteTodo" v-on:complete-todo="completeTodo" v-for="todo in todos" :todo.sync="todo" ></todo>
      </div>
      <div v-if="!changed"class="todo-container" key="empty">

      </div>
    </transition-group>
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

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s ease;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

</style>
