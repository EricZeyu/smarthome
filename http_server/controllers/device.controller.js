const
	// device_model = require('../models/home.model'),
	co = require('co');

module.exports = {

	deviceRender(req, res, next){
		res.render('device', {
								username : req.session.username,
								authority: req.session.authority
		});
	},

	devicesList(req, res, next){

		console.log({"deivce":"01a4bf"});
		res.json([]);
	}
};