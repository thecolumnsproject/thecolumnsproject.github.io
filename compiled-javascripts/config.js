var env = 'development';
var config = {
	development: {
		api: {
			host: 'http://127.0.0.1:8080/api'
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
			host: 'http://api-env-qdfe3rbbmw.elasticbeanstalk.com/api'
		},
		web: {
			host: 'https://thecolumnsproject.github.io'
		},
		embed: {
			host: 'http://thecolumnsproject.com.s3-website-us-west-2.amazonaws.com',
			path: '/public/embed-table.js'
		}
	}
}[env];