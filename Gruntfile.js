module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    // Project configuration.
    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 8000,
                    protocol: 'http',
                    hostname: '*',
                    base: 'dist',
                    livereload: true,
                }
            }
        },
        sass: {
            dist: {                             // target
                files: {                        // dictionary of files
                    'dist/main.css': 'sass/main.scss'     // 'destination': 'source'
                }
            }
        },
        watch: {
            css: {
                files: [
                    'sass/*.scss',
                    'dist/js/**/*.js',
                    'dist/*.html',
                ],
                tasks: ['sass'],
                options: {
                    livereload: true,
                },
            },
        },
    });

    // Default task(s).
    grunt.registerTask('default', ['sass', 'connect', 'watch']);
};
