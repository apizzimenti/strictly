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
				files: [
					"test/*.js"
				]
			}
		},

		jshint: {
			files: {
				src: ["test/testjs.js"]
			}
		}
	});

	grunt.registerTask("default", [
		"strictly"
	]);
};