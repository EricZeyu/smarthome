const
	co = require('co');

module.exports = {
	indexRender(req, res, next){
		res.render('index');
	}
};