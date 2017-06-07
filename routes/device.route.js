const
	deviceController = require('../http_server/controllers/device.controller'),
	express = require('express'),
	router = express.Router();

router.get('/:home', deviceController.deviceRender);
router.post('/addNewDevice', deviceController.deviceAdd);
router.post('/removeDevice', deviceController.deviceRemove);
router.get('/table_devices_infos', deviceController.devicesList);


module.exports = router;
