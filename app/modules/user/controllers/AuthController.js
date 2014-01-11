'use strict';
module.exports = function(app){
    var self = function(){
        return app.getController(require('path').basename(module.filename,'.js')); 
    };
    var passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy;
    
    var userInfoFilter = function(user){
       var result = user.toJSON();
       delete result.password;
       delete result.contact.creator;
       return result;
    }

    passport.use(new LocalStrategy(
        function(username, password, done) {
          self().model.findOne({username:username}).populate('contact').populate('account').exec(function(err,user){            
            if (err) { return done(err); }
            if (!user) {
              return done(null, false);
            }
            if (user.password != self().model.encryptPassword(password)) {
              return done(null, false);
            }            
            return done(null, user);
          });
        }
    ));

    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
      self().model.findOne({_id:id}).populate('contact').populate('account').exec(function(err,user){
        done(err, userInfoFilter(user));
      });
    });
    
    return app.openbiz.ModelController.extend({     
        model:app.getModel('User'),        
        authenticate:function(req,res,next){
            passport.authenticate('local',function(err,user,info){
                if (err) { return next(err); }
                if (!user) { return res.send(401); }
                req.logIn(user, function(err) {
                    if (err) { return next(err); }
                    user.recordLoginAction(req.ip);
                    return res.json(200,userInfoFilter(user));
                });
            })(req,res,next);
        },
        logout:function(req,res)
        {
            req.logout();
            res.send(200);
        }
    });
}