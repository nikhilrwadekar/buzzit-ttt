<template>
  <div>
    <h1>Scorecard</h1>
    <h2>Player 1 ({{p1name}}): {{p1score}}</h2>
    <h2>Player 2 ({{p2name}}): {{p2score}}</h2>

    <!-- Button for New Game w/ different names -->
    <button @click="$router.replace({ path: '/playernames'})">New Game!</button>

    <!-- Button for playing again with the same names -->
    <button @click="$router.replace({ path: '/gameplay'})">Play Again!</button>
  </div>
</template>

<script>
export default {
  name: "scorecard",
  computed: {
    p1score() {
      return this.$store.getters.p1score;
    },
    p2score() {
      return this.$store.getters.p2score;
    },
    p1name() {
      return this.$store.getters.p1name;
    },
    p2name() {
      return this.$store.getters.p2name;
    }
  }
};
</script>

<style>
</style>