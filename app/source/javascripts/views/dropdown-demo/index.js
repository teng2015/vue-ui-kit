module.exports = {
    template: require('./index.html'),
    data: function () {
        return {
            selectedPerson: 'Choose a person',
            people: [
                'Steven Jobs',
                'Jonathan Ive',
                'Steve Wozniak'
            ],

            selectedPhone: {
                name: 'Choose a phone'
            },
            phones: [
                {
                    name: 'iPhone 6s'
                },
                {
                    name: 'iPhone 6'
                },
                {
                    name: 'iPhone 5'
                },
                {
                    name: 'iPhone 3G'
                }
            ],

            selectedColor: {},
            colors: [
                {
                    name: 'b',
                    label: 'Black'
                },
                {
                    name: 'w',
                    label: 'White'
                },
                {
                    name: 'p',
                    label: 'Pink'
                }
            ]
        }
    },
    created: function () {
        var vm = this;
        vm.selectedColor = vm.colors[1];
    }
};