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
		replace: {
			embed: {
				src: ['compiled-javascripts/embed-table.js'],
				dest: 'compiled-javascripts/embed-table.js',
				replacements: [{
					from: '{{api_host}}',
					to: function(matchedWord) {
						if (process.env.NODE_ENV == 'production') {
							return 'http://api.thecolumnsproject.com';
						} else {
							return 'http://127.0.0.1:8080'
						}
					}
				}, {
					from: '{{root_path}}',
					to: function(matchedWord) {
						if (process.env.NODE_ENV == 'production') {
							return 'http://colum.nz';
						} else {
							return 'http://127.0.0.1'
						}
					}
				}]
			},
			app: {
				src: ['javascripts/config.js'],
				dest: 'compiled-javascripts/config.js',
				replacements: [{
					from: '{{environment}}',
					to: function(matchedWord) {
							return process.env.NODE_ENV || 'development';
					}
				}]
			},
			require: {
				src: ['compiled-javascripts/embed-table.js'],
				dest: 'compiled-javascripts/embed-table.js',
				replacements: [{
					from: /[^a-zA-Z](require)[^a-zA-Z]/g,
					to: function(matchedWord) {
						return matchedWord.substring(0,1) + 
							   'columns_require' + 
							   matchedWord.substring(matchedWord.length - 1,matchedWord.length);
					}
				}]
			}
		},
		browserify: {
			embed: {
				src: ['javascripts/embed-table.js'],
				dest: 'compiled-javascripts/embed-table.js'
			}
		},
		concat: {
			embed: {
				src: [
					'javascripts/embed-table-intro.js',
					'bower_components/jquery/dist/jquery.min.js',
					// 'bower_components/hammerjs/hammer.min.js',
					// 'bower_components/hammerjs/hammer.js',
					// 'bower_components/jquery-hammerjs/jquery.hammer.js',
					// 'vendor/prevent-ghost-click.js',
					// 'bower_components/velocity/velocity.min.js',
					// 'bower_components/velocity/velocity.js',
					// 'bower_components/velocity/velocity.ui.min.js',
					// 'bower_components/handlebars/handlebars.min.js',
					'bower_components/handlebars/handlebars.js',
					'templates/embeddable-templates.js',
					'compiled-javascripts/embed-table.js',
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
		jasmine: {
			app: {
				src: ['javascripts/models/*.js', 'javascripts/controllers/*.js', 'javascripts/styling/**/*.js'],
				options: {
					specs: 'specs/**/*.js',
					vendor: [
						'bower_components/jquery/dist/jquery.js',
						'bower_components/handlebars/handlebars.js',
						'bower_components/velocity/velocity.js',
						'vendor/jquery-ui.min.js',
						'bower_components/jasmine-jquery/lib/jasmine-jquery.js'
					],
					helpers: [
						'templates/embeddable-templates.js',
						'templates/templates.js',
						'compiled-javascripts/config.js'
					]
				}
			}
		},
		watch: {
			options: {
				// livereload: true,
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
				tasks: ['handlebars', 'concat']
			},
			javascript: {
				files: 'javascripts/**/*.js',
				tasks: ['replace', 'browserify', 'replace', 'concat']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-handlebars');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-contrib-jasmine');

	grunt.registerTask('default', ['sass', 'handlebars', 'browserify', 'replace', 'concat', 'watch']);
	grunt.registerTask('build', ['sass', 'handlebars', 'browserify', 'replace', 'concat']);
}