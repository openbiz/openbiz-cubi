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
            this.model.set('name', account.name );
            this.model.set('info', account.info );
            this.model.save({success:function(){
            	console.log('data saved');
            }});
	    },
	    _validateForm:function(){
			return $(this.el).find('.form-profile').parsley('validate');
	    }
	});
});