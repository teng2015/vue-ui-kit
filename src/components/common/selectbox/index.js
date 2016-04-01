module.exports = {
    template: require('./template.html'),
    props: {
        options: {
            type: Array,
            required: true
        },
        selectedOption: {
            default: null
        },
        textField: {
            type: String,
            default: 'text'
        },
        placeholder: {
            type: String,
            default: 'Please select'
        }
    },
    data: function () {
        return {
            selectboxOpen: false
        }
    },
    directives: {
        selectbox: require('./directives/selectbox')
    },
    filters: {
        getText: require('./filters/getText')
    }
};