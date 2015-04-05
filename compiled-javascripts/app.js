(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
var ColumnsEvent 			= require('../models/ColumnsEvent.js');
var config 					= require('../../compiled-javascripts/config.js');

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


},{"../../compiled-javascripts/config.js":1,"../models/ColumnsEvent.js":16}],4:[function(require,module,exports){
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

},{"../../compiled-javascripts/styling/compiled-data.js":2,"../models/ColumnsEvent.js":16,"./StyleComponentView.js":6,"./TemplateGroupView.js":11,"./TemplateValueView.js":12}],11:[function(require,module,exports){
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
var config 						= require('../../compiled-javascripts/config.js');

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
},{"../../compiled-javascripts/config.js":1,"../models/ColumnsEvent.js":16,"./TemplateGroupView.js":11,"./TemplateValueView.js":12}],14:[function(require,module,exports){
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
var config 			= require('../../compiled-javascripts/config.js');
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
},{"../../compiled-javascripts/config.js":1,"../styling/defaults.js":21,"./ColumnsEvent.js":16,"./Item.js":17,"./Layout.js":18}],21:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb21waWxlZC1qYXZhc2NyaXB0cy9jb25maWcuanMiLCJjb21waWxlZC1qYXZhc2NyaXB0cy9zdHlsaW5nL2NvbXBpbGVkLWRhdGEuanMiLCJqYXZhc2NyaXB0cy9jb250cm9sbGVycy9FbWJlZERldGFpbHNWaWV3LmpzIiwiamF2YXNjcmlwdHMvY29udHJvbGxlcnMvSXRlbVZpZXcuanMiLCJqYXZhc2NyaXB0cy9jb250cm9sbGVycy9JdGVtc1ZpZXcuanMiLCJqYXZhc2NyaXB0cy9jb250cm9sbGVycy9TdHlsZUNvbXBvbmVudFZpZXcuanMiLCJqYXZhc2NyaXB0cy9jb250cm9sbGVycy9TdHlsZUlucHV0Vmlldy5qcyIsImphdmFzY3JpcHRzL2NvbnRyb2xsZXJzL1N0eWxlTXVsdGlwbGVTZWdtZW50ZWRCdXR0b25WaWV3LmpzIiwiamF2YXNjcmlwdHMvY29udHJvbGxlcnMvU3R5bGVTZWdtZW50ZWRCdXR0b25WaWV3LmpzIiwiamF2YXNjcmlwdHMvY29udHJvbGxlcnMvU3R5bGVWaWV3LmpzIiwiamF2YXNjcmlwdHMvY29udHJvbGxlcnMvVGVtcGxhdGVHcm91cFZpZXcuanMiLCJqYXZhc2NyaXB0cy9jb250cm9sbGVycy9UZW1wbGF0ZVZhbHVlVmlldy5qcyIsImphdmFzY3JpcHRzL2NvbnRyb2xsZXJzL1RlbXBsYXRlVmlldy5qcyIsImphdmFzY3JpcHRzL2NvbnRyb2xsZXJzL1VwbG9hZFZpZXcuanMiLCJqYXZhc2NyaXB0cy9tYWluLmpzIiwiamF2YXNjcmlwdHMvbW9kZWxzL0NvbHVtbnNFdmVudC5qcyIsImphdmFzY3JpcHRzL21vZGVscy9JdGVtLmpzIiwiamF2YXNjcmlwdHMvbW9kZWxzL0xheW91dC5qcyIsImphdmFzY3JpcHRzL21vZGVscy9TdHlsZS5qcyIsImphdmFzY3JpcHRzL21vZGVscy9UYWJsZS5qcyIsImphdmFzY3JpcHRzL3N0eWxpbmcvZGVmYXVsdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaE1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDektBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9RQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25LQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdFJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgZW52ID0gJ2RldmVsb3BtZW50Jztcbm1vZHVsZS5leHBvcnRzID0ge1xuXHRkZXZlbG9wbWVudDoge1xuXHRcdGFwaToge1xuXHRcdFx0aG9zdDogJ2h0dHA6Ly8xMjcuMC4wLjE6ODA4MCdcblx0XHR9LFxuXHRcdHdlYjoge1xuXHRcdFx0aG9zdDogJ2h0dHA6Ly8xMjcuMC4wLjEnXG5cdFx0fSxcblx0XHRlbWJlZDoge1xuXHRcdFx0aG9zdDogJ2h0dHA6Ly8xMjcuMC4wLjEnLFxuXHRcdFx0cGF0aDogJy9wdWJsaWMvZW1iZWQtdGFibGUuanMnXG5cdFx0fVxuXHR9LCBcblx0cHJvZHVjdGlvbjoge1xuXHRcdGFwaToge1xuXHRcdFx0aG9zdDogJ2h0dHA6Ly9hcGkudGhlY29sdW1uc3Byb2plY3QuY29tJ1xuXHRcdH0sXG5cdFx0d2ViOiB7XG5cdFx0XHRob3N0OiAnaHR0cDovL2FwcC50aGVjb2x1bW5zcHJvamVjdC5jb20nXG5cdFx0fSxcblx0XHRlbWJlZDoge1xuXHRcdFx0aG9zdDogJ2h0dHA6Ly9jb2x1bS5ueicsXG5cdFx0XHRwYXRoOiAnL3B1YmxpYy9lbWJlZC10YWJsZS5qcydcblx0XHR9XG5cdH1cbn1bZW52XTsiLCJDb2x1bW5zWydzdHlsZURhdGEnXSA9IHtcblx0Y29tcG9uZW50czoge30sXG5cdHR5cGVzOiB7fVxufTtcbkNvbHVtbnMuc3R5bGVEYXRhLmNvbXBvbmVudHNbJ2l0ZW1zJ10gPSB7XG5cdHRpdGxlOiAnSXRlbXMnLFxuXHRyb3dzOiBbe1xuXHRcdGl0ZW1zOiBbe1xuXHRcdFx0a2luZDogJ3NlZ21lbnRlZC1idXR0b24nLFxuXHRcdFx0bGFiZWw6ICdMYXlvdXQnLFxuXHRcdFx0cHJvcGVydHk6IHtcblx0XHRcdFx0bmFtZTonZmxleC1kaXJlY3Rpb24nXG5cdFx0XHR9LFxuXHRcdFx0YnV0dG9uczogW3tcblx0XHRcdFx0dmFsdWU6ICdyb3cnLFxuXHRcdFx0XHRpY29uOiAnbGF5b3V0LWhvcml6b250YWwnXG5cdFx0XHR9LCB7XG5cdFx0XHRcdHZhbHVlOiAnY29sdW1uJyxcblx0XHRcdFx0aWNvbjogJ2xheW91dC12ZXJ0aWNhbCdcblx0XHRcdH1dXG5cdFx0fSwge1xuXHRcdFx0a2luZDogJ3NlZ21lbnRlZC1idXR0b24nLFxuXHRcdFx0bGFiZWw6ICdBbGlnbm1lbnQnLFxuXHRcdFx0cHJvcGVydHk6IHtcblx0XHRcdFx0bmFtZTonYWxpZ24taXRlbXMnXG5cdFx0XHR9LFxuXHRcdFx0YnV0dG9uczogW3tcblx0XHRcdFx0dmFsdWU6ICdmbGV4LXN0YXJ0Jyxcblx0XHRcdFx0aWNvbjogJ3Bvc2l0aW9uLWxlZnQnXG5cdFx0XHR9LCB7XG5cdFx0XHRcdHZhbHVlOiAnY2VudGVyJyxcblx0XHRcdFx0aWNvbjogJ3Bvc2l0aW9uLWNlbnRlcidcblx0XHRcdH0sIHtcblx0XHRcdFx0dmFsdWU6ICdmbGV4LWVuZCcsXG5cdFx0XHRcdGljb246ICdwb3NpdGlvbi1yaWdodCdcblx0XHRcdH1dXG5cdFx0fV1cblx0fV1cbn1cbkNvbHVtbnMuc3R5bGVEYXRhLmNvbXBvbmVudHNbJ21hcmdpbnMnXSA9IHtcblx0dGl0bGU6ICdTcGFjaW5nJyxcblx0cm93czogW3tcblx0XHRpdGVtczogW3tcblx0XHRcdGtpbmQ6ICdpbnB1dCcsXG5cdFx0XHR0eXBlOiAndGVsJyxcblx0XHRcdGNhbkJlTmVnYXRpdmU6IHRydWUsXG5cdFx0XHRwcmVwZW5kSWNvbjogJ21hcmdpbi10b3AnLFxuXHRcdFx0YXBwZW5kQ29udHJvbHM6IHRydWUsXG5cdFx0XHRsYWJlbDogJ1RvcCcsXG5cdFx0XHRwcm9wZXJ0eTogJ21hcmdpbi10b3AnLFxuXHRcdFx0ZGVmYXVsdDogJzBweCdcblx0XHR9LCB7XG5cdFx0XHRraW5kOiAnaW5wdXQnLFxuXHRcdFx0dHlwZTogJ3RlbCcsXG5cdFx0XHRjYW5CZU5lZ2F0aXZlOiB0cnVlLFxuXHRcdFx0cHJlcGVuZEljb246ICdtYXJnaW4tYm90dG9tJyxcblx0XHRcdGFwcGVuZENvbnRyb2xzOiB0cnVlLFxuXHRcdFx0bGFiZWw6ICdCb3R0b20nLFxuXHRcdFx0cHJvcGVydHk6ICdtYXJnaW4tYm90dG9tJyxcblx0XHRcdGRlZmF1bHQ6ICcwcHgnXG5cdFx0fV1cblx0fSwge1xuXHRcdGl0ZW1zOiBbe1xuXHRcdFx0a2luZDogJ2lucHV0Jyxcblx0XHRcdHR5cGU6ICd0ZWwnLFxuXHRcdFx0Y2FuQmVOZWdhdGl2ZTogdHJ1ZSxcblx0XHRcdHByZXBlbmRJY29uOiAnbWFyZ2luLWxlZnQnLFxuXHRcdFx0YXBwZW5kQ29udHJvbHM6IHRydWUsXG5cdFx0XHRsYWJlbDogJ0xlZnQnLFxuXHRcdFx0cHJvcGVydHk6ICdtYXJnaW4tbGVmdCcsXG5cdFx0XHRkZWZhdWx0OiAnMHB4J1xuXHRcdH0sIHtcblx0XHRcdGtpbmQ6ICdpbnB1dCcsXG5cdFx0XHR0eXBlOiAndGVsJyxcblx0XHRcdGNhbkJlTmVnYXRpdmU6IHRydWUsXG5cdFx0XHRwcmVwZW5kSWNvbjogJ21hcmdpbi1yaWdodCcsXG5cdFx0XHRhcHBlbmRDb250cm9sczogdHJ1ZSxcblx0XHRcdGxhYmVsOiAnUmlnaHQnLFxuXHRcdFx0cHJvcGVydHk6ICdtYXJnaW4tcmlnaHQnLFxuXHRcdFx0ZGVmYXVsdDogJzBweCdcblx0XHR9XVxuXHR9XVxufTtcbkNvbHVtbnMuc3R5bGVEYXRhLmNvbXBvbmVudHNbJ3RleHQnXSA9IHtcblx0dGl0bGU6ICdUZXh0Jyxcblx0cm93czogW3tcblx0XHRpdGVtczogW3tcblx0XHRcdGtpbmQ6ICdpbnB1dCcsXG5cdFx0XHR0eXBlOiAndGVsJyxcblx0XHRcdHByZXBlbmRJY29uOiBmYWxzZSxcblx0XHRcdGFwcGVuZENvbnRyb2xzOiB0cnVlLFxuXHRcdFx0bGFiZWw6ICdTaXplJyxcblx0XHRcdHByb3BlcnR5OiAnZm9udC1zaXplJyxcblx0XHRcdGRlZmF1bHQ6ICcxNHB4J1xuXHRcdH0sIHtcblx0XHRcdGtpbmQ6ICdtdWx0aXBsZS1zZWdtZW50ZWQtYnV0dG9uJyxcblx0XHRcdGxhYmVsOiAnU3R5bGUnLFxuXHRcdFx0YnV0dG9uczogW3tcblx0XHRcdFx0cHJvcGVydHk6IHtcblx0XHRcdFx0XHRuYW1lOiAnZm9udC13ZWlnaHQnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHZhbHVlczoge1xuXHRcdFx0XHRcdGFjdGl2ZTogJ2JvbGQnLFxuXHRcdFx0XHRcdGluYWN0aXZlOiAnbm9ybWFsJyxcblx0XHRcdFx0XHRkZWZhdWx0OiAnbm9ybWFsJ1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRpY29uOiAnYm9sZCdcblx0XHRcdH0sIHtcblx0XHRcdFx0cHJvcGVydHk6IHtcblx0XHRcdFx0XHRuYW1lOidmb250LXN0eWxlJ1xuXHRcdFx0XHR9LFxuXHRcdFx0XHR2YWx1ZXM6IHtcblx0XHRcdFx0XHRhY3RpdmU6ICdpdGFsaWMnLFxuXHRcdFx0XHRcdGluYWN0aXZlOiAnbm9ybWFsJyxcblx0XHRcdFx0XHRkZWZhdWx0OiAnbm9ybWFsJ1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRpY29uOiAnaXRhbGljJ1xuXHRcdFx0fSwge1xuXHRcdFx0XHRwcm9wZXJ0eToge1xuXHRcdFx0XHRcdG5hbWU6J3RleHQtZGVjb3JhdGlvbidcblx0XHRcdFx0fSxcblx0XHRcdFx0dmFsdWVzOiB7XG5cdFx0XHRcdFx0YWN0aXZlOiAndW5kZXJsaW5lJyxcblx0XHRcdFx0XHRpbmFjdGl2ZTogJ25vbmUnLFxuXHRcdFx0XHRcdGRlZmF1bHQ6ICdub25lJ1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRpY29uOiAndW5kZXJsaW5lJ1xuXHRcdFx0fV1cblx0XHR9XVxuXHR9LCB7XG5cdFx0aXRlbXM6IFt7XG5cdFx0XHRraW5kOiAnaW5wdXQnLFxuXHRcdFx0dHlwZTogJ2NvbG9yJyxcblx0XHRcdHByZXBlbmRJY29uOiBmYWxzZSxcblx0XHRcdGFwcGVuZENvbnRyb2xzOiBmYWxzZSxcblx0XHRcdGxhYmVsOiAnQ29sb3InLFxuXHRcdFx0cHJvcGVydHk6ICdjb2xvcicsXG5cdFx0XHRkZWZhdWx0OiAnIzNhM2EzYSdcblx0XHR9LCB7XG5cdFx0XHRraW5kOiAnc2VnbWVudGVkLWJ1dHRvbicsXG5cdFx0XHRsYWJlbDogJ0FsaWdubWVudCcsXG5cdFx0XHRwcm9wZXJ0eToge1xuXHRcdFx0XHRuYW1lOiAndGV4dC1hbGlnbicsXG5cdFx0XHRcdGRlZmF1bHQ6ICdsZWZ0J1xuXHRcdFx0fSxcblx0XHRcdGJ1dHRvbnM6IFt7XG5cdFx0XHRcdHZhbHVlOiAnbGVmdCcsXG5cdFx0XHRcdGljb246ICd0ZXh0LWFsaWduLWxlZnQnXG5cdFx0XHR9LCB7XG5cdFx0XHRcdHZhbHVlOiAnY2VudGVyJyxcblx0XHRcdFx0aWNvbjogJ3RleHQtYWxpZ24tY2VudGVyJ1xuXHRcdFx0fSwge1xuXHRcdFx0XHR2YWx1ZTogJ3JpZ2h0Jyxcblx0XHRcdFx0aWNvbjogJ3RleHQtYWxpZ24tcmlnaHQnXG5cdFx0XHR9XVxuXHRcdH1dXG5cdH1dXG59O1xuQ29sdW1ucy5zdHlsZURhdGEudHlwZXMgPSB7XG5cdHRleHQ6IFtcblx0XHRDb2x1bW5zLnN0eWxlRGF0YS5jb21wb25lbnRzWyd0ZXh0J10sXG5cdFx0Q29sdW1ucy5zdHlsZURhdGEuY29tcG9uZW50c1snbWFyZ2lucyddXG5cdF0sXG5cdGdyb3VwOiBbXG5cdFx0Q29sdW1ucy5zdHlsZURhdGEuY29tcG9uZW50c1snaXRlbXMnXSxcblx0XVxufTtcbm1vZHVsZS5leHBvcnRzID0gQ29sdW1uczsiLCJ2YXIgQ29sdW1uc0V2ZW50IFx0XHRcdD0gcmVxdWlyZSgnLi4vbW9kZWxzL0NvbHVtbnNFdmVudC5qcycpO1xudmFyIGNvbmZpZyBcdFx0XHRcdFx0PSByZXF1aXJlKCcuLi8uLi9jb21waWxlZC1qYXZhc2NyaXB0cy9jb25maWcuanMnKTtcblxudmFyIFBBTkVMX1RFTVBMQVRFIFx0XHRcdD0gQ29sdW1ucy5UZW1wbGF0ZXNbJ3RlbXBsYXRlcy9wYW5lbHMvcGFuZWwuaGJzJ10sXG5cdEJPRFlfVEVNUExBVEUgXHRcdFx0PSBDb2x1bW5zLlRlbXBsYXRlc1sndGVtcGxhdGVzL2VtYmVkLWRldGFpbHMtcGFuZWwvYm9keS5oYnMnXSxcblx0U0VMRUNUT1IgXHRcdFx0XHQ9ICcjZW1iZWQtZGV0YWlscy1wYW5lbCcsXG5cdENMT1NFX0JVVFRPTl9TRUxFQ1RPUiBcdD0gJy5jb2x1bW5zLXBhbmVsLWhlYWRlci1jbG9zZS1idXR0b24nLFxuXHRCTE9DS0VSX1NFTEVDVE9SIFx0XHQ9ICcuY29sdW1ucy1wYW5lbC1ibG9ja2VyJztcblxuZnVuY3Rpb24gRW1iZWREZXRhaWxzVmlldyggdGFibGUgKSB7XG5cdHRoaXMudGFibGUgPSB0YWJsZTtcblx0dGhpcy5fc2V0dXBFdmVudExpc3RlbmVycygpO1xufVxuXG5FbWJlZERldGFpbHNWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbigpIHtcblxuXHR2YXIgJGVtYmVkID0gJCggUEFORUxfVEVNUExBVEUoe1xuXHRcdGlkOiB0aGlzLnRhYmxlLmlkLFxuXHRcdGhlYWRlcjoge1xuXHRcdFx0dGl0bGU6ICdFbWJlZCBEZXRhaWxzJ1xuXHRcdH0sXG5cdFx0Ym9keTogQk9EWV9URU1QTEFURSh7XG5cdFx0XHR0aXRsZTogdGhpcy50YWJsZS50aXRsZSxcblx0XHRcdHNvdXJjZTogdGhpcy50YWJsZS5zb3VyY2UsXG5cdFx0XHRzb3VyY2VfdXJsOiB0aGlzLnRhYmxlLnNvdXJjZV91cmwsXG5cdFx0XHR0YWJsZV9pZDogdGhpcy50YWJsZS5pZCxcblx0XHRcdHVybDogY29uZmlnLmVtYmVkLmhvc3QgKyBjb25maWcuZW1iZWQucGF0aFxuXHRcdH0pLFxuXHRcdGZvb3RlcjogbnVsbCxcblx0fSkgKTtcblxuXHR0aGlzLiRlbWJlZCA9ICRlbWJlZDtcblx0dGhpcy5fc2V0dXBJbnRlcmFjdGlvbkxpc3RlbmVycygpO1xuXG5cdCQoJ2JvZHknKS5hcHBlbmQoIHRoaXMuJGVtYmVkICk7XG5cdHJldHVybiB0aGlzLiRlbWJlZDtcbn07XG5cbkVtYmVkRGV0YWlsc1ZpZXcucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbigpIHtcblx0dGhpcy4kZW1iZWQuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xufTtcblxuRW1iZWREZXRhaWxzVmlldy5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLiRlbWJlZC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG59O1xuXG5FbWJlZERldGFpbHNWaWV3LnByb3RvdHlwZS5fZW1pdENoYW5nZSA9IGZ1bmN0aW9uKCBwcm9wZXJ0eSwgdmFsdWUgKSB7XG5cdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0Ly8gY29sdW1uc0V2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5FbWJlZERldGFpbHNWaWV3LkRpZFVwZGF0ZVByb3BlcnR5V2l0aFZhbHVlJywgZmFsc2UsIGZhbHNlLCB7XG5cdC8vIFx0ZW1iZWQ6IFx0dGhpcyxcblx0Ly8gXHRwcm9wZXJ0eTogcHJvcGVydHksXG5cdC8vIFx0dmFsdWU6IHZhbHVlXG5cdC8vIH0pO1xuXHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGNvbHVtbnNFdmVudCk7XG5cdENvbHVtbnNFdmVudC5zZW5kKCAnQ29sdW1ucy5FbWJlZERldGFpbHNWaWV3LkRpZFVwZGF0ZVByb3BlcnR5V2l0aFZhbHVlJywge1xuXHRcdGVtYmVkOiBcdHRoaXMsXG5cdFx0cHJvcGVydHk6IHByb3BlcnR5LFxuXHRcdHZhbHVlOiB2YWx1ZVxuXHR9KTtcbn07XG5cbkVtYmVkRGV0YWlsc1ZpZXcucHJvdG90eXBlLl9zZXR1cEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gU2hvdWxkIGxpc3RlbiBmb3IgdGFibGUgdXBsb2FkIHN1Y2Nlc3Ncblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5UYWJsZS5EaWRVcGxvYWRXaXRoU3VjY2VzcycsIHRoaXMuX29uVGFibGVVcGxvYWQuYmluZCggdGhpcyApICk7XG59O1xuXG5FbWJlZERldGFpbHNWaWV3LnByb3RvdHlwZS5fc2V0dXBJbnRlcmFjdGlvbkxpc3RlbmVycyA9IGZ1bmN0aW9uKCkge1xuXG5cdC8vIFNob3VsZCBsaXN0ZW4gdG8gY2xpY2tzIG9uIHRoZSBlbWJlZCBidXR0b25cblx0JCgnLmNvbHVtbnMtaGVhZGVyLW5hdi1lbWJlZCcpLm9uKCAnY2xpY2snLCB0aGlzLl9vbkVtYmVkQnV0dG9uQ2xpY2suYmluZCggdGhpcyApICk7XG5cblx0Ly8gU2hvdWxkIGxpc3RlbiB0byBjbGlja3Mgb24gdGhlIGhpZGUgYnV0dG9uXG5cdHRoaXMuJGVtYmVkLmZpbmQoIENMT1NFX0JVVFRPTl9TRUxFQ1RPUiApLm9uKCAnY2xpY2snLCB0aGlzLl9vbkNsb3NlQnV0dG9uQ2xpY2suYmluZCggdGhpcyApICk7XG5cblx0Ly8gU2hvdWxkIGxpc3RlbiB0byBjbGlja3Mgb24gdGhlIGJsb2NrZXJcblx0dGhpcy4kZW1iZWQuZmluZCggQkxPQ0tFUl9TRUxFQ1RPUiApLm9uKCAnY2xpY2snLCB0aGlzLl9vbkJsb2NrZXJDbGljay5iaW5kKCB0aGlzICkgKTtcblxuXHQvLyBTaG91bGQgbGlzdGVuIHRvIGtleXVwIGV2ZW50cyBvbiBpbnB1dCBmaWVsZHNcblx0dGhpcy4kZW1iZWQuZmluZCgnaW5wdXQnKS5vbiggJ2tleXVwJywgdGhpcy5fb25JbnB1dEtleXVwLmJpbmQoIHRoaXMgKSApO1xuXG5cdC8vIFNob3VsZCBsaXN0ZW4gdG8gYmx1ciBldmVudHMgb24gaW5wdXQgZmllbGRzXG5cdHRoaXMuJGVtYmVkLmZpbmQoJ2lucHV0Jykub24oICdibHVyJywgdGhpcy5fb25JbnB1dEJsdXIuYmluZCggdGhpcyApICk7XG59O1xuXG5FbWJlZERldGFpbHNWaWV3LnByb3RvdHlwZS5fb25UYWJsZVVwbG9hZCA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblx0dGhpcy50YWJsZSA9IGRhdGEudGFibGU7XG5cdHRoaXMucmVuZGVyKCk7XG59O1xuXG5FbWJlZERldGFpbHNWaWV3LnByb3RvdHlwZS5fb25FbWJlZEJ1dHRvbkNsaWNrID0gZnVuY3Rpb24oIGV2ZW50KSB7XG5cdHRoaXMuc2hvdygpO1xufTtcblxuRW1iZWREZXRhaWxzVmlldy5wcm90b3R5cGUuX29uQ2xvc2VCdXR0b25DbGljayA9IGZ1bmN0aW9uKCBldmVudCApIHtcblx0dGhpcy5oaWRlKCk7XG59O1xuXG5FbWJlZERldGFpbHNWaWV3LnByb3RvdHlwZS5fb25CbG9ja2VyQ2xpY2sgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdHRoaXMuaGlkZSgpO1xufTtcblxuRW1iZWREZXRhaWxzVmlldy5wcm90b3R5cGUuX29uSW5wdXRLZXl1cCA9IGZ1bmN0aW9uKCBldmVudCApIHtcblx0dmFyICRmaWVsZCBcdFx0PSAkKCBldmVudC50YXJnZXQgKSxcblx0XHRwcm9wZXJ0eVx0PSAkZmllbGQuZGF0YSgncHJvcGVydHknKSxcblx0XHR2YWx1ZVx0XHQ9ICRmaWVsZC52YWwoKTtcblxuXHR0aGlzLl9lbWl0Q2hhbmdlKCBwcm9wZXJ0eSwgdmFsdWUgKTsgXG59O1xuXG5FbWJlZERldGFpbHNWaWV3LnByb3RvdHlwZS5fb25JbnB1dEJsdXIgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdHZhciAkZmllbGQgXHRcdD0gJCggZXZlbnQudGFyZ2V0ICksXG5cdFx0cHJvcGVydHlcdD0gJGZpZWxkLmRhdGEoJ3Byb3BlcnR5JyksXG5cdFx0dmFsdWVcdFx0PSAkZmllbGQudmFsKCk7XG5cblx0dGhpcy5fZW1pdENoYW5nZSggcHJvcGVydHksIHZhbHVlICk7IFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBFbWJlZERldGFpbHNWaWV3O1xuXG4iLCJ2YXIgQ29sdW1uc0V2ZW50IFx0PSByZXF1aXJlKCcuLi9tb2RlbHMvQ29sdW1uc0V2ZW50LmpzJyk7XG5cbnZhciBEUkFHR0lOR19DTEFTUyA9ICdkcmFnZ2luZycsXG5cdElOQUNUSVZFX0NMQVNTID0gJ2luYWN0aXZlJyxcblx0U0VMRUNURURfQ0xBU1MgPSAnc2VsZWN0ZWQnLFxuXHRJVEVNX1NFTEVDVE9SID0gJy5sYXlvdXQtY29sdW1uJztcblxuLy8gTWFuYWdlIHRoZSBkaXNwbGF5IG9mIGEgc2luZ2xlIGl0ZW1cbi8vIHdpdGhpbiB0aGUgbGlzdCBvZiBpdGVtc1xuSXRlbVZpZXcgPSBmdW5jdGlvbiggaXRlbSApIHtcblxuXHR0aGlzLml0ZW0gPSBpdGVtIHx8IG5ldyBJdGVtKCk7XG5cdHRoaXMudGVtcGxhdGUgPSBDb2x1bW5zLlRlbXBsYXRlc1sndGVtcGxhdGVzL2xheW91dC9jb2x1bW4uaGJzJ107XG5cdHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcblx0dGhpcy4kaXRlbTtcbn07XG5cbkl0ZW1WaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbigpIHtcblx0dmFyICRpdGVtID0gJCggdGhpcy50ZW1wbGF0ZSh7XG5cdFx0dGl0bGU6IHRoaXMuaXRlbS5mb3JtYXR0ZWRUaXRsZSgpLFxuXHRcdGFjdGl2ZTogdGhpcy5pdGVtLmFjdGl2ZSxcblx0XHRzZWxlY3RlZDogdGhpcy5zZWxlY3RlZFxuXHR9KSApO1xuXHQkaXRlbS5kYXRhKCdzdHlsZScsIHRoaXMuaXRlbS5zdHlsZS5zdHlsZXMpO1xuXHR0aGlzLiRpdGVtID0gJGl0ZW07XG5cblx0dGhpcy5zZXR1cEV2ZW50cygpO1xuXHR0aGlzLl9zZXR1cEV2ZW50TGlzdGVuZXJzKCk7XG5cblx0cmV0dXJuIHRoaXMuJGl0ZW07XG59O1xuXG5JdGVtVmlldy5wcm90b3R5cGUuc2V0dXBFdmVudHMgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBNYWtlIHRoZSBpdGVtIGRyYWdnYWJsZVxuXHR0aGlzLiRpdGVtLmRyYWdnYWJsZSh7XG5cdFx0cmV2ZXJ0OiAnaW52YWxpZCcsXG5cdFx0cmV2ZXJ0RHVyYXRpb246IDIwMCxcblx0XHRoZWxwZXI6ICdjbG9uZScsXG5cdFx0Ly8gb3BhY2l0eTogLjIsXG5cdFx0Y2FuY2VsOiAnLmluYWN0aXZlJ1xuXHR9KTtcblxuXHR0aGlzLiRpdGVtLm9uKCAnZHJhZ3N0YXJ0JywgJC5wcm94eShmdW5jdGlvbiggZXZlbnQsIHVpICkge1xuXG5cdFx0Ly8gTWFrZSBpbmFjdGl2ZVxuXHRcdCQoIGV2ZW50LnRhcmdldCApLmFkZENsYXNzKCBEUkFHR0lOR19DTEFTUyApO1xuXG5cdFx0Ly8gQWxlcnQgYW55IGxpc3RlbmVycyB0aGF0IHRoZSBpdGVtIGhhcyBzdGFydGVkIGRyYWdcblx0XHQvLyB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoICdDb2x1bW5zLkl0ZW1WaWV3Lkl0ZW1EaWRCZWdpbkRyYWcnLCB7XG5cdFx0Ly8gXHRpdGVtOiBcdHRoaXMsXG5cdFx0Ly8gXHRldmVudDogXHRldmVudCxcblx0XHQvLyBcdHVpOiBcdHVpXG5cdFx0Ly8gfSk7XG5cdFx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHRcdC8vIGNvbHVtbnNFdmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuSXRlbVZpZXcuSXRlbURpZEJlZ2luRHJhZycsIGZhbHNlLCBmYWxzZSwge1xuXHRcdC8vIFx0aXRlbTogXHR0aGlzLFxuXHRcdC8vIFx0ZXZlbnQ6IFx0ZXZlbnQsXG5cdFx0Ly8gXHR1aTogXHR1aVxuXHRcdC8vIH0pO1xuXHRcdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY29sdW1uc0V2ZW50KTtcblx0XHRDb2x1bW5zRXZlbnQuc2VuZCggJ0NvbHVtbnMuSXRlbVZpZXcuSXRlbURpZEJlZ2luRHJhZycsIHtcblx0XHRcdGl0ZW06IFx0dGhpcyxcblx0XHRcdGV2ZW50OiBcdGV2ZW50LFxuXHRcdFx0dWk6IFx0dWlcblx0XHR9IClcblxuXHR9LCB0aGlzKSApO1xuXG5cdHRoaXMuJGl0ZW0ub24oICdkcmFnc3RvcCcsICQucHJveHkoZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcdFx0XG5cblx0XHQvLyBNYWtlIGFjdGl2ZSBhZ2FpblxuXHRcdCQoIGV2ZW50LnRhcmdldCApLnJlbW92ZUNsYXNzKCBEUkFHR0lOR19DTEFTUyApO1xuXG5cdFx0Ly8gQWxlcnQgYW55IGxpc3RlbmVycyB0aGF0IHRoZSBpdGVtIGhhcyBzdGFydGVkIGRyYWdcblx0XHQvLyB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoICdDb2x1bW5zLkl0ZW1WaWV3Lkl0ZW1EaWRCRW5kRHJhZycsIHtcblx0XHQvLyBcdGl0ZW06IFx0dGhpcyxcblx0XHQvLyBcdGV2ZW50OiBcdGV2ZW50LFxuXHRcdC8vIFx0dWk6IFx0dWlcblx0XHQvLyB9KTtcblx0XHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdFx0Ly8gY29sdW1uc0V2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5JdGVtVmlldy5JdGVtRGlkRW5kRHJhZycsIGZhbHNlLCBmYWxzZSwge1xuXHRcdC8vIFx0aXRlbTogXHR0aGlzLFxuXHRcdC8vIFx0ZXZlbnQ6IFx0ZXZlbnQsXG5cdFx0Ly8gXHR1aTogXHR1aVxuXHRcdC8vIH0pO1xuXHRcdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY29sdW1uc0V2ZW50KTtcblx0XHRDb2x1bW5zRXZlbnQuc2VuZCggJ0NvbHVtbnMuSXRlbVZpZXcuSXRlbURpZEVuZERyYWcnLCB7XG5cdFx0XHRpdGVtOiBcdHRoaXMsXG5cdFx0XHRldmVudDogXHRldmVudCxcblx0XHRcdHVpOiBcdHVpXG5cdFx0fSApXG5cblx0fSwgdGhpcykgKTtcblxuXHR0aGlzLiRpdGVtLm9uKCAnZHJhZycsICQucHJveHkoZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcblxuXHRcdC8vIEFsZXJ0IGFueSBsaXN0ZW5lcnMgdGhhdCB0aGUgaXRlbSBoYXMgc3RhcnRlZCBkcmFnXG5cdFx0Ly8gdmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCAnQ29sdW1ucy5JdGVtVmlldy5JdGVtRGlkRHJhZycsIHtcblx0XHQvLyBcdGl0ZW06IFx0dGhpcyxcblx0XHQvLyBcdGV2ZW50OiBcdGV2ZW50LFxuXHRcdC8vIFx0dWk6IFx0dWlcblx0XHQvLyB9KTtcblx0XHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdFx0Ly8gY29sdW1uc0V2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5JdGVtVmlldy5JdGVtRGlkRHJhZycsIGZhbHNlLCBmYWxzZSwge1xuXHRcdC8vIFx0aXRlbTogXHR0aGlzLFxuXHRcdC8vIFx0ZXZlbnQ6IFx0ZXZlbnQsXG5cdFx0Ly8gXHR1aTogXHR1aVxuXHRcdC8vIH0pO1xuXHRcdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY29sdW1uc0V2ZW50KTtcblx0XHRDb2x1bW5zRXZlbnQuc2VuZCggJ0NvbHVtbnMuSXRlbVZpZXcuSXRlbURpZERyYWcnLCB7XG5cdFx0XHRpdGVtOiBcdHRoaXMsXG5cdFx0XHRldmVudDogXHRldmVudCxcblx0XHRcdHVpOiBcdHVpXG5cdFx0fSApXG5cblx0fSwgdGhpcykgKTtcblxuXHR0aGlzLiRpdGVtLm9uKCAnY2xpY2snLCAkLnByb3h5KGZ1bmN0aW9uKCBldmVudCApIHs7XG5cblx0XHR0aGlzLl9zZXRTZWxlY3RlZCggdHJ1ZSApO1xuXG5cdFx0Q29sdW1uc0V2ZW50LnNlbmQoICdDb2x1bW5zLkl0ZW1WaWV3Lkl0ZW1EaWRTZWxlY3QnLCB7XG5cdFx0XHRpdGVtVmlldzogXHR0aGlzLFxuXHRcdFx0aXRlbTogXHRcdHRoaXMuaXRlbVxuXHRcdH0gKTtcblxuXHR9LCB0aGlzICkgKTtcbn07XG5cbkl0ZW1WaWV3LnByb3RvdHlwZS5fc2V0U2VsZWN0ZWQgPSBmdW5jdGlvbiggc2VsZWN0ZWQgKSB7XG5cblx0aWYgKCBzZWxlY3RlZCA9PT0gdHJ1ZSApIHtcblx0XHR0aGlzLnNlbGVjdGVkID0gdHJ1ZTtcblx0XHR0aGlzLiRpdGVtLmFkZENsYXNzKCBTRUxFQ1RFRF9DTEFTUyApO1xuXHR9IGVsc2UgaWYgKCBzZWxlY3RlZCA9PT0gZmFsc2UgKSB7XG5cdFx0dGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xuXHRcdHRoaXMuJGl0ZW0ucmVtb3ZlQ2xhc3MoIFNFTEVDVEVEX0NMQVNTICk7XG5cdH1cbn07XG5cbkl0ZW1WaWV3LnByb3RvdHlwZS5fc2V0dXBFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uKCkge1xuXG5cdC8vIExpc3RlbiB0byB2YWx1ZSBzZWxlY3Rpb24gZXZlbnRzXG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuVGVtcGxhdGVWYWx1ZVZpZXcuVmFsdWVEaWRTZWxlY3RXaXRoSXRlbScsIHRoaXMuX29uVmFsdWVWaWV3U2VsZWN0aW9uLmJpbmQoIHRoaXMgKSk7XG5cblx0Ly8gTGlzdGVuIHRvIGl0ZW0gdmlldyBzZWxlY3Rpb24gZXZlbnRzXG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuSXRlbVZpZXcuSXRlbURpZFNlbGVjdCcsIHRoaXMuX29uSXRlbVNlbGVjdGlvbi5iaW5kKCB0aGlzICkpO1x0XG59O1xuXG5JdGVtVmlldy5wcm90b3R5cGUuX29uVmFsdWVWaWV3U2VsZWN0aW9uID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXHR2YXIgaXRlbSA9IGRhdGEuaXRlbTtcblxuXHRpZiAoIHRoaXMuaXRlbS5pcyggaXRlbSApICkge1xuXHRcdHRoaXMuX3NldFNlbGVjdGVkKCB0cnVlICk7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5fc2V0U2VsZWN0ZWQoIGZhbHNlICk7XG5cdH1cbn07XG5cbkl0ZW1WaWV3LnByb3RvdHlwZS5fb25JdGVtU2VsZWN0aW9uID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXHR2YXIgaXRlbSA9IGRhdGEuaXRlbTtcblxuXHRpZiAoICF0aGlzLml0ZW0uaXMoIGl0ZW0gKSApIHtcblx0XHR0aGlzLl9zZXRTZWxlY3RlZCggZmFsc2UgKTtcblx0fVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJdGVtVmlldzsiLCJ2YXIgQ29sdW1uc0V2ZW50IFx0PSByZXF1aXJlKCcuLi9tb2RlbHMvQ29sdW1uc0V2ZW50LmpzJyk7XG52YXIgSXRlbVZpZXcgXHRcdD0gcmVxdWlyZSgnLi9JdGVtVmlldy5qcycpO1xuXG4vLyBNYW5hZ2UgdGhlIGRpc3BsYXkgb2YgYSBsaXN0IG9mIGl0ZW1zXG5JdGVtc1ZpZXcgPSBmdW5jdGlvbiggaXRlbXMgKSB7XG5cblx0dGhpcy5pdGVtcyBcdFx0PSBpdGVtcyB8fCBbXTtcblx0dGhpcy52aWV3cyBcdFx0PSBbXTtcblx0dGhpcy50ZW1wbGF0ZSBcdD0gQ29sdW1ucy5UZW1wbGF0ZXNbJ3RlbXBsYXRlcy9sYXlvdXQvY29sdW1ucy5oYnMnXTtcblx0dGhpcy4kaXRlbXM7XG5cblx0dGhpcy5yZW5kZXIoIGl0ZW1zICk7XG5cdHRoaXMuX3NldHVwRXZlbnRMaXN0ZW5lcnMoKTtcbn07XG5cbkl0ZW1zVmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oKSB7XG5cdHZhciBpdGVtVmlldyxcblx0XHQkY29sdW1ucyA9ICQoIHRoaXMudGVtcGxhdGUoKSApO1xuXG5cdC8vIFJlbW92ZSBhbnkgZXhpc3RpbmcgY29sdW1uc1xuXHQkKCcubGF5b3V0LWNvbHVtbnMnKS5yZW1vdmUoKTtcblxuXHRpZiAoIHRoaXMuaXRlbXMgKSB7XG5cdFx0dGhpcy5pdGVtcy5mb3JFYWNoKGZ1bmN0aW9uKCBpdGVtLCBpICkge1xuXG5cdFx0XHRpdGVtVmlldyA9IHRoaXMuaXRlbVZpZXdGb3JJdGVtKCBpdGVtICk7XG5cdFx0XHRcblx0XHRcdGlmICggIWl0ZW1WaWV3ICkge1xuXHRcdFx0XHRpdGVtVmlldyA9IG5ldyBJdGVtVmlldyggaXRlbSApO1xuXHRcdFx0XHR0aGlzLnZpZXdzLnB1c2goIGl0ZW1WaWV3ICk7XG5cdFx0XHR9XG5cblx0XHRcdCRjb2x1bW5zLmFwcGVuZCggaXRlbVZpZXcucmVuZGVyKCkgKTtcblxuXHRcdH0uYmluZCggdGhpcyApKTtcblx0fVxuXG5cdCQoXCIjY29sdW1uc1wiKS5hcHBlbmQoICRjb2x1bW5zICk7XG5cblx0Ly8gdGhpcy5zZXR1cERyYWdMaXN0ZW5lcnMoJCh0aGlzLkxBWU9VVF9DT0xVTU5fU0VMRUNUT1IpKTtcblx0Ly8gdGhpcy5zZXR1cERyb3BMaXN0ZW5lcnMoKTtcblxuXHR0aGlzLiRpdGVtcyA9ICRjb2x1bW5zO1xuXHRyZXR1cm4gdGhpcy4kaXRlbXM7XG59O1xuXG5JdGVtc1ZpZXcucHJvdG90eXBlLml0ZW1WaWV3Rm9ySXRlbSA9IGZ1bmN0aW9uKCBpdGVtICkge1xuXHR2YXIgaXRlbVZpZXc7XG5cblx0aWYgKCBpdGVtIGluc3RhbmNlb2YgSXRlbSAmJiB0aGlzLnZpZXdzLmxlbmd0aCApIHtcblx0XHRpdGVtVmlldyA9IHRoaXMudmlld3MuZmlsdGVyKGZ1bmN0aW9uKCB2aWV3LCBpICkge1xuXHRcdFx0cmV0dXJuIHZpZXcuaXRlbS50aXRsZSA9PT0gaXRlbS50aXRsZTtcblx0XHR9LmJpbmQoIHRoaXMgKSApWyAwIF07XG5cdH1cblxuXHRyZXR1cm4gaXRlbVZpZXc7XG59O1xuXG5JdGVtc1ZpZXcucHJvdG90eXBlLnVwZGF0ZUl0ZW0gPSBmdW5jdGlvbiggaXRlbSApIHtcblxuXHQvLyBSZS1yZW5kZXIgdGhlIGl0ZW1cblx0dGhpcy5pdGVtcy5mb3JFYWNoKGZ1bmN0aW9uKCBvbGRJdGVtLCBpICkge1xuXG5cdFx0aWYgKCBvbGRJdGVtLmlzKCBpdGVtICkgKSB7XG5cdFx0XHR2YXIgaXRlbVZpZXcgPSB0aGlzLml0ZW1WaWV3Rm9ySXRlbSggaXRlbSApO1xuXHRcdFx0dGhpcy4kaXRlbXMuZmluZCgnLmxheW91dC1jb2x1bW4nKS5lcSggaSApLnJlcGxhY2VXaXRoKCBpdGVtVmlldy5yZW5kZXIoKSApO1xuXHRcdH1cblxuXHR9LmJpbmQoIHRoaXMgKSApO1xuXG5cdHRoaXMuX2VtaXRDaGFuZ2UoKTtcbn07XG5cbkl0ZW1zVmlldy5wcm90b3R5cGUuX2VtaXRDaGFuZ2UgPSBmdW5jdGlvbigpIHtcblx0Ly8gTGV0IGV2ZXJ5b25lIGtub3cgdGhhdCB0aGUgaXRlbXMgdmlldyBoYXMgY2hhbmdlZFxuXHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdC8vIGNvbHVtbnNFdmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuSXRlbXNWaWV3LkRpZENoYW5nZScsIGZhbHNlLCBmYWxzZSwge1xuXHQvLyBcdGl0ZW1zVmlldzogXHR0aGlzXG5cdC8vIH0pO1xuXHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGNvbHVtbnNFdmVudCk7XG5cdENvbHVtbnNFdmVudC5zZW5kKCAnQ29sdW1ucy5JdGVtc1ZpZXcuRGlkQ2hhbmdlJywge1xuXHRcdGl0ZW1zVmlldzogXHR0aGlzXG5cdH0pO1xuXG59O1xuXG5JdGVtc1ZpZXcucHJvdG90eXBlLl9zZXR1cEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gTGlzdGVuIGZvciB0YWJsZSB1cGRhdGVzXG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuVGFibGUuRGlkQ2hhbmdlJywgdGhpcy5fb25UYWJsZUNoYW5nZS5iaW5kKCB0aGlzICkgKTtcblxuXHQvLyBMaXN0ZW4gZm9yIGl0ZW0gdXBkYXRlc1xuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLkl0ZW0uRGlkQ2hhbmdlJywgdGhpcy5fb25JdGVtQ2hhbmdlLmJpbmQoIHRoaXMgKSApO1xuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLkl0ZW0uQWN0aXZlU3RhdGVEaWRDaGFuZ2UnLCB0aGlzLl9vbkl0ZW1DaGFuZ2UuYmluZCggdGhpcyApICk7XG59O1xuXG5JdGVtc1ZpZXcucHJvdG90eXBlLl9vblRhYmxlQ2hhbmdlID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXG5cdHRoaXMuX3VwZGF0ZVdpdGhJdGVtcyggZGF0YS50YWJsZS5jb2x1bW5zICk7XG5cdHRoaXMucmVuZGVyKCk7XG59O1xuXG5JdGVtc1ZpZXcucHJvdG90eXBlLl9vbkl0ZW1DaGFuZ2UgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdHRoaXMudXBkYXRlSXRlbSggZGF0YS5pdGVtICk7XG59O1xuXG5JdGVtc1ZpZXcucHJvdG90eXBlLl91cGRhdGVXaXRoSXRlbXMgPSBmdW5jdGlvbiggaXRlbXMgKSB7XG5cblx0aWYoIGl0ZW1zICkge1xuXG5cdFx0aWYgKCBBcnJheS5pc0FycmF5KCBpdGVtcyApICkge1xuXG5cdFx0XHRpdGVtcy5mb3JFYWNoKGZ1bmN0aW9uKCBpdGVtICkge1xuXHRcdFx0XHR0aGlzLl91cGRhdGVXaXRoSXRlbSggaXRlbSApO1xuXHRcdFx0fS5iaW5kKCB0aGlzICkpO1xuXG5cdFx0XHR0aGlzLl9lbWl0Q2hhbmdlKCk7XG5cblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhyb3cgXCJleGNlcHRpb24gSXRlbXMgbXVzdCBiZSBhcnJheSBvZiBpdGVtcyBvciBzaW5nbGUgaXRlbVwiO1xuXHRcdH1cblx0fVxufTtcblxuSXRlbXNWaWV3LnByb3RvdHlwZS5fdXBkYXRlV2l0aEl0ZW0gPSBmdW5jdGlvbiggaXRlbSApIHtcblx0dmFyIGR1cGxpY2F0ZXMgPSBbXTtcblxuXHRpZiAoIGl0ZW0gJiYgaXRlbSBpbnN0YW5jZW9mIEl0ZW0gKSB7XG5cdFx0ZHVwbGljYXRlcyA9IHRoaXMuaXRlbXMuZmlsdGVyKGZ1bmN0aW9uKCBleGlzdGluZ0l0ZW0gKSB7XG5cdFx0XHRyZXR1cm4gZXhpc3RpbmdJdGVtLmlzKCBpdGVtICk7XG5cdFx0fSk7XG5cblx0XHRpZiAoICFkdXBsaWNhdGVzLmxlbmd0aCApIHtcblx0XHRcdHRoaXMuaXRlbXMucHVzaCggaXRlbSApO1xuXHRcdH1cblx0fVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJdGVtc1ZpZXc7IiwidmFyIENvbHVtbnNFdmVudCBcdFx0XHRcdFx0XHRcdD0gcmVxdWlyZSgnLi4vbW9kZWxzL0NvbHVtbnNFdmVudC5qcycpO1xudmFyIFN0eWxlSW5wdXRWaWV3IFx0XHRcdFx0XHRcdFx0PSByZXF1aXJlKCcuL1N0eWxlSW5wdXRWaWV3LmpzJyk7XG52YXIgU3R5bGVTZWdtZW50ZWRCdXR0b25WaWV3IFx0XHRcdFx0PSByZXF1aXJlKCcuL1N0eWxlU2VnbWVudGVkQnV0dG9uVmlldy5qcycpO1xudmFyIFN0eWxlTXVsdGlwbGVTZWdtZW50ZWRCdXR0b25WaWV3IFx0XHQ9IHJlcXVpcmUoJy4vU3R5bGVNdWx0aXBsZVNlZ21lbnRlZEJ1dHRvblZpZXcuanMnKTtcblxudmFyIENPTVBPTkVOVF9URU1QTEFURSBcdD0gQ29sdW1ucy5UZW1wbGF0ZXNbJ3RlbXBsYXRlcy9zdHlsaW5nL2NvbXBvbmVudC5oYnMnXSxcblx0U0VDVElPTl9URU1QTEFURVx0PSBDb2x1bW5zLlRlbXBsYXRlc1sndGVtcGxhdGVzL3N0eWxpbmcvY29tcG9uZW50LXNlY3Rpb24uaGJzJ10sXG5cdFJPV19URU1QTEFURVx0XHQ9IENvbHVtbnMuVGVtcGxhdGVzWyd0ZW1wbGF0ZXMvc3R5bGluZy9jb21wb25lbnQtc2VjdGlvbi1yb3cuaGJzJ107XG5cbmZ1bmN0aW9uIFN0eWxlQ29tcG9uZW50Vmlldyggc2VsZWN0aW9uICkge1xuXG5cdHRoaXMuaXRlbSA9IHNlbGVjdGlvbjtcblx0Ly8gdGhpcy5pdGVtID0gc2VsZWN0aW9uID8gdGhpcy5nZXRJdGVtRm9yU2VsZWN0aW9uKCBzZWxlY3Rpb24gKSA6IHVuZGVmaW5lZDtcblx0Ly8gdGhpcy50ZW1wbGF0ZUdyb3VwcyA9IHRoaXMuaXRlbSA/IFRlbXBsYXRlVmlldy5nZXRHcm91cHNGb3JJdGVtKCB0aGlzLml0ZW0gKSA6IFtdO1xufVxuXG4vLyBTdHlsZUNvbXBvbmVudFZpZXcucHJvdG90eXBlLmdldEl0ZW1Gb3JTZWxlY3Rpb24gPSBmdW5jdGlvbiggc2VsZWN0aW9uICkge1xuXG4vLyBcdGlmKCBzZWxlY3Rpb24gaW5zdGFuY2VvZiBJdGVtICkge1xuLy8gXHRcdHJldHVybiBzZWxlY3Rpb247XG4vLyBcdH0gZWxzZSBpZiAoIHNlbGVjdGlvbiBpbnN0YW5jZW9mIEl0ZW1WaWV3ICkge1xuLy8gXHRcdHJldHVybiBzZWxlY3Rpb24uaXRlbTtcbi8vIFx0fSBlbHNlIGlmICggc2VsZWN0aW9uIGluc3RhbmNlb2YgVGVtcGxhdGVWYWx1ZVZpZXcgKSB7XG4vLyBcdFx0cmV0dXJuIHNlbGVjdGlvbi5pdGVtO1xuLy8gXHR9IGVsc2UgaWYgKCBzZWxlY3Rpb24gaW5zdGFuY2VvZiBUZW1wbGF0ZUdyb3VwVmlldyApIHtcbi8vIFx0XHRyZXR1cm4gc2VsZWN0aW9uO1xuLy8gXHR9IGVsc2Uge1xuLy8gXHRcdHRocm93IFwiZXhjZXB0aW9uOiBTZWxlY3Rpb24gbXVzdCBiZSBhbiBJdGVtLCBJdGVtVmlldywgVGVtcGxhdGVWYWx1ZVZpZXcgb3IgVGVtcGxhdGVHcm91cFZpZXdcIjtcbi8vIFx0fVxuLy8gfTtcblxuLy8gU3R5bGVDb21wb25lbnRWaWV3LnByb3RvdHlwZS5nZXRUZW1wbGF0ZXNGb3JJdGVtID0gZnVuY3Rpb24oIGl0ZW0gKSB7XG4vLyBcdC8vIHZhciBcbi8vIH07XG5cblN0eWxlQ29tcG9uZW50Vmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gR2V0IHRoZSBhcHByb3ByaWF0ZSBkYXRhIGZvciB0aGUgY3VycmVudCBpdGVtXG5cdHZhciB0eXBlID0gdGhpcy5pdGVtIGluc3RhbmNlb2YgVGVtcGxhdGVHcm91cFZpZXcgPyAnZ3JvdXAnIDogJ3RleHQnLFxuXHRcdHRpdGxlID0gdGhpcy5pdGVtIGluc3RhbmNlb2YgVGVtcGxhdGVHcm91cFZpZXcgPyB0aGlzLml0ZW0udGl0bGUoKSA6IHRoaXMuaXRlbS5mb3JtYXR0ZWRUaXRsZSgpLFxuXHRcdGNvbXBvbmVudERhdGEgPSBDb2x1bW5zLnN0eWxlRGF0YS50eXBlc1t0eXBlXSxcblx0XHQkY29tcG9uZW50LFxuXHRcdCRjb21wb25lbnRCb2R5LFxuXHRcdCRzZWN0aW9uO1xuXG5cdC8vIEZpcnN0IGNyZWF0ZSB0aGUgY29tcG9uZW50IHNrZWxldG9uXG5cdCRjb21wb25lbnQgPSAkKCBDT01QT05FTlRfVEVNUExBVEUoe1xuXHRcdHR5cGU6IHR5cGUsXG5cdFx0bmFtZTogdGl0bGVcblx0fSkgKTtcblxuXHQkY29tcG9uZW50Qm9keSA9ICRjb21wb25lbnQuZmluZCgnLnN0eWxlLWNvbXBvbmVudC1ib2R5Jyk7XG5cblx0Ly8gTmV4dCwgbG9vcCB0aHJvdWdoIHRoZSBkYXRhXG5cdC8vIGNyZWF0aW5nIHRoZSBzZWN0aW9ucyBmcm9tIHRoZSBpbnNpZGUgb3V0XG5cdGNvbXBvbmVudERhdGEuZm9yRWFjaChmdW5jdGlvbiggc2VjdGlvbiwgaSApIHtcblx0XHQkc2VjdGlvbiA9IHRoaXMuX3JlbmRlclNlY3Rpb24oIHNlY3Rpb24gKTtcblx0XHQkY29tcG9uZW50Qm9keS5hcHBlbmQoICRzZWN0aW9uICk7XG5cdH0uYmluZCggdGhpcyApICk7XG5cblx0dGhpcy4kc3R5bGUgPSAkY29tcG9uZW50O1xuXHR0aGlzLl9zZXR1cEV2ZW50TGlzdGVuZXJzKCk7XG5cblx0aWYgKCB0aGlzLml0ZW0gaW5zdGFuY2VvZiBUZW1wbGF0ZUdyb3VwVmlldyApIHtcblx0XHR0aGlzLnVwZGF0ZUFsaWdubWVudEJ1dHRvbnMoIHRoaXMuaXRlbS5nZXRTdHlsZSgnZmxleC1kaXJlY3Rpb24nKSApO1xuXHR9XG5cblx0cmV0dXJuIHRoaXMuJHN0eWxlO1xufTtcblxuU3R5bGVDb21wb25lbnRWaWV3LnByb3RvdHlwZS5fcmVuZGVyU2VjdGlvbiA9IGZ1bmN0aW9uKCBzZWN0aW9uICkge1xuXHR2YXIgJHNlY3Rpb24sXG5cdFx0JHNlY3Rpb25Sb3dzLFxuXHRcdCRyb3c7XG5cblx0JHNlY3Rpb24gPSAkKCBTRUNUSU9OX1RFTVBMQVRFKHtcblx0XHR0aXRsZTogc2VjdGlvbi50aXRsZVxuXHR9KSApO1xuXG5cdCRzZWN0aW9uUm93cyA9ICRzZWN0aW9uLmZpbmQoJy5zdHlsZS1jb21wb25lbnQtc2VjdGlvbi1yb3dzJyk7XG5cblx0Ly8gTG9vcCB0aHJvdWdoIGVhY2ggc2VjdGlvbixcblx0Ly8gY3JlYXRpbmcgcm93cyBmcm9tIHRoZSBpbnNpZGUgb3V0XG5cdHNlY3Rpb24ucm93cy5mb3JFYWNoKGZ1bmN0aW9uKCByb3csIGkpIHtcblx0XHQkcm93ID0gdGhpcy5fcmVuZGVyUm93KCByb3cgKTtcblx0XHQkc2VjdGlvblJvd3MuYXBwZW5kKCAkcm93ICk7XG5cdH0uYmluZCggdGhpcyApICk7XG5cblx0cmV0dXJuICRzZWN0aW9uO1xufTtcblxuU3R5bGVDb21wb25lbnRWaWV3LnByb3RvdHlwZS5fcmVuZGVyUm93ID0gZnVuY3Rpb24oIHJvdyApIHtcblx0dmFyICRyb3csXG5cdFx0JGl0ZW07XG5cblx0JHJvdyA9ICQoIFJPV19URU1QTEFURSgpICk7XG5cblx0Ly8gTG9vcCB0aHJvdWdoIGVhY2ggaXRlbSxcblx0Ly8gcmVuZGVyaW5nIGl0IHByb3Blcmx5IGRlcGVuZGluZyBvbiBpdHMgdHlwZVxuXHRyb3cuaXRlbXMuZm9yRWFjaChmdW5jdGlvbiggaXRlbSwgaSApIHtcblx0XHQkaXRlbSA9IHRoaXMuX3JlbmRlckl0ZW0oIGl0ZW0gKTtcblx0XHQkcm93LmFwcGVuZCggJGl0ZW0gKTtcblx0fS5iaW5kKCB0aGlzICkgKTtcblxuXHRyZXR1cm4gJHJvdztcblxufTtcblxuU3R5bGVDb21wb25lbnRWaWV3LnByb3RvdHlwZS5fcmVuZGVySXRlbSA9IGZ1bmN0aW9uKCBpdGVtICkge1xuXHR2YXIgaXRlbTtcblxuXHRpZiAoIGl0ZW0ua2luZCA9PT0gJ2lucHV0JyApIHtcblxuXHRcdGl0ZW0gPSBuZXcgU3R5bGVJbnB1dFZpZXcoe1xuXHRcdFx0aXRlbTogdGhpcy5pdGVtLFxuXHRcdFx0dW5pdDogaXRlbS51bml0LFxuXHRcdFx0dHlwZTogaXRlbS50eXBlLFxuXHRcdFx0Y2FuQmVOZWdhdGl2ZTogaXRlbS5jYW5CZU5lZ2F0aXZlLFxuXHRcdFx0YXBwZW5kQ29udHJvbHM6IGl0ZW0uYXBwZW5kQ29udHJvbHMsXG5cdFx0XHRwcmVwZW5kSWNvbjogaXRlbS5wcmVwZW5kSWNvbixcblx0XHRcdGxhYmVsOiBpdGVtLmxhYmVsLFxuXHRcdFx0cHJvcGVydHk6IGl0ZW0ucHJvcGVydHksXG5cdFx0XHR2YWx1ZTogdGhpcy5pdGVtLmdldFN0eWxlKCBpdGVtLnByb3BlcnR5ICkgfHwgaXRlbS5kZWZhdWx0XG5cdFx0fSk7XG5cdFx0cmV0dXJuIGl0ZW0ucmVuZGVyKCk7XG5cblx0fSBlbHNlIGlmICggaXRlbS5raW5kID09PSAnc2VnbWVudGVkLWJ1dHRvbicgKSB7XG5cblx0XHRpdGVtID0gbmV3IFN0eWxlU2VnbWVudGVkQnV0dG9uVmlldyh7XG5cdFx0XHRpdGVtOiB0aGlzLml0ZW0sXG5cdFx0XHRsYWJlbDogaXRlbS5sYWJlbCxcblx0XHRcdHByb3BlcnR5OiBpdGVtLnByb3BlcnR5Lm5hbWUsXG5cdFx0XHRidXR0b25zOiBpdGVtLmJ1dHRvbnMsXG5cdFx0XHR2YWx1ZTogdGhpcy5pdGVtLmdldFN0eWxlKCBpdGVtLnByb3BlcnR5Lm5hbWUgKSB8fCBpdGVtLnByb3BlcnR5LmRlZmF1bHRcblx0XHR9KTtcblx0XHRyZXR1cm4gaXRlbS5yZW5kZXIoKTtcblxuXHR9IGVsc2UgaWYgKCBpdGVtLmtpbmQgPT09ICdtdWx0aXBsZS1zZWdtZW50ZWQtYnV0dG9uJyApIHtcblxuXHRcdGl0ZW0gPSBuZXcgU3R5bGVNdWx0aXBsZVNlZ21lbnRlZEJ1dHRvblZpZXcoe1xuXHRcdFx0aXRlbTogdGhpcy5pdGVtLFxuXHRcdFx0bGFiZWw6IGl0ZW0ubGFiZWwsXG5cdFx0XHRidXR0b25zOiBpdGVtLmJ1dHRvbnMubWFwKGZ1bmN0aW9uKCBidXR0b24sIGkgKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0aWNvbjogYnV0dG9uLmljb24sXG5cdFx0XHRcdFx0cHJvcGVydHk6IGJ1dHRvbi5wcm9wZXJ0eS5uYW1lLFxuXHRcdFx0XHRcdHZhbHVlczoge1xuXHRcdFx0XHRcdFx0YWN0aXZlOiBidXR0b24udmFsdWVzLmFjdGl2ZSxcblx0XHRcdFx0XHRcdGluYWN0aXZlOiBidXR0b24udmFsdWVzLmluYWN0aXZlLFxuXHRcdFx0XHRcdFx0Y3VycmVudDogdGhpcy5pdGVtLmdldFN0eWxlKCBidXR0b24ucHJvcGVydHkubmFtZSApIHx8IGJ1dHRvbi52YWx1ZXMuZGVmYXVsdFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHRcdH0uYmluZCggdGhpcyApKVxuXHRcdH0pO1xuXHRcdHJldHVybiBpdGVtLnJlbmRlcigpO1xuXG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0fVxufTtcblxuU3R5bGVDb21wb25lbnRWaWV3LnByb3RvdHlwZS5fc2V0dXBFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uKCkge1xuXG5cdC8vIExpc3RlbiBmb3IgaW5wdXQgdXBkYXRlc1xuXHQvLyBpZiB0aGlzIGlzIGZvciBhIGdyb3VwXG5cdGlmICggdGhpcy5pdGVtIGluc3RhbmNlb2YgVGVtcGxhdGVHcm91cFZpZXcgKSB7XG5cdFx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5TdHlsZVNlZ21lbnRlZEJ1dHRvblZpZXcuVmFsdWVEaWRVcGRhdGVGb3JQcm9wZXJ0eUFuZEl0ZW0nLCB0aGlzLl9vblN0eWxlVXBkYXRlLmJpbmQoIHRoaXMgKSk7XG5cdH1cbn07XG5cblN0eWxlQ29tcG9uZW50Vmlldy5wcm90b3R5cGUuX29uU3R5bGVVcGRhdGUgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cblx0Ly8gSWYgdGhpcyBpcyBhIGNoYW5nZSBmb3IgdGhlIGZsZXgtZGlyZWN0aW9uIHByb3BlcnR5LFxuXHQvLyB1cGRhdGUgdGhlIGNsYXNzZXMgb24gdGhlIGFsaWdubWVudCBidXR0b25zXG5cdGlmICggZGF0YS5pdGVtID09PSB0aGlzLml0ZW0gJiYgZGF0YS5wcm9wZXJ0eSA9PT0gJ2ZsZXgtZGlyZWN0aW9uJyApIHtcblx0XHR0aGlzLnVwZGF0ZUFsaWdubWVudEJ1dHRvbnMoIGRhdGEudmFsdWUgKTtcblx0fVxufTtcblxuU3R5bGVDb21wb25lbnRWaWV3LnByb3RvdHlwZS51cGRhdGVBbGlnbm1lbnRCdXR0b25zID0gZnVuY3Rpb24oIGRpcmVjdGlvbiApIHtcblx0dmFyICRidXR0b25zID0gdGhpcy4kc3R5bGUuZmluZCgnW2RhdGEtcHJvcGVydHk9XCJhbGlnbi1pdGVtc1wiXScpO1xuXG5cdGlmICggZGlyZWN0aW9uID09PSAnY29sdW1uJyApIHtcblx0XHQkYnV0dG9ucy5hZGRDbGFzcygnY29sdW1uJyk7XG5cdFx0JGJ1dHRvbnMucmVtb3ZlQ2xhc3MoJ3JvdycpO1xuXHR9IGVsc2Uge1xuXHRcdCRidXR0b25zLmFkZENsYXNzKCdyb3cnKTtcblx0XHQkYnV0dG9ucy5yZW1vdmVDbGFzcygnY29sdW1uJyk7XG5cdH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTdHlsZUNvbXBvbmVudFZpZXc7IiwidmFyIENvbHVtbnNFdmVudCA9IHJlcXVpcmUoJy4uL21vZGVscy9Db2x1bW5zRXZlbnQuanMnKTtcblxuZnVuY3Rpb24gU3R5bGVJbnB1dFZpZXcoIG9wdGlvbnMgKSB7XG5cdFxuXHR0aGlzLnR5cGUgPSAndGVsJztcblx0dGhpcy51bml0ID0gJyc7XG5cdHRoaXMuY2FuQmVOZWdhdGl2ZSA9IHRydWU7XG5cdHRoaXMuY2FuQmVEZWNpbWFsID0gZmFsc2U7XG5cdHRoaXMucHJvcGVydHkgPSB1bmRlZmluZWQ7XG5cdHRoaXMudmFsdWUgPSB1bmRlZmluZWQ7XG5cdHRoaXMucHJlcGVuZEljb24gPSB1bmRlZmluZWQ7XG5cdHRoaXMuYXBwZW5kQ29udHJvbHMgPSBmYWxzZTtcblx0dGhpcy5sYWJlbCA9ICcnO1xuXHR0aGlzLml0ZW0gPSB1bmRlZmluZWQ7XG5cblx0aWYgKCBvcHRpb25zICkge1xuXHRcdHRoaXMudW5pdCA9IG9wdGlvbnMudW5pdCB8fCB0aGlzLnVuaXQ7XG5cdFx0dGhpcy50eXBlID0gb3B0aW9ucy50eXBlIHx8IHRoaXMudHlwZTtcblx0XHR0aGlzLmNhbkJlTmVnYXRpdmUgPSBvcHRpb25zLmNhbkJlTmVnYXRpdmUgPT09IGZhbHNlID8gZmFsc2UgOiB0aGlzLmNhbkJlTmVnYXRpdmU7XG5cdFx0dGhpcy5jYW5CZURlY2ltYWwgPSBvcHRpb25zLmNhbkJlRGVjaW1hbCA9PT0gdHJ1ZSA/IHRydWUgOiB0aGlzLmNhbkJlRGVjaW1hbDtcblx0XHR0aGlzLnByb3BlcnR5ID0gb3B0aW9ucy5wcm9wZXJ0eSB8fCB0aGlzLnByb3BlcnR5O1xuXHRcdHRoaXMudmFsdWUgPSB0aGlzLmZvcm1hdFZhbHVlKCBvcHRpb25zLnZhbHVlICkgfHwgdGhpcy52YWx1ZTtcblx0XHR0aGlzLnByZXBlbmRJY29uID0gb3B0aW9ucy5wcmVwZW5kSWNvbiB8fCB0aGlzLnByZXBlbmRJY29uO1xuXHRcdHRoaXMuYXBwZW5kQ29udHJvbHMgPSBvcHRpb25zLmFwcGVuZENvbnRyb2xzID09PSB0cnVlID8gdHJ1ZSA6IHRoaXMuYXBwZW5kQ29udHJvbHM7XG5cdFx0dGhpcy5sYWJlbCA9IG9wdGlvbnMubGFiZWwgfHwgdGhpcy5sYWJlbDtcblx0XHR0aGlzLml0ZW0gPSBvcHRpb25zLml0ZW0gfHwgdGhpcy5pdGVtO1xuXHR9XG5cblx0dGhpcy50ZW1wbGF0ZSA9IENvbHVtbnMuVGVtcGxhdGVzWyd0ZW1wbGF0ZXMvc3R5bGluZy9jb21wb25lbnRzL2lucHV0LmhicyddO1xufVxuXG5TdHlsZUlucHV0Vmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oKSB7XG5cblx0dmFyIHRlbXBsYXRlID0gdGhpcy50ZW1wbGF0ZSh7XG5cdFx0cHJlcGVuZEljb246IHRoaXMucHJlcGVuZEljb24sXG5cdFx0YXBwZW5kQ29udHJvbHM6IHRoaXMuYXBwZW5kQ29udHJvbHMsXG5cdFx0dHlwZTogdGhpcy50eXBlLFxuXHRcdHByb3BlcnR5OiB0aGlzLnByb3BlcnR5LFxuXHRcdHZhbHVlOiB0aGlzLnZhbHVlLFxuXHRcdGNhbkJlTmVnYXRpdmU6IHRoaXMuY2FuQmVOZWdhdGl2ZSxcblx0XHRsYWJlbDogdGhpcy5sYWJlbFxuXHR9KTtcblxuXHR0aGlzLiR0ZW1wbGF0ZSA9ICQoIHRlbXBsYXRlICk7XG5cblx0Ly8gaWYgKCB0aGlzLmFwcGVuZENvbnRyb2xzICkge1xuXHRcdHRoaXMuX3NldHVwQ29udHJvbHMoKTtcblx0Ly8gfVxuXG5cdHJldHVybiB0aGlzLiR0ZW1wbGF0ZTtcbn1cblxuU3R5bGVJbnB1dFZpZXcucHJvdG90eXBlLl9zZXR1cENvbnRyb2xzID0gZnVuY3Rpb24oKSB7XG5cblx0aWYgKCB0aGlzLnR5cGUgPT09ICdjb2xvcicgKSB7XG5cdFx0dGhpcy4kdGVtcGxhdGUuZmluZCgnaW5wdXQnKS5vbiggJ2lucHV0JywgdGhpcy5fb25DaGFuZ2UuYmluZCggdGhpcyApICk7XG5cdH1cblxuXHR0aGlzLiR0ZW1wbGF0ZS5maW5kKCdpbnB1dCcpLm9uKCAna2V5dXAnLCB0aGlzLl9vbkNoYW5nZS5iaW5kKCB0aGlzICkgKTtcblx0dGhpcy4kdGVtcGxhdGUuZmluZCgnaW5wdXQnKS5vbiggJ2NoYW5nZScsIHRoaXMuX29uQ2hhbmdlLmJpbmQoIHRoaXMgKSApO1xuXHR0aGlzLiR0ZW1wbGF0ZS5maW5kKCcuaW5jcmVtZW50Jykub24oICdjbGljaycsIHRoaXMuX29uSW5jcmVtZW50LmJpbmQoIHRoaXMgKSApO1xuXHR0aGlzLiR0ZW1wbGF0ZS5maW5kKCcuZGVjcmVtZW50Jykub24oICdjbGljaycsIHRoaXMuX29uRGVjcmVtZW50LmJpbmQoIHRoaXMgKSApO1x0XG59XG5cblN0eWxlSW5wdXRWaWV3LnByb3RvdHlwZS5fb25DaGFuZ2UgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdHZhciBuZXdWYWx1ZSA9IHRoaXMuZm9ybWF0VmFsdWUoIHRoaXMuJHRlbXBsYXRlLmZpbmQoJ2lucHV0JykudmFsKCkgKVxuXHR0aGlzLnVwZGF0ZSggbmV3VmFsdWUgKTtcbn1cblxuU3R5bGVJbnB1dFZpZXcucHJvdG90eXBlLl9vbkluY3JlbWVudCA9IGZ1bmN0aW9uKCBldmVudCApIHtcblx0dmFyIG5ld1ZhbHVlID0gdGhpcy5pbmNyZW1lbnQoIHRoaXMuJHRlbXBsYXRlLmZpbmQoJ2lucHV0JykudmFsKCkgKTtcblx0dGhpcy51cGRhdGUoIG5ld1ZhbHVlICk7XG59XG5cblN0eWxlSW5wdXRWaWV3LnByb3RvdHlwZS5fb25EZWNyZW1lbnQgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdHZhciBuZXdWYWx1ZSA9IHRoaXMuZGVjcmVtZW50KCB0aGlzLiR0ZW1wbGF0ZS5maW5kKCdpbnB1dCcpLnZhbCgpICk7XG5cdHRoaXMudXBkYXRlKCBuZXdWYWx1ZSApO1xufVxuXG5TdHlsZUlucHV0Vmlldy5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oIHZhbHVlICkge1xuXHR0aGlzLnZhbHVlID0gdmFsdWU7XG5cdHRoaXMuJHRlbXBsYXRlLmZpbmQoJ2lucHV0JykudmFsKCB2YWx1ZSApO1xuXG5cdC8vIEFsZXJ0IGFueSBsaXN0ZW5lcnMgdGhhdCB0aGUgaXRlbSBoYXMgc3RhcnRlZCBkcmFnXG5cdC8vIHZhciBldmVudCA9IG5ldyBDdXN0b21FdmVudCggJ0NvbHVtbnMuU3R5bGVJbnB1dFZpZXcuVmFsdWVEaWRVcGRhdGVGb3JQcm9wZXJ0eScsIHtcblx0Ly8gXHRpdGVtOiBcdHRoaXMsXG5cdC8vIFx0ZXZlbnQ6IFx0ZXZlbnQsXG5cdC8vIFx0dWk6IFx0dWlcblx0Ly8gfSk7XG5cdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0Ly8gY29sdW1uc0V2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5TdHlsZUlucHV0Vmlldy5WYWx1ZURpZFVwZGF0ZUZvclByb3BlcnR5QW5kSXRlbScsIGZhbHNlLCBmYWxzZSwge1xuXHQvLyBcdGl0ZW06IHRoaXMuaXRlbSxcblx0Ly8gXHRwcm9wZXJ0eTogdGhpcy5wcm9wZXJ0eSxcblx0Ly8gXHR2YWx1ZTogXHR2YWx1ZVxuXHQvLyB9KTtcblx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjb2x1bW5zRXZlbnQpO1xuXHRDb2x1bW5zRXZlbnQuc2VuZCggJ0NvbHVtbnMuU3R5bGVJbnB1dFZpZXcuVmFsdWVEaWRVcGRhdGVGb3JQcm9wZXJ0eUFuZEl0ZW0nLCB7XG5cdFx0aXRlbTogdGhpcy5pdGVtLFxuXHRcdHByb3BlcnR5OiB0aGlzLnByb3BlcnR5LFxuXHRcdHZhbHVlOiBcdHZhbHVlXG5cdH0gKVxufVxuXG5TdHlsZUlucHV0Vmlldy5wcm90b3R5cGUuaW5jcmVtZW50ID0gZnVuY3Rpb24oIHZhbHVlICkge1xuXHR2YXIgcGFyc2VkVmFsdWUgPSB0aGlzLnBhcnNlVmFsdWUoIHZhbHVlICksXG5cdFx0bnVtYmVyID0gK3BhcnNlZFZhbHVlLm51bWJlcixcblx0XHR1bml0ID0gcGFyc2VkVmFsdWUudW5pdCxcblx0XHRuZXdOdW1iZXI7XG5cblx0bmV3TnVtYmVyID0gK3BhcnNlZFZhbHVlLm51bWJlciArIDE7XG5cblx0Ly8gRm9ybWF0IGFuZCByZXR1cm4gdGhlIG5ldyB2YWx1ZVxuXHRyZXR1cm4gdGhpcy5mb3JtYXRWYWx1ZSggbmV3TnVtYmVyICsgdW5pdCApO1xufVxuXG5TdHlsZUlucHV0Vmlldy5wcm90b3R5cGUuZGVjcmVtZW50ID0gZnVuY3Rpb24oIHZhbHVlICkge1xuXHR2YXIgcGFyc2VkVmFsdWUgPSB0aGlzLnBhcnNlVmFsdWUoIHZhbHVlICksXG5cdFx0bnVtYmVyID0gK3BhcnNlZFZhbHVlLm51bWJlcixcblx0XHR1bml0ID0gcGFyc2VkVmFsdWUudW5pdCxcblx0XHRuZXdOdW1iZXI7XG5cblx0bmV3TnVtYmVyID0gK3BhcnNlZFZhbHVlLm51bWJlciAtIDE7XG5cblx0Ly8gRm9ybWF0IGFuZCByZXR1cm4gdGhlIG5ldyB2YWx1ZVxuXHRyZXR1cm4gdGhpcy5mb3JtYXRWYWx1ZSggbmV3TnVtYmVyICsgdW5pdCApO1xufVxuXG5TdHlsZUlucHV0Vmlldy5wcm90b3R5cGUucGFyc2VWYWx1ZSA9IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0dmFyIHJlID0gLyhbXFxkfFxcLnxcXC1dKikoLiopLyxcblx0XHRyZXN1bHQgPSByZS5leGVjKHZhbHVlKTtcblxuXHRyZXR1cm4ge1xuXHRcdG51bWJlcjogcmVzdWx0WyAxIF0sXG5cdFx0dW5pdDogcmVzdWx0WyAyIF1cblx0fVxufVxuXG5TdHlsZUlucHV0Vmlldy5wcm90b3R5cGUudmFsaWRhdGVWYWx1ZSA9IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblxuXHQvLyBJZiB0aGUgdmFsdWUgaXMgaWxsZWdhbGx5IG5lZ2F0aXZlLFxuXHQvLyBzZXQgaXQgdG8gMFxuXHRpZiAoIHZhbHVlIDwgMCAmJiAhdGhpcy5jYW5CZU5lZ2F0aXZlICkge1xuXHRcdHJldHVybiAwO1xuXHR9XG5cblx0Ly8gSWYgdGhlIHZhbHVlIG11c3QgYmUgYW4gaW50LCBwYXJzZSBpdCBhcyBhbiBpbnRcblx0aWYgKCAhdGhpcy5jYW5CZURlY2ltYWwgKSB7XG5cdFx0cmV0dXJuIHBhcnNlSW50KCB2YWx1ZSApO1xuXHR9XG5cblx0Ly8gSWYgbm8gbW9kaWZpY2F0aW9ucyBhcmUgbmVjZXNzYXJ5LFxuXHQvLyByZXR1cm4gdGhlIHZhbHVlIGFzLWlzXG5cdHJldHVybiBwYXJzZUZsb2F0KCB2YWx1ZSApO1xufVxuXG5TdHlsZUlucHV0Vmlldy5wcm90b3R5cGUuZm9ybWF0VmFsdWUgPSBmdW5jdGlvbiggdmFsdWUgKSB7XG5cblx0Ly8gRG9uJ3QgZG8gYW55dGhpbmcgaWYgdGhpcyBpcyBhIGNvbG9yIHZhbHVlXG5cdGlmICggdGhpcy50eXBlID09PSAnY29sb3InICkge1xuXHRcdHJldHVybiB2YWx1ZTtcblx0fVxuXG5cdHZhclx0cGFyc2VkVmFsdWUgPSB0aGlzLnBhcnNlVmFsdWUoIHZhbHVlICksXG5cdFx0bnVtYmVyID0gdGhpcy52YWxpZGF0ZVZhbHVlKCBwYXJzZWRWYWx1ZS5udW1iZXIgKSxcblx0XHR1bml0ID0gcGFyc2VkVmFsdWUudW5pdCB8fCB0aGlzLnVuaXQ7XG5cblx0cmV0dXJuIG51bWJlciArIHVuaXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU3R5bGVJbnB1dFZpZXc7IiwidmFyIENvbHVtbnNFdmVudCA9IHJlcXVpcmUoJy4uL21vZGVscy9Db2x1bW5zRXZlbnQuanMnKTtcblxuSGFuZGxlYmFycy5yZWdpc3RlckhlbHBlcignaWZJc0N1cnJlbnRWYWx1ZScsIGZ1bmN0aW9uKHZhbHVlLCBjdXJyZW50VmFsdWUsIG9wdGlvbnMpIHtcblx0cmV0dXJuIHZhbHVlID09IGN1cnJlbnRWYWx1ZSA/IG9wdGlvbnMuZm4odGhpcykgOiBvcHRpb25zLmludmVyc2UodGhpcyk7XG59KTtcblxudmFyIFRFTVBMQVRFID0gQ29sdW1ucy5UZW1wbGF0ZXNbJ3RlbXBsYXRlcy9zdHlsaW5nL2NvbXBvbmVudHMvbXVsdGlwbGUtc2VnbWVudGVkLWJ1dHRvbi5oYnMnXTtcblxuZnVuY3Rpb24gU3R5bGVNdWx0aXBsZVNlZ21lbnRlZEJ1dHRvblZpZXcoIG9wdGlvbnMgKSB7XG5cblx0dGhpcy5sYWJlbCA9ICcnO1xuXHR0aGlzLmJ1dHRvbnMgPSBbXTtcblx0dGhpcy5wcm9wZXJ0aWVzID0ge307XG5cdHRoaXMuaXRlbSA9IHVuZGVmaW5lZDtcblxuXHRpZiAoIG9wdGlvbnMgKSB7XG5cdFx0dGhpcy5sYWJlbCA9IG9wdGlvbnMubGFiZWwgfHwgdGhpcy5sYWJlbDtcblx0XHR0aGlzLmJ1dHRvbnMgPSBvcHRpb25zLmJ1dHRvbnMgfHwgdGhpcy5idXR0b25zO1xuXHRcdHRoaXMuaXRlbSA9IG9wdGlvbnMuaXRlbSB8fCB0aGlzLml0ZW07XG5cdH1cblxuXHR0aGlzLmJ1dHRvbnMuZm9yRWFjaChmdW5jdGlvbiggYnV0dG9uLCBpICkge1xuXHRcdHRoaXMucHJvcGVydGllc1tidXR0b24ucHJvcGVydHldID0gYnV0dG9uLnZhbHVlcy5jdXJyZW50O1xuXHR9LmJpbmQoIHRoaXMgKSk7XG59XG5cblN0eWxlTXVsdGlwbGVTZWdtZW50ZWRCdXR0b25WaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbigpIHtcblxuXHR2YXIgdGVtcGxhdGUgPSBURU1QTEFURSh7XG5cdFx0bGFiZWw6IHRoaXMubGFiZWwsXG5cdFx0YnV0dG9uczogdGhpcy5idXR0b25zXG5cdH0pO1xuXG5cdHRoaXMuJHRlbXBsYXRlID0gJCggdGVtcGxhdGUgKTtcblxuXHR0aGlzLl9zZXR1cENvbnRyb2xzKCk7XG5cblx0cmV0dXJuIHRoaXMuJHRlbXBsYXRlO1xufTtcblxuU3R5bGVNdWx0aXBsZVNlZ21lbnRlZEJ1dHRvblZpZXcucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKCBwcm9wZXJ0eSwgdmFsdWUgKSB7XG5cblx0dGhpcy5wcm9wZXJ0aWVzW3Byb3BlcnR5XSA9IHZhbHVlO1xuXG5cdC8vIEFsZXJ0IGFueSBsaXN0ZW5lcnMgdGhhdCB0aGUgaXRlbSBoYXMgc3RhcnRlZCBkcmFnXG5cdC8vIHZhciBldmVudCA9IG5ldyBDdXN0b21FdmVudCggJ0NvbHVtbnMuU3R5bGVNdWx0aXBsZVNlZ21lbnRlZEJ1dHRvblZpZXcuVmFsdWVEaWRVcGRhdGVGb3JQcm9wZXJ0eScsIHtcblx0Ly8gXHRpdGVtOiBcdHRoaXMsXG5cdC8vIFx0ZXZlbnQ6IFx0ZXZlbnQsXG5cdC8vIFx0dWk6IFx0dWlcblx0Ly8gfSk7XG5cdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0Ly8gY29sdW1uc0V2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5TdHlsZU11bHRpcGxlU2VnbWVudGVkQnV0dG9uVmlldy5WYWx1ZURpZFVwZGF0ZUZvclByb3BlcnR5QW5kSXRlbScsIGZhbHNlLCBmYWxzZSwge1xuXHQvLyBcdGl0ZW06IHRoaXMuaXRlbSxcblx0Ly8gXHRwcm9wZXJ0eTogcHJvcGVydHksXG5cdC8vIFx0dmFsdWU6IFx0dmFsdWVcblx0Ly8gfSk7XG5cdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY29sdW1uc0V2ZW50KTtcblx0Q29sdW1uc0V2ZW50LnNlbmQoICdDb2x1bW5zLlN0eWxlTXVsdGlwbGVTZWdtZW50ZWRCdXR0b25WaWV3LlZhbHVlRGlkVXBkYXRlRm9yUHJvcGVydHlBbmRJdGVtJywge1xuXHRcdGl0ZW06IHRoaXMuaXRlbSxcblx0XHRwcm9wZXJ0eTogcHJvcGVydHksXG5cdFx0dmFsdWU6IFx0dmFsdWVcblx0fSApO1xufVxuXG5TdHlsZU11bHRpcGxlU2VnbWVudGVkQnV0dG9uVmlldy5wcm90b3R5cGUuX3NldHVwQ29udHJvbHMgPSBmdW5jdGlvbigpIHtcblxuXHR0aGlzLiR0ZW1wbGF0ZS5maW5kKCdidXR0b24nKS5vbiggJ2NsaWNrJywgdGhpcy5fb25DbGljay5iaW5kKCB0aGlzICkgKTtcbn07XG5cblN0eWxlTXVsdGlwbGVTZWdtZW50ZWRCdXR0b25WaWV3LnByb3RvdHlwZS5fb25DbGljayA9IGZ1bmN0aW9uKCBldmVudCApIHtcblx0dmFyICRidXR0b24gPSAkKCBldmVudC50YXJnZXQgKS5pcygnYnV0dG9uJykgPyAkKCBldmVudC50YXJnZXQgKSA6ICQoIGV2ZW50LnRhcmdldCApLnBhcmVudHMoJ2J1dHRvbicpLmZpcnN0KCksXG5cdFx0cHJvcGVydHkgPSAkYnV0dG9uLmRhdGEoJ3Byb3BlcnR5JyksXG5cdFx0dmFsdWU7XG5cblx0aWYgKCAkYnV0dG9uLmhhc0NsYXNzKCdhY3RpdmUnKSApIHtcblx0XHR2YWx1ZSA9ICRidXR0b24uZGF0YSgnaW5hY3RpdmUtdmFsdWUnKTtcblx0fSBlbHNlIHtcblx0XHR2YWx1ZSA9ICRidXR0b24uZGF0YSgnYWN0aXZlLXZhbHVlJyk7XG5cdH1cblxuXHQkYnV0dG9uLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcblxuXHR0aGlzLnVwZGF0ZSggcHJvcGVydHksIHZhbHVlICk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0eWxlTXVsdGlwbGVTZWdtZW50ZWRCdXR0b25WaWV3OyIsInZhciBDb2x1bW5zRXZlbnQgXHRcdFx0XHRcdD0gcmVxdWlyZSgnLi4vbW9kZWxzL0NvbHVtbnNFdmVudC5qcycpO1xuXG5IYW5kbGViYXJzLnJlZ2lzdGVySGVscGVyKCdpZklzQ3VycmVudFZhbHVlJywgZnVuY3Rpb24odmFsdWUsIGN1cnJlbnRWYWx1ZSwgb3B0aW9ucykge1xuXHRyZXR1cm4gdmFsdWUgPT0gY3VycmVudFZhbHVlID8gb3B0aW9ucy5mbih0aGlzKSA6IG9wdGlvbnMuaW52ZXJzZSh0aGlzKTtcbn0pO1xuXG5mdW5jdGlvbiBTdHlsZVNlZ21lbnRlZEJ1dHRvblZpZXcoIG9wdGlvbnMgKSB7XG5cblx0dGhpcy5sYWJlbCA9ICcnO1xuXHR0aGlzLnByb3BlcnR5ID0gJyc7XG5cdHRoaXMuYnV0dG9ucyA9IFtdO1xuXHR0aGlzLnZhbHVlID0gJyc7XG5cdHRoaXMuaXRlbSA9IHVuZGVmaW5lZDtcblxuXHRpZiggb3B0aW9ucyApIHtcblx0XHR0aGlzLmxhYmVsID0gb3B0aW9ucy5sYWJlbCB8fCB0aGlzLmxhYmVsO1xuXHRcdHRoaXMucHJvcGVydHkgPSBvcHRpb25zLnByb3BlcnR5IHx8IHRoaXMucHJvcGVydHk7XG5cdFx0dGhpcy5idXR0b25zID0gb3B0aW9ucy5idXR0b25zIHx8IHRoaXMuYnV0dG9ucztcblx0XHR0aGlzLnZhbHVlID0gb3B0aW9ucy52YWx1ZSB8fCB0aGlzLnZhbHVlO1xuXHRcdHRoaXMuaXRlbSA9IG9wdGlvbnMuaXRlbSB8fCB0aGlzLml0ZW07XG5cdH1cblxuXHR0aGlzLnRlbXBsYXRlID0gQ29sdW1ucy5UZW1wbGF0ZXNbJ3RlbXBsYXRlcy9zdHlsaW5nL2NvbXBvbmVudHMvc2VnbWVudGVkLWJ1dHRvbi5oYnMnXTtcbn1cblxuU3R5bGVTZWdtZW50ZWRCdXR0b25WaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbigpIHtcblxuXHR2YXIgdGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlKHtcblx0XHRsYWJlbDogdGhpcy5sYWJlbCxcblx0XHRwcm9wZXJ0eTogdGhpcy5wcm9wZXJ0eSxcblx0XHR2YWx1ZTogdGhpcy52YWx1ZSxcblx0XHRidXR0b25zOiB0aGlzLmJ1dHRvbnNcblx0fSk7XG5cblx0dGhpcy4kdGVtcGxhdGUgPSAkKCB0ZW1wbGF0ZSApO1xuXG5cdHRoaXMuX3NldHVwQ29udHJvbHMoKTtcblxuXHRyZXR1cm4gdGhpcy4kdGVtcGxhdGU7XG59O1xuXG5TdHlsZVNlZ21lbnRlZEJ1dHRvblZpZXcucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblxuXHR0aGlzLnZhbHVlID0gdmFsdWU7XG5cblx0Ly8gQWxlcnQgYW55IGxpc3RlbmVycyB0aGF0IHRoZSBpdGVtIGhhcyBzdGFydGVkIGRyYWdcblx0Ly8gdmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCAnQ29sdW1ucy5TdHlsZVNlZ21lbnRlZEJ1dHRvblZpZXcuVmFsdWVEaWRVcGRhdGVGb3JQcm9wZXJ0eScsIHtcblx0Ly8gXHRpdGVtOiBcdHRoaXMsXG5cdC8vIFx0ZXZlbnQ6IFx0ZXZlbnQsXG5cdC8vIFx0dWk6IFx0dWlcblx0Ly8gfSk7XG5cdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0Ly8gY29sdW1uc0V2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5TdHlsZVNlZ21lbnRlZEJ1dHRvblZpZXcuVmFsdWVEaWRVcGRhdGVGb3JQcm9wZXJ0eUFuZEl0ZW0nLCBmYWxzZSwgZmFsc2UsIHtcblx0Ly8gXHRpdGVtOiB0aGlzLml0ZW0sXG5cdC8vIFx0cHJvcGVydHk6IHRoaXMucHJvcGVydHksXG5cdC8vIFx0dmFsdWU6IFx0dmFsdWVcblx0Ly8gfSk7XG5cdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY29sdW1uc0V2ZW50KTtcblx0Q29sdW1uc0V2ZW50LnNlbmQoICdDb2x1bW5zLlN0eWxlU2VnbWVudGVkQnV0dG9uVmlldy5WYWx1ZURpZFVwZGF0ZUZvclByb3BlcnR5QW5kSXRlbScsIHtcblx0XHRpdGVtOiB0aGlzLml0ZW0sXG5cdFx0cHJvcGVydHk6IHRoaXMucHJvcGVydHksXG5cdFx0dmFsdWU6IFx0dmFsdWVcblx0fSk7XG59O1xuXG5TdHlsZVNlZ21lbnRlZEJ1dHRvblZpZXcucHJvdG90eXBlLl9zZXR1cENvbnRyb2xzID0gZnVuY3Rpb24oKSB7XG5cblx0dGhpcy4kdGVtcGxhdGUuZmluZCgnYnV0dG9uJykub24oICdjbGljaycsIHRoaXMuX29uQ2xpY2suYmluZCggdGhpcyApICk7XG59O1xuXG5TdHlsZVNlZ21lbnRlZEJ1dHRvblZpZXcucHJvdG90eXBlLl9vbkNsaWNrID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuXHR2YXIgJGJ1dHRvbiA9ICQoIGV2ZW50LnRhcmdldCApLmlzKCdidXR0b24nKSA/ICQoIGV2ZW50LnRhcmdldCApIDogJCggZXZlbnQudGFyZ2V0ICkucGFyZW50cygnYnV0dG9uJykuZmlyc3QoKTtcblxuXHR0aGlzLiR0ZW1wbGF0ZS5maW5kKCdidXR0b24nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdCRidXR0b24uYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXG5cdHRoaXMudXBkYXRlKCAkYnV0dG9uLmRhdGEoJ3ZhbHVlJykgKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU3R5bGVTZWdtZW50ZWRCdXR0b25WaWV3OyIsInZhciBDb2x1bW5zRXZlbnQgXHRcdFx0XHRcdD0gcmVxdWlyZSgnLi4vbW9kZWxzL0NvbHVtbnNFdmVudC5qcycpO1xudmFyIENvbHVtbnMgXHRcdFx0XHRcdFx0PSByZXF1aXJlKCcuLi8uLi9jb21waWxlZC1qYXZhc2NyaXB0cy9zdHlsaW5nL2NvbXBpbGVkLWRhdGEuanMnKTtcbnZhciBTdHlsZUNvbXBvbmVudFZpZXcgXHRcdFx0XHQ9IHJlcXVpcmUoJy4vU3R5bGVDb21wb25lbnRWaWV3LmpzJyk7XG52YXIgVGVtcGxhdGVHcm91cFZpZXcgXHRcdFx0XHQ9IHJlcXVpcmUoJy4vVGVtcGxhdGVHcm91cFZpZXcuanMnKTtcbnZhciBUZW1wbGF0ZVZhbHVlVmlldyBcdFx0XHRcdD0gcmVxdWlyZSgnLi9UZW1wbGF0ZVZhbHVlVmlldy5qcycpO1xuXG5mdW5jdGlvbiBTdHlsZVZpZXcoKSB7XG5cdHRoaXMuJHN0eWxlID0gJCgnI3N0eWxpbmcnKTtcblx0dGhpcy5fc2V0dXBFdmVudExpc3RlbmVycygpO1xufVxuXG5TdHlsZVZpZXcucHJvdG90eXBlLnVwZGF0ZVdpdGhTZWxlY3Rpb24gPSBmdW5jdGlvbiggc2VsZWN0aW9uICkge1xuXHR2YXIgY29tcG9uZW50Vmlldyxcblx0XHQkY29tcG9uZW50O1xuXG5cdC8vIENyZWF0ZSBhIGNvbXBvbmVudCB2aWV3IHdpdGggdGhlIG5ldyBpdGVtXG5cdHNlbGVjdGlvbiA9IHRoaXMuZ2V0SXRlbUZvclNlbGVjdGlvbiggc2VsZWN0aW9uICk7XG5cdGNvbXBvbmVudFZpZXcgPSBuZXcgU3R5bGVDb21wb25lbnRWaWV3KCBzZWxlY3Rpb24gKTtcblx0JGNvbXBvbmVudCA9IGNvbXBvbmVudFZpZXcucmVuZGVyKCk7XG5cblx0Ly8gQ2xlYXIgdGhlIHN0eWxlIHBhbmUgaWYgd2UncmUgYWJvdXQgdG8gcmVuZGVyIGFuIGl0ZW0uXG5cdC8vIE90aGVyd2lzZSwgYXBwZW5kIHRvIHRoZSBlbmQgb2YgdGhlIHBhbmVcblx0aWYoIHNlbGVjdGlvbiBpbnN0YW5jZW9mIEl0ZW0gKSB7XG5cdFx0JCgnLnN0eWxlLWNvbXBvbmVudCcpLnJlbW92ZSgpO1xuXHR9XG5cdFxuXHR0aGlzLiRzdHlsZS5hcHBlbmQoICRjb21wb25lbnQgKTtcbn07XG5cblN0eWxlVmlldy5wcm90b3R5cGUuZ2V0SXRlbUZvclNlbGVjdGlvbiA9IGZ1bmN0aW9uKCBzZWxlY3Rpb24gKSB7XG5cblx0aWYoIHNlbGVjdGlvbiBpbnN0YW5jZW9mIEl0ZW0gKSB7XG5cdFx0cmV0dXJuIHNlbGVjdGlvbjtcblx0fSBlbHNlIGlmICggc2VsZWN0aW9uIGluc3RhbmNlb2YgSXRlbVZpZXcgKSB7XG5cdFx0cmV0dXJuIHNlbGVjdGlvbi5pdGVtO1xuXHR9IGVsc2UgaWYgKCBzZWxlY3Rpb24gaW5zdGFuY2VvZiBUZW1wbGF0ZVZhbHVlVmlldyApIHtcblx0XHRyZXR1cm4gc2VsZWN0aW9uLml0ZW07XG5cdH0gZWxzZSBpZiAoIHNlbGVjdGlvbiBpbnN0YW5jZW9mIFRlbXBsYXRlR3JvdXBWaWV3ICkge1xuXHRcdHJldHVybiBzZWxlY3Rpb247XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgXCJleGNlcHRpb246IFNlbGVjdGlvbiBtdXN0IGJlIGFuIEl0ZW0sIEl0ZW1WaWV3LCBUZW1wbGF0ZVZhbHVlVmlldyBvciBUZW1wbGF0ZUdyb3VwVmlld1wiO1xuXHR9XG59O1xuXG5TdHlsZVZpZXcucHJvdG90eXBlLl9zZXR1cEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gTGlzdGVuIHRvIHVkcGF0ZXMgZnJvbSBzdHlsaW5nIGNvbnRyb2xzXG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuU3R5bGVJbnB1dFZpZXcuVmFsdWVEaWRVcGRhdGVGb3JQcm9wZXJ0eUFuZEl0ZW0nLCB0aGlzLl9vblN0eWxlVXBkYXRlLmJpbmQoIHRoaXMgKSk7XG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuU3R5bGVTZWdtZW50ZWRCdXR0b25WaWV3LlZhbHVlRGlkVXBkYXRlRm9yUHJvcGVydHlBbmRJdGVtJywgdGhpcy5fb25TdHlsZVVwZGF0ZS5iaW5kKCB0aGlzICkpO1xuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLlN0eWxlTXVsdGlwbGVTZWdtZW50ZWRCdXR0b25WaWV3LlZhbHVlRGlkVXBkYXRlRm9yUHJvcGVydHlBbmRJdGVtJywgdGhpcy5fb25TdHlsZVVwZGF0ZS5iaW5kKCB0aGlzICkpO1xuXG5cdC8vIExpc3RlbiB0byB2YWx1ZSB2aWV3IHNlbGVjdGlvblxuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLlRlbXBsYXRlVmFsdWVWaWV3LlZhbHVlRGlkU2VsZWN0V2l0aEl0ZW0nLCB0aGlzLl9vbkl0ZW1TZWxlY3Rpb24uYmluZCggdGhpcyApKTtcblxuXHQvLyBMaXN0ZW4gdG8gaXRlbSBzZWxlY3Rpb25cblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5JdGVtVmlldy5JdGVtRGlkU2VsZWN0JywgdGhpcy5fb25JdGVtU2VsZWN0aW9uLmJpbmQoIHRoaXMgKSk7XG5cblx0Ly8gTGlzdGVuIGZvciB0aGUgdGVtcGxhdGUgdG8gZmluaXNoIHJlbmRlcmluZ1xuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLlRlbXBsYXRlVmlldy5EaWRSZW5kZXInLCB0aGlzLl9vblRlbXBsYXRlRGlkUmVuZGVyLmJpbmQoIHRoaXMgKSk7XHRcbn07XG5cblN0eWxlVmlldy5wcm90b3R5cGUuX29uU3R5bGVVcGRhdGUgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cblx0dGhpcy5fZW1pdENoYW5nZSggZGF0YS5pdGVtLCBkYXRhLnByb3BlcnR5LCBkYXRhLnZhbHVlICk7XG59O1xuXG5TdHlsZVZpZXcucHJvdG90eXBlLl9vbkl0ZW1TZWxlY3Rpb24gPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdHZhciBpdGVtID0gZGF0YS5pdGVtLFxuXHRcdGdyb3VwcyA9IFRlbXBsYXRlVmlldy5nZXRHcm91cHNGb3JJdGVtKCBpdGVtICk7XG5cblx0Ly8gVXBkYXRlIHRoZSBzdHlsZSBwYW5lbCB3aXRoIHRoZSBzZWxlY3RlZCBpdGVtXG5cdHRoaXMudXBkYXRlV2l0aFNlbGVjdGlvbiggaXRlbSApO1xuXG5cdC8vIEFsc28gdXBkYXRlIHdpdGggYW55IHBhcmVudCBncm91cHNcblx0aWYgKCBncm91cHMgJiYgZ3JvdXBzLmxlbmd0aCApIHtcblx0XHRncm91cHMuZm9yRWFjaChmdW5jdGlvbiggZ3JvdXAgKSB7XG5cdFx0XHR0aGlzLnVwZGF0ZVdpdGhTZWxlY3Rpb24oIGdyb3VwICk7XG5cdFx0fS5iaW5kKCB0aGlzICkpO1xuXHR9XG59O1xuXG5TdHlsZVZpZXcucHJvdG90eXBlLl9vblRlbXBsYXRlRGlkUmVuZGVyID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXHR0aGlzLnVwZGF0ZVdpdGhTZWxlY3Rpb24oIFRlbXBsYXRlVmlldy5ncm91cHNbIDAgXSApO1xufTtcblxuU3R5bGVWaWV3LnByb3RvdHlwZS5fZW1pdENoYW5nZSA9IGZ1bmN0aW9uKCBpdGVtLCBwcm9wZXJ0eSwgdmFsdWUgKSB7XG5cblx0Ly8gQWxlcnQgYW55IGxpc3RlbmVycyB0aGF0IHRoZSBncm91cCBpcyBub3cgZW5nYWdlZCB0byBiZSBkcm9wcGVkIHVwb25cblx0Ly8gdmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCAnQ29sdW1ucy5TdHlsZVZpZXcuUHJvcGVydHlEaWRVcGRhdGVXaXRoVmFsdWVGb3JHcm91cFZpZXcnLCB7XG5cdFx0Ly8gZ3JvdXBWaWV3OiBcdGl0ZW0sXG5cdFx0Ly8gcHJvcGVydHk6IHByb3BlcnR5LFxuXHRcdC8vIHZhbHVlOiB2YWx1ZVxuXHQvLyB9KTtcblxuXHR2YXIgZXZlbnRUeXBlLFxuXHRcdGRhdGE7XG5cblx0aWYgKCBpdGVtIGluc3RhbmNlb2YgSXRlbSApIHtcblxuXHRcdGV2ZW50VHlwZSA9ICdDb2x1bW5zLlN0eWxlVmlldy5Qcm9wZXJ0eURpZFVwZGF0ZVdpdGhWYWx1ZUZvckl0ZW0nO1xuXHRcdGRhdGEgPSB7XG5cdFx0XHRpdGVtOiBcdGl0ZW0sXG5cdFx0XHRwcm9wZXJ0eTogcHJvcGVydHksXG5cdFx0XHR2YWx1ZTogdmFsdWVcblx0XHR9O1xuXHRcdENvbHVtbnNFdmVudC5zZW5kKCBldmVudFR5cGUsIGRhdGEgKTtcblxuXHR9IGVsc2UgaWYgKCBpdGVtIGluc3RhbmNlb2YgVGVtcGxhdGVHcm91cFZpZXcgKSB7XG5cdFx0XG5cdFx0ZXZlbnRUeXBlID0gJ0NvbHVtbnMuU3R5bGVWaWV3LlByb3BlcnR5RGlkVXBkYXRlV2l0aFZhbHVlRm9yR3JvdXBWaWV3Jztcblx0XHRkYXRhID0ge1xuXHRcdFx0Z3JvdXBWaWV3OiBcdGl0ZW0sXG5cdFx0XHRwcm9wZXJ0eTogcHJvcGVydHksXG5cdFx0XHR2YWx1ZTogdmFsdWVcblx0XHR9O1xuXHRcdENvbHVtbnNFdmVudC5zZW5kKCBldmVudFR5cGUsIGRhdGEgKTtcblxuXHR9IGVsc2Uge1xuXHRcdC8vIERvIG5vdGhpbmdcblx0fVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTdHlsZVZpZXc7XG4iLCJ2YXIgQ29sdW1uc0V2ZW50ID0gcmVxdWlyZSgnLi4vbW9kZWxzL0NvbHVtbnNFdmVudC5qcycpO1xuXG4vLyBPYmplY3QgdG8gbWFuYWdlIHByb3BlcnRpZXMgb2YgYW5kIGludGVyYWN0aW9uXG4vLyB3aXRoIHRlbXBsYXRlIGdyb3VwIHpvbmVzLlxuLy8gR3JvdXAgem9uZXMgYXJlIHBvcHVsYXRlZCB3aXRoIHZhbHVlIHpvbmVzIGFuZFxuLy8gY2FuIGhhdmUgdGhlaXIgbGF5b3V0IGFuZCBzdHlsZSBhbHRlcmVkLlxuXG5IYW5kbGViYXJzLnJlZ2lzdGVyUGFydGlhbCgnbGF5b3V0JywgQ29sdW1ucy5UZW1wbGF0ZXNbJ3RlbXBsYXRlcy9sYXlvdXQvbGF5b3V0LmhicyddKTtcbkhhbmRsZWJhcnMucmVnaXN0ZXJQYXJ0aWFsKCdzdHlsZScsIENvbHVtbnMuVGVtcGxhdGVzWyd0ZW1wbGF0ZXMvbGF5b3V0L3N0eWxlLmhicyddKTtcblxudmFyIFJPV19HUk9VUF9TRUxFQ1RPUiA9ICcubGF5b3V0LXRlbXBsYXRlLXJvdy1ncm91cCcsIFxuXHRST1dfVkFMVUVfU0VMRUNUT1IgPSAnLmxheW91dC10ZW1wbGF0ZS1yb3ctdmFsdWUnLFxuXHRMQVlPVVRfUFJPUEVSVElFUyA9IFtcblx0XHQnYWxpZ24taXRlbXMnLFxuXHRcdCdmbGV4LWRpcmVjdGlvbicsXG5cdFx0J2p1c3RpZnktY29udGVudCcsXG5cdF07XG5cblRlbXBsYXRlR3JvdXBWaWV3ID0gZnVuY3Rpb24oIHBhcmFtcyApIHtcblxuXHRpZiAoIHBhcmFtcyApIHtcblx0XHR0aGlzLmxheW91dCBcdFx0PSBwYXJhbXMubGF5b3V0IHx8IFtdO1xuXHRcdHRoaXMuc3R5bGVcdFx0XHQ9IG5ldyBTdHlsZSggcGFyYW1zLnN0eWxlIHx8IFtdICk7XG5cdFx0dGhpcy5wbGFjZWhvbGRlciBcdD0gcGFyYW1zLnBsYWNlaG9sZGVyIHx8IGZhbHNlO1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMubGF5b3V0IFx0XHQ9IFtdO1xuXHRcdHRoaXMuc3R5bGVcdFx0XHQ9IG5ldyBTdHlsZSggW10gKTtcblx0XHR0aGlzLnBsYWNlaG9sZGVyIFx0PSBmYWxzZTtcblx0fVxuXG5cdHRoaXMudGVtcGxhdGUgPSBDb2x1bW5zLlRlbXBsYXRlc1sndGVtcGxhdGVzL2xheW91dC9yb3ctZ3JvdXAuaGJzJ107XG5cdHRoaXMuJGdyb3VwO1xufTtcblxuLy8gUmV0dXJuIHRoZSBsYXlvdXQgcHJvcGVydGllcyBhcyBhbiBvYmplY3QsXG4vLyBnaXZlbiBhbnkgalF1ZXJ5IGdyb3VwIG9iamVjdFxuVGVtcGxhdGVHcm91cFZpZXcubGF5b3V0Rm9yR3JvdXAgPSBmdW5jdGlvbiggJGdyb3VwICkge1xuXHR2YXIgbGF5b3V0ID0gW107XG5cblx0aWYgKCAhKCAkZ3JvdXAgaW5zdGFuY2VvZiBqUXVlcnkgKSApIHtcblx0XHR0aHJvdyBcImV4Y2VwdGlvbjogZ3JvdXAgbXVzdCBiZSBqUXVlcnkgb2JqZWN0XCI7XG5cdH1cblxuXHRMQVlPVVRfUFJPUEVSVElFUy5mb3JFYWNoKGZ1bmN0aW9uKCBwcm9wZXJ0eSwgaSApIHtcblx0XHR2YXIgdmFsdWUgPSAkZ3JvdXAuZGF0YSggcHJvcGVydHkgKTtcblx0XHRpZiAoIHZhbHVlICkge1xuXHRcdFx0bGF5b3V0LnB1c2goe1xuXHRcdFx0XHRwcm9wZXJ0eTogcHJvcGVydHksXG5cdFx0XHRcdHZhbHVlOiB2YWx1ZVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9KTtcblx0cmV0dXJuIGxheW91dDtcbn07XG5cblRlbXBsYXRlR3JvdXBWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbigpIHtcblx0dmFyICR0ZW1wbGF0ZSA9ICQoIHRoaXMudGVtcGxhdGUoe1xuXHRcdHBsYWNlaG9sZGVyOiBcdHRoaXMucGxhY2Vob2xkZXIsXG5cdFx0c3R5bGU6IFx0XHRcdHRoaXMuc3R5bGUuc3R5bGVzLFxuXHRcdGxheW91dDogXHRcdHRoaXMubGF5b3V0XG5cdH0pKTtcblx0dGhpcy4kZ3JvdXAgPSAkdGVtcGxhdGU7XG5cblx0dGhpcy5fc2V0dXBFdmVudHMoKTtcblx0dGhpcy5fc2V0dXBEcm9wKCk7XG5cblx0cmV0dXJuIHRoaXMuJGdyb3VwO1xufTtcblxuVGVtcGxhdGVHcm91cFZpZXcucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKCBwcm9wZXJ0eSwgdmFsdWUgKSB7XG5cblx0Ly8gUmVwbGFjZSBlYWNoIGxheW91dCB2YWx1ZSB3aXRoIGEgcG90ZW50aWFsIG5ldyBvbmVcblx0dGhpcy5sYXlvdXQuZm9yRWFjaChmdW5jdGlvbiggbGF5b3V0LCBpICkge1xuXHRcdHRoaXMuJGdyb3VwLmRhdGEoIGxheW91dC5wcm9wZXJ0eSwgbGF5b3V0LnZhbHVlICk7XG5cdFx0dGhpcy4kZ3JvdXAuYXR0ciggJ2xheW91dC0nICsgbGF5b3V0LnByb3BlcnR5LCBsYXlvdXQudmFsdWUgKTtcblx0fS5iaW5kKCB0aGlzICkpO1xuXG5cdC8vIEFsZXJ0IGFueSBsaXN0ZW5lcnMgdGhhdCB0aGUgZ3JvdXAgaGFzIGNoYW5nZWRcblx0Ly8gdmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCAnQ29sdW1ucy5Hcm91cFZpZXcuRGlkQ2hhbmdlJywge1xuXHQvLyBcdGdyb3VwVmlldzogXHR0aGlzXG5cdC8vIH0pO1xuXHQvLyB2YXIgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0Ly8gZXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLlRlbXBsYXRlR3JvdXBWaWV3LkRpZENoYW5nZScsIGZhbHNlLCBmYWxzZSwge1xuXHQvLyBcdGdyb3VwVmlldzogXHR0aGlzXG5cdC8vIH0pO1xuXHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcblxuXHRDb2x1bW5zRXZlbnQuc2VuZCgnQ29sdW1ucy5UZW1wbGF0ZUdyb3VwVmlldy5EaWRDaGFuZ2UnLCB7XG5cdFx0Z3JvdXBWaWV3OiBcdHRoaXNcblx0fSk7XG5cblx0cmV0dXJuIHRoaXMuJGdyb3VwO1xufTtcblxuLy8gUmV0dXJuIHRoZSBjb3JyZWN0IGxheW91dCBhdHRyaWJ1dGUgZm9yIGEgZ2l2ZW4gcHJvcGVydHlcbi8vIEBwYXJhbSB7IHN0cmluZyB9IHByb3BlcnR5IC0tIHRoZSByZXF1ZXN0ZWQgbGF5b3V0IHByb3BlcnR5XG4vLyBAcmV0dXJuIHsgc3RyaW5nIH0gdGhlIGNvcnJlc3BvbmRpbmcgdmFsdWVcblRlbXBsYXRlR3JvdXBWaWV3LnByb3RvdHlwZS5nZXRTdHlsZSA9IGZ1bmN0aW9uKCBwcm9wZXJ0eSApIHtcblx0dmFyIHZhbHVlO1xuXG5cdC8vIElmIHRoZXJlIHdhcyBub3QgbWF0Y2ggaW4gdGhlIGxheW91dCBvYmplY3QsXG5cdC8vIGNoZWNrIHRoZSBzdHlsZSBvYmplY3Rcblx0Ly8gTG9vcCB0aHJvdWdoIGVhY2ggcHJvcGVydHkgdW50aWwgd2UgZmluZCBhIG1hdGNoXG5cdGlmICggdGhpcy5zdHlsZSApIHtcblx0XHR2YWx1ZSA9IHRoaXMuc3R5bGUuZ2V0KCBwcm9wZXJ0eSApXG5cdH1cblxuXHQvLyBMb29wIHRocm91Z2ggZWFjaCBsYXlvdXQgcHJvcGVydHlcblx0Ly8gdW50aWwgd2UgZmluZCBhIG1hdGNoXG5cdC8vIHBvdGVudGlhbGx5IGEgYmV0dGVyIG9uZSB0aGF0IGluIHRoZSBzdHlsZSBzZXRcblx0dGhpcy5sYXlvdXQuZm9yRWFjaChmdW5jdGlvbiggbGF5b3V0LCBpICkge1xuXHRcdGlmICggbGF5b3V0LnByb3BlcnR5ID09PSBwcm9wZXJ0eSApIHtcblx0XHRcdHZhbHVlID0gbGF5b3V0LnZhbHVlXG5cdFx0fVxuXHR9KTtcblxuXHQvLyBBcyBhIGxhc3QgcmVzb3J0LCBjaGVjayB0aGUgY3NzIGZvciB0aGUgZWxlbWVudFxuXHQvLyBhbmQgcmV0dXJuIGl0cyB2YWx1ZVxuXHRpZiAoIHZhbHVlICkge1xuXHRcdHJldHVybiB2YWx1ZTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gdGhpcy4kZ3JvdXAuY3NzKCBwcm9wZXJ0eSApO1xuXHR9XG59O1xuXG4vLyBHZXQgdGhlIHRlbXBsYXRlJ3MgdGl0bGUgZm9yIGRpc3BsYXlcbi8vIFNob3VsZCBiZSAnUm93JyBmb3IgdGhlIGZpcnN0IGdyb3VwIGluIHRoZSB0ZW1wbGF0ZVxuLy8gYW5kICdHcm91cCcgZm9yIGFsbCBvdGhlcnNcbi8vIEByZXR1cm4geyBzdHJpbmcgfSAtLSBUaGUgZ3JvdXAncyB0aXRsZVxuVGVtcGxhdGVHcm91cFZpZXcucHJvdG90eXBlLnRpdGxlID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gSXMgdGhpcyB0aGUgZmlyc3QgZ3JvdXAgaW4gdGhlIHRlbXBsYXRlP1xuXHRpZiAoIHRoaXMuJGdyb3VwLnBhcmVudCgnLmxheW91dC10ZW1wbGF0ZS1yb3cnKS5sZW5ndGggKSB7XG5cdFx0cmV0dXJuICdSb3cnO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiAnR3JvdXAnO1xuXHR9XG59O1xuXG5UZW1wbGF0ZUdyb3VwVmlldy5wcm90b3R5cGUucmVtb3ZlUGxhY2Vob2xkZXJzID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gUmVtb3ZlIGFueSBwbGFjZWhvbGRlciB2YWx1ZXNcblx0dGhpcy4kZ3JvdXAuZmluZChST1dfVkFMVUVfU0VMRUNUT1IpLmZpbHRlcignLnBsYWNlaG9sZGVyJykucmVtb3ZlKCk7XG5cblx0Ly8gUmVtb3ZlIGFueSBwbGFjZWhvbGRlciBncm91cHMgd2hpbGUgbGVhdmluZyB0aGVpciBjaGlsZHJlblxuXHR0aGlzLiRncm91cC5maW5kKFJPV19HUk9VUF9TRUxFQ1RPUikuZmlsdGVyKCcucGxhY2Vob2xkZXInKS5jaGlsZHJlbigpLnVud3JhcCgpO1xufTtcblxuVGVtcGxhdGVHcm91cFZpZXcucHJvdG90eXBlLl9tZXJnZUxheW91dCA9IGZ1bmN0aW9uKCBwcm9wZXJ0eSwgdmFsdWUgKSB7XG5cdHZhciBleGlzdGluZ1Byb3BlcnR5ID0gZmFsc2U7XG5cblx0Ly8gTG9vcCB0aHJvdWdoIHRoZSBvbGQgcHJvcGVydGllc1xuXHQvLyBjb21wYXJpbmcgZWFjaCB3aXRoIHRoZSBuZXcgcHJvcGVydHkuXG5cdC8vIFJlcGxhY2UgYW4gZXhpc3RpbmcgcHJvcGVydHkgYW55dGltZSBhIG5ldyBvbmUgbWF0Y2hlcyBpdC5cblx0Ly8gQXQgdGhlIGVuZCwgYXBwZW5kIGFueSByZW1haW5pbmcgbmV3IHByb3BlcnRpZXMgdG8gdGhlIG1lcmdlZCBzdHlsZXMgYXJyYXkuXG5cdHRoaXMubGF5b3V0LmZvckVhY2goZnVuY3Rpb24oIGxheW91dCwgaSApIHtcblx0XHRpZiAoIGxheW91dC5wcm9wZXJ0eSA9PT0gcHJvcGVydHkgKSB7XG5cdFx0XHRsYXlvdXQudmFsdWUgPSB2YWx1ZTtcblx0XHRcdHRoaXMubGF5b3V0WyBpIF0gPSBsYXlvdXQ7XG5cdFx0XHRleGlzdGluZ1Byb3BlcnR5ID0gdHJ1ZTtcblx0XHR9XG5cdH0uYmluZCggdGhpcyApKTtcblxuXHQvLyBBZGQgYWxsIHJlbWFpbmluZyBuZXcgc3R5bGVzIHRvIHRoZSBzdHlsZXMgYXJyYXlcblx0aWYgKCAhZXhpc3RpbmdQcm9wZXJ0eSApIHtcblx0XHR0aGlzLmxheW91dC5wdXNoKHtcblx0XHRcdHByb3BlcnR5OiBwcm9wZXJ0eSxcblx0XHRcdHZhbHVlOiB2YWx1ZVxuXHRcdH0pO1xuXHR9XG59O1xuXG5UZW1wbGF0ZUdyb3VwVmlldy5wcm90b3R5cGUuX3NldHVwRHJvcCA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLiRncm91cC5kcm9wcGFibGUoe1xuXHRcdHRvbGVyYW5jZTogJ3BvaW50ZXInXG5cdH0pO1xuXG5cdHRoaXMuJGdyb3VwLm9uKCAnZHJvcG92ZXInLCAkLnByb3h5KGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XG5cblx0XHQvLyBBbGVydCBhbnkgbGlzdGVuZXJzIHRoYXQgdGhlIGdyb3VwIGlzIG5vdyBlbmdhZ2VkIHRvIGJlIGRyb3BwZWQgdXBvblxuXHRcdC8vIHZhciBldmVudCA9IG5ldyBDdXN0b21FdmVudCggJ0NvbHVtbnMuVGVtcGxhdGVHcm91cFZpZXcuR3JvdXBEaWRCZWdpbkRyb3BPdmVyV2l0aFZhbHVlVmlldycsIHtcblx0XHQvLyBncm91cFZpZXc6IFx0dGhpcyxcblx0XHQvLyB2YWx1ZVZpZXc6IFx0dWkuZHJvcHBhYmxlLFxuXHRcdC8vIGV2ZW50OiBcdFx0ZXZlbnQsXG5cdFx0Ly8gdWk6IFx0XHR1aVxuXHRcdC8vIH0pO1xuXHRcdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0XHQvLyBjb2x1bW5zRXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLlRlbXBsYXRlR3JvdXBWaWV3Lkdyb3VwRGlkQmVnaW5Ecm9wT3ZlcldpdGhWYWx1ZVZpZXcnLCBmYWxzZSwgZmFsc2UsIHtcblx0XHQvLyBcdGdyb3VwVmlldzogXHR0aGlzLFxuXHRcdC8vIFx0dmFsdWVWaWV3OiBcdHVpLmRyb3BwYWJsZSxcblx0XHQvLyBcdGV2ZW50OiBcdFx0ZXZlbnQsXG5cdFx0Ly8gXHR1aTogXHRcdHVpXG5cdFx0Ly8gfSk7XG5cdFx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjb2x1bW5zRXZlbnQpO1xuXHRcdENvbHVtbnNFdmVudC5zZW5kKCdDb2x1bW5zLlRlbXBsYXRlR3JvdXBWaWV3Lkdyb3VwRGlkQmVnaW5Ecm9wT3ZlcldpdGhWYWx1ZVZpZXcnLCB7XG5cdFx0XHRncm91cFZpZXc6IFx0dGhpcyxcblx0XHRcdHZhbHVlVmlldzogXHR1aS5kcm9wcGFibGUsXG5cdFx0XHRldmVudDogXHRcdGV2ZW50LFxuXHRcdFx0dWk6IFx0XHR1aVxuXHRcdH0pO1xuXG5cdH0sIHRoaXMpICk7XG5cblx0dGhpcy4kZ3JvdXAub24oICdkcm9wb3V0JywgJC5wcm94eShmdW5jdGlvbiggZXZlbnQsIHVpICkge1xuXG5cdFx0Ly8gQWxlcnQgYW55IGxpc3RlbmVycyB0aGF0IHRoZSBncm91cCBpcyBub3cgZW5nYWdlZCB0byBiZSBkcm9wcGVkIHVwb25cblx0XHQvLyB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoICdDb2x1bW5zLlRlbXBsYXRlR3JvdXBWaWV3Lkdyb3VwRGlkRW5kRHJvcE92ZXJXaXRoVmFsdWVWaWV3Jywge1xuXHRcdC8vIGdyb3VwVmlldzogXHR0aGlzLFxuXHRcdC8vIHZhbHVlVmlldzogXHR1aS5kcm9wcGFibGUsXG5cdFx0Ly8gZXZlbnQ6IFx0XHRldmVudCxcblx0XHQvLyB1aTogXHRcdHVpXG5cdFx0Ly8gfSk7XG5cdFx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHRcdC8vIGNvbHVtbnNFdmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuVGVtcGxhdGVHcm91cFZpZXcuR3JvdXBEaWRFbmREcm9wT3ZlcldpdGhWYWx1ZVZpZXcnLCBmYWxzZSwgZmFsc2UsIHtcblx0XHQvLyBcdGdyb3VwVmlldzogXHR0aGlzLFxuXHRcdC8vIFx0dmFsdWVWaWV3OiBcdHVpLmRyb3BwYWJsZSxcblx0XHQvLyBcdGV2ZW50OiBcdFx0ZXZlbnQsXG5cdFx0Ly8gXHR1aTogXHRcdHVpXG5cdFx0Ly8gfSk7XG5cdFx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjb2x1bW5zRXZlbnQpO1xuXHRcdENvbHVtbnNFdmVudC5zZW5kKCdDb2x1bW5zLlRlbXBsYXRlR3JvdXBWaWV3Lkdyb3VwRGlkRW5kRHJvcE92ZXJXaXRoVmFsdWVWaWV3Jywge1xuXHRcdFx0Z3JvdXBWaWV3OiBcdHRoaXMsXG5cdFx0XHR2YWx1ZVZpZXc6IFx0dWkuZHJvcHBhYmxlLFxuXHRcdFx0ZXZlbnQ6IFx0XHRldmVudCxcblx0XHRcdHVpOiBcdFx0dWlcblx0XHR9KTtcblxuXHR9LCB0aGlzKSApO1xuXG5cdHRoaXMuJGdyb3VwLm9uKCAnZHJvcCcsICQucHJveHkoZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcblxuXHRcdC8vIEFsZXJ0IGFueSBsaXN0ZW5lcnMgdGhhdCB0aGUgZ3JvdXAgaXMgbm93IGVuZ2FnZWQgdG8gYmUgZHJvcHBlZCB1cG9uXG5cdFx0Ly8gdmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCAnQ29sdW1ucy5UZW1wbGF0ZUdyb3VwVmlldy5Hcm91cERpZERyb3BXaXRoVmFsdWVWaWV3Jywge1xuXHRcdC8vIGdyb3VwVmlldzogXHR0aGlzLFxuXHRcdC8vIHZhbHVlVmlldzogXHR1aS5kcm9wcGFibGUsXG5cdFx0Ly8gZXZlbnQ6IFx0XHRldmVudCxcblx0XHQvLyB1aTogXHRcdHVpXG5cdFx0Ly8gfSk7XG5cdFx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHRcdC8vIGNvbHVtbnNFdmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuVGVtcGxhdGVHcm91cFZpZXcuR3JvdXBEaWREcm9wV2l0aFZhbHVlVmlldycsIGZhbHNlLCBmYWxzZSwge1xuXHRcdC8vIFx0Z3JvdXBWaWV3OiBcdHRoaXMsXG5cdFx0Ly8gXHR2YWx1ZVZpZXc6IFx0dWkuZHJvcHBhYmxlLFxuXHRcdC8vIFx0ZXZlbnQ6IFx0XHRldmVudCxcblx0XHQvLyBcdHVpOiBcdFx0dWlcblx0XHQvLyB9KTtcblx0XHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGNvbHVtbnNFdmVudCk7XG5cdFx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuVGVtcGxhdGVHcm91cFZpZXcuR3JvdXBEaWREcm9wV2l0aFZhbHVlVmlldycsIHtcblx0XHRcdGdyb3VwVmlldzogXHR0aGlzLFxuXHRcdFx0dmFsdWVWaWV3OiBcdHVpLmRyb3BwYWJsZSxcblx0XHRcdGV2ZW50OiBcdFx0ZXZlbnQsXG5cdFx0XHR1aTogXHRcdHVpXG5cdFx0fSk7XG5cblx0fSwgdGhpcykgKTtcbn07XG5cblRlbXBsYXRlR3JvdXBWaWV3LnByb3RvdHlwZS5fc2V0dXBFdmVudHMgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBMaXN0ZW4gdG8gdXBkYXRlcyBmb3IgdGhpcyBncm91cFxuXHQvLyBhbmQgdXBkYXRlIGlmIHRoZXJlJ3MgYSBtYXRjaFxuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLlN0eWxlVmlldy5Qcm9wZXJ0eURpZFVwZGF0ZVdpdGhWYWx1ZUZvckdyb3VwVmlldycsIHRoaXMuX29uR3JvdXBEaWRDaGFuZ2UuYmluZCggdGhpcyApICk7XG59O1xuXG5UZW1wbGF0ZUdyb3VwVmlldy5wcm90b3R5cGUuX29uR3JvdXBEaWRDaGFuZ2UgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdHZhciAkbmV3R3JvdXAgPSBkYXRhLmdyb3VwVmlldy4kZ3JvdXA7XG5cdGlmICggdGhpcy4kZ3JvdXAuaXMoICRuZXdHcm91cCApICkge1xuXHRcdHRoaXMuX21lcmdlTGF5b3V0KCBkYXRhLnByb3BlcnR5LCBkYXRhLnZhbHVlIClcblx0XHR0aGlzLnVwZGF0ZSgpO1xuXHR9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRlbXBsYXRlR3JvdXBWaWV3OyIsInZhciBDb2x1bW5zRXZlbnQgPSByZXF1aXJlKCcuLi9tb2RlbHMvQ29sdW1uc0V2ZW50LmpzJyk7XG5cbi8vIE9iamVjdCB0byBtYW5hZ2UgcHJvcGVydGllcyBvZiBhbmQgaW50ZXJhY3Rpb25cbi8vIHdpdGggdGVtcGxhdGUgdmFsdWUgem9uZXMuXG4vLyBWYWx1ZSB6b25lcyBhcmUgcG9wdWxhdGVkIHdpdGggaXRlbXMgYW5kXG4vLyBjYW4gcmVhY3QgdG8gY2hhbmdlcyBpbiBhbiBpdGVtJ3MgcHJvcGVydGllcy5cblxuSGFuZGxlYmFycy5yZWdpc3RlclBhcnRpYWwoJ2xheW91dCcsIENvbHVtbnMuVGVtcGxhdGVzWyd0ZW1wbGF0ZXMvbGF5b3V0L2xheW91dC5oYnMnXSk7XG5IYW5kbGViYXJzLnJlZ2lzdGVyUGFydGlhbCgnc3R5bGUnLCBDb2x1bW5zLlRlbXBsYXRlc1sndGVtcGxhdGVzL2xheW91dC9zdHlsZS5oYnMnXSk7XG5cblRlbXBsYXRlVmFsdWVWaWV3ID0gZnVuY3Rpb24oIGl0ZW0sIHBsYWNlaG9sZGVyICkge1xuXG5cdGlmICggaXRlbSAmJiBpdGVtIGluc3RhbmNlb2YgSXRlbSApIHtcblx0XHR0aGlzLml0ZW0gPSBpdGVtXG5cdH0gZWxzZSBpZiAoIGl0ZW0gKSB7XG5cdFx0dGhyb3cgXCJleGNlcHRpb246IGl0ZW0gbXVzdCBiZSBvZiB0eXBlIEl0ZW1cIlxuXHR9IGVsc2Uge1xuXHRcdHRoaXMuaXRlbTtcblx0fVxuXHRcblx0dGhpcy50ZW1wbGF0ZSA9IENvbHVtbnMuVGVtcGxhdGVzWyd0ZW1wbGF0ZXMvbGF5b3V0L3Jvdy12YWx1ZS5oYnMnXTtcblx0dGhpcy5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyIHx8IGZhbHNlO1xuXHR0aGlzLiR2YWx1ZTtcbn07XG5cblRlbXBsYXRlVmFsdWVWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbigpIHtcblx0dmFyICR0ZW1wbGF0ZSA9ICQoIHRoaXMudGVtcGxhdGUoe1xuXHRcdGRhdGE6IFx0XHRcdHRoaXMuaXRlbS5mb3JtYXR0ZWRUaXRsZSgpLFxuXHRcdHN0eWxlOiBcdFx0XHR0aGlzLml0ZW0uc3R5bGUuc3R5bGVzLFxuXHRcdHBsYWNlaG9sZGVyOiBcdHRoaXMucGxhY2Vob2xkZXJcblx0fSkpO1xuXHR0aGlzLiR2YWx1ZSA9ICR0ZW1wbGF0ZTtcblxuXHRpZiAoICF0aGlzLnBsYWNlaG9sZGVyICkge1xuXHRcdHRoaXMuX3NldHVwRXZlbnRzKCk7XG5cdFx0dGhpcy5fc2V0dXBEcmFnKCk7XG5cdFx0dGhpcy5fc2V0dXBDbGljaygpO1xuXHR9XG5cblx0cmV0dXJuIHRoaXMuJHZhbHVlO1xufTtcblxuVGVtcGxhdGVWYWx1ZVZpZXcucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuXHQvLyBVcGRhdGUgdGhlIHZhbHVlJ3MgdGV4dFxuXHR0aGlzLiR2YWx1ZS50ZXh0KCB0aGlzLml0ZW0uZm9ybWF0dGVkVGl0bGUoKSApO1xuXHQvLyBVcGRhdGUgdGhlIHZhbHVlJ3Mgc3R5bGVcblx0dGhpcy4kdmFsdWUuYXR0ciggJ3N0eWxlJywgdGhpcy5pdGVtLnN0eWxlLmNzcygpICk7XG5cdC8vIFVwZGF0ZSB0aGUgdmFsdWUncyBwbGFjZWhvbGRlciBzdGF0dXNcblxuXHQvLyBBbGVydCBhbnkgbGlzdGVuZXJzIHRoYXQgdGhlIHZhbHVlIGhhcyBjaGFuZ2VkXG5cdC8vIHZhciBldmVudCA9IG5ldyBDdXN0b21FdmVudCggJ0NvbHVtbnMuVmFsdWVWaWV3LkRpZENoYW5nZScsIHtcblx0Ly8gXHR2YWx1ZVZpZXc6IFx0dGhpc1xuXHQvLyB9KTtcblx0Ly8gdmFyIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdC8vIGV2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5UZW1wbGF0ZVZhbHVlVmlldy5EaWRDaGFuZ2UnLCBmYWxzZSwgZmFsc2UsIHtcblx0Ly8gXHR2YWx1ZVZpZXc6IFx0dGhpc1xuXHQvLyB9KTtcblx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG5cdENvbHVtbnNFdmVudC5zZW5kKCdDb2x1bW5zLlRlbXBsYXRlVmFsdWVWaWV3LkRpZENoYW5nZScsIHtcblx0XHR2YWx1ZVZpZXc6IFx0dGhpc1xuXHR9KTtcblxuXHRyZXR1cm4gdGhpcy4kdmFsdWU7XG59O1xuXG5UZW1wbGF0ZVZhbHVlVmlldy5wcm90b3R5cGUuX3NldHVwRHJhZyA9IGZ1bmN0aW9uKCkge1xuXG5cdHRoaXMuJHZhbHVlLmRyYWdnYWJsZSh7XG5cdFx0Ly8gcmV2ZXJ0OiAnaW52YWxpZCcsXG5cdFx0Ly8gcmV2ZXJ0RHVyYXRpb246IDIwMCxcblx0XHRoZWxwZXI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGl0ZW1WaWV3ID0gbmV3IEl0ZW1WaWV3KCB0aGlzLml0ZW0gKTtcblx0XHRcdHJldHVybiBpdGVtVmlldy5yZW5kZXIoKTtcblx0XHR9LmJpbmQoIHRoaXMgKSxcblx0XHRvcGFjaXR5OiAuMlxuXHR9KTtcblxuXHR0aGlzLiR2YWx1ZS5vbiggJ2RyYWdzdGFydCcsICQucHJveHkoZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcblxuXHRcdCQoIGV2ZW50LnRhcmdldCApLmFkZENsYXNzKCdpbmFjdGl2ZScpO1xuXG5cdFx0Ly8gTWFrZSBzdXJlIHRoaXMgb2JqZWN0IG5vIGxvbmdlciByZWNlaXZlcyBldmVudCB1cGRhdGVzXG5cdFx0dGhpcy5fdGVhcmRvd25FdmVudHMoKTtcblxuXHRcdC8vIEFsZXJ0IGFueSBsaXN0ZW5lcnMgdGhhdCB0aGUgaXRlbSBoYXMgc3RhcnRlZCBkcmFnXG5cdFx0Ly8gdmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCAnQ29sdW1ucy5JdGVtVmlldy5JdGVtRGlkQmVnaW5EcmFnJywge1xuXHRcdC8vIFx0aXRlbTogXHR0aGlzLFxuXHRcdC8vIFx0ZXZlbnQ6IFx0ZXZlbnQsXG5cdFx0Ly8gXHR1aTogXHR1aVxuXHRcdC8vIH0pO1xuXHRcdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0XHQvLyBjb2x1bW5zRXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLlRlbXBsYXRlVmFsdWVWaWV3LlZhbHVlRGlkQmVnaW5EcmFnV2l0aEl0ZW0nLCBmYWxzZSwgZmFsc2UsIHtcblx0XHQvLyBcdHZhbHVlVmlldzogXHR0aGlzLFxuXHRcdC8vIFx0aXRlbTogXHRcdHRoaXMuaXRlbSxcblx0XHQvLyBcdGV2ZW50OiBcdFx0ZXZlbnQsXG5cdFx0Ly8gXHR1aTogXHRcdHVpXG5cdFx0Ly8gfSk7XG5cdFx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjb2x1bW5zRXZlbnQpO1xuXHRcdENvbHVtbnNFdmVudC5zZW5kKCdDb2x1bW5zLlRlbXBsYXRlVmFsdWVWaWV3LlZhbHVlRGlkQmVnaW5EcmFnV2l0aEl0ZW0nLCB7XG5cdFx0XHR2YWx1ZVZpZXc6IFx0dGhpcyxcblx0XHRcdGl0ZW06IFx0XHR0aGlzLml0ZW0sXG5cdFx0XHRldmVudDogXHRcdGV2ZW50LFxuXHRcdFx0dWk6IFx0XHR1aVxuXHRcdH0pO1xuXG5cdH0sIHRoaXMpICk7XG5cblx0dGhpcy4kdmFsdWUub24oICdkcmFnc3RvcCcsICQucHJveHkoZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcblxuXHRcdCQoIGV2ZW50LnRhcmdldCApLnJlbW92ZSgpO1xuXG5cdFx0Ly8gQWxlcnQgYW55IGxpc3RlbmVycyB0aGF0IHRoZSBpdGVtIGhhcyBzdGFydGVkIGRyYWdcblx0XHQvLyB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoICdDb2x1bW5zLkl0ZW1WaWV3Lkl0ZW1EaWRCRW5kRHJhZycsIHtcblx0XHQvLyBcdGl0ZW06IFx0dGhpcyxcblx0XHQvLyBcdGV2ZW50OiBcdGV2ZW50LFxuXHRcdC8vIFx0dWk6IFx0dWlcblx0XHQvLyB9KTtcblx0XHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdFx0Ly8gY29sdW1uc0V2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5UZW1wbGF0ZVZhbHVlVmlldy5WYWx1ZURpZEVuZERyYWdXaXRoSXRlbScsIGZhbHNlLCBmYWxzZSwge1xuXHRcdC8vIFx0dmFsdWVWaWV3OiBcdHRoaXMsXG5cdFx0Ly8gXHRpdGVtOiBcdFx0dGhpcy5pdGVtLFxuXHRcdC8vIFx0ZXZlbnQ6IFx0XHRldmVudCxcblx0XHQvLyBcdHVpOiBcdFx0dWlcblx0XHQvLyB9KTtcblx0XHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGNvbHVtbnNFdmVudCk7XG5cdFx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuVGVtcGxhdGVWYWx1ZVZpZXcuVmFsdWVEaWRFbmREcmFnV2l0aEl0ZW0nLCB7XG5cdFx0XHR2YWx1ZVZpZXc6IFx0dGhpcyxcblx0XHRcdGl0ZW06IFx0XHR0aGlzLml0ZW0sXG5cdFx0XHRldmVudDogXHRcdGV2ZW50LFxuXHRcdFx0dWk6IFx0XHR1aVxuXHRcdH0pO1xuXG5cdH0sIHRoaXMpICk7XG5cblx0dGhpcy4kdmFsdWUub24oICdkcmFnJywgJC5wcm94eShmdW5jdGlvbiggZXZlbnQsIHVpICkge1xuXG5cdFx0Ly8gQWxlcnQgYW55IGxpc3RlbmVycyB0aGF0IHRoZSBpdGVtIGhhcyBzdGFydGVkIGRyYWdcblx0XHQvLyB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoICdDb2x1bW5zLkl0ZW1WaWV3Lkl0ZW1EaWREcmFnJywge1xuXHRcdC8vIFx0aXRlbTogXHR0aGlzLFxuXHRcdC8vIFx0ZXZlbnQ6IFx0ZXZlbnQsXG5cdFx0Ly8gXHR1aTogXHR1aVxuXHRcdC8vIH0pO1xuXHRcdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0XHQvLyBjb2x1bW5zRXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLlRlbXBsYXRlVmFsdWVWaWV3LlZhbHVlRGlkRHJhZ1dpdGhJdGVtJywgZmFsc2UsIGZhbHNlLCB7XG5cdFx0Ly8gXHR2YWx1ZVZpZXc6IFx0dGhpcyxcblx0XHQvLyBcdGl0ZW06IFx0XHR0aGlzLml0ZW0sXG5cdFx0Ly8gXHRldmVudDogXHRcdGV2ZW50LFxuXHRcdC8vIFx0dWk6IFx0XHR1aVxuXHRcdC8vIH0pO1xuXHRcdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY29sdW1uc0V2ZW50KTtcblx0XHRDb2x1bW5zRXZlbnQuc2VuZCgnQ29sdW1ucy5UZW1wbGF0ZVZhbHVlVmlldy5WYWx1ZURpZERyYWdXaXRoSXRlbScsIHtcblx0XHRcdHZhbHVlVmlldzogXHR0aGlzLFxuXHRcdFx0aXRlbTogXHRcdHRoaXMuaXRlbSxcblx0XHRcdGV2ZW50OiBcdFx0ZXZlbnQsXG5cdFx0XHR1aTogXHRcdHVpXG5cdFx0fSk7XG5cblx0fSwgdGhpcykgKTtcbn07XG5cblRlbXBsYXRlVmFsdWVWaWV3LnByb3RvdHlwZS5fc2V0dXBDbGljayA9IGZ1bmN0aW9uKCkge1xuXG5cdHRoaXMuJHZhbHVlLm9uKCAnY2xpY2snLCAkLnByb3h5KGZ1bmN0aW9uKCBldmVudCApIHtcblxuXHRcdHRoaXMuJHZhbHVlLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xuXG5cdFx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuVGVtcGxhdGVWYWx1ZVZpZXcuVmFsdWVEaWRTZWxlY3RXaXRoSXRlbScsIHtcblx0XHRcdHZhbHVlVmlldzogXHR0aGlzLFxuXHRcdFx0aXRlbTogXHRcdHRoaXMuaXRlbVxuXHRcdH0pO1xuXG5cdH0sIHRoaXMgKSApO1xufTtcblxuVGVtcGxhdGVWYWx1ZVZpZXcucHJvdG90eXBlLl9zZXR1cEV2ZW50cyA9IGZ1bmN0aW9uKCkge1xuXG5cdHRoaXMub25JdGVtRGlkQ2hhbmdlID0gdGhpcy5fb25JdGVtRGlkQ2hhbmdlLmJpbmQoIHRoaXMgKTtcblxuXHQvLyBMaXN0ZW4gdG8gdXBkYXRlcyBmb3IgdGhpcyBpdGVtXG5cdC8vIGFuZCB1cGRhdGUgaWYgdGhlcmUncyBhIG1hdGNoXG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuSXRlbS5EaWRDaGFuZ2UnLCB0aGlzLm9uSXRlbURpZENoYW5nZSApO1xufTtcblxuVGVtcGxhdGVWYWx1ZVZpZXcucHJvdG90eXBlLl90ZWFyZG93bkV2ZW50cyA9IGZ1bmN0aW9uKCkge1xuXG5cdENvbHVtbnNFdmVudC5vZmYoICdDb2x1bW5zLkl0ZW0uRGlkQ2hhbmdlJywgdGhpcy5vbkl0ZW1EaWRDaGFuZ2UgKTtcbn07XG5cblRlbXBsYXRlVmFsdWVWaWV3LnByb3RvdHlwZS5fb25JdGVtRGlkQ2hhbmdlID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXHR2YXIgbmV3SXRlbSA9IGRhdGEuaXRlbTtcblx0aWYgKCB0aGlzLml0ZW0uaXMoIG5ld0l0ZW0gKSApIHtcblx0XHR0aGlzLml0ZW0gPSBuZXdJdGVtO1xuXHRcdHRoaXMudXBkYXRlKCk7XG5cdH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVGVtcGxhdGVWYWx1ZVZpZXc7IiwidmFyIENvbHVtbnNFdmVudCBcdFx0XHRcdD0gcmVxdWlyZSgnLi4vbW9kZWxzL0NvbHVtbnNFdmVudC5qcycpO1xudmFyIFRlbXBsYXRlR3JvdXBWaWV3IFx0XHRcdD0gcmVxdWlyZSgnLi9UZW1wbGF0ZUdyb3VwVmlldy5qcycpO1xudmFyIFRlbXBsYXRlVmFsdWVWaWV3IFx0XHRcdD0gcmVxdWlyZSgnLi9UZW1wbGF0ZVZhbHVlVmlldy5qcycpO1xudmFyIGNvbmZpZyBcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoJy4uLy4uL2NvbXBpbGVkLWphdmFzY3JpcHRzL2NvbmZpZy5qcycpO1xuXG4vLyBPYmplY3QgdG8gbWFuYWdlIHByb3BlcnRpZXMgb2YgYW5kIGludGVyYWN0aW9uXG4vLyB3aXRoIHRoZSB0ZW1wbGF0ZSBpdHNlbGYuXG5cbnZhciBST1dfR1JPVVBfU0VMRUNUT1IgXHRcdD0gJy5sYXlvdXQtdGVtcGxhdGUtcm93LWdyb3VwJywgXG5cdFJPV19WQUxVRV9TRUxFQ1RPUiBcdFx0PSAnLmxheW91dC10ZW1wbGF0ZS1yb3ctdmFsdWUnLFxuXHREUkFHR0lOR19JVEVNX1NFTEVDVE9SIFx0PSAnLnVpLWRyYWdnYWJsZS1kcmFnZ2luZycsXG5cdEVYUEFOREVEX0NMQVNTIFx0XHRcdD0gJ2V4cGFuZGVkJyxcblx0RFJPUFBBQkxFX0NMQVNTIFx0XHQ9ICdkcm9wcGFibGUnO1xuXG5UZW1wbGF0ZVZpZXcgPSBmdW5jdGlvbiggbGF5b3V0ICkgIHtcblxuXHR0aGlzLmxheW91dCA9IGxheW91dDs7XG5cdHRoaXMudGVtcGxhdGUgPSBDb2x1bW5zLlRlbXBsYXRlc1sndGVtcGxhdGVzL2xheW91dC90ZW1wbGF0ZS5oYnMnXTtcblx0dGhpcy4kdGVtcGxhdGU7XG5cblx0dGhpcy5kcmFnZ2luZ0l0ZW07XG5cdHRoaXMuZHJvcHBhYmxlSXRlbXMgPSBbXTtcblxuXHR0aGlzLl9yZW5kZXJQcmV2aWV3KCk7XG5cdHRoaXMuX3NldHVwRXZlbnRMaXN0ZW5lcnMoKTtcblxuXHRUZW1wbGF0ZVZpZXcuZ3JvdXBzID0gW107XG59O1xuXG4vLyBDbGFzcyBNZXRob2RzXG4vLyAtLS0tLS0tLS0tLS0tLS0tXG5UZW1wbGF0ZVZpZXcuZ3JvdXBzID0gW107XG5cbi8vIFJldHVybiB0aGUgY29ycmVjdCB2YWx1ZSBET00gcmVwcmVzZW50YXRpb24gZm9yIGFuIGl0ZW1cbi8vIEBwYXJhbSB7IEl0ZW0gfSBpdGVtIC0tIHRoZSBJdGVtIHRvIHJldHJpdmVcbi8vIEByZXR1cm4geyBqUXVlcnkgfSB0aGUgY29ycmVzcG9uZGluZyB0ZW1wbGF0ZSByZXByZXNldGF0aW9uXG5UZW1wbGF0ZVZpZXcuZ2V0VmFsdWVGb3JJdGVtID0gZnVuY3Rpb24oIGl0ZW0gKSB7XG5cdHZhciAkdmFsdWVzO1xuXG5cdC8vIFRocm93IGFuIGVycm9yIGlmIHRoZSBpdGVtIGlzbid0IG9mIHRoZSBjb3JyZWN0IHR5cGVcblx0aWYoICEoIGl0ZW0gaW5zdGFuY2VvZiBJdGVtKSApIHtcblx0XHR0aHJvdyBcImV4cGVjdGlvbjogaXRlbSBtdXN0IGJlIG9mIHR5cGUgSXRlbVwiO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vIEZpbmQgYWxsIHRoZSBjdXJyZW50IHZhbHVlcyBpbiB0aGUgdGVtcGxhdGVcblx0Ly8gYW5kIGZpbHRlciB0aGVtIGJ5IHRoZWlyIGlubmVyIHRleHRcblx0Ly8gcmV0dXJuaW5nIG9ubHkgdGhlIGZpcnN0IHRoYXQgbWF0Y2hlcyB0aGUgaXRlbSdzIHRpdGxlXG5cdCR2YWx1ZXMgPSAkKFJPV19WQUxVRV9TRUxFQ1RPUikuZmlsdGVyKGZ1bmN0aW9uKCBpLCBlbGVtZW50ICkge1xuXHRcdHJldHVybiAkKCBlbGVtZW50ICkudGV4dCgpLnRyaW0oKSA9PT0gaXRlbS5mb3JtYXR0ZWRUaXRsZSgpO1xuXHR9KTtcblxuXHQvLyBSZXR1cm4gdW5kZWZpbmVkIGlmIHRoZXJlIGFyZSBubyByZXN1bHRpbmcgdmFsdWVzXG5cdGlmICggISR2YWx1ZXMubGVuZ3RoICkge1xuXHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuICR2YWx1ZXM7XG5cdH1cbn1cblxuVGVtcGxhdGVWaWV3LmdldEdyb3Vwc0Zvckl0ZW0gPSBmdW5jdGlvbiggaXRlbSApIHtcblx0dmFyICR2YWx1ZTtcblxuXHQvLyBJZiB0aGUgaXRlbSBpcyBvZiB0eXBlIEl0ZW0sIGNvbnZlcnQgaXQgaW50byBhIHZhbHVlXG5cdGlmICggaXRlbSBpbnN0YW5jZW9mIEl0ZW0gKSB7XG5cdFx0JHZhbHVlID0gdGhpcy5nZXRWYWx1ZUZvckl0ZW0oIGl0ZW0gKTtcblx0fSBlbHNlIGlmICggaXRlbSBpbnN0YW5jZW9mIGpRdWVyeSAmJiBpdGVtLmhhc0NsYXNzKFJPV19WQUxVRV9TRUxFQ1RPUikgKSB7XG5cdFx0JHZhbHVlID0gaXRlbTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBcImV4cGVjdGlvbjogaXRlbSBtdXN0IGJlIG9mIHR5cGUgSXRlbSBvciBqUXVlcnkgdGVtcGxhdGUgcm93XCI7XG5cdH1cblxuXHQvLyBJZiB0aGlzIHZhbHVlIGlzbid0IGluIHRoZSB0ZW1wbGF0ZSwgcmV0dXJuIHVuZGVmaW5lZFxuXHRpZiggISR2YWx1ZSApIHtcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHR9XG5cblx0Ly8gUmV0dXJuIHRoZSB2YWx1ZSdzIHBhcmVudCBncm91cHNcblx0cmV0dXJuICR2YWx1ZS5wYXJlbnRzKFJPV19HUk9VUF9TRUxFQ1RPUikubWFwKGZ1bmN0aW9uKCBpLCBncm91cCApIHtcblx0XHRyZXR1cm4gVGVtcGxhdGVWaWV3LmdldEdyb3VwVmlld0Zvckdyb3VwKCAkKCBncm91cCApICk7XG5cdH0pLnRvQXJyYXkoKTtcblxufTtcblxuVGVtcGxhdGVWaWV3LmdldEdyb3VwVmlld0Zvckdyb3VwID0gZnVuY3Rpb24oIGdyb3VwICkge1xuXHR2YXIgbmV3R3JvdXAgPSBbXTtcblxuXHRpZiAoICEoIGdyb3VwIGluc3RhbmNlb2YgVGVtcGxhdGVHcm91cFZpZXcgKSAmJiAhKCBncm91cCBpbnN0YW5jZW9mIGpRdWVyeSApICkge1xuXHRcdHRocm93IFwiZXhjZXB0aW9uOiBncm91cCBtdXN0IGJlIFRlbXBsYXRlR3JvdXBWaWV3IG9yIGpRdWVyeSBvYmplY3RcIjtcblx0fVxuXG5cdG5ld0dyb3VwID0gVGVtcGxhdGVWaWV3Lmdyb3Vwcy5maWx0ZXIoZnVuY3Rpb24oIG9sZEdyb3VwLCBpICkge1xuXHRcdGlmICggZ3JvdXAgaW5zdGFuY2VvZiBUZW1wbGF0ZUdyb3VwVmlldyAmJiBncm91cCA9PT0gb2xkR3JvdXAgKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9IGVsc2UgaWYgKCBncm91cCBpbnN0YW5jZW9mIGpRdWVyeSAmJiBncm91cC5pcyggb2xkR3JvdXAuJGdyb3VwICkgKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fSk7XG5cblx0aWYgKCBuZXdHcm91cC5sZW5ndGggKSB7XG5cdFx0cmV0dXJuIG5ld0dyb3VwWyAwIF07XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0fVxufTtcblxuVGVtcGxhdGVWaWV3LnJlbW92ZUdyb3VwID0gZnVuY3Rpb24oIGdyb3VwICkge1xuXHR2YXIgZ3JvdXBWaWV3ID0gZ3JvdXAsXG5cdFx0aW5kZXg7XG5cblx0Ly8gSWYgdGhlIGdyb3VwIGlzIGEganF1ZXJ5IG9iamVjdCwgZ2V0IGl0cyBncm91cCB2aWV3XG5cdGlmICggZ3JvdXBWaWV3IGluc3RhbmNlb2YgalF1ZXJ5ICkge1xuXHRcdGdyb3VwVmlldyA9IFRlbXBsYXRlVmlldy5nZXRHcm91cFZpZXdGb3JHcm91cCggZ3JvdXBWaWV3ICk7XG5cdH1cblxuXHQvLyBHZXQgdGhlIGdyb3VwJ3MgaW5kZXggaW4gdGhlIGdyb3VwcyBhcnJheVxuXHRpbmRleCA9IFRlbXBsYXRlVmlldy5ncm91cHMuaW5kZXhPZiggZ3JvdXBWaWV3ICk7XG5cblx0Ly8gTGV0IHRoZSBncm91cCBrbm93IHRoYXQgaXQncyBhYm91dCB0byBiZSByZW1vdmVkXG5cdC8vIGFuZCB0aGVuIHJlbW92ZSBpdFxuXHRpZiAoIGluZGV4ID49IDAgKSB7XG5cdFx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuVGVtcGxhdGVWaWV3LldpbGxSZW1vdmVHcm91cFZpZXcnLCB7XG5cdFx0XHRncm91cFZpZXc6IFx0Z3JvdXBWaWV3XG5cdFx0fSk7XG5cblx0XHRUZW1wbGF0ZVZpZXcuZ3JvdXBzLnNwbGljZSggaW5kZXgsIDEgKTtcblx0fVxufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBSZW5kZXIgdGhlIGxheW91dCBwcmV2aWV3XG5cdHRoaXMuX3JlbmRlclByZXZpZXcoKTtcblxuXHQvLyBSZW5kZXIgYW5kIHJldHVybiB0aGUgdGVtcGxhdGVcblx0cmV0dXJuIHRoaXMuX3JlbmRlclRlbXBsYXRlKCk7XG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLl9yZW5kZXJQcmV2aWV3ID0gZnVuY3Rpb24oKSB7XG5cblx0dmFyIHByZXZpZXcgPSBDb2x1bW5zLlRlbXBsYXRlc1sndGVtcGxhdGVzL2xheW91dC9wcmV2aWV3LmhicyddLFxuXHRcdCRwcmV2aWV3ID0gJCggcHJldmlldyh7XG5cdFx0XHRzb3VyY2U6IGNvbmZpZy5lbWJlZC5ob3N0ICsgY29uZmlnLmVtYmVkLnBhdGhcblx0XHR9KSApO1xuXG5cdHRoaXMuJHByZXZpZXcgPSAkcHJldmlld1xuXHQkKCcjbGF5b3V0JykuYXBwZW5kKCAkcHJldmlldyApO1xuXG5cdHJldHVybiB0aGlzLiRwcmV2aWV3O1xuXG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLl9yZW5kZXJUZW1wbGF0ZSA9IGZ1bmN0aW9uKCkge1xuXG5cdC8vIEZvciBlYWNoIG5vZGUgaW4gdGhlIGxheW91dCBvYmplY3QsXG5cdC8vIHJlbmRlciBlaXRoZXIgYSBncm91cCBvciB2YWx1ZVxuXHQvLyBhbmQgcmVjdXJzaXZlbHkgYXBwZW5kIHRoZW0gdG8gZWFjaCBvdGhlclxuXHQvLyB1bnRpbCB3ZSd2ZSBjb25zdHJ1Y3RlZCB0aGUgZnVsbCB0ZW1wbGF0ZVxuXHR2YXIgJHJvdyA9IHRoaXMuX3JlbmRlclJvd0NvbXBvbmVudCggdGhpcy5sYXlvdXQubW9kZWwgKTtcblx0dmFyICR0ZW1wbGF0ZSA9ICQoIHRoaXMudGVtcGxhdGUoKSApO1xuXHQkdGVtcGxhdGUuZmluZCgnLmxheW91dC10ZW1wbGF0ZS1yb3cnKS5hcHBlbmQoICRyb3cgKTtcblx0JCgnI2xheW91dCcpLmFwcGVuZCggJHRlbXBsYXRlICk7XG5cdHRoaXMuJHRlbXBsYXRlID0gJHRlbXBsYXRlO1xuXG5cdHRoaXMuX3NldHVwVGVtcGxhdGVFdmVudHMoKTtcblx0dGhpcy5fZW1pdFJlbmRlcigpO1xuXHR0aGlzLl9lbWl0Q2hhbmdlKCk7XG5cblx0cmV0dXJuIHRoaXMuJHRlbXBsYXRlO1xuXG59XG5cblxuLy8gUmVuZGVyIGEgcG9ydGlvbiBvZiB0aGUgcm93IGxheW91dCBvYmplY3Rcbi8vIEBwYXJhbSB7IG9iamVjdCB9IGNvbXBvbmVudCAtLSBUaGUgY29tcG9uZW50IHRvIHJlbmRlciAoZWl0aGVyIGEgZ3JvdXAgb3IgdmFsdWUpXG4vLyBAcmV0dXJuIHsgalF1ZXJ5IG9iamVjdCB9IC0tIHRoZSBjb21wb25lbnQncyByZW5kZXJlZCBsYXlvdXRcblRlbXBsYXRlVmlldy5wcm90b3R5cGUuX3JlbmRlclJvd0NvbXBvbmVudCA9IGZ1bmN0aW9uKCBjb21wb25lbnQgKSB7XG5cdHZhciBjb21wb25lbnRWaWV3LFxuXHRcdCRjb21wb25lbnQ7XG5cblx0Ly8gUmVuZGVyIHRoZSB0b3AgbGV2ZWwgY29tcG9uZW50XG5cdC8vIGFzIGEgZ3JvdXAgaWYgaXQncyBhIGdyb3VwXG5cdC8vIG9yIGEgdmFsdWUgaWYgaXQncyBhIHZhbHVlXG5cdGlmICggY29tcG9uZW50LnR5cGUgPT09ICdncm91cCcgKSB7XG5cdFx0Y29tcG9uZW50VmlldyA9IG5ldyBUZW1wbGF0ZUdyb3VwVmlldyh7IGxheW91dDogY29tcG9uZW50LmxheW91dCwgc3R5bGU6IGNvbXBvbmVudC5zdHlsZSB9KTtcblx0XHQkY29tcG9uZW50ID0gY29tcG9uZW50Vmlldy5yZW5kZXIoKTtcblxuXHRcdC8vIEFkZCB0aGUgZ3JvdXAgdG8gdGhlIGdyb3VwcyBhcnJheVxuXHRcdFRlbXBsYXRlVmlldy5ncm91cHMucHVzaCggY29tcG9uZW50VmlldyApO1xuXG5cdFx0Ly8gTG9vcCB0aHJvdWdoIGFsbCBncm91cCBzdWJ2YWx1ZXMgYW5kIHJlbmRlciB0aG9zZSBhcyB3ZWxsXG5cdFx0Y29tcG9uZW50LnZhbHVlcy5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwgaSkge1xuXHRcdFx0JGNvbXBvbmVudC5hcHBlbmQoIHRoaXMuX3JlbmRlclJvd0NvbXBvbmVudCggdmFsdWUgKSApO1xuXHRcdH0uYmluZCggdGhpcyApKTtcblxuXHRcdC8vIFJldHVybiB0aGUgZmluYWwgY29tcG9uZW50IGluY2x1ZGluZyByZW5kZXJlZCBzdWJ2aWV3c1xuXHRcdHJldHVybiAkY29tcG9uZW50O1xuXG5cdH0gZWxzZSBpZiAoIGNvbXBvbmVudC50eXBlID09PSAnc2luZ2xlJyApIHtcblx0XHR2YXIgaXRlbSA9IHRoaXMudGFibGUuZ2V0SXRlbUZvckRhdGEoIGNvbXBvbmVudC5kYXRhICk7XG5cdFx0Y29tcG9uZW50VmlldyA9IG5ldyBUZW1wbGF0ZVZhbHVlVmlldyggaXRlbSApO1xuXHRcdHJldHVybiBjb21wb25lbnRWaWV3LnJlbmRlcigpO1xuXHR9XG5cbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUucmVtb3ZlUGxhY2Vob2xkZXJzID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gUmVtb3ZlIGFueSBwbGFjZWhvbGRlciB2YWx1ZXNcblx0JChST1dfVkFMVUVfU0VMRUNUT1IpLmZpbHRlcignLnBsYWNlaG9sZGVyJykucmVtb3ZlKCk7XG5cblx0Ly8gUmVtb3ZlIGFueSBwbGFjZWhvbGRlciBncm91cHMgd2hpbGUgbGVhdmluZyB0aGVpciBjaGlsZHJlblxuXHQkKFJPV19HUk9VUF9TRUxFQ1RPUikuZmlsdGVyKCcucGxhY2Vob2xkZXInKS5jaGlsZHJlbigpLnVud3JhcCgpO1xufTtcblxuLy8gSWYgdGhpcyB0aGVyZSdzIG9ubHkgb25lIGl0ZW0gbGVmdCBpbiB0aGUgc3Vycm91bmluZyBncm91cCwgZGlzc29sdmUgdGhlIGdyb3VwLlxuLy8gVW5sZXNzIHRoZSBwYXJlbnQgZ3JvdXAgaXMgdGhlIHZlcnkgZmlyc3QgZ3JvdXAgaW4gdGhlIGNlbGwuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLmRpc3NvbHZlU2luZ2xlVmFsdWVHcm91cHMgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBHZXQgYW55IGdyb3VwcyB0aGF0IG9ubHkgaGF2ZSBhIHNpbmdsZSBhY3RpdmUgaXRlbVxuXHQvLyBidXQgZXhjbHVkZSB0aGUgZmlyc3QgZ3JvdXAgaW4gdGhlIHJvd1xuXHR2YXIgJGdyb3VwcyA9ICQoIFJPV19HUk9VUF9TRUxFQ1RPUiApLm5vdCggJy5tYXN0ZXIgPiAnICsgUk9XX0dST1VQX1NFTEVDVE9SICkuZmlsdGVyKGZ1bmN0aW9uKCBpLCBncm91cCApIHtcblx0XHRyZXR1cm4gJCggZ3JvdXAgKS5jaGlsZHJlbiggUk9XX1ZBTFVFX1NFTEVDVE9SICkubm90KCAnLmluYWN0aXZlJyApLmxlbmd0aCA9PT0gMTtcblx0fSk7XG5cblx0Ly8gdmFyICRncm91cHMgPSAkKCBST1dfVkFMVUVfU0VMRUNUT1IgKyAnOm9ubHktY2hpbGQnIClcblx0Ly8gXHQucGFyZW50KClcblx0Ly8gXHQubm90KCAnbWFzdGVyID4gJyArIFJPV19HUk9VUF9TRUxFQ1RPUiApO1xuXG5cdC8vIFVud3JhcCB0aGUgJ29ubHkgY2hpbGRyZW4nIG9mIHRoZXNlIGdyb3Vwc1xuXHQkZ3JvdXBzLmVhY2goZnVuY3Rpb24oIGksIGdyb3VwICkge1xuXHRcdFRlbXBsYXRlVmlldy5yZW1vdmVHcm91cCggJCggZ3JvdXAgKSApO1xuXHR9KTtcblxuXHQkZ3JvdXBzLmNoaWxkcmVuKCkudW53cmFwKCk7XG59O1xuXG4vLyBSZW1vdmUgdGhlIGRyYWdnaW5nIGl0ZW0gZnJvbSB0aGUgdGVtcGxhdGVcbi8vIGlmIGl0IGlzIGEgdmFsdWUuIFByZXN1bWFibHkgdGhpcyBpcyBiZWNhdXNlXG4vLyB0aGUgdXNlciBqdXN0IGRyYWdnZWQgaXQgb3V0IG9mIHRoZSB0ZW1wbGF0ZVxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5yZW1vdmVWYWx1ZSA9IGZ1bmN0aW9uKCB2YWx1ZVZpZXcgKSB7XG5cblx0aWYgKCB2YWx1ZVZpZXcgaW5zdGFuY2VvZiBUZW1wbGF0ZVZhbHVlVmlldyApIHtcblx0XHR2YWx1ZVZpZXcuJHZhbHVlLnJlbW92ZSgpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IFwiZXhjZXB0aW9uOiB2YWx1ZSBtdXN0IGJlIG9mIHR5cGUgVGVtcGxhdGVWYWx1ZVZpZXdcIjtcblx0fVxufTtcblxuLy8gQW5pbWF0ZSB0aGUgZHJhZ2dpbmcgaGVscGVyIHRvIHRoZSBwb3NpdGlvbiBvZiBpdHMgcmVzcGVjdGl2ZSBpdGVtXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLnJlbW92ZURyYWdnaW5nVmFsdWUgPSBmdW5jdGlvbiggY2FsbGJhY2sgKSB7XG5cdHZhciAkaGVscGVyID0gJCgnLnVpLWRyYWdnYWJsZS1kcmFnZ2luZy51aS1kcmFnZ2FibGUtaGFuZGxlJylcblx0XHQkY2xvbmUgPSAkaGVscGVyLmNsb25lKCksXG5cdFx0JGl0ZW0gPSAkKCcjY29sdW1ucyAubGF5b3V0LWNvbHVtbicpLmZpbHRlcihmdW5jdGlvbiggaSwgaXRlbSApIHtcblx0XHRcdC8vIGNvbnNvbGUubG9nKCQoIGl0ZW0gKS50ZXh0KCkudHJpbSgpKTtcblx0XHRcdHJldHVybiAkY2xvbmUudGV4dCgpLnRyaW0oKSA9PT0gJCggaXRlbSApLnRleHQoKS50cmltKCk7XG5cdFx0fSkuZmlyc3QoKTtcblxuXHQvLyBGaW5kIHRoZSBwb3NpdGlvbiBvZiB0aGUgb3JpZ2luYWwgdG9rZW5cblx0Ly8gdmFyIG9yaWdpbmFsUG9zaXRpb24gPSB7XG5cdC8vIFx0dG9wOiAkbWF0Y2gub2Zmc2V0KCkudG9wLFxuXHQvLyBcdGxlZnQ6ICRtYXRjaC5vZmZzZXQoKS5sZWZ0XG5cdC8vIH07XG5cblx0Ly8gQ2hhbmdlIHRoZSBjbG9uZSB0byBwb3NpdGlvbiBmaXhlZFxuXHQvLyBhbmQgYWRkIHRvIGNvbHVtbnMgY29udGFpbmVyXG5cdCQoJy5sYXlvdXQtY29sdW1ucycpLmFwcGVuZCggJGNsb25lICk7XG5cdCRjbG9uZS5jc3Moe1xuXHRcdHBvc2l0aW9uOiAnZml4ZWQnLFxuXHRcdHRvcDogJGhlbHBlci5vZmZzZXQoKS50b3AsXG5cdFx0bGVmdDogJGhlbHBlci5vZmZzZXQoKS5sZWZ0XG5cdH0pO1xuXG5cdC8vICRjbG9uZS5hcHBlbmRUbygnLmxheW91dC1jb2x1bW5zJyk7XG5cblx0JGNsb25lLnZlbG9jaXR5KHtcblx0XHR0cmFuc2xhdGVYOiAkaXRlbS5vZmZzZXQoKS5sZWZ0IC0gJGNsb25lLm9mZnNldCgpLmxlZnQsXG5cdFx0dHJhbnNsYXRlWTogJGl0ZW0ub2Zmc2V0KCkudG9wIC0gJGNsb25lLm9mZnNldCgpLnRvcFxuXHR9LCB7XG5cdFx0ZHVyYXRpb246IDIwMCxcblx0XHRjb21wbGV0ZTogdGhpcy5fb25EcmFnZ2luZ1ZhbHVlUmVtb3ZlZC5iaW5kKCB0aGlzIClcblx0fSk7XG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLl9vbkRyYWdnaW5nVmFsdWVSZW1vdmVkID0gZnVuY3Rpb24gKCBlbGVtZW50cyApIHtcblx0XG5cdC8vIFJlbW92ZSB0aGUgY2xvbmUgZnJvbSB0aGUgRE9NXG5cdCQoIGVsZW1lbnRzWyAwIF0gKS5yZW1vdmUoKTtcblxuXHQvLyBFbWl0IGEgY2hhbmdlIGV2ZW50XG5cdHRoaXMuX2VtaXRDaGFuZ2UoKTtcblxufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5fZW1pdENoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXHRcblx0Ly8gRW1pdCBhIGNoYW5nZSBldmVudFxuXHQvLyB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoICdDb2x1bW5zLlRlbXBsYXRlVmlldy5EaWRDaGFuZ2UnLCB7XG5cdC8vIHRlbXBsYXRlVmlldzogXHR0aGlzXG5cdC8vIH0pO1xuXHQvLyB2YXIgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0Ly8gZXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLlRlbXBsYXRlVmlldy5EaWRDaGFuZ2UnLCBmYWxzZSwgZmFsc2UsIHtcblx0Ly8gXHR0ZW1wbGF0ZVZpZXc6IFx0dGhpc1xuXHQvLyB9KTtcblx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG5cblx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuVGVtcGxhdGVWaWV3LkRpZENoYW5nZScsIHtcblx0XHR0ZW1wbGF0ZVZpZXc6IHRoaXNcblx0fSk7XG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLl9lbWl0UmVuZGVyID0gZnVuY3Rpb24oKSB7XG5cdENvbHVtbnNFdmVudC5zZW5kKCdDb2x1bW5zLlRlbXBsYXRlVmlldy5EaWRSZW5kZXInLCB7XG5cdFx0dGVtcGxhdGVWaWV3OiB0aGlzXG5cdH0pO1xufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5fc2V0dXBFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uKCkge1xuXG5cdC8vIExpc3RlbiB0byB0aGUgdGFibGUgdXBsb2FkIGV2ZW50XG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuVGFibGUuRGlkVXBsb2FkV2l0aFN1Y2Nlc3MnLCB0aGlzLl9vblRlbXBsYXRlVXBsb2FkLmJpbmQoIHRoaXMgKSApO1xufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5fc2V0dXBUZW1wbGF0ZUV2ZW50cyA9IGZ1bmN0aW9uKCkge1xuXG5cdC8vIExpc3RlbiB0byBkcmFnIGV2ZW50cyBmb3IgaXRlbXNcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5JdGVtVmlldy5JdGVtRGlkQmVnaW5EcmFnJywgdGhpcy5fb25JdGVtRGlkQmVnaW5EcmFnLmJpbmQoIHRoaXMgKSk7XG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuSXRlbVZpZXcuSXRlbURpZEVuZERyYWcnLCB0aGlzLl9vbkl0ZW1EaWRFbmREcmFnLmJpbmQoIHRoaXMgKSk7XG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuSXRlbVZpZXcuSXRlbURpZERyYWcnLCB0aGlzLl9vbkl0ZW1EaWREcmFnLmJpbmQoIHRoaXMgKSk7XG5cblx0Ly8gTGlzdGVuIHRvIGRyYWcgZXZlbnRzIGZvciB2YWx1ZXNcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5UZW1wbGF0ZVZhbHVlVmlldy5WYWx1ZURpZEJlZ2luRHJhZ1dpdGhJdGVtJywgdGhpcy5fb25WYWx1ZURpZEJlZ2luRHJhZy5iaW5kKCB0aGlzICkpO1xuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLlRlbXBsYXRlVmFsdWVWaWV3LlZhbHVlRGlkRW5kRHJhZ1dpdGhJdGVtJywgdGhpcy5fb25WYWx1ZURpZEVuZERyYWcuYmluZCggdGhpcyApKTtcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5UZW1wbGF0ZVZhbHVlVmlldy5WYWx1ZURpZERyYWdXaXRoSXRlbScsIHRoaXMuX29uVmFsdWVEaWREcmFnLmJpbmQoIHRoaXMgKSk7XG5cblx0Ly8gTGlzdGVuIHRvIGRyb3AgZXZlbnRzIGZvciBncm91cHNcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5UZW1wbGF0ZUdyb3VwVmlldy5Hcm91cERpZEJlZ2luRHJvcE92ZXJXaXRoVmFsdWVWaWV3JywgdGhpcy5fb25Hcm91cERpZEJlZ2luRHJvcE92ZXIuYmluZCggdGhpcyApKTtcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5UZW1wbGF0ZUdyb3VwVmlldy5Hcm91cERpZEVuZERyb3BPdmVyV2l0aFZhbHVlVmlldycsIHRoaXMuX29uR3JvdXBEaWRFbmREcm9wT3Zlci5iaW5kKCB0aGlzICkpO1xuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLlRlbXBsYXRlR3JvdXBWaWV3Lkdyb3VwRGlkRHJvcFdpdGhWYWx1ZVZpZXcnLCB0aGlzLl9vbkdyb3VwRGlkRHJvcC5iaW5kKCB0aGlzICkpO1xuXG5cdC8vIExpc3RlbiB0byBlbWJlZGRlZCB0YWJsZSBldmVudHNcblx0Q29sdW1uc0V2ZW50Lm9uKCdDb2x1bW5zVGFibGVEaWRSZW5kZXJEYXRhJywgdGhpcy5fb25UYWJsZURpZFJlbmRlckRhdGEuYmluZCggdGhpcyApICk7XG5cdENvbHVtbnNFdmVudC5vbignQ29sdW1uc1RhYmxlRGlkU2Nyb2xsJywgdGhpcy5fb25UYWJsZURpZFNjcm9sbC5iaW5kKCB0aGlzICkgKTtcblx0Q29sdW1uc0V2ZW50Lm9uKCdDb2x1bW5zVGFibGVXaWxsRXhwYW5kJywgdGhpcy5fb25UYWJsZVdpbGxFeHBhbmQuYmluZCggdGhpcyApICk7XG5cdENvbHVtbnNFdmVudC5vbignQ29sdW1uc1RhYmxlRGlkRXhwYW5kJywgdGhpcy5fb25UYWJsZURpZEV4cGFuZC5iaW5kKCB0aGlzICkgKTtcblx0Q29sdW1uc0V2ZW50Lm9uKCdDb2x1bW5zVGFibGVEaWRDb2xsYXBzZScsIHRoaXMuX29uVGFibGVEaWRDb2xsYXBzZS5iaW5kKCB0aGlzICkgKTtcblxuXHQvLyBMaXN0ZW4gZm9yIHVwZGF0ZXMgdG8gdmFsdWVzIGFuZCBncm91cHNcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5UZW1wbGF0ZVZhbHVlVmlldy5EaWRDaGFuZ2UnLCB0aGlzLl9vblRlbXBsYXRlVmlld0RpZENoYW5nZS5iaW5kKCB0aGlzICkpO1xuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLlRlbXBsYXRlR3JvdXBWaWV3LkRpZENoYW5nZScsIHRoaXMuX29uVGVtcGxhdGVWaWV3RGlkQ2hhbmdlLmJpbmQoIHRoaXMgKSk7XG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLl9vblRlbXBsYXRlVmlld0RpZENoYW5nZSA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblx0dGhpcy5fZW1pdENoYW5nZSgpO1xufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5fb25UZW1wbGF0ZVVwbG9hZCA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblx0dGhpcy50YWJsZSA9IGRhdGEudGFibGU7XG5cdHRoaXMubGF5b3V0ID0gZGF0YS50YWJsZS5sYXlvdXQ7XG5cdHRoaXMuX3JlbmRlclRlbXBsYXRlKCk7XG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLl9vblRhYmxlRGlkUmVuZGVyRGF0YSA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblx0dGhpcy4kdGVtcGxhdGUuZmluZCgnLmxheW91dC10ZW1wbGF0ZS1yb3cnKS5jc3Moe1xuXHRcdGhlaWdodDogZGF0YS50YWJsZS50YWxsZXN0Um93SGVpZ2h0KClcblx0fSk7XG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLl9vblRhYmxlV2lsbEV4cGFuZCA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblxuXHQvLyBNb3ZlIHRoZSB0ZW1wbGF0ZSBkb3duIGJlbG93IHRoZSBoZWFkZXJcblx0dGhpcy4kdGVtcGxhdGUudmVsb2NpdHkoe1xuXHRcdHRyYW5zbGF0ZVk6IDBcblx0fSwge1xuXHRcdGR1cmF0aW9uOiA0MDBcblx0fSk7XG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLl9vblRhYmxlRGlkRXhwYW5kID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXG5cdHRoaXMuJHByZXZpZXcuYWRkQ2xhc3MoIEVYUEFOREVEX0NMQVNTICk7XG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLl9vblRhYmxlRGlkQ29sbGFwc2UgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cblx0dGhpcy4kcHJldmlldy5yZW1vdmVDbGFzcyggRVhQQU5ERURfQ0xBU1MgKTtcbn07XG5cdFxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5fb25UYWJsZURpZFNjcm9sbCA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblxuXHQvLyBNb3ZlIHRoZSB0ZW1wbGF0ZSB1cCB1bnRpbCBpdCBoaXRzIHRoZSBoZWFkZXJcblx0dmFyIG1pblNjcm9sbCA9IC0yNCxcblx0XHRtYXhTY3JvbGwgPSAwLFxuXHRcdHNjcm9sbCA9IC0kKCcuY29sdW1ucy10YWJsZS1jb250YWluZXInKS5zY3JvbGxUb3AoKTtcblxuXHQvLyBNYWtlIHN1cmUgdGhlIHNjcm9sbCBpcyB3aXRoaW4gYm91bmRzXG5cdHNjcm9sbCA9IHNjcm9sbCA8IG1pblNjcm9sbCA/IG1pblNjcm9sbCA6IHNjcm9sbDtcblx0c2Nyb2xsID0gc2Nyb2xsID4gbWF4U2Nyb2xsID8gbWF4U2Nyb2xsIDogc2Nyb2xsO1xuXG5cdC8vIEFkanVzdCB0aGUgdGVtcGxhdGVcblx0JC5WZWxvY2l0eS5ob29rKCB0aGlzLiR0ZW1wbGF0ZSwgXCJ0cmFuc2xhdGVZXCIsIHNjcm9sbCArIFwicHhcIiApO1xufTtcbiBcblRlbXBsYXRlVmlldy5wcm90b3R5cGUuX29uSXRlbURpZEJlZ2luRHJhZyA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblx0dGhpcy5kcmFnZ2luZ0l0ZW0gPSBkYXRhLml0ZW0uaXRlbTtcbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuX29uSXRlbURpZEVuZERyYWcgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdHRoaXMuZHJhZ2dpbmdJdGVtID0gdW5kZWZpbmVkO1xuXHR0aGlzLnJlbW92ZVBsYWNlaG9sZGVycygpO1xufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5fb25JdGVtRGlkRHJhZyA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblx0aWYgKCB0aGlzLmRyb3BwYWJsZUl0ZW1zLmxlbmd0aCApIHtcblx0XHR0aGlzLnJlbW92ZVBsYWNlaG9sZGVycygpO1xuXHRcdHRoaXMucG9zaXRpb25Ecm9wRm9yRHJhZ0V2ZW50SW5QYXJlbnRXaXRoUGxhY2Vob2xkZXIoIGRhdGEuZXZlbnQsIHRoaXMuZHJvcHBhYmxlSXRlbXNbIHRoaXMuZHJvcHBhYmxlSXRlbXMubGVuZ3RoIC0gMSBdLiRncm91cCwgdHJ1ZSApO1xuXHR9XG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLl9vblZhbHVlRGlkQmVnaW5EcmFnID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXHR0aGlzLmRyYWdnaW5nSXRlbSA9IGRhdGEudmFsdWVWaWV3Lml0ZW07XG5cdHRoaXMuZGlzc29sdmVTaW5nbGVWYWx1ZUdyb3VwcygpO1xufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5fb25WYWx1ZURpZEVuZERyYWcgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdC8vIGlmICggIXRoaXMuZHJvcHBhYmxlSXRlbXMubGVuZ3RoICkge1xuXHRpZiAoICFUZW1wbGF0ZVZpZXcuZ2V0VmFsdWVGb3JJdGVtKCBkYXRhLnZhbHVlVmlldy5pdGVtICkgKSB7XG5cdFx0dGhpcy5yZW1vdmVEcmFnZ2luZ1ZhbHVlKCk7XG5cdFx0Ly8gdGhpcy5fZW1pdENoYW5nZSgpO1xuXHR9XG59XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuX29uVmFsdWVEaWREcmFnID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXHRpZiAoIHRoaXMuZHJvcHBhYmxlSXRlbXMubGVuZ3RoICkge1xuXHRcdHRoaXMucmVtb3ZlUGxhY2Vob2xkZXJzKCk7XG5cdFx0dGhpcy5wb3NpdGlvbkRyb3BGb3JEcmFnRXZlbnRJblBhcmVudFdpdGhQbGFjZWhvbGRlciggZGF0YS5ldmVudCwgdGhpcy5kcm9wcGFibGVJdGVtc1sgdGhpcy5kcm9wcGFibGVJdGVtcy5sZW5ndGggLSAxIF0uJGdyb3VwICwgdHJ1ZSApO1xuXHR9XG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLl9vbkdyb3VwRGlkQmVnaW5Ecm9wT3ZlciA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblx0aWYgKCB0aGlzLmRyb3BwYWJsZUl0ZW1zLmluZGV4T2YoIGRhdGEuZ3JvdXBWaWV3ICkgPT0gLTEgKSB7XG5cdFx0dGhpcy5kcm9wcGFibGVJdGVtcy5wdXNoKCBkYXRhLmdyb3VwVmlldyApO1xuXHR9XG5cblx0JCggRFJBR0dJTkdfSVRFTV9TRUxFQ1RPUiApLmFkZENsYXNzKCBEUk9QUEFCTEVfQ0xBU1MgKTtcbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuX29uR3JvdXBEaWRFbmREcm9wT3ZlciA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblx0dmFyIGdyb3VwVmlldyA9IGRhdGEuZ3JvdXBWaWV3O1xuXG5cdGdyb3VwVmlldy5yZW1vdmVQbGFjZWhvbGRlcnMoKTtcblx0dGhpcy5kcm9wcGFibGVJdGVtcy5zcGxpY2UoIHRoaXMuZHJvcHBhYmxlSXRlbXMuaW5kZXhPZiggZ3JvdXBWaWV3ICksIDEgKTtcblxuXHQkKCBEUkFHR0lOR19JVEVNX1NFTEVDVE9SICkucmVtb3ZlQ2xhc3MoIERST1BQQUJMRV9DTEFTUyApO1xufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5fb25Hcm91cERpZERyb3AgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdHZhciBncm91cFZpZXcgPSBkYXRhLmdyb3VwVmlldztcblxuXHQvLyBEb24ndCBkbyBhbnl0aGluZyBpZiB0aGlzIGdyb3VwIGlzbid0IHRoZSBtb3N0IHJlY2VudGx5IGhvdmVyZWQgb3ZlclxuXHQvLyBvZiBpZiB0aGVyZSBhcmUgY3VycmVudGx5IG5vIGhvdmVyZWQgZ3JvdXBzICh3aGljaCBzaG91bGQgbmV2ZXIgYmUgdGhlIGNhc2UpXG5cdGlmICggIXRoaXMuZHJvcHBhYmxlSXRlbXMubGVuZ3RoIHx8IHRoaXMuZHJvcHBhYmxlSXRlbXNbIHRoaXMuZHJvcHBhYmxlSXRlbXMubGVuZ3RoIC0gMSBdICE9PSBncm91cFZpZXcgKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gT3RoZXJ3aXNlLCBjbGVhciBhbGwgdGhlIGdyb3VwJ3MgcGxhY2Vob2xkZXJzXG5cdGdyb3VwVmlldy5yZW1vdmVQbGFjZWhvbGRlcnMoKTtcblxuXHQvLyBBbmQgZmluYWxseSBwb3NpdGlvbiB0aGUgbmV3IGl0ZW0gaW4gdGhlIHRlbXBsYXRlXG5cdHRoaXMucG9zaXRpb25Ecm9wRm9yRHJhZ0V2ZW50SW5QYXJlbnRXaXRoUGxhY2Vob2xkZXIoIGRhdGEuZXZlbnQsIHRoaXMuZHJvcHBhYmxlSXRlbXNbIHRoaXMuZHJvcHBhYmxlSXRlbXMubGVuZ3RoIC0gMSBdLiRncm91cCAsIGZhbHNlIClcblxuXHQvLyBFbXB0eSB0aGUgZHJvcHBhYmxlIGl0ZW1zIGFycmF5XG5cdHRoaXMuZHJvcHBhYmxlSXRlbXMgPSBbXTtcblxufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5kaW1lbnNpb25zRm9yVmFsdWUgPSBmdW5jdGlvbiggJHZhbHVlLCBkcmFnVGhyZXNob2xkLCBidWZmZXIgKSB7XG5cdHZhciBkcmFnVGhyZXNob2xkXHQ9IGRyYWdUaHJlc2hvbGQgfHwgMC41LFxuXHRcdGJ1ZmZlciBcdFx0XHQ9IGJ1ZmZlciB8fCAwLjIsXG5cdFx0ZGlyZWN0aW9uIFx0XHQ9ICR2YWx1ZS5wYXJlbnQoKS5kYXRhKCdmbGV4LWRpcmVjdGlvbicpIHx8ICdyb3cnLFxuXHRcdGJ1ZmZlclhcdFx0XHQ9IGRpcmVjdGlvbiA9PT0gJ3JvdycgPyBidWZmZXIgOiAwLFxuXHRcdGJ1ZmZlcllcdFx0XHQ9IGRpcmVjdGlvbiA9PT0gJ2NvbHVtbicgPyBidWZmZXIgOiAwO1xuXG5cdHJldHVybiB7XG5cdFx0dG9wOiBcdFx0XHQkdmFsdWUub2Zmc2V0KCkudG9wLFxuXHRcdGxlZnQ6IFx0XHRcdCR2YWx1ZS5vZmZzZXQoKS5sZWZ0LFxuXHRcdGJvdHRvbTogXHRcdCR2YWx1ZS5vZmZzZXQoKS50b3AgKyAkdmFsdWUuaGVpZ2h0KCksXG5cdFx0cmlnaHQ6IFx0XHRcdCR2YWx1ZS5vZmZzZXQoKS5sZWZ0ICsgJHZhbHVlLndpZHRoKCksXG5cblx0XHRtaWRkbGVYOiBcdFx0JHZhbHVlLm9mZnNldCgpLmxlZnQgKyAoICR2YWx1ZS53aWR0aCgpIC8gMiApLFxuXHRcdG1pZGRsZVk6IFx0XHQkdmFsdWUub2Zmc2V0KCkudG9wICsgKCAkdmFsdWUuaGVpZ2h0KCkgLyAyICksXG5cblx0XHRkcmFnTWlkZGxlWDogXHQkdmFsdWUub2Zmc2V0KCkubGVmdCArICggJHZhbHVlLndpZHRoKCkgKiBkcmFnVGhyZXNob2xkICksXG5cdFx0ZHJhZ01pZGRsZVk6IFx0JHZhbHVlLm9mZnNldCgpLnRvcCArICggJHZhbHVlLmhlaWdodCgpICogZHJhZ1RocmVzaG9sZCApLFxuXHRcdGRyYWdNaWRkbGU6IFx0ZGlyZWN0aW9uID09PSAncm93JyA/IFx0JHZhbHVlLm9mZnNldCgpLmxlZnQgKyAoICR2YWx1ZS53aWR0aCgpICogZHJhZ1RocmVzaG9sZCApIDpcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCR2YWx1ZS5vZmZzZXQoKS50b3AgKyAoICR2YWx1ZS5oZWlnaHQoKSAqIGRyYWdUaHJlc2hvbGQgKSxcblxuXHRcdGJ1ZmZlclRvcDogXHRcdCR2YWx1ZS5vZmZzZXQoKS50b3AgKyAoICR2YWx1ZS5oZWlnaHQoKSAqIGJ1ZmZlclkgKSxcblx0XHRidWZmZXJMZWZ0OiBcdCR2YWx1ZS5vZmZzZXQoKS5sZWZ0ICsgKCAkdmFsdWUud2lkdGgoKSAqIGJ1ZmZlclggKSxcblx0XHRidWZmZXJCb3R0b206IFx0JHZhbHVlLm9mZnNldCgpLnRvcCArICR2YWx1ZS5oZWlnaHQoKSAtICggJHZhbHVlLmhlaWdodCgpICogYnVmZmVyWSApLFxuXHRcdGJ1ZmZlclJpZ2h0OiBcdCR2YWx1ZS5vZmZzZXQoKS5sZWZ0ICsgJHZhbHVlLndpZHRoKCkgLSAoICR2YWx1ZS53aWR0aCgpICogYnVmZmVyWCApXG5cdH07XG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLmlzSW50ZXJzZWN0ZWQgPSBmdW5jdGlvbiggdmFsdWVzLCBldmVudCApIHtcblxuXHQvLyBBY2NvdW50IGZvciB0aGUgbGF5b3V0J3Mgc2Nyb2xsIG9mZnNldCwgd2hpY2ggY2FuIG1lc3MgdXAgdGhlIGNhbGN1bGF0aW9uc1xuXHR2YXIgc2Nyb2xsT2Zmc2V0IFx0PSBwYXJzZUludCgkLlZlbG9jaXR5Lmhvb2soJChcIiNsYXlvdXRcIiksIFwidHJhbnNsYXRlWVwiKSkgfHwgMCxcblx0XHRkcmFnT2Zmc2V0WCBcdD0gZXZlbnQuY2xpZW50WCxcblx0XHRkcmFnT2Zmc2V0WVx0XHQ9IGV2ZW50LmNsaWVudFk7XG5cblx0cmV0dXJuIFx0dmFsdWVzLmJ1ZmZlckxlZnQgXHRcdFx0XHRcdDw9IGRyYWdPZmZzZXRYICYmXG5cdFx0XHR2YWx1ZXMuYnVmZmVyUmlnaHQgXHRcdFx0XHRcdD49IGRyYWdPZmZzZXRYICYmXG5cdFx0XHR2YWx1ZXMuYnVmZmVyVG9wIC0gc2Nyb2xsT2Zmc2V0IFx0PD0gZHJhZ09mZnNldFkgJiZcblx0XHRcdHZhbHVlcy5idWZmZXJCb3R0b20gLSBzY3JvbGxPZmZzZXQgXHQ+PSBkcmFnT2Zmc2V0WTtcbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuaXNQcmV2aW91cyA9IGZ1bmN0aW9uKCB2YWx1ZXMsIGRyYWdQb2ludCApIHtcblx0cmV0dXJuIGRyYWdQb2ludCA+PSB2YWx1ZXMuZHJhZ01pZGRsZTtcbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUud3JhcFZhbHVlV2l0aEdyb3VwID0gZnVuY3Rpb24oICR2YWx1ZSwgcGxhY2Vob2xkZXIgKSB7XG5cdFxuXHQvLyBNYWtlIHN1cmUgdGhlIGdyb3VwIGhhcyB0aGUgb3Bwb3NpdGUgZGlyZWN0aW9uIG9mIGl0cyBwYXJlbnRcblx0dmFyIGRpcmVjdGlvbiBcdD0gJHZhbHVlLnBhcmVudCgpLmRhdGEoJ2ZsZXgtZGlyZWN0aW9uJykgPT09ICdjb2x1bW4nID8gJ3JvdycgOiAnY29sdW1uJztcblx0dmFyIGdyb3VwIFx0XHQ9IG5ldyBUZW1wbGF0ZUdyb3VwVmlldyh7XG5cdFx0cGxhY2Vob2xkZXI6IHBsYWNlaG9sZGVyLFxuXHRcdGxheW91dDogW3tcblx0XHRcdHByb3BlcnR5OiAgXHQnZmxleC1kaXJlY3Rpb24nLFxuXHRcdFx0dmFsdWU6IFx0XHQgZGlyZWN0aW9uXG5cdFx0fV1cblx0fSk7XG5cblx0dmFyICRncm91cCA9IGdyb3VwLnJlbmRlcigpO1xuXG5cdC8vIEZpcnN0IGFkZCB0aGUgZ3JvdXAgdG8gdGhlIERPTSBiZWZvcmUgdGhlIHZhbHVlXG5cdC8vIGFuZCB0aGVuIG1vdmUgdGhlIHZhbHVlIGludG8gdGhlIGdyb3VwLlxuXHQvLyBXZSBkbyB0aGlzIGluc3RlYWQgb2YganF1ZXJ5J3Mgd3JhcCBiZWNhdXNlIHdyYXAgaW5zZXJ0cyBhIGNsb25lXG5cdC8vIGFuZCB3ZSBuZWVkIHRoZSBwcmV2aW91c2x5IHJlbmRlcmVkIG9iamVjdCBpdHNlbGYgaW4gdGhlIERPTS5cblx0JGdyb3VwLmluc2VydEJlZm9yZSggJHZhbHVlICk7XG5cdCRncm91cC5hcHBlbmQoICR2YWx1ZSApO1xuXG5cdC8vIFdyYXAgdGhlIHZhbHVlIHdpdGggdGhlIG5ldyBncm91cFxuXHQvLyAkdmFsdWUud3JhcCggJGdyb3VwICk7XG5cdC8vICRncm91cC5hcHBlbmQoICR2YWx1ZSApO1xuXG5cdGlmICggIXBsYWNlaG9sZGVyICkge1xuXHRcdFRlbXBsYXRlVmlldy5ncm91cHMucHVzaCggZ3JvdXAgKTtcblx0fVxuXG5cdFxuXHQvLyByZXR1cm4gJHZhbHVlLndyYXAoICRncm91cCApO1xufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5pbnNlcnREcm9wQmVmb3JlRWxlbWVudEluUGFyZW50V2l0aFBsYWNlaG9sZGVyID0gZnVuY3Rpb24oIGl0ZW0sICRwcmV2aW91cywgJHBhcmVudCwgcGxhY2Vob2xkZXIgKSB7XG5cblx0Ly8gQ3JlYXRlIGEgbmV3IHZhbHVlIHZpZXcgd2l0aCB0aGUgYXBwcm9wcmlhdGUgcGxhY2Vob2xkZXIgc3RhdHVzXG5cdHZhciB2YWx1ZVZpZXcgXHQ9IG5ldyBUZW1wbGF0ZVZhbHVlVmlldyggaXRlbSwgcGxhY2Vob2xkZXIgKSxcblx0XHQkdmFsdWUgXHRcdD0gdmFsdWVWaWV3LnJlbmRlcigpO1xuXG5cdC8vIElmIHRoZXJlIGlzIGEgcHJldmlvdXMgaXRlbSwgaW5zZXJ0IHRoZSBuZXcgaXRlbSBqdXN0IGFmdGVyIGl0XG5cdC8vIE90aGVyd2lzZSBqdXN0IGFkZCB0aGUgaXRlbSB0byB0aGUgcGFyZW50IGFzIHRoZSBmaXJzdCBjaGlsZFxuXHRpZiAoICRwcmV2aW91cyApIHtcblx0XHQkcHJldmlvdXMuYWZ0ZXIoICR2YWx1ZSApO1xuXHR9IGVsc2Uge1x0XG5cdFx0JHBhcmVudC5wcmVwZW5kKCAkdmFsdWUgKTtcblx0fVxuXG5cdGlmICggIXBsYWNlaG9sZGVyICkge1xuXHRcdHRoaXMuX2VtaXRDaGFuZ2UoKTtcblx0fSBcbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUucG9zaXRpb25Ecm9wRm9yRHJhZ0V2ZW50SW5QYXJlbnRXaXRoUGxhY2Vob2xkZXIgPSBmdW5jdGlvbiggZXZlbnQsICRwYXJlbnQsIHBsYWNlaG9sZGVyICkge1xuXHRcdFxuXHRcdC8vIE1ha2Ugc3VyZSB3ZSBoYXZlIGEgcGFyZW50XG5cdFx0aWYgKCAhJHBhcmVudCApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBTZXQgdXAgbmVjZXNzYXJ5IHZhcmlhYmxlcy4gVGhlbixcblx0XHQvLyBHZXQgYWxsIHRoZSBpdGVtcyBpbiB0aGUgZ3JvdXBcblx0XHQvLyBhbmQgZmlsdGVyIG91dCB0aGUgcGxhY2Vob2xkZXJzXG5cdFx0Ly8gYW5kIHRoZSBkcmFnZ2luZyBpdGVtXG5cdFx0dmFyIGRpbWVuc2lvbnMsXG5cdFx0XHRkcmFnUG9pbnQsXG5cdFx0XHQkcHJldmlvdXNDaGlsZCxcblx0XHRcdCRjaGlsZCxcblx0XHRcdCRjaGlsZHJlbiA9ICRwYXJlbnQuY2hpbGRyZW4oKVxuXHRcdFx0XHRcdFx0Lm5vdCgnLnBsYWNlaG9sZGVyJylcblx0XHRcdFx0XHRcdC5ub3QoJy5pbmFjdGl2ZScpXG5cdFx0XHRcdFx0XHQubm90KCcudWktZHJhZ2dhYmxlLWRyYWdnaW5nJyk7XG5cblx0XHQvLyBJZiB0aGVyZSBhcmVuJ3QgYW55IGNoaWxkcmVuLFxuXHRcdC8vIGp1c3QgaW5zZXJ0IHRoZSBwbGFjZWhvbGRlciBhdCB0aGUgYmVnaW5uaW5nXG5cdFx0aWYgKCAhJGNoaWxkcmVuLmxlbmd0aCApIHtcblx0XHRcdHRoaXMuaW5zZXJ0RHJvcEJlZm9yZUVsZW1lbnRJblBhcmVudFdpdGhQbGFjZWhvbGRlciggdGhpcy5kcmFnZ2luZ0l0ZW0sIG51bGwsICRwYXJlbnQsIHBsYWNlaG9sZGVyKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQkY2hpbGRyZW4uZWFjaChmdW5jdGlvbiggaSwgY2hpbGQgKSB7XG5cdFx0XHQkY2hpbGQgPSAkKCBjaGlsZCApO1xuXG5cdFx0XHQvLyBBcmUgd2UgaW50ZXJzZWN0aW5nIGRpcmVjdGx5IHdpdGggdGhlIGNoaWxkP1xuXHRcdFx0ZGltZW5zaW9ucyA9IHRoaXMuZGltZW5zaW9uc0ZvclZhbHVlKCAkY2hpbGQgKTtcblx0XHRcdGlmICggdGhpcy5pc0ludGVyc2VjdGVkKCBkaW1lbnNpb25zLCBldmVudCApICkge1xuXHRcdFx0XHQvLyBSZXNldCB0aGUgcHJldmlvdXMgY2hpbGRcblx0XHRcdFx0JHByZXZpb3VzQ2hpbGQgPSBudWxsO1xuXG5cdFx0XHRcdC8vIFdyYXAgdGhlIHR3byBpdGVtcyBpbiBhIGdyb3VwXG5cdFx0XHRcdC8vIGFuZCBtYWtlIHRoZSBuZXcgZ3JvdXAgdGhlIG5ldyBwYXJlbnRcblx0XHRcdFx0dGhpcy53cmFwVmFsdWVXaXRoR3JvdXAoICRjaGlsZCwgcGxhY2Vob2xkZXIgKTtcblx0XHRcdFx0JHBhcmVudCA9ICRjaGlsZC5wYXJlbnQoKTtcblxuXHRcdFx0XHQvLyBEZXRlcm1pbmUgd2hldGhlciB0aGUgbmV3IHZhbHVlIGdvZXMgZmlyc3Qgb3Igc2Vjb25kIGluIHRoZSBuZXcgZ3JvdXBcblx0XHRcdFx0Ly8gdXNpbmcgbmV3IGRpbWVuc2lvbnMgYXMgYSByZXN1bHQgb2YgdGhlIG5ldyBncm91cFxuXHRcdFx0XHRkaW1lbnNpb25zID0gdGhpcy5kaW1lbnNpb25zRm9yVmFsdWUoICRjaGlsZCApO1xuXHRcdFx0XHRkcmFnUG9pbnQgPSAkcGFyZW50LmRhdGEoJ2ZsZXgtZGlyZWN0aW9uJykgPT0gJ2NvbHVtbicgPyBldmVudC5jbGllbnRZIDogZXZlbnQuY2xpZW50WDtcblx0XHRcdFx0aWYgKCB0aGlzLmlzUHJldmlvdXMoIGRpbWVuc2lvbnMsIGRyYWdQb2ludCkgKSB7XG5cdFx0XHRcdFx0JHByZXZpb3VzQ2hpbGQgPSAkY2hpbGQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gUHJlcGFyZSBkaW1lbnNpb25zIGZvciBkZXRlcm1pbmluZyB3aGljaCB2YWx1ZXMgZ29lcyBmaXJzdCBpbiB0aGUgZ3JvdXBcblx0XHRcdFx0ZGltZW5zaW9ucyA9IHRoaXMuZGltZW5zaW9uc0ZvclZhbHVlKCAkY2hpbGQgKTtcblx0XHRcdFx0ZHJhZ1BvaW50ID0gJHBhcmVudC5kYXRhKCdmbGV4LWRpcmVjdGlvbicpID09ICdjb2x1bW4nID8gZXZlbnQuY2xpZW50WSA6IGV2ZW50LmNsaWVudFg7XG5cdFx0XHRcdGlmICggdGhpcy5pc1ByZXZpb3VzKCBkaW1lbnNpb25zLCBkcmFnUG9pbnQpICkge1xuXHRcdFx0XHRcdCRwcmV2aW91c0NoaWxkID0gJGNoaWxkO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHR9LmJpbmQoIHRoaXMgKSk7XG5cblx0XHQvLyBBZGQgdGhlIG5ldyBpdGVtIHRvIHRoZSBuZXcgZ3JvdXBcblx0XHR0aGlzLmluc2VydERyb3BCZWZvcmVFbGVtZW50SW5QYXJlbnRXaXRoUGxhY2Vob2xkZXIoIHRoaXMuZHJhZ2dpbmdJdGVtLCAkcHJldmlvdXNDaGlsZCwgJHBhcmVudCwgcGxhY2Vob2xkZXIgKTtcblx0XHRcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVGVtcGxhdGVWaWV3OyIsInZhciBDb2x1bW5zRXZlbnQgPSByZXF1aXJlKCcuLi9tb2RlbHMvQ29sdW1uc0V2ZW50LmpzJyk7XG5cbnZhciBNQVhfUk9XUyA9IDIwLFxuXHRVUExPQURfQlVUVE9OX1NFTEVDVE9SID0gJy5jb2x1bW5zLXVwbG9hZC1idXR0b24nO1xuXG5mdW5jdGlvbiBVcGxvYWRWaWV3KCkge1xuXHR0aGlzLnBhcnNlZFJvd3MgPSAwO1xufVxuXG5VcGxvYWRWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbigpIHtcblxuXHR0aGlzLiR1cGxvYWQgPSAkKCcjdXBsb2FkJyk7XG5cblx0dGhpcy5fc2V0dXBFdmVudExpc3RlbmVycygpO1xuXHRyZXR1cm4gdGhpcy4kdXBsb2FkO1xufTtcblxuVXBsb2FkVmlldy5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLiR1cGxvYWQudmVsb2NpdHkoe1xuXHRcdG9wYWNpdHk6IDFcblx0fSwge1xuXHRcdGR1cmF0aW9uOiAyMDAsXG5cdFx0ZWFzaW5nOiAnZWFzZS1vdXQnLFxuXHRcdGJlZ2luOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuJHVwbG9hZC5hZGRDbGFzcygnYW5pbWF0aW5nJyk7XG5cdFx0fS5iaW5kKCB0aGlzICksXG5cdFx0Y29tcGxldGU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy4kdXBsb2FkLnJlbW92ZUNsYXNzKCdhbmltYXRpbmcnKTtcblx0XHRcdHRoaXMuJHVwbG9hZC5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdFx0fS5iaW5kKCB0aGlzIClcblx0fSk7XG59O1xuXG5VcGxvYWRWaWV3LnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24oKSB7XG5cdHRoaXMuJHVwbG9hZC52ZWxvY2l0eSh7XG5cdFx0b3BhY2l0eTogMFxuXHR9LCB7XG5cdFx0ZHVyYXRpb246IDIwMCxcblx0XHRlYXNpbmc6ICdlYXNlLWluJyxcblx0XHRiZWdpbjogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLiR1cGxvYWQuYWRkQ2xhc3MoJ2FuaW1hdGluZycpO1xuXHRcdH0uYmluZCggdGhpcyApLFxuXHRcdGNvbXBsZXRlOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuJHVwbG9hZC5yZW1vdmVDbGFzcygnYW5pbWF0aW5nJyk7XG5cdFx0XHR0aGlzLiR1cGxvYWQucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdH0uYmluZCggdGhpcyApXG5cdH0pO1xufTtcblxuVXBsb2FkVmlldy5wcm90b3R5cGUuX3NldExvYWRpbmcgPSBmdW5jdGlvbiggbG9hZGluZywgbWVzc2FnZSApIHtcblx0dmFyICRidXR0b24gPSB0aGlzLiR1cGxvYWQuZmluZCggVVBMT0FEX0JVVFRPTl9TRUxFQ1RPUiApO1xuXG5cdC8vIFNldCB0aGUgbWVzc2FnZVxuXHRpZiAoIG1lc3NhZ2UgJiYgdHlwZW9mIG1lc3NhZ2UgPT09ICdzdHJpbmcnICkge1xuXHRcdCRidXR0b24udGV4dCggbWVzc2FnZSApO1xuXHR9IGVsc2Uge1xuXHRcdCRidXR0b24udGV4dChcIlVwbG9hZCBhIC5jc3ZcIik7XG5cdH1cblxuXHQvLyBTZXQgdGhlIGxvYWRpbmcgc3RhdGVcblx0aWYgKCBsb2FkaW5nICkge1xuXHRcdHRoaXMuJHVwbG9hZC5hZGRDbGFzcygnbG9hZGluZycpO1xuXHRcdCRidXR0b24ucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcblx0fSBlbHNlIHtcblx0XHR0aGlzLiR1cGxvYWQucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKTtcblx0XHQkYnV0dG9uLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuXHR9XG59O1xuXG5VcGxvYWRWaWV3LnByb3RvdHlwZS5fc2V0dXBFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uKCkge1xuXG5cdC8vIExpc3RlbiBmb3IgY2xpY2tzIG9uIHRoZSB1cGxvYWQgYnV0dG9uXG5cdHRoaXMuJHVwbG9hZC5maW5kKCBVUExPQURfQlVUVE9OX1NFTEVDVE9SICkub24oICdjbGljaycsIHRoaXMuX29uVXBsb2FkQ2xpY2suYmluZCggdGhpcyApICk7XG5cblx0Ly8gTGlzdGVuIGZvciBmaWxlIGNob2ljZXMgZnJvbSB0aGUgZmlsZSBwaWNrZXJcblx0dGhpcy4kdXBsb2FkLmZpbmQoJ2lucHV0W3R5cGU9XCJmaWxlXCJdJykub24oICdjaGFuZ2UnLCB0aGlzLl9vbkZpbGVDaG9pY2UuYmluZCggdGhpcyApICk7XG5cblx0Ly8gTGlzdGVuIGZvciB3aW5kb3cgcmVzaXplIGV2ZW50c1xuXHQkKHdpbmRvdykub24oICdyZXNpemUnLCB0aGlzLl9vbldpbmRvd1Jlc2l6ZS5iaW5kKCB0aGlzICkgKTtcblxuXHQvLyBMaXN0ZW4gZm9yIHN1Y2Nlc3NmdWwgdGFibGUgdXBsb2Fkc1xuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLlRhYmxlLkRpZFVwbG9hZFdpdGhTdWNjZXNzJywgdGhpcy5fb25UYWJsZVVwbG9hZFN1Y2Nlc3MuYmluZCggdGhpcyApICk7XG5cblx0Ly8gTGlzdGVuIGZvciBmYWlsZWQgdGFibGUgdXBsb2Fkc1xuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLlRhYmxlLkRpZFVwbG9hZFdpdGhGYWlsdXJlJywgdGhpcy5fb25UYWJsZVVwbG9hZEZhaWwuYmluZCggdGhpcyApICk7XG59O1xuXG5VcGxvYWRWaWV3LnByb3RvdHlwZS5fb25VcGxvYWRDbGljayA9IGZ1bmN0aW9uKCBldmVudCApIHtcblxuXHQvLyBUcmlnZ2VyIGNsaWNrIG9uIGZpbGUgaW5wdXQgZmllbGRcblx0dGhpcy4kdXBsb2FkLmZpbmQoJ2lucHV0W3R5cGU9XCJmaWxlXCJdJykudHJpZ2dlcignY2xpY2snKTtcblxuXHQvLyBUcmFjayB0aGlzIGNsaWNrXG5cdC8vIGdhKCdzZW5kJywgJ2V2ZW50JywgJ2J1dHRvbicsICdjbGljaycsICd1cGxvYWQnKTtcbn07XG5cblVwbG9hZFZpZXcucHJvdG90eXBlLl9vbkZpbGVDaG9pY2UgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdHZhciBmaWxlID0gZXZlbnQudGFyZ2V0LmZpbGVzWyAwIF07XG5cdHRoaXMuX3BhcnNlRmlsZSggZmlsZSApO1xuXG5cdGlmICggZmlsZS5uYW1lICkge1xuXHRcdHRoaXMuX3NldExvYWRpbmcoIHRydWUsICdVcGxvYWRpbmcgJyArIGZpbGUubmFtZSArICcuLi4nICk7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5fc2V0TG9hZGluZyggdHJ1ZSwgJ1VwbG9hZGluZyBmaWxlLi4uJyApO1xuXHR9XG5cblx0Ly8gQW5ub3VuY2UgZmlsZSB1cGxvYWQgZXZlbnRcblx0Ly8gQWxlcnQgYW55IGxpc3RlbmVycyB0aGF0IHRoZSBncm91cCBoYXMgY2hhbmdlZFxuXHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCAnQ29sdW1ucy5VcGxvYWRWaWV3LkRpZENob29zZUZpbGUnLCB7XG5cdFx0Ly8gdXBsb2FkVmlldzogXHR0aGlzLFxuXHRcdC8vIGZpbGU6IFx0XHRcdGZpbGVcblx0Ly8gfSk7XG5cdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0Ly8gY29sdW1uc0V2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5VcGxvYWRWaWV3LkRpZENob29zZUZpbGUnLCBmYWxzZSwgZmFsc2UsIHtcblx0Ly8gXHR1cGxvYWRWaWV3OiBcdHRoaXMsXG5cdC8vIFx0ZmlsZTogXHRcdFx0ZmlsZVxuXHQvLyB9KTtcblx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjb2x1bW5zRXZlbnQpO1xuXHRDb2x1bW5zRXZlbnQuc2VuZCgnQ29sdW1ucy5VcGxvYWRWaWV3LkRpZENob29zZUZpbGUnLCB7XG5cdFx0dXBsb2FkVmlldzogXHR0aGlzLFxuXHRcdGZpbGU6IFx0XHRcdGZpbGVcblx0fSk7XG59O1xuXG5VcGxvYWRWaWV3LnByb3RvdHlwZS5fb25XaW5kb3dSZXNpemUgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG5cbn07XG5cblVwbG9hZFZpZXcucHJvdG90eXBlLl9vblRhYmxlVXBsb2FkU3VjY2VzcyA9IGZ1bmN0aW9uKCBldmVudCApIHtcblxuXHR0aGlzLl9zZXRMb2FkaW5nKCBmYWxzZSApO1xuXHR0aGlzLmhpZGUoKTtcbn07XG5cblVwbG9hZFZpZXcucHJvdG90eXBlLl9vblRhYmxlVXBsb2FkRmFpbCA9IGZ1bmN0aW9uKCBldmVudCApIHtcblxuXHR0aGlzLl9zZXRMb2FkaW5nKCBmYWxzZSwgXCJTaG9vdCwgc29tZXRoaW5nIHdlbnQgd3JvbmcuIE1pbmQgdHJ5aW5nIGEgZGlmZmVyZW50IC5jc3Y/XCIpXG59O1xuXG5VcGxvYWRWaWV3LnByb3RvdHlwZS5fcGFyc2VGaWxlID0gZnVuY3Rpb24oIGZpbGUgKSB7XG5cdFBhcGEucGFyc2UoIGZpbGUsIHtcblx0XHRzdGVwOiBmdW5jdGlvbiggcm93LCBoYW5kbGUgKSB7XG5cdFx0XHR0aGlzLl9wYXJzZVJvdyggcm93LCBoYW5kbGUsIGZpbGUubmFtZSApO1xuXHRcdH0uYmluZCggdGhpcyApLFxuXHRcdGNvbXBsZXRlOiBmdW5jdGlvbiggcmVzdWx0cyApIHtcblx0XHRcdHRoaXMuX29uUGFyc2VDb21wbGV0ZSggcmVzdWx0cywgZmlsZSApO1xuXHRcdH0uYmluZCggdGhpcyApXG5cdH0pO1xufTtcblxuVXBsb2FkVmlldy5wcm90b3R5cGUuX3BhcnNlUm93ID0gZnVuY3Rpb24oIHJvdywgaGFuZGxlLCBmaWxlTmFtZSApIHtcblxuXHQvLyBJZiB0aGlzIGlzIHRoZSBmaXJzdCByb3csIHRyZWF0IGl0IGFzIGEgaGVhZGVyXG5cdC8vIGFuZCBjcmVhdGUgY29sdW1uIGl0ZW1zIGZyb20gaXRzIGNvbnRlbnRzXG5cdC8vXG5cdC8vIElmIGl0J3Mgbm90IHRoZSBmaXJzdCByb3csIHRyZWF0IGl0IGFzIGRhdGFcblx0Ly8gYW5kIGFkZCBpdCB0byBvdXIgZGF0YSBzZXRcblx0Ly8gXG5cdC8vIElmIGl0J3MgYmV5b25kIHRoZSAyMHRoIHJvdywgc3RvcCB0aGUgcGFyc2luZ1xuXHRpZiAoIHRoaXMucGFyc2VkUm93cyA9PT0gMCApIHtcblx0XHR0aGlzLl9jcmVhdGVDb2x1bW5JdGVtcyggcm93LmRhdGFbIDAgXSwgZmlsZU5hbWUgKTtcblx0fSBlbHNlIGlmICggdGhpcy5wYXJzZWRSb3dzIDw9IE1BWF9ST1dTICkge1xuXHRcdHRoaXMuX2NyZWF0ZVJvdyggcm93LmRhdGFbIDAgXSwgZmlsZU5hbWUgKTtcblx0fSBlbHNlIHtcblx0XHRoYW5kbGUuYWJvcnQoKTtcblx0fVxuXG5cdC8vIFVwZGF0ZSB0aGUgcGFyc2VkIHJvd3MgY291bnRcblx0dGhpcy5wYXJzZWRSb3dzKys7XG59O1xuXG5VcGxvYWRWaWV3LnByb3RvdHlwZS5fY3JlYXRlQ29sdW1uSXRlbXMgPSBmdW5jdGlvbiggZGF0YSwgZmlsZU5hbWUgKSB7XG5cblx0Ly8gQW5ub3VuY2UgY29sdW1ucyBwYXJzaW5nXG5cdC8vIEFsZXJ0IGFueSBsaXN0ZW5lcnMgdGhhdCB0aGUgZ3JvdXAgaGFzIGNoYW5nZWRcblx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IG5ldyBDdXN0b21FdmVudCggJ0NvbHVtbnMuVXBsb2FkVmlldy5EaWRQYXJzZUNvbHVtbk5hbWVzRm9yRmlsZScsIHtcblx0XHQvLyB1cGxvYWRWaWV3OiBcdHRoaXMsXG5cdFx0Ly8gZmlsZU5hbWU6IFx0XHRmaWxlTmFtZSxcblx0XHQvLyBjb2x1bXM6IFx0XHRkYXRhXG5cdC8vIH0pO1xuXHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdC8vIGNvbHVtbnNFdmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuVXBsb2FkVmlldy5EaWRQYXJzZUNvbHVtbk5hbWVzRm9yRmlsZScsIGZhbHNlLCBmYWxzZSwge1xuXHQvLyBcdHVwbG9hZFZpZXc6IFx0dGhpcyxcblx0Ly8gXHRmaWxlTmFtZTogXHRcdGZpbGVOYW1lLFxuXHQvLyBcdGNvbHVtbnM6IFx0XHRkYXRhXG5cdC8vIH0pO1xuXHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGNvbHVtbnNFdmVudCk7XG5cdENvbHVtbnNFdmVudC5zZW5kKCdDb2x1bW5zLlVwbG9hZFZpZXcuRGlkUGFyc2VDb2x1bW5OYW1lc0ZvckZpbGUnLCB7XG5cdFx0dXBsb2FkVmlldzogXHR0aGlzLFxuXHRcdGZpbGVOYW1lOiBcdFx0ZmlsZU5hbWUsXG5cdFx0Y29sdW1uczogXHRcdGRhdGFcblx0fSk7XG59O1xuXG5VcGxvYWRWaWV3LnByb3RvdHlwZS5fY3JlYXRlUm93ID0gZnVuY3Rpb24oIHJvdywgZmlsZU5hbWUgKSB7XG5cblx0Ly8gQW5ub3VuY2Ugcm93IHBhcnNpbmdcblx0Ly8gQWxlcnQgYW55IGxpc3RlbmVycyB0aGF0IHRoZSBncm91cCBoYXMgY2hhbmdlZFxuXHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCAnQ29sdW1ucy5VcGxvYWRWaWV3LkRpZFBhcnNlRGF0YVJvd0ZvckZpbGUnLCB7XG5cdFx0Ly8gdXBsb2FkVmlldzogXHR0aGlzLFxuXHRcdC8vIGZpbGVOYW1lOiBcdFx0ZmlsZU5hbWUsXG5cdFx0Ly8gcm93OiBcdFx0XHRkYXRhXG5cdC8vIH0pO1xuXHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdC8vIGNvbHVtbnNFdmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuVXBsb2FkVmlldy5EaWRQYXJzZURhdGFSb3dGb3JGaWxlJywgZmFsc2UsIGZhbHNlLCB7XG5cdC8vIFx0dXBsb2FkVmlldzogXHR0aGlzLFxuXHQvLyBcdGZpbGVOYW1lOiBcdFx0ZmlsZU5hbWUsXG5cdC8vIFx0cm93OiBcdFx0XHRyb3dcblx0Ly8gfSk7XG5cdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY29sdW1uc0V2ZW50KTtcblx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuVXBsb2FkVmlldy5EaWRQYXJzZURhdGFSb3dGb3JGaWxlJywge1xuXHRcdHVwbG9hZFZpZXc6IFx0dGhpcyxcblx0XHRmaWxlTmFtZTogXHRcdGZpbGVOYW1lLFxuXHRcdHJvdzogXHRcdFx0cm93XG5cdH0pO1xufTtcblxuVXBsb2FkVmlldy5wcm90b3R5cGUuX29uUGFyc2VDb21wbGV0ZSA9IGZ1bmN0aW9uKCByZXN1bHRzLCBmaWxlICkge1xuXG5cdC8vIEFubm91bmNlIHBhcnNpbmcgY29tcGxldGVcblx0Ly8gQWxlcnQgYW55IGxpc3RlbmVycyB0aGF0IHRoZSBncm91cCBoYXMgY2hhbmdlZFxuXHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCAnQ29sdW1ucy5VcGxvYWRWaWV3LkRpZENvbXBsZXRlUGFyc2VGb3JGaWxlJywge1xuXHRcdC8vIHVwbG9hZFZpZXc6IFx0XHR0aGlzLFxuXHRcdC8vIGZpbGVOYW1lOiBcdFx0ZmlsZU5hbWVcblx0Ly8gfSk7XG5cdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0Ly8gY29sdW1uc0V2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5VcGxvYWRWaWV3LkRpZENvbXBsZXRlUGFyc2VGb3JGaWxlJywgZmFsc2UsIGZhbHNlLCB7XG5cdC8vIFx0dXBsb2FkVmlldzogXHR0aGlzLFxuXHQvLyBcdGZpbGU6IFx0XHRcdGZpbGVcblx0Ly8gfSk7XG5cdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY29sdW1uc0V2ZW50KTtcblx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuVXBsb2FkVmlldy5EaWRDb21wbGV0ZVBhcnNlRm9yRmlsZScsIHtcblx0XHR1cGxvYWRWaWV3OiBcdHRoaXMsXG5cdFx0ZmlsZTogXHRcdFx0ZmlsZVxuXHR9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVXBsb2FkVmlldztcbiIsInZhciBUYWJsZSBcdFx0XHRcdD0gcmVxdWlyZSgnLi9tb2RlbHMvVGFibGUuanMnKTtcbnZhciBJdGVtVmlldyBcdFx0XHQ9IHJlcXVpcmUoJy4vY29udHJvbGxlcnMvSXRlbXNWaWV3LmpzJyk7XG52YXIgVGVtcGxhdGVWaWV3IFx0XHQ9IHJlcXVpcmUoJy4vY29udHJvbGxlcnMvVGVtcGxhdGVWaWV3LmpzJyk7XG52YXIgU3R5bGVWaWV3IFx0XHRcdD0gcmVxdWlyZSgnLi9jb250cm9sbGVycy9TdHlsZVZpZXcuanMnKTtcbnZhciBFbWJlZERldGFpbHNWaWV3IFx0PSByZXF1aXJlKCcuL2NvbnRyb2xsZXJzL0VtYmVkRGV0YWlsc1ZpZXcuanMnKTtcbnZhciBVcGxvYWRWaWV3IFx0XHRcdD0gcmVxdWlyZSgnLi9jb250cm9sbGVycy9VcGxvYWRWaWV3LmpzJyk7XG5cbi8vIENyZWF0ZSB0aGUgVGFibGUgb2JqZWN0XG52YXIgdGFibGUgPSBuZXcgVGFibGUoKTtcblxuLy8gU2V0IHVwIHRoZSBJdGVtcyBWaWV3XG52YXIgaXRlbXMgPSBuZXcgSXRlbXNWaWV3KCk7XG5cbi8vIFNldCB1cCB0aGUgVGVtcGxhdGVcbnZhciB0ZW1wbGF0ZSA9IG5ldyBUZW1wbGF0ZVZpZXcoKTtcblxuLy8gU2V0IHVwIHRoZSBTdHlsZSBWaWV3XG52YXIgc3R5bGUgPSBuZXcgU3R5bGVWaWV3KCk7XG5cbi8vIFNldCB1cCB0aGUgRW1iZWQgUGFuZWxcbnZhciBlbWJlZCA9IG5ldyBFbWJlZERldGFpbHNWaWV3KCk7XG5cbi8vIFNldCB1cCB0aGUgVXBsb2FkIFZpZXdcbnZhciB1cGxvYWQgPSBuZXcgVXBsb2FkVmlldygpO1xudXBsb2FkLnJlbmRlcigpO1xuXG5cblxuIiwiZnVuY3Rpb24gQ29sdW1uc0V2ZW50ICgpIHtcblxufVxuXG5Db2x1bW5zRXZlbnQuc2VuZCA9IGZ1bmN0aW9uKCB0eXBlLCBkYXRhICkge1xuXHQkKGRvY3VtZW50KS50cmlnZ2VyKCB0eXBlLCBkYXRhICk7XG59O1xuXG5Db2x1bW5zRXZlbnQub24gPSBmdW5jdGlvbiggdHlwZSwgY2FsbGJhY2sgKSB7XG5cdCQoZG9jdW1lbnQpLm9uKCB0eXBlLCBjYWxsYmFjayApO1xufTtcblxuQ29sdW1uc0V2ZW50Lm9mZiA9IGZ1bmN0aW9uKCB0eXBlLCBjYWxsYmFjayApIHtcblx0JChkb2N1bWVudCkub2ZmKCB0eXBlLCBjYWxsYmFjayApO1xufTtcblxuQ29sdW1uc0V2ZW50Lm9mZkFsbCA9IGZ1bmN0aW9uKCkge1xuXHQkKGRvY3VtZW50KS5vZmYoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ29sdW1uc0V2ZW50OyIsInZhciBDb2x1bW5zRXZlbnQgPSByZXF1aXJlKCcuL0NvbHVtbnNFdmVudC5qcycpO1xudmFyIFN0eWxlIFx0XHQgPSByZXF1aXJlKCcuL1N0eWxlLmpzJyk7XG5cbi8vIEl0ZW0gT2JqZWN0XG4vLyAtLS0tLS0tLS0tLS0tXG4vLyBVc2UgdGhpcyBtb2RlbCB0byBzdG9yZSBhIGNvbHVtbiBJdGVtXG4vLyBhbmQgbWFuYWdlIGl0cyBzdHlsZSBpbmZvcm1hdGlvblxuXG5JdGVtID0gZnVuY3Rpb24oIHBhcmFtcyApIHtcblxuXHR0aGlzLmlkO1xuXHR0aGlzLnRpdGxlO1xuXHR0aGlzLnN0eWxlO1xuXHR0aGlzLmFjdGl2ZSA9IHRydWU7XG5cblx0aWYgKCBwYXJhbXMgKSB7XG5cdFx0Ly8gdGhpcy5pZCBcdD0gXG5cdFx0dGhpcy50aXRsZSBcdD0gcGFyYW1zLnRpdGxlIHx8ICcnO1xuXHRcdHRoaXMuc3R5bGUgXHQ9IG5ldyBTdHlsZSggcGFyYW1zLnN0eWxlICk7XG5cdFx0dGhpcy5hY3RpdmUgPSBwYXJhbXMuYWN0aXZlID09PSBmYWxzZSA/IGZhbHNlIDogdHJ1ZTtcblx0fVxuXG5cdHRoaXMuX3NldHVwRXZlbnRMaXN0ZW5lcnMoKTtcbn1cblxuSXRlbS5mb3JtYXR0ZWRUaXRsZSA9IGZ1bmN0aW9uKCB0aXRsZSApIHtcblx0Ly8gUmV0dXJuIGEgbG93ZXJjYXNlIHZlcnNpb24gb2YgdGhlIHRpdGxlXG5cdC8vIHdpdGggdW5kZXJzY29yZXMgaW5zdGVhZCBvZiBzcGFjZXNcblx0aWYgKCAhdGl0bGUgKSB7XG5cdFx0cmV0dXJuICdfJztcblx0fSBlbHNlIGlmICggdGl0bGUgPT09ICdfJyApIHtcblx0XHRyZXR1cm4gdGl0bGU7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIHRpdGxlLnRvTG93ZXJDYXNlKCkucmVwbGFjZSggL18vZywgJyAnICkucmVwbGFjZSgvXFxiLi9nLCBmdW5jdGlvbihtKXsgcmV0dXJuIG0udG9VcHBlckNhc2UoKTsgfSk7XG5cdH1cbn07XG5cbkl0ZW0udW5mb3JtYXR0ZWRUaXRsZSA9IGZ1bmN0aW9uKCB0aXRsZSApIHtcblx0aWYgKCF0aXRsZSkge1xuXHRcdHJldHVybiAnXyc7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIHRpdGxlLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvIC9nLCAnXycpO1xuXHR9XG59O1xuXG5JdGVtLnByb3RvdHlwZS5mb3JtYXR0ZWRUaXRsZSA9IGZ1bmN0aW9uKCkge1xuXHQvLyBSZXR1cm4gYSBsb3dlcmNhc2UgdmVyc2lvbiBvZiB0aGUgdGl0bGVcblx0Ly8gd2l0aCB1bmRlcnNjb3JlcyBpbnN0ZWFkIG9mIHNwYWNlc1xuXHQvLyBpZiAoICF0aGlzLnRpdGxlICkge1xuXHQvLyBcdHJldHVybiAnXyc7XG5cdC8vIH0gZWxzZSBpZiAoIHRoaXMudGl0bGUgPT09ICdfJyApIHtcblx0Ly8gXHRyZXR1cm4gdGhpcy50aXRsZTtcblx0Ly8gfSBlbHNlIHtcblx0Ly8gXHRyZXR1cm4gdGhpcy50aXRsZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoIC9fL2csICcgJyApLnJlcGxhY2UoL1xcYi4vZywgZnVuY3Rpb24obSl7IHJldHVybiBtLnRvVXBwZXJDYXNlKCk7IH0pO1xuXHQvLyB9XG5cdHJldHVybiBJdGVtLmZvcm1hdHRlZFRpdGxlKCB0aGlzLnRpdGxlICk7XG59O1xuXG5JdGVtLnByb3RvdHlwZS51bmZvcm1hdHRlZFRpdGxlID0gZnVuY3Rpb24oKSB7XG5cdC8vIFJldHVybiBhIGxvd2VyY2FzZSB2ZXJzaW9uIG9mIHRoZSB0aXRsZVxuXHQvLyB3aXRoIHVuZGVyc2NvcmVzIGluc3RlYWQgb2Ygc3BhY2VzXG5cdC8vIGlmICghdGhpcy50aXRsZSkge1xuXHQvLyBcdHJldHVybiAnXyc7XG5cdC8vIH0gZWxzZSB7XG5cdC8vIFx0cmV0dXJuIHRoaXMudGl0bGUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8gL2csICdfJyk7XG5cdC8vIH1cblx0cmV0dXJuIEl0ZW0udW5mb3JtYXR0ZWRUaXRsZSggdGhpcy50aXRsZSApO1xufTtcblxuLy8gUmV0dXJuIHRoZSBjb3JyZWN0IHN0eWxlIGF0dHJpYnV0ZSBmb3IgYSBnaXZlbiBwcm9wZXJ0eVxuLy8gQHBhcmFtIHsgc3RyaW5nIH0gcHJvcGVydHkgLS0gdGhlIHJlcXVlc3RlZCBsYXlvdXQgcHJvcGVydHlcbi8vIEByZXR1cm4geyBzdHJpbmcgfSB0aGUgY29ycmVzcG9uZGluZyB2YWx1ZVxuSXRlbS5wcm90b3R5cGUuZ2V0U3R5bGUgPSBmdW5jdGlvbiggcHJvcGVydHkgKSB7XG5cdHZhciB2YWx1ZTtcblxuXHQvLyBDaGVjayB3aGV0aGVyIHRoaXMgaXMgYSBrbm93biBzdHlsZVxuXHRpZiAoIHRoaXMuc3R5bGUgKSB7XG5cdFx0dmFsdWUgPSB0aGlzLnN0eWxlLmdldCggcHJvcGVydHkgKTtcblx0fVxuXG5cdHJldHVybiB2YWx1ZTtcblxuXHQvLyBJZiBub3QsIGNoZWNrIHRoZSBjc3MgZm9yIHRoZSBlbGVtZW50XG5cdC8vIGFuZCByZXR1cm4gaXRzIHZhbHVlXG5cdC8vIGlmICggdmFsdWUgKSB7XG5cdC8vIFx0cmV0dXJuIHZhbHVlO1xuXHQvLyB9IGVsc2Uge1xuXHQvLyBcdC8vIFRoaXMgaXMgYSBoYWNrISEhXG5cdC8vIFx0cmV0dXJuIHRoaXMuJGdyb3VwLmNzcyggcHJvcGVydHkgKTtcblx0Ly8gfVxufTtcblxuSXRlbS5wcm90b3R5cGUuaXMgPSBmdW5jdGlvbiggaXRlbSApIHtcblx0aWYgKCBpdGVtIGluc3RhbmNlb2YgSXRlbSApIHtcblx0XHRyZXR1cm4gdGhpcy50aXRsZSA9PT0gaXRlbS50aXRsZTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBcImV4Y2VwdGlvbjogQ29tcGFyaXNvbiBtdXN0IGJlIHdpdGggYW5vdGhlciBJdGVtXCI7XG5cdH1cbn1cblxuSXRlbS5wcm90b3R5cGUuX3NldEFjdGl2ZSA9IGZ1bmN0aW9uKCBhY3RpdmUgKSB7XG5cblx0aWYgKCB0aGlzLmFjdGl2ZSAhPT0gYWN0aXZlICkge1xuXHRcdHRoaXMuYWN0aXZlID0gYWN0aXZlO1xuXHRcdHRoaXMuX2VtaXRBY3RpdmVTdGF0ZUNoYW5nZSgpO1x0XHRcblx0fVxuXHRcbn07XG5cbkl0ZW0ucHJvdG90eXBlLl9zZXR1cEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gTGlzdGVuIGZvciBzdHlsZSBjaGFuZ2VzIG9uIHRoaXMgSXRlbVxuXHQvLyAkKGRvY3VtZW50KS5vbiggJ0NvbHVtbnMuU3R5bGVWaWV3LlByb3BlcnR5RGlkVXBkYXRlV2l0aFZhbHVlRm9ySXRlbScsIHRoaXMsIGZhbHNlICk7XG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuU3R5bGVWaWV3LlByb3BlcnR5RGlkVXBkYXRlV2l0aFZhbHVlRm9ySXRlbScsIHRoaXMuX29uSXRlbVN0eWxlRGlkQ2hhbmdlLmJpbmQoIHRoaXMgKSApO1xuXG5cdC8vIExpc3RlbiBmb3IgdGVtcGxhdGUgdXBkYXRlIGV2ZW50c1xuXHQvLyAkKGRvY3VtZW50KS5vbiggJ0NvbHVtbnMuVGVtcGxhdGVWaWV3LkRpZENoYW5nZScsIHRoaXMsIGZhbHNlICk7XG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuVGVtcGxhdGVWaWV3LkRpZENoYW5nZScsIHRoaXMuX29uVGVtcGxhdGVDaGFuZ2UuYmluZCggdGhpcyApICk7XG59O1xuXG5JdGVtLnByb3RvdHlwZS5fb25JdGVtU3R5bGVEaWRDaGFuZ2UgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdGlmICggdGhpcy5pcyggZGF0YS5pdGVtICkgKSB7XG5cdFx0dGhpcy5zdHlsZS51cGRhdGUoIFt7XG5cdFx0XHRwcm9wZXJ0eTogZGF0YS5wcm9wZXJ0eSxcblx0XHRcdHZhbHVlOiBkYXRhLnZhbHVlXG5cdFx0fV0gKTtcblx0XHR0aGlzLl9lbWl0Q2hhbmdlKCk7XG5cdH1cbn07XG5cbkl0ZW0ucHJvdG90eXBlLl9vblRlbXBsYXRlQ2hhbmdlID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuXG5cdC8vIENoZWNrIHdoZXRoZXIgdGhlIGl0ZW0gZXhpc3RzIGluIHRoZSB0ZW1wbGF0ZVxuXHRpZiAoIFRlbXBsYXRlVmlldy5nZXRWYWx1ZUZvckl0ZW0oIHRoaXMgKSApIHtcblx0XHR0aGlzLl9zZXRBY3RpdmUoIGZhbHNlICk7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5fc2V0QWN0aXZlKCB0cnVlICk7XG5cdH1cbn07XG5cbkl0ZW0ucHJvdG90eXBlLl9lbWl0Q2hhbmdlID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gQWxlcnQgYW55IGxpc3RlbmVycyB0aGF0IHRoZSBncm91cCBoYXMgY2hhbmdlZFxuXHQvLyB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoICdDb2x1bW5zLkl0ZW0uRGlkQ2hhbmdlJywge1xuXHQvLyBcdGdyb3VwVmlldzogXHR0aGlzXG5cdC8vIH0pO1xuXHQvLyB2YXIgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0Ly8gZXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLkl0ZW0uRGlkQ2hhbmdlJywgZmFsc2UsIGZhbHNlLCB7XG5cdC8vIFx0aXRlbTogXHR0aGlzXG5cdC8vIH0pO1xuXHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcblx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuSXRlbS5EaWRDaGFuZ2UnLCB7XG5cdFx0aXRlbTogXHR0aGlzXG5cdH0pO1xufTtcblxuSXRlbS5wcm90b3R5cGUuX2VtaXRBY3RpdmVTdGF0ZUNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXG5cdENvbHVtbnNFdmVudC5zZW5kKCdDb2x1bW5zLkl0ZW0uQWN0aXZlU3RhdGVEaWRDaGFuZ2UnLCB7XG5cdFx0aXRlbTogdGhpc1xuXHR9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSXRlbTsiLCIvLyBMYXlvdXQgT2JqZWN0IE1ldGhvZHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFRoaXMgaXMgdGhlIGxheW91dCBvYmplY3QgdGhhdCBjb250cm9sc1xuLy8gdGhlIHdheSB0aGUgdGFibGUgaXMgcmVuZGVyZWQgYW5kIHN0eWxlZC5cbi8vIFRoZSBtZXRob2RzIGJlbG93IGFsbG93IHVzIHRvOlxuLy8gMSkgVHJhdmVyc2UgdGhlIHRlbXBsYXRlIGFuZCBjb25zdHJ1Y3QgYSBuZXcgb2JqZWN0XG4vLyAyKSBVcGRhdGUgdGhlIG9iamVjdCB3aGVuIHN0eWxlcyBhcmUgYWRqdXN0ZWRcblxudmFyIENvbHVtbnNFdmVudCBcdD0gcmVxdWlyZSgnLi9Db2x1bW5zRXZlbnQuanMnKTtcbnZhciBERUZBVUxUU1x0XHQ9IHJlcXVpcmUoJy4uL3N0eWxpbmcvZGVmYXVsdHMuanMnKTtcblxuLy8gQ29sdW1ucy5MYXlvdXQgPSBuZXcgZnVuY3Rpb24oKSB7XG5mdW5jdGlvbiBMYXlvdXQoIGl0ZW1zICkge1xuXG5cdC8vIE1ha2Ugc3VyZSBhbGwgaXRlbXMgYXJlIG9mIHJpZ2h0IHR5cGVcblx0dGhpcy5pdGVtcyA9IFtdO1xuXHRpZiAoIGl0ZW1zICkge1xuXHRcdGl0ZW1zLmZvckVhY2goZnVuY3Rpb24oIGl0ZW0sIGkgKSB7XG5cdFx0XHRpZiAoIGl0ZW0gaW5zdGFuY2VvZiBJdGVtICkge1xuXHRcdFx0XHR0aGlzLml0ZW1zLnB1c2goIGl0ZW0gKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRocm93IFwiZXhjZXB0aW9uOiBhbGwgaXRlbXMgbXVzdCBvZiB0eXBlIEl0ZW1cIjtcblx0XHRcdH1cblx0XHR9LmJpbmQoIHRoaXMgKSk7XG5cdH1cblxuXHQvLyBCdWlsZCBhIGRlZmF1bHQgbGF5b3V0IHdpdGggdGhlIHBhc3NlZC1pbiBpdGVtc1xuXHR0aGlzLm1vZGVsID0gdGhpcy5kZWZhdWx0TGF5b3V0KCB0aGlzLml0ZW1zICk7XG5cblx0dGhpcy5fc2V0dXBFdmVudExpc3RlbmVycygpO1xufVxuXG5MYXlvdXQucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgJHRlbXBsYXRlID0gJCgnLmxheW91dC10ZW1wbGF0ZS1yb3ctZ3JvdXAnKS5maXJzdCgpO1xuXHR0aGlzLm1vZGVsID0gdGhpcy5fZ2VuZXJhdGVNb2RlbEZvclRlbXBsYXRlKCAkdGVtcGxhdGUgKTtcblx0dGhpcy5fZW1pdENoYW5nZSgpO1xufTtcblxuTGF5b3V0LnByb3RvdHlwZS5fZ2VuZXJhdGVNb2RlbEZvclRlbXBsYXRlID0gZnVuY3Rpb24oICR0ZW1wbGF0ZSApIHtcblx0dmFyIG1vZGVsID0ge30sXG5cdFx0c3ViTW9kZWwsXG5cdFx0aXRlbSxcblx0XHRncm91cDtcblxuXHQvLyBTa2lwIGluYWN0aXZlIGl0ZW1zXG5cdGlmICggJHRlbXBsYXRlLmhhc0NsYXNzKCdpbmFjdGl2ZScpICkge1xuXHRcdHJldHVybjtcblx0fVxuXHRcblx0Ly8gSXMgdGhlIHRlbXBsYXRlIGEgdmFsdWUgb3IgYSBncm91cD9cblx0aWYgKCAkdGVtcGxhdGUuaGFzQ2xhc3MoJ2xheW91dC10ZW1wbGF0ZS1yb3ctZ3JvdXAnKSApIHtcblx0XHRncm91cCA9IG5ldyBUZW1wbGF0ZUdyb3VwVmlldyh7IHN0eWxlOiAkdGVtcGxhdGUuYXR0cignc3R5bGUnKSB9KVxuXG5cdFx0Ly8gU2V0IHRoZSBtb2RlbCB0eXBlXG5cdFx0bW9kZWxbJ3R5cGUnXSA9ICdncm91cCc7XG5cblx0XHQvLyBTZXQgdGhlIG1vZGVsIHN0eWxlXG5cdFx0bW9kZWxbJ3N0eWxlJ10gPSBncm91cC5zdHlsZS5zdHlsZXM7XG5cblx0XHQvLyBTZXQgdGhlIG1vZGVsIGxheW91dFxuXHRcdG1vZGVsWydsYXlvdXQnXSA9IFRlbXBsYXRlR3JvdXBWaWV3LmxheW91dEZvckdyb3VwKCAkdGVtcGxhdGUgKTtcblxuXHRcdC8vIEdldCB0aGUgZ3JvdXAncyB2YWx1ZXNcblx0XHRtb2RlbFsndmFsdWVzJ10gPSBbXTtcblx0XHQkdGVtcGxhdGUuY2hpbGRyZW4oKS5lYWNoKGZ1bmN0aW9uKCBpLCBjaGlsZCApIHtcblx0XHRcdHN1Yk1vZGVsID0gdGhpcy5fZ2VuZXJhdGVNb2RlbEZvclRlbXBsYXRlKCAkKCBjaGlsZCApICk7XG5cdFx0XHRpZiAoIHN1Yk1vZGVsICkge1xuXHRcdFx0XHRtb2RlbC52YWx1ZXMucHVzaCggc3ViTW9kZWwgKTtcblx0XHRcdH1cblx0XHR9LmJpbmQoIHRoaXMgKSApO1xuXG5cdH0gZWxzZSBpZiAoICR0ZW1wbGF0ZS5oYXNDbGFzcygnbGF5b3V0LXRlbXBsYXRlLXJvdy12YWx1ZScpICkge1xuXHRcdC8vIGl0ZW0gPSBuZXcgSXRlbSh7XG5cdFx0Ly8gXHR0aXRsZTogJHRlbXBsYXRlLnRleHQoKS50cmltKCksXG5cdFx0Ly8gXHRzdHlsZTogJHRlbXBsYXRlLmF0dHIoJ3N0eWxlJylcblx0XHQvLyB9KTtcblxuXHRcdC8vIHN0eWxlID0gbmV3IFN0eWxlKCAkdGVtcGxhdGUuYXR0cignc3R5bGUnKSApLnN0eWxlcztcblxuXHRcdC8vIFNldCB0aGUgbW9kZWwgdHlwZVxuXHRcdG1vZGVsWyd0eXBlJ10gPSAnc2luZ2xlJztcblxuXHRcdC8vIFNldCB0aGUgbW9kZWwncyBzdHlsZVxuXHRcdG1vZGVsWydzdHlsZSddID0gbmV3IFN0eWxlKCAkdGVtcGxhdGUuYXR0cignc3R5bGUnKSApLnN0eWxlcztcblxuXHRcdC8vIFNldCB0aGUgdmFsdWUncyBkYXRhXG5cdFx0bW9kZWxbJ2RhdGEnXSA9IEl0ZW0udW5mb3JtYXR0ZWRUaXRsZSggJHRlbXBsYXRlLnRleHQoKS50cmltKCkgKTtcblx0fVxuXG5cdHJldHVybiBtb2RlbDtcbn07XG5cbkxheW91dC5wcm90b3R5cGUuX2VtaXRDaGFuZ2UgPSBmdW5jdGlvbigpIHtcblx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuTGF5b3V0LkRpZENoYW5nZScsIHtcblx0XHRsYXlvdXQ6IFx0dGhpc1xuXHR9KTtcbn07XG5cbkxheW91dC5wcm90b3R5cGUuX3NldHVwRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBMaXN0ZW4gdG8gdGVtcGxhdGUgY2hhbmdlIGV2ZW50c1xuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLlRlbXBsYXRlVmlldy5EaWRDaGFuZ2UnLCB0aGlzLl9vblRlbXBsYXRlVmlld0NoYW5nZS5iaW5kKCB0aGlzICkgKTtcbn07XG5cbkxheW91dC5wcm90b3R5cGUuX29uVGVtcGxhdGVWaWV3Q2hhbmdlID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuXHR0aGlzLnVwZGF0ZSgpO1xufTtcblxuLy8gRGVmYXVsdCBsYXlvdXRzIGZvciB2YXJpb3VzIGNvbHVtbiBudW1iZXJzXG5MYXlvdXQucHJvdG90eXBlLmRlZmF1bHRMYXlvdXQgPSBmdW5jdGlvbiggaXRlbXMgKSB7XG5cdFxuXHQvLyBTZXQgdXAgdGhlIGRlZmF1bHQgbGF5b3V0XG5cdHZhciBsYXlvdXQgPSB7XG5cdFx0dHlwZTogJ2dyb3VwJyxcblx0XHRzdHlsZTogW3tcblx0XHRcdHByb3BlcnR5OiAncGFkZGluZycsXG5cdFx0XHR2YWx1ZTogJzEycHgnXG5cdFx0fV0sXG5cdFx0dmFsdWVzOiBbXVxuXHR9O1xuXG5cdC8vIEFkZCB0byB0aGUgZGVmYXVsdCBsYXlvdXRcblx0Ly8gYWNjb3JkaW5nIHRvIHRoZSBudW1iZXIgb2YgaXRlbXNcblx0c3dpdGNoICggaXRlbXMubGVuZ3RoICkge1xuXHRcdGNhc2UgMDpcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMTpcblx0XHRcdGxheW91dFsndmFsdWVzJ10gPSBbe1xuXHRcdFx0XHR0eXBlOiAnc2luZ2xlJyxcblx0XHRcdFx0c3R5bGU6IERFRkFVTFRTLnN0eWxlc1sgMCBdLFxuXHRcdFx0XHRkYXRhOiBpdGVtc1sgMCBdLnVuZm9ybWF0dGVkVGl0bGUoKVxuXHRcdFx0fV07XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDI6XG5cdFx0XHRsYXlvdXRbJ3ZhbHVlcyddID0gW3tcblx0XHRcdFx0dHlwZTogJ2dyb3VwJyxcblx0XHRcdFx0bGF5b3V0OiBERUZBVUxUUy5sYXlvdXRzWyAwIF0sXG5cdFx0XHRcdHZhbHVlczogW3tcblx0XHRcdFx0XHR0eXBlOiAnc2luZ2xlJyxcblx0XHRcdFx0XHRzdHlsZTogREVGQVVMVFMuc3R5bGVzWyAwIF0sXG5cdFx0XHRcdFx0ZGF0YTogaXRlbXNbIDAgXS51bmZvcm1hdHRlZFRpdGxlKClcblx0XHRcdFx0fSx7XG5cdFx0XHRcdFx0dHlwZTogJ3NpbmdsZScsXG5cdFx0XHRcdFx0c3R5bGU6IERFRkFVTFRTLnN0eWxlc1sgMSBdLFxuXHRcdFx0XHRcdGRhdGE6IGl0ZW1zWyAxIF0udW5mb3JtYXR0ZWRUaXRsZSgpXG5cdFx0XHRcdH1dXG5cdFx0XHR9XTtcblx0XHRcdGJyZWFrO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHRsYXlvdXRbJ3ZhbHVlcyddID0gW3tcblx0XHRcdFx0dHlwZTogJ2dyb3VwJyxcblx0XHRcdFx0bGF5b3V0OiBERUZBVUxUUy5sYXlvdXRzWyAwIF0sXG5cdFx0XHRcdHZhbHVlczogW3tcblx0XHRcdFx0XHR0eXBlOiAnc2luZ2xlJyxcblx0XHRcdFx0XHRzdHlsZTogREVGQVVMVFMuc3R5bGVzWyAwIF0sXG5cdFx0XHRcdFx0ZGF0YTogaXRlbXNbIDAgXS51bmZvcm1hdHRlZFRpdGxlKClcblx0XHRcdFx0fSx7XG5cdFx0XHRcdFx0dHlwZTogJ3NpbmdsZScsXG5cdFx0XHRcdFx0c3R5bGU6IERFRkFVTFRTLnN0eWxlc1sgMSBdLFxuXHRcdFx0XHRcdGRhdGE6IGl0ZW1zWyAxIF0udW5mb3JtYXR0ZWRUaXRsZSgpXG5cdFx0XHRcdH1dXG5cdFx0XHR9LCB7XG5cdFx0XHRcdHR5cGU6ICdzaW5nbGUnLFxuXHRcdFx0XHRzdHlsZTogREVGQVVMVFMuc3R5bGVzWyAyIF0sXG5cdFx0XHRcdGRhdGE6IGl0ZW1zWyAyIF0udW5mb3JtYXR0ZWRUaXRsZSgpXG5cdFx0XHR9XTtcblx0XHRcdGJyZWFrO1xuXHR9XG5cdHJldHVybiBsYXlvdXQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IExheW91dDsiLCJ2YXIgQ29sdW1uc0V2ZW50ID0gcmVxdWlyZSgnLi9Db2x1bW5zRXZlbnQuanMnKTtcblxuLy8gU3R5bGUgT2JqZWN0XG4vLyAtLS0tLS0tLS0tLS0tXG4vLyBVc2UgdGhpcyBtb2RlbCB0byBoYW5kbGUgc3R5bGluZyBpbmZvcm1hdGlvbi5cblxuU3R5bGUgPSBmdW5jdGlvbiggc3R5bGVzICkge1xuXG5cdC8vIEFjY2VwdCBlaXRoZXIgYW4gYXJyYXkgb2YgbXVsdGlwbGUgc3R5bGVzXG5cdC8vIG9yIGp1c3QgYSBzaW5nbGUgc3R5bGUgb2JqZWN0XG5cdGlmICggQXJyYXkuaXNBcnJheSggc3R5bGVzICkgKSB7XG5cdFx0dGhpcy5zdHlsZXMgPSBzdHlsZXM7XG5cdH0gZWxzZSBpZiAoIHR5cGVvZiBzdHlsZXMgPT09ICdvYmplY3QnICkge1xuXHRcdHRoaXMuc3R5bGVzID0gWyBzdHlsZXMgXTtcblx0fSBlbHNlIGlmICggdHlwZW9mIHN0eWxlcyA9PT0gJ3N0cmluZycpIHtcblx0XHR0aGlzLnN0eWxlcyA9IHRoaXMuX3BhcnNlQ1NTKCBzdHlsZXMgKTtcblx0fSBlbHNlIHtcblx0XHR0aGlzLnN0eWxlcyA9IFtdO1xuXHR9XG59O1xuXG5TdHlsZS5wYXJzZUNTUyA9IGZ1bmN0aW9uKCBjc3MgKSB7XG5cblx0Ly8gQWNjZXB0IGEgQ1NTIHN0cmluZ1xuXHQvLyBhbmQgY29udmVydCBpdCBpbnRvIGFuIGFycmF5IG9mIGNzcyBwcm9wZXJ0aWVzIGFuZCB2YWx1ZXNcblx0aWYgKCB0eXBlb2YgY3NzICE9PSAnc3RyaW5nJyApIHRocm93IFwiZXhjZXB0aW9uOiBDU1MgbXVzdCBiZSBpbiBzdHJpbmcgZm9ybWF0XCI7XG5cblx0dmFyIHN0eWxlT2JqID0gW107XG5cblx0Ly8gUmVtb3ZlIGFsbCBzcGFjZXNcblx0Y3NzID0gY3NzLnJlcGxhY2UoLyAvZywgJycpO1xuXHQvLyBSZW1vdmUgdGhlIGxhc3Qgc2VtaWNvbG9uXG5cdGNzcyA9IGNzcy5zbGljZSgwLCAtMSk7XG5cdC8vIFNwbGl0IHN0eWxlc1xuXHRzdHlsZXMgPSBjc3Muc3BsaXQoJzsnKTtcblx0Ly8gQ3JlYXQgb2JqZWN0IGZvciBlYWNoIHN0eWxlXG5cdHN0eWxlcy5mb3JFYWNoKGZ1bmN0aW9uKHN0eWxlLCBpKSB7XG5cdFx0c3R5bGUgPSBzdHlsZS5zcGxpdCgnOicpO1xuXHRcdHN0eWxlT2JqLnB1c2goe1xuXHRcdFx0cHJvcGVydHk6IHN0eWxlWzBdLFxuXHRcdFx0dmFsdWU6IHN0eWxlWzFdXG5cdFx0fSk7XG5cdH0pO1xuXHRyZXR1cm4gc3R5bGVPYmo7XG59O1xuXG5TdHlsZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oIHN0eWxlcyApIHtcblx0dmFyIG5ld1N0eWxlcyA9IFtdO1xuXG5cdC8vIEFjY2VwdCBhIHN0cmluZywgYXJyYXksIG9yIG9iamVjdCBvZiBzdHlsZXNcblx0Ly8gYW5kIGV4dGVuZCB0aGUgY3VycmVudCBzdHlsZXMgb2JqZWN0IHdpdGggaXRzIHZhbHVlc1xuXHRpZiAoIHR5cGVvZiBzdHlsZXMgPT09ICdzdHJpbmcnICkge1xuXHRcdG5ld1N0eWxlcyA9IHRoaXMuX3BhcnNlQ1NTKCBzdHlsZXMgKTtcblx0fSBlbHNlIGlmICggQXJyYXkuaXNBcnJheSAoIHN0eWxlcyApICkge1xuXHRcdG5ld1N0eWxlcyA9IHN0eWxlcztcblx0fSBlbHNlIGlmICggdHlwZW9mIHN0eWxlcyA9PT0gJ29iamVjdCcgKSB7XG5cdFx0bmV3U3R5bGVzLnB1c2goc3R5bGVzKTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBcImV4Y2VwdGlvbjogQ1NTIG11c3QgYmUgYSBzdHJpbmcsIGFycmF5IG9yIG9iamVjdFwiO1xuXHR9XG5cblx0Ly8gTm93IGNvbXBsZXRlIHRoZSBtZXJnZVxuXHR0aGlzLl9tZXJnZUNTUyggbmV3U3R5bGVzICk7XG59O1xuXG5TdHlsZS5wcm90b3R5cGUuY3NzID0gZnVuY3Rpb24oKSB7XG5cdHZhciBjc3MgPSAnJztcblx0dGhpcy5zdHlsZXMuZm9yRWFjaChmdW5jdGlvbiggc3R5bGUsIGkgKSB7XG5cdFx0Y3NzICs9IHN0eWxlLnByb3BlcnR5ICsgJzonICsgc3R5bGUudmFsdWUgKyAnOyc7XG5cdH0pO1xuXHRyZXR1cm4gY3NzO1xufTtcblxuLy8gUmV0dXJuIHRoZSBzdHlsZSB2YWx1ZSBmb3IgYSBnaXZlbiBwcm9wZXJ0eVxuLy8gQHBhcmFtIHsgc3RyaW5nIH0gcHJvcGVydHlcbi8vIEByZXR1cm4geyBzdHJpbmcgfSB2YWx1ZVxuU3R5bGUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKCBwcm9wZXJ0eSApIHtcblx0dmFyIHZhbHVlO1xuXG5cdC8vIExvb3AgdGhyb3VnaCBlYWNoIHByb3BlcnR5IHVudGlsIHdlIGZpbmQgYSBtYXRjaFxuXHR0aGlzLnN0eWxlcy5mb3JFYWNoKGZ1bmN0aW9uKCBzdHlsZSwgaSApIHtcblx0XHRpZiAoIHN0eWxlLnByb3BlcnR5ID09PSBwcm9wZXJ0eSApIHtcblx0XHRcdHZhbHVlID0gc3R5bGUudmFsdWVcblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiB2YWx1ZTtcbn07XG5cblN0eWxlLnByb3RvdHlwZS5fcGFyc2VDU1MgPSBmdW5jdGlvbiggY3NzICkge1xuXG5cdHJldHVybiBTdHlsZS5wYXJzZUNTUyggY3NzICk7XHRcbn07XG5cblN0eWxlLnByb3RvdHlwZS5fbWVyZ2VDU1MgPSBmdW5jdGlvbiggY3NzICkge1xuXHQvLyBBY2NlcHQgYW4gYXJyYXkgb2YgY3NzIHN0eWxlIG9iamVjdHNcblx0aWYgKCAhQXJyYXkuaXNBcnJheSggY3NzICkgKSB0aHJvdyBcImV4Y2VwdGlvbjogQ1NTIG11c3QgYmUgYW4gYXJyYXlcIjtcblxuXHR2YXIgbmV3U3R5bGVzID0gY3NzLm1hcChmdW5jdGlvbiggc3R5bGUgKSB7IHJldHVybiBzdHlsZTsgfSksXG5cdFx0b2xkSW5kZXgsXG5cdFx0b2xkSW5kaWNlcyA9IHRoaXMuc3R5bGVzLmxlbmd0aDtcblxuXHQvLyBMb29wIHRocm91Z2ggdGhlIG9sZCBwcm9wZXJ0aWVzXG5cdC8vIGNvbXBhcmluZyBlYWNoIHdpdGggYWxsIHRoZSBuZXcgcHJvcGVydGllcy5cblx0Ly8gUmVwbGFjZSBhbiBleGlzdGluZyBwcm9wZXJ0eSBhbnl0aW1lIGEgbmV3IG9uZSBtYXRjaGVzIGl0XG5cdC8vIGFuZCB0aGVuIHJlbW92ZSB0aGF0IG5ldyBwcm9wZXJ0eSBmcm9tIHRoZSBhcnJheS5cblx0Ly8gQXQgdGhlIGVuZCwgYXBwZW5kIGFueSByZW1haW5pbmcgbmV3IHByb3BlcnRpZXMgdG8gdGhlIG1lcmdlZCBzdHlsZXMgYXJyYXkuXG5cdGNzcy5mb3JFYWNoKGZ1bmN0aW9uKCBuZXdTdHlsZSwgbmV3SW5kZXggKSB7XG5cdFx0Zm9yICggb2xkSW5kZXggPSAwIDsgb2xkSW5kZXggPCBvbGRJbmRpY2VzIDsgb2xkSW5kZXgrKyApIHtcblx0XHRcdGlmICggdGhpcy5zdHlsZXNbIG9sZEluZGV4IF0ucHJvcGVydHkgPT0gbmV3U3R5bGUucHJvcGVydHkgKSB7XG5cdFx0XHRcdHRoaXMuc3R5bGVzWyBvbGRJbmRleCBdID0gbmV3U3R5bGU7XG5cdFx0XHRcdG5ld1N0eWxlcy5zcGxpY2UoIG5ld1N0eWxlcy5pbmRleE9mKCBuZXdTdHlsZSApLCAxICk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHR9LmJpbmQoIHRoaXMgKSk7XG5cblx0Ly8gQWRkIGFsbCByZW1haW5pbmcgbmV3IHN0eWxlcyB0byB0aGUgc3R5bGVzIGFycmF5XG5cdHRoaXMuc3R5bGVzID0gdGhpcy5zdHlsZXMuY29uY2F0KCBuZXdTdHlsZXMgKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU3R5bGU7IiwidmFyIENvbHVtbnNFdmVudCBcdD0gcmVxdWlyZSgnLi9Db2x1bW5zRXZlbnQuanMnKTtcbnZhciBMYXlvdXQgXHRcdFx0PSByZXF1aXJlKCcuL0xheW91dC5qcycpO1xudmFyIEl0ZW0gXHRcdFx0PSByZXF1aXJlKCcuL0l0ZW0uanMnKTtcbnZhciBjb25maWcgXHRcdFx0PSByZXF1aXJlKCcuLi8uLi9jb21waWxlZC1qYXZhc2NyaXB0cy9jb25maWcuanMnKTtcbnZhciBERUZBVUxUU1x0XHQ9IHJlcXVpcmUoJy4uL3N0eWxpbmcvZGVmYXVsdHMuanMnKTtcblxuZnVuY3Rpb24gVGFibGUoIHByb3BzICkgIHtcblxuXHR0aGlzLmRhdGEgPSBbXTtcblx0dGhpcy50aXRsZSA9ICcnO1xuXHR0aGlzLnNvdXJjZSA9ICcnO1xuXHR0aGlzLnNvdXJjZV91cmwgPSAnJztcblx0dGhpcy5jb2x1bW5zID0gW107XG5cdHRoaXMubGF5b3V0O1xuXHR0aGlzLmlkO1xuXG5cdHRoaXMuX3VwZGF0ZSggcHJvcHMgKTtcblx0dGhpcy5fc2V0dXBFdmVudExpc3RlbmVycygpO1xufVxuXG5UYWJsZS5wcm90b3R5cGUuX3VwZGF0ZSA9IGZ1bmN0aW9uKCBwcm9wcyApIHtcblxuXHRpZiAoIHByb3BzICkge1xuXHRcdHRoaXMuZGF0YSA9IHByb3BzLmRhdGEgfHwgdGhpcy5kYXRhO1xuXHRcdHRoaXMudGl0bGUgPSBwcm9wcy50aXRsZSB8fCB0aGlzLnRpdGxlO1xuXHRcdHRoaXMuc291cmNlID0gcHJvcHMuc291cmNlIHx8IHRoaXMuc291cmNlO1xuXHRcdHRoaXMuc291cmNlX3VybCA9IHByb3BzLnNvdXJjZV91cmwgfHwgdGhpcy5zb3VyY2VfdXJsO1xuXHRcdHRoaXMuaWQgPSBwcm9wcy5pZCB8fCB0aGlzLmlkO1xuXG5cdFx0aWYgKCBwcm9wcy5jb2x1bW5zICkge1x0XG5cdFx0XHR0aGlzLmNvbHVtbnMgPSB0aGlzLml0ZW1zRnJvbUNvbHVtbk5hbWVzKCBwcm9wcy5jb2x1bW5zICk7XG5cdFx0fVxuXG5cdFx0aWYgKCBwcm9wcy5sYXlvdXQgKSB7XG5cdFx0XHR0aGlzLmxheW91dCA9IHByb3BzLmxheW91dDtcblx0XHR9IGVsc2UgaWYgKCAhdGhpcy5sYXlvdXQgKSB7XG5cdFx0XHR0aGlzLmxheW91dCA9IG5ldyBMYXlvdXQoIHRoaXMuY29sdW1ucyApO1xuXHRcdH1cblxuXHRcdC8vIExldCBldmVyeW9uZSBrbm93IHRoYXQgd2UndmUgdXBkYXRlZCB0aGUgdGFibGVcblx0XHR0aGlzLl9lbWl0Q2hhbmdlKCk7XG5cdH1cbn07XG5cblRhYmxlLnByb3RvdHlwZS5fZW1pdENoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXHQvLyBMZXQgZXZlcnlvbmUga25vdyB0aGF0IHRoZSB0YWJsZSBoYXMgYmVlbiB1cGxvYWRlZCBzdWNjZXNzZnVsbHlcblx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHQvLyBjb2x1bW5zRXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLlRhYmxlLkRpZENoYW5nZScsIGZhbHNlLCBmYWxzZSwge1xuXHQvLyBcdHRhYmxlOiBcdHRoaXNcblx0Ly8gfSk7XG5cdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY29sdW1uc0V2ZW50KTtcblx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuVGFibGUuRGlkQ2hhbmdlJywge1xuXHRcdHRhYmxlOiBcdHRoaXNcblx0fSk7XG59O1xuXG5UYWJsZS5wcm90b3R5cGUuX2VtaXRVcGxvYWRTdWNjZXNzID0gZnVuY3Rpb24oKSB7XG5cdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0Ly8gY29sdW1uc0V2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5UYWJsZS5EaWRVcGxvYWRXaXRoU3VjY2VzcycsIGZhbHNlLCBmYWxzZSwge1xuXHQvLyBcdHRhYmxlOiBcdHRoaXNcblx0Ly8gfSk7XG5cdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY29sdW1uc0V2ZW50KTtcblx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuVGFibGUuRGlkVXBsb2FkV2l0aFN1Y2Nlc3MnLCB7XG5cdFx0dGFibGU6IFx0dGhpc1xuXHR9KTtcbn07XG5cblRhYmxlLnByb3RvdHlwZS5fZW1pdFVwbG9hZEZhaWwgPSBmdW5jdGlvbigpIHtcblx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHQvLyBjb2x1bW5zRXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLlRhYmxlLkRpZFVwbG9hZFdpdGhGYWlsdXJlJywgZmFsc2UsIGZhbHNlLCB7XG5cdC8vIFx0dGFibGU6IFx0dGhpc1xuXHQvLyB9KTtcblx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjb2x1bW5zRXZlbnQpO1xuXHRDb2x1bW5zRXZlbnQuc2VuZCgnQ29sdW1ucy5UYWJsZS5EaWRVcGxvYWRXaXRoRmFpbHVyZScsIHtcblx0XHR0YWJsZTogXHR0aGlzXG5cdH0pO1xufTtcblxuVGFibGUucHJvdG90eXBlLl9lbWl0VXBkYXRlU3VjY2VzcyA9IGZ1bmN0aW9uKCkge1xuXHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdC8vIGNvbHVtbnNFdmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuVGFibGUuRGlkVXBkYXRlV2l0aFN1Y2Nlc3MnLCBmYWxzZSwgZmFsc2UsIHtcblx0Ly8gXHR0YWJsZTogXHR0aGlzXG5cdC8vIH0pO1xuXHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGNvbHVtbnNFdmVudCk7XG5cdENvbHVtbnNFdmVudC5zZW5kKCdDb2x1bW5zLlRhYmxlLkRpZFVwZGF0ZVdpdGhTdWNjZXNzJywge1xuXHRcdHRhYmxlOiBcdHRoaXNcblx0fSk7XG59O1xuXG5UYWJsZS5wcm90b3R5cGUuX2VtaXRVcGRhdGVGYWlsID0gZnVuY3Rpb24oKSB7XG5cdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0Ly8gY29sdW1uc0V2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5UYWJsZS5EaWRVcGRhdGVXaXRoRmFpbHVyZScsIGZhbHNlLCBmYWxzZSwge1xuXHQvLyBcdHRhYmxlOiBcdHRoaXNcblx0Ly8gfSk7XG5cdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY29sdW1uc0V2ZW50KTtcblx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuVGFibGUuRGlkVXBkYXRlV2l0aEZhaWx1cmUnLCB7XG5cdFx0dGFibGU6IFx0dGhpc1xuXHR9KTtcbn07XG5cbi8vIFJldHVybiBhbiBpdGVtIGdpdmVuIGEgZGF0YSBjb2x1bW4gbmFtZVxuLy8gQHBhcmFtIHtzdHJpbmd9IGRhdGEgLS0gdGhlIHVuZm9ybWF0dGVkIGNvbHVtbiB0aXRsZSB0byBzZWFyY2ggYWdhaW5zdCAoJ2ZpcnN0X25hbWUnKVxuLy8gQHJldHVybiB7SXRlbX0gLS0gdGhlIG1hdGNoaW5nIGl0ZW1cblRhYmxlLnByb3RvdHlwZS5nZXRJdGVtRm9yRGF0YSA9IGZ1bmN0aW9uKCBkYXRhICkge1xuXHR2YXIgaXRlbTtcblxuXHRpZiAoIGRhdGEgJiYgdGhpcy5jb2x1bW5zICYmIHRoaXMuY29sdW1ucy5sZW5ndGggKSB7XG5cdFx0aXRlbSA9IHRoaXMuY29sdW1ucy5maWx0ZXIoZnVuY3Rpb24oIGNvbHVtbiApIHtcblx0XHRcdHJldHVybiBkYXRhID09PSBjb2x1bW4udW5mb3JtYXR0ZWRUaXRsZSgpO1xuXHRcdH0uYmluZCggdGhpcyApKVsgMCBdO1xuXHR9XG5cblx0cmV0dXJuIGl0ZW07XG59O1xuXG5UYWJsZS5wcm90b3R5cGUuaXRlbXNGcm9tQ29sdW1uTmFtZXMgPSBmdW5jdGlvbiggY29sdW1uTmFtZXMgKSB7XG5cblx0aWYgKCB0eXBlb2YgY29sdW1uTmFtZXMgPT09ICdzdHJpbmcnICkge1xuXHRcdGNvbHVtbk5hbWVzID0gWyBjb2x1bW5OYW1lcyBdO1xuXHR9XG5cblx0aWYoIGNvbHVtbk5hbWVzIGluc3RhbmNlb2YgSXRlbSApIHtcblx0XHRjb2x1bW5OYW1lcyA9IFsgY29sdW1uTmFtZXMgXTtcblx0fVxuXG5cdGlmKCAhQXJyYXkuaXNBcnJheSggY29sdW1uTmFtZXMgKSApIHtcblx0XHR0aHJvdyBcImV4Y2VwdGlvbjogQ29sdW1uIG5hbWVzIG11c3QgYmUgYSBzdHJpbmcgb3IgYW4gYXJyYXkgb2Ygc3RyaW5nc1wiO1xuXHR9XG5cblx0cmV0dXJuIGNvbHVtbk5hbWVzLm1hcChmdW5jdGlvbiggY29sdW1uTmFtZSwgaSApIHtcblx0XHQvLyB2YXIgaXRlbTtcblxuXHRcdC8vIGlmICggY29sdW1uTmFtZSBpbnN0YW5jZW9mIEl0ZW0gKSB7XG5cdFx0Ly8gXHRyZXR1cm4gY29sdW1uTmFtZTtcblx0XHQvLyB9IGVsc2Uge1xuXHRcdC8vIFx0aXRlbSA9IG5ldyBJdGVtKHtcblx0XHQvLyBcdFx0dGl0bGU6IGNvbHVtbk5hbWUsXG5cdFx0Ly8gXHRcdHN0eWxlOiBERUZBVUxUUy5zdHlsZXNbIGkgXTtcblx0XHQvLyBcdH0pXG5cdFx0Ly8gfVxuXHRcdHJldHVybiBjb2x1bW5OYW1lIGluc3RhbmNlb2YgSXRlbSA/IGNvbHVtbk5hbWUgOiBuZXcgSXRlbSh7IHRpdGxlOiBjb2x1bW5OYW1lLCBzdHlsZTogREVGQVVMVFMuc3R5bGVzWyBpIF0gfSk7XG5cdH0pO1xufVxuXG5UYWJsZS5wcm90b3R5cGUuX3VwbG9hZEZpbGUgPSBmdW5jdGlvbiggZmlsZSApIHtcblx0dmFyIGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG5cblx0Ly8gQWRkIGFueSB0YWJsZSBtZXRhLWRhdGEgdG8gdGhlIGZvcm1cblx0Zm9ybURhdGEuYXBwZW5kKCBcImRhdGFcIiwgZmlsZSApO1xuXHRmb3JtRGF0YS5hcHBlbmQoIFwidGl0bGVcIiwgdGhpcy50aXRsZSApO1xuXHRmb3JtRGF0YS5hcHBlbmQoIFwic291cmNlXCIsIHRoaXMuc291cmNlICk7XG5cdGZvcm1EYXRhLmFwcGVuZCggXCJzb3VyY2VfdXJsXCIsIHRoaXMuc291cmNlX3VybCApO1xuXHRmb3JtRGF0YS5hcHBlbmQoIFwiY29sdW1uc1wiLCB0aGlzLnN0cmluZ0Zyb21Db2x1bW5zKCB0aGlzLmNvbHVtbnMgKSApO1xuXHQvLyBmb3JtRGF0YS5hcHBlbmQoIFwibGF5b3V0XCIsIEpTT04uc3RyaW5naWZ5KCB0aGlzLmxheW91dC5tb2RlbCApICk7XG5cblx0Ly8gdGhpcy5fb25VcGxvYWRTdWNjZXNzKCB7XG5cdC8vIFx0c3RhdHVzOiAnc3VjY2VzcycsXG5cdC8vIFx0ZGF0YToge1xuXHQvLyBcdFx0dGFibGVfaWQ6IDFcblx0Ly8gXHR9XG5cdC8vIH0pO1xuXG5cdCQuYWpheCh7XG4gICAgICAgIHVybDogY29uZmlnLmFwaS5ob3N0ICsgJy9jb2x1bW5zL3RhYmxlJywgIC8vU2VydmVyIHNjcmlwdCB0byBwcm9jZXNzIGRhdGFcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICBjb250ZW50VHlwZTogZmFsc2UsXG4gICAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcbiAgICAgICAgZGF0YTogZm9ybURhdGEsXG4gICAgICAgIHN1Y2Nlc3M6IHRoaXMuX29uVXBsb2FkU3VjY2Vzcy5iaW5kKCB0aGlzIClcbiAgICB9KTtcbn07XG5cblRhYmxlLnByb3RvdHlwZS5fdXBkYXRlVGFibGUgPSBmdW5jdGlvbigpIHtcblx0dmFyIGRhdGEgPSB7XG5cdFx0dGl0bGU6IHRoaXMudGl0bGUsXG5cdFx0c291cmNlOiB0aGlzLnNvdXJjZSxcblx0XHRzb3VyY2VfdXJsOiB0aGlzLnNvdXJjZV91cmwsXG5cdFx0bGF5b3V0OiBKU09OLnN0cmluZ2lmeSggdGhpcy5sYXlvdXQubW9kZWwgKSxcblx0XHRjb2x1bW5zOiB0aGlzLnN0cmluZ0Zyb21Db2x1bW5zKCB0aGlzLmNvbHVtbnMgKVxuXHR9O1xuXHQkLnBvc3QoY29uZmlnLmFwaS5ob3N0ICsgJy9jb2x1bW5zL3RhYmxlLycgKyB0aGlzLmlkLCBkYXRhLCB0aGlzLl9vblVwZGF0ZVN1Y2Nlc3MuYmluZCggdGhpcyApICk7XG59O1xuXG5UYWJsZS5wcm90b3R5cGUuX3NldHVwRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBMaXN0ZW4gZm9yIGNvbHVtbiBuYW1lcyBwYXJzaW5nXG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuVXBsb2FkVmlldy5EaWRQYXJzZUNvbHVtbk5hbWVzRm9yRmlsZScsIHRoaXMuX29uQ29sdW1uTmFtZXNQYXJzZWQuYmluZCggdGhpcyApKTtcblxuXHQvLyBMaXN0ZW4gZm9yIHJvdyBkYXRhIHBhcnNpbmdcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5VcGxvYWRWaWV3LkRpZFBhcnNlRGF0YVJvd0ZvckZpbGUnLCB0aGlzLl9vblJvd1BhcnNlZC5iaW5kKCB0aGlzICkgKTtcdFxuXG5cdC8vIExpc3RlbiBmb3IgcGFyc2luZyBjb21wbGV0aW9uXG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuVXBsb2FkVmlldy5EaWRDb21wbGV0ZVBhcnNlRm9yRmlsZScsIHRoaXMuX29uUGFyc2VDb21wbGV0ZS5iaW5kKCB0aGlzICkgKTtcblxuXHQvLyBMaXN0ZW4gZm9yIHVwZGF0ZXMgZnJvbSB0aGUgZGV0YWlscyBwYW5lbFxuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLkVtYmVkRGV0YWlsc1ZpZXcuRGlkVXBkYXRlUHJvcGVydHlXaXRoVmFsdWUnLCB0aGlzLl9vblRhYmxlVXBkYXRlLmJpbmQoIHRoaXMgKSApO1xuXG5cdC8vIExpc3RlbiBmb3IgbGF5b3V0IHVwZGF0ZXNcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5MYXlvdXQuRGlkQ2hhbmdlJywgdGhpcy5fb25MYXlvdXRVcGRhdGUuYmluZCggdGhpcyApICk7XG5cbn07XG5cblRhYmxlLnByb3RvdHlwZS5fb25Db2x1bW5OYW1lc1BhcnNlZCA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblxuXHR0aGlzLmNvbHVtbnMgPSB0aGlzLml0ZW1zRnJvbUNvbHVtbk5hbWVzKCBkYXRhLmNvbHVtbnMgKTtcbn07XG5cblRhYmxlLnByb3RvdHlwZS5fb25Sb3dQYXJzZWQgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdHZhciByb3cgPSBkYXRhLnJvdyxcblx0XHRkYXRhID0ge307XG5cblx0cm93LmZvckVhY2goZnVuY3Rpb24oIHZhbHVlLCBpICkge1xuXHRcdGRhdGFbIHRoaXMuY29sdW1uc1sgaSBdLnVuZm9ybWF0dGVkVGl0bGUoKSBdID0gdmFsdWU7XG5cdH0uYmluZCggdGhpcyApKTtcblxuXHR0aGlzLmRhdGEucHVzaCggZGF0YSApO1xufTtcblxuVGFibGUucHJvdG90eXBlLl9vblBhcnNlQ29tcGxldGUgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cblx0dGhpcy5fdXBsb2FkRmlsZSggZGF0YS5maWxlICk7XG59O1xuXG5UYWJsZS5wcm90b3R5cGUuX29uVXBsb2FkU3VjY2VzcyA9IGZ1bmN0aW9uKCBkYXRhLCBzdGF0dXMsIHJlcXVlc3QgKSB7XG5cblx0Ly8gQ2hlY2sgZm9yIGEgc2VydmVyLXNpZGUgZXJyb3Jcblx0aWYgKCBkYXRhLnN0YXR1cyAhPT0gJ3N1Y2Nlc3MnICkge1xuXHRcdHRoaXMuX29uVXBsb2FkRmFpbCggcmVxdWVzdCwgc3RhdHVzLCBkYXRhLm1lc3NhZ2UgKTtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvLyBTZXQgdGhlIFRhYmxlIElEXG5cdHRoaXMuX3VwZGF0ZSh7XG5cdFx0aWQ6IGRhdGEuZGF0YS50YWJsZV9pZFxuXHR9KTtcblxuXHR0aGlzLl9lbWl0VXBsb2FkU3VjY2VzcygpO1xufTtcblxuVGFibGUucHJvdG90eXBlLl9vblVwbG9hZEZhaWwgPSBmdW5jdGlvbiggcmVxdWVzdCwgc3RhdHVzLCBlcnJvciApIHtcblxuXHR0aGlzLl9lbWl0VXBsb2FkRmFpbCgpO1xufTtcblxuVGFibGUucHJvdG90eXBlLl9vblVwZGF0ZVN1Y2Nlc3MgPSBmdW5jdGlvbiggZGF0YSwgc3RhdHVzLCByZXF1ZXN0ICkge1xuXG5cdC8vIENoZWNrIGZvciBhIHNlcnZlci1zaWRlIGVycm9yXG5cdGlmICggZGF0YS5zdGF0dXMgIT09ICdzdWNjZXNzJyApIHtcblx0XHR0aGlzLl9lbWl0VXBkYXRlRmFpbCgpO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdHRoaXMuX2VtaXRVcGRhdGVTdWNjZXNzKCk7XG59O1xuXG5UYWJsZS5wcm90b3R5cGUuX29uVGFibGVVcGRhdGUgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdHZhciBwcm9wcyA9IHt9O1xuXG5cdHByb3BzWyBkYXRhLnByb3BlcnR5IF0gPSBkYXRhLnZhbHVlO1xuXG5cdHRoaXMuX3VwZGF0ZSggcHJvcHMgKTtcblx0dGhpcy5fdXBkYXRlVGFibGUoKTtcbn07XG5cblRhYmxlLnByb3RvdHlwZS5fb25MYXlvdXRVcGRhdGUgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdHRoaXMuX3VwZGF0ZSh7XG5cdFx0bGF5b3V0OiBkYXRhLmxheW91dFxuXHR9KTtcblx0dGhpcy5fdXBkYXRlVGFibGUoKTtcbn07XG5cblRhYmxlLnByb3RvdHlwZS5zdHJpbmdGcm9tQ29sdW1ucyA9IGZ1bmN0aW9uKCBjb2x1bW5zICkge1xuXG5cdHJldHVybiBjb2x1bW5zLm1hcChmdW5jdGlvbiggY29sdW1uLCBpICkge1xuXHRcdHJldHVybiBjb2x1bW4udGl0bGU7XG5cdH0pLmpvaW4oKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVGFibGU7IiwiLy8gV2UgbmVlZCB0byB0cmVhdCBsYXlvdXQgcHJvcGVydGllcyBzbGlnaHRseSBkaWZmZXJlbnRseSB0aGFuIHJlZ3VsYXIgY3NzIHByb3BlcnRpZXNcbi8vIHRvIGFjY291bnQgZm9yIGJyb3dzZXItc3BlY2lmaWMgcHJlZml4ZXNcbm1vZHVsZS5leHBvcnRzID0ge1xuXHRzdHlsZXM6IFtcblx0XHRbe1xuXHRcdFx0cHJvcGVydHk6ICdjb2xvcicsXG5cdFx0XHR2YWx1ZTogJyMzYTNhM2EnXG5cdFx0fV0sXG5cdFx0W3tcblx0XHRcdHByb3BlcnR5OiAnY29sb3InLFxuXHRcdFx0dmFsdWU6ICcjODg4J1xuXHRcdH0se1xuXHRcdFx0cHJvcGVydHk6ICdmb250LXNpemUnLFxuXHRcdFx0dmFsdWU6ICcxNHB4J1xuXHRcdH0sIHtcblx0XHRcdHByb3BlcnR5OiAnbWFyZ2luLXRvcCcsXG5cdFx0XHR2YWx1ZTogJzRweCdcblx0XHR9XSxcblx0XHRbe1xuXHRcdFx0cHJvcGVydHk6ICdjb2xvcicsXG5cdFx0XHR2YWx1ZTogJyMzYTNhM2EnXG5cdFx0fSx7XG5cdFx0XHRwcm9wZXJ0eTogJ2ZvbnQtc2l6ZScsXG5cdFx0XHR2YWx1ZTogJzI0cHgnXG5cdFx0fV1cdFxuXHRdLFxuXHRsYXlvdXRzOiBbXG5cdFx0W3tcblx0XHRcdHByb3BlcnR5OiAnZmxleC1kaXJlY3Rpb24nLFxuXHRcdFx0dmFsdWU6ICdjb2x1bW4nXG5cdFx0fSwge1xuXHRcdFx0cHJvcGVydHk6ICdhbGlnbi1pdGVtcycsXG5cdFx0XHR2YWx1ZTogJ2ZsZXgtc3RhcnQnXG5cdFx0fV1cblx0XVxufTsiXX0=
