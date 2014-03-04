"use strict";
define(function(templateData){
	return Backbone.Model.extend({
		url:openbiz.apps.cubi.appUrl+'/me/phone',
		idAttribute: "_id",
		defaults:{
			type:null,
			category:null,
			countryCode:null,
			number:null
		}
	});
})