module.exports = {
    props: {
        data: {
            type: Array,
            required: true
        },
        pagination: {
            type: Boolean,
            default: true
        }
    },
    data: function () {
        return {
            rawData: [],
            filterCondition: [],
            sortCondition: {},
            allChecked: false,
            itemsPerPage: null,
            currentPage: 0
        }
    },
    created: function () {
        var vm = this;

        if (vm.pagination) {
            vm.itemsPerPage = 1;
        } else {
            vm.itemsPerPage = 0;
        }

        vm.$emit('generateDataForThisPage');
    },
    events: {
        generateDataForThisPage: function () {
            var vm = this;
            vm.rawData = vm.data;
        }
    },
    watch: {
        data: function (val, oldVal) {
            var vm = this;
            vm.currentPage = 0;
            vm.$emit('generateDataForThisPage');
        },
        allChecked: function (val, oldVal) {
            var vm = this;
            _.each(vm.thisPageData, function (item) {
                item.checked = val;
            });
        },
        selectedItems: function (val, oldVal) {
            var vm = this;
            if (val.length !== 0 && val.length === vm.thisPageData.length) {
                vm.allChecked = true;
            } else if (val.length === 0) {
                vm.allChecked;
            }
        },
        currentPage: function (val, oldVal) {
            var vm = this;
            _.each(vm.rawData, function (rd) {
                rd.checked = false;
            });
        }
    },
    computed: {
        filteredData: function () {
            var vm = this;
            var result = vm.rawData;

            _.each(vm.filterCondition, function (rc) {
                result = _.filter(result, function (r) {
                    if (!r[rc.field]) {
                        return false;
                    } else {
                        return r[rc.field].toString().toLowerCase().indexOf(rc.value.toString().toLowerCase()) !== -1;
                    }
                });
            });

            return result;
        },
        thisPageData: function () {
            var vm = this;
            var result = [];

            if (vm.itemsPerPage === 0) {
                result = vm.filteredData;
            } else {
                for (var i = vm.currentPage * vm.itemsPerPage; i < (vm.currentPage + 1) * vm.itemsPerPage && i < vm.filteredData.length; i ++) {
                    result.push(vm.filteredData[i]);
                }
            }

            return result;
        },
        selectedItems: function () {
            var vm = this;
            var result;

            if (!vm.thisPageData[0]) {
                result = [];
            } else {
                result = _.filter(vm.thisPageData, function (item) {
                    return item.checked;
                });
            }

            return result;
        }
    },
    directives: {
        'search-field': require('./directives/search-field'),
        'sort-field': require('./directives/sort-field')
    },
    components: {   // register private components
        'p-length': require('./components/length'),
        'p-pointer': require('./components/pointer')
    }
};