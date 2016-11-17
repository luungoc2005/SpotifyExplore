(function (global, controls, $) {
	controls.addSearchResultItem = function(id, name, genres, pop, img) {	
		if (name != null && name != "") {
			var list = $("<li />").appendTo($("#" + markups.results_box));
			var item = $("<a />", {
				"class": markups.search_item, // + " list-group-item",
				"id": markups.search_id + id,
				"data": markups.search_id + id,
				"href": "javascript:void(0)"
				}).appendTo(list);
			
			var wrapper = $("<div />", {
				"class": "row"
				}).appendTo(item);
			
			//note to self: somehow "data": id attribute will cause this to not work
			
			$("<img />", { //img
				"src": img,
				"class": "col-md-5 pull-left item_img",
				}).appendTo(wrapper);
			
			var content = $("<div />", {
				"class": "col-md-7"
				}).appendTo(wrapper);
			
			$("<h4 />", { //name div
				"text": name,
				"class": "media-heading item_name",
				}).appendTo(content);
			
			//change to upper case, for visual
			var fixedGenres = genres.replace(/\b\w/g, function(l) { return l.toUpperCase()});
			
			$("<div />", { //genres div
				"text": fixedGenres,
				"class": "item_genres",
				}).appendTo(content);
									
			item.on("click", function() {
				spotify.gotoResult(id);
			});
		}
	}
	
	controls.updateCurrentArtist = function() {
		
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
	
	controls.init = function() {
		$("#" +markups.search_box).on("textInput input", function () {
			spotify.searchFor($("#" + markups.search_box).val());
		});
		$("#" +markups.search_box).on("focusin", function () {
			if ($("#" + markups.search_box).val() != "") controls.showSearch();
		});
		// controls.hideSearch();
	}
})(global, controls, jQuery)