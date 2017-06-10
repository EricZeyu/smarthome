const
	homeController = require('../http_server/controllers/home.controller'),
	indexController = require('../http_server/controllers/index.controller'),
	accountController = require('../http_server/controllers/account.controller'),
	express = require('express'),
	router = express.Router();

router.get('/', indexController.indexRender);
router.post('/login', accountController.accountValidate);
router.get('/logout', accountController.accountLogout);
router.post('/accountSettings', accountController.accountSettings);
router.post('/accountRegister', accountController.accountRegister);


module.exports = router;
