/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(4);
	__webpack_require__(2);
	__webpack_require__(3);
	module.exports = __webpack_require__(9);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _modelsStores = __webpack_require__(2);

	new Vue({
	  el: '#add',
	  props: ['resource-id'],

	  ready: function ready() {
	    var _this2 = this;

	    var _this = this;
	    var $el = $(this.$el);
	    var $textarea = $el.find('#add-textarea');

	    $textarea.draggable({
	      axis: 'y',
	      disabled: true,
	      drag: function drag(event, ui) {
	        _this2.top = ui.position.top;
	      },
	      stop: function stop(event, ui) {
	        _this2.top = ui.position.top;
	        _modelsStores.stores.timeline.addDoing(_this2.resourceId, {
	          body: $textarea.text(),
	          start: new Date().getTime(),
	          time: 1000 * 60 * 25
	        });
	        $el.removeClass('add-active');
	      }
	    });
	    $el.find('#add-icon').on({
	      'click': function click() {
	        $el.toggleClass('add-active');
	      }
	    });
	    $el.find('#up-icon').on({
	      'click': function click() {
	        var flag = $el.hasClass('add-drag');
	        $el.toggleClass('add-drag');
	        $el.find('#add-textarea').attr('style', '').attr('contentEditable', flag).draggable('option', 'disabled', flag);
	      }
	    });
	  },

	  created: function created() {},

	  computed: {},

	  methods: {}
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _timelineStore = __webpack_require__(3);

	var stores = {
	  timeline: new _timelineStore.TimelineStore()
	};

	exports.stores = stores;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _store = __webpack_require__(4);

	var TimelineStore = (function (_Store) {
	  function TimelineStore() {
	    var _this = this;

	    _classCallCheck(this, TimelineStore);

	    _get(Object.getPrototypeOf(TimelineStore.prototype), 'constructor', this).call(this);
	    this.data = {
	      resources: [{
	        id: 1,
	        doing: [{
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
	      }, {
	        id: 2,
	        doing: [{
	          id: 4,
	          body: 'シャワーを浴びる',
	          start: new Date(2015, 5, 28, 14, 0).getTime(),
	          time: 1000 * 60 * 60 * 2,
	          done: false
	        }, {
	          id: 5,
	          body: 'ご飯を食べる',
	          start: new Date(2015, 5, 28, 16, 30).getTime(),
	          time: 1000 * 60 * 25,
	          done: false
	        }, {
	          id: 6,
	          body: '掃除をする',
	          start: new Date(2015, 5, 28, 17, 0).getTime(),
	          time: 1000 * 60 * 25,
	          done: false
	        }]
	      }, {
	        id: 3,
	        doing: [{
	          id: 7,
	          body: 'Vue の勉強',
	          start: new Date(2015, 5, 28, 13, 0).getTime(),
	          time: 1000 * 60 * 55,
	          done: false
	        }, {
	          id: 8,
	          body: 'お菓子を食べる',
	          start: new Date(2015, 5, 28, 14, 0).getTime(),
	          time: 1000 * 60 * 25,
	          done: false
	        }, {
	          id: 9,
	          body: '昼寝をする',
	          start: new Date(2015, 5, 28, 14, 30).getTime(),
	          time: 1000 * 60 * 115,
	          done: false
	        }, {
	          id: 10,
	          body: '打ち合わせ',
	          start: new Date(2015, 5, 28, 16, 30).getTime(),
	          time: 1000 * 60 * 25,
	          done: false
	        }]
	      }]
	    };
	    this.currentTime = new Date();

	    setInterval(function () {
	      _this.currentTime = new Date();
	      _this.trigger('updateCurrentTime', _this.currentTime);
	    }, 60000);
	  }

	  _inherits(TimelineStore, _Store);

	  _createClass(TimelineStore, [{
	    key: 'fetchData',
	    value: function fetchData() {}
	  }, {
	    key: 'addDoing',
	    value: function addDoing(resourceId, doing) {
	      var resource = null;
	      for (var i = 0, ii = this.data.resources.length; i < ii; ++i) {
	        if (this.data.resources[i].id === resourceId) {
	          resource = this.data.resources[i];
	        }
	      }

	      if (resource === null) {
	        return;
	      }

	      resource.doing.push(doing);

	      this.trigger('addDoing', { resourceId: resourceId, doing: doing });
	    }
	  }]);

	  return TimelineStore;
	})(_store.Store);

	exports.TimelineStore = TimelineStore;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Store = (function () {
	  function Store() {
	    _classCallCheck(this, Store);

	    this._listeners = {};
	  }

	  _createClass(Store, [{
	    key: 'on',
	    value: function on(name, func) {
	      if (!this._listeners[name]) {
	        this._listeners[name] = [];
	      }
	      this._listeners[name].push(func);
	    }
	  }, {
	    key: 'off',
	    value: function off(name, func) {
	      if (!this._listeners[name]) {
	        return;
	      }

	      var list = this._listeners[name];
	      list.splice(list.indexof(func), 1);
	    }
	  }, {
	    key: 'trigger',
	    value: function trigger(name, data) {
	      if (!this._listeners[name]) {
	        return;
	      }

	      this._listeners[name].forEach(function (func) {
	        func(data);
	      });
	    }
	  }]);

	  return Store;
	})();

	exports.Store = Store;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	function getUrlVars() {
	  var vars = {};
	  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	  for (var i = 0; i < hashes.length; i++) {
	    var hash = hashes[i].split('=');
	    vars[hash[0]] = hash[1];
	  }
	  return vars;
	}

	var code = getUrlVars().code;

	if (code) {
	  $.ajax({
	    method: 'POST',
	    url: '/auth/facebook',
	    data: {
	      clientId: '966482230069701',
	      code: code,
	      redirectUri: (window.location.origin || window.location.protocol + '//' + window.location.host) + '/'
	    },
	    dataType: 'json',
	    success: function success(res) {
	      console.log(res);
	      localStorage.setItem('token', res.token);
	      $.ajax({
					beforeSend: function(xhr) {
				    if (localStorage.getItem('token')) {
				      xhr.setRequestHeader('Authorization',
				            'Bearer ' + localStorage.getItem('token'));
				    }
				  },
	        url: '/user',
	        method: 'GET',
	        success: function success(data) {
	          alert('Hello, ' + data.username + '!!');
	        }
	      });
	    }
	  });
	}

	window.auth = {};
	auth.login = function () {
	  window.location = 'https://www.facebook.com/dialog/oauth?%20client_id=966482230069701%20&redirect_uri=' + (window.location.origin || window.location.protocol + '//' + window.location.host) + '/';
	};
	auth.check = function () {
	  return !!localStorage.getItem('token');
	};

	auth.logout = function () {
	  localStorage.removeItem('token');
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Vue.component('doing', {
	  template: '#doing',
	  replace: true,
	  props: ['d'],

	  ready: function ready() {
	    var _this = this;

	    var isDoing = false;

	    $(this.$el).draggable({
	      axis: 'y',
	      containment: '.doing-wrapper',
	      stack: '.doing-item',
	      drag: function drag(event, ui) {
	        _this.top = ui.position.top;
	      },
	      stop: function stop(event, ui) {
	        _this.top = ui.position.top;
	        _this.$parent.resolveConflict(_this);
	      }
	    }).resizable({
	      handles: 'n, s',
	      start: function start(event, ui) {
	        isDoing = _this.isDoing;
	        if (isDoing) {
	          ui.element.addClass('doing-doing-resizing');
	        }
	      },
	      resize: function resize(event, ui) {
	        ui.element.width(ui.originalSize.width);
	        ui.element.height(ui.size.height);
	        _this.height = parseInt(ui.element.css('height'));
	        _this.top = ui.position.top;
	      },
	      stop: function stop(event, ui) {
	        ui.element.removeClass('doing-doing-resizing');
	        ui.element.width(ui.originalSize.width);
	        ui.element.height(ui.size.height);
	        _this.height = parseInt(ui.element.css('height'));
	        _this.top = ui.position.top;
	        _this.$parent.resolveConflict(_this, isDoing);
	      }
	    });
	  },

	  computed: {
	    height: {
	      get: function get() {
	        return this.d.time / this.$root.time * this.$root.height;
	      },

	      set: function set(val) {
	        this.d.time = val * this.$root.time / this.$root.height;
	      }
	    },

	    top: {
	      get: function get() {
	        return (this.d.start - this.$root.start) / this.$root.time * this.$root.height;
	      },

	      set: function set(val) {
	        this.d.start = val / this.$root.height * this.$root.time + this.$root.start;
	      }
	    },

	    backgroundHeight: function backgroundHeight() {
	      return (this.$root.currentTime - this.d.start) / this.$root.time * this.$root.height;
	    },

	    isDoing: function isDoing() {
	      return this.d.start <= this.$root.currentTime && this.$root.currentTime < this.d.start + this.d.time;
	    },

	    isDone: function isDone() {
	      return this.d.start + this.d.time <= this.$root.currentTime;
	    },

	    willDo: function willDo() {
	      return this.$root.currentTime < this.d.start;
	    }
	  }
	});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _modelsStores = __webpack_require__(2);

	Vue.component('resource', {
	  template: '#resource',
	  replace: true,
	  props: ['resource'],

	  created: function created() {
	    var _this = this;

	    _modelsStores.stores.timeline.on('addDoing', function (data) {
	      if (data.resourceId !== _this.resource.id) {
	        return;
	      }

	      _this.resource.doing.$add(data.doing);

	      setTimeout(function () {
	        var list = _this.$.doing;
	        _this.resolveConflict(list[list.length - 1]);
	      }, 100);
	    });
	  },

	  methods: {
	    resolveConflict: function resolveConflict(target, fixed) {
	      var i, ii, fixedStart, startIdx, cur, next, doingList;
	      var margin = 1000 * 60 * 5;

	      // sort doings based on the center position
	      doingList = this.$.doing;
	      doingList.sort(function (a, b) {
	        return a.d.start + a.d.time / 2 - b.d.start - b.d.time / 2;
	      });

	      // move to upper if the target overlaps the next doing
	      startIdx = doingList.indexOf(target);
	      next = doingList[startIdx + 1];
	      if (!fixed && next && target.d.start + target.d.time + margin > next.d.start) {
	        target.d.start = next.d.start - target.d.time - margin;
	      }

	      // resolve the conflict between target and fixed position
	      fixedStart = this.$parent.currentTime;
	      for (i = 0, ii = doingList.length; i < ii; ++i) {
	        if (fixedStart < doingList[i].d.start) {
	          // detect the start position of conflict resolution
	          startIdx = Math.min(startIdx, i);
	          break;
	        }

	        // skip the target position if the fixed flag is unset
	        if ((fixed || target !== doingList[i]) && doingList[i].isDoing) {
	          fixedStart = doingList[i].d.start + doingList[i].d.time;
	        }
	      }
	      // don't move the target if the fixed flag is set
	      if (!fixed && target.d.start < fixedStart + margin) {
	        target.d.start = fixedStart + margin;
	      }

	      // move the position of doings while the conflict is resolved
	      cur = doingList[startIdx];
	      for (i = startIdx + 1, ii = doingList.length; i < ii; ++i) {
	        next = doingList[i];

	        if (next.willDo) {
	          if (cur.d.start + cur.d.time + margin > next.d.start) {
	            next.d.start = cur.d.start + cur.d.time + margin;
	          }

	          cur = next;
	        }
	      }
	    }
	  }
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _modelsStores = __webpack_require__(2);

	var timeline = new Vue({
	  el: '#timeline',

	  data: {
	    start: new Date(2015, 5, 28).getTime(),
	    time: 1000 * 60 * 60 * 24,
	    step: 1000 * 60 * 15,
	    stepLength: 30,
	    currentTime: new Date().getTime(),

	    resources: null
	  },

	  created: function created() {
	    var _this = this;

	    _modelsStores.stores.timeline.on('fetch', function (data) {
	      _this.refresh(data);
	    });

	    _modelsStores.stores.timeline.on('updateCurrentTime', function (current) {
	      _this.currentTime = current.getTime();
	    });
	  },

	  ready: function ready() {
	    var $el = $(this.$el);
	    var scrollTop = this.currentTop - $el.height() / 2;
	    $el.scrollTop(scrollTop);
	  },

	  computed: {
	    height: function height() {
	      return this.time / this.step * this.stepLength;
	    },

	    currentTop: function currentTop() {
	      return (this.currentTime - this.start) / this.time * this.height;
	    }
	  },

	  methods: {
	    refresh: function refresh(timeline) {
	      if (timeline.start) {
	        this.start = timeline.start;
	      }
	      if (timeline.time) {
	        this.time = timeline.time;
	      }
	      if (timeline.resources) {
	        this.resources = timeline.resources;
	      }
	    }
	  }
	});

	timeline.refresh(_modelsStores.stores.timeline.data);

	exports.timeline = timeline;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

/***/ }
/******/ ]);
'use strict';
