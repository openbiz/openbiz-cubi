'use strict';
module.exports = function(app){
    var self = function(){
        return app.getController(require('path').basename(module.filename,'.js')); 
    };
    return app.openbiz.ModelController.extend({     
        model:app.getModel('User'),
        create:function(req,res)
        {            
            var user = new self().model();
            var contactModel = app.getModel.call(app,'Contact');
            var contact = new contactModel(req.body.contact);

            contact.creator.id = user.id;
            user.username = req.body.username;
            user.password = req.body.password;
            user.contact = contact.id;

            contact.save(function(err){
                if(err){
                    res.json(500,{error:err});
                    return;
                }else{
                    user.save(function(err){
                        if(err){
                            res.json(500,{error:err});
                            return;
                        }else{
                            res.json(201,{id: user.id});
                        }
                    });
                }
            });
        },
        checkUsernameDuplicate:function(req,res)
        {
            self().model.findOne({username:req.body.username},"username",function(err,user){
                if(user){
                    res.json(200,true);
                }else{
                    res.json(200,false);
                }
            });
        },
        resetPasswordWithToken:function(res,req)
        {

        },
        responseResetPassword:function(res,req)
        {

        }
    });
}