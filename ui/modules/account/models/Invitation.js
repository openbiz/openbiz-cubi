"use strict";
define(function(templateData){
	return Backbone.Model.extend({
		url: openbiz.apps.cubi.appUrl+'/account/invitations',
		idAttribute: "_id",
		defualts:{
			expiredDate:null,
			data:{}
		}
	});
});