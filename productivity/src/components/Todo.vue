<template lang="html">

  <div class="todo">

    <!-- <button type="button" @click="open" v-show="!isEditing"> + </button> -->
    <div v-show="!isEditing">
      <h5>{{todo.title}}</h5>
      <h6>{{todo.project}}</h6>
      <hr>
      <ul>
        <li v-for="time in todo.times"> {{time}}</li>
      </ul>
      <button type="button" @click="startTime" v-show="!timing && !done"> Begin </button>
      <stopwatch v-show="timing"> </stopwatch>
      <button type="button" @click="timing = !timing" v-show="timing"> Done For Now </button>
      <button type="button"@click="deleteTodo(todo)"> X </button>
      <br>
      <button type="button" @click="completeTodo(todo)" v-show="!done"> O </button>
    </div>
    <!-- <div v-show="isEditing">
      <input type="text" placeholder="Add Todo">
      <button type="button" @click="">Add</button>
      <button type="button" @click=""> X </button>

    </div> -->


  </div>


</template>

<script>

import stopwatch from './Stopwatch';
import TodoList from './TodoList';

export default {

  props: ['todo'],
  components: {
    'stopwatch': stopwatch,
    'todo-list': TodoList
  },
  data() {
    return {
      isEditing: false,
      timing: false,
      done: false
    };
  },

  methods: {
    open: function () {
      this.isEditing = true;
    },

    close: function () {
      this.isEditing = false;
    },
    completeTodo(todo) {
        this.done = true;
        console.log(  "8888" + this.done);
        this.$emit('complete-todo', todo);
      },
    deleteTodo(todo) {
        this.$emit('delete-todo', todo);
      },

    startTime: function () {
      this.timing = true;
      console.log('timer started');
    }
  }

}
</script>

<style lang="css">
  .todo {
    border: 1px solid black;
    width: 400px;
    margin: 0 auto;
    padding: 20px;
  }
</style>
