"use strict";
define(function(templateData){
	return Backbone.Model.extend({
		url:openbiz.cubi.appUrl+'me',
		idAttribute: "_id",
		defaults:{
			name:null,
			birthday:null,
			avator:null
		}
	});
})