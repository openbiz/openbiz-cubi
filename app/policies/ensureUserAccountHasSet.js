'use strict';
module.exports = function(req,res,next){
	if(typeof req.user.account == 'undefined')
	{
		res.json(405,{error:{message:'User account has not set yet'}});
	}
	else
	{
		next();
	}	
}