"use strict";
define(function(templateData){
	return Backbone.Model.extend({
		urlRoot:openbiz.apps.cubi.appUrl+'/me/phones',
		idAttribute: "_id",
		defaults:{

		}
	});
})