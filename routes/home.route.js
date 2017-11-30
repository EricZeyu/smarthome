const 
	homeController = require('../http_server/controllers/home.controller'),
	express = require('express'),
	router = express.Router();
	tcpSocketcontroller = require('../tcp_server/controllers/tcpSocket.controller');


router.get('/', homeController.homeRender);
router.get('/homeStatus', homeController.homeStatus);
router.get('/homejizhan', homeController.homejizhan);
router.get('/homewendu', homeController.homewendu);
router.get('/homeshidu', homeController.homeshidu);
router.get('/homekongqizhiliang', homeController.homekongqizhiliang);
router.get('/homeqiya', homeController.homeqiya);

router.post('/dingdeng_kai', tcpSocketcontroller.dingdeng_kai);
router.post('/dingdeng_guan', tcpSocketcontroller.dingdeng_guan);
router.post('/biding_kai', tcpSocketcontroller.biding_kai);
router.post('/biding_guan', tcpSocketcontroller.biding_guan);
router.post('/taiding_kai', tcpSocketcontroller.taiding_kai);
router.post('/taiding_guan', tcpSocketcontroller.taiding_guan);

router.post('/chuanglian_sheng', tcpSocketcontroller.chuanglian_sheng);
router.post('/chuanglian_jiang', tcpSocketcontroller.chuanglian_jiang);
router.post('/yijia_sheng', tcpSocketcontroller.yijia_sheng);
router.post('/yijia_jiang', tcpSocketcontroller.yijia_jiang);


router.get('/:index', homeController.homeIndex);





module.exports = router;
