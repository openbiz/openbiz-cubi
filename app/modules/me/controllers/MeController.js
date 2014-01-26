'use strict';
module.exports = function(app){
	return app.openbiz.ModelController.extend({
		createAccount:function(req,res){
			// Sample payload data
			// {
			//     "name": "Openbiz LLC",
			//     "info": {
			//             "website":"http://www.openbiz.me",
			//             "phone":{
			//                       "countryCode":"+86",
			//                       "areaCode":"010",
			//                       "number":"64955182"
			//              }
			//      }
			// }			
			var accounttModel = app.getModel.call(app,'Account');
			var account = new accounttModel(req.body);
			account.users.push({_id:req.user.id,role:"administrator"});
			account.contacts.push(req.user);
			account.creator = {id:req.user.id};
			account.save(function(err){
				if(err){
					res.json({error:err},500);
				}else{
					req.user.account = account.id;
					if(req.user.roles.indexOf("cubi-account-manager") === -1){
						req.user.roles.push("cubi-account-manager");
					}
					req.user.save(function(error){
						if(error){
							res.json({error:err},500);
						}
						else{
							res.send(201,{id:account._id});
						}
					});

				}
			});
		},		
		joinAccount:function(req,res){
			// sample payload data
			// {"token":"ACCT-6197-961027"}

			//if username is not matched then refuse to use
			if(req.user.username!=req.invitationToken.data.username){
				res.json(403,{error:{message:'This token is valid, but it is not for you.'}});
				return;
			}

			var account = req.invitationToken.account;			
			if(!account.users.id(req.user.id)){
				account.users.push({_id:req.user.id});
			}
			account.invitations.id(req.invitationToken._id).remove();
			account.save(function(err){
				if(err){
					res.json(500,{error:err});
				}else{
					var user = req.user;
					//apply roles from token data
					if(user.roles.indexOf("cubi-account-member")===-1){
						user.roles.push("cubi-account-member");
					}
					for( var i in req.invitationToken.data.roles){
						var roleName = req.invitationToken.data.roles[i];
						if(user.roles.indexOf(roleName)===-1)
						{
							user.roles.push(roleName);
						}
					}
					//update user contact info from token data
					user.account 			= req.invitationToken.account.id;
					user.contact.name 		= req.invitationToken.data.contact.name;
					user.contact.title 		= req.invitationToken.data.contact.title;
					user.contact.company 	= req.invitationToken.account.name;
					user.contact.save(function(){
						user.save(function(error){
							if(error){
								res.json({error:err},500);
							}
							else{
								res.json(200,req.invitationToken);
							}
						});
					});
				}
			});
		},
		installApps:function(req,res)
		{		
			// sample payload data	
			// ['dss','openbiz-cubi']
			for(var i in req.body){
				req.user.account.apps.push({_id:req.body[i]});
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
            user.roles.push('cubi-user');
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
			var accounttModel = app.getModel.call(app,'Account');
			accounttModel.generateInvitationTokenCode(function(err,token){
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
<<<<<<< HEAD
						else if (account){
							var dateTimestamp = parseInt(new Date().getTime()) + app.config.invitation.defaultExpiry;
							var expiredDate = new Date(dateTimestamp);
//							account.invitations.push({code:token,expiredDate:expiredDate,infomation:req.body});
							account.invitations.push({code:token,expiredDate:expiredDate});
							account.save(function(err){
								if(err){
									res.json(500,{error:err});
								}else
								{
									res.json(201,{token:token});
								}
							});
=======
						else
						{
							res.json(201,{token:token});
>>>>>>> 87ed1bb0e50810b8fe321a708d790f7b7e74a9b7
						}
					});					
				}
			});
		},
		getInvitationTokens:function(req,res){
			res.json(200,req.user.account.invitations);
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
		checkAccountUnique:function(req,res){			
			var accounttModel = app.getModel.call(app,'Account');
			accounttModel.findOne({'name':req.body.name},function(err,account){
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
		},
		getMe: function(req, res)
		{
			res.json(200,req.user.getOutput());
		}
	});
}