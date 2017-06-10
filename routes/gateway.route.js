const
	gatewayController = require('../http_server/controllers/gateway.controller'),
	express = require('express'),
	router = express.Router();


router.get('/', gatewayController.gatewayRender);
router.post('/gatewayEdit', gatewayController.gatewayEdit);
router.post('/gatewayAdd', gatewayController.gatewayAdd);
router.post('/gatewayRemove', gatewayController.gatewayRemove);
router.get('/gatewayList', gatewayController.gatewayList);



module.exports = router;
