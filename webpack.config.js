var BundleTracker = require('webpack-bundle-tracker');
var path = require('path');
var projectRoot = process.env.PWD; // Absolute path to the project root
var BowerWebpackPlugin = require('bower-webpack-plugin');
var webpack = require('webpack');
var appConfig = {
    src: './assets',
    dist: path.resolve('./assets/bundles/'),
    static: '',
    templateDist: '../../PTTRankServerApp/templates',
    tmp: '.tmp',
};
console.log(__dirname);
module.exports = {
    context: __dirname,
    entry: [
        appConfig.src + '/js/app.js'
    ],
    output: {
        path: appConfig.dist,
        publicPath: '/static/',
        filename: "[name].js",
    },
    resolve: {
        modulesDirectories: ['node_modules', 'bower_components'],
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.js|jsx$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel-loader']
            },
            {
                test: /\.css$/,
                loader: 'style!css!'
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff&name=" + appConfig.static + '[name].[ext]'
            }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff&name=" + appConfig.static + '[name].[ext]'
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream&name=" + appConfig.static + '[name].[ext]'
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml" + appConfig.static + '/[name].[ext]'
            }
        ],
        query: {
            presets: ['es2015', 'react']
        }
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new BundleTracker({filename: './webpack-stats.json'}),
        new BowerWebpackPlugin({
            modulesDirectories: ["bower_components"],
            manifestFiles: "bower.json",
            excludes: /.*\.less/,
            searchResolveModulesDirectories: false
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};