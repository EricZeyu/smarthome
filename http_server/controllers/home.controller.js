const
	gateway_model = require('../models/gateway.model'),
	user_model = require('../models/user.model'),
	co = require('co');

module.exports = {

	homeRender(req, res, next){
		res.render('home', {
								username : req.session.username,
								authority: req.session.authority,
								home : req.session.home
		});
	}

	// homeList(req, res, next){

	// 		if (req.session.authority == 'root'){
	// 			home_model.all(function(data){
	// 				// console.log(data);
	// 				res.json(data);
	// 			});
	// 		}else{
	// 				res.redirect('/');
	// 				// user_model.getCreator(req.session.username, function(data){
	// 				// 	home_model.getHomes(data, function(data){
	// 				// 		res.json(data);
	// 				// 	});
	// 				// });
	// 			}
	// }
};