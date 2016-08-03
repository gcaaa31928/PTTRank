/**
 * Created by Red on 2016/8/3.
 */
module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    var appConfig = {
        app: 'PTTRankServer/js/',
        dist: 'PTTRankServer/assets',
        tmp: '.tmp/js'
    };
    grunt.initConfig({
        // Project settings
        app: appConfig.app,
        dist: appConfig.dist,
        tmp: appConfig.tmp,

        babel: {
            options: {
                sourceMap: true,
                plugins: ['transform-react-jsx'],
                presets: ['es2015', 'react']
            },
            dist: {
                files: {
                    '<%= tmp %>/app.js': '<%= app %>/app.js'
                }
            },
            jsx: {
                files: [{
                    expand: true,
                    cwd: '<%= app %>', // Custom folder
                    src: ['**/*.jsx'],
                    dest: '<%= tmp %>', // Custom folder
                    ext: '.js'
                }]
            }
        },
        concat: {
            options: {
                stripBanners: true
            },
            dist: {
                src: ['<%= tmp %>/**/*.js'],
                dest: '<%= dist %>/combined.js',
            },
        },
    });

    grunt.registerTask('default', ['babel', 'concat']);
};
