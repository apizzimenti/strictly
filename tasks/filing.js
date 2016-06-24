/**
 * Created by apizzimenti on 6/24/16.
 */

var chalk = require("chalk"),
	fs = require("fs"),
	lbl = require("line-by-line");

function checker (grunt, p, done, cwd, checked, numFiles, lines) {

	var a = cwd + "/" + p,
		i = 0,
		contains = false;

	fs.stat(a, function (e, s) {
		checked++;

		if (e) {
			_check_Error(grunt, checked, numFiles, done);
		} else {
			_check_Lines(grunt, a, lines, checked, numFiles, done, contains);
		}

	});
}

function _check_Error (grunt, checked, numFiles, done, writing) {
	if (checked !== numFiles) {
		grunt.log.writeln(writing + chalk.bgRed.white(p) + " doesn't exist");
		return null;
	} else {
		grunt.log.writeln(writing + chalk.bgRed.white(p) + " doesn't exist");
		done(true);
	}
}

function _check_Lines (grunt, path, lines, checked, numFiles, done, contains) {

	var line = new lbl(path),
		writing = "Writing use strict to " + chalk.bgGreen.white(p) + " → ",
		strict = "\"use strict\";\n";

	line.on("line", function (l) {

		if (i !== lines) {
			if (l.includes("use strict")) {
				contains = true;
				line.end()
			}
		} else {
			line.end();
		}

		i++;

	}).on("end", function () {

		if (!contains) {
			var contents = grunt.file.read(path);

			fs.writeFile(path, strict + contents, function (e) {
				grunt.log.writeln(writing + chalk.green("done!"));

				if (checked === numFiles) {
					done(true);
				}
			});
		} else {
			grunt.log.writeln(writing + "file is already in strict mode");
			done(true);
		}
	});
}

module.exports = {
	checker: checker,
	_check_Error: _check_Error,
	_check_Lines: _check_Lines
};