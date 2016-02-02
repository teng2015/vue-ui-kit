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
            filterCondition: [],
            sortCondition: {},
            allChecked: false,
            itemsPerPage: 5,
            currentPage: 0
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
            }
        }
    },
    computed: {
        filteredData: function () {
            var vm = this;
            var result = vm.rawData;

            _.each(vm.filterCondition, function (rc) {
                result = _.filter(result, function (r) {
                    return r[rc.field].toString().toLowerCase().indexOf(rc.value.toString()) !== -1;
                });
            });

            return result;
        },
        thisPageData: function () {
            var vm = this;
            var result = [];

            for (var i = vm.currentPage * vm.itemsPerPage; i < (vm.currentPage + 1) * vm.itemsPerPage && i < vm.filteredData.length; i ++) {
                result.push(vm.filteredData[i]);
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
        'search-field': {
            bind: function () {
                var _this = this;
                var searchField = _this.expression;
                var $el = $(_this.el);

                $el.on('keyup', function () {
                    var target = _.find(_this.vm.filterCondition, function (fc) {
                        return fc.field === searchField;
                    });

                    if (!target) {
                        _this.vm.filterCondition.push({
                            field: searchField,
                            value: $el.val()
                        });
                    } else {
                        target.value = $el.val();
                    }
                });
            },
            unbind: function () {
                var $el = $(this.el);
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
    }
};