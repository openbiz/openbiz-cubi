"use strict";
define(['text!templates/system/headerView.html'],
    function(templateData){
        return openbiz.View.extend({
            app: 'cubi',
            module:'system',
            name: 'headerView',
            el:'#wrapper #header',
            events:{
                'click .fullscreen'   : 'fullscreen',
                'click .nav-collapse' : 'navcollapse'
                //,'click .btn-logout'   : 'logout'
            },
            initialize:function(){
                openbiz.View.prototype.initialize.call(this);
                this.template = _.template(templateData);
            },
            render:function(){
                var self = this;
                this.locale.me = openbiz.session.me.toJSON();
                $(this.el).html(this.template(this.locale));
                openbiz.ui.update($(this.el));
                $(this.el).fadeIn(function(){
                    openbiz.ui.update($(self.el));
                });
                return this;
            },
            logout:function(event){
                event.preventDefault();
                Backbone.history.trigger('dismissBackendUI',function(){
                    openbiz.session.me.on('destroy',function(){
                        location.href="#!/user/login";
                    });
                    openbiz.session.me.destroy();
                })
            },
            navcollapse:function(event){
                if(this.app.views.isRenderred('system.NavView') == false){
                    return;
                }
                event.preventDefault()
                var main=$("#nav,#main")
                main.toggleClass( "nav-collapse-out" );
                if(!main.hasClass("nav-collapse-out")){
                    main.addClass("none");
                }
                setTimeout(function () { main.removeClass("none") }, 600);
            },
            fullscreen:function(event){
                event.preventDefault();
                this._toggleFullScreen();
                $(this).find("i").toggleClass( "fa-expand" );
                $(this).find("i").toggleClass( "fa-compress" );
            },
            _toggleFullScreen : function() {
                if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
                    if (document.documentElement.requestFullScreen) {
                        document.documentElement.requestFullScreen();
                    } else if (document.documentElement.mozRequestFullScreen) {
                        document.documentElement.mozRequestFullScreen();
                    } else if (document.documentElement.webkitRequestFullScreen) {
                        document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
                    }
                } else {
                    if (document.cancelFullScreen) {
                        document.cancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    }
                }
            }
        });
    }
);