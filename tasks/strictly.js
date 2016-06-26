/**
 * Created by apizzimenti on 6/22/16.
 */

var c = require("./filing");

module.exports = function (grunt) {
	var name = "strictly",
		desc = "Checks to see if file(s) are in strict mode.",
		done;
	
	grunt.registerTask(name, desc, function () {

		done = this.async();
		
		grunt.config.requires("strictly.files");

		var files = grunt.config("strictly.files"),
			cwd = grunt.config("strictly.config.cwd") || process.cwd(),
			lines = grunt.config("strictly.config.lines") || 10,
			type = grunt.config("strictly.config.function") ? true : false,
			paths = c.getGlob(c.mapPath(cwd, files)),
			num = paths.length,
			checked = 0;

		paths.forEach(function (p) {
			checked = c.checker(grunt, p, done, checked, num, lines, type);
		});
	});
};