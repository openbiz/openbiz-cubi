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
		grid: null,
		paginator:null,
		events:{
			"click .btn-record-delete" 	: "showRecordDeleteConfirm" ,
			"click .btn-record-add" 	: "showRecordAddView"
		},				
		initialize:function(){			
			var self = this;
			openbiz.View.prototype.initialize.call(this); 			
	        this.template = _.template(templateData);
	        this.collection = new dataCollection();
	        // this.collection.on('sync',function(){
	        // 	var output = self.locale;
	        // 	output.invitations = self.collection.models;
	        // 	$(self.el).html(self.template(output));
	        // 	$(self.el).find('.pagination').bootstrapPaginator({
         //    		currentPage: 3,
         //    		totalPages: 10
        	// 	});	        	
	        // 	openbiz.ui.update($(self.el));
	        // })
    	},
    	renderDataGrid:function(){
    		var columns = [
	    		{
	    			name: "_id",
	    			label: "Token",
	    			cell: "String"
	    		},
				{
	    			name: "data.contact.name.displayName",
	    			label: "User",
	    			cell: "String"
	    		},	
				{
	    			name: "data.username",
	    			label: "Email",
	    			cell: "String"
	    		},	    		    
				{
	    			name: "expiredDate",
	    			label: "Expiry Date",
	    			cell: "Date"
	    		},
    		];
    		this.grid = new Backgrid.Grid({
    			columns:columns,
    			collection: this.collection
    		})
    		$(this.el).find('.data-grid').append(this.grid.render().el);
			this.paginator = new Backgrid.Extension.Paginator({			  
				windowSize: 10, 
				slideScale: 0.5, 
				goBackFirstOnSort: true, 
				collection: this.collection,
				cssClass:'pagination'
			});
			$(this.el).find('.data-grid').append(this.paginator.render().el);
    		this.collection.fetch();
    		openbiz.ui.update($(this.el));
    	},
		render:function(){	    			
	        $(window).off('resize');
	        $(this.el).html(this.template(this.locale)); 
	        openbiz.ui.update($(this.el));       	
	        this.renderDataGrid();
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