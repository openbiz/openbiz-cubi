"use strict";
define(['text!templates/system/menuView.html'],
    function(templateData){
        return openbiz.View.extend({
            app: 'cubi',
            module:'system',
            name: 'menuView',
            el:'#wrapper nav#menu',
            initialize:function(){
                openbiz.View.prototype.initialize.call(this);
                this.template = _.template(templateData);
            },
            loadAppsMenu:function(){
                this.app.require(['modules/system/models/AppCollection'],function(AppCollection){  
                    var apps = new AppCollection();                  
                    apps.fetch({success:function(){                        
                        for(var i in apps.models){
                            var app = apps.models[i];
                            if(app.hasOwnProperty('menu')){                                
                                app.menu.render();
                            }
                        }
                    }});
                });
            },
            render:function(){
                $(this.el).html(this.template(this.app.locale.headerView));
                if(!this.app.views.isRenderred("system.MenuView")){
                    $(document).data('menu',$('nav#menu').html());
                    $('nav#menu').mmenu({
                        searchfield   :  true,
                        slidingSubmenus	: true
                    },
                    {
                        pageSelector:'div#wrapper'
                    }).on( "closing.mm", function(){
                        console.log("closing me ");
                        // var highest=$(this).find("ul.mm-highest");
                        // highest.find(".mm-subclose").trigger('click');
                        // setTimeout(function () { closeSub() }, 200);
                        // function closeSub(){
                        //     var nav=$('nav#menu');
                        //     if(nav.hasClass("mm-vertical")){
                        //         nav.find("li").each(function(i) {
                        //             $(this).removeClass("mm-opened");
                        //         });
                        //     }else{
                        //         nav.find("ul").each(function(i) {
                        //             if(i==0){
                        //                 $(this).removeClass("mm-subopened , mm-hidden").addClass("mm-current");
                        //             }else{
                        //                 $(this).removeClass("mm-opened , mm-subopened , mm-current  , mm-highest").addClass("mm-hidden");
                        //             }
                        //         });
                        //     }
                        // }
                    });
                    //////////     TOGGLE  OPEN LEFT CANVAS MENU      //////////
                    if($("body div.toggle-menu").length==0){
                        $("body").append('<div class="toggle-menu"/>');
                    }
                    $('body').off("click");
                    $('body').on("click",".toggle-menu",function( e ) {
                        e.stopImmediatePropagation();
                        e.preventDefault();
                        $('nav#menu').trigger( 'open.mm' );
                    });
                    this.loadAppsMenu();
                }
                openbiz.ui.update($(this.el));
                return this;
            },
            updateMenu:function(){
                var self = this;                
                $(document).data('menu',this.template());
                $('nav#menu').html(this.template());
                openbiz.session.me.fetch({success:function(){
                    self.app.require(['modules/system/models/AppCollection'],function(AppCollection){
                            var apps = new AppCollection();
                            apps.fetch({success:function(){
                                async.mapSeries(openbiz.loadedApps,
                                    function(app,callback){
                                        openbiz.apps[app].require(['./menu/main'],function(menu){
                                            var menu = new menu();
                                            menu.render();
                                            callback(null,true);
                                        });
                                    },
                                    function(err,result){
                                        openbiz.ui.update($(self.el));
                                    }
                                )                                                       
                            }});
                        });
                    }});
            }
        });
    }
);