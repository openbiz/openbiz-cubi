'use strict';
module.exports = function(app){
    return app.openbiz.ModelController.extend({
        _model: app.getModel('User')
        createAccount:function(req,res)
        {

        },
        resetPasswordWithToken:function(res,req){

        },
        responseResetPassword:function(res,req){

        }
    });
}