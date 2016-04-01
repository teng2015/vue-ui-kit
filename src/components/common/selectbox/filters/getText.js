module.exports = function (option) {
    var _this = this;
    var optionType = typeof option;
    var textField = _this.textField;

    if (optionType === 'object') {
        if (!option || option[textField] === undefined) return _this.placeholder;
        return option[textField];
    }

    if (optionType === 'string' || type === 'number') {
        if (option === '') return _this.placeholder;
        return option;
    }
};