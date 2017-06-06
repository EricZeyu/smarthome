const 
	homeController = require('../http_server/controllers/home.controller'),
	gatewayController = require('../http_server/controllers/gateway.controller'),
	express = require('express'),
	router = express.Router();


router.get('/home', homeController.homeRender);
router.get('/gateway', gatewayController.gatewayRender);
router.post('/addNewHome', homeController.homeAdd);
router.post('/removeHome', homeController.homeRemove);
router.post('/addNewGateway', gatewayController.gatewayAdd);
router.post('/removeGateway', gatewayController.gatewayRemove);
router.get('/record', homeController.homeRecord);
router.get('/table_home_infos', homeController.homeList);
router.get('/table_gateway_infos', gatewayController.gatewayList);


module.exports = router;
