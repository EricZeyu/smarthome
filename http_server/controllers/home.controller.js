const
	gateway_model = require('../models/gateway.model'),
	device_model = require('../models/device.model'),
	user_model = require('../models/user.model'),
	co = require('co');

module.exports = {

	homeRender(req, res, next){
		res.render('home', {
								username : req.session.username,
								authority: req.session.authority,
								home : req.session.home
		});
	},

	homeStatus(req, res, next){

		console.log("homeStatus call");

		let temp,Status;

		if (req.session.authority == 'root'){
			device_model.all(function(data){
				res.json(data);
				// temp = data;
			});
		}else if (req.session.authority == 'owner'){
					device_model.myDevices(req.session.username, function(data){
						// temp = data;
				res.json(data);

				});
			}else{
				user_model.getCreator(req.session.username, function(data){
					device_model.myDevices(data, function(data){
						// temp = data;
				res.json(data);
						
					});
				});
			}

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