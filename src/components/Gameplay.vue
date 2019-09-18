<template>
  <div id="gameplay">
    <h3>
      <div>{{p1name}} : {{p1score}} pts</div>vs
      <div>{{p2name}} : {{p2score}} pts</div>
    </h3>
    <transition name="smoothUX">
      <h4
        v-if="!winnerDeclared && currentPlayer"
      >It is {{currentPlayer}}'s turn to play {{gameTurn}}s!</h4>
      <h4 v-else-if="winnerDeclared">{{winnerDeclared}} WINS!</h4>
    </transition>
    <div id="board">
      <!-- Using Buttons to render TicTacToe Boxes -->

      <button
        v-for="(state, index) in gameState"
        v-on:click="makeMove($event, index)"
        :id="index"
        :key="index"
      >
        <!-- Print Text only if it's Xs and Os -->
        <span v-if="gameState[index]=='X' || gameState[index]=='O'">{{gameState[index]}}</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "gameplay",

  data() {
    return {
      // Setting initial values for Button Text so that they don't match
      gameState: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      // Duplicate Click Handler
      clickedAlready: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ],
      // Winning conditions
      winnersCondition: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
      ],
      // Count till 9 for a draw
      count: 0,
      // Assigning X or O randomly
      gameTurn: Math.random() > 0.5 ? "X" : "O",
      // No Winner to begin with
      winnerDeclared: false,
      // Random First Player Logic
      currentPlayer: Math.random() > 0.5 ? this.p1name : this.p2name
    };
  },
  methods: {
    // Make move if winner hasn't been declared AND it hasn't been clicked AND the total count is < 9
    makeMove(e, index) {
      if (
        !this.winnerDeclared &&
        !this.clickedAlready[index] &&
        this.count < 9
      ) {
        this.count++;
        this.gameState[index] = this.gameTurn;
        this.clickedAlready[index] = true;
        e.target.innerText = this.gameTurn;
        this.gameTurn = this.gameTurn === "X" ? "O" : "X";
        this.checkWinner();
        this.changePlayer();
      } else {
        // Do Nothing
      }
    },
    changePlayer() {
      // Change Player Names
      this.currentPlayer =
        this.currentPlayer === this.p1name ? this.p2name : this.p1name;
    },
    checkWinner() {
      console.log("Checking for a winner...");
      this.winnersCondition.forEach(condition => {
        // If Winning Criteria is met, Increment Score for player and take them to the scoreboard
        if (
          this.gameState[condition[0] - 1] ===
            this.gameState[condition[1] - 1] &&
          this.gameState[condition[1] - 1] === this.gameState[condition[2] - 1]
        ) {
          console.log(`We have a winner!: ${condition}`);
          this.winnerDeclared = this.currentPlayer;

          // Increment Score for winner
          this.incrementScore(this.currentPlayer);

          // Navigate to scoreboard
          this.$router.replace({ path: "/scorecard" });
        } else if (this.count === 9) {
          // If no winner is declared after 9 clicks, consider it a draw
          this.$router.replace({ path: "/scorecard" });
        }
      });
    },
    incrementScore(playername) {
      // Mutate player scores
      if (playername == this.p1name) {
        this.$store.commit("incrementP1Score");
      } else {
        this.$store.commit("incrementP2Score");
      }
    }
  },
  computed: {
    // Get Player scores and Names
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

<style scoped>
/* Buttons for the Game */
button {
  height: calc(100vh / 5);
  background: transparent;
  border: 1px solid #555;
  font-size: 2rem;
}

/* Grid Layout for the Board itself */
#board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 2em;
}

#gameplay {
  max-width: 500px;
  margin: 0 auto;
}

/* Animation */

.smoothUX-enter-active {
  animation: smoothUX 0.25s;
}

.smoothUX-leave-active {
  animation: smoothUX 0.25s reverse;
}

@keyframes smoothUX {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  80% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
}
</style>