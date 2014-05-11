/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true,
        separator: ';',
        process: function(src, filepath) {
          return '\n\n// Source: ' + filepath + '\n' +
            src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');  // 写明 source 来源，并且只有一个 'use strict'
        }
      },
      dist: {
        src: ['static/js/src/*.js'],
        dest: 'static/js/dist/<%= pkg.name %>.js'
      },
      development: {
        src: ['static/js/src/*.js'],
        dest: 'build/static/js/<%= pkg.name %>.min.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'build/static/js/<%= pkg.name %>.min.js'
      },
      dynamic_mappings: {
        files: [{
          expand: true,
          cwd: 'static/js/src/',
          src: '*.js',
          dest: 'static/js/dist',
          ext: '.min.js'
        }]
      }
    },
    compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: false,
        unused: false,
        boss: true,
        eqnull: false,
        browser: false,
        expr: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      scripts: {
        src: ['static/js/src/*.js']
      }
    },
    copy: {
      main: {
        src: '*.html',
        dest: 'build/',
        options: {
          process: function (content, srcpath) {
            return content.replace(/href="build\//g,"href=\"");
          }
        }
      }
    },
    watch: {
      html: {
        files: ['*.html'],
        tasks: ['copy']
      },
      css: {
        files: ['static/css/**/*.scss','config.rb'],
        tasks: ['compass']
      },
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      scripts: {
        files: '<%= jshint.scripts.src %>',
        tasks: ['jshint:scripts', 'concat:development']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task.
  grunt.registerTask('default', ['compass', 'jshint', 'concat:development', 'copy']);
  grunt.registerTask('production', ['compass', 'jshint', 'concat:dist', 'uglify', 'copy']);

};
