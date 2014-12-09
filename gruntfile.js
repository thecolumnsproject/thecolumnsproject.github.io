module.exports = function(grunt) {
	
	grunt.initConfig({
		sass: {
			dist: {
				files: [{
					expand: true,
					cwd: 'stylesheets',
					src: ['*.scss'],
					dest: 'css',
					ext: '.css',
				}]
			}
		},
		handlebars: {
			compile: {
				options: {
					namespace: "Columns.Templates"
				},
				files: {
					"templates/templates.js": "templates/**/*.hbs"
				}
			}
		},
		watch: {
			options: {
				livereload: true,
			},
			sass: {
				files: '**/*.scss',
				tasks: ['sass'],
			},
			html: {
				files: '**/*.html',
			},
			handlebars: {
				files: '**/*.hbs',
				tasks: ['handlebars']
			},
			javascript: {
				files: 'javascripts/**/*.js',
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-handlebars');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['sass', 'handlebars', 'watch']);
}