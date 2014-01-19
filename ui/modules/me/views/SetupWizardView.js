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
            modals:{},
            events:{
                "click .btn-next"           :   "onFormSubmit",
                "click .btn-test-join"      :   "showAccountDetailView",
                "click .btn-test-create"    :   "showAppSelectorView",
                "click .btn-test-invite"    :   "showUserInvitationView",
                "click .btn-add-user"       :   "showAddUserView",
                "click .btn-done"           :   "gotoDashboard",
                "ifChecked .choose-mode"    :   "showJoinCompanyForm"
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
            gotoDashboard:function(event){
                event.preventDefault();
                this.undelegateEvents();
                Backbone.history.navigate("#!/backend/dashboard", {trigger: true, replace: true});
            },
            showJoinCompanyForm:function(event){
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
            //* 处理用户添加逻辑的表单 开始 *//
            showAddUserView:function(event){
                var self = this;
                event.preventDefault();
                $('body').modalmanager('loading');
                this.app.require(["text!templates/me/userAddModalView.html"],function(templateData){
                    var template = _.template(templateData);
                    var $modal = $(template(self.locale.addUserView));
                    $modal.modal();
                    self.localizeAddUserForm();
                    openbiz.ui.update($modal);
                    $modal.find('.form-add-user section.login').slideDown(0);
                    $modal.find('.form-add-user .user-add-mode').off('ifChecked');
                    $modal.find('.form-add-user .user-add-mode').on('ifChecked', self.switchUserAddMode);
                    $modal.find('.form-add-user').find('#inputEmail').attr("parsley-remote",self.app.appUrl+'/users/check-unique');
                    $modal.find('.form-add-user').parsley();
                    $modal.find('.form-add-user').parsley('addListener', {
                        onFormValidate: function ( isFormValid, event, ParsleyForm ) {
                            event.preventDefault();
                            if(isFormValid){
                                if(self.locale.addUserView.nameFormat[0]=='firstName'){
                                    var displayName = $('.form-add-user').find('#inputLastName').val() + $('.form-add-user').find('#inputFirstName').val();
                                }else{
                                    var displayName = $('.form-add-user').find('#inputLastName').val() + $('.form-add-user').find('#inputFirstName').val();
                                }
                                var newUserData = {
                                    mode: $('.form-add-user .user-add-mode input[value="invite-user"]').is(":checked")?'invite-user':'create-user',
                                    username: $('.form-add-user').find('#inputEmail').val(),
                                    password: $('.form-add-user').find('#inputPassword').val(),
                                    contact:{
                                        name:{
                                            firstName: 		$('.form-add-user').find('#inputFirstName').val(),
                                            lastName: 		$('.form-add-user').find('#inputLastName').val(),
                                            displayName: 	displayName
                                        },
                                        company: $('.form-add-user').find('#inputCompany').val(),
                                        title:   $('.form-add-user').find('input:radio[name="title"]#title-mr').is(":checked")?'Mr.':'Ms.',
                                        emails:[{
                                            category: 	'Default',
                                            email: 		$('.form-add-user').find('#inputEmail').val()
                                        }],
                                        phones:[{
                                            type: 		'mobile',
                                            category: 	'Default',
                                            countryCode:$('.form-add-user').find('#inputMobileCountryCode').val(),
                                            number: 	$('.form-add-user').find('#inputMobileNumber').val()
                                        }]
                                    }
                                };
                                if($('.form-add-user .user-add-mode input[value="invite-user"]').is(":checked"))
                                {
                                    delete newUserData.password;
                                }
                                $(self.el).data('newUserData',newUserData);
                                self.showAddUserPermissionView(event);
                            }
                        }
                    });
                    self.modals.addUserModal = $modal;
                });

            },
            switchUserAddMode:function(event){
                var self = this;
                event.preventDefault();
                if($('.form-add-user .user-add-mode input[value="invite-user"]').is(":checked")){
                    $('.form-add-user section.login').slideUp();
                    $('.form-add-user').parsley( 'removeItem', '#inputPassword' );
                    $('.form-add-user').parsley( 'removeItem', '#inputRepeatPassword' );
                }else{
                    $('.form-add-user section.login').slideDown();
                    $('.form-add-user').parsley( 'addItem', '#inputPassword' );
                    $('.form-add-user').parsley( 'addItem', '#inputRepeatPassword' );
                }
            },
            showAddUserPermissionView:function(event){
                var self = this;
                event.preventDefault();
                var  btn=$(".form-add-user button[type='submit']"), panelBody=btn.closest(".modal"),
                    overlay = openbiz.ui.loader
                btn.removeClass("btn-panel-reload").addClass("disabled")
                panelBody.append(overlay);
                overlay.css('opacity',1).fadeIn();
                this.app.require(["text!templates/me/userPermissionModalView.html"],function(templateData){
                    setTimeout(function(){
                        btn.removeClass("disabled").addClass("btn-panel-reload") ;
                        var template = _.template(templateData);
                        panelBody.off('hidden.bs.modal');
                        panelBody.on('hidden.bs.modal',function(){
                            var $modal = $(template({}));
                            $modal.modal();
                            openbiz.ui.update(panelBody);
                        });
                        panelBody.modal('hide');
                    },500);
                });
            },
            localizeAddUserForm:function(){
                var nameElems = {
                    firstName :$('.form-add-user').find('#inputFirstName'),
                    lastName : $('.form-add-user').find('#inputLastName')
                };
                var nameRootElem = nameElems.firstName.parent();
                nameRootElem.html('');
                for(var i in this.locale.addUserView.nameFormat){
                    var elem = nameElems[this.locale.addUserView.nameFormat[i]];
                    switch(parseInt(i))
                    {
                        case 0:
                            elem.css({'margin-right':'2%'});
                            break;
                        case 1:
                            elem.css({'margin-right':'0%'});
                            break;
                    }
                    nameRootElem.append(elem);
                }
            },
            //* 处理用户添加逻辑的表单 结束 *//

            showAccountDetailView:function(event){
                var self = this;
                event.preventDefault();
                var  btn=$(this.el).find(event.currentTarget), panelBody=btn.closest(".panel"),
                    overlay = openbiz.ui.loader
                btn.removeClass("btn-panel-reload").addClass("disabled")
                panelBody.append(overlay);
                overlay.css('opacity',1).fadeIn();
                this.app.require(["text!templates/me/setupWizardAccountDetailForm.html"],function(templateData){
                    setTimeout(function(){
                        btn.removeClass("disabled").addClass("btn-panel-reload") ;
                        var template = _.template(templateData);
                        panelBody.hide();
                        panelBody.replaceWith(template({}));
                        openbiz.ui.update(panelBody);
                        panelBody.fadeIn(function(){
                            panelBody.find(overlay).fadeOut(function(){ $(this).remove() });
                        });
                    },500);
                });
            },
            showAppSelectorView:function(event){
                event.preventDefault();
                var self = this;
                var  btn=$(this.el).find(event.currentTarget), panelBody=btn.closest(".panel"),
                    overlay = openbiz.ui.loader
                btn.removeClass("btn-panel-reload").addClass("disabled")
                panelBody.append(overlay);
                overlay.css('opacity',1).fadeIn();
                this.app.require(['modules/system/models/AppCollection'],function(AppCollection){
                   var apps = new AppCollection();
                   apps.fetch({
                       success:function(){
                           self.app.require(["text!templates/me/setupWizardAppSelectorForm.html"],function(templateData){
                               setTimeout(function(){
                                   btn.removeClass("disabled").addClass("btn-panel-reload") ;
                                   var template = _.template(templateData);
                                   panelBody.hide();
                                   self.locale.apps = apps.toJSON();
                                   panelBody.replaceWith(template(self.locale));
                                   openbiz.ui.update(panelBody);
                                   panelBody.fadeIn(function(){
                                       panelBody.find(overlay).fadeOut(function(){ $(this).remove() });
                                   });
                               },500);
                           });
                       }
                   });
                });
            },
            showUserInvitationView:function(event){
                var self = this;
                event.preventDefault();
                var  btn=$(this.el).find(event.currentTarget), panelBody=btn.closest(".panel"),
                    overlay = openbiz.ui.loader
                btn.removeClass("btn-panel-reload").addClass("disabled")
                panelBody.append(overlay);
                overlay.css('opacity',1).fadeIn();
                this.app.require(["text!templates/me/setupWizardUserInvitationForm.html"],function(templateData){
                    setTimeout(function(){
                        btn.removeClass("disabled").addClass("btn-panel-reload") ;
                        var template = _.template(templateData);
                        panelBody.hide();
                        panelBody.replaceWith(template({}));
                        openbiz.ui.update(panelBody);
                        panelBody.fadeIn(function(){
                            panelBody.find(overlay).fadeOut(function(){ $(this).remove() });
                        });
                    },500);
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
                };
                this.model.createAccount(account,function(isSuccessed){
	                console.log(isSuccessed);
                    if(isSuccessed == true)
                    {

                    }
                });
            }
        });
    });