<template lang="html">
  <div :class="{left: !done, right: done } " class="card ui">
    <div>
      <button type="button"@click="deleteTodo(todo)" class="remove">
        <i class="trash alternate icon"></i>
      </button>
      <div class="remove-after"></div>
      <h5>{{todo.title}}</h5>
      <h6>{{todo.project}}</h6>
      <h3 v-show="done">Completed</h3>
      <hr>
      <ul>
        <li v-for="time in todo.times"> {{time}}</li>
      </ul>
      <transition name="slide-fade" mode="out-in">
        <div v-if="!timing && !done" key="begin">
          <!--  v-show="!timing && !done"-->
          <button type="button" @click="startTime" > Begin </button>
        </div>
        <!--   v-show="timing && !done"-->
        <div class="stopwatch" v-if="timing && !done" key="timer" >
          <stopwatch v-on:calculated="calculated"></stopwatch>
          <button type="button" @click="timing = !timing" v-show="timing"> Done For Now </button>
        </div>
      </transition>
      <br>
      <button type="button" @click="completeTodo(todo)" :aria-label="todo.done ? 'Undone' : 'Done'">
        <i class="check circle outline icon"></i>
      </button>
    </div>
    <div v-if="done">
      <h6>Total Time:</h6>
      {{total}}
    </div>
  </div>
</template>

<script>
import Stopwatch from './Stopwatch';

export default {
  props: ['todo'],
  components: {
    Stopwatch
  },
  data() {
    return {
      total: 0,
      timing: false,
      done: false,
      created: true,
      state: 'beginning'
    };
  },
  methods: {
    completeTodo(todo) {
        this.done = !this.done;
        this.$emit('complete-todo', todo);
      },
      calculated(total) {
        this.total = total.sum;
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

<style lang="css" scoped>
  .todo {
    border: 1px solid black;
    width: 400px;
    margin: 0 auto;
    padding: 20px;
    display: block;
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);

  }
  .remove {
    float: right;
  }
  .remove-after {
    clear: both;
  }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
