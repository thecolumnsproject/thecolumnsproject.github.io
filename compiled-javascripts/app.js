(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
Columns['styleData'] = {
	components: {},
	types: {}
};
Columns.styleData.components['items'] = {
	title: 'Items',
	rows: [{
		items: [{
			kind: 'segmented-button',
			label: 'Layout',
			property: {
				name:'flex-direction'
			},
			buttons: [{
				value: 'row',
				icon: 'layout-horizontal'
			}, {
				value: 'column',
				icon: 'layout-vertical'
			}]
		}, {
			kind: 'segmented-button',
			label: 'Alignment',
			property: {
				name:'align-items'
			},
			buttons: [{
				value: 'flex-start',
				icon: 'position-left'
			}, {
				value: 'center',
				icon: 'position-center'
			}, {
				value: 'flex-end',
				icon: 'position-right'
			}]
		}]
	}]
}
Columns.styleData.components['margins'] = {
	title: 'Spacing',
	rows: [{
		items: [{
			kind: 'input',
			type: 'tel',
			canBeNegative: true,
			prependIcon: 'margin-top',
			appendControls: true,
			label: 'Top',
			property: 'margin-top',
			default: '0px'
		}, {
			kind: 'input',
			type: 'tel',
			canBeNegative: true,
			prependIcon: 'margin-bottom',
			appendControls: true,
			label: 'Bottom',
			property: 'margin-bottom',
			default: '0px'
		}]
	}, {
		items: [{
			kind: 'input',
			type: 'tel',
			canBeNegative: true,
			prependIcon: 'margin-left',
			appendControls: true,
			label: 'Left',
			property: 'margin-left',
			default: '0px'
		}, {
			kind: 'input',
			type: 'tel',
			canBeNegative: true,
			prependIcon: 'margin-right',
			appendControls: true,
			label: 'Right',
			property: 'margin-right',
			default: '0px'
		}]
	}]
};
Columns.styleData.components['text'] = {
	title: 'Text',
	rows: [{
		items: [{
			kind: 'input',
			type: 'tel',
			prependIcon: false,
			appendControls: true,
			label: 'Size',
			property: 'font-size',
			default: '14px'
		}, {
			kind: 'multiple-segmented-button',
			label: 'Style',
			buttons: [{
				property: {
					name: 'font-weight'
				},
				values: {
					active: 'bold',
					inactive: 'normal',
					default: 'normal'
				},
				icon: 'bold'
			}, {
				property: {
					name:'font-style'
				},
				values: {
					active: 'italic',
					inactive: 'normal',
					default: 'normal'
				},
				icon: 'italic'
			}, {
				property: {
					name:'text-decoration'
				},
				values: {
					active: 'underline',
					inactive: 'none',
					default: 'none'
				},
				icon: 'underline'
			}]
		}]
	}, {
		items: [{
			kind: 'input',
			type: 'color',
			prependIcon: false,
			appendControls: false,
			label: 'Color',
			property: 'color',
			default: '#3a3a3a'
		}, {
			kind: 'segmented-button',
			label: 'Alignment',
			property: {
				name: 'text-align',
				default: 'left'
			},
			buttons: [{
				value: 'left',
				icon: 'text-align-left'
			}, {
				value: 'center',
				icon: 'text-align-center'
			}, {
				value: 'right',
				icon: 'text-align-right'
			}]
		}]
	}]
};
Columns.styleData.types = {
	text: [
		Columns.styleData.components['text'],
		Columns.styleData.components['margins']
	],
	group: [
		Columns.styleData.components['items'],
	]
};
module.exports = Columns;
},{}],2:[function(require,module,exports){
var env = 'development';
module.exports = {
	development: {
		api: {
			host: 'http://127.0.0.1:8080'
		},
		web: {
			host: 'http://127.0.0.1'
		},
		embed: {
			host: 'http://127.0.0.1',
			path: '/public/embed-table.js'
		}
	},
	staging: {
		api: {
			host: 'http://apistg.thecolumnsproject.com'
		},
		web: {
			host: 'http://appstg.thecolumnsproject.com'
		},
		embed: {
			host: 'http://stg.colum.nz',
			path: '/public/embed-table.js'
		}
	},
	production: {
		api: {
			host: 'http://api.thecolumnsproject.com'
		},
		web: {
			host: 'http://app.thecolumnsproject.com'
		},
		embed: {
			host: 'http://colum.nz',
			path: '/public/embed-table.js'
		}
	}
}[env];
},{}],3:[function(require,module,exports){
var ColumnsEvent 			= require('../models/ColumnsEvent.js');
var config 					= require('../config.js');

var PANEL_TEMPLATE 			= Columns.Templates['templates/panels/panel.hbs'],
	BODY_TEMPLATE 			= Columns.Templates['templates/embed-details-panel/body.hbs'],
	SELECTOR 				= '#embed-details-panel',
	CLOSE_BUTTON_SELECTOR 	= '.columns-panel-header-close-button',
	BLOCKER_SELECTOR 		= '.columns-panel-blocker';

function EmbedDetailsView( table ) {
	this.table = table;
	this._setupEventListeners();
}

EmbedDetailsView.prototype.render = function() {

	var $embed = $( PANEL_TEMPLATE({
		id: this.table.id,
		header: {
			title: 'Embed Details'
		},
		body: BODY_TEMPLATE({
			title: this.table.title,
			source: this.table.source,
			source_url: this.table.source_url,
			table_id: this.table.id,
			url: config.embed.host + config.embed.path
		}),
		footer: null,
	}) );

	this.$embed = $embed;
	this._setupInteractionListeners();

	$('body').append( this.$embed );
	return this.$embed;
};

EmbedDetailsView.prototype.show = function() {
	this.$embed.addClass('active');
};

EmbedDetailsView.prototype.hide = function() {
	this.$embed.removeClass('active');
};

EmbedDetailsView.prototype._emitChange = function( property, value ) {
	// var columnsEvent = document.createEvent('CustomEvent');
	// columnsEvent.initCustomEvent('Columns.EmbedDetailsView.DidUpdatePropertyWithValue', false, false, {
	// 	embed: 	this,
	// 	property: property,
	// 	value: value
	// });
	// document.dispatchEvent(columnsEvent);
	ColumnsEvent.send( 'Columns.EmbedDetailsView.DidUpdatePropertyWithValue', {
		embed: 	this,
		property: property,
		value: value
	});
};

EmbedDetailsView.prototype._setupEventListeners = function() {

	// Should listen for table upload success
	ColumnsEvent.on( 'Columns.Table.DidUploadWithSuccess', this._onTableUpload.bind( this ) );
};

EmbedDetailsView.prototype._setupInteractionListeners = function() {

	// Should listen to clicks on the embed button
	$('.columns-header-nav-embed').on( 'click', this._onEmbedButtonClick.bind( this ) );

	// Should listen to clicks on the hide button
	this.$embed.find( CLOSE_BUTTON_SELECTOR ).on( 'click', this._onCloseButtonClick.bind( this ) );

	// Should listen to clicks on the blocker
	this.$embed.find( BLOCKER_SELECTOR ).on( 'click', this._onBlockerClick.bind( this ) );

	// Should listen to keyup events on input fields
	this.$embed.find('input').on( 'keyup', this._onInputKeyup.bind( this ) );

	// Should listen to blur events on input fields
	this.$embed.find('input').on( 'blur', this._onInputBlur.bind( this ) );
};

EmbedDetailsView.prototype._onTableUpload = function( event, data ) {
	this.table = data.table;
	this.render();
};

EmbedDetailsView.prototype._onEmbedButtonClick = function( event) {
	this.show();
};

EmbedDetailsView.prototype._onCloseButtonClick = function( event ) {
	this.hide();
};

EmbedDetailsView.prototype._onBlockerClick = function( event ) {
	this.hide();
};

EmbedDetailsView.prototype._onInputKeyup = function( event ) {
	var $field 		= $( event.target ),
		property	= $field.data('property'),
		value		= $field.val();

	this._emitChange( property, value ); 
};

EmbedDetailsView.prototype._onInputBlur = function( event ) {
	var $field 		= $( event.target ),
		property	= $field.data('property'),
		value		= $field.val();

	this._emitChange( property, value ); 
};

module.exports = EmbedDetailsView;


},{"../config.js":2,"../models/ColumnsEvent.js":16}],4:[function(require,module,exports){
var ColumnsEvent 	= require('../models/ColumnsEvent.js');

var DRAGGING_CLASS = 'dragging',
	INACTIVE_CLASS = 'inactive',
	SELECTED_CLASS = 'selected',
	ITEM_SELECTOR = '.layout-column';

// Manage the display of a single item
// within the list of items
ItemView = function( item ) {

	this.item = item || new Item();
	this.template = Columns.Templates['templates/layout/column.hbs'];
	this.selected = false;
	this.$item;
};

ItemView.prototype.render = function() {
	var $item = $( this.template({
		title: this.item.formattedTitle(),
		active: this.item.active,
		selected: this.selected
	}) );
	$item.data('style', this.item.style.styles);
	this.$item = $item;

	this.setupEvents();
	this._setupEventListeners();

	return this.$item;
};

ItemView.prototype.setupEvents = function() {

	// Make the item draggable
	this.$item.draggable({
		revert: 'invalid',
		revertDuration: 200,
		helper: 'clone',
		// opacity: .2,
		cancel: '.inactive'
	});

	this.$item.on( 'dragstart', $.proxy(function( event, ui ) {

		// Make inactive
		$( event.target ).addClass( DRAGGING_CLASS );

		// Alert any listeners that the item has started drag
		// var event = new CustomEvent( 'Columns.ItemView.ItemDidBeginDrag', {
		// 	item: 	this,
		// 	event: 	event,
		// 	ui: 	ui
		// });
		// var columnsEvent = document.createEvent('CustomEvent');
		// columnsEvent.initCustomEvent('Columns.ItemView.ItemDidBeginDrag', false, false, {
		// 	item: 	this,
		// 	event: 	event,
		// 	ui: 	ui
		// });
		// document.dispatchEvent(columnsEvent);
		ColumnsEvent.send( 'Columns.ItemView.ItemDidBeginDrag', {
			item: 	this,
			event: 	event,
			ui: 	ui
		} )

	}, this) );

	this.$item.on( 'dragstop', $.proxy(function( event, ui ) {		

		// Make active again
		$( event.target ).removeClass( DRAGGING_CLASS );

		// Alert any listeners that the item has started drag
		// var event = new CustomEvent( 'Columns.ItemView.ItemDidBEndDrag', {
		// 	item: 	this,
		// 	event: 	event,
		// 	ui: 	ui
		// });
		// var columnsEvent = document.createEvent('CustomEvent');
		// columnsEvent.initCustomEvent('Columns.ItemView.ItemDidEndDrag', false, false, {
		// 	item: 	this,
		// 	event: 	event,
		// 	ui: 	ui
		// });
		// document.dispatchEvent(columnsEvent);
		ColumnsEvent.send( 'Columns.ItemView.ItemDidEndDrag', {
			item: 	this,
			event: 	event,
			ui: 	ui
		} )

	}, this) );

	this.$item.on( 'drag', $.proxy(function( event, ui ) {

		// Alert any listeners that the item has started drag
		// var event = new CustomEvent( 'Columns.ItemView.ItemDidDrag', {
		// 	item: 	this,
		// 	event: 	event,
		// 	ui: 	ui
		// });
		// var columnsEvent = document.createEvent('CustomEvent');
		// columnsEvent.initCustomEvent('Columns.ItemView.ItemDidDrag', false, false, {
		// 	item: 	this,
		// 	event: 	event,
		// 	ui: 	ui
		// });
		// document.dispatchEvent(columnsEvent);
		ColumnsEvent.send( 'Columns.ItemView.ItemDidDrag', {
			item: 	this,
			event: 	event,
			ui: 	ui
		} )

	}, this) );

	this.$item.on( 'click', $.proxy(function( event ) {;

		this._setSelected( true );

		ColumnsEvent.send( 'Columns.ItemView.ItemDidSelect', {
			itemView: 	this,
			item: 		this.item
		} );

	}, this ) );
};

ItemView.prototype._setSelected = function( selected ) {

	if ( selected === true ) {
		this.selected = true;
		this.$item.addClass( SELECTED_CLASS );
	} else if ( selected === false ) {
		this.selected = false;
		this.$item.removeClass( SELECTED_CLASS );
	}
};

ItemView.prototype._setupEventListeners = function() {

	// Listen to value selection events
	ColumnsEvent.on( 'Columns.TemplateValueView.ValueDidSelectWithItem', this._onValueViewSelection.bind( this ));

	// Listen to item view selection events
	ColumnsEvent.on( 'Columns.ItemView.ItemDidSelect', this._onItemSelection.bind( this ));	
};

ItemView.prototype._onValueViewSelection = function( event, data ) {
	var item = data.item;

	if ( this.item.is( item ) ) {
		this._setSelected( true );
	} else {
		this._setSelected( false );
	}
};

ItemView.prototype._onItemSelection = function( event, data ) {
	var item = data.item;

	if ( !this.item.is( item ) ) {
		this._setSelected( false );
	}
};

module.exports = ItemView;
},{"../models/ColumnsEvent.js":16}],5:[function(require,module,exports){
var ColumnsEvent 	= require('../models/ColumnsEvent.js');
var ItemView 		= require('./ItemView.js');

// Manage the display of a list of items
ItemsView = function( items ) {

	this.items 		= items || [];
	this.views 		= [];
	this.template 	= Columns.Templates['templates/layout/columns.hbs'];
	this.$items;

	this.render( items );
	this._setupEventListeners();
};

ItemsView.prototype.render = function() {
	var itemView,
		$columns = $( this.template() );

	// Remove any existing columns
	$('.layout-columns').remove();

	if ( this.items ) {
		this.items.forEach(function( item, i ) {

			itemView = this.itemViewForItem( item );
			
			if ( !itemView ) {
				itemView = new ItemView( item );
				this.views.push( itemView );
			}

			$columns.append( itemView.render() );

		}.bind( this ));
	}

	$("#columns").append( $columns );

	// this.setupDragListeners($(this.LAYOUT_COLUMN_SELECTOR));
	// this.setupDropListeners();

	this.$items = $columns;
	return this.$items;
};

ItemsView.prototype.itemViewForItem = function( item ) {
	var itemView;

	if ( item instanceof Item && this.views.length ) {
		itemView = this.views.filter(function( view, i ) {
			return view.item.title === item.title;
		}.bind( this ) )[ 0 ];
	}

	return itemView;
};

ItemsView.prototype.updateItem = function( item ) {

	// Re-render the item
	this.items.forEach(function( oldItem, i ) {

		if ( oldItem.is( item ) ) {
			var itemView = this.itemViewForItem( item );
			this.$items.find('.layout-column').eq( i ).replaceWith( itemView.render() );
		}

	}.bind( this ) );

	this._emitChange();
};

ItemsView.prototype._emitChange = function() {
	// Let everyone know that the items view has changed
	// var columnsEvent = document.createEvent('CustomEvent');
	// columnsEvent.initCustomEvent('Columns.ItemsView.DidChange', false, false, {
	// 	itemsView: 	this
	// });
	// document.dispatchEvent(columnsEvent);
	ColumnsEvent.send( 'Columns.ItemsView.DidChange', {
		itemsView: 	this
	});

};

ItemsView.prototype._setupEventListeners = function() {

	// Listen for table updates
	ColumnsEvent.on( 'Columns.Table.DidChange', this._onTableChange.bind( this ) );

	// Listen for item updates
	ColumnsEvent.on( 'Columns.Item.DidChange', this._onItemChange.bind( this ) );
	ColumnsEvent.on( 'Columns.Item.ActiveStateDidChange', this._onItemChange.bind( this ) );
};

ItemsView.prototype._onTableChange = function( event, data ) {

	this._updateWithItems( data.table.columns );
	this.render();
};

ItemsView.prototype._onItemChange = function( event, data ) {
	this.updateItem( data.item );
};

ItemsView.prototype._updateWithItems = function( items ) {

	if( items ) {

		if ( Array.isArray( items ) ) {

			items.forEach(function( item ) {
				this._updateWithItem( item );
			}.bind( this ));

			this._emitChange();

		} else {
			throw "exception Items must be array of items or single item";
		}
	}
};

ItemsView.prototype._updateWithItem = function( item ) {
	var duplicates = [];

	if ( item && item instanceof Item ) {
		duplicates = this.items.filter(function( existingItem ) {
			return existingItem.is( item );
		});

		if ( !duplicates.length ) {
			this.items.push( item );
		}
	}
};

module.exports = ItemsView;
},{"../models/ColumnsEvent.js":16,"./ItemView.js":4}],6:[function(require,module,exports){
var ColumnsEvent 							= require('../models/ColumnsEvent.js');
var StyleInputView 							= require('./StyleInputView.js');
var StyleSegmentedButtonView 				= require('./StyleSegmentedButtonView.js');
var StyleMultipleSegmentedButtonView 		= require('./StyleMultipleSegmentedButtonView.js');

var COMPONENT_TEMPLATE 	= Columns.Templates['templates/styling/component.hbs'],
	SECTION_TEMPLATE	= Columns.Templates['templates/styling/component-section.hbs'],
	ROW_TEMPLATE		= Columns.Templates['templates/styling/component-section-row.hbs'];

function StyleComponentView( selection ) {

	this.item = selection;
	// this.item = selection ? this.getItemForSelection( selection ) : undefined;
	// this.templateGroups = this.item ? TemplateView.getGroupsForItem( this.item ) : [];
}

// StyleComponentView.prototype.getItemForSelection = function( selection ) {

// 	if( selection instanceof Item ) {
// 		return selection;
// 	} else if ( selection instanceof ItemView ) {
// 		return selection.item;
// 	} else if ( selection instanceof TemplateValueView ) {
// 		return selection.item;
// 	} else if ( selection instanceof TemplateGroupView ) {
// 		return selection;
// 	} else {
// 		throw "exception: Selection must be an Item, ItemView, TemplateValueView or TemplateGroupView";
// 	}
// };

// StyleComponentView.prototype.getTemplatesForItem = function( item ) {
// 	// var 
// };

StyleComponentView.prototype.render = function() {

	// Get the appropriate data for the current item
	var type = this.item instanceof TemplateGroupView ? 'group' : 'text',
		title = this.item instanceof TemplateGroupView ? this.item.title() : this.item.formattedTitle(),
		componentData = Columns.styleData.types[type],
		$component,
		$componentBody,
		$section;

	// First create the component skeleton
	$component = $( COMPONENT_TEMPLATE({
		type: type,
		name: title
	}) );

	$componentBody = $component.find('.style-component-body');

	// Next, loop through the data
	// creating the sections from the inside out
	componentData.forEach(function( section, i ) {
		$section = this._renderSection( section );
		$componentBody.append( $section );
	}.bind( this ) );

	this.$style = $component;
	this._setupEventListeners();

	if ( this.item instanceof TemplateGroupView ) {
		this.updateAlignmentButtons( this.item.getStyle('flex-direction') );
	}

	return this.$style;
};

StyleComponentView.prototype._renderSection = function( section ) {
	var $section,
		$sectionRows,
		$row;

	$section = $( SECTION_TEMPLATE({
		title: section.title
	}) );

	$sectionRows = $section.find('.style-component-section-rows');

	// Loop through each section,
	// creating rows from the inside out
	section.rows.forEach(function( row, i) {
		$row = this._renderRow( row );
		$sectionRows.append( $row );
	}.bind( this ) );

	return $section;
};

StyleComponentView.prototype._renderRow = function( row ) {
	var $row,
		$item;

	$row = $( ROW_TEMPLATE() );

	// Loop through each item,
	// rendering it properly depending on its type
	row.items.forEach(function( item, i ) {
		$item = this._renderItem( item );
		$row.append( $item );
	}.bind( this ) );

	return $row;

};

StyleComponentView.prototype._renderItem = function( item ) {
	var item;

	if ( item.kind === 'input' ) {

		item = new StyleInputView({
			item: this.item,
			unit: item.unit,
			type: item.type,
			canBeNegative: item.canBeNegative,
			appendControls: item.appendControls,
			prependIcon: item.prependIcon,
			label: item.label,
			property: item.property,
			value: this.item.getStyle( item.property ) || item.default
		});
		return item.render();

	} else if ( item.kind === 'segmented-button' ) {

		item = new StyleSegmentedButtonView({
			item: this.item,
			label: item.label,
			property: item.property.name,
			buttons: item.buttons,
			value: this.item.getStyle( item.property.name ) || item.property.default
		});
		return item.render();

	} else if ( item.kind === 'multiple-segmented-button' ) {

		item = new StyleMultipleSegmentedButtonView({
			item: this.item,
			label: item.label,
			buttons: item.buttons.map(function( button, i ) {
				return {
					icon: button.icon,
					property: button.property.name,
					values: {
						active: button.values.active,
						inactive: button.values.inactive,
						current: this.item.getStyle( button.property.name ) || button.values.default
					}
				};
			}.bind( this ))
		});
		return item.render();

	} else {
		return undefined;
	}
};

StyleComponentView.prototype._setupEventListeners = function() {

	// Listen for input updates
	// if this is for a group
	if ( this.item instanceof TemplateGroupView ) {
		ColumnsEvent.on( 'Columns.StyleSegmentedButtonView.ValueDidUpdateForPropertyAndItem', this._onStyleUpdate.bind( this ));
	}
};

StyleComponentView.prototype._onStyleUpdate = function( event, data ) {

	// If this is a change for the flex-direction property,
	// update the classes on the alignment buttons
	if ( data.item === this.item && data.property === 'flex-direction' ) {
		this.updateAlignmentButtons( data.value );
	}
};

StyleComponentView.prototype.updateAlignmentButtons = function( direction ) {
	var $buttons = this.$style.find('[data-property="align-items"]');

	if ( direction === 'column' ) {
		$buttons.addClass('column');
		$buttons.removeClass('row');
	} else {
		$buttons.addClass('row');
		$buttons.removeClass('column');
	}

};

module.exports = StyleComponentView;
},{"../models/ColumnsEvent.js":16,"./StyleInputView.js":7,"./StyleMultipleSegmentedButtonView.js":8,"./StyleSegmentedButtonView.js":9}],7:[function(require,module,exports){
var ColumnsEvent = require('../models/ColumnsEvent.js');

function StyleInputView( options ) {
	
	this.type = 'tel';
	this.unit = '';
	this.canBeNegative = true;
	this.canBeDecimal = false;
	this.property = undefined;
	this.value = undefined;
	this.prependIcon = undefined;
	this.appendControls = false;
	this.label = '';
	this.item = undefined;

	if ( options ) {
		this.unit = options.unit || this.unit;
		this.type = options.type || this.type;
		this.canBeNegative = options.canBeNegative === false ? false : this.canBeNegative;
		this.canBeDecimal = options.canBeDecimal === true ? true : this.canBeDecimal;
		this.property = options.property || this.property;
		this.value = this.formatValue( options.value ) || this.value;
		this.prependIcon = options.prependIcon || this.prependIcon;
		this.appendControls = options.appendControls === true ? true : this.appendControls;
		this.label = options.label || this.label;
		this.item = options.item || this.item;
	}

	this.template = Columns.Templates['templates/styling/components/input.hbs'];
}

StyleInputView.prototype.render = function() {

	var template = this.template({
		prependIcon: this.prependIcon,
		appendControls: this.appendControls,
		type: this.type,
		property: this.property,
		value: this.value,
		canBeNegative: this.canBeNegative,
		label: this.label
	});

	this.$template = $( template );

	// if ( this.appendControls ) {
		this._setupControls();
	// }

	return this.$template;
}

StyleInputView.prototype._setupControls = function() {

	if ( this.type === 'color' ) {
		this.$template.find('input').on( 'input', this._onChange.bind( this ) );
	}

	this.$template.find('input').on( 'keyup', this._onChange.bind( this ) );
	this.$template.find('input').on( 'change', this._onChange.bind( this ) );
	this.$template.find('.increment').on( 'click', this._onIncrement.bind( this ) );
	this.$template.find('.decrement').on( 'click', this._onDecrement.bind( this ) );	
}

StyleInputView.prototype._onChange = function( event ) {
	var newValue = this.formatValue( this.$template.find('input').val() )
	this.update( newValue );
}

StyleInputView.prototype._onIncrement = function( event ) {
	var newValue = this.increment( this.$template.find('input').val() );
	this.update( newValue );
}

StyleInputView.prototype._onDecrement = function( event ) {
	var newValue = this.decrement( this.$template.find('input').val() );
	this.update( newValue );
}

StyleInputView.prototype.update = function( value ) {
	this.value = value;
	this.$template.find('input').val( value );

	// Alert any listeners that the item has started drag
	// var event = new CustomEvent( 'Columns.StyleInputView.ValueDidUpdateForProperty', {
	// 	item: 	this,
	// 	event: 	event,
	// 	ui: 	ui
	// });
	// var columnsEvent = document.createEvent('CustomEvent');
	// columnsEvent.initCustomEvent('Columns.StyleInputView.ValueDidUpdateForPropertyAndItem', false, false, {
	// 	item: this.item,
	// 	property: this.property,
	// 	value: 	value
	// });
	// document.dispatchEvent(columnsEvent);
	ColumnsEvent.send( 'Columns.StyleInputView.ValueDidUpdateForPropertyAndItem', {
		item: this.item,
		property: this.property,
		value: 	value
	} )
}

StyleInputView.prototype.increment = function( value ) {
	var parsedValue = this.parseValue( value ),
		number = +parsedValue.number,
		unit = parsedValue.unit,
		newNumber;

	newNumber = +parsedValue.number + 1;

	// Format and return the new value
	return this.formatValue( newNumber + unit );
}

StyleInputView.prototype.decrement = function( value ) {
	var parsedValue = this.parseValue( value ),
		number = +parsedValue.number,
		unit = parsedValue.unit,
		newNumber;

	newNumber = +parsedValue.number - 1;

	// Format and return the new value
	return this.formatValue( newNumber + unit );
}

StyleInputView.prototype.parseValue = function( value ) {
	var re = /([\d|\.|\-]*)(.*)/,
		result = re.exec(value);

	return {
		number: result[ 1 ],
		unit: result[ 2 ]
	}
}

StyleInputView.prototype.validateValue = function( value ) {

	// If the value is illegally negative,
	// set it to 0
	if ( value < 0 && !this.canBeNegative ) {
		return 0;
	}

	// If the value must be an int, parse it as an int
	if ( !this.canBeDecimal ) {
		return parseInt( value );
	}

	// If no modifications are necessary,
	// return the value as-is
	return parseFloat( value );
}

StyleInputView.prototype.formatValue = function( value ) {

	// Don't do anything if this is a color value
	if ( this.type === 'color' ) {
		return value;
	}

	var	parsedValue = this.parseValue( value ),
		number = this.validateValue( parsedValue.number ),
		unit = parsedValue.unit || this.unit;

	return number + unit;
}

module.exports = StyleInputView;
},{"../models/ColumnsEvent.js":16}],8:[function(require,module,exports){
var ColumnsEvent = require('../models/ColumnsEvent.js');

Handlebars.registerHelper('ifIsCurrentValue', function(value, currentValue, options) {
	return value == currentValue ? options.fn(this) : options.inverse(this);
});

var TEMPLATE = Columns.Templates['templates/styling/components/multiple-segmented-button.hbs'];

function StyleMultipleSegmentedButtonView( options ) {

	this.label = '';
	this.buttons = [];
	this.properties = {};
	this.item = undefined;

	if ( options ) {
		this.label = options.label || this.label;
		this.buttons = options.buttons || this.buttons;
		this.item = options.item || this.item;
	}

	this.buttons.forEach(function( button, i ) {
		this.properties[button.property] = button.values.current;
	}.bind( this ));
}

StyleMultipleSegmentedButtonView.prototype.render = function() {

	var template = TEMPLATE({
		label: this.label,
		buttons: this.buttons
	});

	this.$template = $( template );

	this._setupControls();

	return this.$template;
};

StyleMultipleSegmentedButtonView.prototype.update = function( property, value ) {

	this.properties[property] = value;

	// Alert any listeners that the item has started drag
	// var event = new CustomEvent( 'Columns.StyleMultipleSegmentedButtonView.ValueDidUpdateForProperty', {
	// 	item: 	this,
	// 	event: 	event,
	// 	ui: 	ui
	// });
	// var columnsEvent = document.createEvent('CustomEvent');
	// columnsEvent.initCustomEvent('Columns.StyleMultipleSegmentedButtonView.ValueDidUpdateForPropertyAndItem', false, false, {
	// 	item: this.item,
	// 	property: property,
	// 	value: 	value
	// });
	// document.dispatchEvent(columnsEvent);
	ColumnsEvent.send( 'Columns.StyleMultipleSegmentedButtonView.ValueDidUpdateForPropertyAndItem', {
		item: this.item,
		property: property,
		value: 	value
	} );
}

StyleMultipleSegmentedButtonView.prototype._setupControls = function() {

	this.$template.find('button').on( 'click', this._onClick.bind( this ) );
};

StyleMultipleSegmentedButtonView.prototype._onClick = function( event ) {
	var $button = $( event.target ).is('button') ? $( event.target ) : $( event.target ).parents('button').first(),
		property = $button.data('property'),
		value;

	if ( $button.hasClass('active') ) {
		value = $button.data('inactive-value');
	} else {
		value = $button.data('active-value');
	}

	$button.toggleClass('active');

	this.update( property, value );
};

module.exports = StyleMultipleSegmentedButtonView;
},{"../models/ColumnsEvent.js":16}],9:[function(require,module,exports){
var ColumnsEvent 					= require('../models/ColumnsEvent.js');

Handlebars.registerHelper('ifIsCurrentValue', function(value, currentValue, options) {
	return value == currentValue ? options.fn(this) : options.inverse(this);
});

function StyleSegmentedButtonView( options ) {

	this.label = '';
	this.property = '';
	this.buttons = [];
	this.value = '';
	this.item = undefined;

	if( options ) {
		this.label = options.label || this.label;
		this.property = options.property || this.property;
		this.buttons = options.buttons || this.buttons;
		this.value = options.value || this.value;
		this.item = options.item || this.item;
	}

	this.template = Columns.Templates['templates/styling/components/segmented-button.hbs'];
}

StyleSegmentedButtonView.prototype.render = function() {

	var template = this.template({
		label: this.label,
		property: this.property,
		value: this.value,
		buttons: this.buttons
	});

	this.$template = $( template );

	this._setupControls();

	return this.$template;
};

StyleSegmentedButtonView.prototype.update = function( value ) {

	this.value = value;

	// Alert any listeners that the item has started drag
	// var event = new CustomEvent( 'Columns.StyleSegmentedButtonView.ValueDidUpdateForProperty', {
	// 	item: 	this,
	// 	event: 	event,
	// 	ui: 	ui
	// });
	// var columnsEvent = document.createEvent('CustomEvent');
	// columnsEvent.initCustomEvent('Columns.StyleSegmentedButtonView.ValueDidUpdateForPropertyAndItem', false, false, {
	// 	item: this.item,
	// 	property: this.property,
	// 	value: 	value
	// });
	// document.dispatchEvent(columnsEvent);
	ColumnsEvent.send( 'Columns.StyleSegmentedButtonView.ValueDidUpdateForPropertyAndItem', {
		item: this.item,
		property: this.property,
		value: 	value
	});
};

StyleSegmentedButtonView.prototype._setupControls = function() {

	this.$template.find('button').on( 'click', this._onClick.bind( this ) );
};

StyleSegmentedButtonView.prototype._onClick = function( event ) {
	var $button = $( event.target ).is('button') ? $( event.target ) : $( event.target ).parents('button').first();

	this.$template.find('button').removeClass('active');
	$button.addClass('active');

	this.update( $button.data('value') );
};

module.exports = StyleSegmentedButtonView;
},{"../models/ColumnsEvent.js":16}],10:[function(require,module,exports){
var ColumnsEvent 					= require('../models/ColumnsEvent.js');
var Columns 						= require('../../compiled-javascripts/styling/compiled-data.js');
var StyleComponentView 				= require('./StyleComponentView.js');
var TemplateGroupView 				= require('./TemplateGroupView.js');
var TemplateValueView 				= require('./TemplateValueView.js');

function StyleView() {
	this.$style = $('#styling');
	this._setupEventListeners();
}

StyleView.prototype.updateWithSelection = function( selection ) {
	var componentView,
		$component;

	// Create a component view with the new item
	selection = this.getItemForSelection( selection );
	componentView = new StyleComponentView( selection );
	$component = componentView.render();

	// Clear the style pane if we're about to render an item.
	// Otherwise, append to the end of the pane
	if( selection instanceof Item ) {
		$('.style-component').remove();
	}
	
	this.$style.append( $component );
};

StyleView.prototype.getItemForSelection = function( selection ) {

	if( selection instanceof Item ) {
		return selection;
	} else if ( selection instanceof ItemView ) {
		return selection.item;
	} else if ( selection instanceof TemplateValueView ) {
		return selection.item;
	} else if ( selection instanceof TemplateGroupView ) {
		return selection;
	} else {
		throw "exception: Selection must be an Item, ItemView, TemplateValueView or TemplateGroupView";
	}
};

StyleView.prototype._setupEventListeners = function() {

	// Listen to udpates from styling controls
	ColumnsEvent.on( 'Columns.StyleInputView.ValueDidUpdateForPropertyAndItem', this._onStyleUpdate.bind( this ));
	ColumnsEvent.on( 'Columns.StyleSegmentedButtonView.ValueDidUpdateForPropertyAndItem', this._onStyleUpdate.bind( this ));
	ColumnsEvent.on( 'Columns.StyleMultipleSegmentedButtonView.ValueDidUpdateForPropertyAndItem', this._onStyleUpdate.bind( this ));

	// Listen to value view selection
	ColumnsEvent.on( 'Columns.TemplateValueView.ValueDidSelectWithItem', this._onItemSelection.bind( this ));

	// Listen to item selection
	ColumnsEvent.on( 'Columns.ItemView.ItemDidSelect', this._onItemSelection.bind( this ));

	// Listen for the template to finish rendering
	ColumnsEvent.on( 'Columns.TemplateView.DidRender', this._onTemplateDidRender.bind( this ));	
};

StyleView.prototype._onStyleUpdate = function( event, data ) {

	this._emitChange( data.item, data.property, data.value );
};

StyleView.prototype._onItemSelection = function( event, data ) {
	var item = data.item,
		groups = TemplateView.getGroupsForItem( item );

	// Update the style panel with the selected item
	this.updateWithSelection( item );

	// Also update with any parent groups
	if ( groups && groups.length ) {
		groups.forEach(function( group ) {
			this.updateWithSelection( group );
		}.bind( this ));
	}
};

StyleView.prototype._onTemplateDidRender = function( event, data ) {
	this.updateWithSelection( TemplateView.groups[ 0 ] );
};

StyleView.prototype._emitChange = function( item, property, value ) {

	// Alert any listeners that the group is now engaged to be dropped upon
	// var event = new CustomEvent( 'Columns.StyleView.PropertyDidUpdateWithValueForGroupView', {
		// groupView: 	item,
		// property: property,
		// value: value
	// });

	var eventType,
		data;

	if ( item instanceof Item ) {

		eventType = 'Columns.StyleView.PropertyDidUpdateWithValueForItem';
		data = {
			item: 	item,
			property: property,
			value: value
		};
		ColumnsEvent.send( eventType, data );

	} else if ( item instanceof TemplateGroupView ) {
		
		eventType = 'Columns.StyleView.PropertyDidUpdateWithValueForGroupView';
		data = {
			groupView: 	item,
			property: property,
			value: value
		};
		ColumnsEvent.send( eventType, data );

	} else {
		// Do nothing
	}
};

module.exports = StyleView;

},{"../../compiled-javascripts/styling/compiled-data.js":1,"../models/ColumnsEvent.js":16,"./StyleComponentView.js":6,"./TemplateGroupView.js":11,"./TemplateValueView.js":12}],11:[function(require,module,exports){
var ColumnsEvent = require('../models/ColumnsEvent.js');

// Object to manage properties of and interaction
// with template group zones.
// Group zones are populated with value zones and
// can have their layout and style altered.

Handlebars.registerPartial('layout', Columns.Templates['templates/layout/layout.hbs']);
Handlebars.registerPartial('style', Columns.Templates['templates/layout/style.hbs']);

var ROW_GROUP_SELECTOR = '.layout-template-row-group', 
	ROW_VALUE_SELECTOR = '.layout-template-row-value',
	LAYOUT_PROPERTIES = [
		'align-items',
		'flex-direction',
		'justify-content',
	];

TemplateGroupView = function( params ) {

	if ( params ) {
		this.layout 		= params.layout || [];
		this.style			= new Style( params.style || [] );
		this.placeholder 	= params.placeholder || false;
	} else {
		this.layout 		= [];
		this.style			= new Style( [] );
		this.placeholder 	= false;
	}

	this.template = Columns.Templates['templates/layout/row-group.hbs'];
	this.$group;
};

// Return the layout properties as an object,
// given any jQuery group object
TemplateGroupView.layoutForGroup = function( $group ) {
	var layout = [];

	if ( !( $group instanceof jQuery ) ) {
		throw "exception: group must be jQuery object";
	}

	LAYOUT_PROPERTIES.forEach(function( property, i ) {
		var value = $group.data( property );
		if ( value ) {
			layout.push({
				property: property,
				value: value
			});
		}
	});
	return layout;
};

TemplateGroupView.prototype.render = function() {
	var $template = $( this.template({
		placeholder: 	this.placeholder,
		style: 			this.style.styles,
		layout: 		this.layout
	}));
	this.$group = $template;

	this._setupEvents();
	this._setupDrop();

	return this.$group;
};

TemplateGroupView.prototype.update = function( property, value ) {

	// Replace each layout value with a potential new one
	this.layout.forEach(function( layout, i ) {
		this.$group.data( layout.property, layout.value );
		this.$group.attr( 'layout-' + layout.property, layout.value );
	}.bind( this ));

	// Alert any listeners that the group has changed
	// var event = new CustomEvent( 'Columns.GroupView.DidChange', {
	// 	groupView: 	this
	// });
	// var event = document.createEvent('CustomEvent');
	// event.initCustomEvent('Columns.TemplateGroupView.DidChange', false, false, {
	// 	groupView: 	this
	// });
	// document.dispatchEvent(event);

	ColumnsEvent.send('Columns.TemplateGroupView.DidChange', {
		groupView: 	this
	});

	return this.$group;
};

// Return the correct layout attribute for a given property
// @param { string } property -- the requested layout property
// @return { string } the corresponding value
TemplateGroupView.prototype.getStyle = function( property ) {
	var value;

	// If there was not match in the layout object,
	// check the style object
	// Loop through each property until we find a match
	if ( this.style ) {
		value = this.style.get( property )
	}

	// Loop through each layout property
	// until we find a match
	// potentially a better one that in the style set
	this.layout.forEach(function( layout, i ) {
		if ( layout.property === property ) {
			value = layout.value
		}
	});

	// As a last resort, check the css for the element
	// and return its value
	if ( value ) {
		return value;
	} else {
		return this.$group.css( property );
	}
};

// Get the template's title for display
// Should be 'Row' for the first group in the template
// and 'Group' for all others
// @return { string } -- The group's title
TemplateGroupView.prototype.title = function() {

	// Is this the first group in the template?
	if ( this.$group.parent('.layout-template-row').length ) {
		return 'Row';
	} else {
		return 'Group';
	}
};

TemplateGroupView.prototype.removePlaceholders = function() {

	// Remove any placeholder values
	this.$group.find(ROW_VALUE_SELECTOR).filter('.placeholder').remove();

	// Remove any placeholder groups while leaving their children
	this.$group.find(ROW_GROUP_SELECTOR).filter('.placeholder').children().unwrap();
};

TemplateGroupView.prototype._mergeLayout = function( property, value ) {
	var existingProperty = false;

	// Loop through the old properties
	// comparing each with the new property.
	// Replace an existing property anytime a new one matches it.
	// At the end, append any remaining new properties to the merged styles array.
	this.layout.forEach(function( layout, i ) {
		if ( layout.property === property ) {
			layout.value = value;
			this.layout[ i ] = layout;
			existingProperty = true;
		}
	}.bind( this ));

	// Add all remaining new styles to the styles array
	if ( !existingProperty ) {
		this.layout.push({
			property: property,
			value: value
		});
	}
};

TemplateGroupView.prototype._setupDrop = function() {
	this.$group.droppable({
		tolerance: 'pointer'
	});

	this.$group.on( 'dropover', $.proxy(function( event, ui ) {

		// Alert any listeners that the group is now engaged to be dropped upon
		// var event = new CustomEvent( 'Columns.TemplateGroupView.GroupDidBeginDropOverWithValueView', {
		// groupView: 	this,
		// valueView: 	ui.droppable,
		// event: 		event,
		// ui: 		ui
		// });
		// var columnsEvent = document.createEvent('CustomEvent');
		// columnsEvent.initCustomEvent('Columns.TemplateGroupView.GroupDidBeginDropOverWithValueView', false, false, {
		// 	groupView: 	this,
		// 	valueView: 	ui.droppable,
		// 	event: 		event,
		// 	ui: 		ui
		// });
		// document.dispatchEvent(columnsEvent);
		ColumnsEvent.send('Columns.TemplateGroupView.GroupDidBeginDropOverWithValueView', {
			groupView: 	this,
			valueView: 	ui.droppable,
			event: 		event,
			ui: 		ui
		});

	}, this) );

	this.$group.on( 'dropout', $.proxy(function( event, ui ) {

		// Alert any listeners that the group is now engaged to be dropped upon
		// var event = new CustomEvent( 'Columns.TemplateGroupView.GroupDidEndDropOverWithValueView', {
		// groupView: 	this,
		// valueView: 	ui.droppable,
		// event: 		event,
		// ui: 		ui
		// });
		// var columnsEvent = document.createEvent('CustomEvent');
		// columnsEvent.initCustomEvent('Columns.TemplateGroupView.GroupDidEndDropOverWithValueView', false, false, {
		// 	groupView: 	this,
		// 	valueView: 	ui.droppable,
		// 	event: 		event,
		// 	ui: 		ui
		// });
		// document.dispatchEvent(columnsEvent);
		ColumnsEvent.send('Columns.TemplateGroupView.GroupDidEndDropOverWithValueView', {
			groupView: 	this,
			valueView: 	ui.droppable,
			event: 		event,
			ui: 		ui
		});

	}, this) );

	this.$group.on( 'drop', $.proxy(function( event, ui ) {

		// Alert any listeners that the group is now engaged to be dropped upon
		// var event = new CustomEvent( 'Columns.TemplateGroupView.GroupDidDropWithValueView', {
		// groupView: 	this,
		// valueView: 	ui.droppable,
		// event: 		event,
		// ui: 		ui
		// });
		// var columnsEvent = document.createEvent('CustomEvent');
		// columnsEvent.initCustomEvent('Columns.TemplateGroupView.GroupDidDropWithValueView', false, false, {
		// 	groupView: 	this,
		// 	valueView: 	ui.droppable,
		// 	event: 		event,
		// 	ui: 		ui
		// });
		// document.dispatchEvent(columnsEvent);
		ColumnsEvent.send('Columns.TemplateGroupView.GroupDidDropWithValueView', {
			groupView: 	this,
			valueView: 	ui.droppable,
			event: 		event,
			ui: 		ui
		});

	}, this) );
};

TemplateGroupView.prototype._setupEvents = function() {

	// Listen to updates for this group
	// and update if there's a match
	ColumnsEvent.on( 'Columns.StyleView.PropertyDidUpdateWithValueForGroupView', this._onGroupDidChange.bind( this ) );
};

TemplateGroupView.prototype._onGroupDidChange = function( event, data ) {
	var $newGroup = data.groupView.$group;
	if ( this.$group.is( $newGroup ) ) {
		this._mergeLayout( data.property, data.value )
		this.update();
	}
};

module.exports = TemplateGroupView;
},{"../models/ColumnsEvent.js":16}],12:[function(require,module,exports){
var ColumnsEvent = require('../models/ColumnsEvent.js');

// Object to manage properties of and interaction
// with template value zones.
// Value zones are populated with items and
// can react to changes in an item's properties.

Handlebars.registerPartial('layout', Columns.Templates['templates/layout/layout.hbs']);
Handlebars.registerPartial('style', Columns.Templates['templates/layout/style.hbs']);

TemplateValueView = function( item, placeholder ) {

	if ( item && item instanceof Item ) {
		this.item = item
	} else if ( item ) {
		throw "exception: item must be of type Item"
	} else {
		this.item;
	}
	
	this.template = Columns.Templates['templates/layout/row-value.hbs'];
	this.placeholder = placeholder || false;
	this.$value;
};

TemplateValueView.prototype.render = function() {
	var $template = $( this.template({
		data: 			this.item.formattedTitle(),
		style: 			this.item.style.styles,
		placeholder: 	this.placeholder
	}));
	this.$value = $template;

	if ( !this.placeholder ) {
		this._setupEvents();
		this._setupDrag();
		this._setupClick();
	}

	return this.$value;
};

TemplateValueView.prototype.update = function() {
	// Update the value's text
	this.$value.text( this.item.formattedTitle() );
	// Update the value's style
	this.$value.attr( 'style', this.item.style.css() );
	// Update the value's placeholder status

	// Alert any listeners that the value has changed
	// var event = new CustomEvent( 'Columns.ValueView.DidChange', {
	// 	valueView: 	this
	// });
	// var event = document.createEvent('CustomEvent');
	// event.initCustomEvent('Columns.TemplateValueView.DidChange', false, false, {
	// 	valueView: 	this
	// });
	// document.dispatchEvent(event);
	ColumnsEvent.send('Columns.TemplateValueView.DidChange', {
		valueView: 	this
	});

	return this.$value;
};

TemplateValueView.prototype._setupDrag = function() {

	this.$value.draggable({
		// revert: 'invalid',
		// revertDuration: 200,
		helper: function() {
			var itemView = new ItemView( this.item );
			return itemView.render();
		}.bind( this ),
		opacity: .2
	});

	this.$value.on( 'dragstart', $.proxy(function( event, ui ) {

		$( event.target ).addClass('inactive');

		// Make sure this object no longer receives event updates
		this._teardownEvents();

		// Alert any listeners that the item has started drag
		// var event = new CustomEvent( 'Columns.ItemView.ItemDidBeginDrag', {
		// 	item: 	this,
		// 	event: 	event,
		// 	ui: 	ui
		// });
		// var columnsEvent = document.createEvent('CustomEvent');
		// columnsEvent.initCustomEvent('Columns.TemplateValueView.ValueDidBeginDragWithItem', false, false, {
		// 	valueView: 	this,
		// 	item: 		this.item,
		// 	event: 		event,
		// 	ui: 		ui
		// });
		// document.dispatchEvent(columnsEvent);
		ColumnsEvent.send('Columns.TemplateValueView.ValueDidBeginDragWithItem', {
			valueView: 	this,
			item: 		this.item,
			event: 		event,
			ui: 		ui
		});

	}, this) );

	this.$value.on( 'dragstop', $.proxy(function( event, ui ) {

		$( event.target ).remove();

		// Alert any listeners that the item has started drag
		// var event = new CustomEvent( 'Columns.ItemView.ItemDidBEndDrag', {
		// 	item: 	this,
		// 	event: 	event,
		// 	ui: 	ui
		// });
		// var columnsEvent = document.createEvent('CustomEvent');
		// columnsEvent.initCustomEvent('Columns.TemplateValueView.ValueDidEndDragWithItem', false, false, {
		// 	valueView: 	this,
		// 	item: 		this.item,
		// 	event: 		event,
		// 	ui: 		ui
		// });
		// document.dispatchEvent(columnsEvent);
		ColumnsEvent.send('Columns.TemplateValueView.ValueDidEndDragWithItem', {
			valueView: 	this,
			item: 		this.item,
			event: 		event,
			ui: 		ui
		});

	}, this) );

	this.$value.on( 'drag', $.proxy(function( event, ui ) {

		// Alert any listeners that the item has started drag
		// var event = new CustomEvent( 'Columns.ItemView.ItemDidDrag', {
		// 	item: 	this,
		// 	event: 	event,
		// 	ui: 	ui
		// });
		// var columnsEvent = document.createEvent('CustomEvent');
		// columnsEvent.initCustomEvent('Columns.TemplateValueView.ValueDidDragWithItem', false, false, {
		// 	valueView: 	this,
		// 	item: 		this.item,
		// 	event: 		event,
		// 	ui: 		ui
		// });
		// document.dispatchEvent(columnsEvent);
		ColumnsEvent.send('Columns.TemplateValueView.ValueDidDragWithItem', {
			valueView: 	this,
			item: 		this.item,
			event: 		event,
			ui: 		ui
		});

	}, this) );
};

TemplateValueView.prototype._setupClick = function() {

	this.$value.on( 'click', $.proxy(function( event ) {

		this.$value.addClass('selected');

		ColumnsEvent.send('Columns.TemplateValueView.ValueDidSelectWithItem', {
			valueView: 	this,
			item: 		this.item
		});

	}, this ) );
};

TemplateValueView.prototype._setupEvents = function() {

	this.onItemDidChange = this._onItemDidChange.bind( this );

	// Listen to updates for this item
	// and update if there's a match
	ColumnsEvent.on( 'Columns.Item.DidChange', this.onItemDidChange );
};

TemplateValueView.prototype._teardownEvents = function() {

	ColumnsEvent.off( 'Columns.Item.DidChange', this.onItemDidChange );
};

TemplateValueView.prototype._onItemDidChange = function( event, data ) {
	var newItem = data.item;
	if ( this.item.is( newItem ) ) {
		this.item = newItem;
		this.update();
	}
};

module.exports = TemplateValueView;
},{"../models/ColumnsEvent.js":16}],13:[function(require,module,exports){
var ColumnsEvent 				= require('../models/ColumnsEvent.js');
var TemplateGroupView 			= require('./TemplateGroupView.js');
var TemplateValueView 			= require('./TemplateValueView.js');
var config 						= require('../config.js');

// Object to manage properties of and interaction
// with the template itself.

var ROW_GROUP_SELECTOR 		= '.layout-template-row-group', 
	ROW_VALUE_SELECTOR 		= '.layout-template-row-value',
	DRAGGING_ITEM_SELECTOR 	= '.ui-draggable-dragging',
	EXPANDED_CLASS 			= 'expanded',
	DROPPABLE_CLASS 		= 'droppable';

TemplateView = function( layout )  {

	this.layout = layout;;
	this.template = Columns.Templates['templates/layout/template.hbs'];
	this.$template;

	this.draggingItem;
	this.droppableItems = [];

	this._renderPreview();
	this._setupEventListeners();

	TemplateView.groups = [];
};

// Class Methods
// ----------------
TemplateView.groups = [];

// Return the correct value DOM representation for an item
// @param { Item } item -- the Item to retrive
// @return { jQuery } the corresponding template represetation
TemplateView.getValueForItem = function( item ) {
	var $values;

	// Throw an error if the item isn't of the correct type
	if( !( item instanceof Item) ) {
		throw "expection: item must be of type Item";
		return;
	}

	// Find all the current values in the template
	// and filter them by their inner text
	// returning only the first that matches the item's title
	$values = $(ROW_VALUE_SELECTOR).filter(function( i, element ) {
		return $( element ).text().trim() === item.formattedTitle();
	});

	// Return undefined if there are no resulting values
	if ( !$values.length ) {
		return undefined;
	} else {
		return $values;
	}
}

TemplateView.getGroupsForItem = function( item ) {
	var $value;

	// If the item is of type Item, convert it into a value
	if ( item instanceof Item ) {
		$value = this.getValueForItem( item );
	} else if ( item instanceof jQuery && item.hasClass(ROW_VALUE_SELECTOR) ) {
		$value = item;
	} else {
		throw "expection: item must be of type Item or jQuery template row";
	}

	// If this value isn't in the template, return undefined
	if( !$value ) {
		return undefined;
	}

	// Return the value's parent groups
	return $value.parents(ROW_GROUP_SELECTOR).map(function( i, group ) {
		return TemplateView.getGroupViewForGroup( $( group ) );
	}).toArray();

};

TemplateView.getGroupViewForGroup = function( group ) {
	var newGroup = [];

	if ( !( group instanceof TemplateGroupView ) && !( group instanceof jQuery ) ) {
		throw "exception: group must be TemplateGroupView or jQuery object";
	}

	newGroup = TemplateView.groups.filter(function( oldGroup, i ) {
		if ( group instanceof TemplateGroupView && group === oldGroup ) {
			return true;
		} else if ( group instanceof jQuery && group.is( oldGroup.$group ) ) {
			return true;
		} else {
			return false;
		}
	});

	if ( newGroup.length ) {
		return newGroup[ 0 ];
	} else {
		return undefined;
	}
};

TemplateView.removeGroup = function( group ) {
	var groupView = group,
		index;

	// If the group is a jquery object, get its group view
	if ( groupView instanceof jQuery ) {
		groupView = TemplateView.getGroupViewForGroup( groupView );
	}

	// Get the group's index in the groups array
	index = TemplateView.groups.indexOf( groupView );

	// Let the group know that it's about to be removed
	// and then remove it
	if ( index >= 0 ) {
		ColumnsEvent.send('Columns.TemplateView.WillRemoveGroupView', {
			groupView: 	groupView
		});

		TemplateView.groups.splice( index, 1 );
	}
};

TemplateView.prototype.render = function() {

	// Render the layout preview
	this._renderPreview();

	// Render and return the template
	return this._renderTemplate();
};

TemplateView.prototype._renderPreview = function() {

	var preview = Columns.Templates['templates/layout/preview.hbs'],
		$preview = $( preview({
			source: config.embed.host + config.embed.path
		}) );

	this.$preview = $preview
	$('#layout').append( $preview );

	return this.$preview;

};

TemplateView.prototype._renderTemplate = function() {

	// For each node in the layout object,
	// render either a group or value
	// and recursively append them to each other
	// until we've constructed the full template
	var $row = this._renderRowComponent( this.layout.model );
	var $template = $( this.template() );
	$template.find('.layout-template-row').append( $row );
	$('#layout').append( $template );
	this.$template = $template;

	this._setupTemplateEvents();
	this._emitRender();
	this._emitChange();

	return this.$template;

}


// Render a portion of the row layout object
// @param { object } component -- The component to render (either a group or value)
// @return { jQuery object } -- the component's rendered layout
TemplateView.prototype._renderRowComponent = function( component ) {
	var componentView,
		$component;

	// Render the top level component
	// as a group if it's a group
	// or a value if it's a value
	if ( component.type === 'group' ) {
		componentView = new TemplateGroupView({ layout: component.layout, style: component.style });
		$component = componentView.render();

		// Add the group to the groups array
		TemplateView.groups.push( componentView );

		// Loop through all group subvalues and render those as well
		component.values.forEach(function (value, i) {
			$component.append( this._renderRowComponent( value ) );
		}.bind( this ));

		// Return the final component including rendered subviews
		return $component;

	} else if ( component.type === 'single' ) {
		var item = this.table.getItemForData( component.data );
		componentView = new TemplateValueView( item );
		return componentView.render();
	}

};

TemplateView.prototype.removePlaceholders = function() {

	// Remove any placeholder values
	$(ROW_VALUE_SELECTOR).filter('.placeholder').remove();

	// Remove any placeholder groups while leaving their children
	$(ROW_GROUP_SELECTOR).filter('.placeholder').children().unwrap();
};

// If this there's only one item left in the surrouning group, dissolve the group.
// Unless the parent group is the very first group in the cell.
TemplateView.prototype.dissolveSingleValueGroups = function() {

	// Get any groups that only have a single active item
	// but exclude the first group in the row
	var $groups = $( ROW_GROUP_SELECTOR ).not( '.master > ' + ROW_GROUP_SELECTOR ).filter(function( i, group ) {
		return $( group ).children( ROW_VALUE_SELECTOR ).not( '.inactive' ).length === 1;
	});

	// var $groups = $( ROW_VALUE_SELECTOR + ':only-child' )
	// 	.parent()
	// 	.not( 'master > ' + ROW_GROUP_SELECTOR );

	// Unwrap the 'only children' of these groups
	$groups.each(function( i, group ) {
		TemplateView.removeGroup( $( group ) );
	});

	$groups.children().unwrap();
};

// Remove the dragging item from the template
// if it is a value. Presumably this is because
// the user just dragged it out of the template
TemplateView.prototype.removeValue = function( valueView ) {

	if ( valueView instanceof TemplateValueView ) {
		valueView.$value.remove();
	} else {
		throw "exception: value must be of type TemplateValueView";
	}
};

// Animate the dragging helper to the position of its respective item
TemplateView.prototype.removeDraggingValue = function( callback ) {
	var $helper = $('.ui-draggable-dragging.ui-draggable-handle')
		$clone = $helper.clone(),
		$item = $('#columns .layout-column').filter(function( i, item ) {
			// console.log($( item ).text().trim());
			return $clone.text().trim() === $( item ).text().trim();
		}).first();

	// Find the position of the original token
	// var originalPosition = {
	// 	top: $match.offset().top,
	// 	left: $match.offset().left
	// };

	// Change the clone to position fixed
	// and add to columns container
	$('.layout-columns').append( $clone );
	$clone.css({
		position: 'fixed',
		top: $helper.offset().top,
		left: $helper.offset().left
	});

	// $clone.appendTo('.layout-columns');

	$clone.velocity({
		translateX: $item.offset().left - $clone.offset().left,
		translateY: $item.offset().top - $clone.offset().top
	}, {
		duration: 200,
		complete: this._onDraggingValueRemoved.bind( this )
	});
};

TemplateView.prototype._onDraggingValueRemoved = function ( elements ) {
	
	// Remove the clone from the DOM
	$( elements[ 0 ] ).remove();

	// Emit a change event
	this._emitChange();

};

TemplateView.prototype._emitChange = function() {
	
	// Emit a change event
	// var event = new CustomEvent( 'Columns.TemplateView.DidChange', {
	// templateView: 	this
	// });
	// var event = document.createEvent('CustomEvent');
	// event.initCustomEvent('Columns.TemplateView.DidChange', false, false, {
	// 	templateView: 	this
	// });
	// document.dispatchEvent(event);

	ColumnsEvent.send('Columns.TemplateView.DidChange', {
		templateView: this
	});
};

TemplateView.prototype._emitRender = function() {
	ColumnsEvent.send('Columns.TemplateView.DidRender', {
		templateView: this
	});
};

TemplateView.prototype._setupEventListeners = function() {

	// Listen to the table upload event
	ColumnsEvent.on( 'Columns.Table.DidUploadWithSuccess', this._onTemplateUpload.bind( this ) );
};

TemplateView.prototype._setupTemplateEvents = function() {

	// Listen to drag events for items
	ColumnsEvent.on( 'Columns.ItemView.ItemDidBeginDrag', this._onItemDidBeginDrag.bind( this ));
	ColumnsEvent.on( 'Columns.ItemView.ItemDidEndDrag', this._onItemDidEndDrag.bind( this ));
	ColumnsEvent.on( 'Columns.ItemView.ItemDidDrag', this._onItemDidDrag.bind( this ));

	// Listen to drag events for values
	ColumnsEvent.on( 'Columns.TemplateValueView.ValueDidBeginDragWithItem', this._onValueDidBeginDrag.bind( this ));
	ColumnsEvent.on( 'Columns.TemplateValueView.ValueDidEndDragWithItem', this._onValueDidEndDrag.bind( this ));
	ColumnsEvent.on( 'Columns.TemplateValueView.ValueDidDragWithItem', this._onValueDidDrag.bind( this ));

	// Listen to drop events for groups
	ColumnsEvent.on( 'Columns.TemplateGroupView.GroupDidBeginDropOverWithValueView', this._onGroupDidBeginDropOver.bind( this ));
	ColumnsEvent.on( 'Columns.TemplateGroupView.GroupDidEndDropOverWithValueView', this._onGroupDidEndDropOver.bind( this ));
	ColumnsEvent.on( 'Columns.TemplateGroupView.GroupDidDropWithValueView', this._onGroupDidDrop.bind( this ));

	// Listen to embedded table events
	ColumnsEvent.on('ColumnsTableDidRenderData', this._onTableDidRenderData.bind( this ) );
	ColumnsEvent.on('ColumnsTableDidScroll', this._onTableDidScroll.bind( this ) );
	ColumnsEvent.on('ColumnsTableWillExpand', this._onTableWillExpand.bind( this ) );
	ColumnsEvent.on('ColumnsTableDidExpand', this._onTableDidExpand.bind( this ) );
	ColumnsEvent.on('ColumnsTableDidCollapse', this._onTableDidCollapse.bind( this ) );

	// Listen for updates to values and groups
	ColumnsEvent.on( 'Columns.TemplateValueView.DidChange', this._onTemplateViewDidChange.bind( this ));
	ColumnsEvent.on( 'Columns.TemplateGroupView.DidChange', this._onTemplateViewDidChange.bind( this ));
};

TemplateView.prototype._onTemplateViewDidChange = function( event, data ) {
	this._emitChange();
};

TemplateView.prototype._onTemplateUpload = function( event, data ) {
	this.table = data.table;
	this.layout = data.table.layout;
	this._renderTemplate();
};

TemplateView.prototype._onTableDidRenderData = function( event, data ) {
	this.$template.find('.layout-template-row').css({
		height: data.table.tallestRowHeight()
	});
};

TemplateView.prototype._onTableWillExpand = function( event, data ) {

	// Move the template down below the header
	this.$template.velocity({
		translateY: 0
	}, {
		duration: 400
	});
};

TemplateView.prototype._onTableDidExpand = function( event, data ) {

	this.$preview.addClass( EXPANDED_CLASS );
};

TemplateView.prototype._onTableDidCollapse = function( event, data ) {

	this.$preview.removeClass( EXPANDED_CLASS );
};
	
TemplateView.prototype._onTableDidScroll = function( event, data ) {

	// Move the template up until it hits the header
	var minScroll = -24,
		maxScroll = 0,
		scroll = -$('.columns-table-container').scrollTop();

	// Make sure the scroll is within bounds
	scroll = scroll < minScroll ? minScroll : scroll;
	scroll = scroll > maxScroll ? maxScroll : scroll;

	// Adjust the template
	$.Velocity.hook( this.$template, "translateY", scroll + "px" );
};
 
TemplateView.prototype._onItemDidBeginDrag = function( event, data ) {
	this.draggingItem = data.item.item;
};

TemplateView.prototype._onItemDidEndDrag = function( event, data ) {
	this.draggingItem = undefined;
	this.removePlaceholders();
};

TemplateView.prototype._onItemDidDrag = function( event, data ) {
	if ( this.droppableItems.length ) {
		this.removePlaceholders();
		this.positionDropForDragEventInParentWithPlaceholder( data.event, this.droppableItems[ this.droppableItems.length - 1 ].$group, true );
	}
};

TemplateView.prototype._onValueDidBeginDrag = function( event, data ) {
	this.draggingItem = data.valueView.item;
	this.dissolveSingleValueGroups();
};

TemplateView.prototype._onValueDidEndDrag = function( event, data ) {
	// if ( !this.droppableItems.length ) {
	if ( !TemplateView.getValueForItem( data.valueView.item ) ) {
		this.removeDraggingValue();
		// this._emitChange();
	}
}

TemplateView.prototype._onValueDidDrag = function( event, data ) {
	if ( this.droppableItems.length ) {
		this.removePlaceholders();
		this.positionDropForDragEventInParentWithPlaceholder( data.event, this.droppableItems[ this.droppableItems.length - 1 ].$group , true );
	}
};

TemplateView.prototype._onGroupDidBeginDropOver = function( event, data ) {
	if ( this.droppableItems.indexOf( data.groupView ) == -1 ) {
		this.droppableItems.push( data.groupView );
	}

	$( DRAGGING_ITEM_SELECTOR ).addClass( DROPPABLE_CLASS );
};

TemplateView.prototype._onGroupDidEndDropOver = function( event, data ) {
	var groupView = data.groupView;

	groupView.removePlaceholders();
	this.droppableItems.splice( this.droppableItems.indexOf( groupView ), 1 );

	$( DRAGGING_ITEM_SELECTOR ).removeClass( DROPPABLE_CLASS );
};

TemplateView.prototype._onGroupDidDrop = function( event, data ) {
	var groupView = data.groupView;

	// Don't do anything if this group isn't the most recently hovered over
	// of if there are currently no hovered groups (which should never be the case)
	if ( !this.droppableItems.length || this.droppableItems[ this.droppableItems.length - 1 ] !== groupView ) {
		return;
	}

	// Otherwise, clear all the group's placeholders
	groupView.removePlaceholders();

	// And finally position the new item in the template
	this.positionDropForDragEventInParentWithPlaceholder( data.event, this.droppableItems[ this.droppableItems.length - 1 ].$group , false )

	// Empty the droppable items array
	this.droppableItems = [];

};

TemplateView.prototype.dimensionsForValue = function( $value, dragThreshold, buffer ) {
	var dragThreshold	= dragThreshold || 0.5,
		buffer 			= buffer || 0.2,
		direction 		= $value.parent().data('flex-direction') || 'row',
		bufferX			= direction === 'row' ? buffer : 0,
		bufferY			= direction === 'column' ? buffer : 0;

	return {
		top: 			$value.offset().top,
		left: 			$value.offset().left,
		bottom: 		$value.offset().top + $value.height(),
		right: 			$value.offset().left + $value.width(),

		middleX: 		$value.offset().left + ( $value.width() / 2 ),
		middleY: 		$value.offset().top + ( $value.height() / 2 ),

		dragMiddleX: 	$value.offset().left + ( $value.width() * dragThreshold ),
		dragMiddleY: 	$value.offset().top + ( $value.height() * dragThreshold ),
		dragMiddle: 	direction === 'row' ? 	$value.offset().left + ( $value.width() * dragThreshold ) :
												$value.offset().top + ( $value.height() * dragThreshold ),

		bufferTop: 		$value.offset().top + ( $value.height() * bufferY ),
		bufferLeft: 	$value.offset().left + ( $value.width() * bufferX ),
		bufferBottom: 	$value.offset().top + $value.height() - ( $value.height() * bufferY ),
		bufferRight: 	$value.offset().left + $value.width() - ( $value.width() * bufferX )
	};
};

TemplateView.prototype.isIntersected = function( values, event ) {

	// Account for the layout's scroll offset, which can mess up the calculations
	var scrollOffset 	= parseInt($.Velocity.hook($("#layout"), "translateY")) || 0,
		dragOffsetX 	= event.clientX,
		dragOffsetY		= event.clientY;

	return 	values.bufferLeft 					<= dragOffsetX &&
			values.bufferRight 					>= dragOffsetX &&
			values.bufferTop - scrollOffset 	<= dragOffsetY &&
			values.bufferBottom - scrollOffset 	>= dragOffsetY;
};

TemplateView.prototype.isPrevious = function( values, dragPoint ) {
	return dragPoint >= values.dragMiddle;
};

TemplateView.prototype.wrapValueWithGroup = function( $value, placeholder ) {
	
	// Make sure the group has the opposite direction of its parent
	var direction 	= $value.parent().data('flex-direction') === 'column' ? 'row' : 'column';
	var group 		= new TemplateGroupView({
		placeholder: placeholder,
		layout: [{
			property:  	'flex-direction',
			value: 		 direction
		}]
	});

	var $group = group.render();

	// First add the group to the DOM before the value
	// and then move the value into the group.
	// We do this instead of jquery's wrap because wrap inserts a clone
	// and we need the previously rendered object itself in the DOM.
	$group.insertBefore( $value );
	$group.append( $value );

	// Wrap the value with the new group
	// $value.wrap( $group );
	// $group.append( $value );

	if ( !placeholder ) {
		TemplateView.groups.push( group );
	}

	
	// return $value.wrap( $group );
};

TemplateView.prototype.insertDropBeforeElementInParentWithPlaceholder = function( item, $previous, $parent, placeholder ) {

	// Create a new value view with the appropriate placeholder status
	var valueView 	= new TemplateValueView( item, placeholder ),
		$value 		= valueView.render();

	// If there is a previous item, insert the new item just after it
	// Otherwise just add the item to the parent as the first child
	if ( $previous ) {
		$previous.after( $value );
	} else {	
		$parent.prepend( $value );
	}

	if ( !placeholder ) {
		this._emitChange();
	} 
};

TemplateView.prototype.positionDropForDragEventInParentWithPlaceholder = function( event, $parent, placeholder ) {
		
		// Make sure we have a parent
		if ( !$parent ) {
			return;
		}

		// Set up necessary variables. Then,
		// Get all the items in the group
		// and filter out the placeholders
		// and the dragging item
		var dimensions,
			dragPoint,
			$previousChild,
			$child,
			$children = $parent.children()
						.not('.placeholder')
						.not('.inactive')
						.not('.ui-draggable-dragging');

		// If there aren't any children,
		// just insert the placeholder at the beginning
		if ( !$children.length ) {
			this.insertDropBeforeElementInParentWithPlaceholder( this.draggingItem, null, $parent, placeholder);
			return;
		}

		$children.each(function( i, child ) {
			$child = $( child );

			// Are we intersecting directly with the child?
			dimensions = this.dimensionsForValue( $child );
			if ( this.isIntersected( dimensions, event ) ) {
				// Reset the previous child
				$previousChild = null;

				// Wrap the two items in a group
				// and make the new group the new parent
				this.wrapValueWithGroup( $child, placeholder );
				$parent = $child.parent();

				// Determine whether the new value goes first or second in the new group
				// using new dimensions as a result of the new group
				dimensions = this.dimensionsForValue( $child );
				dragPoint = $parent.data('flex-direction') == 'column' ? event.clientY : event.clientX;
				if ( this.isPrevious( dimensions, dragPoint) ) {
					$previousChild = $child;
				}

			} else {
				// Prepare dimensions for determining which values goes first in the group
				dimensions = this.dimensionsForValue( $child );
				dragPoint = $parent.data('flex-direction') == 'column' ? event.clientY : event.clientX;
				if ( this.isPrevious( dimensions, dragPoint) ) {
					$previousChild = $child;
				}
			}

		}.bind( this ));

		// Add the new item to the new group
		this.insertDropBeforeElementInParentWithPlaceholder( this.draggingItem, $previousChild, $parent, placeholder );
		
};

module.exports = TemplateView;
},{"../config.js":2,"../models/ColumnsEvent.js":16,"./TemplateGroupView.js":11,"./TemplateValueView.js":12}],14:[function(require,module,exports){
var ColumnsEvent = require('../models/ColumnsEvent.js');

var MAX_ROWS = 20,
	UPLOAD_BUTTON_SELECTOR = '.columns-upload-button';

function UploadView() {
	this.parsedRows = 0;
}

UploadView.prototype.render = function() {

	this.$upload = $('#upload');

	this._setupEventListeners();
	return this.$upload;
};

UploadView.prototype.show = function() {
	this.$upload.velocity({
		opacity: 1
	}, {
		duration: 200,
		easing: 'ease-out',
		begin: function() {
			this.$upload.addClass('animating');
		}.bind( this ),
		complete: function() {
			this.$upload.removeClass('animating');
			this.$upload.addClass('active');
		}.bind( this )
	});
};

UploadView.prototype.hide = function() {
	this.$upload.velocity({
		opacity: 0
	}, {
		duration: 200,
		easing: 'ease-in',
		begin: function() {
			this.$upload.addClass('animating');
		}.bind( this ),
		complete: function() {
			this.$upload.removeClass('animating');
			this.$upload.removeClass('active');
		}.bind( this )
	});
};

UploadView.prototype._setLoading = function( loading, message ) {
	var $button = this.$upload.find( UPLOAD_BUTTON_SELECTOR );

	// Set the message
	if ( message && typeof message === 'string' ) {
		$button.text( message );
	} else {
		$button.text("Upload a .csv");
	}

	// Set the loading state
	if ( loading ) {
		this.$upload.addClass('loading');
		$button.prop('disabled', true);
	} else {
		this.$upload.removeClass('loading');
		$button.prop('disabled', false);
	}
};

UploadView.prototype._setupEventListeners = function() {

	// Listen for clicks on the upload button
	this.$upload.find( UPLOAD_BUTTON_SELECTOR ).on( 'click', this._onUploadClick.bind( this ) );

	// Listen for file choices from the file picker
	this.$upload.find('input[type="file"]').on( 'change', this._onFileChoice.bind( this ) );

	// Listen for window resize events
	$(window).on( 'resize', this._onWindowResize.bind( this ) );

	// Listen for successful table uploads
	ColumnsEvent.on( 'Columns.Table.DidUploadWithSuccess', this._onTableUploadSuccess.bind( this ) );

	// Listen for failed table uploads
	ColumnsEvent.on( 'Columns.Table.DidUploadWithFailure', this._onTableUploadFail.bind( this ) );
};

UploadView.prototype._onUploadClick = function( event ) {

	// Trigger click on file input field
	this.$upload.find('input[type="file"]').trigger('click');

	// Track this click
	// ga('send', 'event', 'button', 'click', 'upload');
};

UploadView.prototype._onFileChoice = function( event ) {
	var file = event.target.files[ 0 ];
	this._parseFile( file );

	if ( file.name ) {
		this._setLoading( true, 'Uploading ' + file.name + '...' );
	} else {
		this._setLoading( true, 'Uploading file...' );
	}

	// Announce file upload event
	// Alert any listeners that the group has changed
	// var columnsEvent = new CustomEvent( 'Columns.UploadView.DidChooseFile', {
		// uploadView: 	this,
		// file: 			file
	// });
	// var columnsEvent = document.createEvent('CustomEvent');
	// columnsEvent.initCustomEvent('Columns.UploadView.DidChooseFile', false, false, {
	// 	uploadView: 	this,
	// 	file: 			file
	// });
	// document.dispatchEvent(columnsEvent);
	ColumnsEvent.send('Columns.UploadView.DidChooseFile', {
		uploadView: 	this,
		file: 			file
	});
};

UploadView.prototype._onWindowResize = function( event ) {

};

UploadView.prototype._onTableUploadSuccess = function( event ) {

	this._setLoading( false );
	this.hide();
};

UploadView.prototype._onTableUploadFail = function( event ) {

	this._setLoading( false, "Shoot, something went wrong. Mind trying a different .csv?")
};

UploadView.prototype._parseFile = function( file ) {
	Papa.parse( file, {
		step: function( row, handle ) {
			this._parseRow( row, handle, file.name );
		}.bind( this ),
		complete: function( results ) {
			this._onParseComplete( results, file );
		}.bind( this )
	});
};

UploadView.prototype._parseRow = function( row, handle, fileName ) {

	// If this is the first row, treat it as a header
	// and create column items from its contents
	//
	// If it's not the first row, treat it as data
	// and add it to our data set
	// 
	// If it's beyond the 20th row, stop the parsing
	if ( this.parsedRows === 0 ) {
		this._createColumnItems( row.data[ 0 ], fileName );
	} else if ( this.parsedRows <= MAX_ROWS ) {
		this._createRow( row.data[ 0 ], fileName );
	} else {
		handle.abort();
	}

	// Update the parsed rows count
	this.parsedRows++;
};

UploadView.prototype._createColumnItems = function( data, fileName ) {

	// Announce columns parsing
	// Alert any listeners that the group has changed
	// var columnsEvent = new CustomEvent( 'Columns.UploadView.DidParseColumnNamesForFile', {
		// uploadView: 	this,
		// fileName: 		fileName,
		// colums: 		data
	// });
	// var columnsEvent = document.createEvent('CustomEvent');
	// columnsEvent.initCustomEvent('Columns.UploadView.DidParseColumnNamesForFile', false, false, {
	// 	uploadView: 	this,
	// 	fileName: 		fileName,
	// 	columns: 		data
	// });
	// document.dispatchEvent(columnsEvent);
	ColumnsEvent.send('Columns.UploadView.DidParseColumnNamesForFile', {
		uploadView: 	this,
		fileName: 		fileName,
		columns: 		data
	});
};

UploadView.prototype._createRow = function( row, fileName ) {

	// Announce row parsing
	// Alert any listeners that the group has changed
	// var columnsEvent = new CustomEvent( 'Columns.UploadView.DidParseDataRowForFile', {
		// uploadView: 	this,
		// fileName: 		fileName,
		// row: 			data
	// });
	// var columnsEvent = document.createEvent('CustomEvent');
	// columnsEvent.initCustomEvent('Columns.UploadView.DidParseDataRowForFile', false, false, {
	// 	uploadView: 	this,
	// 	fileName: 		fileName,
	// 	row: 			row
	// });
	// document.dispatchEvent(columnsEvent);
	ColumnsEvent.send('Columns.UploadView.DidParseDataRowForFile', {
		uploadView: 	this,
		fileName: 		fileName,
		row: 			row
	});
};

UploadView.prototype._onParseComplete = function( results, file ) {

	// Announce parsing complete
	// Alert any listeners that the group has changed
	// var columnsEvent = new CustomEvent( 'Columns.UploadView.DidCompleteParseForFile', {
		// uploadView: 		this,
		// fileName: 		fileName
	// });
	// var columnsEvent = document.createEvent('CustomEvent');
	// columnsEvent.initCustomEvent('Columns.UploadView.DidCompleteParseForFile', false, false, {
	// 	uploadView: 	this,
	// 	file: 			file
	// });
	// document.dispatchEvent(columnsEvent);
	ColumnsEvent.send('Columns.UploadView.DidCompleteParseForFile', {
		uploadView: 	this,
		file: 			file
	});
};

module.exports = UploadView;

},{"../models/ColumnsEvent.js":16}],15:[function(require,module,exports){
var Table 				= require('./models/Table.js');
var ItemView 			= require('./controllers/ItemsView.js');
var TemplateView 		= require('./controllers/TemplateView.js');
var StyleView 			= require('./controllers/StyleView.js');
var EmbedDetailsView 	= require('./controllers/EmbedDetailsView.js');
var UploadView 			= require('./controllers/UploadView.js');

// Create the Table object
var table = new Table();

// Set up the Items View
var items = new ItemsView();

// Set up the Template
var template = new TemplateView();

// Set up the Style View
var style = new StyleView();

// Set up the Embed Panel
var embed = new EmbedDetailsView();

// Set up the Upload View
var upload = new UploadView();
upload.render();




},{"./controllers/EmbedDetailsView.js":3,"./controllers/ItemsView.js":5,"./controllers/StyleView.js":10,"./controllers/TemplateView.js":13,"./controllers/UploadView.js":14,"./models/Table.js":20}],16:[function(require,module,exports){
function ColumnsEvent () {

}

ColumnsEvent.send = function( type, data ) {
	$(document).trigger( type, data );
};

ColumnsEvent.on = function( type, callback ) {
	$(document).on( type, callback );
};

ColumnsEvent.off = function( type, callback ) {
	$(document).off( type, callback );
};

ColumnsEvent.offAll = function() {
	$(document).off();
};

module.exports = ColumnsEvent;
},{}],17:[function(require,module,exports){
var ColumnsEvent = require('./ColumnsEvent.js');
var Style 		 = require('./Style.js');

// Item Object
// -------------
// Use this model to store a column Item
// and manage its style information

Item = function( params ) {

	this.id;
	this.title;
	this.style;
	this.active = true;

	if ( params ) {
		// this.id 	= 
		this.title 	= params.title || '';
		this.style 	= new Style( params.style );
		this.active = params.active === false ? false : true;
	}

	this._setupEventListeners();
}

Item.formattedTitle = function( title ) {
	// Return a lowercase version of the title
	// with underscores instead of spaces
	if ( !title ) {
		return '_';
	} else if ( title === '_' ) {
		return title;
	} else {
		return title.toLowerCase().replace( /_/g, ' ' ).replace(/\b./g, function(m){ return m.toUpperCase(); });
	}
};

Item.unformattedTitle = function( title ) {
	if (!title) {
		return '_';
	} else {
		return title.toLowerCase().replace(/ /g, '_');
	}
};

Item.prototype.formattedTitle = function() {
	// Return a lowercase version of the title
	// with underscores instead of spaces
	// if ( !this.title ) {
	// 	return '_';
	// } else if ( this.title === '_' ) {
	// 	return this.title;
	// } else {
	// 	return this.title.toLowerCase().replace( /_/g, ' ' ).replace(/\b./g, function(m){ return m.toUpperCase(); });
	// }
	return Item.formattedTitle( this.title );
};

Item.prototype.unformattedTitle = function() {
	// Return a lowercase version of the title
	// with underscores instead of spaces
	// if (!this.title) {
	// 	return '_';
	// } else {
	// 	return this.title.toLowerCase().replace(/ /g, '_');
	// }
	return Item.unformattedTitle( this.title );
};

// Return the correct style attribute for a given property
// @param { string } property -- the requested layout property
// @return { string } the corresponding value
Item.prototype.getStyle = function( property ) {
	var value;

	// Check whether this is a known style
	if ( this.style ) {
		value = this.style.get( property );
	}

	return value;

	// If not, check the css for the element
	// and return its value
	// if ( value ) {
	// 	return value;
	// } else {
	// 	// This is a hack!!!
	// 	return this.$group.css( property );
	// }
};

Item.prototype.is = function( item ) {
	if ( item instanceof Item ) {
		return this.title === item.title;
	} else {
		throw "exception: Comparison must be with another Item";
	}
}

Item.prototype._setActive = function( active ) {

	if ( this.active !== active ) {
		this.active = active;
		this._emitActiveStateChange();		
	}
	
};

Item.prototype._setupEventListeners = function() {

	// Listen for style changes on this Item
	// $(document).on( 'Columns.StyleView.PropertyDidUpdateWithValueForItem', this, false );
	ColumnsEvent.on( 'Columns.StyleView.PropertyDidUpdateWithValueForItem', this._onItemStyleDidChange.bind( this ) );

	// Listen for template update events
	// $(document).on( 'Columns.TemplateView.DidChange', this, false );
	ColumnsEvent.on( 'Columns.TemplateView.DidChange', this._onTemplateChange.bind( this ) );
};

Item.prototype._onItemStyleDidChange = function( event, data ) {
	if ( this.is( data.item ) ) {
		this.style.update( [{
			property: data.property,
			value: data.value
		}] );
		this._emitChange();
	}
};

Item.prototype._onTemplateChange = function( event ) {

	// Check whether the item exists in the template
	if ( TemplateView.getValueForItem( this ) ) {
		this._setActive( false );
	} else {
		this._setActive( true );
	}
};

Item.prototype._emitChange = function() {

	// Alert any listeners that the group has changed
	// var event = new CustomEvent( 'Columns.Item.DidChange', {
	// 	groupView: 	this
	// });
	// var event = document.createEvent('CustomEvent');
	// event.initCustomEvent('Columns.Item.DidChange', false, false, {
	// 	item: 	this
	// });
	// document.dispatchEvent(event);
	ColumnsEvent.send('Columns.Item.DidChange', {
		item: 	this
	});
};

Item.prototype._emitActiveStateChange = function() {

	ColumnsEvent.send('Columns.Item.ActiveStateDidChange', {
		item: this
	});
};

module.exports = Item;
},{"./ColumnsEvent.js":16,"./Style.js":19}],18:[function(require,module,exports){
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

module.exports = Layout;
},{"../styling/defaults.js":21,"./ColumnsEvent.js":16}],19:[function(require,module,exports){
var ColumnsEvent = require('./ColumnsEvent.js');

// Style Object
// -------------
// Use this model to handle styling information.

Style = function( styles ) {

	// Accept either an array of multiple styles
	// or just a single style object
	if ( Array.isArray( styles ) ) {
		this.styles = styles;
	} else if ( typeof styles === 'object' ) {
		this.styles = [ styles ];
	} else if ( typeof styles === 'string') {
		this.styles = this._parseCSS( styles );
	} else {
		this.styles = [];
	}
};

Style.parseCSS = function( css ) {

	// Accept a CSS string
	// and convert it into an array of css properties and values
	if ( typeof css !== 'string' ) throw "exception: CSS must be in string format";

	var styleObj = [];

	// Remove all spaces
	css = css.replace(/ /g, '');
	// Remove the last semicolon
	css = css.slice(0, -1);
	// Split styles
	styles = css.split(';');
	// Creat object for each style
	styles.forEach(function(style, i) {
		style = style.split(':');
		styleObj.push({
			property: style[0],
			value: style[1]
		});
	});
	return styleObj;
};

Style.prototype.update = function( styles ) {
	var newStyles = [];

	// Accept a string, array, or object of styles
	// and extend the current styles object with its values
	if ( typeof styles === 'string' ) {
		newStyles = this._parseCSS( styles );
	} else if ( Array.isArray ( styles ) ) {
		newStyles = styles;
	} else if ( typeof styles === 'object' ) {
		newStyles.push(styles);
	} else {
		throw "exception: CSS must be a string, array or object";
	}

	// Now complete the merge
	this._mergeCSS( newStyles );
};

Style.prototype.css = function() {
	var css = '';
	this.styles.forEach(function( style, i ) {
		css += style.property + ':' + style.value + ';';
	});
	return css;
};

// Return the style value for a given property
// @param { string } property
// @return { string } value
Style.prototype.get = function( property ) {
	var value;

	// Loop through each property until we find a match
	this.styles.forEach(function( style, i ) {
		if ( style.property === property ) {
			value = style.value
		}
	});

	return value;
};

Style.prototype._parseCSS = function( css ) {

	return Style.parseCSS( css );	
};

Style.prototype._mergeCSS = function( css ) {
	// Accept an array of css style objects
	if ( !Array.isArray( css ) ) throw "exception: CSS must be an array";

	var newStyles = css.map(function( style ) { return style; }),
		oldIndex,
		oldIndices = this.styles.length;

	// Loop through the old properties
	// comparing each with all the new properties.
	// Replace an existing property anytime a new one matches it
	// and then remove that new property from the array.
	// At the end, append any remaining new properties to the merged styles array.
	css.forEach(function( newStyle, newIndex ) {
		for ( oldIndex = 0 ; oldIndex < oldIndices ; oldIndex++ ) {
			if ( this.styles[ oldIndex ].property == newStyle.property ) {
				this.styles[ oldIndex ] = newStyle;
				newStyles.splice( newStyles.indexOf( newStyle ), 1 );
				break;
			}
		}

	}.bind( this ));

	// Add all remaining new styles to the styles array
	this.styles = this.styles.concat( newStyles );
};

module.exports = Style;
},{"./ColumnsEvent.js":16}],20:[function(require,module,exports){
var ColumnsEvent 	= require('./ColumnsEvent.js');
var Layout 			= require('./Layout.js');
var Item 			= require('./Item.js');
var config 			= require('../config.js');
var DEFAULTS		= require('../styling/defaults.js');

function Table( props )  {

	this.data = [];
	this.title = '';
	this.source = '';
	this.source_url = '';
	this.columns = [];
	this.layout;
	this.id;

	this._update( props );
	this._setupEventListeners();
}

Table.prototype._update = function( props ) {

	if ( props ) {
		this.data = props.data || this.data;
		this.title = props.title || this.title;
		this.source = props.source || this.source;
		this.source_url = props.source_url || this.source_url;
		this.id = props.id || this.id;

		if ( props.columns ) {	
			this.columns = this.itemsFromColumnNames( props.columns );
		}

		if ( props.layout ) {
			this.layout = props.layout;
		} else if ( !this.layout ) {
			this.layout = new Layout( this.columns );
		}

		// Let everyone know that we've updated the table
		this._emitChange();
	}
};

Table.prototype._emitChange = function() {
	// Let everyone know that the table has been uploaded successfully
	// var columnsEvent = document.createEvent('CustomEvent');
	// columnsEvent.initCustomEvent('Columns.Table.DidChange', false, false, {
	// 	table: 	this
	// });
	// document.dispatchEvent(columnsEvent);
	ColumnsEvent.send('Columns.Table.DidChange', {
		table: 	this
	});
};

Table.prototype._emitUploadSuccess = function() {
	// var columnsEvent = document.createEvent('CustomEvent');
	// columnsEvent.initCustomEvent('Columns.Table.DidUploadWithSuccess', false, false, {
	// 	table: 	this
	// });
	// document.dispatchEvent(columnsEvent);
	ColumnsEvent.send('Columns.Table.DidUploadWithSuccess', {
		table: 	this
	});
};

Table.prototype._emitUploadFail = function() {
	// var columnsEvent = document.createEvent('CustomEvent');
	// columnsEvent.initCustomEvent('Columns.Table.DidUploadWithFailure', false, false, {
	// 	table: 	this
	// });
	// document.dispatchEvent(columnsEvent);
	ColumnsEvent.send('Columns.Table.DidUploadWithFailure', {
		table: 	this
	});
};

Table.prototype._emitUpdateSuccess = function() {
	// var columnsEvent = document.createEvent('CustomEvent');
	// columnsEvent.initCustomEvent('Columns.Table.DidUpdateWithSuccess', false, false, {
	// 	table: 	this
	// });
	// document.dispatchEvent(columnsEvent);
	ColumnsEvent.send('Columns.Table.DidUpdateWithSuccess', {
		table: 	this
	});
};

Table.prototype._emitUpdateFail = function() {
	// var columnsEvent = document.createEvent('CustomEvent');
	// columnsEvent.initCustomEvent('Columns.Table.DidUpdateWithFailure', false, false, {
	// 	table: 	this
	// });
	// document.dispatchEvent(columnsEvent);
	ColumnsEvent.send('Columns.Table.DidUpdateWithFailure', {
		table: 	this
	});
};

// Return an item given a data column name
// @param {string} data -- the unformatted column title to search against ('first_name')
// @return {Item} -- the matching item
Table.prototype.getItemForData = function( data ) {
	var item;

	if ( data && this.columns && this.columns.length ) {
		item = this.columns.filter(function( column ) {
			return data === column.unformattedTitle();
		}.bind( this ))[ 0 ];
	}

	return item;
};

Table.prototype.itemsFromColumnNames = function( columnNames ) {

	if ( typeof columnNames === 'string' ) {
		columnNames = [ columnNames ];
	}

	if( columnNames instanceof Item ) {
		columnNames = [ columnNames ];
	}

	if( !Array.isArray( columnNames ) ) {
		throw "exception: Column names must be a string or an array of strings";
	}

	return columnNames.map(function( columnName, i ) {
		// var item;

		// if ( columnName instanceof Item ) {
		// 	return columnName;
		// } else {
		// 	item = new Item({
		// 		title: columnName,
		// 		style: DEFAULTS.styles[ i ];
		// 	})
		// }
		return columnName instanceof Item ? columnName : new Item({ title: columnName, style: DEFAULTS.styles[ i ] });
	});
}

Table.prototype._uploadFile = function( file ) {
	var formData = new FormData();

	// Add any table meta-data to the form
	formData.append( "data", file );
	formData.append( "title", this.title );
	formData.append( "source", this.source );
	formData.append( "source_url", this.source_url );
	formData.append( "columns", this.stringFromColumns( this.columns ) );
	// formData.append( "layout", JSON.stringify( this.layout.model ) );

	// this._onUploadSuccess( {
	// 	status: 'success',
	// 	data: {
	// 		table_id: 1
	// 	}
	// });

	$.ajax({
        url: config.api.host + '/columns/table',  //Server script to process data
        type: 'POST',
        contentType: false,
        processData: false,
        data: formData,
        success: this._onUploadSuccess.bind( this )
    });
};

Table.prototype._updateTable = function() {
	var data = {
		title: this.title,
		source: this.source,
		source_url: this.source_url,
		layout: JSON.stringify( this.layout.model ),
		columns: this.stringFromColumns( this.columns )
	};
	$.post(config.api.host + '/columns/table/' + this.id, data, this._onUpdateSuccess.bind( this ) );
};

Table.prototype._setupEventListeners = function() {

	// Listen for column names parsing
	ColumnsEvent.on( 'Columns.UploadView.DidParseColumnNamesForFile', this._onColumnNamesParsed.bind( this ));

	// Listen for row data parsing
	ColumnsEvent.on( 'Columns.UploadView.DidParseDataRowForFile', this._onRowParsed.bind( this ) );	

	// Listen for parsing completion
	ColumnsEvent.on( 'Columns.UploadView.DidCompleteParseForFile', this._onParseComplete.bind( this ) );

	// Listen for updates from the details panel
	ColumnsEvent.on( 'Columns.EmbedDetailsView.DidUpdatePropertyWithValue', this._onTableUpdate.bind( this ) );

	// Listen for layout updates
	ColumnsEvent.on( 'Columns.Layout.DidChange', this._onLayoutUpdate.bind( this ) );

};

Table.prototype._onColumnNamesParsed = function( event, data ) {

	this.columns = this.itemsFromColumnNames( data.columns );
};

Table.prototype._onRowParsed = function( event, data ) {
	var row = data.row,
		data = {};

	row.forEach(function( value, i ) {
		data[ this.columns[ i ].unformattedTitle() ] = value;
	}.bind( this ));

	this.data.push( data );
};

Table.prototype._onParseComplete = function( event, data ) {

	this._uploadFile( data.file );
};

Table.prototype._onUploadSuccess = function( data, status, request ) {

	// Check for a server-side error
	if ( data.status !== 'success' ) {
		this._onUploadFail( request, status, data.message );
		return;
	}

	// Set the Table ID
	this._update({
		id: data.data.table_id
	});

	this._emitUploadSuccess();
};

Table.prototype._onUploadFail = function( request, status, error ) {

	this._emitUploadFail();
};

Table.prototype._onUpdateSuccess = function( data, status, request ) {

	// Check for a server-side error
	if ( data.status !== 'success' ) {
		this._emitUpdateFail();
		return;
	}

	this._emitUpdateSuccess();
};

Table.prototype._onTableUpdate = function( event, data ) {
	var props = {};

	props[ data.property ] = data.value;

	this._update( props );
	this._updateTable();
};

Table.prototype._onLayoutUpdate = function( event, data ) {
	this._update({
		layout: data.layout
	});
	this._updateTable();
};

Table.prototype.stringFromColumns = function( columns ) {

	return columns.map(function( column, i ) {
		return column.title;
	}).join();
};

module.exports = Table;
},{"../config.js":2,"../styling/defaults.js":21,"./ColumnsEvent.js":16,"./Item.js":17,"./Layout.js":18}],21:[function(require,module,exports){
// We need to treat layout properties slightly differently than regular css properties
// to account for browser-specific prefixes
module.exports = {
	styles: [
		[{
			property: 'color',
			value: '#3a3a3a'
		}],
		[{
			property: 'color',
			value: '#888'
		},{
			property: 'font-size',
			value: '14px'
		}, {
			property: 'margin-top',
			value: '4px'
		}],
		[{
			property: 'color',
			value: '#3a3a3a'
		},{
			property: 'font-size',
			value: '24px'
		}]	
	],
	layouts: [
		[{
			property: 'flex-direction',
			value: 'column'
		}, {
			property: 'align-items',
			value: 'flex-start'
		}]
	]
};
},{}]},{},[15])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb21waWxlZC1qYXZhc2NyaXB0cy9zdHlsaW5nL2NvbXBpbGVkLWRhdGEuanMiLCJqYXZhc2NyaXB0cy9jb25maWcuanMiLCJqYXZhc2NyaXB0cy9jb250cm9sbGVycy9FbWJlZERldGFpbHNWaWV3LmpzIiwiamF2YXNjcmlwdHMvY29udHJvbGxlcnMvSXRlbVZpZXcuanMiLCJqYXZhc2NyaXB0cy9jb250cm9sbGVycy9JdGVtc1ZpZXcuanMiLCJqYXZhc2NyaXB0cy9jb250cm9sbGVycy9TdHlsZUNvbXBvbmVudFZpZXcuanMiLCJqYXZhc2NyaXB0cy9jb250cm9sbGVycy9TdHlsZUlucHV0Vmlldy5qcyIsImphdmFzY3JpcHRzL2NvbnRyb2xsZXJzL1N0eWxlTXVsdGlwbGVTZWdtZW50ZWRCdXR0b25WaWV3LmpzIiwiamF2YXNjcmlwdHMvY29udHJvbGxlcnMvU3R5bGVTZWdtZW50ZWRCdXR0b25WaWV3LmpzIiwiamF2YXNjcmlwdHMvY29udHJvbGxlcnMvU3R5bGVWaWV3LmpzIiwiamF2YXNjcmlwdHMvY29udHJvbGxlcnMvVGVtcGxhdGVHcm91cFZpZXcuanMiLCJqYXZhc2NyaXB0cy9jb250cm9sbGVycy9UZW1wbGF0ZVZhbHVlVmlldy5qcyIsImphdmFzY3JpcHRzL2NvbnRyb2xsZXJzL1RlbXBsYXRlVmlldy5qcyIsImphdmFzY3JpcHRzL2NvbnRyb2xsZXJzL1VwbG9hZFZpZXcuanMiLCJqYXZhc2NyaXB0cy9tYWluLmpzIiwiamF2YXNjcmlwdHMvbW9kZWxzL0NvbHVtbnNFdmVudC5qcyIsImphdmFzY3JpcHRzL21vZGVscy9JdGVtLmpzIiwiamF2YXNjcmlwdHMvbW9kZWxzL0xheW91dC5qcyIsImphdmFzY3JpcHRzL21vZGVscy9TdHlsZS5qcyIsImphdmFzY3JpcHRzL21vZGVscy9UYWJsZS5qcyIsImphdmFzY3JpcHRzL3N0eWxpbmcvZGVmYXVsdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaE1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDektBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9RQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25LQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdFJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJDb2x1bW5zWydzdHlsZURhdGEnXSA9IHtcblx0Y29tcG9uZW50czoge30sXG5cdHR5cGVzOiB7fVxufTtcbkNvbHVtbnMuc3R5bGVEYXRhLmNvbXBvbmVudHNbJ2l0ZW1zJ10gPSB7XG5cdHRpdGxlOiAnSXRlbXMnLFxuXHRyb3dzOiBbe1xuXHRcdGl0ZW1zOiBbe1xuXHRcdFx0a2luZDogJ3NlZ21lbnRlZC1idXR0b24nLFxuXHRcdFx0bGFiZWw6ICdMYXlvdXQnLFxuXHRcdFx0cHJvcGVydHk6IHtcblx0XHRcdFx0bmFtZTonZmxleC1kaXJlY3Rpb24nXG5cdFx0XHR9LFxuXHRcdFx0YnV0dG9uczogW3tcblx0XHRcdFx0dmFsdWU6ICdyb3cnLFxuXHRcdFx0XHRpY29uOiAnbGF5b3V0LWhvcml6b250YWwnXG5cdFx0XHR9LCB7XG5cdFx0XHRcdHZhbHVlOiAnY29sdW1uJyxcblx0XHRcdFx0aWNvbjogJ2xheW91dC12ZXJ0aWNhbCdcblx0XHRcdH1dXG5cdFx0fSwge1xuXHRcdFx0a2luZDogJ3NlZ21lbnRlZC1idXR0b24nLFxuXHRcdFx0bGFiZWw6ICdBbGlnbm1lbnQnLFxuXHRcdFx0cHJvcGVydHk6IHtcblx0XHRcdFx0bmFtZTonYWxpZ24taXRlbXMnXG5cdFx0XHR9LFxuXHRcdFx0YnV0dG9uczogW3tcblx0XHRcdFx0dmFsdWU6ICdmbGV4LXN0YXJ0Jyxcblx0XHRcdFx0aWNvbjogJ3Bvc2l0aW9uLWxlZnQnXG5cdFx0XHR9LCB7XG5cdFx0XHRcdHZhbHVlOiAnY2VudGVyJyxcblx0XHRcdFx0aWNvbjogJ3Bvc2l0aW9uLWNlbnRlcidcblx0XHRcdH0sIHtcblx0XHRcdFx0dmFsdWU6ICdmbGV4LWVuZCcsXG5cdFx0XHRcdGljb246ICdwb3NpdGlvbi1yaWdodCdcblx0XHRcdH1dXG5cdFx0fV1cblx0fV1cbn1cbkNvbHVtbnMuc3R5bGVEYXRhLmNvbXBvbmVudHNbJ21hcmdpbnMnXSA9IHtcblx0dGl0bGU6ICdTcGFjaW5nJyxcblx0cm93czogW3tcblx0XHRpdGVtczogW3tcblx0XHRcdGtpbmQ6ICdpbnB1dCcsXG5cdFx0XHR0eXBlOiAndGVsJyxcblx0XHRcdGNhbkJlTmVnYXRpdmU6IHRydWUsXG5cdFx0XHRwcmVwZW5kSWNvbjogJ21hcmdpbi10b3AnLFxuXHRcdFx0YXBwZW5kQ29udHJvbHM6IHRydWUsXG5cdFx0XHRsYWJlbDogJ1RvcCcsXG5cdFx0XHRwcm9wZXJ0eTogJ21hcmdpbi10b3AnLFxuXHRcdFx0ZGVmYXVsdDogJzBweCdcblx0XHR9LCB7XG5cdFx0XHRraW5kOiAnaW5wdXQnLFxuXHRcdFx0dHlwZTogJ3RlbCcsXG5cdFx0XHRjYW5CZU5lZ2F0aXZlOiB0cnVlLFxuXHRcdFx0cHJlcGVuZEljb246ICdtYXJnaW4tYm90dG9tJyxcblx0XHRcdGFwcGVuZENvbnRyb2xzOiB0cnVlLFxuXHRcdFx0bGFiZWw6ICdCb3R0b20nLFxuXHRcdFx0cHJvcGVydHk6ICdtYXJnaW4tYm90dG9tJyxcblx0XHRcdGRlZmF1bHQ6ICcwcHgnXG5cdFx0fV1cblx0fSwge1xuXHRcdGl0ZW1zOiBbe1xuXHRcdFx0a2luZDogJ2lucHV0Jyxcblx0XHRcdHR5cGU6ICd0ZWwnLFxuXHRcdFx0Y2FuQmVOZWdhdGl2ZTogdHJ1ZSxcblx0XHRcdHByZXBlbmRJY29uOiAnbWFyZ2luLWxlZnQnLFxuXHRcdFx0YXBwZW5kQ29udHJvbHM6IHRydWUsXG5cdFx0XHRsYWJlbDogJ0xlZnQnLFxuXHRcdFx0cHJvcGVydHk6ICdtYXJnaW4tbGVmdCcsXG5cdFx0XHRkZWZhdWx0OiAnMHB4J1xuXHRcdH0sIHtcblx0XHRcdGtpbmQ6ICdpbnB1dCcsXG5cdFx0XHR0eXBlOiAndGVsJyxcblx0XHRcdGNhbkJlTmVnYXRpdmU6IHRydWUsXG5cdFx0XHRwcmVwZW5kSWNvbjogJ21hcmdpbi1yaWdodCcsXG5cdFx0XHRhcHBlbmRDb250cm9sczogdHJ1ZSxcblx0XHRcdGxhYmVsOiAnUmlnaHQnLFxuXHRcdFx0cHJvcGVydHk6ICdtYXJnaW4tcmlnaHQnLFxuXHRcdFx0ZGVmYXVsdDogJzBweCdcblx0XHR9XVxuXHR9XVxufTtcbkNvbHVtbnMuc3R5bGVEYXRhLmNvbXBvbmVudHNbJ3RleHQnXSA9IHtcblx0dGl0bGU6ICdUZXh0Jyxcblx0cm93czogW3tcblx0XHRpdGVtczogW3tcblx0XHRcdGtpbmQ6ICdpbnB1dCcsXG5cdFx0XHR0eXBlOiAndGVsJyxcblx0XHRcdHByZXBlbmRJY29uOiBmYWxzZSxcblx0XHRcdGFwcGVuZENvbnRyb2xzOiB0cnVlLFxuXHRcdFx0bGFiZWw6ICdTaXplJyxcblx0XHRcdHByb3BlcnR5OiAnZm9udC1zaXplJyxcblx0XHRcdGRlZmF1bHQ6ICcxNHB4J1xuXHRcdH0sIHtcblx0XHRcdGtpbmQ6ICdtdWx0aXBsZS1zZWdtZW50ZWQtYnV0dG9uJyxcblx0XHRcdGxhYmVsOiAnU3R5bGUnLFxuXHRcdFx0YnV0dG9uczogW3tcblx0XHRcdFx0cHJvcGVydHk6IHtcblx0XHRcdFx0XHRuYW1lOiAnZm9udC13ZWlnaHQnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHZhbHVlczoge1xuXHRcdFx0XHRcdGFjdGl2ZTogJ2JvbGQnLFxuXHRcdFx0XHRcdGluYWN0aXZlOiAnbm9ybWFsJyxcblx0XHRcdFx0XHRkZWZhdWx0OiAnbm9ybWFsJ1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRpY29uOiAnYm9sZCdcblx0XHRcdH0sIHtcblx0XHRcdFx0cHJvcGVydHk6IHtcblx0XHRcdFx0XHRuYW1lOidmb250LXN0eWxlJ1xuXHRcdFx0XHR9LFxuXHRcdFx0XHR2YWx1ZXM6IHtcblx0XHRcdFx0XHRhY3RpdmU6ICdpdGFsaWMnLFxuXHRcdFx0XHRcdGluYWN0aXZlOiAnbm9ybWFsJyxcblx0XHRcdFx0XHRkZWZhdWx0OiAnbm9ybWFsJ1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRpY29uOiAnaXRhbGljJ1xuXHRcdFx0fSwge1xuXHRcdFx0XHRwcm9wZXJ0eToge1xuXHRcdFx0XHRcdG5hbWU6J3RleHQtZGVjb3JhdGlvbidcblx0XHRcdFx0fSxcblx0XHRcdFx0dmFsdWVzOiB7XG5cdFx0XHRcdFx0YWN0aXZlOiAndW5kZXJsaW5lJyxcblx0XHRcdFx0XHRpbmFjdGl2ZTogJ25vbmUnLFxuXHRcdFx0XHRcdGRlZmF1bHQ6ICdub25lJ1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRpY29uOiAndW5kZXJsaW5lJ1xuXHRcdFx0fV1cblx0XHR9XVxuXHR9LCB7XG5cdFx0aXRlbXM6IFt7XG5cdFx0XHRraW5kOiAnaW5wdXQnLFxuXHRcdFx0dHlwZTogJ2NvbG9yJyxcblx0XHRcdHByZXBlbmRJY29uOiBmYWxzZSxcblx0XHRcdGFwcGVuZENvbnRyb2xzOiBmYWxzZSxcblx0XHRcdGxhYmVsOiAnQ29sb3InLFxuXHRcdFx0cHJvcGVydHk6ICdjb2xvcicsXG5cdFx0XHRkZWZhdWx0OiAnIzNhM2EzYSdcblx0XHR9LCB7XG5cdFx0XHRraW5kOiAnc2VnbWVudGVkLWJ1dHRvbicsXG5cdFx0XHRsYWJlbDogJ0FsaWdubWVudCcsXG5cdFx0XHRwcm9wZXJ0eToge1xuXHRcdFx0XHRuYW1lOiAndGV4dC1hbGlnbicsXG5cdFx0XHRcdGRlZmF1bHQ6ICdsZWZ0J1xuXHRcdFx0fSxcblx0XHRcdGJ1dHRvbnM6IFt7XG5cdFx0XHRcdHZhbHVlOiAnbGVmdCcsXG5cdFx0XHRcdGljb246ICd0ZXh0LWFsaWduLWxlZnQnXG5cdFx0XHR9LCB7XG5cdFx0XHRcdHZhbHVlOiAnY2VudGVyJyxcblx0XHRcdFx0aWNvbjogJ3RleHQtYWxpZ24tY2VudGVyJ1xuXHRcdFx0fSwge1xuXHRcdFx0XHR2YWx1ZTogJ3JpZ2h0Jyxcblx0XHRcdFx0aWNvbjogJ3RleHQtYWxpZ24tcmlnaHQnXG5cdFx0XHR9XVxuXHRcdH1dXG5cdH1dXG59O1xuQ29sdW1ucy5zdHlsZURhdGEudHlwZXMgPSB7XG5cdHRleHQ6IFtcblx0XHRDb2x1bW5zLnN0eWxlRGF0YS5jb21wb25lbnRzWyd0ZXh0J10sXG5cdFx0Q29sdW1ucy5zdHlsZURhdGEuY29tcG9uZW50c1snbWFyZ2lucyddXG5cdF0sXG5cdGdyb3VwOiBbXG5cdFx0Q29sdW1ucy5zdHlsZURhdGEuY29tcG9uZW50c1snaXRlbXMnXSxcblx0XVxufTtcbm1vZHVsZS5leHBvcnRzID0gQ29sdW1uczsiLCJ2YXIgZW52ID0gJ3t7ZW52aXJvbm1lbnR9fSc7XG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0ZGV2ZWxvcG1lbnQ6IHtcblx0XHRhcGk6IHtcblx0XHRcdGhvc3Q6ICdodHRwOi8vMTI3LjAuMC4xOjgwODAnXG5cdFx0fSxcblx0XHR3ZWI6IHtcblx0XHRcdGhvc3Q6ICdodHRwOi8vMTI3LjAuMC4xJ1xuXHRcdH0sXG5cdFx0ZW1iZWQ6IHtcblx0XHRcdGhvc3Q6ICdodHRwOi8vMTI3LjAuMC4xJyxcblx0XHRcdHBhdGg6ICcvcHVibGljL2VtYmVkLXRhYmxlLmpzJ1xuXHRcdH1cblx0fSxcblx0c3RhZ2luZzoge1xuXHRcdGFwaToge1xuXHRcdFx0aG9zdDogJ2h0dHA6Ly9hcGlzdGcudGhlY29sdW1uc3Byb2plY3QuY29tJ1xuXHRcdH0sXG5cdFx0d2ViOiB7XG5cdFx0XHRob3N0OiAnaHR0cDovL2FwcHN0Zy50aGVjb2x1bW5zcHJvamVjdC5jb20nXG5cdFx0fSxcblx0XHRlbWJlZDoge1xuXHRcdFx0aG9zdDogJ2h0dHA6Ly9zdGcuY29sdW0ubnonLFxuXHRcdFx0cGF0aDogJy9wdWJsaWMvZW1iZWQtdGFibGUuanMnXG5cdFx0fVxuXHR9LFxuXHRwcm9kdWN0aW9uOiB7XG5cdFx0YXBpOiB7XG5cdFx0XHRob3N0OiAnaHR0cDovL2FwaS50aGVjb2x1bW5zcHJvamVjdC5jb20nXG5cdFx0fSxcblx0XHR3ZWI6IHtcblx0XHRcdGhvc3Q6ICdodHRwOi8vYXBwLnRoZWNvbHVtbnNwcm9qZWN0LmNvbSdcblx0XHR9LFxuXHRcdGVtYmVkOiB7XG5cdFx0XHRob3N0OiAnaHR0cDovL2NvbHVtLm56Jyxcblx0XHRcdHBhdGg6ICcvcHVibGljL2VtYmVkLXRhYmxlLmpzJ1xuXHRcdH1cblx0fVxufVtlbnZdOyIsInZhciBDb2x1bW5zRXZlbnQgXHRcdFx0PSByZXF1aXJlKCcuLi9tb2RlbHMvQ29sdW1uc0V2ZW50LmpzJyk7XG52YXIgY29uZmlnIFx0XHRcdFx0XHQ9IHJlcXVpcmUoJy4uL2NvbmZpZy5qcycpO1xuXG52YXIgUEFORUxfVEVNUExBVEUgXHRcdFx0PSBDb2x1bW5zLlRlbXBsYXRlc1sndGVtcGxhdGVzL3BhbmVscy9wYW5lbC5oYnMnXSxcblx0Qk9EWV9URU1QTEFURSBcdFx0XHQ9IENvbHVtbnMuVGVtcGxhdGVzWyd0ZW1wbGF0ZXMvZW1iZWQtZGV0YWlscy1wYW5lbC9ib2R5LmhicyddLFxuXHRTRUxFQ1RPUiBcdFx0XHRcdD0gJyNlbWJlZC1kZXRhaWxzLXBhbmVsJyxcblx0Q0xPU0VfQlVUVE9OX1NFTEVDVE9SIFx0PSAnLmNvbHVtbnMtcGFuZWwtaGVhZGVyLWNsb3NlLWJ1dHRvbicsXG5cdEJMT0NLRVJfU0VMRUNUT1IgXHRcdD0gJy5jb2x1bW5zLXBhbmVsLWJsb2NrZXInO1xuXG5mdW5jdGlvbiBFbWJlZERldGFpbHNWaWV3KCB0YWJsZSApIHtcblx0dGhpcy50YWJsZSA9IHRhYmxlO1xuXHR0aGlzLl9zZXR1cEV2ZW50TGlzdGVuZXJzKCk7XG59XG5cbkVtYmVkRGV0YWlsc1ZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKCkge1xuXG5cdHZhciAkZW1iZWQgPSAkKCBQQU5FTF9URU1QTEFURSh7XG5cdFx0aWQ6IHRoaXMudGFibGUuaWQsXG5cdFx0aGVhZGVyOiB7XG5cdFx0XHR0aXRsZTogJ0VtYmVkIERldGFpbHMnXG5cdFx0fSxcblx0XHRib2R5OiBCT0RZX1RFTVBMQVRFKHtcblx0XHRcdHRpdGxlOiB0aGlzLnRhYmxlLnRpdGxlLFxuXHRcdFx0c291cmNlOiB0aGlzLnRhYmxlLnNvdXJjZSxcblx0XHRcdHNvdXJjZV91cmw6IHRoaXMudGFibGUuc291cmNlX3VybCxcblx0XHRcdHRhYmxlX2lkOiB0aGlzLnRhYmxlLmlkLFxuXHRcdFx0dXJsOiBjb25maWcuZW1iZWQuaG9zdCArIGNvbmZpZy5lbWJlZC5wYXRoXG5cdFx0fSksXG5cdFx0Zm9vdGVyOiBudWxsLFxuXHR9KSApO1xuXG5cdHRoaXMuJGVtYmVkID0gJGVtYmVkO1xuXHR0aGlzLl9zZXR1cEludGVyYWN0aW9uTGlzdGVuZXJzKCk7XG5cblx0JCgnYm9keScpLmFwcGVuZCggdGhpcy4kZW1iZWQgKTtcblx0cmV0dXJuIHRoaXMuJGVtYmVkO1xufTtcblxuRW1iZWREZXRhaWxzVmlldy5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLiRlbWJlZC5hZGRDbGFzcygnYWN0aXZlJyk7XG59O1xuXG5FbWJlZERldGFpbHNWaWV3LnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24oKSB7XG5cdHRoaXMuJGVtYmVkLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbn07XG5cbkVtYmVkRGV0YWlsc1ZpZXcucHJvdG90eXBlLl9lbWl0Q2hhbmdlID0gZnVuY3Rpb24oIHByb3BlcnR5LCB2YWx1ZSApIHtcblx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHQvLyBjb2x1bW5zRXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLkVtYmVkRGV0YWlsc1ZpZXcuRGlkVXBkYXRlUHJvcGVydHlXaXRoVmFsdWUnLCBmYWxzZSwgZmFsc2UsIHtcblx0Ly8gXHRlbWJlZDogXHR0aGlzLFxuXHQvLyBcdHByb3BlcnR5OiBwcm9wZXJ0eSxcblx0Ly8gXHR2YWx1ZTogdmFsdWVcblx0Ly8gfSk7XG5cdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY29sdW1uc0V2ZW50KTtcblx0Q29sdW1uc0V2ZW50LnNlbmQoICdDb2x1bW5zLkVtYmVkRGV0YWlsc1ZpZXcuRGlkVXBkYXRlUHJvcGVydHlXaXRoVmFsdWUnLCB7XG5cdFx0ZW1iZWQ6IFx0dGhpcyxcblx0XHRwcm9wZXJ0eTogcHJvcGVydHksXG5cdFx0dmFsdWU6IHZhbHVlXG5cdH0pO1xufTtcblxuRW1iZWREZXRhaWxzVmlldy5wcm90b3R5cGUuX3NldHVwRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBTaG91bGQgbGlzdGVuIGZvciB0YWJsZSB1cGxvYWQgc3VjY2Vzc1xuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLlRhYmxlLkRpZFVwbG9hZFdpdGhTdWNjZXNzJywgdGhpcy5fb25UYWJsZVVwbG9hZC5iaW5kKCB0aGlzICkgKTtcbn07XG5cbkVtYmVkRGV0YWlsc1ZpZXcucHJvdG90eXBlLl9zZXR1cEludGVyYWN0aW9uTGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gU2hvdWxkIGxpc3RlbiB0byBjbGlja3Mgb24gdGhlIGVtYmVkIGJ1dHRvblxuXHQkKCcuY29sdW1ucy1oZWFkZXItbmF2LWVtYmVkJykub24oICdjbGljaycsIHRoaXMuX29uRW1iZWRCdXR0b25DbGljay5iaW5kKCB0aGlzICkgKTtcblxuXHQvLyBTaG91bGQgbGlzdGVuIHRvIGNsaWNrcyBvbiB0aGUgaGlkZSBidXR0b25cblx0dGhpcy4kZW1iZWQuZmluZCggQ0xPU0VfQlVUVE9OX1NFTEVDVE9SICkub24oICdjbGljaycsIHRoaXMuX29uQ2xvc2VCdXR0b25DbGljay5iaW5kKCB0aGlzICkgKTtcblxuXHQvLyBTaG91bGQgbGlzdGVuIHRvIGNsaWNrcyBvbiB0aGUgYmxvY2tlclxuXHR0aGlzLiRlbWJlZC5maW5kKCBCTE9DS0VSX1NFTEVDVE9SICkub24oICdjbGljaycsIHRoaXMuX29uQmxvY2tlckNsaWNrLmJpbmQoIHRoaXMgKSApO1xuXG5cdC8vIFNob3VsZCBsaXN0ZW4gdG8ga2V5dXAgZXZlbnRzIG9uIGlucHV0IGZpZWxkc1xuXHR0aGlzLiRlbWJlZC5maW5kKCdpbnB1dCcpLm9uKCAna2V5dXAnLCB0aGlzLl9vbklucHV0S2V5dXAuYmluZCggdGhpcyApICk7XG5cblx0Ly8gU2hvdWxkIGxpc3RlbiB0byBibHVyIGV2ZW50cyBvbiBpbnB1dCBmaWVsZHNcblx0dGhpcy4kZW1iZWQuZmluZCgnaW5wdXQnKS5vbiggJ2JsdXInLCB0aGlzLl9vbklucHV0Qmx1ci5iaW5kKCB0aGlzICkgKTtcbn07XG5cbkVtYmVkRGV0YWlsc1ZpZXcucHJvdG90eXBlLl9vblRhYmxlVXBsb2FkID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXHR0aGlzLnRhYmxlID0gZGF0YS50YWJsZTtcblx0dGhpcy5yZW5kZXIoKTtcbn07XG5cbkVtYmVkRGV0YWlsc1ZpZXcucHJvdG90eXBlLl9vbkVtYmVkQnV0dG9uQ2xpY2sgPSBmdW5jdGlvbiggZXZlbnQpIHtcblx0dGhpcy5zaG93KCk7XG59O1xuXG5FbWJlZERldGFpbHNWaWV3LnByb3RvdHlwZS5fb25DbG9zZUJ1dHRvbkNsaWNrID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuXHR0aGlzLmhpZGUoKTtcbn07XG5cbkVtYmVkRGV0YWlsc1ZpZXcucHJvdG90eXBlLl9vbkJsb2NrZXJDbGljayA9IGZ1bmN0aW9uKCBldmVudCApIHtcblx0dGhpcy5oaWRlKCk7XG59O1xuXG5FbWJlZERldGFpbHNWaWV3LnByb3RvdHlwZS5fb25JbnB1dEtleXVwID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuXHR2YXIgJGZpZWxkIFx0XHQ9ICQoIGV2ZW50LnRhcmdldCApLFxuXHRcdHByb3BlcnR5XHQ9ICRmaWVsZC5kYXRhKCdwcm9wZXJ0eScpLFxuXHRcdHZhbHVlXHRcdD0gJGZpZWxkLnZhbCgpO1xuXG5cdHRoaXMuX2VtaXRDaGFuZ2UoIHByb3BlcnR5LCB2YWx1ZSApOyBcbn07XG5cbkVtYmVkRGV0YWlsc1ZpZXcucHJvdG90eXBlLl9vbklucHV0Qmx1ciA9IGZ1bmN0aW9uKCBldmVudCApIHtcblx0dmFyICRmaWVsZCBcdFx0PSAkKCBldmVudC50YXJnZXQgKSxcblx0XHRwcm9wZXJ0eVx0PSAkZmllbGQuZGF0YSgncHJvcGVydHknKSxcblx0XHR2YWx1ZVx0XHQ9ICRmaWVsZC52YWwoKTtcblxuXHR0aGlzLl9lbWl0Q2hhbmdlKCBwcm9wZXJ0eSwgdmFsdWUgKTsgXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVtYmVkRGV0YWlsc1ZpZXc7XG5cbiIsInZhciBDb2x1bW5zRXZlbnQgXHQ9IHJlcXVpcmUoJy4uL21vZGVscy9Db2x1bW5zRXZlbnQuanMnKTtcblxudmFyIERSQUdHSU5HX0NMQVNTID0gJ2RyYWdnaW5nJyxcblx0SU5BQ1RJVkVfQ0xBU1MgPSAnaW5hY3RpdmUnLFxuXHRTRUxFQ1RFRF9DTEFTUyA9ICdzZWxlY3RlZCcsXG5cdElURU1fU0VMRUNUT1IgPSAnLmxheW91dC1jb2x1bW4nO1xuXG4vLyBNYW5hZ2UgdGhlIGRpc3BsYXkgb2YgYSBzaW5nbGUgaXRlbVxuLy8gd2l0aGluIHRoZSBsaXN0IG9mIGl0ZW1zXG5JdGVtVmlldyA9IGZ1bmN0aW9uKCBpdGVtICkge1xuXG5cdHRoaXMuaXRlbSA9IGl0ZW0gfHwgbmV3IEl0ZW0oKTtcblx0dGhpcy50ZW1wbGF0ZSA9IENvbHVtbnMuVGVtcGxhdGVzWyd0ZW1wbGF0ZXMvbGF5b3V0L2NvbHVtbi5oYnMnXTtcblx0dGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xuXHR0aGlzLiRpdGVtO1xufTtcblxuSXRlbVZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgJGl0ZW0gPSAkKCB0aGlzLnRlbXBsYXRlKHtcblx0XHR0aXRsZTogdGhpcy5pdGVtLmZvcm1hdHRlZFRpdGxlKCksXG5cdFx0YWN0aXZlOiB0aGlzLml0ZW0uYWN0aXZlLFxuXHRcdHNlbGVjdGVkOiB0aGlzLnNlbGVjdGVkXG5cdH0pICk7XG5cdCRpdGVtLmRhdGEoJ3N0eWxlJywgdGhpcy5pdGVtLnN0eWxlLnN0eWxlcyk7XG5cdHRoaXMuJGl0ZW0gPSAkaXRlbTtcblxuXHR0aGlzLnNldHVwRXZlbnRzKCk7XG5cdHRoaXMuX3NldHVwRXZlbnRMaXN0ZW5lcnMoKTtcblxuXHRyZXR1cm4gdGhpcy4kaXRlbTtcbn07XG5cbkl0ZW1WaWV3LnByb3RvdHlwZS5zZXR1cEV2ZW50cyA9IGZ1bmN0aW9uKCkge1xuXG5cdC8vIE1ha2UgdGhlIGl0ZW0gZHJhZ2dhYmxlXG5cdHRoaXMuJGl0ZW0uZHJhZ2dhYmxlKHtcblx0XHRyZXZlcnQ6ICdpbnZhbGlkJyxcblx0XHRyZXZlcnREdXJhdGlvbjogMjAwLFxuXHRcdGhlbHBlcjogJ2Nsb25lJyxcblx0XHQvLyBvcGFjaXR5OiAuMixcblx0XHRjYW5jZWw6ICcuaW5hY3RpdmUnXG5cdH0pO1xuXG5cdHRoaXMuJGl0ZW0ub24oICdkcmFnc3RhcnQnLCAkLnByb3h5KGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XG5cblx0XHQvLyBNYWtlIGluYWN0aXZlXG5cdFx0JCggZXZlbnQudGFyZ2V0ICkuYWRkQ2xhc3MoIERSQUdHSU5HX0NMQVNTICk7XG5cblx0XHQvLyBBbGVydCBhbnkgbGlzdGVuZXJzIHRoYXQgdGhlIGl0ZW0gaGFzIHN0YXJ0ZWQgZHJhZ1xuXHRcdC8vIHZhciBldmVudCA9IG5ldyBDdXN0b21FdmVudCggJ0NvbHVtbnMuSXRlbVZpZXcuSXRlbURpZEJlZ2luRHJhZycsIHtcblx0XHQvLyBcdGl0ZW06IFx0dGhpcyxcblx0XHQvLyBcdGV2ZW50OiBcdGV2ZW50LFxuXHRcdC8vIFx0dWk6IFx0dWlcblx0XHQvLyB9KTtcblx0XHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdFx0Ly8gY29sdW1uc0V2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5JdGVtVmlldy5JdGVtRGlkQmVnaW5EcmFnJywgZmFsc2UsIGZhbHNlLCB7XG5cdFx0Ly8gXHRpdGVtOiBcdHRoaXMsXG5cdFx0Ly8gXHRldmVudDogXHRldmVudCxcblx0XHQvLyBcdHVpOiBcdHVpXG5cdFx0Ly8gfSk7XG5cdFx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjb2x1bW5zRXZlbnQpO1xuXHRcdENvbHVtbnNFdmVudC5zZW5kKCAnQ29sdW1ucy5JdGVtVmlldy5JdGVtRGlkQmVnaW5EcmFnJywge1xuXHRcdFx0aXRlbTogXHR0aGlzLFxuXHRcdFx0ZXZlbnQ6IFx0ZXZlbnQsXG5cdFx0XHR1aTogXHR1aVxuXHRcdH0gKVxuXG5cdH0sIHRoaXMpICk7XG5cblx0dGhpcy4kaXRlbS5vbiggJ2RyYWdzdG9wJywgJC5wcm94eShmdW5jdGlvbiggZXZlbnQsIHVpICkge1x0XHRcblxuXHRcdC8vIE1ha2UgYWN0aXZlIGFnYWluXG5cdFx0JCggZXZlbnQudGFyZ2V0ICkucmVtb3ZlQ2xhc3MoIERSQUdHSU5HX0NMQVNTICk7XG5cblx0XHQvLyBBbGVydCBhbnkgbGlzdGVuZXJzIHRoYXQgdGhlIGl0ZW0gaGFzIHN0YXJ0ZWQgZHJhZ1xuXHRcdC8vIHZhciBldmVudCA9IG5ldyBDdXN0b21FdmVudCggJ0NvbHVtbnMuSXRlbVZpZXcuSXRlbURpZEJFbmREcmFnJywge1xuXHRcdC8vIFx0aXRlbTogXHR0aGlzLFxuXHRcdC8vIFx0ZXZlbnQ6IFx0ZXZlbnQsXG5cdFx0Ly8gXHR1aTogXHR1aVxuXHRcdC8vIH0pO1xuXHRcdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0XHQvLyBjb2x1bW5zRXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLkl0ZW1WaWV3Lkl0ZW1EaWRFbmREcmFnJywgZmFsc2UsIGZhbHNlLCB7XG5cdFx0Ly8gXHRpdGVtOiBcdHRoaXMsXG5cdFx0Ly8gXHRldmVudDogXHRldmVudCxcblx0XHQvLyBcdHVpOiBcdHVpXG5cdFx0Ly8gfSk7XG5cdFx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjb2x1bW5zRXZlbnQpO1xuXHRcdENvbHVtbnNFdmVudC5zZW5kKCAnQ29sdW1ucy5JdGVtVmlldy5JdGVtRGlkRW5kRHJhZycsIHtcblx0XHRcdGl0ZW06IFx0dGhpcyxcblx0XHRcdGV2ZW50OiBcdGV2ZW50LFxuXHRcdFx0dWk6IFx0dWlcblx0XHR9IClcblxuXHR9LCB0aGlzKSApO1xuXG5cdHRoaXMuJGl0ZW0ub24oICdkcmFnJywgJC5wcm94eShmdW5jdGlvbiggZXZlbnQsIHVpICkge1xuXG5cdFx0Ly8gQWxlcnQgYW55IGxpc3RlbmVycyB0aGF0IHRoZSBpdGVtIGhhcyBzdGFydGVkIGRyYWdcblx0XHQvLyB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoICdDb2x1bW5zLkl0ZW1WaWV3Lkl0ZW1EaWREcmFnJywge1xuXHRcdC8vIFx0aXRlbTogXHR0aGlzLFxuXHRcdC8vIFx0ZXZlbnQ6IFx0ZXZlbnQsXG5cdFx0Ly8gXHR1aTogXHR1aVxuXHRcdC8vIH0pO1xuXHRcdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0XHQvLyBjb2x1bW5zRXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLkl0ZW1WaWV3Lkl0ZW1EaWREcmFnJywgZmFsc2UsIGZhbHNlLCB7XG5cdFx0Ly8gXHRpdGVtOiBcdHRoaXMsXG5cdFx0Ly8gXHRldmVudDogXHRldmVudCxcblx0XHQvLyBcdHVpOiBcdHVpXG5cdFx0Ly8gfSk7XG5cdFx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjb2x1bW5zRXZlbnQpO1xuXHRcdENvbHVtbnNFdmVudC5zZW5kKCAnQ29sdW1ucy5JdGVtVmlldy5JdGVtRGlkRHJhZycsIHtcblx0XHRcdGl0ZW06IFx0dGhpcyxcblx0XHRcdGV2ZW50OiBcdGV2ZW50LFxuXHRcdFx0dWk6IFx0dWlcblx0XHR9IClcblxuXHR9LCB0aGlzKSApO1xuXG5cdHRoaXMuJGl0ZW0ub24oICdjbGljaycsICQucHJveHkoZnVuY3Rpb24oIGV2ZW50ICkgeztcblxuXHRcdHRoaXMuX3NldFNlbGVjdGVkKCB0cnVlICk7XG5cblx0XHRDb2x1bW5zRXZlbnQuc2VuZCggJ0NvbHVtbnMuSXRlbVZpZXcuSXRlbURpZFNlbGVjdCcsIHtcblx0XHRcdGl0ZW1WaWV3OiBcdHRoaXMsXG5cdFx0XHRpdGVtOiBcdFx0dGhpcy5pdGVtXG5cdFx0fSApO1xuXG5cdH0sIHRoaXMgKSApO1xufTtcblxuSXRlbVZpZXcucHJvdG90eXBlLl9zZXRTZWxlY3RlZCA9IGZ1bmN0aW9uKCBzZWxlY3RlZCApIHtcblxuXHRpZiAoIHNlbGVjdGVkID09PSB0cnVlICkge1xuXHRcdHRoaXMuc2VsZWN0ZWQgPSB0cnVlO1xuXHRcdHRoaXMuJGl0ZW0uYWRkQ2xhc3MoIFNFTEVDVEVEX0NMQVNTICk7XG5cdH0gZWxzZSBpZiAoIHNlbGVjdGVkID09PSBmYWxzZSApIHtcblx0XHR0aGlzLnNlbGVjdGVkID0gZmFsc2U7XG5cdFx0dGhpcy4kaXRlbS5yZW1vdmVDbGFzcyggU0VMRUNURURfQ0xBU1MgKTtcblx0fVxufTtcblxuSXRlbVZpZXcucHJvdG90eXBlLl9zZXR1cEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gTGlzdGVuIHRvIHZhbHVlIHNlbGVjdGlvbiBldmVudHNcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5UZW1wbGF0ZVZhbHVlVmlldy5WYWx1ZURpZFNlbGVjdFdpdGhJdGVtJywgdGhpcy5fb25WYWx1ZVZpZXdTZWxlY3Rpb24uYmluZCggdGhpcyApKTtcblxuXHQvLyBMaXN0ZW4gdG8gaXRlbSB2aWV3IHNlbGVjdGlvbiBldmVudHNcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5JdGVtVmlldy5JdGVtRGlkU2VsZWN0JywgdGhpcy5fb25JdGVtU2VsZWN0aW9uLmJpbmQoIHRoaXMgKSk7XHRcbn07XG5cbkl0ZW1WaWV3LnByb3RvdHlwZS5fb25WYWx1ZVZpZXdTZWxlY3Rpb24gPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdHZhciBpdGVtID0gZGF0YS5pdGVtO1xuXG5cdGlmICggdGhpcy5pdGVtLmlzKCBpdGVtICkgKSB7XG5cdFx0dGhpcy5fc2V0U2VsZWN0ZWQoIHRydWUgKTtcblx0fSBlbHNlIHtcblx0XHR0aGlzLl9zZXRTZWxlY3RlZCggZmFsc2UgKTtcblx0fVxufTtcblxuSXRlbVZpZXcucHJvdG90eXBlLl9vbkl0ZW1TZWxlY3Rpb24gPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdHZhciBpdGVtID0gZGF0YS5pdGVtO1xuXG5cdGlmICggIXRoaXMuaXRlbS5pcyggaXRlbSApICkge1xuXHRcdHRoaXMuX3NldFNlbGVjdGVkKCBmYWxzZSApO1xuXHR9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEl0ZW1WaWV3OyIsInZhciBDb2x1bW5zRXZlbnQgXHQ9IHJlcXVpcmUoJy4uL21vZGVscy9Db2x1bW5zRXZlbnQuanMnKTtcbnZhciBJdGVtVmlldyBcdFx0PSByZXF1aXJlKCcuL0l0ZW1WaWV3LmpzJyk7XG5cbi8vIE1hbmFnZSB0aGUgZGlzcGxheSBvZiBhIGxpc3Qgb2YgaXRlbXNcbkl0ZW1zVmlldyA9IGZ1bmN0aW9uKCBpdGVtcyApIHtcblxuXHR0aGlzLml0ZW1zIFx0XHQ9IGl0ZW1zIHx8IFtdO1xuXHR0aGlzLnZpZXdzIFx0XHQ9IFtdO1xuXHR0aGlzLnRlbXBsYXRlIFx0PSBDb2x1bW5zLlRlbXBsYXRlc1sndGVtcGxhdGVzL2xheW91dC9jb2x1bW5zLmhicyddO1xuXHR0aGlzLiRpdGVtcztcblxuXHR0aGlzLnJlbmRlciggaXRlbXMgKTtcblx0dGhpcy5fc2V0dXBFdmVudExpc3RlbmVycygpO1xufTtcblxuSXRlbXNWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbigpIHtcblx0dmFyIGl0ZW1WaWV3LFxuXHRcdCRjb2x1bW5zID0gJCggdGhpcy50ZW1wbGF0ZSgpICk7XG5cblx0Ly8gUmVtb3ZlIGFueSBleGlzdGluZyBjb2x1bW5zXG5cdCQoJy5sYXlvdXQtY29sdW1ucycpLnJlbW92ZSgpO1xuXG5cdGlmICggdGhpcy5pdGVtcyApIHtcblx0XHR0aGlzLml0ZW1zLmZvckVhY2goZnVuY3Rpb24oIGl0ZW0sIGkgKSB7XG5cblx0XHRcdGl0ZW1WaWV3ID0gdGhpcy5pdGVtVmlld0Zvckl0ZW0oIGl0ZW0gKTtcblx0XHRcdFxuXHRcdFx0aWYgKCAhaXRlbVZpZXcgKSB7XG5cdFx0XHRcdGl0ZW1WaWV3ID0gbmV3IEl0ZW1WaWV3KCBpdGVtICk7XG5cdFx0XHRcdHRoaXMudmlld3MucHVzaCggaXRlbVZpZXcgKTtcblx0XHRcdH1cblxuXHRcdFx0JGNvbHVtbnMuYXBwZW5kKCBpdGVtVmlldy5yZW5kZXIoKSApO1xuXG5cdFx0fS5iaW5kKCB0aGlzICkpO1xuXHR9XG5cblx0JChcIiNjb2x1bW5zXCIpLmFwcGVuZCggJGNvbHVtbnMgKTtcblxuXHQvLyB0aGlzLnNldHVwRHJhZ0xpc3RlbmVycygkKHRoaXMuTEFZT1VUX0NPTFVNTl9TRUxFQ1RPUikpO1xuXHQvLyB0aGlzLnNldHVwRHJvcExpc3RlbmVycygpO1xuXG5cdHRoaXMuJGl0ZW1zID0gJGNvbHVtbnM7XG5cdHJldHVybiB0aGlzLiRpdGVtcztcbn07XG5cbkl0ZW1zVmlldy5wcm90b3R5cGUuaXRlbVZpZXdGb3JJdGVtID0gZnVuY3Rpb24oIGl0ZW0gKSB7XG5cdHZhciBpdGVtVmlldztcblxuXHRpZiAoIGl0ZW0gaW5zdGFuY2VvZiBJdGVtICYmIHRoaXMudmlld3MubGVuZ3RoICkge1xuXHRcdGl0ZW1WaWV3ID0gdGhpcy52aWV3cy5maWx0ZXIoZnVuY3Rpb24oIHZpZXcsIGkgKSB7XG5cdFx0XHRyZXR1cm4gdmlldy5pdGVtLnRpdGxlID09PSBpdGVtLnRpdGxlO1xuXHRcdH0uYmluZCggdGhpcyApIClbIDAgXTtcblx0fVxuXG5cdHJldHVybiBpdGVtVmlldztcbn07XG5cbkl0ZW1zVmlldy5wcm90b3R5cGUudXBkYXRlSXRlbSA9IGZ1bmN0aW9uKCBpdGVtICkge1xuXG5cdC8vIFJlLXJlbmRlciB0aGUgaXRlbVxuXHR0aGlzLml0ZW1zLmZvckVhY2goZnVuY3Rpb24oIG9sZEl0ZW0sIGkgKSB7XG5cblx0XHRpZiAoIG9sZEl0ZW0uaXMoIGl0ZW0gKSApIHtcblx0XHRcdHZhciBpdGVtVmlldyA9IHRoaXMuaXRlbVZpZXdGb3JJdGVtKCBpdGVtICk7XG5cdFx0XHR0aGlzLiRpdGVtcy5maW5kKCcubGF5b3V0LWNvbHVtbicpLmVxKCBpICkucmVwbGFjZVdpdGgoIGl0ZW1WaWV3LnJlbmRlcigpICk7XG5cdFx0fVxuXG5cdH0uYmluZCggdGhpcyApICk7XG5cblx0dGhpcy5fZW1pdENoYW5nZSgpO1xufTtcblxuSXRlbXNWaWV3LnByb3RvdHlwZS5fZW1pdENoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXHQvLyBMZXQgZXZlcnlvbmUga25vdyB0aGF0IHRoZSBpdGVtcyB2aWV3IGhhcyBjaGFuZ2VkXG5cdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0Ly8gY29sdW1uc0V2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5JdGVtc1ZpZXcuRGlkQ2hhbmdlJywgZmFsc2UsIGZhbHNlLCB7XG5cdC8vIFx0aXRlbXNWaWV3OiBcdHRoaXNcblx0Ly8gfSk7XG5cdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY29sdW1uc0V2ZW50KTtcblx0Q29sdW1uc0V2ZW50LnNlbmQoICdDb2x1bW5zLkl0ZW1zVmlldy5EaWRDaGFuZ2UnLCB7XG5cdFx0aXRlbXNWaWV3OiBcdHRoaXNcblx0fSk7XG5cbn07XG5cbkl0ZW1zVmlldy5wcm90b3R5cGUuX3NldHVwRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBMaXN0ZW4gZm9yIHRhYmxlIHVwZGF0ZXNcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5UYWJsZS5EaWRDaGFuZ2UnLCB0aGlzLl9vblRhYmxlQ2hhbmdlLmJpbmQoIHRoaXMgKSApO1xuXG5cdC8vIExpc3RlbiBmb3IgaXRlbSB1cGRhdGVzXG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuSXRlbS5EaWRDaGFuZ2UnLCB0aGlzLl9vbkl0ZW1DaGFuZ2UuYmluZCggdGhpcyApICk7XG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuSXRlbS5BY3RpdmVTdGF0ZURpZENoYW5nZScsIHRoaXMuX29uSXRlbUNoYW5nZS5iaW5kKCB0aGlzICkgKTtcbn07XG5cbkl0ZW1zVmlldy5wcm90b3R5cGUuX29uVGFibGVDaGFuZ2UgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cblx0dGhpcy5fdXBkYXRlV2l0aEl0ZW1zKCBkYXRhLnRhYmxlLmNvbHVtbnMgKTtcblx0dGhpcy5yZW5kZXIoKTtcbn07XG5cbkl0ZW1zVmlldy5wcm90b3R5cGUuX29uSXRlbUNoYW5nZSA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblx0dGhpcy51cGRhdGVJdGVtKCBkYXRhLml0ZW0gKTtcbn07XG5cbkl0ZW1zVmlldy5wcm90b3R5cGUuX3VwZGF0ZVdpdGhJdGVtcyA9IGZ1bmN0aW9uKCBpdGVtcyApIHtcblxuXHRpZiggaXRlbXMgKSB7XG5cblx0XHRpZiAoIEFycmF5LmlzQXJyYXkoIGl0ZW1zICkgKSB7XG5cblx0XHRcdGl0ZW1zLmZvckVhY2goZnVuY3Rpb24oIGl0ZW0gKSB7XG5cdFx0XHRcdHRoaXMuX3VwZGF0ZVdpdGhJdGVtKCBpdGVtICk7XG5cdFx0XHR9LmJpbmQoIHRoaXMgKSk7XG5cblx0XHRcdHRoaXMuX2VtaXRDaGFuZ2UoKTtcblxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aHJvdyBcImV4Y2VwdGlvbiBJdGVtcyBtdXN0IGJlIGFycmF5IG9mIGl0ZW1zIG9yIHNpbmdsZSBpdGVtXCI7XG5cdFx0fVxuXHR9XG59O1xuXG5JdGVtc1ZpZXcucHJvdG90eXBlLl91cGRhdGVXaXRoSXRlbSA9IGZ1bmN0aW9uKCBpdGVtICkge1xuXHR2YXIgZHVwbGljYXRlcyA9IFtdO1xuXG5cdGlmICggaXRlbSAmJiBpdGVtIGluc3RhbmNlb2YgSXRlbSApIHtcblx0XHRkdXBsaWNhdGVzID0gdGhpcy5pdGVtcy5maWx0ZXIoZnVuY3Rpb24oIGV4aXN0aW5nSXRlbSApIHtcblx0XHRcdHJldHVybiBleGlzdGluZ0l0ZW0uaXMoIGl0ZW0gKTtcblx0XHR9KTtcblxuXHRcdGlmICggIWR1cGxpY2F0ZXMubGVuZ3RoICkge1xuXHRcdFx0dGhpcy5pdGVtcy5wdXNoKCBpdGVtICk7XG5cdFx0fVxuXHR9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEl0ZW1zVmlldzsiLCJ2YXIgQ29sdW1uc0V2ZW50IFx0XHRcdFx0XHRcdFx0PSByZXF1aXJlKCcuLi9tb2RlbHMvQ29sdW1uc0V2ZW50LmpzJyk7XG52YXIgU3R5bGVJbnB1dFZpZXcgXHRcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoJy4vU3R5bGVJbnB1dFZpZXcuanMnKTtcbnZhciBTdHlsZVNlZ21lbnRlZEJ1dHRvblZpZXcgXHRcdFx0XHQ9IHJlcXVpcmUoJy4vU3R5bGVTZWdtZW50ZWRCdXR0b25WaWV3LmpzJyk7XG52YXIgU3R5bGVNdWx0aXBsZVNlZ21lbnRlZEJ1dHRvblZpZXcgXHRcdD0gcmVxdWlyZSgnLi9TdHlsZU11bHRpcGxlU2VnbWVudGVkQnV0dG9uVmlldy5qcycpO1xuXG52YXIgQ09NUE9ORU5UX1RFTVBMQVRFIFx0PSBDb2x1bW5zLlRlbXBsYXRlc1sndGVtcGxhdGVzL3N0eWxpbmcvY29tcG9uZW50LmhicyddLFxuXHRTRUNUSU9OX1RFTVBMQVRFXHQ9IENvbHVtbnMuVGVtcGxhdGVzWyd0ZW1wbGF0ZXMvc3R5bGluZy9jb21wb25lbnQtc2VjdGlvbi5oYnMnXSxcblx0Uk9XX1RFTVBMQVRFXHRcdD0gQ29sdW1ucy5UZW1wbGF0ZXNbJ3RlbXBsYXRlcy9zdHlsaW5nL2NvbXBvbmVudC1zZWN0aW9uLXJvdy5oYnMnXTtcblxuZnVuY3Rpb24gU3R5bGVDb21wb25lbnRWaWV3KCBzZWxlY3Rpb24gKSB7XG5cblx0dGhpcy5pdGVtID0gc2VsZWN0aW9uO1xuXHQvLyB0aGlzLml0ZW0gPSBzZWxlY3Rpb24gPyB0aGlzLmdldEl0ZW1Gb3JTZWxlY3Rpb24oIHNlbGVjdGlvbiApIDogdW5kZWZpbmVkO1xuXHQvLyB0aGlzLnRlbXBsYXRlR3JvdXBzID0gdGhpcy5pdGVtID8gVGVtcGxhdGVWaWV3LmdldEdyb3Vwc0Zvckl0ZW0oIHRoaXMuaXRlbSApIDogW107XG59XG5cbi8vIFN0eWxlQ29tcG9uZW50Vmlldy5wcm90b3R5cGUuZ2V0SXRlbUZvclNlbGVjdGlvbiA9IGZ1bmN0aW9uKCBzZWxlY3Rpb24gKSB7XG5cbi8vIFx0aWYoIHNlbGVjdGlvbiBpbnN0YW5jZW9mIEl0ZW0gKSB7XG4vLyBcdFx0cmV0dXJuIHNlbGVjdGlvbjtcbi8vIFx0fSBlbHNlIGlmICggc2VsZWN0aW9uIGluc3RhbmNlb2YgSXRlbVZpZXcgKSB7XG4vLyBcdFx0cmV0dXJuIHNlbGVjdGlvbi5pdGVtO1xuLy8gXHR9IGVsc2UgaWYgKCBzZWxlY3Rpb24gaW5zdGFuY2VvZiBUZW1wbGF0ZVZhbHVlVmlldyApIHtcbi8vIFx0XHRyZXR1cm4gc2VsZWN0aW9uLml0ZW07XG4vLyBcdH0gZWxzZSBpZiAoIHNlbGVjdGlvbiBpbnN0YW5jZW9mIFRlbXBsYXRlR3JvdXBWaWV3ICkge1xuLy8gXHRcdHJldHVybiBzZWxlY3Rpb247XG4vLyBcdH0gZWxzZSB7XG4vLyBcdFx0dGhyb3cgXCJleGNlcHRpb246IFNlbGVjdGlvbiBtdXN0IGJlIGFuIEl0ZW0sIEl0ZW1WaWV3LCBUZW1wbGF0ZVZhbHVlVmlldyBvciBUZW1wbGF0ZUdyb3VwVmlld1wiO1xuLy8gXHR9XG4vLyB9O1xuXG4vLyBTdHlsZUNvbXBvbmVudFZpZXcucHJvdG90eXBlLmdldFRlbXBsYXRlc0Zvckl0ZW0gPSBmdW5jdGlvbiggaXRlbSApIHtcbi8vIFx0Ly8gdmFyIFxuLy8gfTtcblxuU3R5bGVDb21wb25lbnRWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBHZXQgdGhlIGFwcHJvcHJpYXRlIGRhdGEgZm9yIHRoZSBjdXJyZW50IGl0ZW1cblx0dmFyIHR5cGUgPSB0aGlzLml0ZW0gaW5zdGFuY2VvZiBUZW1wbGF0ZUdyb3VwVmlldyA/ICdncm91cCcgOiAndGV4dCcsXG5cdFx0dGl0bGUgPSB0aGlzLml0ZW0gaW5zdGFuY2VvZiBUZW1wbGF0ZUdyb3VwVmlldyA/IHRoaXMuaXRlbS50aXRsZSgpIDogdGhpcy5pdGVtLmZvcm1hdHRlZFRpdGxlKCksXG5cdFx0Y29tcG9uZW50RGF0YSA9IENvbHVtbnMuc3R5bGVEYXRhLnR5cGVzW3R5cGVdLFxuXHRcdCRjb21wb25lbnQsXG5cdFx0JGNvbXBvbmVudEJvZHksXG5cdFx0JHNlY3Rpb247XG5cblx0Ly8gRmlyc3QgY3JlYXRlIHRoZSBjb21wb25lbnQgc2tlbGV0b25cblx0JGNvbXBvbmVudCA9ICQoIENPTVBPTkVOVF9URU1QTEFURSh7XG5cdFx0dHlwZTogdHlwZSxcblx0XHRuYW1lOiB0aXRsZVxuXHR9KSApO1xuXG5cdCRjb21wb25lbnRCb2R5ID0gJGNvbXBvbmVudC5maW5kKCcuc3R5bGUtY29tcG9uZW50LWJvZHknKTtcblxuXHQvLyBOZXh0LCBsb29wIHRocm91Z2ggdGhlIGRhdGFcblx0Ly8gY3JlYXRpbmcgdGhlIHNlY3Rpb25zIGZyb20gdGhlIGluc2lkZSBvdXRcblx0Y29tcG9uZW50RGF0YS5mb3JFYWNoKGZ1bmN0aW9uKCBzZWN0aW9uLCBpICkge1xuXHRcdCRzZWN0aW9uID0gdGhpcy5fcmVuZGVyU2VjdGlvbiggc2VjdGlvbiApO1xuXHRcdCRjb21wb25lbnRCb2R5LmFwcGVuZCggJHNlY3Rpb24gKTtcblx0fS5iaW5kKCB0aGlzICkgKTtcblxuXHR0aGlzLiRzdHlsZSA9ICRjb21wb25lbnQ7XG5cdHRoaXMuX3NldHVwRXZlbnRMaXN0ZW5lcnMoKTtcblxuXHRpZiAoIHRoaXMuaXRlbSBpbnN0YW5jZW9mIFRlbXBsYXRlR3JvdXBWaWV3ICkge1xuXHRcdHRoaXMudXBkYXRlQWxpZ25tZW50QnV0dG9ucyggdGhpcy5pdGVtLmdldFN0eWxlKCdmbGV4LWRpcmVjdGlvbicpICk7XG5cdH1cblxuXHRyZXR1cm4gdGhpcy4kc3R5bGU7XG59O1xuXG5TdHlsZUNvbXBvbmVudFZpZXcucHJvdG90eXBlLl9yZW5kZXJTZWN0aW9uID0gZnVuY3Rpb24oIHNlY3Rpb24gKSB7XG5cdHZhciAkc2VjdGlvbixcblx0XHQkc2VjdGlvblJvd3MsXG5cdFx0JHJvdztcblxuXHQkc2VjdGlvbiA9ICQoIFNFQ1RJT05fVEVNUExBVEUoe1xuXHRcdHRpdGxlOiBzZWN0aW9uLnRpdGxlXG5cdH0pICk7XG5cblx0JHNlY3Rpb25Sb3dzID0gJHNlY3Rpb24uZmluZCgnLnN0eWxlLWNvbXBvbmVudC1zZWN0aW9uLXJvd3MnKTtcblxuXHQvLyBMb29wIHRocm91Z2ggZWFjaCBzZWN0aW9uLFxuXHQvLyBjcmVhdGluZyByb3dzIGZyb20gdGhlIGluc2lkZSBvdXRcblx0c2VjdGlvbi5yb3dzLmZvckVhY2goZnVuY3Rpb24oIHJvdywgaSkge1xuXHRcdCRyb3cgPSB0aGlzLl9yZW5kZXJSb3coIHJvdyApO1xuXHRcdCRzZWN0aW9uUm93cy5hcHBlbmQoICRyb3cgKTtcblx0fS5iaW5kKCB0aGlzICkgKTtcblxuXHRyZXR1cm4gJHNlY3Rpb247XG59O1xuXG5TdHlsZUNvbXBvbmVudFZpZXcucHJvdG90eXBlLl9yZW5kZXJSb3cgPSBmdW5jdGlvbiggcm93ICkge1xuXHR2YXIgJHJvdyxcblx0XHQkaXRlbTtcblxuXHQkcm93ID0gJCggUk9XX1RFTVBMQVRFKCkgKTtcblxuXHQvLyBMb29wIHRocm91Z2ggZWFjaCBpdGVtLFxuXHQvLyByZW5kZXJpbmcgaXQgcHJvcGVybHkgZGVwZW5kaW5nIG9uIGl0cyB0eXBlXG5cdHJvdy5pdGVtcy5mb3JFYWNoKGZ1bmN0aW9uKCBpdGVtLCBpICkge1xuXHRcdCRpdGVtID0gdGhpcy5fcmVuZGVySXRlbSggaXRlbSApO1xuXHRcdCRyb3cuYXBwZW5kKCAkaXRlbSApO1xuXHR9LmJpbmQoIHRoaXMgKSApO1xuXG5cdHJldHVybiAkcm93O1xuXG59O1xuXG5TdHlsZUNvbXBvbmVudFZpZXcucHJvdG90eXBlLl9yZW5kZXJJdGVtID0gZnVuY3Rpb24oIGl0ZW0gKSB7XG5cdHZhciBpdGVtO1xuXG5cdGlmICggaXRlbS5raW5kID09PSAnaW5wdXQnICkge1xuXG5cdFx0aXRlbSA9IG5ldyBTdHlsZUlucHV0Vmlldyh7XG5cdFx0XHRpdGVtOiB0aGlzLml0ZW0sXG5cdFx0XHR1bml0OiBpdGVtLnVuaXQsXG5cdFx0XHR0eXBlOiBpdGVtLnR5cGUsXG5cdFx0XHRjYW5CZU5lZ2F0aXZlOiBpdGVtLmNhbkJlTmVnYXRpdmUsXG5cdFx0XHRhcHBlbmRDb250cm9sczogaXRlbS5hcHBlbmRDb250cm9scyxcblx0XHRcdHByZXBlbmRJY29uOiBpdGVtLnByZXBlbmRJY29uLFxuXHRcdFx0bGFiZWw6IGl0ZW0ubGFiZWwsXG5cdFx0XHRwcm9wZXJ0eTogaXRlbS5wcm9wZXJ0eSxcblx0XHRcdHZhbHVlOiB0aGlzLml0ZW0uZ2V0U3R5bGUoIGl0ZW0ucHJvcGVydHkgKSB8fCBpdGVtLmRlZmF1bHRcblx0XHR9KTtcblx0XHRyZXR1cm4gaXRlbS5yZW5kZXIoKTtcblxuXHR9IGVsc2UgaWYgKCBpdGVtLmtpbmQgPT09ICdzZWdtZW50ZWQtYnV0dG9uJyApIHtcblxuXHRcdGl0ZW0gPSBuZXcgU3R5bGVTZWdtZW50ZWRCdXR0b25WaWV3KHtcblx0XHRcdGl0ZW06IHRoaXMuaXRlbSxcblx0XHRcdGxhYmVsOiBpdGVtLmxhYmVsLFxuXHRcdFx0cHJvcGVydHk6IGl0ZW0ucHJvcGVydHkubmFtZSxcblx0XHRcdGJ1dHRvbnM6IGl0ZW0uYnV0dG9ucyxcblx0XHRcdHZhbHVlOiB0aGlzLml0ZW0uZ2V0U3R5bGUoIGl0ZW0ucHJvcGVydHkubmFtZSApIHx8IGl0ZW0ucHJvcGVydHkuZGVmYXVsdFxuXHRcdH0pO1xuXHRcdHJldHVybiBpdGVtLnJlbmRlcigpO1xuXG5cdH0gZWxzZSBpZiAoIGl0ZW0ua2luZCA9PT0gJ211bHRpcGxlLXNlZ21lbnRlZC1idXR0b24nICkge1xuXG5cdFx0aXRlbSA9IG5ldyBTdHlsZU11bHRpcGxlU2VnbWVudGVkQnV0dG9uVmlldyh7XG5cdFx0XHRpdGVtOiB0aGlzLml0ZW0sXG5cdFx0XHRsYWJlbDogaXRlbS5sYWJlbCxcblx0XHRcdGJ1dHRvbnM6IGl0ZW0uYnV0dG9ucy5tYXAoZnVuY3Rpb24oIGJ1dHRvbiwgaSApIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRpY29uOiBidXR0b24uaWNvbixcblx0XHRcdFx0XHRwcm9wZXJ0eTogYnV0dG9uLnByb3BlcnR5Lm5hbWUsXG5cdFx0XHRcdFx0dmFsdWVzOiB7XG5cdFx0XHRcdFx0XHRhY3RpdmU6IGJ1dHRvbi52YWx1ZXMuYWN0aXZlLFxuXHRcdFx0XHRcdFx0aW5hY3RpdmU6IGJ1dHRvbi52YWx1ZXMuaW5hY3RpdmUsXG5cdFx0XHRcdFx0XHRjdXJyZW50OiB0aGlzLml0ZW0uZ2V0U3R5bGUoIGJ1dHRvbi5wcm9wZXJ0eS5uYW1lICkgfHwgYnV0dG9uLnZhbHVlcy5kZWZhdWx0XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXHRcdFx0fS5iaW5kKCB0aGlzICkpXG5cdFx0fSk7XG5cdFx0cmV0dXJuIGl0ZW0ucmVuZGVyKCk7XG5cblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHR9XG59O1xuXG5TdHlsZUNvbXBvbmVudFZpZXcucHJvdG90eXBlLl9zZXR1cEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gTGlzdGVuIGZvciBpbnB1dCB1cGRhdGVzXG5cdC8vIGlmIHRoaXMgaXMgZm9yIGEgZ3JvdXBcblx0aWYgKCB0aGlzLml0ZW0gaW5zdGFuY2VvZiBUZW1wbGF0ZUdyb3VwVmlldyApIHtcblx0XHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLlN0eWxlU2VnbWVudGVkQnV0dG9uVmlldy5WYWx1ZURpZFVwZGF0ZUZvclByb3BlcnR5QW5kSXRlbScsIHRoaXMuX29uU3R5bGVVcGRhdGUuYmluZCggdGhpcyApKTtcblx0fVxufTtcblxuU3R5bGVDb21wb25lbnRWaWV3LnByb3RvdHlwZS5fb25TdHlsZVVwZGF0ZSA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblxuXHQvLyBJZiB0aGlzIGlzIGEgY2hhbmdlIGZvciB0aGUgZmxleC1kaXJlY3Rpb24gcHJvcGVydHksXG5cdC8vIHVwZGF0ZSB0aGUgY2xhc3NlcyBvbiB0aGUgYWxpZ25tZW50IGJ1dHRvbnNcblx0aWYgKCBkYXRhLml0ZW0gPT09IHRoaXMuaXRlbSAmJiBkYXRhLnByb3BlcnR5ID09PSAnZmxleC1kaXJlY3Rpb24nICkge1xuXHRcdHRoaXMudXBkYXRlQWxpZ25tZW50QnV0dG9ucyggZGF0YS52YWx1ZSApO1xuXHR9XG59O1xuXG5TdHlsZUNvbXBvbmVudFZpZXcucHJvdG90eXBlLnVwZGF0ZUFsaWdubWVudEJ1dHRvbnMgPSBmdW5jdGlvbiggZGlyZWN0aW9uICkge1xuXHR2YXIgJGJ1dHRvbnMgPSB0aGlzLiRzdHlsZS5maW5kKCdbZGF0YS1wcm9wZXJ0eT1cImFsaWduLWl0ZW1zXCJdJyk7XG5cblx0aWYgKCBkaXJlY3Rpb24gPT09ICdjb2x1bW4nICkge1xuXHRcdCRidXR0b25zLmFkZENsYXNzKCdjb2x1bW4nKTtcblx0XHQkYnV0dG9ucy5yZW1vdmVDbGFzcygncm93Jyk7XG5cdH0gZWxzZSB7XG5cdFx0JGJ1dHRvbnMuYWRkQ2xhc3MoJ3JvdycpO1xuXHRcdCRidXR0b25zLnJlbW92ZUNsYXNzKCdjb2x1bW4nKTtcblx0fVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0eWxlQ29tcG9uZW50VmlldzsiLCJ2YXIgQ29sdW1uc0V2ZW50ID0gcmVxdWlyZSgnLi4vbW9kZWxzL0NvbHVtbnNFdmVudC5qcycpO1xuXG5mdW5jdGlvbiBTdHlsZUlucHV0Vmlldyggb3B0aW9ucyApIHtcblx0XG5cdHRoaXMudHlwZSA9ICd0ZWwnO1xuXHR0aGlzLnVuaXQgPSAnJztcblx0dGhpcy5jYW5CZU5lZ2F0aXZlID0gdHJ1ZTtcblx0dGhpcy5jYW5CZURlY2ltYWwgPSBmYWxzZTtcblx0dGhpcy5wcm9wZXJ0eSA9IHVuZGVmaW5lZDtcblx0dGhpcy52YWx1ZSA9IHVuZGVmaW5lZDtcblx0dGhpcy5wcmVwZW5kSWNvbiA9IHVuZGVmaW5lZDtcblx0dGhpcy5hcHBlbmRDb250cm9scyA9IGZhbHNlO1xuXHR0aGlzLmxhYmVsID0gJyc7XG5cdHRoaXMuaXRlbSA9IHVuZGVmaW5lZDtcblxuXHRpZiAoIG9wdGlvbnMgKSB7XG5cdFx0dGhpcy51bml0ID0gb3B0aW9ucy51bml0IHx8IHRoaXMudW5pdDtcblx0XHR0aGlzLnR5cGUgPSBvcHRpb25zLnR5cGUgfHwgdGhpcy50eXBlO1xuXHRcdHRoaXMuY2FuQmVOZWdhdGl2ZSA9IG9wdGlvbnMuY2FuQmVOZWdhdGl2ZSA9PT0gZmFsc2UgPyBmYWxzZSA6IHRoaXMuY2FuQmVOZWdhdGl2ZTtcblx0XHR0aGlzLmNhbkJlRGVjaW1hbCA9IG9wdGlvbnMuY2FuQmVEZWNpbWFsID09PSB0cnVlID8gdHJ1ZSA6IHRoaXMuY2FuQmVEZWNpbWFsO1xuXHRcdHRoaXMucHJvcGVydHkgPSBvcHRpb25zLnByb3BlcnR5IHx8IHRoaXMucHJvcGVydHk7XG5cdFx0dGhpcy52YWx1ZSA9IHRoaXMuZm9ybWF0VmFsdWUoIG9wdGlvbnMudmFsdWUgKSB8fCB0aGlzLnZhbHVlO1xuXHRcdHRoaXMucHJlcGVuZEljb24gPSBvcHRpb25zLnByZXBlbmRJY29uIHx8IHRoaXMucHJlcGVuZEljb247XG5cdFx0dGhpcy5hcHBlbmRDb250cm9scyA9IG9wdGlvbnMuYXBwZW5kQ29udHJvbHMgPT09IHRydWUgPyB0cnVlIDogdGhpcy5hcHBlbmRDb250cm9scztcblx0XHR0aGlzLmxhYmVsID0gb3B0aW9ucy5sYWJlbCB8fCB0aGlzLmxhYmVsO1xuXHRcdHRoaXMuaXRlbSA9IG9wdGlvbnMuaXRlbSB8fCB0aGlzLml0ZW07XG5cdH1cblxuXHR0aGlzLnRlbXBsYXRlID0gQ29sdW1ucy5UZW1wbGF0ZXNbJ3RlbXBsYXRlcy9zdHlsaW5nL2NvbXBvbmVudHMvaW5wdXQuaGJzJ107XG59XG5cblN0eWxlSW5wdXRWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbigpIHtcblxuXHR2YXIgdGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlKHtcblx0XHRwcmVwZW5kSWNvbjogdGhpcy5wcmVwZW5kSWNvbixcblx0XHRhcHBlbmRDb250cm9sczogdGhpcy5hcHBlbmRDb250cm9scyxcblx0XHR0eXBlOiB0aGlzLnR5cGUsXG5cdFx0cHJvcGVydHk6IHRoaXMucHJvcGVydHksXG5cdFx0dmFsdWU6IHRoaXMudmFsdWUsXG5cdFx0Y2FuQmVOZWdhdGl2ZTogdGhpcy5jYW5CZU5lZ2F0aXZlLFxuXHRcdGxhYmVsOiB0aGlzLmxhYmVsXG5cdH0pO1xuXG5cdHRoaXMuJHRlbXBsYXRlID0gJCggdGVtcGxhdGUgKTtcblxuXHQvLyBpZiAoIHRoaXMuYXBwZW5kQ29udHJvbHMgKSB7XG5cdFx0dGhpcy5fc2V0dXBDb250cm9scygpO1xuXHQvLyB9XG5cblx0cmV0dXJuIHRoaXMuJHRlbXBsYXRlO1xufVxuXG5TdHlsZUlucHV0Vmlldy5wcm90b3R5cGUuX3NldHVwQ29udHJvbHMgPSBmdW5jdGlvbigpIHtcblxuXHRpZiAoIHRoaXMudHlwZSA9PT0gJ2NvbG9yJyApIHtcblx0XHR0aGlzLiR0ZW1wbGF0ZS5maW5kKCdpbnB1dCcpLm9uKCAnaW5wdXQnLCB0aGlzLl9vbkNoYW5nZS5iaW5kKCB0aGlzICkgKTtcblx0fVxuXG5cdHRoaXMuJHRlbXBsYXRlLmZpbmQoJ2lucHV0Jykub24oICdrZXl1cCcsIHRoaXMuX29uQ2hhbmdlLmJpbmQoIHRoaXMgKSApO1xuXHR0aGlzLiR0ZW1wbGF0ZS5maW5kKCdpbnB1dCcpLm9uKCAnY2hhbmdlJywgdGhpcy5fb25DaGFuZ2UuYmluZCggdGhpcyApICk7XG5cdHRoaXMuJHRlbXBsYXRlLmZpbmQoJy5pbmNyZW1lbnQnKS5vbiggJ2NsaWNrJywgdGhpcy5fb25JbmNyZW1lbnQuYmluZCggdGhpcyApICk7XG5cdHRoaXMuJHRlbXBsYXRlLmZpbmQoJy5kZWNyZW1lbnQnKS5vbiggJ2NsaWNrJywgdGhpcy5fb25EZWNyZW1lbnQuYmluZCggdGhpcyApICk7XHRcbn1cblxuU3R5bGVJbnB1dFZpZXcucHJvdG90eXBlLl9vbkNoYW5nZSA9IGZ1bmN0aW9uKCBldmVudCApIHtcblx0dmFyIG5ld1ZhbHVlID0gdGhpcy5mb3JtYXRWYWx1ZSggdGhpcy4kdGVtcGxhdGUuZmluZCgnaW5wdXQnKS52YWwoKSApXG5cdHRoaXMudXBkYXRlKCBuZXdWYWx1ZSApO1xufVxuXG5TdHlsZUlucHV0Vmlldy5wcm90b3R5cGUuX29uSW5jcmVtZW50ID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuXHR2YXIgbmV3VmFsdWUgPSB0aGlzLmluY3JlbWVudCggdGhpcy4kdGVtcGxhdGUuZmluZCgnaW5wdXQnKS52YWwoKSApO1xuXHR0aGlzLnVwZGF0ZSggbmV3VmFsdWUgKTtcbn1cblxuU3R5bGVJbnB1dFZpZXcucHJvdG90eXBlLl9vbkRlY3JlbWVudCA9IGZ1bmN0aW9uKCBldmVudCApIHtcblx0dmFyIG5ld1ZhbHVlID0gdGhpcy5kZWNyZW1lbnQoIHRoaXMuJHRlbXBsYXRlLmZpbmQoJ2lucHV0JykudmFsKCkgKTtcblx0dGhpcy51cGRhdGUoIG5ld1ZhbHVlICk7XG59XG5cblN0eWxlSW5wdXRWaWV3LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdHRoaXMudmFsdWUgPSB2YWx1ZTtcblx0dGhpcy4kdGVtcGxhdGUuZmluZCgnaW5wdXQnKS52YWwoIHZhbHVlICk7XG5cblx0Ly8gQWxlcnQgYW55IGxpc3RlbmVycyB0aGF0IHRoZSBpdGVtIGhhcyBzdGFydGVkIGRyYWdcblx0Ly8gdmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCAnQ29sdW1ucy5TdHlsZUlucHV0Vmlldy5WYWx1ZURpZFVwZGF0ZUZvclByb3BlcnR5Jywge1xuXHQvLyBcdGl0ZW06IFx0dGhpcyxcblx0Ly8gXHRldmVudDogXHRldmVudCxcblx0Ly8gXHR1aTogXHR1aVxuXHQvLyB9KTtcblx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHQvLyBjb2x1bW5zRXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLlN0eWxlSW5wdXRWaWV3LlZhbHVlRGlkVXBkYXRlRm9yUHJvcGVydHlBbmRJdGVtJywgZmFsc2UsIGZhbHNlLCB7XG5cdC8vIFx0aXRlbTogdGhpcy5pdGVtLFxuXHQvLyBcdHByb3BlcnR5OiB0aGlzLnByb3BlcnR5LFxuXHQvLyBcdHZhbHVlOiBcdHZhbHVlXG5cdC8vIH0pO1xuXHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGNvbHVtbnNFdmVudCk7XG5cdENvbHVtbnNFdmVudC5zZW5kKCAnQ29sdW1ucy5TdHlsZUlucHV0Vmlldy5WYWx1ZURpZFVwZGF0ZUZvclByb3BlcnR5QW5kSXRlbScsIHtcblx0XHRpdGVtOiB0aGlzLml0ZW0sXG5cdFx0cHJvcGVydHk6IHRoaXMucHJvcGVydHksXG5cdFx0dmFsdWU6IFx0dmFsdWVcblx0fSApXG59XG5cblN0eWxlSW5wdXRWaWV3LnByb3RvdHlwZS5pbmNyZW1lbnQgPSBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdHZhciBwYXJzZWRWYWx1ZSA9IHRoaXMucGFyc2VWYWx1ZSggdmFsdWUgKSxcblx0XHRudW1iZXIgPSArcGFyc2VkVmFsdWUubnVtYmVyLFxuXHRcdHVuaXQgPSBwYXJzZWRWYWx1ZS51bml0LFxuXHRcdG5ld051bWJlcjtcblxuXHRuZXdOdW1iZXIgPSArcGFyc2VkVmFsdWUubnVtYmVyICsgMTtcblxuXHQvLyBGb3JtYXQgYW5kIHJldHVybiB0aGUgbmV3IHZhbHVlXG5cdHJldHVybiB0aGlzLmZvcm1hdFZhbHVlKCBuZXdOdW1iZXIgKyB1bml0ICk7XG59XG5cblN0eWxlSW5wdXRWaWV3LnByb3RvdHlwZS5kZWNyZW1lbnQgPSBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdHZhciBwYXJzZWRWYWx1ZSA9IHRoaXMucGFyc2VWYWx1ZSggdmFsdWUgKSxcblx0XHRudW1iZXIgPSArcGFyc2VkVmFsdWUubnVtYmVyLFxuXHRcdHVuaXQgPSBwYXJzZWRWYWx1ZS51bml0LFxuXHRcdG5ld051bWJlcjtcblxuXHRuZXdOdW1iZXIgPSArcGFyc2VkVmFsdWUubnVtYmVyIC0gMTtcblxuXHQvLyBGb3JtYXQgYW5kIHJldHVybiB0aGUgbmV3IHZhbHVlXG5cdHJldHVybiB0aGlzLmZvcm1hdFZhbHVlKCBuZXdOdW1iZXIgKyB1bml0ICk7XG59XG5cblN0eWxlSW5wdXRWaWV3LnByb3RvdHlwZS5wYXJzZVZhbHVlID0gZnVuY3Rpb24oIHZhbHVlICkge1xuXHR2YXIgcmUgPSAvKFtcXGR8XFwufFxcLV0qKSguKikvLFxuXHRcdHJlc3VsdCA9IHJlLmV4ZWModmFsdWUpO1xuXG5cdHJldHVybiB7XG5cdFx0bnVtYmVyOiByZXN1bHRbIDEgXSxcblx0XHR1bml0OiByZXN1bHRbIDIgXVxuXHR9XG59XG5cblN0eWxlSW5wdXRWaWV3LnByb3RvdHlwZS52YWxpZGF0ZVZhbHVlID0gZnVuY3Rpb24oIHZhbHVlICkge1xuXG5cdC8vIElmIHRoZSB2YWx1ZSBpcyBpbGxlZ2FsbHkgbmVnYXRpdmUsXG5cdC8vIHNldCBpdCB0byAwXG5cdGlmICggdmFsdWUgPCAwICYmICF0aGlzLmNhbkJlTmVnYXRpdmUgKSB7XG5cdFx0cmV0dXJuIDA7XG5cdH1cblxuXHQvLyBJZiB0aGUgdmFsdWUgbXVzdCBiZSBhbiBpbnQsIHBhcnNlIGl0IGFzIGFuIGludFxuXHRpZiAoICF0aGlzLmNhbkJlRGVjaW1hbCApIHtcblx0XHRyZXR1cm4gcGFyc2VJbnQoIHZhbHVlICk7XG5cdH1cblxuXHQvLyBJZiBubyBtb2RpZmljYXRpb25zIGFyZSBuZWNlc3NhcnksXG5cdC8vIHJldHVybiB0aGUgdmFsdWUgYXMtaXNcblx0cmV0dXJuIHBhcnNlRmxvYXQoIHZhbHVlICk7XG59XG5cblN0eWxlSW5wdXRWaWV3LnByb3RvdHlwZS5mb3JtYXRWYWx1ZSA9IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblxuXHQvLyBEb24ndCBkbyBhbnl0aGluZyBpZiB0aGlzIGlzIGEgY29sb3IgdmFsdWVcblx0aWYgKCB0aGlzLnR5cGUgPT09ICdjb2xvcicgKSB7XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9XG5cblx0dmFyXHRwYXJzZWRWYWx1ZSA9IHRoaXMucGFyc2VWYWx1ZSggdmFsdWUgKSxcblx0XHRudW1iZXIgPSB0aGlzLnZhbGlkYXRlVmFsdWUoIHBhcnNlZFZhbHVlLm51bWJlciApLFxuXHRcdHVuaXQgPSBwYXJzZWRWYWx1ZS51bml0IHx8IHRoaXMudW5pdDtcblxuXHRyZXR1cm4gbnVtYmVyICsgdW5pdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTdHlsZUlucHV0VmlldzsiLCJ2YXIgQ29sdW1uc0V2ZW50ID0gcmVxdWlyZSgnLi4vbW9kZWxzL0NvbHVtbnNFdmVudC5qcycpO1xuXG5IYW5kbGViYXJzLnJlZ2lzdGVySGVscGVyKCdpZklzQ3VycmVudFZhbHVlJywgZnVuY3Rpb24odmFsdWUsIGN1cnJlbnRWYWx1ZSwgb3B0aW9ucykge1xuXHRyZXR1cm4gdmFsdWUgPT0gY3VycmVudFZhbHVlID8gb3B0aW9ucy5mbih0aGlzKSA6IG9wdGlvbnMuaW52ZXJzZSh0aGlzKTtcbn0pO1xuXG52YXIgVEVNUExBVEUgPSBDb2x1bW5zLlRlbXBsYXRlc1sndGVtcGxhdGVzL3N0eWxpbmcvY29tcG9uZW50cy9tdWx0aXBsZS1zZWdtZW50ZWQtYnV0dG9uLmhicyddO1xuXG5mdW5jdGlvbiBTdHlsZU11bHRpcGxlU2VnbWVudGVkQnV0dG9uVmlldyggb3B0aW9ucyApIHtcblxuXHR0aGlzLmxhYmVsID0gJyc7XG5cdHRoaXMuYnV0dG9ucyA9IFtdO1xuXHR0aGlzLnByb3BlcnRpZXMgPSB7fTtcblx0dGhpcy5pdGVtID0gdW5kZWZpbmVkO1xuXG5cdGlmICggb3B0aW9ucyApIHtcblx0XHR0aGlzLmxhYmVsID0gb3B0aW9ucy5sYWJlbCB8fCB0aGlzLmxhYmVsO1xuXHRcdHRoaXMuYnV0dG9ucyA9IG9wdGlvbnMuYnV0dG9ucyB8fCB0aGlzLmJ1dHRvbnM7XG5cdFx0dGhpcy5pdGVtID0gb3B0aW9ucy5pdGVtIHx8IHRoaXMuaXRlbTtcblx0fVxuXG5cdHRoaXMuYnV0dG9ucy5mb3JFYWNoKGZ1bmN0aW9uKCBidXR0b24sIGkgKSB7XG5cdFx0dGhpcy5wcm9wZXJ0aWVzW2J1dHRvbi5wcm9wZXJ0eV0gPSBidXR0b24udmFsdWVzLmN1cnJlbnQ7XG5cdH0uYmluZCggdGhpcyApKTtcbn1cblxuU3R5bGVNdWx0aXBsZVNlZ21lbnRlZEJ1dHRvblZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKCkge1xuXG5cdHZhciB0ZW1wbGF0ZSA9IFRFTVBMQVRFKHtcblx0XHRsYWJlbDogdGhpcy5sYWJlbCxcblx0XHRidXR0b25zOiB0aGlzLmJ1dHRvbnNcblx0fSk7XG5cblx0dGhpcy4kdGVtcGxhdGUgPSAkKCB0ZW1wbGF0ZSApO1xuXG5cdHRoaXMuX3NldHVwQ29udHJvbHMoKTtcblxuXHRyZXR1cm4gdGhpcy4kdGVtcGxhdGU7XG59O1xuXG5TdHlsZU11bHRpcGxlU2VnbWVudGVkQnV0dG9uVmlldy5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oIHByb3BlcnR5LCB2YWx1ZSApIHtcblxuXHR0aGlzLnByb3BlcnRpZXNbcHJvcGVydHldID0gdmFsdWU7XG5cblx0Ly8gQWxlcnQgYW55IGxpc3RlbmVycyB0aGF0IHRoZSBpdGVtIGhhcyBzdGFydGVkIGRyYWdcblx0Ly8gdmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCAnQ29sdW1ucy5TdHlsZU11bHRpcGxlU2VnbWVudGVkQnV0dG9uVmlldy5WYWx1ZURpZFVwZGF0ZUZvclByb3BlcnR5Jywge1xuXHQvLyBcdGl0ZW06IFx0dGhpcyxcblx0Ly8gXHRldmVudDogXHRldmVudCxcblx0Ly8gXHR1aTogXHR1aVxuXHQvLyB9KTtcblx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHQvLyBjb2x1bW5zRXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLlN0eWxlTXVsdGlwbGVTZWdtZW50ZWRCdXR0b25WaWV3LlZhbHVlRGlkVXBkYXRlRm9yUHJvcGVydHlBbmRJdGVtJywgZmFsc2UsIGZhbHNlLCB7XG5cdC8vIFx0aXRlbTogdGhpcy5pdGVtLFxuXHQvLyBcdHByb3BlcnR5OiBwcm9wZXJ0eSxcblx0Ly8gXHR2YWx1ZTogXHR2YWx1ZVxuXHQvLyB9KTtcblx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjb2x1bW5zRXZlbnQpO1xuXHRDb2x1bW5zRXZlbnQuc2VuZCggJ0NvbHVtbnMuU3R5bGVNdWx0aXBsZVNlZ21lbnRlZEJ1dHRvblZpZXcuVmFsdWVEaWRVcGRhdGVGb3JQcm9wZXJ0eUFuZEl0ZW0nLCB7XG5cdFx0aXRlbTogdGhpcy5pdGVtLFxuXHRcdHByb3BlcnR5OiBwcm9wZXJ0eSxcblx0XHR2YWx1ZTogXHR2YWx1ZVxuXHR9ICk7XG59XG5cblN0eWxlTXVsdGlwbGVTZWdtZW50ZWRCdXR0b25WaWV3LnByb3RvdHlwZS5fc2V0dXBDb250cm9scyA9IGZ1bmN0aW9uKCkge1xuXG5cdHRoaXMuJHRlbXBsYXRlLmZpbmQoJ2J1dHRvbicpLm9uKCAnY2xpY2snLCB0aGlzLl9vbkNsaWNrLmJpbmQoIHRoaXMgKSApO1xufTtcblxuU3R5bGVNdWx0aXBsZVNlZ21lbnRlZEJ1dHRvblZpZXcucHJvdG90eXBlLl9vbkNsaWNrID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuXHR2YXIgJGJ1dHRvbiA9ICQoIGV2ZW50LnRhcmdldCApLmlzKCdidXR0b24nKSA/ICQoIGV2ZW50LnRhcmdldCApIDogJCggZXZlbnQudGFyZ2V0ICkucGFyZW50cygnYnV0dG9uJykuZmlyc3QoKSxcblx0XHRwcm9wZXJ0eSA9ICRidXR0b24uZGF0YSgncHJvcGVydHknKSxcblx0XHR2YWx1ZTtcblxuXHRpZiAoICRidXR0b24uaGFzQ2xhc3MoJ2FjdGl2ZScpICkge1xuXHRcdHZhbHVlID0gJGJ1dHRvbi5kYXRhKCdpbmFjdGl2ZS12YWx1ZScpO1xuXHR9IGVsc2Uge1xuXHRcdHZhbHVlID0gJGJ1dHRvbi5kYXRhKCdhY3RpdmUtdmFsdWUnKTtcblx0fVxuXG5cdCRidXR0b24udG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuXG5cdHRoaXMudXBkYXRlKCBwcm9wZXJ0eSwgdmFsdWUgKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU3R5bGVNdWx0aXBsZVNlZ21lbnRlZEJ1dHRvblZpZXc7IiwidmFyIENvbHVtbnNFdmVudCBcdFx0XHRcdFx0PSByZXF1aXJlKCcuLi9tb2RlbHMvQ29sdW1uc0V2ZW50LmpzJyk7XG5cbkhhbmRsZWJhcnMucmVnaXN0ZXJIZWxwZXIoJ2lmSXNDdXJyZW50VmFsdWUnLCBmdW5jdGlvbih2YWx1ZSwgY3VycmVudFZhbHVlLCBvcHRpb25zKSB7XG5cdHJldHVybiB2YWx1ZSA9PSBjdXJyZW50VmFsdWUgPyBvcHRpb25zLmZuKHRoaXMpIDogb3B0aW9ucy5pbnZlcnNlKHRoaXMpO1xufSk7XG5cbmZ1bmN0aW9uIFN0eWxlU2VnbWVudGVkQnV0dG9uVmlldyggb3B0aW9ucyApIHtcblxuXHR0aGlzLmxhYmVsID0gJyc7XG5cdHRoaXMucHJvcGVydHkgPSAnJztcblx0dGhpcy5idXR0b25zID0gW107XG5cdHRoaXMudmFsdWUgPSAnJztcblx0dGhpcy5pdGVtID0gdW5kZWZpbmVkO1xuXG5cdGlmKCBvcHRpb25zICkge1xuXHRcdHRoaXMubGFiZWwgPSBvcHRpb25zLmxhYmVsIHx8IHRoaXMubGFiZWw7XG5cdFx0dGhpcy5wcm9wZXJ0eSA9IG9wdGlvbnMucHJvcGVydHkgfHwgdGhpcy5wcm9wZXJ0eTtcblx0XHR0aGlzLmJ1dHRvbnMgPSBvcHRpb25zLmJ1dHRvbnMgfHwgdGhpcy5idXR0b25zO1xuXHRcdHRoaXMudmFsdWUgPSBvcHRpb25zLnZhbHVlIHx8IHRoaXMudmFsdWU7XG5cdFx0dGhpcy5pdGVtID0gb3B0aW9ucy5pdGVtIHx8IHRoaXMuaXRlbTtcblx0fVxuXG5cdHRoaXMudGVtcGxhdGUgPSBDb2x1bW5zLlRlbXBsYXRlc1sndGVtcGxhdGVzL3N0eWxpbmcvY29tcG9uZW50cy9zZWdtZW50ZWQtYnV0dG9uLmhicyddO1xufVxuXG5TdHlsZVNlZ21lbnRlZEJ1dHRvblZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKCkge1xuXG5cdHZhciB0ZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGUoe1xuXHRcdGxhYmVsOiB0aGlzLmxhYmVsLFxuXHRcdHByb3BlcnR5OiB0aGlzLnByb3BlcnR5LFxuXHRcdHZhbHVlOiB0aGlzLnZhbHVlLFxuXHRcdGJ1dHRvbnM6IHRoaXMuYnV0dG9uc1xuXHR9KTtcblxuXHR0aGlzLiR0ZW1wbGF0ZSA9ICQoIHRlbXBsYXRlICk7XG5cblx0dGhpcy5fc2V0dXBDb250cm9scygpO1xuXG5cdHJldHVybiB0aGlzLiR0ZW1wbGF0ZTtcbn07XG5cblN0eWxlU2VnbWVudGVkQnV0dG9uVmlldy5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oIHZhbHVlICkge1xuXG5cdHRoaXMudmFsdWUgPSB2YWx1ZTtcblxuXHQvLyBBbGVydCBhbnkgbGlzdGVuZXJzIHRoYXQgdGhlIGl0ZW0gaGFzIHN0YXJ0ZWQgZHJhZ1xuXHQvLyB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoICdDb2x1bW5zLlN0eWxlU2VnbWVudGVkQnV0dG9uVmlldy5WYWx1ZURpZFVwZGF0ZUZvclByb3BlcnR5Jywge1xuXHQvLyBcdGl0ZW06IFx0dGhpcyxcblx0Ly8gXHRldmVudDogXHRldmVudCxcblx0Ly8gXHR1aTogXHR1aVxuXHQvLyB9KTtcblx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHQvLyBjb2x1bW5zRXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLlN0eWxlU2VnbWVudGVkQnV0dG9uVmlldy5WYWx1ZURpZFVwZGF0ZUZvclByb3BlcnR5QW5kSXRlbScsIGZhbHNlLCBmYWxzZSwge1xuXHQvLyBcdGl0ZW06IHRoaXMuaXRlbSxcblx0Ly8gXHRwcm9wZXJ0eTogdGhpcy5wcm9wZXJ0eSxcblx0Ly8gXHR2YWx1ZTogXHR2YWx1ZVxuXHQvLyB9KTtcblx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjb2x1bW5zRXZlbnQpO1xuXHRDb2x1bW5zRXZlbnQuc2VuZCggJ0NvbHVtbnMuU3R5bGVTZWdtZW50ZWRCdXR0b25WaWV3LlZhbHVlRGlkVXBkYXRlRm9yUHJvcGVydHlBbmRJdGVtJywge1xuXHRcdGl0ZW06IHRoaXMuaXRlbSxcblx0XHRwcm9wZXJ0eTogdGhpcy5wcm9wZXJ0eSxcblx0XHR2YWx1ZTogXHR2YWx1ZVxuXHR9KTtcbn07XG5cblN0eWxlU2VnbWVudGVkQnV0dG9uVmlldy5wcm90b3R5cGUuX3NldHVwQ29udHJvbHMgPSBmdW5jdGlvbigpIHtcblxuXHR0aGlzLiR0ZW1wbGF0ZS5maW5kKCdidXR0b24nKS5vbiggJ2NsaWNrJywgdGhpcy5fb25DbGljay5iaW5kKCB0aGlzICkgKTtcbn07XG5cblN0eWxlU2VnbWVudGVkQnV0dG9uVmlldy5wcm90b3R5cGUuX29uQ2xpY2sgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdHZhciAkYnV0dG9uID0gJCggZXZlbnQudGFyZ2V0ICkuaXMoJ2J1dHRvbicpID8gJCggZXZlbnQudGFyZ2V0ICkgOiAkKCBldmVudC50YXJnZXQgKS5wYXJlbnRzKCdidXR0b24nKS5maXJzdCgpO1xuXG5cdHRoaXMuJHRlbXBsYXRlLmZpbmQoJ2J1dHRvbicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0JGJ1dHRvbi5hZGRDbGFzcygnYWN0aXZlJyk7XG5cblx0dGhpcy51cGRhdGUoICRidXR0b24uZGF0YSgndmFsdWUnKSApO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTdHlsZVNlZ21lbnRlZEJ1dHRvblZpZXc7IiwidmFyIENvbHVtbnNFdmVudCBcdFx0XHRcdFx0PSByZXF1aXJlKCcuLi9tb2RlbHMvQ29sdW1uc0V2ZW50LmpzJyk7XG52YXIgQ29sdW1ucyBcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoJy4uLy4uL2NvbXBpbGVkLWphdmFzY3JpcHRzL3N0eWxpbmcvY29tcGlsZWQtZGF0YS5qcycpO1xudmFyIFN0eWxlQ29tcG9uZW50VmlldyBcdFx0XHRcdD0gcmVxdWlyZSgnLi9TdHlsZUNvbXBvbmVudFZpZXcuanMnKTtcbnZhciBUZW1wbGF0ZUdyb3VwVmlldyBcdFx0XHRcdD0gcmVxdWlyZSgnLi9UZW1wbGF0ZUdyb3VwVmlldy5qcycpO1xudmFyIFRlbXBsYXRlVmFsdWVWaWV3IFx0XHRcdFx0PSByZXF1aXJlKCcuL1RlbXBsYXRlVmFsdWVWaWV3LmpzJyk7XG5cbmZ1bmN0aW9uIFN0eWxlVmlldygpIHtcblx0dGhpcy4kc3R5bGUgPSAkKCcjc3R5bGluZycpO1xuXHR0aGlzLl9zZXR1cEV2ZW50TGlzdGVuZXJzKCk7XG59XG5cblN0eWxlVmlldy5wcm90b3R5cGUudXBkYXRlV2l0aFNlbGVjdGlvbiA9IGZ1bmN0aW9uKCBzZWxlY3Rpb24gKSB7XG5cdHZhciBjb21wb25lbnRWaWV3LFxuXHRcdCRjb21wb25lbnQ7XG5cblx0Ly8gQ3JlYXRlIGEgY29tcG9uZW50IHZpZXcgd2l0aCB0aGUgbmV3IGl0ZW1cblx0c2VsZWN0aW9uID0gdGhpcy5nZXRJdGVtRm9yU2VsZWN0aW9uKCBzZWxlY3Rpb24gKTtcblx0Y29tcG9uZW50VmlldyA9IG5ldyBTdHlsZUNvbXBvbmVudFZpZXcoIHNlbGVjdGlvbiApO1xuXHQkY29tcG9uZW50ID0gY29tcG9uZW50Vmlldy5yZW5kZXIoKTtcblxuXHQvLyBDbGVhciB0aGUgc3R5bGUgcGFuZSBpZiB3ZSdyZSBhYm91dCB0byByZW5kZXIgYW4gaXRlbS5cblx0Ly8gT3RoZXJ3aXNlLCBhcHBlbmQgdG8gdGhlIGVuZCBvZiB0aGUgcGFuZVxuXHRpZiggc2VsZWN0aW9uIGluc3RhbmNlb2YgSXRlbSApIHtcblx0XHQkKCcuc3R5bGUtY29tcG9uZW50JykucmVtb3ZlKCk7XG5cdH1cblx0XG5cdHRoaXMuJHN0eWxlLmFwcGVuZCggJGNvbXBvbmVudCApO1xufTtcblxuU3R5bGVWaWV3LnByb3RvdHlwZS5nZXRJdGVtRm9yU2VsZWN0aW9uID0gZnVuY3Rpb24oIHNlbGVjdGlvbiApIHtcblxuXHRpZiggc2VsZWN0aW9uIGluc3RhbmNlb2YgSXRlbSApIHtcblx0XHRyZXR1cm4gc2VsZWN0aW9uO1xuXHR9IGVsc2UgaWYgKCBzZWxlY3Rpb24gaW5zdGFuY2VvZiBJdGVtVmlldyApIHtcblx0XHRyZXR1cm4gc2VsZWN0aW9uLml0ZW07XG5cdH0gZWxzZSBpZiAoIHNlbGVjdGlvbiBpbnN0YW5jZW9mIFRlbXBsYXRlVmFsdWVWaWV3ICkge1xuXHRcdHJldHVybiBzZWxlY3Rpb24uaXRlbTtcblx0fSBlbHNlIGlmICggc2VsZWN0aW9uIGluc3RhbmNlb2YgVGVtcGxhdGVHcm91cFZpZXcgKSB7XG5cdFx0cmV0dXJuIHNlbGVjdGlvbjtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBcImV4Y2VwdGlvbjogU2VsZWN0aW9uIG11c3QgYmUgYW4gSXRlbSwgSXRlbVZpZXcsIFRlbXBsYXRlVmFsdWVWaWV3IG9yIFRlbXBsYXRlR3JvdXBWaWV3XCI7XG5cdH1cbn07XG5cblN0eWxlVmlldy5wcm90b3R5cGUuX3NldHVwRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBMaXN0ZW4gdG8gdWRwYXRlcyBmcm9tIHN0eWxpbmcgY29udHJvbHNcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5TdHlsZUlucHV0Vmlldy5WYWx1ZURpZFVwZGF0ZUZvclByb3BlcnR5QW5kSXRlbScsIHRoaXMuX29uU3R5bGVVcGRhdGUuYmluZCggdGhpcyApKTtcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5TdHlsZVNlZ21lbnRlZEJ1dHRvblZpZXcuVmFsdWVEaWRVcGRhdGVGb3JQcm9wZXJ0eUFuZEl0ZW0nLCB0aGlzLl9vblN0eWxlVXBkYXRlLmJpbmQoIHRoaXMgKSk7XG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuU3R5bGVNdWx0aXBsZVNlZ21lbnRlZEJ1dHRvblZpZXcuVmFsdWVEaWRVcGRhdGVGb3JQcm9wZXJ0eUFuZEl0ZW0nLCB0aGlzLl9vblN0eWxlVXBkYXRlLmJpbmQoIHRoaXMgKSk7XG5cblx0Ly8gTGlzdGVuIHRvIHZhbHVlIHZpZXcgc2VsZWN0aW9uXG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuVGVtcGxhdGVWYWx1ZVZpZXcuVmFsdWVEaWRTZWxlY3RXaXRoSXRlbScsIHRoaXMuX29uSXRlbVNlbGVjdGlvbi5iaW5kKCB0aGlzICkpO1xuXG5cdC8vIExpc3RlbiB0byBpdGVtIHNlbGVjdGlvblxuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLkl0ZW1WaWV3Lkl0ZW1EaWRTZWxlY3QnLCB0aGlzLl9vbkl0ZW1TZWxlY3Rpb24uYmluZCggdGhpcyApKTtcblxuXHQvLyBMaXN0ZW4gZm9yIHRoZSB0ZW1wbGF0ZSB0byBmaW5pc2ggcmVuZGVyaW5nXG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuVGVtcGxhdGVWaWV3LkRpZFJlbmRlcicsIHRoaXMuX29uVGVtcGxhdGVEaWRSZW5kZXIuYmluZCggdGhpcyApKTtcdFxufTtcblxuU3R5bGVWaWV3LnByb3RvdHlwZS5fb25TdHlsZVVwZGF0ZSA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblxuXHR0aGlzLl9lbWl0Q2hhbmdlKCBkYXRhLml0ZW0sIGRhdGEucHJvcGVydHksIGRhdGEudmFsdWUgKTtcbn07XG5cblN0eWxlVmlldy5wcm90b3R5cGUuX29uSXRlbVNlbGVjdGlvbiA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblx0dmFyIGl0ZW0gPSBkYXRhLml0ZW0sXG5cdFx0Z3JvdXBzID0gVGVtcGxhdGVWaWV3LmdldEdyb3Vwc0Zvckl0ZW0oIGl0ZW0gKTtcblxuXHQvLyBVcGRhdGUgdGhlIHN0eWxlIHBhbmVsIHdpdGggdGhlIHNlbGVjdGVkIGl0ZW1cblx0dGhpcy51cGRhdGVXaXRoU2VsZWN0aW9uKCBpdGVtICk7XG5cblx0Ly8gQWxzbyB1cGRhdGUgd2l0aCBhbnkgcGFyZW50IGdyb3Vwc1xuXHRpZiAoIGdyb3VwcyAmJiBncm91cHMubGVuZ3RoICkge1xuXHRcdGdyb3Vwcy5mb3JFYWNoKGZ1bmN0aW9uKCBncm91cCApIHtcblx0XHRcdHRoaXMudXBkYXRlV2l0aFNlbGVjdGlvbiggZ3JvdXAgKTtcblx0XHR9LmJpbmQoIHRoaXMgKSk7XG5cdH1cbn07XG5cblN0eWxlVmlldy5wcm90b3R5cGUuX29uVGVtcGxhdGVEaWRSZW5kZXIgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdHRoaXMudXBkYXRlV2l0aFNlbGVjdGlvbiggVGVtcGxhdGVWaWV3Lmdyb3Vwc1sgMCBdICk7XG59O1xuXG5TdHlsZVZpZXcucHJvdG90eXBlLl9lbWl0Q2hhbmdlID0gZnVuY3Rpb24oIGl0ZW0sIHByb3BlcnR5LCB2YWx1ZSApIHtcblxuXHQvLyBBbGVydCBhbnkgbGlzdGVuZXJzIHRoYXQgdGhlIGdyb3VwIGlzIG5vdyBlbmdhZ2VkIHRvIGJlIGRyb3BwZWQgdXBvblxuXHQvLyB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoICdDb2x1bW5zLlN0eWxlVmlldy5Qcm9wZXJ0eURpZFVwZGF0ZVdpdGhWYWx1ZUZvckdyb3VwVmlldycsIHtcblx0XHQvLyBncm91cFZpZXc6IFx0aXRlbSxcblx0XHQvLyBwcm9wZXJ0eTogcHJvcGVydHksXG5cdFx0Ly8gdmFsdWU6IHZhbHVlXG5cdC8vIH0pO1xuXG5cdHZhciBldmVudFR5cGUsXG5cdFx0ZGF0YTtcblxuXHRpZiAoIGl0ZW0gaW5zdGFuY2VvZiBJdGVtICkge1xuXG5cdFx0ZXZlbnRUeXBlID0gJ0NvbHVtbnMuU3R5bGVWaWV3LlByb3BlcnR5RGlkVXBkYXRlV2l0aFZhbHVlRm9ySXRlbSc7XG5cdFx0ZGF0YSA9IHtcblx0XHRcdGl0ZW06IFx0aXRlbSxcblx0XHRcdHByb3BlcnR5OiBwcm9wZXJ0eSxcblx0XHRcdHZhbHVlOiB2YWx1ZVxuXHRcdH07XG5cdFx0Q29sdW1uc0V2ZW50LnNlbmQoIGV2ZW50VHlwZSwgZGF0YSApO1xuXG5cdH0gZWxzZSBpZiAoIGl0ZW0gaW5zdGFuY2VvZiBUZW1wbGF0ZUdyb3VwVmlldyApIHtcblx0XHRcblx0XHRldmVudFR5cGUgPSAnQ29sdW1ucy5TdHlsZVZpZXcuUHJvcGVydHlEaWRVcGRhdGVXaXRoVmFsdWVGb3JHcm91cFZpZXcnO1xuXHRcdGRhdGEgPSB7XG5cdFx0XHRncm91cFZpZXc6IFx0aXRlbSxcblx0XHRcdHByb3BlcnR5OiBwcm9wZXJ0eSxcblx0XHRcdHZhbHVlOiB2YWx1ZVxuXHRcdH07XG5cdFx0Q29sdW1uc0V2ZW50LnNlbmQoIGV2ZW50VHlwZSwgZGF0YSApO1xuXG5cdH0gZWxzZSB7XG5cdFx0Ly8gRG8gbm90aGluZ1xuXHR9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0eWxlVmlldztcbiIsInZhciBDb2x1bW5zRXZlbnQgPSByZXF1aXJlKCcuLi9tb2RlbHMvQ29sdW1uc0V2ZW50LmpzJyk7XG5cbi8vIE9iamVjdCB0byBtYW5hZ2UgcHJvcGVydGllcyBvZiBhbmQgaW50ZXJhY3Rpb25cbi8vIHdpdGggdGVtcGxhdGUgZ3JvdXAgem9uZXMuXG4vLyBHcm91cCB6b25lcyBhcmUgcG9wdWxhdGVkIHdpdGggdmFsdWUgem9uZXMgYW5kXG4vLyBjYW4gaGF2ZSB0aGVpciBsYXlvdXQgYW5kIHN0eWxlIGFsdGVyZWQuXG5cbkhhbmRsZWJhcnMucmVnaXN0ZXJQYXJ0aWFsKCdsYXlvdXQnLCBDb2x1bW5zLlRlbXBsYXRlc1sndGVtcGxhdGVzL2xheW91dC9sYXlvdXQuaGJzJ10pO1xuSGFuZGxlYmFycy5yZWdpc3RlclBhcnRpYWwoJ3N0eWxlJywgQ29sdW1ucy5UZW1wbGF0ZXNbJ3RlbXBsYXRlcy9sYXlvdXQvc3R5bGUuaGJzJ10pO1xuXG52YXIgUk9XX0dST1VQX1NFTEVDVE9SID0gJy5sYXlvdXQtdGVtcGxhdGUtcm93LWdyb3VwJywgXG5cdFJPV19WQUxVRV9TRUxFQ1RPUiA9ICcubGF5b3V0LXRlbXBsYXRlLXJvdy12YWx1ZScsXG5cdExBWU9VVF9QUk9QRVJUSUVTID0gW1xuXHRcdCdhbGlnbi1pdGVtcycsXG5cdFx0J2ZsZXgtZGlyZWN0aW9uJyxcblx0XHQnanVzdGlmeS1jb250ZW50Jyxcblx0XTtcblxuVGVtcGxhdGVHcm91cFZpZXcgPSBmdW5jdGlvbiggcGFyYW1zICkge1xuXG5cdGlmICggcGFyYW1zICkge1xuXHRcdHRoaXMubGF5b3V0IFx0XHQ9IHBhcmFtcy5sYXlvdXQgfHwgW107XG5cdFx0dGhpcy5zdHlsZVx0XHRcdD0gbmV3IFN0eWxlKCBwYXJhbXMuc3R5bGUgfHwgW10gKTtcblx0XHR0aGlzLnBsYWNlaG9sZGVyIFx0PSBwYXJhbXMucGxhY2Vob2xkZXIgfHwgZmFsc2U7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5sYXlvdXQgXHRcdD0gW107XG5cdFx0dGhpcy5zdHlsZVx0XHRcdD0gbmV3IFN0eWxlKCBbXSApO1xuXHRcdHRoaXMucGxhY2Vob2xkZXIgXHQ9IGZhbHNlO1xuXHR9XG5cblx0dGhpcy50ZW1wbGF0ZSA9IENvbHVtbnMuVGVtcGxhdGVzWyd0ZW1wbGF0ZXMvbGF5b3V0L3Jvdy1ncm91cC5oYnMnXTtcblx0dGhpcy4kZ3JvdXA7XG59O1xuXG4vLyBSZXR1cm4gdGhlIGxheW91dCBwcm9wZXJ0aWVzIGFzIGFuIG9iamVjdCxcbi8vIGdpdmVuIGFueSBqUXVlcnkgZ3JvdXAgb2JqZWN0XG5UZW1wbGF0ZUdyb3VwVmlldy5sYXlvdXRGb3JHcm91cCA9IGZ1bmN0aW9uKCAkZ3JvdXAgKSB7XG5cdHZhciBsYXlvdXQgPSBbXTtcblxuXHRpZiAoICEoICRncm91cCBpbnN0YW5jZW9mIGpRdWVyeSApICkge1xuXHRcdHRocm93IFwiZXhjZXB0aW9uOiBncm91cCBtdXN0IGJlIGpRdWVyeSBvYmplY3RcIjtcblx0fVxuXG5cdExBWU9VVF9QUk9QRVJUSUVTLmZvckVhY2goZnVuY3Rpb24oIHByb3BlcnR5LCBpICkge1xuXHRcdHZhciB2YWx1ZSA9ICRncm91cC5kYXRhKCBwcm9wZXJ0eSApO1xuXHRcdGlmICggdmFsdWUgKSB7XG5cdFx0XHRsYXlvdXQucHVzaCh7XG5cdFx0XHRcdHByb3BlcnR5OiBwcm9wZXJ0eSxcblx0XHRcdFx0dmFsdWU6IHZhbHVlXG5cdFx0XHR9KTtcblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gbGF5b3V0O1xufTtcblxuVGVtcGxhdGVHcm91cFZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgJHRlbXBsYXRlID0gJCggdGhpcy50ZW1wbGF0ZSh7XG5cdFx0cGxhY2Vob2xkZXI6IFx0dGhpcy5wbGFjZWhvbGRlcixcblx0XHRzdHlsZTogXHRcdFx0dGhpcy5zdHlsZS5zdHlsZXMsXG5cdFx0bGF5b3V0OiBcdFx0dGhpcy5sYXlvdXRcblx0fSkpO1xuXHR0aGlzLiRncm91cCA9ICR0ZW1wbGF0ZTtcblxuXHR0aGlzLl9zZXR1cEV2ZW50cygpO1xuXHR0aGlzLl9zZXR1cERyb3AoKTtcblxuXHRyZXR1cm4gdGhpcy4kZ3JvdXA7XG59O1xuXG5UZW1wbGF0ZUdyb3VwVmlldy5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oIHByb3BlcnR5LCB2YWx1ZSApIHtcblxuXHQvLyBSZXBsYWNlIGVhY2ggbGF5b3V0IHZhbHVlIHdpdGggYSBwb3RlbnRpYWwgbmV3IG9uZVxuXHR0aGlzLmxheW91dC5mb3JFYWNoKGZ1bmN0aW9uKCBsYXlvdXQsIGkgKSB7XG5cdFx0dGhpcy4kZ3JvdXAuZGF0YSggbGF5b3V0LnByb3BlcnR5LCBsYXlvdXQudmFsdWUgKTtcblx0XHR0aGlzLiRncm91cC5hdHRyKCAnbGF5b3V0LScgKyBsYXlvdXQucHJvcGVydHksIGxheW91dC52YWx1ZSApO1xuXHR9LmJpbmQoIHRoaXMgKSk7XG5cblx0Ly8gQWxlcnQgYW55IGxpc3RlbmVycyB0aGF0IHRoZSBncm91cCBoYXMgY2hhbmdlZFxuXHQvLyB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoICdDb2x1bW5zLkdyb3VwVmlldy5EaWRDaGFuZ2UnLCB7XG5cdC8vIFx0Z3JvdXBWaWV3OiBcdHRoaXNcblx0Ly8gfSk7XG5cdC8vIHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHQvLyBldmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuVGVtcGxhdGVHcm91cFZpZXcuRGlkQ2hhbmdlJywgZmFsc2UsIGZhbHNlLCB7XG5cdC8vIFx0Z3JvdXBWaWV3OiBcdHRoaXNcblx0Ly8gfSk7XG5cdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuXG5cdENvbHVtbnNFdmVudC5zZW5kKCdDb2x1bW5zLlRlbXBsYXRlR3JvdXBWaWV3LkRpZENoYW5nZScsIHtcblx0XHRncm91cFZpZXc6IFx0dGhpc1xuXHR9KTtcblxuXHRyZXR1cm4gdGhpcy4kZ3JvdXA7XG59O1xuXG4vLyBSZXR1cm4gdGhlIGNvcnJlY3QgbGF5b3V0IGF0dHJpYnV0ZSBmb3IgYSBnaXZlbiBwcm9wZXJ0eVxuLy8gQHBhcmFtIHsgc3RyaW5nIH0gcHJvcGVydHkgLS0gdGhlIHJlcXVlc3RlZCBsYXlvdXQgcHJvcGVydHlcbi8vIEByZXR1cm4geyBzdHJpbmcgfSB0aGUgY29ycmVzcG9uZGluZyB2YWx1ZVxuVGVtcGxhdGVHcm91cFZpZXcucHJvdG90eXBlLmdldFN0eWxlID0gZnVuY3Rpb24oIHByb3BlcnR5ICkge1xuXHR2YXIgdmFsdWU7XG5cblx0Ly8gSWYgdGhlcmUgd2FzIG5vdCBtYXRjaCBpbiB0aGUgbGF5b3V0IG9iamVjdCxcblx0Ly8gY2hlY2sgdGhlIHN0eWxlIG9iamVjdFxuXHQvLyBMb29wIHRocm91Z2ggZWFjaCBwcm9wZXJ0eSB1bnRpbCB3ZSBmaW5kIGEgbWF0Y2hcblx0aWYgKCB0aGlzLnN0eWxlICkge1xuXHRcdHZhbHVlID0gdGhpcy5zdHlsZS5nZXQoIHByb3BlcnR5IClcblx0fVxuXG5cdC8vIExvb3AgdGhyb3VnaCBlYWNoIGxheW91dCBwcm9wZXJ0eVxuXHQvLyB1bnRpbCB3ZSBmaW5kIGEgbWF0Y2hcblx0Ly8gcG90ZW50aWFsbHkgYSBiZXR0ZXIgb25lIHRoYXQgaW4gdGhlIHN0eWxlIHNldFxuXHR0aGlzLmxheW91dC5mb3JFYWNoKGZ1bmN0aW9uKCBsYXlvdXQsIGkgKSB7XG5cdFx0aWYgKCBsYXlvdXQucHJvcGVydHkgPT09IHByb3BlcnR5ICkge1xuXHRcdFx0dmFsdWUgPSBsYXlvdXQudmFsdWVcblx0XHR9XG5cdH0pO1xuXG5cdC8vIEFzIGEgbGFzdCByZXNvcnQsIGNoZWNrIHRoZSBjc3MgZm9yIHRoZSBlbGVtZW50XG5cdC8vIGFuZCByZXR1cm4gaXRzIHZhbHVlXG5cdGlmICggdmFsdWUgKSB7XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiB0aGlzLiRncm91cC5jc3MoIHByb3BlcnR5ICk7XG5cdH1cbn07XG5cbi8vIEdldCB0aGUgdGVtcGxhdGUncyB0aXRsZSBmb3IgZGlzcGxheVxuLy8gU2hvdWxkIGJlICdSb3cnIGZvciB0aGUgZmlyc3QgZ3JvdXAgaW4gdGhlIHRlbXBsYXRlXG4vLyBhbmQgJ0dyb3VwJyBmb3IgYWxsIG90aGVyc1xuLy8gQHJldHVybiB7IHN0cmluZyB9IC0tIFRoZSBncm91cCdzIHRpdGxlXG5UZW1wbGF0ZUdyb3VwVmlldy5wcm90b3R5cGUudGl0bGUgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBJcyB0aGlzIHRoZSBmaXJzdCBncm91cCBpbiB0aGUgdGVtcGxhdGU/XG5cdGlmICggdGhpcy4kZ3JvdXAucGFyZW50KCcubGF5b3V0LXRlbXBsYXRlLXJvdycpLmxlbmd0aCApIHtcblx0XHRyZXR1cm4gJ1Jvdyc7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuICdHcm91cCc7XG5cdH1cbn07XG5cblRlbXBsYXRlR3JvdXBWaWV3LnByb3RvdHlwZS5yZW1vdmVQbGFjZWhvbGRlcnMgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBSZW1vdmUgYW55IHBsYWNlaG9sZGVyIHZhbHVlc1xuXHR0aGlzLiRncm91cC5maW5kKFJPV19WQUxVRV9TRUxFQ1RPUikuZmlsdGVyKCcucGxhY2Vob2xkZXInKS5yZW1vdmUoKTtcblxuXHQvLyBSZW1vdmUgYW55IHBsYWNlaG9sZGVyIGdyb3VwcyB3aGlsZSBsZWF2aW5nIHRoZWlyIGNoaWxkcmVuXG5cdHRoaXMuJGdyb3VwLmZpbmQoUk9XX0dST1VQX1NFTEVDVE9SKS5maWx0ZXIoJy5wbGFjZWhvbGRlcicpLmNoaWxkcmVuKCkudW53cmFwKCk7XG59O1xuXG5UZW1wbGF0ZUdyb3VwVmlldy5wcm90b3R5cGUuX21lcmdlTGF5b3V0ID0gZnVuY3Rpb24oIHByb3BlcnR5LCB2YWx1ZSApIHtcblx0dmFyIGV4aXN0aW5nUHJvcGVydHkgPSBmYWxzZTtcblxuXHQvLyBMb29wIHRocm91Z2ggdGhlIG9sZCBwcm9wZXJ0aWVzXG5cdC8vIGNvbXBhcmluZyBlYWNoIHdpdGggdGhlIG5ldyBwcm9wZXJ0eS5cblx0Ly8gUmVwbGFjZSBhbiBleGlzdGluZyBwcm9wZXJ0eSBhbnl0aW1lIGEgbmV3IG9uZSBtYXRjaGVzIGl0LlxuXHQvLyBBdCB0aGUgZW5kLCBhcHBlbmQgYW55IHJlbWFpbmluZyBuZXcgcHJvcGVydGllcyB0byB0aGUgbWVyZ2VkIHN0eWxlcyBhcnJheS5cblx0dGhpcy5sYXlvdXQuZm9yRWFjaChmdW5jdGlvbiggbGF5b3V0LCBpICkge1xuXHRcdGlmICggbGF5b3V0LnByb3BlcnR5ID09PSBwcm9wZXJ0eSApIHtcblx0XHRcdGxheW91dC52YWx1ZSA9IHZhbHVlO1xuXHRcdFx0dGhpcy5sYXlvdXRbIGkgXSA9IGxheW91dDtcblx0XHRcdGV4aXN0aW5nUHJvcGVydHkgPSB0cnVlO1xuXHRcdH1cblx0fS5iaW5kKCB0aGlzICkpO1xuXG5cdC8vIEFkZCBhbGwgcmVtYWluaW5nIG5ldyBzdHlsZXMgdG8gdGhlIHN0eWxlcyBhcnJheVxuXHRpZiAoICFleGlzdGluZ1Byb3BlcnR5ICkge1xuXHRcdHRoaXMubGF5b3V0LnB1c2goe1xuXHRcdFx0cHJvcGVydHk6IHByb3BlcnR5LFxuXHRcdFx0dmFsdWU6IHZhbHVlXG5cdFx0fSk7XG5cdH1cbn07XG5cblRlbXBsYXRlR3JvdXBWaWV3LnByb3RvdHlwZS5fc2V0dXBEcm9wID0gZnVuY3Rpb24oKSB7XG5cdHRoaXMuJGdyb3VwLmRyb3BwYWJsZSh7XG5cdFx0dG9sZXJhbmNlOiAncG9pbnRlcidcblx0fSk7XG5cblx0dGhpcy4kZ3JvdXAub24oICdkcm9wb3ZlcicsICQucHJveHkoZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcblxuXHRcdC8vIEFsZXJ0IGFueSBsaXN0ZW5lcnMgdGhhdCB0aGUgZ3JvdXAgaXMgbm93IGVuZ2FnZWQgdG8gYmUgZHJvcHBlZCB1cG9uXG5cdFx0Ly8gdmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCAnQ29sdW1ucy5UZW1wbGF0ZUdyb3VwVmlldy5Hcm91cERpZEJlZ2luRHJvcE92ZXJXaXRoVmFsdWVWaWV3Jywge1xuXHRcdC8vIGdyb3VwVmlldzogXHR0aGlzLFxuXHRcdC8vIHZhbHVlVmlldzogXHR1aS5kcm9wcGFibGUsXG5cdFx0Ly8gZXZlbnQ6IFx0XHRldmVudCxcblx0XHQvLyB1aTogXHRcdHVpXG5cdFx0Ly8gfSk7XG5cdFx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHRcdC8vIGNvbHVtbnNFdmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuVGVtcGxhdGVHcm91cFZpZXcuR3JvdXBEaWRCZWdpbkRyb3BPdmVyV2l0aFZhbHVlVmlldycsIGZhbHNlLCBmYWxzZSwge1xuXHRcdC8vIFx0Z3JvdXBWaWV3OiBcdHRoaXMsXG5cdFx0Ly8gXHR2YWx1ZVZpZXc6IFx0dWkuZHJvcHBhYmxlLFxuXHRcdC8vIFx0ZXZlbnQ6IFx0XHRldmVudCxcblx0XHQvLyBcdHVpOiBcdFx0dWlcblx0XHQvLyB9KTtcblx0XHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGNvbHVtbnNFdmVudCk7XG5cdFx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuVGVtcGxhdGVHcm91cFZpZXcuR3JvdXBEaWRCZWdpbkRyb3BPdmVyV2l0aFZhbHVlVmlldycsIHtcblx0XHRcdGdyb3VwVmlldzogXHR0aGlzLFxuXHRcdFx0dmFsdWVWaWV3OiBcdHVpLmRyb3BwYWJsZSxcblx0XHRcdGV2ZW50OiBcdFx0ZXZlbnQsXG5cdFx0XHR1aTogXHRcdHVpXG5cdFx0fSk7XG5cblx0fSwgdGhpcykgKTtcblxuXHR0aGlzLiRncm91cC5vbiggJ2Ryb3BvdXQnLCAkLnByb3h5KGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XG5cblx0XHQvLyBBbGVydCBhbnkgbGlzdGVuZXJzIHRoYXQgdGhlIGdyb3VwIGlzIG5vdyBlbmdhZ2VkIHRvIGJlIGRyb3BwZWQgdXBvblxuXHRcdC8vIHZhciBldmVudCA9IG5ldyBDdXN0b21FdmVudCggJ0NvbHVtbnMuVGVtcGxhdGVHcm91cFZpZXcuR3JvdXBEaWRFbmREcm9wT3ZlcldpdGhWYWx1ZVZpZXcnLCB7XG5cdFx0Ly8gZ3JvdXBWaWV3OiBcdHRoaXMsXG5cdFx0Ly8gdmFsdWVWaWV3OiBcdHVpLmRyb3BwYWJsZSxcblx0XHQvLyBldmVudDogXHRcdGV2ZW50LFxuXHRcdC8vIHVpOiBcdFx0dWlcblx0XHQvLyB9KTtcblx0XHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdFx0Ly8gY29sdW1uc0V2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5UZW1wbGF0ZUdyb3VwVmlldy5Hcm91cERpZEVuZERyb3BPdmVyV2l0aFZhbHVlVmlldycsIGZhbHNlLCBmYWxzZSwge1xuXHRcdC8vIFx0Z3JvdXBWaWV3OiBcdHRoaXMsXG5cdFx0Ly8gXHR2YWx1ZVZpZXc6IFx0dWkuZHJvcHBhYmxlLFxuXHRcdC8vIFx0ZXZlbnQ6IFx0XHRldmVudCxcblx0XHQvLyBcdHVpOiBcdFx0dWlcblx0XHQvLyB9KTtcblx0XHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGNvbHVtbnNFdmVudCk7XG5cdFx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuVGVtcGxhdGVHcm91cFZpZXcuR3JvdXBEaWRFbmREcm9wT3ZlcldpdGhWYWx1ZVZpZXcnLCB7XG5cdFx0XHRncm91cFZpZXc6IFx0dGhpcyxcblx0XHRcdHZhbHVlVmlldzogXHR1aS5kcm9wcGFibGUsXG5cdFx0XHRldmVudDogXHRcdGV2ZW50LFxuXHRcdFx0dWk6IFx0XHR1aVxuXHRcdH0pO1xuXG5cdH0sIHRoaXMpICk7XG5cblx0dGhpcy4kZ3JvdXAub24oICdkcm9wJywgJC5wcm94eShmdW5jdGlvbiggZXZlbnQsIHVpICkge1xuXG5cdFx0Ly8gQWxlcnQgYW55IGxpc3RlbmVycyB0aGF0IHRoZSBncm91cCBpcyBub3cgZW5nYWdlZCB0byBiZSBkcm9wcGVkIHVwb25cblx0XHQvLyB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoICdDb2x1bW5zLlRlbXBsYXRlR3JvdXBWaWV3Lkdyb3VwRGlkRHJvcFdpdGhWYWx1ZVZpZXcnLCB7XG5cdFx0Ly8gZ3JvdXBWaWV3OiBcdHRoaXMsXG5cdFx0Ly8gdmFsdWVWaWV3OiBcdHVpLmRyb3BwYWJsZSxcblx0XHQvLyBldmVudDogXHRcdGV2ZW50LFxuXHRcdC8vIHVpOiBcdFx0dWlcblx0XHQvLyB9KTtcblx0XHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdFx0Ly8gY29sdW1uc0V2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5UZW1wbGF0ZUdyb3VwVmlldy5Hcm91cERpZERyb3BXaXRoVmFsdWVWaWV3JywgZmFsc2UsIGZhbHNlLCB7XG5cdFx0Ly8gXHRncm91cFZpZXc6IFx0dGhpcyxcblx0XHQvLyBcdHZhbHVlVmlldzogXHR1aS5kcm9wcGFibGUsXG5cdFx0Ly8gXHRldmVudDogXHRcdGV2ZW50LFxuXHRcdC8vIFx0dWk6IFx0XHR1aVxuXHRcdC8vIH0pO1xuXHRcdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY29sdW1uc0V2ZW50KTtcblx0XHRDb2x1bW5zRXZlbnQuc2VuZCgnQ29sdW1ucy5UZW1wbGF0ZUdyb3VwVmlldy5Hcm91cERpZERyb3BXaXRoVmFsdWVWaWV3Jywge1xuXHRcdFx0Z3JvdXBWaWV3OiBcdHRoaXMsXG5cdFx0XHR2YWx1ZVZpZXc6IFx0dWkuZHJvcHBhYmxlLFxuXHRcdFx0ZXZlbnQ6IFx0XHRldmVudCxcblx0XHRcdHVpOiBcdFx0dWlcblx0XHR9KTtcblxuXHR9LCB0aGlzKSApO1xufTtcblxuVGVtcGxhdGVHcm91cFZpZXcucHJvdG90eXBlLl9zZXR1cEV2ZW50cyA9IGZ1bmN0aW9uKCkge1xuXG5cdC8vIExpc3RlbiB0byB1cGRhdGVzIGZvciB0aGlzIGdyb3VwXG5cdC8vIGFuZCB1cGRhdGUgaWYgdGhlcmUncyBhIG1hdGNoXG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuU3R5bGVWaWV3LlByb3BlcnR5RGlkVXBkYXRlV2l0aFZhbHVlRm9yR3JvdXBWaWV3JywgdGhpcy5fb25Hcm91cERpZENoYW5nZS5iaW5kKCB0aGlzICkgKTtcbn07XG5cblRlbXBsYXRlR3JvdXBWaWV3LnByb3RvdHlwZS5fb25Hcm91cERpZENoYW5nZSA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblx0dmFyICRuZXdHcm91cCA9IGRhdGEuZ3JvdXBWaWV3LiRncm91cDtcblx0aWYgKCB0aGlzLiRncm91cC5pcyggJG5ld0dyb3VwICkgKSB7XG5cdFx0dGhpcy5fbWVyZ2VMYXlvdXQoIGRhdGEucHJvcGVydHksIGRhdGEudmFsdWUgKVxuXHRcdHRoaXMudXBkYXRlKCk7XG5cdH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVGVtcGxhdGVHcm91cFZpZXc7IiwidmFyIENvbHVtbnNFdmVudCA9IHJlcXVpcmUoJy4uL21vZGVscy9Db2x1bW5zRXZlbnQuanMnKTtcblxuLy8gT2JqZWN0IHRvIG1hbmFnZSBwcm9wZXJ0aWVzIG9mIGFuZCBpbnRlcmFjdGlvblxuLy8gd2l0aCB0ZW1wbGF0ZSB2YWx1ZSB6b25lcy5cbi8vIFZhbHVlIHpvbmVzIGFyZSBwb3B1bGF0ZWQgd2l0aCBpdGVtcyBhbmRcbi8vIGNhbiByZWFjdCB0byBjaGFuZ2VzIGluIGFuIGl0ZW0ncyBwcm9wZXJ0aWVzLlxuXG5IYW5kbGViYXJzLnJlZ2lzdGVyUGFydGlhbCgnbGF5b3V0JywgQ29sdW1ucy5UZW1wbGF0ZXNbJ3RlbXBsYXRlcy9sYXlvdXQvbGF5b3V0LmhicyddKTtcbkhhbmRsZWJhcnMucmVnaXN0ZXJQYXJ0aWFsKCdzdHlsZScsIENvbHVtbnMuVGVtcGxhdGVzWyd0ZW1wbGF0ZXMvbGF5b3V0L3N0eWxlLmhicyddKTtcblxuVGVtcGxhdGVWYWx1ZVZpZXcgPSBmdW5jdGlvbiggaXRlbSwgcGxhY2Vob2xkZXIgKSB7XG5cblx0aWYgKCBpdGVtICYmIGl0ZW0gaW5zdGFuY2VvZiBJdGVtICkge1xuXHRcdHRoaXMuaXRlbSA9IGl0ZW1cblx0fSBlbHNlIGlmICggaXRlbSApIHtcblx0XHR0aHJvdyBcImV4Y2VwdGlvbjogaXRlbSBtdXN0IGJlIG9mIHR5cGUgSXRlbVwiXG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5pdGVtO1xuXHR9XG5cdFxuXHR0aGlzLnRlbXBsYXRlID0gQ29sdW1ucy5UZW1wbGF0ZXNbJ3RlbXBsYXRlcy9sYXlvdXQvcm93LXZhbHVlLmhicyddO1xuXHR0aGlzLnBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXIgfHwgZmFsc2U7XG5cdHRoaXMuJHZhbHVlO1xufTtcblxuVGVtcGxhdGVWYWx1ZVZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgJHRlbXBsYXRlID0gJCggdGhpcy50ZW1wbGF0ZSh7XG5cdFx0ZGF0YTogXHRcdFx0dGhpcy5pdGVtLmZvcm1hdHRlZFRpdGxlKCksXG5cdFx0c3R5bGU6IFx0XHRcdHRoaXMuaXRlbS5zdHlsZS5zdHlsZXMsXG5cdFx0cGxhY2Vob2xkZXI6IFx0dGhpcy5wbGFjZWhvbGRlclxuXHR9KSk7XG5cdHRoaXMuJHZhbHVlID0gJHRlbXBsYXRlO1xuXG5cdGlmICggIXRoaXMucGxhY2Vob2xkZXIgKSB7XG5cdFx0dGhpcy5fc2V0dXBFdmVudHMoKTtcblx0XHR0aGlzLl9zZXR1cERyYWcoKTtcblx0XHR0aGlzLl9zZXR1cENsaWNrKCk7XG5cdH1cblxuXHRyZXR1cm4gdGhpcy4kdmFsdWU7XG59O1xuXG5UZW1wbGF0ZVZhbHVlVmlldy5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oKSB7XG5cdC8vIFVwZGF0ZSB0aGUgdmFsdWUncyB0ZXh0XG5cdHRoaXMuJHZhbHVlLnRleHQoIHRoaXMuaXRlbS5mb3JtYXR0ZWRUaXRsZSgpICk7XG5cdC8vIFVwZGF0ZSB0aGUgdmFsdWUncyBzdHlsZVxuXHR0aGlzLiR2YWx1ZS5hdHRyKCAnc3R5bGUnLCB0aGlzLml0ZW0uc3R5bGUuY3NzKCkgKTtcblx0Ly8gVXBkYXRlIHRoZSB2YWx1ZSdzIHBsYWNlaG9sZGVyIHN0YXR1c1xuXG5cdC8vIEFsZXJ0IGFueSBsaXN0ZW5lcnMgdGhhdCB0aGUgdmFsdWUgaGFzIGNoYW5nZWRcblx0Ly8gdmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCAnQ29sdW1ucy5WYWx1ZVZpZXcuRGlkQ2hhbmdlJywge1xuXHQvLyBcdHZhbHVlVmlldzogXHR0aGlzXG5cdC8vIH0pO1xuXHQvLyB2YXIgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0Ly8gZXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLlRlbXBsYXRlVmFsdWVWaWV3LkRpZENoYW5nZScsIGZhbHNlLCBmYWxzZSwge1xuXHQvLyBcdHZhbHVlVmlldzogXHR0aGlzXG5cdC8vIH0pO1xuXHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcblx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuVGVtcGxhdGVWYWx1ZVZpZXcuRGlkQ2hhbmdlJywge1xuXHRcdHZhbHVlVmlldzogXHR0aGlzXG5cdH0pO1xuXG5cdHJldHVybiB0aGlzLiR2YWx1ZTtcbn07XG5cblRlbXBsYXRlVmFsdWVWaWV3LnByb3RvdHlwZS5fc2V0dXBEcmFnID0gZnVuY3Rpb24oKSB7XG5cblx0dGhpcy4kdmFsdWUuZHJhZ2dhYmxlKHtcblx0XHQvLyByZXZlcnQ6ICdpbnZhbGlkJyxcblx0XHQvLyByZXZlcnREdXJhdGlvbjogMjAwLFxuXHRcdGhlbHBlcjogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgaXRlbVZpZXcgPSBuZXcgSXRlbVZpZXcoIHRoaXMuaXRlbSApO1xuXHRcdFx0cmV0dXJuIGl0ZW1WaWV3LnJlbmRlcigpO1xuXHRcdH0uYmluZCggdGhpcyApLFxuXHRcdG9wYWNpdHk6IC4yXG5cdH0pO1xuXG5cdHRoaXMuJHZhbHVlLm9uKCAnZHJhZ3N0YXJ0JywgJC5wcm94eShmdW5jdGlvbiggZXZlbnQsIHVpICkge1xuXG5cdFx0JCggZXZlbnQudGFyZ2V0ICkuYWRkQ2xhc3MoJ2luYWN0aXZlJyk7XG5cblx0XHQvLyBNYWtlIHN1cmUgdGhpcyBvYmplY3Qgbm8gbG9uZ2VyIHJlY2VpdmVzIGV2ZW50IHVwZGF0ZXNcblx0XHR0aGlzLl90ZWFyZG93bkV2ZW50cygpO1xuXG5cdFx0Ly8gQWxlcnQgYW55IGxpc3RlbmVycyB0aGF0IHRoZSBpdGVtIGhhcyBzdGFydGVkIGRyYWdcblx0XHQvLyB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoICdDb2x1bW5zLkl0ZW1WaWV3Lkl0ZW1EaWRCZWdpbkRyYWcnLCB7XG5cdFx0Ly8gXHRpdGVtOiBcdHRoaXMsXG5cdFx0Ly8gXHRldmVudDogXHRldmVudCxcblx0XHQvLyBcdHVpOiBcdHVpXG5cdFx0Ly8gfSk7XG5cdFx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHRcdC8vIGNvbHVtbnNFdmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuVGVtcGxhdGVWYWx1ZVZpZXcuVmFsdWVEaWRCZWdpbkRyYWdXaXRoSXRlbScsIGZhbHNlLCBmYWxzZSwge1xuXHRcdC8vIFx0dmFsdWVWaWV3OiBcdHRoaXMsXG5cdFx0Ly8gXHRpdGVtOiBcdFx0dGhpcy5pdGVtLFxuXHRcdC8vIFx0ZXZlbnQ6IFx0XHRldmVudCxcblx0XHQvLyBcdHVpOiBcdFx0dWlcblx0XHQvLyB9KTtcblx0XHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGNvbHVtbnNFdmVudCk7XG5cdFx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuVGVtcGxhdGVWYWx1ZVZpZXcuVmFsdWVEaWRCZWdpbkRyYWdXaXRoSXRlbScsIHtcblx0XHRcdHZhbHVlVmlldzogXHR0aGlzLFxuXHRcdFx0aXRlbTogXHRcdHRoaXMuaXRlbSxcblx0XHRcdGV2ZW50OiBcdFx0ZXZlbnQsXG5cdFx0XHR1aTogXHRcdHVpXG5cdFx0fSk7XG5cblx0fSwgdGhpcykgKTtcblxuXHR0aGlzLiR2YWx1ZS5vbiggJ2RyYWdzdG9wJywgJC5wcm94eShmdW5jdGlvbiggZXZlbnQsIHVpICkge1xuXG5cdFx0JCggZXZlbnQudGFyZ2V0ICkucmVtb3ZlKCk7XG5cblx0XHQvLyBBbGVydCBhbnkgbGlzdGVuZXJzIHRoYXQgdGhlIGl0ZW0gaGFzIHN0YXJ0ZWQgZHJhZ1xuXHRcdC8vIHZhciBldmVudCA9IG5ldyBDdXN0b21FdmVudCggJ0NvbHVtbnMuSXRlbVZpZXcuSXRlbURpZEJFbmREcmFnJywge1xuXHRcdC8vIFx0aXRlbTogXHR0aGlzLFxuXHRcdC8vIFx0ZXZlbnQ6IFx0ZXZlbnQsXG5cdFx0Ly8gXHR1aTogXHR1aVxuXHRcdC8vIH0pO1xuXHRcdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0XHQvLyBjb2x1bW5zRXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLlRlbXBsYXRlVmFsdWVWaWV3LlZhbHVlRGlkRW5kRHJhZ1dpdGhJdGVtJywgZmFsc2UsIGZhbHNlLCB7XG5cdFx0Ly8gXHR2YWx1ZVZpZXc6IFx0dGhpcyxcblx0XHQvLyBcdGl0ZW06IFx0XHR0aGlzLml0ZW0sXG5cdFx0Ly8gXHRldmVudDogXHRcdGV2ZW50LFxuXHRcdC8vIFx0dWk6IFx0XHR1aVxuXHRcdC8vIH0pO1xuXHRcdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY29sdW1uc0V2ZW50KTtcblx0XHRDb2x1bW5zRXZlbnQuc2VuZCgnQ29sdW1ucy5UZW1wbGF0ZVZhbHVlVmlldy5WYWx1ZURpZEVuZERyYWdXaXRoSXRlbScsIHtcblx0XHRcdHZhbHVlVmlldzogXHR0aGlzLFxuXHRcdFx0aXRlbTogXHRcdHRoaXMuaXRlbSxcblx0XHRcdGV2ZW50OiBcdFx0ZXZlbnQsXG5cdFx0XHR1aTogXHRcdHVpXG5cdFx0fSk7XG5cblx0fSwgdGhpcykgKTtcblxuXHR0aGlzLiR2YWx1ZS5vbiggJ2RyYWcnLCAkLnByb3h5KGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XG5cblx0XHQvLyBBbGVydCBhbnkgbGlzdGVuZXJzIHRoYXQgdGhlIGl0ZW0gaGFzIHN0YXJ0ZWQgZHJhZ1xuXHRcdC8vIHZhciBldmVudCA9IG5ldyBDdXN0b21FdmVudCggJ0NvbHVtbnMuSXRlbVZpZXcuSXRlbURpZERyYWcnLCB7XG5cdFx0Ly8gXHRpdGVtOiBcdHRoaXMsXG5cdFx0Ly8gXHRldmVudDogXHRldmVudCxcblx0XHQvLyBcdHVpOiBcdHVpXG5cdFx0Ly8gfSk7XG5cdFx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHRcdC8vIGNvbHVtbnNFdmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuVGVtcGxhdGVWYWx1ZVZpZXcuVmFsdWVEaWREcmFnV2l0aEl0ZW0nLCBmYWxzZSwgZmFsc2UsIHtcblx0XHQvLyBcdHZhbHVlVmlldzogXHR0aGlzLFxuXHRcdC8vIFx0aXRlbTogXHRcdHRoaXMuaXRlbSxcblx0XHQvLyBcdGV2ZW50OiBcdFx0ZXZlbnQsXG5cdFx0Ly8gXHR1aTogXHRcdHVpXG5cdFx0Ly8gfSk7XG5cdFx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjb2x1bW5zRXZlbnQpO1xuXHRcdENvbHVtbnNFdmVudC5zZW5kKCdDb2x1bW5zLlRlbXBsYXRlVmFsdWVWaWV3LlZhbHVlRGlkRHJhZ1dpdGhJdGVtJywge1xuXHRcdFx0dmFsdWVWaWV3OiBcdHRoaXMsXG5cdFx0XHRpdGVtOiBcdFx0dGhpcy5pdGVtLFxuXHRcdFx0ZXZlbnQ6IFx0XHRldmVudCxcblx0XHRcdHVpOiBcdFx0dWlcblx0XHR9KTtcblxuXHR9LCB0aGlzKSApO1xufTtcblxuVGVtcGxhdGVWYWx1ZVZpZXcucHJvdG90eXBlLl9zZXR1cENsaWNrID0gZnVuY3Rpb24oKSB7XG5cblx0dGhpcy4kdmFsdWUub24oICdjbGljaycsICQucHJveHkoZnVuY3Rpb24oIGV2ZW50ICkge1xuXG5cdFx0dGhpcy4kdmFsdWUuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XG5cblx0XHRDb2x1bW5zRXZlbnQuc2VuZCgnQ29sdW1ucy5UZW1wbGF0ZVZhbHVlVmlldy5WYWx1ZURpZFNlbGVjdFdpdGhJdGVtJywge1xuXHRcdFx0dmFsdWVWaWV3OiBcdHRoaXMsXG5cdFx0XHRpdGVtOiBcdFx0dGhpcy5pdGVtXG5cdFx0fSk7XG5cblx0fSwgdGhpcyApICk7XG59O1xuXG5UZW1wbGF0ZVZhbHVlVmlldy5wcm90b3R5cGUuX3NldHVwRXZlbnRzID0gZnVuY3Rpb24oKSB7XG5cblx0dGhpcy5vbkl0ZW1EaWRDaGFuZ2UgPSB0aGlzLl9vbkl0ZW1EaWRDaGFuZ2UuYmluZCggdGhpcyApO1xuXG5cdC8vIExpc3RlbiB0byB1cGRhdGVzIGZvciB0aGlzIGl0ZW1cblx0Ly8gYW5kIHVwZGF0ZSBpZiB0aGVyZSdzIGEgbWF0Y2hcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5JdGVtLkRpZENoYW5nZScsIHRoaXMub25JdGVtRGlkQ2hhbmdlICk7XG59O1xuXG5UZW1wbGF0ZVZhbHVlVmlldy5wcm90b3R5cGUuX3RlYXJkb3duRXZlbnRzID0gZnVuY3Rpb24oKSB7XG5cblx0Q29sdW1uc0V2ZW50Lm9mZiggJ0NvbHVtbnMuSXRlbS5EaWRDaGFuZ2UnLCB0aGlzLm9uSXRlbURpZENoYW5nZSApO1xufTtcblxuVGVtcGxhdGVWYWx1ZVZpZXcucHJvdG90eXBlLl9vbkl0ZW1EaWRDaGFuZ2UgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdHZhciBuZXdJdGVtID0gZGF0YS5pdGVtO1xuXHRpZiAoIHRoaXMuaXRlbS5pcyggbmV3SXRlbSApICkge1xuXHRcdHRoaXMuaXRlbSA9IG5ld0l0ZW07XG5cdFx0dGhpcy51cGRhdGUoKTtcblx0fVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBUZW1wbGF0ZVZhbHVlVmlldzsiLCJ2YXIgQ29sdW1uc0V2ZW50IFx0XHRcdFx0PSByZXF1aXJlKCcuLi9tb2RlbHMvQ29sdW1uc0V2ZW50LmpzJyk7XG52YXIgVGVtcGxhdGVHcm91cFZpZXcgXHRcdFx0PSByZXF1aXJlKCcuL1RlbXBsYXRlR3JvdXBWaWV3LmpzJyk7XG52YXIgVGVtcGxhdGVWYWx1ZVZpZXcgXHRcdFx0PSByZXF1aXJlKCcuL1RlbXBsYXRlVmFsdWVWaWV3LmpzJyk7XG52YXIgY29uZmlnIFx0XHRcdFx0XHRcdD0gcmVxdWlyZSgnLi4vY29uZmlnLmpzJyk7XG5cbi8vIE9iamVjdCB0byBtYW5hZ2UgcHJvcGVydGllcyBvZiBhbmQgaW50ZXJhY3Rpb25cbi8vIHdpdGggdGhlIHRlbXBsYXRlIGl0c2VsZi5cblxudmFyIFJPV19HUk9VUF9TRUxFQ1RPUiBcdFx0PSAnLmxheW91dC10ZW1wbGF0ZS1yb3ctZ3JvdXAnLCBcblx0Uk9XX1ZBTFVFX1NFTEVDVE9SIFx0XHQ9ICcubGF5b3V0LXRlbXBsYXRlLXJvdy12YWx1ZScsXG5cdERSQUdHSU5HX0lURU1fU0VMRUNUT1IgXHQ9ICcudWktZHJhZ2dhYmxlLWRyYWdnaW5nJyxcblx0RVhQQU5ERURfQ0xBU1MgXHRcdFx0PSAnZXhwYW5kZWQnLFxuXHREUk9QUEFCTEVfQ0xBU1MgXHRcdD0gJ2Ryb3BwYWJsZSc7XG5cblRlbXBsYXRlVmlldyA9IGZ1bmN0aW9uKCBsYXlvdXQgKSAge1xuXG5cdHRoaXMubGF5b3V0ID0gbGF5b3V0Oztcblx0dGhpcy50ZW1wbGF0ZSA9IENvbHVtbnMuVGVtcGxhdGVzWyd0ZW1wbGF0ZXMvbGF5b3V0L3RlbXBsYXRlLmhicyddO1xuXHR0aGlzLiR0ZW1wbGF0ZTtcblxuXHR0aGlzLmRyYWdnaW5nSXRlbTtcblx0dGhpcy5kcm9wcGFibGVJdGVtcyA9IFtdO1xuXG5cdHRoaXMuX3JlbmRlclByZXZpZXcoKTtcblx0dGhpcy5fc2V0dXBFdmVudExpc3RlbmVycygpO1xuXG5cdFRlbXBsYXRlVmlldy5ncm91cHMgPSBbXTtcbn07XG5cbi8vIENsYXNzIE1ldGhvZHNcbi8vIC0tLS0tLS0tLS0tLS0tLS1cblRlbXBsYXRlVmlldy5ncm91cHMgPSBbXTtcblxuLy8gUmV0dXJuIHRoZSBjb3JyZWN0IHZhbHVlIERPTSByZXByZXNlbnRhdGlvbiBmb3IgYW4gaXRlbVxuLy8gQHBhcmFtIHsgSXRlbSB9IGl0ZW0gLS0gdGhlIEl0ZW0gdG8gcmV0cml2ZVxuLy8gQHJldHVybiB7IGpRdWVyeSB9IHRoZSBjb3JyZXNwb25kaW5nIHRlbXBsYXRlIHJlcHJlc2V0YXRpb25cblRlbXBsYXRlVmlldy5nZXRWYWx1ZUZvckl0ZW0gPSBmdW5jdGlvbiggaXRlbSApIHtcblx0dmFyICR2YWx1ZXM7XG5cblx0Ly8gVGhyb3cgYW4gZXJyb3IgaWYgdGhlIGl0ZW0gaXNuJ3Qgb2YgdGhlIGNvcnJlY3QgdHlwZVxuXHRpZiggISggaXRlbSBpbnN0YW5jZW9mIEl0ZW0pICkge1xuXHRcdHRocm93IFwiZXhwZWN0aW9uOiBpdGVtIG11c3QgYmUgb2YgdHlwZSBJdGVtXCI7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gRmluZCBhbGwgdGhlIGN1cnJlbnQgdmFsdWVzIGluIHRoZSB0ZW1wbGF0ZVxuXHQvLyBhbmQgZmlsdGVyIHRoZW0gYnkgdGhlaXIgaW5uZXIgdGV4dFxuXHQvLyByZXR1cm5pbmcgb25seSB0aGUgZmlyc3QgdGhhdCBtYXRjaGVzIHRoZSBpdGVtJ3MgdGl0bGVcblx0JHZhbHVlcyA9ICQoUk9XX1ZBTFVFX1NFTEVDVE9SKS5maWx0ZXIoZnVuY3Rpb24oIGksIGVsZW1lbnQgKSB7XG5cdFx0cmV0dXJuICQoIGVsZW1lbnQgKS50ZXh0KCkudHJpbSgpID09PSBpdGVtLmZvcm1hdHRlZFRpdGxlKCk7XG5cdH0pO1xuXG5cdC8vIFJldHVybiB1bmRlZmluZWQgaWYgdGhlcmUgYXJlIG5vIHJlc3VsdGluZyB2YWx1ZXNcblx0aWYgKCAhJHZhbHVlcy5sZW5ndGggKSB7XG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gJHZhbHVlcztcblx0fVxufVxuXG5UZW1wbGF0ZVZpZXcuZ2V0R3JvdXBzRm9ySXRlbSA9IGZ1bmN0aW9uKCBpdGVtICkge1xuXHR2YXIgJHZhbHVlO1xuXG5cdC8vIElmIHRoZSBpdGVtIGlzIG9mIHR5cGUgSXRlbSwgY29udmVydCBpdCBpbnRvIGEgdmFsdWVcblx0aWYgKCBpdGVtIGluc3RhbmNlb2YgSXRlbSApIHtcblx0XHQkdmFsdWUgPSB0aGlzLmdldFZhbHVlRm9ySXRlbSggaXRlbSApO1xuXHR9IGVsc2UgaWYgKCBpdGVtIGluc3RhbmNlb2YgalF1ZXJ5ICYmIGl0ZW0uaGFzQ2xhc3MoUk9XX1ZBTFVFX1NFTEVDVE9SKSApIHtcblx0XHQkdmFsdWUgPSBpdGVtO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IFwiZXhwZWN0aW9uOiBpdGVtIG11c3QgYmUgb2YgdHlwZSBJdGVtIG9yIGpRdWVyeSB0ZW1wbGF0ZSByb3dcIjtcblx0fVxuXG5cdC8vIElmIHRoaXMgdmFsdWUgaXNuJ3QgaW4gdGhlIHRlbXBsYXRlLCByZXR1cm4gdW5kZWZpbmVkXG5cdGlmKCAhJHZhbHVlICkge1xuXHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdH1cblxuXHQvLyBSZXR1cm4gdGhlIHZhbHVlJ3MgcGFyZW50IGdyb3Vwc1xuXHRyZXR1cm4gJHZhbHVlLnBhcmVudHMoUk9XX0dST1VQX1NFTEVDVE9SKS5tYXAoZnVuY3Rpb24oIGksIGdyb3VwICkge1xuXHRcdHJldHVybiBUZW1wbGF0ZVZpZXcuZ2V0R3JvdXBWaWV3Rm9yR3JvdXAoICQoIGdyb3VwICkgKTtcblx0fSkudG9BcnJheSgpO1xuXG59O1xuXG5UZW1wbGF0ZVZpZXcuZ2V0R3JvdXBWaWV3Rm9yR3JvdXAgPSBmdW5jdGlvbiggZ3JvdXAgKSB7XG5cdHZhciBuZXdHcm91cCA9IFtdO1xuXG5cdGlmICggISggZ3JvdXAgaW5zdGFuY2VvZiBUZW1wbGF0ZUdyb3VwVmlldyApICYmICEoIGdyb3VwIGluc3RhbmNlb2YgalF1ZXJ5ICkgKSB7XG5cdFx0dGhyb3cgXCJleGNlcHRpb246IGdyb3VwIG11c3QgYmUgVGVtcGxhdGVHcm91cFZpZXcgb3IgalF1ZXJ5IG9iamVjdFwiO1xuXHR9XG5cblx0bmV3R3JvdXAgPSBUZW1wbGF0ZVZpZXcuZ3JvdXBzLmZpbHRlcihmdW5jdGlvbiggb2xkR3JvdXAsIGkgKSB7XG5cdFx0aWYgKCBncm91cCBpbnN0YW5jZW9mIFRlbXBsYXRlR3JvdXBWaWV3ICYmIGdyb3VwID09PSBvbGRHcm91cCApIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0gZWxzZSBpZiAoIGdyb3VwIGluc3RhbmNlb2YgalF1ZXJ5ICYmIGdyb3VwLmlzKCBvbGRHcm91cC4kZ3JvdXAgKSApIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9KTtcblxuXHRpZiAoIG5ld0dyb3VwLmxlbmd0aCApIHtcblx0XHRyZXR1cm4gbmV3R3JvdXBbIDAgXTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHR9XG59O1xuXG5UZW1wbGF0ZVZpZXcucmVtb3ZlR3JvdXAgPSBmdW5jdGlvbiggZ3JvdXAgKSB7XG5cdHZhciBncm91cFZpZXcgPSBncm91cCxcblx0XHRpbmRleDtcblxuXHQvLyBJZiB0aGUgZ3JvdXAgaXMgYSBqcXVlcnkgb2JqZWN0LCBnZXQgaXRzIGdyb3VwIHZpZXdcblx0aWYgKCBncm91cFZpZXcgaW5zdGFuY2VvZiBqUXVlcnkgKSB7XG5cdFx0Z3JvdXBWaWV3ID0gVGVtcGxhdGVWaWV3LmdldEdyb3VwVmlld0Zvckdyb3VwKCBncm91cFZpZXcgKTtcblx0fVxuXG5cdC8vIEdldCB0aGUgZ3JvdXAncyBpbmRleCBpbiB0aGUgZ3JvdXBzIGFycmF5XG5cdGluZGV4ID0gVGVtcGxhdGVWaWV3Lmdyb3Vwcy5pbmRleE9mKCBncm91cFZpZXcgKTtcblxuXHQvLyBMZXQgdGhlIGdyb3VwIGtub3cgdGhhdCBpdCdzIGFib3V0IHRvIGJlIHJlbW92ZWRcblx0Ly8gYW5kIHRoZW4gcmVtb3ZlIGl0XG5cdGlmICggaW5kZXggPj0gMCApIHtcblx0XHRDb2x1bW5zRXZlbnQuc2VuZCgnQ29sdW1ucy5UZW1wbGF0ZVZpZXcuV2lsbFJlbW92ZUdyb3VwVmlldycsIHtcblx0XHRcdGdyb3VwVmlldzogXHRncm91cFZpZXdcblx0XHR9KTtcblxuXHRcdFRlbXBsYXRlVmlldy5ncm91cHMuc3BsaWNlKCBpbmRleCwgMSApO1xuXHR9XG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKCkge1xuXG5cdC8vIFJlbmRlciB0aGUgbGF5b3V0IHByZXZpZXdcblx0dGhpcy5fcmVuZGVyUHJldmlldygpO1xuXG5cdC8vIFJlbmRlciBhbmQgcmV0dXJuIHRoZSB0ZW1wbGF0ZVxuXHRyZXR1cm4gdGhpcy5fcmVuZGVyVGVtcGxhdGUoKTtcbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuX3JlbmRlclByZXZpZXcgPSBmdW5jdGlvbigpIHtcblxuXHR2YXIgcHJldmlldyA9IENvbHVtbnMuVGVtcGxhdGVzWyd0ZW1wbGF0ZXMvbGF5b3V0L3ByZXZpZXcuaGJzJ10sXG5cdFx0JHByZXZpZXcgPSAkKCBwcmV2aWV3KHtcblx0XHRcdHNvdXJjZTogY29uZmlnLmVtYmVkLmhvc3QgKyBjb25maWcuZW1iZWQucGF0aFxuXHRcdH0pICk7XG5cblx0dGhpcy4kcHJldmlldyA9ICRwcmV2aWV3XG5cdCQoJyNsYXlvdXQnKS5hcHBlbmQoICRwcmV2aWV3ICk7XG5cblx0cmV0dXJuIHRoaXMuJHByZXZpZXc7XG5cbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuX3JlbmRlclRlbXBsYXRlID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gRm9yIGVhY2ggbm9kZSBpbiB0aGUgbGF5b3V0IG9iamVjdCxcblx0Ly8gcmVuZGVyIGVpdGhlciBhIGdyb3VwIG9yIHZhbHVlXG5cdC8vIGFuZCByZWN1cnNpdmVseSBhcHBlbmQgdGhlbSB0byBlYWNoIG90aGVyXG5cdC8vIHVudGlsIHdlJ3ZlIGNvbnN0cnVjdGVkIHRoZSBmdWxsIHRlbXBsYXRlXG5cdHZhciAkcm93ID0gdGhpcy5fcmVuZGVyUm93Q29tcG9uZW50KCB0aGlzLmxheW91dC5tb2RlbCApO1xuXHR2YXIgJHRlbXBsYXRlID0gJCggdGhpcy50ZW1wbGF0ZSgpICk7XG5cdCR0ZW1wbGF0ZS5maW5kKCcubGF5b3V0LXRlbXBsYXRlLXJvdycpLmFwcGVuZCggJHJvdyApO1xuXHQkKCcjbGF5b3V0JykuYXBwZW5kKCAkdGVtcGxhdGUgKTtcblx0dGhpcy4kdGVtcGxhdGUgPSAkdGVtcGxhdGU7XG5cblx0dGhpcy5fc2V0dXBUZW1wbGF0ZUV2ZW50cygpO1xuXHR0aGlzLl9lbWl0UmVuZGVyKCk7XG5cdHRoaXMuX2VtaXRDaGFuZ2UoKTtcblxuXHRyZXR1cm4gdGhpcy4kdGVtcGxhdGU7XG5cbn1cblxuXG4vLyBSZW5kZXIgYSBwb3J0aW9uIG9mIHRoZSByb3cgbGF5b3V0IG9iamVjdFxuLy8gQHBhcmFtIHsgb2JqZWN0IH0gY29tcG9uZW50IC0tIFRoZSBjb21wb25lbnQgdG8gcmVuZGVyIChlaXRoZXIgYSBncm91cCBvciB2YWx1ZSlcbi8vIEByZXR1cm4geyBqUXVlcnkgb2JqZWN0IH0gLS0gdGhlIGNvbXBvbmVudCdzIHJlbmRlcmVkIGxheW91dFxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5fcmVuZGVyUm93Q29tcG9uZW50ID0gZnVuY3Rpb24oIGNvbXBvbmVudCApIHtcblx0dmFyIGNvbXBvbmVudFZpZXcsXG5cdFx0JGNvbXBvbmVudDtcblxuXHQvLyBSZW5kZXIgdGhlIHRvcCBsZXZlbCBjb21wb25lbnRcblx0Ly8gYXMgYSBncm91cCBpZiBpdCdzIGEgZ3JvdXBcblx0Ly8gb3IgYSB2YWx1ZSBpZiBpdCdzIGEgdmFsdWVcblx0aWYgKCBjb21wb25lbnQudHlwZSA9PT0gJ2dyb3VwJyApIHtcblx0XHRjb21wb25lbnRWaWV3ID0gbmV3IFRlbXBsYXRlR3JvdXBWaWV3KHsgbGF5b3V0OiBjb21wb25lbnQubGF5b3V0LCBzdHlsZTogY29tcG9uZW50LnN0eWxlIH0pO1xuXHRcdCRjb21wb25lbnQgPSBjb21wb25lbnRWaWV3LnJlbmRlcigpO1xuXG5cdFx0Ly8gQWRkIHRoZSBncm91cCB0byB0aGUgZ3JvdXBzIGFycmF5XG5cdFx0VGVtcGxhdGVWaWV3Lmdyb3Vwcy5wdXNoKCBjb21wb25lbnRWaWV3ICk7XG5cblx0XHQvLyBMb29wIHRocm91Z2ggYWxsIGdyb3VwIHN1YnZhbHVlcyBhbmQgcmVuZGVyIHRob3NlIGFzIHdlbGxcblx0XHRjb21wb25lbnQudmFsdWVzLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBpKSB7XG5cdFx0XHQkY29tcG9uZW50LmFwcGVuZCggdGhpcy5fcmVuZGVyUm93Q29tcG9uZW50KCB2YWx1ZSApICk7XG5cdFx0fS5iaW5kKCB0aGlzICkpO1xuXG5cdFx0Ly8gUmV0dXJuIHRoZSBmaW5hbCBjb21wb25lbnQgaW5jbHVkaW5nIHJlbmRlcmVkIHN1YnZpZXdzXG5cdFx0cmV0dXJuICRjb21wb25lbnQ7XG5cblx0fSBlbHNlIGlmICggY29tcG9uZW50LnR5cGUgPT09ICdzaW5nbGUnICkge1xuXHRcdHZhciBpdGVtID0gdGhpcy50YWJsZS5nZXRJdGVtRm9yRGF0YSggY29tcG9uZW50LmRhdGEgKTtcblx0XHRjb21wb25lbnRWaWV3ID0gbmV3IFRlbXBsYXRlVmFsdWVWaWV3KCBpdGVtICk7XG5cdFx0cmV0dXJuIGNvbXBvbmVudFZpZXcucmVuZGVyKCk7XG5cdH1cblxufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5yZW1vdmVQbGFjZWhvbGRlcnMgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBSZW1vdmUgYW55IHBsYWNlaG9sZGVyIHZhbHVlc1xuXHQkKFJPV19WQUxVRV9TRUxFQ1RPUikuZmlsdGVyKCcucGxhY2Vob2xkZXInKS5yZW1vdmUoKTtcblxuXHQvLyBSZW1vdmUgYW55IHBsYWNlaG9sZGVyIGdyb3VwcyB3aGlsZSBsZWF2aW5nIHRoZWlyIGNoaWxkcmVuXG5cdCQoUk9XX0dST1VQX1NFTEVDVE9SKS5maWx0ZXIoJy5wbGFjZWhvbGRlcicpLmNoaWxkcmVuKCkudW53cmFwKCk7XG59O1xuXG4vLyBJZiB0aGlzIHRoZXJlJ3Mgb25seSBvbmUgaXRlbSBsZWZ0IGluIHRoZSBzdXJyb3VuaW5nIGdyb3VwLCBkaXNzb2x2ZSB0aGUgZ3JvdXAuXG4vLyBVbmxlc3MgdGhlIHBhcmVudCBncm91cCBpcyB0aGUgdmVyeSBmaXJzdCBncm91cCBpbiB0aGUgY2VsbC5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuZGlzc29sdmVTaW5nbGVWYWx1ZUdyb3VwcyA9IGZ1bmN0aW9uKCkge1xuXG5cdC8vIEdldCBhbnkgZ3JvdXBzIHRoYXQgb25seSBoYXZlIGEgc2luZ2xlIGFjdGl2ZSBpdGVtXG5cdC8vIGJ1dCBleGNsdWRlIHRoZSBmaXJzdCBncm91cCBpbiB0aGUgcm93XG5cdHZhciAkZ3JvdXBzID0gJCggUk9XX0dST1VQX1NFTEVDVE9SICkubm90KCAnLm1hc3RlciA+ICcgKyBST1dfR1JPVVBfU0VMRUNUT1IgKS5maWx0ZXIoZnVuY3Rpb24oIGksIGdyb3VwICkge1xuXHRcdHJldHVybiAkKCBncm91cCApLmNoaWxkcmVuKCBST1dfVkFMVUVfU0VMRUNUT1IgKS5ub3QoICcuaW5hY3RpdmUnICkubGVuZ3RoID09PSAxO1xuXHR9KTtcblxuXHQvLyB2YXIgJGdyb3VwcyA9ICQoIFJPV19WQUxVRV9TRUxFQ1RPUiArICc6b25seS1jaGlsZCcgKVxuXHQvLyBcdC5wYXJlbnQoKVxuXHQvLyBcdC5ub3QoICdtYXN0ZXIgPiAnICsgUk9XX0dST1VQX1NFTEVDVE9SICk7XG5cblx0Ly8gVW53cmFwIHRoZSAnb25seSBjaGlsZHJlbicgb2YgdGhlc2UgZ3JvdXBzXG5cdCRncm91cHMuZWFjaChmdW5jdGlvbiggaSwgZ3JvdXAgKSB7XG5cdFx0VGVtcGxhdGVWaWV3LnJlbW92ZUdyb3VwKCAkKCBncm91cCApICk7XG5cdH0pO1xuXG5cdCRncm91cHMuY2hpbGRyZW4oKS51bndyYXAoKTtcbn07XG5cbi8vIFJlbW92ZSB0aGUgZHJhZ2dpbmcgaXRlbSBmcm9tIHRoZSB0ZW1wbGF0ZVxuLy8gaWYgaXQgaXMgYSB2YWx1ZS4gUHJlc3VtYWJseSB0aGlzIGlzIGJlY2F1c2Vcbi8vIHRoZSB1c2VyIGp1c3QgZHJhZ2dlZCBpdCBvdXQgb2YgdGhlIHRlbXBsYXRlXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLnJlbW92ZVZhbHVlID0gZnVuY3Rpb24oIHZhbHVlVmlldyApIHtcblxuXHRpZiAoIHZhbHVlVmlldyBpbnN0YW5jZW9mIFRlbXBsYXRlVmFsdWVWaWV3ICkge1xuXHRcdHZhbHVlVmlldy4kdmFsdWUucmVtb3ZlKCk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgXCJleGNlcHRpb246IHZhbHVlIG11c3QgYmUgb2YgdHlwZSBUZW1wbGF0ZVZhbHVlVmlld1wiO1xuXHR9XG59O1xuXG4vLyBBbmltYXRlIHRoZSBkcmFnZ2luZyBoZWxwZXIgdG8gdGhlIHBvc2l0aW9uIG9mIGl0cyByZXNwZWN0aXZlIGl0ZW1cblRlbXBsYXRlVmlldy5wcm90b3R5cGUucmVtb3ZlRHJhZ2dpbmdWYWx1ZSA9IGZ1bmN0aW9uKCBjYWxsYmFjayApIHtcblx0dmFyICRoZWxwZXIgPSAkKCcudWktZHJhZ2dhYmxlLWRyYWdnaW5nLnVpLWRyYWdnYWJsZS1oYW5kbGUnKVxuXHRcdCRjbG9uZSA9ICRoZWxwZXIuY2xvbmUoKSxcblx0XHQkaXRlbSA9ICQoJyNjb2x1bW5zIC5sYXlvdXQtY29sdW1uJykuZmlsdGVyKGZ1bmN0aW9uKCBpLCBpdGVtICkge1xuXHRcdFx0Ly8gY29uc29sZS5sb2coJCggaXRlbSApLnRleHQoKS50cmltKCkpO1xuXHRcdFx0cmV0dXJuICRjbG9uZS50ZXh0KCkudHJpbSgpID09PSAkKCBpdGVtICkudGV4dCgpLnRyaW0oKTtcblx0XHR9KS5maXJzdCgpO1xuXG5cdC8vIEZpbmQgdGhlIHBvc2l0aW9uIG9mIHRoZSBvcmlnaW5hbCB0b2tlblxuXHQvLyB2YXIgb3JpZ2luYWxQb3NpdGlvbiA9IHtcblx0Ly8gXHR0b3A6ICRtYXRjaC5vZmZzZXQoKS50b3AsXG5cdC8vIFx0bGVmdDogJG1hdGNoLm9mZnNldCgpLmxlZnRcblx0Ly8gfTtcblxuXHQvLyBDaGFuZ2UgdGhlIGNsb25lIHRvIHBvc2l0aW9uIGZpeGVkXG5cdC8vIGFuZCBhZGQgdG8gY29sdW1ucyBjb250YWluZXJcblx0JCgnLmxheW91dC1jb2x1bW5zJykuYXBwZW5kKCAkY2xvbmUgKTtcblx0JGNsb25lLmNzcyh7XG5cdFx0cG9zaXRpb246ICdmaXhlZCcsXG5cdFx0dG9wOiAkaGVscGVyLm9mZnNldCgpLnRvcCxcblx0XHRsZWZ0OiAkaGVscGVyLm9mZnNldCgpLmxlZnRcblx0fSk7XG5cblx0Ly8gJGNsb25lLmFwcGVuZFRvKCcubGF5b3V0LWNvbHVtbnMnKTtcblxuXHQkY2xvbmUudmVsb2NpdHkoe1xuXHRcdHRyYW5zbGF0ZVg6ICRpdGVtLm9mZnNldCgpLmxlZnQgLSAkY2xvbmUub2Zmc2V0KCkubGVmdCxcblx0XHR0cmFuc2xhdGVZOiAkaXRlbS5vZmZzZXQoKS50b3AgLSAkY2xvbmUub2Zmc2V0KCkudG9wXG5cdH0sIHtcblx0XHRkdXJhdGlvbjogMjAwLFxuXHRcdGNvbXBsZXRlOiB0aGlzLl9vbkRyYWdnaW5nVmFsdWVSZW1vdmVkLmJpbmQoIHRoaXMgKVxuXHR9KTtcbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuX29uRHJhZ2dpbmdWYWx1ZVJlbW92ZWQgPSBmdW5jdGlvbiAoIGVsZW1lbnRzICkge1xuXHRcblx0Ly8gUmVtb3ZlIHRoZSBjbG9uZSBmcm9tIHRoZSBET01cblx0JCggZWxlbWVudHNbIDAgXSApLnJlbW92ZSgpO1xuXG5cdC8vIEVtaXQgYSBjaGFuZ2UgZXZlbnRcblx0dGhpcy5fZW1pdENoYW5nZSgpO1xuXG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLl9lbWl0Q2hhbmdlID0gZnVuY3Rpb24oKSB7XG5cdFxuXHQvLyBFbWl0IGEgY2hhbmdlIGV2ZW50XG5cdC8vIHZhciBldmVudCA9IG5ldyBDdXN0b21FdmVudCggJ0NvbHVtbnMuVGVtcGxhdGVWaWV3LkRpZENoYW5nZScsIHtcblx0Ly8gdGVtcGxhdGVWaWV3OiBcdHRoaXNcblx0Ly8gfSk7XG5cdC8vIHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHQvLyBldmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuVGVtcGxhdGVWaWV3LkRpZENoYW5nZScsIGZhbHNlLCBmYWxzZSwge1xuXHQvLyBcdHRlbXBsYXRlVmlldzogXHR0aGlzXG5cdC8vIH0pO1xuXHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcblxuXHRDb2x1bW5zRXZlbnQuc2VuZCgnQ29sdW1ucy5UZW1wbGF0ZVZpZXcuRGlkQ2hhbmdlJywge1xuXHRcdHRlbXBsYXRlVmlldzogdGhpc1xuXHR9KTtcbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuX2VtaXRSZW5kZXIgPSBmdW5jdGlvbigpIHtcblx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuVGVtcGxhdGVWaWV3LkRpZFJlbmRlcicsIHtcblx0XHR0ZW1wbGF0ZVZpZXc6IHRoaXNcblx0fSk7XG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLl9zZXR1cEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gTGlzdGVuIHRvIHRoZSB0YWJsZSB1cGxvYWQgZXZlbnRcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5UYWJsZS5EaWRVcGxvYWRXaXRoU3VjY2VzcycsIHRoaXMuX29uVGVtcGxhdGVVcGxvYWQuYmluZCggdGhpcyApICk7XG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLl9zZXR1cFRlbXBsYXRlRXZlbnRzID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gTGlzdGVuIHRvIGRyYWcgZXZlbnRzIGZvciBpdGVtc1xuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLkl0ZW1WaWV3Lkl0ZW1EaWRCZWdpbkRyYWcnLCB0aGlzLl9vbkl0ZW1EaWRCZWdpbkRyYWcuYmluZCggdGhpcyApKTtcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5JdGVtVmlldy5JdGVtRGlkRW5kRHJhZycsIHRoaXMuX29uSXRlbURpZEVuZERyYWcuYmluZCggdGhpcyApKTtcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5JdGVtVmlldy5JdGVtRGlkRHJhZycsIHRoaXMuX29uSXRlbURpZERyYWcuYmluZCggdGhpcyApKTtcblxuXHQvLyBMaXN0ZW4gdG8gZHJhZyBldmVudHMgZm9yIHZhbHVlc1xuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLlRlbXBsYXRlVmFsdWVWaWV3LlZhbHVlRGlkQmVnaW5EcmFnV2l0aEl0ZW0nLCB0aGlzLl9vblZhbHVlRGlkQmVnaW5EcmFnLmJpbmQoIHRoaXMgKSk7XG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuVGVtcGxhdGVWYWx1ZVZpZXcuVmFsdWVEaWRFbmREcmFnV2l0aEl0ZW0nLCB0aGlzLl9vblZhbHVlRGlkRW5kRHJhZy5iaW5kKCB0aGlzICkpO1xuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLlRlbXBsYXRlVmFsdWVWaWV3LlZhbHVlRGlkRHJhZ1dpdGhJdGVtJywgdGhpcy5fb25WYWx1ZURpZERyYWcuYmluZCggdGhpcyApKTtcblxuXHQvLyBMaXN0ZW4gdG8gZHJvcCBldmVudHMgZm9yIGdyb3Vwc1xuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLlRlbXBsYXRlR3JvdXBWaWV3Lkdyb3VwRGlkQmVnaW5Ecm9wT3ZlcldpdGhWYWx1ZVZpZXcnLCB0aGlzLl9vbkdyb3VwRGlkQmVnaW5Ecm9wT3Zlci5iaW5kKCB0aGlzICkpO1xuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLlRlbXBsYXRlR3JvdXBWaWV3Lkdyb3VwRGlkRW5kRHJvcE92ZXJXaXRoVmFsdWVWaWV3JywgdGhpcy5fb25Hcm91cERpZEVuZERyb3BPdmVyLmJpbmQoIHRoaXMgKSk7XG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuVGVtcGxhdGVHcm91cFZpZXcuR3JvdXBEaWREcm9wV2l0aFZhbHVlVmlldycsIHRoaXMuX29uR3JvdXBEaWREcm9wLmJpbmQoIHRoaXMgKSk7XG5cblx0Ly8gTGlzdGVuIHRvIGVtYmVkZGVkIHRhYmxlIGV2ZW50c1xuXHRDb2x1bW5zRXZlbnQub24oJ0NvbHVtbnNUYWJsZURpZFJlbmRlckRhdGEnLCB0aGlzLl9vblRhYmxlRGlkUmVuZGVyRGF0YS5iaW5kKCB0aGlzICkgKTtcblx0Q29sdW1uc0V2ZW50Lm9uKCdDb2x1bW5zVGFibGVEaWRTY3JvbGwnLCB0aGlzLl9vblRhYmxlRGlkU2Nyb2xsLmJpbmQoIHRoaXMgKSApO1xuXHRDb2x1bW5zRXZlbnQub24oJ0NvbHVtbnNUYWJsZVdpbGxFeHBhbmQnLCB0aGlzLl9vblRhYmxlV2lsbEV4cGFuZC5iaW5kKCB0aGlzICkgKTtcblx0Q29sdW1uc0V2ZW50Lm9uKCdDb2x1bW5zVGFibGVEaWRFeHBhbmQnLCB0aGlzLl9vblRhYmxlRGlkRXhwYW5kLmJpbmQoIHRoaXMgKSApO1xuXHRDb2x1bW5zRXZlbnQub24oJ0NvbHVtbnNUYWJsZURpZENvbGxhcHNlJywgdGhpcy5fb25UYWJsZURpZENvbGxhcHNlLmJpbmQoIHRoaXMgKSApO1xuXG5cdC8vIExpc3RlbiBmb3IgdXBkYXRlcyB0byB2YWx1ZXMgYW5kIGdyb3Vwc1xuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLlRlbXBsYXRlVmFsdWVWaWV3LkRpZENoYW5nZScsIHRoaXMuX29uVGVtcGxhdGVWaWV3RGlkQ2hhbmdlLmJpbmQoIHRoaXMgKSk7XG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuVGVtcGxhdGVHcm91cFZpZXcuRGlkQ2hhbmdlJywgdGhpcy5fb25UZW1wbGF0ZVZpZXdEaWRDaGFuZ2UuYmluZCggdGhpcyApKTtcbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuX29uVGVtcGxhdGVWaWV3RGlkQ2hhbmdlID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXHR0aGlzLl9lbWl0Q2hhbmdlKCk7XG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLl9vblRlbXBsYXRlVXBsb2FkID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXHR0aGlzLnRhYmxlID0gZGF0YS50YWJsZTtcblx0dGhpcy5sYXlvdXQgPSBkYXRhLnRhYmxlLmxheW91dDtcblx0dGhpcy5fcmVuZGVyVGVtcGxhdGUoKTtcbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuX29uVGFibGVEaWRSZW5kZXJEYXRhID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXHR0aGlzLiR0ZW1wbGF0ZS5maW5kKCcubGF5b3V0LXRlbXBsYXRlLXJvdycpLmNzcyh7XG5cdFx0aGVpZ2h0OiBkYXRhLnRhYmxlLnRhbGxlc3RSb3dIZWlnaHQoKVxuXHR9KTtcbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuX29uVGFibGVXaWxsRXhwYW5kID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXG5cdC8vIE1vdmUgdGhlIHRlbXBsYXRlIGRvd24gYmVsb3cgdGhlIGhlYWRlclxuXHR0aGlzLiR0ZW1wbGF0ZS52ZWxvY2l0eSh7XG5cdFx0dHJhbnNsYXRlWTogMFxuXHR9LCB7XG5cdFx0ZHVyYXRpb246IDQwMFxuXHR9KTtcbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuX29uVGFibGVEaWRFeHBhbmQgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cblx0dGhpcy4kcHJldmlldy5hZGRDbGFzcyggRVhQQU5ERURfQ0xBU1MgKTtcbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuX29uVGFibGVEaWRDb2xsYXBzZSA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblxuXHR0aGlzLiRwcmV2aWV3LnJlbW92ZUNsYXNzKCBFWFBBTkRFRF9DTEFTUyApO1xufTtcblx0XG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLl9vblRhYmxlRGlkU2Nyb2xsID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXG5cdC8vIE1vdmUgdGhlIHRlbXBsYXRlIHVwIHVudGlsIGl0IGhpdHMgdGhlIGhlYWRlclxuXHR2YXIgbWluU2Nyb2xsID0gLTI0LFxuXHRcdG1heFNjcm9sbCA9IDAsXG5cdFx0c2Nyb2xsID0gLSQoJy5jb2x1bW5zLXRhYmxlLWNvbnRhaW5lcicpLnNjcm9sbFRvcCgpO1xuXG5cdC8vIE1ha2Ugc3VyZSB0aGUgc2Nyb2xsIGlzIHdpdGhpbiBib3VuZHNcblx0c2Nyb2xsID0gc2Nyb2xsIDwgbWluU2Nyb2xsID8gbWluU2Nyb2xsIDogc2Nyb2xsO1xuXHRzY3JvbGwgPSBzY3JvbGwgPiBtYXhTY3JvbGwgPyBtYXhTY3JvbGwgOiBzY3JvbGw7XG5cblx0Ly8gQWRqdXN0IHRoZSB0ZW1wbGF0ZVxuXHQkLlZlbG9jaXR5Lmhvb2soIHRoaXMuJHRlbXBsYXRlLCBcInRyYW5zbGF0ZVlcIiwgc2Nyb2xsICsgXCJweFwiICk7XG59O1xuIFxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5fb25JdGVtRGlkQmVnaW5EcmFnID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXHR0aGlzLmRyYWdnaW5nSXRlbSA9IGRhdGEuaXRlbS5pdGVtO1xufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5fb25JdGVtRGlkRW5kRHJhZyA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblx0dGhpcy5kcmFnZ2luZ0l0ZW0gPSB1bmRlZmluZWQ7XG5cdHRoaXMucmVtb3ZlUGxhY2Vob2xkZXJzKCk7XG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLl9vbkl0ZW1EaWREcmFnID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXHRpZiAoIHRoaXMuZHJvcHBhYmxlSXRlbXMubGVuZ3RoICkge1xuXHRcdHRoaXMucmVtb3ZlUGxhY2Vob2xkZXJzKCk7XG5cdFx0dGhpcy5wb3NpdGlvbkRyb3BGb3JEcmFnRXZlbnRJblBhcmVudFdpdGhQbGFjZWhvbGRlciggZGF0YS5ldmVudCwgdGhpcy5kcm9wcGFibGVJdGVtc1sgdGhpcy5kcm9wcGFibGVJdGVtcy5sZW5ndGggLSAxIF0uJGdyb3VwLCB0cnVlICk7XG5cdH1cbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuX29uVmFsdWVEaWRCZWdpbkRyYWcgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdHRoaXMuZHJhZ2dpbmdJdGVtID0gZGF0YS52YWx1ZVZpZXcuaXRlbTtcblx0dGhpcy5kaXNzb2x2ZVNpbmdsZVZhbHVlR3JvdXBzKCk7XG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLl9vblZhbHVlRGlkRW5kRHJhZyA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblx0Ly8gaWYgKCAhdGhpcy5kcm9wcGFibGVJdGVtcy5sZW5ndGggKSB7XG5cdGlmICggIVRlbXBsYXRlVmlldy5nZXRWYWx1ZUZvckl0ZW0oIGRhdGEudmFsdWVWaWV3Lml0ZW0gKSApIHtcblx0XHR0aGlzLnJlbW92ZURyYWdnaW5nVmFsdWUoKTtcblx0XHQvLyB0aGlzLl9lbWl0Q2hhbmdlKCk7XG5cdH1cbn1cblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5fb25WYWx1ZURpZERyYWcgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdGlmICggdGhpcy5kcm9wcGFibGVJdGVtcy5sZW5ndGggKSB7XG5cdFx0dGhpcy5yZW1vdmVQbGFjZWhvbGRlcnMoKTtcblx0XHR0aGlzLnBvc2l0aW9uRHJvcEZvckRyYWdFdmVudEluUGFyZW50V2l0aFBsYWNlaG9sZGVyKCBkYXRhLmV2ZW50LCB0aGlzLmRyb3BwYWJsZUl0ZW1zWyB0aGlzLmRyb3BwYWJsZUl0ZW1zLmxlbmd0aCAtIDEgXS4kZ3JvdXAgLCB0cnVlICk7XG5cdH1cbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuX29uR3JvdXBEaWRCZWdpbkRyb3BPdmVyID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXHRpZiAoIHRoaXMuZHJvcHBhYmxlSXRlbXMuaW5kZXhPZiggZGF0YS5ncm91cFZpZXcgKSA9PSAtMSApIHtcblx0XHR0aGlzLmRyb3BwYWJsZUl0ZW1zLnB1c2goIGRhdGEuZ3JvdXBWaWV3ICk7XG5cdH1cblxuXHQkKCBEUkFHR0lOR19JVEVNX1NFTEVDVE9SICkuYWRkQ2xhc3MoIERST1BQQUJMRV9DTEFTUyApO1xufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5fb25Hcm91cERpZEVuZERyb3BPdmVyID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXHR2YXIgZ3JvdXBWaWV3ID0gZGF0YS5ncm91cFZpZXc7XG5cblx0Z3JvdXBWaWV3LnJlbW92ZVBsYWNlaG9sZGVycygpO1xuXHR0aGlzLmRyb3BwYWJsZUl0ZW1zLnNwbGljZSggdGhpcy5kcm9wcGFibGVJdGVtcy5pbmRleE9mKCBncm91cFZpZXcgKSwgMSApO1xuXG5cdCQoIERSQUdHSU5HX0lURU1fU0VMRUNUT1IgKS5yZW1vdmVDbGFzcyggRFJPUFBBQkxFX0NMQVNTICk7XG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLl9vbkdyb3VwRGlkRHJvcCA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblx0dmFyIGdyb3VwVmlldyA9IGRhdGEuZ3JvdXBWaWV3O1xuXG5cdC8vIERvbid0IGRvIGFueXRoaW5nIGlmIHRoaXMgZ3JvdXAgaXNuJ3QgdGhlIG1vc3QgcmVjZW50bHkgaG92ZXJlZCBvdmVyXG5cdC8vIG9mIGlmIHRoZXJlIGFyZSBjdXJyZW50bHkgbm8gaG92ZXJlZCBncm91cHMgKHdoaWNoIHNob3VsZCBuZXZlciBiZSB0aGUgY2FzZSlcblx0aWYgKCAhdGhpcy5kcm9wcGFibGVJdGVtcy5sZW5ndGggfHwgdGhpcy5kcm9wcGFibGVJdGVtc1sgdGhpcy5kcm9wcGFibGVJdGVtcy5sZW5ndGggLSAxIF0gIT09IGdyb3VwVmlldyApIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvLyBPdGhlcndpc2UsIGNsZWFyIGFsbCB0aGUgZ3JvdXAncyBwbGFjZWhvbGRlcnNcblx0Z3JvdXBWaWV3LnJlbW92ZVBsYWNlaG9sZGVycygpO1xuXG5cdC8vIEFuZCBmaW5hbGx5IHBvc2l0aW9uIHRoZSBuZXcgaXRlbSBpbiB0aGUgdGVtcGxhdGVcblx0dGhpcy5wb3NpdGlvbkRyb3BGb3JEcmFnRXZlbnRJblBhcmVudFdpdGhQbGFjZWhvbGRlciggZGF0YS5ldmVudCwgdGhpcy5kcm9wcGFibGVJdGVtc1sgdGhpcy5kcm9wcGFibGVJdGVtcy5sZW5ndGggLSAxIF0uJGdyb3VwICwgZmFsc2UgKVxuXG5cdC8vIEVtcHR5IHRoZSBkcm9wcGFibGUgaXRlbXMgYXJyYXlcblx0dGhpcy5kcm9wcGFibGVJdGVtcyA9IFtdO1xuXG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLmRpbWVuc2lvbnNGb3JWYWx1ZSA9IGZ1bmN0aW9uKCAkdmFsdWUsIGRyYWdUaHJlc2hvbGQsIGJ1ZmZlciApIHtcblx0dmFyIGRyYWdUaHJlc2hvbGRcdD0gZHJhZ1RocmVzaG9sZCB8fCAwLjUsXG5cdFx0YnVmZmVyIFx0XHRcdD0gYnVmZmVyIHx8IDAuMixcblx0XHRkaXJlY3Rpb24gXHRcdD0gJHZhbHVlLnBhcmVudCgpLmRhdGEoJ2ZsZXgtZGlyZWN0aW9uJykgfHwgJ3JvdycsXG5cdFx0YnVmZmVyWFx0XHRcdD0gZGlyZWN0aW9uID09PSAncm93JyA/IGJ1ZmZlciA6IDAsXG5cdFx0YnVmZmVyWVx0XHRcdD0gZGlyZWN0aW9uID09PSAnY29sdW1uJyA/IGJ1ZmZlciA6IDA7XG5cblx0cmV0dXJuIHtcblx0XHR0b3A6IFx0XHRcdCR2YWx1ZS5vZmZzZXQoKS50b3AsXG5cdFx0bGVmdDogXHRcdFx0JHZhbHVlLm9mZnNldCgpLmxlZnQsXG5cdFx0Ym90dG9tOiBcdFx0JHZhbHVlLm9mZnNldCgpLnRvcCArICR2YWx1ZS5oZWlnaHQoKSxcblx0XHRyaWdodDogXHRcdFx0JHZhbHVlLm9mZnNldCgpLmxlZnQgKyAkdmFsdWUud2lkdGgoKSxcblxuXHRcdG1pZGRsZVg6IFx0XHQkdmFsdWUub2Zmc2V0KCkubGVmdCArICggJHZhbHVlLndpZHRoKCkgLyAyICksXG5cdFx0bWlkZGxlWTogXHRcdCR2YWx1ZS5vZmZzZXQoKS50b3AgKyAoICR2YWx1ZS5oZWlnaHQoKSAvIDIgKSxcblxuXHRcdGRyYWdNaWRkbGVYOiBcdCR2YWx1ZS5vZmZzZXQoKS5sZWZ0ICsgKCAkdmFsdWUud2lkdGgoKSAqIGRyYWdUaHJlc2hvbGQgKSxcblx0XHRkcmFnTWlkZGxlWTogXHQkdmFsdWUub2Zmc2V0KCkudG9wICsgKCAkdmFsdWUuaGVpZ2h0KCkgKiBkcmFnVGhyZXNob2xkICksXG5cdFx0ZHJhZ01pZGRsZTogXHRkaXJlY3Rpb24gPT09ICdyb3cnID8gXHQkdmFsdWUub2Zmc2V0KCkubGVmdCArICggJHZhbHVlLndpZHRoKCkgKiBkcmFnVGhyZXNob2xkICkgOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0JHZhbHVlLm9mZnNldCgpLnRvcCArICggJHZhbHVlLmhlaWdodCgpICogZHJhZ1RocmVzaG9sZCApLFxuXG5cdFx0YnVmZmVyVG9wOiBcdFx0JHZhbHVlLm9mZnNldCgpLnRvcCArICggJHZhbHVlLmhlaWdodCgpICogYnVmZmVyWSApLFxuXHRcdGJ1ZmZlckxlZnQ6IFx0JHZhbHVlLm9mZnNldCgpLmxlZnQgKyAoICR2YWx1ZS53aWR0aCgpICogYnVmZmVyWCApLFxuXHRcdGJ1ZmZlckJvdHRvbTogXHQkdmFsdWUub2Zmc2V0KCkudG9wICsgJHZhbHVlLmhlaWdodCgpIC0gKCAkdmFsdWUuaGVpZ2h0KCkgKiBidWZmZXJZICksXG5cdFx0YnVmZmVyUmlnaHQ6IFx0JHZhbHVlLm9mZnNldCgpLmxlZnQgKyAkdmFsdWUud2lkdGgoKSAtICggJHZhbHVlLndpZHRoKCkgKiBidWZmZXJYIClcblx0fTtcbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuaXNJbnRlcnNlY3RlZCA9IGZ1bmN0aW9uKCB2YWx1ZXMsIGV2ZW50ICkge1xuXG5cdC8vIEFjY291bnQgZm9yIHRoZSBsYXlvdXQncyBzY3JvbGwgb2Zmc2V0LCB3aGljaCBjYW4gbWVzcyB1cCB0aGUgY2FsY3VsYXRpb25zXG5cdHZhciBzY3JvbGxPZmZzZXQgXHQ9IHBhcnNlSW50KCQuVmVsb2NpdHkuaG9vaygkKFwiI2xheW91dFwiKSwgXCJ0cmFuc2xhdGVZXCIpKSB8fCAwLFxuXHRcdGRyYWdPZmZzZXRYIFx0PSBldmVudC5jbGllbnRYLFxuXHRcdGRyYWdPZmZzZXRZXHRcdD0gZXZlbnQuY2xpZW50WTtcblxuXHRyZXR1cm4gXHR2YWx1ZXMuYnVmZmVyTGVmdCBcdFx0XHRcdFx0PD0gZHJhZ09mZnNldFggJiZcblx0XHRcdHZhbHVlcy5idWZmZXJSaWdodCBcdFx0XHRcdFx0Pj0gZHJhZ09mZnNldFggJiZcblx0XHRcdHZhbHVlcy5idWZmZXJUb3AgLSBzY3JvbGxPZmZzZXQgXHQ8PSBkcmFnT2Zmc2V0WSAmJlxuXHRcdFx0dmFsdWVzLmJ1ZmZlckJvdHRvbSAtIHNjcm9sbE9mZnNldCBcdD49IGRyYWdPZmZzZXRZO1xufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5pc1ByZXZpb3VzID0gZnVuY3Rpb24oIHZhbHVlcywgZHJhZ1BvaW50ICkge1xuXHRyZXR1cm4gZHJhZ1BvaW50ID49IHZhbHVlcy5kcmFnTWlkZGxlO1xufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS53cmFwVmFsdWVXaXRoR3JvdXAgPSBmdW5jdGlvbiggJHZhbHVlLCBwbGFjZWhvbGRlciApIHtcblx0XG5cdC8vIE1ha2Ugc3VyZSB0aGUgZ3JvdXAgaGFzIHRoZSBvcHBvc2l0ZSBkaXJlY3Rpb24gb2YgaXRzIHBhcmVudFxuXHR2YXIgZGlyZWN0aW9uIFx0PSAkdmFsdWUucGFyZW50KCkuZGF0YSgnZmxleC1kaXJlY3Rpb24nKSA9PT0gJ2NvbHVtbicgPyAncm93JyA6ICdjb2x1bW4nO1xuXHR2YXIgZ3JvdXAgXHRcdD0gbmV3IFRlbXBsYXRlR3JvdXBWaWV3KHtcblx0XHRwbGFjZWhvbGRlcjogcGxhY2Vob2xkZXIsXG5cdFx0bGF5b3V0OiBbe1xuXHRcdFx0cHJvcGVydHk6ICBcdCdmbGV4LWRpcmVjdGlvbicsXG5cdFx0XHR2YWx1ZTogXHRcdCBkaXJlY3Rpb25cblx0XHR9XVxuXHR9KTtcblxuXHR2YXIgJGdyb3VwID0gZ3JvdXAucmVuZGVyKCk7XG5cblx0Ly8gRmlyc3QgYWRkIHRoZSBncm91cCB0byB0aGUgRE9NIGJlZm9yZSB0aGUgdmFsdWVcblx0Ly8gYW5kIHRoZW4gbW92ZSB0aGUgdmFsdWUgaW50byB0aGUgZ3JvdXAuXG5cdC8vIFdlIGRvIHRoaXMgaW5zdGVhZCBvZiBqcXVlcnkncyB3cmFwIGJlY2F1c2Ugd3JhcCBpbnNlcnRzIGEgY2xvbmVcblx0Ly8gYW5kIHdlIG5lZWQgdGhlIHByZXZpb3VzbHkgcmVuZGVyZWQgb2JqZWN0IGl0c2VsZiBpbiB0aGUgRE9NLlxuXHQkZ3JvdXAuaW5zZXJ0QmVmb3JlKCAkdmFsdWUgKTtcblx0JGdyb3VwLmFwcGVuZCggJHZhbHVlICk7XG5cblx0Ly8gV3JhcCB0aGUgdmFsdWUgd2l0aCB0aGUgbmV3IGdyb3VwXG5cdC8vICR2YWx1ZS53cmFwKCAkZ3JvdXAgKTtcblx0Ly8gJGdyb3VwLmFwcGVuZCggJHZhbHVlICk7XG5cblx0aWYgKCAhcGxhY2Vob2xkZXIgKSB7XG5cdFx0VGVtcGxhdGVWaWV3Lmdyb3Vwcy5wdXNoKCBncm91cCApO1xuXHR9XG5cblx0XG5cdC8vIHJldHVybiAkdmFsdWUud3JhcCggJGdyb3VwICk7XG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLmluc2VydERyb3BCZWZvcmVFbGVtZW50SW5QYXJlbnRXaXRoUGxhY2Vob2xkZXIgPSBmdW5jdGlvbiggaXRlbSwgJHByZXZpb3VzLCAkcGFyZW50LCBwbGFjZWhvbGRlciApIHtcblxuXHQvLyBDcmVhdGUgYSBuZXcgdmFsdWUgdmlldyB3aXRoIHRoZSBhcHByb3ByaWF0ZSBwbGFjZWhvbGRlciBzdGF0dXNcblx0dmFyIHZhbHVlVmlldyBcdD0gbmV3IFRlbXBsYXRlVmFsdWVWaWV3KCBpdGVtLCBwbGFjZWhvbGRlciApLFxuXHRcdCR2YWx1ZSBcdFx0PSB2YWx1ZVZpZXcucmVuZGVyKCk7XG5cblx0Ly8gSWYgdGhlcmUgaXMgYSBwcmV2aW91cyBpdGVtLCBpbnNlcnQgdGhlIG5ldyBpdGVtIGp1c3QgYWZ0ZXIgaXRcblx0Ly8gT3RoZXJ3aXNlIGp1c3QgYWRkIHRoZSBpdGVtIHRvIHRoZSBwYXJlbnQgYXMgdGhlIGZpcnN0IGNoaWxkXG5cdGlmICggJHByZXZpb3VzICkge1xuXHRcdCRwcmV2aW91cy5hZnRlciggJHZhbHVlICk7XG5cdH0gZWxzZSB7XHRcblx0XHQkcGFyZW50LnByZXBlbmQoICR2YWx1ZSApO1xuXHR9XG5cblx0aWYgKCAhcGxhY2Vob2xkZXIgKSB7XG5cdFx0dGhpcy5fZW1pdENoYW5nZSgpO1xuXHR9IFxufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5wb3NpdGlvbkRyb3BGb3JEcmFnRXZlbnRJblBhcmVudFdpdGhQbGFjZWhvbGRlciA9IGZ1bmN0aW9uKCBldmVudCwgJHBhcmVudCwgcGxhY2Vob2xkZXIgKSB7XG5cdFx0XG5cdFx0Ly8gTWFrZSBzdXJlIHdlIGhhdmUgYSBwYXJlbnRcblx0XHRpZiAoICEkcGFyZW50ICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIFNldCB1cCBuZWNlc3NhcnkgdmFyaWFibGVzLiBUaGVuLFxuXHRcdC8vIEdldCBhbGwgdGhlIGl0ZW1zIGluIHRoZSBncm91cFxuXHRcdC8vIGFuZCBmaWx0ZXIgb3V0IHRoZSBwbGFjZWhvbGRlcnNcblx0XHQvLyBhbmQgdGhlIGRyYWdnaW5nIGl0ZW1cblx0XHR2YXIgZGltZW5zaW9ucyxcblx0XHRcdGRyYWdQb2ludCxcblx0XHRcdCRwcmV2aW91c0NoaWxkLFxuXHRcdFx0JGNoaWxkLFxuXHRcdFx0JGNoaWxkcmVuID0gJHBhcmVudC5jaGlsZHJlbigpXG5cdFx0XHRcdFx0XHQubm90KCcucGxhY2Vob2xkZXInKVxuXHRcdFx0XHRcdFx0Lm5vdCgnLmluYWN0aXZlJylcblx0XHRcdFx0XHRcdC5ub3QoJy51aS1kcmFnZ2FibGUtZHJhZ2dpbmcnKTtcblxuXHRcdC8vIElmIHRoZXJlIGFyZW4ndCBhbnkgY2hpbGRyZW4sXG5cdFx0Ly8ganVzdCBpbnNlcnQgdGhlIHBsYWNlaG9sZGVyIGF0IHRoZSBiZWdpbm5pbmdcblx0XHRpZiAoICEkY2hpbGRyZW4ubGVuZ3RoICkge1xuXHRcdFx0dGhpcy5pbnNlcnREcm9wQmVmb3JlRWxlbWVudEluUGFyZW50V2l0aFBsYWNlaG9sZGVyKCB0aGlzLmRyYWdnaW5nSXRlbSwgbnVsbCwgJHBhcmVudCwgcGxhY2Vob2xkZXIpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdCRjaGlsZHJlbi5lYWNoKGZ1bmN0aW9uKCBpLCBjaGlsZCApIHtcblx0XHRcdCRjaGlsZCA9ICQoIGNoaWxkICk7XG5cblx0XHRcdC8vIEFyZSB3ZSBpbnRlcnNlY3RpbmcgZGlyZWN0bHkgd2l0aCB0aGUgY2hpbGQ/XG5cdFx0XHRkaW1lbnNpb25zID0gdGhpcy5kaW1lbnNpb25zRm9yVmFsdWUoICRjaGlsZCApO1xuXHRcdFx0aWYgKCB0aGlzLmlzSW50ZXJzZWN0ZWQoIGRpbWVuc2lvbnMsIGV2ZW50ICkgKSB7XG5cdFx0XHRcdC8vIFJlc2V0IHRoZSBwcmV2aW91cyBjaGlsZFxuXHRcdFx0XHQkcHJldmlvdXNDaGlsZCA9IG51bGw7XG5cblx0XHRcdFx0Ly8gV3JhcCB0aGUgdHdvIGl0ZW1zIGluIGEgZ3JvdXBcblx0XHRcdFx0Ly8gYW5kIG1ha2UgdGhlIG5ldyBncm91cCB0aGUgbmV3IHBhcmVudFxuXHRcdFx0XHR0aGlzLndyYXBWYWx1ZVdpdGhHcm91cCggJGNoaWxkLCBwbGFjZWhvbGRlciApO1xuXHRcdFx0XHQkcGFyZW50ID0gJGNoaWxkLnBhcmVudCgpO1xuXG5cdFx0XHRcdC8vIERldGVybWluZSB3aGV0aGVyIHRoZSBuZXcgdmFsdWUgZ29lcyBmaXJzdCBvciBzZWNvbmQgaW4gdGhlIG5ldyBncm91cFxuXHRcdFx0XHQvLyB1c2luZyBuZXcgZGltZW5zaW9ucyBhcyBhIHJlc3VsdCBvZiB0aGUgbmV3IGdyb3VwXG5cdFx0XHRcdGRpbWVuc2lvbnMgPSB0aGlzLmRpbWVuc2lvbnNGb3JWYWx1ZSggJGNoaWxkICk7XG5cdFx0XHRcdGRyYWdQb2ludCA9ICRwYXJlbnQuZGF0YSgnZmxleC1kaXJlY3Rpb24nKSA9PSAnY29sdW1uJyA/IGV2ZW50LmNsaWVudFkgOiBldmVudC5jbGllbnRYO1xuXHRcdFx0XHRpZiAoIHRoaXMuaXNQcmV2aW91cyggZGltZW5zaW9ucywgZHJhZ1BvaW50KSApIHtcblx0XHRcdFx0XHQkcHJldmlvdXNDaGlsZCA9ICRjaGlsZDtcblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBQcmVwYXJlIGRpbWVuc2lvbnMgZm9yIGRldGVybWluaW5nIHdoaWNoIHZhbHVlcyBnb2VzIGZpcnN0IGluIHRoZSBncm91cFxuXHRcdFx0XHRkaW1lbnNpb25zID0gdGhpcy5kaW1lbnNpb25zRm9yVmFsdWUoICRjaGlsZCApO1xuXHRcdFx0XHRkcmFnUG9pbnQgPSAkcGFyZW50LmRhdGEoJ2ZsZXgtZGlyZWN0aW9uJykgPT0gJ2NvbHVtbicgPyBldmVudC5jbGllbnRZIDogZXZlbnQuY2xpZW50WDtcblx0XHRcdFx0aWYgKCB0aGlzLmlzUHJldmlvdXMoIGRpbWVuc2lvbnMsIGRyYWdQb2ludCkgKSB7XG5cdFx0XHRcdFx0JHByZXZpb3VzQ2hpbGQgPSAkY2hpbGQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdH0uYmluZCggdGhpcyApKTtcblxuXHRcdC8vIEFkZCB0aGUgbmV3IGl0ZW0gdG8gdGhlIG5ldyBncm91cFxuXHRcdHRoaXMuaW5zZXJ0RHJvcEJlZm9yZUVsZW1lbnRJblBhcmVudFdpdGhQbGFjZWhvbGRlciggdGhpcy5kcmFnZ2luZ0l0ZW0sICRwcmV2aW91c0NoaWxkLCAkcGFyZW50LCBwbGFjZWhvbGRlciApO1xuXHRcdFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBUZW1wbGF0ZVZpZXc7IiwidmFyIENvbHVtbnNFdmVudCA9IHJlcXVpcmUoJy4uL21vZGVscy9Db2x1bW5zRXZlbnQuanMnKTtcblxudmFyIE1BWF9ST1dTID0gMjAsXG5cdFVQTE9BRF9CVVRUT05fU0VMRUNUT1IgPSAnLmNvbHVtbnMtdXBsb2FkLWJ1dHRvbic7XG5cbmZ1bmN0aW9uIFVwbG9hZFZpZXcoKSB7XG5cdHRoaXMucGFyc2VkUm93cyA9IDA7XG59XG5cblVwbG9hZFZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKCkge1xuXG5cdHRoaXMuJHVwbG9hZCA9ICQoJyN1cGxvYWQnKTtcblxuXHR0aGlzLl9zZXR1cEV2ZW50TGlzdGVuZXJzKCk7XG5cdHJldHVybiB0aGlzLiR1cGxvYWQ7XG59O1xuXG5VcGxvYWRWaWV3LnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24oKSB7XG5cdHRoaXMuJHVwbG9hZC52ZWxvY2l0eSh7XG5cdFx0b3BhY2l0eTogMVxuXHR9LCB7XG5cdFx0ZHVyYXRpb246IDIwMCxcblx0XHRlYXNpbmc6ICdlYXNlLW91dCcsXG5cdFx0YmVnaW46IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy4kdXBsb2FkLmFkZENsYXNzKCdhbmltYXRpbmcnKTtcblx0XHR9LmJpbmQoIHRoaXMgKSxcblx0XHRjb21wbGV0ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLiR1cGxvYWQucmVtb3ZlQ2xhc3MoJ2FuaW1hdGluZycpO1xuXHRcdFx0dGhpcy4kdXBsb2FkLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHR9LmJpbmQoIHRoaXMgKVxuXHR9KTtcbn07XG5cblVwbG9hZFZpZXcucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbigpIHtcblx0dGhpcy4kdXBsb2FkLnZlbG9jaXR5KHtcblx0XHRvcGFjaXR5OiAwXG5cdH0sIHtcblx0XHRkdXJhdGlvbjogMjAwLFxuXHRcdGVhc2luZzogJ2Vhc2UtaW4nLFxuXHRcdGJlZ2luOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuJHVwbG9hZC5hZGRDbGFzcygnYW5pbWF0aW5nJyk7XG5cdFx0fS5iaW5kKCB0aGlzICksXG5cdFx0Y29tcGxldGU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy4kdXBsb2FkLnJlbW92ZUNsYXNzKCdhbmltYXRpbmcnKTtcblx0XHRcdHRoaXMuJHVwbG9hZC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0fS5iaW5kKCB0aGlzIClcblx0fSk7XG59O1xuXG5VcGxvYWRWaWV3LnByb3RvdHlwZS5fc2V0TG9hZGluZyA9IGZ1bmN0aW9uKCBsb2FkaW5nLCBtZXNzYWdlICkge1xuXHR2YXIgJGJ1dHRvbiA9IHRoaXMuJHVwbG9hZC5maW5kKCBVUExPQURfQlVUVE9OX1NFTEVDVE9SICk7XG5cblx0Ly8gU2V0IHRoZSBtZXNzYWdlXG5cdGlmICggbWVzc2FnZSAmJiB0eXBlb2YgbWVzc2FnZSA9PT0gJ3N0cmluZycgKSB7XG5cdFx0JGJ1dHRvbi50ZXh0KCBtZXNzYWdlICk7XG5cdH0gZWxzZSB7XG5cdFx0JGJ1dHRvbi50ZXh0KFwiVXBsb2FkIGEgLmNzdlwiKTtcblx0fVxuXG5cdC8vIFNldCB0aGUgbG9hZGluZyBzdGF0ZVxuXHRpZiAoIGxvYWRpbmcgKSB7XG5cdFx0dGhpcy4kdXBsb2FkLmFkZENsYXNzKCdsb2FkaW5nJyk7XG5cdFx0JGJ1dHRvbi5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMuJHVwbG9hZC5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xuXHRcdCRidXR0b24ucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG5cdH1cbn07XG5cblVwbG9hZFZpZXcucHJvdG90eXBlLl9zZXR1cEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gTGlzdGVuIGZvciBjbGlja3Mgb24gdGhlIHVwbG9hZCBidXR0b25cblx0dGhpcy4kdXBsb2FkLmZpbmQoIFVQTE9BRF9CVVRUT05fU0VMRUNUT1IgKS5vbiggJ2NsaWNrJywgdGhpcy5fb25VcGxvYWRDbGljay5iaW5kKCB0aGlzICkgKTtcblxuXHQvLyBMaXN0ZW4gZm9yIGZpbGUgY2hvaWNlcyBmcm9tIHRoZSBmaWxlIHBpY2tlclxuXHR0aGlzLiR1cGxvYWQuZmluZCgnaW5wdXRbdHlwZT1cImZpbGVcIl0nKS5vbiggJ2NoYW5nZScsIHRoaXMuX29uRmlsZUNob2ljZS5iaW5kKCB0aGlzICkgKTtcblxuXHQvLyBMaXN0ZW4gZm9yIHdpbmRvdyByZXNpemUgZXZlbnRzXG5cdCQod2luZG93KS5vbiggJ3Jlc2l6ZScsIHRoaXMuX29uV2luZG93UmVzaXplLmJpbmQoIHRoaXMgKSApO1xuXG5cdC8vIExpc3RlbiBmb3Igc3VjY2Vzc2Z1bCB0YWJsZSB1cGxvYWRzXG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuVGFibGUuRGlkVXBsb2FkV2l0aFN1Y2Nlc3MnLCB0aGlzLl9vblRhYmxlVXBsb2FkU3VjY2Vzcy5iaW5kKCB0aGlzICkgKTtcblxuXHQvLyBMaXN0ZW4gZm9yIGZhaWxlZCB0YWJsZSB1cGxvYWRzXG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuVGFibGUuRGlkVXBsb2FkV2l0aEZhaWx1cmUnLCB0aGlzLl9vblRhYmxlVXBsb2FkRmFpbC5iaW5kKCB0aGlzICkgKTtcbn07XG5cblVwbG9hZFZpZXcucHJvdG90eXBlLl9vblVwbG9hZENsaWNrID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuXG5cdC8vIFRyaWdnZXIgY2xpY2sgb24gZmlsZSBpbnB1dCBmaWVsZFxuXHR0aGlzLiR1cGxvYWQuZmluZCgnaW5wdXRbdHlwZT1cImZpbGVcIl0nKS50cmlnZ2VyKCdjbGljaycpO1xuXG5cdC8vIFRyYWNrIHRoaXMgY2xpY2tcblx0Ly8gZ2EoJ3NlbmQnLCAnZXZlbnQnLCAnYnV0dG9uJywgJ2NsaWNrJywgJ3VwbG9hZCcpO1xufTtcblxuVXBsb2FkVmlldy5wcm90b3R5cGUuX29uRmlsZUNob2ljZSA9IGZ1bmN0aW9uKCBldmVudCApIHtcblx0dmFyIGZpbGUgPSBldmVudC50YXJnZXQuZmlsZXNbIDAgXTtcblx0dGhpcy5fcGFyc2VGaWxlKCBmaWxlICk7XG5cblx0aWYgKCBmaWxlLm5hbWUgKSB7XG5cdFx0dGhpcy5fc2V0TG9hZGluZyggdHJ1ZSwgJ1VwbG9hZGluZyAnICsgZmlsZS5uYW1lICsgJy4uLicgKTtcblx0fSBlbHNlIHtcblx0XHR0aGlzLl9zZXRMb2FkaW5nKCB0cnVlLCAnVXBsb2FkaW5nIGZpbGUuLi4nICk7XG5cdH1cblxuXHQvLyBBbm5vdW5jZSBmaWxlIHVwbG9hZCBldmVudFxuXHQvLyBBbGVydCBhbnkgbGlzdGVuZXJzIHRoYXQgdGhlIGdyb3VwIGhhcyBjaGFuZ2VkXG5cdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoICdDb2x1bW5zLlVwbG9hZFZpZXcuRGlkQ2hvb3NlRmlsZScsIHtcblx0XHQvLyB1cGxvYWRWaWV3OiBcdHRoaXMsXG5cdFx0Ly8gZmlsZTogXHRcdFx0ZmlsZVxuXHQvLyB9KTtcblx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHQvLyBjb2x1bW5zRXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLlVwbG9hZFZpZXcuRGlkQ2hvb3NlRmlsZScsIGZhbHNlLCBmYWxzZSwge1xuXHQvLyBcdHVwbG9hZFZpZXc6IFx0dGhpcyxcblx0Ly8gXHRmaWxlOiBcdFx0XHRmaWxlXG5cdC8vIH0pO1xuXHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGNvbHVtbnNFdmVudCk7XG5cdENvbHVtbnNFdmVudC5zZW5kKCdDb2x1bW5zLlVwbG9hZFZpZXcuRGlkQ2hvb3NlRmlsZScsIHtcblx0XHR1cGxvYWRWaWV3OiBcdHRoaXMsXG5cdFx0ZmlsZTogXHRcdFx0ZmlsZVxuXHR9KTtcbn07XG5cblVwbG9hZFZpZXcucHJvdG90eXBlLl9vbldpbmRvd1Jlc2l6ZSA9IGZ1bmN0aW9uKCBldmVudCApIHtcblxufTtcblxuVXBsb2FkVmlldy5wcm90b3R5cGUuX29uVGFibGVVcGxvYWRTdWNjZXNzID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuXG5cdHRoaXMuX3NldExvYWRpbmcoIGZhbHNlICk7XG5cdHRoaXMuaGlkZSgpO1xufTtcblxuVXBsb2FkVmlldy5wcm90b3R5cGUuX29uVGFibGVVcGxvYWRGYWlsID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuXG5cdHRoaXMuX3NldExvYWRpbmcoIGZhbHNlLCBcIlNob290LCBzb21ldGhpbmcgd2VudCB3cm9uZy4gTWluZCB0cnlpbmcgYSBkaWZmZXJlbnQgLmNzdj9cIilcbn07XG5cblVwbG9hZFZpZXcucHJvdG90eXBlLl9wYXJzZUZpbGUgPSBmdW5jdGlvbiggZmlsZSApIHtcblx0UGFwYS5wYXJzZSggZmlsZSwge1xuXHRcdHN0ZXA6IGZ1bmN0aW9uKCByb3csIGhhbmRsZSApIHtcblx0XHRcdHRoaXMuX3BhcnNlUm93KCByb3csIGhhbmRsZSwgZmlsZS5uYW1lICk7XG5cdFx0fS5iaW5kKCB0aGlzICksXG5cdFx0Y29tcGxldGU6IGZ1bmN0aW9uKCByZXN1bHRzICkge1xuXHRcdFx0dGhpcy5fb25QYXJzZUNvbXBsZXRlKCByZXN1bHRzLCBmaWxlICk7XG5cdFx0fS5iaW5kKCB0aGlzIClcblx0fSk7XG59O1xuXG5VcGxvYWRWaWV3LnByb3RvdHlwZS5fcGFyc2VSb3cgPSBmdW5jdGlvbiggcm93LCBoYW5kbGUsIGZpbGVOYW1lICkge1xuXG5cdC8vIElmIHRoaXMgaXMgdGhlIGZpcnN0IHJvdywgdHJlYXQgaXQgYXMgYSBoZWFkZXJcblx0Ly8gYW5kIGNyZWF0ZSBjb2x1bW4gaXRlbXMgZnJvbSBpdHMgY29udGVudHNcblx0Ly9cblx0Ly8gSWYgaXQncyBub3QgdGhlIGZpcnN0IHJvdywgdHJlYXQgaXQgYXMgZGF0YVxuXHQvLyBhbmQgYWRkIGl0IHRvIG91ciBkYXRhIHNldFxuXHQvLyBcblx0Ly8gSWYgaXQncyBiZXlvbmQgdGhlIDIwdGggcm93LCBzdG9wIHRoZSBwYXJzaW5nXG5cdGlmICggdGhpcy5wYXJzZWRSb3dzID09PSAwICkge1xuXHRcdHRoaXMuX2NyZWF0ZUNvbHVtbkl0ZW1zKCByb3cuZGF0YVsgMCBdLCBmaWxlTmFtZSApO1xuXHR9IGVsc2UgaWYgKCB0aGlzLnBhcnNlZFJvd3MgPD0gTUFYX1JPV1MgKSB7XG5cdFx0dGhpcy5fY3JlYXRlUm93KCByb3cuZGF0YVsgMCBdLCBmaWxlTmFtZSApO1xuXHR9IGVsc2Uge1xuXHRcdGhhbmRsZS5hYm9ydCgpO1xuXHR9XG5cblx0Ly8gVXBkYXRlIHRoZSBwYXJzZWQgcm93cyBjb3VudFxuXHR0aGlzLnBhcnNlZFJvd3MrKztcbn07XG5cblVwbG9hZFZpZXcucHJvdG90eXBlLl9jcmVhdGVDb2x1bW5JdGVtcyA9IGZ1bmN0aW9uKCBkYXRhLCBmaWxlTmFtZSApIHtcblxuXHQvLyBBbm5vdW5jZSBjb2x1bW5zIHBhcnNpbmdcblx0Ly8gQWxlcnQgYW55IGxpc3RlbmVycyB0aGF0IHRoZSBncm91cCBoYXMgY2hhbmdlZFxuXHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCAnQ29sdW1ucy5VcGxvYWRWaWV3LkRpZFBhcnNlQ29sdW1uTmFtZXNGb3JGaWxlJywge1xuXHRcdC8vIHVwbG9hZFZpZXc6IFx0dGhpcyxcblx0XHQvLyBmaWxlTmFtZTogXHRcdGZpbGVOYW1lLFxuXHRcdC8vIGNvbHVtczogXHRcdGRhdGFcblx0Ly8gfSk7XG5cdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0Ly8gY29sdW1uc0V2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5VcGxvYWRWaWV3LkRpZFBhcnNlQ29sdW1uTmFtZXNGb3JGaWxlJywgZmFsc2UsIGZhbHNlLCB7XG5cdC8vIFx0dXBsb2FkVmlldzogXHR0aGlzLFxuXHQvLyBcdGZpbGVOYW1lOiBcdFx0ZmlsZU5hbWUsXG5cdC8vIFx0Y29sdW1uczogXHRcdGRhdGFcblx0Ly8gfSk7XG5cdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY29sdW1uc0V2ZW50KTtcblx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuVXBsb2FkVmlldy5EaWRQYXJzZUNvbHVtbk5hbWVzRm9yRmlsZScsIHtcblx0XHR1cGxvYWRWaWV3OiBcdHRoaXMsXG5cdFx0ZmlsZU5hbWU6IFx0XHRmaWxlTmFtZSxcblx0XHRjb2x1bW5zOiBcdFx0ZGF0YVxuXHR9KTtcbn07XG5cblVwbG9hZFZpZXcucHJvdG90eXBlLl9jcmVhdGVSb3cgPSBmdW5jdGlvbiggcm93LCBmaWxlTmFtZSApIHtcblxuXHQvLyBBbm5vdW5jZSByb3cgcGFyc2luZ1xuXHQvLyBBbGVydCBhbnkgbGlzdGVuZXJzIHRoYXQgdGhlIGdyb3VwIGhhcyBjaGFuZ2VkXG5cdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoICdDb2x1bW5zLlVwbG9hZFZpZXcuRGlkUGFyc2VEYXRhUm93Rm9yRmlsZScsIHtcblx0XHQvLyB1cGxvYWRWaWV3OiBcdHRoaXMsXG5cdFx0Ly8gZmlsZU5hbWU6IFx0XHRmaWxlTmFtZSxcblx0XHQvLyByb3c6IFx0XHRcdGRhdGFcblx0Ly8gfSk7XG5cdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0Ly8gY29sdW1uc0V2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5VcGxvYWRWaWV3LkRpZFBhcnNlRGF0YVJvd0ZvckZpbGUnLCBmYWxzZSwgZmFsc2UsIHtcblx0Ly8gXHR1cGxvYWRWaWV3OiBcdHRoaXMsXG5cdC8vIFx0ZmlsZU5hbWU6IFx0XHRmaWxlTmFtZSxcblx0Ly8gXHRyb3c6IFx0XHRcdHJvd1xuXHQvLyB9KTtcblx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjb2x1bW5zRXZlbnQpO1xuXHRDb2x1bW5zRXZlbnQuc2VuZCgnQ29sdW1ucy5VcGxvYWRWaWV3LkRpZFBhcnNlRGF0YVJvd0ZvckZpbGUnLCB7XG5cdFx0dXBsb2FkVmlldzogXHR0aGlzLFxuXHRcdGZpbGVOYW1lOiBcdFx0ZmlsZU5hbWUsXG5cdFx0cm93OiBcdFx0XHRyb3dcblx0fSk7XG59O1xuXG5VcGxvYWRWaWV3LnByb3RvdHlwZS5fb25QYXJzZUNvbXBsZXRlID0gZnVuY3Rpb24oIHJlc3VsdHMsIGZpbGUgKSB7XG5cblx0Ly8gQW5ub3VuY2UgcGFyc2luZyBjb21wbGV0ZVxuXHQvLyBBbGVydCBhbnkgbGlzdGVuZXJzIHRoYXQgdGhlIGdyb3VwIGhhcyBjaGFuZ2VkXG5cdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoICdDb2x1bW5zLlVwbG9hZFZpZXcuRGlkQ29tcGxldGVQYXJzZUZvckZpbGUnLCB7XG5cdFx0Ly8gdXBsb2FkVmlldzogXHRcdHRoaXMsXG5cdFx0Ly8gZmlsZU5hbWU6IFx0XHRmaWxlTmFtZVxuXHQvLyB9KTtcblx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHQvLyBjb2x1bW5zRXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLlVwbG9hZFZpZXcuRGlkQ29tcGxldGVQYXJzZUZvckZpbGUnLCBmYWxzZSwgZmFsc2UsIHtcblx0Ly8gXHR1cGxvYWRWaWV3OiBcdHRoaXMsXG5cdC8vIFx0ZmlsZTogXHRcdFx0ZmlsZVxuXHQvLyB9KTtcblx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjb2x1bW5zRXZlbnQpO1xuXHRDb2x1bW5zRXZlbnQuc2VuZCgnQ29sdW1ucy5VcGxvYWRWaWV3LkRpZENvbXBsZXRlUGFyc2VGb3JGaWxlJywge1xuXHRcdHVwbG9hZFZpZXc6IFx0dGhpcyxcblx0XHRmaWxlOiBcdFx0XHRmaWxlXG5cdH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBVcGxvYWRWaWV3O1xuIiwidmFyIFRhYmxlIFx0XHRcdFx0PSByZXF1aXJlKCcuL21vZGVscy9UYWJsZS5qcycpO1xudmFyIEl0ZW1WaWV3IFx0XHRcdD0gcmVxdWlyZSgnLi9jb250cm9sbGVycy9JdGVtc1ZpZXcuanMnKTtcbnZhciBUZW1wbGF0ZVZpZXcgXHRcdD0gcmVxdWlyZSgnLi9jb250cm9sbGVycy9UZW1wbGF0ZVZpZXcuanMnKTtcbnZhciBTdHlsZVZpZXcgXHRcdFx0PSByZXF1aXJlKCcuL2NvbnRyb2xsZXJzL1N0eWxlVmlldy5qcycpO1xudmFyIEVtYmVkRGV0YWlsc1ZpZXcgXHQ9IHJlcXVpcmUoJy4vY29udHJvbGxlcnMvRW1iZWREZXRhaWxzVmlldy5qcycpO1xudmFyIFVwbG9hZFZpZXcgXHRcdFx0PSByZXF1aXJlKCcuL2NvbnRyb2xsZXJzL1VwbG9hZFZpZXcuanMnKTtcblxuLy8gQ3JlYXRlIHRoZSBUYWJsZSBvYmplY3RcbnZhciB0YWJsZSA9IG5ldyBUYWJsZSgpO1xuXG4vLyBTZXQgdXAgdGhlIEl0ZW1zIFZpZXdcbnZhciBpdGVtcyA9IG5ldyBJdGVtc1ZpZXcoKTtcblxuLy8gU2V0IHVwIHRoZSBUZW1wbGF0ZVxudmFyIHRlbXBsYXRlID0gbmV3IFRlbXBsYXRlVmlldygpO1xuXG4vLyBTZXQgdXAgdGhlIFN0eWxlIFZpZXdcbnZhciBzdHlsZSA9IG5ldyBTdHlsZVZpZXcoKTtcblxuLy8gU2V0IHVwIHRoZSBFbWJlZCBQYW5lbFxudmFyIGVtYmVkID0gbmV3IEVtYmVkRGV0YWlsc1ZpZXcoKTtcblxuLy8gU2V0IHVwIHRoZSBVcGxvYWQgVmlld1xudmFyIHVwbG9hZCA9IG5ldyBVcGxvYWRWaWV3KCk7XG51cGxvYWQucmVuZGVyKCk7XG5cblxuXG4iLCJmdW5jdGlvbiBDb2x1bW5zRXZlbnQgKCkge1xuXG59XG5cbkNvbHVtbnNFdmVudC5zZW5kID0gZnVuY3Rpb24oIHR5cGUsIGRhdGEgKSB7XG5cdCQoZG9jdW1lbnQpLnRyaWdnZXIoIHR5cGUsIGRhdGEgKTtcbn07XG5cbkNvbHVtbnNFdmVudC5vbiA9IGZ1bmN0aW9uKCB0eXBlLCBjYWxsYmFjayApIHtcblx0JChkb2N1bWVudCkub24oIHR5cGUsIGNhbGxiYWNrICk7XG59O1xuXG5Db2x1bW5zRXZlbnQub2ZmID0gZnVuY3Rpb24oIHR5cGUsIGNhbGxiYWNrICkge1xuXHQkKGRvY3VtZW50KS5vZmYoIHR5cGUsIGNhbGxiYWNrICk7XG59O1xuXG5Db2x1bW5zRXZlbnQub2ZmQWxsID0gZnVuY3Rpb24oKSB7XG5cdCQoZG9jdW1lbnQpLm9mZigpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb2x1bW5zRXZlbnQ7IiwidmFyIENvbHVtbnNFdmVudCA9IHJlcXVpcmUoJy4vQ29sdW1uc0V2ZW50LmpzJyk7XG52YXIgU3R5bGUgXHRcdCA9IHJlcXVpcmUoJy4vU3R5bGUuanMnKTtcblxuLy8gSXRlbSBPYmplY3Rcbi8vIC0tLS0tLS0tLS0tLS1cbi8vIFVzZSB0aGlzIG1vZGVsIHRvIHN0b3JlIGEgY29sdW1uIEl0ZW1cbi8vIGFuZCBtYW5hZ2UgaXRzIHN0eWxlIGluZm9ybWF0aW9uXG5cbkl0ZW0gPSBmdW5jdGlvbiggcGFyYW1zICkge1xuXG5cdHRoaXMuaWQ7XG5cdHRoaXMudGl0bGU7XG5cdHRoaXMuc3R5bGU7XG5cdHRoaXMuYWN0aXZlID0gdHJ1ZTtcblxuXHRpZiAoIHBhcmFtcyApIHtcblx0XHQvLyB0aGlzLmlkIFx0PSBcblx0XHR0aGlzLnRpdGxlIFx0PSBwYXJhbXMudGl0bGUgfHwgJyc7XG5cdFx0dGhpcy5zdHlsZSBcdD0gbmV3IFN0eWxlKCBwYXJhbXMuc3R5bGUgKTtcblx0XHR0aGlzLmFjdGl2ZSA9IHBhcmFtcy5hY3RpdmUgPT09IGZhbHNlID8gZmFsc2UgOiB0cnVlO1xuXHR9XG5cblx0dGhpcy5fc2V0dXBFdmVudExpc3RlbmVycygpO1xufVxuXG5JdGVtLmZvcm1hdHRlZFRpdGxlID0gZnVuY3Rpb24oIHRpdGxlICkge1xuXHQvLyBSZXR1cm4gYSBsb3dlcmNhc2UgdmVyc2lvbiBvZiB0aGUgdGl0bGVcblx0Ly8gd2l0aCB1bmRlcnNjb3JlcyBpbnN0ZWFkIG9mIHNwYWNlc1xuXHRpZiAoICF0aXRsZSApIHtcblx0XHRyZXR1cm4gJ18nO1xuXHR9IGVsc2UgaWYgKCB0aXRsZSA9PT0gJ18nICkge1xuXHRcdHJldHVybiB0aXRsZTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gdGl0bGUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKCAvXy9nLCAnICcgKS5yZXBsYWNlKC9cXGIuL2csIGZ1bmN0aW9uKG0peyByZXR1cm4gbS50b1VwcGVyQ2FzZSgpOyB9KTtcblx0fVxufTtcblxuSXRlbS51bmZvcm1hdHRlZFRpdGxlID0gZnVuY3Rpb24oIHRpdGxlICkge1xuXHRpZiAoIXRpdGxlKSB7XG5cdFx0cmV0dXJuICdfJztcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gdGl0bGUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8gL2csICdfJyk7XG5cdH1cbn07XG5cbkl0ZW0ucHJvdG90eXBlLmZvcm1hdHRlZFRpdGxlID0gZnVuY3Rpb24oKSB7XG5cdC8vIFJldHVybiBhIGxvd2VyY2FzZSB2ZXJzaW9uIG9mIHRoZSB0aXRsZVxuXHQvLyB3aXRoIHVuZGVyc2NvcmVzIGluc3RlYWQgb2Ygc3BhY2VzXG5cdC8vIGlmICggIXRoaXMudGl0bGUgKSB7XG5cdC8vIFx0cmV0dXJuICdfJztcblx0Ly8gfSBlbHNlIGlmICggdGhpcy50aXRsZSA9PT0gJ18nICkge1xuXHQvLyBcdHJldHVybiB0aGlzLnRpdGxlO1xuXHQvLyB9IGVsc2Uge1xuXHQvLyBcdHJldHVybiB0aGlzLnRpdGxlLnRvTG93ZXJDYXNlKCkucmVwbGFjZSggL18vZywgJyAnICkucmVwbGFjZSgvXFxiLi9nLCBmdW5jdGlvbihtKXsgcmV0dXJuIG0udG9VcHBlckNhc2UoKTsgfSk7XG5cdC8vIH1cblx0cmV0dXJuIEl0ZW0uZm9ybWF0dGVkVGl0bGUoIHRoaXMudGl0bGUgKTtcbn07XG5cbkl0ZW0ucHJvdG90eXBlLnVuZm9ybWF0dGVkVGl0bGUgPSBmdW5jdGlvbigpIHtcblx0Ly8gUmV0dXJuIGEgbG93ZXJjYXNlIHZlcnNpb24gb2YgdGhlIHRpdGxlXG5cdC8vIHdpdGggdW5kZXJzY29yZXMgaW5zdGVhZCBvZiBzcGFjZXNcblx0Ly8gaWYgKCF0aGlzLnRpdGxlKSB7XG5cdC8vIFx0cmV0dXJuICdfJztcblx0Ly8gfSBlbHNlIHtcblx0Ly8gXHRyZXR1cm4gdGhpcy50aXRsZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLyAvZywgJ18nKTtcblx0Ly8gfVxuXHRyZXR1cm4gSXRlbS51bmZvcm1hdHRlZFRpdGxlKCB0aGlzLnRpdGxlICk7XG59O1xuXG4vLyBSZXR1cm4gdGhlIGNvcnJlY3Qgc3R5bGUgYXR0cmlidXRlIGZvciBhIGdpdmVuIHByb3BlcnR5XG4vLyBAcGFyYW0geyBzdHJpbmcgfSBwcm9wZXJ0eSAtLSB0aGUgcmVxdWVzdGVkIGxheW91dCBwcm9wZXJ0eVxuLy8gQHJldHVybiB7IHN0cmluZyB9IHRoZSBjb3JyZXNwb25kaW5nIHZhbHVlXG5JdGVtLnByb3RvdHlwZS5nZXRTdHlsZSA9IGZ1bmN0aW9uKCBwcm9wZXJ0eSApIHtcblx0dmFyIHZhbHVlO1xuXG5cdC8vIENoZWNrIHdoZXRoZXIgdGhpcyBpcyBhIGtub3duIHN0eWxlXG5cdGlmICggdGhpcy5zdHlsZSApIHtcblx0XHR2YWx1ZSA9IHRoaXMuc3R5bGUuZ2V0KCBwcm9wZXJ0eSApO1xuXHR9XG5cblx0cmV0dXJuIHZhbHVlO1xuXG5cdC8vIElmIG5vdCwgY2hlY2sgdGhlIGNzcyBmb3IgdGhlIGVsZW1lbnRcblx0Ly8gYW5kIHJldHVybiBpdHMgdmFsdWVcblx0Ly8gaWYgKCB2YWx1ZSApIHtcblx0Ly8gXHRyZXR1cm4gdmFsdWU7XG5cdC8vIH0gZWxzZSB7XG5cdC8vIFx0Ly8gVGhpcyBpcyBhIGhhY2shISFcblx0Ly8gXHRyZXR1cm4gdGhpcy4kZ3JvdXAuY3NzKCBwcm9wZXJ0eSApO1xuXHQvLyB9XG59O1xuXG5JdGVtLnByb3RvdHlwZS5pcyA9IGZ1bmN0aW9uKCBpdGVtICkge1xuXHRpZiAoIGl0ZW0gaW5zdGFuY2VvZiBJdGVtICkge1xuXHRcdHJldHVybiB0aGlzLnRpdGxlID09PSBpdGVtLnRpdGxlO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IFwiZXhjZXB0aW9uOiBDb21wYXJpc29uIG11c3QgYmUgd2l0aCBhbm90aGVyIEl0ZW1cIjtcblx0fVxufVxuXG5JdGVtLnByb3RvdHlwZS5fc2V0QWN0aXZlID0gZnVuY3Rpb24oIGFjdGl2ZSApIHtcblxuXHRpZiAoIHRoaXMuYWN0aXZlICE9PSBhY3RpdmUgKSB7XG5cdFx0dGhpcy5hY3RpdmUgPSBhY3RpdmU7XG5cdFx0dGhpcy5fZW1pdEFjdGl2ZVN0YXRlQ2hhbmdlKCk7XHRcdFxuXHR9XG5cdFxufTtcblxuSXRlbS5wcm90b3R5cGUuX3NldHVwRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBMaXN0ZW4gZm9yIHN0eWxlIGNoYW5nZXMgb24gdGhpcyBJdGVtXG5cdC8vICQoZG9jdW1lbnQpLm9uKCAnQ29sdW1ucy5TdHlsZVZpZXcuUHJvcGVydHlEaWRVcGRhdGVXaXRoVmFsdWVGb3JJdGVtJywgdGhpcywgZmFsc2UgKTtcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5TdHlsZVZpZXcuUHJvcGVydHlEaWRVcGRhdGVXaXRoVmFsdWVGb3JJdGVtJywgdGhpcy5fb25JdGVtU3R5bGVEaWRDaGFuZ2UuYmluZCggdGhpcyApICk7XG5cblx0Ly8gTGlzdGVuIGZvciB0ZW1wbGF0ZSB1cGRhdGUgZXZlbnRzXG5cdC8vICQoZG9jdW1lbnQpLm9uKCAnQ29sdW1ucy5UZW1wbGF0ZVZpZXcuRGlkQ2hhbmdlJywgdGhpcywgZmFsc2UgKTtcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5UZW1wbGF0ZVZpZXcuRGlkQ2hhbmdlJywgdGhpcy5fb25UZW1wbGF0ZUNoYW5nZS5iaW5kKCB0aGlzICkgKTtcbn07XG5cbkl0ZW0ucHJvdG90eXBlLl9vbkl0ZW1TdHlsZURpZENoYW5nZSA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblx0aWYgKCB0aGlzLmlzKCBkYXRhLml0ZW0gKSApIHtcblx0XHR0aGlzLnN0eWxlLnVwZGF0ZSggW3tcblx0XHRcdHByb3BlcnR5OiBkYXRhLnByb3BlcnR5LFxuXHRcdFx0dmFsdWU6IGRhdGEudmFsdWVcblx0XHR9XSApO1xuXHRcdHRoaXMuX2VtaXRDaGFuZ2UoKTtcblx0fVxufTtcblxuSXRlbS5wcm90b3R5cGUuX29uVGVtcGxhdGVDaGFuZ2UgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG5cblx0Ly8gQ2hlY2sgd2hldGhlciB0aGUgaXRlbSBleGlzdHMgaW4gdGhlIHRlbXBsYXRlXG5cdGlmICggVGVtcGxhdGVWaWV3LmdldFZhbHVlRm9ySXRlbSggdGhpcyApICkge1xuXHRcdHRoaXMuX3NldEFjdGl2ZSggZmFsc2UgKTtcblx0fSBlbHNlIHtcblx0XHR0aGlzLl9zZXRBY3RpdmUoIHRydWUgKTtcblx0fVxufTtcblxuSXRlbS5wcm90b3R5cGUuX2VtaXRDaGFuZ2UgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBBbGVydCBhbnkgbGlzdGVuZXJzIHRoYXQgdGhlIGdyb3VwIGhhcyBjaGFuZ2VkXG5cdC8vIHZhciBldmVudCA9IG5ldyBDdXN0b21FdmVudCggJ0NvbHVtbnMuSXRlbS5EaWRDaGFuZ2UnLCB7XG5cdC8vIFx0Z3JvdXBWaWV3OiBcdHRoaXNcblx0Ly8gfSk7XG5cdC8vIHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHQvLyBldmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuSXRlbS5EaWRDaGFuZ2UnLCBmYWxzZSwgZmFsc2UsIHtcblx0Ly8gXHRpdGVtOiBcdHRoaXNcblx0Ly8gfSk7XG5cdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuXHRDb2x1bW5zRXZlbnQuc2VuZCgnQ29sdW1ucy5JdGVtLkRpZENoYW5nZScsIHtcblx0XHRpdGVtOiBcdHRoaXNcblx0fSk7XG59O1xuXG5JdGVtLnByb3RvdHlwZS5fZW1pdEFjdGl2ZVN0YXRlQ2hhbmdlID0gZnVuY3Rpb24oKSB7XG5cblx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuSXRlbS5BY3RpdmVTdGF0ZURpZENoYW5nZScsIHtcblx0XHRpdGVtOiB0aGlzXG5cdH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJdGVtOyIsIi8vIExheW91dCBPYmplY3QgTWV0aG9kc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gVGhpcyBpcyB0aGUgbGF5b3V0IG9iamVjdCB0aGF0IGNvbnRyb2xzXG4vLyB0aGUgd2F5IHRoZSB0YWJsZSBpcyByZW5kZXJlZCBhbmQgc3R5bGVkLlxuLy8gVGhlIG1ldGhvZHMgYmVsb3cgYWxsb3cgdXMgdG86XG4vLyAxKSBUcmF2ZXJzZSB0aGUgdGVtcGxhdGUgYW5kIGNvbnN0cnVjdCBhIG5ldyBvYmplY3Rcbi8vIDIpIFVwZGF0ZSB0aGUgb2JqZWN0IHdoZW4gc3R5bGVzIGFyZSBhZGp1c3RlZFxuXG52YXIgQ29sdW1uc0V2ZW50IFx0PSByZXF1aXJlKCcuL0NvbHVtbnNFdmVudC5qcycpO1xudmFyIERFRkFVTFRTXHRcdD0gcmVxdWlyZSgnLi4vc3R5bGluZy9kZWZhdWx0cy5qcycpO1xuXG4vLyBDb2x1bW5zLkxheW91dCA9IG5ldyBmdW5jdGlvbigpIHtcbmZ1bmN0aW9uIExheW91dCggaXRlbXMgKSB7XG5cblx0Ly8gTWFrZSBzdXJlIGFsbCBpdGVtcyBhcmUgb2YgcmlnaHQgdHlwZVxuXHR0aGlzLml0ZW1zID0gW107XG5cdGlmICggaXRlbXMgKSB7XG5cdFx0aXRlbXMuZm9yRWFjaChmdW5jdGlvbiggaXRlbSwgaSApIHtcblx0XHRcdGlmICggaXRlbSBpbnN0YW5jZW9mIEl0ZW0gKSB7XG5cdFx0XHRcdHRoaXMuaXRlbXMucHVzaCggaXRlbSApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhyb3cgXCJleGNlcHRpb246IGFsbCBpdGVtcyBtdXN0IG9mIHR5cGUgSXRlbVwiO1xuXHRcdFx0fVxuXHRcdH0uYmluZCggdGhpcyApKTtcblx0fVxuXG5cdC8vIEJ1aWxkIGEgZGVmYXVsdCBsYXlvdXQgd2l0aCB0aGUgcGFzc2VkLWluIGl0ZW1zXG5cdHRoaXMubW9kZWwgPSB0aGlzLmRlZmF1bHRMYXlvdXQoIHRoaXMuaXRlbXMgKTtcblxuXHR0aGlzLl9zZXR1cEV2ZW50TGlzdGVuZXJzKCk7XG59XG5cbkxheW91dC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oKSB7XG5cdHZhciAkdGVtcGxhdGUgPSAkKCcubGF5b3V0LXRlbXBsYXRlLXJvdy1ncm91cCcpLmZpcnN0KCk7XG5cdHRoaXMubW9kZWwgPSB0aGlzLl9nZW5lcmF0ZU1vZGVsRm9yVGVtcGxhdGUoICR0ZW1wbGF0ZSApO1xuXHR0aGlzLl9lbWl0Q2hhbmdlKCk7XG59O1xuXG5MYXlvdXQucHJvdG90eXBlLl9nZW5lcmF0ZU1vZGVsRm9yVGVtcGxhdGUgPSBmdW5jdGlvbiggJHRlbXBsYXRlICkge1xuXHR2YXIgbW9kZWwgPSB7fSxcblx0XHRzdWJNb2RlbCxcblx0XHRpdGVtLFxuXHRcdGdyb3VwO1xuXG5cdC8vIFNraXAgaW5hY3RpdmUgaXRlbXNcblx0aWYgKCAkdGVtcGxhdGUuaGFzQ2xhc3MoJ2luYWN0aXZlJykgKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdFxuXHQvLyBJcyB0aGUgdGVtcGxhdGUgYSB2YWx1ZSBvciBhIGdyb3VwP1xuXHRpZiAoICR0ZW1wbGF0ZS5oYXNDbGFzcygnbGF5b3V0LXRlbXBsYXRlLXJvdy1ncm91cCcpICkge1xuXHRcdGdyb3VwID0gbmV3IFRlbXBsYXRlR3JvdXBWaWV3KHsgc3R5bGU6ICR0ZW1wbGF0ZS5hdHRyKCdzdHlsZScpIH0pXG5cblx0XHQvLyBTZXQgdGhlIG1vZGVsIHR5cGVcblx0XHRtb2RlbFsndHlwZSddID0gJ2dyb3VwJztcblxuXHRcdC8vIFNldCB0aGUgbW9kZWwgc3R5bGVcblx0XHRtb2RlbFsnc3R5bGUnXSA9IGdyb3VwLnN0eWxlLnN0eWxlcztcblxuXHRcdC8vIFNldCB0aGUgbW9kZWwgbGF5b3V0XG5cdFx0bW9kZWxbJ2xheW91dCddID0gVGVtcGxhdGVHcm91cFZpZXcubGF5b3V0Rm9yR3JvdXAoICR0ZW1wbGF0ZSApO1xuXG5cdFx0Ly8gR2V0IHRoZSBncm91cCdzIHZhbHVlc1xuXHRcdG1vZGVsWyd2YWx1ZXMnXSA9IFtdO1xuXHRcdCR0ZW1wbGF0ZS5jaGlsZHJlbigpLmVhY2goZnVuY3Rpb24oIGksIGNoaWxkICkge1xuXHRcdFx0c3ViTW9kZWwgPSB0aGlzLl9nZW5lcmF0ZU1vZGVsRm9yVGVtcGxhdGUoICQoIGNoaWxkICkgKTtcblx0XHRcdGlmICggc3ViTW9kZWwgKSB7XG5cdFx0XHRcdG1vZGVsLnZhbHVlcy5wdXNoKCBzdWJNb2RlbCApO1xuXHRcdFx0fVxuXHRcdH0uYmluZCggdGhpcyApICk7XG5cblx0fSBlbHNlIGlmICggJHRlbXBsYXRlLmhhc0NsYXNzKCdsYXlvdXQtdGVtcGxhdGUtcm93LXZhbHVlJykgKSB7XG5cdFx0Ly8gaXRlbSA9IG5ldyBJdGVtKHtcblx0XHQvLyBcdHRpdGxlOiAkdGVtcGxhdGUudGV4dCgpLnRyaW0oKSxcblx0XHQvLyBcdHN0eWxlOiAkdGVtcGxhdGUuYXR0cignc3R5bGUnKVxuXHRcdC8vIH0pO1xuXG5cdFx0Ly8gc3R5bGUgPSBuZXcgU3R5bGUoICR0ZW1wbGF0ZS5hdHRyKCdzdHlsZScpICkuc3R5bGVzO1xuXG5cdFx0Ly8gU2V0IHRoZSBtb2RlbCB0eXBlXG5cdFx0bW9kZWxbJ3R5cGUnXSA9ICdzaW5nbGUnO1xuXG5cdFx0Ly8gU2V0IHRoZSBtb2RlbCdzIHN0eWxlXG5cdFx0bW9kZWxbJ3N0eWxlJ10gPSBuZXcgU3R5bGUoICR0ZW1wbGF0ZS5hdHRyKCdzdHlsZScpICkuc3R5bGVzO1xuXG5cdFx0Ly8gU2V0IHRoZSB2YWx1ZSdzIGRhdGFcblx0XHRtb2RlbFsnZGF0YSddID0gSXRlbS51bmZvcm1hdHRlZFRpdGxlKCAkdGVtcGxhdGUudGV4dCgpLnRyaW0oKSApO1xuXHR9XG5cblx0cmV0dXJuIG1vZGVsO1xufTtcblxuTGF5b3V0LnByb3RvdHlwZS5fZW1pdENoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXHRDb2x1bW5zRXZlbnQuc2VuZCgnQ29sdW1ucy5MYXlvdXQuRGlkQ2hhbmdlJywge1xuXHRcdGxheW91dDogXHR0aGlzXG5cdH0pO1xufTtcblxuTGF5b3V0LnByb3RvdHlwZS5fc2V0dXBFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uKCkge1xuXG5cdC8vIExpc3RlbiB0byB0ZW1wbGF0ZSBjaGFuZ2UgZXZlbnRzXG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuVGVtcGxhdGVWaWV3LkRpZENoYW5nZScsIHRoaXMuX29uVGVtcGxhdGVWaWV3Q2hhbmdlLmJpbmQoIHRoaXMgKSApO1xufTtcblxuTGF5b3V0LnByb3RvdHlwZS5fb25UZW1wbGF0ZVZpZXdDaGFuZ2UgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdHRoaXMudXBkYXRlKCk7XG59O1xuXG4vLyBEZWZhdWx0IGxheW91dHMgZm9yIHZhcmlvdXMgY29sdW1uIG51bWJlcnNcbkxheW91dC5wcm90b3R5cGUuZGVmYXVsdExheW91dCA9IGZ1bmN0aW9uKCBpdGVtcyApIHtcblx0XG5cdC8vIFNldCB1cCB0aGUgZGVmYXVsdCBsYXlvdXRcblx0dmFyIGxheW91dCA9IHtcblx0XHR0eXBlOiAnZ3JvdXAnLFxuXHRcdHN0eWxlOiBbe1xuXHRcdFx0cHJvcGVydHk6ICdwYWRkaW5nJyxcblx0XHRcdHZhbHVlOiAnMTJweCdcblx0XHR9XSxcblx0XHR2YWx1ZXM6IFtdXG5cdH07XG5cblx0Ly8gQWRkIHRvIHRoZSBkZWZhdWx0IGxheW91dFxuXHQvLyBhY2NvcmRpbmcgdG8gdGhlIG51bWJlciBvZiBpdGVtc1xuXHRzd2l0Y2ggKCBpdGVtcy5sZW5ndGggKSB7XG5cdFx0Y2FzZSAwOlxuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAxOlxuXHRcdFx0bGF5b3V0Wyd2YWx1ZXMnXSA9IFt7XG5cdFx0XHRcdHR5cGU6ICdzaW5nbGUnLFxuXHRcdFx0XHRzdHlsZTogREVGQVVMVFMuc3R5bGVzWyAwIF0sXG5cdFx0XHRcdGRhdGE6IGl0ZW1zWyAwIF0udW5mb3JtYXR0ZWRUaXRsZSgpXG5cdFx0XHR9XTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMjpcblx0XHRcdGxheW91dFsndmFsdWVzJ10gPSBbe1xuXHRcdFx0XHR0eXBlOiAnZ3JvdXAnLFxuXHRcdFx0XHRsYXlvdXQ6IERFRkFVTFRTLmxheW91dHNbIDAgXSxcblx0XHRcdFx0dmFsdWVzOiBbe1xuXHRcdFx0XHRcdHR5cGU6ICdzaW5nbGUnLFxuXHRcdFx0XHRcdHN0eWxlOiBERUZBVUxUUy5zdHlsZXNbIDAgXSxcblx0XHRcdFx0XHRkYXRhOiBpdGVtc1sgMCBdLnVuZm9ybWF0dGVkVGl0bGUoKVxuXHRcdFx0XHR9LHtcblx0XHRcdFx0XHR0eXBlOiAnc2luZ2xlJyxcblx0XHRcdFx0XHRzdHlsZTogREVGQVVMVFMuc3R5bGVzWyAxIF0sXG5cdFx0XHRcdFx0ZGF0YTogaXRlbXNbIDEgXS51bmZvcm1hdHRlZFRpdGxlKClcblx0XHRcdFx0fV1cblx0XHRcdH1dO1xuXHRcdFx0YnJlYWs7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdGxheW91dFsndmFsdWVzJ10gPSBbe1xuXHRcdFx0XHR0eXBlOiAnZ3JvdXAnLFxuXHRcdFx0XHRsYXlvdXQ6IERFRkFVTFRTLmxheW91dHNbIDAgXSxcblx0XHRcdFx0dmFsdWVzOiBbe1xuXHRcdFx0XHRcdHR5cGU6ICdzaW5nbGUnLFxuXHRcdFx0XHRcdHN0eWxlOiBERUZBVUxUUy5zdHlsZXNbIDAgXSxcblx0XHRcdFx0XHRkYXRhOiBpdGVtc1sgMCBdLnVuZm9ybWF0dGVkVGl0bGUoKVxuXHRcdFx0XHR9LHtcblx0XHRcdFx0XHR0eXBlOiAnc2luZ2xlJyxcblx0XHRcdFx0XHRzdHlsZTogREVGQVVMVFMuc3R5bGVzWyAxIF0sXG5cdFx0XHRcdFx0ZGF0YTogaXRlbXNbIDEgXS51bmZvcm1hdHRlZFRpdGxlKClcblx0XHRcdFx0fV1cblx0XHRcdH0sIHtcblx0XHRcdFx0dHlwZTogJ3NpbmdsZScsXG5cdFx0XHRcdHN0eWxlOiBERUZBVUxUUy5zdHlsZXNbIDIgXSxcblx0XHRcdFx0ZGF0YTogaXRlbXNbIDIgXS51bmZvcm1hdHRlZFRpdGxlKClcblx0XHRcdH1dO1xuXHRcdFx0YnJlYWs7XG5cdH1cblx0cmV0dXJuIGxheW91dDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTGF5b3V0OyIsInZhciBDb2x1bW5zRXZlbnQgPSByZXF1aXJlKCcuL0NvbHVtbnNFdmVudC5qcycpO1xuXG4vLyBTdHlsZSBPYmplY3Rcbi8vIC0tLS0tLS0tLS0tLS1cbi8vIFVzZSB0aGlzIG1vZGVsIHRvIGhhbmRsZSBzdHlsaW5nIGluZm9ybWF0aW9uLlxuXG5TdHlsZSA9IGZ1bmN0aW9uKCBzdHlsZXMgKSB7XG5cblx0Ly8gQWNjZXB0IGVpdGhlciBhbiBhcnJheSBvZiBtdWx0aXBsZSBzdHlsZXNcblx0Ly8gb3IganVzdCBhIHNpbmdsZSBzdHlsZSBvYmplY3Rcblx0aWYgKCBBcnJheS5pc0FycmF5KCBzdHlsZXMgKSApIHtcblx0XHR0aGlzLnN0eWxlcyA9IHN0eWxlcztcblx0fSBlbHNlIGlmICggdHlwZW9mIHN0eWxlcyA9PT0gJ29iamVjdCcgKSB7XG5cdFx0dGhpcy5zdHlsZXMgPSBbIHN0eWxlcyBdO1xuXHR9IGVsc2UgaWYgKCB0eXBlb2Ygc3R5bGVzID09PSAnc3RyaW5nJykge1xuXHRcdHRoaXMuc3R5bGVzID0gdGhpcy5fcGFyc2VDU1MoIHN0eWxlcyApO1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMuc3R5bGVzID0gW107XG5cdH1cbn07XG5cblN0eWxlLnBhcnNlQ1NTID0gZnVuY3Rpb24oIGNzcyApIHtcblxuXHQvLyBBY2NlcHQgYSBDU1Mgc3RyaW5nXG5cdC8vIGFuZCBjb252ZXJ0IGl0IGludG8gYW4gYXJyYXkgb2YgY3NzIHByb3BlcnRpZXMgYW5kIHZhbHVlc1xuXHRpZiAoIHR5cGVvZiBjc3MgIT09ICdzdHJpbmcnICkgdGhyb3cgXCJleGNlcHRpb246IENTUyBtdXN0IGJlIGluIHN0cmluZyBmb3JtYXRcIjtcblxuXHR2YXIgc3R5bGVPYmogPSBbXTtcblxuXHQvLyBSZW1vdmUgYWxsIHNwYWNlc1xuXHRjc3MgPSBjc3MucmVwbGFjZSgvIC9nLCAnJyk7XG5cdC8vIFJlbW92ZSB0aGUgbGFzdCBzZW1pY29sb25cblx0Y3NzID0gY3NzLnNsaWNlKDAsIC0xKTtcblx0Ly8gU3BsaXQgc3R5bGVzXG5cdHN0eWxlcyA9IGNzcy5zcGxpdCgnOycpO1xuXHQvLyBDcmVhdCBvYmplY3QgZm9yIGVhY2ggc3R5bGVcblx0c3R5bGVzLmZvckVhY2goZnVuY3Rpb24oc3R5bGUsIGkpIHtcblx0XHRzdHlsZSA9IHN0eWxlLnNwbGl0KCc6Jyk7XG5cdFx0c3R5bGVPYmoucHVzaCh7XG5cdFx0XHRwcm9wZXJ0eTogc3R5bGVbMF0sXG5cdFx0XHR2YWx1ZTogc3R5bGVbMV1cblx0XHR9KTtcblx0fSk7XG5cdHJldHVybiBzdHlsZU9iajtcbn07XG5cblN0eWxlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiggc3R5bGVzICkge1xuXHR2YXIgbmV3U3R5bGVzID0gW107XG5cblx0Ly8gQWNjZXB0IGEgc3RyaW5nLCBhcnJheSwgb3Igb2JqZWN0IG9mIHN0eWxlc1xuXHQvLyBhbmQgZXh0ZW5kIHRoZSBjdXJyZW50IHN0eWxlcyBvYmplY3Qgd2l0aCBpdHMgdmFsdWVzXG5cdGlmICggdHlwZW9mIHN0eWxlcyA9PT0gJ3N0cmluZycgKSB7XG5cdFx0bmV3U3R5bGVzID0gdGhpcy5fcGFyc2VDU1MoIHN0eWxlcyApO1xuXHR9IGVsc2UgaWYgKCBBcnJheS5pc0FycmF5ICggc3R5bGVzICkgKSB7XG5cdFx0bmV3U3R5bGVzID0gc3R5bGVzO1xuXHR9IGVsc2UgaWYgKCB0eXBlb2Ygc3R5bGVzID09PSAnb2JqZWN0JyApIHtcblx0XHRuZXdTdHlsZXMucHVzaChzdHlsZXMpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IFwiZXhjZXB0aW9uOiBDU1MgbXVzdCBiZSBhIHN0cmluZywgYXJyYXkgb3Igb2JqZWN0XCI7XG5cdH1cblxuXHQvLyBOb3cgY29tcGxldGUgdGhlIG1lcmdlXG5cdHRoaXMuX21lcmdlQ1NTKCBuZXdTdHlsZXMgKTtcbn07XG5cblN0eWxlLnByb3RvdHlwZS5jc3MgPSBmdW5jdGlvbigpIHtcblx0dmFyIGNzcyA9ICcnO1xuXHR0aGlzLnN0eWxlcy5mb3JFYWNoKGZ1bmN0aW9uKCBzdHlsZSwgaSApIHtcblx0XHRjc3MgKz0gc3R5bGUucHJvcGVydHkgKyAnOicgKyBzdHlsZS52YWx1ZSArICc7Jztcblx0fSk7XG5cdHJldHVybiBjc3M7XG59O1xuXG4vLyBSZXR1cm4gdGhlIHN0eWxlIHZhbHVlIGZvciBhIGdpdmVuIHByb3BlcnR5XG4vLyBAcGFyYW0geyBzdHJpbmcgfSBwcm9wZXJ0eVxuLy8gQHJldHVybiB7IHN0cmluZyB9IHZhbHVlXG5TdHlsZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24oIHByb3BlcnR5ICkge1xuXHR2YXIgdmFsdWU7XG5cblx0Ly8gTG9vcCB0aHJvdWdoIGVhY2ggcHJvcGVydHkgdW50aWwgd2UgZmluZCBhIG1hdGNoXG5cdHRoaXMuc3R5bGVzLmZvckVhY2goZnVuY3Rpb24oIHN0eWxlLCBpICkge1xuXHRcdGlmICggc3R5bGUucHJvcGVydHkgPT09IHByb3BlcnR5ICkge1xuXHRcdFx0dmFsdWUgPSBzdHlsZS52YWx1ZVxuXHRcdH1cblx0fSk7XG5cblx0cmV0dXJuIHZhbHVlO1xufTtcblxuU3R5bGUucHJvdG90eXBlLl9wYXJzZUNTUyA9IGZ1bmN0aW9uKCBjc3MgKSB7XG5cblx0cmV0dXJuIFN0eWxlLnBhcnNlQ1NTKCBjc3MgKTtcdFxufTtcblxuU3R5bGUucHJvdG90eXBlLl9tZXJnZUNTUyA9IGZ1bmN0aW9uKCBjc3MgKSB7XG5cdC8vIEFjY2VwdCBhbiBhcnJheSBvZiBjc3Mgc3R5bGUgb2JqZWN0c1xuXHRpZiAoICFBcnJheS5pc0FycmF5KCBjc3MgKSApIHRocm93IFwiZXhjZXB0aW9uOiBDU1MgbXVzdCBiZSBhbiBhcnJheVwiO1xuXG5cdHZhciBuZXdTdHlsZXMgPSBjc3MubWFwKGZ1bmN0aW9uKCBzdHlsZSApIHsgcmV0dXJuIHN0eWxlOyB9KSxcblx0XHRvbGRJbmRleCxcblx0XHRvbGRJbmRpY2VzID0gdGhpcy5zdHlsZXMubGVuZ3RoO1xuXG5cdC8vIExvb3AgdGhyb3VnaCB0aGUgb2xkIHByb3BlcnRpZXNcblx0Ly8gY29tcGFyaW5nIGVhY2ggd2l0aCBhbGwgdGhlIG5ldyBwcm9wZXJ0aWVzLlxuXHQvLyBSZXBsYWNlIGFuIGV4aXN0aW5nIHByb3BlcnR5IGFueXRpbWUgYSBuZXcgb25lIG1hdGNoZXMgaXRcblx0Ly8gYW5kIHRoZW4gcmVtb3ZlIHRoYXQgbmV3IHByb3BlcnR5IGZyb20gdGhlIGFycmF5LlxuXHQvLyBBdCB0aGUgZW5kLCBhcHBlbmQgYW55IHJlbWFpbmluZyBuZXcgcHJvcGVydGllcyB0byB0aGUgbWVyZ2VkIHN0eWxlcyBhcnJheS5cblx0Y3NzLmZvckVhY2goZnVuY3Rpb24oIG5ld1N0eWxlLCBuZXdJbmRleCApIHtcblx0XHRmb3IgKCBvbGRJbmRleCA9IDAgOyBvbGRJbmRleCA8IG9sZEluZGljZXMgOyBvbGRJbmRleCsrICkge1xuXHRcdFx0aWYgKCB0aGlzLnN0eWxlc1sgb2xkSW5kZXggXS5wcm9wZXJ0eSA9PSBuZXdTdHlsZS5wcm9wZXJ0eSApIHtcblx0XHRcdFx0dGhpcy5zdHlsZXNbIG9sZEluZGV4IF0gPSBuZXdTdHlsZTtcblx0XHRcdFx0bmV3U3R5bGVzLnNwbGljZSggbmV3U3R5bGVzLmluZGV4T2YoIG5ld1N0eWxlICksIDEgKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdH0uYmluZCggdGhpcyApKTtcblxuXHQvLyBBZGQgYWxsIHJlbWFpbmluZyBuZXcgc3R5bGVzIHRvIHRoZSBzdHlsZXMgYXJyYXlcblx0dGhpcy5zdHlsZXMgPSB0aGlzLnN0eWxlcy5jb25jYXQoIG5ld1N0eWxlcyApO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTdHlsZTsiLCJ2YXIgQ29sdW1uc0V2ZW50IFx0PSByZXF1aXJlKCcuL0NvbHVtbnNFdmVudC5qcycpO1xudmFyIExheW91dCBcdFx0XHQ9IHJlcXVpcmUoJy4vTGF5b3V0LmpzJyk7XG52YXIgSXRlbSBcdFx0XHQ9IHJlcXVpcmUoJy4vSXRlbS5qcycpO1xudmFyIGNvbmZpZyBcdFx0XHQ9IHJlcXVpcmUoJy4uL2NvbmZpZy5qcycpO1xudmFyIERFRkFVTFRTXHRcdD0gcmVxdWlyZSgnLi4vc3R5bGluZy9kZWZhdWx0cy5qcycpO1xuXG5mdW5jdGlvbiBUYWJsZSggcHJvcHMgKSAge1xuXG5cdHRoaXMuZGF0YSA9IFtdO1xuXHR0aGlzLnRpdGxlID0gJyc7XG5cdHRoaXMuc291cmNlID0gJyc7XG5cdHRoaXMuc291cmNlX3VybCA9ICcnO1xuXHR0aGlzLmNvbHVtbnMgPSBbXTtcblx0dGhpcy5sYXlvdXQ7XG5cdHRoaXMuaWQ7XG5cblx0dGhpcy5fdXBkYXRlKCBwcm9wcyApO1xuXHR0aGlzLl9zZXR1cEV2ZW50TGlzdGVuZXJzKCk7XG59XG5cblRhYmxlLnByb3RvdHlwZS5fdXBkYXRlID0gZnVuY3Rpb24oIHByb3BzICkge1xuXG5cdGlmICggcHJvcHMgKSB7XG5cdFx0dGhpcy5kYXRhID0gcHJvcHMuZGF0YSB8fCB0aGlzLmRhdGE7XG5cdFx0dGhpcy50aXRsZSA9IHByb3BzLnRpdGxlIHx8IHRoaXMudGl0bGU7XG5cdFx0dGhpcy5zb3VyY2UgPSBwcm9wcy5zb3VyY2UgfHwgdGhpcy5zb3VyY2U7XG5cdFx0dGhpcy5zb3VyY2VfdXJsID0gcHJvcHMuc291cmNlX3VybCB8fCB0aGlzLnNvdXJjZV91cmw7XG5cdFx0dGhpcy5pZCA9IHByb3BzLmlkIHx8IHRoaXMuaWQ7XG5cblx0XHRpZiAoIHByb3BzLmNvbHVtbnMgKSB7XHRcblx0XHRcdHRoaXMuY29sdW1ucyA9IHRoaXMuaXRlbXNGcm9tQ29sdW1uTmFtZXMoIHByb3BzLmNvbHVtbnMgKTtcblx0XHR9XG5cblx0XHRpZiAoIHByb3BzLmxheW91dCApIHtcblx0XHRcdHRoaXMubGF5b3V0ID0gcHJvcHMubGF5b3V0O1xuXHRcdH0gZWxzZSBpZiAoICF0aGlzLmxheW91dCApIHtcblx0XHRcdHRoaXMubGF5b3V0ID0gbmV3IExheW91dCggdGhpcy5jb2x1bW5zICk7XG5cdFx0fVxuXG5cdFx0Ly8gTGV0IGV2ZXJ5b25lIGtub3cgdGhhdCB3ZSd2ZSB1cGRhdGVkIHRoZSB0YWJsZVxuXHRcdHRoaXMuX2VtaXRDaGFuZ2UoKTtcblx0fVxufTtcblxuVGFibGUucHJvdG90eXBlLl9lbWl0Q2hhbmdlID0gZnVuY3Rpb24oKSB7XG5cdC8vIExldCBldmVyeW9uZSBrbm93IHRoYXQgdGhlIHRhYmxlIGhhcyBiZWVuIHVwbG9hZGVkIHN1Y2Nlc3NmdWxseVxuXHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdC8vIGNvbHVtbnNFdmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuVGFibGUuRGlkQ2hhbmdlJywgZmFsc2UsIGZhbHNlLCB7XG5cdC8vIFx0dGFibGU6IFx0dGhpc1xuXHQvLyB9KTtcblx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjb2x1bW5zRXZlbnQpO1xuXHRDb2x1bW5zRXZlbnQuc2VuZCgnQ29sdW1ucy5UYWJsZS5EaWRDaGFuZ2UnLCB7XG5cdFx0dGFibGU6IFx0dGhpc1xuXHR9KTtcbn07XG5cblRhYmxlLnByb3RvdHlwZS5fZW1pdFVwbG9hZFN1Y2Nlc3MgPSBmdW5jdGlvbigpIHtcblx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHQvLyBjb2x1bW5zRXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLlRhYmxlLkRpZFVwbG9hZFdpdGhTdWNjZXNzJywgZmFsc2UsIGZhbHNlLCB7XG5cdC8vIFx0dGFibGU6IFx0dGhpc1xuXHQvLyB9KTtcblx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjb2x1bW5zRXZlbnQpO1xuXHRDb2x1bW5zRXZlbnQuc2VuZCgnQ29sdW1ucy5UYWJsZS5EaWRVcGxvYWRXaXRoU3VjY2VzcycsIHtcblx0XHR0YWJsZTogXHR0aGlzXG5cdH0pO1xufTtcblxuVGFibGUucHJvdG90eXBlLl9lbWl0VXBsb2FkRmFpbCA9IGZ1bmN0aW9uKCkge1xuXHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdC8vIGNvbHVtbnNFdmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuVGFibGUuRGlkVXBsb2FkV2l0aEZhaWx1cmUnLCBmYWxzZSwgZmFsc2UsIHtcblx0Ly8gXHR0YWJsZTogXHR0aGlzXG5cdC8vIH0pO1xuXHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGNvbHVtbnNFdmVudCk7XG5cdENvbHVtbnNFdmVudC5zZW5kKCdDb2x1bW5zLlRhYmxlLkRpZFVwbG9hZFdpdGhGYWlsdXJlJywge1xuXHRcdHRhYmxlOiBcdHRoaXNcblx0fSk7XG59O1xuXG5UYWJsZS5wcm90b3R5cGUuX2VtaXRVcGRhdGVTdWNjZXNzID0gZnVuY3Rpb24oKSB7XG5cdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0Ly8gY29sdW1uc0V2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5UYWJsZS5EaWRVcGRhdGVXaXRoU3VjY2VzcycsIGZhbHNlLCBmYWxzZSwge1xuXHQvLyBcdHRhYmxlOiBcdHRoaXNcblx0Ly8gfSk7XG5cdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY29sdW1uc0V2ZW50KTtcblx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuVGFibGUuRGlkVXBkYXRlV2l0aFN1Y2Nlc3MnLCB7XG5cdFx0dGFibGU6IFx0dGhpc1xuXHR9KTtcbn07XG5cblRhYmxlLnByb3RvdHlwZS5fZW1pdFVwZGF0ZUZhaWwgPSBmdW5jdGlvbigpIHtcblx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHQvLyBjb2x1bW5zRXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLlRhYmxlLkRpZFVwZGF0ZVdpdGhGYWlsdXJlJywgZmFsc2UsIGZhbHNlLCB7XG5cdC8vIFx0dGFibGU6IFx0dGhpc1xuXHQvLyB9KTtcblx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjb2x1bW5zRXZlbnQpO1xuXHRDb2x1bW5zRXZlbnQuc2VuZCgnQ29sdW1ucy5UYWJsZS5EaWRVcGRhdGVXaXRoRmFpbHVyZScsIHtcblx0XHR0YWJsZTogXHR0aGlzXG5cdH0pO1xufTtcblxuLy8gUmV0dXJuIGFuIGl0ZW0gZ2l2ZW4gYSBkYXRhIGNvbHVtbiBuYW1lXG4vLyBAcGFyYW0ge3N0cmluZ30gZGF0YSAtLSB0aGUgdW5mb3JtYXR0ZWQgY29sdW1uIHRpdGxlIHRvIHNlYXJjaCBhZ2FpbnN0ICgnZmlyc3RfbmFtZScpXG4vLyBAcmV0dXJuIHtJdGVtfSAtLSB0aGUgbWF0Y2hpbmcgaXRlbVxuVGFibGUucHJvdG90eXBlLmdldEl0ZW1Gb3JEYXRhID0gZnVuY3Rpb24oIGRhdGEgKSB7XG5cdHZhciBpdGVtO1xuXG5cdGlmICggZGF0YSAmJiB0aGlzLmNvbHVtbnMgJiYgdGhpcy5jb2x1bW5zLmxlbmd0aCApIHtcblx0XHRpdGVtID0gdGhpcy5jb2x1bW5zLmZpbHRlcihmdW5jdGlvbiggY29sdW1uICkge1xuXHRcdFx0cmV0dXJuIGRhdGEgPT09IGNvbHVtbi51bmZvcm1hdHRlZFRpdGxlKCk7XG5cdFx0fS5iaW5kKCB0aGlzICkpWyAwIF07XG5cdH1cblxuXHRyZXR1cm4gaXRlbTtcbn07XG5cblRhYmxlLnByb3RvdHlwZS5pdGVtc0Zyb21Db2x1bW5OYW1lcyA9IGZ1bmN0aW9uKCBjb2x1bW5OYW1lcyApIHtcblxuXHRpZiAoIHR5cGVvZiBjb2x1bW5OYW1lcyA9PT0gJ3N0cmluZycgKSB7XG5cdFx0Y29sdW1uTmFtZXMgPSBbIGNvbHVtbk5hbWVzIF07XG5cdH1cblxuXHRpZiggY29sdW1uTmFtZXMgaW5zdGFuY2VvZiBJdGVtICkge1xuXHRcdGNvbHVtbk5hbWVzID0gWyBjb2x1bW5OYW1lcyBdO1xuXHR9XG5cblx0aWYoICFBcnJheS5pc0FycmF5KCBjb2x1bW5OYW1lcyApICkge1xuXHRcdHRocm93IFwiZXhjZXB0aW9uOiBDb2x1bW4gbmFtZXMgbXVzdCBiZSBhIHN0cmluZyBvciBhbiBhcnJheSBvZiBzdHJpbmdzXCI7XG5cdH1cblxuXHRyZXR1cm4gY29sdW1uTmFtZXMubWFwKGZ1bmN0aW9uKCBjb2x1bW5OYW1lLCBpICkge1xuXHRcdC8vIHZhciBpdGVtO1xuXG5cdFx0Ly8gaWYgKCBjb2x1bW5OYW1lIGluc3RhbmNlb2YgSXRlbSApIHtcblx0XHQvLyBcdHJldHVybiBjb2x1bW5OYW1lO1xuXHRcdC8vIH0gZWxzZSB7XG5cdFx0Ly8gXHRpdGVtID0gbmV3IEl0ZW0oe1xuXHRcdC8vIFx0XHR0aXRsZTogY29sdW1uTmFtZSxcblx0XHQvLyBcdFx0c3R5bGU6IERFRkFVTFRTLnN0eWxlc1sgaSBdO1xuXHRcdC8vIFx0fSlcblx0XHQvLyB9XG5cdFx0cmV0dXJuIGNvbHVtbk5hbWUgaW5zdGFuY2VvZiBJdGVtID8gY29sdW1uTmFtZSA6IG5ldyBJdGVtKHsgdGl0bGU6IGNvbHVtbk5hbWUsIHN0eWxlOiBERUZBVUxUUy5zdHlsZXNbIGkgXSB9KTtcblx0fSk7XG59XG5cblRhYmxlLnByb3RvdHlwZS5fdXBsb2FkRmlsZSA9IGZ1bmN0aW9uKCBmaWxlICkge1xuXHR2YXIgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcblxuXHQvLyBBZGQgYW55IHRhYmxlIG1ldGEtZGF0YSB0byB0aGUgZm9ybVxuXHRmb3JtRGF0YS5hcHBlbmQoIFwiZGF0YVwiLCBmaWxlICk7XG5cdGZvcm1EYXRhLmFwcGVuZCggXCJ0aXRsZVwiLCB0aGlzLnRpdGxlICk7XG5cdGZvcm1EYXRhLmFwcGVuZCggXCJzb3VyY2VcIiwgdGhpcy5zb3VyY2UgKTtcblx0Zm9ybURhdGEuYXBwZW5kKCBcInNvdXJjZV91cmxcIiwgdGhpcy5zb3VyY2VfdXJsICk7XG5cdGZvcm1EYXRhLmFwcGVuZCggXCJjb2x1bW5zXCIsIHRoaXMuc3RyaW5nRnJvbUNvbHVtbnMoIHRoaXMuY29sdW1ucyApICk7XG5cdC8vIGZvcm1EYXRhLmFwcGVuZCggXCJsYXlvdXRcIiwgSlNPTi5zdHJpbmdpZnkoIHRoaXMubGF5b3V0Lm1vZGVsICkgKTtcblxuXHQvLyB0aGlzLl9vblVwbG9hZFN1Y2Nlc3MoIHtcblx0Ly8gXHRzdGF0dXM6ICdzdWNjZXNzJyxcblx0Ly8gXHRkYXRhOiB7XG5cdC8vIFx0XHR0YWJsZV9pZDogMVxuXHQvLyBcdH1cblx0Ly8gfSk7XG5cblx0JC5hamF4KHtcbiAgICAgICAgdXJsOiBjb25maWcuYXBpLmhvc3QgKyAnL2NvbHVtbnMvdGFibGUnLCAgLy9TZXJ2ZXIgc2NyaXB0IHRvIHByb2Nlc3MgZGF0YVxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcbiAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxuICAgICAgICBkYXRhOiBmb3JtRGF0YSxcbiAgICAgICAgc3VjY2VzczogdGhpcy5fb25VcGxvYWRTdWNjZXNzLmJpbmQoIHRoaXMgKVxuICAgIH0pO1xufTtcblxuVGFibGUucHJvdG90eXBlLl91cGRhdGVUYWJsZSA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgZGF0YSA9IHtcblx0XHR0aXRsZTogdGhpcy50aXRsZSxcblx0XHRzb3VyY2U6IHRoaXMuc291cmNlLFxuXHRcdHNvdXJjZV91cmw6IHRoaXMuc291cmNlX3VybCxcblx0XHRsYXlvdXQ6IEpTT04uc3RyaW5naWZ5KCB0aGlzLmxheW91dC5tb2RlbCApLFxuXHRcdGNvbHVtbnM6IHRoaXMuc3RyaW5nRnJvbUNvbHVtbnMoIHRoaXMuY29sdW1ucyApXG5cdH07XG5cdCQucG9zdChjb25maWcuYXBpLmhvc3QgKyAnL2NvbHVtbnMvdGFibGUvJyArIHRoaXMuaWQsIGRhdGEsIHRoaXMuX29uVXBkYXRlU3VjY2Vzcy5iaW5kKCB0aGlzICkgKTtcbn07XG5cblRhYmxlLnByb3RvdHlwZS5fc2V0dXBFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uKCkge1xuXG5cdC8vIExpc3RlbiBmb3IgY29sdW1uIG5hbWVzIHBhcnNpbmdcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5VcGxvYWRWaWV3LkRpZFBhcnNlQ29sdW1uTmFtZXNGb3JGaWxlJywgdGhpcy5fb25Db2x1bW5OYW1lc1BhcnNlZC5iaW5kKCB0aGlzICkpO1xuXG5cdC8vIExpc3RlbiBmb3Igcm93IGRhdGEgcGFyc2luZ1xuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLlVwbG9hZFZpZXcuRGlkUGFyc2VEYXRhUm93Rm9yRmlsZScsIHRoaXMuX29uUm93UGFyc2VkLmJpbmQoIHRoaXMgKSApO1x0XG5cblx0Ly8gTGlzdGVuIGZvciBwYXJzaW5nIGNvbXBsZXRpb25cblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5VcGxvYWRWaWV3LkRpZENvbXBsZXRlUGFyc2VGb3JGaWxlJywgdGhpcy5fb25QYXJzZUNvbXBsZXRlLmJpbmQoIHRoaXMgKSApO1xuXG5cdC8vIExpc3RlbiBmb3IgdXBkYXRlcyBmcm9tIHRoZSBkZXRhaWxzIHBhbmVsXG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuRW1iZWREZXRhaWxzVmlldy5EaWRVcGRhdGVQcm9wZXJ0eVdpdGhWYWx1ZScsIHRoaXMuX29uVGFibGVVcGRhdGUuYmluZCggdGhpcyApICk7XG5cblx0Ly8gTGlzdGVuIGZvciBsYXlvdXQgdXBkYXRlc1xuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLkxheW91dC5EaWRDaGFuZ2UnLCB0aGlzLl9vbkxheW91dFVwZGF0ZS5iaW5kKCB0aGlzICkgKTtcblxufTtcblxuVGFibGUucHJvdG90eXBlLl9vbkNvbHVtbk5hbWVzUGFyc2VkID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXG5cdHRoaXMuY29sdW1ucyA9IHRoaXMuaXRlbXNGcm9tQ29sdW1uTmFtZXMoIGRhdGEuY29sdW1ucyApO1xufTtcblxuVGFibGUucHJvdG90eXBlLl9vblJvd1BhcnNlZCA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblx0dmFyIHJvdyA9IGRhdGEucm93LFxuXHRcdGRhdGEgPSB7fTtcblxuXHRyb3cuZm9yRWFjaChmdW5jdGlvbiggdmFsdWUsIGkgKSB7XG5cdFx0ZGF0YVsgdGhpcy5jb2x1bW5zWyBpIF0udW5mb3JtYXR0ZWRUaXRsZSgpIF0gPSB2YWx1ZTtcblx0fS5iaW5kKCB0aGlzICkpO1xuXG5cdHRoaXMuZGF0YS5wdXNoKCBkYXRhICk7XG59O1xuXG5UYWJsZS5wcm90b3R5cGUuX29uUGFyc2VDb21wbGV0ZSA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblxuXHR0aGlzLl91cGxvYWRGaWxlKCBkYXRhLmZpbGUgKTtcbn07XG5cblRhYmxlLnByb3RvdHlwZS5fb25VcGxvYWRTdWNjZXNzID0gZnVuY3Rpb24oIGRhdGEsIHN0YXR1cywgcmVxdWVzdCApIHtcblxuXHQvLyBDaGVjayBmb3IgYSBzZXJ2ZXItc2lkZSBlcnJvclxuXHRpZiAoIGRhdGEuc3RhdHVzICE9PSAnc3VjY2VzcycgKSB7XG5cdFx0dGhpcy5fb25VcGxvYWRGYWlsKCByZXF1ZXN0LCBzdGF0dXMsIGRhdGEubWVzc2FnZSApO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vIFNldCB0aGUgVGFibGUgSURcblx0dGhpcy5fdXBkYXRlKHtcblx0XHRpZDogZGF0YS5kYXRhLnRhYmxlX2lkXG5cdH0pO1xuXG5cdHRoaXMuX2VtaXRVcGxvYWRTdWNjZXNzKCk7XG59O1xuXG5UYWJsZS5wcm90b3R5cGUuX29uVXBsb2FkRmFpbCA9IGZ1bmN0aW9uKCByZXF1ZXN0LCBzdGF0dXMsIGVycm9yICkge1xuXG5cdHRoaXMuX2VtaXRVcGxvYWRGYWlsKCk7XG59O1xuXG5UYWJsZS5wcm90b3R5cGUuX29uVXBkYXRlU3VjY2VzcyA9IGZ1bmN0aW9uKCBkYXRhLCBzdGF0dXMsIHJlcXVlc3QgKSB7XG5cblx0Ly8gQ2hlY2sgZm9yIGEgc2VydmVyLXNpZGUgZXJyb3Jcblx0aWYgKCBkYXRhLnN0YXR1cyAhPT0gJ3N1Y2Nlc3MnICkge1xuXHRcdHRoaXMuX2VtaXRVcGRhdGVGYWlsKCk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0dGhpcy5fZW1pdFVwZGF0ZVN1Y2Nlc3MoKTtcbn07XG5cblRhYmxlLnByb3RvdHlwZS5fb25UYWJsZVVwZGF0ZSA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblx0dmFyIHByb3BzID0ge307XG5cblx0cHJvcHNbIGRhdGEucHJvcGVydHkgXSA9IGRhdGEudmFsdWU7XG5cblx0dGhpcy5fdXBkYXRlKCBwcm9wcyApO1xuXHR0aGlzLl91cGRhdGVUYWJsZSgpO1xufTtcblxuVGFibGUucHJvdG90eXBlLl9vbkxheW91dFVwZGF0ZSA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblx0dGhpcy5fdXBkYXRlKHtcblx0XHRsYXlvdXQ6IGRhdGEubGF5b3V0XG5cdH0pO1xuXHR0aGlzLl91cGRhdGVUYWJsZSgpO1xufTtcblxuVGFibGUucHJvdG90eXBlLnN0cmluZ0Zyb21Db2x1bW5zID0gZnVuY3Rpb24oIGNvbHVtbnMgKSB7XG5cblx0cmV0dXJuIGNvbHVtbnMubWFwKGZ1bmN0aW9uKCBjb2x1bW4sIGkgKSB7XG5cdFx0cmV0dXJuIGNvbHVtbi50aXRsZTtcblx0fSkuam9pbigpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBUYWJsZTsiLCIvLyBXZSBuZWVkIHRvIHRyZWF0IGxheW91dCBwcm9wZXJ0aWVzIHNsaWdodGx5IGRpZmZlcmVudGx5IHRoYW4gcmVndWxhciBjc3MgcHJvcGVydGllc1xuLy8gdG8gYWNjb3VudCBmb3IgYnJvd3Nlci1zcGVjaWZpYyBwcmVmaXhlc1xubW9kdWxlLmV4cG9ydHMgPSB7XG5cdHN0eWxlczogW1xuXHRcdFt7XG5cdFx0XHRwcm9wZXJ0eTogJ2NvbG9yJyxcblx0XHRcdHZhbHVlOiAnIzNhM2EzYSdcblx0XHR9XSxcblx0XHRbe1xuXHRcdFx0cHJvcGVydHk6ICdjb2xvcicsXG5cdFx0XHR2YWx1ZTogJyM4ODgnXG5cdFx0fSx7XG5cdFx0XHRwcm9wZXJ0eTogJ2ZvbnQtc2l6ZScsXG5cdFx0XHR2YWx1ZTogJzE0cHgnXG5cdFx0fSwge1xuXHRcdFx0cHJvcGVydHk6ICdtYXJnaW4tdG9wJyxcblx0XHRcdHZhbHVlOiAnNHB4J1xuXHRcdH1dLFxuXHRcdFt7XG5cdFx0XHRwcm9wZXJ0eTogJ2NvbG9yJyxcblx0XHRcdHZhbHVlOiAnIzNhM2EzYSdcblx0XHR9LHtcblx0XHRcdHByb3BlcnR5OiAnZm9udC1zaXplJyxcblx0XHRcdHZhbHVlOiAnMjRweCdcblx0XHR9XVx0XG5cdF0sXG5cdGxheW91dHM6IFtcblx0XHRbe1xuXHRcdFx0cHJvcGVydHk6ICdmbGV4LWRpcmVjdGlvbicsXG5cdFx0XHR2YWx1ZTogJ2NvbHVtbidcblx0XHR9LCB7XG5cdFx0XHRwcm9wZXJ0eTogJ2FsaWduLWl0ZW1zJyxcblx0XHRcdHZhbHVlOiAnZmxleC1zdGFydCdcblx0XHR9XVxuXHRdXG59OyJdfQ==
