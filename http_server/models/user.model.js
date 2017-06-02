const 	
	ct = require('../../sql_server/my_sql');

module.exports = {

	register(name, password, authority = 'owner', home = 'NULL'){
		ct.query("INSERT INTO user(name, password, authority, home) VALUES(?, ?, ?, ?)",
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
		ct.query("INSERT INTO user(name, password, authority, home) VALUES(?, ?, ?, ?)",
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
		ct.query("DELETE FROM user WHERE name = ?",
								[name],
								function(err, result){
									if(err) {
										console.log("[DELETE ERROR] - ", err.message);
										return;
										}
								});
	},

	changepassword(name, newpassword){
		ct.query("UPDATE user SET password = ? WHERE name = ?",
								[newpassword, name],
								function(err, result){
									if(err) {
										console.log("[UPDATE ERROR] - ", err.message);
										return;
										}
								
			});
	},

	changehome(name, newhome){
		ct.query("UPDATE user SET home = ? WHERE name = ?",
								[newhome, name],
								function(err, result){
									if(err) {
										console.log("[UPDATE ERROR] - ", err.message);
										return;
										}
								
			});
	},

	notexistname(name, callback){
		ct.query("SELECT name FROM user WHERE (name = ?) limit 1",
				[name],
				function(err, result){
					if (err) {
						console.log("[SELECT ERROR] - ", err.message);
						callback(error());
					}

					if (result.length > 0){
						callback(false);
					}else{
						callback(true);
					}
				});
	},

	validate(name, password, callback){
		ct.query("SELECT * FROM user WHERE (name = ? AND password = ?) limit 1",
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
	},

	members(name, callback){
		ct.query("SELECT a.name, a.authority FROM user a, user b WHERE (a.home = b.home AND b.name = ?)", [name], 
				function(err, result){
					if (err) {
						console.log("[SELECT ERROR] - ", err.message);
						callback(error());
					}else {
						let members = result.map((item) => {
								return {
											"name" : item.name,
											"authority" : item.authority,
											"online" : "null"										
										}
								});

						callback(members);
					}
				});
	},

	testall(){
		ct.query("SELECT * FROM user",
								function(err, result){
									if(err) {
											console.log("[SELECT ERROR] - ", err.message);
											callback(error());
										}

										// console.log("-----SELECT ok-----");
										// console.log("SELECT : ", result);
										// console.log("----------------\n");
									
									console.log(result);
		});
	}
}