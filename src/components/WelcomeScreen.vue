<template>
  <div class="container">
    <div class="jumbotron">
      <h1>Welcome to TicTacToe!</h1>
      <h2>Organized by {{organizer}}</h2>

      <!-- Router link to get player names -->
      <button
        type="button"
        class="btn btn-primary"
        @click="$router.push({ path: 'playernames' })"
      >Start Playing</button>
    </div>
  </div>
</template>

<script>
import playernames from "./PlayerNames.vue";

export default {
  name: "welcomescreen",
  components: {
    playernames
  },
  props: {
    organizer: {
      type: String,
      default: "BuzzIt"
    }
  }
};
</script>

<style scoped>
#start-playing {
  font-size: 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
}
</style>