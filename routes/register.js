var express = require('express');
var router = express.Router();

router.post('/register', (req, res) => {
  	
    if (req.body.new_password == req.body.new_password2
      && req.body.new_username)
    {
      console.log(req.body.new_username);
      console.log(req.body.new_password);
    }

});

module.exports = router;
