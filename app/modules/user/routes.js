'use strict';
module.exports = function(app){	
    return {
    	"post /users" 		    		: [ app.getController("UserController").create ],
    	"post /users/login" 			: [ app.getController("AuthController").authenticate ],    	
        "post /users/logout" 			: [ app.getController("AuthController").logout ],
        "post /users/check-unique" 		: [ app.getController("UserController").checkUsernameUnique ],
        "post /users/check-invitable" 	: [ app.getController("UserController").checkUserInvitable ],
	    "post /users/check-password" 	: [ app.getController("UserController").checkPassword ],
	    "post /users/reset-password"    : [ app.getController("UserController").responseResetPassword]
    }
};