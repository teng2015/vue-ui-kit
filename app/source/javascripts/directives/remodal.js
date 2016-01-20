module.exports = {
    bind: function () {
        this.inst = $(this.el).remodal({
            hashTracking: false
        });
    },
    unbind: function () {
        this.inst.destroy();
    }
};