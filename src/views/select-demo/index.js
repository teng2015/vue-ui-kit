module.exports = {
    template: require('./template.html'),
    data: function () {
        return {
            showFirst: true,
            tools: [
                {
                    name: 'Visual Studio Code',
                    value: 'vscode'
                },
                {
                    name: 'JetBrains WebStorm',
                    value: 'webstorm'
                },
                {
                    name: 'Atom',
                    value: 'atom'
                },
                {
                    name: 'Brackets',
                    value: 'brackets'
                },
                {
                    name: 'Sublime Text 3',
                    value: 'st3'
                }
            ],
            selectedTool: {},
            languages: [
                'Javascript',
                'Java',
                'Python',
                'Ruby',
                'Go'
            ],
            selectedLanguage: ''
        }
    }
};