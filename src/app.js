
require('./index.html');
require('./app.scss');

require('./components/main/navbar.scss');
require('./components/main/intro.scss');
require('./components/main/skills.scss');
require('./components/main/portfolio.scss');
require('./components/main/contact.scss');

require('./components/search-anim/search-anim.scss');
require('./components/search-anim/search-anim.js');

require('./vendors/typed.js/typed.1.1.4.modified.js');

/* Called by the Google maps API when it's ready. We can then initialize
   our map with the required settings */
function initMap()
{
	var latLng = new google.maps.LatLng(45.7986436, 4.8316451);
	var mapOptions = {
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		center: latLng,
		zoom: 10,
		streetViewControl: false,
		scaleControl: false,
		navigationControl: true,
		mapTypeControl: false,
		streetViewControl: false,
		scrollwheel: false,
	};

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

	marker = new google.maps.Marker({
		position: latLng,
		map: map,
		draggable: false,
		animation: google.maps.Animation.DROP
	});
}

function connectNavLinks()
{
	var navBarHeight = $("#navbar").height(); // Constant
	
	$(".nav-link").each(function(){
		// Get the associated anchored div for this menu item. This is where  we will
		// scroll down.
		var anchor = $(this).data("link");
		
		// On click on a menu item, scroll down to the associated anchor div.
		$(this).click(function(){
			var anchorTop;
			
			if (anchor != "home")
				anchorTop = $("#"+anchor).offset().top;
			else
				anchorTop = 0;
				
			$("html, body").stop(true,false).animate({scrollTop: (anchorTop-navBarHeight+10)+'px'}, 500,'swing');
		});
	});
}

jQuery(document).ready(function(){

	$(document).scroll(function(){
		
		var docScrollTop = $(document).scrollTop(); // Changes with user scroll
		var introHeight = $("#intro").outerHeight(); // Constant
		var navBarHeight = $("#navbar").height(); // Constant
		var navBarTop = $("#navbar").offset().top; // Constant
		
		// Show/Hide the navigation bar when scrolling up/down
		if (docScrollTop < introHeight)
		{
			$("#navbar").removeClass("topbar");
		}
		else if (docScrollTop >= navBarTop)
		{
			$("#navbar").addClass("topbar");
		}

		// Let the introduction zone diseappear while scrolling down
		var introOpacity = 1.0-(Math.min(docScrollTop,introHeight)/introHeight);
		$("#intro").css({opacity: introOpacity});
	});
	
	// Connect navigation bar items to special actions
	connectNavLinks();

	// Initialize the google maps
	initMap();
});
