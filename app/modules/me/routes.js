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

		"put /me"                           		: [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
													    app.getController("MeController").updateMe],
		

		// "get /me/phones"                            : [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
		// 											    app.getController("MeController").getMyPhones],

		// "post /me/phones"                           : [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
		// 									     	   	app.getController("MeController").createMyPhone],

		// "put /me/phones/:id"                        : [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
		// 											    app.getController("MeController").updateMyPhone],

		// "delete /me/phones/:id"                     : [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
		// 											    app.getController("MeController").deleteMyPhone],

		// "get /me/addresses"                         : [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
		// 										        app.getController("MeController").getMyAddresses],

		// "post /me/addresses"                        : [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
		// 										   	    app.getController("MeController").createMyAddress],

		// "put /me/addresses/:id"                     : [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
		// 												app.getController("MeController").updateMyAddress],

		// "delete /me/addresses/:id"                  : [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
		// 												app.getController("MeController").deleteMyAddress],

		// "get /me/emails"                            : [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
		// 												app.getController("MeController").getMyEmails],

		// "post /me/emails"                           : [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
		// 										    	app.getController("MeController").createMyEmail],

		// "put /me/emails/:id"                        : [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
		// 												app.getController("MeController").updateMyEmail],

		// "delete /me/emails/:id"                     : [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
		// 				                                app.getController("MeController").deleteMyEmail]

		// "post /me/upload"                            : [ require('connect-multiparty')({ uploadDir: require('path').join(__dirname,'public','upload','_tmp') }),
		// 												app.openbiz.ensurePermission("cubi-myaccount-manage"),
		// 												app.getController("MeController").onUpload]
	}
}