const
	deviceController = require('../http_server/controllers/device.controller'),
	express = require('express'),
	router = express.Router();

router.get('/device', deviceController.deviceRender);
router.get('/table_devices_infos', deviceController.devicesList);


module.exports = router;
