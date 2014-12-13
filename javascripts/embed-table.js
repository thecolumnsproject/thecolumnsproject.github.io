$(function() {

	var DUMMY_DATA = {
		source: 'Lubin Truth Institute',
		title: 'Friends of Mine',
		sort_by_column: 'age',
		layout: {
			style: [{
				property: 'padding',
				value: '12px'
			}],
			values: [{
				type: 'group',
				layout: [{
					property: 'flex-direction',
					value: 'column'
				}, {
					property: 'align-items',
					value: 'flex-start'
				}],
				values: [{
					type: 'single',
					style: [{
						property: 'color',
						value: '#3a3a3a'
					}],
					data: '{{this.first_name}} {{this.last_name}}'
				},{
					type: 'single',
					data: '{{this.hometown}}',
					style: [{
						property: 'color',
						value: '#888'
					},{
						property: 'font-size',
						value: '14px'
					}]
				}]
			},
			{
				type: 'group',
				layout: [{
					property: 'flex-direction',
					value: 'column'
				}, {
					property: 'align-items',
					value: 'flex-end'
				}],
				values: [{
					type: 'single',
					data: '{{this.age}}',
					style: [{
						property: 'color',
						value: '#3a3a3a'
					},{
						property: 'font-size',
						value: '24px'
					}]
				}, {
					type: 'single',
					data: '{{this.unit}}',
					style: [{
						property: 'color',
						value: '#ababab'
					},{
						property: 'font-size',
						value: '10px'
					}]
				}]
			}]
		},
		data: [{
			first_name: 'Jeremy',
			last_name: 'Lubin',
			hometown: 'Princeton',
			age: 27,
			unit: 'Years'
		},
		{
			first_name: 'Amir',
			last_name: 'Kanpurwala',
			hometown: 'Princeton',
			age: 27,
			unit: 'Years'
		},
		{
			first_name: 'Jeff',
			last_name: 'LaFlam',
			hometown: 'Raliegh',
			age: 28,
			unit: 'Years'
		},
		{
			first_name: 'Phil',
			last_name: 'Chacko',
			hometown: 'Princeton',
			age: 28,
			unit: 'Years'
		},
		{
			first_name: 'Albert',
			last_name: 'Choi',
			hometown: 'Raliegh',
			age: 13,
			unit: 'Years'
		},
		{
			first_name: 'Kelly',
			last_name: 'Fee',
			hometown: 'Chicago',
			age: 27,
			unit: 'Years'
		},
		{
			first_name: 'Elaine',
			last_name: 'Zelby',
			hometown: 'Chicago',
			age: 27,
			unit: 'Years'
		},
		{
			first_name: 'Kousha',
			last_name: 'Navidar',
			hometown: 'Albany',
			age: 26,
			unit: 'Years'
		},
		{
			first_name: 'Jess',
			last_name: 'Schwartz',
			hometown: 'Mechanicsburg',
			age: 28,
			unit: 'Years'
		},
		{
			first_name: 'Craig',
			last_name: 'Hosang',
			hometown: 'Alameda',
			age: 28,
			unit: 'Years'
		}]
	};

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
	var TABLE_CLASS = 'columns-table-widget',
		EXPANDED_CLASS = 'expanded',
		ANIMATING_CLASS = 'velocity-animating';


	// Table Creation
	// -------------------

	// Table should be created on page load
	// Create a custom layout template for this data set
	// Create a header based on the table title and configuration
	// Create a row for each value
	// Create a footer based on the source and item count

	function createTable(data) {
		var $table = $('.' + TABLE_CLASS);

		// Set up Handlebars partials, helpers and templates
		generateHandlebarsHelpers();
		generateHandlebarsPartials();
		generateRowLayout(data.layout);

		// Generate table layouts
		var header = createHeader(data.title, data.sort_by_column);
		var body = createBody(data.data, data.source, data.data.length);

		// Render table components
		$table.append(header);
		$table.append(body);
	}

	function createHeader(title, sort_by_column) {
		var header = Columns.Templates['templates/embed-table/header.hbs'];
		return header({title: title, sort_by_column: sort_by_column});
	}

	function createBody(rows, source, item_count) {
		var body = Columns.Templates['templates/embed-table/body.hbs'];
		return body({
			rows: rows,
			footer: {
				source: source,
				item_count: item_count
			}
		});
	}

	function generateRowLayout(layout) {
		var row_layout = Columns.Templates['templates/embed-table/row-layout.hbs']({layout: layout});
		var row_template = Handlebars.compile(row_layout);
		Handlebars.registerPartial('row_layout', row_template);
	}

	function generateHandlebarsPartials() {
		Handlebars.registerPartial('row', Columns.Templates['templates/embed-table/row.hbs']);
		Handlebars.registerPartial('group', Columns.Templates['templates/embed-table/row-group.hbs']);
		Handlebars.registerPartial('column', Columns.Templates['templates/embed-table/row-value.hbs']);
		Handlebars.registerPartial('footer', Columns.Templates['templates/embed-table/footer.hbs']);
		Handlebars.registerPartial('layout', Columns.Templates['templates/embed-table/layout.hbs']);
		Handlebars.registerPartial('style', Columns.Templates['templates/embed-table/style.hbs']);
	}

	function generateHandlebarsHelpers() {
		Handlebars.registerHelper('ifIsGroup', function(type, options) {
			return type == 'group' ? options.fn(this) : options.inverse(this);
		});

		Handlebars.registerHelper('ifIsSingle', function(type, options) {
			return type == 'single' ? options.fn(this) : options.inverse(this);
		});
	}

	createTable(DUMMY_DATA);


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