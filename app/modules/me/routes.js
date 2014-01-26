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
													    app.getController("MeController").joinAccount ]

	}
}