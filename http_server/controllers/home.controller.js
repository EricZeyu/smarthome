const
	home_model = require('../models/home.model'),
	co = require('co');

module.exports = {

	homeRender(req, res, next){
		res.render('home', {username:req.body.username});
	},

	homesList(req, res, next){

		// co(function* (){
			// homes = yield home_model.all();

			home_model.all(function(data){
				// console.log(data);
				res.json(data);
			});
			// let homes = [{"home":"Banhu","location":"Shao Xin","owner":"banhuer","mail":"banhu@shaoxin.com","tel":"99999999"},
			// 		{"home":"Banhu","location":"Shao Xin","owner":"banhuer","mail":"banhu@shaoxin.com","tel":"99999999"}];
		// });
	}
};