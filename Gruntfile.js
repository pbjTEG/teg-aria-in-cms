const git = require('git-rev-sync');
module.exports = function (grunt) {
	const thisTag    = git.tag(),
	      thisBranch = git.branch();

	grunt.initConfig({
		                 pkg    : grunt.file.readJSON('package.json'),
		                 banner : '/*\n' +
		                          '* <%= pkg.title %>\n' +
		                          '*\n' +
		                          '*\n' +
		                          '* <%= pkg.description %>\n' +
		                          '*\n' +
		                          '* Author: <%= pkg.author %>\n' +
		                          '* Copyright (c) <%= grunt.template.today("yyyy") %> PMG: The Engage Group\n' +
											'* License: <%= pkg.license %>\n' +
		                          '*\n' +
		                          '* Release:\n' +
		                          '*   Branch: ' + thisBranch + '\n' +
		                          '*   Tag:    ' + thisTag + '\n' +
		                          '*   Date:   ' + grunt.template.today('yyyymmdd') + '\n' +
		                          '*/\n',
		                 postFix: `_${thisTag}`,
		                 uglify : {
			                 options: {
				                 banner   : '<%= banner %>',
				                 sourceMap: 'dist/<%= pkg.name %>.min.js.map'
			                 },
			                 build  : {
				                 src : 'src/<%= pkg.name %>.js',
				                 dest: 'dist/<%= pkg.name %>.min.js'
			                 },
		                 },
		                 copy   : {
			                 dist: {
				                 files: [
					                 {
						                 src : 'dist/<%= pkg.name %>.min.js',
						                 dest: 'dist/<%= pkg.name %><%= postFix %>.min.js',
					                 },
					                 {
						                 src : 'dist/<%= pkg.name %>.min.js.map',
						                 dest: 'dist/<%= pkg.name %><%= postFix %>.min.js.map',
					                 },
				                 ]
			                 }
		                 }
	                 });

	require('load-grunt-tasks')(grunt);

	// Default task(s).
	grunt.registerTask('default', ['uglify', 'copy']);

};
