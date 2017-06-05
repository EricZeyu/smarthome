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

	gatewayList(req, res, next){

		if (req.session.authority == 'root') {
				gateway_model.all(function(data){
				// console.log(data);
				res.json(data);
			});
		}else {
				gateway_model.mygateway(req.session.username, function(data){
					res.json(data);
				});
		}
	}
};