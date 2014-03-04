"use strict";
define(function(templateData){
	return Backbone.Model.extend({
		url:openbiz.apps.cubi.appUrl+'/me/address',
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