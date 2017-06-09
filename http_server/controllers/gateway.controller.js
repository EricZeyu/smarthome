const
	gateway_model = require('../models/gateway.model'),
	co = require('co');

module.exports = {

	gatewayRender(req, res, next){
		res.render('gateway', {
								username : req.session.username,
								authority: req.session.authority
		});
	},

	gatewayEdit(req, res, next){
		if (req.session.authority !== 'member'){

			gateway_model.update(req.body.myMAC,
									req.body.newMAC,
									req.body.newIP,
									req.body.newport,
									req.body.newhome);
		}

		res.redirect('/home/gateway');		
	},	

	gatewayAdd(req, res, next){
		if (req.session.authority !== 'member'){

			gateway_model.add(req.body.MAC,
							req.body.IP,
							req.body.port,
							req.body.home);
		}

		res.redirect('/home/gateway');
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
				gateway_model.mygateway(req.session.username, function(data){
					res.json(data);
				});
			}else{
				;
			}
	}
};