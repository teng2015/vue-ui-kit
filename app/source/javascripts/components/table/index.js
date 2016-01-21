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
            filteredRawData: [],
            thisPageData: [],
            allChecked: false
        }
    },
    created: function () {
        var vm = this;
        vm.$emit('generateDataForThisPage');
    },
    events: {
        generateDataForThisPage: function () {
            var vm = this;
            vm.thisPageData = vm.data;
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
        }
    },
    methods: {
        sortBy: function (sortField) {
            
        }
    }
};