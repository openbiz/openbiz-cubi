'use strict';
module.exports = function(req,res,next){	
	if(req.user.getRoleInAccount() == 'administrator')
	{
		next();
	}else{
		res.json(405,{error:{message:'User is not an administrator of his account'}});	
	}
}