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
        labelField: {
            type: String,
            default: 'text'
        },
        value: {
            type: String,
            default: 'value'
        },
        placeholder: {
            type: String,
            default: 'Please select'
        }
    },
    directives: {
        dropit: {
            bind: function () {
                var _this = this;
                $(_this.el).dropit();
            }
        }
    },
    filters: {
        getText: function (option) {
            if (!option) {
                return this.placeholder;
            }

            var type = typeof(option);
            var labelField = this.labelField;

            if (type === 'string' || type === 'number') {
                return option;
            } else if (type === 'object') {
                return option[labelField];
            }
        }
    }
};