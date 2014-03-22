"use strict";
define([],function(){
	return openbiz.Element.extend({
		getConfig:function(obj,column){
			var field = openbiz.Element.getConfig.call(this,obj,column);
			field.cell = openbiz.Grid.UriCell.extend({
				render: function () {
					this.$el.empty();
					this.$el.append($("<a>", {
						tabIndex: -1,
						href: "#",
						title: "这是我"
					}).text("这特么是我自定义的element"));
					this.delegateEvents();
					return this;
				}
			});
			return field;
		}
	});
});