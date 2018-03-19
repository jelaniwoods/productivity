<template lang="html">
  <div  class="card ui todo lefter">
    <!-- <div>
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
            <button type="button" @click="startTime" > Begin </button>
          </div>
          <div class="stopwatch" v-if="timing && !done" key="timer" >
            <stopwatch v-on:calculated="calculated"></stopwatch>
            <button type="button" @click="timing = !timing" v-show="timing"> Done For Now </button>
          </div>
        </transition>
        <br>
        <button type="button" @click="completeTodo(todo)" :aria-label="todo.done ? 'Undone' : 'Done'">
          <i :class="done ? 'check circle outline icon' : 'check circle'"></i>
        </button>
      </div> 
    </div> -->

    <div id="appe">
      <div class="history card ui todo lefter">
        <!-- <a href="https://stackoverflow.com/questions/45128744/vue-css-how-to-make-a-smooth-height-transition-between-two-alternating-elements" >AAAA</a> -->
        <div>
          <div class="row"> 
            <button type="button"@click="deleteTodo(todo)" class="remove">
              <i class="trash alternate icon"></i>
            </button>
          </div>
          <div class="text">
            <h2>{{todo.title}}</h2>
            <h3>{{todo.text}}</h3>
          </div>
          <hr>
        </div>
        <div class="stopperwatch">
          <transition name="slide-fade" mode="out-in">
            <div v-if="!timing && !done" key="begin" class="stopwatch buttons">
              <!--  v-show="!timing && !done"-->
              <button type="button" @click="startTime"> Begin </button>
            </div>
            <!--   v-show="timing && !done"-->
            <div class="stopwatch" v-if="timing && !done" key="timer">
              <stopwatch v-on:calculated="calculated"></stopwatch>
              <button type="button" @click="timing = !timing" v-show="timing"> Done For Now </button>
            </div>
          </transition>
        </div>
        <button class="complete" type="button" @click="completeTodo(todo)" :aria-label="todo.done ? 'Undone' : 'Done'">
          <i :class="done ? 'check circle outline icon' : 'check circle icon'"></i>
        </button>
      </div>
      <div class="interaction" v-bind:class="{ show_B: !show_A }">
        <transition name="fade" mode="out-in">
          <div v-if="show_A" class="interaction-A" key="a"></div>
          <div v-else class="interaction-B" key="b"> 
            <h3>Completed</h3>
            <p>{{total.sum}}</p>
          </div>
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
        this.show_A = !this.show_A;
        this.$emit('complete-todo', todo);
      },
      calculated(total) {
        this.total = total;
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
    width: 400px;
    /* overflow-y: auto;
    display: flex;
    flex-direction: column;
    border: 10px solid lightgray; */
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);

  }
  .buttons {
    margin-top: 2em;
    margin-bottom: -2em;
  }
  .complete {
    width: 50%;
    margin: 0 auto;
  }
  .stopperwatch {
    /* padding-bottom: 1em; */
    min-height: 120px;
    height: auto;
    max-height: 200px;
    overflow: hidden;
    /* height: 120px; */
  }
  .stopwatch {
    height: 120px;
  }
  .text {
    padding-top: 1em;
  }
  .remove {
    float: right;
  }
  .row {
    margin-bottom: 2em;
  }
  .remove-after {
    clear: both;
  }
  .slide-fade-enter-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    /* max-height: 5px; */
    padding-bottom: 1em;
  }
  .slide-fade-leave-active {
    transition: all .28s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    /* max-height: 0px; */
    /* padding-bottom: 1em; */
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
    /* transform: translateX(10px); */
    opacity: 0;
    /*padding-bottom: 1em; */
  }


#appe {
  display: flex;
  /* height: 300px; */
  height:auto;
  flex-direction: column;
  /* border: 10px solid lightgray */
}

.history {
  /* border: 3px solid lightyellow; */
  display: flex;
  flex: 999 1 auto;
  flex-direction: column;
  /* overflow-y: auto; */
}

.placeholder-content {
  min-height: 100px;
}

.interaction-A {
  /* border: 3px solid lightblue; */
  /* padding: 5px; */
  /* margin: 5px; */
  min-height: 0px;
}

.interaction-B {
  /* border: 3px solid lightblue; */
  /* padding: 5px; */
  /* margin: 5px; */
  min-height: 10px;
}

.interaction {
  /* border: 10px solid lightgreen; */
  display: flex;
  flex: 1 0 auto;
  text-align: center;
  max-height: 12px;
  margin: 0 auto;
  transition: max-height 0.25s ease-out;
}

.interaction.show_B {
    max-height: 90px;
    text-align: center;
    padding-bottom: 2em;
    margin: 0 auto;
    transition: max-height 0.15s ease-in;
}

.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .10s;
 }

.fade-enter-active {
  transition-delay: .25s;
}
.fade-enter-to {
  opacity: 1;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
 }


</style>
