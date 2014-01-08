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
		createAccount:function(){

		},
		requestResetPassword:function(){

		},
		resetPasswordWithToken:function(email,newPassword,token){

		},
		login:function(){

		}
	});
})