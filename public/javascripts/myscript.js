$(document).ready(function(){

	$("#myModal").on('show.bs.modal', function(){
		$("#new_username").val("");
		$("#new_password").val("");
		$("#new_passwordconfirm").val("");
	});
	
	$("#myModalSetting").on('show.bs.modal', function(){
		$("#old_password").val("");
		$("#new_password").val("");
		$("#new_passwordconfirm").val("");
	});


	$("#register").click(function(){
		$.post('/register',
			{
				new_username : $("#new_username").val(),
				new_password : $("#new_password").val(),
				new_passwordconfirm : $("#new_passwordconfirm").val()
			});
		$("#myModal").modal('hide');
	});

	$("#setting").click(function(){
		$.post('/setting',
			{
				old_password : $("old_password").val(),
				new_password : $("#new_password").val(),
				new_passwordconfirm : $("#new_passwordconfirm").val()
			});
		$("#myModalSetting").modal('hide');
	});
		
});
