module.exports = {
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

            _this.vm.currentPage = 0;
        });
    },
    unbind: function () {
        var _this = this;
        var searchField = _this.expression;
        var $el = $(_this.el);

        var target = _.find(_this.vm.filterCondition, function (fc) {
            return fc.field === searchField;
        });

        if (target) {
            target.value = '';
        }

        $el.off('keyup');
    }
};