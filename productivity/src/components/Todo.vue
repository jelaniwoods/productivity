<template lang="html">
  <div :class="{left: !done, right: done } " class="card ui">
    <div>
      <h5>{{todo.title}}</h5>
      <h6>{{todo.project}}</h6>
      <h3 v-if="done">Completed</h3>
      <hr>
      <ul>
        <li v-for="time in todo.times"> {{time}}</li>
      </ul>
      <button type="button" @click="startTime" v-show="!timing && !done"> Begin </button>
      <div class="stopwatch" v-show="timing && !done">
        <stopwatch v-on:calculated="calculated"></stopwatch>
      </div>
      <button type="button" @click="timing = !timing" v-show="timing"> Done For Now </button>
      <button type="button"@click="deleteTodo(todo)"> X </button>
      <br>
      <button type="button" @click="completeTodo(todo)" v-show="!done"> O </button>
    </div>
    <div v-if="done">
      <h6>Total Time:</h6>
      {{total}}
    </div>
  </div>
</template>

<script>

import Stopwatch from './Stopwatch';
// import TodoList from './TodoList';

export default {
  props: ['todo'],
  components: {
    Stopwatch
    // 'todo-list': TodoList
  },
  data() {
    return {
      total: 0,
      timing: false,
      done: false
    };
  },

  methods: {
    completeTodo(todo) {
        this.done = true;
        // console.log(  "8888" + this.title);
        this.$emit('complete-todo', todo);
      },
      calculated(total) {
        this.total = total.sum;
        // console.log(total.sum + '   787d89d6 ' + this.total);
      },
    deleteTodo(todo) {
        this.$emit('delete-todo', todo);
      },

    startTime: function () {
      this.timing = true;
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
    display: block;
  }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
