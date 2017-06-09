const
	ct = require('../../sql_server/my_sql');

module.exports = {

	add(MAC, IP, port, home, state = 'Off'){
		ct.query("INSERT INTO gateway(MAC, IP, port, home, state) VALUES(?, ?, ?, ?, ?)",
								[MAC, IP, port, home, state],
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

	update(MAC, newMAC, newIP, newport, newhome){
		ct.query("UPDATE gateway SET MAC = ?, IP = ?, port = ?, home = ? WHERE (MAC = ?)",
								[newMAC, newIP, newport, newhome, MAC],
								function(err, result){
									if(err) {
										console.log("[UPDATE ERROR] - ", err.message);
										return;
										}
								
			});
	},

	exist(home, callback){
		ct.query("SELECT * FROM gateway WHERE home = ? limit 1",
								[home],
								function(err, result){
									if(err) {
											console.log("[SELECT ERROR] - ", err.message);
											callback(error());
										}

									if (result.length > 0) return callback(true);
										else return callback(false);
								});
	},

	mygateway(name, callback){
		ct.query("SELECT a.* FROM gateway a, home b WHERE (a.home = b.home AND b.contact = ?)",
				[name],
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
											"home" : item.home,
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
											"home" : item.home,
											"state" : item.state										
										}
								});

					callback(gateway);
				});
	}
}