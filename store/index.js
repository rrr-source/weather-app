import Vuex from 'vuex';

const store = () => {
  return new Vuex.Store({
    state: {
      isDarkTheme: false
    },
    mutations: {
      toggleTheme(state) {
        console.log('Before toggling:', state.isDarkTheme);
        state.isDarkTheme = !state.isDarkTheme;
        console.log('After toggling:', state.isDarkTheme);
      }
    },
    actions: {
      toggleTheme({ commit }) {
        console.log('Dispatching toggleTheme');
        commit('toggleTheme');
      }
    }
  })
}

export default store;
