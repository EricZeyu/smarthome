const
	home_model = require('../models/home.model'),
	gateway_model = require('../models/gateway.model'),
	user_model = require('../models/user.model'),
	co = require('co');

module.exports = {

	homeRender(req, res, next){
		res.render('home', {
								username : req.session.username,
								authority: req.session.authority
		});
	},

	// homeDevice(req, res, next){

	// 	console.log("homeDevice controller");
	// 	console.log(req.session.home);

	// 	// res.render('device', {
	// 	// 						username : req.session.username,
	// 	// 						authority: req.session.authority,
	// 	// 						home     : req.body.home
	// 	// });
	// },

	homeAdd(req, res, next){
		if (req.session.authority == 'owner'){

			home_model.add(req.body.home,
							req.body.location,
							req.body.contact,
							req.body.mail,
							req.body.tel);
		}

		res.redirect('/home/home');
	},

	homeRemove(req, res, next){
		if (req.session.authority == 'owner'){

			// home_model.delete(req.body.home);
		}

		res.redirect('/');
	},

	homeList(req, res, next){

			if (req.session.authority == 'root'){
				home_model.all(function(data){
					// console.log(data);
					res.json(data);
				});
			}else{
					user_model.getCreator(req.session.username, function(data){
						home_model.getHomes(data, function(data){
							res.json(data);
						});
					});
				}
	}
};