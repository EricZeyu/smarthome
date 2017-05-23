const
	// user_model = require('../models/user.model'),
	co = require('co');

module.exports = {

	memberRender(req, res, next){
		res.render('member', {username:req.body.username});
	},

	membersList(req, res, next){
		res.json({});
	}
};