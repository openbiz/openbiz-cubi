"use strict";
define(['../../myaccount/models/Me'],function(meModel){
	return Backbone.Model.extend({
		url: null,
		defualts:{
			email:null,
			password:null,
			contact:{},
			account:{},
			roles:[]
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
				complete 	: function(jqXHR,textStatus){
					switch(jqXHR.status){
						case 201:
							callback(true,jqXHR.responseJSON);							
							break;						
						default:
							break;
					}
				}
			});
		},
		requestResetPassword:function(){

		},
		resetPasswordWithToken:function(email,newPassword,token){

		},
		login:function(username,password,callback){
			var payload = {
				username: username,
				password: password
			};
			$.ajax({
				type 		: "POST",
				dataType 	: "json",
				contentType : "application/json",
				url  		: this.url+'/login',				
				data 		: JSON.stringify(payload),
				complete 	: function(jqXHR,textStatus){
					switch(jqXHR.status){
						case 200:
							var me = new meModel();
							openbiz.session.me = me;
							openbiz.session.me.fetch({success:function(){
								callback(true,me);
							}})														
							break;
						case 401:
							callback(false);
						default:
							break;
					}
				}
			});
		}
	});
});