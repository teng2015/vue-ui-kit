/**
 * Boot up the Vue instance and wire up the router.
 */

var Vue = require('vue'),
    VueRourter = require('vue-router');

Vue.config.debug = true;
Vue.use(VueRourter);

// register layout components

// register common components
Vue.component('dropdown', require('./components/dropdown'));

// register directives
Vue.directive('dropit', require('./directives/dropit'));

// register filters

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
Vue.component('home', require('./views/home'));
Vue.component('dropdownDemo', require('./views/dropdown-demo'));
Vue.component('percentageFormatterDemo', require('./views/percentageFormatter-demo'));
Vue.component('switcherDemo', require('./views/switcher-demo'));
Vue.component('tableDemo', require('./views/table-demo'));
Vue.component('timeFormatterDemo', require('./views/timeFormatter-demo'));

// router
var router = new VueRourter({
    history: false
});

router.map({
    '/': {
        component: Vue.component('home')
    },
    '/dropdown': {
        component: Vue.component('dropdownDemo')
    },
    '/percentageFormatter': {
        component: Vue.component('percentageFormatterDemo')
    },
    '/switcher': {
        component: Vue.component('switcherDemo')
    },
    '/table': {
        component: Vue.component('tableDemo')
    },
    '/timeFormatter': {
        component: Vue.component('timeFormatterDemo')
    }
});

router.start(App, '#app');
