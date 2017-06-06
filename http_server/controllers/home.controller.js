const
	home_model = require('../models/home.model'),
	gateway_model = require('../models/gateway.model'),
	co = require('co');

module.exports = {

	homeRender(req, res, next){
		res.render('home', {
								username : req.session.username,
								authority: req.session.authority
		});
	},

	// homeGuide(req, res, next){

	// 	if (req.session.authority == 'owner') {
			
	// 		home_model.add(req.body.home,
	// 						req.body.location,
	// 						req.session.username,
	// 						req.body.mail,
	// 						req.body.tel);

	// 		gateway_model.add(req.body.MAC,
	// 							req.body.IP,
	// 							req.body.port,
	// 							req.body.home);

	// 	}

	// 	res.redirect('/home/home');
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

			home_model.delete(req.body.home);
		}
	},

	homeRecord(req, res, next){
		// res.render('table');
	},

	homeList(req, res, next){

			if (req.session.authority == 'root') {
				home_model.all(function(data){
					// console.log(data);
					res.json(data);
				});
			}else if (req.session.authority == 'owner'){
				home_model.ownerHome(req.session.username, function(data){
									res.json(data);
								});
			}
			else {
				home_model.memberHome(req.session.username, function(data){
					res.json(data);
				});
			}
	}
};