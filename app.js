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
	// u.add('zeyu','zeyu','owner', 'Banhu');
	// // u.delete('root');


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
	// app.use('/login', require('./routes/login.route'));
	// app.use('/register', require('./routes/register.route'));	
	// app.use('/user', require('./routes/user.route'));

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

// 	let us = require("./http_server/models/user.model");
// //	us.add('zeyu', 123456, 'ZJUT');
// 	us.exist('zeyu', 123456);
// 	let hm = require("./http_server/models/home.model");

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