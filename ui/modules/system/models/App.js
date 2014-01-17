"use strict";
define(function(){
    return Backbone.Model.extend({
        url: openbiz.apps.cubi.appUrl?openbiz.apps.cubi.appUrl+'/apps':null,
        idAttribute: "name",
        defualts:{
            name    : null,
            roles   : [],
            appUrl  : null,
            baseUrl : null,
            info    : {}
        },
        constructor:function(){
            this.url = openbiz.apps.cubi.appUrl+'/apps';
            Backbone.Model.apply(this, arguments);
            this.on('sync',function(model,resp,options){
                openbiz.session.me = model;
            });
        }
    });
});