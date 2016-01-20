'use strict';

/**
 * Boot up the Vue instance and wire up the router.
 */
Vue.config.debug = true;

// register layout components
Vue.component('l-header', require('./components/header'));
Vue.component('l-sidebar', require('./components/sidebar'));
Vue.component('l-content', require('./components/content'));

// register common components
Vue.component('c-checkbox', require('./components/checkbox'));
Vue.component('c-data-table', require('./components/dataTable'));
Vue.component('c-dropdown', require('./components/dropdown'));
Vue.component('c-pagination', require('./components/pagination'));
Vue.component('c-switcher', require('./components/switcher'));

// register directives
Vue.directive('laydate', require('./directives/laydate'));
Vue.directive('remodal', require('./directives/remodal'));

// register filters
Vue.filter('timeFormatter', require('./filters/timeFormatter'));
Vue.filter('percentageFormatter', require('./filters/percentageFormatter'));

// register validations

// app constructor
var App = Vue.extend({
    data: function () {
        return {
            view: ''
        }
    }
});

// views
Vue.component('v-home', require('./views/home'));
Vue.component('v-buttonDemo', require('./views/button-demo'));
Vue.component('v-checkboxDemo', require('./views/checkbox-demo'));
Vue.component('v-dataTableDemo', require('./views/dataTable-demo'));
Vue.component('v-dropdownDemo', require('./views/dropdown-demo'));
Vue.component('v-laydateDemo', require('./views/laydate-demo'));
Vue.component('v-percentageFormatterDemo', require('./views/percentageFormatter-demo'));
Vue.component('v-remodalDemo', require('./views/remodal-demo'));
Vue.component('v-switcherDemo', require('./views/switcher-demo'));
Vue.component('v-timeFormatterDemo', require('./views/timeFormatter-demo'));

// router
var router = new VueRouter({
    history: false,
    linkActiveClass: 'active'
});

router.map({
    '/': {
        component: Vue.component('v-home')
    },
    '/button': {
        component: Vue.component('v-buttonDemo')
    },
    '/checkbox': {
        component: Vue.component('v-checkboxDemo')
    },
    '/dataTable': {
        component: Vue.component('v-dataTableDemo')
    },
    '/dropdown': {
        component: Vue.component('v-dropdownDemo')
    },
    '/laydate': {
        component: Vue.component('v-laydateDemo')
    },
    '/percentageFormatter': {
        component: Vue.component('v-percentageFormatterDemo')
    },
    '/remodal': {
        component: Vue.component('v-remodalDemo')
    },
    '/switcher': {
        component: Vue.component('v-switcherDemo')
    },
    '/timeFormatter': {
        component: Vue.component('v-timeFormatterDemo')
    }
});

router.redirect({
    '*': '/'
});

router.start(App, '#app');
