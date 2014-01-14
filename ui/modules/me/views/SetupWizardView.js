"use strict";
define(['text!templates/me/setupWizardView.html',
    '../models/Me'],
    function(templateData,model){
        return openbiz.View.extend({
            app: 'cubi',
            module:'me',
            name: 'setupWizardView',
            el: '#main',
            model:model,
            subviews:{},
            initialize:function(){
                openbiz.View.prototype.initialize.call(this);
                this.template = _.template(templateData);
            },
            render:function(){
                $(this.el).html(this.template(this.locale));
                $(window).off('resize');
                openbiz.ui.update($(this.el));
                this.setupFormWizard();
                return this;
            },
            setupFormWizard:function(){
                $(this.el).find('form.wizard-step').bootstrapWizard({
                    tabClass:"nav-wizard",
                    onTabShow: function(tab, navigation, index) {
                        tab.prevAll().addClass('completed');
                        tab.nextAll().removeClass('completed');
                        if(tab.hasClass("active")){
                            tab.removeClass('completed');
                        }
                        var $total = navigation.find('li').length;
                        var $current = index+1;
                        var $percent = ($current/$total) * 100;
                        $('#rootwizard').find('.progress-bar').css({width:$percent+'%'});
                        $('#rootwizard').find('.wizard-status span').html($current+" / "+$total);
                    }
                });
            }
        });
    });