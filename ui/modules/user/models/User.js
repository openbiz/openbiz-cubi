"use strict";
define(function(templateData){
	return Backbone.Model.extend({
		url: null,
		defualts:{
			email:null,
			password:null,
			contact:{}
		},
		initialize:function(){
			this.url = openbiz.apps.cubi.appUrl+'/users';
		},
		createAccount:function(user,callback){
			$.ajax({
				type 		: "POST",
				dataType 	: "json",
				contentType : "application/json",
				url  		: this.url,				
				data 		: JSON.stringify(user),
				statusCode  : {
					201: function(){
						callback();
					}
				}
			});
		},
		requestResetPassword:function(){

		},
		resetPasswordWithToken:function(email,newPassword,token){

		},
		login:function(){

		}
	});
})