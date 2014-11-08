$(function() {

	// Table Expansion
	// -------------------
	// Table should respond to the user's drag
	// and progressively open as it is pulled away
	// from its original location on the page
	var $table,
		originalBackground = {},
		originalRows = [];

	// $(".columns-table").hammer({domEvents: true}).bind('pan', function(e) {
	// 	e.stopPropagation();
	// });

	$(".columns-table").hammer({domEvents: true}).bind('tap', function(e) {
		
		$table = $(this);
		if ($table.hasClass('expanded') || $table.hasClass('velocity-animating')) {

		} else {

			expandTable($table);
		}

	});

	$(".columns-table-close-button").hammer({domEvents: true}).bind('tap', function(e) {
		var $parent = $(this).parents('.columns-table-widget');
		var $table = $parent.find('.columns-table');
		if ($table.hasClass('expanded') && !$table.hasClass('velocity-animating')) {
			collapseTable($table);
		}
	});

	function expandTable($table) {
		var $parent = $table.parents('.columns-table-widget');
			$bg = $parent.find('.columns-table-container'),
			$rows = $parent.find('.columns-table-row'),
			$header = $parent.find('.columns-table-header');

		// Save values to be used upon reset
		originalBackground['height'] = $bg.height();
		originalBackground['positionY'] = $bg.position().top;

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
			begin: function(elements) {
				$bg.removeClass('translateY-reset');
			},
			complete: function(elements) {
				$bg.addClass('expanded translateY-reset');
			}
		});

		// Calculate the new position for each row
		var rowHeight = $rows.outerHeight();
		$rows.each(function(index, row) {
			var $row = $(row);

			// Save original row values
			originalRows[index] = {
				positionY: $row.offset().top
			};
			console.log($row.offset().top);

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
					offsetY -= 10;
			}

			$row.velocity({

				// Move each row down into its natural position
				translateY: offsetY

			}, {
				begin: function(elements) {
					elements.forEach(function(element, i) {
						$(element).removeClass('translateY-reset');
					});
				},
				complete: function(elements) {
					elements.forEach(function(element, i) {
						// $(element).removeAttr('style');
						$(element).addClass('expanded translateY-reset');
					});
				}
			});
		});

		// Calculate the new table size and position
		var tableOffsetTop = 60;
		// var tableHeight = rowHeight * $rows.length - 40;
		$table.velocity({

			// Grow to encompass all of the rows
			// height: tableHeight

			// Move down a few pixels to account for the header
			translateY: tableOffsetTop

		}, {
			begin: function(elements) {
				$table.removeClass('translateY-reset');
			},
			complete: function(elements) {
				$table.addClass('expanded translateY-reset');
			}
		});

		// Bring the header into view
		$header.velocity({

			// Fade the header into view
			opacity: 1

		}, {
			complete: function(elements) {
				$header.addClass('expanded');
			}
		});
	}

	function collapseTable($table) {
		var $parent = $table.parents('.columns-table-widget');
			$bg = $parent.find('.columns-table-container'),
			$rows = $parent.find('.columns-table-row'),
			$header = $parent.find('.columns-table-header');

		// Calculate new background position
		$bg.velocity({

			// Return to small state
			height: originalBackground.height,

			// Move back to original position
			translateY: originalBackground.positionY

			
		},{
			begin: function(elements) {
				$bg.removeClass('translateY-reset');
			},
			complete: function(elements) {
				$bg.removeClass('expanded');
				$bg.addClass('translateY-reset');
				// $table.removeClass('expanded');
			}
		});

		// Calculate the old position for each row
		$rows.each(function(index, row) {
			var $row = $(row);
			var newPosition = originalRows[index].positionY - $row.offset().top;
			console.log($row.offset().top);
			$row.velocity({

				// Move each row to its collapsed position
				translateY: newPosition

			}, {
				begin: function(elements) {
					elements.forEach(function(element, i) {
						// $(element).removeClass('translateY-reset');
					});
				},
				complete: function(elements) {
					elements.forEach(function(element, i) {
						$(element).removeClass('expanded');
						$(element).addClass('translateY-reset');
					});
				}
			});
		});

		// Calculate the old table size and position
		$table.velocity({

			// Move to top of container
			// translateY: 0
			opacity: 1

		}, {
			begin: function(elements) {
				// $table.removeClass('translateY-reset');
			},
			complete: function(elements) {
				$table.removeClass('expanded');
				$table.addClass('translateY-reset');
			}
		});

		// Remove header from view
		$header.velocity({

			// Fade the header out of view
			opacity: 0

		}, {
			complete: function(elements) {
				$header.removeClass('expanded');
			}
		});
	}

});