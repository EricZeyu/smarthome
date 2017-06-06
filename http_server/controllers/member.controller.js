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

	memberAdd(req, res, next){
		if (req.session.authority == 'owner'){
			user_model.add(req.body.memberName,
							req.body.memberPassword,
							req.session.username);
		}

		res.redirect('/member/member');
	},

	memberRemove(req, res, next){
		if (req.session.authority == 'owner'){
			user_model.delete(req.body.name);
		}

		res.redirect('/member/member');
	},

	membersList(req, res, next){

		if (req.session.authority == 'root'){
			user_model.usersAll(function(data){
				res.json(data);
			});
		}else if (req.session.authority == 'owner'){
			user_model.members(req.session.username, function(data){
				res.json(data);
			});
		}else{
			;;
		}
	}
};