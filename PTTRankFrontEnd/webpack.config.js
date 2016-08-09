var CopyWebpackPlugin = require('copy-webpack-plugin');

var appConfig = {
    src: '.',
    dist: '../PTTRankServer/assets',
    templateDist: '../../PTTRankServerApp/templates',
    tmp: '.tmp',
};
var path = require('path');
var projectRoot = process.env.PWD; // Absolute path to the project root
var resolveRoot = path.join(projectRoot, 'node_modules'); // project root/node_modules
module.exports = {
    context: appConfig.src + '/js',
    entry: './app.js',
    output: {
        path: appConfig.dist,
        filename: 'combined.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        fallback: resolveRoot
    },
    resolveLoader: {
        modulesDirectories: [
            resolveRoot
        ]
    },
    module: {
        loaders: [
            {
                test: /\.js|jsx$/,
                exclude: /node_modules/,
                loaders: ['babel']
            }
        ],
        query: {
            presets: ['es2015', 'react']
        }
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: '../html/**/*.html',
                to: appConfig.templateDist
            }
        ])
    ]
};