module.exports = {
    twoWay: true,
    bind: function () {
        var _this = this;

        _this.picker = new Pikaday({
            field: _this.el,
            i18n: {
                previousMonth : '上个月',
                nextMonth     : '下个月',
                months        : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
                weekdays      : ['星期日','星期一','星期三','星期四','星期五','星期六','星期日'],
                weekdaysShort : ['周日','周一','周二','周三','周四','周五','周六']
            },
            onSelect: function () {
                _this.set(this.getMoment().format('YYYY-MM-DD'));
            }
        });
    },
    update: function (newValue, oldValue) {
        var _this = this;
        _this.el.value = newValue;
    },
    unbind: function () {
        var _this = this;
        _this.picker.destroy();
    }
};
