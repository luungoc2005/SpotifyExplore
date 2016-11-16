(function ($) {
	var spotifyUri = {
		search: "https://api.spotify.com/v1/search"
	}
	
	var defaults = {
		max_results: 10
	}
	
	var currentResults;
	var currentArtist;
	
	var searchFor = function (query) {
		if (query == null) return;
		if (query == "") $("#searchResults").empty();
		
		$.getJSON(spotifyUri.search + "?q=" + encodeURIComponent(query) + "&type=artist", 
			function(result) {
				if (result == null) return;
				$("#searchResults").empty();
				
				currentResults = result["artists"]["items"] || currentResults;
				
				addSearchResults();
			});		
	};
	
	var addSearchResults = function() {
		$.each(currentResults, function(index, value) {
			if (index + 1 > defaults.max_results) return false;
			
			$("<div />", {
				"text": value["name"]
			}).appendTo($("#searchResults"));
		});
	}
	
	var setCurrentArtist = function (artist) {
		
	}
	
	var gotoResult = function() {
		if (currentResults != null && currentResults.length > 0) setCurrentArtist(currentResults[0]);
	}
	
	init = function() {
		$("#searchBox").on("change paste keyup", function () {
			searchFor($("#searchBox").val());
		});
	};
})(jQuery);