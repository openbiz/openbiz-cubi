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
	    _localizeAddUserForm:function(){
            var nameElems = {
                firstName :$('.form-add-user').find('#inputFirstName'),
                lastName : $('.form-add-user').find('#inputLastName')
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