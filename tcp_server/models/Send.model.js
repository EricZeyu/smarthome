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

	pushLastSend(IP, data){

		console.log("Start sending...", data);

		let flag = false;
		sockets.map((item)=>{
			if (item.remoteAddress == IP){
				item.write(data);
				flag = true;
			}
		});

		if (flag){
			console.log("pushLastSend...  true");
		}else{
			console.log("pushLastSend...  false");			
		}
	}
}