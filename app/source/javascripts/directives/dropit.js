var $ = require('jquery');
require('dropit');
module.exports = {
    bind: function () {
        $(this.el).dropit();
    }
};