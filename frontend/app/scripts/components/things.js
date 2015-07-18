'use strict';

import stores from '../models/stores';

var things = new Vue({
  el: '#things',

  data: {
    things: [{
      id: '1',
      body: 'abc1',
      start: new Date().getTime(),
      time: 1000 * 60 * 55,
      done: false
    },{
      id: '2',
      body: 'abc2',
      start: new Date().getTime(),
      time: 1000 * 60 * 55,
      done: false
    },{
      id: '3',
      body: 'abc3',
      start: new Date().getTime(),
      time: 1000 * 60 * 55,
      done: false
    }]
  },

  ready: function() {

  },

  created: function() {

  },

  computed: {

  },

  methods: {
    onClickMoveThing: function() {
      // this.things.push({id: Math.random(100), title: title });
    },
    onClickAddThing: function(title) {
      // console.log(this.things);
      this.things.push({id: Math.random(100), body: ""});
    }
  }
});

export {things};