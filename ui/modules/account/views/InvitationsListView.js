"use strict";
define(['text!./invitationsListView.json',
		'text!templates/account/invitationsListView.html',
		'../models/InvitationCollection'
		/*CUSTOM_ELEMNT_CLASSES*/],
	function(metadata,templateData,dataCollection){
	return openbiz.GridView.extend({
		app: 'cubi',
        module:'account',
		name: 'invitationsListView',
		el: '#main',		
		collection: dataCollection,
		template : templateData,
		metadata: metadata,		
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
	    }
	});
});