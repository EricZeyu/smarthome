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

	exist(home){
		ct.query("SELECT * FROM homes WHERE home = ? limit 1",
								[home],
								function(err, result){
									if(err) {
										console.log("[SELECT ERROR] - ", err.message);
										return;
										}

										// console.log("-----SELECT ok-----");
										// console.log("SELECT : ", result);
										// console.log("----------------\n");

									if (result.length > 0) return true;
										else return false;
								});
	},

	all(){

		let mhome = [];
		ct.query("SELECT * FROM homes",
				function(err, result){
					if (err) {
						console.log("[SELECT ERROR] - ", err.message);
						return;
					}


						// mhome = result.map((item) => {
						// 					return {
						// 							"home" : item.home,
						// 							"location" : item.location,
						// 							"owner" : item.owner,
						// 							"mail" : item.mail,
						// 							"tel" : item.tel											
						// 							}
						// 					});
					
					

						mhome = [{"home":"Banhu","location":"Shao Xin","owner":"banhuer","mail":"banhu@shaoxin.com","tel":"99999999"},
						{"home":"Banhu","location":"Shao Xin","owner":"banhuer","mail":"banhu@shaoxin.com","tel":"99999999"}];
						console.log(mhome);

						return mhome;
				});		
	}
}