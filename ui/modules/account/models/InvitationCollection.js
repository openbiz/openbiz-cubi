"use strict";
define(['./Invitation'],function(Invitation){
    return Backbone.Collection.extend({
        model: Invitation,
        url: openbiz.apps.cubi.appUrl ? openbiz.apps.cubi.appUrl+'/account/invitations' : null,        
    });
});