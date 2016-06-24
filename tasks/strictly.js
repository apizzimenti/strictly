/**
 * Created by apizzimenti on 6/22/16.
 */

var grunt = require("grunt"),
	c = require("./filing");

module.exports = function (grunt) {
	var name = "strictly",
		desc = "Checks to see if file(s) are in strict mode.";
	
	grunt.registerTask(name, desc, function () {
		
		var done = this.async();

		grunt.config.requires("strictly.files");

		var files = grunt.config("strictly.files"),
			cwd = grunt.config("strictly.config.cwd") || process.cwd(),
			lines = grunt.config("strictly.config.liens") || 10,
			paths = c.getGlob(files),
			num = paths.length,
			checked = 0;

		paths.forEach(function (p) {
			c.checker(grunt, p, done, cwd, checked, num, lines);
		});
	});
};