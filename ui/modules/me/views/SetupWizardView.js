"use strict";
define(['text!templates/me/setupWizardView.html',
        '../models/Me',
        '../../account/models/Account',
        '../../account/models/User',
        '../../account/models/UserCollection',
        '../../account/models/Invitation',
        '../../account/models/InvitationCollection'
        ],
    function(templateData,
            me,
            account,
            user,
            userCollection,
            invitation,
            invitationCollection
            ){
        return openbiz.View.extend({
            app: 'cubi',
            module:'me',
            name: 'setupWizardView',
            el: '#main',                    
            models:{
                me                  : new me(),
                account             : new account(),
                user                : new user(),
                userCollection      : new userCollection(),
                invitation          : new invitation(),
                invitationCollection: new invitationCollection()
            },
            modals:{},
            events:{
                "click .btn-next"           :   "onFormSubmit",
                "click .btn-test-join"      :   "showAccountDetailView",
                "click .btn-test-create"    :   "showAppSelectorView",
                "click .btn-test-invite"    :   "showUserInvitationView",
                "click .btn-invite-users"   :   "showUserInvitationView",
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
                    $modal.find('.form-add-user .user-add-mode').on('ifChecked', function(event){self.switchUserAddMode.call(self,event)});
                    $modal.find('.form-add-user').find('#inputEmail').attr("parsley-remote",self.app.appUrl+'/users/check-unique');
                    $modal.find('.form-add-user').parsley();
                    $modal.find('.form-add-user').parsley('addListener', {
                        onFormValidate: function ( isFormValid, event, ParsleyForm ) {
                            if(event)event.preventDefault();
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
                    $('.form-add-user').find('#inputEmail').parsley('updateConstraint',{
                        remote:self.app.appUrl+'/users/check-invitable'                                                
                    },self.locale.addUserView.validation.emailNotInvitable);
                }else{
                    $('.form-add-user section.login').slideDown();
                    $('.form-add-user').parsley( 'addItem', '#inputPassword' );
                    $('.form-add-user').parsley( 'addItem', '#inputRepeatPassword' );
                    $('.form-add-user').find('#inputEmail').parsley('updateConstraint',{
                        remote: self.app.appUrl+'/users/check-unique'                        
                    },self.locale.addUserView.validation.emailDuplicated);
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
                            self.locale.userPermissionView.user = $(self.el).data('newUserData');
                            self.locale.userPermissionView.apps = self.selectedApps;
                            var $modal = $(template(self.locale.userPermissionView));
                            $modal.modal();
                            $modal.find(".btn-add-permission-done").off("click");
                            $modal.find(".btn-add-permission-done").on("click",function(event){self.addUserSubmit.call(self,event,$modal)});
                            openbiz.ui.update(panelBody);
                        });
                        panelBody.modal('hide');
                    },500);
                });
            },
            addUserSubmit:function(event, modal){
                var self = this;
                event.preventDefault();
                var selectedRoles = [];
                $('.role-selection input[name="role"]').each(function(){                    
                    if($(this).is(":checked")){
                        selectedRoles.push($(this).val());
                    }
                });
                var data = $(self.el).data('newUserData');
                data.roles = selectedRoles;
                var toggleButtons = function(){
                    $(self.el).find(".btn-add-user").removeClass("btn-theme");
                    $(self.el).find(".btn-done").addClass("btn-theme").removeAttr("disabled");
                }

                var  btn=$(".form-add-user button[type='submit']"), panelBody=btn.closest(".modal"),
                    overlay = openbiz.ui.loader
                btn.removeClass("btn-panel-reload").addClass("disabled")
                panelBody.append(overlay);
                overlay.css('opacity',1).fadeIn();
                setTimeout(function(){
                    switch(data.mode){
                        case "invite-user":
                            self.models.invitationCollection.create(data,{success:function(){
                                self.models.invitationCollection.fetch({success:function(){
                                    modal.modal('hide');
                                    toggleButtons();
                                }});                            
                            }});                        
                            break;
                        case "create-user":
                            self.models.userCollection.create(data,{success:function(){
                                self.models.userCollection.fetch({success:function(){
                                    modal.modal('hide');
                                    toggleButtons();
                                }});                            
                            }});   
                            break;
                    }
                },500);
                
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

            showAccountDetailView:function(event,data){              
                var self = this;
                if(event) event.preventDefault();
                var  btn=$(this.el).find("button.btn-next"), panelBody=btn.closest(".panel"),
                    overlay = openbiz.ui.loader
                btn.removeClass("btn-panel-reload").addClass("disabled")
                panelBody.append(overlay);
                overlay.css('opacity',1).fadeIn();
                this.app.require(['modules/system/models/AppCollection'],function(AppCollection){
                    var apps = new AppCollection();
                    apps.fetch({
                        success:function(){
                            self.app.require(["text!templates/me/setupWizardAccountDetailForm.html"],function(templateData){
                                setTimeout(function(){
                                    btn.removeClass("disabled").addClass("btn-panel-reload") ;
                                    var template = _.template(templateData);
                                    panelBody.hide();
                                    data.installedApps = apps.toJSON();                                    
                                    panelBody.replaceWith(template({data:data}));
                                    openbiz.ui.update(panelBody);
                                    panelBody.fadeIn(function(){
                                        panelBody.find(overlay).fadeOut(function(){ $(this).remove() });
                                    });
                                },500);
                            });
                        }
                    });
                })
            },
            showAppSelectorView:function(event){
                if(event) event.preventDefault();
                var self = this;
                var  btn=$(this.el).find(".btn-next"), panelBody=btn.closest(".panel"),
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
                                   self.systemApps = apps.toJSON();                               
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
                var toggleButtons = function(){
                    if( self.models.userCollection.models.length>1 || 
                        self.models.invitationCollection.models.length>0
                        ){
                        //enable DONE button
                        $(self.el).find(".btn-add-user").removeClass("btn-theme");
                        $(self.el).find(".btn-done").addClass("btn-theme").removeAttr("disabled");
                    }else{
                        //disable DONE button
                        $(self.el).find(".btn-add-user").addClass("btn-theme");
                        $(self.el).find(".btn-done").removeClass("btn-theme").attr("disabled","disabled");
                    }
                }
                self.models.userCollection.off('sync');
                self.models.userCollection.on('sync',function(collection){                    
                    var template = _.template($(self.el).find('#user-list-template').html());
                    var data = {
                        me: openbiz.session.me.toJSON(),
                        users: collection.toJSON(),
                        locale:{}
                    }                                      
                    toggleButtons();
                    $(self.el).find("#user-list").html(template(data));
                    $(self.el).find("#user-list .btn-delete-record").off("click");
                    $(self.el).find("#user-list .btn-delete-record").on("click",function(event){
                        event.preventDefault();                        
                        var recordId = $(this).attr("record-id"); 
                        bootbox.confirm({
                            title:"User delete confirmation",
                            message:"<h2>"+self.models.userCollection.get(recordId).get('user').username +"</h2> <br/> \
                                    You are about to delete this user: <br/> \
                                    Are you sure?",
                            callback:function(result){
                                if(result){
                                    self.models.userCollection.get(recordId).destroy({success:function(){
                                        self.models.userCollection.fetch();
                                    }});          
                                }
                            }
                        });                     
                    });
                });
                self.models.invitationCollection.off('sync');
                self.models.invitationCollection.on('sync',function(collection){         
                    var template = _.template($(self.el).find('#invitation-list-template').html());
                    var data = {
                        invitations: collection.toJSON(),
                        locale:{}
                    }
                    toggleButtons();
                    $(self.el).find("#invitation-list").html(template(data));                    
                    $(self.el).find("#invitation-list .btn-delete-record").off("click");
                    $(self.el).find("#invitation-list .btn-delete-record").on("click",function(event){
                        event.preventDefault();                        
                        var recordId = $(this).attr("record-id");               
                        bootbox.confirm({
                            title:"Invitation delete confirmation",
                            message:"<h2>"+recordId +"</h2> <br/> \
                                    You are about to delete this Invitation: <br/> \
                                    Are you sure?",
                            callback:function(result){
                                if(result){
                                    self.models.invitationCollection.get(recordId).destroy({success:function(){
                                        self.models.invitationCollection.fetch();
                                    }});          
                                }
                            }
                        });                 
                    });
                });
                
                if(event) event.preventDefault();
                var selectedApps = [];
                self.selectedApps =[];
                $(this.el).find('.app-selection input[name="app"]').each(function(){                    
                    if($(this).is(":checked")){
                        selectedApps.push($(this).val());
                        for(var i in self.systemApps){
                            if (self.systemApps[i].name == $(this).val()){
                                self.selectedApps.push(self.systemApps[i]);
                                break;
                            }
                        }                                                
                    }
                });
                this.models.account.installApps(selectedApps,function(isSuccessed){
                    var  btn=$(self.el).find(event.currentTarget), panelBody=btn.closest(".panel"),
                        overlay = openbiz.ui.loader
                    btn.removeClass("btn-panel-reload").addClass("disabled")
                    panelBody.append(overlay);
                    overlay.css('opacity',1).fadeIn();
                    self.app.require(["text!templates/me/setupWizardUserInvitationForm.html"],function(templateData){
                        setTimeout(function(){
                            btn.removeClass("disabled").addClass("btn-panel-reload") ;
                            panelBody.hide();                            
                            var template = _.template($("<div>"+templateData+"</div>").find("#user-invitation-layout-template").html());
                            var rendered = template({});                            
                            rendered = $(rendered).append($("<div>"+templateData+"</div>").find("#user-list-template"));
                            rendered = $(rendered).append($("<div>"+templateData+"</div>").find("#invitation-list-template"));
                            panelBody.replaceWith(rendered);
                            openbiz.ui.update(panelBody);
                            panelBody.fadeIn(function(){
                                self.models.invitationCollection.fetch();
                                self.models.userCollection.fetch();
                                panelBody.find(overlay).fadeOut(function(){ $(this).remove() });
                            });
                        },500);95131209378
                    });
                });
            },
            setupForm:function(){
                var self = this;
                $(this.el).find('button[type="submit"]')
                    .attr('disabled','disabled')
                    .removeClass('btn-theme');
                $(this.el).find('.form-join-company input[name="token"]').attr("parsley-remote",this.app.appUrl+'/account/check-invitation-token');
                $(this.el).find('.form-create-company input[name="name"]').val(openbiz.session.me.get('contact').company).attr("parsley-remote",this.app.appUrl+'/account/check-unique');
                $(this.el).find('.form-join-company').slideUp(0).parsley('addListener',{
                    onFormValidate:function(isValid,event,ParsleyForm)
                    {   
                        if(isValid){
                          //  event.preventDefault();
                            self.onJoinAccount.call(self,event);
                        }
                    }
                });
                $(this.el).find('.form-create-company').slideUp(0).parsley('addListener',{
                    onFormValidate:function(isValid,event,ParsleyForm)
                    {   
                        if(isValid){
                          //  event.preventDefault();
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
                var self = this;
                this.models.me.joinAccount(token,function(isSuccessed,data){
                    console.log(isSuccessed);
                    console.log(data);
                    if(isSuccessed == true)
                    {
                        self.showAccountDetailView(event);
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
                var self = this;
                this.models.me.createAccount(account,function(isSuccessed){
                    if(isSuccessed == true)
                    {
                        self.showAppSelectorView(event);
                    }
                });
            }
        });
    });