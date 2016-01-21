module.exports = {
    template: require('./template.html'),
    props: {
        labels: {
            type: Array,
            default: ['','']
        },
        isActive: {
            type: Boolean,
            required: true
        }
    }
};
