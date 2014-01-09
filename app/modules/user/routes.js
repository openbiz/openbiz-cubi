'use strict';
module.exports = function(app){
    return {
        "post /users" 		    : [ app.getController("UserController").create ]       
    }
}