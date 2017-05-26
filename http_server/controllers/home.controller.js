const
	home_model = require('../models/home.model'),
	co = require('co');

module.exports = {

	homePreview(req, res, next){
		res.render('homePreview', {
								username : req.session.username,
								authority: req.session.authority
		});
	},

	homeList(req, res, next){

		// co(function* (){
			// homes = yield home_model.all();
			if (req.session.authority == 'root') {
				home_model.all(function(data){
					// console.log(data);
					res.json(data);
				});
			}else {
				home_model.myHome(req.session.username, function(data){
					res.json(data);
				});
			}
			// let homes = [{"home":"Banhu","location":"Shao Xin","owner":"banhuer","mail":"banhu@shaoxin.com","tel":"99999999"},
			// 		{"home":"Banhu","location":"Shao Xin","owner":"banhuer","mail":"banhu@shaoxin.com","tel":"99999999"}];
		// });
	}
};