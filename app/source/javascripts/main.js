/**
 * Boot up the Vue instance and wire up the router.
 */

var Vue = require('vue');
var VueRourter = require('vue-router');

Vue.config.debug = true;
Vue.use(VueRourter);

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
Vue.directive('datetime-picker', require('./directives/datetimePicker'));
Vue.directive('modal', require('./directives/modal'));

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
Vue.component('v-checkboxDemo', require('./views/checkbox-demo'));
Vue.component('v-datetimePickerDemo', require('./views/datetimePicker-demo'));
Vue.component('v-dropdownDemo', require('./views/dropdown-demo'));
Vue.component('v-modalDemo', require('./views/modal-demo'));
Vue.component('v-percentageFormatterDemo', require('./views/percentageFormatter-demo'));
Vue.component('v-switcherDemo', require('./views/switcher-demo'));
Vue.component('v-tableDemo', require('./views/table-demo'));
Vue.component('v-timeFormatterDemo', require('./views/timeFormatter-demo'));

// router
var router = new VueRourter({
    history: false,
    linkActiveClass: 'active'
});

router.map({
    '/home': {
        component: Vue.component('v-home')
    },
    '/checkbox': {
        component: Vue.component('v-checkboxDemo')
    },
    '/datetimePicker': {
        component: Vue.component('v-datetimePickerDemo')
    },
    '/dropdown': {
        component: Vue.component('v-dropdownDemo')
    },
    '/modal': {
        component: Vue.component('v-modalDemo')
    },
    '/percentageFormatter': {
        component: Vue.component('v-percentageFormatterDemo')
    },
    '/switcher': {
        component: Vue.component('v-switcherDemo')
    },
    '/table': {
        component: Vue.component('v-tableDemo')
    },
    '/timeFormatter': {
        component: Vue.component('v-timeFormatterDemo')
    }
});

router.redirect({
    '*': '/home'
});

router.start(App, '#app');
