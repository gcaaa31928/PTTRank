/**
 * Created by Red on 2016/8/3.
 */
module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    var appConfig = {
        app: 'PTTRankServer/js/',
        dist: 'PTTRankServer/assets'
    };
    grunt.initConfig({
        // Project settings
        app: appConfig.app,
        dist: appConfig.dist,

        babel: {
            options: {
                sourceMap: true,
                plugins: ['transform-react-jsx'],
                presets: ['es2015', 'react']
            },
            dist: {
                files: {
                    '<%= dist %>/app.js': '<%= app %>/app.js'
                }
            },
            jsx: {
                files: [{
                    expand: true,
                    cwd: '<%= app %>', // Custom folder
                    src: ['**/*.jsx'],
                    dest: '<%= dist %>', // Custom folder
                    ext: '.js'
                }]
            }
        }
    });

    grunt.registerTask('default', ['babel']);
};
