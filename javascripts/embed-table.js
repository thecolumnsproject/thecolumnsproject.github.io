$(function() {

	// Table Expansion
	// -------------------
	// Table should respond to the user's drag
	// and progressively open as it is pulled away
	// from its original location on the page
	var $table;

	$(".columns-table").hammer({domEvents: true}).bind('pan', function(e) {
		console.log(e);
		e.stopPropagation();
	});

	$(".columns-table").hammer({domEvents: true}).bind('tap', function(e) {
		
		$table = $(this);
		if ($table.hasClass('expanded')) {

		} else {

			var $bg = $table.parent(),
				$rows = $table.find('.columns-table-row');

			// Calculate new background position
			var bgOffsetTop = -$bg.position().top;
			var bgHeight = $(window).height();
			var bgWidth = $(window).width();
			$bg.velocity({

				// Fill the entire screen
				height: bgHeight,

				// Move to the top of the screen
				translateY: bgOffsetTop

				
			},{
				complete: function(elements) {
					$bg.addClass('expanded');
				}
			});

			// Calculate the new position for each row
			var rowHeight = $rows.height();
			$rows.each(function(index, row) {
				var $row = $(row);

				var offsetY = (index * rowHeight);
				switch (index) {
					case 0:
						break;
					case 1:
						offsetY -= 5;
						break;
					case 2:
						offsetY -= 10;
						break;
					default:
						offsetY -= 15;
				}
				$row.velocity({
					translateY: offsetY
				})
			});
		}

		// Grow the background to fill the screen


	});

});