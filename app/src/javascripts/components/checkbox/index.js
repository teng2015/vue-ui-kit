module.exports = {
    template: require('./template.html'),
    props: {
        isChecked: {
            default: false
        }
    },
    methods: {
        toggleState: function () {
            var vm = this;
            vm.isChecked = !vm.isChecked;
        }
    }
};
