var express = require('express');
var router = express.Router();

router.post('/login', (req, res) => {
  	
  	if (req.body.username == "root" && req.body.password == "123456") {
  		res.render('root', {
        title : "Root Page",
        name : "root"
      });
  	}
  	else if (req.body.username == "test" && req.body.password == "111111") {
  		res.render('users', {
        title : "Users Page",
  			name : req.body.username
  		});
  	}
  	else res.render('index', {
      title : "Smart Home"
    });
});

module.exports = router;
