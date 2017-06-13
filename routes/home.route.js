const 
	homeController = require('../http_server/controllers/home.controller'),
	express = require('express'),
	router = express.Router();


router.get('/', homeController.homeRender);
router.get('/homeStatus', homeController.homeStatus);

router.get('/:index', homeController.homeIndex);


module.exports = router;
