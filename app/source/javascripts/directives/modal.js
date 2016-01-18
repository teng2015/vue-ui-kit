var $ = require('jquery');
require('remodal');

module.exports = {
    bind: function () {
        this.inst = $(this.el).remodal();
        this.vm.$els[this.expression] = this.inst;
    },
    unbind: function () {
        this.inst.destory();
        delete this.vm.$els[this.expression];
    }
};