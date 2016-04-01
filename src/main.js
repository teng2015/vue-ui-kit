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
Vue.component('c-selectbox', require('./components/common/selectbox'));
Vue.component('c-switcher', require('./components/common/switcher'));

// global directives

// global filters
Vue.filter('booleanFormatter', require('./filters/booleanFormatter'));
Vue.filter('sizeFormatter', require('./filters/sizeFormatter'));
Vue.filter('timeFormatter', require('./filters/timeFormatter'));
Vue.filter('percentageFormatter', require('./filters/percentageFormatter'));

// validations


// views - use async components to divide the app into smaller chunks
Vue.component('v-checkboxDemo', function (resolve) {
    require(['./views/checkbox-demo'], resolve);
});
Vue.component('v-selectboxDemo', function (resolve) {
    require(['./views/selectbox-demo'], resolve);
});
Vue.component('v-switcherDemo', function (resolve) {
    require(['./views/switcher-demo'], resolve);
});

// app constructor
var App = Vue.extend({});

// router
var router = new VueRouter({
    history: false,
    linkActiveClass: 'active'
});

router.map({
    '/checkbox': {
        component: Vue.component('v-checkboxDemo')
    },
    '/selectbox': {
        component: Vue.component('v-selectboxDemo')    
    },
    '/switcher': {
        component: Vue.component('v-switcherDemo')
    }
});

router.redirect({
    '*': '/checkbox'
});

router.start(App, '#app');