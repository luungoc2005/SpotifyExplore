(function (global, controls, $) {
	//helper functions
	function capitalize(textToFix) {
		return textToFix.replace(/\b\w/g, function(l) { return l.toUpperCase()});
	}
	
	controls.makeStar = function(target, popularity) { //popularity in base 100
		var pop = Math.round(popularity / 20); //converts to base 5
		// var target = $("#" + parentName);
		target.empty();
		for (var i = 0; i < 5; i++) {
			if (i <= pop) {
				$("<span />", {
					"class":"glyphicon glyphicon-star",
					"aria-hidden":"true"
				}).appendTo(target);
			}
			else {
				$("<span />", {
					"class":"glyphicon glyphicon-star-empty",
					"aria-hidden":"true"
				}).appendTo(target);
			}
		}
	}
	
	controls.updateCurrentArtist = function(name, genres, pop, img, url, followers) {
		var target = $("#" + markups.current_artist);
		
		target.find(".item_url").attr("href", url);
		target.find(".item_img").attr("src", img);
		target.find(".item_name").text(name + " ");
		target.find(".item_genres").text("Genres: " + capitalize(genres));
		target.find(".item_followers").text(followers + " followers");
		
		controls.makeStar(target.find("#artist-pop"), pop);
	}
	
	controls.updateArtistSmall = function(target, name, genres, pop, img) {
		target.find(".item_img").attr("src", img);
		target.find(".item_name").text(name + " ");
		target.find(".item_genres").text(capitalize(genres));
		controls.makeStar(target.find("#artist-pop"), pop);
	}
	
	controls.addSearchResultItem = function(id, name, genres, pop, img) {	
		if (name != null && name != "") {
			var list = $("<li />").appendTo($("#" + markups.results_box));
			var item = $("<a />", {
				"class": markups.search_item, // + " list-group-item",
				"id": markups.search_id + id,
				"data": markups.search_id + id,
				"href": "#"
				}).appendTo(list);
			
			var wrapper = $("<div />", {
				"class": "row"
				}).appendTo(item);
			
			//note to self: somehow "data": id attribute will cause this to not work
			
			$("<img />", { //img
				"class": "item_img col-md-5 pull-left item_img",
				}).appendTo(wrapper);
			
			var content = $("<div />", {
				"class": "col-md-7"
				}).appendTo(wrapper);
			
			var head = $("<h4 />", { //name div
				"class": "media-heading",
				}).appendTo(content);
				
			$("<span />", {
				"class": "item_name"
			}).appendTo(head);
			
			var stars = $("<span />", {
				"class": "badge",
				"id": "artist-pop"
			}).appendTo(head);
			
			$("<div />", { //genres div
				"text": capitalize(genres),
				"class": "item_genres",
				}).appendTo(content);
				
			controls.updateArtistSmall(item, name, genres, pop, img);
									
			item.on("click", function() {
				spotify.gotoResult(id);
			});
		}
	}	
	
	controls.clearResultBox = function() {
		$("#" + markups.results_box).empty();
	}
		
	controls.showSearch = function() {
		$("#" +markups.results_box).show("fast")
	}
	
	controls.hideSearch = function() {
		$("#" +markups.results_box).hide("fast")
	}
	
	controls.adjustRelated = function(count) {
		for (var i = 0; i <= 2; i++) {
			if (i + 1 <= count) {
				if (i > 0) {
					$("#" + markups.next_artist + i).show();
				}
				else {
					$("#" + markups.next_artist + i).css("visibility", "visible");	
				}
			}
			else {
				if (i > 0) {
					$("#" + markups.next_artist + i).hide();
				}
				else {
					$("#" + markups.next_artist + i).css("visibility", "hidden");
				}
			}
			//remove all offsets
			$("#" + markups.next_artist + i).removeClass("col-md-offset-2");
			$("#" + markups.next_artist + i).removeClass("col-md-offset-4");
		}
		switch (count) {
			case 1:
				$("#" + markups.next_artist + "0").addClass("col-md-offset-4");
				break;
			case 2:
				$("#" + markups.next_artist + "0").addClass("col-md-offset-2");
				break;
			default:			
		}
	}
	
	window.onclick = function(event) {
		if (!event.target.matches("#" + markups.search_box)) {
			controls.hideSearch();
		}
	}
	
	controls.init = function() {
		$("#" + markups.search_box).on("textInput input focusin", function () {
			spotify.searchFor($("#" + markups.search_box).val());
		});
		$("#" + markups.prev_artist).on("click", spotify.pushPrevArtist);
		for (var i = 0; i <= 2; i++) {
			$("#" + markups.next_artist + i).on("click", function() {
				spotify.pushRelatedArtist(this.id.replace(markups.next_artist,""));
			});
		}
	}
})(global, controls, jQuery)