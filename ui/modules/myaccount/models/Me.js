"use strict";
define(function(templateData){
	return Backbone.Model.extend({
		url: null,
		defualts:{
			email:null,
			contact:{},			
			account:{},
			roles:[]
		},
		initialize:function(){
			this.url = openbiz.apps.cubi.appUrl+'/me';
		},
		getMe:function(callback){
			if(openbiz.session.hasOwnProperty('user') && typeof openbiz.session.user=='object')
			{
				//check local cache first
				callback(true,openbiz.session.user);
			}
			else
			{
				//if not found , then query remote API
				$.ajax({
					type 		: "GET",
					dataType 	: "json",
					contentType : "application/json",
					url  		: this.url,						
					complete 	: function(jqXHR,textStatus){
						switch(jqXHR.status){
							case 200:
								openbiz.session.user = jqXHR.responseJSON;
								callback(true,jqXHR.responseJSON);
								break;
							case 403:
								callback(false);
							default:
								break;
						}
					}
				});
			}
		}
	});
})