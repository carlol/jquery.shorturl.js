(function($) {
	
	// util
	function isString(x) {
		return typeof x === "string";
	}
	
	function fnAggregation( res, shortURL, cb, $target ) {
		if ( $target instanceof $ ) $target.text(shortURL);
		if ( $.isFunction(cb) ) cb(res);
	}
	
	// methods map
	var shorter = {
		googl : function( settings ) {
			$.ajax({
			    url: 'https://www.googleapis.com/urlshortener/v1/url',
			    type: 'POST',
			    contentType: 'application/json; charset=utf-8',
			    data: '{ longUrl: "' + settings.url +'"}',
			    dataType: 'json',
			    success: function(res) {
			    	fnAggregation(res, res.id, settings.callback, settings.destination);
			    }
			});
		}
	};

	// main method
	$.shorturl = function( opt ) {
		var settings = $.extend({
				api	: "googl"		// actually, the only supported
			}, opt);
		
		if ( ! (opt && isString(opt.url)) ) 
			throw "NA"; // EXIT
		
		var dest = settings.destination;
		if ( dest && isString(dest) )
			settings.destination = $(dest);

		var fn = shorter[settings.api];
		if ( fn ) fn(settings);
	};
	
})(jQuery);
