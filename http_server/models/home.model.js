const
	ct = require('../../sql_server/my_sql');

module.exports = {

	add(home, location, owner, mail, tel){
		ct.query("INSERT INTO homes(home, location, owner, mail, tel) VALUES(?, ?, ?, ?, ?)",
								[home, location, owner, mail, tel],
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

	delete(home){
		ct.query("DELETE FROM homes WHERE home = ?",
								[home],
								function(err, result){
									if(err) {
										console.log("[DELETE ERROR] - ", err.message);
										return;
										}
								});
	},

	update(home, newhome, newlocation, newowner, newmail, newtel){
		ct.query("UPDATE homes SET home = ?, location = ?, owner = ?, mail = ?, tel = ? WHERE home = ?",
								[newhome, newlocation, newowner, newmail, newtel, name],
								function(err, result){
									if(err) {
										console.log("[UPDATE ERROR] - ", err.message);
										return;
										}
								
			});
	},

	exist(home, callback){
		ct.query("SELECT * FROM homes WHERE home = ? limit 1",
								[home],
								function(err, result){
									if(err) {
											console.log("[SELECT ERROR] - ", err.message);
											callback(error());
										}

									if (result.length > 0) return callback(ture);
										else return callback(false);
								});
	},

	all(callback){
		ct.query("SELECT * FROM homes",
				function(err, result){
					if (err) {
						console.log("[SELECT ERROR] - ", err.message);
						callback(error());
					}

					let homes = result.map((item) => {
								return {
											"home" : item.home,
											"location" : item.location,
											"owner" : item.owner,
											"mail" : item.mail,
											"tel" : item.tel											
										}
								});

					callback(homes);
				});
	}
}