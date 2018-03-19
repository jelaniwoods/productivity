<template lang="html" v-if="todos.length" tag="div">
  <div class="ui one column" >
    <div class="todo-container " id="todolist">
      <transition-group name="todolist" tag="ul" class="cen">
        <li v-for="todo in todoByStatus" :key="todo.id" class="todont" v-bind:class="todo.done ? 'done' : ''">
          <todo v-on:delete-todo="deleteTodo" v-on:complete-todo="completeTodo" :todo.sync="todo" ></todo>
        </li>
      </transition-group>
    <togglebutton :todos="todos" label="Move done items at the end?" name="todosort" v-on:clicked="clickontoogle" />
    </div>
  </div>
</template>

<script>
import Todo from './Todo';
import Stopwatch from './Stopwatch';
import togglebutton from './ToggleButton';
export default {
  props: ['todos'],
    components: {
      Todo,
      Stopwatch,
      togglebutton
    },
    data() {
      return {
        len: this.todos.length,
        new_len: this.todos.length,
        sortByStatus: false
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
        this.todos[todoIndex].done = !this.todos[todoIndex].done;
        // this.todos[todoIndex].className = 'ui  card right';
        // console.log(this.todos[todoIndex].className + ' 3u01r8' +this.todos[todoIndex].done);
      },
      changed() {
        console.log(this.len == this.new_len);
        return this.len == this.new_len;
      },
      clickontoogle: function(active) {
        this.sortByStatus = active;
        console.log('ojfo');
      }
    },
    computed: {
      todoByStatus() {
        if(!this.sortByStatus) {
          return this.todos;
        }
        var sortedArray = []
        var doneArray = this.todos.filter(function(todo) { return todo.done; });
        var notDoneArray = this.todos.filter(function(todo) { return !todo.done; });
        sortedArray = [...notDoneArray, ...doneArray];
        return sortedArray;
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
    margin: 0 auto;
    /* display: flex; */
  }
  .todont {
    /* position: absolute; */
    padding-bottom: 2em;
  }
  #todolist ul {
    margin-top:2.6rem;
    list-style:none;
  }
  #todolist .todolist-move {
    transition: transform 1s;
  }
  #todolist li {
    display:flex;
    margin:0 -3rem 4px;
    padding:1.1rem 3rem;
    justify-content:space-between;
    align-items:center;
    background:rgba(255,255,255,0.1);
  }
  #todolist .emptylist {
    margin-top:2.6rem;
    text-align:center;
    letter-spacing:.05em;
    font-style:italic;
    opacity:0.8;
    
  }
  /* .cen {
    display: flex;
    flex-direction: column;
    border: 10px solid lightgray
  } */
  togglebutton {
    display: block;
  }
  .todolist-enter-active, .todolist-leave-active {
    transition: opacity .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .todolist-enter, .todolist-leave-to {
    opacity: 0;
  }

</style>
