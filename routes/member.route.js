const
	memberController = require('../http_server/controllers/member.controller'),
	express = require('express'),
	router = express.Router();

router.get('/member', memberController.memberRender);
router.post('/addNewMember', memberController.memberAdd);
router.post('/editMember', memberController.memberEdit);
router.post('/removeMember', memberController.memberRemove);
router.get('/table_members_infos', memberController.membersList);


module.exports = router;
