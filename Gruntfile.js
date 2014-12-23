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

                    middleware: function (connect, options, middlewares) {

                        // If you are using the connect.options to serve static
                        // files yourself, then you can use this technique
                        // instead of hunting for which middlewares to retain.
                        //
                        // middlewares.unshift(delayRequestSnippet);
                        // return middlewares;

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
    grunt.registerTask('server', [ 'configureDelayRules' , 'connect:dev' ]);
    grunt.registerTask('default', 'server');
};
