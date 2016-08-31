var BundleTracker = require('webpack-bundle-tracker');
var path = require('path');
var projectRoot = process.env.PWD; // Absolute path to the project root
var BowerWebpackPlugin = require('bower-webpack-plugin');

var appConfig = {
    src: './assets',
    dist: path.resolve('./assets/bundles/'),
    templateDist: '../../PTTRankServerApp/templates',
    tmp: '.tmp',
};
module.exports = {
    context: __dirname,
    entry: appConfig.src + '/js/index.jsx',
    output: {
        path: appConfig.dist,
        filename: "[name]-[hash].js",
    },
    resolve: {
        modulesDirectories: ['node_modules', 'bower_components'],
        extensions: ['', '.js', '.jsx', '.css']
    },
    module: {
        loaders: [
            {
                test: /\.js|jsx$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            },
            {
                test: /\.css$/,
                loader: 'style!css!'
            },
            {
                test: /\.(woff|svg|ttf|eot|png)([\?]?.*)$/,
                loader: "file-loader?name=[name].[ext]"
            }
        ],
        query: {
            presets: ['es2015', 'react']
        }
    },
    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
        new BowerWebpackPlugin({
            excludes: /.*\.less/
        }),
    ]
};