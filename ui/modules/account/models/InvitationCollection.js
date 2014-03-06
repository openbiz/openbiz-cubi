"use strict";
define(['./Invitation'],function(Invitation){
    return Backbone.PageableCollection.extend({
        model: Invitation,
        url: openbiz.apps.cubi.appUrl ? openbiz.apps.cubi.appUrl+'/account/invitations' : null,    
        state: {
		    pageSize: 3,
		    sortKey: "expiredDate",
		    order: 1
		}
    });
});