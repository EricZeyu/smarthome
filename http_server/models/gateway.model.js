const
	ct = require('../../sql_server/my_sql');

module.exports = {

	add(MAC, IP, port, creator, state = 'Off'){
		ct.query("INSERT INTO gateway(MAC, IP, port, creator, state) VALUES(?, ?, ?, ?, ?)",
								[MAC, IP, port, creator, state],
								function(err, result){
									if(err) {
										console.log("[INSERT ERROR] - ", err.message);
										return;
										}
								});
	},

	delete(MAC){
		ct.query("DELETE FROM gateway WHERE MAC = ?",
								[MAC],
								function(err, result){
									if(err) {
										console.log("[DELETE ERROR] - ", err.message);
										return;
										}
								});
	},

	update(MAC, newMAC, newIP, newport){
		ct.query("UPDATE gateway SET MAC = ?, IP = ?, port = ? WHERE (MAC = ?)",
								[newMAC, newIP, newport, MAC],
								function(err, result){
									if(err) {
										console.log("[UPDATE ERROR] - ", err.message);
										return;
										}
								
			});
	},

	exist(creator, callback){
		ct.query("SELECT * FROM gateway WHERE creator = ? limit 1",
								[creator],
								function(err, result){
									if(err) {
											console.log("[SELECT ERROR] - ", err.message);
											callback(error());
										}

									if (result.length > 0) return callback(true);
										else return callback(false);
								});
	},

	mygateway(creator, callback){
		ct.query("SELECT * FROM gateway WHERE (creator = ?)",
				[creator],
				function(err, result){
					if (err) {
						console.log("[SELECT ERROR] - ", err.message);
						callback(error());
					}

					let gateway = result.map((item) => {
								return {
											"MAC" : item.MAC,
											"IP" : item.IP,
											"port" : item.port,
											"creator" : item.creator,
											"state" : item.state
										}
								});
					
					callback(gateway);
		});
	},

	all(callback){
		ct.query("SELECT * FROM gateway",
				function(err, result){
					if (err) {
						console.log("[SELECT ERROR] - ", err.message);
						callback(error());
					}

					let gateway = result.map((item) => {
								return {
											"MAC" : item.MAC,
											"IP" : item.IP,
											"port" : item.port,
											"creator" : item.creator,
											"state" : item.state
										}
								});

					console.log(gateway);
					callback(gateway);
				});
	}
}