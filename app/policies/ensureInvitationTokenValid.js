'use strict';
module.exports = function(app){
	return function(req,res,next){
		var accountModel = app.getModel.call(app,'Account');	
		accountModel.findOne({'invitations._id':req.body.token.toString()},function(err,account){
			if(err){
				res.json(406,{error:err})
			}
			else if(account){
				var currentInvitation = account.invitations.id(req.body.token);				
				var date = parseInt(new Date().getTime());
				if(date < parseInt(currentInvitation.expiredDate.getTime())){
					//todo:未过期.返回 过期.删除
					currentInvitation.account = account;
					req.invitationToken = currentInvitation;
					next();
				}
				else{
					res.json(406,{error:{message:"invitation token has expired"}})
				}				
			}
			else{
				res.json(406,{error:{message:"invitation token not found"}})
			}
		});
	}
}