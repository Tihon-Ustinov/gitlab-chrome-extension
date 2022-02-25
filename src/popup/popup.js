import Vue from 'vue';
import App from './App';
import store from '../store';
import router from './router';

global.browser = require('webextension-polyfill');

Vue.prototype.$browser = global.browser;

store.subscribe((mutation, state) => {
  console.log(chrome.runtime.id);
  
  window.localStorage.setItem(chrome.runtime.id, JSON.stringify(state));
  chrome.runtime.sendMessage(chrome.runtime.id, 'update')

});

/* eslint-disable no-new */
new Vue({
  el: '#___pipeline-notifer___',
  store,
  router,
  render: h => h(App),
  beforeCreate() {
    this.$store.commit('INITIALISE_STORE');
  }
});
