"use strict";
define(function(){
	return openbiz.Router.extend({		
		app: openbiz.apps.cubi?openbiz.apps.cubi:'cubi',
		views:{
		},
		routes:{
			"!/backend/account/applications" 	: "showApplications",
            "!/backend/account/members"       	: "showMembers",
            "!/backend/account/invitations"     : "showInvitations",
            "!/backend/account/invitations/:id" : "showInvitationDetail",
            "!/backend/account/profile"         : "showProfile",
            "!/backend/account/billing"         : "showBilling"
		},		
		initialize:function(){			
			openbiz.Router.prototype.initialize.call(this);
		},		
        showApplications:function(){
            this.renderView("account.ApplicationsListView");
        },
        showInvitations:function(){
            this.renderView("account.InvitationsListView");
        },
        showInvitationDetail:function(id){                        
            this.renderView("account.InvitationsDetailView",arguments);
        },
        showMembers:function(){
            this.renderView("account.MembersListView");
        },
        showProfile:function(){
            this.renderView("account.ProfileView");
        },
        showBilling:function(){
            this.renderView("account.BillingListView");
        }
	});
});