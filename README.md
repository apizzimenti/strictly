### strictly
-----

Simply, `strictly` is a tool that writes `"use strict"` to your .js files so you don't forget. It can be easily worked
into your Grunt workflow to make sure that all your files are in strict mode so JSHint doesn't get mad.


#### installation
`$ [sudo] npm i strictly --save-dev`


#### options

    grunt.initConfig({
        strictly: {
            config: {
                // options go here
            },
            files: [...]
        }
    });

`files`: A string filepath or an array of filepaths to check. **File globbing is supported.**

`type` [optional]: Whether to use the IIFE function form `(function () {"use strict";})();` or string form `"use strict"`.

`lines` [optional]: The preferred number of lines from the top of the file to check for `"use strict"`.

`cwd` [optional]: The path you want to start from; e.g.:

    -app
        - src
            - game
            - scripts
                script1.js
                script2.js
                ...
            - styles
            
    Gruntfile.js

If you don't specify `cwd`, `strictly` will look for files starting wherever your gruntfile is. If you want to change the
directory, (e.g. `app/src/`), it's much less strain to type out all the file names.

#### usage

    Gruntfile.js
    
    module.exports = function (grunt) {
        ... 
        
        grunt.loadNpmTasks("strictly");
        
        grunt.initConfig({
            strictly: {
                config: {
                    lines: 10,
                    cwd: "app/src"
                },
                files: [
                    "app/src/**/*.js"
                ]
            }
        });
        
        // just run with "grunt strictly",
        // or add it to your default build task
        
        grunt.registerTask("default", [
            "strictly",
            "jshint", 
            "nodeunit",
            "babel",
            "concat",
            "clean"
        }
    }
    
For an example Gruntfile, you can check this repo's Gruntfile as well.
         
        