var path = require('path');
var autoprefixer = require('autoprefixer');

module.exports = {
    context: __dirname,
    entry: [
        './src/main.js'
    ],
    output: {
        path: path.join(__dirname, 'bundles'),
        publicPath: '/bundles/',
        filename: 'bundle.js',
        chunkFilename: '[chunkhash].[id].js',
    },
    module: {
        loaders: [
            {
                test: /\.html$/, loader: 'html'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!postcss-loader'
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!postcss-loader!sass-loader'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=10000'
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            }
        ]
    },
    postcss: [ autoprefixer({ browsers: ['not ie <= 8'] }) ],
    devServer: {
        contentBase: './'
    }
};