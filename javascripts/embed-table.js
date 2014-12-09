$(function() {

	// Table Expansion
	// -------------------

	// Table should respond to the user's drag
	// and progressively open as it is pulled away
	// from its original location on the page

	// Storage variables for resetting positions
	var originalBackground = {},
		originalRows = [];

	// Animation constants
	var ANIMATION_DURATION = 350;

	// UI Constants
	var ROW_OFFSET = 5;

	// UI Management classes
	var EXPANDED_CLASS = 'expanded',
		ANIMATING_CLASS = 'velocity-animating';



	// Bind the table and its components
	// to various tap handling events
	// ---------------------------------

	$(".columns-table").hammer({domEvents: true}).bind('tap', function(e) {
		$table = $(this);
		if (!$table.hasClass(EXPANDED_CLASS) && !$table.hasClass(ANIMATING_CLASS)) {
			expandTable($table);
		}
	});

	$(".columns-table-close-button").hammer({domEvents: true}).bind('tap', function(e) {
		var $parent = $(this).parents('.columns-table-widget');
		var $table = $parent.find('.columns-table');
		if ($table.hasClass(EXPANDED_CLASS) && !$table.hasClass(ANIMATING_CLASS)) {
			collapseTable($table);
		}
	});

	// $(".columns-table").hammer({domEvents: true}).bind('pan', function(e) {
	// 	e.stopPropagation();
	// });

	// Methods to expand a table
	// from to its original position
	// to full-screen
	// ------------------------------

	function expandTable($table) {
		var $parent = $table.parents('.columns-table-widget');
			$bg = $parent.find('.columns-table-container'),
			$rows = $parent.find('.columns-table-row'),
			$header = $parent.find('.columns-table-header');

		expandTableBackground($table, $bg);
		expandTableRows($table, $rows);
		expandTableBody($table);
		expandTableHeader($table, $header);
	}

	function expandTableHeader($table, $header) {

		// Bring the header into view
		$header.velocity({
			opacity: 1 /* Fade the header into view */
		}, {
			duration: ANIMATION_DURATION,
			complete: function(elements) {
				$header.addClass(EXPANDED_CLASS);
			}
		});
	}

	function expandTableBackground($table, $bg) {

		// Save values to be used upon reset
		originalBackground['height'] = $bg.height();
		originalBackground['positionY'] = $bg.offset().top;

		// Calculate new background position
		var bgOffsetTop = -$bg.offset().top;
		var bgHeight = $(window).height();
		var bgWidth = $(window).width();
		$bg.velocity({
			height: bgHeight, 			/* Fill the entire screen */
			translateY: bgOffsetTop 	/* Move to the top of the screen */
		},{
			duration: ANIMATION_DURATION,
			begin: function(elements) {
				$bg.removeClass('translateY-reset');
			},
			complete: function(elements) {
				$bg.addClass(EXPANDED_CLASS);
				$bg.addClass('translateY-reset');
			}
		});
	}

	function expandTableBody($table, $tableBody) {

		// Calculate the new table size and position
		var tableOffsetTop = 60;
		// var tableHeight = rowHeight * $rows.length - 40;

		$table.velocity({
			// height: tableHeight, /* Grow to encompass all of the rows */
			translateY: tableOffsetTop /* Move down a few pixels to account for the header */
		}, {
			duration: ANIMATION_DURATION,
			begin: function(elements) {
				$table.removeClass('translateY-reset');
			},
			complete: function(elements) {
				$table.addClass(EXPANDED_CLASS);
				$table.addClass('translateY-reset');
			}
		});
	}

	function expandTableRows($table, $rows) {

		// Calculate the new position for each row
		$rows.each(function(index, row) {
			var $row = $(row);

			// Save original row data
			originalRows[index] = {
				positionY: $row.offset().top
			}

			// Animate the rows
			expandTableRowAtIndex($table, $row, index);
		});
	}

	function expandTableRowAtIndex($table, $row, index) {

		var rowHeight = $row.outerHeight();
		var offsetY = (index * rowHeight);
		switch (index) {
			case 0:
				break;
			case 1:
				offsetY -= ROW_OFFSET;
				break;
			case 2:
				offsetY -= ROW_OFFSET * 2;
				break;
			default:
				offsetY -= ROW_OFFSET * 2;
		}

		$row.velocity({
			translateY: offsetY /* Move each row down into its natural position */
		}, {
			duration: ANIMATION_DURATION,
			begin: function(elements) {
					$row.removeClass('translateY-reset');
			},
			complete: function(elements) {
				$row.addClass(EXPANDED_CLASS);
				$row.addClass('translateY-reset');
			}
		});
	}



	// Methods to collapse a table
	// back to its original position
	// ------------------------------

	function collapseTable($table) {
		var $parent = $table.parents('.columns-table-widget');
			$bg = $parent.find('.columns-table-container'),
			$rows = $parent.find('.columns-table-row'),
			$header = $parent.find('.columns-table-header');

		collapseTableHeader($table, $header);
		collapseTableBackground($table, $bg);
		collapseTableBody($table);
		collapseTableRows($table, $rows);
	}

	function collapseTableHeader($table, $header) {

		// Remove header from view
		$header.velocity({
			opacity: 0 /* Fade the header out of view */
		}, {
			duration: ANIMATION_DURATION,
			complete: function(elements) {
				$header.removeClass(EXPANDED_CLASS);
			}
		});
	}

	function collapseTableBackground($table, $bg) {

		// Calculate new background position
		$bg.velocity({

			// Return to small state
			height: originalBackground.height,

			// Move back to original position
			translateY: 0

		},{
			duration: ANIMATION_DURATION,
			begin: function(elements) {
				$bg.removeClass('translateY-reset');
				$bg.removeClass(EXPANDED_CLASS);
			},
			complete: function(elements) {
				$bg.addClass('translateY-reset');
			}
		});
	}

	function collapseTableBody($table) {

		// Calculate the old table size and position
		$table.velocity({

			// Move to top of container
			translateY: 0,

		}, {
			duration: ANIMATION_DURATION,
			begin: function(elements) {
				$table.removeClass('translateY-reset');
				$table.removeClass(EXPANDED_CLASS);
			},
			complete: function(elements) {
				// $table.removeClass(EXPANDED_CLASS);
				$table.addClass('translateY-reset');
			}
		});
	}

	function collapseTableRows($table, $rows) {
		$rows.each(function(index, row) {
			collapseTableRowAtIndex($table, $(row), index);
		});
	}

	function collapseTableRowAtIndex($table, $row, index) {

		// Calculate the old position for each row
		var newPosition = originalRows[index].positionY - $row.offset().top;
		$row.velocity({

			// Move each row to its collapsed position
			translateY: 0

		}, {
			duration: ANIMATION_DURATION,
			begin: function(elements) {
				$row.removeClass('translateY-reset');
				$row.removeClass(EXPANDED_CLASS);
			},
			complete: function(elements) {
				$row.addClass('translateY-reset');
			}
		});
	}

});