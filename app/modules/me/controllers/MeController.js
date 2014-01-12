'use strict';
module.exports = function(app){
    return app.openbiz.ModelController.extend({     
        model:app.getModel('User'),
        
        getMe: function(req, res)
        {
            res.json(200,req.user.getOutput());
        },

        getContacts: function(req, res)
        {

        }
    });
}