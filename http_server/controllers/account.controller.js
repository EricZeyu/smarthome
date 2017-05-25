const
	user_model = require('../models/user.model'),
	co = require('co');

module.exports = {

	accountRender(req, res, next){
		res.render('account', {
								username : req.session.username,
								authority: req.session.authority
				});
	},

	accountValidate(req, res, next){

		user_model.validate(req.body.username, req.body.password, function(data){
			if (data.validate) {
				req.session.username = data.name;
				req.session.authority = data.authority;
				res.redirect('/account');
			}else{
				res.redirect('/');
			}
		});
	},

	accountRegister(req, res, next){
		;
	},

	accountSetting(req, res, next){
		;
	},

	accountLogout(req, res, next){
		res.redirect('/');
	}
};