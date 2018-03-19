<template lang="html">
  <div  class="card ui todo lefter">
    <div id="appe">
      <div class="history card ui todo lefter">
        <!-- <a href="https://stackoverflow.com/questions/45128744/vue-css-how-to-make-a-smooth-height-transition-between-two-alternating-elements" >AAAA</a> -->
        <div>
          <div class="row"> 
            <button type="button"@click="deleteTodo(todo)" class="remove ui button">
              <i class="trash alternate icon"></i>
            </button>
          </div>
          <div class="text">
            <h2>{{todo.title}}</h2>
            <h3>{{todo.text}}</h3>
          </div>
          <hr>
        </div>
        <div class="stopperwatch" :class="{bgc: done}">
          <transition name="slide-fade" mode="out-in">
            <div v-if="!timing && !done" key="begin" class="stopwatch buttons">
              <button class="ui button" type="button" @click="startTime"> Begin </button>
            </div>
            <div class="stopwatch" v-if="timing && !done" key="timer">
              <stopwatch v-on:calculated="calculated"></stopwatch>
              <button class="ui button" type="button" @click="timing = !timing" v-show="timing"> Done For Now </button>
            </div>
          </transition>
        </div>
        <button class="complete ui button" type="button" @click="completeTodo(todo)" :aria-label="todo.done ? 'Undone' : 'Done'">
          <i :class="done ? 'check circle icon' : 'check circle outline icon'"></i>
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
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .buttons {
    margin-top: 4em;
    margin-bottom: -4em;
  }
  .bgc {
    background-image: url("https://www.aaruush.net/v2013/_images/completed_stamp.png");
    background-size: 200px;
    background-repeat: repeat;
  }
  .complete {
    width: 50%;
    margin: 0 auto;
  }
  .stopperwatch {
    min-height: 200px;
    height: auto;
    max-height: 200px;
    overflow: hidden;
  }
  .stopwatch {
    height: 200px;
  }
  .text {
    padding-top: 1em;
  }
  .remove {
    float: right;
    margin-right: 0;
  }
  .remove i {
    margin: 0 auto !important;
  }
  .row {
    margin-bottom: 2em;
  }
  .remove-after {
    clear: both;
  }
  .slide-fade-enter-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    padding-bottom: 1em;
  }
  .slide-fade-leave-active {
    transition: all .28s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }


#appe {
  display: flex;
  height:auto;
  flex-direction: column;
}

.history {
  display: flex;
  flex: 999 1 auto;
  flex-direction: column;
}

.placeholder-content {
  min-height: 100px;
}

.interaction-A {
  min-height: 0px;
}

.interaction-B {
  padding: 5px;
  margin: 5px;
  min-height: 10px;
}

.interaction {
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
