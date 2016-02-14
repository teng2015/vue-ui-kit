module.exports = {
    template: require('./template.html'),
    props: {
        length: {
            type: Number,
            required: true
        },
        options: {
            type: Array,
            default: [15, 30, 45]
        }
    }
};