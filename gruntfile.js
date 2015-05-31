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
					namespace: "Columns.EmbeddableTemplates",
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
						} else if ( process.env.NODE_ENV == 'staging' ) {
							return 'http://apistg.thecolumnsproject.com';
						} else {
							return 'http://127.0.0.1:8080'
						}
					}
				}, {
					from: '{{root_path}}',
					to: function(matchedWord) {
						if (process.env.NODE_ENV == 'production') {
							return 'http://colum.nz';
						} else if ( process.env.NODE_ENV == 'staging' ) {
							return 'http://stg.colum.nz';
						} else {
							return 'http://127.0.0.1'
						}
					}
				}]
			},
			specs: {
				src: ['specs/compiled-specs.js'],
				dest: 'specs/compiled-specs.js',
				replacements: [{
					from: '{{api_host}}',
					to: function(matchedWord) {
						if (process.env.NODE_ENV == 'production') {
							return 'http://api.thecolumnsproject.com';
						} else if ( process.env.NODE_ENV == 'staging' ) {
							return 'http://apistg.thecolumnsproject.com';
						} else {
							return 'http://127.0.0.1:8080'
						}
					}
				}, {
					from: '{{root_path}}',
					to: function(matchedWord) {
						if (process.env.NODE_ENV == 'production') {
							return 'http://colum.nz';
						} else if ( process.env.NODE_ENV == 'staging' ) {
							return 'http://stg.colum.nz';
						} else {
							return 'http://127.0.0.1'
						}
					}
				}, {
					from: '{{environment}}',
					to: function(matchedWord) {
							return process.env.NODE_ENV || 'development';
					}
				}]
			},
			app: {
				src: ['compiled-javascripts/app.js'],
				dest: 'compiled-javascripts/app.js',
				replacements: [{
					from: '{{environment}}',
					to: function(matchedWord) {
							return process.env.NODE_ENV || 'development';
					}
				}]
			},
			// require: {
			// 	src: ['compiled-javascripts/embed-table.js'],
			// 	dest: 'compiled-javascripts/embed-table.js',
			// 	replacements: [{
			// 		from: /[^a-zA-Z](require)[^a-zA-Z]/g,
			// 		to: function(matchedWord) {
			// 			return matchedWord.substring(0,1) + 
			// 				   'columns_require' + 
			// 				   matchedWord.substring(matchedWord.length - 1,matchedWord.length);
			// 		}
			// 	}]
			// }
		},
		browserify: {
			embed: {
				src: ['javascripts/embed-table.js'],
				dest: 'compiled-javascripts/embed-table.js',
				// options: {
				// 	browserifyOptions: {
				// 		debug: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging' ? false : true
				// 	},
				// }
			},
			app: {
				src: ['javascripts/main.js'],
				dest: 'compiled-javascripts/app.js',
				options: {
					browserifyOptions: {
						debug: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging' ? false : true
					},
				}
			},
			specs: {
				src: ['specs/**/*.js', '!specs/compiled-specs.js'],
				dest: 'specs/compiled-specs.js'
			}
		},
		concat: {
			embed: {
				src: [
					'javascripts/embed-table-intro.js',
					// 'bower_components/jquery/dist/jquery.min.js',
					// 'bower_components/hammerjs/hammer.min.js',
					// 'bower_components/hammerjs/hammer.js',
					// 'bower_components/jquery-hammerjs/jquery.hammer.js',
					// 'vendor/prevent-ghost-click.js',
					// 'bower_components/velocity/velocity.min.js',
					// 'bower_components/velocity/velocity.js',
					// 'bower_components/velocity/velocity.ui.min.js',
					// 'bower_components/handlebars/handlebars.min.js',
					'bower_components/handlebars/handlebars.runtime.js',
					'templates/embeddable-templates.js',
					'compiled-javascripts/embed-table.js',
					'javascripts/embed-table-outro.js'
				],
				dest: 'public/embed-table.js'
			},
			styling: {
				src: [
					'javascripts/styling/intro.js',
					'javascripts/styling/components/*.js',
					'javascripts/styling/types.js',
					'javascripts/styling/outro.js'
					// 'javascripts/styling/defaults.js'
				],
				dest: 'compiled-javascripts/styling/compiled-data.js'
			}
		},
		jasmine: {
			app: {
				src: [
					// 'compiled-javascripts/app.js'
					// 'javascripts/models/*.js',
					// 'javascripts/controllers/*.js',
					// 'javascripts/styling/**/*.js',
					// '!javascripts/models/ColumnsTable.js'
				],
				options: {
					specs: 'specs/compiled-specs.js',
					vendor: [
						// 'bower_components/jquery/dist/jquery.js',
						'bower_components/handlebars/handlebars.js',
						'templates/templates.js',
						'bower_components/Papa-Parse/papaparse.js',
						'compiled-javascripts/app.js',
						// 'bower_components/velocity/velocity.js',
						// 'vendor/jquery-ui.min.js',
						'bower_components/jasmine-jquery/lib/jasmine-jquery.js',
						'bower_components/jasmine-ajax/lib/mock-ajax.js'
					],
					helpers: [
						'templates/embeddable-templates.js',
						'templates/templates.js',
						// 'compiled-javascripts/config.js',
						// 'compiled-javascripts/embed-table.js'
					]
				}
			}
		},
		webfont: {
			'columns-font': {
				src: 'fonts/vectors/*.svg',
				dest: 'fonts',
				destCss: 'stylesheets/',
				options: {
					stylesheet: 'scss',
					font: 'columns-font',
					syntax: 'bootstrap'
				}
			}
		},
		watch: {
			sass: {
				files: '**/*.scss',
				tasks: ['sass'],
				options: {
					livereload: true,
				},
			},
			html: {
				files: '**/*.html',
				options: {
					livereload: true,
				},
			},
			handlebars: {
				files: '**/*.hbs',
				tasks: ['handlebars', 'concat:embed'],
				options: {
					livereload: true,
				},
			},
			javascript: {
				files: 'javascripts/**/*.js',
				tasks: ['concat:styling', 'browserify', 'replace', 'concat:embed'],
				options: {
					livereload: true,
				},
			},
			icons: {
				files: 'fonts/ventors/*.svg',
				tasks: ['webfont'],
				options: {
					livereload: true,
				},
			},
			specs: {
				files: ['specs/**/*.js', 'specs/**/*.html', '!specs/compiled-specs.js'],
				tasks: ['browserify', 'replace']
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
	grunt.loadNpmTasks('grunt-minifyify');
	grunt.loadNpmTasks('grunt-webfont');

	// grunt.registerTask('default', ['sass', 'handlebars', 'browserify', 'replace', 'concat', 'watch']);
	grunt.registerTask('build', ['sass', 'handlebars', 'concat:styling', 'browserify', 'replace', 'concat:embed' ]);
	grunt.registerTask('default', ['webfont', 'build', 'watch'] );
}