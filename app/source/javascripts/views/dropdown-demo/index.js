module.exports = {
    template: require('./template.html'),
    data: function () {
        return {
            teams: [
                {
                    text: 'Los Angeles Lakers',
                    value: 'LAL'
                },
                {
                    text: 'Miami Heat',
                    value: 'MH'
                },
                {
                    text: 'Oklahoma City Thunder',
                    value: 'OCT'
                }
            ]
        };
    }
};