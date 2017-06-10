const
	user_model = require('../models/user.model'),
	co = require('co');

module.exports = {

	accountValidate(req, res, next){

		user_model.validate(req.body.username, req.body.password, function(data){
			if (data.validate){
				req.session.username = data.name;
				req.session.authority = data.authority;
				if (req.session.authority == 'member'){
					user_model.getHome(req.session.username, function(data){
						req.session.home = data;
					});
				}else{
					req.session.home = data.home;
				}
				res.redirect('/home');
			}else{
				res.redirect('/');
			}
		});
	},

	accountSettings(req, res, next){
		
		user_model.validate(req.session.username, req.body.old_password, function(data){
			if (data.validate){
				user_model.changepassword(req.session.username, req.body.new_password);
				res.redirect('/');
			}else{
					res.render('error', {
		  			title: "Error Page",
		  			message: "Password error",
		  			error: "error"
	  			});
			}
		});	
	},

	accountRegister(req, res, next){
		console.log("accountRegister call");
		console.log(req.body);

		user_model.notexistname(req.body.username, function(data){
			if (data == true){
				console.log(req.body);
				user_model.register(req.body.username, req.body.password, req.body.home);
				res.redirect('/');
			}else{
				res.redirect('/');
			}
		});
	},

	accountLogout(req, res, next){
		res.redirect('/');
	}
};