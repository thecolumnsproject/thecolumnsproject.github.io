var $$ = require('../../bower_components/jquery/dist/jquery.js');

var Config = require('../embed-config.js'),
	Velocity = require('../../bower_components/velocity/velocity.js'),
	Hammer = require('../../vendor/hammer.js'),
	PreventGhostClick = require('../../vendor/prevent-ghost-click.js'),
	ColumnsEvent = require('./ColumnsEvent.js'),
	ColumnsAnalytics = require('./ColumnsAnalytics.js');

// Make sure our version of jquery isn't polluting the namespace
// if ( window.jQuery ) {
// 	$$ = window.jQuery.noConflict(true);	
// } else {
// 	$$ = $;
// }

// Table Expansion
// -------------------

// Table should respond to the user's drag
// and progressively open as it is pulled away
// from its original location on the page

// Animation Constants
var ANIMATION_DURATION = 250;

// UI Constants
var ROW_OFFSET = 5,
	ROW_DELAY = ANIMATION_DURATION * 0.01;

// UI Management Classes
var TABLE_SELECTOR = '.columns-table-widget',
	TABLE_BODY_SELECTOR = '.columns-table',
	TABLE_ROW_SELECTOR = '.columns-table-row',
	TABLE_HEADER_SELECTOR = '.columns-table-header',
	TABLE_FOOTER_SELECTOR = '.columns-table-footer',
	PLACEHOLDER_CLASS = 'columns-table-placeholder',
	EXPANDED_CLASS = 'expanded',
	EXPANDING_CLASS = 'expanding',
	COLLAPSING_CLASS = 'collapsing',
	RELOCATED_CLASS = 'relocated',
	LOADING_CLASS = 'loading',
	ERROR_CLASS = 'error',
	ANIMATING_CLASS = 'velocity-animating',
	$TABLE;
	// $$CONTAINER = $$(window);

var MAX_SMARTPHONE_SCREEN_WIDTH = 568;

// File System Constants
// var API_HOST = '{{api_host}}';
// var ROOT_PATH = '{{root_path}}';
// var API_HOST = 'http://127.0.0.1:8080/api';
// var API_HOST = 'http://api-env-qdfe3rbbmw.elasticbeanstalk.com/api';
// var ROOT_PATH = 'http://127.0.0.1/';
// var ROOT_PATH = 'https://thecolumnsproject.github.io/';
// if (env) {
// 	switch (env) {
// 		case 'local':
// 			ROOT_PATH = 'http://localhost/'
// 			break;
// 		default:
// 			ROOT_PATH = 'https://thecolumnsproject.github.io/';
// 	}
// }
// var EMBED_PATH = ROOT_PATH + '/public/embed-table.js';
// var CSS_PATH = ROOT_PATH + '/css/embed-table.css';
// var IMG_PATH = ROOT_PATH + '/images/';

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

// Create a class for the table object
// that will allow us to easily manange multiple instances
// and control their display.
// Methods herein should allow the table to:
// 1) Render initially
// 2) Populate with data
// 3) Expand
// 4) Contract
function ColumnsTable(script) {

	// The placement of each table is dependent on the script that
	// was used to create it, so we need this to begin
	this.script = script;
	this.id = $$(script).data('table-id');

	// Determine whether or not we're in preview mode
	this.preview = $$(script).data('preview');
	this.forceMobile = $$(script).data('force-mobile');
	this.sample = $$(script).data('sample');

	// Remember the table instance once it's been inserted into the DOM
	// as well as its jquery counterpart
	this.table;
	this.$$table;

	// Get a reference to the table's container.
	// On a smartphone, we'll use the window.
	// On larger form factors, we'll use the table's container.
	this.$$container = $$(window);

	// Save a reference to the layout we create specifically for rows of this table
	this.row_layout;

	// Storage variables for resetting positions
	this.originalBackground = {};
	this.originalRows = [];
	// this.$$originalSibling;

	// Save a copy of the data so we can re-render the layout without going back to the server
	this.data;
	this.layout;

	if ( this.preview ) {
		this._setupEventListeners();
	}

	// Create a unique handlebars environment
	// this.columnsbars = Handlebars.noConflict();
	// this._setupHandlebars();
};

ColumnsTable.prototype._setupHandlebars = function() {

	// Handlebars.registerHelper('partial', function(name, ctx, hash) {
	//     // var ps = Handlebars.partials;
	//     // if(typeof ps[name] !== 'function')
	//     //     ps[name] = Handlebars.compile(ps[name]);
	//     // return ps[name](ctx, hash);

	//     return Columns['row-templates'][ name ](ctx, hash);
	// }.bind(this));
	// Handlebars.registerPartial({
	// 	group: Columns.EmbeddableTemplates['templates/embed-table/row-group.hbs']
	// });
	// Handlebars.registerPartial('group', Handlebars.template( Columns.EmbeddableTemplates['templates/embed-table/row-group.hbs']) );
	// Handlebars.registerPartial('column', Columns.EmbeddableTemplates['templates/embed-table/row-value.hbs']);
	// Handlebars.registerPartial('footer', Columns.EmbeddableTemplates['templates/embed-table/footer.hbs']);
	Handlebars.registerPartial('layout', Columns.EmbeddableTemplates['templates/embed-table/layout.hbs']);
	Handlebars.registerPartial('style', Columns.EmbeddableTemplates['templates/embed-table/style.hbs']);

	// Handlebars.registerHelper('ifIsGroup', function(type, options) {
	// 	return type == 'group' ? options.fn(this) : options.inverse(this);
	// });

	// Handlebars.registerHelper('ifIsSingle', function(type, options) {
	// 	return type == 'single' ? options.fn(this) : options.inverse(this);
	// });
};

