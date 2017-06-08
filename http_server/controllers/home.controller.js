const
	home_model = require('../models/home.model'),
	gateway_model = require('../models/gateway.model'),
	user_model = require('../models/user.model'),
	co = require('co');

module.exports = {

	homeRender(req, res, next){
		res.render('home', {
								username : req.session.username,
								authority: req.session.authority
		});
	},

	gatewayHomeSelect(req, res, next){
		if (req.session.authority == 'root'){
				home_model.all(function(data){
					
					let homeSelect = data.map((item) => {
								return {
											"home" : item.home										
										}
								});

					res.send(homeSelect);
				});
		}else{
				user_model.getCreator(req.session.username, function(data){
					home_model.getHomes(data, function(data){
						
						let homeSelect = data.map((item) => {
								return {
											"home" : item.home										
										}
								});

						res.send(homeSelect);
					});
				});
			}
	},

	homeEdit(req, res, next){
		if (req.session.authority == 'owner'){
			;
		}
	},

	homeAdd(req, res, next){
		if (req.session.authority == 'owner'){

			home_model.add(req.body.home,
							req.body.location,
							req.session.username,
							req.body.mail,
							req.body.tel);
		}

		res.redirect('/home/home');
	},

	homeRemove(req, res, next){
		if (req.session.authority == 'owner'){

			home_model.delete(req.body.home);
		}
	},

	homeList(req, res, next){

			if (req.session.authority == 'root'){
				home_model.all(function(data){
					// console.log(data);
					res.json(data);
				});
			}else{
					user_model.getCreator(req.session.username, function(data){
						home_model.getHomes(data, function(data){
							res.json(data);
						});
					});
				}
	}
};