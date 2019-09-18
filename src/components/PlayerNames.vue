<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-0 col-md-3 col-lg-4"></div>
      <div class="col-sm-12 col-md-6 col-lg-4">
        <div class="jumbotron">
          <h3>Player Names</h3>
          <div>
            Player 1 Name:
            <input class="form-control" v-model="player1" type="text" />
          </div>
          <div>
            Player 2 Name:
            <input class="form-control" v-model="player2" type="text" />
          </div>

          <!-- Storing Player Names with VueX -->
          <button
            type="button"
            class="btn btn-success"
            v-if="player1 && player2"
            @click="setPlayerNames(player1,player2)"
          >Start Game!</button>
        </div>
      </div>
    </div>
    <div class="col-sm-0 col-md-3 col-lg-4"></div>
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