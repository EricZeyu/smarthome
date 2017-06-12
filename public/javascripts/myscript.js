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
	}

	function checkTime(i){
		if (i<10){
			i = '0' + i;
		}
		return i;
	}

	startDate();
	setInterval(startDate, 1000);
		
});
