const
	ct = require('../../sql_server/my_sql');

module.exports = {
	pushDeviceRecords(tableOwner, device, type, source, dir, value){
		ct.query("INSERT INTO " + tableOwner + "_records(device, type, source, dir, value) VALUES(?, ?, ?, ?, ?)",
								[device, type, source, dir, value],
								function(err, result){
									if(err) {
										console.log("[INSERT ERROR] - ", err.message);
										return;
										}
								});
	},
}