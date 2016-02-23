module.exports = function (size) {
    if (size == null || isNaN(size)) {
        return size;
    } else if (size >= 0 && size < 1024) {
        return size + ' B';
    } else if (size >= 1024 && size < 1024 * 1024) {
        return Math.round(size / 1024 * 100) / 100 + ' K';
    } else if (size >= 1024 * 1024 && size < 1024 * 1024 * 1024) {
        return Math.round(size / 1024 / 1024 * 100) / 100 + ' M';
    } else {
        return Math.round(size / 1024 / 1024 / 1024 * 100) / 100 +' G';
    }
};