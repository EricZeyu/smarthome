const
	ct = require('../../sql_server/my_sql');

module.exports = {

	add(home, location, contact, mail, tel){
		ct.query("INSERT INTO home(home, location, contact, mail, tel) VALUES(?, ?, ?, ?, ?)",
								[home, location, contact, mail, tel],
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
		ct.query("DELETE FROM home WHERE home = ?",
								[home],
								function(err, result){
									if(err) {
										console.log("[DELETE ERROR] - ", err.message);
										return;
										}
								});
	},

	update(home, newhome, newlocation, newcontact, newmail, newtel){
		ct.query("UPDATE home SET home = ?, location = ?, contact = ?, mail = ?, tel = ? WHERE home = ?",
								[newhome, newlocation, newcontact, newmail, newtel, home],
								function(err, result){
									if(err) {
										console.log("[UPDATE ERROR] - ", err.message);
										return;
										}
								
			});
	},

	exist(home, callback){
		ct.query("SELECT * FROM home WHERE home = ? limit 1",
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

	ownerHome(name, callback){
		ct.query("SELECT a.* FROM home a, user b WHERE (a.contact = b.creator AND b.name = ?)", 
				[name],
				function(err, result){
					if (err) {
						console.log("[SELECT ERROR] - ", err.message);
						callback(error());
					}

					let homes = result.map((item) => {
								return {
											"home" : item.home,
											"location" : item.location,
											"contact" : item.contact,
											"mail" : item.mail,
											"tel" : item.tel											
										}
								});

					callback(homes);
		});
	},

	all(callback){
		ct.query("SELECT * FROM home",
				function(err, result){
					if (err) {
						console.log("[SELECT ERROR] - ", err.message);
						callback(error());
					}

					let homes = result.map((item) => {
								return {
											"home" : item.home,
											"location" : item.location,
											"contact" : item.contact,
											"mail" : item.mail,
											"tel" : item.tel											
										}
								});

					callback(homes);
				});
	}
}