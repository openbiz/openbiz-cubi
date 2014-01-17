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
			account.users.push({id:req.user._id,role:"administrator"});
			account.contacts.push(req.user);
			account.creator = {id:req.user._id};
			account.save(function(err){
				console.log(err);
				if(err){
					res.json({error:err},500);
				}else{
					res.send(201,{id:account._id});
				}
			});
		},
		joinAccount:function(req,res){
			var accounttModel = app.getModel.call(app,'Account');
			accounttModel.findOne({'invitation.code':req.body.token},function(err,account){
				if(err){
					res.json(200,{error:err});
				}
				else if(account){
					//TODO: do something
					//add user to the account and setup something
					account.users.push({id:req.user._id});
					for(var invitation in account.invitation){
						if(invitation.code == req.body.token){
							account.invitation.remove(invitation);
							break;
						}
					}
					account.save();
  					res.json(200,true);
				}
				else{
					res.json(200,{error:""});
				}

			});
		},
		checkInvitationToken:function(req,res){
			var accounttModel = app.getModel.call(app,'Account');
			accounttModel.findOne({'invitation.code':req.body.token},function(err,account){
				if(err){
					res.json(200,false);
				}
				else if(account){
					res.json(200,true);
				}
				else{
					res.json(200,false);
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