const
	memberController = require('../http_server/controllers/member.controller'),
	express = require('express'),
	router = express.Router();

router.get('/', memberController.memberRender);
router.post('/memberAdd', memberController.memberAdd);
router.post('/memberEdit', memberController.memberEdit);
router.post('/memberRemove', memberController.memberRemove);
router.get('/membersList', memberController.membersList);
router.get('/logs', memberController.memberLogs);


module.exports = router;
