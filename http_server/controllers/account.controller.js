const
	user_model = require('../models/user.model'),
	co = require('co');

module.exports = {

	accountValidate(req, res, next){

		user_model.validate(req.body.username, req.body.password, function(data){
			if (data.validate){
				req.session.username = data.name;
				req.session.authority = data.authority;
				res.redirect('/home/home');
			}else{
				res.redirect('/');
			}
		});
	},

	accountSettings(req, res, next){
		
		user_model.validate(req.session.username, req.body.old_password, function(data){
			if (data.validate){
				user_model.changepassword(req.session.username, req.body.new_password);
			}else{
				res.redirect('/');
			}
		});	
	},

	accountRegister(req, res, next){
		user_model.notexistname(req.body.username, function(data){
			if (data == true){
				user_model.register(req.body.username, req.body.password);
			}else{
				res.redirect('/');
			}
		});
	},

	accountLogout(req, res, next){
		res.redirect('/');
	}
};