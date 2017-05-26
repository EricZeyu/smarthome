const
	homeController = require('../http_server/controllers/home.controller'),
	indexController = require('../http_server/controllers/index.controller'),
	accountController = require('../http_server/controllers/account.controller'),
	express = require('express'),
	router = express.Router();

router.get('/', indexController.indexRender);
router.post('/login', accountController.accountValidate);
router.get('/logout', accountController.accountLogout);
router.post('/account_settings', accountController.accountSettings);
router.post('/account_register', accountController.accountRegister);
// router.get('/home', homeController.homeRender);
// router.get('/member', memberController.memberRender);
// // router.get('/gateway', userController.usersList);
// router.get('/homesList', homeController.homesList);
// router.get('/membersList', memberController.membersList);


module.exports = router;