// Render the initial table to the screen and position it correctly
ColumnsTable.prototype.render = function() {

	var _this = this;

	// Generate table skeleton
	// and insert it befor the script
	var skeleton = Columns.EmbeddableTemplates['templates/embed-table/skeleton.hbs'];
	var tmpDiv = document.createElement('div'); tmpDiv.innerHTML = skeleton();
	this.table = this.script.parentNode.insertBefore(tmpDiv.firstChild, this.script);
	this.$$table = $$(this.table);

	// Generate table structure
	// var loading = createLoading();
	// var body = createBody();
	var loading = Columns.EmbeddableTemplates['templates/embed-table/loading.hbs'];
	var error = Columns.EmbeddableTemplates['templates/embed-table/error.hbs'];
	var body = Columns.EmbeddableTemplates['templates/embed-table/body.hbs'];
	this.$$table.append(loading({img_path: Config.img_path}));
	this.$$table.append(error());
	this.$$table.append(body());

	// // Make the table bounce on scroll
	// // $TABLE.find('.columns-table-container').fancy_scroll({
	// // 	animation: "bounce"
	// // });

	// Determine whether we're on a small or large form factor
	// and use this to determine how to expand and contract
	// as well as initially place the table
	if (this.isLargeFormFactor()) {
		this.$$container = this.$$table.parent();
		this.$$table.addClass('large-form-factor');
	} else {
		this.$$container = $$(window);
		this.$$table.addClass('small-form-factor');
	}

	// Position table correctly given the size of the screen
	// and reposition on resize events
	$$(window).resize(function() {
		_this.position();
	});
	this.position();

	// // Prevent ghost clicks while the table is open
	PreventGhostClick(document, function() {
		return _this.$$table.hasClass(EXPANDING_CLASS) || _this.$$table.hasClass(EXPANDED_CLASS)
	});

	// Track the table render
	this.send({
		category: 'table',
		action: 'render'
	});
};

ColumnsTable.prototype.isLargeFormFactor = function() {
	return $$(window).width() > MAX_SMARTPHONE_SCREEN_WIDTH;
};

ColumnsTable.prototype.getOffsetTop = function() {
	if (this.isLargeFormFactor()) {
		return this.$$table.position().top; 
		// return this.$$container.scrollTop();
	} else {
		// return this.$$table.offset().top;
		// return this.$$table.get(0).offsetTop;
		return this.$$table.get(0).getBoundingClientRect().top + window.pageYOffset;
	}
};

ColumnsTable.prototype.getOffsetLeft = function() {
	if (this.isLargeFormFactor()) {
		return this.$$table.position().left; 
	} else {
		return this.$$table.offset().left;
	}
};

// Ensure that the table is positioned correctly on the screen
// Smartphones: it should be the full width of the screen and left-aligned
ColumnsTable.prototype.position = function() {
	var properties = {
		'width': this.$$container.innerWidth()
	}

	// Only move the table if it's not aligned with the left side of the screen
	var offset = this.getOffsetLeft();
	if (offset != 0) {
		properties['margin-left'] = -offset 
	}

	// Make the table the width of the window
	// and left align it with the window 
	this.$$table.css(properties);
};

// Download the appropriate data from the api
ColumnsTable.prototype.fetchData = function() {
	var _this = this;

	// First turn on loading
	this.setLoading(true);
	$$.get(Config.api_host + '/columns/table/' + this.id + '?page=0', function(data) {
		if (data.status == 'success') {
			_this.generateLayout($$.parseJSON(data.data.layout));
			_this.renderData(data.data);
			_this.setError(false);

			// Track the table population
			this.send({
				category: 'table',
				action: 'populate'
			});

		} else {
			_this.setLoading(false);
			_this.setError(true);
		}
	}.bind( this ));

	// var _this = this;
	// setTimeout(function() {
	// 	_this.generateLayout(DUMMY_DATA.layout);
	// 	_this.renderData(DUMMY_DATA);
	// }, 100);
};

ColumnsTable.prototype.templateName = function() {
	// return 'row_layout_' + Columns.scripts.indexOf(this.script); 
	return 'row_layout';
};

