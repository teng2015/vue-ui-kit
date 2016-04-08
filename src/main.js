'use strict';

require('normalize-css');
require('font-awesome/css/font-awesome.css');
require('../scss/main.scss');

/**
 * Boot up the Vue instance and wire up the router.
 */
var Vue = require('vue');
var VueRouter = require('vue-router');

Vue.use(VueRouter);

Vue.config.debug = true;

// layout components
Vue.component('l-header', require('./components/layout/header'));
Vue.component('l-sidebar', require('./components/layout/sidebar'));
Vue.component('l-content', require('./components/layout/content'));

// common components
Vue.component('c-checkbox', require('./components/common/checkbox'));
Vue.component('c-radio-button', require('./components/common/radio-button'));
Vue.component('c-radio-group', require('./components/common/radio-group'));
Vue.component('c-select', require('./components/common/select'));
Vue.component('c-switch', require('./components/common/switch'));

// global directives

// global filters
Vue.filter('booleanFormatter', require('./filters/booleanFormatter'));
Vue.filter('sizeFormatter', require('./filters/sizeFormatter'));
Vue.filter('timeFormatter', require('./filters/timeFormatter'));
Vue.filter('percentageFormatter', require('./filters/percentageFormatter'));

// validations


// views - use async components to divide the app into smaller chunks
Vue.component('v-button-demo', function (resolve) {
    require(['./views/button-demo'], resolve);
});
Vue.component('v-checkbox-demo', function (resolve) {
    require(['./views/checkbox-demo'], resolve);
});
Vue.component('v-grid-demo', function (resolve) {
    require(['./views/grid-demo'], resolve);
});
Vue.component('v-radio-button-demo', function (resolve) {
    require(['./views/radio-button-demo'], resolve);
});
Vue.component('v-select-demo', function (resolve) {
    require(['./views/select-demo'], resolve);
});
Vue.component('v-switch-demo', function (resolve) {
    require(['./views/switch-demo'], resolve);
});

// app constructor
var App = Vue.extend({});

// router
var router = new VueRouter({
    history: false,
    linkActiveClass: 'active'
});

router.map({
    '/button': {
        component: Vue.component('v-button-demo')    
    },
    '/checkbox': {
        component: Vue.component('v-checkbox-demo')
    },
    '/grid': {
        component: Vue.component('v-grid-demo')    
    },
    '/radio-button': {
        component: Vue.component('v-radio-button-demo')    
    },
    '/select': {
        component: Vue.component('v-select-demo')    
    },
    '/switch': {
        component: Vue.component('v-switch-demo')
    }
});

router.redirect({
    '*': '/checkbox'
});

router.start(App, '#app');