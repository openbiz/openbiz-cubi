"use strict";
define(function(templateData){
	return Backbone.Model.extend({
		url: null,
		idAttribute: "_id",
		defualts:{
			users:[],
			apps:[],
			info:{}
		},
		installApps:function(apps,callback){
			$.ajax({
				type 		: "POST",
				dataType 	: "json",
				contentType : "application/json",
				url  		: this.url+'/apps',
				data 		: JSON.stringify(apps),
				complete 	: function(jqXHR,textStatus){
					switch(jqXHR.status){
						case 201:
							openbiz.session.me.fetch();
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
			this.url = openbiz.apps.cubi.appUrl+'/account';
			Backbone.Model.apply(this, arguments);			
		}
	});
});