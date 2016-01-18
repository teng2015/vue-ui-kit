var $ = require('jquery');
require('remodal');

module.exports = {
    bind: function () {
        this.inst = $(this.el).remodal();
    },
    unbind: function () {
        this.inst.destory();
    }
};