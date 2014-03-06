"use strict";
define(function(templateData){
	return Backbone.Model.extend({
		url:openbiz.apps.cubi.appUrl+'/me/profile',
		idAttribute: "_id",
		defaults:{
			name:null,
			birthday:null,
			avator:null,
			title:null,
			department:null,
			company:null
		}
	});
})