const
	device_model = require('../models/device.model'),
	home_model = require('../models/home.model'),
	user_model = require('../models/user.model'),
	co = require('co');

module.exports = {

	deviceRender(req, res, next){
		console.log("device page");
		console.log(req.params.home);
		res.render('device', {
								username : req.session.username,
								authority: req.session.authority,
								home: req.params.home
		});
	},

	deviceAdd(req, res, next){
		if (req.session.authority == 'owner'){

			device_model.add(req.body.device,
							req.body.type,
							req.body.nickname,
							req.body.home,
							req.body.remark);
		}

		res.redirect('/deivce/deivce');
	},

	deviceRemove(req, res, next){

		if (req.session.authority == 'owner'){

			device_model.delete(req.body.device);
		}
	},

	devicesList(req, res, next){

		// if (req.session.authority == 'root'){

		// }else{
		// 	user_model.getCreator(req.session.username, function(data){

		// 		home_model.getHomes(data, function(data){

		// 			data.map((item) => {
						
		// 					device_model.homeDevices(item.home, function(data){


		// 					});
		// 			});
		// 		});
		// 	});
		// }
	}
};