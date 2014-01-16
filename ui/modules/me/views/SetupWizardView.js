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
                "click .btn-next"           :   "onFormSubmit",
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
                var self = this;
                $(this.el).find('button[type="submit"]')
                    .attr('disabled','disabled')
                    .removeClass('btn-theme');
                $(this.el).find('.form-join-company input[name="token"]').attr("parsley-remote",this.app.appUrl+'/me/account/check-invitation-token');
                $(this.el).find('.form-create-company input[name="name"]').attr("parsley-remote",this.app.appUrl+'/me/account/check-unique');
                $(this.el).find('.form-join-company').slideUp(0).parsley('addListener',{
                    onFormValidate:function(isValid,event,ParsleyForm)
                    {   
                        if(isValid){
                            event.preventDefault();
                            self.onJoinAccount.call(self,event);
                        }
                    }
                });
                $(this.el).find('.form-create-company').slideUp(0).parsley('addListener',{
                    onFormValidate:function(isValid,event,ParsleyForm)
                    {   
                        if(isValid){
                            event.preventDefault();
                            self.onCreateAccount.call(self,event);
                        }
                    }
                });
                
            },
            onFormSubmit:function(event){
                event.preventDefault();
                if($(this.el).find('.choose-mode input[value="create"]').is(":checked")){
                    $(this.el).find('.form-create-company').parsley('validate');
                }else{
                    $(this.el).find('.form-join-company').parsley( 'validate' );
                }
            },
            onJoinAccount:function(event){
                var token = $(this.el).find('input[name="token"]').val().toUpperCase();
                this.model.joinAccount(token,function(isSuccessed){
                    if(isSuccessed == true)
                    {

                    }
                });
            },
            onCreateAccount:function(event){
                var account = {
                    name: $(this.el).find('input[name="name"]').val(),
                    info: {
                        website: $(this.el).find('input[name="website"]').val(),
                    }
                }
                this.model.createAccount(account,function(isSuccessed){
                    if(isSuccessed == true)
                    {

                    }
                });
            }
        });
    });