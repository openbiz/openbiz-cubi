"use strict";
define(['./User'],function(User){
    return Backbone.PageableCollection.extend({
        model: User,
        url: openbiz.apps.cubi.appUrl ? openbiz.apps.cubi.appUrl+'/account/users' : null,
	    state: {
		    pageSize: 10,
		    sortKey: "_id",
		    order: 1
	    }
    });
});