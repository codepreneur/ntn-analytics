use strict;

module.exports = function(grunt){

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Compile SASS files into CSS
		compass: {
			dev: {

				options: {
					sassDir: 'sass',
					cssDir: 'public/stylesheets',
					ouputStyle: 'compact',
					require: 'zurb-foundation'
				}	
			}
		},

		// Watch changes on these files
		watch: {
			server: {
				files: ['sass/**/*.scss'],
				tasks: ['compass:dev']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');

	// Run these tasks on load
	grunt.task.run('compass:dev');

};