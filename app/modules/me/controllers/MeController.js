'use strict';
module.exports = function(app){
	var self = function(){
		return app.getController(require('path').basename(module.filename,'.js'));
	};
	return app.openbiz.ModelController.extend({
		model:app.getModel('User'),
		createAccount:function(req,res){
			var accounttModel = app.getModel.call(app,'Account');
			var account = new accounttModel(req.body);
			account.users.push({id:req.user.id,role:"administrator"});
			account.contacts.push(req.user);
			account.creator = {id:req.user.id};
			account.save(function(err){
				if(err){
					res.json({error:err},500);
				}else{
					var user = req.user;
					user.roles.push("cubi-account-manage");
					req.user = user;
					user.save(function(error){
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
		checkAccountNotExist:function(req,res,next){
			var accounttModel = app.getModel.call(app,'Account');
			accounttModel.findOne({'users.id':req.user.id},function(err,account){
				if(err){
					res.json(500,{error:err});
				}
				else if (account){
					res.send(405);
				}
				else{
					next();
				}
			});
		},
		ensureInvitationToken:function(req,res,next){
			var accounttModel = app.getModel.call(app,'Account');
			accounttModel.findOne({'invitations.code':req.body.token},function(err,account){
				if(err){
					req.invitationToken = null;
					req.account = null;
					req.error = err;
					next();
				}
				else if(account){
					req.invitationToken = req.body.token;
					req.account = account;
					req.error = null;
					next();
				}
				else{
					req.invitationToken = null;
					req.account = null;
					req.error = null;
					next();
				}
			});
		},
		joinAccount:function(req,res){
			//TODO: do something
			//add user to the account and setup something
			if(!req.invitationToken || !req.account){
				if(req.error){
					res.json(500,{error:req.error});
				}
				else{
					res.send(404);
				}
				return;
			}
			var account = req.account;
			account.users.push({id:req.user.id});
			for(var i in account.invitations){
				var invitation = account.invitations[i];
				if(invitation.code == req.invitationToken){
					account.invitations.remove(invitation);
					break;
				}
			}
			account.save(function(err){
				if(err){
					res.json(500,{error:err});
				}else{
					var user = req.user;
					user.roles.push("cubi-account-access");
					req.user = user;
					user.save(function(error){
						if(error){
							res.json({error:err},500);
						}
						else{
							res.json(200,account);
						}
					});
				}
			});
		},
		checkInvitationToken:function(req,res){
			if(!req.invitationToken || !req.account || req.error){
				res.json(200,false);
				return;
			}
			var account = req.account;
			var currentInvitation;
			for(var i in account.invitations){
				var invitation = account.invitations[i];
				if(invitation.code == req.body.token){
					currentInvitation = invitation;
				}
			}
			if(!currentInvitation){
				res.json(200,false);
				return;
			}
			var date = parseInt(new Date().getTime());
			if(date < parseInt(currentInvitation.expiredDate.getTime())){//未过期.返回 过期.删除
				res.json(200,true);
			}
			else{
				res.json(200,false);
			}
		},
		createInvitationToken:function(req,res){
			var accounttModel = app.getModel.call(app,'Account');
			accounttModel.createInvitationToken(function(err,token){
				if(err){
					res.json(500,{error:err});
				}
				else{
					accounttModel.findOne({'creator.id':req.user.id},function(err,account){
						if(err){
							res.json(500,{error:err});
						}
						else if (account){
							var dateTimestamp = parseInt(new Date().getTime()) + app.config.invitation.defaultExpiry;
							var expiredDate = new Date(dateTimestamp);
							account.invitations.push({code:token,expiredDate:expiredDate});
							account.save(function(err){
								if(err){
									res.json(500,{error:err});
								}else
								{
									res.json(201,{token:token});
								}
							});
						}
						else{
							res.send(405);//创建者不是公司管理员 无权创建 return 405 method not allowed
						}
					});
				}
			});
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
		getMe: function(req, res)
		{
			res.json(200,req.user.getOutput());
		},
		getContacts: function(req, res)
		{

		}
	});
}