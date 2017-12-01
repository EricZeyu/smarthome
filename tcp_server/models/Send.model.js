const mySend = [],
	  sockets = [];

module.exports = {

	newsocket(socket){
		sockets.push(socket);
	},

	cutsocket(socket){
		sockets.splice(sockets.indexOf(socket), 1);
	},

	hasSend(){
		if (mySend.length>0){
			return true;
		}else{
			return false;
		}
	},

	getFirstSendIp(){
		if (mySend.length>0){
			return mySend[0].IP;
		}else{
			return false;
		}
	},

	FirstSendData(){
		return mySend[0].data;
	},

	popFirstSend(){
		if (mySend.length>0){
			mySend.shift();
		}
	},

	pushLastSend(IP, num, CLUSTERID, data){
		
		let flag = false;
		if (sockets.length>0){
			sockets.map((item)=>{
					if (item.remoteAddress == IP){

						//上位机向基站发送命令时，seq=0x00,state=0x44
						let FCS = 0x03 ^ 0x00 ^ 0x44 ^ num ^ CLUSTERID ^ data;
						// tf[0] = 0xAA;
						// tf[1] = 0x03;
						// tf[2] = 0x00;
						// tf[3] = 0x55;
						// tf[4] = num;
						// tf[5] = CLUSTERID;
						// tf[6] = data;
						// tf[7] = tf[1]^tf[2]^tf[3]^tf[4]^tf[5]^tf[6];


						let tf = new Buffer([0xAA, 0x03, 0x00, 0x44, num, CLUSTERID, data, FCS]);

						console.log("tf=",tf);
						item.write(tf);
						flag = true;
					}
				});
		}

		if (flag){
			console.log("pushLastSend...  true");
		}else{
			console.log("pushLastSend...  false");			
		}
	}

	// pushLastSend(IP, data){

	// 	console.log("Start sending...", data);

	// 	let flag = false;
	// 	if (sockets.length>0){
	// 		sockets.map((item)=>{
	// 				if (item.remoteAddress == IP){


	// 					item.write(data);
	// 					flag = true;
	// 				}
	// 			});
	// 	}

	// 	if (flag){
	// 		console.log("pushLastSend...  true");
	// 	}else{
	// 		console.log("pushLastSend...  false");			
	// 	}
	// }
}