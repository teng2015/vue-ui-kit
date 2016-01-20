module.exports = function (timestamp, format) {
    if (!timestamp) return '-';

    if (format) {
        return moment(timestamp).format(format);
    } else {
        return moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
    }
};
