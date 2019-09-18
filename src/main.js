import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import welcomescreen from "./components/WelcomeScreen.vue";
import playernames from "./components/PlayerNames.vue";
import gameplay from "./components/Gameplay.vue";
import scorecard from "./components/ScoreCard.vue";
import Vuex from "vuex";

// VueX for Stores
Vue.use(Vuex);

Vue.config.productionTip = false;

// VueRouter for Routing
Vue.use(VueRouter);

// Routes Array
const routes = [
  { path: "/", component: welcomescreen },
  { path: "/playernames", component: playernames },
  {
    path: "/gameplay",
    component: gameplay,
    props(route) {
      return route.query || {};
    }
  },
  { path: "/scorecard", component: scorecard }
];

// Use Routes Array to makea a new Router
const router = new VueRouter({
  routes
});

// Store for saving scores
const store = new Vuex.Store({
  state: {
    // Player names and scores - Default Values
    p1score: 0,
    p2score: 0,
    p1name: "P1",
    p2name: "P2"
  },
  mutations: {
    // Mutations for Stores
    incrementP1Score(state) {
      state.p1score += 1;
    },
    incrementP2Score(state) {
      state.p2score += 1;
    },
    setP1Name(state, playername) {
      state.p1name = playername;
    },
    setP2Name(state, playername) {
      state.p2name = playername;
    }
  },
  actions: {},
  getters: {
    // Getters for Stores
    p1score(state) {
      return state.p1score;
    },
    p2score(state) {
      return state.p2score;
    },
    p1name(state) {
      return state.p1name;
    },
    p2name(state) {
      return state.p2name;
    }
  }
});

const app = new Vue({
  render: h => h(App),
  // Asking Vue to use the Router
  router,
  // Asking Vue to use Stores
  store
}).$mount("#app");

// Exporting Router
export default router;
