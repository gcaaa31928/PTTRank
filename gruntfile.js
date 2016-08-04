/**
 * Created by Red on 2016/8/3.
 */
module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    var appConfig = {
        app: 'PTTRankServer/src/',
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
                    '<%= tmp %>/app.js': '<%= app %>/js/app.js'
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
            js: {
                src: ['<%= tmp %>/**/*.js'],
                dest: '<%= dist %>/combined.js',
            },
            css: {
                src: ['<%= app %>/**/*.css'],
                dest: '<%= dist %>/combined.css',
            }
        },
        browserify: {
            dist: {
                files: {
                    '<%= dist %>/combined.js': ['<%= dist %>/combined.js']
                }
            }
        },
        watch: {
            scripts: {
                files: ['<%= app %>/**/*.js', '<%= app %>/**/*.jsx', '<%= app %>/**/*.css'],
                tasks: ['default']
            }
        }
    });

    grunt.registerTask('default', ['babel', 'concat', 'browserify', 'watch']);
};
