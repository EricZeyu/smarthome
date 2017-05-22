const 	
	mysql = require("mysql"),
	connection = mysql.createConnection({
			host:'localhost',
			user:'root',
			password:'123456',
			port:'3306',
			database:'test'
	});


module.exports = connection;

// module.exports = {

// 	getConnection(){
// 		pool.getConnection((err, connection) => {
// 			if (err) console.log('Connected to MySql failed.');
// 			else {
// 				console.log('Connected to MySql succeed.');
// 			}
// 		});
// 	},

// 	operation(op){}
// }