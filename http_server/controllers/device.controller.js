const
	device_model = require('../models/device.model'),
	home_model = require('../models/home.model'),
	user_model = require('../models/user.model'),
	co = require('co');

module.exports = {

	deviceRender(req, res, next){
		// console.log("device page");
		console.log("params",req.params.home);
		req.session.home = req.params.home;

		res.render('device', {
								username : req.session.username,
								authority: req.session.authority,
								home: req.session.home
		});
	},

	deviceAdd(req, res, next){
		if (req.session.authority !== 'member'){

			device_model.add(req.body.device,
							req.body.type,
							req.body.nickname,
							req.session.home,
							req.body.remark);
		}
	},

	deviceRemove(req, res, next){

		if (req.session.authority !== 'member'){

			device_model.delete(req.body.device);
		}
	},

	devicesList(req, res, next){

		if (req.session.authority == 'root'){

			console.log("root call", req.session.authority);
			device_model.all(function(data){
				res.json(data);
			});
		}else{
			device_model.homeDevices(req.session.home, function(data){
				res.json(data);
			});
		}
	}
};