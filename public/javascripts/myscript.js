$(document).ready(function(){

	$("#myModal").on('show.bs.modal', function(){
		$("#new_username").val("");
		$("#new_password").val("");
		$("#new_passwordconfirm").val("");
	});
	
	$("#myModalSettings").on('show.bs.modal', function(){
		$("#old_password").val("");
		$("#new_password").val("");
		$("#new_passwordconfirm").val("");
	});


	$("#account_register").click(function(){
		$.post('/account_register',
			{
				new_username : $("#new_username").val(),
				new_password : $("#new_password").val(),
				new_passwordconfirm : $("#new_passwordconfirm").val()
			});
		$("#myModal").modal('hide');
	});

	$("#account_settings").click(function(){
		$.post('/account_settings',
			{
				old_password : $("old_password").val(),
				new_password : $("#new_password").val(),
				new_passwordconfirm : $("#new_passwordconfirm").val()
			});
		$("#myModalSettings").modal('hide');
	});
		
});
