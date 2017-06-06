const
	ct = require('../../sql_server/my_sql');

module.exports = {

	add(device, type, nickname, home, remark = "NULL"){
		ct.query("INSERT INTO device(device, type, nickname, home, remark) VALUES(?, ?, ?, ?, ?)",
								[device, type, nickname, home, remark],
								function(err, result){
									if(err) {
										console.log("[INSERT ERROR] - ", err.message);
										return;
										}

										// console.log("-----INSERT ok-----");
										// console.log("INSERT : ", result);
										// console.log("----------------\n");
								});
	},

	delete(device){
		ct.query("DELETE FROM device WHERE device = ?",
								[device],
								function(err, result){
									if(err) {
										console.log("[DELETE ERROR] - ", err.message);
										return;
										}
								});
	},

	homeDevices(name, callback){
		ct.query("SELECT a.home FROM home a, user b WHERE (a.contact = b.creator AND b.name = ?)", 
				[name],
				function(err, result){
					if (err) {
						console.log("[SELECT ERROR] - ", err.message);
						callback(error());
					}

					let devices = result.map((item) => {

						console.log(item.home);

						ct.query("SELECT * FROM device WHERE (home = ?)",
								[item.home],
								function(err, result){

									if(err) {
											console.log("[SELECT ERROR] - ", err.message);
											callback(error());
										}

									return {
												"device" : item.device,
												"type" : item.type,
												"nickname" : item.nickname,
												"home" : item.home,
												"remark" : item.remark
											}
									});
								});

					callback(devices);
		});
	},

	all(callback){
		ct.query("SELECT * FROM device",
				function(err, result){
					if (err) {
						console.log("[SELECT ERROR] - ", err.message);
						callback(error());
					}

					let devices = result.map((item) => {
								return {
											"device" : item.device,
											"type" : item.type,
											"nickname" : item.nickname,
											"home" : item.home,
											"remark" : item.remark											
										}
								});

					callback(devices);
				});
	}
}