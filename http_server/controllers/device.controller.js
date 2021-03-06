const
	device_model = require('../models/device.model'),
	records_model = require('../models/records.model'),
	user_model = require('../models/user.model'),
	co = require('co');

module.exports = {

	deviceRender(req, res, next){

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
							req.session.username,
							req.body.remark);
		}

		res.redirect('/device');
	},

	deviceRemove(req, res, next){

		if (req.session.authority !== 'member'){

			device_model.delete(req.body.device);
		}
	},

	devicesList(req, res, next){

		if (req.session.authority == 'root'){
			device_model.all(function(data){
				res.json(data);
			});
		}else if (req.session.authority == 'owner'){
					device_model.myDevices(req.session.username, function(data){
						res.json(data);
				});
			}else{
				user_model.getCreator(req.session.username, function(data){
					device_model.myDevices(data, function(data){
						res.json(data);
					});
				});
			}
	},

	deviceRecordsRender(req, res, next){
		
		res.render('records', {
								username : req.session.username,
								authority: req.session.authority,
								home: req.session.home
		});
	},

	deviceRecords(req, res, next){
		
		if (req.session.authority == 'root'){
				res.json([]);
		}else if (req.session.authority == 'owner'){

					records_model.myDeviceRecords(req.session.username, function(data){
						res.json(data);
					});
			}else{
				user_model.getCreator(req.session.username, function(data){
					records_model.myDeviceRecords(data, function(data){
						res.json(data);
					});
				});
			}

	}
};