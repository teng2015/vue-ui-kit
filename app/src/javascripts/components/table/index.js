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
            searchText: '',
            allChecked: false,
            sortCondition: {},
            filterCondition: [
                {
                    field: '',
                    value: ''
                }
            ]
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

            return _.filter(vm.rawData, function (item) {
                return item.name.toLowerCase().indexOf(vm.filterCondition[0].value) !== -1;
            });
        },
        thisPageData: function () {
            var vm = this;
            return vm.filteredRawData;
        }
    },
    directives: {
        'search-field': {
            bind: function () {
                var _this = this;
                var searchField = _this.expression;
                var $el = $(_this.el);

                $el.on('keyup', function () {
                    _this.vm.filterCondition[0].field = searchField;
                    _this.vm.filterCondition[0].value = $el.val();
                });
            },
            unbind: function () {
                $el.off('keyup');
            }
        },
        'sort-field': {
            bind: function () {
                var _this = this;
                var sortField = _this.expression;
                var $el = $(_this.el);

                $el.addClass('sortable');

                $el.on('click', function () {
                    $el.siblings('th').removeClass('desc asc');

                    if (_this.vm.sortCondition.field === sortField) {
                        _this.vm.sortCondition.order = _this.vm.sortCondition.order === 'desc' ? 'asc' : 'desc';
                    } else {
                        _this.vm.sortCondition.field = sortField;
                        _this.vm.sortCondition.order = 'desc';
                    }

                    if (_this.vm.sortCondition.order === 'desc') {
                        _this.vm.rawData = _.sortBy(_this.vm.rawData, function (item) {
                            return item[sortField];
                        }).reverse();
                        $el.removeClass('asc').addClass('desc');
                    } else {
                        _this.vm.rawData = _.sortBy(_this.vm.rawData, function (item) {
                            return item[sortField];
                        });
                        $el.removeClass('desc').addClass('asc');
                    }
                });
            },
            unbind: function () {
                var _this = this;
                $(_this.el)
                    .off('click')
                    .removeClass('sortable desc asc');
            }
        }
    },
    components: {}
};