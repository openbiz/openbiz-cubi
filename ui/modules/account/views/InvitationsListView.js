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
		events:{
			"click .btn-record-add" 	: "showRecordAddView"
		},
		_metadata: openbiz.MetadataParser(metadata),
		initialize:function(){
			openbiz.GridView.prototype.initialize.call(this);
			this.template = _.template(templateData);
			this.collection = new dataCollection();
		},
		beforeRender:function(){
			console.log("before render");
		},
		afterRender:function(){
			console.log("after render");
		},
	    showRecordAddView:function(event){
	    	event.preventDefault();	 
	    	this.popupView('account.InvitationsNewView');
	    },	    
	    showRecordDeleteConfirm:function(event){	    	
	    	event.preventDefault();	   
	    	var self = this; 
	    	var recordId = $(event.currentTarget).attr('record-id');	    		
	    	bootbox.confirm({
	    		title:"Data delete confirmation",
	    		message:"<h2>"+recordId +"</h2> <br/> \
	    				You are about to delete this invitation: <br/> \
	    				Are you sure?",
				callback:function(result){
		    		if(result){
		    			self.collection.get(recordId).destroy({success:function(){
                            self.collection.fetch();
                        }});          
		    		}
		    	}
	    	});
	    }
	});
});