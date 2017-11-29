const
	gateway_model = require('../models/gateway.model'),
	device_model = require('../models/device.model'),
	user_model = require('../models/user.model'),
	record_model = require('../models/records.model'),
	co = require('co');

module.exports = {

	homeRender(req, res, next){

		res.render('home', {
								username : req.session.username,
								authority: req.session.authority,
								home : req.session.home,
		});
		// var jizhan;
		// if (req.session.authority == 'owner'){
		// 		gateway_model.mygateway(req.session.username, function(data){
		// 			jizhan = data;
		// 			console.log(data);
		// 					console.log(jizhan);

		// res.render('home', {
		// 						username : req.session.username,
		// 						authority: req.session.authority,
		// 						home : req.session.home,
		// 						zhuangtai : jizhan[0].state,
		// 						IP : jizhan[0].IP,
		// 						port : jizhan[0].port,
		// 						MAC : jizhan[0].MAC
		// });
		// 		});
		// 	}else{
		// 		user_model.getCreator(req.session.username, function(data){
		// 			gateway_model.mygateway(data, function(data){
		// 				jizhan = data;console.log(data);
		// 						console.log(jizhan);

		// res.render('home', {
		// 						username : req.session.username,
		// 						authority: req.session.authority,
		// 						home : req.session.home,
		// 						zhuangtai : jizhan.state,
		// 						IP : jizhan.IP,
		// 						port : jizhan.port,
		// 						MAC : jizhan.MAC
		// });
		// 			});
		// 		});
		// 	}
	},

	homeStatus(req, res, next){

		console.log("homeStatus call");

		let jizhan, myhome;

		if (req.session.authority == 'root') {
				res.json();
		}else if (req.session.authority == 'owner'){
				gateway_model.mygateway(req.session.username, function(data){
					jizhan = data[0];

					device_model.myDevices(req.session.username, function(data){
						// temp = data;
							// console.log(data);
							
							let devices = data.map((item)=>{
							return {
										"device" : item.device,
										"type" : item.type
									}
							});

							devices.map((item) => {
								switch (item.type)
								{
									case "temper":{
										break;
									}
									case "hygrometer":break;
									case "particulator":break;
									case "baroceptor":break;
									default:break;
								}
							});

						});
					let myhome = {
								"state" : jizhan.state,
								"IP" : jizhan.IP,
								"port" : jizhan.port,
								"wendu" : "24C",
								"shidu" : "56%",
								"qiya" : "1.43kpa",
								"kongqizhiliang" : "good"
					};

					console.log(myhome);

					res.json(myhome);
				});
			}else{
				user_model.getCreator(req.session.username, function(data){
					gateway_model.mygateway(data, function(data){
						jizhan = data[0];
					});
				});
			}



		// let temp,Status;

		// if (req.session.authority == 'root'){
		// 	device_model.all(function(data){
		// 		res.json(data);
		// 		// temp = data;
		// 	});
		// }else if (req.session.authority == 'owner'){
		// 			device_model.myDevices(req.session.username, function(data){
		// 				// temp = data;
		// 		res.json(data);

		// 		});
		// 	}else{
		// 		user_model.getCreator(req.session.username, function(data){
		// 			device_model.myDevices(data, function(data){
		// 				// temp = data;
		// 		res.json(data);
						
		// 			});
		// 		});
		// 	}

		// Status = temp.map((item)=>{
		// 					return {
		// 								"device" : item.device,
		// 								"type" : item.type,
		// 								"nickname" : item.nickname,
		// 								"signal" : 13,
		// 								"value" : 14								
		// 							}
		// });

		// res.json(Status);
	},

	homeIndex(req, res, next){
		// console.log(req.params.index);
		res.render(req.params.index, {
								username : req.session.username,
								authority: req.session.authority,
								home : req.session.home
		});
	}
};