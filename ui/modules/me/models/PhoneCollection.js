"use strict";
define(['./Phone'],function(Phone){
	return Backbone.PageableCollection.extend({
		model: Phone,
		url: openbiz.apps.cubi.appUrl+'/me/phones',
		state: {
			pageSize: 3,
			sortKey: "number",
			order: 1
		}
	});
});