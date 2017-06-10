const
	user_model = require('../models/user.model'),
	gateway_model = require('../models/gateway.model'),
	co = require('co');

module.exports = {

	gatewayRender(req, res, next){
		res.render('gateway', {
								username : req.session.username,
								authority: req.session.authority,
								home : req.session.home
		});
	},

	gatewayEdit(req, res, next){
		if (req.session.authority !== 'member'){

			gateway_model.update(req.body.myMAC,
									req.body.newMAC,
									req.body.newIP,
									req.body.newport);
		}

		res.redirect('/gateway');
	},	

	gatewayAdd(req, res, next){
		if (req.session.authority !== 'member'){

			gateway_model.add(req.body.MAC,
							req.body.IP,
							req.body.port,
							req.session.username);
		}

		res.redirect('/gateway');
	},

	gatewayRemove(req, res, next){
		if (req.session.authority !== 'member'){

			gateway_model.delete(req.body.MAC);
		}
	},

	gatewayList(req, res, next){

		if (req.session.authority == 'root') {
				gateway_model.all(function(data){
				// console.log(data);
				res.json(data);
			});
		}else if (req.session.authority == 'owner'){
				user_model.mygateway(req.session.username, function(data){
					res.json(data);
				});
			}else{
				user_model.getCreator(req.session.username, function(data){
					gateway_model.mygateway(data, function(data){
						res.json(data);
					});
				});
			}
	}
};