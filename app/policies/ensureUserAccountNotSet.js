'use strict';
module.exports = function(req,res,next){
	if(typeof req.user.account == 'undefined')
	{
		next();
	}
	else
	{
		res.json(405,{error:{message:'User account has already been set'}});
	}	
}