ColumnsTable.prototype.generateLayout = function(layout, reload) {
	// Set up the row layout as a handlebars partial
	// dynamically based on the row layout object
	this.layout = layout;
	// var row_layout = Columns.EmbeddableTemplates['templates/embed-table/row-layout.hbs']({layout: layout});
	// var row_template = Handlebars.compile(row_layout);
	// var templateName = this.templateName();
	// // Handlebars.registerPartial('row_layout', row_template);

	// if ( !Columns['row-templates'] ) Columns['row-templates'] = [];
	// Columns['row-templates'][ Columns.scripts.indexOf( this.script ) ] = row_template;

	if (reload) {
		this.renderData();
	}
};

ColumnsTable.prototype.renderData = function(data) {
	var _this = this;

	// If no data was passed in, re-render with the old data
	if (!data) {
		if (!this.data) {
			return;
		} else {
			data = this.data;
		}
	} else {
		this.data = data;
	}

	// var numRows = data.data.length;

	// Generate table layouts with data
	var header = Columns.EmbeddableTemplates['templates/embed-table/header.hbs'];
	var rowsTemplate = Columns.EmbeddableTemplates['templates/embed-table/rows.hbs'];
	var footer = Columns.EmbeddableTemplates['templates/embed-table/footer.hbs'];

	// Render table components with data
	var $$tableBody = this.$$table.find(TABLE_BODY_SELECTOR);
	var $$header = this.$$table.find(TABLE_HEADER_SELECTOR);
	var $$footer = this.$$table.find(TABLE_FOOTER_SELECTOR);
	var $$rows = this.$$table.find(TABLE_ROW_SELECTOR);

	if ($$header.length > 0) {
		this.updateComponent($$header, {
			title: data.title,
			sort_by_column: data.sort_by_column
		}, header);
	} else {
		$$tableBody.before(header({
			title: data.title,
			sort_by_column: data.sort_by_column
		}));
	}

	if ($$footer.length > 0) {
		this.updateComponent($$footer, {
			source: data.source,
			item_count: data.num_rows || data.data.length
		}, footer);
	} else {
		$$tableBody.after(footer({
			source: data.source,
			item_count: data.num_rows || data.data.length
		}));
	}

	var shouldRunRowIntroAnimation = false;
	if ($$rows.length == 0 && !this.preview ) {
		shouldRunRowIntroAnimation = true;
	}

	// For now, only render the first 20 rows
	$$rows.remove();
	// $$tableBody.prepend(rowsTemplate({
	// 	row_layout: Columns.scripts.indexOf( this.script ),
	// 	rows: data.data.slice(0, 20)
	// }));
	
	data.data.slice( 0, 20 ).forEach(function( rowData, i) {
		$$tableBody.append( this.renderRow( rowData, i, this.layout ) );
	}.bind( this ));

	// If we're in preview and the table is expanded,
	// refresh the amount of padding we add to the top
	// to account for the template
	if (this.preview && this.$$table.hasClass(EXPANDED_CLASS)) {
		$$tableBody.css({
			paddingTop: this.tallestRowHeight()
		});
	}

	// Reset rows to equal the new rows we just added
	$$rows = this.$$table.find(TABLE_ROW_SELECTOR);
	$$rows.css({height: this.tallestRowHeight()});

	// Set any dynamic sizing or positioning values
	// and animate the various components in
	var introSequence = [];
	var tableHeight = this.backgroundHeight();
	var duration = 0;
	if (shouldRunRowIntroAnimation) {
		duration = ANIMATION_DURATION;
		var delay = ANIMATION_DURATION / 3;
		Velocity($$tableBody.get(0), {
		// $$tableBody.velocity({
			height: tableHeight
		}, {
			duration: duration
		});
		$$.each($$rows, function(index, row) {

			// Only animate the two drooping rows
			if (index >= 0 && index <= 2) {
				var $$row = $$(row);
				Velocity($$row.get(0), {
				// $$row.velocity({
					translateY: 5
				}, {duration: ANIMATION_DURATION / 6,
					delay: delay * index
				});
				Velocity($$row.get(0), {
				// $$row.velocity({
					translateY: 0
				}, {
					duration: ANIMATION_DURATION / 6
				});
			}
		});
	} else {
		Velocity($$tableBody.get(0), {
		// $$tableBody.velocity({
			height: tableHeight
		}, {
			duration: duration
		});
	}

	// Set up DOM events on the table
	this.setupEvents();

	// Announce that the table has rendered data
	if (this.preview || this.sample ) {
		// $(document).trigger('ColumnsTableDidRenderData', {table: this});
		ColumnsEvent.send('ColumnsTableDidRenderData', {table: this});
	}

	// Remove the loading class after the screen repaints
	setTimeout(function() {
		_this.setLoading(false);
	}, 100);
};

ColumnsTable.prototype.renderRow = function( data, index, layout ) {
	var $$rowLayout = $$( Columns.EmbeddableTemplates['templates/embed-table/row-layout.hbs']() );

	// Make sure the row is properly z-indexed
	// Lower rows should be z-indexed below higher rows
	$$rowLayout.css( { "z-index": -index } );

	return $$rowLayout.append( this.renderRowComponent( data, layout ) );
};

