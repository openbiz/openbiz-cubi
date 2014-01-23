'use strict';
module.exports = function(app){
	//routes for my account
	return {
		"get /me"					                : [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
														app.getController("MeController").getMe ],
		"delete /me" 				                : [ app.getController("AuthController").logout ],
		"post /me/create-account"                   : [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
														app.getController("MeController").createAccount],
		"post /me/join-account"                     : [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
														app.getController("MeController").checkAccountNotExist,
													    app.getController("MeController").ensureInvitationToken,
													    app.getController("MeController").joinAccount],
		"post /me/account/check-invitation-token"   : [ app.getController("MeController").ensureInvitationToken,
														app.getController("MeController").checkInvitationToken],
		"post /me/account/check-unique"             : [ app.getController("MeController").checkAccountUnique],
		"post /me/account/create-invitation-token"  : [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
														app.getController("MeController").createInvitationToken]
//
//    // start default route rules for subDoc  - contacts
//    "post /me/contacts"			: [ openbiz.ensurePermission("cubi-myaccount-manage"),
//    openbiz.getController("cubi.me.MeController").createContact ],
//
//    "get /me/contacts"			: [ openbiz.ensurePermission("cubi-myaccount-manage"),
//    openbiz.getController("cubi.me.MeController").getContactCollection ],
//
//    "get /me/contacts/:id"		: [ openbiz.ensurePermission("cubi-myaccount-manage"),
//    openbiz.getController("cubi.me.MeController").getContact ],
//
//    "put /me/contacts/:id"		: [ openbiz.ensurePermission("cubi-myaccount-manage"),
//    openbiz.getController("cubi.me.MeController").updateContact ],
//
//    "delete /me/contacts/:id"	: [ openbiz.ensurePermission("cubi-myaccount-manage"),
//    openbiz.getController("cubi.me.MeController").deleteContact ],
//    // end routes  - contacts
//
//    "post /me/reset-password"	: [ openbiz.getController("cubi.me.MeController").resetPassword ],
//
//    "post /me/forget-password"	: [ openbiz.getController("cubi.me.MeController").requestResetPassword ]
	}
}