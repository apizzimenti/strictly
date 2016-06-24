/**
 * Created by apizzimenti on 6/22/16.
 */

var grunt = require("grunt"),
	fs = require("fs"),
	chalk = require("chalk"),
	lbl = require("line-by-line");

module.exports = function (grunt) {
	var name = "strictly",
		desc = "Checks to see if \"use strict\" is within the file; if not, it's prepended to the beginning of the file";
	
	grunt.registerTask(name, desc, function () {
		
		var done = this.async();

		grunt.config.requires("strictly.config.files");

		var files = grunt.config("strictly.config.files"),
			cwd = grunt.config("strictly.config.cwd") || process.cwd(),
			lines = grunt.config("strictly.config.liens") || 10,
			paths = Array.isArray(files) ? files : [files],
			num = paths.length;

		function checker (p) {

			var a = cwd + "/" + p,
				line,
				i = 0,
				n = 0,
				writing = "Writing use strict to " + chalk.bgGreen.white(p) + " → ",
				contents,
				strict = "\"use strict\";\n",
				contains = false;

			fs.stat(a, function (e, s) {
				n++;

				if (e) {

					if (n !== num) {
						grunt.log.writeln(writing + chalk.bgRed.white(p) + " doesn't exist");
						return null;
					} else {
						done();
					}
				} else {

					line = new lbl(a);

					line.on("line", function (l) {

						if (i !== lines) {
							if (l.includes("use strict")) {
								grunt.log.write(writing + "file is already in strict mode\n");
								contains = true;
								line.end();
							}
						}

						i++;

					}).on("end", function () {

						if (!contains) {
							contents = grunt.file.read(a);
							grunt.file.write(a, strict + contents);
							grunt.log.write(chalk.green(writing + "done!\n"));
						}

						if (n === done) {
							done();
						}
					});

				}
			});
		}

		paths.forEach(checker);
	});
};