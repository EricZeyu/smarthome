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
router.post('/bideng_kai', tcpSocketcontroller.bideng_kai);
router.post('/bideng_guan', tcpSocketcontroller.bideng_guan);
router.post('/taideng_kai', tcpSocketcontroller.taideng_kai);
router.post('/taideng_guan', tcpSocketcontroller.taideng_guan);

router.post('/chuanglian_sheng', tcpSocketcontroller.chuanglian_sheng);
router.post('/chuanglian_jiang', tcpSocketcontroller.chuanglian_jiang);
router.post('/yijia_sheng', tcpSocketcontroller.yijia_sheng);
router.post('/yijia_jiang', tcpSocketcontroller.yijia_jiang);


router.get('/:index', homeController.homeIndex);





module.exports = router;
