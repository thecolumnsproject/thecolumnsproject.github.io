var env = 'development';
var config = {
	local: {
		api: {
			host: 'http://localhost:8080/api'
		}
	}, 
	development: {
		api: {
			host: 'http://api-env-qdfe3rbbmw.elasticbeanstalk.com/api'
		}
	}
}[env];