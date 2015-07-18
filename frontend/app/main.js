'use strict';

var Vue = require('vue');
var route = require('vue-route');

Vue.use(route);

var root = new Vue({
  el: '#app',

  routes: {
    '/group': {
      componentId: 'group',
      isDefault: true
    },

    options: {
      hashbang: true
    }
  },

  components: {
    group: require('./components/group/group')
  }
});
