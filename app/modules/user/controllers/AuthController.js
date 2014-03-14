'use strict';
module.exports = function(app){
    var self = function(){
        return app.getController(require('path').basename(module.filename,'.js')); 
    };
    var passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy;  

    passport.use(new LocalStrategy(
        function(username, password, done) {
         app.getModel.call(app,'User').findOne({username:username}).populate('contact').populate('account').exec(function(err,user){            
            if (err) { return done(err); }
            if (!user) {
              return done(null, false);
            }
            if (user.password != app.getModel.call(app,'User').encryptPassword(password)) {
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
      app.getModel.call(app,'User').findOne({_id:id}).populate('contact').populate('account').exec(function(err,user){
        done(err, user);
      });
    });
        
    return app.openbiz.Controller.extend({     
        authenticate:function(req,res,next){
            passport.authenticate('local',function(err,user,info){
                if (err) { return next(err); }
                if (!user) { return res.send(401); }
                req.logIn(user, function(err) {
                    if (err) { return next(err); }
                    user.recordLoginAction(req.ip);
                    return res.json(200,user.getOutput());
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