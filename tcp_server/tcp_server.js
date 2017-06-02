const
	tcp_host = '10.8.208.156',
	tcp_port = '4001';

const
	net = require('net'),
	gateway = require('./models/gateway.model'),
	Rec = require('./models/Received.model'),
	Send = require('./models/Send.model');

let 
	sockets = [],
	sockets_Read = [],
	sockets_Written = [];

exports.create_tcp_server = function(){

	var tcp_server = net.createServer();

	tcp_server.on('error', (err) => {
		console.log("An error has occurred---%s", err.code);
	});

	tcp_server.listen(tcp_port, tcp_host, () => {
							console.log("tcp_server : ", tcp_server.address());
					});

	//---TCP
	tcp_server.on('connection', (socket) => {
	//	socket.setEncoding('utf8');
		socket.setKeepAlive(true, 3000);

		sockets.push(socket);

		// gateway.connect(socket);

		console.log("Tcp socket connected to IP: " + socket.remoteAddress + ", port : " + socket.remotePort);

		socket.on('error', (err) => {
			console.log("An error has been occurred---%s---%s:%s", err.code, socket.remoteAddress, socket.remotePort);

			sockets.splice(sockets.indexOf(socket), 1);

		// gateway.disconnect(socket);

			socket.destroy();
		});

		socket.on('end',  () => {
			console.log("TCP client " + socket.remoteAddress + ":" + socket.remotePort + " ended.");
			
			sockets.splice(sockets.indexOf(socket), 1);

			// gateway.disconnect(socket);
		});

		socket.on('data', (data) => {

			Rec.prase_json(data);

			sockets_Read.push({
								"IP":socket.remoteAddress,
								"port":socket.remotePort,
								"buf":data
							});

			// console.log("data to JSON parse = ", JSON.parse(data));

			// console.log("sockets_Read = ", sockets_Read);

			sockets_Read.forEach( (item) => {
			 	
			 	console.log("sockets_Read forEach() to JSON parse = ", JSON.parse(item.buf));
			 });

			socket.write("Hello.");
		//	socket.pause();
		});
	});
}