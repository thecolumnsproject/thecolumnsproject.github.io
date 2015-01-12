var env = 'development';
var config = {
	development: {
		api: {
			host: 'http://127.0.0.1:8080'
		},
		web: {
			host: 'http://127.0.0.1'
		},
		embed: {
			host: 'http://127.0.0.1',
			path: '/public/embed-table.js'
		}
	}, 
	production: {
		api: {
			host: 'http://api.thecolumnsproject.com'
		},
		web: {
			host: 'http://app.thecolumnsproject.com.s3-website-us-west-2.amazonaws.com'
		},
		embed: {
			host: 'http://app.thecolumnsproject.com.s3-website-us-west-2.amazonaws.com',
			path: '/public/embed-table.js'
		}
	}
}[env];