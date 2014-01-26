"use strict";
define(function(templateData){
	return Backbone.Model.extend({
		url: openbiz.apps.cubi.appUrl+'/account/users',
		idAttribute: "_id",
		defualts:{
			_id:null,
			user:{},
			role:null
		}
	});
});