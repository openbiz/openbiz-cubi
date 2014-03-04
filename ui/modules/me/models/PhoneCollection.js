"use strict";
define(['./Phone'],function(Phone){
	return Backbone.Collection.extend({
		model: Phone,
		url: openbiz.apps.cubi.appUrl+'/me/phones'
	});
});