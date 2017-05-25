const 
	accountController = require('../http_server/controllers/account.controller'),
	homeController = require('../http_server/controllers/home.controller'),
	indexController = require('../http_server/controllers/index.controller'),	
	memberController = require('../http_server/controllers/member.controller'),
	express = require('express'),
	router = express.Router();

router.get('/', indexController.indexRender);
router.post('/login', accountController.accountValidate);
router.post('/setting', accountController.accountSetting);
router.get('/logout', accountController.accountLogout);
router.post('/register', accountController.accountRegister);
router.get('/account', accountController.accountRender);
router.get('/home', homeController.homeRender);
router.get('/member', memberController.memberRender);
// router.get('/gateway', userController.usersList);
router.get('/homesList', homeController.homesList);
router.get('/membersList', memberController.membersList);


module.exports = router;
