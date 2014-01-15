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
            events:{
                "submit form.wizard-form"   :   "onFormSubmit",
                "ifChecked .choose-mode"    :   "showStep2"
            },
            initialize:function(){
                openbiz.View.prototype.initialize.call(this);
                this.template = _.template(templateData);
            },
            render:function(){
                $(this.el).html(this.template(this.locale));
                $(window).off('resize');
                this.setupForm();
                openbiz.ui.update($(this.el));
                return this;
            },
            showStep2:function(event){
                var self = this;

                $(this.el).find('button[type="submit"]')
                    .removeAttr('disabled')
                    .addClass('btn-theme');

                if($(self.el).find('.choose-mode input[value="create"]').is(":checked")){                                        
                    $(self.el).find('.form-join-company').slideUp(function(){                        
                        $(self.el).find('.form-create-company').slideDown();
                    });
                }else{                                      
                    $(self.el).find('.form-create-company').slideUp(function(){                        
                        $(self.el).find('.form-join-company').slideDown();
                    });
                }
            },
            setupForm:function(){
                $(this.el).find('button[type="submit"]')
                    .attr('disabled','disabled')
                    .removeClass('btn-theme');
                $(this.el).find('.form-join-company').slideUp(0);
                $(this.el).find('.form-create-company').slideUp(0);
            },
            onFormSubmit:function(event){
                event.preventDefault();
                var valid = $(this.el).find('.iCheck').parsley( 'validate' );
                console.log($(this.el).find('.iCheck'));
                console.log("is form valid",valid);
            }
        });
    });