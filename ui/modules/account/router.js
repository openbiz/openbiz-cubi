"use strict";
define(function(){
	return openbiz.Router.extend({		
		app: openbiz.apps.cubi?openbiz.apps.cubi:'cubi',
		views:{
		},
		routes:{
			"!/backend/account/applications" 	: "showApplications",
            "!/backend/account/members"       	: "showMembers",
            "!/backend/account/profile"         : "showProfile",
            "!/backend/account/billing"         : "showBilling"
		},		
		initialize:function(){			
			openbiz.Router.prototype.initialize.call(this);
			this.me = new me();
		},		
        showApplications:function(){
            this.renderView("account.ApplicationsView");
        },
        showMembers:function(){
            this.renderView("account.MembersView");
        },
        showProfile:function(){
            this.renderView("account.ProfileView");
        },
        showBilling:function(){
            this.renderView("account.BillingView");
        }
	});
});