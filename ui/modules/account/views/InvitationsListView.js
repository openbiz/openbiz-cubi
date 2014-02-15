"use strict";
define(['text!templates/account/invitationsListView.html',
		'../models/InvitationCollection'],
	function(templateData,dataCollection){
	return openbiz.View.extend({
		app: 'cubi',
        module:'account',
		name: 'invitationsListView',
		el: '#main',
		collection: dataCollection,
		events:{
			"click .btn-record-delete" 	: "showRecordDeleteConfirm" ,
			"click .btn-record-add" 	: "showRecordAddView"
		},			
		initialize:function(){			
			var self = this;
			openbiz.View.prototype.initialize.call(this); 			
	        this.template = _.template(templateData);
	        this.collection = new dataCollection();
	        this.collection.on('sync',function(){
	        	var output = self.locale;
	        	output.invitations = self.collection.models;
	        	$(self.el).html(self.template(output));
	        	openbiz.ui.update($(self.el));
	        })
    	},
		render:function(){	        
	        $(window).off('resize');	              
        	this.collection.fetch();
 	        return this;
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