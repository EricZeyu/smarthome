const
	tcp_host = '10.12.13.129',
	tcp_port = '4001';

const
	SOP = 0xAA,
	SEQ = 0x00,

	Received_succeed = 0x00,
	Received_succeed_length = 0x00,
	Received_failed = 0xFF,
	Received_failed_length = 0x00,
	Transmitted_succeed = 0x55,

	Join_CLUSTERID  = 1,
	Num_CLUSTERID = 2,
	IEEEAddr_CLUSTERID  = 3,
	ShortAddr_CLUSTERID  = 4,
	Voltage_CLUSTERID = 5,
	WirelessQuality_CLUSTERID  = 6,
	Temperature_CLUSTERID = 7,
	Humidity_CLUSTERID = 8,
	Gas_CLUSTERID = 9,
	Pressure_CLUSTERID = 10,
	Lamp_CLUSTERID = 11,
	Motor_CLUSTERID = 12;

const
	tcpRecords_model = require('./models/tcpRecords.model'),
	tcpgateway_model = require('./models/tcpgateway.model'),
	net = require('net'),
	Rec = require('./models/Received.model'),
	Send = require('./models/Send.model');

exports.create_tcp_server = function(){

	const
		tcp_server = net.createServer();

	tcp_server.on('error', (err) => {
		console.log("An error has occurred---%s", err.code);
	});

	tcp_server.listen(tcp_port, tcp_host, () => {
							console.log("tcp_server : ", tcp_server.address());
					});

	//---TCP
	tcp_server.on('connection', (socket) => {
	//	socket.setEncoding('hex');
		socket.setKeepAlive(true, 3000);

		// sockets.push(socket);
		Send.newsocket(socket);

	//	console.log(sockets);

		tcpgateway_model.changezhuangtai("On", socket.remoteAddress);

		console.log("Tcp socket connected to IP: " + socket.remoteAddress + ", port : " + socket.remotePort);

		socket.on('error', (err) => {
			console.log("An error has been occurred---%s---%s:%s", err.code, socket.remoteAddress, socket.remotePort);

			// sockets.splice(sockets.indexOf(socket), 1);
			Send.cutsocket(socket);

			tcpgateway_model.changezhuangtai("Off", socket.remoteAddress);

			socket.destroy();
		});

		socket.on('end',  () => {
			console.log("TCP client " + socket.remoteAddress + ":" + socket.remotePort + " ended.");
			
			// sockets.splice(sockets.indexOf(socket), 1);
			Send.cutsocket(socket);			

			tcpgateway_model.changezhuangtai("Off", socket.remoteAddress);
		});

		socket.on('data', (data) => {
			// 接收数据包解析
			if (data[0]==SOP){

				var Len,Seq,State,FCS;

				Len = data[1];
				Seq = data[2];
				State = data[3];
				FCS = 0x00;			//校验和异或验证
				for (var i = 1; i < 4 + Len; i++){
					FCS = FCS ^ data[i];	
				}

				if ((FCS == data[4 + Len]) && (State == Transmitted_succeed)){
					console.log("Received succeed! FCS = %s", FCS);
					if (Len > 0){
						var devNum = data[4];
						var devCmd = data[5];

						var devData = [];
						for (var i = 0; i < Len-2; i++){
							devData.push(data[i + 6]);
						}

						console.log(devCmd);
						var devValue;
						switch (devCmd){
							case Join_CLUSTERID: break;
							case Num_CLUSTERID: break;
							case IEEEAddr_CLUSTERID: break;
							case ShortAddr_CLUSTERID: break;
							case Voltage_CLUSTERID: break;
							case WirelessQuality_CLUSTERID: break;
							case Temperature_CLUSTERID: {devValue = devData[0]; break;}
							case Humidity_CLUSTERID: {devValue = devData[0]; break;}
							case Gas_CLUSTERID: {devValue = devData[0]; break;}
							case Pressure_CLUSTERID: {devValue = devData[0]; break;}
							case Lamp_CLUSTERID: {devValue = devData[0]; break;}
							case Motor_CLUSTERID: {devValue = devData[0]; break;}
							default: break;
						}

					tcpgateway_model.findRecordsTableName(socket.remoteAddress, function(data){
						//	console.log(socket.remoteAddress);
						//	console.log(data);
							tcpRecords_model.pushDeviceRecords(data, devNum, "sensor", devNum, "up", devValue);
						});
					}
				}
				else{
					console.log("Received failed! FCS = %s",FCS);
				}


			}
			/*
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
		//	socket.pause();*/
		});
	});
}