ColumnsTable.prototype.renderRowComponent = function( data, component ) {
	var $$component,
		groupTemplate = Columns.EmbeddableTemplates['templates/embed-table/row-group.hbs'],
		valueTemplate = Columns.EmbeddableTemplates['templates/embed-table/row-value.hbs'];

	// Render the top level component
	// as a group if it's a group
	// or a value if it's a value
	if ( component.type === 'group' ) {
		$$component = $$( groupTemplate({
			style: component.style,
			layout: component.layout
		}));

		component.values.forEach(function( value, i) {
			$$component.append( this.renderRowComponent( data, value ) );
		}.bind( this ));

		return $$component;
	} else if ( component.type === 'single' ) {
		$$component = $$( valueTemplate({
			data: data[ component.data ],
			style: component.style
		}));

		return $$component;
	}

};

ColumnsTable.prototype.tallestRowHeight = function() {
	return Math.max.apply(null, this.$$table.find(TABLE_ROW_SELECTOR).map(function () {
		return $$(this).outerHeight();
	}).get());
};

ColumnsTable.prototype.backgroundHeight = function() {
	var numRows = this.$$table.find(TABLE_ROW_SELECTOR).length;
	var offsetHeight = numRows > 3 ? ROW_OFFSET * 2 : ROW_OFFSET * (numRows - 1);
	return offsetHeight + this.tallestRowHeight();
};

ColumnsTable.prototype.headerHeight = function() {
	return this.$$table.find( TABLE_HEADER_SELECTOR ).outerHeight();
}

ColumnsTable.prototype.updateComponent = function($$component, data, template) {
	// If there is alread a component, just update it with the new data
	var oldStyle = $$component.attr('style');
	var oldClasses = $$component.attr('class');
	var $$template = $(template(data)).attr('style', oldStyle).attr('class', oldClasses);
	$$component.replaceWith($$template);
};

ColumnsTable.prototype.setupEvents = function() {
	var _this = this;

	var tableMc = new Hammer(this.$$table.find(".columns-table").get(0));
	tableMc.on('tap', function(e) {
		var $$table = $$(this);
		if (!_this.$$table.hasClass(EXPANDED_CLASS) && !$$table.hasClass(ANIMATING_CLASS)) {
			_this.expand();

			// Track this tap
			if ( _this.preview ) {
				ColumnsAnalytics.send({
					category: 'table',
					action: 'expand',
					label: 'body'
				});
			} else {
				this.send({
					category: 'table',
					action: 'expand',
					label: 'body'
				});
			}
		}
	}.bind( this ));
	// this.$$table.find(".columns-table").hammer(/*{domEvents: true}*/).bind('tap', function(e) {
	// 	var $$table = $$(this);
	// 	if (!_this.$$table.hasClass(EXPANDED_CLASS) && !$$table.hasClass(ANIMATING_CLASS)) {
	// 		_this.expand();
	// 	}
	// });

	var expandMc = new Hammer(this.$$table.find(".columns-table-expand-button").get(0));
	expandMc.on('tap', function(e) {
		var $$table = $$(this);
		if (!_this.$$table.hasClass(EXPANDED_CLASS) && !$$table.hasClass(ANIMATING_CLASS)) {
			_this.expand();

			// Track this tap
			if ( _this.preview ) {
				ColumnsAnalytics.send({
					category: 'table',
					action: 'expand',
					label: 'expand button'
				});
			} else {
				this.send({
					category: 'table',
					action: 'expand',
					label: 'expand button'
				});
			}
		}
	}.bind( this ));
	// this.$$table.find(".columns-table-expand-button").hammer(/*{domEvents: true}*/).bind('tap', function(e) {
	// 	var $$table = $$(this);
	// 	if (!_this.$$table.hasClass(EXPANDED_CLASS) && !$$table.hasClass(ANIMATING_CLASS)) {
	// 		_this.expand();
	// 	}
	// });

	var errorMc = new Hammer(this.$$table.find(".columns-table-error").get(0));
	errorMc.on('tap', function(e) {
		var $$table = $$(this);
		if (_this.$$table.hasClass(ERROR_CLASS)) {
			_this.fetchData();

			// Track this tap
			if ( _this.preview ) {
				ColumnsAnalytics.send({
					category: 'table',
					action: 'retry',
					label: 'error message'
				});
			} else {
				this.send({
					category: 'table',
					action: 'retry',
					label: 'error message'
				});
			}
		}
	}.bind( this ));
	// this.$$table.find(".columns-table-error").hammer(/*{domEvents: true}*/).bind('tap', function(e) {
	// 	var $$table = $$(this);
	// 	if (_this.$$table.hasClass(ERROR_CLASS)) {
	// 		_this.fetchData();
	// 	}
	// });

	// $(".columns-table").click(function(e) {
	// 	$table = $(this);
	// 	if (!$table.hasClass(EXPANDED_CLASS) && !$table.hasClass(ANIMATING_CLASS)) {
	// 		expandTable($table);
	// 	}
	// });

	var closeMc = new Hammer(this.$$table.find(".columns-table-close-button").get(0));
	closeMc.on('tap', function(e) {
		var $$table = _this.$$table.find('.columns-table');
		if (_this.$$table.hasClass(EXPANDED_CLASS) && !$$table.hasClass(ANIMATING_CLASS)) {
			_this.collapse();

			// Track this tap
			if ( _this.preview ) {
				ColumnsAnalytics.send({
					category: 'table',
					action: 'collapse',
					label: 'close button'
				});
			} else {
				this.send({
					category: 'table',
					action: 'collapse',
					label: 'close button'
				});
			}

			// Prevent the dom from doing any other conflicting stuff
			// e.stopPropagation();
			// e.preventDefault();
		}
	}.bind( this ));
	// this.$$table.find(".columns-table-close-button").hammer(/*{domEvents: true}*/).bind('tap', function(e) {
	// 	var $$table = _this.$$table.find('.columns-table');
	// 	if (_this.$$table.hasClass(EXPANDED_CLASS) && !$$table.hasClass(ANIMATING_CLASS)) {
	// 		_this.collapse();

	// 		// Prevent the dom from doing any other conflicting stuff
	// 		e.stopPropagation();
	// 		e.preventDefault();
	// 	}
	// });

	// $(".columns-table-close-button").click(function(e) {
	// 	var $parent = $(this).parents('.columns-table-widget');
	// 	var $table = $parent.find('.columns-table');
	// 	if ($table.hasClass(EXPANDED_CLASS) && !$table.hasClass(ANIMATING_CLASS)) {
	// 		collapseTable($table);
	// 	}
	// });

	// Notify the preview template when the table scrolls
	if (this.preview || this.sample ) {
		this.$$table.find('.columns-table-container').on('scroll', function(e) {
			// $(document).trigger('ColumnsTableDidScroll', {table: _this, originalEvent: e});
			ColumnsEvent.send('ColumnsTableDidScroll', {table: _this, originalEvent: e});
		})
	}

	// Listen to scroll events on the table
	// this.$$table.find('.columns-table-container').on('scroll', function(e) {

		// Have we scrolled to the bottom and met all other conditions for rendering more rows?

		// Check whether we already have the data to render more rows

		// If not, download more rows first
		
	// });
};

