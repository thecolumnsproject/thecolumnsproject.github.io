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
					}, {
						property: 'margin-top',
						value: '4px'
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
			first_name: 'Jess',
			last_name: 'Schwartz',
			hometown: 'Mechanicsburg',
			age: 28,
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
		originalRows = [],
		$originalSibling;

	// Animation Constants
	var ANIMATION_DURATION = 350;

	// UI Constants
	var ROW_OFFSET = 5,
		ROW_DELAY = ANIMATION_DURATION * 0.01;

	// UI Management Classes
	var TABLE_SELECTOR = '.columns-table-widget',
		TABLE_BODY_SELECTOR = '.columns-table',
		TABLE_ROW_SELECTOR = '.columns-table-row',
		PLACEHOLDER_CLASS = 'columns-table-placeholder',
		EXPANDED_CLASS = 'expanded',
		EXPANDING_CLASS = 'expanding',
		RELOCATED_CLASS = 'relocated',
		LOADING_CLASS = 'loading',
		ANIMATING_CLASS = 'velocity-animating',
		$TABLE;

	// File System Constants
	var ROOT_PATH = 'http://127.0.0.1/';
	// if (env) {
	// 	switch (env) {
	// 		case 'local':
	// 			ROOT_PATH = 'http://localhost/'
	// 			break;
	// 		default:
	// 			ROOT_PATH = 'https://thecolumnsproject.github.io/';
	// 	}
	// }
	CSS_PATH = ROOT_PATH + 'css/embed-table.css',
	IMG_PATH = ROOT_PATH + 'images/';


	// Table Creation
	// -------------------

	// Table should be created on page load
	// Create a custom layout template for this data set
	// Create a header based on the table title and configuration
	// Create a row for each value
	// Create a footer based on the source and item count

	function createTable() {

		// Set up Handlebars partials, helpers and templates
		generateHandlebarsHelpers();
		generateHandlebarsPartials();

		// Get the CSS and add it to the DOM
		// getTableStyle(function(data) {
		// 	$TABLE.after($('<style>', {html: data}));
		// });
		getTableStyle();

		// Generate table skeleton
		// var skeleton = createSkeleton();
		// var script = getScript();
		// script.parentNode.insertBefore(skeleton, script);
		$TABLE = $(TABLE_SELECTOR);

		// Position table correctly given the size of the screen
		// and reposition on resize events
		positionTable();
		$(window).resize(positionTable);

		// Generate table structure
		var loading = createLoading();
		var body = createBody();

		// Render table components
		$TABLE.append(loading).addClass(LOADING_CLASS);
		$TABLE.append(body);

		// Make the table bounce on scroll
		// $TABLE.find('.columns-table-container').fancy_scroll({
		// 	animation: "bounce"
		// });

		
	}

	function getTableStyle(callback) {
		// $.get(CSS_PATH, function(data) {
		// 	console.log(data);
		// 	callback(data);
		// });
		var style = document.createElement('link');
		style.rel = 'stylesheet';
		style.type = 'text/css';
		style.href = CSS_PATH;
		style.media = 'all';
		document.head.appendChild(style);
	}

	function populateTable(data) {
		
		var numRows = data.data.length;

		// Set up Handlebars partials, helpers and templates
		generateRowLayout(data.layout);

		// Generate table layouts with data
		var header = createHeader(data.title, data.sort_by_column);
		var rows = createRows(data.data);
		var footer = createFooter(data.source, numRows);

		// Render table components with data
		$TABLE.prepend(header);
		var $tableBody = $(TABLE_BODY_SELECTOR);
		$tableBody.append(rows);
		$tableBody.after(footer);

		// Set any dynamic sizing or positioning values
		// and animate the various components in
		introduceTable(numRows);
		introduceRows();

		// Set up DOM events on the table
		setupTableEvents();

		// Remove the loading class after the screen repaints
		setTimeout(function() {
			$TABLE.removeClass(LOADING_CLASS);
		}, 100);
	}

	function getTableHeight(numRows, rowHeight) {

		// Calculate the table height
		// for the number of rows it contains
		// in contacted mode
		var offsetAmount = numRows > 3 ? ROW_OFFSET * 2 : ROW_OFFSET * (numRows - 1);
		return rowHeight + offsetAmount;
	}

	function positionTable() {

		// Don't do anything else if the table is already the width of the screen
		if ($TABLE.width() == $(window).width() || $TABLE.hasClass(EXPANDING_CLASS) || $TABLE.hasClass(EXPANDED_CLASS)) {
			return;
		}

		// Set up the new css properties for the table
		properties = {
			'width': $(window).width()
		}

		// Only move the table if it's not aligned with the left side of the screen
		var offset = $TABLE.offset().left;
		if (offset != 0) {
			properties['margin-left'] = -offset
		}

		// Make the table the width of the window
		// and left align it with the window 
		$TABLE.css(properties);
	}

	function createSkeleton() {
		var skeleton = Columns.Templates['templates/embed-table/skeleton.hbs'];
		return skeleton();
	}

	function createLoading() {
		var loading = Columns.Templates['templates/embed-table/loading.hbs'];
		return loading({img_path: IMG_PATH});
	}

	function createHeader(title, sort_by_column) {
		var header = Columns.Templates['templates/embed-table/header.hbs'];
		return header({title: title, sort_by_column: sort_by_column});
	}

	function createBody() {
		var body = Columns.Templates['templates/embed-table/body.hbs'];
		return body();
	}

	function createRows(rows) {
		var rowsTemplate = Columns.Templates['templates/embed-table/rows.hbs'];
		return rowsTemplate({rows: rows});
	}

	function createFooter(source, item_count) {
		var footer = Columns.Templates['templates/embed-table/footer.hbs'];
		return footer({
			source: source,
			item_count: item_count
		});
	}

	function getScript() {
		
		// Find all the scripts generaged by us
		var scripts = document.getElementsByTagName('script');
		for (var i = 0; i < scripts.length ; i++) {
			var script = scripts[i];
			if (script.src.search(ROOT_PATH) > -1) {
				return script;
			}
		}
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

	// Methods to animate table data
	// into place once it's been downloaded
	// ------------------------------

	function introduceTable(numRows) {
		var $table = $(TABLE_BODY_SELECTOR);

		$table.velocity({
			height: getTableHeight(numRows, $(TABLE_ROW_SELECTOR).height())
		}, {
			duration: ANIMATION_DURATION,
		});
	}

	function introduceRows() {
		var $rows = $(TABLE_ROW_SELECTOR);
		var delay = ANIMATION_DURATION / 3;
		$.each($rows, function(index, row) {

			// Only animate the two drooping rows
			if (index > 0 && index <= 2) {
				var $row = $(row);
				$row.velocity({
					translateY: 5
				}, {
					duration: ANIMATION_DURATION / 6,
					delay: delay * index
				}).velocity({
					translateY: 0
				}, {
					duration: ANIMATION_DURATION / 6
				});
			}
		})
	}

	// Bind the table and its components
	// to various tap handling events
	// ---------------------------------

	function setupTableEvents() {
		$(".columns-table").hammer({domEvents: true}).bind('tap', function(e) {
			$table = $(this);
			if (!$table.hasClass(EXPANDED_CLASS) && !$table.hasClass(ANIMATING_CLASS)) {
				expandTable($table);
			}
		});

		// $(".columns-table").click(function(e) {
		// 	$table = $(this);
		// 	if (!$table.hasClass(EXPANDED_CLASS) && !$table.hasClass(ANIMATING_CLASS)) {
		// 		expandTable($table);
		// 	}
		// });

		$(".columns-table-close-button").hammer({domEvents: true}).bind('tap', function(e) {
			var $parent = $(this).parents('.columns-table-widget');
			var $table = $parent.find('.columns-table');
			if ($table.hasClass(EXPANDED_CLASS) && !$table.hasClass(ANIMATING_CLASS)) {
				collapseTable($table);

				// Prevent the dom from doing any other conflicting stuff
				e.stopPropagation();
				e.preventDefault();
			}
		});

		// $(".columns-table-close-button").click(function(e) {
		// 	var $parent = $(this).parents('.columns-table-widget');
		// 	var $table = $parent.find('.columns-table');
		// 	if ($table.hasClass(EXPANDED_CLASS) && !$table.hasClass(ANIMATING_CLASS)) {
		// 		collapseTable($table);
		// 	}
		// });
	}

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
		$footer = $parent.find('.columns-table-footer');

		// First move the table to the outermost part of the DOM
		// while maintaining its visual position
		// add a placeholder
		// and make sure we're the highest z-index in the land

		console.log(highestZIndex('*'));

		var offsets = {
			top: $parent.offset().top,
			position: 'fixed',
			'z-index': highestZIndex('*') + 1
		};
		
		// Replace the table with a same-height placeholder
		var placeholder = document.createElement('div');
		placeholder.className = PLACEHOLDER_CLASS;
		placeholder.style.height = $parent.height() + 'px';
		placeholder.style.width = $parent.width() + 'px';
		$originalSibling = $parent.siblings('script').first();
		$parent.appendTo('body');
		// $parent.addClass(RELOCATED_CLASS);
		$parent.css(offsets);
		$originalSibling.before(placeholder);

		expandTableBackground($table, $bg, $rows, $header, $footer);
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

	function expandTableBackground($table, $bg, $rows, $header, $footer) {

		// Save values to be used upon reset
		originalBackground['height'] = $bg.height();
		originalBackground['positionY'] = $bg.offset().top;

		// Calculate new background position
		var bgOffsetTop = -$bg.offset().top + $(window).scrollTop();
		var bgWidth = $(window).width();

		// The background should be as tall as necessary to fit all the rows
		// but the screen height at minimum
		var bgHeight = $bg.height() + $header.height() + $footer.height() + ( $rows.height() * ($rows.length - 1) );
		var bgHeight = bgHeight < $(window).height ?  $(window).height : bgHeight;

		$bg.velocity({
			height: bgHeight, 			/* Fill the entire screen */
			translateY: bgOffsetTop 	/* Move to the top of the screen */
		},{
			duration: ANIMATION_DURATION,
			begin: function(elements) {
				$bg.addClass(EXPANDING_CLASS);
				$bg.removeClass('translateY-reset');
			},
			complete: function(elements) {
				$bg.removeClass(EXPANDING_CLASS);
				$bg.addClass(EXPANDED_CLASS);
				$bg.addClass('translateY-reset');
				$('html').addClass('table-expanded');
				$TABLE.removeClass(RELOCATED_CLASS);
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
		var duration = ANIMATION_DURATION - ( ($rows.length - 1) * ROW_DELAY );
		$rows.each(function(index, row) {
			var $row = $(row);

			// Save original row data
			originalRows[index] = {
				positionY: $row.offset().top
			}

			// Animate the rows
			expandTableRowAtIndex($table, $row, index, duration);
		});
	}

	function expandTableRowAtIndex($table, $row, index, duration) {

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
			duration: duration,
			delay: ROW_DELAY,
			begin: function(elements) {
				$row.removeClass('translateY-reset');
			},
			complete: function(elements) {
				$row.addClass(EXPANDED_CLASS);
				$row.addClass('translateY-reset');
			}
		});
	}

	// Define table animation sequences
	// var expandTableSequence = [
	// 	{
	// 		// Background
	// 		elements: $parent.find('.columns-table-container'),
	// 		properties: {
	// 			height: bgHeight, 			/* Fill the entire screen */
	// 			translateY: bgOffsetTop 	/* Move to the top of the screen */
	// 		}
	// 	}
	// ]


	// Methods to collapse a table
	// back to its original position
	// ------------------------------

	function collapseTable($table) {
		var $parent = $table.parents('.columns-table-widget');
		$bg = $parent.find('.columns-table-container'),
		$rows = $parent.find('.columns-table-row'),
		$header = $parent.find('.columns-table-header');

		// First move the table back to its original DOM position
		// while maintaining its visual position
		// and remove the placeholder
		var offsets = {
			top: 0,
			position: 'relative',
			'z-index': 0
		};
		// $parent.addClass(RELOCATED_CLASS);
		$parent.insertBefore($originalSibling);

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
				$bg.addClass(EXPANDING_CLASS);
				$bg.removeClass('translateY-reset');
				$bg.removeClass(EXPANDED_CLASS);
			},
			complete: function(elements) {
				$bg.removeClass(EXPANDING_CLASS);
				$bg.addClass('translateY-reset');
				$('html').removeClass('table-expanded');
				$TABLE.css({
					top: 0,
					position: 'relative',
					'z-index': 0
				});
				$originalSibling.siblings('.' + PLACEHOLDER_CLASS).remove();
				$TABLE.removeClass(RELOCATED_CLASS);
				positionTable();
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

		var duration = ANIMATION_DURATION - ( ($rows.length - 1) * ROW_DELAY );
		$rows.each(function(index, row) {
			collapseTableRowAtIndex($table, $(row), index, duration);
		});
	}

	function collapseTableRowAtIndex($table, $row, index, duration) {

		// Calculate the old position for each row
		var newPosition = originalRows[index].positionY - $row.offset().top;
		$row.velocity({

			// Move each row to its collapsed position
			translateY: 0

		}, {
			duration: duration,
			delay: ROW_DELAY,
			begin: function(elements) {
				$row.removeClass('translateY-reset');
				$row.removeClass(EXPANDED_CLASS);
			},
			complete: function(elements) {
				$row.addClass('translateY-reset');
			}
		});
	}

	// Utility methods
	// ------------------------------

	function highestZIndex(elem)
	{
		var elems = document.getElementsByTagName(elem);
		var highest = 0;
		for (var i = 0; i < elems.length; i++)
		{
			var zindex=document.defaultView.getComputedStyle(elems[i],null).getPropertyValue("z-index");
			zindex = parseInt(zindex);
			if ((zindex > highest) && !isNaN(zindex))
			{
				highest = zindex;
			}
		}
		return highest;
	}

	createTable();
	setTimeout(function() {
		populateTable(DUMMY_DATA)
	}, 1000);

});