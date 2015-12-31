/**
 * Boot up the Vue instance and wire up the router.
 */

var Vue = require('vue'),
    VueRourter = require('vue-router');

Vue.config.debug = true;
Vue.use(VueRourter);

// register layout components

// register common components

// register directives

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
Vue.component('foo', require('./views/foo'));
Vue.component('bar', require('./views/bar'));

// router
var router = new VueRourter({
    history: false
});

router.map({
    '/foo': {
        component: Vue.component('foo')
    },
    '/bar': {
        component: Vue.component('bar')
    }
});

router.start(App, '#app');
