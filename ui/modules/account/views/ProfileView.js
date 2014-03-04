"use strict";
define(['text!templates/account/profileView.html',
		'../models/Account'],
	function(templateData,accountModel){
	return openbiz.View.extend({
		app: 'cubi',
        module:'account',
		name: 'profileView',
		el: '#main',
		events:{
			'click .btn-save':'saveRecord'
		},			
		model: new accountModel(),
		initialize:function(){			
			openbiz.View.prototype.initialize.call(this); 			
	        this.template = _.template(templateData);
    	},
		render:function(){	
			var self = this;
			this.model.fetch({success:function(){
				self.locale.account = self.model;
		        $(self.el).html(self.template(self.locale));
		        $(window).off('resize');
	        	openbiz.ui.update($(self.el));
        	}});
 	        return this;
	    },
	    saveRecord:function(){
	    	if(!this._validateForm()) return;
	    	var self = this;
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
            this.model.save(account,{
            	success:function(){
            		bootbox.alert({
			    		title:"Data notification",
			    		message:"<h2>Data has been saved</h2>"						
			    	});
			    	//update UI company name
			    	self.app.views.get('system.NavView').updateAccountNameDisplay(account.name);
            	}
        	});
	    },
	    _validateForm:function(){
			return $(this.el).find('.form-profile').parsley('validate');
	    }
	});
});