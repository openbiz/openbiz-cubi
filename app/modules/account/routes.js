'use strict';
module.exports = function(app){
    return {
        // "post /accounts" 		: [ app.openbiz.ensurePermission("cubi-account-manage"),
        //                             app.getController("AccountController").create],

        // "get /accounts/:id"		: [ app.openbiz.ensurePermission("cubi-account-manage"),
        //                             app.getController("AccountController").ensureExists,
        //                             app.getController("AccountController").findById],

        // "put /accounts/:id"		: [ app.openbiz.ensurePermission("cubi-account-manage"),
        //                             app.getController("AccountController").ensureExists,
        //                             app.getController("AccountController").update],

        // "delete /accounts/:id"	: [ app.openbiz.ensurePermission("cubi-account-manage"),
        //                             app.getController("AccountController").ensureExists,
        //                             app.getController("AccountController").delete],
        
        "get /account"            :  [ app.getController("AccountController").getCurrentAccount ],

        "put /account"            :  [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
                                        app.getPolicy("ensureUserIsAccountAdministrator"),                                     
                                        app.getController("AccountController").updateCurrentAccount],


        //below routes for operate current users account
        "post /account/apps"                        : [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
                                                        app.getPolicy("ensureUserIsAccountAdministrator"),
                                                        app.getController("AccountController").installApps ],  

        //for account members
        "get /account/users"                        : [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
                                                        app.getPolicy("ensureUserIsAccountAdministrator"),
                                                        app.getController("AccountController").getUsers ],

        "post /account/users"                       : [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
                                                        app.getPolicy("ensureUserIsAccountAdministrator"),
                                                        app.getController("AccountController").createUser ],


        "delete /account/users/:id"                 : [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
                                                        app.getPolicy("ensureUserIsAccountAdministrator"),
                                                        app.getController("AccountController").removeUser ],

	    "put /account/users/:id"                    : [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
		                                                app.getPolicy("ensureUserIsAccountAdministrator"),
		                                                app.getController("AccountController").updateUserRoles ],

        //for invitations
        "get /account/invitations"                  : [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
                                                        app.getPolicy("ensureUserIsAccountAdministrator"),
                                                        app.getController("AccountController").getInvitationTokens ],
        
        "get /account/invitations/:id"              : [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
                                                        app.getPolicy("ensureUserIsAccountAdministrator"),
                                                        app.getController("AccountController").getInvitationToken ],
        
        "post /account/invitations"                  : [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
                                                        app.getPolicy("ensureUserIsAccountAdministrator"),
                                                        app.getController("AccountController").inviteUser ],  


        "delete /account/invitations/:token"        : [ app.openbiz.ensurePermission("cubi-myaccount-manage"),
                                                        app.getPolicy("ensureUserIsAccountAdministrator"),
                                                        app.getController("AccountController").deleteInvitationToken ],

        //methods for form validations
        "post /account/check-invitation-token"      : [ app.getPolicy("ensureInvitationTokenValid")(app),
                                                        app.getController("AccountController").checkInvitationToken ],

        "post /account/check-unique"                : [ app.getController("AccountController").checkAccountUnique ]

    }
}