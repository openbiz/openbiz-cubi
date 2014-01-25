'use strict';
module.exports = function(app){
	//routes for my account
	return {
		"get /me"					                : [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
														app.getController("MeController").getMe ],

		"delete /me" 				                : [ app.getController("AuthController").logout ],

		"post /me/create-account"                   : [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
														app.getPolicy("ensureUserAccountNotSet"),
														app.getController("MeController").createAccount ],

		"post /me/join-account"                     : [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
														app.getPolicy("ensureUserAccountNotSet"),
													    app.getPolicy("ensureInvitationTokenValid")(app),
													    app.getController("MeController").joinAccount ],

		"post /me/account/create-user"  			: [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
														app.getPolicy("ensureUserIsAccountAdministrator"),
														app.getController("MeController").createUser ],
		
		"post /me/account/invite-user"  			: [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
														app.getPolicy("ensureUserIsAccountAdministrator"),
														app.getController("MeController").inviteUser ],														

		"get /me/account/invitations"				: [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
														app.getPolicy("ensureUserIsAccountAdministrator"),
														app.getController("MeController").getInvitationTokens ],

		"delete /me/account/invitations/:token"		: [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
														app.getPolicy("ensureUserIsAccountAdministrator"),
														app.getController("MeController").deleteInvitationToken ],

		//methods for form validations
		"post /me/account/check-invitation-token"   : [ app.getPolicy("ensureInvitationTokenValid")(app),
														app.getController("MeController").checkInvitationToken ],

		"post /me/account/check-unique"             : [ app.getController("MeController").checkAccountUnique ],


	}
}