ColumnsTable.prototype.setLoading = function(loading) {
	if (loading) {
		this.$$table.addClass(LOADING_CLASS);
	} else {
		this.$$table.removeClass(LOADING_CLASS);
	}
};

ColumnsTable.prototype.setError = function(error) {
	if (error) {
		this.$$table.addClass(ERROR_CLASS);
	} else {
		this.$$table.removeClass(ERROR_CLASS);
	}
}

// Methods to expand a table
// from to its original position
// to full-screen
// ------------------------------

ColumnsTable.prototype.expand = function() {
	
	var _this = this;

	// Tell everyone we're about to expand
	// var willExpandEvent = new CustomEvent('ColumnsTableWillExpand', {
	// 	detail: {
	// 		table: this.$$table
	// 	}
	// });
	if (this.preview || this.sample ) {
		// $(document).trigger('ColumnsTableWillExpand', {table: this});
		ColumnsEvent.send('ColumnsTableWillExpand', {table: this});
	}

	var $$table = this.$$table;
	$$bg = $$table.find('.columns-table-container'),
	$$body = $$table.find(TABLE_BODY_SELECTOR);
	$$rows = $$table.find('.columns-table-row'),
	$$header = $$table.find('.columns-table-header');
	$$footer = $$table.find('.columns-table-footer');

	// First move the table to the outermost part of the DOM
	// while maintaining its visual position
	// add a placeholder
	// and make sure we're the highest z-index in the land
	var offsetTop;
	if (this.preview || this.forceMobile ) {
		offsetTop = this.getOffsetTop() + this.$$container.scrollTop();
	} else {
		// offsetTop = parseInt($$.Velocity.hook($$table, "translateY"));
		offsetTop = this.getOffsetTop();
	}
	var offsets = {
		top: offsetTop,
		'margin-left': 0,
		position: 'absolute',
		'z-index': (highestZIndex('*') + 1)
	};
	
	// Replace the table with a same-height placeholder
	var placeholder = document.createElement('div');
	placeholder.className = PLACEHOLDER_CLASS;
	placeholder.style.height = $$table.outerHeight( true ) + 'px';
	placeholder.style.width = $$table.outerWidth() + 'px';
	// this.$$originalSibling = $$table.siblings('script').first();
	if (this.isLargeFormFactor()) {
		$$table.appendTo(this.$$container);	
	} else {
		$$table.appendTo('body');
	}
	$$table.addClass(RELOCATED_CLASS);
	$$table.css(offsets);
	// this.$$originalSibling.before(placeholder);
	$$( this.script ).before(placeholder);

	this.expandBackground($$bg, $$rows, $$header, $$footer);
	this.expandRows($$rows);
	this.expandBody($$body);
	this.expandHeader($$header);

	var props;
	if (this.preview || this.forceMobile ) {
		props = {
			translateY: -this.getOffsetTop()
		}
	} else {
		props = {
			opacity: 1
		}
	}

	Velocity($$table.get(0), props, { 
	// $$table.velocity(props, {

		duration: ANIMATION_DURATION,
		begin: function(elements) {
			$$table.addClass(EXPANDING_CLASS);
		},
		complete: function(elements) {
			$$table.addClass(EXPANDED_CLASS);
			$$table.removeClass(EXPANDING_CLASS);

			setTimeout(function() {
				$$('html').addClass('table-expanded');
				this.$$container.addClass('table-expanded');
			}.bind( this ), 0);

			if (_this.preview || this.sample ) {
				// $(document).trigger('ColumnsTableDidExpand', {table: _this});
				ColumnsEvent.send('ColumnsTableDidExpand', {table: _this});
			}
		}.bind( this )
	});

	this.position();
};

