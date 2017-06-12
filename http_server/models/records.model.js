const
	ct = require('../../sql_server/my_sql');

module.exports = {

	// add(device, source, dir, time, value){
	// 	ct.query("INSERT INTO records(device, source, dir, time, value) VALUES(?, ?, ?, ?, ?)",
	// 							[device, source, dir, time, value],
	// 							function(err, result){
	// 								if(err) {
	// 									console.log("[INSERT ERROR] - ", err.message);
	// 									return;
	// 									}
	// 							});
	// },

	add(device, source, dir, value){
		ct.query("INSERT INTO records(device, source, dir, value) VALUES(?, ?, ?, ?)",
								[device, source, dir, value],
								function(err, result){
									if(err) {
										console.log("[INSERT ERROR] - ", err.message);
										return;
										}
								});
	},

	delete(ID){
		ct.query("DELETE FROM records WHERE ID = ?",
								[ID],
								function(err, result){
									if(err) {
										console.log("[DELETE ERROR] - ", err.message);
										return;
										}
								});
	},

	myDeviceRecords(device, callback){
		ct.query("SELECT * FROM records WHERE (device = ?)",
				[device],
				function(err, result){
					if (err) {
						console.log("[SELECT ERROR] - ", err.message);
						callback(error());
					}

					let records = result.map((item) => {
								return {
											"ID" : item.ID,
											"device" : item.device,
											"source" : item.source,
											"dir" : item.dir,
											"time" : item.time,
											"value" : item.value
										}
								});
					
					callback(records);
		});
	},

	all(callback){
		ct.query("SELECT * FROM records",
				function(err, result){
					if (err) {
						console.log("[SELECT ERROR] - ", err.message);
						callback(error());
					}

					let records = result.map((item) => {
								return {
											"ID" : item.ID,
											"device" : item.device,
											"source" : item.source,
											"dir" : item.dir,
											"time" : item.time.toLocaleString(),
											"value" : item.value									
										}
								});

					callback(records);
				});
	}
}