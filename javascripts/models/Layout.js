// Layout Object Methods
// ----------------------
// This is the layout object that controls
// the way the table is rendered and styled.
// The methods below allow us to:
// 1) Traverse the template and construct a new object
// 2) Update the object when styles are adjusted

// Columns.Layout = new function() {
function Layout( items ) {

	// Make sure all items are of right type
	this.items = [];
	if ( items ) {
		items.forEach(function( item, i ) {
			if ( item instanceof Item ) {
				this.items.push( item );
			} else {
				throw "exception: all items must of type Item";
			}
		}.bind( this ));
	}

	// Build a default layout with the passed-in items
	this.model = this.defaultLayout( this.items );

	this._setupEventListeners();
}

Layout.prototype.update = function() {
	var $template = $('.layout-template-row-group').first();
	this.model = this._generateModelForTemplate( $template );
	this._emitChange();
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