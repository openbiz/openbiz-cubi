"use strict";
define(['text!templates/account/invitationsNewPermissionView.html',
		'../models/Invitation'],
	function(templateData,model){
	return openbiz.View.extend({
		app: 'cubi',
        module:'account',
		name: 'invitationsNewPermissionView',
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
	        var output = this.locale;
	        output.user = $("body").data('newRecordData');
	        output.apps = this.app.views.get('account.InvitationsNewView').apps.toJSON();
        	this.$el  = $(this.template(output));
    		openbiz.ui.update(this.$el);
 	        return this;
	    },
	    saveRecord:function(event){
	    	event.preventDefault();
            var selectedRoles = [], self = this;
            $('.role-selection input[name="role"]').each(function(){
                if($(this).is(":checked")){
                    selectedRoles.push($(this).val());
                }
            });
            var data = $("body").data('newRecordData');
            data.roles = selectedRoles;
            var collection = this.app.views.get('account.InvitationsListView').collection;

            this.model.save(data,{success:function(){
                collection.fetch({success:function(){
                    self.$el.modal('hide');
                }});
            }});
	    }
	});
});