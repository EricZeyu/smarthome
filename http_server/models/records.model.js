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
	}
}