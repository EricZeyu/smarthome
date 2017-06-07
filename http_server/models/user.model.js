const 	
	ct = require('../../sql_server/my_sql');

module.exports = {

	register(name, password, authority = 'owner', creator = name){
		ct.query("INSERT INTO user(name, password, authority, creator) VALUES(?, ?, ?, ?)",
								[name, password, authority, creator],
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

	add(name, password, creator, authority = 'member'){
		ct.query("INSERT INTO user(name, password, authority, creator) VALUES(?, ?, ?, ?)",
								[name, password, authority, creator],
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
											"authority" : result[0].authority,
											"creator" : result[0].creator
										}
										callback(user);
									}else{
										let user = {
											"validate" : false,
											"name" : 'NULL',
											"authority" : 'NULL',
											"creator" : "NULL"
										}
										callback(user);
									}									
								});
	},

	getCreator(name, callback){
		ct.query("SELECT creator FROM user WHERE (name = ?) limit 1",
				[name],
				function(err, result){
					if (err) {
						console.log("[SELECT ERROR] - ", err.message);
						callback(error());
					}else{
						callback(result[0].creator);
					}
				});
	},

	members(name, callback){
		ct.query("SELECT a.* FROM user a, user b WHERE (a.creator = b.name AND b.name = ?)", [name], 
				function(err, result){
					if (err) {
						console.log("[SELECT ERROR] - ", err.message);
						callback(error());
					}else {
						let members = result.map((item) => {
								return {
											"name" : item.name,
											"authority" : item.authority,
											"creator" : item.creator,
											"online" : "null"
										}
								});

						callback(members);
					}
				});
	},

	usersAll(callback){
		ct.query("SELECT * FROM user",
				function(err, result){
					if (err) {
						console.log("[SELECT ERROR] - ", err.message);
						callback(error());
					}else {
						let users = result.map((item) => {
								return {
											"name" : item.name,
											"authority" : item.authority,
											"creator" : item.creator,
											"online" : "null"
										}
								});

						callback(users);
					}
				});
	}
}