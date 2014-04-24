'use strict';
module.exports = function(app){
    var self = function(){
        return app.getController(require('path').basename(module.filename,'.js')); 
    };
    return app.openbiz.Controller.extend({     
        create:function(req,res)
        {            
            var userModel = app.getModel.call(app,'User');
            var user = new userModel();
            var contactModel = app.getModel.call(app,'Contact');
            var contact = new contactModel(req.body.contact);

            contact.creator.id = user.id;
            user.creator.id = user.id;
            user.username = req.body.username;
            user.password = app.getModel.call(app,'User').encryptPassword(req.body.password);
            user.contact = contact.id;
            user.roles.push('cubi-user');

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
        checkUserInvitable:function(req,res){
            if(req.body.username == ""){
                res.send(406);
            }else{
                app.getModel.call(app,'User').findOne({username:req.body.username},{"username":true,"account":true},function(err,user){
                    if(user){                        
                        if(typeof user.account == "undefined"){
                            res.json(200,true);
                        }else{
                            res.json(200,false);
                        }                        
                    }else{
                        res.json(200,true);
                    }
                });
            }
        },
	    checkPassword:function(req, res){
            for(var i in req.body){
    		    if (req.user.password != app.getModel.call(app,'User').encryptPassword(req.body[i])) {
    			    res.json(200,false);
    		    }else{
    			    res.json(200,true);
    		    }
            }
	    },
        checkUsernameUnique:function(req,res)
        {            
            if(req.body.username == ""){
                res.send(406);
            }else{
                app.getModel.call(app,'User').findOne({username:req.body.username},"username",function(err,user){
                    if(user){
                        res.json(200,false);
                    }else{
                        res.json(200,true);
                    }
                });
            }
        },
        resetPasswordWithToken:function(req,res)
        {

        },
        responseResetPassword:function(req,res)
        {
			if(req.user.password == req.body.password){
				res.send(200);
			}else{
				req.user.password = app.getModel.call(app,'User').encryptPassword(req.body.password);
				req.user.save(function(err){
					if(err){
						res.json(500,{error:err});
					}else{
						res.send(200);
					}
				})
			}
        }
    });    
}