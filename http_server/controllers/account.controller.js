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
		// if (req.body.username == 'root'
		// 	&& req.body.password == '123456'){
		// 				res.render('account', {username:'root'});
		// }else if (req.body.username == "test" 
		// 			&& req.body.password == "111111") {
  // 								res.render('account', {username:req.body.username});
  // 				}else{
		// 				res.redirect('/');
		// 			}
	},

	accountRegister(req, res, next){
		;
	},

	accountModify(req, res, next){
		;
	},

	accountLogout(req, res, next){
		res.redirect('/');
	}
};