
function SearchAnimation()
{
	var self = this;
	
	var NG_SEARCHING_DOTS = 8;
	var SEARCHING_DOTS_SPEED = 300;
	
	var mainDOM = $("#search-anim-container");
	var typingZone = mainDOM.find("#typing-zone");
	var typedZone = mainDOM.find("#typed-zone");
	var searchInProgress = mainDOM.find("#search-in-progress");
	var searchingDots = mainDOM.find("#search-in-progress #dots");
	var searchResult = mainDOM.find("#search-result");
	var googule = mainDOM.find("#googule");
	
	var messages = [];
	var keywords = [];
	var keywordTimings = [];
	
	this.addMessage = function(message, keywordList, keywordTimingList)
	{
		messages.push(message);
		keywords.push(keywordList);
		keywordTimings.push(keywordTimingList);
	}
	
	this.showSearchResult = function()
	{
		// Hide everything we don't need any more
		$("#abilities1").empty();
		googule.fadeOut();
		searchInProgress.fadeOut(function(){
			//Show results
			searchResult.fadeIn();
			
			// Launch a timer that willrestart the whole animation after a while
			setTimeout(function(){
				self.restart();
			}, 10000);
		});
	}
	
	// Append a search dot after its peers
	this.addSearchingDotAtTime = function(time){
		setTimeout(function(){
			searchingDots.append(".");
		}, time);
	}
	
	// Starts the dot dot dot animation for "Recherche en cours"
	this.startSearchingDots = function()
	{
		for (var i=0; i<NG_SEARCHING_DOTS; i++)
		{
			self.addSearchingDotAtTime(i*SEARCHING_DOTS_SPEED);
		}
		
		// Get a timer for when all the dots are added so we can go to the next step.
		setTimeout(function(){
			self.showSearchResult();
		}, (NG_SEARCHING_DOTS+1)*SEARCHING_DOTS_SPEED);
	}
	
	this.simulateSearch = function()
	{
		// Hide the search text area
		typingZone.fadeOut();
		
		// Show "Recherche en cours". When shown, start adding dots one by one
		searchInProgress.fadeIn(function(){
			self.startSearchingDots();
		});
	}
	
	// Launch an infinite animation loop. Each message is shown in the order it was added.
	// Keywords are added to the dashboard at the right times.
	this.launch = function(){
		// Show some areas
		typingZone.fadeIn();
		googule.show();
		
		// Launch the Typed.JS plugin to start typing and erasing our sentences
		typedZone.typed({
            strings: messages,
			showCursor: false,
            typeSpeed: 1,
			backDelay: 1000,
			loop: false,
			preStringTyped : function(strIndex){
				// Append message keywords to the dashboard at the right time after starting typing
				for (var i in keywords[strIndex])
				{
					setTimeout(function(keyword){
						return function(){
							var keywordDiv = $("<div/>");
							keywordDiv.addClass("keyword");
							keywordDiv.html("<b>+</b> "+keyword);
							$("#abilities1").append(keywordDiv);
						};
					}(keywords[strIndex][i]), keywordTimings[strIndex][i]);
				}
			},
			onStringTyped : function(strIndex){
				$("#abilities1").append("<div style='clear:both'/>");
			},
			callback: function(){
				// Called when the whole loop is ended

				// Next step: "Recherche en cours"
				setTimeout(function(){
					self.simulateSearch();
				}, 1000);
			}
        });
	}
	
	this.restart = function()
	{
		searchingDots.empty();
		searchResult.fadeOut(function(){
			self.launch();
		});
	}
}

jQuery(document).ready(function()
{
	var searchAnimation = new SearchAnimation;
	
	// Build our list of typed messages and associated skills
	searchAnimation.addMessage("Je recherche un développeur d'<b>applications mobiles natives</b>", ["Développeur informatique","Android", "iOS"], [500, 1500, 2000]);
	searchAnimation.addMessage("Profil <b>full-stack</b>, larges connaissances informatiques", ["Front-end (un peu)","Back-end", "Embarqué"], [500, 1000, 1500]);
	searchAnimation.addMessage("Souhaitant si possible travailler sur les <b>objets connectés</b>", ["Objets connectés", "IoT"], [1000, 1500]);
	searchAnimation.addMessage("Avec une vision <b>business</b>, <b>orienté clients</b>", ["Profil entrepreneur", "Relation clients"], [1000, 1500]);
	searchAnimation.addMessage("Un <b>freelance</b>, sur site sur <b>Lyon</b>, ou en <b>télé-travail</b>", ["Freelance", "Grand Lyon", "Télé-travail"], [200, 1500, 2000]);
	
	searchAnimation.launch();
});