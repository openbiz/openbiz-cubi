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
        parse: function(resp, options) {
            if(resp.hasOwnProperty('locale')){
                resp.info.name = resp.locale.name;
                resp.info.description = resp.locale.description;
                var newRoles = [];
                if(resp.locale.hasOwnProperty('roles'))
                {
                    for(var i in resp.roles){
                        var role = resp.roles[i];
                        role.name = resp.locale.roles[role.id];
                        newRoles.push(role)
                    }
                    resp.roles = newRoles;
                }
            }
            if(resp.hasOwnProperty('require')){
                this.require = resp.require ;
            }
            if(resp.hasOwnProperty('menu')){
                this.menu = resp.menu ;
            }
            return resp;
        },
        constructor:function(){
            this.url = openbiz.apps.cubi.appUrl+'/apps';
            Backbone.Model.apply(this, arguments);
        }
    });
});