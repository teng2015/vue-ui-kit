var $ = require('jquery');

module.exports = {
    twoWay: true,

    bind: function () {
        var _this = this;
        var el = this.el;

        var params = {
            elem: el,
            event: 'click',
            max: laydate.now(),
            isclear: false,     // do not set to true, it won't work with the choose callback.
            istoday: true,
            istime: $(el).data('istime'),
            format: $(el).data('format'),
            choose: function (time) {
                _this.set(time);
            }
        };

        setTimeout(function () {
            laydate(params);
        }, 0);

        _this.handler = function () {
            _this.set($(this).val());
        };

        $(el).on('input', _this.handler);
    },

    update: function (newValue, oldValue) {
        var el = this.el;
        $(el).val(newValue);
    }
};