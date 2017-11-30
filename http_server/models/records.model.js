const
	ct = require('../../sql_server/my_sql');

module.exports = {

	createTable(owner){
		let s = 'CREATE TABLE IF NOT EXISTS ' + owner + '_records('
				+ 'ID INT(10) UNSIGNED AUTO_INCREMENT NOT NULL,'
				+ 'device VARCHAR(45) NOT NULL,'
				+ 'type VARCHAR(45) NOT NULL,'
				+ 'source VARCHAR(45) NOT NULL,'
				+ 'dir VARCHAR(45) NOT NULL,'
				+ 'time TIMESTAMP,'
				+ 'value VARCHAR(45) NOT NULL,'
				+ 'PRIMARY KEY ( ' + 'ID' + ' )'
				+ ')ENGINE=InnoDB DEFAULT CHARSET=utf8;'

		ct.query(s, function(err, result){
			if(err) {
						console.log("[CREATETABLE ERROR] - ", err.message);
						return;
					}
		});
	},

	dropTable(owner){
		let s = 'DROP TABLE ' + owner + '_records';
		ct.query(s, function(err, result){
			if(err) {
						console.log("[CREATETABLE ERROR] - ", err.message);
						return;
					}
		});
	},

	add(tableOwner, device, type, source, dir, value){
		ct.query("INSERT INTO " + tableOwner + "_records(device, type, source, dir, value) VALUES(?, ?, ?, ?, ?)",
								[device, type, source, dir, value],
								function(err, result){
									if(err) {
										console.log("[INSERT ERROR] - ", err.message);
										return;
										}
								});
	},

	myDeviceRecords(tableOwner, callback){
		ct.query("SELECT * FROM " + tableOwner + '_records',
				function(err, result){
					if (err) {
						console.log("[SELECT ERROR] - ", err.message);
						callback(error());
					}

					let records = result.map((item) => {
								return {
											"ID" : item.ID,
											"device" : item.device,
											"type" : item.type,
											"source" : item.source,
											"dir" : item.dir,
											"time" : item.time.toLocaleString(),
											"value" : item.value
										}
								});
					
					callback(records);
		});
	},
/*
	getLatestRecord(tableOwner, devices, callback){
		let cup,temper;
		devices.map((item) => {

				switch (item.type){
					case "temper":{
						cup = ct.query("SELECT * FROM " + tableOwner + "_records WHERE (device=?) ORDER BY time DESC limit 1",
								[item.device],
								function(err, result){
									if (err) {
										console.log("[SELECT ERROR] - ", err.message);
										return;
									}
									return result;
								});
						// temper = cup[0].value;
						console.log("temper ==== ",cup);
						break;
					}
					default: break;
				}
		});

		let s = [{
			"wendu" : 23,
			"shidu" : "56%",
			"qiya" : "1.433",
			"kongqizhiliang" : "ok"
		}];

		console.log("ssssss ====",s);
		callback(s);
	}*/

	getLatestRecord(tableOwner, device, dir, callback){
		ct.query("SELECT * FROM " + tableOwner + "_records WHERE (device=? AND dir=?) ORDER BY time DESC limit 1",
				[device, dir],
				function(err, result){
					if (err) {
						console.log("[SELECT ERROR] - ", err.message);
						callback(error());
					}

					// // console.log("Search result ====",result);
					// let onerecord = result.map((item) => {
					// 			return {
					// 						"ID" : item.ID,
					// 						"device" : item.device,
					// 						"type" : item.type,
					// 						"source" : item.source,
					// 						"dir" : item.dir,
					// 						"time" : item.time.toLocaleString(),
					// 						"value" : item.value
					// 					}
					// 			});

					// console.log("LastestRecord = ", result);
					
					callback(result);
				});
	}
}