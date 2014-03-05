"use strict";
define(['text!templates/account/invitationsNewView.html',
		'../models/Invitation'],
	function(templateData,model){
	return openbiz.View.extend({
		app: 'cubi',
        module:'account',
		name: 'invitationsNewView',
		el: '',
		model: model,
		events:{
            "click .btn-save-record" : "saveRecord"
		},			
		initialize:function(){			
			this.model = new model();
			this.template = _.template(templateData);
			openbiz.View.prototype.initialize.call(this);
    	},
		render:function(){	 
			var self = this;       			
	        var output = self.locale;
	        this.$el = $(self.template(output));
        	this._localizeAddUserForm();            
        	openbiz.ui.update(this.$el);
 	        return this;
	    },
        saveRecord:function(event){
            event.preventDefault();
            var self = this;
            if(!this._validateForm())return;
            if(self.locale.nameFormat[0]=='firstName'){
                var displayName = $('.form-add-record').find('#inputLastName').val() + $('.form-add-record').find('#inputFirstName').val();
            }else{
                var displayName = $('.form-add-record').find('#inputLastName').val() + $('.form-add-record').find('#inputFirstName').val();
            }
            var newRecord = {
                username: $('.form-add-record').find('#inputEmail').val(),
                contact:{
                    name:{
                        firstName:      $('.form-add-record').find('#inputFirstName').val(),
                        lastName:       $('.form-add-record').find('#inputLastName').val(),
                        displayName:    displayName
                    },
                    company: openbiz.session.me.get('account').name,
                    title:   $('.form-add-record').find('input:radio[name="title"]#title-mr').is(":checked")?'Mr.':'Ms.',
                    emails:[{
                        category:   'Default',
                        email:      $('.form-add-record').find('#inputEmail').val()
                    }],
                    phones:[{
                        type:       'mobile',
                        category:   'Default',
                        countryCode:$('.form-add-record').find('#inputMobileCountryCode').val(),
                        number:     $('.form-add-record').find('#inputMobileNumber').val()
                    }]
                }
            };
            $("body").data('newRecordData',newRecord);
            this.$el.modal('hide');

            var self = this;
            this.app.require(['modules/system/models/AppCollection'],function(model){
                var appCollection = new model();
                appCollection.fetch({success:function(){
                    self.apps = appCollection;
                    self.popupView('account.InvitationsNewPermissionView');
                }})                
            });
            
            
        },
        _validateForm:function(){
            this.$el.find('.form-add-record').find('#inputEmail').attr("parsley-remote",this.app.appUrl+'/users/check-unique');
            return this.$el.find('.form-add-record').parsley('validate');
        },
	    _localizeAddUserForm:function(){
            var nameElems = {
                firstName :$('.form-add-record').find('#inputFirstName'),
                lastName : $('.form-add-record').find('#inputLastName')
            };
            var nameRootElem = nameElems.firstName.parent();
            nameRootElem.html('');
            for(var i in this.locale.nameFormat){
                var elem = nameElems[this.locale.nameFormat[i]];
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
        }
	});
});