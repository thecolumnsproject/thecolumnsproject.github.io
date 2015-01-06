var env = 'development';
var config = {
	local: {
		api: {
			host: 'http://127.0.0.1:8080/api'
		},
		web: {
			host: 'http://127.0.0.1'
		}
	}, 
	development: {
		api: {
			host: 'http://api-env-qdfe3rbbmw.elasticbeanstalk.com/api'
		},
		web: {
			host: 'https://thecolumnsproject.github.io'
		}
	}
}[env];