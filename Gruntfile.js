module.exports = function(grunt) {
    var path = require('path');
    var delayRequestSnippet = require('grunt-connect-delay/lib/utils').delayRequest;
    grunt.initConfig({
        connect: {
            delay: [
                { url: '^/api/.*$', delay: 10000 } // Delay calls to API by 10sec
            ],
            dev: {
                options: {
                    keepalive: true,
                    // ^^ This will PREVENT all subsequent tasks from running!
                    middleware: function (connect) {
                        return [
                               delayRequestSnippet
                          // , rewriteRequestSnippet
                          // , proxyRequestSnippet
                             , connect.static(path.resolve('.'))
                        ];
                    }
                }
            }
        },
        /* Optional */
        configureDelay: {
            options: {
                rulesProvider  : 'connect.delay'
              , useDefaultRule : true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-connect-delay');

    // "configureDelayRules" should be before the "connect"/"express" task
    grunt.registerTask('server',
      [ 'configureDelayRules'
      , 'connect:dev'
      ]
    );
};
