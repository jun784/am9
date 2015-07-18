'use strict';

import Vue from 'vue';

import timeline from '../components/timeline/timeline';
import add from '../components/add/add';

var app = new Vue({
  el: '#app',
  data: {
    resources: [
      {
        id: 1,
        doings: [{
          id: 1,
          body: 'シャワーを浴びる',
          start: new Date(2015, 5, 28, 8, 0).getTime(),
          time: 1000 * 60 * 60 * 2,
          done: false
        }, {
          id: 2,
          body: 'ご飯を食べる',
          start: new Date(2015, 5, 28, 10, 30).getTime(),
          time: 1000 * 60 * 25,
          done: false
        }, {
          id: 3,
          body: '掃除をする',
          start: new Date(2015, 5, 28, 11, 0).getTime(),
          time: 1000 * 60 * 25,
          done: false
        }, {
          id: 11,
          body: 'お風呂に入る',
          start: new Date(2015, 5, 28, 13, 0).getTime(),
          time: 1000 * 60 * 115,
          done: false
        }, {
          id: 12,
          body: 'カラオケ',
          start: new Date(2015, 5, 28, 15, 0).getTime(),
          time: 1000 * 60 * 55,
          done: false
        }, {
          id: 13,
          body: '◯◯の開発',
          start: new Date(2015, 5, 28, 17, 0).getTime(),
          time: 1000 * 60 * 175,
          done: false
        }]
      }
    ]
  },

  created: function() {
    this.$on('doing-added', (idx) => {
      this.$broadcast('doing-added', idx);
    });
  },

  components: { timeline, add }
});
