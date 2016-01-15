var moment = require('moment');
module.exports = {
    template: require('./index.html'),
    data: function () {
        return {
            time: ''
        }
    },
    created: function () {
        var vm = this;
        vm.time = new Date().getTime();
    }
};
