"use strict";
define(['text!templates/system/contactRightView.html'],
    function(templateData){
        return openbiz.View.extend({
            app: 'cubi',
            module:'system',
            name: 'contactRightView',
            el:'#wrapper nav#contact-right',
            initialize:function(){
                openbiz.View.prototype.initialize.call(this);
                this.template = _.template(templateData);
            },
            render:function(){
                $(this.el).html(this.template(this.locale));
                if(!this.app.views.isRenderred("system.ContactRightView")){
                    $(this.el).mmenu({
                            position	: 'right',
                            counters	: true,
                            searchfield	: true,
                            header		: {
                                add			: true,
                                update		: true,
                                title		: 'Contacts'
                            }
                        },
                        {
                            pageSelector:'div#wrapper'
                        }
                    );
                };
                openbiz.ui.update($(this.el));
                return this;
            }
        });
    }
);