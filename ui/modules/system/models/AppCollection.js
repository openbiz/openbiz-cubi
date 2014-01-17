"use strict";
define(['./App'],function(App){
    return Backbone.Collection.extend({
        model: App,
        url: openbiz.apps.cubi.appUrl ? openbiz.apps.cubi.appUrl+'/apps' : null,
        sync:function(method,model,options){
            switch(method){
                case 'read':
                    var success = options.success;
                    options.success = function(data,status,xhr){
                        if(_.isArray( data ) && data.length){
                            var loadedLocales = [];
                            data.forEach(function(app){
                                var appRequire = require.config({
                                    baseUrl:app.baseUrl,
                                    context:"appCollection"+app.name,
                                    paths:{
                                        'i18n'	: openbiz.baseUrl+'/vendor/require/plugins/i18n',
                                        'text'	: openbiz.baseUrl+'/vendor/require/plugins/text'
                                    },
                                    config:{
                                        i18n:{
                                            locale: 'zh-cn' //force to use this locale for test translation
                                        }
                                    }
                                });
                                appRequire(['i18n!./nls/locale'],function(locale){
                                    if(locale.hasOwnProperty('app')){
                                        app.locale = locale.app;
                                    }
                                    loadedLocales.push(app);
                                    if(loadedLocales.length == data.length){
                                        success(loadedLocales,status,xhr);
                                    }
                                });
                            })
                        }
                    };
                    break;
            }
            Backbone.sync.apply(this,arguments);
        }
    });
});