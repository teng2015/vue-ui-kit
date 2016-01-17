module.exports = {
    template: require('./template.html'),
    props: {
        options: {
            type: Array,
            required: true
        },
        selection: {
            type: Boolean,
            default: false
        }
    },
    data: function () {
        return {
            showOptions: false
        }
    }
};