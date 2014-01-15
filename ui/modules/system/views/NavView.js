"use strict";
define(['text!templates/system/navView.html'],
    function(templateData){
        return openbiz.View.extend({
            app: 'cubi',
            module:'system',
            name: 'navView',
            el:'#wrapper div#nav',
            initialize:function(){
                openbiz.View.prototype.initialize.call(this);
                this.template = _.template(templateData);
            },
            render:function(){
                var self = this;
                this.locale.me = openbiz.session.me.toJSON();
                $(this.el).html(this.template(this.locale));
                $(this.el).fadeIn(function(){

                    //////////     TOUCH TO OPEN CANVAS MENU      //////////
                    var nav=document.getElementById("nav");
                    if(nav){
                        var wrapper= Hammer( nav );
                        wrapper.off("dragright");
                        wrapper.off("dragleft");
                        wrapper.on("dragright", function(event) {	// hold , tap, doubletap ,dragright ,swipe, swipeup, swipedown, swipeleft, swiperight
                            if((event.gesture.deltaY<=7 && event.gesture.deltaY>=-7) && event.gesture.deltaX >100){
                                $('nav#menu').trigger( 'open.mm' );
                            }
                        });
                        wrapper.on("dragleft", function(event) {
                            if((event.gesture.deltaY<=5 && event.gesture.deltaY>=-5) && event.gesture.deltaX <-100){
                                $('nav#contact-right').trigger( 'open.mm' );
                            }
                        });
                    }
                    openbiz.ui.update($(self.el));
                });
                return this;
            }
        });
    }
);