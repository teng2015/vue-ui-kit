module.exports = {
    template: require('./template.html'),
    data: function () {
        return {
            teams: [
                {
                    label: 'Los Angeles Lakers',
                    value: 'LAL'
                },
                {
                    label: 'Los Angeles Clippers',
                    value: 'LAC'
                },
                {
                    label: 'Oklahoma City Thunder',
                    value: 'OCT'
                }
            ],
            selectedTeam: {
                label: 'Los Angeles Clippers',
                value: 'LAC'
            }
        };
    }
};