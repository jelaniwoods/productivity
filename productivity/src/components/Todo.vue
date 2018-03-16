<template lang="html">
  <div  class="card ui todo">
    <div>
      <div class="history">
        <button type="button"@click="deleteTodo(todo)" class="remove">
          <i class="trash alternate icon"></i>
        </button>
        <div class="remove-after"></div>
        <h4>{{todo.title}}</h4>
        <h5>{{todo.text}}</h5>
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
      <div class="interaction" >
        <transition name="fade" mode="out-in">
          <div v-if="done" class="interaction-B" key="a">
            <h6>Total Time:</h6>
            {{total}}
          </div>
          <div v-else class="interaction-A" key="b">
          </div>
        </transition>
      </div>
    </div>

    <div id="appe">

      <div class="history">
        <p>
        How to make the green bordered area transition smoothly between different height in states A and B?
        </p>
        <div class="placeholder-content">
        </div>
      </div>

        <button @click="(show_A ? show_A = false : show_A = true);">
          Cycle states
        </button>
      <div class="interaction" v-bind:class="{ show_B: !show_A }">
        
        <transition name="fade" >
          <div v-if="show_A" class="interaction-A" key="a"> A </div>
          <div v-else class="interaction-B" key="b"> B </div>
        </transition>
        
      </div>  
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
      show_A: true,
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
    margin: 0 auto;
    /* overflow-y: auto;
    display: flex;
    flex-direction: column;
    border: 10px solid lightgray; */
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





#appe {
  display: flex;
  height: 600px;
  flex-direction: column;
  border: 10px solid lightgray
}

.history {
  border: 3px solid lightyellow;
  display: flex;
  flex: 999 1 auto;
  flex-direction: column-reverse;
  overflow-y: auto;
}

.placeholder-content {
  min-height: 10px;
}

.interaction-A {
  border: 3px solid lightblue;
  padding: 5px;
  margin: 5px;
  min-height: 200px;
}

.interaction-B {
  border: 3px solid lightblue;
  padding: 5px;
  margin: 5px;
  min-height: 300px;
}

.interaction {
  border: 10px solid lightgreen;
  display: flex;
  flex: 1 0 auto;
  max-height: 225px;
  transition: max-height 0.25s ease-out;
}

.interaction.show_B {
    max-height: 325px;
    transition: max-height 0.15s ease-in;
}
/* // aa */
 



  .fade-enter-active, .fade-leave-active {
    transition-property: opacity;
    transition-duration: .50s;
  }

  .fade-enter-active {
    transition-delay: .25s;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }


</style>
