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

	homejizhan(req, res, next){

		// console.log("homejizhan call");

		let jizhan;

		if (req.session.authority == 'root') {
				res.json();
		}else if (req.session.authority == 'owner'){
				gateway_model.mygateway(req.session.username, function(data){
					jizhan = data[0];
				});
			}else{
				user_model.getCreator(req.session.username, function(data){
					gateway_model.mygateway(data, function(data){
						jizhan = data[0];
					});
				});
			}
	},

	homewendu(req, res, next){
		// console.log("homewendu call");
		if (req.session.authority == 'root') {
				res.json();
		}else if (req.session.authority == 'owner'){
					device_model.onedevice(req.session.username, "temper", function(dev){
						record_model.getLatestRecord(req.session.username, dev[0].device, "up", function(record){
								res.json(record[0]);
						});
					});
			}else{
				user_model.getCreator(req.session.username, function(ownername){
					device_model.onedevice(ownername, "temper", function(dev){
						record_model.getLatestRecord(ownername, dev[0].device, "up", function(record){
								res.json(record[0]);
						});
					});
				});
			}
	},

	homeshidu(req, res, next){
		// console.log("homeshidu call");
		if (req.session.authority == 'root') {
				res.json();
		}else if (req.session.authority == 'owner'){
					device_model.onedevice(req.session.username, "hygrometer", function(dev){
						record_model.getLatestRecord(req.session.username, dev[0].device, "up", function(record){
								res.json(record[0]);
						});
					});
			}else{
				user_model.getCreator(req.session.username, function(ownername){
					device_model.onedevice(ownername, "hygrometer", function(dev){
						record_model.getLatestRecord(ownername, dev[0].device, "up", function(record){
								res.json(record[0]);
						});
					});
				});
			}
	},

	homekongqizhiliang(req, res, next){
		// console.log("homekongqizhiliang call");
		if (req.session.authority == 'root') {
				res.json();
		}else if (req.session.authority == 'owner'){
					device_model.onedevice(req.session.username, "particulator", function(dev){
						record_model.getLatestRecord(req.session.username, dev[0].device, "up", function(record){
								res.json(record[0]);
						});
					});
			}else{
				user_model.getCreator(req.session.username, function(ownername){
					device_model.onedevice(ownername, "particulator", function(dev){
						record_model.getLatestRecord(ownername, dev[0].device, "up", function(record){
								res.json(record[0]);
						});
					});
				});
			}
	},

	homeqiya(req, res, next){
		// console.log("homeqiya call");
		if (req.session.authority == 'root') {
				res.json();
		}else if (req.session.authority == 'owner'){
					device_model.onedevice(req.session.username, "baroceptor", function(dev){
						record_model.getLatestRecord(req.session.username, dev[0].device, "up", function(record){
								res.json(record[0]);
						});
					});
			}else{
				user_model.getCreator(req.session.username, function(ownername){
					device_model.onedevice(ownername, "baroceptor", function(dev){
						record_model.getLatestRecord(ownername, dev[0].device, "up", function(record){
								res.json(record[0]);
						});
					});
				});
			}
	},

	homeStatus(req, res, next){

		console.log("homeStatus call");

		let jizhan, myhome, wendu, shidu, kongqizhiliang, qiya;

		if (req.session.authority == 'root') {
				res.json();
		}else if (req.session.authority == 'owner'){
				gateway_model.mygateway(req.session.username, function(data){
					jizhan = data[0];

					device_model.myDevices(req.session.username, function(data){
							
							// record_model.getLatestRecord(req.session.username, data, function(lr){

							// 	// console.log("lr ===",lr[0]);
							// 	myhome = {
							// 				"state" : jizhan.state,
							// 				"IP" : jizhan.IP,
							// 				"port" : jizhan.port,
							// 				"wendu" : lr[0].wendu,
							// 				"shidu" : lr[0].shidu,
							// 				"qiya" : lr[0].qiya,
							// 				"kongqizhiliang" : lr[0].kongqizhiliang
							// 	};
							// 	console.log("myhome Status === ",myhome);

							// 	res.json(myhome);
							// });

							data.map((item)=>{
							switch (item.type)
								{
									case "temper":{
										record_model.getLatestRecord(req.session.username, item.device, "up", function(data){
											if (data.length>0){
												wendu = data[0].value;
												console.log("wendu ++++++++++", wendu);
											}
											datalen--;
										});
										break;
									}
									case "hygrometer":{
										record_model.getLatestRecord(req.session.username, item.device, "up", function(data){
											if (data.length>0){
												shidu = data[0].value;
											}
											datalen--;
										});
										break;
									}
									case "particulator":{
										record_model.getLatestRecord(req.session.username, item.device, "up", function(data){
											if (data.length>0){
												kongqizhiliang = data[0].value;
											}
											datalen--;
										});
										break;
									}
									case "baroceptor":{
										record_model.getLatestRecord(req.session.username, item.device, "up", function(data){
											if (data.length>0){
												qiya = data[0].value;
											}
											datalen--;
										});
										break;
									}
									default: datalen--; break;
								}

							});


							myhome = [{
											"state" : jizhan.state,
											"IP" : jizhan.IP,
											"port" : jizhan.port,
											"wendu" : wendu,
											"shidu" : shidu,
											"qiya" : qiya,
											"kongqizhiliang" : kongqizhiliang
								}];
							console.log("myhome Status === ",myhome);

							res.json(myhome);
						});
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