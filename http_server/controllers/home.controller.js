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
			}else {
						home_model.groupHome(req.session.username, function(data){
							res.json(data);
						});
				}
	}
};