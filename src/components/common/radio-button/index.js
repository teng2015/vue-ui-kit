module.exports = {
    template: require('./template.html'),
    props: {
        value: {
            required: true
        }
    },
    data: function () {
        return {
            checked: false    
        };
    },
    methods: {
        checkThis: function () {
            var vm = this;
            vm.$dispatch('radio-button-clicked', vm.value);
        }
    },
    events: {
        'checked-value-changed': function (val) {
            var vm = this;
            vm.checked = vm.value === val;
        }
    }
};