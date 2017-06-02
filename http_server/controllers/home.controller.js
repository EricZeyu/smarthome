const
	home_model = require('../models/home.model'),
	gateway_model = require('../models/gateway.model'),
	co = require('co');

module.exports = {

	homePreview(req, res, next){
		res.render('homePreview', {
								username : req.session.username,
								authority: req.session.authority
		});
	},

	homeGuide(req, res, next){

		if (req.session.authority == 'owner') {
			
			home_model.add(req.body.home,
							req.body.location,
							req.session.username,
							req.body.mail,
							req.body.tel);

			gateway_model.add(req.body.MAC,
								req.body.IP,
								req.body.port,
								req.body.home);

		}

		res.redirect('/home/preview');
	},

	homeRecord(req, res, next){
		
	},

	homeList(req, res, next){

			if (req.session.authority == 'root') {
				home_model.all(function(data){
					// console.log(data);
					res.json(data);
				});
			}else {
				home_model.myHome(req.session.username, function(data){
					res.json(data);
				});
			}
	}
};