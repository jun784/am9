'use strict';

import stores from './models/stores';
import timelineOption from '../components/timeline/timeline';
import addOption from '../components/add/add';

var timeline = new Vue(timelineOption).$mount('#timeline');
var add = new Vue(addOption).$mount('#add');

timeline.refresh(stores.timeline.data);
