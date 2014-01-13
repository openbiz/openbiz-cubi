"use strict";
define(['text!templates/system/layoutView.html'],
    function(templateData){
        return openbiz.View.extend({
            app: 'cubi',
            name: 'layoutView',
            el:'#wrapper',
            initialize:function(){
                openbiz.View.prototype.initialize.call(this);
                this.template = _.template(templateData);
            },
            render:function(){
                //openbiz.View.prototype.initialize.call(this);
                $(this.el).html(this.template(this.locale));
                this.afterViewRenderred();
                return this;
            },
            afterViewRenderred:function(){
                var throbber = new Throbber({  size: 32, padding: 17,  strokewidth: 2.8,  lines: 12, rotationspeed: 0, fps: 15 });
                throbber.appendTo(document.getElementById('canvas_loading'));
                throbber.start();
                $(this.el).find('div#header').hide();
                $(this.el).find('div#nav').hide();
                $(this.el).find('div#menu').hide();
            },
            hideLoading:function(){
                $(this.el).find('div#loading-top').hide();
                return this;
            }
        });
    }
);