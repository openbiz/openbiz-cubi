"use strict";
define(['./Address'],function(Address){
	return Backbone.Collection.extend({
		model: Address,
		url: openbiz.apps.cubi.appUrl+'/me/addresses'
	});
});