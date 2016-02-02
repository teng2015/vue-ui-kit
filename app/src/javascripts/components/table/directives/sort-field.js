module.exports = {
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
};