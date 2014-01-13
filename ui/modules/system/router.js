"use strict";
define( function(){
    return openbiz.MiddleWareRouter.extend({
        app: openbiz.apps.cubi?openbiz.apps.cubi:'cubi',
        middlewares:{
            "!/backend/*any"	: "renderBackendUI",
            "!/backend/test*any"	: "test",
            "!/backend/testf*any"	: "test2"
        },
        renderBackendUI:function(next){
            console.log('1 render backend UI');
            next();
        },
        test:function(next){
            console.log('2 its a test after render backend UI');
            next();
        },
        test2:function(next){
            console.log('3 its a test2 after test');
            next();
        }
    });
});