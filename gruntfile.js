"use strict";
/**
 * Created by apizzimenti on 6/23/16.
 */

module.exports = function (grunt) {
	grunt.loadTasks("./tasks");
	grunt.loadNpmTasks("grunt-contrib-jshint");

	grunt.initConfig({

		jshint: {
			files: {
				src: ["test/**/*.js"]
			}
		},

		strictly: {
			config: {
				function: true
			},
			files: ["test/**/*.js"]
		}
	});

	grunt.registerTask("default", [
		"strictly",
		"jshint"
	]);

};