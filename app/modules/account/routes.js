'use strict';
module.exports = function(app){
    return {
        "post /accounts" 		: [ app.openbiz.ensurePermission("cubi-account-manage"),
                                    app.getController("AccountController").create],

        "get /accounts/:id"		: [ app.openbiz.ensurePermission("cubi-account-manage"),
                                    app.getController("AccountController").ensureExists,
                                    app.getController("AccountController").findById],

        "put /accounts/:id"		: [ app.openbiz.ensurePermission("cubi-account-manage"),
                                    app.getController("AccountController").ensureExists,
                                    app.getController("AccountController").update],

        "delete /accounts/:id"	: [ app.openbiz.ensurePermission("cubi-account-manage"),
                                    app.getController("AccountController").ensureExists,
                                    app.getController("AccountController").delete]
    }
}