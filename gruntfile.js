"use strict";
/**
 * Created by apizzimenti on 6/23/16.
 */

var grunt = require("grunt");

module.exports = function (grunt) {
	grunt.loadTasks("./tasks");
	grunt.loadNpmTasks("grunt-contrib-jshint");

	grunt.initConfig({
		
		strictly: {
			config: {
				cwd: "test/"
			},
			files: [
				"**/*.js"
			]
		},

		jshint: {
			all: ["test/testjs.js"]
		}
	});

	grunt.registerTask("default", [
		"jshint",
		"strictly"
	]);

	grunt.registerTask("jshint", ["jshint"]);
};