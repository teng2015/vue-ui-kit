module.exports = {
    props: {
        data: {
            type: Array,
            required: true
        }
    },
    data: function () {
        return {
            rawData: [],
            allChecked: false,
            sort: {
                field: '',
                order: ''
            }
        }
    },
    created: function () {
        var vm = this;
        vm.$emit('generateDataForThisPage');
    },
    events: {
        generateDataForThisPage: function () {
            var vm = this;
            vm.rawData = vm.data;
        }
    },
    watch: {
        'allChecked': function (val, oldVal) {
            var vm = this;
            _.each(vm.thisPageData, function (item) {
                item.checked = val;
            });
        },
        'selectedItems': function (val, oldVal) {
            var vm = this;
            if (val.length === vm.thisPageData.length) {
                vm.allChecked = true;
            }
        }
    },
    computed: {
        selectedItems: function () {
            var vm = this;
            return _.filter(vm.thisPageData, function (item) {
                return item.checked;
            });
        },
        filteredRawData: function () {
            var vm = this;
            return vm.rawData;
        },
        thisPageData: function () {
            var vm = this;
            return vm.filteredRawData;
        }
    },
    methods: {
        sortBy: function (sortField) {
            var vm = this;

            if (vm.sort.field === sortField) {
                vm.sort.order = vm.sort.order === 'desc' ? 'asc' : 'desc';
            } else {
                vm.sort.field = sortField;
                vm.sort.order = 'desc';
            }

            if (vm.sort.order === 'desc') {
                vm.rawData = _.sortBy(vm.rawData, function (item) {
                    return item[sortField];
                });
            } else {
                vm.rawData = _.sortBy(vm.rawData, function (item) {
                    return item[sortField];
                }).reverse();
            }

            console.log(vm.rawData);
        }
    }
};