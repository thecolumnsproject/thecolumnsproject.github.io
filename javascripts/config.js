var parseUri 			= require('../vendor/parseUri.js');

var env = '{{environment}}';
module.exports = {
	development: {
		env: env,
		api: {
			host: 'http://127.0.0.1:8080'
		},
		web: {
			host: 'http://127.0.0.1'
		},
		embed: {
			host: 'http://127.0.0.1:8080',
			path: '/public/embed-table.js',
			desktop: {
				'feature-table': 2
			},
			mobile: {
				'feature-table': 2
			}
		},
		debug: parseUri( window.location ).queryKey["debug"]
	},
	staging: {
		env: env,
		api: {
			host: 'http://apistg.thecolumnsproject.com'
		},
		web: {
			host: 'http://appstg.thecolumnsproject.com'
		},
		embed: {
			host: 'http://stg.colum.nz',
			path: '/public/embed-table.js',
			desktop: {
				'feature-table': 8
			},
			mobile: {
				'feature-table': 5
			}
		}
	},
	production: {
		env: env,
		api: {
			host: 'http://api.thecolumnsproject.com'
		},
		web: {
			host: 'http://app.thecolumnsproject.com'
		},
		embed: {
			host: 'http://colum.nz',
			path: '/public/embed-table.js',
			desktop: {
				'feature-table': 180
			},
			mobile: {
				'feature-table': 181
			}
		}
	}
}[env];