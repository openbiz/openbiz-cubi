"use strict";
define(['../me/models/Me'], function(me){
    return openbiz.MiddleWareRouter.extend({
        app: openbiz.apps.cubi?openbiz.apps.cubi:'cubi',
        me:null,
        middlewares:{
            "!/*any"                : "renderLayout",
            "!/user/*any"           : "renderUserUI",
            "!/backend/*ensureLogin": "ensureLogin",
            "!/backend/*any"	    : "renderBackendUI"
        },
        initialize:function(){
            openbiz.MiddleWareRouter.prototype.initialize.call(this);
            this.me = new me();
            this.stopListening(Backbone.history);
            this.listenTo(Backbone.history, 'dismissBackendUI', this.dismissBackendUI);
            this.listenTo(Backbone.history, 'dismissUserUI',    this.dismissUserUI);
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
        renderLayout:function(next){
            var view = this.app.views.get("system.LayoutView");
            if(view == null){
                this.renderView("system.LayoutView",function(){
                    next();
                });
            }else{
                next();
            }
        },
        renderUserUI:function(next){
            if(!$('body').hasClass('full-lg')){
                $("div#wrapper").animate({'margin-left':'0px'},function(){
                    $("div#wrapper div#main").animate({'margin-left':'0px'},function(){
                        $('body').addClass('full-lg');
                        next();
                    })
                });
            }else{
                next();
            }

        },
        dismissUserUI:function(next){
            if($('body').hasClass('full-lg')){
                $("div#wrapper").animate({'margin-left':'50px'},function(){
                    $("div#wrapper div#main").animate({'margin-left':'250px'},function(){
                        $('body').removeClass('full-lg');
                        next();
                    })
                });
            }else{
                next();
            }
        },
        renderBackendUI:function(next){
            var self = this;
            var renderHeaderView = function(){
                var done = function(view){
                    if($(view).attr('renderred')!='true'){                        
                        $(view).attr('renderred','true');
                        if(!$(view).is(":visible")){
                            $(view).hide();
                            $(view).css('top','-'+ $(view).height() +'px');
                            $(view).show();
                            $(view).animate({'top':'0px'},function(){
                                self.trigger('headerViewRenderred');
                            })
                        }else{
                            self.trigger('headerViewRenderred');
                        }
                    }else{
                        self.trigger('headerViewRenderred');
                    }
                };
                if(!self.app.views.isRenderred("system.HeaderView")){
                    self.app.views.render("system.HeaderView",function(view){
                        done(view.$el);
                    });
                }else{
                    done(self.app.views.get("system.HeaderView").delegateEvents().$el);
                }
            };

            var renderNavView = function(){
                var done = function(view){                    
                    if($(view).attr('renderred')!='true'){                        
                        $(view).attr('renderred','true');
                        if($( window ).width()>=991){                                                                                                     
                            $(view).show();
                            $(view).css('left','0px');  
                            $("div#wrapper div#main").css('margin-left','0px');  
                            $("div#wrapper div#main").animate({'margin-left':'250px'},function(){    
                                $("div#wrapper div#main").css('margin-left','');  
                                $('body').removeClass('full-lg');                                                  
                                $("div#wrapper").css('margin-left',''); 
                                self.trigger('navViewRenderred');
                            });                            
                                
                        }else{
                            $('body').removeClass('full-lg');
                            $(view).show();
                            self.trigger('navViewRenderred');
                        }
                    }else{
                        $('body').removeClass('full-lg');
                        self.trigger('navViewRenderred');
                    }
                };
                if(!self.app.views.isRenderred("system.NavView")){
                    self.app.views.render("system.NavView",function(view){
                        done(view.$el);
                    });
                }else{
                    done(self.app.views.get("system.NavView").delegateEvents().$el);
                }
            };

            var renderMenuView = function(){
                var done = function(view){
                    if($(view).attr('renderred')!='true'){
                        $(view).attr('renderred','true');
                        if($( window ).width()>=550){
                            $("nav#menu").hide();
                            $("nav#menu").css('left','0px');
                            $("nav#menu").show();
                            $("div#wrapper").animate({'margin-left':'50px'},function(){
                                self.trigger('menuViewRenderred');
                            });
                        }else{
                            var view = $("nav#menu");
                            $(view).show();
                            self.trigger('menuViewRenderred');
                        }
                    }else{
                        self.trigger('menuViewRenderred');
                    }
                };
                if(!self.app.views.isRenderred("system.MenuView")){
                    self.app.views.render("system.MenuView",function(view){
                        done(view.$el);
                    });
                }else{
                    done(self.app.views.get("system.MenuView").delegateEvents().$el);
                }
            };

            var renderContactView = function(){
                var done = function(view){
                    if($(view).attr('renderred')!='true'){
                        $(view).attr('renderred','true');
                        $("nav#contact-right").show();
                        $(view).show();
                    }
                    self.trigger('contactViewRenderred');

                };
                if(!self.app.views.isRenderred("system.ContactRightView")){
                    self.app.views.render("system.ContactRightView",function(view){
                        done(view.$el);
                    });
                }else{
                    //self.trigger('contactViewRenderred');
                    done(self.app.views.get("system.ContactRightView").delegateEvents().$el);
                }
            };

            self.once('startRenderBackendUI',function(){
                renderHeaderView();
            });

            self.once('headerViewRenderred',function(){
                renderMenuView();
                renderContactView();
            });

            self.once('menuViewRenderred',function(){
                renderNavView();
            });

            self.once('navViewRenderred',function(){
                next();
            });

            self.trigger('startRenderBackendUI');

        },
        dismissBackendUI:function(next){
            var self = this;
            var dismissHeaderView = function(){
                var done = function(view){
                    $(view).attr('renderred','false');
                    $(view).animate({'top':'-'+$(view).height()+'px'},function(){
                        $(view).hide();
                        self.trigger('headerViewDismissed');
                    })
                };
                if(!self.app.views.isRenderred("system.HeaderView")){
                    self.trigger('headerViewDismissed');
                }else{
                    done(self.app.views.get("system.HeaderView").undelegateEvents().$el);
                }
            };

            var dismissNavView = function(){
                var done = function(view){
                    $(view).attr('renderred','false');
                    if($(view).css("visibility")=='visible'){
                        $("div#wrapper div#main").animate({'margin-left':'0px'},function(){
                            $(view).fadeOut(function(){
                                $(view).removeClass("nav-collapse-out").removeClass("none");
                                $("#main").removeClass("nav-collapse-out").removeClass("none");
                                self.trigger('navViewDismissed');
                            });
                        });
                    }else{
                        self.trigger('navViewDismissed');
                    }
                };
                if(!self.app.views.isRenderred("system.NavView")){
                    self.trigger('navViewDismissed');
                }else{
                    done(self.app.views.get("system.NavView").undelegateEvents().$el);
                }
            };

            var dismissMenuView = function(){
                var done = function(view){
                    $(view).attr('renderred','false');
                    if($(view).css("visibility")=='visible'){
                        $("div#wrapper").animate({'margin-left':'0px'},function(){
                            $(view).fadeOut(function(){
                                self.trigger('menuViewDismissed');
                            });
                        })
                    }else{
                        self.trigger('menuViewDismissed');
                    }
                };
                if(!self.app.views.isRenderred("system.MenuView")){
                    self.trigger('menuViewDismissed');
                }else{
                    done(self.app.views.get("system.MenuView").undelegateEvents().$el);
                }
            };

            var dismissContactView = function(){
                var done = function(view){
                    $(view).attr('renderred','false');
                    if($('nav#contact-right').hasClass('mm-opened')){
                        $('nav#contact-right').removeClass("mm-opened");
                        setTimeout(function(){ //wait close mm menu
                            self.trigger('contactViewDismissed');
                        },500);
                    }else{
                        $('nav#contact-right').hide();
                        $(view).hide();
                        self.trigger('contactViewDismissed');
                    }
                };
                if(!self.app.views.isRenderred("system.ContactRightView")){
                    self.trigger('ContactViewDismissed');
                }else{
                    done(self.app.views.get("system.ContactRightView").undelegateEvents().$el);
                }
            };

            var dismissMainView = function(){
                $('#main').slideUp(function(){
                    self.trigger('mainViewDismissed');
                })
            };

            self.once('dismissBackendUI',function(){
                dismissMenuView();
            });

            self.once('menuViewDismissed',function(){
                dismissNavView();
                dismissContactView();
            });

            self.once('navViewDismissed',function(){
                dismissMainView();
            });

            self.once('mainViewDismissed',function(){
                dismissHeaderView();
            });

            self.once('headerViewDismissed',function(){
                next();
            });
            self.trigger('dismissBackendUI');

        }
    });
});