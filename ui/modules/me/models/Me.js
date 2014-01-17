"use strict";
define(function(templateData){
	return Backbone.Model.extend({
		url: null,
		idAttribute: "_id",
		defualts:{
			username:null,
			contact:{},			
			account:{},
			roles:[]
		},
		createAccount:function(account,callback){
			$.ajax({
				type 		: "POST",
				dataType 	: "json",
				contentType : "application/json",
				url  		: this.url+'/create-account',
				data 		: JSON.stringify(account),
				complete 	: function(jqXHR,textStatus){
					switch(jqXHR.status){
						case 201:
							callback(true);
							break;
						default:
							callback(false);
							break;
					}
				}
			});
		},
		onJoinAccount:function(token,callback){
			$.ajax({
				type 		: "POST",
				dataType 	: "json",
				contentType : "application/json",
				url  		: this.url+'/join-account',
				data 		: {"token":token},
				complete 	: function(jqXHR,textStatus){
					switch(jqXHR.status){
						case 200:
							callback(true);
							break;
						default:
							callback(false);
							break;
					}
				}
			});
		},
		constructor:function(){
			this.url = openbiz.apps.cubi.appUrl+'/me';
			Backbone.Model.apply(this, arguments);
			this.on('sync',function(model,resp,options){				
				openbiz.session.me = model;
			});
			this.on('destroy',function(model,resp,options){
				delete openbiz.session.me;
			});
		}
	});
})