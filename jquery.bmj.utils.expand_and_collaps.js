/* =============================================================================
 *
 * jQuery BMJ Utils Pop UP
 * Version 1.0
 * Suppports Static, Image and Ajax pop ups.
 * 
 *
 * Author: Zoe Azhdari Radkani
 * Author email: ZAzhdariRadkani@bmjgroup.com
 * PopUp plug-in covers three different content type for popup box:
 * 1. Static Pop Up, which gets its content from a hidden div in the same page as pop up link
 * 2. Image Pop Up , which is to display the picture with its caption
 * 3. Ajax Pop Up , which loads up the content form outside the popup link page
 * In all type of popup the link to content comes from the popup link's Href attribute.
 * It's title attribute holds the Header text and for image popups the camption for image
 * goes in alt attribute
 *
 * See example for more details.
 * ---------------------------------------------------------------------------
 * 
 * EXAMPLES OF USE:
 * 
 * The HTML:
 *
 *  <div id="languages">
 *   	  <a class="language-select-link"  href="..?localeBarShow=true&&"> English</a>
 *     </div>
 *
 * 
 * The JS Call:
 *
 *     $.fn.popUp.settings = {
 *		popType:            '',   
 *		overlay:	    true,	
 *		center:             false,
 *		header:		    '',
 *		Loading:	    'images/loading.gif',	
 *		closeBtn:			'<img src="images/close.gif"/>',	
 *		containerBorderSize:	10,		 
 *		containerResizeSpeed:	400,
 *		ctxPath:		'',                // ROOT PATH	
 *		imageArray:		[]
 *            };
 * 
 * 	       
 =============================================================================*/
