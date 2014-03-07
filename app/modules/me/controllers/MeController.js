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
			var accountModel = app.getModel.call(app,'Account');
			var account = new accountModel(req.body);
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
		},
		getContact: function(req, res){
			res.json(200,req.user.contact);
		},
		updateContact: function(req, res){
			var input = req.body;
			if(input.name){
				req.user.contact.name = input.name;
			}
			if(input.birthday){
				req.user.contact.birthday = input.birthday;
			}
			if(input.avator){
				req.user.contact.avator = input.avator;
			}
			req.user.contact.save(function(err){
				if(err){
					res.json(500,{error:err});
				}else{
					res.send(204);
				}
			});
		},
		getMyPhones: function(req, res){
			var results = app.openbiz.services.ArrayPaginator(req.user.contact.phones,req.query);
			res.json(200,results);
		},
		createMyPhone: function(req, res){
			req.user.contact.phones.push(req.body);
			req.user.contact.save(function(err){
				if(err){
					res.json(500,{error:err});
				}else{
					res.send(201,req.body);
//					res.send(204);
				}
			});
		},
		updateMyPhone: function(req, res){
			var phone = req.user.contact.phones.id(req.params.id);
			var input = req.body;
			phone.type = input.type;
			phone.category = input.category;
			phone.countryCode = input.countryCode;
			phone.number = input.number;
			req.user.contact.save(function(err){
				if(err){
					res.json(500,{error:err});
				}else{
					res.send(204);
				}
			});
		},
		deleteMyPhone: function(req, res){
			var phone = req.user.contact.phones.id(req.params.id);
			if(phone == null){
				res.send(304);
			}else{
				req.user.contact.phones.remove(phone);
				req.user.contact.save(function(err){
					if(err){
						res.json(500,{error:err});
					}else{
						res.send(204);
					}
				});
			}
		},
		createMyAddress: function(req, res){
			req.user.contact.address.push(req.body);
			req.user.contact.save(function(err){
				if(err){
					res.json(500,{error:err});
				}else{
					res.send(201,req.body);
				}
			});
		},
		getMyAddresses: function(req, res){
			res.json(200,req.user.contact.addresses);
		},
		updateMyAddress: function(req, res){
			var address = req.user.contact.addresses.id(req.params.id);
			var input = req.body;
			address.category = input.category;
			address.country = input.country;
			address.state = input.state;
			address.city = input.city;
			address.street = input.street;
			address.zipcode = input.zipcode;
			req.user.contact.save(function(err){
				if(err){
					res.json(500,{error:err});
				}else{
					res.send(204);
				}
			});
		},
		deleteMyAddress: function(req, res){
			var address = req.user.contact.addresses.id(req.params.id);
			if(address == null){
				res.send(304);
			}else{
				req.user.contact.addresses.remove(address);
				req.user.contact.save(function(err){
					if(err){
						res.json(500,{error:err});
					}else{
						res.send(204);
					}
				});
			}
		},
		getMyEmails: function(req, res){
			res.json(200,req.user.contact.emails);
		},
		createMyEmail: function(req, res){
			req.user.contact.emails.push(req.body);
			req.user.contact.save(function(err){
				if(err){
					res.json(500,{error:err});
				}else{
					res.send(201,req.body);
				}
			});
		},
		updateMyEmail: function(req, res){
			var email = req.user.contact.emails.id(req.params.id);
			var input = req.body;
			email.category = input.category;
			email.email = input.email;
			req.user.contact.save(function(err){
				if(err){
					res.json(500,{error:err});
				}else{
					res.send(204);
				}
			});
		},
		deleteMyEmail: function(req, res){
			var email = req.user.contact.emails.id(req.params.id);
			if(email == null){
				res.send(304);
			}else{
				req.user.contact.emails.remove(email);
				req.user.contact.save(function(err){
					if(err){
						res.json(500,{error:err});
					}else{
						res.send(204);
					}
				});
			}
		}
	});
}