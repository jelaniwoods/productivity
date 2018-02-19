<template lang="html">

  <div class="todo">

    <button type="button" @click="open" v-show="!isCreating"> + </button>

    <div v-show="isCreating">
      <input type="text" placeholder="Add Todo" v-model="titleText">
      <button type="button" @click="create">Add</button>
      <button type="button" @click="deleteTodo"> X </button>

    </div>


  </div>


</template>

<script>
export default {

  data() {
    return {
      titleText: '',
      project: '',
      times: [],
      isCreating: false

    };
  },

  methods: {
    open: function () {
      this.isCreating = true;
    },

    close: function () {
      this.isCreating = false;
    },
    deleteTodo(todo) {
        this.$emit('delete-todo', todo);
      },
    create: function () {

      if (this.titleText.length > 0 && this.projectText.length > 0) {
        const title = this.titleText;
        const project = this.project;
        this.$emit('create-todo', {
            title,
            project,
            done: false,
          });
          this.titleText = '';
          this.project = '';
          this.isCreating = false;
      }
    }
  }

}
</script>

<style lang="css">

</style>
