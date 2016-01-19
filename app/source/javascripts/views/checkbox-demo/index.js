module.exports = {
    template: require('./template.html'),
    data: function () {
        return {
            facebook: {
                checked: false
            },
            twitter: {
                checked: true
            },
            linkedin: {
                checked: false
            },
            github: {
                checked: true
            }
        }
    }
};
