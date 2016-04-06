var path = require('path');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

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
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?-autoprefixer!postcss-loader')
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?-autoprefixer!postcss-loader!sass-loader')
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
    postcss: [ autoprefixer({ browsers: ['last 5 versions', 'not ie <= 8'] }) ],
    plugins: [
        new ExtractTextPlugin("bundle.css")
    ]
};