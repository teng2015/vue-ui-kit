module.exports = {
    template: require('./template.html'),
    props: ['options', 'selected', 'key'],
    filters: {
        getName: function (value) {
            if (!value) return '';
            var type = typeof value;
            switch (type) {
                case 'string':
                    return value;
                    break;
                case 'number':
                    return value;
                    break;
                case 'object':
                    return value[this.key || 'name'];
                    break;
                default:
                    console.error('Data type not supported!');
            }
        }
    }
}