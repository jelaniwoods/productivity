<template lang="html">

  <div class="todo">

    <input type="text" placeholder="Add Todo" v-model="titleText">
    <button type="button" @click="createTodo">Add</button>


  </div>


</template>

<script>
export default {

  data() {
    return {
      titleText: '',
      project: '',
      times: []

    };
  },

  methods: {
    createTodo: function () {

    }
  }

}
</script>

<style lang="css">
</style>
