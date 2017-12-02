$(document).ready(function(){

	function startDate(){
		let date = new Date();
		let weekday = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");
		// let h = checkTime(date.getHours());
		// let m = checkTime(date.getMinutes());
		// let s = checkTime(date.getSeconds());
		// $("#Date").text(date.getFullYear() + '/'
		// 				+ date.getMonth() + '/'
		// 				+ date.getDate() + ' '
		// 				+ h + ':'
		// 				+ m + ':'
		// 				+ s + ' '
		// 				+ weekday[date.getDay()]);
		$("#Date").text(date.toLocaleString() + ' ' + weekday[date.getDay()]);

		$.get("/home/homejizhan", function(data,status){
		//	console.log(data);
			if (data.state == "Off"){
				$("#zhuangtai").text("基站断开连接！").css({"color":"red"});
				$("#IP").text("IP ");
				$("#port").text("port ");				
			}else{
				$("#zhuangtai").text("基站连接成功！").css({"color":"green"});
				$("#IP").text("IP = " + data.IP);
				$("#port").text("port = " + data.port);
			}
			
		});

		$.get("/home/homewendu", function(data,status){
			// console.log(data);
			$("#shiwen").text("室温 " + data.value + "℃");
		});

		$.get("/home/homeshidu", function(data,status){
			// console.log(data);
			$("#shidu").text("湿度 " + data.value + "%");
		});

		$.get("/home/homekongqizhiliang", function(data,status){
			// console.log(data);
			if (data.value == 1){
				$("#kongqizhiliang").text("空气质量  正常");
			}else{
				$("#kongqizhiliang").text("空气质量  不适宜易感染人群");
			}
		});

		// $.get("/home/homeqiya", function(data,status){
		// 	// console.log(data);
		// 	$("#qiya").text("气压  "+data.value+"kPa");
		// });
	}

	function checkTime(i){
		if (i<10){
			i = '0' + i;
		}
		return i;
	}

	startDate();
	setInterval(startDate, 1000);


	$("#dingdeng_kai").click(function(){
		$.post("/home/dingdeng_kai", function(data,status){
			console.log(data);
		});		
	});	
	$("#dingdeng_guan").click(function(){
		$.post("/home/dingdeng_guan", function(data,status){
			console.log(data);
		});		
	});	
	$("#bideng_kai").click(function(){
		$.post("/home/bideng_kai", function(data,status){
			console.log(data);
		});		
	});	
	$("#bideng_guan").click(function(){
		$.post("/home/bideng_guan", function(data,status){
			console.log(data);
		});		
	});
	$("#taideng_kai").click(function(){
		$.post("/home/taideng_kai", function(data,status){
			console.log(data);
		});		
	});	
	$("#taideng_guan").click(function(){
		$.post("/home/taideng_guan", function(data,status){
			console.log(data);
		});		
	});
	$("#chuanglian_sheng").click(function(){
		$.post("/home/chuanglian_sheng", function(data,status){
			console.log(data);
		});		
	});	
	$("#chuanglian_jiang").click(function(){
		$.post("/home/chuanglian_jiang", function(data,status){
			console.log(data);
		});		
	});
	$("#yijia_sheng").click(function(){
		$.post("/home/yijia_sheng", function(data,status){
			console.log(data);
		});		
	});	
	$("#yijia_jiang").click(function(){
		$.post("/home/yijia_jiang", function(data,status){
			console.log(data);
		});		
	});
		
});
