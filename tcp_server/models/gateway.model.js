const
	mysql = require("mysql"),
	mysql_connection = mysql.createConnection({
			host:'localhost',
			user:'root',
			password:'123456',
			port:'3306',
			database:'test'
	});

module.exports = {

	connect(socket){

		mysql_connection.query("UPDATE gateways SET state = ? WHERE IP = ?",
							["connect", socket.remoteAddress],
							function(err, result){
								if (err) {
									console.log("[UPDATE ERROR] - ", err.message);
									return;
								}																	
							});
	},

	disconnect(socket){

		mysql_connection.query("UPDATE gateways SET state = ? WHERE IP = ?",
							["disconnect", socket.remoteAddress],
							function(err, result){
								if (err) {
									console.log("[UPDATE ERROR] - ", err.message);
									return;
								}																	
							});
	}
}