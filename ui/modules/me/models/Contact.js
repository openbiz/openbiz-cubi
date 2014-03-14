"use strict";
define(function(templateData){
	return Backbone.Model.extend({
		url:openbiz.apps.cubi.appUrl+'/me/profile',
		idAttribute: "_id",
		defaults:{
		},
		getBirthday:function(){
			var date = new Date(this.get('birthday'));
			if(!date){
				date = new Date();
			}
			return  date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
		},
		updatePassword:function(password,callback){
			$.ajax({
				type 		: "POST",
				dataType 	: "json",
				contentType : "application/json",
				url  		: openbiz.apps.cubi.appUrl+'/users/reset-password',
				data 		: JSON.stringify({"password":password}),
				complete 	: function(jqXHR,textStatus){
					switch(jqXHR.status){
						case 200:
							callback(true);
							break;
						case 500:
							callback(false);
							break;
						default:
							callback(false);
							break;
					}
				}
			});
		}
	});
})