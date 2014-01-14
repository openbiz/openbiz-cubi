"use strict";
define(['text!templates/me/setupWizardView.html',
    '../models/Me'],
    function(templateData,model){
        return openbiz.View.extend({
            app: 'cubi',
            module:'myaccount',
            name: 'dashboardView',
            el: '#main',
            model:model,
            events:{},
            subviews:{},
            initialize:function(){
                openbiz.View.prototype.initialize.call(this);
                this.template = _.template(templateData);
            },
            render:function(){
                $(this.el).html(this.template(this.locale));
                $(window).off('resize');
                openbiz.ui.update($(this.el));
                return this;
            },
            undelegateAllEvents:function(){
                console.log('I m going to undelegateAllEvents');
            }
        });
    });