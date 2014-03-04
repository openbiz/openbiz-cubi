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

		"put /me"                                   : [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
													    app.getController("MeController").updateContact],

		"get /me/phones"                            : [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
													    app.getController("MeController").getMyPhones],

		"post /me/phones"                           : [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
											     	   	app.getController("MeController").createMyPhone],

		"put /me/phone/:id"                         : [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
													    app.getController("MeController").updateMyPhone],

		"delete /me/phone/:id"                      : [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
													    app.getController("MeController").deleteMyPhone],

		"get /me/addresses"                         : [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
												        app.getController("MeController").getMyAddresses],

		"post /me/addresses"                         : [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
												   	    app.getController("MeController").createMyAddress],

		"put /me/address/:id"                       : [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
														app.getController("MeController").updateMyAddress],

		"delete /me/address/:id"                    : [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
														app.getController("MeController").deleteMyAddress]
	}
}