ColumnsTable.prototype.expandHeader = function($$header) {

	// Bring the header into view
	// Velocity($$header.get(0), {
	// // $$header.velocity({
	// 	opacity: 1 /* Fade the header into view */
	// }, {
	// 	duration: ANIMATION_DURATION,
	// 	delay: ANIMATION_DURATION,
	// 	complete: function(elements) {
	// 		// $$header.addClass(EXPANDED_CLASS);
	// 	}
	// });

	// Move header out of the table body
	// so that it locks atop the screen
	setTimeout(function() {
		this.$$table.prepend( $$header );
	}.bind( this ), ANIMATION_DURATION * 2 );
};

ColumnsTable.prototype.expandBackground = function($$bg, $$rows, $$header, $$footer) {

	// Save values to be used upon reset
	this.originalBackground['height'] = $$bg.height();
	var bgOffsetTop;
	if (this.isLargeFormFactor()) {
		this.originalBackground['positionY'] = $$bg.position().top;
		bgOffsetTop = 0;
	} else {
		this.originalBackground['positionY'] = $$bg.offset().top;
		bgOffsetTop = -$$bg.offset().top + this.$$container.scrollTop();
	}

	// Calculate new background position
	// bgOffsetTop += this.$$container.scrollTop();
	var bgWidth = this.$$container.width();

	// The background should be as tall as necessary to fit all the rows
	// but the screen height at minimum
	// Update: the background should be the height of the container
	// var bgHeight = $$bg.outerHeight() + $$header.outerHeight() + $$footer.outerHeight() + ( $$rows.outerHeight() * ($$rows.length - 1) );
	// var bgHeight = bgHeight < this.$$container.height ? this.$$container.height : bgHeight;
	// var bgHeight = this.$$container.height();
	// Use javascript height method because of a bug with jQuery and the iOS safari toolbar
	var bgHeight = this.$$container.get(0).innerHeight || this.$$container.outerHeight();

	Velocity($$bg.get(0), {
	// $$bg.velocity({
		height: bgHeight, 			/* Fill the entire screen */
		translateY: bgOffsetTop 	/* Move to the top of the screen */
	},{
		duration: ANIMATION_DURATION,
		begin: function(elements) {
			// $$bg.addClass(EXPANDING_CLASS);
			// $$bg.removeClass('translateY-reset');
		},
		complete: function(elements) {
			// $$bg.removeClass(EXPANDING_CLASS);
			// $$bg.addClass(EXPANDED_CLASS);
			// $$bg.addClass('translateY-reset');
			// $$TABLE.removeClass(RELOCATED_CLASS);
		}
	});
};

ColumnsTable.prototype.expandBody = function($$body) {

	var _this = this;
	// Calculate the new table size and position
	var tableOffsetTop = 40;

	// Move the table down a few extra pixels to account for the template if we're in preview mode
	var paddingTop = 0;
	if (this.preview) {
		paddingTop = this.tallestRowHeight();
	}
	// var tableHeight = rowHeight * $$rows.length - 40;

	Velocity($$body.get(0), {
	// $$body.velocity({
		// height: tableHeight, /* Grow to encompass all of the rows */
		translateY: tableOffsetTop + paddingTop, /* Move down a few pixels to account for the header */
		'padding-top': paddingTop /* Move down a few more pixels to account for the template row in preview mode */
	}, {
		duration: ANIMATION_DURATION,
		begin: function(elements) {
			// _this.$$table.addClass(EXPANDING_CLASS);
			// $$body.removeClass('translateY-reset');
		},
		complete: function(elements) {
			// _this.$$table.addClass(EXPANDED_CLASS);
			// _this.$$table.removeClass(EXPANDING_CLASS);
			// $$('html').addClass('table-expanded');
			// $$body.addClass(EXPANDED_CLASS);
			// $$body.addClass('translateY-reset');
			// $$body.css( { "margin-top": "60px" } );
		}
	});
}

ColumnsTable.prototype.expandRows = function($$rows) {

	var _this = this;

	// Calculate the new position for each row
	var duration = ANIMATION_DURATION - ( ($$rows.length - 1) * ROW_DELAY );
	$$rows.each(function(index, row) {
		var $$row = $$(row);

		// Save original row data
		_this.originalRows[index] = {
			positionY: $$row.offset().top
		}

		// Animate the rows
		_this.expandRowAtIndex($$row, index, duration);
	});
}

