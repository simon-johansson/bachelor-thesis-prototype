module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    // Project configuration.
    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 8000,
                }
            }
        },
        sass: {
            dist: {                             // target
                files: {                        // dictionary of files
                    'main.css': 'sass/*.scss'     // 'destination': 'source'
                }
            }
        },
        watch: {
            css: {
                files: 'sass/*.scss',
                tasks: ['sass'],
                options: {
                    livereload: true,
                },
            },
        },
    });

    // Default task(s).
    grunt.registerTask('default', ['connect', 'watch']);
};