const
	user_model = require('../models/user.model'),
	co = require('co');

module.exports = {

	memberRender(req, res, next){
		res.render('member', {
								username : req.session.username,
								authority: req.session.authority
		});
	},

	membersList(req, res, next){
		user_model.members(req.session.username, function(data){
			res.json(data);
		});
	}
};