ColumnsTable.prototype.expandRowAtIndex = function($$row, index, duration) {

	var rowHeight = $$row.outerHeight();
	var offsetY = (index * rowHeight) - this.headerHeight();
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

	Velocity($$row.get(0), {
	// $$row.velocity({
		translateY: offsetY /* Move each row down into its natural position */
	}, {
		duration: duration,
		delay: ROW_DELAY,
		begin: function(elements) {
			// $$row.removeClass('translateY-reset');
		},
		complete: function(elements) {
			// $$row.addClass(EXPANDED_CLASS);
			// setTimeout(function() {
				// $$row.addClass('translateY-reset');	
				// $$row.css( { position: 'relative' } );
			// }, 0);
			
		}
	});
}

// Define table animation sequences
// var expandTableSequence = [
// 	{
// 		// Background
// 		elements: $$parent.find('.columns-table-container'),
// 		properties: {
// 			height: bgHeight, 			/* Fill the entire screen */
// 			translateY: bgOffsetTop 	/* Move to the top of the screen */
// 		}
// 	}
// ]

// Methods to collapse a table
// back to its original position
// ------------------------------

ColumnsTable.prototype.collapse = function() {
	var _this = this;
	var $$table = this.$$table;
	$$body = $$table.find(TABLE_BODY_SELECTOR);
	$$bg = $$table.find('.columns-table-container'),
	$$rows = $$table.find('.columns-table-row'),
	$$header = $$table.find('.columns-table-header');

	if (this.preview || this.sample ) {
		// $(document).trigger('ColumnsTableWillExpand', {table: this});
		ColumnsEvent.send('ColumnsTableWillCollapse', {table: this});
	}

	// and remove the placeholder

	// $$parent.addClass(RELOCATED_CLASS);
	// $$table.insertBefore( $$( this.script ) );

	// setTimeout(function() {
		this.collapseHeader($$header);
		this.collapseBackground($$bg);
		this.collapseBody($$body);
		this.collapseRows($$rows);
	// }, 0);

	var onCollapsed = function() {
		$$table.insertBefore( $$( this.script ) );
		$$table.removeClass(EXPANDED_CLASS);
		$$table.removeClass(RELOCATED_CLASS);
		$$table.removeClass(COLLAPSING_CLASS);
		// Move the table back to its original DOM position
		$$table.css({
			top: 0,
			position: 'relative',
			'z-index': 0
		});
		$$( this.script ).siblings('.' + PLACEHOLDER_CLASS).remove();
		$$('html').removeClass('table-expanded');
		this.$$container.removeClass('table-expanded');

		if (_this.preview || this.sample ) {
			// $(document).trigger('ColumnsTableDidCollapse', {table: _this});
			ColumnsEvent.send('ColumnsTableDidCollapse', {table: _this});
		}

		this.position();
	}.bind( this );

	$$table.addClass(COLLAPSING_CLASS);
	$$table.removeClass(EXPANDED_CLASS);

	// var props = {};
	if (this.preview || this.forceMobile ) {
		// props["translateY"] = 0;
		Velocity($$table.get(0), {
			translateY: 0
		}, {
			duration: ANIMATION_DURATION,
			complete: onCollapsed
		});
	} else {
		setTimeout( onCollapsed, ANIMATION_DURATION );
		// props["opacity"] = 1;
	}

	// Velocity($$table.get(0), props, {
	// // $$table.velocity(props, {
	// 	duration: ANIMATION_DURATION,
	// 	begin: function(elements) {
	// 		$$table.addClass(COLLAPSING_CLASS);
	// 		$$table.removeClass(EXPANDED_CLASS);
	// 	},
	// 	complete: function(elements) {
	// 		$$table.removeClass(RELOCATED_CLASS);
	// 		$$table.removeClass(COLLAPSING_CLASS);
	// 		// Move the table back to its original DOM position
	// 		$$table.css({
	// 			top: 0,
	// 			position: 'relative',
	// 			'z-index': 0
	// 		});
	// 		$$( this.script ).siblings('.' + PLACEHOLDER_CLASS).remove();
	// 		$$('html').removeClass('table-expanded');
	// 		this.$$container.removeClass('table-expanded');

	// 		if (_this.preview || this.sample ) {
	// 			// $(document).trigger('ColumnsTableDidCollapse', {table: _this});
	// 			ColumnsEvent.send('ColumnsTableDidCollapse', {table: _this});
	// 		}
	// 	}.bind( this )
	// });

	// this.position();
}

ColumnsTable.prototype.collapseHeader = function($$header) {

	// Remove header from view
	// Velocity($$header.get(0), {
	// // $$header.velocity({
	// 	opacity: 0 /* Fade the header out of view */
	// }, {
	// 	duration: ANIMATION_DURATION * 0.2,
	// 	complete: function(elements) {
	// 		$$header.removeClass(EXPANDED_CLASS);
	// 	}
	// });

	// Move header back into the table body
	// so that it sits nicely atop the table
	// setTimeout(function() {
		this.$$table.find( TABLE_BODY_SELECTOR ).before( $$header );
	// }.bind( this ), ANIMATION_DURATION );
}

