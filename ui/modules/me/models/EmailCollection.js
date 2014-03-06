"use strict";
define(['./Email'],function(Email){
	return Backbone.Collection.extend({
		model: Email,
		url: openbiz.apps.cubi.appUrl+'/me/emails'
	});
});