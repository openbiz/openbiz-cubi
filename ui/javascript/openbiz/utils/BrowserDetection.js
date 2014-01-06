define(function(){
	return { 
		isIE:function( version, comparison )
		{
		    var $div = $('<div style="display:none;"/>').appendTo($('body'));
		    $div.html('<!--[if '+(comparison||'')+' IE '+(version||'')+']><a>&nbsp;</a><![endif]-->');
		    var ieTest = $div.find('a').length;
		    $div.remove();
		    return ieTest;
		}
	}
});