ColumnsTable.prototype.collapseBackground = function($$bg) {

	var _this = this;

	// Calculate new background position
	Velocity($$bg.get(0), {
	// $$bg.velocity({

		// Return to small state
		// height: _this.originalBackground.height,
		height: _this.backgroundHeight() + 60 + _this.headerHeight(),
		// height: 'auto',

		// Move back to original position
		translateY: 0

	},{
		duration: ANIMATION_DURATION,
		begin: function(elements) {
			$$bg.addClass(COLLAPSING_CLASS);
			// $$bg.removeClass('translateY-reset');
			$$bg.removeClass(EXPANDED_CLASS);
		},
		complete: function(elements) {
			$$bg.removeClass(COLLAPSING_CLASS);
			// $$bg.addClass('translateY-reset');
		}
	});
}

ColumnsTable.prototype.collapseBody = function($$body) {

	var _this = this;
	// Calculate the old table size and position
	Velocity($$body.get(0), {
	// $$body.velocity({

		// Move to top of container
		translateY: 0,
		// Remove any padding we added for the template row in preview mode
		'padding-top': 0,
		// Adjust height in case any rows have changed
		height: _this.backgroundHeight()

	}, {
		duration: ANIMATION_DURATION,
		begin: function(elements) {
			// $$body.removeClass('translateY-reset');
			// $$body.removeClass(EXPANDED_CLASS);
			// _this.$$table.removeClass(EXPANDED_CLASS);
			// _this.$$table.addClass(EXPANDING_CLASS);
		},
		complete: function(elements) {
			// $$table.removeClass(EXPANDED_CLASS);
			// $$body.addClass('translateY-reset');
			// $$body.css( { "margin-top": "0px" } );
			// _this.$$table.removeClass(RELOCATED_CLASS);
			// _this.$$table.removeClass(EXPANDING_CLASS);
			// _this.$$table.css({
			// 	top: 0,
			// 	position: 'relative',
			// 	'z-index': 0
			// });
		}
	});
}

ColumnsTable.prototype.collapseRows = function($$rows) {

	var _this = this;
	var duration = ANIMATION_DURATION - ( ($$rows.length - 1) * ROW_DELAY );
	$$rows.each(function(index, row) {
		_this.collapseRowAtIndex($$(row), index, duration);
	});
}

ColumnsTable.prototype.collapseRowAtIndex = function($$row, index, duration) {

	// Calculate the old position for each row
	var newPosition = this.originalRows[index].positionY - $$row.offset().top;
	Velocity($$row.get(0), {
	// $$row.velocity({

		// Move each row to its collapsed position
		translateY: 0

	}, {
		duration: duration,
		delay: ROW_DELAY,
		begin: function(elements) {
			// $$row.removeClass('translateY-reset');
			$$row.removeClass(EXPANDED_CLASS);
			// $$row.css( { position: 'absolute' } );
		},
		complete: function(elements) {
			// $$row.addClass('translateY-reset');
		}
	});
}

ColumnsTable.prototype._setupEventListeners = function() {
	ColumnsEvent.on( 'Columns.Table.DidUploadWithSuccess', this._onTableDidUpload.bind( this ) );
	// ColumnsEvent.on( 'Columns.Layout.DidChange', table._onLayoutDidChange.bind( table ) );
	// ColumnsEvent.on( 'Columns.EmbedDetailsView.DidUpdatePropertyWithValue', table._onDetailsDidChange.bind( table ) );
	ColumnsEvent.on( 'Columns.Table.DidChange', this._onTableDidChange.bind( this ) );
};

ColumnsTable.prototype._onTableDidUpload = function( event, data ) {
	var table = data.table;

	// Generate a layout
	this.generateLayout( table.layout.model, false );

	// Render Data
	this.renderData( table );

	// Expand yourself
	this.expand();
};

// ColumnsTable.prototype._onTableDidChange = function( event, data ) {

// 	// Generate a new layout and reload
// 	this.generateLayout( data.layout.model, true );

// };

ColumnsTable.prototype._onTableDidChange = function( event, data ) {
	var table = data.table;

	// Generate a layout
	this.generateLayout( table.layout.model, false );

	// Render Data
	this.renderData( table );

};

ColumnsTable.prototype.send = function( props ) {
	var props = props || {},
		mixpanelObj = {};

	// Don't send events if this is a preview
	// or a sample table
	if ( this.preview || this.sample ) {
		return;
	}

	// Make sure the properties are santized
	props.action = props.action || '';
	props.category = props.category || '';
	props.label = props.label || '';
	props.description = props.description || props.category + ' ' + props.action + ' ' + props.label;
	props.description = props.description == '  ' ? '' : props.description;
	props.table_id = this.id;
	mixpanelObj['Table ID'] = props.table_id;

	// Send a Google Analytics event
	if ( window.gaColumnz ) {
		gaColumnz( 'send', 'event', props.category, props.action, props.label, props.table_id );
	}

	// Send a mixpanel event
	if ( window.mixpanel ) {
		// mixpanel.track( props.description, mixpanelObj );
	}

};

module.exports = ColumnsTable;