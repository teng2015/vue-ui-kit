module.exports = {
    template: require('./template.html'),
    props: {
        itemsTotal: {
            type: Number,
            required: true
        },
        itemsPerPage: {
            type: Number,
            required: true
        },
        currentPage: {
            type: Number,
            required: true
        }
    },
    computed: {
        thisPageStart: function () {
            var vm = this;
            return vm.itemsPerPage * vm.currentPage + 1;
        },
        thisPageEnd: function () {
            var vm = this;
            return Math.min(vm.itemsPerPage * (vm.currentPage + 1), vm.itemsTotal);
        }
    },
    watch: {
        itemsPerPage: function (val, oldVal) {
            var vm = this;
            vm.currentPage = 0;
        }
    }
};