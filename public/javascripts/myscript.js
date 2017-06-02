$(document).ready(function(){

	$("#myModal").on('show.bs.modal', function(){
		$("#username").val("");
		$("#password").val("");
		$("#passwordconfirm").val("");
	});
	
	$("#myModalSettings").on('show.bs.modal', function(){
		$("#old_password").val("");
		$("#new_password").val("");
		$("#new_passwordconfirm").val("");
	});

	$("#myHomeGuideModal").on('show.bs.modal', function(){
		$("#home").val("");
		$("#location").val("");
		$("#mail").val("");
		$("#tel").val("");
		$("#MAC").val("");
		$("#IP").val("");
		$("#port").val("");
	});

	$("#account_register").click(function(){
		$("#myModal").modal('hide');
		$.post('/account_register',
		{
			username : $("#username").val(),
			password : $("#password").val(),
			passwordconfirm : $("#passwordconfirm").val()
		});
	});

	$("#account_settings").click(function(){
		$("#myModalSettings").modal('hide');
		$.post('/account_settings',
			{
				old_password : $("#old_password").val(),
				new_password : $("#new_password").val(),
				new_passwordconfirm : $("#new_passwordconfirm").val()
			});
	});

	$("#home_guide_sure").click(function(){
		$("#myHomeGuideModal").modal('hide');
		$.post('/home/guide',
			{
				home : $("home").val(),
				location : $("#location").val(),
				mail : $("#mail").val(),
				tel : $("#tel").val(),
				MAC : $("#MAC").val(),
				IP : $("#IP").val(),
				port : $("#port").val()
			});
	});
		
});
