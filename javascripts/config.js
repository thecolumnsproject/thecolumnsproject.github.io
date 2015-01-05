var env = 'local';
var config = {
	local: {
		api: {
			host: 'http://127.0.0.1:8080/api'
		}
	}, 
	development: {
		api: {
			host: 'http://api-env-qdfe3rbbmw.elasticbeanstalk.com/api'
		}
	}
}[env];