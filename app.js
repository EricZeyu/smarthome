const 
	http_port = 9999;

const 
	express = require('express'),
	app = express(),
	http_server = app.listen(http_port, () => {
								console.log("http_server : ", http_server.address());
							}),
	tcp = require('./tcp_server/tcp_server'),
	sio = require('socket.io'),
	socket = sio.listen(http_server),
	path = require('path'),
	ejs = require('ejs'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser');

	tcp.create_tcp_server();

	// view engine setup
	// app.set('views', path.join(__dirname, 'views'));
	// app.set('view engine', 'jade');
	app.set('views', path.join(__dirname, 'views'));
	app.engine('.html', ejs.__express);
	app.set('view engine', 'html');

	// uncomment after placing your favicon in /public
	//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, 'public')));

	app.use('/', require('./routes/index'));
	app.post('/register', require('./routes/register'));
	app.post('/login', require('./routes/login'));
	app.post('/logout', require('./routes/logout'));

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
	socket.on('connection', (socket) => {

		socket.on('Start_Info', (data) => {

				console.log(data.info);
				console.log('d');

				var tweets = setInterval(() => {

					if (data.info == 'Gateways') {
						// var Gateways = sockets.map((item) => {
						// 					return {
						// 							"IP" : item.remoteAddress,
						// 							"port" : item.remotePort,
						// 							"Owner" : "testing"
						// 							}
						// 					});
							
					//	socket.emit('Gateways', JSON.stringify(Gateways));
					}else {
					//	socket.emit('Home_Info', "Home say hi.");
					}

				}, 2000);
		});

		socket.on('End_Info', (data) => {
			clearInterval(tweets);
		});

	});

module.exports = app;