const 	mysql = require("mysql"),
		mysql_connection = mysql.createConnection({
			host:'localhost',
			user:'root',
			password:'123456',
			port:'3306',
			database:'test'
		});

module.exports = {

	add(){},

	delete(){},

	update(){},

	exist(){}
}