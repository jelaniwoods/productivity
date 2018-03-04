<template lang="html">
  <div >
    <transition name="slide-fade" mode="out-in">
      <div v-if="!isCreating" key="begin">
        <button v-on:click="openForm">
          <i class="plus icon"></i>
        </button>

      </div>
    <div v-if="isCreating" key="struff">
      <div>
        <div>
          <div>
            <label>Title</label>
            <input v-model="titleText" type='text'>
          </div>
          <div>
            <label>Project</label>
            <input v-model="projectText" type='text'>
          </div>
          <div >
            <button v-on:click="sendForm">
              Create
            </button>
            <button v-on:click="closeForm">
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
</style>
