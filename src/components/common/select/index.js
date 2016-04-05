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
            selectOpen: false
        }
    },
    directives: {
        selectbox: require('./directives/select')
    },
    filters: {
        getText: require('./filters/getText')
    }
};