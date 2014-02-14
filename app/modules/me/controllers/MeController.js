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
							res.json({error:error},500);
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
								var output=req.invitationToken.toJSON();
								output.account = {
									info: account.info,
									name: account.name,
									role: 'member',
									apps: account.apps
								};
								res.json(200,output);
							}
						});
					});
				}
			});
		},		
		getMe: function(req, res)
		{
			res.json(200,req.user.getOutput());
		}
	});
}