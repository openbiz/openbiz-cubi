"use strict";
define(['text!templates/menu/accountMenuView.html'],
    function(templateData){
        return openbiz.Menu.extend({
            app: 'cubi',
            el:'nav#menu ul.system-menu',
            menu: 'account-menu',
            menuRoot: 'nav#menu',
            initialize:function(){
                openbiz.Menu.prototype.initialize.call(this);
                this.template = _.template(templateData);
            },
            render:function(){
                var self = this;
                var menuHtml = this.template(this.locale);                
                this.updateMenu(menuHtml);
                return this;
            }
        });
    }
);