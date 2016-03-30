module.exports = function (boolean, trueText, falseText) {
    var result;

    trueLabel = trueText || 'Yes';
    falseLabel = falseText || 'No';

    if (boolean === null || boolean === undefined || boolean === '') {
        result = '-';
    } else {
        result = boolean ? trueText : falseText;
    }

    return result;
};