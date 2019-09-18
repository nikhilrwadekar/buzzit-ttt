<template>
  <div>
    <h3>Player Names</h3>
    <div>
      Player 1 Name:
      <input v-model="player1" type="text" />
    </div>
    <div>
      Player 2 Name:
      <input v-model="player2" type="text" />
    </div>

    <!-- Storing Player Names with VueX -->
    <button v-if="player1 && player2" @click="setPlayerNames(player1,player2)">Start Game!</button>
  </div>
</template>

<script>
export default {
  name: "playernames",
  data() {
    return {
      player1: null,
      player2: null
    };
  },
  methods: {
    setPlayerNames(player1, player2) {
      // Storing Player Names
      this.$store.commit("setP1Name", player1);
      this.$store.commit("setP2Name", player2);

      // Moving to Gameplay after Player names are stored
      this.$router.replace({ path: "/gameplay" });
    }
  }
};
</script>

<style>
</style>