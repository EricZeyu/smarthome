const
	deviceController = require('../http_server/controllers/device.controller'),
	express = require('express'),
	router = express.Router();

router.get('/', deviceController.deviceRender);
router.post('/deviceAdd', deviceController.deviceAdd);
router.post('/deviceRemove', deviceController.deviceRemove);
router.get('/devicesList', deviceController.devicesList);


module.exports = router;
