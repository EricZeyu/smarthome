const 
	homeController = require('../http_server/controllers/home.controller'),
	express = require('express'),
	router = express.Router();


router.get('/', homeController.homeRender);
router.get('/homeStatus', homeController.homeStatus);


module.exports = router;
