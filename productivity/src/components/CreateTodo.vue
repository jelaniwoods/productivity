<template lang="html">
  <div >
    <button v-on:click="openForm" v-show="!isCreating">
      +
    </button>
    <div v-show="isCreating">
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

<style lang="css">
</style>
