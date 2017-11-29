const
	ct = require('../../sql_server/my_sql');

module.exports = {

	findRecordsTableName(IP, callback){
		ct.query("SELECT * FROM gateway WHERE (IP = ?) limit 1",
				[IP],
				function(err, result){
					if (err) {
						console.log("[SELECT ERROR] - ", err.message);
						callback(error());
					}

					let tablename = result.map((item) => {
								return item.creator
								});

					callback(tablename);
					
					
		});
	},

	changezhuangtai(IP, state){
		ct.query("UPDATE gateway SET state = ? WHERE (IP = ?)",
								[state],
								function(err, result){
									if(err) {
										console.log("[UPDATE ERROR] - ", err.message);
										return;
										}
								
			});
	}
}