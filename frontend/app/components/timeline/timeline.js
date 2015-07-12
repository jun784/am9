'use strict';

require('./timeline.scss');

module.exports = {
  template: require('./timeline.html'),
  data: {
    start: (function(now) {
      now.setHours(0);
      now.setMinutes(0);
      now.setSeconds(0);
      now.setMilliseconds(0);
      return now.getTime();
    })(new Date()),
    time: 1000 * 60 * 60 * 24,
    step: 1000 * 60 * 15,
    stepLength: 30,
    currentTime: Date.now(),

    resources: null
  },

  components: {
    resource: require('../resource/resource')
  },

  ready: function() {
    var $el = $(this.$el);
    var scrollTop = this.currentTop - $el.height() / 2;
    $el.scrollTop(scrollTop);
  },

  computed: {
    height: function() {
      return this.time / this.step * this.stepLength;
    },

    currentTop: function() {
      return (this.currentTime - this.start) / this.time * this.height;
    }
  },

  methods: {
    refresh: function(timeline) {
      if (timeline.start) {
        this.start = timeline.start;
      }
      if (timeline.time) {
        this.time = timeline.time;
      }
      if (timeline.resources) {
        this.resources = timeline.resources;
      }
    },

    updateCurrentTime: function(current) {
      this.currentTime = current;
    }
  }
};
