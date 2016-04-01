var $ = jQuery = require('jquery');

module.exports = {
    bind: function () {
        var _this = this;

        _this.eventId = new Date().getTime().toString() + '-' + Math.round(Math.random() * 10000).toString();

        $(document).on('click.' + _this.eventId, function (e) {
            if (_this.el !== e.target && !$.contains(_this.el, e.target)) {
                _this.vm.selectboxOpen = false;
            }
        });
    },
    unbind: function () {
        var _this = this;
        $(document).off('click.' + _this.eventId);
    }
};