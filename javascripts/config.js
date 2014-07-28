var env = 'local';
var config = {
	local: {
		api: {
			host: 'http://localhost:8080/api'
		}
	}, 
	development: {
		api: {
			host: 'http://pacific-basin-8034.herokuapp.com/api'
		}
	}
}[env];