"use strict";
define(function(templateData){
	return Backbone.Model.extend({
		urlRoot:openbiz.apps.cubi.appUrl+'/me/emails',
		idAttribute: "_id",
		defaults:{
			category:null,
			email:null
		}
	});
})