module.exports = {
    template: require('./template.html'),
    props: {
        checked: {
            default: false
        }
    },
    methods: {
        toggleState: function () {
            var vm = this;
            vm.checked = !vm.checked;
        }
    }
};