//Creating closure
(function($) {
	 //plug-in definition
	$.fn.popUp = function(settings) {		
		// Extend our default options with those provided.
		settings = jQuery.extend({
			popType:            '',
			overlay:			false,	
			center:             false,
			header:				'',
			Loading:			'images/loading.gif',	
			closeBtn:			'<img src="images/close.gif"/>',	
			containerBorderSize:	10,		
			containerResizeSpeed:	400,
			ctxPath:				'',                	
			imageArray:				[]
		},settings);
		
		//Initializing the popup
		function _initialize() {
			$('#pop-up').remove();
			// IE fix for elements appear above the overlay.
			$('embed, object, select').css({ 'visibility' : 'hidden' });
			settings.popType = this.getAttribute('rel');
			settings.header = this.getAttribute('title');
			pop_setup( $(this).offset() , $(this).height() );
			
			

			switch( settings.popType ) {
			case 'static':
			    static_popUp(this.getAttribute('href'));
				break;
			case 'ajax':
				ajax_popUp(this.getAttribute('href'));
			    break;
			case 'image':
				settings.imageArray.length = 0;
				settings.imageArray.push(new Array(this.getAttribute('href'),this.getAttribute('alt')));    
				image_popUp();
			    break;
			
			}
			return false; // Avoid the browser following the link
		}
		
		
		
	
	function pop_setup( position , height ) {
		  
			// add pop to the page
			if(settings.overlay){$('body').append('<div id="overlay"></div>');}
			$('body').append('<div id="pop-up"><div id="popup-header"><span>' + settings.header + '</span><a href="#" id="popup-close">' + settings.closeBtn  + '</a></div><div id="popup-container"><img id="popup-image"><div id="loading"><img src="' + settings.Loading + '"/></div></div></div>');	
			
			var arrPageSizes = getPageSize();
			
			$('#overlay').css({
				opacity:			'0.3',
				width:				arrPageSizes[0],
				height:				arrPageSizes[1]
			}).fadeIn();
			
			

			var arrPageScroll = getPageScroll();
			
			if(settings.center){
				
				$('#pop-up').css({
					width: '100%',
					top:	arrPageScroll[1] + (arrPageSizes[3] / 10),
					left:	arrPageScroll[0]
				}).show();
				
			}
			if(!settings.center){	
				var setY = position.top + height;
				var setX = position.left;
				
				if(!$.browser.msie ){
					 $('#pop-up').css({
						width: 'auto'
					});
				}
				$('#pop-up').css({
					top:    setY,
					left:   setX
				}).show();
			}
			
			
			$('#overlay,#pop-up').click(function() {
				$('#pop-up , #overlay').remove();
				// IE fix for elements appear above the overlay.
				$('embed, object, select').css({ 'visibility' : 'visible' });								
			});
			
			$('#popup-close').click(function() {
				$('#pop-up , #overlay').remove();
				// IE fix for elements appear above the overlay.
				$('embed, object, select').css({ 'visibility' : 'visible' });
				return false;
			});
			// If window was resized
			$(window).resize(function() {
				
				var arrPageSizes = getPageSize();
				$('#overlay').css({
					width:		arrPageSizes[0],
					height:		arrPageSizes[1]
				});
				var arrPageScroll = getPageScroll();
				
				$('#pop-up').css({
					top:	arrPageScroll[1] + (arrPageSizes[3] / 10),
					left:	arrPageScroll[0]
				});
			});
		}
	
		function image_popUp() { 
			
			$('#loading').show();
			$('#popup-image,#popup-header').hide();			
			var ImageLoader = new Image();
			ImageLoader.onload = function() {
				$('#popup-image').attr('src',settings.imageArray[0][0]);
				
				resizePopUp(ImageLoader.width,ImageLoader.height);
				// IE fix
				ImageLoader.onload=function(){};
			};
			ImageLoader.src = settings.imageArray[0][0];
		};
		
		
		function static_popUp(Href){
			$('#loading').show();
			$('#popup-image,#popup-header').hide();	
			var params = Href.split(/\s*#\s*/);
			var link = '#' + params[1];
			var HTML = $(link).html();
			$('#pop-up').addClass('static-popup');
			$('#popup-container').html(HTML);
			$('#popup-header').css({ width: $('#popup-container').width() }).show();

		};

		function ajax_popUp(Href){
			$('#loading').show();
			//removing popup
			$('#popup-image,#popup-header').hide();	
			var params = Href.split(/\s*#\s*/);
			var link = settings.ctxPath + params[1];
			$('#pop-up').addClass('ajax-popup');
			$('#popup-container').load(link);
			$('#popup-header').css({ width: $('#popup-container').width() }).show();

		};
		
		function resizePopUp(imageWidth,imageHeight) {
			var currentWidth = $('#popup-container').width();
			var currentHeight = $('#popup-container').height();						
			var W = currentWidth - (imageWidth + (settings.containerBorderSize * 2));
			var H = currentHeight -(imageHeight + (settings.containerBorderSize * 2));			
			$('#popup-container').animate({ 
					width: imageWidth + (settings.containerBorderSize * 2), 
					height: imageHeight + (settings.containerBorderSize * 2) },
						settings.containerResizeSpeed,function() { 								    
									$('#loading').hide();
									$('#popup-image').fadeIn(function() {
										$('#popup-header').show();
										$('#popup-container').append('<br /><span class="caption">' + settings.imageArray[0][1] + '</span>');										
									});
								});
			if ( ( W == 0 ) && ( H == 0 ) ) {
				if ( $.browser.msie ) {
					pause(250);
				} else {
					pause(100);	
				}
			} 
			$('#popup-header').css({ width: imageWidth , padding: '0 10px 0' });			
		};
		
		
		
		
		 //getPageSize() by quirksmode.com/
		 // @return Array Return an array with page width, height and window width, height/
		function getPageSize() {
			var xScroll, yScroll;
			if (window.innerHeight && window.scrollMaxY) {	
				xScroll = window.innerWidth + window.scrollMaxX;
				yScroll = window.innerHeight + window.scrollMaxY;
			} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
				xScroll = document.body.scrollWidth;
				yScroll = document.body.scrollHeight;
			} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
				xScroll = document.body.offsetWidth;
				yScroll = document.body.offsetHeight;
			}
			var windowWidth, windowHeight;
			if (self.innerHeight) {	// all except Explorer
				if(document.documentElement.clientWidth){
					windowWidth = document.documentElement.clientWidth; 
				} else {
					windowWidth = self.innerWidth;
				}
				windowHeight = self.innerHeight;
			} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
				windowWidth = document.documentElement.clientWidth;
				windowHeight = document.documentElement.clientHeight;
			} else if (document.body) { // other Explorers
				windowWidth = document.body.clientWidth;
				windowHeight = document.body.clientHeight;
			}	
			// for small pages with total height less then height of the viewport
			if(yScroll < windowHeight){
				pageHeight = windowHeight;
			} else { 
				pageHeight = yScroll;
			}
			// for small pages with total width less then width of the viewport
			if(xScroll < windowWidth){	
				pageWidth = xScroll;		
			} else {
				pageWidth = windowWidth;
			}
			arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight);
			return arrayPageSize;
		};
		 
		 // getPageScroll() by quirksmode.com
		 //@return Array Return an array with x,y page scroll values.
		function getPageScroll() {
			var xScroll, yScroll;
			if (self.pageYOffset) {
				yScroll = self.pageYOffset;
				xScroll = self.pageXOffset;
			} else if (document.documentElement && document.documentElement.scrollTop) {	 // Explorer 6 Strict
				yScroll = document.documentElement.scrollTop;
				xScroll = document.documentElement.scrollLeft;
			} else if (document.body) {// all other Explorers
				yScroll = document.body.scrollTop;
				xScroll = document.body.scrollLeft;	
			}
			arrayPageScroll = new Array(xScroll,yScroll);
			return arrayPageScroll;
		};
		 
		  //Stop the code execution
		 function pause(ms) {
			var date = new Date(); 
			curDate = null;
			do { var curDate = new Date(); }
			while ( curDate - date < ms);
		 };
		return this.unbind('click').click(_initialize);
	};
})(jQuery); 
