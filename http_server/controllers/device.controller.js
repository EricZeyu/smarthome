const
	device_model = require('../models/device.model'),
	co = require('co');

module.exports = {

	deviceRender(req, res, next){
		res.render('device', {
								username : req.session.username,
								authority: req.session.authority
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

		device_model.homeDevices(req.session.username, function(data){
			res.json(data);
		});
	}
};