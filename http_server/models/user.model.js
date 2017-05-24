const 	
	ct = require('../../sql_server/my_sql');

module.exports = {

	register(name, password, authority = 'owner', home = 'NULL'){
		ct.query("INSERT INTO users(name, password, authority, home) VALUES(?, ?, ?, ?)",
								[name, password, authority, home],
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

	add(name, password, authority = 'member', home = 'NULL'){
		ct.query("INSERT INTO users(name, password, authority, home) VALUES(?, ?, ?, ?)",
								[name, password, authority, home],
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

	delete(name){
		ct.query("DELETE FROM users WHERE name = ?",
								[name],
								function(err, result){
									if(err) {
										console.log("[DELETE ERROR] - ", err.message);
										return;
										}
								});
	},

	modify(name, newpassword, newauthority, newhome){
		ct.query("UPDATE users SET password = ?, authority = ?, home = ? WHERE name = ?",
								[newpassword, newauthority, newhome, name],
								function(err, result){
									if(err) {
										console.log("[UPDATE ERROR] - ", err.message);
										return;
										}
								
			});
	},

	validate(name, password, callback){
		ct.query("SELECT * FROM users WHERE (name = ? AND password = ?) limit 1",
								[name, password],
								function(err, result){
									if(err) {
											console.log("[SELECT ERROR] - ", err.message);
											callback(error());
										}

										// console.log("-----SELECT ok-----");
										// console.log("SELECT : ", result);
										// console.log("----------------\n");
									
									if (result.length > 0) {
										let user = {
											"validate" : true,
											"name" : result[0].name,
											"authority" : result[0].authority
										}
										callback(user);
									}else{
										let user = {
											"validate" : false,
											"name" : 'NULL',
											"authority" : 'NULL'
										}
										callback(user);
									}									
								});
	}
}