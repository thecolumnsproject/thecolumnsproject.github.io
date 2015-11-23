// Layout Object Methods
// ----------------------
// This is the layout object that controls
// the way the table is rendered and styled.
// The methods below allow us to:
// 1) Traverse the template and construct a new object
// 2) Update the object when styles are adjusted

var ColumnsEvent 	= require('./ColumnsEvent.js');
var DEFAULTS		= require('../styling/defaults.js');

// Columns.Layout = new function() {
function Layout( options ) {

	// Make sure all items are of right type
	this.items = [];
	if ( options && options.items ) {
		options.items.forEach(function( item, i ) {
			if ( item instanceof Item ) {
				this.items.push( item );
			} else {
				throw "exception: all items must of type Item";
			}
		}.bind( this ));
	}

	// Build a default layout with the passed-in items
	// if no layout model is provided
	if ( options && options.layout ) {
		this.model = options.layout;
	} else {
		this.model = this.defaultLayout( this.items );
	}

	this._setupEventListeners();
}

Layout.prototype.update = function() {
	var $template = $('.layout-template-row-group').first();
	this.model = this._generateModelForTemplate( $template );
	this._emitChange();
};

Layout.prototype.getStyleForData = function( data ) {
	var styleOptions = [];

	// Cycle through the layout object until we get to a single value
	searchLayoutComponent( this.model );

	function searchLayoutComponent( component ) {

		// First make sure this is a value
		// otherwise keep searching
		if ( component.type === 'single' ) {
			if ( component.data === data ) {
				styleOptions.push( component.style || null );
			}
		} else {
			component.values.forEach(function( value, i) {
				searchLayoutComponent( value )
			}.bind( this ));
		}
	}

	if ( styleOptions.length ) {
		return styleOptions[ 0 ];
	} else {
		return styleOptions;
	}
};

Layout.prototype._generateModelForTemplate = function( $template ) {
	var model = {},
		subModel,
		item,
		group;

	// Skip inactive items
	if ( $template.hasClass('inactive') ) {
		return;
	}
	
	// Is the template a value or a group?
	if ( $template.hasClass('layout-template-row-group') ) {
		group = new TemplateGroupView({ style: $template.attr('style') })

		// Set the model type
		model['type'] = 'group';

		// Set the model style
		model['style'] = group.style.styles;

		// Set the model layout
		model['layout'] = TemplateGroupView.layoutForGroup( $template );

		// Get the group's values
		model['values'] = [];
		$template.children().each(function( i, child ) {
			subModel = this._generateModelForTemplate( $( child ) );
			if ( subModel ) {
				model.values.push( subModel );
			}
		}.bind( this ) );

	} else if ( $template.hasClass('layout-template-row-value') ) {
		// item = new Item({
		// 	title: $template.text().trim(),
		// 	style: $template.attr('style')
		// });

		// style = new Style( $template.attr('style') ).styles;

		// Set the model type
		model['type'] = 'single';

		// Set the model's style
		model['style'] = new Style( $template.attr('style') ).styles;

		// Set the value's data
		model['data'] = Item.unformattedTitle( $template.text().trim() );
	}

	return model;
};

Layout.prototype._emitChange = function() {
	ColumnsEvent.send('Columns.Layout.DidChange', {
		layout: 	this
	});
};

Layout.prototype._setupEventListeners = function() {

	// Listen to template change events
	ColumnsEvent.on( 'Columns.TemplateView.DidChange', this._onTemplateViewChange.bind( this ) );
};

Layout.prototype._onTemplateViewChange = function( event ) {
	this.update();
};

// Default layouts for various column numbers
Layout.prototype.defaultLayout = function( items ) {
	
	// Set up the default layout
	var layout = {
		type: 'group',
		style: [{
			property: 'padding',
			value: '12px'
		}],
		values: []
	};

	// Add to the default layout
	// according to the number of items
	switch ( items.length ) {
		case 0:
			break;
		case 1:
			layout['values'] = [{
				type: 'single',
				style: DEFAULTS.styles[ 0 ],
				data: items[ 0 ].unformattedTitle()
			}];
			break;
		case 2:
			layout['values'] = [{
				type: 'group',
				layout: DEFAULTS.layouts[ 0 ],
				values: [{
					type: 'single',
					style: DEFAULTS.styles[ 0 ],
					data: items[ 0 ].unformattedTitle()
				},{
					type: 'single',
					style: DEFAULTS.styles[ 1 ],
					data: items[ 1 ].unformattedTitle()
				}]
			}];
			break;
		default:
			layout['values'] = [{
				type: 'group',
				layout: DEFAULTS.layouts[ 0 ],
				values: [{
					type: 'single',
					style: DEFAULTS.styles[ 0 ],
					data: items[ 0 ].unformattedTitle()
				},{
					type: 'single',
					style: DEFAULTS.styles[ 1 ],
					data: items[ 1 ].unformattedTitle()
				}]
			}, {
				type: 'single',
				style: DEFAULTS.styles[ 2 ],
				data: items[ 2 ].unformattedTitle()
			}];
			break;
	}
	return layout;
};

module.exports = Layout;