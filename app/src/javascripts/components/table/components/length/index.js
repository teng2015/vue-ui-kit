module.exports = {
    template: require('./template.html'),
    props: {
        length: {
            type: Number,
            required: true
        },
        options: {
            type: Array,
            default: [15, 30, 45]
        }
    },
    data: function () {
        return {
            show: true
        }
    },
    created: function () {
        var vm = this;

        if (vm.length === 0) {
            vm.show = false;
        } else {
            vm.show = true;
            vm.length = vm.options[0];
        }
    }
};