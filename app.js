const 
	http_port = 9999;

const 
	express = require('express'),
	app = express(),
	http_server = app.listen(http_port, () => {
								console.log("http_server : ", http_server.address());
							}),
	tcp = require('./tcp_server/tcp_server').create_tcp_server(),
	sio = require('socket.io'),
	socket = sio.listen(http_server),
	path = require('path'),
	ejs = require('ejs'),
    expressSession = require('express-session'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser');

	// view engine setup
	app.set('views', path.join(__dirname, 'views'));
	app.engine('.html', ejs.__express);
	app.set('view engine', 'html');

	// uncomment after placing your favicon in /public
	//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(expressSession({
		secret:'sessionKey',
		resave: false,
  		saveUninitialized: true
	}));
	app.use(express.static(path.join(__dirname, 'public')));
	
	// let u =require('./http_server/models/user.model');
	// u.getCreator('ban0', function(data){
	// 	console.log('ban0 creator is', data);
	// });
	// u.register('zeyu', 'zeyu', 'Banhu');
	// u.delete('root');
	// u.add('test','test','owner','test');
	// u.add('zeyu','zeyu','owner','zeyu');
	// u.testAll();

	// let hm = require("./http_server/models/home.model");
	// // let hm = require('./http_server/models/home.model');
	// hm.update('ZJUT', 'ZJUT', 'Hang Zhou', 'test', 'test@edu.com.cn', '0571-85290777');
	// hm.all(function(data){
	// 	console.log(data);
	// });

	// let gmm = require("./http_server/models/gateway.model");
	// gmm.delete('z');
	// gmm.add('D8B04CBE2939', '10.12.13.128', '3333', 'Banhu');
	// gmm.add('AC243FB00876', '10.8.208.135', '3334', 'ZJUT');
	//gmm.all();

	// let rds = require("./http_server/models/records.model");
	// rds.createTable('zjut');
	// rds.createTable('zeyu');

	// rds.add('zeyu', '6105','lamp', '6105','up','turn off');
	// rds.add('zeyu', '6105','lamp', '6105','down','turn on');
	// rds.add('zjut', '6105','lamp', '6105','down','turn on');
	// rds.myDeviceRecords('zeyu', function(data){
	// 	console.log(data);
	// });

	// let tS = require('./tcp_server/controllers/tcpSocket.controller');
	// console.log(tS.getState('10.8.158.1'));


	app.use((req,res,next) => {
	  if(req.session.username || req.originalUrl === '/' || req.originalUrl === '/login') {
	    next();
	  } else {
	    //没有权限的路由都重定向到登录页
	    res.redirect('/');
	  }
	});

	app.use('/', require('./routes/index.route'));
	app.use('/home', require('./routes/home.route'));
	app.use('/gateway', require('./routes/gateway.route'));
	app.use('/member', require('./routes/member.route'));
	app.use('/device', require('./routes/device.route'));

	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
	  var err = new Error('Not Found');
	  err.status = 404;
	  next(err);
	});

	// error handler
	app.use(function(err, req, res, next) {
	  // set locals, only providing error in development
	  res.locals.message = err.message;
	  res.locals.error = req.app.get('env') === 'development' ? err : {};

	  // render the error page
	  res.status(err.status || 500);
	  res.render('error', {
	  			title: "Error Page",
	  			message: res.locals.message,
	  			error: res.locals.error
	  });
	});


	//---HTTP
	// socket.on('connection', (socket) => {

	// 	socket.on('get', (data) => {

	// 			console.log(data);

	// 			if (data == 'homes') {

	// 					var hkm = [{"home":"Banhu","location":"Shao Xin","owner":"banhuer","mail":"banhu@shaoxin.com","tel":"99999999"},
	// 					{"home":"Banhu","location":"Shao Xin","owner":"banhuer","mail":"banhu@shaoxin.com","tel":"99999999"}];
	// 					console.log(hkm);

	// 					var hhhh = hm.all();
	// 					console.log("hhhh=",hhhh);

	// 					socket.emit('homes', hhhh);
	// 					// socket.emit('homes', hkm);
	// 					// var Gateways = sockets.map((item) => {
	// 					// 					return {
	// 					// 							"IP" : item.remoteAddress,
	// 					// 							"port" : item.remotePort,
	// 					// 							"Owner" : "testing"
	// 					// 							}
	// 					// 					});
							
	// 				//	socket.emit('Gateways', JSON.stringify(Gateways));
	// 				}else {
	// 				//	socket.emit('Home_Info', "Home say hi.");
	// 				}
	// 	});
	// });

module.exports = app;