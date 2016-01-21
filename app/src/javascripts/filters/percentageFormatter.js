module.exports = function (number, digits, force) {
    var result;

    digits = parseInt(digits) || 2;

    if (!number && number !== 0) {
        result = '-';
    } else if (force) {
        result = Math.round(number * 10000) / 100 + '%';
    } else {
        result = (number * 100).toFixed(digits) + '%';
    };

    return result;
};
