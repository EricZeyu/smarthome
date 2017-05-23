const
	user_model = require('../models/user.model'),
	co = require('co');

module.exports = {

	// accountRender(req, res, next){
	// 	res.render('account', {username:req.body.username});
	// },

	accountValidate(req, res, next){

		if (req.body.username == 'root'
			&& req.body.password == '123456'){
						res.render('account', {username:'root'});
		}else if (req.body.username == "test" 
					&& req.body.password == "111111") {
  								res.render('account', {username:req.body.username});
  				}else{
						res.redirect('/');
					}
	},

	accountNew(req, res, next){
		;
	},

	accountLogout(req, res, next){
		res.redirect('/');
	}
};