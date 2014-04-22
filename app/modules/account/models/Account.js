"use strict";
module.exports = function(app)
{
	var async = require('async');
	var mongoose = app.openbiz.mongoose;	
    var schema = new mongoose.Schema(
    app.openbiz.MetadataParser.call(app.openbiz,__filename.replace(/\.js$/i,'.json')),
    {
        versionKey: false,
        collection: 'cubi.account'
    });

	schema.statics.generateInvitationTokenCode = function(callback)
	{
		var self = this;
		var randomString = function (length) {
			var chars = '0123456789'.split('');
			if (! length) {
				length = Math.floor(Math.random() * chars.length);
			}
			var str = '';
			for (var i = 0; i < length; i++) {
				str += chars[Math.floor(Math.random() * chars.length)];
			}
			return str;
		}
		var checkTokenExist = function(){
			var token = "ACCT-"+randomString(4)+"-"+randomString(6);
			self.findOne({'invitations._id':token},function(err,account){
				if(err){
					callback(err,null);
				}else if(account){
					return checkTokenExist();
				}
				else{
					callback(null,token);
				}
			});
		}
		checkTokenExist();
	};
	schema.statics.removeExpiredCode = function(callback){
		var dateNow = parseInt(new Date().getTime());
		this.find(function(err,accounts){
			async.mapLimit(accounts,20,function(account,cb){
				var invitations = account.invitations;
				var hasChange = false;
				for(var i in invitations){
					var invitation = account.invitations[i];
					if(dateNow >= parseInt(invitation.expiredDate.getTime())){
						account.invitations.remove(invitation);
						hasChange = true;
					}
				}
				if(hasChange){
					account.save(function(err){
						cb(err,account);
					});
				}
				else{
					cb(null,account);
				}
			},function(err,results){
				callback(err,results);
			});
		});
	};

	return app.openbiz.db.model('cubi.account.Account', schema);
}