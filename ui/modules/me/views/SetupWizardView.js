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
                "click .btn-test"           :   "showAccountDetail",
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
            showAccountDetail:function(){
                var  btn=$(this.el).find('.btn-test'), panelBody=btn.closest(".panel"),
                    overlay=$('<div class="load-overlay"><div><div class="c1"></div><div class="c2"></div><div class="c3"></div><div class="c4"></div></div><span>Loading...</span></div>');
                btn.removeClass("btn-panel-reload").addClass("disabled")
                panelBody.append(overlay);
                overlay.css('opacity',1).fadeIn();
                this.app.require(["text!templates/me/setupWizardAccountDetailForm.html"],function(templateData){
                    console.log(templateData);
                    setTimeout(function(){
                        btn.removeClass("disabled").addClass("btn-panel-reload") ;
                        var template = _.template(templateData);
                        panelBody.hide();
                        panelBody.replaceWith(template({}));
                        openbiz.ui.update(panelBody);
                        panelBody.fadeIn(function(){
                            panelBody.find(overlay).fadeOut(function(){ $(this).remove() });
                        });
                    },1000);
                });
            },
            setupForm:function(){
                var self = this;
                $(this.el).find('button[type="submit"]')
                    .attr('disabled','disabled')
                    .removeClass('btn-theme');
                $(this.el).find('.form-join-company input[name="token"]').attr("parsley-remote",this.app.appUrl+'/me/account/check-invitation-token');
                $(this.el).find('.form-create-company input[name="name"]').val(openbiz.session.me.get('contact').company).attr("parsley-remote",this.app.appUrl+'/me/account/check-unique');
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
                        website:            $(this.el).find('input[name="website"]').val(),
                        address:{
                            country:        $(this.el).find('input[name="address-country"]').val(),
                            province:       $(this.el).find('input[name="address-province"]').val(),
                            city:           $(this.el).find('input[name="address-city"]').val(),
                            street:         $(this.el).find('input[name="address-street"]').val(),
                            zipcode:        $(this.el).find('input[name="address-zipcode"]').val()
                        },
                        phone:{
                            countryCode:    $(this.el).find('input[name="phone-country-code"]').val(),
                            areaCode:       $(this.el).find('input[name="phone-area-code"]').val(),
                            number:         $(this.el).find('input[name="phone-number"]').val()
                        }
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