const
	gateway_model = require('../../http_server/models/gateway.model'),
	user_model = require('../../http_server/models/user.model'),
	co = require('co'),
	Send = require('../models/Send.model'),
	tcpRecords_model = require('../models/tcpRecords.model'),
	tcpgateway_model = require('../models/tcpgateway.model');

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
	bideng_kai_data = 1,
	bideng_guan_data = 0,
	taideng_kai_data = 1,
	taideng_guan_data = 0,
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
					tcpRecords_model.pushDeviceRecords(req.session.username, dingdeng_num, "Lamp", req.session.username, "down", "dingdeng_kai");
					res.json("dingdeng_kai");
				});
			}else{
				user_model.getCreator(req.session.username, function(data){
					gateway_model.mygateway(data, function(jizhan){
						Send.pushLastSend(jizhan[0].IP, dingdeng_num, Lamp_CLUSTERID, dingdeng_kai_data);
						// Send.pushLastSend(jizhan[0].IP, "dingdeng_kai");
						tcpRecords_model.pushDeviceRecords(data, dingdeng_num, "Lamp", data, "down", "dingdeng_kai");
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
					tcpRecords_model.pushDeviceRecords(req.session.username, dingdeng_num, "Lamp", req.session.username, "down", "dingdeng_guan");
					res.json("dingdeng_guan");
				});
			}else{
				user_model.getCreator(req.session.username, function(data){
					gateway_model.mygateway(data, function(jizhan){
						Send.pushLastSend(jizhan[0].IP, dingdeng_num, Lamp_CLUSTERID, dingdeng_guan_data);
						// Send.pushLastSend(jizhan[0].IP, "dingdeng_kai");
						tcpRecords_model.pushDeviceRecords(data, dingdeng_num, "Lamp", data, "down", "dingdeng_guan");
						res.json("dingdeng_guan");
					});
				});
			}
	},

	bideng_kai(req, res, next){
		if (req.session.authority == 'root') {
				res.json("bideng_kai");
		}else if (req.session.authority == 'owner'){
				gateway_model.mygateway(req.session.username, function(jizhan){
					Send.pushLastSend(jizhan[0].IP, bideng_num, Lamp_CLUSTERID, bideng_kai_data);
					tcpRecords_model.pushDeviceRecords(req.session.username, bideng_num, "Lamp", req.session.username, "down", "bideng_kai");
					res.json("bideng_kai");
				});
			}else{
				user_model.getCreator(req.session.username, function(data){
					gateway_model.mygateway(data, function(jizhan){
						Send.pushLastSend(jizhan[0].IP, bideng_num, Lamp_CLUSTERID, bideng_kai_data);
						// Send.pushLastSend(jizhan[0].IP, "dingdeng_kai");
						tcpRecords_model.pushDeviceRecords(data, bideng_num, "Lamp", data, "down", "bideng_kai");	
						res.json("bideng_kai");
					});
				});
			}
	},

	bideng_guan(req, res, next){
		if (req.session.authority == 'root') {
				res.json("bideng_guan");
		}else if (req.session.authority == 'owner'){
				gateway_model.mygateway(req.session.username, function(jizhan){
					Send.pushLastSend(jizhan[0].IP, bideng_num, Lamp_CLUSTERID, bideng_guan_data);
					tcpRecords_model.pushDeviceRecords(req.session.username, bideng_num, "Lamp", req.session.username, "down", "bideng_guan");
					res.json("bideng_guan");
				});
			}else{
				user_model.getCreator(req.session.username, function(data){
					gateway_model.mygateway(data, function(jizhan){
						Send.pushLastSend(jizhan[0].IP, bideng_num, Lamp_CLUSTERID, bideng_guan_data);
						tcpRecords_model.pushDeviceRecords(data, bideng_num, "Lamp", data, "down", "bideng_guan");	
						// Send.pushLastSend(jizhan[0].IP, "dingdeng_kai");
						res.json("bideng_guan");
					});
				});
			}
	},

	taideng_kai(req, res, next){
		if (req.session.authority == 'root') {
				res.json("taideng_kai");
		}else if (req.session.authority == 'owner'){
				gateway_model.mygateway(req.session.username, function(jizhan){
					Send.pushLastSend(jizhan[0].IP, taideng_num, Lamp_CLUSTERID, taideng_kai_data);
					tcpRecords_model.pushDeviceRecords(req.session.username, taideng_num, "Lamp", req.session.username, "down", "taideng_kai");
					res.json("taideng_kai");
				});
			}else{
				user_model.getCreator(req.session.username, function(data){
					gateway_model.mygateway(data, function(jizhan){
						Send.pushLastSend(jizhan[0].IP, taideng_num, Lamp_CLUSTERID, taideng_kai_data);
						// Send.pushLastSend(jizhan[0].IP, "dingdeng_kai");
						tcpRecords_model.pushDeviceRecords(data, taideng_num, "Lamp", data, "down", "taideng_kai");	
						res.json("taideng_kai");
					});
				});
			}
	},

	taideng_guan(req, res, next){
		if (req.session.authority == 'root') {
				res.json("taideng_guan");
		}else if (req.session.authority == 'owner'){
				gateway_model.mygateway(req.session.username, function(jizhan){
					Send.pushLastSend(jizhan[0].IP, taideng_num, Lamp_CLUSTERID, taideng_guan_data);
					tcpRecords_model.pushDeviceRecords(req.session.username, taideng_num, "Lamp", req.session.username, "down", "taideng_guan");
					res.json("taideng_guan");
				});
			}else{
				user_model.getCreator(req.session.username, function(data){
					gateway_model.mygateway(data, function(jizhan){
						Send.pushLastSend(jizhan[0].IP, taideng_num, Lamp_CLUSTERID, taideng_guan_data);
						// Send.pushLastSend(jizhan[0].IP, "dingdeng_kai");
						tcpRecords_model.pushDeviceRecords(data, taideng_num, "Lamp", data, "down", "taideng_guan");	
						res.json("taideng_guan");
					});
				});
			}
	},

	chuanglian_sheng(req, res, next){
		if (req.session.authority == 'root') {
				res.json("chuanglian_sheng");
		}else if (req.session.authority == 'owner'){
				gateway_model.mygateway(req.session.username, function(jizhan){
					Send.pushLastSend(jizhan[0].IP, chuanglian_num, Motor_CLUSTERID, chuanglian_sheng_data);
					tcpRecords_model.pushDeviceRecords(req.session.username, chuanglian_num, "Motor", req.session.username, "down", "chuanglian_sheng");
					res.json("chuanglian_sheng");
				});
			}else{
				user_model.getCreator(req.session.username, function(data){
					gateway_model.mygateway(data, function(jizhan){
						Send.pushLastSend(jizhan[0].IP, chuanglian_num, Motor_CLUSTERID, chuanglian_sheng_data);
						// Send.pushLastSend(jizhan[0].IP, "dingdeng_kai");
						tcpRecords_model.pushDeviceRecords(data, chuanglian_num, "Motor", data, "down", "chuanglian_sheng");	
						res.json("chuanglian_sheng");
					});
				});
			}
	},

	chuanglian_jiang(req, res, next){
		if (req.session.authority == 'root') {
				res.json("chuanglian_jiang");
		}else if (req.session.authority == 'owner'){
				gateway_model.mygateway(req.session.username, function(jizhan){
					Send.pushLastSend(jizhan[0].IP, chuanglian_num, Motor_CLUSTERID, chuanglian_jiang_data);
					tcpRecords_model.pushDeviceRecords(req.session.username, chuanglian_num, "Motor", req.session.username, "down", "chuanglian_jiang");
					res.json("chuanglian_jiang");
				});
			}else{
				user_model.getCreator(req.session.username, function(data){
					gateway_model.mygateway(data, function(jizhan){
						Send.pushLastSend(jizhan[0].IP, chuanglian_num, Motor_CLUSTERID, chuanglian_jiang_data);
						// Send.pushLastSend(jizhan[0].IP, "dingdeng_kai");
						tcpRecords_model.pushDeviceRecords(data, chuanglian_num, "Motor", data, "down", "chuanglian_jiang");	
						res.json("chuanglian_jiang");
					});
				});
			}
	},

	yijia_sheng(req, res, next){
		if (req.session.authority == 'root') {
				res.json("yijia_sheng");
		}else if (req.session.authority == 'owner'){
				gateway_model.mygateway(req.session.username, function(jizhan){
					Send.pushLastSend(jizhan[0].IP, yijia_num, Motor_CLUSTERID, yijia_sheng_data);
					tcpRecords_model.pushDeviceRecords(req.session.username, yijia_num, "Motor", req.session.username, "down", "yijia_sheng");
					res.json("yijia_sheng");
				});
			}else{
				user_model.getCreator(req.session.username, function(data){
					gateway_model.mygateway(data, function(jizhan){
						Send.pushLastSend(jizhan[0].IP, yijia_num, Motor_CLUSTERID, yijia_sheng_data);
						// Send.pushLastSend(jizhan[0].IP, "dingdeng_kai");
						tcpRecords_model.pushDeviceRecords(data, yijia_num, "Motor", data, "down", "yijia_sheng");	
						res.json("yijia_sheng");
					});
				});
			}
	},

	yijia_jiang(req, res, next){
		if (req.session.authority == 'root') {
				res.json("yijia_jiang");
		}else if (req.session.authority == 'owner'){
				gateway_model.mygateway(req.session.username, function(jizhan){
					Send.pushLastSend(jizhan[0].IP, yijia_num, Motor_CLUSTERID, yijia_jiang_data);
					tcpRecords_model.pushDeviceRecords(req.session.username, yijia_num, "Motor", req.session.username, "down", "yijia_jiang");
					res.json("yijia_jiang");
				});
			}else{
				user_model.getCreator(req.session.username, function(data){
					gateway_model.mygateway(data, function(jizhan){
						Send.pushLastSend(jizhan[0].IP, yijia_num, Motor_CLUSTERID, yijia_jiang_data);
						// Send.pushLastSend(jizhan[0].IP, "dingdeng_kai");
						tcpRecords_model.pushDeviceRecords(data, yijia_num, "Motor", data, "down", "yijia_jiang");	
						res.json("yijia_jiang");
					});
				});
			}
	}
};