const
	gateway_model = require('../../http_server/models/gateway.model'),
	user_model = require('../../http_server/models/user.model'),
	co = require('co'),
	Send = require('../models/Send.model');

module.exports = {


	dingdeng_kai(req, res, next){

		if (req.session.authority == 'root') {
				res.json();
		}else if (req.session.authority == 'owner'){
				gateway_model.mygateway(req.session.username, function(jizhan){
					Send.pushLastSend(jizhan[0].IP, "dingdeng_kai");
					res.json("dingdeng_kai");
				});
			}else{
				user_model.getCreator(req.session.username, function(data){
					gateway_model.mygateway(data, function(jizhan){
						Send.pushLastSend(jizhan[0].IP, "dingdeng_kai");
						res.json("dingdeng_kai");
					});
				});
			}
	},

	dingdeng_guan(req, res, next){
		res.json("dingdeng_guan");

	},
	biding_kai(req, res, next){
		res.json("biding_kai");

	},
	biding_guan(req, res, next){
		res.json("biding_guan");

	},
	taiding_kai(req, res, next){
		res.json("taiding_kai");

	},
	taiding_guan(req, res, next){
		res.json("taiding_guan");

	},

	chuanglian_sheng(req, res, next){
		res.json("chuanglian_sheng");

	},
	chuanglian_jiang(req, res, next){
		res.json("chuanglian_jiang");

	},
	yijia_sheng(req, res, next){
		res.json("yijia_sheng");

	},
	yijia_jiang(req, res, next){
		res.json("yijia_jiang");

	}
};