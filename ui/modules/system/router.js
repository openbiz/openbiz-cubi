"use strict";
define( function(){
    return openbiz.MiddleWareRouter.extend({
        app: openbiz.apps.cubi?openbiz.apps.cubi:'cubi',
        middlewares:{
            "!/*any"            : "renderLayout",
            "!/user/*any"            : "renderUser",
            "!/backend/*any"	: "renderBackendUI"
        },
        renderUser:function(next){
            console.log("renderUser");
            var view = openbiz.views.get("system.HeaderView");
            if(view != null){
                this.removeView("system.HeaderView");
            }
            var view = openbiz.views.get("system.NavView");
            if(view != null){
                this.removeView("system.NavView");
            }
            var view = openbiz.views.get("system.MenuView");
            if(view != null){
                this.removeView("system.MenuView");
            }
            var view = openbiz.views.get("system.ContactRightView");
            if(view != null){
                this.removeView("system.ContactRightView");
            }
            next();
        },
        renderLayout:function(next){
            var view = openbiz.views.get("system.LayoutView");
            if(view == null){
                console.log("renderLayout");
                this.renderView("system.LayoutView");
            }
            next();
        },
        renderBackendUI:function(next){
            $('body').addClass('full-lg');
            var view = openbiz.views.get("system.HeaderView");
            if(view == null){
                console.log("HeaderView");
                this.renderView("system.HeaderView");
            }
            var view = openbiz.views.get("system.NavView");
            if(view == null){
                console.log("NavView");
                this.renderView("system.NavView");
            }
            var view = openbiz.views.get("system.MenuView");
            if(view == null){
                console.log("MenuView");
                this.renderView("system.MenuView");
            }
            var view = openbiz.views.get("system.ContactRightView");
            if(view == null){
                console.log("ContactRightView");
                this.renderView("system.ContactRightView");
            }
            next();
        }
    });
})