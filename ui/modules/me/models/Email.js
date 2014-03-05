"use strict";
define(function(templateData){
	return Backbone.Model.extend({
		url:openbiz.apps.cubi.appUrl+'/me/email',
		idAttribute: "_id",
		defaults:{
			category:null,
			email:null
		}
	});
})