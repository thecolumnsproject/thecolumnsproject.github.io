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
			embed: {
				options: {
					namespace: "Columns.EmbeddableTemplates"
				},
				files: {
					"templates/embeddable-templates.js": "templates/embed-table/*.hbs"
				}
			},
			layout: {
				options: {
					namespace: "Columns.Templates"
				},
				files: {
					"templates/templates.js": ["templates/**/*.hbs", "!templates/embed-table/*.hbs"]
				}
			}
		},
		concat: {
			embed: {
				src: [
					'javascripts/embed-table-intro.js',
					'bower_components/jquery/dist/jquery.min.js',
					'bower_components/hammerjs/hammer.min.js',
					// 'bower_components/hammerjs/hammer.js',
					'bower_components/jquery-hammerjs/jquery.hammer.js',
					'vendor/prevent-ghost-click.js',
					'bower_components/velocity/velocity.min.js',
					// 'bower_components/velocity/velocity.js',
					'bower_components/velocity/velocity.ui.min.js',
					// 'bower_components/handlebars/handlebars.min.js',
					'bower_components/handlebars/handlebars.js',
					'templates/embeddable-templates.js',
					'javascripts/embed-table.js',
					'javascripts/embed-table-outro.js'
				],
				dest: 'public/embed-table.js'
			},
			styling: {
				src: [
					'javascripts/styling/components/*.js',
					'javascripts/styling/types.js'
				],
				dest: 'compiled-javascripts/styling/compiled-data.js'
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
				tasks: ['concat']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-handlebars');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('default', ['sass', 'handlebars', 'concat', 'watch']);
}