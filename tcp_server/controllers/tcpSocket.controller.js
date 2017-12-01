const
	gateway_model = require('../../http_server/models/gateway.model'),
	user_model = require('../../http_server/models/user.model'),
	co = require('co'),
	Send = require('../models/Send.model');

const
	dingdeng_num = 5,
	bideng_num = 6,
	taideng_num = 7,
	chuanglian_num = 8,
	yijia_num = 9;

const
	Join_CLUSTERID  = 1,
	Num_CLUSTERID = 2,
	IEEEAddr_CLUSTERID  = 3,
	ShortAddr_CLUSTERID  = 4,
	Voltage_CLUSTERID = 5,
	WirelessQuality_CLUSTERID  = 6,
	Temperature_CLUSTERID = 7,
	Humidity_CLUSTERID = 8,
	Gas_CLUSTERID = 9,
	Pressure_CLUSTERID = 10,
	Lamp_CLUSTERID = 11,
	Motor_CLUSTERID = 12;

const
	dingdeng_kai_data = 1,
	dingdeng_guan_data = 0,
	biding_kai_data = 1,
	biding_guan_data = 0,
	taiding_kai_data = 1,
	taiding_guan_data = 0,
	chuanglian_sheng_data = 1,
	chuanglian_jiang_data = 0,
	yijia_sheng_data = 1,
	yijia_jiang_data = 0;

module.exports = {


	dingdeng_kai(req, res, next){
		if (req.session.authority == 'root') {
				res.json("dingdeng_kai");
		}else if (req.session.authority == 'owner'){
				gateway_model.mygateway(req.session.username, function(jizhan){
					Send.pushLastSend(jizhan[0].IP, dingdeng_num, Lamp_CLUSTERID, dingdeng_kai_data);
					res.json("dingdeng_kai");
				});
			}else{
				user_model.getCreator(req.session.username, function(data){
					gateway_model.mygateway(data, function(jizhan){
						Send.pushLastSend(jizhan[0].IP, dingdeng_num, Lamp_CLUSTERID, dingdeng_kai_data);
						// Send.pushLastSend(jizhan[0].IP, "dingdeng_kai");
						res.json("dingdeng_kai");
					});
				});
			}
	},

	dingdeng_guan(req, res, next){
		if (req.session.authority == 'root') {
				res.json("dingdeng_guan");
		}else if (req.session.authority == 'owner'){
				gateway_model.mygateway(req.session.username, function(jizhan){
					Send.pushLastSend(jizhan[0].IP, dingdeng_num, Lamp_CLUSTERID, dingdeng_guan_data);
					res.json("dingdeng_guan");
				});
			}else{
				user_model.getCreator(req.session.username, function(data){
					gateway_model.mygateway(data, function(jizhan){
						Send.pushLastSend(jizhan[0].IP, dingdeng_num, Lamp_CLUSTERID, dingdeng_guan_data);
						// Send.pushLastSend(jizhan[0].IP, "dingdeng_kai");
						res.json("dingdeng_guan");
					});
				});
			}
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