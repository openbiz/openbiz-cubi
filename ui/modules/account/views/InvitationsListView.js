"use strict";
define(['text!./invitationsListView.json',
		'text!templates/account/invitationsListView.html',
		'../models/InvitationCollection'],
	function(metadata,templateData,dataCollection){
	return openbiz.GridView.extend({
		app: 'cubi',
        module:'account',
		name: 'invitationsListView',
		el: '#main',
		collection: dataCollection,
		template : templateData,
		metadata:  openbiz.MetadataParser(metadata),		
		events:{
			"click .btn-record-add" 	: "showRecordAddView"
		},		
		
		beforeRender:function(){},
		afterRender:function(){},

		beforeDeleteRecord:function(){},
		afterDeleteRecord:function(){},


	    showRecordAddView:function(event){
	    	event.preventDefault();	 
	    	this.popupView('account.InvitationsNewView');
	    },	    	    
		showRecordDetail:function(event){
			event.preventDefault();
			var self = this;
			var recordId = $(event.currentTarget).attr('record-id');
			var url = "#!/backend/account/invitations/" + recordId;
			Backbone.history.navigate(url, {trigger: true, replace: true});
		}
	});
});