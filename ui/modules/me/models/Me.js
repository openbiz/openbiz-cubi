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