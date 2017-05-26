const
	user_model = require('../models/user.model'),
	co = require('co');

module.exports = {

	accountValidate(req, res, next){

		user_model.validate(req.body.username, req.body.password, function(data){
			if (data.validate) {
				req.session.username = data.name;
				req.session.authority = data.authority;
				res.redirect('/home/preview');
			}else{
				res.redirect('/');
			}
		});
	},

	accountSettings(req, res, next){
		console.log("settings");
	},

	accountRegister(req, res, next){
		;
	},

	accountLogout(req, res, next){
		res.redirect('/');
	}
};