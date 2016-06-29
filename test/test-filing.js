/**
 * Created by apizzimenti on 6/28/16.
 */

var assert = require("assert"),
	filing = require("../tasks/filing");

describe("filing", () => {

	var test_path = "./test-files/**/*.js",
		files;

	describe("glob()", () => {
		it("returns an array of files", () => {
			files = filing.getGlob(test_path);
			assert(Array.isArray(files));
		});
	});

	// more test code on the way
});