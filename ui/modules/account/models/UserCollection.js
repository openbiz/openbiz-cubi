"use strict";
define(['./User'],function(User){
    return Backbone.Collection.extend({
        model: User,
        url: openbiz.apps.cubi.appUrl ? openbiz.apps.cubi.appUrl+'/account/users' : null,        
    });
});