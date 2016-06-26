/**
 * Created by apizzimenti on 6/24/16.
 */

var chalk = require("chalk"),
	fs = require("fs"),
	p = require("path"),
	lbl = require("line-by-line"),
	glob = require("glob");

/**
 * @author Anthony Pizzimenti
 *
 * @desc Checks to see if a file exists and calls the necessary functions based on results.
 *
 * @param grunt {object} Current grunt object.
 * @param path {string} Resolved filepath (either through absolute paths or globbing).
 * @param done {function} Grunt's async call; when the functions are done, call done().
 * @param filesChecked {number} Counter; the number of files that have been checked.
 * @param numFiles {number} Total number of files.
 * @param prefLines {number} Preferred number of lines to check.
 * @param type {boolean} Function or string type?
 *
 * @returns {number} Number of files checked.
 */

function checker (grunt, path, done, filesChecked, numFiles, prefLines, type) {

	var name = p.basename(path),
		checkedLines = 0,
		contains = false;

	filesChecked = filesChecked + 1;

	fs.stat(path, function (e, s) {

		if (e) {
			_checkError(grunt, name, filesChecked, numFiles, done);
		} else {
			_checkLines(grunt, path, name, checkedLines, prefLines, filesChecked, numFiles, done, contains, type);
		}

	});

	return filesChecked;
}

/**
 * @author Anthony Pizzimenti
 *
 * @desc Runs if the specified file doesn't exist.
 *
 * @param grunt {object} Current grunt object.
 * @param fileName {string} Filename.
 * @param filesChecked {number} The number of files checked.
 * @param numFiles {number} The total number of files.
 * @param done {function} Grunt's async call; when everything is done executing, done() is called.
 *
 * @returns {null}
 * @private
 */

function _checkError (grunt, fileName, filesChecked, numFiles, done) {

	var writing = "Writing use strict to " + chalk.bgGreen.white(fileName) + " → ";

	if (filesChecked !== numFiles) {
		grunt.log.writeln(writing + chalk.bgRed.white(fileName) + " doesn't exist");
		return null;
	} else {
		grunt.log.writeln(writing + chalk.bgRed.white(fileName) + " doesn't exist");
		done(true);
	}
}

/**
 * @author Anthony Pizzimenti
 *
 * @desc Runs if the file exists; checks to see if "use strict" is already in the first prefLines || 10 lines of the
 * file, then either moves to the next file or terminates the task.
 *
 * @param grunt {object} Current grunt object.
 * @param path {string} Filepath.
 * @param fileName {string} Filename.
 * @param checkedLines {number} Number of lines checked on *this* file.
 * @param prefLines {number} Preferred number of lines to be checked.
 * @param filesChecked {number} Number of files checked.
 * @param numFiles {number} Total number of files.
 * @param done {function} Grunt's async call; when everything is done executing, done() is called.
 * @param contains {boolean} Does this file contain "use strict"?
 * @param type {boolean} Function or string form of use strict?
 *
 * @private
 */

function _checkLines (grunt, path, fileName, checkedLines, prefLines, filesChecked, numFiles, done, contains, type) {

	var line = new lbl(path),
		writing = "Writing use strict to " + chalk.bgGreen.white(fileName) + " → ",
		func = "(function () {\"use strict\";})();\n",
		str = "\"use strict\";\n",
		strict = type ? func : str;

	line.on("line", function (l) {

		if (checkedLines !== prefLines) {
			if (l.includes(str) || l.includes(func)) {
				contains = true;
				line.end()
			}
		} else {
			line.end();
		}

		checkedLines++;

	}).on("end", function () {

		if (!contains) {
			var contents = grunt.file.read(path);

			fs.writeFile(path, strict + contents, function (e) {
				grunt.log.writeln(writing + chalk.green("done!"));

				if (filesChecked >= numFiles) {
					done(true);
				}
			});
		} else {
			grunt.log.writeln(writing + "file is already in strict mode");

			if (filesChecked >= numFiles) {
				done(true);
			}
		}
	});
}

/**
 * @author Anthony Pizzimenti
 *
 * @desc Globs files.
 *
 * @param files {string | string[]} List of files to be searched or globbed.
 *
 * @returns {Array} Array of matching files.
 */

function getGlob (files) {

	var concatFiles = [];

	if (Array.isArray(files)) {
		files.forEach(function (file) {
			var matches = glob.sync(file);

			matches.forEach(function (match) {
				concatFiles.push(match);
			})
		});

		return concatFiles;
	} else {
		concatFiles.concat(glob.sync(files));
		return concatFiles;
	}
}


function mapPath (cwd, files) {

	return files.map(function (elem) {
		return p.join(cwd, elem);
	});
}

module.exports = {
	checker: checker,
	_check_Error: _checkError,
	_check_Lines: _checkLines,
	getGlob: getGlob,
	mapPath: mapPath
};
