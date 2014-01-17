"use strict";
define(['./App'],function(App){
    return Backbone.Collection.extend({
        model: App,
        url: openbiz.apps.cubi.appUrl ? openbiz.apps.cubi.appUrl+'/apps' : null
    });
});