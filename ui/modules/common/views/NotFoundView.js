"use strict";
define(['text!templates/common/notFoundView.html'],
    function(templateData){
        return openbiz.View.extend({
            app: 'cubi',
            module:'common',
            name: 'notFoundView',
            el:'#main',
            events:{
              'click .menu-collapse' : 'menuCollapse'
            },
            initialize:function(){
                openbiz.View.prototype.initialize.call(this);
                this.template = _.template(templateData);
            },
            render:function(){
                $(this.el).html(this.template(this.locale));                
                openbiz.ui.update($(this.el));
                return this;
            },
            menuCollapse:function(event){
                event.preventDefault()
                $('nav#menu').trigger( 'open.mm' );
            },
        });
    }
);