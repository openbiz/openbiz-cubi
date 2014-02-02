var path = require('path');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jsdoc: {
      dist: {
        src: [
            'app/**/*.js'
        ],
        dest: 'doc'
      }
    },
    jade: {
      compile: {
        options: {
          pretty: false,
          data: {
            debug: false,
          }
        },
        files: [
          {
            expand: true, 
            cwd: 'ui/',
            src: "**/*.jade",
            dest: "ui/",
            ext: ".html"
          }
        ]
      }
    },
    requirejs: {
      cubi: {
        options: {
          preserveLicenseComments:false,
          baseUrl: "./ui",
          useStrict: true,          
          name: "main",
          out: "ui/main.min.js",
          paths:{
            'i18n'    : 'vendor/require/plugins/i18n',
            'text'    : 'vendor/require/plugins/text'            
          },
          shim:{
            'modules/account/main':{
              deps: [ 
                      //models
                      'modules/account/models/User', 
                      'modules/account/models/UserCollection',
                      'modules/account/models/Account',
                      'modules/account/models/Invitation',
                      'modules/account/models/InvitationCollection'
                    ]
            },
            'modules/system/main':{
              deps: [ 
                      //models
                      'modules/system/models/App', 
                      'modules/system/models/AppCollection',
                      //views
                      'modules/system/views/LayoutView',
                      'modules/system/views/ContactRightView',
                      'modules/system/views/MenuView',
                      'modules/system/views/NavView',
                      'modules/system/views/HeaderView',
                    ]
            },
            'modules/user/main':{
              deps: [ 
                      //models
                      'modules/user/models/User',         
                      //views              
                      'modules/user/views/DashboardView',
                      'modules/user/views/ForgetPasswordView',
                      'modules/user/views/LoginView',
                      'modules/user/views/RegisterView'
                    ]
            },
            'modules/me/main':{
              deps: [ 
                      //models
                      'modules/me/models/Me',         
                      //views              
                      'modules/me/views/SetupWizardView'                      
                    ]            
            }
          }
        }
      }
    },
    clean: {
      html: {
        src: [
          'ui/**/*.html'
        ]
      }      
    }
  });


  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['requirejs','jade','jsdoc']);
};
