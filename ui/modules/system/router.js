"use strict";
define(['../me/models/Me'], function(me){
    return openbiz.MiddleWareRouter.extend({
        app: openbiz.apps.cubi?openbiz.apps.cubi:'cubi',
        me:null,
        middlewares:{
            "!/*any"            : "renderLayout",
            "!/user/*any"       : "renderUser",
            "!/backend/*ensureLogin": "ensureLogin",
            "!/backend/*any"	: "renderBackendUI"
        },
        initialize:function(){
            openbiz.MiddleWareRouter.prototype.initialize.call(this);
            this.me = new me();
        },
        ensureLogin:function(next){
            if(openbiz.session.hasOwnProperty('me') && openbiz.session.me.get('username')!=''){
                next();
            }else{
                this.me.fetch({
                    success:function(){
                        next();
                    },
                    error:function(){
                        Backbone.history.navigate("#!/user/login", {trigger: true, replace: true});
                    }
                });
            }
        },
        renderUser:function(next){
            var view = openbiz.views.get("system.HeaderView");
            if(view){
                $(view.el).slideUp(500);
            }
            var view = openbiz.views.get("system.NavView");
            if(view){
                $(view.el).slideUp(500);
            }
            var view = openbiz.views.get("system.MenuView");
            if(view){
                $(view.el).slideUp(500);
            }
            var view = openbiz.views.get("system.ContactRightView");
            if(view){
                $(view.el).slideUp(500);
            }
            setTimeout(next,500);
        },
        renderLayout:function(next){
            var view = openbiz.views.get("system.LayoutView");
            if(view == null){
                this.renderView("system.LayoutView");
            }
            $('body').addClass('full-lg');
            next();
        },
        renderBackendUI:function(next){
            $('body').removeClass('full-lg');
            var view = openbiz.views.get("system.HeaderView");
            if(view == null){
                this.renderView("system.HeaderView");
            }
            else{
                $(view.el).slideDown();
            }
            var view = openbiz.views.get("system.NavView");
            if(view == null){
                this.renderView("system.NavView");
            }
            else{
                $(view.el).slideDown();
            }
            var view = openbiz.views.get("system.MenuView");
            if(view == null){
                this.renderView("system.MenuView");
            }
            else{
                $(view.el).slideDown();
            }
            var view = openbiz.views.get("system.ContactRightView");
            if(view == null){
                this.renderView("system.ContactRightView");
            }
            else{
                $(view.el).slideDown();
            }
            next();
        }
    });
})