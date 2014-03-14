'use strict';
module.exports = function(app){
	return app.openbiz.Controller.extend({
		getCurrentAccount:function(req,res){
			var output = req.user.account.toJSON();
			delete output.invitations;			
			res.send(200, output);
		},
		updateCurrentAccount:function(req,res){
			if(typeof req.body.name!='undefined')req.user.account.name = req.body.name;
			if(typeof req.body.info!='undefined')req.user.account.info = req.body.info;
			req.user.account.save(function(err){
				res.send(204);
			});
		},
		installApps:function(req,res)
		{		
			// sample payload data	
			// ['dss','openbiz-cubi']
			for(var i in req.body){
				if(!req.user.account.apps.id(req.body[i])){
					console.log("install : ");
					console.log(req.body[i]);
					req.user.account.apps.push({
						_id 	: 	req.body[i],
						setting : 	{}
					});
				}
			}			 
			req.user.account.save(function(err){
				res.send(201);
			});
		},
		createUser:function(req,res){
			// sample payload data
			// {
			// 	"username":"jixian@123.com",
			// 	"password":"jixian",
			// 	"contact":{
			// 		"name":{
			// 			"firstName":"王",
			// 			"lastName":"吉贤测试",
			// 			"displayName":"王吉贤测试"
			// 		},
			// 		"title":"mr",
			// 		"emails":{
			// 			"category":"default",
			// 			"email":"jixian@openbiz.me"
			// 		}
			// 	}
			// }	
            var userModel 	 = app.getModel.call(app,'User');
            var contactModel = app.getModel.call(app,'Contact');
            
            var contact 	 = new contactModel(req.body.contact);
            var user  		 = new userModel();

            contact.creator.id = req.user.id;
            contact.company = req.user.account.name;
            user.username = req.body.username;
            user.password = userModel.encryptPassword(req.body.password);
            user.contact = contact.id;
            user.account = req.user.account.id;
            if(req.body.roles.length>0){
            	user.roles = req.body.roles;
            }
            var defaultRole = 'cubi-user';
         	if(user.roles.indexOf(defaultRole) == -1){
         		user.roles.push(defaultRole);            	
         	}         	
        	
            user.creator.id = req.user.id;

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
                        	req.user.account.users.push({_id:user.id})
                        	req.user.account.save(function(){
                        		res.json(201,{id: user.id});	
                        	});                            
                        }
                    });
                }
            });			
		},
		inviteUser:function(req,res){	
			//sample payload	
			// {
			// 	"username":"jixian@123.com",
			// 	"contact":{
			// 		"name":{
			// 			"firstName":"王",
			// 			"lastName":"吉贤测试",
			// 			"displayName":"王吉贤测试"
			// 		},
			// 		"title":"mr",
			// 		"emails":{
			// 			"category":"default",
			// 			"email":"jixian@openbiz.me"
			// 		}
			// 	},
			// 	"roles":[
			// 		"cubi-user",
			// 		"dss-normal-user"
			// 	]
			// }
			var accountModel = app.getModel.call(app,'Account');
			accountModel.generateInvitationTokenCode(function(err,token){
				if(err){
					res.json(500,{error:err});
				}
				else{
					var dateTimestamp = parseInt(new Date().getTime()) + app.config.invitation.defaultExpiry;
					var expiredDate = new Date(dateTimestamp);
					req.user.account.invitations.push({
						_id:token,
						expiredDate:expiredDate,
						data:req.body
					});
					req.user.account.save(function(err){
						if(err){
							res.json(500,{error:err});
						}
						else
						{
							res.json(201,{token:token});
						}
					});					
				}
			});
		},
		getInvitationTokens:function(req,res){
			var results = app.openbiz.services.ArrayPaginator(req.user.account.invitations,req.query);
			res.json(200,results);
		},
		getInvitationToken:function(req,res){
			res.json(200,req.user.account.invitations.id(req.params.id.toUpperCase()));
		},
		deleteInvitationToken:function(req,res)
		{
			if(req.user.account.invitations.id(req.params.token)){
				req.user.account.invitations.id(req.params.token).remove()
				req.user.account.save(function(){
					res.send(204);
				});
			}else{
				res.send(404);
			}
		},
		getUsers:function(req,res){
			req.user.account.populate('users._id',function(err,account){
				account.populate({path:'users._id.contact',model:'cubi.contact.Contact'},function(err,account){
					var output = [];
					for(var i = 0 ; i < account.users.length; i++){
						var user = {
							_id:account.users[i]._id._id,
							user:account.users[i]._id.getOutput(),
							role:account.users[i].role
						};
						output.push(user);					
					}
					var results = app.openbiz.services.ArrayPaginator(output,req.query);
					res.json(200,results);
				})
			});
		},
		removeUser:function(req,res)
		{
			if(req.params.id == req.user.id)
			{
				res.send(406,{error:{message:'You cannot delete yourself from account'}})
			}
			else{
				if(req.user.account.users.id(req.params.id)){
					req.user.account.users.id(req.params.id).remove()
					req.user.account.save(function(){
						var userModel = app.getModel.call(app,'User');
						userModel.findOne({'_id':req.params.id},function(err,user){
							user.account =undefined;
							user.save(function(){
								res.send(204);
							});						//delete that user unset its account setting

						});
					});
				}else{
					res.send(404);
				}
			}
		},
		updateUserRoles:function(req,res)
		{
			req.user.roles = req.body.roles;
			req.user.save(function(err,user){
				if(err){
					res.send(500,{error:err})
				}
				else{
					res.send(204);
				}
			});
		},
		checkAccountUnique:function(req,res){			
			var accountModel = app.getModel.call(app,'Account');
			accountModel.findOne({'name':req.body.name},function(err,account){
				if(err){
					res.json(200,false);
				}
				else if(account){
					res.json(200,false);
				}
				else{
					res.json(200,true);
				}
			});
		},
		checkInvitationToken:function(req,res){
			//sample payload
			//{"token":"ACCT-9541-658171"}

			//if call this functions means its already passed token validation middleware
			if(req.invitationToken){
				res.json(200,true);
			}
		}
	});
}