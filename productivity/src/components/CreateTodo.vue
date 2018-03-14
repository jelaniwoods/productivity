<template lang="html">
  <div :class="{create_color: isCreating}" class="create">
    <transition name="slide-fade" mode="out-in">
      <div v-if="!isCreating" key="begin">
        <button id="plux" v-on:click="openForm">
          <i class="plus icon"></i>
        </button>

      </div>
    <div v-if="isCreating" key="struff">
      <div>
        <div>
          <div>
            <label>Title</label>
            <br/>
            <input v-model="titleText" type='text'>
          </div>
          <div>
            <label>Project</label>
            <br/>
            <input v-model="projectText" type='text'>
          </div>
          <div class="buttons">
            <button v-on:click="sendForm" class="bounce_left">
              Create
            </button>
            <button v-on:click="closeForm" class="bounce_right">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titleText: '',
      projectText: '',
      isCreating: false,
    };
  },
  methods: {
    openForm() {
      this.isCreating = true;
    },
    closeForm() {
      this.isCreating = false;
    },
    sendForm() {
      if (this.titleText.length > 0 && this.projectText.length > 0) {
        const title = this.titleText;
        const project = this.projectText;
        this.$emit('create-todo', {
          title: this.titleText,
          project: this.projectText,
          timing: false,
          done: false
        });
        this.titleText = '';
        this.projectText = '';
        this.isCreating = false;
      }
    },
  }
}
</script>

<style lang="css" scoped>
.create {
  width: 50%;
  margin: 0 auto;
  height: 200px;
}
#plux {
  margin-top: 80px;
}
.create_color {
  background-color:darkslateblue;
  
}
.create label {
    color: #fff;
    font-weight: bold;
  line-height: 2em;
    font-size: 15px;
    /* text-shadow: 1px 1px 1px #fff; */
}
button {
  transition: all .15s ease-in-out;
  border-width: 0px;
  border-radius: 5px;
  padding: 5px;   
}
.buttons {
  margin: 0 auto;
}
.buttons button {
  /* margin-left: 2em;  */
}
.bounce_left {
      display: inline-block;
    background-image: linear-gradient(to right, #fff 50%, #333 50%);
    background-size: 200% 100%;
    background-repeat: no-repeat;
    color: #000;
    background-position: bottom left;
}
.bounce_left:hover {
    color: #fff;
    /* border-color: #fff; */
    animation-name: bounceLeft;
    animation-duration: .3s;
    background-position: 100% 0%;
    -webkit-transition: all 0.25s ease-out;
    -moz-transition: all 0.25s ease-out;
    transition: all 0.25s ease-out;
}
.bounce_right {
    background-image: linear-gradient(to left, #fff 50%, #333 50%);
    background-size: 200% 100%;
    background-repeat: no-repeat;
    background-position: bottom right;
}   
.bounce_right:hover {
    color: #fff;
    border-color: #fff;
    animation-name: bounceRight;
    animation-duration: .3s;
    background-position: 0% 0%;
    -webkit-transition: all 0.25s ease-out;
    -moz-transition: all 0.25s ease-out;
    transition: all 0.25s ease-out;
}
input {
  width: 50%;
  border: 1px solid transparent;
  transition: all .15s ease-out;
  border-radius: 3px;
  padding: 5px 8px 5px 8px;
  color:rgb(156, 116, 221);

}
input:hover {
  border: 1px solid #FFC2DC;
}
input:focus {
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border: 1px solid rgb(233, 194, 255);
    outline: none;
    color: rgb(156, 116, 221);
    /* color: #F072A9; */
    padding: 5px 8px 5px 8px;
    box-shadow: inset 1px 1px 4px #FFD5E7;
    -moz-box-shadow: inset 1px 1px 4px #FFD5E7;
    -webkit-box-shadow: inset 1px 1px 4px #FFD5E7;
    background: #FFEFF6;
    width:50%;
}
.buttons {
  padding-top: 2em;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
@keyframes bounceRight {
    0%  {background-position: 100% 100%; }
    40%  {background-position: 0% 0%; }
    65%  {background-position: 8% 0%; }
    100% {background-position: 0% 0%; }
}
@keyframes bounceLeft {
    0%  {background-position: 0% 0%; }
    40%  {background-position: 100% 0%; }
    65%  {background-position: 92% 0%; }
    100% {background-position: 100% 0%; }
}
</style>
