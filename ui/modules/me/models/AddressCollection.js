"use strict";
define(['./Address'],function(Address){
	return Backbone.PageableCollection.extend({
		model: Address,
		url: openbiz.apps.cubi.appUrl+'/me/addresses',
		state: {
			pageSize: 3,
			sortKey: "zipcode",
			order: 1
		}
	});
});