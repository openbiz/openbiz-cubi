"use strict";
define(function(templateData){
	return Backbone.Model.extend({
		urlRoot:openbiz.apps.cubi.appUrl+'/me/addresses',
		idAttribute: "_id",
		defaults:{
			category:null,
			country:null,
			state:null,
			city:null,
			street:null,
			zipcode:null
		}
	});
})