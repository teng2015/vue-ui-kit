module.exports = {
    template: require('./template.html'),
    props: {
        isChecked: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        toggleState: function () {
            var vm = this;
            vm.isChecked = !vm.isChecked;
            console.log('clicked')
        }
    }
};
