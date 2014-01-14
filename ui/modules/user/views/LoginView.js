"use strict";
define(['text!templates/user/loginView.html',
		'../models/User'],
		function(templateData,model){
	return openbiz.View.extend({
		app: 'cubi',
        module:'user',
		name: 'loginView',
		el: '#main',
		model:model,
		events:{},
		validate:function(){
			var self=this;				
			$(this.el).find('#form-signin').parsley('addListener',{
				onFormValidate:function(isValid,event,ParsleyForm)
				{	
					event.preventDefault();
					if(isValid){
						self.checkLogin(event);
					}
				}
			});
		},			
		checkLogin:function(event)
		{			
			event.preventDefault();
			var self = this;
			$(this.el).find('.btn-sign-in')
						.attr('data-loading-text',this.locale.signing)						
						.tbButton('loading');
			$(self.el).find('#inputPassword').closest(".input-group").removeClass("parsley-error").addClass("parsley-success");

			//scroll to top
			$(this.el).animate({
				scrollTop: 0
			}, 500);
			$(this.el).addClass("slideDown");

			this.model.login( 	$(this.el).find('#inputEmail').val(), 
								$(this.el).find('#inputPassword').val() , 
								function(isAuthed, user){								
				$(self.el).find('.btn-sign-in').tbButton('reset');
				if(!isAuthed)
				{
					setTimeout(function(){
						$(self.el).removeClass("slideDown");
						$(self.el).find('#inputPassword').closest(".input-group").removeClass("parsley-success").addClass("parsley-error");
						$(self.el).find('#inputPassword').attr("data-content",self.locale.validation.incorrectPassword).popover('show');						
					},500);					
				}else{
					//save login to cookies
					if($(self.el).find("input[name='remember']").is(":checked")){
						$.cookie('username',user.get('username'));
					}else{
						$.removeCookie('username');
					}

					//we are good to go !
					setTimeout(function(){
						$(self.el).removeClass("slideDown");
                        $(self.el).fadeOut(function(){
                            Backbone.history.navigate("#!/backend/dashboard", {trigger: true, replace: true});
                        });
					},500);		
				}
			});
		},
		initialize:function(){	
			openbiz.View.prototype.initialize.call(this); 						
	        this.template = _.template(templateData);	        	        
    	},
		render:function(){		
			var self = this;
		    $(this.el).html(this.template(this.locale));
		    $('#wrapper div#header').hide();
	        $('#wrapper div#nav').hide();
	        $('#wrapper div#menu').hide();						
	    	function toCenter(){
				var mainH=$(self.el).outerHeight();
				var accountH=$(self.el).find(".account-wall").outerHeight();
				var marginT=(mainH-accountH)/2;
			   	if(marginT>30){			   		
				    $(self.el).find(".account-wall").css("margin-top",marginT-25);
				}else{
					$(self.el).find(".account-wall").css("margin-top",30);
				}
			}
			setTimeout(toCenter, 50);
			var toResize;
			$(window).on('resize',function(e) {
				clearTimeout(toResize);
				toResize = setTimeout(toCenter, 50);
			});			
			$(this.el).find("#inputEmail").val($.cookie('username'));
			this.validate();	
	        openbiz.ui.update($(this.el));
	        return this;
	    }
	});
});