"use strict";
define( function(){
    return openbiz.MiddleWareRouter.extend({
        app: openbiz.apps.cubi?openbiz.apps.cubi:'cubi',
        middlewares:{
            "!/*any"            : "renderLayout",
            "!/user/*any"       : "renderUser",
            "!/backend/*any"	: "renderBackendUI"
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
            next();
        },
        renderBackendUI:function(next){
            $('body').addClass('full-lg');
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