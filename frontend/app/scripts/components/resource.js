'use strict';

import stores from '../models/stores';

Vue.component('resource', {
  template: '#resource',
  replace: true,

  created: function() {
    stores.timeline.on('addDoing', (data) => {
      if (data.resourceId !== this.id) {
        return;
      }

      this.doings.$add(data.doing);

      setTimeout(() => {
        var list = this.$.doing;
        this.resolveConflict(list[list.length - 1]);
      }, 100);
    });
  },

  methods: {
    resolveConflict: function(target, fixed) {
      var i, ii, fixedStart, startIdx, cur, next, doingList;
      var margin = 1000 * 60 * 5;

      // sort doings based on the center position
      doingList = this.$.doing;
      doingList.sort((a, b) => {
        return a.start + a.time / 2 - b.start - b.time / 2;
      });

      // move to upper if the target overlaps the next doing
      startIdx = doingList.indexOf(target);
      next = doingList[startIdx + 1];
      if (!fixed && next && target.start + target.time + margin > next.start) {
        target.start = next.start - target.time - margin;
      }

      // resolve the conflict between target and fixed position
      fixedStart = this.$parent.currentTime;
      for (i = 0, ii = doingList.length; i < ii; ++i) {
        if (fixedStart < doingList[i].start) {
          // detect the start position of conflict resolution
          startIdx = Math.min(startIdx, i);
          break;
        }

        // skip the target position if the fixed flag is unset
        if ((fixed || target !== doingList[i]) && doingList[i].isDoing) {
          fixedStart = doingList[i].start + doingList[i].time;
        }
      }
      // don't move the target if the fixed flag is set
      if (!fixed && target.start < fixedStart + margin) {
        target.start = fixedStart + margin;
      }

      // move the position of doings while the conflict is resolved
      cur = doingList[startIdx];
      for (i = startIdx + 1, ii = doingList.length; i < ii; ++i) {
        next = doingList[i];

        if (next.willDo) {
          if (cur.start + cur.time + margin > next.start) {
            next.start = cur.start + cur.time + margin;
          }

          cur = next;
        }
      }
    }
  }
});
