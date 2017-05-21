let 	
	pool = require("../../my_sql");

module.exports = {

	add(name, password, home = 'null'){
		pool.getConnection((err, connection)=>{	
			if (err) console.log('Connected to MySql failed.');
			else {
				console.log('Connected to MySql succeed.');
			}
					ct.query("INSERT INTO users(name, password, home) VALUES(?, ?, ?)",
								[name, password, home],
								function(err, result){
									if(err) {
										console.log("[INSERT ERROR] - ", err.message);
										return;
										}

										// console.log("-----INSERT ok-----");
										// console.log("INSERT : ", result);
										// console.log("----------------\n");
								});
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

	update(name, newname, newpassword, newhome){
		ct.query("UPDATE users SET name = ?, password = ?, home = ? WHERE name = ?",
								[newname, newpassword, newhome, name],
								function(err, result){
									if(err) {
										console.log("[UPDATE ERROR] - ", err.message);
										return;
										}
								
			});
	},

	exist(name, password){
		ct.query("SELECT * FROM users WHERE (name = ? AND password = ?) limit 1",
								[name, password],
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
	}
}