/**
 * Created by apizzimenti on 6/23/16.
 */

var grunt = require("grunt");

module.exports = function (grunt) {
	grunt.loadTasks("./tasks");
	
	grunt.initConfig({
		
		strictly: {
			config: {
				files: [
					"test/testjs.js",
					"test/test2.js"
				]
			}
		}
	});

	grunt.registerTask("default", [
		"strictly"
	]);
};