var express = require('express');
var router = express.Router();

router.post('/logout', (req, res) => {
  	
  	res.render('index', {
  		title : "Smart Home"
  	});
});

module.exports = router;
