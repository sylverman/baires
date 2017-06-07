module.exports = function(grunt) {

  grunt.initConfig({
    uglify: {
      js: {
        files: {
          'scripts/script.min.js': ['scripts/script.js']
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'style/styles.css': 'style/styles.scss'
        }
      }
    },
    concat: {
      css: {
        src: ['style/styles.css'],
        dest: 'style/global.css',
      },
    },
    watch: {
      js: {
        files: ['scripts/script.js'],
        tasks: ['uglify'],
      },
      css: {
        files: ['style/*.css'],
        tasks: ['concat'],
      },
      sass: {
        files: ['style/*.scss'],
        tasks: ['sass'],
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['concat', 'sass', 'uglify', 'watch']);

};
