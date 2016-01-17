/**
 * Boot up the Vue instance and wire up the router.
 */

var Vue = require('vue'),
    VueRourter = require('vue-router');

Vue.config.debug = true;
Vue.use(VueRourter);

// register layout components

// register common components
Vue.component('c-checkbox', require('./components/checkbox'));
Vue.component('c-dropdown', require('./components/dropdown'));
Vue.component('c-switcher', require('./components/switcher'));

// register directives

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
Vue.component('v-dropdownDemo', require('./views/dropdown-demo'));
Vue.component('v-percentageFormatterDemo', require('./views/percentageFormatter-demo'));
Vue.component('v-switcherDemo', require('./views/switcher-demo'));
Vue.component('v-tableDemo', require('./views/table-demo'));
Vue.component('v-timeFormatterDemo', require('./views/timeFormatter-demo'));

// router
var router = new VueRourter({
    history: false
});

router.map({
    '/': {
        component: Vue.component('v-home')
    },
    '/checkbox': {
        component: Vue.component('v-checkboxDemo')
    },
    '/dropdown': {
        component: Vue.component('v-dropdownDemo')
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

router.start(App, '#app');
