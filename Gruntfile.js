module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Concatenate all the JS files into a single one
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [
        'client/app/**/*.js',
        'client/app/config.js',
        '!client/app/assets/js/*js',
        '!client/app/bower_components/**/*js',
        '!client/app/dist/**/*js'
        ],
        dest: 'client/app/dist/js/app.concat.js'
      }
    },

    // Check and compile all the SCSS files into one single and compressed CSS file
    sass: {
      dist: {
        options: {
          sourceMap: false,
          outputStyle: 'compressed'
        },
        files: {                         
          'client/app/dist/css/app.css': 'client/app/assets/scss/app.scss',       // 'destination': 'source' 
        }
      }
    },

    // Minify and uglify the JS file generated
    uglify: {
      options: {
        banner: '/*! app.js <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        preserveComments: false
      },
      build: {
        src: 'client/app/dist/js/app.concat.js',
        dest: 'client/app/dist/js/app.min.js'
      }
    },

    // Check for Javascript errors
    jshint: {
      files: [
        'client/app/**/*.js',
        '!client/app/assets/js/*js',
        '!client/app/bower_components/**/*js',
        '!client/app/components/**/*js',
        '!client/app/dist/**/*js'
      ],
      options: {
        force: 'true',
        jshintrc: '.jshintrc',
        ignores: [
        'public/lib/**/*.js',
        'public/dist/**/*.js'
        ]
      }
    },

    // Watch for file modifications and compile automaticaly
    watch: {
      scripts: {
        files: [
          'client/app/**/*.js',
          '!client/app/assets/js/*js',
          '!client/app/bower_components/**/*js',
          '!client/app/components/**/*js',
          '!client/app/dist/**/*js'
        ],
        tasks: [
          'jshint',
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'client/app/assets/scss/**/*.scss',
        tasks: ['sass']
      },
      picture: {
        files: 'client/app/assets/pictures/**/*',
        tasks: ['copy']
      }
    },

    // Shell commands to launch the server and open the application into a browser window
    shell: {
      view: {
        command: 'open http://localhost:3000/',
      },
      server:{
        command: 'nodemon server/server.js'
      },
      cordova:{
        command: 'cd mobileApp && cordova run ios'
      }
    },

    copy: {
      main: {
        files: [
          // copy JS file
          {expand: true, flatten: true, src: ['client/app/dist/js/app.min.js'], dest: 'mobileApp/www/js/'},
          // copy CSS file
          {expand: true, flatten: true, src: ['client/app/dist/css/app.css'], dest: 'mobileApp/www/css/'},
          // copy HTML files
          {
            expand: true,
            cwd: 'client/app/views/',
            src: ['**/*html'],
            dest: 'mobileApp/www/views/'
          },
          // copy picture files to mobile appp folder
          {
            expand: true,
            cwd: 'client/app/assets/pictures',
            src: ['**/*'],
            dest: 'mobileApp/www  /img/'
          },
          // copy picture files to mobile appp folder
          {
            expand: true,
            cwd: 'client/app/assets/pictures',
            src: ['**/*'],
            dest: 'client/app/dist/img/'
          }

        ],
      },
    }

  });

  // Grunt dependencies
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  // Check and create application files
  grunt.registerTask('build', [
    'jshint',
    'concat',
    'uglify',
    'sass',
    'copy'
  ]);

  // Build and run iOS app
  grunt.registerTask('ios', function () {
    grunt.task.run([ 'shell:cordova' ]);
  });

  // Open the HTML app file
  grunt.registerTask('view', function () {
    grunt.task.run([ 'shell:view' ]);
  });

  // Start local server
  grunt.registerTask('server', function () {
    grunt.task.run([ 'shell:server' ]);
  });

};