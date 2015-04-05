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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb21waWxlZC1qYXZhc2NyaXB0cy9jb25maWcuanMiLCJjb21waWxlZC1qYXZhc2NyaXB0cy9zdHlsaW5nL2NvbXBpbGVkLWRhdGEuanMiLCJqYXZhc2NyaXB0cy9jb250cm9sbGVycy9FbWJlZERldGFpbHNWaWV3LmpzIiwiamF2YXNjcmlwdHMvY29udHJvbGxlcnMvSXRlbVZpZXcuanMiLCJqYXZhc2NyaXB0cy9jb250cm9sbGVycy9JdGVtc1ZpZXcuanMiLCJqYXZhc2NyaXB0cy9jb250cm9sbGVycy9TdHlsZUNvbXBvbmVudFZpZXcuanMiLCJqYXZhc2NyaXB0cy9jb250cm9sbGVycy9TdHlsZUlucHV0Vmlldy5qcyIsImphdmFzY3JpcHRzL2NvbnRyb2xsZXJzL1N0eWxlTXVsdGlwbGVTZWdtZW50ZWRCdXR0b25WaWV3LmpzIiwiamF2YXNjcmlwdHMvY29udHJvbGxlcnMvU3R5bGVTZWdtZW50ZWRCdXR0b25WaWV3LmpzIiwiamF2YXNjcmlwdHMvY29udHJvbGxlcnMvU3R5bGVWaWV3LmpzIiwiamF2YXNjcmlwdHMvY29udHJvbGxlcnMvVGVtcGxhdGVHcm91cFZpZXcuanMiLCJqYXZhc2NyaXB0cy9jb250cm9sbGVycy9UZW1wbGF0ZVZhbHVlVmlldy5qcyIsImphdmFzY3JpcHRzL2NvbnRyb2xsZXJzL1RlbXBsYXRlVmlldy5qcyIsImphdmFzY3JpcHRzL2NvbnRyb2xsZXJzL1VwbG9hZFZpZXcuanMiLCJqYXZhc2NyaXB0cy9tYWluLmpzIiwiamF2YXNjcmlwdHMvbW9kZWxzL0NvbHVtbnNFdmVudC5qcyIsImphdmFzY3JpcHRzL21vZGVscy9JdGVtLmpzIiwiamF2YXNjcmlwdHMvbW9kZWxzL0xheW91dC5qcyIsImphdmFzY3JpcHRzL21vZGVscy9TdHlsZS5qcyIsImphdmFzY3JpcHRzL21vZGVscy9UYWJsZS5qcyIsImphdmFzY3JpcHRzL3N0eWxpbmcvZGVmYXVsdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaE1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDektBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9RQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25LQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdFJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgZW52ID0gJ2RldmVsb3BtZW50Jztcbm1vZHVsZS5leHBvcnRzID0ge1xuXHRkZXZlbG9wbWVudDoge1xuXHRcdGFwaToge1xuXHRcdFx0aG9zdDogJ2h0dHA6Ly8xMjcuMC4wLjE6ODA4MCdcblx0XHR9LFxuXHRcdHdlYjoge1xuXHRcdFx0aG9zdDogJ2h0dHA6Ly8xMjcuMC4wLjEnXG5cdFx0fSxcblx0XHRlbWJlZDoge1xuXHRcdFx0aG9zdDogJ2h0dHA6Ly8xMjcuMC4wLjEnLFxuXHRcdFx0cGF0aDogJy9wdWJsaWMvZW1iZWQtdGFibGUuanMnXG5cdFx0fVxuXHR9LFxuXHRzdGFnaW5nOiB7XG5cdFx0YXBpOiB7XG5cdFx0XHRob3N0OiAnaHR0cDovL2FwaXN0Zy50aGVjb2x1bW5zcHJvamVjdC5jb20nXG5cdFx0fSxcblx0XHR3ZWI6IHtcblx0XHRcdGhvc3Q6ICdodHRwOi8vYXBwc3RnLnRoZWNvbHVtbnNwcm9qZWN0LmNvbSdcblx0XHR9LFxuXHRcdGVtYmVkOiB7XG5cdFx0XHRob3N0OiAnaHR0cDovL3N0Zy5jb2x1bS5ueicsXG5cdFx0XHRwYXRoOiAnL3B1YmxpYy9lbWJlZC10YWJsZS5qcydcblx0XHR9XG5cdH0sXG5cdHByb2R1Y3Rpb246IHtcblx0XHRhcGk6IHtcblx0XHRcdGhvc3Q6ICdodHRwOi8vYXBpLnRoZWNvbHVtbnNwcm9qZWN0LmNvbSdcblx0XHR9LFxuXHRcdHdlYjoge1xuXHRcdFx0aG9zdDogJ2h0dHA6Ly9hcHAudGhlY29sdW1uc3Byb2plY3QuY29tJ1xuXHRcdH0sXG5cdFx0ZW1iZWQ6IHtcblx0XHRcdGhvc3Q6ICdodHRwOi8vY29sdW0ubnonLFxuXHRcdFx0cGF0aDogJy9wdWJsaWMvZW1iZWQtdGFibGUuanMnXG5cdFx0fVxuXHR9XG59W2Vudl07IiwiQ29sdW1uc1snc3R5bGVEYXRhJ10gPSB7XG5cdGNvbXBvbmVudHM6IHt9LFxuXHR0eXBlczoge31cbn07XG5Db2x1bW5zLnN0eWxlRGF0YS5jb21wb25lbnRzWydpdGVtcyddID0ge1xuXHR0aXRsZTogJ0l0ZW1zJyxcblx0cm93czogW3tcblx0XHRpdGVtczogW3tcblx0XHRcdGtpbmQ6ICdzZWdtZW50ZWQtYnV0dG9uJyxcblx0XHRcdGxhYmVsOiAnTGF5b3V0Jyxcblx0XHRcdHByb3BlcnR5OiB7XG5cdFx0XHRcdG5hbWU6J2ZsZXgtZGlyZWN0aW9uJ1xuXHRcdFx0fSxcblx0XHRcdGJ1dHRvbnM6IFt7XG5cdFx0XHRcdHZhbHVlOiAncm93Jyxcblx0XHRcdFx0aWNvbjogJ2xheW91dC1ob3Jpem9udGFsJ1xuXHRcdFx0fSwge1xuXHRcdFx0XHR2YWx1ZTogJ2NvbHVtbicsXG5cdFx0XHRcdGljb246ICdsYXlvdXQtdmVydGljYWwnXG5cdFx0XHR9XVxuXHRcdH0sIHtcblx0XHRcdGtpbmQ6ICdzZWdtZW50ZWQtYnV0dG9uJyxcblx0XHRcdGxhYmVsOiAnQWxpZ25tZW50Jyxcblx0XHRcdHByb3BlcnR5OiB7XG5cdFx0XHRcdG5hbWU6J2FsaWduLWl0ZW1zJ1xuXHRcdFx0fSxcblx0XHRcdGJ1dHRvbnM6IFt7XG5cdFx0XHRcdHZhbHVlOiAnZmxleC1zdGFydCcsXG5cdFx0XHRcdGljb246ICdwb3NpdGlvbi1sZWZ0J1xuXHRcdFx0fSwge1xuXHRcdFx0XHR2YWx1ZTogJ2NlbnRlcicsXG5cdFx0XHRcdGljb246ICdwb3NpdGlvbi1jZW50ZXInXG5cdFx0XHR9LCB7XG5cdFx0XHRcdHZhbHVlOiAnZmxleC1lbmQnLFxuXHRcdFx0XHRpY29uOiAncG9zaXRpb24tcmlnaHQnXG5cdFx0XHR9XVxuXHRcdH1dXG5cdH1dXG59XG5Db2x1bW5zLnN0eWxlRGF0YS5jb21wb25lbnRzWydtYXJnaW5zJ10gPSB7XG5cdHRpdGxlOiAnU3BhY2luZycsXG5cdHJvd3M6IFt7XG5cdFx0aXRlbXM6IFt7XG5cdFx0XHRraW5kOiAnaW5wdXQnLFxuXHRcdFx0dHlwZTogJ3RlbCcsXG5cdFx0XHRjYW5CZU5lZ2F0aXZlOiB0cnVlLFxuXHRcdFx0cHJlcGVuZEljb246ICdtYXJnaW4tdG9wJyxcblx0XHRcdGFwcGVuZENvbnRyb2xzOiB0cnVlLFxuXHRcdFx0bGFiZWw6ICdUb3AnLFxuXHRcdFx0cHJvcGVydHk6ICdtYXJnaW4tdG9wJyxcblx0XHRcdGRlZmF1bHQ6ICcwcHgnXG5cdFx0fSwge1xuXHRcdFx0a2luZDogJ2lucHV0Jyxcblx0XHRcdHR5cGU6ICd0ZWwnLFxuXHRcdFx0Y2FuQmVOZWdhdGl2ZTogdHJ1ZSxcblx0XHRcdHByZXBlbmRJY29uOiAnbWFyZ2luLWJvdHRvbScsXG5cdFx0XHRhcHBlbmRDb250cm9sczogdHJ1ZSxcblx0XHRcdGxhYmVsOiAnQm90dG9tJyxcblx0XHRcdHByb3BlcnR5OiAnbWFyZ2luLWJvdHRvbScsXG5cdFx0XHRkZWZhdWx0OiAnMHB4J1xuXHRcdH1dXG5cdH0sIHtcblx0XHRpdGVtczogW3tcblx0XHRcdGtpbmQ6ICdpbnB1dCcsXG5cdFx0XHR0eXBlOiAndGVsJyxcblx0XHRcdGNhbkJlTmVnYXRpdmU6IHRydWUsXG5cdFx0XHRwcmVwZW5kSWNvbjogJ21hcmdpbi1sZWZ0Jyxcblx0XHRcdGFwcGVuZENvbnRyb2xzOiB0cnVlLFxuXHRcdFx0bGFiZWw6ICdMZWZ0Jyxcblx0XHRcdHByb3BlcnR5OiAnbWFyZ2luLWxlZnQnLFxuXHRcdFx0ZGVmYXVsdDogJzBweCdcblx0XHR9LCB7XG5cdFx0XHRraW5kOiAnaW5wdXQnLFxuXHRcdFx0dHlwZTogJ3RlbCcsXG5cdFx0XHRjYW5CZU5lZ2F0aXZlOiB0cnVlLFxuXHRcdFx0cHJlcGVuZEljb246ICdtYXJnaW4tcmlnaHQnLFxuXHRcdFx0YXBwZW5kQ29udHJvbHM6IHRydWUsXG5cdFx0XHRsYWJlbDogJ1JpZ2h0Jyxcblx0XHRcdHByb3BlcnR5OiAnbWFyZ2luLXJpZ2h0Jyxcblx0XHRcdGRlZmF1bHQ6ICcwcHgnXG5cdFx0fV1cblx0fV1cbn07XG5Db2x1bW5zLnN0eWxlRGF0YS5jb21wb25lbnRzWyd0ZXh0J10gPSB7XG5cdHRpdGxlOiAnVGV4dCcsXG5cdHJvd3M6IFt7XG5cdFx0aXRlbXM6IFt7XG5cdFx0XHRraW5kOiAnaW5wdXQnLFxuXHRcdFx0dHlwZTogJ3RlbCcsXG5cdFx0XHRwcmVwZW5kSWNvbjogZmFsc2UsXG5cdFx0XHRhcHBlbmRDb250cm9sczogdHJ1ZSxcblx0XHRcdGxhYmVsOiAnU2l6ZScsXG5cdFx0XHRwcm9wZXJ0eTogJ2ZvbnQtc2l6ZScsXG5cdFx0XHRkZWZhdWx0OiAnMTRweCdcblx0XHR9LCB7XG5cdFx0XHRraW5kOiAnbXVsdGlwbGUtc2VnbWVudGVkLWJ1dHRvbicsXG5cdFx0XHRsYWJlbDogJ1N0eWxlJyxcblx0XHRcdGJ1dHRvbnM6IFt7XG5cdFx0XHRcdHByb3BlcnR5OiB7XG5cdFx0XHRcdFx0bmFtZTogJ2ZvbnQtd2VpZ2h0J1xuXHRcdFx0XHR9LFxuXHRcdFx0XHR2YWx1ZXM6IHtcblx0XHRcdFx0XHRhY3RpdmU6ICdib2xkJyxcblx0XHRcdFx0XHRpbmFjdGl2ZTogJ25vcm1hbCcsXG5cdFx0XHRcdFx0ZGVmYXVsdDogJ25vcm1hbCdcblx0XHRcdFx0fSxcblx0XHRcdFx0aWNvbjogJ2JvbGQnXG5cdFx0XHR9LCB7XG5cdFx0XHRcdHByb3BlcnR5OiB7XG5cdFx0XHRcdFx0bmFtZTonZm9udC1zdHlsZSdcblx0XHRcdFx0fSxcblx0XHRcdFx0dmFsdWVzOiB7XG5cdFx0XHRcdFx0YWN0aXZlOiAnaXRhbGljJyxcblx0XHRcdFx0XHRpbmFjdGl2ZTogJ25vcm1hbCcsXG5cdFx0XHRcdFx0ZGVmYXVsdDogJ25vcm1hbCdcblx0XHRcdFx0fSxcblx0XHRcdFx0aWNvbjogJ2l0YWxpYydcblx0XHRcdH0sIHtcblx0XHRcdFx0cHJvcGVydHk6IHtcblx0XHRcdFx0XHRuYW1lOid0ZXh0LWRlY29yYXRpb24nXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHZhbHVlczoge1xuXHRcdFx0XHRcdGFjdGl2ZTogJ3VuZGVybGluZScsXG5cdFx0XHRcdFx0aW5hY3RpdmU6ICdub25lJyxcblx0XHRcdFx0XHRkZWZhdWx0OiAnbm9uZSdcblx0XHRcdFx0fSxcblx0XHRcdFx0aWNvbjogJ3VuZGVybGluZSdcblx0XHRcdH1dXG5cdFx0fV1cblx0fSwge1xuXHRcdGl0ZW1zOiBbe1xuXHRcdFx0a2luZDogJ2lucHV0Jyxcblx0XHRcdHR5cGU6ICdjb2xvcicsXG5cdFx0XHRwcmVwZW5kSWNvbjogZmFsc2UsXG5cdFx0XHRhcHBlbmRDb250cm9sczogZmFsc2UsXG5cdFx0XHRsYWJlbDogJ0NvbG9yJyxcblx0XHRcdHByb3BlcnR5OiAnY29sb3InLFxuXHRcdFx0ZGVmYXVsdDogJyMzYTNhM2EnXG5cdFx0fSwge1xuXHRcdFx0a2luZDogJ3NlZ21lbnRlZC1idXR0b24nLFxuXHRcdFx0bGFiZWw6ICdBbGlnbm1lbnQnLFxuXHRcdFx0cHJvcGVydHk6IHtcblx0XHRcdFx0bmFtZTogJ3RleHQtYWxpZ24nLFxuXHRcdFx0XHRkZWZhdWx0OiAnbGVmdCdcblx0XHRcdH0sXG5cdFx0XHRidXR0b25zOiBbe1xuXHRcdFx0XHR2YWx1ZTogJ2xlZnQnLFxuXHRcdFx0XHRpY29uOiAndGV4dC1hbGlnbi1sZWZ0J1xuXHRcdFx0fSwge1xuXHRcdFx0XHR2YWx1ZTogJ2NlbnRlcicsXG5cdFx0XHRcdGljb246ICd0ZXh0LWFsaWduLWNlbnRlcidcblx0XHRcdH0sIHtcblx0XHRcdFx0dmFsdWU6ICdyaWdodCcsXG5cdFx0XHRcdGljb246ICd0ZXh0LWFsaWduLXJpZ2h0J1xuXHRcdFx0fV1cblx0XHR9XVxuXHR9XVxufTtcbkNvbHVtbnMuc3R5bGVEYXRhLnR5cGVzID0ge1xuXHR0ZXh0OiBbXG5cdFx0Q29sdW1ucy5zdHlsZURhdGEuY29tcG9uZW50c1sndGV4dCddLFxuXHRcdENvbHVtbnMuc3R5bGVEYXRhLmNvbXBvbmVudHNbJ21hcmdpbnMnXVxuXHRdLFxuXHRncm91cDogW1xuXHRcdENvbHVtbnMuc3R5bGVEYXRhLmNvbXBvbmVudHNbJ2l0ZW1zJ10sXG5cdF1cbn07XG5tb2R1bGUuZXhwb3J0cyA9IENvbHVtbnM7IiwidmFyIENvbHVtbnNFdmVudCBcdFx0XHQ9IHJlcXVpcmUoJy4uL21vZGVscy9Db2x1bW5zRXZlbnQuanMnKTtcbnZhciBjb25maWcgXHRcdFx0XHRcdD0gcmVxdWlyZSgnLi4vLi4vY29tcGlsZWQtamF2YXNjcmlwdHMvY29uZmlnLmpzJyk7XG5cbnZhciBQQU5FTF9URU1QTEFURSBcdFx0XHQ9IENvbHVtbnMuVGVtcGxhdGVzWyd0ZW1wbGF0ZXMvcGFuZWxzL3BhbmVsLmhicyddLFxuXHRCT0RZX1RFTVBMQVRFIFx0XHRcdD0gQ29sdW1ucy5UZW1wbGF0ZXNbJ3RlbXBsYXRlcy9lbWJlZC1kZXRhaWxzLXBhbmVsL2JvZHkuaGJzJ10sXG5cdFNFTEVDVE9SIFx0XHRcdFx0PSAnI2VtYmVkLWRldGFpbHMtcGFuZWwnLFxuXHRDTE9TRV9CVVRUT05fU0VMRUNUT1IgXHQ9ICcuY29sdW1ucy1wYW5lbC1oZWFkZXItY2xvc2UtYnV0dG9uJyxcblx0QkxPQ0tFUl9TRUxFQ1RPUiBcdFx0PSAnLmNvbHVtbnMtcGFuZWwtYmxvY2tlcic7XG5cbmZ1bmN0aW9uIEVtYmVkRGV0YWlsc1ZpZXcoIHRhYmxlICkge1xuXHR0aGlzLnRhYmxlID0gdGFibGU7XG5cdHRoaXMuX3NldHVwRXZlbnRMaXN0ZW5lcnMoKTtcbn1cblxuRW1iZWREZXRhaWxzVmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oKSB7XG5cblx0dmFyICRlbWJlZCA9ICQoIFBBTkVMX1RFTVBMQVRFKHtcblx0XHRpZDogdGhpcy50YWJsZS5pZCxcblx0XHRoZWFkZXI6IHtcblx0XHRcdHRpdGxlOiAnRW1iZWQgRGV0YWlscydcblx0XHR9LFxuXHRcdGJvZHk6IEJPRFlfVEVNUExBVEUoe1xuXHRcdFx0dGl0bGU6IHRoaXMudGFibGUudGl0bGUsXG5cdFx0XHRzb3VyY2U6IHRoaXMudGFibGUuc291cmNlLFxuXHRcdFx0c291cmNlX3VybDogdGhpcy50YWJsZS5zb3VyY2VfdXJsLFxuXHRcdFx0dGFibGVfaWQ6IHRoaXMudGFibGUuaWQsXG5cdFx0XHR1cmw6IGNvbmZpZy5lbWJlZC5ob3N0ICsgY29uZmlnLmVtYmVkLnBhdGhcblx0XHR9KSxcblx0XHRmb290ZXI6IG51bGwsXG5cdH0pICk7XG5cblx0dGhpcy4kZW1iZWQgPSAkZW1iZWQ7XG5cdHRoaXMuX3NldHVwSW50ZXJhY3Rpb25MaXN0ZW5lcnMoKTtcblxuXHQkKCdib2R5JykuYXBwZW5kKCB0aGlzLiRlbWJlZCApO1xuXHRyZXR1cm4gdGhpcy4kZW1iZWQ7XG59O1xuXG5FbWJlZERldGFpbHNWaWV3LnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24oKSB7XG5cdHRoaXMuJGVtYmVkLmFkZENsYXNzKCdhY3RpdmUnKTtcbn07XG5cbkVtYmVkRGV0YWlsc1ZpZXcucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbigpIHtcblx0dGhpcy4kZW1iZWQucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xufTtcblxuRW1iZWREZXRhaWxzVmlldy5wcm90b3R5cGUuX2VtaXRDaGFuZ2UgPSBmdW5jdGlvbiggcHJvcGVydHksIHZhbHVlICkge1xuXHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdC8vIGNvbHVtbnNFdmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuRW1iZWREZXRhaWxzVmlldy5EaWRVcGRhdGVQcm9wZXJ0eVdpdGhWYWx1ZScsIGZhbHNlLCBmYWxzZSwge1xuXHQvLyBcdGVtYmVkOiBcdHRoaXMsXG5cdC8vIFx0cHJvcGVydHk6IHByb3BlcnR5LFxuXHQvLyBcdHZhbHVlOiB2YWx1ZVxuXHQvLyB9KTtcblx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjb2x1bW5zRXZlbnQpO1xuXHRDb2x1bW5zRXZlbnQuc2VuZCggJ0NvbHVtbnMuRW1iZWREZXRhaWxzVmlldy5EaWRVcGRhdGVQcm9wZXJ0eVdpdGhWYWx1ZScsIHtcblx0XHRlbWJlZDogXHR0aGlzLFxuXHRcdHByb3BlcnR5OiBwcm9wZXJ0eSxcblx0XHR2YWx1ZTogdmFsdWVcblx0fSk7XG59O1xuXG5FbWJlZERldGFpbHNWaWV3LnByb3RvdHlwZS5fc2V0dXBFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uKCkge1xuXG5cdC8vIFNob3VsZCBsaXN0ZW4gZm9yIHRhYmxlIHVwbG9hZCBzdWNjZXNzXG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuVGFibGUuRGlkVXBsb2FkV2l0aFN1Y2Nlc3MnLCB0aGlzLl9vblRhYmxlVXBsb2FkLmJpbmQoIHRoaXMgKSApO1xufTtcblxuRW1iZWREZXRhaWxzVmlldy5wcm90b3R5cGUuX3NldHVwSW50ZXJhY3Rpb25MaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBTaG91bGQgbGlzdGVuIHRvIGNsaWNrcyBvbiB0aGUgZW1iZWQgYnV0dG9uXG5cdCQoJy5jb2x1bW5zLWhlYWRlci1uYXYtZW1iZWQnKS5vbiggJ2NsaWNrJywgdGhpcy5fb25FbWJlZEJ1dHRvbkNsaWNrLmJpbmQoIHRoaXMgKSApO1xuXG5cdC8vIFNob3VsZCBsaXN0ZW4gdG8gY2xpY2tzIG9uIHRoZSBoaWRlIGJ1dHRvblxuXHR0aGlzLiRlbWJlZC5maW5kKCBDTE9TRV9CVVRUT05fU0VMRUNUT1IgKS5vbiggJ2NsaWNrJywgdGhpcy5fb25DbG9zZUJ1dHRvbkNsaWNrLmJpbmQoIHRoaXMgKSApO1xuXG5cdC8vIFNob3VsZCBsaXN0ZW4gdG8gY2xpY2tzIG9uIHRoZSBibG9ja2VyXG5cdHRoaXMuJGVtYmVkLmZpbmQoIEJMT0NLRVJfU0VMRUNUT1IgKS5vbiggJ2NsaWNrJywgdGhpcy5fb25CbG9ja2VyQ2xpY2suYmluZCggdGhpcyApICk7XG5cblx0Ly8gU2hvdWxkIGxpc3RlbiB0byBrZXl1cCBldmVudHMgb24gaW5wdXQgZmllbGRzXG5cdHRoaXMuJGVtYmVkLmZpbmQoJ2lucHV0Jykub24oICdrZXl1cCcsIHRoaXMuX29uSW5wdXRLZXl1cC5iaW5kKCB0aGlzICkgKTtcblxuXHQvLyBTaG91bGQgbGlzdGVuIHRvIGJsdXIgZXZlbnRzIG9uIGlucHV0IGZpZWxkc1xuXHR0aGlzLiRlbWJlZC5maW5kKCdpbnB1dCcpLm9uKCAnYmx1cicsIHRoaXMuX29uSW5wdXRCbHVyLmJpbmQoIHRoaXMgKSApO1xufTtcblxuRW1iZWREZXRhaWxzVmlldy5wcm90b3R5cGUuX29uVGFibGVVcGxvYWQgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdHRoaXMudGFibGUgPSBkYXRhLnRhYmxlO1xuXHR0aGlzLnJlbmRlcigpO1xufTtcblxuRW1iZWREZXRhaWxzVmlldy5wcm90b3R5cGUuX29uRW1iZWRCdXR0b25DbGljayA9IGZ1bmN0aW9uKCBldmVudCkge1xuXHR0aGlzLnNob3coKTtcbn07XG5cbkVtYmVkRGV0YWlsc1ZpZXcucHJvdG90eXBlLl9vbkNsb3NlQnV0dG9uQ2xpY2sgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdHRoaXMuaGlkZSgpO1xufTtcblxuRW1iZWREZXRhaWxzVmlldy5wcm90b3R5cGUuX29uQmxvY2tlckNsaWNrID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuXHR0aGlzLmhpZGUoKTtcbn07XG5cbkVtYmVkRGV0YWlsc1ZpZXcucHJvdG90eXBlLl9vbklucHV0S2V5dXAgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdHZhciAkZmllbGQgXHRcdD0gJCggZXZlbnQudGFyZ2V0ICksXG5cdFx0cHJvcGVydHlcdD0gJGZpZWxkLmRhdGEoJ3Byb3BlcnR5JyksXG5cdFx0dmFsdWVcdFx0PSAkZmllbGQudmFsKCk7XG5cblx0dGhpcy5fZW1pdENoYW5nZSggcHJvcGVydHksIHZhbHVlICk7IFxufTtcblxuRW1iZWREZXRhaWxzVmlldy5wcm90b3R5cGUuX29uSW5wdXRCbHVyID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuXHR2YXIgJGZpZWxkIFx0XHQ9ICQoIGV2ZW50LnRhcmdldCApLFxuXHRcdHByb3BlcnR5XHQ9ICRmaWVsZC5kYXRhKCdwcm9wZXJ0eScpLFxuXHRcdHZhbHVlXHRcdD0gJGZpZWxkLnZhbCgpO1xuXG5cdHRoaXMuX2VtaXRDaGFuZ2UoIHByb3BlcnR5LCB2YWx1ZSApOyBcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRW1iZWREZXRhaWxzVmlldztcblxuIiwidmFyIENvbHVtbnNFdmVudCBcdD0gcmVxdWlyZSgnLi4vbW9kZWxzL0NvbHVtbnNFdmVudC5qcycpO1xuXG52YXIgRFJBR0dJTkdfQ0xBU1MgPSAnZHJhZ2dpbmcnLFxuXHRJTkFDVElWRV9DTEFTUyA9ICdpbmFjdGl2ZScsXG5cdFNFTEVDVEVEX0NMQVNTID0gJ3NlbGVjdGVkJyxcblx0SVRFTV9TRUxFQ1RPUiA9ICcubGF5b3V0LWNvbHVtbic7XG5cbi8vIE1hbmFnZSB0aGUgZGlzcGxheSBvZiBhIHNpbmdsZSBpdGVtXG4vLyB3aXRoaW4gdGhlIGxpc3Qgb2YgaXRlbXNcbkl0ZW1WaWV3ID0gZnVuY3Rpb24oIGl0ZW0gKSB7XG5cblx0dGhpcy5pdGVtID0gaXRlbSB8fCBuZXcgSXRlbSgpO1xuXHR0aGlzLnRlbXBsYXRlID0gQ29sdW1ucy5UZW1wbGF0ZXNbJ3RlbXBsYXRlcy9sYXlvdXQvY29sdW1uLmhicyddO1xuXHR0aGlzLnNlbGVjdGVkID0gZmFsc2U7XG5cdHRoaXMuJGl0ZW07XG59O1xuXG5JdGVtVmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oKSB7XG5cdHZhciAkaXRlbSA9ICQoIHRoaXMudGVtcGxhdGUoe1xuXHRcdHRpdGxlOiB0aGlzLml0ZW0uZm9ybWF0dGVkVGl0bGUoKSxcblx0XHRhY3RpdmU6IHRoaXMuaXRlbS5hY3RpdmUsXG5cdFx0c2VsZWN0ZWQ6IHRoaXMuc2VsZWN0ZWRcblx0fSkgKTtcblx0JGl0ZW0uZGF0YSgnc3R5bGUnLCB0aGlzLml0ZW0uc3R5bGUuc3R5bGVzKTtcblx0dGhpcy4kaXRlbSA9ICRpdGVtO1xuXG5cdHRoaXMuc2V0dXBFdmVudHMoKTtcblx0dGhpcy5fc2V0dXBFdmVudExpc3RlbmVycygpO1xuXG5cdHJldHVybiB0aGlzLiRpdGVtO1xufTtcblxuSXRlbVZpZXcucHJvdG90eXBlLnNldHVwRXZlbnRzID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gTWFrZSB0aGUgaXRlbSBkcmFnZ2FibGVcblx0dGhpcy4kaXRlbS5kcmFnZ2FibGUoe1xuXHRcdHJldmVydDogJ2ludmFsaWQnLFxuXHRcdHJldmVydER1cmF0aW9uOiAyMDAsXG5cdFx0aGVscGVyOiAnY2xvbmUnLFxuXHRcdC8vIG9wYWNpdHk6IC4yLFxuXHRcdGNhbmNlbDogJy5pbmFjdGl2ZSdcblx0fSk7XG5cblx0dGhpcy4kaXRlbS5vbiggJ2RyYWdzdGFydCcsICQucHJveHkoZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcblxuXHRcdC8vIE1ha2UgaW5hY3RpdmVcblx0XHQkKCBldmVudC50YXJnZXQgKS5hZGRDbGFzcyggRFJBR0dJTkdfQ0xBU1MgKTtcblxuXHRcdC8vIEFsZXJ0IGFueSBsaXN0ZW5lcnMgdGhhdCB0aGUgaXRlbSBoYXMgc3RhcnRlZCBkcmFnXG5cdFx0Ly8gdmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCAnQ29sdW1ucy5JdGVtVmlldy5JdGVtRGlkQmVnaW5EcmFnJywge1xuXHRcdC8vIFx0aXRlbTogXHR0aGlzLFxuXHRcdC8vIFx0ZXZlbnQ6IFx0ZXZlbnQsXG5cdFx0Ly8gXHR1aTogXHR1aVxuXHRcdC8vIH0pO1xuXHRcdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0XHQvLyBjb2x1bW5zRXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLkl0ZW1WaWV3Lkl0ZW1EaWRCZWdpbkRyYWcnLCBmYWxzZSwgZmFsc2UsIHtcblx0XHQvLyBcdGl0ZW06IFx0dGhpcyxcblx0XHQvLyBcdGV2ZW50OiBcdGV2ZW50LFxuXHRcdC8vIFx0dWk6IFx0dWlcblx0XHQvLyB9KTtcblx0XHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGNvbHVtbnNFdmVudCk7XG5cdFx0Q29sdW1uc0V2ZW50LnNlbmQoICdDb2x1bW5zLkl0ZW1WaWV3Lkl0ZW1EaWRCZWdpbkRyYWcnLCB7XG5cdFx0XHRpdGVtOiBcdHRoaXMsXG5cdFx0XHRldmVudDogXHRldmVudCxcblx0XHRcdHVpOiBcdHVpXG5cdFx0fSApXG5cblx0fSwgdGhpcykgKTtcblxuXHR0aGlzLiRpdGVtLm9uKCAnZHJhZ3N0b3AnLCAkLnByb3h5KGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XHRcdFxuXG5cdFx0Ly8gTWFrZSBhY3RpdmUgYWdhaW5cblx0XHQkKCBldmVudC50YXJnZXQgKS5yZW1vdmVDbGFzcyggRFJBR0dJTkdfQ0xBU1MgKTtcblxuXHRcdC8vIEFsZXJ0IGFueSBsaXN0ZW5lcnMgdGhhdCB0aGUgaXRlbSBoYXMgc3RhcnRlZCBkcmFnXG5cdFx0Ly8gdmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCAnQ29sdW1ucy5JdGVtVmlldy5JdGVtRGlkQkVuZERyYWcnLCB7XG5cdFx0Ly8gXHRpdGVtOiBcdHRoaXMsXG5cdFx0Ly8gXHRldmVudDogXHRldmVudCxcblx0XHQvLyBcdHVpOiBcdHVpXG5cdFx0Ly8gfSk7XG5cdFx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHRcdC8vIGNvbHVtbnNFdmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuSXRlbVZpZXcuSXRlbURpZEVuZERyYWcnLCBmYWxzZSwgZmFsc2UsIHtcblx0XHQvLyBcdGl0ZW06IFx0dGhpcyxcblx0XHQvLyBcdGV2ZW50OiBcdGV2ZW50LFxuXHRcdC8vIFx0dWk6IFx0dWlcblx0XHQvLyB9KTtcblx0XHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGNvbHVtbnNFdmVudCk7XG5cdFx0Q29sdW1uc0V2ZW50LnNlbmQoICdDb2x1bW5zLkl0ZW1WaWV3Lkl0ZW1EaWRFbmREcmFnJywge1xuXHRcdFx0aXRlbTogXHR0aGlzLFxuXHRcdFx0ZXZlbnQ6IFx0ZXZlbnQsXG5cdFx0XHR1aTogXHR1aVxuXHRcdH0gKVxuXG5cdH0sIHRoaXMpICk7XG5cblx0dGhpcy4kaXRlbS5vbiggJ2RyYWcnLCAkLnByb3h5KGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XG5cblx0XHQvLyBBbGVydCBhbnkgbGlzdGVuZXJzIHRoYXQgdGhlIGl0ZW0gaGFzIHN0YXJ0ZWQgZHJhZ1xuXHRcdC8vIHZhciBldmVudCA9IG5ldyBDdXN0b21FdmVudCggJ0NvbHVtbnMuSXRlbVZpZXcuSXRlbURpZERyYWcnLCB7XG5cdFx0Ly8gXHRpdGVtOiBcdHRoaXMsXG5cdFx0Ly8gXHRldmVudDogXHRldmVudCxcblx0XHQvLyBcdHVpOiBcdHVpXG5cdFx0Ly8gfSk7XG5cdFx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHRcdC8vIGNvbHVtbnNFdmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuSXRlbVZpZXcuSXRlbURpZERyYWcnLCBmYWxzZSwgZmFsc2UsIHtcblx0XHQvLyBcdGl0ZW06IFx0dGhpcyxcblx0XHQvLyBcdGV2ZW50OiBcdGV2ZW50LFxuXHRcdC8vIFx0dWk6IFx0dWlcblx0XHQvLyB9KTtcblx0XHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGNvbHVtbnNFdmVudCk7XG5cdFx0Q29sdW1uc0V2ZW50LnNlbmQoICdDb2x1bW5zLkl0ZW1WaWV3Lkl0ZW1EaWREcmFnJywge1xuXHRcdFx0aXRlbTogXHR0aGlzLFxuXHRcdFx0ZXZlbnQ6IFx0ZXZlbnQsXG5cdFx0XHR1aTogXHR1aVxuXHRcdH0gKVxuXG5cdH0sIHRoaXMpICk7XG5cblx0dGhpcy4kaXRlbS5vbiggJ2NsaWNrJywgJC5wcm94eShmdW5jdGlvbiggZXZlbnQgKSB7O1xuXG5cdFx0dGhpcy5fc2V0U2VsZWN0ZWQoIHRydWUgKTtcblxuXHRcdENvbHVtbnNFdmVudC5zZW5kKCAnQ29sdW1ucy5JdGVtVmlldy5JdGVtRGlkU2VsZWN0Jywge1xuXHRcdFx0aXRlbVZpZXc6IFx0dGhpcyxcblx0XHRcdGl0ZW06IFx0XHR0aGlzLml0ZW1cblx0XHR9ICk7XG5cblx0fSwgdGhpcyApICk7XG59O1xuXG5JdGVtVmlldy5wcm90b3R5cGUuX3NldFNlbGVjdGVkID0gZnVuY3Rpb24oIHNlbGVjdGVkICkge1xuXG5cdGlmICggc2VsZWN0ZWQgPT09IHRydWUgKSB7XG5cdFx0dGhpcy5zZWxlY3RlZCA9IHRydWU7XG5cdFx0dGhpcy4kaXRlbS5hZGRDbGFzcyggU0VMRUNURURfQ0xBU1MgKTtcblx0fSBlbHNlIGlmICggc2VsZWN0ZWQgPT09IGZhbHNlICkge1xuXHRcdHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcblx0XHR0aGlzLiRpdGVtLnJlbW92ZUNsYXNzKCBTRUxFQ1RFRF9DTEFTUyApO1xuXHR9XG59O1xuXG5JdGVtVmlldy5wcm90b3R5cGUuX3NldHVwRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBMaXN0ZW4gdG8gdmFsdWUgc2VsZWN0aW9uIGV2ZW50c1xuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLlRlbXBsYXRlVmFsdWVWaWV3LlZhbHVlRGlkU2VsZWN0V2l0aEl0ZW0nLCB0aGlzLl9vblZhbHVlVmlld1NlbGVjdGlvbi5iaW5kKCB0aGlzICkpO1xuXG5cdC8vIExpc3RlbiB0byBpdGVtIHZpZXcgc2VsZWN0aW9uIGV2ZW50c1xuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLkl0ZW1WaWV3Lkl0ZW1EaWRTZWxlY3QnLCB0aGlzLl9vbkl0ZW1TZWxlY3Rpb24uYmluZCggdGhpcyApKTtcdFxufTtcblxuSXRlbVZpZXcucHJvdG90eXBlLl9vblZhbHVlVmlld1NlbGVjdGlvbiA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblx0dmFyIGl0ZW0gPSBkYXRhLml0ZW07XG5cblx0aWYgKCB0aGlzLml0ZW0uaXMoIGl0ZW0gKSApIHtcblx0XHR0aGlzLl9zZXRTZWxlY3RlZCggdHJ1ZSApO1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMuX3NldFNlbGVjdGVkKCBmYWxzZSApO1xuXHR9XG59O1xuXG5JdGVtVmlldy5wcm90b3R5cGUuX29uSXRlbVNlbGVjdGlvbiA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblx0dmFyIGl0ZW0gPSBkYXRhLml0ZW07XG5cblx0aWYgKCAhdGhpcy5pdGVtLmlzKCBpdGVtICkgKSB7XG5cdFx0dGhpcy5fc2V0U2VsZWN0ZWQoIGZhbHNlICk7XG5cdH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSXRlbVZpZXc7IiwidmFyIENvbHVtbnNFdmVudCBcdD0gcmVxdWlyZSgnLi4vbW9kZWxzL0NvbHVtbnNFdmVudC5qcycpO1xudmFyIEl0ZW1WaWV3IFx0XHQ9IHJlcXVpcmUoJy4vSXRlbVZpZXcuanMnKTtcblxuLy8gTWFuYWdlIHRoZSBkaXNwbGF5IG9mIGEgbGlzdCBvZiBpdGVtc1xuSXRlbXNWaWV3ID0gZnVuY3Rpb24oIGl0ZW1zICkge1xuXG5cdHRoaXMuaXRlbXMgXHRcdD0gaXRlbXMgfHwgW107XG5cdHRoaXMudmlld3MgXHRcdD0gW107XG5cdHRoaXMudGVtcGxhdGUgXHQ9IENvbHVtbnMuVGVtcGxhdGVzWyd0ZW1wbGF0ZXMvbGF5b3V0L2NvbHVtbnMuaGJzJ107XG5cdHRoaXMuJGl0ZW1zO1xuXG5cdHRoaXMucmVuZGVyKCBpdGVtcyApO1xuXHR0aGlzLl9zZXR1cEV2ZW50TGlzdGVuZXJzKCk7XG59O1xuXG5JdGVtc1ZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgaXRlbVZpZXcsXG5cdFx0JGNvbHVtbnMgPSAkKCB0aGlzLnRlbXBsYXRlKCkgKTtcblxuXHQvLyBSZW1vdmUgYW55IGV4aXN0aW5nIGNvbHVtbnNcblx0JCgnLmxheW91dC1jb2x1bW5zJykucmVtb3ZlKCk7XG5cblx0aWYgKCB0aGlzLml0ZW1zICkge1xuXHRcdHRoaXMuaXRlbXMuZm9yRWFjaChmdW5jdGlvbiggaXRlbSwgaSApIHtcblxuXHRcdFx0aXRlbVZpZXcgPSB0aGlzLml0ZW1WaWV3Rm9ySXRlbSggaXRlbSApO1xuXHRcdFx0XG5cdFx0XHRpZiAoICFpdGVtVmlldyApIHtcblx0XHRcdFx0aXRlbVZpZXcgPSBuZXcgSXRlbVZpZXcoIGl0ZW0gKTtcblx0XHRcdFx0dGhpcy52aWV3cy5wdXNoKCBpdGVtVmlldyApO1xuXHRcdFx0fVxuXG5cdFx0XHQkY29sdW1ucy5hcHBlbmQoIGl0ZW1WaWV3LnJlbmRlcigpICk7XG5cblx0XHR9LmJpbmQoIHRoaXMgKSk7XG5cdH1cblxuXHQkKFwiI2NvbHVtbnNcIikuYXBwZW5kKCAkY29sdW1ucyApO1xuXG5cdC8vIHRoaXMuc2V0dXBEcmFnTGlzdGVuZXJzKCQodGhpcy5MQVlPVVRfQ09MVU1OX1NFTEVDVE9SKSk7XG5cdC8vIHRoaXMuc2V0dXBEcm9wTGlzdGVuZXJzKCk7XG5cblx0dGhpcy4kaXRlbXMgPSAkY29sdW1ucztcblx0cmV0dXJuIHRoaXMuJGl0ZW1zO1xufTtcblxuSXRlbXNWaWV3LnByb3RvdHlwZS5pdGVtVmlld0Zvckl0ZW0gPSBmdW5jdGlvbiggaXRlbSApIHtcblx0dmFyIGl0ZW1WaWV3O1xuXG5cdGlmICggaXRlbSBpbnN0YW5jZW9mIEl0ZW0gJiYgdGhpcy52aWV3cy5sZW5ndGggKSB7XG5cdFx0aXRlbVZpZXcgPSB0aGlzLnZpZXdzLmZpbHRlcihmdW5jdGlvbiggdmlldywgaSApIHtcblx0XHRcdHJldHVybiB2aWV3Lml0ZW0udGl0bGUgPT09IGl0ZW0udGl0bGU7XG5cdFx0fS5iaW5kKCB0aGlzICkgKVsgMCBdO1xuXHR9XG5cblx0cmV0dXJuIGl0ZW1WaWV3O1xufTtcblxuSXRlbXNWaWV3LnByb3RvdHlwZS51cGRhdGVJdGVtID0gZnVuY3Rpb24oIGl0ZW0gKSB7XG5cblx0Ly8gUmUtcmVuZGVyIHRoZSBpdGVtXG5cdHRoaXMuaXRlbXMuZm9yRWFjaChmdW5jdGlvbiggb2xkSXRlbSwgaSApIHtcblxuXHRcdGlmICggb2xkSXRlbS5pcyggaXRlbSApICkge1xuXHRcdFx0dmFyIGl0ZW1WaWV3ID0gdGhpcy5pdGVtVmlld0Zvckl0ZW0oIGl0ZW0gKTtcblx0XHRcdHRoaXMuJGl0ZW1zLmZpbmQoJy5sYXlvdXQtY29sdW1uJykuZXEoIGkgKS5yZXBsYWNlV2l0aCggaXRlbVZpZXcucmVuZGVyKCkgKTtcblx0XHR9XG5cblx0fS5iaW5kKCB0aGlzICkgKTtcblxuXHR0aGlzLl9lbWl0Q2hhbmdlKCk7XG59O1xuXG5JdGVtc1ZpZXcucHJvdG90eXBlLl9lbWl0Q2hhbmdlID0gZnVuY3Rpb24oKSB7XG5cdC8vIExldCBldmVyeW9uZSBrbm93IHRoYXQgdGhlIGl0ZW1zIHZpZXcgaGFzIGNoYW5nZWRcblx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHQvLyBjb2x1bW5zRXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLkl0ZW1zVmlldy5EaWRDaGFuZ2UnLCBmYWxzZSwgZmFsc2UsIHtcblx0Ly8gXHRpdGVtc1ZpZXc6IFx0dGhpc1xuXHQvLyB9KTtcblx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjb2x1bW5zRXZlbnQpO1xuXHRDb2x1bW5zRXZlbnQuc2VuZCggJ0NvbHVtbnMuSXRlbXNWaWV3LkRpZENoYW5nZScsIHtcblx0XHRpdGVtc1ZpZXc6IFx0dGhpc1xuXHR9KTtcblxufTtcblxuSXRlbXNWaWV3LnByb3RvdHlwZS5fc2V0dXBFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uKCkge1xuXG5cdC8vIExpc3RlbiBmb3IgdGFibGUgdXBkYXRlc1xuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLlRhYmxlLkRpZENoYW5nZScsIHRoaXMuX29uVGFibGVDaGFuZ2UuYmluZCggdGhpcyApICk7XG5cblx0Ly8gTGlzdGVuIGZvciBpdGVtIHVwZGF0ZXNcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5JdGVtLkRpZENoYW5nZScsIHRoaXMuX29uSXRlbUNoYW5nZS5iaW5kKCB0aGlzICkgKTtcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5JdGVtLkFjdGl2ZVN0YXRlRGlkQ2hhbmdlJywgdGhpcy5fb25JdGVtQ2hhbmdlLmJpbmQoIHRoaXMgKSApO1xufTtcblxuSXRlbXNWaWV3LnByb3RvdHlwZS5fb25UYWJsZUNoYW5nZSA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblxuXHR0aGlzLl91cGRhdGVXaXRoSXRlbXMoIGRhdGEudGFibGUuY29sdW1ucyApO1xuXHR0aGlzLnJlbmRlcigpO1xufTtcblxuSXRlbXNWaWV3LnByb3RvdHlwZS5fb25JdGVtQ2hhbmdlID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXHR0aGlzLnVwZGF0ZUl0ZW0oIGRhdGEuaXRlbSApO1xufTtcblxuSXRlbXNWaWV3LnByb3RvdHlwZS5fdXBkYXRlV2l0aEl0ZW1zID0gZnVuY3Rpb24oIGl0ZW1zICkge1xuXG5cdGlmKCBpdGVtcyApIHtcblxuXHRcdGlmICggQXJyYXkuaXNBcnJheSggaXRlbXMgKSApIHtcblxuXHRcdFx0aXRlbXMuZm9yRWFjaChmdW5jdGlvbiggaXRlbSApIHtcblx0XHRcdFx0dGhpcy5fdXBkYXRlV2l0aEl0ZW0oIGl0ZW0gKTtcblx0XHRcdH0uYmluZCggdGhpcyApKTtcblxuXHRcdFx0dGhpcy5fZW1pdENoYW5nZSgpO1xuXG5cdFx0fSBlbHNlIHtcblx0XHRcdHRocm93IFwiZXhjZXB0aW9uIEl0ZW1zIG11c3QgYmUgYXJyYXkgb2YgaXRlbXMgb3Igc2luZ2xlIGl0ZW1cIjtcblx0XHR9XG5cdH1cbn07XG5cbkl0ZW1zVmlldy5wcm90b3R5cGUuX3VwZGF0ZVdpdGhJdGVtID0gZnVuY3Rpb24oIGl0ZW0gKSB7XG5cdHZhciBkdXBsaWNhdGVzID0gW107XG5cblx0aWYgKCBpdGVtICYmIGl0ZW0gaW5zdGFuY2VvZiBJdGVtICkge1xuXHRcdGR1cGxpY2F0ZXMgPSB0aGlzLml0ZW1zLmZpbHRlcihmdW5jdGlvbiggZXhpc3RpbmdJdGVtICkge1xuXHRcdFx0cmV0dXJuIGV4aXN0aW5nSXRlbS5pcyggaXRlbSApO1xuXHRcdH0pO1xuXG5cdFx0aWYgKCAhZHVwbGljYXRlcy5sZW5ndGggKSB7XG5cdFx0XHR0aGlzLml0ZW1zLnB1c2goIGl0ZW0gKTtcblx0XHR9XG5cdH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSXRlbXNWaWV3OyIsInZhciBDb2x1bW5zRXZlbnQgXHRcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoJy4uL21vZGVscy9Db2x1bW5zRXZlbnQuanMnKTtcbnZhciBTdHlsZUlucHV0VmlldyBcdFx0XHRcdFx0XHRcdD0gcmVxdWlyZSgnLi9TdHlsZUlucHV0Vmlldy5qcycpO1xudmFyIFN0eWxlU2VnbWVudGVkQnV0dG9uVmlldyBcdFx0XHRcdD0gcmVxdWlyZSgnLi9TdHlsZVNlZ21lbnRlZEJ1dHRvblZpZXcuanMnKTtcbnZhciBTdHlsZU11bHRpcGxlU2VnbWVudGVkQnV0dG9uVmlldyBcdFx0PSByZXF1aXJlKCcuL1N0eWxlTXVsdGlwbGVTZWdtZW50ZWRCdXR0b25WaWV3LmpzJyk7XG5cbnZhciBDT01QT05FTlRfVEVNUExBVEUgXHQ9IENvbHVtbnMuVGVtcGxhdGVzWyd0ZW1wbGF0ZXMvc3R5bGluZy9jb21wb25lbnQuaGJzJ10sXG5cdFNFQ1RJT05fVEVNUExBVEVcdD0gQ29sdW1ucy5UZW1wbGF0ZXNbJ3RlbXBsYXRlcy9zdHlsaW5nL2NvbXBvbmVudC1zZWN0aW9uLmhicyddLFxuXHRST1dfVEVNUExBVEVcdFx0PSBDb2x1bW5zLlRlbXBsYXRlc1sndGVtcGxhdGVzL3N0eWxpbmcvY29tcG9uZW50LXNlY3Rpb24tcm93LmhicyddO1xuXG5mdW5jdGlvbiBTdHlsZUNvbXBvbmVudFZpZXcoIHNlbGVjdGlvbiApIHtcblxuXHR0aGlzLml0ZW0gPSBzZWxlY3Rpb247XG5cdC8vIHRoaXMuaXRlbSA9IHNlbGVjdGlvbiA/IHRoaXMuZ2V0SXRlbUZvclNlbGVjdGlvbiggc2VsZWN0aW9uICkgOiB1bmRlZmluZWQ7XG5cdC8vIHRoaXMudGVtcGxhdGVHcm91cHMgPSB0aGlzLml0ZW0gPyBUZW1wbGF0ZVZpZXcuZ2V0R3JvdXBzRm9ySXRlbSggdGhpcy5pdGVtICkgOiBbXTtcbn1cblxuLy8gU3R5bGVDb21wb25lbnRWaWV3LnByb3RvdHlwZS5nZXRJdGVtRm9yU2VsZWN0aW9uID0gZnVuY3Rpb24oIHNlbGVjdGlvbiApIHtcblxuLy8gXHRpZiggc2VsZWN0aW9uIGluc3RhbmNlb2YgSXRlbSApIHtcbi8vIFx0XHRyZXR1cm4gc2VsZWN0aW9uO1xuLy8gXHR9IGVsc2UgaWYgKCBzZWxlY3Rpb24gaW5zdGFuY2VvZiBJdGVtVmlldyApIHtcbi8vIFx0XHRyZXR1cm4gc2VsZWN0aW9uLml0ZW07XG4vLyBcdH0gZWxzZSBpZiAoIHNlbGVjdGlvbiBpbnN0YW5jZW9mIFRlbXBsYXRlVmFsdWVWaWV3ICkge1xuLy8gXHRcdHJldHVybiBzZWxlY3Rpb24uaXRlbTtcbi8vIFx0fSBlbHNlIGlmICggc2VsZWN0aW9uIGluc3RhbmNlb2YgVGVtcGxhdGVHcm91cFZpZXcgKSB7XG4vLyBcdFx0cmV0dXJuIHNlbGVjdGlvbjtcbi8vIFx0fSBlbHNlIHtcbi8vIFx0XHR0aHJvdyBcImV4Y2VwdGlvbjogU2VsZWN0aW9uIG11c3QgYmUgYW4gSXRlbSwgSXRlbVZpZXcsIFRlbXBsYXRlVmFsdWVWaWV3IG9yIFRlbXBsYXRlR3JvdXBWaWV3XCI7XG4vLyBcdH1cbi8vIH07XG5cbi8vIFN0eWxlQ29tcG9uZW50Vmlldy5wcm90b3R5cGUuZ2V0VGVtcGxhdGVzRm9ySXRlbSA9IGZ1bmN0aW9uKCBpdGVtICkge1xuLy8gXHQvLyB2YXIgXG4vLyB9O1xuXG5TdHlsZUNvbXBvbmVudFZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKCkge1xuXG5cdC8vIEdldCB0aGUgYXBwcm9wcmlhdGUgZGF0YSBmb3IgdGhlIGN1cnJlbnQgaXRlbVxuXHR2YXIgdHlwZSA9IHRoaXMuaXRlbSBpbnN0YW5jZW9mIFRlbXBsYXRlR3JvdXBWaWV3ID8gJ2dyb3VwJyA6ICd0ZXh0Jyxcblx0XHR0aXRsZSA9IHRoaXMuaXRlbSBpbnN0YW5jZW9mIFRlbXBsYXRlR3JvdXBWaWV3ID8gdGhpcy5pdGVtLnRpdGxlKCkgOiB0aGlzLml0ZW0uZm9ybWF0dGVkVGl0bGUoKSxcblx0XHRjb21wb25lbnREYXRhID0gQ29sdW1ucy5zdHlsZURhdGEudHlwZXNbdHlwZV0sXG5cdFx0JGNvbXBvbmVudCxcblx0XHQkY29tcG9uZW50Qm9keSxcblx0XHQkc2VjdGlvbjtcblxuXHQvLyBGaXJzdCBjcmVhdGUgdGhlIGNvbXBvbmVudCBza2VsZXRvblxuXHQkY29tcG9uZW50ID0gJCggQ09NUE9ORU5UX1RFTVBMQVRFKHtcblx0XHR0eXBlOiB0eXBlLFxuXHRcdG5hbWU6IHRpdGxlXG5cdH0pICk7XG5cblx0JGNvbXBvbmVudEJvZHkgPSAkY29tcG9uZW50LmZpbmQoJy5zdHlsZS1jb21wb25lbnQtYm9keScpO1xuXG5cdC8vIE5leHQsIGxvb3AgdGhyb3VnaCB0aGUgZGF0YVxuXHQvLyBjcmVhdGluZyB0aGUgc2VjdGlvbnMgZnJvbSB0aGUgaW5zaWRlIG91dFxuXHRjb21wb25lbnREYXRhLmZvckVhY2goZnVuY3Rpb24oIHNlY3Rpb24sIGkgKSB7XG5cdFx0JHNlY3Rpb24gPSB0aGlzLl9yZW5kZXJTZWN0aW9uKCBzZWN0aW9uICk7XG5cdFx0JGNvbXBvbmVudEJvZHkuYXBwZW5kKCAkc2VjdGlvbiApO1xuXHR9LmJpbmQoIHRoaXMgKSApO1xuXG5cdHRoaXMuJHN0eWxlID0gJGNvbXBvbmVudDtcblx0dGhpcy5fc2V0dXBFdmVudExpc3RlbmVycygpO1xuXG5cdGlmICggdGhpcy5pdGVtIGluc3RhbmNlb2YgVGVtcGxhdGVHcm91cFZpZXcgKSB7XG5cdFx0dGhpcy51cGRhdGVBbGlnbm1lbnRCdXR0b25zKCB0aGlzLml0ZW0uZ2V0U3R5bGUoJ2ZsZXgtZGlyZWN0aW9uJykgKTtcblx0fVxuXG5cdHJldHVybiB0aGlzLiRzdHlsZTtcbn07XG5cblN0eWxlQ29tcG9uZW50Vmlldy5wcm90b3R5cGUuX3JlbmRlclNlY3Rpb24gPSBmdW5jdGlvbiggc2VjdGlvbiApIHtcblx0dmFyICRzZWN0aW9uLFxuXHRcdCRzZWN0aW9uUm93cyxcblx0XHQkcm93O1xuXG5cdCRzZWN0aW9uID0gJCggU0VDVElPTl9URU1QTEFURSh7XG5cdFx0dGl0bGU6IHNlY3Rpb24udGl0bGVcblx0fSkgKTtcblxuXHQkc2VjdGlvblJvd3MgPSAkc2VjdGlvbi5maW5kKCcuc3R5bGUtY29tcG9uZW50LXNlY3Rpb24tcm93cycpO1xuXG5cdC8vIExvb3AgdGhyb3VnaCBlYWNoIHNlY3Rpb24sXG5cdC8vIGNyZWF0aW5nIHJvd3MgZnJvbSB0aGUgaW5zaWRlIG91dFxuXHRzZWN0aW9uLnJvd3MuZm9yRWFjaChmdW5jdGlvbiggcm93LCBpKSB7XG5cdFx0JHJvdyA9IHRoaXMuX3JlbmRlclJvdyggcm93ICk7XG5cdFx0JHNlY3Rpb25Sb3dzLmFwcGVuZCggJHJvdyApO1xuXHR9LmJpbmQoIHRoaXMgKSApO1xuXG5cdHJldHVybiAkc2VjdGlvbjtcbn07XG5cblN0eWxlQ29tcG9uZW50Vmlldy5wcm90b3R5cGUuX3JlbmRlclJvdyA9IGZ1bmN0aW9uKCByb3cgKSB7XG5cdHZhciAkcm93LFxuXHRcdCRpdGVtO1xuXG5cdCRyb3cgPSAkKCBST1dfVEVNUExBVEUoKSApO1xuXG5cdC8vIExvb3AgdGhyb3VnaCBlYWNoIGl0ZW0sXG5cdC8vIHJlbmRlcmluZyBpdCBwcm9wZXJseSBkZXBlbmRpbmcgb24gaXRzIHR5cGVcblx0cm93Lml0ZW1zLmZvckVhY2goZnVuY3Rpb24oIGl0ZW0sIGkgKSB7XG5cdFx0JGl0ZW0gPSB0aGlzLl9yZW5kZXJJdGVtKCBpdGVtICk7XG5cdFx0JHJvdy5hcHBlbmQoICRpdGVtICk7XG5cdH0uYmluZCggdGhpcyApICk7XG5cblx0cmV0dXJuICRyb3c7XG5cbn07XG5cblN0eWxlQ29tcG9uZW50Vmlldy5wcm90b3R5cGUuX3JlbmRlckl0ZW0gPSBmdW5jdGlvbiggaXRlbSApIHtcblx0dmFyIGl0ZW07XG5cblx0aWYgKCBpdGVtLmtpbmQgPT09ICdpbnB1dCcgKSB7XG5cblx0XHRpdGVtID0gbmV3IFN0eWxlSW5wdXRWaWV3KHtcblx0XHRcdGl0ZW06IHRoaXMuaXRlbSxcblx0XHRcdHVuaXQ6IGl0ZW0udW5pdCxcblx0XHRcdHR5cGU6IGl0ZW0udHlwZSxcblx0XHRcdGNhbkJlTmVnYXRpdmU6IGl0ZW0uY2FuQmVOZWdhdGl2ZSxcblx0XHRcdGFwcGVuZENvbnRyb2xzOiBpdGVtLmFwcGVuZENvbnRyb2xzLFxuXHRcdFx0cHJlcGVuZEljb246IGl0ZW0ucHJlcGVuZEljb24sXG5cdFx0XHRsYWJlbDogaXRlbS5sYWJlbCxcblx0XHRcdHByb3BlcnR5OiBpdGVtLnByb3BlcnR5LFxuXHRcdFx0dmFsdWU6IHRoaXMuaXRlbS5nZXRTdHlsZSggaXRlbS5wcm9wZXJ0eSApIHx8IGl0ZW0uZGVmYXVsdFxuXHRcdH0pO1xuXHRcdHJldHVybiBpdGVtLnJlbmRlcigpO1xuXG5cdH0gZWxzZSBpZiAoIGl0ZW0ua2luZCA9PT0gJ3NlZ21lbnRlZC1idXR0b24nICkge1xuXG5cdFx0aXRlbSA9IG5ldyBTdHlsZVNlZ21lbnRlZEJ1dHRvblZpZXcoe1xuXHRcdFx0aXRlbTogdGhpcy5pdGVtLFxuXHRcdFx0bGFiZWw6IGl0ZW0ubGFiZWwsXG5cdFx0XHRwcm9wZXJ0eTogaXRlbS5wcm9wZXJ0eS5uYW1lLFxuXHRcdFx0YnV0dG9uczogaXRlbS5idXR0b25zLFxuXHRcdFx0dmFsdWU6IHRoaXMuaXRlbS5nZXRTdHlsZSggaXRlbS5wcm9wZXJ0eS5uYW1lICkgfHwgaXRlbS5wcm9wZXJ0eS5kZWZhdWx0XG5cdFx0fSk7XG5cdFx0cmV0dXJuIGl0ZW0ucmVuZGVyKCk7XG5cblx0fSBlbHNlIGlmICggaXRlbS5raW5kID09PSAnbXVsdGlwbGUtc2VnbWVudGVkLWJ1dHRvbicgKSB7XG5cblx0XHRpdGVtID0gbmV3IFN0eWxlTXVsdGlwbGVTZWdtZW50ZWRCdXR0b25WaWV3KHtcblx0XHRcdGl0ZW06IHRoaXMuaXRlbSxcblx0XHRcdGxhYmVsOiBpdGVtLmxhYmVsLFxuXHRcdFx0YnV0dG9uczogaXRlbS5idXR0b25zLm1hcChmdW5jdGlvbiggYnV0dG9uLCBpICkge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGljb246IGJ1dHRvbi5pY29uLFxuXHRcdFx0XHRcdHByb3BlcnR5OiBidXR0b24ucHJvcGVydHkubmFtZSxcblx0XHRcdFx0XHR2YWx1ZXM6IHtcblx0XHRcdFx0XHRcdGFjdGl2ZTogYnV0dG9uLnZhbHVlcy5hY3RpdmUsXG5cdFx0XHRcdFx0XHRpbmFjdGl2ZTogYnV0dG9uLnZhbHVlcy5pbmFjdGl2ZSxcblx0XHRcdFx0XHRcdGN1cnJlbnQ6IHRoaXMuaXRlbS5nZXRTdHlsZSggYnV0dG9uLnByb3BlcnR5Lm5hbWUgKSB8fCBidXR0b24udmFsdWVzLmRlZmF1bHRcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cdFx0XHR9LmJpbmQoIHRoaXMgKSlcblx0XHR9KTtcblx0XHRyZXR1cm4gaXRlbS5yZW5kZXIoKTtcblxuXHR9IGVsc2Uge1xuXHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdH1cbn07XG5cblN0eWxlQ29tcG9uZW50Vmlldy5wcm90b3R5cGUuX3NldHVwRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBMaXN0ZW4gZm9yIGlucHV0IHVwZGF0ZXNcblx0Ly8gaWYgdGhpcyBpcyBmb3IgYSBncm91cFxuXHRpZiAoIHRoaXMuaXRlbSBpbnN0YW5jZW9mIFRlbXBsYXRlR3JvdXBWaWV3ICkge1xuXHRcdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuU3R5bGVTZWdtZW50ZWRCdXR0b25WaWV3LlZhbHVlRGlkVXBkYXRlRm9yUHJvcGVydHlBbmRJdGVtJywgdGhpcy5fb25TdHlsZVVwZGF0ZS5iaW5kKCB0aGlzICkpO1xuXHR9XG59O1xuXG5TdHlsZUNvbXBvbmVudFZpZXcucHJvdG90eXBlLl9vblN0eWxlVXBkYXRlID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXG5cdC8vIElmIHRoaXMgaXMgYSBjaGFuZ2UgZm9yIHRoZSBmbGV4LWRpcmVjdGlvbiBwcm9wZXJ0eSxcblx0Ly8gdXBkYXRlIHRoZSBjbGFzc2VzIG9uIHRoZSBhbGlnbm1lbnQgYnV0dG9uc1xuXHRpZiAoIGRhdGEuaXRlbSA9PT0gdGhpcy5pdGVtICYmIGRhdGEucHJvcGVydHkgPT09ICdmbGV4LWRpcmVjdGlvbicgKSB7XG5cdFx0dGhpcy51cGRhdGVBbGlnbm1lbnRCdXR0b25zKCBkYXRhLnZhbHVlICk7XG5cdH1cbn07XG5cblN0eWxlQ29tcG9uZW50Vmlldy5wcm90b3R5cGUudXBkYXRlQWxpZ25tZW50QnV0dG9ucyA9IGZ1bmN0aW9uKCBkaXJlY3Rpb24gKSB7XG5cdHZhciAkYnV0dG9ucyA9IHRoaXMuJHN0eWxlLmZpbmQoJ1tkYXRhLXByb3BlcnR5PVwiYWxpZ24taXRlbXNcIl0nKTtcblxuXHRpZiAoIGRpcmVjdGlvbiA9PT0gJ2NvbHVtbicgKSB7XG5cdFx0JGJ1dHRvbnMuYWRkQ2xhc3MoJ2NvbHVtbicpO1xuXHRcdCRidXR0b25zLnJlbW92ZUNsYXNzKCdyb3cnKTtcblx0fSBlbHNlIHtcblx0XHQkYnV0dG9ucy5hZGRDbGFzcygncm93Jyk7XG5cdFx0JGJ1dHRvbnMucmVtb3ZlQ2xhc3MoJ2NvbHVtbicpO1xuXHR9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU3R5bGVDb21wb25lbnRWaWV3OyIsInZhciBDb2x1bW5zRXZlbnQgPSByZXF1aXJlKCcuLi9tb2RlbHMvQ29sdW1uc0V2ZW50LmpzJyk7XG5cbmZ1bmN0aW9uIFN0eWxlSW5wdXRWaWV3KCBvcHRpb25zICkge1xuXHRcblx0dGhpcy50eXBlID0gJ3RlbCc7XG5cdHRoaXMudW5pdCA9ICcnO1xuXHR0aGlzLmNhbkJlTmVnYXRpdmUgPSB0cnVlO1xuXHR0aGlzLmNhbkJlRGVjaW1hbCA9IGZhbHNlO1xuXHR0aGlzLnByb3BlcnR5ID0gdW5kZWZpbmVkO1xuXHR0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuXHR0aGlzLnByZXBlbmRJY29uID0gdW5kZWZpbmVkO1xuXHR0aGlzLmFwcGVuZENvbnRyb2xzID0gZmFsc2U7XG5cdHRoaXMubGFiZWwgPSAnJztcblx0dGhpcy5pdGVtID0gdW5kZWZpbmVkO1xuXG5cdGlmICggb3B0aW9ucyApIHtcblx0XHR0aGlzLnVuaXQgPSBvcHRpb25zLnVuaXQgfHwgdGhpcy51bml0O1xuXHRcdHRoaXMudHlwZSA9IG9wdGlvbnMudHlwZSB8fCB0aGlzLnR5cGU7XG5cdFx0dGhpcy5jYW5CZU5lZ2F0aXZlID0gb3B0aW9ucy5jYW5CZU5lZ2F0aXZlID09PSBmYWxzZSA/IGZhbHNlIDogdGhpcy5jYW5CZU5lZ2F0aXZlO1xuXHRcdHRoaXMuY2FuQmVEZWNpbWFsID0gb3B0aW9ucy5jYW5CZURlY2ltYWwgPT09IHRydWUgPyB0cnVlIDogdGhpcy5jYW5CZURlY2ltYWw7XG5cdFx0dGhpcy5wcm9wZXJ0eSA9IG9wdGlvbnMucHJvcGVydHkgfHwgdGhpcy5wcm9wZXJ0eTtcblx0XHR0aGlzLnZhbHVlID0gdGhpcy5mb3JtYXRWYWx1ZSggb3B0aW9ucy52YWx1ZSApIHx8IHRoaXMudmFsdWU7XG5cdFx0dGhpcy5wcmVwZW5kSWNvbiA9IG9wdGlvbnMucHJlcGVuZEljb24gfHwgdGhpcy5wcmVwZW5kSWNvbjtcblx0XHR0aGlzLmFwcGVuZENvbnRyb2xzID0gb3B0aW9ucy5hcHBlbmRDb250cm9scyA9PT0gdHJ1ZSA/IHRydWUgOiB0aGlzLmFwcGVuZENvbnRyb2xzO1xuXHRcdHRoaXMubGFiZWwgPSBvcHRpb25zLmxhYmVsIHx8IHRoaXMubGFiZWw7XG5cdFx0dGhpcy5pdGVtID0gb3B0aW9ucy5pdGVtIHx8IHRoaXMuaXRlbTtcblx0fVxuXG5cdHRoaXMudGVtcGxhdGUgPSBDb2x1bW5zLlRlbXBsYXRlc1sndGVtcGxhdGVzL3N0eWxpbmcvY29tcG9uZW50cy9pbnB1dC5oYnMnXTtcbn1cblxuU3R5bGVJbnB1dFZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKCkge1xuXG5cdHZhciB0ZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGUoe1xuXHRcdHByZXBlbmRJY29uOiB0aGlzLnByZXBlbmRJY29uLFxuXHRcdGFwcGVuZENvbnRyb2xzOiB0aGlzLmFwcGVuZENvbnRyb2xzLFxuXHRcdHR5cGU6IHRoaXMudHlwZSxcblx0XHRwcm9wZXJ0eTogdGhpcy5wcm9wZXJ0eSxcblx0XHR2YWx1ZTogdGhpcy52YWx1ZSxcblx0XHRjYW5CZU5lZ2F0aXZlOiB0aGlzLmNhbkJlTmVnYXRpdmUsXG5cdFx0bGFiZWw6IHRoaXMubGFiZWxcblx0fSk7XG5cblx0dGhpcy4kdGVtcGxhdGUgPSAkKCB0ZW1wbGF0ZSApO1xuXG5cdC8vIGlmICggdGhpcy5hcHBlbmRDb250cm9scyApIHtcblx0XHR0aGlzLl9zZXR1cENvbnRyb2xzKCk7XG5cdC8vIH1cblxuXHRyZXR1cm4gdGhpcy4kdGVtcGxhdGU7XG59XG5cblN0eWxlSW5wdXRWaWV3LnByb3RvdHlwZS5fc2V0dXBDb250cm9scyA9IGZ1bmN0aW9uKCkge1xuXG5cdGlmICggdGhpcy50eXBlID09PSAnY29sb3InICkge1xuXHRcdHRoaXMuJHRlbXBsYXRlLmZpbmQoJ2lucHV0Jykub24oICdpbnB1dCcsIHRoaXMuX29uQ2hhbmdlLmJpbmQoIHRoaXMgKSApO1xuXHR9XG5cblx0dGhpcy4kdGVtcGxhdGUuZmluZCgnaW5wdXQnKS5vbiggJ2tleXVwJywgdGhpcy5fb25DaGFuZ2UuYmluZCggdGhpcyApICk7XG5cdHRoaXMuJHRlbXBsYXRlLmZpbmQoJ2lucHV0Jykub24oICdjaGFuZ2UnLCB0aGlzLl9vbkNoYW5nZS5iaW5kKCB0aGlzICkgKTtcblx0dGhpcy4kdGVtcGxhdGUuZmluZCgnLmluY3JlbWVudCcpLm9uKCAnY2xpY2snLCB0aGlzLl9vbkluY3JlbWVudC5iaW5kKCB0aGlzICkgKTtcblx0dGhpcy4kdGVtcGxhdGUuZmluZCgnLmRlY3JlbWVudCcpLm9uKCAnY2xpY2snLCB0aGlzLl9vbkRlY3JlbWVudC5iaW5kKCB0aGlzICkgKTtcdFxufVxuXG5TdHlsZUlucHV0Vmlldy5wcm90b3R5cGUuX29uQ2hhbmdlID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuXHR2YXIgbmV3VmFsdWUgPSB0aGlzLmZvcm1hdFZhbHVlKCB0aGlzLiR0ZW1wbGF0ZS5maW5kKCdpbnB1dCcpLnZhbCgpIClcblx0dGhpcy51cGRhdGUoIG5ld1ZhbHVlICk7XG59XG5cblN0eWxlSW5wdXRWaWV3LnByb3RvdHlwZS5fb25JbmNyZW1lbnQgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdHZhciBuZXdWYWx1ZSA9IHRoaXMuaW5jcmVtZW50KCB0aGlzLiR0ZW1wbGF0ZS5maW5kKCdpbnB1dCcpLnZhbCgpICk7XG5cdHRoaXMudXBkYXRlKCBuZXdWYWx1ZSApO1xufVxuXG5TdHlsZUlucHV0Vmlldy5wcm90b3R5cGUuX29uRGVjcmVtZW50ID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuXHR2YXIgbmV3VmFsdWUgPSB0aGlzLmRlY3JlbWVudCggdGhpcy4kdGVtcGxhdGUuZmluZCgnaW5wdXQnKS52YWwoKSApO1xuXHR0aGlzLnVwZGF0ZSggbmV3VmFsdWUgKTtcbn1cblxuU3R5bGVJbnB1dFZpZXcucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0dGhpcy52YWx1ZSA9IHZhbHVlO1xuXHR0aGlzLiR0ZW1wbGF0ZS5maW5kKCdpbnB1dCcpLnZhbCggdmFsdWUgKTtcblxuXHQvLyBBbGVydCBhbnkgbGlzdGVuZXJzIHRoYXQgdGhlIGl0ZW0gaGFzIHN0YXJ0ZWQgZHJhZ1xuXHQvLyB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoICdDb2x1bW5zLlN0eWxlSW5wdXRWaWV3LlZhbHVlRGlkVXBkYXRlRm9yUHJvcGVydHknLCB7XG5cdC8vIFx0aXRlbTogXHR0aGlzLFxuXHQvLyBcdGV2ZW50OiBcdGV2ZW50LFxuXHQvLyBcdHVpOiBcdHVpXG5cdC8vIH0pO1xuXHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdC8vIGNvbHVtbnNFdmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuU3R5bGVJbnB1dFZpZXcuVmFsdWVEaWRVcGRhdGVGb3JQcm9wZXJ0eUFuZEl0ZW0nLCBmYWxzZSwgZmFsc2UsIHtcblx0Ly8gXHRpdGVtOiB0aGlzLml0ZW0sXG5cdC8vIFx0cHJvcGVydHk6IHRoaXMucHJvcGVydHksXG5cdC8vIFx0dmFsdWU6IFx0dmFsdWVcblx0Ly8gfSk7XG5cdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY29sdW1uc0V2ZW50KTtcblx0Q29sdW1uc0V2ZW50LnNlbmQoICdDb2x1bW5zLlN0eWxlSW5wdXRWaWV3LlZhbHVlRGlkVXBkYXRlRm9yUHJvcGVydHlBbmRJdGVtJywge1xuXHRcdGl0ZW06IHRoaXMuaXRlbSxcblx0XHRwcm9wZXJ0eTogdGhpcy5wcm9wZXJ0eSxcblx0XHR2YWx1ZTogXHR2YWx1ZVxuXHR9IClcbn1cblxuU3R5bGVJbnB1dFZpZXcucHJvdG90eXBlLmluY3JlbWVudCA9IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0dmFyIHBhcnNlZFZhbHVlID0gdGhpcy5wYXJzZVZhbHVlKCB2YWx1ZSApLFxuXHRcdG51bWJlciA9ICtwYXJzZWRWYWx1ZS5udW1iZXIsXG5cdFx0dW5pdCA9IHBhcnNlZFZhbHVlLnVuaXQsXG5cdFx0bmV3TnVtYmVyO1xuXG5cdG5ld051bWJlciA9ICtwYXJzZWRWYWx1ZS5udW1iZXIgKyAxO1xuXG5cdC8vIEZvcm1hdCBhbmQgcmV0dXJuIHRoZSBuZXcgdmFsdWVcblx0cmV0dXJuIHRoaXMuZm9ybWF0VmFsdWUoIG5ld051bWJlciArIHVuaXQgKTtcbn1cblxuU3R5bGVJbnB1dFZpZXcucHJvdG90eXBlLmRlY3JlbWVudCA9IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0dmFyIHBhcnNlZFZhbHVlID0gdGhpcy5wYXJzZVZhbHVlKCB2YWx1ZSApLFxuXHRcdG51bWJlciA9ICtwYXJzZWRWYWx1ZS5udW1iZXIsXG5cdFx0dW5pdCA9IHBhcnNlZFZhbHVlLnVuaXQsXG5cdFx0bmV3TnVtYmVyO1xuXG5cdG5ld051bWJlciA9ICtwYXJzZWRWYWx1ZS5udW1iZXIgLSAxO1xuXG5cdC8vIEZvcm1hdCBhbmQgcmV0dXJuIHRoZSBuZXcgdmFsdWVcblx0cmV0dXJuIHRoaXMuZm9ybWF0VmFsdWUoIG5ld051bWJlciArIHVuaXQgKTtcbn1cblxuU3R5bGVJbnB1dFZpZXcucHJvdG90eXBlLnBhcnNlVmFsdWUgPSBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdHZhciByZSA9IC8oW1xcZHxcXC58XFwtXSopKC4qKS8sXG5cdFx0cmVzdWx0ID0gcmUuZXhlYyh2YWx1ZSk7XG5cblx0cmV0dXJuIHtcblx0XHRudW1iZXI6IHJlc3VsdFsgMSBdLFxuXHRcdHVuaXQ6IHJlc3VsdFsgMiBdXG5cdH1cbn1cblxuU3R5bGVJbnB1dFZpZXcucHJvdG90eXBlLnZhbGlkYXRlVmFsdWUgPSBmdW5jdGlvbiggdmFsdWUgKSB7XG5cblx0Ly8gSWYgdGhlIHZhbHVlIGlzIGlsbGVnYWxseSBuZWdhdGl2ZSxcblx0Ly8gc2V0IGl0IHRvIDBcblx0aWYgKCB2YWx1ZSA8IDAgJiYgIXRoaXMuY2FuQmVOZWdhdGl2ZSApIHtcblx0XHRyZXR1cm4gMDtcblx0fVxuXG5cdC8vIElmIHRoZSB2YWx1ZSBtdXN0IGJlIGFuIGludCwgcGFyc2UgaXQgYXMgYW4gaW50XG5cdGlmICggIXRoaXMuY2FuQmVEZWNpbWFsICkge1xuXHRcdHJldHVybiBwYXJzZUludCggdmFsdWUgKTtcblx0fVxuXG5cdC8vIElmIG5vIG1vZGlmaWNhdGlvbnMgYXJlIG5lY2Vzc2FyeSxcblx0Ly8gcmV0dXJuIHRoZSB2YWx1ZSBhcy1pc1xuXHRyZXR1cm4gcGFyc2VGbG9hdCggdmFsdWUgKTtcbn1cblxuU3R5bGVJbnB1dFZpZXcucHJvdG90eXBlLmZvcm1hdFZhbHVlID0gZnVuY3Rpb24oIHZhbHVlICkge1xuXG5cdC8vIERvbid0IGRvIGFueXRoaW5nIGlmIHRoaXMgaXMgYSBjb2xvciB2YWx1ZVxuXHRpZiAoIHRoaXMudHlwZSA9PT0gJ2NvbG9yJyApIHtcblx0XHRyZXR1cm4gdmFsdWU7XG5cdH1cblxuXHR2YXJcdHBhcnNlZFZhbHVlID0gdGhpcy5wYXJzZVZhbHVlKCB2YWx1ZSApLFxuXHRcdG51bWJlciA9IHRoaXMudmFsaWRhdGVWYWx1ZSggcGFyc2VkVmFsdWUubnVtYmVyICksXG5cdFx0dW5pdCA9IHBhcnNlZFZhbHVlLnVuaXQgfHwgdGhpcy51bml0O1xuXG5cdHJldHVybiBudW1iZXIgKyB1bml0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFN0eWxlSW5wdXRWaWV3OyIsInZhciBDb2x1bW5zRXZlbnQgPSByZXF1aXJlKCcuLi9tb2RlbHMvQ29sdW1uc0V2ZW50LmpzJyk7XG5cbkhhbmRsZWJhcnMucmVnaXN0ZXJIZWxwZXIoJ2lmSXNDdXJyZW50VmFsdWUnLCBmdW5jdGlvbih2YWx1ZSwgY3VycmVudFZhbHVlLCBvcHRpb25zKSB7XG5cdHJldHVybiB2YWx1ZSA9PSBjdXJyZW50VmFsdWUgPyBvcHRpb25zLmZuKHRoaXMpIDogb3B0aW9ucy5pbnZlcnNlKHRoaXMpO1xufSk7XG5cbnZhciBURU1QTEFURSA9IENvbHVtbnMuVGVtcGxhdGVzWyd0ZW1wbGF0ZXMvc3R5bGluZy9jb21wb25lbnRzL211bHRpcGxlLXNlZ21lbnRlZC1idXR0b24uaGJzJ107XG5cbmZ1bmN0aW9uIFN0eWxlTXVsdGlwbGVTZWdtZW50ZWRCdXR0b25WaWV3KCBvcHRpb25zICkge1xuXG5cdHRoaXMubGFiZWwgPSAnJztcblx0dGhpcy5idXR0b25zID0gW107XG5cdHRoaXMucHJvcGVydGllcyA9IHt9O1xuXHR0aGlzLml0ZW0gPSB1bmRlZmluZWQ7XG5cblx0aWYgKCBvcHRpb25zICkge1xuXHRcdHRoaXMubGFiZWwgPSBvcHRpb25zLmxhYmVsIHx8IHRoaXMubGFiZWw7XG5cdFx0dGhpcy5idXR0b25zID0gb3B0aW9ucy5idXR0b25zIHx8IHRoaXMuYnV0dG9ucztcblx0XHR0aGlzLml0ZW0gPSBvcHRpb25zLml0ZW0gfHwgdGhpcy5pdGVtO1xuXHR9XG5cblx0dGhpcy5idXR0b25zLmZvckVhY2goZnVuY3Rpb24oIGJ1dHRvbiwgaSApIHtcblx0XHR0aGlzLnByb3BlcnRpZXNbYnV0dG9uLnByb3BlcnR5XSA9IGJ1dHRvbi52YWx1ZXMuY3VycmVudDtcblx0fS5iaW5kKCB0aGlzICkpO1xufVxuXG5TdHlsZU11bHRpcGxlU2VnbWVudGVkQnV0dG9uVmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oKSB7XG5cblx0dmFyIHRlbXBsYXRlID0gVEVNUExBVEUoe1xuXHRcdGxhYmVsOiB0aGlzLmxhYmVsLFxuXHRcdGJ1dHRvbnM6IHRoaXMuYnV0dG9uc1xuXHR9KTtcblxuXHR0aGlzLiR0ZW1wbGF0ZSA9ICQoIHRlbXBsYXRlICk7XG5cblx0dGhpcy5fc2V0dXBDb250cm9scygpO1xuXG5cdHJldHVybiB0aGlzLiR0ZW1wbGF0ZTtcbn07XG5cblN0eWxlTXVsdGlwbGVTZWdtZW50ZWRCdXR0b25WaWV3LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiggcHJvcGVydHksIHZhbHVlICkge1xuXG5cdHRoaXMucHJvcGVydGllc1twcm9wZXJ0eV0gPSB2YWx1ZTtcblxuXHQvLyBBbGVydCBhbnkgbGlzdGVuZXJzIHRoYXQgdGhlIGl0ZW0gaGFzIHN0YXJ0ZWQgZHJhZ1xuXHQvLyB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoICdDb2x1bW5zLlN0eWxlTXVsdGlwbGVTZWdtZW50ZWRCdXR0b25WaWV3LlZhbHVlRGlkVXBkYXRlRm9yUHJvcGVydHknLCB7XG5cdC8vIFx0aXRlbTogXHR0aGlzLFxuXHQvLyBcdGV2ZW50OiBcdGV2ZW50LFxuXHQvLyBcdHVpOiBcdHVpXG5cdC8vIH0pO1xuXHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdC8vIGNvbHVtbnNFdmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuU3R5bGVNdWx0aXBsZVNlZ21lbnRlZEJ1dHRvblZpZXcuVmFsdWVEaWRVcGRhdGVGb3JQcm9wZXJ0eUFuZEl0ZW0nLCBmYWxzZSwgZmFsc2UsIHtcblx0Ly8gXHRpdGVtOiB0aGlzLml0ZW0sXG5cdC8vIFx0cHJvcGVydHk6IHByb3BlcnR5LFxuXHQvLyBcdHZhbHVlOiBcdHZhbHVlXG5cdC8vIH0pO1xuXHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGNvbHVtbnNFdmVudCk7XG5cdENvbHVtbnNFdmVudC5zZW5kKCAnQ29sdW1ucy5TdHlsZU11bHRpcGxlU2VnbWVudGVkQnV0dG9uVmlldy5WYWx1ZURpZFVwZGF0ZUZvclByb3BlcnR5QW5kSXRlbScsIHtcblx0XHRpdGVtOiB0aGlzLml0ZW0sXG5cdFx0cHJvcGVydHk6IHByb3BlcnR5LFxuXHRcdHZhbHVlOiBcdHZhbHVlXG5cdH0gKTtcbn1cblxuU3R5bGVNdWx0aXBsZVNlZ21lbnRlZEJ1dHRvblZpZXcucHJvdG90eXBlLl9zZXR1cENvbnRyb2xzID0gZnVuY3Rpb24oKSB7XG5cblx0dGhpcy4kdGVtcGxhdGUuZmluZCgnYnV0dG9uJykub24oICdjbGljaycsIHRoaXMuX29uQ2xpY2suYmluZCggdGhpcyApICk7XG59O1xuXG5TdHlsZU11bHRpcGxlU2VnbWVudGVkQnV0dG9uVmlldy5wcm90b3R5cGUuX29uQ2xpY2sgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdHZhciAkYnV0dG9uID0gJCggZXZlbnQudGFyZ2V0ICkuaXMoJ2J1dHRvbicpID8gJCggZXZlbnQudGFyZ2V0ICkgOiAkKCBldmVudC50YXJnZXQgKS5wYXJlbnRzKCdidXR0b24nKS5maXJzdCgpLFxuXHRcdHByb3BlcnR5ID0gJGJ1dHRvbi5kYXRhKCdwcm9wZXJ0eScpLFxuXHRcdHZhbHVlO1xuXG5cdGlmICggJGJ1dHRvbi5oYXNDbGFzcygnYWN0aXZlJykgKSB7XG5cdFx0dmFsdWUgPSAkYnV0dG9uLmRhdGEoJ2luYWN0aXZlLXZhbHVlJyk7XG5cdH0gZWxzZSB7XG5cdFx0dmFsdWUgPSAkYnV0dG9uLmRhdGEoJ2FjdGl2ZS12YWx1ZScpO1xuXHR9XG5cblx0JGJ1dHRvbi50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG5cblx0dGhpcy51cGRhdGUoIHByb3BlcnR5LCB2YWx1ZSApO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTdHlsZU11bHRpcGxlU2VnbWVudGVkQnV0dG9uVmlldzsiLCJ2YXIgQ29sdW1uc0V2ZW50IFx0XHRcdFx0XHQ9IHJlcXVpcmUoJy4uL21vZGVscy9Db2x1bW5zRXZlbnQuanMnKTtcblxuSGFuZGxlYmFycy5yZWdpc3RlckhlbHBlcignaWZJc0N1cnJlbnRWYWx1ZScsIGZ1bmN0aW9uKHZhbHVlLCBjdXJyZW50VmFsdWUsIG9wdGlvbnMpIHtcblx0cmV0dXJuIHZhbHVlID09IGN1cnJlbnRWYWx1ZSA/IG9wdGlvbnMuZm4odGhpcykgOiBvcHRpb25zLmludmVyc2UodGhpcyk7XG59KTtcblxuZnVuY3Rpb24gU3R5bGVTZWdtZW50ZWRCdXR0b25WaWV3KCBvcHRpb25zICkge1xuXG5cdHRoaXMubGFiZWwgPSAnJztcblx0dGhpcy5wcm9wZXJ0eSA9ICcnO1xuXHR0aGlzLmJ1dHRvbnMgPSBbXTtcblx0dGhpcy52YWx1ZSA9ICcnO1xuXHR0aGlzLml0ZW0gPSB1bmRlZmluZWQ7XG5cblx0aWYoIG9wdGlvbnMgKSB7XG5cdFx0dGhpcy5sYWJlbCA9IG9wdGlvbnMubGFiZWwgfHwgdGhpcy5sYWJlbDtcblx0XHR0aGlzLnByb3BlcnR5ID0gb3B0aW9ucy5wcm9wZXJ0eSB8fCB0aGlzLnByb3BlcnR5O1xuXHRcdHRoaXMuYnV0dG9ucyA9IG9wdGlvbnMuYnV0dG9ucyB8fCB0aGlzLmJ1dHRvbnM7XG5cdFx0dGhpcy52YWx1ZSA9IG9wdGlvbnMudmFsdWUgfHwgdGhpcy52YWx1ZTtcblx0XHR0aGlzLml0ZW0gPSBvcHRpb25zLml0ZW0gfHwgdGhpcy5pdGVtO1xuXHR9XG5cblx0dGhpcy50ZW1wbGF0ZSA9IENvbHVtbnMuVGVtcGxhdGVzWyd0ZW1wbGF0ZXMvc3R5bGluZy9jb21wb25lbnRzL3NlZ21lbnRlZC1idXR0b24uaGJzJ107XG59XG5cblN0eWxlU2VnbWVudGVkQnV0dG9uVmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oKSB7XG5cblx0dmFyIHRlbXBsYXRlID0gdGhpcy50ZW1wbGF0ZSh7XG5cdFx0bGFiZWw6IHRoaXMubGFiZWwsXG5cdFx0cHJvcGVydHk6IHRoaXMucHJvcGVydHksXG5cdFx0dmFsdWU6IHRoaXMudmFsdWUsXG5cdFx0YnV0dG9uczogdGhpcy5idXR0b25zXG5cdH0pO1xuXG5cdHRoaXMuJHRlbXBsYXRlID0gJCggdGVtcGxhdGUgKTtcblxuXHR0aGlzLl9zZXR1cENvbnRyb2xzKCk7XG5cblx0cmV0dXJuIHRoaXMuJHRlbXBsYXRlO1xufTtcblxuU3R5bGVTZWdtZW50ZWRCdXR0b25WaWV3LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiggdmFsdWUgKSB7XG5cblx0dGhpcy52YWx1ZSA9IHZhbHVlO1xuXG5cdC8vIEFsZXJ0IGFueSBsaXN0ZW5lcnMgdGhhdCB0aGUgaXRlbSBoYXMgc3RhcnRlZCBkcmFnXG5cdC8vIHZhciBldmVudCA9IG5ldyBDdXN0b21FdmVudCggJ0NvbHVtbnMuU3R5bGVTZWdtZW50ZWRCdXR0b25WaWV3LlZhbHVlRGlkVXBkYXRlRm9yUHJvcGVydHknLCB7XG5cdC8vIFx0aXRlbTogXHR0aGlzLFxuXHQvLyBcdGV2ZW50OiBcdGV2ZW50LFxuXHQvLyBcdHVpOiBcdHVpXG5cdC8vIH0pO1xuXHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdC8vIGNvbHVtbnNFdmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuU3R5bGVTZWdtZW50ZWRCdXR0b25WaWV3LlZhbHVlRGlkVXBkYXRlRm9yUHJvcGVydHlBbmRJdGVtJywgZmFsc2UsIGZhbHNlLCB7XG5cdC8vIFx0aXRlbTogdGhpcy5pdGVtLFxuXHQvLyBcdHByb3BlcnR5OiB0aGlzLnByb3BlcnR5LFxuXHQvLyBcdHZhbHVlOiBcdHZhbHVlXG5cdC8vIH0pO1xuXHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGNvbHVtbnNFdmVudCk7XG5cdENvbHVtbnNFdmVudC5zZW5kKCAnQ29sdW1ucy5TdHlsZVNlZ21lbnRlZEJ1dHRvblZpZXcuVmFsdWVEaWRVcGRhdGVGb3JQcm9wZXJ0eUFuZEl0ZW0nLCB7XG5cdFx0aXRlbTogdGhpcy5pdGVtLFxuXHRcdHByb3BlcnR5OiB0aGlzLnByb3BlcnR5LFxuXHRcdHZhbHVlOiBcdHZhbHVlXG5cdH0pO1xufTtcblxuU3R5bGVTZWdtZW50ZWRCdXR0b25WaWV3LnByb3RvdHlwZS5fc2V0dXBDb250cm9scyA9IGZ1bmN0aW9uKCkge1xuXG5cdHRoaXMuJHRlbXBsYXRlLmZpbmQoJ2J1dHRvbicpLm9uKCAnY2xpY2snLCB0aGlzLl9vbkNsaWNrLmJpbmQoIHRoaXMgKSApO1xufTtcblxuU3R5bGVTZWdtZW50ZWRCdXR0b25WaWV3LnByb3RvdHlwZS5fb25DbGljayA9IGZ1bmN0aW9uKCBldmVudCApIHtcblx0dmFyICRidXR0b24gPSAkKCBldmVudC50YXJnZXQgKS5pcygnYnV0dG9uJykgPyAkKCBldmVudC50YXJnZXQgKSA6ICQoIGV2ZW50LnRhcmdldCApLnBhcmVudHMoJ2J1dHRvbicpLmZpcnN0KCk7XG5cblx0dGhpcy4kdGVtcGxhdGUuZmluZCgnYnV0dG9uJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHQkYnV0dG9uLmFkZENsYXNzKCdhY3RpdmUnKTtcblxuXHR0aGlzLnVwZGF0ZSggJGJ1dHRvbi5kYXRhKCd2YWx1ZScpICk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0eWxlU2VnbWVudGVkQnV0dG9uVmlldzsiLCJ2YXIgQ29sdW1uc0V2ZW50IFx0XHRcdFx0XHQ9IHJlcXVpcmUoJy4uL21vZGVscy9Db2x1bW5zRXZlbnQuanMnKTtcbnZhciBDb2x1bW5zIFx0XHRcdFx0XHRcdD0gcmVxdWlyZSgnLi4vLi4vY29tcGlsZWQtamF2YXNjcmlwdHMvc3R5bGluZy9jb21waWxlZC1kYXRhLmpzJyk7XG52YXIgU3R5bGVDb21wb25lbnRWaWV3IFx0XHRcdFx0PSByZXF1aXJlKCcuL1N0eWxlQ29tcG9uZW50Vmlldy5qcycpO1xudmFyIFRlbXBsYXRlR3JvdXBWaWV3IFx0XHRcdFx0PSByZXF1aXJlKCcuL1RlbXBsYXRlR3JvdXBWaWV3LmpzJyk7XG52YXIgVGVtcGxhdGVWYWx1ZVZpZXcgXHRcdFx0XHQ9IHJlcXVpcmUoJy4vVGVtcGxhdGVWYWx1ZVZpZXcuanMnKTtcblxuZnVuY3Rpb24gU3R5bGVWaWV3KCkge1xuXHR0aGlzLiRzdHlsZSA9ICQoJyNzdHlsaW5nJyk7XG5cdHRoaXMuX3NldHVwRXZlbnRMaXN0ZW5lcnMoKTtcbn1cblxuU3R5bGVWaWV3LnByb3RvdHlwZS51cGRhdGVXaXRoU2VsZWN0aW9uID0gZnVuY3Rpb24oIHNlbGVjdGlvbiApIHtcblx0dmFyIGNvbXBvbmVudFZpZXcsXG5cdFx0JGNvbXBvbmVudDtcblxuXHQvLyBDcmVhdGUgYSBjb21wb25lbnQgdmlldyB3aXRoIHRoZSBuZXcgaXRlbVxuXHRzZWxlY3Rpb24gPSB0aGlzLmdldEl0ZW1Gb3JTZWxlY3Rpb24oIHNlbGVjdGlvbiApO1xuXHRjb21wb25lbnRWaWV3ID0gbmV3IFN0eWxlQ29tcG9uZW50Vmlldyggc2VsZWN0aW9uICk7XG5cdCRjb21wb25lbnQgPSBjb21wb25lbnRWaWV3LnJlbmRlcigpO1xuXG5cdC8vIENsZWFyIHRoZSBzdHlsZSBwYW5lIGlmIHdlJ3JlIGFib3V0IHRvIHJlbmRlciBhbiBpdGVtLlxuXHQvLyBPdGhlcndpc2UsIGFwcGVuZCB0byB0aGUgZW5kIG9mIHRoZSBwYW5lXG5cdGlmKCBzZWxlY3Rpb24gaW5zdGFuY2VvZiBJdGVtICkge1xuXHRcdCQoJy5zdHlsZS1jb21wb25lbnQnKS5yZW1vdmUoKTtcblx0fVxuXHRcblx0dGhpcy4kc3R5bGUuYXBwZW5kKCAkY29tcG9uZW50ICk7XG59O1xuXG5TdHlsZVZpZXcucHJvdG90eXBlLmdldEl0ZW1Gb3JTZWxlY3Rpb24gPSBmdW5jdGlvbiggc2VsZWN0aW9uICkge1xuXG5cdGlmKCBzZWxlY3Rpb24gaW5zdGFuY2VvZiBJdGVtICkge1xuXHRcdHJldHVybiBzZWxlY3Rpb247XG5cdH0gZWxzZSBpZiAoIHNlbGVjdGlvbiBpbnN0YW5jZW9mIEl0ZW1WaWV3ICkge1xuXHRcdHJldHVybiBzZWxlY3Rpb24uaXRlbTtcblx0fSBlbHNlIGlmICggc2VsZWN0aW9uIGluc3RhbmNlb2YgVGVtcGxhdGVWYWx1ZVZpZXcgKSB7XG5cdFx0cmV0dXJuIHNlbGVjdGlvbi5pdGVtO1xuXHR9IGVsc2UgaWYgKCBzZWxlY3Rpb24gaW5zdGFuY2VvZiBUZW1wbGF0ZUdyb3VwVmlldyApIHtcblx0XHRyZXR1cm4gc2VsZWN0aW9uO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IFwiZXhjZXB0aW9uOiBTZWxlY3Rpb24gbXVzdCBiZSBhbiBJdGVtLCBJdGVtVmlldywgVGVtcGxhdGVWYWx1ZVZpZXcgb3IgVGVtcGxhdGVHcm91cFZpZXdcIjtcblx0fVxufTtcblxuU3R5bGVWaWV3LnByb3RvdHlwZS5fc2V0dXBFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uKCkge1xuXG5cdC8vIExpc3RlbiB0byB1ZHBhdGVzIGZyb20gc3R5bGluZyBjb250cm9sc1xuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLlN0eWxlSW5wdXRWaWV3LlZhbHVlRGlkVXBkYXRlRm9yUHJvcGVydHlBbmRJdGVtJywgdGhpcy5fb25TdHlsZVVwZGF0ZS5iaW5kKCB0aGlzICkpO1xuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLlN0eWxlU2VnbWVudGVkQnV0dG9uVmlldy5WYWx1ZURpZFVwZGF0ZUZvclByb3BlcnR5QW5kSXRlbScsIHRoaXMuX29uU3R5bGVVcGRhdGUuYmluZCggdGhpcyApKTtcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5TdHlsZU11bHRpcGxlU2VnbWVudGVkQnV0dG9uVmlldy5WYWx1ZURpZFVwZGF0ZUZvclByb3BlcnR5QW5kSXRlbScsIHRoaXMuX29uU3R5bGVVcGRhdGUuYmluZCggdGhpcyApKTtcblxuXHQvLyBMaXN0ZW4gdG8gdmFsdWUgdmlldyBzZWxlY3Rpb25cblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5UZW1wbGF0ZVZhbHVlVmlldy5WYWx1ZURpZFNlbGVjdFdpdGhJdGVtJywgdGhpcy5fb25JdGVtU2VsZWN0aW9uLmJpbmQoIHRoaXMgKSk7XG5cblx0Ly8gTGlzdGVuIHRvIGl0ZW0gc2VsZWN0aW9uXG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuSXRlbVZpZXcuSXRlbURpZFNlbGVjdCcsIHRoaXMuX29uSXRlbVNlbGVjdGlvbi5iaW5kKCB0aGlzICkpO1xuXG5cdC8vIExpc3RlbiBmb3IgdGhlIHRlbXBsYXRlIHRvIGZpbmlzaCByZW5kZXJpbmdcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5UZW1wbGF0ZVZpZXcuRGlkUmVuZGVyJywgdGhpcy5fb25UZW1wbGF0ZURpZFJlbmRlci5iaW5kKCB0aGlzICkpO1x0XG59O1xuXG5TdHlsZVZpZXcucHJvdG90eXBlLl9vblN0eWxlVXBkYXRlID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXG5cdHRoaXMuX2VtaXRDaGFuZ2UoIGRhdGEuaXRlbSwgZGF0YS5wcm9wZXJ0eSwgZGF0YS52YWx1ZSApO1xufTtcblxuU3R5bGVWaWV3LnByb3RvdHlwZS5fb25JdGVtU2VsZWN0aW9uID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXHR2YXIgaXRlbSA9IGRhdGEuaXRlbSxcblx0XHRncm91cHMgPSBUZW1wbGF0ZVZpZXcuZ2V0R3JvdXBzRm9ySXRlbSggaXRlbSApO1xuXG5cdC8vIFVwZGF0ZSB0aGUgc3R5bGUgcGFuZWwgd2l0aCB0aGUgc2VsZWN0ZWQgaXRlbVxuXHR0aGlzLnVwZGF0ZVdpdGhTZWxlY3Rpb24oIGl0ZW0gKTtcblxuXHQvLyBBbHNvIHVwZGF0ZSB3aXRoIGFueSBwYXJlbnQgZ3JvdXBzXG5cdGlmICggZ3JvdXBzICYmIGdyb3Vwcy5sZW5ndGggKSB7XG5cdFx0Z3JvdXBzLmZvckVhY2goZnVuY3Rpb24oIGdyb3VwICkge1xuXHRcdFx0dGhpcy51cGRhdGVXaXRoU2VsZWN0aW9uKCBncm91cCApO1xuXHRcdH0uYmluZCggdGhpcyApKTtcblx0fVxufTtcblxuU3R5bGVWaWV3LnByb3RvdHlwZS5fb25UZW1wbGF0ZURpZFJlbmRlciA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblx0dGhpcy51cGRhdGVXaXRoU2VsZWN0aW9uKCBUZW1wbGF0ZVZpZXcuZ3JvdXBzWyAwIF0gKTtcbn07XG5cblN0eWxlVmlldy5wcm90b3R5cGUuX2VtaXRDaGFuZ2UgPSBmdW5jdGlvbiggaXRlbSwgcHJvcGVydHksIHZhbHVlICkge1xuXG5cdC8vIEFsZXJ0IGFueSBsaXN0ZW5lcnMgdGhhdCB0aGUgZ3JvdXAgaXMgbm93IGVuZ2FnZWQgdG8gYmUgZHJvcHBlZCB1cG9uXG5cdC8vIHZhciBldmVudCA9IG5ldyBDdXN0b21FdmVudCggJ0NvbHVtbnMuU3R5bGVWaWV3LlByb3BlcnR5RGlkVXBkYXRlV2l0aFZhbHVlRm9yR3JvdXBWaWV3Jywge1xuXHRcdC8vIGdyb3VwVmlldzogXHRpdGVtLFxuXHRcdC8vIHByb3BlcnR5OiBwcm9wZXJ0eSxcblx0XHQvLyB2YWx1ZTogdmFsdWVcblx0Ly8gfSk7XG5cblx0dmFyIGV2ZW50VHlwZSxcblx0XHRkYXRhO1xuXG5cdGlmICggaXRlbSBpbnN0YW5jZW9mIEl0ZW0gKSB7XG5cblx0XHRldmVudFR5cGUgPSAnQ29sdW1ucy5TdHlsZVZpZXcuUHJvcGVydHlEaWRVcGRhdGVXaXRoVmFsdWVGb3JJdGVtJztcblx0XHRkYXRhID0ge1xuXHRcdFx0aXRlbTogXHRpdGVtLFxuXHRcdFx0cHJvcGVydHk6IHByb3BlcnR5LFxuXHRcdFx0dmFsdWU6IHZhbHVlXG5cdFx0fTtcblx0XHRDb2x1bW5zRXZlbnQuc2VuZCggZXZlbnRUeXBlLCBkYXRhICk7XG5cblx0fSBlbHNlIGlmICggaXRlbSBpbnN0YW5jZW9mIFRlbXBsYXRlR3JvdXBWaWV3ICkge1xuXHRcdFxuXHRcdGV2ZW50VHlwZSA9ICdDb2x1bW5zLlN0eWxlVmlldy5Qcm9wZXJ0eURpZFVwZGF0ZVdpdGhWYWx1ZUZvckdyb3VwVmlldyc7XG5cdFx0ZGF0YSA9IHtcblx0XHRcdGdyb3VwVmlldzogXHRpdGVtLFxuXHRcdFx0cHJvcGVydHk6IHByb3BlcnR5LFxuXHRcdFx0dmFsdWU6IHZhbHVlXG5cdFx0fTtcblx0XHRDb2x1bW5zRXZlbnQuc2VuZCggZXZlbnRUeXBlLCBkYXRhICk7XG5cblx0fSBlbHNlIHtcblx0XHQvLyBEbyBub3RoaW5nXG5cdH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU3R5bGVWaWV3O1xuIiwidmFyIENvbHVtbnNFdmVudCA9IHJlcXVpcmUoJy4uL21vZGVscy9Db2x1bW5zRXZlbnQuanMnKTtcblxuLy8gT2JqZWN0IHRvIG1hbmFnZSBwcm9wZXJ0aWVzIG9mIGFuZCBpbnRlcmFjdGlvblxuLy8gd2l0aCB0ZW1wbGF0ZSBncm91cCB6b25lcy5cbi8vIEdyb3VwIHpvbmVzIGFyZSBwb3B1bGF0ZWQgd2l0aCB2YWx1ZSB6b25lcyBhbmRcbi8vIGNhbiBoYXZlIHRoZWlyIGxheW91dCBhbmQgc3R5bGUgYWx0ZXJlZC5cblxuSGFuZGxlYmFycy5yZWdpc3RlclBhcnRpYWwoJ2xheW91dCcsIENvbHVtbnMuVGVtcGxhdGVzWyd0ZW1wbGF0ZXMvbGF5b3V0L2xheW91dC5oYnMnXSk7XG5IYW5kbGViYXJzLnJlZ2lzdGVyUGFydGlhbCgnc3R5bGUnLCBDb2x1bW5zLlRlbXBsYXRlc1sndGVtcGxhdGVzL2xheW91dC9zdHlsZS5oYnMnXSk7XG5cbnZhciBST1dfR1JPVVBfU0VMRUNUT1IgPSAnLmxheW91dC10ZW1wbGF0ZS1yb3ctZ3JvdXAnLCBcblx0Uk9XX1ZBTFVFX1NFTEVDVE9SID0gJy5sYXlvdXQtdGVtcGxhdGUtcm93LXZhbHVlJyxcblx0TEFZT1VUX1BST1BFUlRJRVMgPSBbXG5cdFx0J2FsaWduLWl0ZW1zJyxcblx0XHQnZmxleC1kaXJlY3Rpb24nLFxuXHRcdCdqdXN0aWZ5LWNvbnRlbnQnLFxuXHRdO1xuXG5UZW1wbGF0ZUdyb3VwVmlldyA9IGZ1bmN0aW9uKCBwYXJhbXMgKSB7XG5cblx0aWYgKCBwYXJhbXMgKSB7XG5cdFx0dGhpcy5sYXlvdXQgXHRcdD0gcGFyYW1zLmxheW91dCB8fCBbXTtcblx0XHR0aGlzLnN0eWxlXHRcdFx0PSBuZXcgU3R5bGUoIHBhcmFtcy5zdHlsZSB8fCBbXSApO1xuXHRcdHRoaXMucGxhY2Vob2xkZXIgXHQ9IHBhcmFtcy5wbGFjZWhvbGRlciB8fCBmYWxzZTtcblx0fSBlbHNlIHtcblx0XHR0aGlzLmxheW91dCBcdFx0PSBbXTtcblx0XHR0aGlzLnN0eWxlXHRcdFx0PSBuZXcgU3R5bGUoIFtdICk7XG5cdFx0dGhpcy5wbGFjZWhvbGRlciBcdD0gZmFsc2U7XG5cdH1cblxuXHR0aGlzLnRlbXBsYXRlID0gQ29sdW1ucy5UZW1wbGF0ZXNbJ3RlbXBsYXRlcy9sYXlvdXQvcm93LWdyb3VwLmhicyddO1xuXHR0aGlzLiRncm91cDtcbn07XG5cbi8vIFJldHVybiB0aGUgbGF5b3V0IHByb3BlcnRpZXMgYXMgYW4gb2JqZWN0LFxuLy8gZ2l2ZW4gYW55IGpRdWVyeSBncm91cCBvYmplY3RcblRlbXBsYXRlR3JvdXBWaWV3LmxheW91dEZvckdyb3VwID0gZnVuY3Rpb24oICRncm91cCApIHtcblx0dmFyIGxheW91dCA9IFtdO1xuXG5cdGlmICggISggJGdyb3VwIGluc3RhbmNlb2YgalF1ZXJ5ICkgKSB7XG5cdFx0dGhyb3cgXCJleGNlcHRpb246IGdyb3VwIG11c3QgYmUgalF1ZXJ5IG9iamVjdFwiO1xuXHR9XG5cblx0TEFZT1VUX1BST1BFUlRJRVMuZm9yRWFjaChmdW5jdGlvbiggcHJvcGVydHksIGkgKSB7XG5cdFx0dmFyIHZhbHVlID0gJGdyb3VwLmRhdGEoIHByb3BlcnR5ICk7XG5cdFx0aWYgKCB2YWx1ZSApIHtcblx0XHRcdGxheW91dC5wdXNoKHtcblx0XHRcdFx0cHJvcGVydHk6IHByb3BlcnR5LFxuXHRcdFx0XHR2YWx1ZTogdmFsdWVcblx0XHRcdH0pO1xuXHRcdH1cblx0fSk7XG5cdHJldHVybiBsYXlvdXQ7XG59O1xuXG5UZW1wbGF0ZUdyb3VwVmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oKSB7XG5cdHZhciAkdGVtcGxhdGUgPSAkKCB0aGlzLnRlbXBsYXRlKHtcblx0XHRwbGFjZWhvbGRlcjogXHR0aGlzLnBsYWNlaG9sZGVyLFxuXHRcdHN0eWxlOiBcdFx0XHR0aGlzLnN0eWxlLnN0eWxlcyxcblx0XHRsYXlvdXQ6IFx0XHR0aGlzLmxheW91dFxuXHR9KSk7XG5cdHRoaXMuJGdyb3VwID0gJHRlbXBsYXRlO1xuXG5cdHRoaXMuX3NldHVwRXZlbnRzKCk7XG5cdHRoaXMuX3NldHVwRHJvcCgpO1xuXG5cdHJldHVybiB0aGlzLiRncm91cDtcbn07XG5cblRlbXBsYXRlR3JvdXBWaWV3LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiggcHJvcGVydHksIHZhbHVlICkge1xuXG5cdC8vIFJlcGxhY2UgZWFjaCBsYXlvdXQgdmFsdWUgd2l0aCBhIHBvdGVudGlhbCBuZXcgb25lXG5cdHRoaXMubGF5b3V0LmZvckVhY2goZnVuY3Rpb24oIGxheW91dCwgaSApIHtcblx0XHR0aGlzLiRncm91cC5kYXRhKCBsYXlvdXQucHJvcGVydHksIGxheW91dC52YWx1ZSApO1xuXHRcdHRoaXMuJGdyb3VwLmF0dHIoICdsYXlvdXQtJyArIGxheW91dC5wcm9wZXJ0eSwgbGF5b3V0LnZhbHVlICk7XG5cdH0uYmluZCggdGhpcyApKTtcblxuXHQvLyBBbGVydCBhbnkgbGlzdGVuZXJzIHRoYXQgdGhlIGdyb3VwIGhhcyBjaGFuZ2VkXG5cdC8vIHZhciBldmVudCA9IG5ldyBDdXN0b21FdmVudCggJ0NvbHVtbnMuR3JvdXBWaWV3LkRpZENoYW5nZScsIHtcblx0Ly8gXHRncm91cFZpZXc6IFx0dGhpc1xuXHQvLyB9KTtcblx0Ly8gdmFyIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdC8vIGV2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5UZW1wbGF0ZUdyb3VwVmlldy5EaWRDaGFuZ2UnLCBmYWxzZSwgZmFsc2UsIHtcblx0Ly8gXHRncm91cFZpZXc6IFx0dGhpc1xuXHQvLyB9KTtcblx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG5cblx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuVGVtcGxhdGVHcm91cFZpZXcuRGlkQ2hhbmdlJywge1xuXHRcdGdyb3VwVmlldzogXHR0aGlzXG5cdH0pO1xuXG5cdHJldHVybiB0aGlzLiRncm91cDtcbn07XG5cbi8vIFJldHVybiB0aGUgY29ycmVjdCBsYXlvdXQgYXR0cmlidXRlIGZvciBhIGdpdmVuIHByb3BlcnR5XG4vLyBAcGFyYW0geyBzdHJpbmcgfSBwcm9wZXJ0eSAtLSB0aGUgcmVxdWVzdGVkIGxheW91dCBwcm9wZXJ0eVxuLy8gQHJldHVybiB7IHN0cmluZyB9IHRoZSBjb3JyZXNwb25kaW5nIHZhbHVlXG5UZW1wbGF0ZUdyb3VwVmlldy5wcm90b3R5cGUuZ2V0U3R5bGUgPSBmdW5jdGlvbiggcHJvcGVydHkgKSB7XG5cdHZhciB2YWx1ZTtcblxuXHQvLyBJZiB0aGVyZSB3YXMgbm90IG1hdGNoIGluIHRoZSBsYXlvdXQgb2JqZWN0LFxuXHQvLyBjaGVjayB0aGUgc3R5bGUgb2JqZWN0XG5cdC8vIExvb3AgdGhyb3VnaCBlYWNoIHByb3BlcnR5IHVudGlsIHdlIGZpbmQgYSBtYXRjaFxuXHRpZiAoIHRoaXMuc3R5bGUgKSB7XG5cdFx0dmFsdWUgPSB0aGlzLnN0eWxlLmdldCggcHJvcGVydHkgKVxuXHR9XG5cblx0Ly8gTG9vcCB0aHJvdWdoIGVhY2ggbGF5b3V0IHByb3BlcnR5XG5cdC8vIHVudGlsIHdlIGZpbmQgYSBtYXRjaFxuXHQvLyBwb3RlbnRpYWxseSBhIGJldHRlciBvbmUgdGhhdCBpbiB0aGUgc3R5bGUgc2V0XG5cdHRoaXMubGF5b3V0LmZvckVhY2goZnVuY3Rpb24oIGxheW91dCwgaSApIHtcblx0XHRpZiAoIGxheW91dC5wcm9wZXJ0eSA9PT0gcHJvcGVydHkgKSB7XG5cdFx0XHR2YWx1ZSA9IGxheW91dC52YWx1ZVxuXHRcdH1cblx0fSk7XG5cblx0Ly8gQXMgYSBsYXN0IHJlc29ydCwgY2hlY2sgdGhlIGNzcyBmb3IgdGhlIGVsZW1lbnRcblx0Ly8gYW5kIHJldHVybiBpdHMgdmFsdWVcblx0aWYgKCB2YWx1ZSApIHtcblx0XHRyZXR1cm4gdmFsdWU7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIHRoaXMuJGdyb3VwLmNzcyggcHJvcGVydHkgKTtcblx0fVxufTtcblxuLy8gR2V0IHRoZSB0ZW1wbGF0ZSdzIHRpdGxlIGZvciBkaXNwbGF5XG4vLyBTaG91bGQgYmUgJ1JvdycgZm9yIHRoZSBmaXJzdCBncm91cCBpbiB0aGUgdGVtcGxhdGVcbi8vIGFuZCAnR3JvdXAnIGZvciBhbGwgb3RoZXJzXG4vLyBAcmV0dXJuIHsgc3RyaW5nIH0gLS0gVGhlIGdyb3VwJ3MgdGl0bGVcblRlbXBsYXRlR3JvdXBWaWV3LnByb3RvdHlwZS50aXRsZSA9IGZ1bmN0aW9uKCkge1xuXG5cdC8vIElzIHRoaXMgdGhlIGZpcnN0IGdyb3VwIGluIHRoZSB0ZW1wbGF0ZT9cblx0aWYgKCB0aGlzLiRncm91cC5wYXJlbnQoJy5sYXlvdXQtdGVtcGxhdGUtcm93JykubGVuZ3RoICkge1xuXHRcdHJldHVybiAnUm93Jztcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gJ0dyb3VwJztcblx0fVxufTtcblxuVGVtcGxhdGVHcm91cFZpZXcucHJvdG90eXBlLnJlbW92ZVBsYWNlaG9sZGVycyA9IGZ1bmN0aW9uKCkge1xuXG5cdC8vIFJlbW92ZSBhbnkgcGxhY2Vob2xkZXIgdmFsdWVzXG5cdHRoaXMuJGdyb3VwLmZpbmQoUk9XX1ZBTFVFX1NFTEVDVE9SKS5maWx0ZXIoJy5wbGFjZWhvbGRlcicpLnJlbW92ZSgpO1xuXG5cdC8vIFJlbW92ZSBhbnkgcGxhY2Vob2xkZXIgZ3JvdXBzIHdoaWxlIGxlYXZpbmcgdGhlaXIgY2hpbGRyZW5cblx0dGhpcy4kZ3JvdXAuZmluZChST1dfR1JPVVBfU0VMRUNUT1IpLmZpbHRlcignLnBsYWNlaG9sZGVyJykuY2hpbGRyZW4oKS51bndyYXAoKTtcbn07XG5cblRlbXBsYXRlR3JvdXBWaWV3LnByb3RvdHlwZS5fbWVyZ2VMYXlvdXQgPSBmdW5jdGlvbiggcHJvcGVydHksIHZhbHVlICkge1xuXHR2YXIgZXhpc3RpbmdQcm9wZXJ0eSA9IGZhbHNlO1xuXG5cdC8vIExvb3AgdGhyb3VnaCB0aGUgb2xkIHByb3BlcnRpZXNcblx0Ly8gY29tcGFyaW5nIGVhY2ggd2l0aCB0aGUgbmV3IHByb3BlcnR5LlxuXHQvLyBSZXBsYWNlIGFuIGV4aXN0aW5nIHByb3BlcnR5IGFueXRpbWUgYSBuZXcgb25lIG1hdGNoZXMgaXQuXG5cdC8vIEF0IHRoZSBlbmQsIGFwcGVuZCBhbnkgcmVtYWluaW5nIG5ldyBwcm9wZXJ0aWVzIHRvIHRoZSBtZXJnZWQgc3R5bGVzIGFycmF5LlxuXHR0aGlzLmxheW91dC5mb3JFYWNoKGZ1bmN0aW9uKCBsYXlvdXQsIGkgKSB7XG5cdFx0aWYgKCBsYXlvdXQucHJvcGVydHkgPT09IHByb3BlcnR5ICkge1xuXHRcdFx0bGF5b3V0LnZhbHVlID0gdmFsdWU7XG5cdFx0XHR0aGlzLmxheW91dFsgaSBdID0gbGF5b3V0O1xuXHRcdFx0ZXhpc3RpbmdQcm9wZXJ0eSA9IHRydWU7XG5cdFx0fVxuXHR9LmJpbmQoIHRoaXMgKSk7XG5cblx0Ly8gQWRkIGFsbCByZW1haW5pbmcgbmV3IHN0eWxlcyB0byB0aGUgc3R5bGVzIGFycmF5XG5cdGlmICggIWV4aXN0aW5nUHJvcGVydHkgKSB7XG5cdFx0dGhpcy5sYXlvdXQucHVzaCh7XG5cdFx0XHRwcm9wZXJ0eTogcHJvcGVydHksXG5cdFx0XHR2YWx1ZTogdmFsdWVcblx0XHR9KTtcblx0fVxufTtcblxuVGVtcGxhdGVHcm91cFZpZXcucHJvdG90eXBlLl9zZXR1cERyb3AgPSBmdW5jdGlvbigpIHtcblx0dGhpcy4kZ3JvdXAuZHJvcHBhYmxlKHtcblx0XHR0b2xlcmFuY2U6ICdwb2ludGVyJ1xuXHR9KTtcblxuXHR0aGlzLiRncm91cC5vbiggJ2Ryb3BvdmVyJywgJC5wcm94eShmdW5jdGlvbiggZXZlbnQsIHVpICkge1xuXG5cdFx0Ly8gQWxlcnQgYW55IGxpc3RlbmVycyB0aGF0IHRoZSBncm91cCBpcyBub3cgZW5nYWdlZCB0byBiZSBkcm9wcGVkIHVwb25cblx0XHQvLyB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoICdDb2x1bW5zLlRlbXBsYXRlR3JvdXBWaWV3Lkdyb3VwRGlkQmVnaW5Ecm9wT3ZlcldpdGhWYWx1ZVZpZXcnLCB7XG5cdFx0Ly8gZ3JvdXBWaWV3OiBcdHRoaXMsXG5cdFx0Ly8gdmFsdWVWaWV3OiBcdHVpLmRyb3BwYWJsZSxcblx0XHQvLyBldmVudDogXHRcdGV2ZW50LFxuXHRcdC8vIHVpOiBcdFx0dWlcblx0XHQvLyB9KTtcblx0XHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdFx0Ly8gY29sdW1uc0V2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5UZW1wbGF0ZUdyb3VwVmlldy5Hcm91cERpZEJlZ2luRHJvcE92ZXJXaXRoVmFsdWVWaWV3JywgZmFsc2UsIGZhbHNlLCB7XG5cdFx0Ly8gXHRncm91cFZpZXc6IFx0dGhpcyxcblx0XHQvLyBcdHZhbHVlVmlldzogXHR1aS5kcm9wcGFibGUsXG5cdFx0Ly8gXHRldmVudDogXHRcdGV2ZW50LFxuXHRcdC8vIFx0dWk6IFx0XHR1aVxuXHRcdC8vIH0pO1xuXHRcdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY29sdW1uc0V2ZW50KTtcblx0XHRDb2x1bW5zRXZlbnQuc2VuZCgnQ29sdW1ucy5UZW1wbGF0ZUdyb3VwVmlldy5Hcm91cERpZEJlZ2luRHJvcE92ZXJXaXRoVmFsdWVWaWV3Jywge1xuXHRcdFx0Z3JvdXBWaWV3OiBcdHRoaXMsXG5cdFx0XHR2YWx1ZVZpZXc6IFx0dWkuZHJvcHBhYmxlLFxuXHRcdFx0ZXZlbnQ6IFx0XHRldmVudCxcblx0XHRcdHVpOiBcdFx0dWlcblx0XHR9KTtcblxuXHR9LCB0aGlzKSApO1xuXG5cdHRoaXMuJGdyb3VwLm9uKCAnZHJvcG91dCcsICQucHJveHkoZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcblxuXHRcdC8vIEFsZXJ0IGFueSBsaXN0ZW5lcnMgdGhhdCB0aGUgZ3JvdXAgaXMgbm93IGVuZ2FnZWQgdG8gYmUgZHJvcHBlZCB1cG9uXG5cdFx0Ly8gdmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCAnQ29sdW1ucy5UZW1wbGF0ZUdyb3VwVmlldy5Hcm91cERpZEVuZERyb3BPdmVyV2l0aFZhbHVlVmlldycsIHtcblx0XHQvLyBncm91cFZpZXc6IFx0dGhpcyxcblx0XHQvLyB2YWx1ZVZpZXc6IFx0dWkuZHJvcHBhYmxlLFxuXHRcdC8vIGV2ZW50OiBcdFx0ZXZlbnQsXG5cdFx0Ly8gdWk6IFx0XHR1aVxuXHRcdC8vIH0pO1xuXHRcdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0XHQvLyBjb2x1bW5zRXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLlRlbXBsYXRlR3JvdXBWaWV3Lkdyb3VwRGlkRW5kRHJvcE92ZXJXaXRoVmFsdWVWaWV3JywgZmFsc2UsIGZhbHNlLCB7XG5cdFx0Ly8gXHRncm91cFZpZXc6IFx0dGhpcyxcblx0XHQvLyBcdHZhbHVlVmlldzogXHR1aS5kcm9wcGFibGUsXG5cdFx0Ly8gXHRldmVudDogXHRcdGV2ZW50LFxuXHRcdC8vIFx0dWk6IFx0XHR1aVxuXHRcdC8vIH0pO1xuXHRcdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY29sdW1uc0V2ZW50KTtcblx0XHRDb2x1bW5zRXZlbnQuc2VuZCgnQ29sdW1ucy5UZW1wbGF0ZUdyb3VwVmlldy5Hcm91cERpZEVuZERyb3BPdmVyV2l0aFZhbHVlVmlldycsIHtcblx0XHRcdGdyb3VwVmlldzogXHR0aGlzLFxuXHRcdFx0dmFsdWVWaWV3OiBcdHVpLmRyb3BwYWJsZSxcblx0XHRcdGV2ZW50OiBcdFx0ZXZlbnQsXG5cdFx0XHR1aTogXHRcdHVpXG5cdFx0fSk7XG5cblx0fSwgdGhpcykgKTtcblxuXHR0aGlzLiRncm91cC5vbiggJ2Ryb3AnLCAkLnByb3h5KGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XG5cblx0XHQvLyBBbGVydCBhbnkgbGlzdGVuZXJzIHRoYXQgdGhlIGdyb3VwIGlzIG5vdyBlbmdhZ2VkIHRvIGJlIGRyb3BwZWQgdXBvblxuXHRcdC8vIHZhciBldmVudCA9IG5ldyBDdXN0b21FdmVudCggJ0NvbHVtbnMuVGVtcGxhdGVHcm91cFZpZXcuR3JvdXBEaWREcm9wV2l0aFZhbHVlVmlldycsIHtcblx0XHQvLyBncm91cFZpZXc6IFx0dGhpcyxcblx0XHQvLyB2YWx1ZVZpZXc6IFx0dWkuZHJvcHBhYmxlLFxuXHRcdC8vIGV2ZW50OiBcdFx0ZXZlbnQsXG5cdFx0Ly8gdWk6IFx0XHR1aVxuXHRcdC8vIH0pO1xuXHRcdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0XHQvLyBjb2x1bW5zRXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLlRlbXBsYXRlR3JvdXBWaWV3Lkdyb3VwRGlkRHJvcFdpdGhWYWx1ZVZpZXcnLCBmYWxzZSwgZmFsc2UsIHtcblx0XHQvLyBcdGdyb3VwVmlldzogXHR0aGlzLFxuXHRcdC8vIFx0dmFsdWVWaWV3OiBcdHVpLmRyb3BwYWJsZSxcblx0XHQvLyBcdGV2ZW50OiBcdFx0ZXZlbnQsXG5cdFx0Ly8gXHR1aTogXHRcdHVpXG5cdFx0Ly8gfSk7XG5cdFx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjb2x1bW5zRXZlbnQpO1xuXHRcdENvbHVtbnNFdmVudC5zZW5kKCdDb2x1bW5zLlRlbXBsYXRlR3JvdXBWaWV3Lkdyb3VwRGlkRHJvcFdpdGhWYWx1ZVZpZXcnLCB7XG5cdFx0XHRncm91cFZpZXc6IFx0dGhpcyxcblx0XHRcdHZhbHVlVmlldzogXHR1aS5kcm9wcGFibGUsXG5cdFx0XHRldmVudDogXHRcdGV2ZW50LFxuXHRcdFx0dWk6IFx0XHR1aVxuXHRcdH0pO1xuXG5cdH0sIHRoaXMpICk7XG59O1xuXG5UZW1wbGF0ZUdyb3VwVmlldy5wcm90b3R5cGUuX3NldHVwRXZlbnRzID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gTGlzdGVuIHRvIHVwZGF0ZXMgZm9yIHRoaXMgZ3JvdXBcblx0Ly8gYW5kIHVwZGF0ZSBpZiB0aGVyZSdzIGEgbWF0Y2hcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5TdHlsZVZpZXcuUHJvcGVydHlEaWRVcGRhdGVXaXRoVmFsdWVGb3JHcm91cFZpZXcnLCB0aGlzLl9vbkdyb3VwRGlkQ2hhbmdlLmJpbmQoIHRoaXMgKSApO1xufTtcblxuVGVtcGxhdGVHcm91cFZpZXcucHJvdG90eXBlLl9vbkdyb3VwRGlkQ2hhbmdlID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXHR2YXIgJG5ld0dyb3VwID0gZGF0YS5ncm91cFZpZXcuJGdyb3VwO1xuXHRpZiAoIHRoaXMuJGdyb3VwLmlzKCAkbmV3R3JvdXAgKSApIHtcblx0XHR0aGlzLl9tZXJnZUxheW91dCggZGF0YS5wcm9wZXJ0eSwgZGF0YS52YWx1ZSApXG5cdFx0dGhpcy51cGRhdGUoKTtcblx0fVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBUZW1wbGF0ZUdyb3VwVmlldzsiLCJ2YXIgQ29sdW1uc0V2ZW50ID0gcmVxdWlyZSgnLi4vbW9kZWxzL0NvbHVtbnNFdmVudC5qcycpO1xuXG4vLyBPYmplY3QgdG8gbWFuYWdlIHByb3BlcnRpZXMgb2YgYW5kIGludGVyYWN0aW9uXG4vLyB3aXRoIHRlbXBsYXRlIHZhbHVlIHpvbmVzLlxuLy8gVmFsdWUgem9uZXMgYXJlIHBvcHVsYXRlZCB3aXRoIGl0ZW1zIGFuZFxuLy8gY2FuIHJlYWN0IHRvIGNoYW5nZXMgaW4gYW4gaXRlbSdzIHByb3BlcnRpZXMuXG5cbkhhbmRsZWJhcnMucmVnaXN0ZXJQYXJ0aWFsKCdsYXlvdXQnLCBDb2x1bW5zLlRlbXBsYXRlc1sndGVtcGxhdGVzL2xheW91dC9sYXlvdXQuaGJzJ10pO1xuSGFuZGxlYmFycy5yZWdpc3RlclBhcnRpYWwoJ3N0eWxlJywgQ29sdW1ucy5UZW1wbGF0ZXNbJ3RlbXBsYXRlcy9sYXlvdXQvc3R5bGUuaGJzJ10pO1xuXG5UZW1wbGF0ZVZhbHVlVmlldyA9IGZ1bmN0aW9uKCBpdGVtLCBwbGFjZWhvbGRlciApIHtcblxuXHRpZiAoIGl0ZW0gJiYgaXRlbSBpbnN0YW5jZW9mIEl0ZW0gKSB7XG5cdFx0dGhpcy5pdGVtID0gaXRlbVxuXHR9IGVsc2UgaWYgKCBpdGVtICkge1xuXHRcdHRocm93IFwiZXhjZXB0aW9uOiBpdGVtIG11c3QgYmUgb2YgdHlwZSBJdGVtXCJcblx0fSBlbHNlIHtcblx0XHR0aGlzLml0ZW07XG5cdH1cblx0XG5cdHRoaXMudGVtcGxhdGUgPSBDb2x1bW5zLlRlbXBsYXRlc1sndGVtcGxhdGVzL2xheW91dC9yb3ctdmFsdWUuaGJzJ107XG5cdHRoaXMucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlciB8fCBmYWxzZTtcblx0dGhpcy4kdmFsdWU7XG59O1xuXG5UZW1wbGF0ZVZhbHVlVmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oKSB7XG5cdHZhciAkdGVtcGxhdGUgPSAkKCB0aGlzLnRlbXBsYXRlKHtcblx0XHRkYXRhOiBcdFx0XHR0aGlzLml0ZW0uZm9ybWF0dGVkVGl0bGUoKSxcblx0XHRzdHlsZTogXHRcdFx0dGhpcy5pdGVtLnN0eWxlLnN0eWxlcyxcblx0XHRwbGFjZWhvbGRlcjogXHR0aGlzLnBsYWNlaG9sZGVyXG5cdH0pKTtcblx0dGhpcy4kdmFsdWUgPSAkdGVtcGxhdGU7XG5cblx0aWYgKCAhdGhpcy5wbGFjZWhvbGRlciApIHtcblx0XHR0aGlzLl9zZXR1cEV2ZW50cygpO1xuXHRcdHRoaXMuX3NldHVwRHJhZygpO1xuXHRcdHRoaXMuX3NldHVwQ2xpY2soKTtcblx0fVxuXG5cdHJldHVybiB0aGlzLiR2YWx1ZTtcbn07XG5cblRlbXBsYXRlVmFsdWVWaWV3LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbigpIHtcblx0Ly8gVXBkYXRlIHRoZSB2YWx1ZSdzIHRleHRcblx0dGhpcy4kdmFsdWUudGV4dCggdGhpcy5pdGVtLmZvcm1hdHRlZFRpdGxlKCkgKTtcblx0Ly8gVXBkYXRlIHRoZSB2YWx1ZSdzIHN0eWxlXG5cdHRoaXMuJHZhbHVlLmF0dHIoICdzdHlsZScsIHRoaXMuaXRlbS5zdHlsZS5jc3MoKSApO1xuXHQvLyBVcGRhdGUgdGhlIHZhbHVlJ3MgcGxhY2Vob2xkZXIgc3RhdHVzXG5cblx0Ly8gQWxlcnQgYW55IGxpc3RlbmVycyB0aGF0IHRoZSB2YWx1ZSBoYXMgY2hhbmdlZFxuXHQvLyB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoICdDb2x1bW5zLlZhbHVlVmlldy5EaWRDaGFuZ2UnLCB7XG5cdC8vIFx0dmFsdWVWaWV3OiBcdHRoaXNcblx0Ly8gfSk7XG5cdC8vIHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHQvLyBldmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuVGVtcGxhdGVWYWx1ZVZpZXcuRGlkQ2hhbmdlJywgZmFsc2UsIGZhbHNlLCB7XG5cdC8vIFx0dmFsdWVWaWV3OiBcdHRoaXNcblx0Ly8gfSk7XG5cdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuXHRDb2x1bW5zRXZlbnQuc2VuZCgnQ29sdW1ucy5UZW1wbGF0ZVZhbHVlVmlldy5EaWRDaGFuZ2UnLCB7XG5cdFx0dmFsdWVWaWV3OiBcdHRoaXNcblx0fSk7XG5cblx0cmV0dXJuIHRoaXMuJHZhbHVlO1xufTtcblxuVGVtcGxhdGVWYWx1ZVZpZXcucHJvdG90eXBlLl9zZXR1cERyYWcgPSBmdW5jdGlvbigpIHtcblxuXHR0aGlzLiR2YWx1ZS5kcmFnZ2FibGUoe1xuXHRcdC8vIHJldmVydDogJ2ludmFsaWQnLFxuXHRcdC8vIHJldmVydER1cmF0aW9uOiAyMDAsXG5cdFx0aGVscGVyOiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBpdGVtVmlldyA9IG5ldyBJdGVtVmlldyggdGhpcy5pdGVtICk7XG5cdFx0XHRyZXR1cm4gaXRlbVZpZXcucmVuZGVyKCk7XG5cdFx0fS5iaW5kKCB0aGlzICksXG5cdFx0b3BhY2l0eTogLjJcblx0fSk7XG5cblx0dGhpcy4kdmFsdWUub24oICdkcmFnc3RhcnQnLCAkLnByb3h5KGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XG5cblx0XHQkKCBldmVudC50YXJnZXQgKS5hZGRDbGFzcygnaW5hY3RpdmUnKTtcblxuXHRcdC8vIE1ha2Ugc3VyZSB0aGlzIG9iamVjdCBubyBsb25nZXIgcmVjZWl2ZXMgZXZlbnQgdXBkYXRlc1xuXHRcdHRoaXMuX3RlYXJkb3duRXZlbnRzKCk7XG5cblx0XHQvLyBBbGVydCBhbnkgbGlzdGVuZXJzIHRoYXQgdGhlIGl0ZW0gaGFzIHN0YXJ0ZWQgZHJhZ1xuXHRcdC8vIHZhciBldmVudCA9IG5ldyBDdXN0b21FdmVudCggJ0NvbHVtbnMuSXRlbVZpZXcuSXRlbURpZEJlZ2luRHJhZycsIHtcblx0XHQvLyBcdGl0ZW06IFx0dGhpcyxcblx0XHQvLyBcdGV2ZW50OiBcdGV2ZW50LFxuXHRcdC8vIFx0dWk6IFx0dWlcblx0XHQvLyB9KTtcblx0XHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdFx0Ly8gY29sdW1uc0V2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5UZW1wbGF0ZVZhbHVlVmlldy5WYWx1ZURpZEJlZ2luRHJhZ1dpdGhJdGVtJywgZmFsc2UsIGZhbHNlLCB7XG5cdFx0Ly8gXHR2YWx1ZVZpZXc6IFx0dGhpcyxcblx0XHQvLyBcdGl0ZW06IFx0XHR0aGlzLml0ZW0sXG5cdFx0Ly8gXHRldmVudDogXHRcdGV2ZW50LFxuXHRcdC8vIFx0dWk6IFx0XHR1aVxuXHRcdC8vIH0pO1xuXHRcdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY29sdW1uc0V2ZW50KTtcblx0XHRDb2x1bW5zRXZlbnQuc2VuZCgnQ29sdW1ucy5UZW1wbGF0ZVZhbHVlVmlldy5WYWx1ZURpZEJlZ2luRHJhZ1dpdGhJdGVtJywge1xuXHRcdFx0dmFsdWVWaWV3OiBcdHRoaXMsXG5cdFx0XHRpdGVtOiBcdFx0dGhpcy5pdGVtLFxuXHRcdFx0ZXZlbnQ6IFx0XHRldmVudCxcblx0XHRcdHVpOiBcdFx0dWlcblx0XHR9KTtcblxuXHR9LCB0aGlzKSApO1xuXG5cdHRoaXMuJHZhbHVlLm9uKCAnZHJhZ3N0b3AnLCAkLnByb3h5KGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XG5cblx0XHQkKCBldmVudC50YXJnZXQgKS5yZW1vdmUoKTtcblxuXHRcdC8vIEFsZXJ0IGFueSBsaXN0ZW5lcnMgdGhhdCB0aGUgaXRlbSBoYXMgc3RhcnRlZCBkcmFnXG5cdFx0Ly8gdmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCAnQ29sdW1ucy5JdGVtVmlldy5JdGVtRGlkQkVuZERyYWcnLCB7XG5cdFx0Ly8gXHRpdGVtOiBcdHRoaXMsXG5cdFx0Ly8gXHRldmVudDogXHRldmVudCxcblx0XHQvLyBcdHVpOiBcdHVpXG5cdFx0Ly8gfSk7XG5cdFx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHRcdC8vIGNvbHVtbnNFdmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuVGVtcGxhdGVWYWx1ZVZpZXcuVmFsdWVEaWRFbmREcmFnV2l0aEl0ZW0nLCBmYWxzZSwgZmFsc2UsIHtcblx0XHQvLyBcdHZhbHVlVmlldzogXHR0aGlzLFxuXHRcdC8vIFx0aXRlbTogXHRcdHRoaXMuaXRlbSxcblx0XHQvLyBcdGV2ZW50OiBcdFx0ZXZlbnQsXG5cdFx0Ly8gXHR1aTogXHRcdHVpXG5cdFx0Ly8gfSk7XG5cdFx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjb2x1bW5zRXZlbnQpO1xuXHRcdENvbHVtbnNFdmVudC5zZW5kKCdDb2x1bW5zLlRlbXBsYXRlVmFsdWVWaWV3LlZhbHVlRGlkRW5kRHJhZ1dpdGhJdGVtJywge1xuXHRcdFx0dmFsdWVWaWV3OiBcdHRoaXMsXG5cdFx0XHRpdGVtOiBcdFx0dGhpcy5pdGVtLFxuXHRcdFx0ZXZlbnQ6IFx0XHRldmVudCxcblx0XHRcdHVpOiBcdFx0dWlcblx0XHR9KTtcblxuXHR9LCB0aGlzKSApO1xuXG5cdHRoaXMuJHZhbHVlLm9uKCAnZHJhZycsICQucHJveHkoZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcblxuXHRcdC8vIEFsZXJ0IGFueSBsaXN0ZW5lcnMgdGhhdCB0aGUgaXRlbSBoYXMgc3RhcnRlZCBkcmFnXG5cdFx0Ly8gdmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCAnQ29sdW1ucy5JdGVtVmlldy5JdGVtRGlkRHJhZycsIHtcblx0XHQvLyBcdGl0ZW06IFx0dGhpcyxcblx0XHQvLyBcdGV2ZW50OiBcdGV2ZW50LFxuXHRcdC8vIFx0dWk6IFx0dWlcblx0XHQvLyB9KTtcblx0XHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdFx0Ly8gY29sdW1uc0V2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5UZW1wbGF0ZVZhbHVlVmlldy5WYWx1ZURpZERyYWdXaXRoSXRlbScsIGZhbHNlLCBmYWxzZSwge1xuXHRcdC8vIFx0dmFsdWVWaWV3OiBcdHRoaXMsXG5cdFx0Ly8gXHRpdGVtOiBcdFx0dGhpcy5pdGVtLFxuXHRcdC8vIFx0ZXZlbnQ6IFx0XHRldmVudCxcblx0XHQvLyBcdHVpOiBcdFx0dWlcblx0XHQvLyB9KTtcblx0XHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGNvbHVtbnNFdmVudCk7XG5cdFx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuVGVtcGxhdGVWYWx1ZVZpZXcuVmFsdWVEaWREcmFnV2l0aEl0ZW0nLCB7XG5cdFx0XHR2YWx1ZVZpZXc6IFx0dGhpcyxcblx0XHRcdGl0ZW06IFx0XHR0aGlzLml0ZW0sXG5cdFx0XHRldmVudDogXHRcdGV2ZW50LFxuXHRcdFx0dWk6IFx0XHR1aVxuXHRcdH0pO1xuXG5cdH0sIHRoaXMpICk7XG59O1xuXG5UZW1wbGF0ZVZhbHVlVmlldy5wcm90b3R5cGUuX3NldHVwQ2xpY2sgPSBmdW5jdGlvbigpIHtcblxuXHR0aGlzLiR2YWx1ZS5vbiggJ2NsaWNrJywgJC5wcm94eShmdW5jdGlvbiggZXZlbnQgKSB7XG5cblx0XHR0aGlzLiR2YWx1ZS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcblxuXHRcdENvbHVtbnNFdmVudC5zZW5kKCdDb2x1bW5zLlRlbXBsYXRlVmFsdWVWaWV3LlZhbHVlRGlkU2VsZWN0V2l0aEl0ZW0nLCB7XG5cdFx0XHR2YWx1ZVZpZXc6IFx0dGhpcyxcblx0XHRcdGl0ZW06IFx0XHR0aGlzLml0ZW1cblx0XHR9KTtcblxuXHR9LCB0aGlzICkgKTtcbn07XG5cblRlbXBsYXRlVmFsdWVWaWV3LnByb3RvdHlwZS5fc2V0dXBFdmVudHMgPSBmdW5jdGlvbigpIHtcblxuXHR0aGlzLm9uSXRlbURpZENoYW5nZSA9IHRoaXMuX29uSXRlbURpZENoYW5nZS5iaW5kKCB0aGlzICk7XG5cblx0Ly8gTGlzdGVuIHRvIHVwZGF0ZXMgZm9yIHRoaXMgaXRlbVxuXHQvLyBhbmQgdXBkYXRlIGlmIHRoZXJlJ3MgYSBtYXRjaFxuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLkl0ZW0uRGlkQ2hhbmdlJywgdGhpcy5vbkl0ZW1EaWRDaGFuZ2UgKTtcbn07XG5cblRlbXBsYXRlVmFsdWVWaWV3LnByb3RvdHlwZS5fdGVhcmRvd25FdmVudHMgPSBmdW5jdGlvbigpIHtcblxuXHRDb2x1bW5zRXZlbnQub2ZmKCAnQ29sdW1ucy5JdGVtLkRpZENoYW5nZScsIHRoaXMub25JdGVtRGlkQ2hhbmdlICk7XG59O1xuXG5UZW1wbGF0ZVZhbHVlVmlldy5wcm90b3R5cGUuX29uSXRlbURpZENoYW5nZSA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblx0dmFyIG5ld0l0ZW0gPSBkYXRhLml0ZW07XG5cdGlmICggdGhpcy5pdGVtLmlzKCBuZXdJdGVtICkgKSB7XG5cdFx0dGhpcy5pdGVtID0gbmV3SXRlbTtcblx0XHR0aGlzLnVwZGF0ZSgpO1xuXHR9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRlbXBsYXRlVmFsdWVWaWV3OyIsInZhciBDb2x1bW5zRXZlbnQgXHRcdFx0XHQ9IHJlcXVpcmUoJy4uL21vZGVscy9Db2x1bW5zRXZlbnQuanMnKTtcbnZhciBUZW1wbGF0ZUdyb3VwVmlldyBcdFx0XHQ9IHJlcXVpcmUoJy4vVGVtcGxhdGVHcm91cFZpZXcuanMnKTtcbnZhciBUZW1wbGF0ZVZhbHVlVmlldyBcdFx0XHQ9IHJlcXVpcmUoJy4vVGVtcGxhdGVWYWx1ZVZpZXcuanMnKTtcbnZhciBjb25maWcgXHRcdFx0XHRcdFx0PSByZXF1aXJlKCcuLi8uLi9jb21waWxlZC1qYXZhc2NyaXB0cy9jb25maWcuanMnKTtcblxuLy8gT2JqZWN0IHRvIG1hbmFnZSBwcm9wZXJ0aWVzIG9mIGFuZCBpbnRlcmFjdGlvblxuLy8gd2l0aCB0aGUgdGVtcGxhdGUgaXRzZWxmLlxuXG52YXIgUk9XX0dST1VQX1NFTEVDVE9SIFx0XHQ9ICcubGF5b3V0LXRlbXBsYXRlLXJvdy1ncm91cCcsIFxuXHRST1dfVkFMVUVfU0VMRUNUT1IgXHRcdD0gJy5sYXlvdXQtdGVtcGxhdGUtcm93LXZhbHVlJyxcblx0RFJBR0dJTkdfSVRFTV9TRUxFQ1RPUiBcdD0gJy51aS1kcmFnZ2FibGUtZHJhZ2dpbmcnLFxuXHRFWFBBTkRFRF9DTEFTUyBcdFx0XHQ9ICdleHBhbmRlZCcsXG5cdERST1BQQUJMRV9DTEFTUyBcdFx0PSAnZHJvcHBhYmxlJztcblxuVGVtcGxhdGVWaWV3ID0gZnVuY3Rpb24oIGxheW91dCApICB7XG5cblx0dGhpcy5sYXlvdXQgPSBsYXlvdXQ7O1xuXHR0aGlzLnRlbXBsYXRlID0gQ29sdW1ucy5UZW1wbGF0ZXNbJ3RlbXBsYXRlcy9sYXlvdXQvdGVtcGxhdGUuaGJzJ107XG5cdHRoaXMuJHRlbXBsYXRlO1xuXG5cdHRoaXMuZHJhZ2dpbmdJdGVtO1xuXHR0aGlzLmRyb3BwYWJsZUl0ZW1zID0gW107XG5cblx0dGhpcy5fcmVuZGVyUHJldmlldygpO1xuXHR0aGlzLl9zZXR1cEV2ZW50TGlzdGVuZXJzKCk7XG5cblx0VGVtcGxhdGVWaWV3Lmdyb3VwcyA9IFtdO1xufTtcblxuLy8gQ2xhc3MgTWV0aG9kc1xuLy8gLS0tLS0tLS0tLS0tLS0tLVxuVGVtcGxhdGVWaWV3Lmdyb3VwcyA9IFtdO1xuXG4vLyBSZXR1cm4gdGhlIGNvcnJlY3QgdmFsdWUgRE9NIHJlcHJlc2VudGF0aW9uIGZvciBhbiBpdGVtXG4vLyBAcGFyYW0geyBJdGVtIH0gaXRlbSAtLSB0aGUgSXRlbSB0byByZXRyaXZlXG4vLyBAcmV0dXJuIHsgalF1ZXJ5IH0gdGhlIGNvcnJlc3BvbmRpbmcgdGVtcGxhdGUgcmVwcmVzZXRhdGlvblxuVGVtcGxhdGVWaWV3LmdldFZhbHVlRm9ySXRlbSA9IGZ1bmN0aW9uKCBpdGVtICkge1xuXHR2YXIgJHZhbHVlcztcblxuXHQvLyBUaHJvdyBhbiBlcnJvciBpZiB0aGUgaXRlbSBpc24ndCBvZiB0aGUgY29ycmVjdCB0eXBlXG5cdGlmKCAhKCBpdGVtIGluc3RhbmNlb2YgSXRlbSkgKSB7XG5cdFx0dGhyb3cgXCJleHBlY3Rpb246IGl0ZW0gbXVzdCBiZSBvZiB0eXBlIEl0ZW1cIjtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvLyBGaW5kIGFsbCB0aGUgY3VycmVudCB2YWx1ZXMgaW4gdGhlIHRlbXBsYXRlXG5cdC8vIGFuZCBmaWx0ZXIgdGhlbSBieSB0aGVpciBpbm5lciB0ZXh0XG5cdC8vIHJldHVybmluZyBvbmx5IHRoZSBmaXJzdCB0aGF0IG1hdGNoZXMgdGhlIGl0ZW0ncyB0aXRsZVxuXHQkdmFsdWVzID0gJChST1dfVkFMVUVfU0VMRUNUT1IpLmZpbHRlcihmdW5jdGlvbiggaSwgZWxlbWVudCApIHtcblx0XHRyZXR1cm4gJCggZWxlbWVudCApLnRleHQoKS50cmltKCkgPT09IGl0ZW0uZm9ybWF0dGVkVGl0bGUoKTtcblx0fSk7XG5cblx0Ly8gUmV0dXJuIHVuZGVmaW5lZCBpZiB0aGVyZSBhcmUgbm8gcmVzdWx0aW5nIHZhbHVlc1xuXHRpZiAoICEkdmFsdWVzLmxlbmd0aCApIHtcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiAkdmFsdWVzO1xuXHR9XG59XG5cblRlbXBsYXRlVmlldy5nZXRHcm91cHNGb3JJdGVtID0gZnVuY3Rpb24oIGl0ZW0gKSB7XG5cdHZhciAkdmFsdWU7XG5cblx0Ly8gSWYgdGhlIGl0ZW0gaXMgb2YgdHlwZSBJdGVtLCBjb252ZXJ0IGl0IGludG8gYSB2YWx1ZVxuXHRpZiAoIGl0ZW0gaW5zdGFuY2VvZiBJdGVtICkge1xuXHRcdCR2YWx1ZSA9IHRoaXMuZ2V0VmFsdWVGb3JJdGVtKCBpdGVtICk7XG5cdH0gZWxzZSBpZiAoIGl0ZW0gaW5zdGFuY2VvZiBqUXVlcnkgJiYgaXRlbS5oYXNDbGFzcyhST1dfVkFMVUVfU0VMRUNUT1IpICkge1xuXHRcdCR2YWx1ZSA9IGl0ZW07XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgXCJleHBlY3Rpb246IGl0ZW0gbXVzdCBiZSBvZiB0eXBlIEl0ZW0gb3IgalF1ZXJ5IHRlbXBsYXRlIHJvd1wiO1xuXHR9XG5cblx0Ly8gSWYgdGhpcyB2YWx1ZSBpc24ndCBpbiB0aGUgdGVtcGxhdGUsIHJldHVybiB1bmRlZmluZWRcblx0aWYoICEkdmFsdWUgKSB7XG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0fVxuXG5cdC8vIFJldHVybiB0aGUgdmFsdWUncyBwYXJlbnQgZ3JvdXBzXG5cdHJldHVybiAkdmFsdWUucGFyZW50cyhST1dfR1JPVVBfU0VMRUNUT1IpLm1hcChmdW5jdGlvbiggaSwgZ3JvdXAgKSB7XG5cdFx0cmV0dXJuIFRlbXBsYXRlVmlldy5nZXRHcm91cFZpZXdGb3JHcm91cCggJCggZ3JvdXAgKSApO1xuXHR9KS50b0FycmF5KCk7XG5cbn07XG5cblRlbXBsYXRlVmlldy5nZXRHcm91cFZpZXdGb3JHcm91cCA9IGZ1bmN0aW9uKCBncm91cCApIHtcblx0dmFyIG5ld0dyb3VwID0gW107XG5cblx0aWYgKCAhKCBncm91cCBpbnN0YW5jZW9mIFRlbXBsYXRlR3JvdXBWaWV3ICkgJiYgISggZ3JvdXAgaW5zdGFuY2VvZiBqUXVlcnkgKSApIHtcblx0XHR0aHJvdyBcImV4Y2VwdGlvbjogZ3JvdXAgbXVzdCBiZSBUZW1wbGF0ZUdyb3VwVmlldyBvciBqUXVlcnkgb2JqZWN0XCI7XG5cdH1cblxuXHRuZXdHcm91cCA9IFRlbXBsYXRlVmlldy5ncm91cHMuZmlsdGVyKGZ1bmN0aW9uKCBvbGRHcm91cCwgaSApIHtcblx0XHRpZiAoIGdyb3VwIGluc3RhbmNlb2YgVGVtcGxhdGVHcm91cFZpZXcgJiYgZ3JvdXAgPT09IG9sZEdyb3VwICkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSBlbHNlIGlmICggZ3JvdXAgaW5zdGFuY2VvZiBqUXVlcnkgJiYgZ3JvdXAuaXMoIG9sZEdyb3VwLiRncm91cCApICkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH0pO1xuXG5cdGlmICggbmV3R3JvdXAubGVuZ3RoICkge1xuXHRcdHJldHVybiBuZXdHcm91cFsgMCBdO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdH1cbn07XG5cblRlbXBsYXRlVmlldy5yZW1vdmVHcm91cCA9IGZ1bmN0aW9uKCBncm91cCApIHtcblx0dmFyIGdyb3VwVmlldyA9IGdyb3VwLFxuXHRcdGluZGV4O1xuXG5cdC8vIElmIHRoZSBncm91cCBpcyBhIGpxdWVyeSBvYmplY3QsIGdldCBpdHMgZ3JvdXAgdmlld1xuXHRpZiAoIGdyb3VwVmlldyBpbnN0YW5jZW9mIGpRdWVyeSApIHtcblx0XHRncm91cFZpZXcgPSBUZW1wbGF0ZVZpZXcuZ2V0R3JvdXBWaWV3Rm9yR3JvdXAoIGdyb3VwVmlldyApO1xuXHR9XG5cblx0Ly8gR2V0IHRoZSBncm91cCdzIGluZGV4IGluIHRoZSBncm91cHMgYXJyYXlcblx0aW5kZXggPSBUZW1wbGF0ZVZpZXcuZ3JvdXBzLmluZGV4T2YoIGdyb3VwVmlldyApO1xuXG5cdC8vIExldCB0aGUgZ3JvdXAga25vdyB0aGF0IGl0J3MgYWJvdXQgdG8gYmUgcmVtb3ZlZFxuXHQvLyBhbmQgdGhlbiByZW1vdmUgaXRcblx0aWYgKCBpbmRleCA+PSAwICkge1xuXHRcdENvbHVtbnNFdmVudC5zZW5kKCdDb2x1bW5zLlRlbXBsYXRlVmlldy5XaWxsUmVtb3ZlR3JvdXBWaWV3Jywge1xuXHRcdFx0Z3JvdXBWaWV3OiBcdGdyb3VwVmlld1xuXHRcdH0pO1xuXG5cdFx0VGVtcGxhdGVWaWV3Lmdyb3Vwcy5zcGxpY2UoIGluZGV4LCAxICk7XG5cdH1cbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gUmVuZGVyIHRoZSBsYXlvdXQgcHJldmlld1xuXHR0aGlzLl9yZW5kZXJQcmV2aWV3KCk7XG5cblx0Ly8gUmVuZGVyIGFuZCByZXR1cm4gdGhlIHRlbXBsYXRlXG5cdHJldHVybiB0aGlzLl9yZW5kZXJUZW1wbGF0ZSgpO1xufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5fcmVuZGVyUHJldmlldyA9IGZ1bmN0aW9uKCkge1xuXG5cdHZhciBwcmV2aWV3ID0gQ29sdW1ucy5UZW1wbGF0ZXNbJ3RlbXBsYXRlcy9sYXlvdXQvcHJldmlldy5oYnMnXSxcblx0XHQkcHJldmlldyA9ICQoIHByZXZpZXcoe1xuXHRcdFx0c291cmNlOiBjb25maWcuZW1iZWQuaG9zdCArIGNvbmZpZy5lbWJlZC5wYXRoXG5cdFx0fSkgKTtcblxuXHR0aGlzLiRwcmV2aWV3ID0gJHByZXZpZXdcblx0JCgnI2xheW91dCcpLmFwcGVuZCggJHByZXZpZXcgKTtcblxuXHRyZXR1cm4gdGhpcy4kcHJldmlldztcblxufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5fcmVuZGVyVGVtcGxhdGUgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBGb3IgZWFjaCBub2RlIGluIHRoZSBsYXlvdXQgb2JqZWN0LFxuXHQvLyByZW5kZXIgZWl0aGVyIGEgZ3JvdXAgb3IgdmFsdWVcblx0Ly8gYW5kIHJlY3Vyc2l2ZWx5IGFwcGVuZCB0aGVtIHRvIGVhY2ggb3RoZXJcblx0Ly8gdW50aWwgd2UndmUgY29uc3RydWN0ZWQgdGhlIGZ1bGwgdGVtcGxhdGVcblx0dmFyICRyb3cgPSB0aGlzLl9yZW5kZXJSb3dDb21wb25lbnQoIHRoaXMubGF5b3V0Lm1vZGVsICk7XG5cdHZhciAkdGVtcGxhdGUgPSAkKCB0aGlzLnRlbXBsYXRlKCkgKTtcblx0JHRlbXBsYXRlLmZpbmQoJy5sYXlvdXQtdGVtcGxhdGUtcm93JykuYXBwZW5kKCAkcm93ICk7XG5cdCQoJyNsYXlvdXQnKS5hcHBlbmQoICR0ZW1wbGF0ZSApO1xuXHR0aGlzLiR0ZW1wbGF0ZSA9ICR0ZW1wbGF0ZTtcblxuXHR0aGlzLl9zZXR1cFRlbXBsYXRlRXZlbnRzKCk7XG5cdHRoaXMuX2VtaXRSZW5kZXIoKTtcblx0dGhpcy5fZW1pdENoYW5nZSgpO1xuXG5cdHJldHVybiB0aGlzLiR0ZW1wbGF0ZTtcblxufVxuXG5cbi8vIFJlbmRlciBhIHBvcnRpb24gb2YgdGhlIHJvdyBsYXlvdXQgb2JqZWN0XG4vLyBAcGFyYW0geyBvYmplY3QgfSBjb21wb25lbnQgLS0gVGhlIGNvbXBvbmVudCB0byByZW5kZXIgKGVpdGhlciBhIGdyb3VwIG9yIHZhbHVlKVxuLy8gQHJldHVybiB7IGpRdWVyeSBvYmplY3QgfSAtLSB0aGUgY29tcG9uZW50J3MgcmVuZGVyZWQgbGF5b3V0XG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLl9yZW5kZXJSb3dDb21wb25lbnQgPSBmdW5jdGlvbiggY29tcG9uZW50ICkge1xuXHR2YXIgY29tcG9uZW50Vmlldyxcblx0XHQkY29tcG9uZW50O1xuXG5cdC8vIFJlbmRlciB0aGUgdG9wIGxldmVsIGNvbXBvbmVudFxuXHQvLyBhcyBhIGdyb3VwIGlmIGl0J3MgYSBncm91cFxuXHQvLyBvciBhIHZhbHVlIGlmIGl0J3MgYSB2YWx1ZVxuXHRpZiAoIGNvbXBvbmVudC50eXBlID09PSAnZ3JvdXAnICkge1xuXHRcdGNvbXBvbmVudFZpZXcgPSBuZXcgVGVtcGxhdGVHcm91cFZpZXcoeyBsYXlvdXQ6IGNvbXBvbmVudC5sYXlvdXQsIHN0eWxlOiBjb21wb25lbnQuc3R5bGUgfSk7XG5cdFx0JGNvbXBvbmVudCA9IGNvbXBvbmVudFZpZXcucmVuZGVyKCk7XG5cblx0XHQvLyBBZGQgdGhlIGdyb3VwIHRvIHRoZSBncm91cHMgYXJyYXlcblx0XHRUZW1wbGF0ZVZpZXcuZ3JvdXBzLnB1c2goIGNvbXBvbmVudFZpZXcgKTtcblxuXHRcdC8vIExvb3AgdGhyb3VnaCBhbGwgZ3JvdXAgc3VidmFsdWVzIGFuZCByZW5kZXIgdGhvc2UgYXMgd2VsbFxuXHRcdGNvbXBvbmVudC52YWx1ZXMuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGkpIHtcblx0XHRcdCRjb21wb25lbnQuYXBwZW5kKCB0aGlzLl9yZW5kZXJSb3dDb21wb25lbnQoIHZhbHVlICkgKTtcblx0XHR9LmJpbmQoIHRoaXMgKSk7XG5cblx0XHQvLyBSZXR1cm4gdGhlIGZpbmFsIGNvbXBvbmVudCBpbmNsdWRpbmcgcmVuZGVyZWQgc3Vidmlld3Ncblx0XHRyZXR1cm4gJGNvbXBvbmVudDtcblxuXHR9IGVsc2UgaWYgKCBjb21wb25lbnQudHlwZSA9PT0gJ3NpbmdsZScgKSB7XG5cdFx0dmFyIGl0ZW0gPSB0aGlzLnRhYmxlLmdldEl0ZW1Gb3JEYXRhKCBjb21wb25lbnQuZGF0YSApO1xuXHRcdGNvbXBvbmVudFZpZXcgPSBuZXcgVGVtcGxhdGVWYWx1ZVZpZXcoIGl0ZW0gKTtcblx0XHRyZXR1cm4gY29tcG9uZW50Vmlldy5yZW5kZXIoKTtcblx0fVxuXG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLnJlbW92ZVBsYWNlaG9sZGVycyA9IGZ1bmN0aW9uKCkge1xuXG5cdC8vIFJlbW92ZSBhbnkgcGxhY2Vob2xkZXIgdmFsdWVzXG5cdCQoUk9XX1ZBTFVFX1NFTEVDVE9SKS5maWx0ZXIoJy5wbGFjZWhvbGRlcicpLnJlbW92ZSgpO1xuXG5cdC8vIFJlbW92ZSBhbnkgcGxhY2Vob2xkZXIgZ3JvdXBzIHdoaWxlIGxlYXZpbmcgdGhlaXIgY2hpbGRyZW5cblx0JChST1dfR1JPVVBfU0VMRUNUT1IpLmZpbHRlcignLnBsYWNlaG9sZGVyJykuY2hpbGRyZW4oKS51bndyYXAoKTtcbn07XG5cbi8vIElmIHRoaXMgdGhlcmUncyBvbmx5IG9uZSBpdGVtIGxlZnQgaW4gdGhlIHN1cnJvdW5pbmcgZ3JvdXAsIGRpc3NvbHZlIHRoZSBncm91cC5cbi8vIFVubGVzcyB0aGUgcGFyZW50IGdyb3VwIGlzIHRoZSB2ZXJ5IGZpcnN0IGdyb3VwIGluIHRoZSBjZWxsLlxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5kaXNzb2x2ZVNpbmdsZVZhbHVlR3JvdXBzID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gR2V0IGFueSBncm91cHMgdGhhdCBvbmx5IGhhdmUgYSBzaW5nbGUgYWN0aXZlIGl0ZW1cblx0Ly8gYnV0IGV4Y2x1ZGUgdGhlIGZpcnN0IGdyb3VwIGluIHRoZSByb3dcblx0dmFyICRncm91cHMgPSAkKCBST1dfR1JPVVBfU0VMRUNUT1IgKS5ub3QoICcubWFzdGVyID4gJyArIFJPV19HUk9VUF9TRUxFQ1RPUiApLmZpbHRlcihmdW5jdGlvbiggaSwgZ3JvdXAgKSB7XG5cdFx0cmV0dXJuICQoIGdyb3VwICkuY2hpbGRyZW4oIFJPV19WQUxVRV9TRUxFQ1RPUiApLm5vdCggJy5pbmFjdGl2ZScgKS5sZW5ndGggPT09IDE7XG5cdH0pO1xuXG5cdC8vIHZhciAkZ3JvdXBzID0gJCggUk9XX1ZBTFVFX1NFTEVDVE9SICsgJzpvbmx5LWNoaWxkJyApXG5cdC8vIFx0LnBhcmVudCgpXG5cdC8vIFx0Lm5vdCggJ21hc3RlciA+ICcgKyBST1dfR1JPVVBfU0VMRUNUT1IgKTtcblxuXHQvLyBVbndyYXAgdGhlICdvbmx5IGNoaWxkcmVuJyBvZiB0aGVzZSBncm91cHNcblx0JGdyb3Vwcy5lYWNoKGZ1bmN0aW9uKCBpLCBncm91cCApIHtcblx0XHRUZW1wbGF0ZVZpZXcucmVtb3ZlR3JvdXAoICQoIGdyb3VwICkgKTtcblx0fSk7XG5cblx0JGdyb3Vwcy5jaGlsZHJlbigpLnVud3JhcCgpO1xufTtcblxuLy8gUmVtb3ZlIHRoZSBkcmFnZ2luZyBpdGVtIGZyb20gdGhlIHRlbXBsYXRlXG4vLyBpZiBpdCBpcyBhIHZhbHVlLiBQcmVzdW1hYmx5IHRoaXMgaXMgYmVjYXVzZVxuLy8gdGhlIHVzZXIganVzdCBkcmFnZ2VkIGl0IG91dCBvZiB0aGUgdGVtcGxhdGVcblRlbXBsYXRlVmlldy5wcm90b3R5cGUucmVtb3ZlVmFsdWUgPSBmdW5jdGlvbiggdmFsdWVWaWV3ICkge1xuXG5cdGlmICggdmFsdWVWaWV3IGluc3RhbmNlb2YgVGVtcGxhdGVWYWx1ZVZpZXcgKSB7XG5cdFx0dmFsdWVWaWV3LiR2YWx1ZS5yZW1vdmUoKTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBcImV4Y2VwdGlvbjogdmFsdWUgbXVzdCBiZSBvZiB0eXBlIFRlbXBsYXRlVmFsdWVWaWV3XCI7XG5cdH1cbn07XG5cbi8vIEFuaW1hdGUgdGhlIGRyYWdnaW5nIGhlbHBlciB0byB0aGUgcG9zaXRpb24gb2YgaXRzIHJlc3BlY3RpdmUgaXRlbVxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5yZW1vdmVEcmFnZ2luZ1ZhbHVlID0gZnVuY3Rpb24oIGNhbGxiYWNrICkge1xuXHR2YXIgJGhlbHBlciA9ICQoJy51aS1kcmFnZ2FibGUtZHJhZ2dpbmcudWktZHJhZ2dhYmxlLWhhbmRsZScpXG5cdFx0JGNsb25lID0gJGhlbHBlci5jbG9uZSgpLFxuXHRcdCRpdGVtID0gJCgnI2NvbHVtbnMgLmxheW91dC1jb2x1bW4nKS5maWx0ZXIoZnVuY3Rpb24oIGksIGl0ZW0gKSB7XG5cdFx0XHQvLyBjb25zb2xlLmxvZygkKCBpdGVtICkudGV4dCgpLnRyaW0oKSk7XG5cdFx0XHRyZXR1cm4gJGNsb25lLnRleHQoKS50cmltKCkgPT09ICQoIGl0ZW0gKS50ZXh0KCkudHJpbSgpO1xuXHRcdH0pLmZpcnN0KCk7XG5cblx0Ly8gRmluZCB0aGUgcG9zaXRpb24gb2YgdGhlIG9yaWdpbmFsIHRva2VuXG5cdC8vIHZhciBvcmlnaW5hbFBvc2l0aW9uID0ge1xuXHQvLyBcdHRvcDogJG1hdGNoLm9mZnNldCgpLnRvcCxcblx0Ly8gXHRsZWZ0OiAkbWF0Y2gub2Zmc2V0KCkubGVmdFxuXHQvLyB9O1xuXG5cdC8vIENoYW5nZSB0aGUgY2xvbmUgdG8gcG9zaXRpb24gZml4ZWRcblx0Ly8gYW5kIGFkZCB0byBjb2x1bW5zIGNvbnRhaW5lclxuXHQkKCcubGF5b3V0LWNvbHVtbnMnKS5hcHBlbmQoICRjbG9uZSApO1xuXHQkY2xvbmUuY3NzKHtcblx0XHRwb3NpdGlvbjogJ2ZpeGVkJyxcblx0XHR0b3A6ICRoZWxwZXIub2Zmc2V0KCkudG9wLFxuXHRcdGxlZnQ6ICRoZWxwZXIub2Zmc2V0KCkubGVmdFxuXHR9KTtcblxuXHQvLyAkY2xvbmUuYXBwZW5kVG8oJy5sYXlvdXQtY29sdW1ucycpO1xuXG5cdCRjbG9uZS52ZWxvY2l0eSh7XG5cdFx0dHJhbnNsYXRlWDogJGl0ZW0ub2Zmc2V0KCkubGVmdCAtICRjbG9uZS5vZmZzZXQoKS5sZWZ0LFxuXHRcdHRyYW5zbGF0ZVk6ICRpdGVtLm9mZnNldCgpLnRvcCAtICRjbG9uZS5vZmZzZXQoKS50b3Bcblx0fSwge1xuXHRcdGR1cmF0aW9uOiAyMDAsXG5cdFx0Y29tcGxldGU6IHRoaXMuX29uRHJhZ2dpbmdWYWx1ZVJlbW92ZWQuYmluZCggdGhpcyApXG5cdH0pO1xufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5fb25EcmFnZ2luZ1ZhbHVlUmVtb3ZlZCA9IGZ1bmN0aW9uICggZWxlbWVudHMgKSB7XG5cdFxuXHQvLyBSZW1vdmUgdGhlIGNsb25lIGZyb20gdGhlIERPTVxuXHQkKCBlbGVtZW50c1sgMCBdICkucmVtb3ZlKCk7XG5cblx0Ly8gRW1pdCBhIGNoYW5nZSBldmVudFxuXHR0aGlzLl9lbWl0Q2hhbmdlKCk7XG5cbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuX2VtaXRDaGFuZ2UgPSBmdW5jdGlvbigpIHtcblx0XG5cdC8vIEVtaXQgYSBjaGFuZ2UgZXZlbnRcblx0Ly8gdmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCAnQ29sdW1ucy5UZW1wbGF0ZVZpZXcuRGlkQ2hhbmdlJywge1xuXHQvLyB0ZW1wbGF0ZVZpZXc6IFx0dGhpc1xuXHQvLyB9KTtcblx0Ly8gdmFyIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdC8vIGV2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5UZW1wbGF0ZVZpZXcuRGlkQ2hhbmdlJywgZmFsc2UsIGZhbHNlLCB7XG5cdC8vIFx0dGVtcGxhdGVWaWV3OiBcdHRoaXNcblx0Ly8gfSk7XG5cdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuXG5cdENvbHVtbnNFdmVudC5zZW5kKCdDb2x1bW5zLlRlbXBsYXRlVmlldy5EaWRDaGFuZ2UnLCB7XG5cdFx0dGVtcGxhdGVWaWV3OiB0aGlzXG5cdH0pO1xufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5fZW1pdFJlbmRlciA9IGZ1bmN0aW9uKCkge1xuXHRDb2x1bW5zRXZlbnQuc2VuZCgnQ29sdW1ucy5UZW1wbGF0ZVZpZXcuRGlkUmVuZGVyJywge1xuXHRcdHRlbXBsYXRlVmlldzogdGhpc1xuXHR9KTtcbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuX3NldHVwRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBMaXN0ZW4gdG8gdGhlIHRhYmxlIHVwbG9hZCBldmVudFxuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLlRhYmxlLkRpZFVwbG9hZFdpdGhTdWNjZXNzJywgdGhpcy5fb25UZW1wbGF0ZVVwbG9hZC5iaW5kKCB0aGlzICkgKTtcbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuX3NldHVwVGVtcGxhdGVFdmVudHMgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBMaXN0ZW4gdG8gZHJhZyBldmVudHMgZm9yIGl0ZW1zXG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuSXRlbVZpZXcuSXRlbURpZEJlZ2luRHJhZycsIHRoaXMuX29uSXRlbURpZEJlZ2luRHJhZy5iaW5kKCB0aGlzICkpO1xuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLkl0ZW1WaWV3Lkl0ZW1EaWRFbmREcmFnJywgdGhpcy5fb25JdGVtRGlkRW5kRHJhZy5iaW5kKCB0aGlzICkpO1xuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLkl0ZW1WaWV3Lkl0ZW1EaWREcmFnJywgdGhpcy5fb25JdGVtRGlkRHJhZy5iaW5kKCB0aGlzICkpO1xuXG5cdC8vIExpc3RlbiB0byBkcmFnIGV2ZW50cyBmb3IgdmFsdWVzXG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuVGVtcGxhdGVWYWx1ZVZpZXcuVmFsdWVEaWRCZWdpbkRyYWdXaXRoSXRlbScsIHRoaXMuX29uVmFsdWVEaWRCZWdpbkRyYWcuYmluZCggdGhpcyApKTtcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5UZW1wbGF0ZVZhbHVlVmlldy5WYWx1ZURpZEVuZERyYWdXaXRoSXRlbScsIHRoaXMuX29uVmFsdWVEaWRFbmREcmFnLmJpbmQoIHRoaXMgKSk7XG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuVGVtcGxhdGVWYWx1ZVZpZXcuVmFsdWVEaWREcmFnV2l0aEl0ZW0nLCB0aGlzLl9vblZhbHVlRGlkRHJhZy5iaW5kKCB0aGlzICkpO1xuXG5cdC8vIExpc3RlbiB0byBkcm9wIGV2ZW50cyBmb3IgZ3JvdXBzXG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuVGVtcGxhdGVHcm91cFZpZXcuR3JvdXBEaWRCZWdpbkRyb3BPdmVyV2l0aFZhbHVlVmlldycsIHRoaXMuX29uR3JvdXBEaWRCZWdpbkRyb3BPdmVyLmJpbmQoIHRoaXMgKSk7XG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuVGVtcGxhdGVHcm91cFZpZXcuR3JvdXBEaWRFbmREcm9wT3ZlcldpdGhWYWx1ZVZpZXcnLCB0aGlzLl9vbkdyb3VwRGlkRW5kRHJvcE92ZXIuYmluZCggdGhpcyApKTtcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5UZW1wbGF0ZUdyb3VwVmlldy5Hcm91cERpZERyb3BXaXRoVmFsdWVWaWV3JywgdGhpcy5fb25Hcm91cERpZERyb3AuYmluZCggdGhpcyApKTtcblxuXHQvLyBMaXN0ZW4gdG8gZW1iZWRkZWQgdGFibGUgZXZlbnRzXG5cdENvbHVtbnNFdmVudC5vbignQ29sdW1uc1RhYmxlRGlkUmVuZGVyRGF0YScsIHRoaXMuX29uVGFibGVEaWRSZW5kZXJEYXRhLmJpbmQoIHRoaXMgKSApO1xuXHRDb2x1bW5zRXZlbnQub24oJ0NvbHVtbnNUYWJsZURpZFNjcm9sbCcsIHRoaXMuX29uVGFibGVEaWRTY3JvbGwuYmluZCggdGhpcyApICk7XG5cdENvbHVtbnNFdmVudC5vbignQ29sdW1uc1RhYmxlV2lsbEV4cGFuZCcsIHRoaXMuX29uVGFibGVXaWxsRXhwYW5kLmJpbmQoIHRoaXMgKSApO1xuXHRDb2x1bW5zRXZlbnQub24oJ0NvbHVtbnNUYWJsZURpZEV4cGFuZCcsIHRoaXMuX29uVGFibGVEaWRFeHBhbmQuYmluZCggdGhpcyApICk7XG5cdENvbHVtbnNFdmVudC5vbignQ29sdW1uc1RhYmxlRGlkQ29sbGFwc2UnLCB0aGlzLl9vblRhYmxlRGlkQ29sbGFwc2UuYmluZCggdGhpcyApICk7XG5cblx0Ly8gTGlzdGVuIGZvciB1cGRhdGVzIHRvIHZhbHVlcyBhbmQgZ3JvdXBzXG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuVGVtcGxhdGVWYWx1ZVZpZXcuRGlkQ2hhbmdlJywgdGhpcy5fb25UZW1wbGF0ZVZpZXdEaWRDaGFuZ2UuYmluZCggdGhpcyApKTtcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5UZW1wbGF0ZUdyb3VwVmlldy5EaWRDaGFuZ2UnLCB0aGlzLl9vblRlbXBsYXRlVmlld0RpZENoYW5nZS5iaW5kKCB0aGlzICkpO1xufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5fb25UZW1wbGF0ZVZpZXdEaWRDaGFuZ2UgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdHRoaXMuX2VtaXRDaGFuZ2UoKTtcbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuX29uVGVtcGxhdGVVcGxvYWQgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdHRoaXMudGFibGUgPSBkYXRhLnRhYmxlO1xuXHR0aGlzLmxheW91dCA9IGRhdGEudGFibGUubGF5b3V0O1xuXHR0aGlzLl9yZW5kZXJUZW1wbGF0ZSgpO1xufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5fb25UYWJsZURpZFJlbmRlckRhdGEgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdHRoaXMuJHRlbXBsYXRlLmZpbmQoJy5sYXlvdXQtdGVtcGxhdGUtcm93JykuY3NzKHtcblx0XHRoZWlnaHQ6IGRhdGEudGFibGUudGFsbGVzdFJvd0hlaWdodCgpXG5cdH0pO1xufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5fb25UYWJsZVdpbGxFeHBhbmQgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cblx0Ly8gTW92ZSB0aGUgdGVtcGxhdGUgZG93biBiZWxvdyB0aGUgaGVhZGVyXG5cdHRoaXMuJHRlbXBsYXRlLnZlbG9jaXR5KHtcblx0XHR0cmFuc2xhdGVZOiAwXG5cdH0sIHtcblx0XHRkdXJhdGlvbjogNDAwXG5cdH0pO1xufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5fb25UYWJsZURpZEV4cGFuZCA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblxuXHR0aGlzLiRwcmV2aWV3LmFkZENsYXNzKCBFWFBBTkRFRF9DTEFTUyApO1xufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5fb25UYWJsZURpZENvbGxhcHNlID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXG5cdHRoaXMuJHByZXZpZXcucmVtb3ZlQ2xhc3MoIEVYUEFOREVEX0NMQVNTICk7XG59O1xuXHRcblRlbXBsYXRlVmlldy5wcm90b3R5cGUuX29uVGFibGVEaWRTY3JvbGwgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cblx0Ly8gTW92ZSB0aGUgdGVtcGxhdGUgdXAgdW50aWwgaXQgaGl0cyB0aGUgaGVhZGVyXG5cdHZhciBtaW5TY3JvbGwgPSAtMjQsXG5cdFx0bWF4U2Nyb2xsID0gMCxcblx0XHRzY3JvbGwgPSAtJCgnLmNvbHVtbnMtdGFibGUtY29udGFpbmVyJykuc2Nyb2xsVG9wKCk7XG5cblx0Ly8gTWFrZSBzdXJlIHRoZSBzY3JvbGwgaXMgd2l0aGluIGJvdW5kc1xuXHRzY3JvbGwgPSBzY3JvbGwgPCBtaW5TY3JvbGwgPyBtaW5TY3JvbGwgOiBzY3JvbGw7XG5cdHNjcm9sbCA9IHNjcm9sbCA+IG1heFNjcm9sbCA/IG1heFNjcm9sbCA6IHNjcm9sbDtcblxuXHQvLyBBZGp1c3QgdGhlIHRlbXBsYXRlXG5cdCQuVmVsb2NpdHkuaG9vayggdGhpcy4kdGVtcGxhdGUsIFwidHJhbnNsYXRlWVwiLCBzY3JvbGwgKyBcInB4XCIgKTtcbn07XG4gXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLl9vbkl0ZW1EaWRCZWdpbkRyYWcgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdHRoaXMuZHJhZ2dpbmdJdGVtID0gZGF0YS5pdGVtLml0ZW07XG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLl9vbkl0ZW1EaWRFbmREcmFnID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXHR0aGlzLmRyYWdnaW5nSXRlbSA9IHVuZGVmaW5lZDtcblx0dGhpcy5yZW1vdmVQbGFjZWhvbGRlcnMoKTtcbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuX29uSXRlbURpZERyYWcgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdGlmICggdGhpcy5kcm9wcGFibGVJdGVtcy5sZW5ndGggKSB7XG5cdFx0dGhpcy5yZW1vdmVQbGFjZWhvbGRlcnMoKTtcblx0XHR0aGlzLnBvc2l0aW9uRHJvcEZvckRyYWdFdmVudEluUGFyZW50V2l0aFBsYWNlaG9sZGVyKCBkYXRhLmV2ZW50LCB0aGlzLmRyb3BwYWJsZUl0ZW1zWyB0aGlzLmRyb3BwYWJsZUl0ZW1zLmxlbmd0aCAtIDEgXS4kZ3JvdXAsIHRydWUgKTtcblx0fVxufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5fb25WYWx1ZURpZEJlZ2luRHJhZyA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblx0dGhpcy5kcmFnZ2luZ0l0ZW0gPSBkYXRhLnZhbHVlVmlldy5pdGVtO1xuXHR0aGlzLmRpc3NvbHZlU2luZ2xlVmFsdWVHcm91cHMoKTtcbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuX29uVmFsdWVEaWRFbmREcmFnID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXHQvLyBpZiAoICF0aGlzLmRyb3BwYWJsZUl0ZW1zLmxlbmd0aCApIHtcblx0aWYgKCAhVGVtcGxhdGVWaWV3LmdldFZhbHVlRm9ySXRlbSggZGF0YS52YWx1ZVZpZXcuaXRlbSApICkge1xuXHRcdHRoaXMucmVtb3ZlRHJhZ2dpbmdWYWx1ZSgpO1xuXHRcdC8vIHRoaXMuX2VtaXRDaGFuZ2UoKTtcblx0fVxufVxuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLl9vblZhbHVlRGlkRHJhZyA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblx0aWYgKCB0aGlzLmRyb3BwYWJsZUl0ZW1zLmxlbmd0aCApIHtcblx0XHR0aGlzLnJlbW92ZVBsYWNlaG9sZGVycygpO1xuXHRcdHRoaXMucG9zaXRpb25Ecm9wRm9yRHJhZ0V2ZW50SW5QYXJlbnRXaXRoUGxhY2Vob2xkZXIoIGRhdGEuZXZlbnQsIHRoaXMuZHJvcHBhYmxlSXRlbXNbIHRoaXMuZHJvcHBhYmxlSXRlbXMubGVuZ3RoIC0gMSBdLiRncm91cCAsIHRydWUgKTtcblx0fVxufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5fb25Hcm91cERpZEJlZ2luRHJvcE92ZXIgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdGlmICggdGhpcy5kcm9wcGFibGVJdGVtcy5pbmRleE9mKCBkYXRhLmdyb3VwVmlldyApID09IC0xICkge1xuXHRcdHRoaXMuZHJvcHBhYmxlSXRlbXMucHVzaCggZGF0YS5ncm91cFZpZXcgKTtcblx0fVxuXG5cdCQoIERSQUdHSU5HX0lURU1fU0VMRUNUT1IgKS5hZGRDbGFzcyggRFJPUFBBQkxFX0NMQVNTICk7XG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLl9vbkdyb3VwRGlkRW5kRHJvcE92ZXIgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdHZhciBncm91cFZpZXcgPSBkYXRhLmdyb3VwVmlldztcblxuXHRncm91cFZpZXcucmVtb3ZlUGxhY2Vob2xkZXJzKCk7XG5cdHRoaXMuZHJvcHBhYmxlSXRlbXMuc3BsaWNlKCB0aGlzLmRyb3BwYWJsZUl0ZW1zLmluZGV4T2YoIGdyb3VwVmlldyApLCAxICk7XG5cblx0JCggRFJBR0dJTkdfSVRFTV9TRUxFQ1RPUiApLnJlbW92ZUNsYXNzKCBEUk9QUEFCTEVfQ0xBU1MgKTtcbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuX29uR3JvdXBEaWREcm9wID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXHR2YXIgZ3JvdXBWaWV3ID0gZGF0YS5ncm91cFZpZXc7XG5cblx0Ly8gRG9uJ3QgZG8gYW55dGhpbmcgaWYgdGhpcyBncm91cCBpc24ndCB0aGUgbW9zdCByZWNlbnRseSBob3ZlcmVkIG92ZXJcblx0Ly8gb2YgaWYgdGhlcmUgYXJlIGN1cnJlbnRseSBubyBob3ZlcmVkIGdyb3VwcyAod2hpY2ggc2hvdWxkIG5ldmVyIGJlIHRoZSBjYXNlKVxuXHRpZiAoICF0aGlzLmRyb3BwYWJsZUl0ZW1zLmxlbmd0aCB8fCB0aGlzLmRyb3BwYWJsZUl0ZW1zWyB0aGlzLmRyb3BwYWJsZUl0ZW1zLmxlbmd0aCAtIDEgXSAhPT0gZ3JvdXBWaWV3ICkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vIE90aGVyd2lzZSwgY2xlYXIgYWxsIHRoZSBncm91cCdzIHBsYWNlaG9sZGVyc1xuXHRncm91cFZpZXcucmVtb3ZlUGxhY2Vob2xkZXJzKCk7XG5cblx0Ly8gQW5kIGZpbmFsbHkgcG9zaXRpb24gdGhlIG5ldyBpdGVtIGluIHRoZSB0ZW1wbGF0ZVxuXHR0aGlzLnBvc2l0aW9uRHJvcEZvckRyYWdFdmVudEluUGFyZW50V2l0aFBsYWNlaG9sZGVyKCBkYXRhLmV2ZW50LCB0aGlzLmRyb3BwYWJsZUl0ZW1zWyB0aGlzLmRyb3BwYWJsZUl0ZW1zLmxlbmd0aCAtIDEgXS4kZ3JvdXAgLCBmYWxzZSApXG5cblx0Ly8gRW1wdHkgdGhlIGRyb3BwYWJsZSBpdGVtcyBhcnJheVxuXHR0aGlzLmRyb3BwYWJsZUl0ZW1zID0gW107XG5cbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuZGltZW5zaW9uc0ZvclZhbHVlID0gZnVuY3Rpb24oICR2YWx1ZSwgZHJhZ1RocmVzaG9sZCwgYnVmZmVyICkge1xuXHR2YXIgZHJhZ1RocmVzaG9sZFx0PSBkcmFnVGhyZXNob2xkIHx8IDAuNSxcblx0XHRidWZmZXIgXHRcdFx0PSBidWZmZXIgfHwgMC4yLFxuXHRcdGRpcmVjdGlvbiBcdFx0PSAkdmFsdWUucGFyZW50KCkuZGF0YSgnZmxleC1kaXJlY3Rpb24nKSB8fCAncm93Jyxcblx0XHRidWZmZXJYXHRcdFx0PSBkaXJlY3Rpb24gPT09ICdyb3cnID8gYnVmZmVyIDogMCxcblx0XHRidWZmZXJZXHRcdFx0PSBkaXJlY3Rpb24gPT09ICdjb2x1bW4nID8gYnVmZmVyIDogMDtcblxuXHRyZXR1cm4ge1xuXHRcdHRvcDogXHRcdFx0JHZhbHVlLm9mZnNldCgpLnRvcCxcblx0XHRsZWZ0OiBcdFx0XHQkdmFsdWUub2Zmc2V0KCkubGVmdCxcblx0XHRib3R0b206IFx0XHQkdmFsdWUub2Zmc2V0KCkudG9wICsgJHZhbHVlLmhlaWdodCgpLFxuXHRcdHJpZ2h0OiBcdFx0XHQkdmFsdWUub2Zmc2V0KCkubGVmdCArICR2YWx1ZS53aWR0aCgpLFxuXG5cdFx0bWlkZGxlWDogXHRcdCR2YWx1ZS5vZmZzZXQoKS5sZWZ0ICsgKCAkdmFsdWUud2lkdGgoKSAvIDIgKSxcblx0XHRtaWRkbGVZOiBcdFx0JHZhbHVlLm9mZnNldCgpLnRvcCArICggJHZhbHVlLmhlaWdodCgpIC8gMiApLFxuXG5cdFx0ZHJhZ01pZGRsZVg6IFx0JHZhbHVlLm9mZnNldCgpLmxlZnQgKyAoICR2YWx1ZS53aWR0aCgpICogZHJhZ1RocmVzaG9sZCApLFxuXHRcdGRyYWdNaWRkbGVZOiBcdCR2YWx1ZS5vZmZzZXQoKS50b3AgKyAoICR2YWx1ZS5oZWlnaHQoKSAqIGRyYWdUaHJlc2hvbGQgKSxcblx0XHRkcmFnTWlkZGxlOiBcdGRpcmVjdGlvbiA9PT0gJ3JvdycgPyBcdCR2YWx1ZS5vZmZzZXQoKS5sZWZ0ICsgKCAkdmFsdWUud2lkdGgoKSAqIGRyYWdUaHJlc2hvbGQgKSA6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQkdmFsdWUub2Zmc2V0KCkudG9wICsgKCAkdmFsdWUuaGVpZ2h0KCkgKiBkcmFnVGhyZXNob2xkICksXG5cblx0XHRidWZmZXJUb3A6IFx0XHQkdmFsdWUub2Zmc2V0KCkudG9wICsgKCAkdmFsdWUuaGVpZ2h0KCkgKiBidWZmZXJZICksXG5cdFx0YnVmZmVyTGVmdDogXHQkdmFsdWUub2Zmc2V0KCkubGVmdCArICggJHZhbHVlLndpZHRoKCkgKiBidWZmZXJYICksXG5cdFx0YnVmZmVyQm90dG9tOiBcdCR2YWx1ZS5vZmZzZXQoKS50b3AgKyAkdmFsdWUuaGVpZ2h0KCkgLSAoICR2YWx1ZS5oZWlnaHQoKSAqIGJ1ZmZlclkgKSxcblx0XHRidWZmZXJSaWdodDogXHQkdmFsdWUub2Zmc2V0KCkubGVmdCArICR2YWx1ZS53aWR0aCgpIC0gKCAkdmFsdWUud2lkdGgoKSAqIGJ1ZmZlclggKVxuXHR9O1xufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5pc0ludGVyc2VjdGVkID0gZnVuY3Rpb24oIHZhbHVlcywgZXZlbnQgKSB7XG5cblx0Ly8gQWNjb3VudCBmb3IgdGhlIGxheW91dCdzIHNjcm9sbCBvZmZzZXQsIHdoaWNoIGNhbiBtZXNzIHVwIHRoZSBjYWxjdWxhdGlvbnNcblx0dmFyIHNjcm9sbE9mZnNldCBcdD0gcGFyc2VJbnQoJC5WZWxvY2l0eS5ob29rKCQoXCIjbGF5b3V0XCIpLCBcInRyYW5zbGF0ZVlcIikpIHx8IDAsXG5cdFx0ZHJhZ09mZnNldFggXHQ9IGV2ZW50LmNsaWVudFgsXG5cdFx0ZHJhZ09mZnNldFlcdFx0PSBldmVudC5jbGllbnRZO1xuXG5cdHJldHVybiBcdHZhbHVlcy5idWZmZXJMZWZ0IFx0XHRcdFx0XHQ8PSBkcmFnT2Zmc2V0WCAmJlxuXHRcdFx0dmFsdWVzLmJ1ZmZlclJpZ2h0IFx0XHRcdFx0XHQ+PSBkcmFnT2Zmc2V0WCAmJlxuXHRcdFx0dmFsdWVzLmJ1ZmZlclRvcCAtIHNjcm9sbE9mZnNldCBcdDw9IGRyYWdPZmZzZXRZICYmXG5cdFx0XHR2YWx1ZXMuYnVmZmVyQm90dG9tIC0gc2Nyb2xsT2Zmc2V0IFx0Pj0gZHJhZ09mZnNldFk7XG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLmlzUHJldmlvdXMgPSBmdW5jdGlvbiggdmFsdWVzLCBkcmFnUG9pbnQgKSB7XG5cdHJldHVybiBkcmFnUG9pbnQgPj0gdmFsdWVzLmRyYWdNaWRkbGU7XG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLndyYXBWYWx1ZVdpdGhHcm91cCA9IGZ1bmN0aW9uKCAkdmFsdWUsIHBsYWNlaG9sZGVyICkge1xuXHRcblx0Ly8gTWFrZSBzdXJlIHRoZSBncm91cCBoYXMgdGhlIG9wcG9zaXRlIGRpcmVjdGlvbiBvZiBpdHMgcGFyZW50XG5cdHZhciBkaXJlY3Rpb24gXHQ9ICR2YWx1ZS5wYXJlbnQoKS5kYXRhKCdmbGV4LWRpcmVjdGlvbicpID09PSAnY29sdW1uJyA/ICdyb3cnIDogJ2NvbHVtbic7XG5cdHZhciBncm91cCBcdFx0PSBuZXcgVGVtcGxhdGVHcm91cFZpZXcoe1xuXHRcdHBsYWNlaG9sZGVyOiBwbGFjZWhvbGRlcixcblx0XHRsYXlvdXQ6IFt7XG5cdFx0XHRwcm9wZXJ0eTogIFx0J2ZsZXgtZGlyZWN0aW9uJyxcblx0XHRcdHZhbHVlOiBcdFx0IGRpcmVjdGlvblxuXHRcdH1dXG5cdH0pO1xuXG5cdHZhciAkZ3JvdXAgPSBncm91cC5yZW5kZXIoKTtcblxuXHQvLyBGaXJzdCBhZGQgdGhlIGdyb3VwIHRvIHRoZSBET00gYmVmb3JlIHRoZSB2YWx1ZVxuXHQvLyBhbmQgdGhlbiBtb3ZlIHRoZSB2YWx1ZSBpbnRvIHRoZSBncm91cC5cblx0Ly8gV2UgZG8gdGhpcyBpbnN0ZWFkIG9mIGpxdWVyeSdzIHdyYXAgYmVjYXVzZSB3cmFwIGluc2VydHMgYSBjbG9uZVxuXHQvLyBhbmQgd2UgbmVlZCB0aGUgcHJldmlvdXNseSByZW5kZXJlZCBvYmplY3QgaXRzZWxmIGluIHRoZSBET00uXG5cdCRncm91cC5pbnNlcnRCZWZvcmUoICR2YWx1ZSApO1xuXHQkZ3JvdXAuYXBwZW5kKCAkdmFsdWUgKTtcblxuXHQvLyBXcmFwIHRoZSB2YWx1ZSB3aXRoIHRoZSBuZXcgZ3JvdXBcblx0Ly8gJHZhbHVlLndyYXAoICRncm91cCApO1xuXHQvLyAkZ3JvdXAuYXBwZW5kKCAkdmFsdWUgKTtcblxuXHRpZiAoICFwbGFjZWhvbGRlciApIHtcblx0XHRUZW1wbGF0ZVZpZXcuZ3JvdXBzLnB1c2goIGdyb3VwICk7XG5cdH1cblxuXHRcblx0Ly8gcmV0dXJuICR2YWx1ZS53cmFwKCAkZ3JvdXAgKTtcbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuaW5zZXJ0RHJvcEJlZm9yZUVsZW1lbnRJblBhcmVudFdpdGhQbGFjZWhvbGRlciA9IGZ1bmN0aW9uKCBpdGVtLCAkcHJldmlvdXMsICRwYXJlbnQsIHBsYWNlaG9sZGVyICkge1xuXG5cdC8vIENyZWF0ZSBhIG5ldyB2YWx1ZSB2aWV3IHdpdGggdGhlIGFwcHJvcHJpYXRlIHBsYWNlaG9sZGVyIHN0YXR1c1xuXHR2YXIgdmFsdWVWaWV3IFx0PSBuZXcgVGVtcGxhdGVWYWx1ZVZpZXcoIGl0ZW0sIHBsYWNlaG9sZGVyICksXG5cdFx0JHZhbHVlIFx0XHQ9IHZhbHVlVmlldy5yZW5kZXIoKTtcblxuXHQvLyBJZiB0aGVyZSBpcyBhIHByZXZpb3VzIGl0ZW0sIGluc2VydCB0aGUgbmV3IGl0ZW0ganVzdCBhZnRlciBpdFxuXHQvLyBPdGhlcndpc2UganVzdCBhZGQgdGhlIGl0ZW0gdG8gdGhlIHBhcmVudCBhcyB0aGUgZmlyc3QgY2hpbGRcblx0aWYgKCAkcHJldmlvdXMgKSB7XG5cdFx0JHByZXZpb3VzLmFmdGVyKCAkdmFsdWUgKTtcblx0fSBlbHNlIHtcdFxuXHRcdCRwYXJlbnQucHJlcGVuZCggJHZhbHVlICk7XG5cdH1cblxuXHRpZiAoICFwbGFjZWhvbGRlciApIHtcblx0XHR0aGlzLl9lbWl0Q2hhbmdlKCk7XG5cdH0gXG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLnBvc2l0aW9uRHJvcEZvckRyYWdFdmVudEluUGFyZW50V2l0aFBsYWNlaG9sZGVyID0gZnVuY3Rpb24oIGV2ZW50LCAkcGFyZW50LCBwbGFjZWhvbGRlciApIHtcblx0XHRcblx0XHQvLyBNYWtlIHN1cmUgd2UgaGF2ZSBhIHBhcmVudFxuXHRcdGlmICggISRwYXJlbnQgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gU2V0IHVwIG5lY2Vzc2FyeSB2YXJpYWJsZXMuIFRoZW4sXG5cdFx0Ly8gR2V0IGFsbCB0aGUgaXRlbXMgaW4gdGhlIGdyb3VwXG5cdFx0Ly8gYW5kIGZpbHRlciBvdXQgdGhlIHBsYWNlaG9sZGVyc1xuXHRcdC8vIGFuZCB0aGUgZHJhZ2dpbmcgaXRlbVxuXHRcdHZhciBkaW1lbnNpb25zLFxuXHRcdFx0ZHJhZ1BvaW50LFxuXHRcdFx0JHByZXZpb3VzQ2hpbGQsXG5cdFx0XHQkY2hpbGQsXG5cdFx0XHQkY2hpbGRyZW4gPSAkcGFyZW50LmNoaWxkcmVuKClcblx0XHRcdFx0XHRcdC5ub3QoJy5wbGFjZWhvbGRlcicpXG5cdFx0XHRcdFx0XHQubm90KCcuaW5hY3RpdmUnKVxuXHRcdFx0XHRcdFx0Lm5vdCgnLnVpLWRyYWdnYWJsZS1kcmFnZ2luZycpO1xuXG5cdFx0Ly8gSWYgdGhlcmUgYXJlbid0IGFueSBjaGlsZHJlbixcblx0XHQvLyBqdXN0IGluc2VydCB0aGUgcGxhY2Vob2xkZXIgYXQgdGhlIGJlZ2lubmluZ1xuXHRcdGlmICggISRjaGlsZHJlbi5sZW5ndGggKSB7XG5cdFx0XHR0aGlzLmluc2VydERyb3BCZWZvcmVFbGVtZW50SW5QYXJlbnRXaXRoUGxhY2Vob2xkZXIoIHRoaXMuZHJhZ2dpbmdJdGVtLCBudWxsLCAkcGFyZW50LCBwbGFjZWhvbGRlcik7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0JGNoaWxkcmVuLmVhY2goZnVuY3Rpb24oIGksIGNoaWxkICkge1xuXHRcdFx0JGNoaWxkID0gJCggY2hpbGQgKTtcblxuXHRcdFx0Ly8gQXJlIHdlIGludGVyc2VjdGluZyBkaXJlY3RseSB3aXRoIHRoZSBjaGlsZD9cblx0XHRcdGRpbWVuc2lvbnMgPSB0aGlzLmRpbWVuc2lvbnNGb3JWYWx1ZSggJGNoaWxkICk7XG5cdFx0XHRpZiAoIHRoaXMuaXNJbnRlcnNlY3RlZCggZGltZW5zaW9ucywgZXZlbnQgKSApIHtcblx0XHRcdFx0Ly8gUmVzZXQgdGhlIHByZXZpb3VzIGNoaWxkXG5cdFx0XHRcdCRwcmV2aW91c0NoaWxkID0gbnVsbDtcblxuXHRcdFx0XHQvLyBXcmFwIHRoZSB0d28gaXRlbXMgaW4gYSBncm91cFxuXHRcdFx0XHQvLyBhbmQgbWFrZSB0aGUgbmV3IGdyb3VwIHRoZSBuZXcgcGFyZW50XG5cdFx0XHRcdHRoaXMud3JhcFZhbHVlV2l0aEdyb3VwKCAkY2hpbGQsIHBsYWNlaG9sZGVyICk7XG5cdFx0XHRcdCRwYXJlbnQgPSAkY2hpbGQucGFyZW50KCk7XG5cblx0XHRcdFx0Ly8gRGV0ZXJtaW5lIHdoZXRoZXIgdGhlIG5ldyB2YWx1ZSBnb2VzIGZpcnN0IG9yIHNlY29uZCBpbiB0aGUgbmV3IGdyb3VwXG5cdFx0XHRcdC8vIHVzaW5nIG5ldyBkaW1lbnNpb25zIGFzIGEgcmVzdWx0IG9mIHRoZSBuZXcgZ3JvdXBcblx0XHRcdFx0ZGltZW5zaW9ucyA9IHRoaXMuZGltZW5zaW9uc0ZvclZhbHVlKCAkY2hpbGQgKTtcblx0XHRcdFx0ZHJhZ1BvaW50ID0gJHBhcmVudC5kYXRhKCdmbGV4LWRpcmVjdGlvbicpID09ICdjb2x1bW4nID8gZXZlbnQuY2xpZW50WSA6IGV2ZW50LmNsaWVudFg7XG5cdFx0XHRcdGlmICggdGhpcy5pc1ByZXZpb3VzKCBkaW1lbnNpb25zLCBkcmFnUG9pbnQpICkge1xuXHRcdFx0XHRcdCRwcmV2aW91c0NoaWxkID0gJGNoaWxkO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIFByZXBhcmUgZGltZW5zaW9ucyBmb3IgZGV0ZXJtaW5pbmcgd2hpY2ggdmFsdWVzIGdvZXMgZmlyc3QgaW4gdGhlIGdyb3VwXG5cdFx0XHRcdGRpbWVuc2lvbnMgPSB0aGlzLmRpbWVuc2lvbnNGb3JWYWx1ZSggJGNoaWxkICk7XG5cdFx0XHRcdGRyYWdQb2ludCA9ICRwYXJlbnQuZGF0YSgnZmxleC1kaXJlY3Rpb24nKSA9PSAnY29sdW1uJyA/IGV2ZW50LmNsaWVudFkgOiBldmVudC5jbGllbnRYO1xuXHRcdFx0XHRpZiAoIHRoaXMuaXNQcmV2aW91cyggZGltZW5zaW9ucywgZHJhZ1BvaW50KSApIHtcblx0XHRcdFx0XHQkcHJldmlvdXNDaGlsZCA9ICRjaGlsZDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0fS5iaW5kKCB0aGlzICkpO1xuXG5cdFx0Ly8gQWRkIHRoZSBuZXcgaXRlbSB0byB0aGUgbmV3IGdyb3VwXG5cdFx0dGhpcy5pbnNlcnREcm9wQmVmb3JlRWxlbWVudEluUGFyZW50V2l0aFBsYWNlaG9sZGVyKCB0aGlzLmRyYWdnaW5nSXRlbSwgJHByZXZpb3VzQ2hpbGQsICRwYXJlbnQsIHBsYWNlaG9sZGVyICk7XG5cdFx0XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRlbXBsYXRlVmlldzsiLCJ2YXIgQ29sdW1uc0V2ZW50ID0gcmVxdWlyZSgnLi4vbW9kZWxzL0NvbHVtbnNFdmVudC5qcycpO1xuXG52YXIgTUFYX1JPV1MgPSAyMCxcblx0VVBMT0FEX0JVVFRPTl9TRUxFQ1RPUiA9ICcuY29sdW1ucy11cGxvYWQtYnV0dG9uJztcblxuZnVuY3Rpb24gVXBsb2FkVmlldygpIHtcblx0dGhpcy5wYXJzZWRSb3dzID0gMDtcbn1cblxuVXBsb2FkVmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oKSB7XG5cblx0dGhpcy4kdXBsb2FkID0gJCgnI3VwbG9hZCcpO1xuXG5cdHRoaXMuX3NldHVwRXZlbnRMaXN0ZW5lcnMoKTtcblx0cmV0dXJuIHRoaXMuJHVwbG9hZDtcbn07XG5cblVwbG9hZFZpZXcucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbigpIHtcblx0dGhpcy4kdXBsb2FkLnZlbG9jaXR5KHtcblx0XHRvcGFjaXR5OiAxXG5cdH0sIHtcblx0XHRkdXJhdGlvbjogMjAwLFxuXHRcdGVhc2luZzogJ2Vhc2Utb3V0Jyxcblx0XHRiZWdpbjogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLiR1cGxvYWQuYWRkQ2xhc3MoJ2FuaW1hdGluZycpO1xuXHRcdH0uYmluZCggdGhpcyApLFxuXHRcdGNvbXBsZXRlOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuJHVwbG9hZC5yZW1vdmVDbGFzcygnYW5pbWF0aW5nJyk7XG5cdFx0XHR0aGlzLiR1cGxvYWQuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdH0uYmluZCggdGhpcyApXG5cdH0pO1xufTtcblxuVXBsb2FkVmlldy5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLiR1cGxvYWQudmVsb2NpdHkoe1xuXHRcdG9wYWNpdHk6IDBcblx0fSwge1xuXHRcdGR1cmF0aW9uOiAyMDAsXG5cdFx0ZWFzaW5nOiAnZWFzZS1pbicsXG5cdFx0YmVnaW46IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy4kdXBsb2FkLmFkZENsYXNzKCdhbmltYXRpbmcnKTtcblx0XHR9LmJpbmQoIHRoaXMgKSxcblx0XHRjb21wbGV0ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLiR1cGxvYWQucmVtb3ZlQ2xhc3MoJ2FuaW1hdGluZycpO1xuXHRcdFx0dGhpcy4kdXBsb2FkLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHR9LmJpbmQoIHRoaXMgKVxuXHR9KTtcbn07XG5cblVwbG9hZFZpZXcucHJvdG90eXBlLl9zZXRMb2FkaW5nID0gZnVuY3Rpb24oIGxvYWRpbmcsIG1lc3NhZ2UgKSB7XG5cdHZhciAkYnV0dG9uID0gdGhpcy4kdXBsb2FkLmZpbmQoIFVQTE9BRF9CVVRUT05fU0VMRUNUT1IgKTtcblxuXHQvLyBTZXQgdGhlIG1lc3NhZ2Vcblx0aWYgKCBtZXNzYWdlICYmIHR5cGVvZiBtZXNzYWdlID09PSAnc3RyaW5nJyApIHtcblx0XHQkYnV0dG9uLnRleHQoIG1lc3NhZ2UgKTtcblx0fSBlbHNlIHtcblx0XHQkYnV0dG9uLnRleHQoXCJVcGxvYWQgYSAuY3N2XCIpO1xuXHR9XG5cblx0Ly8gU2V0IHRoZSBsb2FkaW5nIHN0YXRlXG5cdGlmICggbG9hZGluZyApIHtcblx0XHR0aGlzLiR1cGxvYWQuYWRkQ2xhc3MoJ2xvYWRpbmcnKTtcblx0XHQkYnV0dG9uLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy4kdXBsb2FkLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XG5cdFx0JGJ1dHRvbi5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcblx0fVxufTtcblxuVXBsb2FkVmlldy5wcm90b3R5cGUuX3NldHVwRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBMaXN0ZW4gZm9yIGNsaWNrcyBvbiB0aGUgdXBsb2FkIGJ1dHRvblxuXHR0aGlzLiR1cGxvYWQuZmluZCggVVBMT0FEX0JVVFRPTl9TRUxFQ1RPUiApLm9uKCAnY2xpY2snLCB0aGlzLl9vblVwbG9hZENsaWNrLmJpbmQoIHRoaXMgKSApO1xuXG5cdC8vIExpc3RlbiBmb3IgZmlsZSBjaG9pY2VzIGZyb20gdGhlIGZpbGUgcGlja2VyXG5cdHRoaXMuJHVwbG9hZC5maW5kKCdpbnB1dFt0eXBlPVwiZmlsZVwiXScpLm9uKCAnY2hhbmdlJywgdGhpcy5fb25GaWxlQ2hvaWNlLmJpbmQoIHRoaXMgKSApO1xuXG5cdC8vIExpc3RlbiBmb3Igd2luZG93IHJlc2l6ZSBldmVudHNcblx0JCh3aW5kb3cpLm9uKCAncmVzaXplJywgdGhpcy5fb25XaW5kb3dSZXNpemUuYmluZCggdGhpcyApICk7XG5cblx0Ly8gTGlzdGVuIGZvciBzdWNjZXNzZnVsIHRhYmxlIHVwbG9hZHNcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5UYWJsZS5EaWRVcGxvYWRXaXRoU3VjY2VzcycsIHRoaXMuX29uVGFibGVVcGxvYWRTdWNjZXNzLmJpbmQoIHRoaXMgKSApO1xuXG5cdC8vIExpc3RlbiBmb3IgZmFpbGVkIHRhYmxlIHVwbG9hZHNcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5UYWJsZS5EaWRVcGxvYWRXaXRoRmFpbHVyZScsIHRoaXMuX29uVGFibGVVcGxvYWRGYWlsLmJpbmQoIHRoaXMgKSApO1xufTtcblxuVXBsb2FkVmlldy5wcm90b3R5cGUuX29uVXBsb2FkQ2xpY2sgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG5cblx0Ly8gVHJpZ2dlciBjbGljayBvbiBmaWxlIGlucHV0IGZpZWxkXG5cdHRoaXMuJHVwbG9hZC5maW5kKCdpbnB1dFt0eXBlPVwiZmlsZVwiXScpLnRyaWdnZXIoJ2NsaWNrJyk7XG5cblx0Ly8gVHJhY2sgdGhpcyBjbGlja1xuXHQvLyBnYSgnc2VuZCcsICdldmVudCcsICdidXR0b24nLCAnY2xpY2snLCAndXBsb2FkJyk7XG59O1xuXG5VcGxvYWRWaWV3LnByb3RvdHlwZS5fb25GaWxlQ2hvaWNlID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuXHR2YXIgZmlsZSA9IGV2ZW50LnRhcmdldC5maWxlc1sgMCBdO1xuXHR0aGlzLl9wYXJzZUZpbGUoIGZpbGUgKTtcblxuXHRpZiAoIGZpbGUubmFtZSApIHtcblx0XHR0aGlzLl9zZXRMb2FkaW5nKCB0cnVlLCAnVXBsb2FkaW5nICcgKyBmaWxlLm5hbWUgKyAnLi4uJyApO1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMuX3NldExvYWRpbmcoIHRydWUsICdVcGxvYWRpbmcgZmlsZS4uLicgKTtcblx0fVxuXG5cdC8vIEFubm91bmNlIGZpbGUgdXBsb2FkIGV2ZW50XG5cdC8vIEFsZXJ0IGFueSBsaXN0ZW5lcnMgdGhhdCB0aGUgZ3JvdXAgaGFzIGNoYW5nZWRcblx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IG5ldyBDdXN0b21FdmVudCggJ0NvbHVtbnMuVXBsb2FkVmlldy5EaWRDaG9vc2VGaWxlJywge1xuXHRcdC8vIHVwbG9hZFZpZXc6IFx0dGhpcyxcblx0XHQvLyBmaWxlOiBcdFx0XHRmaWxlXG5cdC8vIH0pO1xuXHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdC8vIGNvbHVtbnNFdmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuVXBsb2FkVmlldy5EaWRDaG9vc2VGaWxlJywgZmFsc2UsIGZhbHNlLCB7XG5cdC8vIFx0dXBsb2FkVmlldzogXHR0aGlzLFxuXHQvLyBcdGZpbGU6IFx0XHRcdGZpbGVcblx0Ly8gfSk7XG5cdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY29sdW1uc0V2ZW50KTtcblx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuVXBsb2FkVmlldy5EaWRDaG9vc2VGaWxlJywge1xuXHRcdHVwbG9hZFZpZXc6IFx0dGhpcyxcblx0XHRmaWxlOiBcdFx0XHRmaWxlXG5cdH0pO1xufTtcblxuVXBsb2FkVmlldy5wcm90b3R5cGUuX29uV2luZG93UmVzaXplID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuXG59O1xuXG5VcGxvYWRWaWV3LnByb3RvdHlwZS5fb25UYWJsZVVwbG9hZFN1Y2Nlc3MgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG5cblx0dGhpcy5fc2V0TG9hZGluZyggZmFsc2UgKTtcblx0dGhpcy5oaWRlKCk7XG59O1xuXG5VcGxvYWRWaWV3LnByb3RvdHlwZS5fb25UYWJsZVVwbG9hZEZhaWwgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG5cblx0dGhpcy5fc2V0TG9hZGluZyggZmFsc2UsIFwiU2hvb3QsIHNvbWV0aGluZyB3ZW50IHdyb25nLiBNaW5kIHRyeWluZyBhIGRpZmZlcmVudCAuY3N2P1wiKVxufTtcblxuVXBsb2FkVmlldy5wcm90b3R5cGUuX3BhcnNlRmlsZSA9IGZ1bmN0aW9uKCBmaWxlICkge1xuXHRQYXBhLnBhcnNlKCBmaWxlLCB7XG5cdFx0c3RlcDogZnVuY3Rpb24oIHJvdywgaGFuZGxlICkge1xuXHRcdFx0dGhpcy5fcGFyc2VSb3coIHJvdywgaGFuZGxlLCBmaWxlLm5hbWUgKTtcblx0XHR9LmJpbmQoIHRoaXMgKSxcblx0XHRjb21wbGV0ZTogZnVuY3Rpb24oIHJlc3VsdHMgKSB7XG5cdFx0XHR0aGlzLl9vblBhcnNlQ29tcGxldGUoIHJlc3VsdHMsIGZpbGUgKTtcblx0XHR9LmJpbmQoIHRoaXMgKVxuXHR9KTtcbn07XG5cblVwbG9hZFZpZXcucHJvdG90eXBlLl9wYXJzZVJvdyA9IGZ1bmN0aW9uKCByb3csIGhhbmRsZSwgZmlsZU5hbWUgKSB7XG5cblx0Ly8gSWYgdGhpcyBpcyB0aGUgZmlyc3Qgcm93LCB0cmVhdCBpdCBhcyBhIGhlYWRlclxuXHQvLyBhbmQgY3JlYXRlIGNvbHVtbiBpdGVtcyBmcm9tIGl0cyBjb250ZW50c1xuXHQvL1xuXHQvLyBJZiBpdCdzIG5vdCB0aGUgZmlyc3Qgcm93LCB0cmVhdCBpdCBhcyBkYXRhXG5cdC8vIGFuZCBhZGQgaXQgdG8gb3VyIGRhdGEgc2V0XG5cdC8vIFxuXHQvLyBJZiBpdCdzIGJleW9uZCB0aGUgMjB0aCByb3csIHN0b3AgdGhlIHBhcnNpbmdcblx0aWYgKCB0aGlzLnBhcnNlZFJvd3MgPT09IDAgKSB7XG5cdFx0dGhpcy5fY3JlYXRlQ29sdW1uSXRlbXMoIHJvdy5kYXRhWyAwIF0sIGZpbGVOYW1lICk7XG5cdH0gZWxzZSBpZiAoIHRoaXMucGFyc2VkUm93cyA8PSBNQVhfUk9XUyApIHtcblx0XHR0aGlzLl9jcmVhdGVSb3coIHJvdy5kYXRhWyAwIF0sIGZpbGVOYW1lICk7XG5cdH0gZWxzZSB7XG5cdFx0aGFuZGxlLmFib3J0KCk7XG5cdH1cblxuXHQvLyBVcGRhdGUgdGhlIHBhcnNlZCByb3dzIGNvdW50XG5cdHRoaXMucGFyc2VkUm93cysrO1xufTtcblxuVXBsb2FkVmlldy5wcm90b3R5cGUuX2NyZWF0ZUNvbHVtbkl0ZW1zID0gZnVuY3Rpb24oIGRhdGEsIGZpbGVOYW1lICkge1xuXG5cdC8vIEFubm91bmNlIGNvbHVtbnMgcGFyc2luZ1xuXHQvLyBBbGVydCBhbnkgbGlzdGVuZXJzIHRoYXQgdGhlIGdyb3VwIGhhcyBjaGFuZ2VkXG5cdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoICdDb2x1bW5zLlVwbG9hZFZpZXcuRGlkUGFyc2VDb2x1bW5OYW1lc0ZvckZpbGUnLCB7XG5cdFx0Ly8gdXBsb2FkVmlldzogXHR0aGlzLFxuXHRcdC8vIGZpbGVOYW1lOiBcdFx0ZmlsZU5hbWUsXG5cdFx0Ly8gY29sdW1zOiBcdFx0ZGF0YVxuXHQvLyB9KTtcblx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHQvLyBjb2x1bW5zRXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLlVwbG9hZFZpZXcuRGlkUGFyc2VDb2x1bW5OYW1lc0ZvckZpbGUnLCBmYWxzZSwgZmFsc2UsIHtcblx0Ly8gXHR1cGxvYWRWaWV3OiBcdHRoaXMsXG5cdC8vIFx0ZmlsZU5hbWU6IFx0XHRmaWxlTmFtZSxcblx0Ly8gXHRjb2x1bW5zOiBcdFx0ZGF0YVxuXHQvLyB9KTtcblx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjb2x1bW5zRXZlbnQpO1xuXHRDb2x1bW5zRXZlbnQuc2VuZCgnQ29sdW1ucy5VcGxvYWRWaWV3LkRpZFBhcnNlQ29sdW1uTmFtZXNGb3JGaWxlJywge1xuXHRcdHVwbG9hZFZpZXc6IFx0dGhpcyxcblx0XHRmaWxlTmFtZTogXHRcdGZpbGVOYW1lLFxuXHRcdGNvbHVtbnM6IFx0XHRkYXRhXG5cdH0pO1xufTtcblxuVXBsb2FkVmlldy5wcm90b3R5cGUuX2NyZWF0ZVJvdyA9IGZ1bmN0aW9uKCByb3csIGZpbGVOYW1lICkge1xuXG5cdC8vIEFubm91bmNlIHJvdyBwYXJzaW5nXG5cdC8vIEFsZXJ0IGFueSBsaXN0ZW5lcnMgdGhhdCB0aGUgZ3JvdXAgaGFzIGNoYW5nZWRcblx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IG5ldyBDdXN0b21FdmVudCggJ0NvbHVtbnMuVXBsb2FkVmlldy5EaWRQYXJzZURhdGFSb3dGb3JGaWxlJywge1xuXHRcdC8vIHVwbG9hZFZpZXc6IFx0dGhpcyxcblx0XHQvLyBmaWxlTmFtZTogXHRcdGZpbGVOYW1lLFxuXHRcdC8vIHJvdzogXHRcdFx0ZGF0YVxuXHQvLyB9KTtcblx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHQvLyBjb2x1bW5zRXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLlVwbG9hZFZpZXcuRGlkUGFyc2VEYXRhUm93Rm9yRmlsZScsIGZhbHNlLCBmYWxzZSwge1xuXHQvLyBcdHVwbG9hZFZpZXc6IFx0dGhpcyxcblx0Ly8gXHRmaWxlTmFtZTogXHRcdGZpbGVOYW1lLFxuXHQvLyBcdHJvdzogXHRcdFx0cm93XG5cdC8vIH0pO1xuXHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGNvbHVtbnNFdmVudCk7XG5cdENvbHVtbnNFdmVudC5zZW5kKCdDb2x1bW5zLlVwbG9hZFZpZXcuRGlkUGFyc2VEYXRhUm93Rm9yRmlsZScsIHtcblx0XHR1cGxvYWRWaWV3OiBcdHRoaXMsXG5cdFx0ZmlsZU5hbWU6IFx0XHRmaWxlTmFtZSxcblx0XHRyb3c6IFx0XHRcdHJvd1xuXHR9KTtcbn07XG5cblVwbG9hZFZpZXcucHJvdG90eXBlLl9vblBhcnNlQ29tcGxldGUgPSBmdW5jdGlvbiggcmVzdWx0cywgZmlsZSApIHtcblxuXHQvLyBBbm5vdW5jZSBwYXJzaW5nIGNvbXBsZXRlXG5cdC8vIEFsZXJ0IGFueSBsaXN0ZW5lcnMgdGhhdCB0aGUgZ3JvdXAgaGFzIGNoYW5nZWRcblx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IG5ldyBDdXN0b21FdmVudCggJ0NvbHVtbnMuVXBsb2FkVmlldy5EaWRDb21wbGV0ZVBhcnNlRm9yRmlsZScsIHtcblx0XHQvLyB1cGxvYWRWaWV3OiBcdFx0dGhpcyxcblx0XHQvLyBmaWxlTmFtZTogXHRcdGZpbGVOYW1lXG5cdC8vIH0pO1xuXHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdC8vIGNvbHVtbnNFdmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuVXBsb2FkVmlldy5EaWRDb21wbGV0ZVBhcnNlRm9yRmlsZScsIGZhbHNlLCBmYWxzZSwge1xuXHQvLyBcdHVwbG9hZFZpZXc6IFx0dGhpcyxcblx0Ly8gXHRmaWxlOiBcdFx0XHRmaWxlXG5cdC8vIH0pO1xuXHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGNvbHVtbnNFdmVudCk7XG5cdENvbHVtbnNFdmVudC5zZW5kKCdDb2x1bW5zLlVwbG9hZFZpZXcuRGlkQ29tcGxldGVQYXJzZUZvckZpbGUnLCB7XG5cdFx0dXBsb2FkVmlldzogXHR0aGlzLFxuXHRcdGZpbGU6IFx0XHRcdGZpbGVcblx0fSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVwbG9hZFZpZXc7XG4iLCJ2YXIgVGFibGUgXHRcdFx0XHQ9IHJlcXVpcmUoJy4vbW9kZWxzL1RhYmxlLmpzJyk7XG52YXIgSXRlbVZpZXcgXHRcdFx0PSByZXF1aXJlKCcuL2NvbnRyb2xsZXJzL0l0ZW1zVmlldy5qcycpO1xudmFyIFRlbXBsYXRlVmlldyBcdFx0PSByZXF1aXJlKCcuL2NvbnRyb2xsZXJzL1RlbXBsYXRlVmlldy5qcycpO1xudmFyIFN0eWxlVmlldyBcdFx0XHQ9IHJlcXVpcmUoJy4vY29udHJvbGxlcnMvU3R5bGVWaWV3LmpzJyk7XG52YXIgRW1iZWREZXRhaWxzVmlldyBcdD0gcmVxdWlyZSgnLi9jb250cm9sbGVycy9FbWJlZERldGFpbHNWaWV3LmpzJyk7XG52YXIgVXBsb2FkVmlldyBcdFx0XHQ9IHJlcXVpcmUoJy4vY29udHJvbGxlcnMvVXBsb2FkVmlldy5qcycpO1xuXG4vLyBDcmVhdGUgdGhlIFRhYmxlIG9iamVjdFxudmFyIHRhYmxlID0gbmV3IFRhYmxlKCk7XG5cbi8vIFNldCB1cCB0aGUgSXRlbXMgVmlld1xudmFyIGl0ZW1zID0gbmV3IEl0ZW1zVmlldygpO1xuXG4vLyBTZXQgdXAgdGhlIFRlbXBsYXRlXG52YXIgdGVtcGxhdGUgPSBuZXcgVGVtcGxhdGVWaWV3KCk7XG5cbi8vIFNldCB1cCB0aGUgU3R5bGUgVmlld1xudmFyIHN0eWxlID0gbmV3IFN0eWxlVmlldygpO1xuXG4vLyBTZXQgdXAgdGhlIEVtYmVkIFBhbmVsXG52YXIgZW1iZWQgPSBuZXcgRW1iZWREZXRhaWxzVmlldygpO1xuXG4vLyBTZXQgdXAgdGhlIFVwbG9hZCBWaWV3XG52YXIgdXBsb2FkID0gbmV3IFVwbG9hZFZpZXcoKTtcbnVwbG9hZC5yZW5kZXIoKTtcblxuXG5cbiIsImZ1bmN0aW9uIENvbHVtbnNFdmVudCAoKSB7XG5cbn1cblxuQ29sdW1uc0V2ZW50LnNlbmQgPSBmdW5jdGlvbiggdHlwZSwgZGF0YSApIHtcblx0JChkb2N1bWVudCkudHJpZ2dlciggdHlwZSwgZGF0YSApO1xufTtcblxuQ29sdW1uc0V2ZW50Lm9uID0gZnVuY3Rpb24oIHR5cGUsIGNhbGxiYWNrICkge1xuXHQkKGRvY3VtZW50KS5vbiggdHlwZSwgY2FsbGJhY2sgKTtcbn07XG5cbkNvbHVtbnNFdmVudC5vZmYgPSBmdW5jdGlvbiggdHlwZSwgY2FsbGJhY2sgKSB7XG5cdCQoZG9jdW1lbnQpLm9mZiggdHlwZSwgY2FsbGJhY2sgKTtcbn07XG5cbkNvbHVtbnNFdmVudC5vZmZBbGwgPSBmdW5jdGlvbigpIHtcblx0JChkb2N1bWVudCkub2ZmKCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbHVtbnNFdmVudDsiLCJ2YXIgQ29sdW1uc0V2ZW50ID0gcmVxdWlyZSgnLi9Db2x1bW5zRXZlbnQuanMnKTtcbnZhciBTdHlsZSBcdFx0ID0gcmVxdWlyZSgnLi9TdHlsZS5qcycpO1xuXG4vLyBJdGVtIE9iamVjdFxuLy8gLS0tLS0tLS0tLS0tLVxuLy8gVXNlIHRoaXMgbW9kZWwgdG8gc3RvcmUgYSBjb2x1bW4gSXRlbVxuLy8gYW5kIG1hbmFnZSBpdHMgc3R5bGUgaW5mb3JtYXRpb25cblxuSXRlbSA9IGZ1bmN0aW9uKCBwYXJhbXMgKSB7XG5cblx0dGhpcy5pZDtcblx0dGhpcy50aXRsZTtcblx0dGhpcy5zdHlsZTtcblx0dGhpcy5hY3RpdmUgPSB0cnVlO1xuXG5cdGlmICggcGFyYW1zICkge1xuXHRcdC8vIHRoaXMuaWQgXHQ9IFxuXHRcdHRoaXMudGl0bGUgXHQ9IHBhcmFtcy50aXRsZSB8fCAnJztcblx0XHR0aGlzLnN0eWxlIFx0PSBuZXcgU3R5bGUoIHBhcmFtcy5zdHlsZSApO1xuXHRcdHRoaXMuYWN0aXZlID0gcGFyYW1zLmFjdGl2ZSA9PT0gZmFsc2UgPyBmYWxzZSA6IHRydWU7XG5cdH1cblxuXHR0aGlzLl9zZXR1cEV2ZW50TGlzdGVuZXJzKCk7XG59XG5cbkl0ZW0uZm9ybWF0dGVkVGl0bGUgPSBmdW5jdGlvbiggdGl0bGUgKSB7XG5cdC8vIFJldHVybiBhIGxvd2VyY2FzZSB2ZXJzaW9uIG9mIHRoZSB0aXRsZVxuXHQvLyB3aXRoIHVuZGVyc2NvcmVzIGluc3RlYWQgb2Ygc3BhY2VzXG5cdGlmICggIXRpdGxlICkge1xuXHRcdHJldHVybiAnXyc7XG5cdH0gZWxzZSBpZiAoIHRpdGxlID09PSAnXycgKSB7XG5cdFx0cmV0dXJuIHRpdGxlO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiB0aXRsZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoIC9fL2csICcgJyApLnJlcGxhY2UoL1xcYi4vZywgZnVuY3Rpb24obSl7IHJldHVybiBtLnRvVXBwZXJDYXNlKCk7IH0pO1xuXHR9XG59O1xuXG5JdGVtLnVuZm9ybWF0dGVkVGl0bGUgPSBmdW5jdGlvbiggdGl0bGUgKSB7XG5cdGlmICghdGl0bGUpIHtcblx0XHRyZXR1cm4gJ18nO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiB0aXRsZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLyAvZywgJ18nKTtcblx0fVxufTtcblxuSXRlbS5wcm90b3R5cGUuZm9ybWF0dGVkVGl0bGUgPSBmdW5jdGlvbigpIHtcblx0Ly8gUmV0dXJuIGEgbG93ZXJjYXNlIHZlcnNpb24gb2YgdGhlIHRpdGxlXG5cdC8vIHdpdGggdW5kZXJzY29yZXMgaW5zdGVhZCBvZiBzcGFjZXNcblx0Ly8gaWYgKCAhdGhpcy50aXRsZSApIHtcblx0Ly8gXHRyZXR1cm4gJ18nO1xuXHQvLyB9IGVsc2UgaWYgKCB0aGlzLnRpdGxlID09PSAnXycgKSB7XG5cdC8vIFx0cmV0dXJuIHRoaXMudGl0bGU7XG5cdC8vIH0gZWxzZSB7XG5cdC8vIFx0cmV0dXJuIHRoaXMudGl0bGUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKCAvXy9nLCAnICcgKS5yZXBsYWNlKC9cXGIuL2csIGZ1bmN0aW9uKG0peyByZXR1cm4gbS50b1VwcGVyQ2FzZSgpOyB9KTtcblx0Ly8gfVxuXHRyZXR1cm4gSXRlbS5mb3JtYXR0ZWRUaXRsZSggdGhpcy50aXRsZSApO1xufTtcblxuSXRlbS5wcm90b3R5cGUudW5mb3JtYXR0ZWRUaXRsZSA9IGZ1bmN0aW9uKCkge1xuXHQvLyBSZXR1cm4gYSBsb3dlcmNhc2UgdmVyc2lvbiBvZiB0aGUgdGl0bGVcblx0Ly8gd2l0aCB1bmRlcnNjb3JlcyBpbnN0ZWFkIG9mIHNwYWNlc1xuXHQvLyBpZiAoIXRoaXMudGl0bGUpIHtcblx0Ly8gXHRyZXR1cm4gJ18nO1xuXHQvLyB9IGVsc2Uge1xuXHQvLyBcdHJldHVybiB0aGlzLnRpdGxlLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvIC9nLCAnXycpO1xuXHQvLyB9XG5cdHJldHVybiBJdGVtLnVuZm9ybWF0dGVkVGl0bGUoIHRoaXMudGl0bGUgKTtcbn07XG5cbi8vIFJldHVybiB0aGUgY29ycmVjdCBzdHlsZSBhdHRyaWJ1dGUgZm9yIGEgZ2l2ZW4gcHJvcGVydHlcbi8vIEBwYXJhbSB7IHN0cmluZyB9IHByb3BlcnR5IC0tIHRoZSByZXF1ZXN0ZWQgbGF5b3V0IHByb3BlcnR5XG4vLyBAcmV0dXJuIHsgc3RyaW5nIH0gdGhlIGNvcnJlc3BvbmRpbmcgdmFsdWVcbkl0ZW0ucHJvdG90eXBlLmdldFN0eWxlID0gZnVuY3Rpb24oIHByb3BlcnR5ICkge1xuXHR2YXIgdmFsdWU7XG5cblx0Ly8gQ2hlY2sgd2hldGhlciB0aGlzIGlzIGEga25vd24gc3R5bGVcblx0aWYgKCB0aGlzLnN0eWxlICkge1xuXHRcdHZhbHVlID0gdGhpcy5zdHlsZS5nZXQoIHByb3BlcnR5ICk7XG5cdH1cblxuXHRyZXR1cm4gdmFsdWU7XG5cblx0Ly8gSWYgbm90LCBjaGVjayB0aGUgY3NzIGZvciB0aGUgZWxlbWVudFxuXHQvLyBhbmQgcmV0dXJuIGl0cyB2YWx1ZVxuXHQvLyBpZiAoIHZhbHVlICkge1xuXHQvLyBcdHJldHVybiB2YWx1ZTtcblx0Ly8gfSBlbHNlIHtcblx0Ly8gXHQvLyBUaGlzIGlzIGEgaGFjayEhIVxuXHQvLyBcdHJldHVybiB0aGlzLiRncm91cC5jc3MoIHByb3BlcnR5ICk7XG5cdC8vIH1cbn07XG5cbkl0ZW0ucHJvdG90eXBlLmlzID0gZnVuY3Rpb24oIGl0ZW0gKSB7XG5cdGlmICggaXRlbSBpbnN0YW5jZW9mIEl0ZW0gKSB7XG5cdFx0cmV0dXJuIHRoaXMudGl0bGUgPT09IGl0ZW0udGl0bGU7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgXCJleGNlcHRpb246IENvbXBhcmlzb24gbXVzdCBiZSB3aXRoIGFub3RoZXIgSXRlbVwiO1xuXHR9XG59XG5cbkl0ZW0ucHJvdG90eXBlLl9zZXRBY3RpdmUgPSBmdW5jdGlvbiggYWN0aXZlICkge1xuXG5cdGlmICggdGhpcy5hY3RpdmUgIT09IGFjdGl2ZSApIHtcblx0XHR0aGlzLmFjdGl2ZSA9IGFjdGl2ZTtcblx0XHR0aGlzLl9lbWl0QWN0aXZlU3RhdGVDaGFuZ2UoKTtcdFx0XG5cdH1cblx0XG59O1xuXG5JdGVtLnByb3RvdHlwZS5fc2V0dXBFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uKCkge1xuXG5cdC8vIExpc3RlbiBmb3Igc3R5bGUgY2hhbmdlcyBvbiB0aGlzIEl0ZW1cblx0Ly8gJChkb2N1bWVudCkub24oICdDb2x1bW5zLlN0eWxlVmlldy5Qcm9wZXJ0eURpZFVwZGF0ZVdpdGhWYWx1ZUZvckl0ZW0nLCB0aGlzLCBmYWxzZSApO1xuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLlN0eWxlVmlldy5Qcm9wZXJ0eURpZFVwZGF0ZVdpdGhWYWx1ZUZvckl0ZW0nLCB0aGlzLl9vbkl0ZW1TdHlsZURpZENoYW5nZS5iaW5kKCB0aGlzICkgKTtcblxuXHQvLyBMaXN0ZW4gZm9yIHRlbXBsYXRlIHVwZGF0ZSBldmVudHNcblx0Ly8gJChkb2N1bWVudCkub24oICdDb2x1bW5zLlRlbXBsYXRlVmlldy5EaWRDaGFuZ2UnLCB0aGlzLCBmYWxzZSApO1xuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLlRlbXBsYXRlVmlldy5EaWRDaGFuZ2UnLCB0aGlzLl9vblRlbXBsYXRlQ2hhbmdlLmJpbmQoIHRoaXMgKSApO1xufTtcblxuSXRlbS5wcm90b3R5cGUuX29uSXRlbVN0eWxlRGlkQ2hhbmdlID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXHRpZiAoIHRoaXMuaXMoIGRhdGEuaXRlbSApICkge1xuXHRcdHRoaXMuc3R5bGUudXBkYXRlKCBbe1xuXHRcdFx0cHJvcGVydHk6IGRhdGEucHJvcGVydHksXG5cdFx0XHR2YWx1ZTogZGF0YS52YWx1ZVxuXHRcdH1dICk7XG5cdFx0dGhpcy5fZW1pdENoYW5nZSgpO1xuXHR9XG59O1xuXG5JdGVtLnByb3RvdHlwZS5fb25UZW1wbGF0ZUNoYW5nZSA9IGZ1bmN0aW9uKCBldmVudCApIHtcblxuXHQvLyBDaGVjayB3aGV0aGVyIHRoZSBpdGVtIGV4aXN0cyBpbiB0aGUgdGVtcGxhdGVcblx0aWYgKCBUZW1wbGF0ZVZpZXcuZ2V0VmFsdWVGb3JJdGVtKCB0aGlzICkgKSB7XG5cdFx0dGhpcy5fc2V0QWN0aXZlKCBmYWxzZSApO1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMuX3NldEFjdGl2ZSggdHJ1ZSApO1xuXHR9XG59O1xuXG5JdGVtLnByb3RvdHlwZS5fZW1pdENoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXG5cdC8vIEFsZXJ0IGFueSBsaXN0ZW5lcnMgdGhhdCB0aGUgZ3JvdXAgaGFzIGNoYW5nZWRcblx0Ly8gdmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCAnQ29sdW1ucy5JdGVtLkRpZENoYW5nZScsIHtcblx0Ly8gXHRncm91cFZpZXc6IFx0dGhpc1xuXHQvLyB9KTtcblx0Ly8gdmFyIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdC8vIGV2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5JdGVtLkRpZENoYW5nZScsIGZhbHNlLCBmYWxzZSwge1xuXHQvLyBcdGl0ZW06IFx0dGhpc1xuXHQvLyB9KTtcblx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG5cdENvbHVtbnNFdmVudC5zZW5kKCdDb2x1bW5zLkl0ZW0uRGlkQ2hhbmdlJywge1xuXHRcdGl0ZW06IFx0dGhpc1xuXHR9KTtcbn07XG5cbkl0ZW0ucHJvdG90eXBlLl9lbWl0QWN0aXZlU3RhdGVDaGFuZ2UgPSBmdW5jdGlvbigpIHtcblxuXHRDb2x1bW5zRXZlbnQuc2VuZCgnQ29sdW1ucy5JdGVtLkFjdGl2ZVN0YXRlRGlkQ2hhbmdlJywge1xuXHRcdGl0ZW06IHRoaXNcblx0fSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEl0ZW07IiwiLy8gTGF5b3V0IE9iamVjdCBNZXRob2RzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBUaGlzIGlzIHRoZSBsYXlvdXQgb2JqZWN0IHRoYXQgY29udHJvbHNcbi8vIHRoZSB3YXkgdGhlIHRhYmxlIGlzIHJlbmRlcmVkIGFuZCBzdHlsZWQuXG4vLyBUaGUgbWV0aG9kcyBiZWxvdyBhbGxvdyB1cyB0bzpcbi8vIDEpIFRyYXZlcnNlIHRoZSB0ZW1wbGF0ZSBhbmQgY29uc3RydWN0IGEgbmV3IG9iamVjdFxuLy8gMikgVXBkYXRlIHRoZSBvYmplY3Qgd2hlbiBzdHlsZXMgYXJlIGFkanVzdGVkXG5cbnZhciBDb2x1bW5zRXZlbnQgXHQ9IHJlcXVpcmUoJy4vQ29sdW1uc0V2ZW50LmpzJyk7XG52YXIgREVGQVVMVFNcdFx0PSByZXF1aXJlKCcuLi9zdHlsaW5nL2RlZmF1bHRzLmpzJyk7XG5cbi8vIENvbHVtbnMuTGF5b3V0ID0gbmV3IGZ1bmN0aW9uKCkge1xuZnVuY3Rpb24gTGF5b3V0KCBpdGVtcyApIHtcblxuXHQvLyBNYWtlIHN1cmUgYWxsIGl0ZW1zIGFyZSBvZiByaWdodCB0eXBlXG5cdHRoaXMuaXRlbXMgPSBbXTtcblx0aWYgKCBpdGVtcyApIHtcblx0XHRpdGVtcy5mb3JFYWNoKGZ1bmN0aW9uKCBpdGVtLCBpICkge1xuXHRcdFx0aWYgKCBpdGVtIGluc3RhbmNlb2YgSXRlbSApIHtcblx0XHRcdFx0dGhpcy5pdGVtcy5wdXNoKCBpdGVtICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aHJvdyBcImV4Y2VwdGlvbjogYWxsIGl0ZW1zIG11c3Qgb2YgdHlwZSBJdGVtXCI7XG5cdFx0XHR9XG5cdFx0fS5iaW5kKCB0aGlzICkpO1xuXHR9XG5cblx0Ly8gQnVpbGQgYSBkZWZhdWx0IGxheW91dCB3aXRoIHRoZSBwYXNzZWQtaW4gaXRlbXNcblx0dGhpcy5tb2RlbCA9IHRoaXMuZGVmYXVsdExheW91dCggdGhpcy5pdGVtcyApO1xuXG5cdHRoaXMuX3NldHVwRXZlbnRMaXN0ZW5lcnMoKTtcbn1cblxuTGF5b3V0LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbigpIHtcblx0dmFyICR0ZW1wbGF0ZSA9ICQoJy5sYXlvdXQtdGVtcGxhdGUtcm93LWdyb3VwJykuZmlyc3QoKTtcblx0dGhpcy5tb2RlbCA9IHRoaXMuX2dlbmVyYXRlTW9kZWxGb3JUZW1wbGF0ZSggJHRlbXBsYXRlICk7XG5cdHRoaXMuX2VtaXRDaGFuZ2UoKTtcbn07XG5cbkxheW91dC5wcm90b3R5cGUuX2dlbmVyYXRlTW9kZWxGb3JUZW1wbGF0ZSA9IGZ1bmN0aW9uKCAkdGVtcGxhdGUgKSB7XG5cdHZhciBtb2RlbCA9IHt9LFxuXHRcdHN1Yk1vZGVsLFxuXHRcdGl0ZW0sXG5cdFx0Z3JvdXA7XG5cblx0Ly8gU2tpcCBpbmFjdGl2ZSBpdGVtc1xuXHRpZiAoICR0ZW1wbGF0ZS5oYXNDbGFzcygnaW5hY3RpdmUnKSApIHtcblx0XHRyZXR1cm47XG5cdH1cblx0XG5cdC8vIElzIHRoZSB0ZW1wbGF0ZSBhIHZhbHVlIG9yIGEgZ3JvdXA/XG5cdGlmICggJHRlbXBsYXRlLmhhc0NsYXNzKCdsYXlvdXQtdGVtcGxhdGUtcm93LWdyb3VwJykgKSB7XG5cdFx0Z3JvdXAgPSBuZXcgVGVtcGxhdGVHcm91cFZpZXcoeyBzdHlsZTogJHRlbXBsYXRlLmF0dHIoJ3N0eWxlJykgfSlcblxuXHRcdC8vIFNldCB0aGUgbW9kZWwgdHlwZVxuXHRcdG1vZGVsWyd0eXBlJ10gPSAnZ3JvdXAnO1xuXG5cdFx0Ly8gU2V0IHRoZSBtb2RlbCBzdHlsZVxuXHRcdG1vZGVsWydzdHlsZSddID0gZ3JvdXAuc3R5bGUuc3R5bGVzO1xuXG5cdFx0Ly8gU2V0IHRoZSBtb2RlbCBsYXlvdXRcblx0XHRtb2RlbFsnbGF5b3V0J10gPSBUZW1wbGF0ZUdyb3VwVmlldy5sYXlvdXRGb3JHcm91cCggJHRlbXBsYXRlICk7XG5cblx0XHQvLyBHZXQgdGhlIGdyb3VwJ3MgdmFsdWVzXG5cdFx0bW9kZWxbJ3ZhbHVlcyddID0gW107XG5cdFx0JHRlbXBsYXRlLmNoaWxkcmVuKCkuZWFjaChmdW5jdGlvbiggaSwgY2hpbGQgKSB7XG5cdFx0XHRzdWJNb2RlbCA9IHRoaXMuX2dlbmVyYXRlTW9kZWxGb3JUZW1wbGF0ZSggJCggY2hpbGQgKSApO1xuXHRcdFx0aWYgKCBzdWJNb2RlbCApIHtcblx0XHRcdFx0bW9kZWwudmFsdWVzLnB1c2goIHN1Yk1vZGVsICk7XG5cdFx0XHR9XG5cdFx0fS5iaW5kKCB0aGlzICkgKTtcblxuXHR9IGVsc2UgaWYgKCAkdGVtcGxhdGUuaGFzQ2xhc3MoJ2xheW91dC10ZW1wbGF0ZS1yb3ctdmFsdWUnKSApIHtcblx0XHQvLyBpdGVtID0gbmV3IEl0ZW0oe1xuXHRcdC8vIFx0dGl0bGU6ICR0ZW1wbGF0ZS50ZXh0KCkudHJpbSgpLFxuXHRcdC8vIFx0c3R5bGU6ICR0ZW1wbGF0ZS5hdHRyKCdzdHlsZScpXG5cdFx0Ly8gfSk7XG5cblx0XHQvLyBzdHlsZSA9IG5ldyBTdHlsZSggJHRlbXBsYXRlLmF0dHIoJ3N0eWxlJykgKS5zdHlsZXM7XG5cblx0XHQvLyBTZXQgdGhlIG1vZGVsIHR5cGVcblx0XHRtb2RlbFsndHlwZSddID0gJ3NpbmdsZSc7XG5cblx0XHQvLyBTZXQgdGhlIG1vZGVsJ3Mgc3R5bGVcblx0XHRtb2RlbFsnc3R5bGUnXSA9IG5ldyBTdHlsZSggJHRlbXBsYXRlLmF0dHIoJ3N0eWxlJykgKS5zdHlsZXM7XG5cblx0XHQvLyBTZXQgdGhlIHZhbHVlJ3MgZGF0YVxuXHRcdG1vZGVsWydkYXRhJ10gPSBJdGVtLnVuZm9ybWF0dGVkVGl0bGUoICR0ZW1wbGF0ZS50ZXh0KCkudHJpbSgpICk7XG5cdH1cblxuXHRyZXR1cm4gbW9kZWw7XG59O1xuXG5MYXlvdXQucHJvdG90eXBlLl9lbWl0Q2hhbmdlID0gZnVuY3Rpb24oKSB7XG5cdENvbHVtbnNFdmVudC5zZW5kKCdDb2x1bW5zLkxheW91dC5EaWRDaGFuZ2UnLCB7XG5cdFx0bGF5b3V0OiBcdHRoaXNcblx0fSk7XG59O1xuXG5MYXlvdXQucHJvdG90eXBlLl9zZXR1cEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gTGlzdGVuIHRvIHRlbXBsYXRlIGNoYW5nZSBldmVudHNcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5UZW1wbGF0ZVZpZXcuRGlkQ2hhbmdlJywgdGhpcy5fb25UZW1wbGF0ZVZpZXdDaGFuZ2UuYmluZCggdGhpcyApICk7XG59O1xuXG5MYXlvdXQucHJvdG90eXBlLl9vblRlbXBsYXRlVmlld0NoYW5nZSA9IGZ1bmN0aW9uKCBldmVudCApIHtcblx0dGhpcy51cGRhdGUoKTtcbn07XG5cbi8vIERlZmF1bHQgbGF5b3V0cyBmb3IgdmFyaW91cyBjb2x1bW4gbnVtYmVyc1xuTGF5b3V0LnByb3RvdHlwZS5kZWZhdWx0TGF5b3V0ID0gZnVuY3Rpb24oIGl0ZW1zICkge1xuXHRcblx0Ly8gU2V0IHVwIHRoZSBkZWZhdWx0IGxheW91dFxuXHR2YXIgbGF5b3V0ID0ge1xuXHRcdHR5cGU6ICdncm91cCcsXG5cdFx0c3R5bGU6IFt7XG5cdFx0XHRwcm9wZXJ0eTogJ3BhZGRpbmcnLFxuXHRcdFx0dmFsdWU6ICcxMnB4J1xuXHRcdH1dLFxuXHRcdHZhbHVlczogW11cblx0fTtcblxuXHQvLyBBZGQgdG8gdGhlIGRlZmF1bHQgbGF5b3V0XG5cdC8vIGFjY29yZGluZyB0byB0aGUgbnVtYmVyIG9mIGl0ZW1zXG5cdHN3aXRjaCAoIGl0ZW1zLmxlbmd0aCApIHtcblx0XHRjYXNlIDA6XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDE6XG5cdFx0XHRsYXlvdXRbJ3ZhbHVlcyddID0gW3tcblx0XHRcdFx0dHlwZTogJ3NpbmdsZScsXG5cdFx0XHRcdHN0eWxlOiBERUZBVUxUUy5zdHlsZXNbIDAgXSxcblx0XHRcdFx0ZGF0YTogaXRlbXNbIDAgXS51bmZvcm1hdHRlZFRpdGxlKClcblx0XHRcdH1dO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAyOlxuXHRcdFx0bGF5b3V0Wyd2YWx1ZXMnXSA9IFt7XG5cdFx0XHRcdHR5cGU6ICdncm91cCcsXG5cdFx0XHRcdGxheW91dDogREVGQVVMVFMubGF5b3V0c1sgMCBdLFxuXHRcdFx0XHR2YWx1ZXM6IFt7XG5cdFx0XHRcdFx0dHlwZTogJ3NpbmdsZScsXG5cdFx0XHRcdFx0c3R5bGU6IERFRkFVTFRTLnN0eWxlc1sgMCBdLFxuXHRcdFx0XHRcdGRhdGE6IGl0ZW1zWyAwIF0udW5mb3JtYXR0ZWRUaXRsZSgpXG5cdFx0XHRcdH0se1xuXHRcdFx0XHRcdHR5cGU6ICdzaW5nbGUnLFxuXHRcdFx0XHRcdHN0eWxlOiBERUZBVUxUUy5zdHlsZXNbIDEgXSxcblx0XHRcdFx0XHRkYXRhOiBpdGVtc1sgMSBdLnVuZm9ybWF0dGVkVGl0bGUoKVxuXHRcdFx0XHR9XVxuXHRcdFx0fV07XG5cdFx0XHRicmVhaztcblx0XHRkZWZhdWx0OlxuXHRcdFx0bGF5b3V0Wyd2YWx1ZXMnXSA9IFt7XG5cdFx0XHRcdHR5cGU6ICdncm91cCcsXG5cdFx0XHRcdGxheW91dDogREVGQVVMVFMubGF5b3V0c1sgMCBdLFxuXHRcdFx0XHR2YWx1ZXM6IFt7XG5cdFx0XHRcdFx0dHlwZTogJ3NpbmdsZScsXG5cdFx0XHRcdFx0c3R5bGU6IERFRkFVTFRTLnN0eWxlc1sgMCBdLFxuXHRcdFx0XHRcdGRhdGE6IGl0ZW1zWyAwIF0udW5mb3JtYXR0ZWRUaXRsZSgpXG5cdFx0XHRcdH0se1xuXHRcdFx0XHRcdHR5cGU6ICdzaW5nbGUnLFxuXHRcdFx0XHRcdHN0eWxlOiBERUZBVUxUUy5zdHlsZXNbIDEgXSxcblx0XHRcdFx0XHRkYXRhOiBpdGVtc1sgMSBdLnVuZm9ybWF0dGVkVGl0bGUoKVxuXHRcdFx0XHR9XVxuXHRcdFx0fSwge1xuXHRcdFx0XHR0eXBlOiAnc2luZ2xlJyxcblx0XHRcdFx0c3R5bGU6IERFRkFVTFRTLnN0eWxlc1sgMiBdLFxuXHRcdFx0XHRkYXRhOiBpdGVtc1sgMiBdLnVuZm9ybWF0dGVkVGl0bGUoKVxuXHRcdFx0fV07XG5cdFx0XHRicmVhaztcblx0fVxuXHRyZXR1cm4gbGF5b3V0O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBMYXlvdXQ7IiwidmFyIENvbHVtbnNFdmVudCA9IHJlcXVpcmUoJy4vQ29sdW1uc0V2ZW50LmpzJyk7XG5cbi8vIFN0eWxlIE9iamVjdFxuLy8gLS0tLS0tLS0tLS0tLVxuLy8gVXNlIHRoaXMgbW9kZWwgdG8gaGFuZGxlIHN0eWxpbmcgaW5mb3JtYXRpb24uXG5cblN0eWxlID0gZnVuY3Rpb24oIHN0eWxlcyApIHtcblxuXHQvLyBBY2NlcHQgZWl0aGVyIGFuIGFycmF5IG9mIG11bHRpcGxlIHN0eWxlc1xuXHQvLyBvciBqdXN0IGEgc2luZ2xlIHN0eWxlIG9iamVjdFxuXHRpZiAoIEFycmF5LmlzQXJyYXkoIHN0eWxlcyApICkge1xuXHRcdHRoaXMuc3R5bGVzID0gc3R5bGVzO1xuXHR9IGVsc2UgaWYgKCB0eXBlb2Ygc3R5bGVzID09PSAnb2JqZWN0JyApIHtcblx0XHR0aGlzLnN0eWxlcyA9IFsgc3R5bGVzIF07XG5cdH0gZWxzZSBpZiAoIHR5cGVvZiBzdHlsZXMgPT09ICdzdHJpbmcnKSB7XG5cdFx0dGhpcy5zdHlsZXMgPSB0aGlzLl9wYXJzZUNTUyggc3R5bGVzICk7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5zdHlsZXMgPSBbXTtcblx0fVxufTtcblxuU3R5bGUucGFyc2VDU1MgPSBmdW5jdGlvbiggY3NzICkge1xuXG5cdC8vIEFjY2VwdCBhIENTUyBzdHJpbmdcblx0Ly8gYW5kIGNvbnZlcnQgaXQgaW50byBhbiBhcnJheSBvZiBjc3MgcHJvcGVydGllcyBhbmQgdmFsdWVzXG5cdGlmICggdHlwZW9mIGNzcyAhPT0gJ3N0cmluZycgKSB0aHJvdyBcImV4Y2VwdGlvbjogQ1NTIG11c3QgYmUgaW4gc3RyaW5nIGZvcm1hdFwiO1xuXG5cdHZhciBzdHlsZU9iaiA9IFtdO1xuXG5cdC8vIFJlbW92ZSBhbGwgc3BhY2VzXG5cdGNzcyA9IGNzcy5yZXBsYWNlKC8gL2csICcnKTtcblx0Ly8gUmVtb3ZlIHRoZSBsYXN0IHNlbWljb2xvblxuXHRjc3MgPSBjc3Muc2xpY2UoMCwgLTEpO1xuXHQvLyBTcGxpdCBzdHlsZXNcblx0c3R5bGVzID0gY3NzLnNwbGl0KCc7Jyk7XG5cdC8vIENyZWF0IG9iamVjdCBmb3IgZWFjaCBzdHlsZVxuXHRzdHlsZXMuZm9yRWFjaChmdW5jdGlvbihzdHlsZSwgaSkge1xuXHRcdHN0eWxlID0gc3R5bGUuc3BsaXQoJzonKTtcblx0XHRzdHlsZU9iai5wdXNoKHtcblx0XHRcdHByb3BlcnR5OiBzdHlsZVswXSxcblx0XHRcdHZhbHVlOiBzdHlsZVsxXVxuXHRcdH0pO1xuXHR9KTtcblx0cmV0dXJuIHN0eWxlT2JqO1xufTtcblxuU3R5bGUucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKCBzdHlsZXMgKSB7XG5cdHZhciBuZXdTdHlsZXMgPSBbXTtcblxuXHQvLyBBY2NlcHQgYSBzdHJpbmcsIGFycmF5LCBvciBvYmplY3Qgb2Ygc3R5bGVzXG5cdC8vIGFuZCBleHRlbmQgdGhlIGN1cnJlbnQgc3R5bGVzIG9iamVjdCB3aXRoIGl0cyB2YWx1ZXNcblx0aWYgKCB0eXBlb2Ygc3R5bGVzID09PSAnc3RyaW5nJyApIHtcblx0XHRuZXdTdHlsZXMgPSB0aGlzLl9wYXJzZUNTUyggc3R5bGVzICk7XG5cdH0gZWxzZSBpZiAoIEFycmF5LmlzQXJyYXkgKCBzdHlsZXMgKSApIHtcblx0XHRuZXdTdHlsZXMgPSBzdHlsZXM7XG5cdH0gZWxzZSBpZiAoIHR5cGVvZiBzdHlsZXMgPT09ICdvYmplY3QnICkge1xuXHRcdG5ld1N0eWxlcy5wdXNoKHN0eWxlcyk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgXCJleGNlcHRpb246IENTUyBtdXN0IGJlIGEgc3RyaW5nLCBhcnJheSBvciBvYmplY3RcIjtcblx0fVxuXG5cdC8vIE5vdyBjb21wbGV0ZSB0aGUgbWVyZ2Vcblx0dGhpcy5fbWVyZ2VDU1MoIG5ld1N0eWxlcyApO1xufTtcblxuU3R5bGUucHJvdG90eXBlLmNzcyA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgY3NzID0gJyc7XG5cdHRoaXMuc3R5bGVzLmZvckVhY2goZnVuY3Rpb24oIHN0eWxlLCBpICkge1xuXHRcdGNzcyArPSBzdHlsZS5wcm9wZXJ0eSArICc6JyArIHN0eWxlLnZhbHVlICsgJzsnO1xuXHR9KTtcblx0cmV0dXJuIGNzcztcbn07XG5cbi8vIFJldHVybiB0aGUgc3R5bGUgdmFsdWUgZm9yIGEgZ2l2ZW4gcHJvcGVydHlcbi8vIEBwYXJhbSB7IHN0cmluZyB9IHByb3BlcnR5XG4vLyBAcmV0dXJuIHsgc3RyaW5nIH0gdmFsdWVcblN0eWxlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiggcHJvcGVydHkgKSB7XG5cdHZhciB2YWx1ZTtcblxuXHQvLyBMb29wIHRocm91Z2ggZWFjaCBwcm9wZXJ0eSB1bnRpbCB3ZSBmaW5kIGEgbWF0Y2hcblx0dGhpcy5zdHlsZXMuZm9yRWFjaChmdW5jdGlvbiggc3R5bGUsIGkgKSB7XG5cdFx0aWYgKCBzdHlsZS5wcm9wZXJ0eSA9PT0gcHJvcGVydHkgKSB7XG5cdFx0XHR2YWx1ZSA9IHN0eWxlLnZhbHVlXG5cdFx0fVxuXHR9KTtcblxuXHRyZXR1cm4gdmFsdWU7XG59O1xuXG5TdHlsZS5wcm90b3R5cGUuX3BhcnNlQ1NTID0gZnVuY3Rpb24oIGNzcyApIHtcblxuXHRyZXR1cm4gU3R5bGUucGFyc2VDU1MoIGNzcyApO1x0XG59O1xuXG5TdHlsZS5wcm90b3R5cGUuX21lcmdlQ1NTID0gZnVuY3Rpb24oIGNzcyApIHtcblx0Ly8gQWNjZXB0IGFuIGFycmF5IG9mIGNzcyBzdHlsZSBvYmplY3RzXG5cdGlmICggIUFycmF5LmlzQXJyYXkoIGNzcyApICkgdGhyb3cgXCJleGNlcHRpb246IENTUyBtdXN0IGJlIGFuIGFycmF5XCI7XG5cblx0dmFyIG5ld1N0eWxlcyA9IGNzcy5tYXAoZnVuY3Rpb24oIHN0eWxlICkgeyByZXR1cm4gc3R5bGU7IH0pLFxuXHRcdG9sZEluZGV4LFxuXHRcdG9sZEluZGljZXMgPSB0aGlzLnN0eWxlcy5sZW5ndGg7XG5cblx0Ly8gTG9vcCB0aHJvdWdoIHRoZSBvbGQgcHJvcGVydGllc1xuXHQvLyBjb21wYXJpbmcgZWFjaCB3aXRoIGFsbCB0aGUgbmV3IHByb3BlcnRpZXMuXG5cdC8vIFJlcGxhY2UgYW4gZXhpc3RpbmcgcHJvcGVydHkgYW55dGltZSBhIG5ldyBvbmUgbWF0Y2hlcyBpdFxuXHQvLyBhbmQgdGhlbiByZW1vdmUgdGhhdCBuZXcgcHJvcGVydHkgZnJvbSB0aGUgYXJyYXkuXG5cdC8vIEF0IHRoZSBlbmQsIGFwcGVuZCBhbnkgcmVtYWluaW5nIG5ldyBwcm9wZXJ0aWVzIHRvIHRoZSBtZXJnZWQgc3R5bGVzIGFycmF5LlxuXHRjc3MuZm9yRWFjaChmdW5jdGlvbiggbmV3U3R5bGUsIG5ld0luZGV4ICkge1xuXHRcdGZvciAoIG9sZEluZGV4ID0gMCA7IG9sZEluZGV4IDwgb2xkSW5kaWNlcyA7IG9sZEluZGV4KysgKSB7XG5cdFx0XHRpZiAoIHRoaXMuc3R5bGVzWyBvbGRJbmRleCBdLnByb3BlcnR5ID09IG5ld1N0eWxlLnByb3BlcnR5ICkge1xuXHRcdFx0XHR0aGlzLnN0eWxlc1sgb2xkSW5kZXggXSA9IG5ld1N0eWxlO1xuXHRcdFx0XHRuZXdTdHlsZXMuc3BsaWNlKCBuZXdTdHlsZXMuaW5kZXhPZiggbmV3U3R5bGUgKSwgMSApO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cblx0fS5iaW5kKCB0aGlzICkpO1xuXG5cdC8vIEFkZCBhbGwgcmVtYWluaW5nIG5ldyBzdHlsZXMgdG8gdGhlIHN0eWxlcyBhcnJheVxuXHR0aGlzLnN0eWxlcyA9IHRoaXMuc3R5bGVzLmNvbmNhdCggbmV3U3R5bGVzICk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0eWxlOyIsInZhciBDb2x1bW5zRXZlbnQgXHQ9IHJlcXVpcmUoJy4vQ29sdW1uc0V2ZW50LmpzJyk7XG52YXIgTGF5b3V0IFx0XHRcdD0gcmVxdWlyZSgnLi9MYXlvdXQuanMnKTtcbnZhciBJdGVtIFx0XHRcdD0gcmVxdWlyZSgnLi9JdGVtLmpzJyk7XG52YXIgY29uZmlnIFx0XHRcdD0gcmVxdWlyZSgnLi4vLi4vY29tcGlsZWQtamF2YXNjcmlwdHMvY29uZmlnLmpzJyk7XG52YXIgREVGQVVMVFNcdFx0PSByZXF1aXJlKCcuLi9zdHlsaW5nL2RlZmF1bHRzLmpzJyk7XG5cbmZ1bmN0aW9uIFRhYmxlKCBwcm9wcyApICB7XG5cblx0dGhpcy5kYXRhID0gW107XG5cdHRoaXMudGl0bGUgPSAnJztcblx0dGhpcy5zb3VyY2UgPSAnJztcblx0dGhpcy5zb3VyY2VfdXJsID0gJyc7XG5cdHRoaXMuY29sdW1ucyA9IFtdO1xuXHR0aGlzLmxheW91dDtcblx0dGhpcy5pZDtcblxuXHR0aGlzLl91cGRhdGUoIHByb3BzICk7XG5cdHRoaXMuX3NldHVwRXZlbnRMaXN0ZW5lcnMoKTtcbn1cblxuVGFibGUucHJvdG90eXBlLl91cGRhdGUgPSBmdW5jdGlvbiggcHJvcHMgKSB7XG5cblx0aWYgKCBwcm9wcyApIHtcblx0XHR0aGlzLmRhdGEgPSBwcm9wcy5kYXRhIHx8IHRoaXMuZGF0YTtcblx0XHR0aGlzLnRpdGxlID0gcHJvcHMudGl0bGUgfHwgdGhpcy50aXRsZTtcblx0XHR0aGlzLnNvdXJjZSA9IHByb3BzLnNvdXJjZSB8fCB0aGlzLnNvdXJjZTtcblx0XHR0aGlzLnNvdXJjZV91cmwgPSBwcm9wcy5zb3VyY2VfdXJsIHx8IHRoaXMuc291cmNlX3VybDtcblx0XHR0aGlzLmlkID0gcHJvcHMuaWQgfHwgdGhpcy5pZDtcblxuXHRcdGlmICggcHJvcHMuY29sdW1ucyApIHtcdFxuXHRcdFx0dGhpcy5jb2x1bW5zID0gdGhpcy5pdGVtc0Zyb21Db2x1bW5OYW1lcyggcHJvcHMuY29sdW1ucyApO1xuXHRcdH1cblxuXHRcdGlmICggcHJvcHMubGF5b3V0ICkge1xuXHRcdFx0dGhpcy5sYXlvdXQgPSBwcm9wcy5sYXlvdXQ7XG5cdFx0fSBlbHNlIGlmICggIXRoaXMubGF5b3V0ICkge1xuXHRcdFx0dGhpcy5sYXlvdXQgPSBuZXcgTGF5b3V0KCB0aGlzLmNvbHVtbnMgKTtcblx0XHR9XG5cblx0XHQvLyBMZXQgZXZlcnlvbmUga25vdyB0aGF0IHdlJ3ZlIHVwZGF0ZWQgdGhlIHRhYmxlXG5cdFx0dGhpcy5fZW1pdENoYW5nZSgpO1xuXHR9XG59O1xuXG5UYWJsZS5wcm90b3R5cGUuX2VtaXRDaGFuZ2UgPSBmdW5jdGlvbigpIHtcblx0Ly8gTGV0IGV2ZXJ5b25lIGtub3cgdGhhdCB0aGUgdGFibGUgaGFzIGJlZW4gdXBsb2FkZWQgc3VjY2Vzc2Z1bGx5XG5cdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0Ly8gY29sdW1uc0V2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5UYWJsZS5EaWRDaGFuZ2UnLCBmYWxzZSwgZmFsc2UsIHtcblx0Ly8gXHR0YWJsZTogXHR0aGlzXG5cdC8vIH0pO1xuXHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGNvbHVtbnNFdmVudCk7XG5cdENvbHVtbnNFdmVudC5zZW5kKCdDb2x1bW5zLlRhYmxlLkRpZENoYW5nZScsIHtcblx0XHR0YWJsZTogXHR0aGlzXG5cdH0pO1xufTtcblxuVGFibGUucHJvdG90eXBlLl9lbWl0VXBsb2FkU3VjY2VzcyA9IGZ1bmN0aW9uKCkge1xuXHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdC8vIGNvbHVtbnNFdmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuVGFibGUuRGlkVXBsb2FkV2l0aFN1Y2Nlc3MnLCBmYWxzZSwgZmFsc2UsIHtcblx0Ly8gXHR0YWJsZTogXHR0aGlzXG5cdC8vIH0pO1xuXHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGNvbHVtbnNFdmVudCk7XG5cdENvbHVtbnNFdmVudC5zZW5kKCdDb2x1bW5zLlRhYmxlLkRpZFVwbG9hZFdpdGhTdWNjZXNzJywge1xuXHRcdHRhYmxlOiBcdHRoaXNcblx0fSk7XG59O1xuXG5UYWJsZS5wcm90b3R5cGUuX2VtaXRVcGxvYWRGYWlsID0gZnVuY3Rpb24oKSB7XG5cdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0Ly8gY29sdW1uc0V2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5UYWJsZS5EaWRVcGxvYWRXaXRoRmFpbHVyZScsIGZhbHNlLCBmYWxzZSwge1xuXHQvLyBcdHRhYmxlOiBcdHRoaXNcblx0Ly8gfSk7XG5cdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY29sdW1uc0V2ZW50KTtcblx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuVGFibGUuRGlkVXBsb2FkV2l0aEZhaWx1cmUnLCB7XG5cdFx0dGFibGU6IFx0dGhpc1xuXHR9KTtcbn07XG5cblRhYmxlLnByb3RvdHlwZS5fZW1pdFVwZGF0ZVN1Y2Nlc3MgPSBmdW5jdGlvbigpIHtcblx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHQvLyBjb2x1bW5zRXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLlRhYmxlLkRpZFVwZGF0ZVdpdGhTdWNjZXNzJywgZmFsc2UsIGZhbHNlLCB7XG5cdC8vIFx0dGFibGU6IFx0dGhpc1xuXHQvLyB9KTtcblx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjb2x1bW5zRXZlbnQpO1xuXHRDb2x1bW5zRXZlbnQuc2VuZCgnQ29sdW1ucy5UYWJsZS5EaWRVcGRhdGVXaXRoU3VjY2VzcycsIHtcblx0XHR0YWJsZTogXHR0aGlzXG5cdH0pO1xufTtcblxuVGFibGUucHJvdG90eXBlLl9lbWl0VXBkYXRlRmFpbCA9IGZ1bmN0aW9uKCkge1xuXHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdC8vIGNvbHVtbnNFdmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuVGFibGUuRGlkVXBkYXRlV2l0aEZhaWx1cmUnLCBmYWxzZSwgZmFsc2UsIHtcblx0Ly8gXHR0YWJsZTogXHR0aGlzXG5cdC8vIH0pO1xuXHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGNvbHVtbnNFdmVudCk7XG5cdENvbHVtbnNFdmVudC5zZW5kKCdDb2x1bW5zLlRhYmxlLkRpZFVwZGF0ZVdpdGhGYWlsdXJlJywge1xuXHRcdHRhYmxlOiBcdHRoaXNcblx0fSk7XG59O1xuXG4vLyBSZXR1cm4gYW4gaXRlbSBnaXZlbiBhIGRhdGEgY29sdW1uIG5hbWVcbi8vIEBwYXJhbSB7c3RyaW5nfSBkYXRhIC0tIHRoZSB1bmZvcm1hdHRlZCBjb2x1bW4gdGl0bGUgdG8gc2VhcmNoIGFnYWluc3QgKCdmaXJzdF9uYW1lJylcbi8vIEByZXR1cm4ge0l0ZW19IC0tIHRoZSBtYXRjaGluZyBpdGVtXG5UYWJsZS5wcm90b3R5cGUuZ2V0SXRlbUZvckRhdGEgPSBmdW5jdGlvbiggZGF0YSApIHtcblx0dmFyIGl0ZW07XG5cblx0aWYgKCBkYXRhICYmIHRoaXMuY29sdW1ucyAmJiB0aGlzLmNvbHVtbnMubGVuZ3RoICkge1xuXHRcdGl0ZW0gPSB0aGlzLmNvbHVtbnMuZmlsdGVyKGZ1bmN0aW9uKCBjb2x1bW4gKSB7XG5cdFx0XHRyZXR1cm4gZGF0YSA9PT0gY29sdW1uLnVuZm9ybWF0dGVkVGl0bGUoKTtcblx0XHR9LmJpbmQoIHRoaXMgKSlbIDAgXTtcblx0fVxuXG5cdHJldHVybiBpdGVtO1xufTtcblxuVGFibGUucHJvdG90eXBlLml0ZW1zRnJvbUNvbHVtbk5hbWVzID0gZnVuY3Rpb24oIGNvbHVtbk5hbWVzICkge1xuXG5cdGlmICggdHlwZW9mIGNvbHVtbk5hbWVzID09PSAnc3RyaW5nJyApIHtcblx0XHRjb2x1bW5OYW1lcyA9IFsgY29sdW1uTmFtZXMgXTtcblx0fVxuXG5cdGlmKCBjb2x1bW5OYW1lcyBpbnN0YW5jZW9mIEl0ZW0gKSB7XG5cdFx0Y29sdW1uTmFtZXMgPSBbIGNvbHVtbk5hbWVzIF07XG5cdH1cblxuXHRpZiggIUFycmF5LmlzQXJyYXkoIGNvbHVtbk5hbWVzICkgKSB7XG5cdFx0dGhyb3cgXCJleGNlcHRpb246IENvbHVtbiBuYW1lcyBtdXN0IGJlIGEgc3RyaW5nIG9yIGFuIGFycmF5IG9mIHN0cmluZ3NcIjtcblx0fVxuXG5cdHJldHVybiBjb2x1bW5OYW1lcy5tYXAoZnVuY3Rpb24oIGNvbHVtbk5hbWUsIGkgKSB7XG5cdFx0Ly8gdmFyIGl0ZW07XG5cblx0XHQvLyBpZiAoIGNvbHVtbk5hbWUgaW5zdGFuY2VvZiBJdGVtICkge1xuXHRcdC8vIFx0cmV0dXJuIGNvbHVtbk5hbWU7XG5cdFx0Ly8gfSBlbHNlIHtcblx0XHQvLyBcdGl0ZW0gPSBuZXcgSXRlbSh7XG5cdFx0Ly8gXHRcdHRpdGxlOiBjb2x1bW5OYW1lLFxuXHRcdC8vIFx0XHRzdHlsZTogREVGQVVMVFMuc3R5bGVzWyBpIF07XG5cdFx0Ly8gXHR9KVxuXHRcdC8vIH1cblx0XHRyZXR1cm4gY29sdW1uTmFtZSBpbnN0YW5jZW9mIEl0ZW0gPyBjb2x1bW5OYW1lIDogbmV3IEl0ZW0oeyB0aXRsZTogY29sdW1uTmFtZSwgc3R5bGU6IERFRkFVTFRTLnN0eWxlc1sgaSBdIH0pO1xuXHR9KTtcbn1cblxuVGFibGUucHJvdG90eXBlLl91cGxvYWRGaWxlID0gZnVuY3Rpb24oIGZpbGUgKSB7XG5cdHZhciBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuXG5cdC8vIEFkZCBhbnkgdGFibGUgbWV0YS1kYXRhIHRvIHRoZSBmb3JtXG5cdGZvcm1EYXRhLmFwcGVuZCggXCJkYXRhXCIsIGZpbGUgKTtcblx0Zm9ybURhdGEuYXBwZW5kKCBcInRpdGxlXCIsIHRoaXMudGl0bGUgKTtcblx0Zm9ybURhdGEuYXBwZW5kKCBcInNvdXJjZVwiLCB0aGlzLnNvdXJjZSApO1xuXHRmb3JtRGF0YS5hcHBlbmQoIFwic291cmNlX3VybFwiLCB0aGlzLnNvdXJjZV91cmwgKTtcblx0Zm9ybURhdGEuYXBwZW5kKCBcImNvbHVtbnNcIiwgdGhpcy5zdHJpbmdGcm9tQ29sdW1ucyggdGhpcy5jb2x1bW5zICkgKTtcblx0Ly8gZm9ybURhdGEuYXBwZW5kKCBcImxheW91dFwiLCBKU09OLnN0cmluZ2lmeSggdGhpcy5sYXlvdXQubW9kZWwgKSApO1xuXG5cdC8vIHRoaXMuX29uVXBsb2FkU3VjY2Vzcygge1xuXHQvLyBcdHN0YXR1czogJ3N1Y2Nlc3MnLFxuXHQvLyBcdGRhdGE6IHtcblx0Ly8gXHRcdHRhYmxlX2lkOiAxXG5cdC8vIFx0fVxuXHQvLyB9KTtcblxuXHQkLmFqYXgoe1xuICAgICAgICB1cmw6IGNvbmZpZy5hcGkuaG9zdCArICcvY29sdW1ucy90YWJsZScsICAvL1NlcnZlciBzY3JpcHQgdG8gcHJvY2VzcyBkYXRhXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgY29udGVudFR5cGU6IGZhbHNlLFxuICAgICAgICBwcm9jZXNzRGF0YTogZmFsc2UsXG4gICAgICAgIGRhdGE6IGZvcm1EYXRhLFxuICAgICAgICBzdWNjZXNzOiB0aGlzLl9vblVwbG9hZFN1Y2Nlc3MuYmluZCggdGhpcyApXG4gICAgfSk7XG59O1xuXG5UYWJsZS5wcm90b3R5cGUuX3VwZGF0ZVRhYmxlID0gZnVuY3Rpb24oKSB7XG5cdHZhciBkYXRhID0ge1xuXHRcdHRpdGxlOiB0aGlzLnRpdGxlLFxuXHRcdHNvdXJjZTogdGhpcy5zb3VyY2UsXG5cdFx0c291cmNlX3VybDogdGhpcy5zb3VyY2VfdXJsLFxuXHRcdGxheW91dDogSlNPTi5zdHJpbmdpZnkoIHRoaXMubGF5b3V0Lm1vZGVsICksXG5cdFx0Y29sdW1uczogdGhpcy5zdHJpbmdGcm9tQ29sdW1ucyggdGhpcy5jb2x1bW5zIClcblx0fTtcblx0JC5wb3N0KGNvbmZpZy5hcGkuaG9zdCArICcvY29sdW1ucy90YWJsZS8nICsgdGhpcy5pZCwgZGF0YSwgdGhpcy5fb25VcGRhdGVTdWNjZXNzLmJpbmQoIHRoaXMgKSApO1xufTtcblxuVGFibGUucHJvdG90eXBlLl9zZXR1cEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gTGlzdGVuIGZvciBjb2x1bW4gbmFtZXMgcGFyc2luZ1xuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLlVwbG9hZFZpZXcuRGlkUGFyc2VDb2x1bW5OYW1lc0ZvckZpbGUnLCB0aGlzLl9vbkNvbHVtbk5hbWVzUGFyc2VkLmJpbmQoIHRoaXMgKSk7XG5cblx0Ly8gTGlzdGVuIGZvciByb3cgZGF0YSBwYXJzaW5nXG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuVXBsb2FkVmlldy5EaWRQYXJzZURhdGFSb3dGb3JGaWxlJywgdGhpcy5fb25Sb3dQYXJzZWQuYmluZCggdGhpcyApICk7XHRcblxuXHQvLyBMaXN0ZW4gZm9yIHBhcnNpbmcgY29tcGxldGlvblxuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLlVwbG9hZFZpZXcuRGlkQ29tcGxldGVQYXJzZUZvckZpbGUnLCB0aGlzLl9vblBhcnNlQ29tcGxldGUuYmluZCggdGhpcyApICk7XG5cblx0Ly8gTGlzdGVuIGZvciB1cGRhdGVzIGZyb20gdGhlIGRldGFpbHMgcGFuZWxcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5FbWJlZERldGFpbHNWaWV3LkRpZFVwZGF0ZVByb3BlcnR5V2l0aFZhbHVlJywgdGhpcy5fb25UYWJsZVVwZGF0ZS5iaW5kKCB0aGlzICkgKTtcblxuXHQvLyBMaXN0ZW4gZm9yIGxheW91dCB1cGRhdGVzXG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuTGF5b3V0LkRpZENoYW5nZScsIHRoaXMuX29uTGF5b3V0VXBkYXRlLmJpbmQoIHRoaXMgKSApO1xuXG59O1xuXG5UYWJsZS5wcm90b3R5cGUuX29uQ29sdW1uTmFtZXNQYXJzZWQgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cblx0dGhpcy5jb2x1bW5zID0gdGhpcy5pdGVtc0Zyb21Db2x1bW5OYW1lcyggZGF0YS5jb2x1bW5zICk7XG59O1xuXG5UYWJsZS5wcm90b3R5cGUuX29uUm93UGFyc2VkID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXHR2YXIgcm93ID0gZGF0YS5yb3csXG5cdFx0ZGF0YSA9IHt9O1xuXG5cdHJvdy5mb3JFYWNoKGZ1bmN0aW9uKCB2YWx1ZSwgaSApIHtcblx0XHRkYXRhWyB0aGlzLmNvbHVtbnNbIGkgXS51bmZvcm1hdHRlZFRpdGxlKCkgXSA9IHZhbHVlO1xuXHR9LmJpbmQoIHRoaXMgKSk7XG5cblx0dGhpcy5kYXRhLnB1c2goIGRhdGEgKTtcbn07XG5cblRhYmxlLnByb3RvdHlwZS5fb25QYXJzZUNvbXBsZXRlID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXG5cdHRoaXMuX3VwbG9hZEZpbGUoIGRhdGEuZmlsZSApO1xufTtcblxuVGFibGUucHJvdG90eXBlLl9vblVwbG9hZFN1Y2Nlc3MgPSBmdW5jdGlvbiggZGF0YSwgc3RhdHVzLCByZXF1ZXN0ICkge1xuXG5cdC8vIENoZWNrIGZvciBhIHNlcnZlci1zaWRlIGVycm9yXG5cdGlmICggZGF0YS5zdGF0dXMgIT09ICdzdWNjZXNzJyApIHtcblx0XHR0aGlzLl9vblVwbG9hZEZhaWwoIHJlcXVlc3QsIHN0YXR1cywgZGF0YS5tZXNzYWdlICk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gU2V0IHRoZSBUYWJsZSBJRFxuXHR0aGlzLl91cGRhdGUoe1xuXHRcdGlkOiBkYXRhLmRhdGEudGFibGVfaWRcblx0fSk7XG5cblx0dGhpcy5fZW1pdFVwbG9hZFN1Y2Nlc3MoKTtcbn07XG5cblRhYmxlLnByb3RvdHlwZS5fb25VcGxvYWRGYWlsID0gZnVuY3Rpb24oIHJlcXVlc3QsIHN0YXR1cywgZXJyb3IgKSB7XG5cblx0dGhpcy5fZW1pdFVwbG9hZEZhaWwoKTtcbn07XG5cblRhYmxlLnByb3RvdHlwZS5fb25VcGRhdGVTdWNjZXNzID0gZnVuY3Rpb24oIGRhdGEsIHN0YXR1cywgcmVxdWVzdCApIHtcblxuXHQvLyBDaGVjayBmb3IgYSBzZXJ2ZXItc2lkZSBlcnJvclxuXHRpZiAoIGRhdGEuc3RhdHVzICE9PSAnc3VjY2VzcycgKSB7XG5cdFx0dGhpcy5fZW1pdFVwZGF0ZUZhaWwoKTtcblx0XHRyZXR1cm47XG5cdH1cblxuXHR0aGlzLl9lbWl0VXBkYXRlU3VjY2VzcygpO1xufTtcblxuVGFibGUucHJvdG90eXBlLl9vblRhYmxlVXBkYXRlID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXHR2YXIgcHJvcHMgPSB7fTtcblxuXHRwcm9wc1sgZGF0YS5wcm9wZXJ0eSBdID0gZGF0YS52YWx1ZTtcblxuXHR0aGlzLl91cGRhdGUoIHByb3BzICk7XG5cdHRoaXMuX3VwZGF0ZVRhYmxlKCk7XG59O1xuXG5UYWJsZS5wcm90b3R5cGUuX29uTGF5b3V0VXBkYXRlID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXHR0aGlzLl91cGRhdGUoe1xuXHRcdGxheW91dDogZGF0YS5sYXlvdXRcblx0fSk7XG5cdHRoaXMuX3VwZGF0ZVRhYmxlKCk7XG59O1xuXG5UYWJsZS5wcm90b3R5cGUuc3RyaW5nRnJvbUNvbHVtbnMgPSBmdW5jdGlvbiggY29sdW1ucyApIHtcblxuXHRyZXR1cm4gY29sdW1ucy5tYXAoZnVuY3Rpb24oIGNvbHVtbiwgaSApIHtcblx0XHRyZXR1cm4gY29sdW1uLnRpdGxlO1xuXHR9KS5qb2luKCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRhYmxlOyIsIi8vIFdlIG5lZWQgdG8gdHJlYXQgbGF5b3V0IHByb3BlcnRpZXMgc2xpZ2h0bHkgZGlmZmVyZW50bHkgdGhhbiByZWd1bGFyIGNzcyBwcm9wZXJ0aWVzXG4vLyB0byBhY2NvdW50IGZvciBicm93c2VyLXNwZWNpZmljIHByZWZpeGVzXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0c3R5bGVzOiBbXG5cdFx0W3tcblx0XHRcdHByb3BlcnR5OiAnY29sb3InLFxuXHRcdFx0dmFsdWU6ICcjM2EzYTNhJ1xuXHRcdH1dLFxuXHRcdFt7XG5cdFx0XHRwcm9wZXJ0eTogJ2NvbG9yJyxcblx0XHRcdHZhbHVlOiAnIzg4OCdcblx0XHR9LHtcblx0XHRcdHByb3BlcnR5OiAnZm9udC1zaXplJyxcblx0XHRcdHZhbHVlOiAnMTRweCdcblx0XHR9LCB7XG5cdFx0XHRwcm9wZXJ0eTogJ21hcmdpbi10b3AnLFxuXHRcdFx0dmFsdWU6ICc0cHgnXG5cdFx0fV0sXG5cdFx0W3tcblx0XHRcdHByb3BlcnR5OiAnY29sb3InLFxuXHRcdFx0dmFsdWU6ICcjM2EzYTNhJ1xuXHRcdH0se1xuXHRcdFx0cHJvcGVydHk6ICdmb250LXNpemUnLFxuXHRcdFx0dmFsdWU6ICcyNHB4J1xuXHRcdH1dXHRcblx0XSxcblx0bGF5b3V0czogW1xuXHRcdFt7XG5cdFx0XHRwcm9wZXJ0eTogJ2ZsZXgtZGlyZWN0aW9uJyxcblx0XHRcdHZhbHVlOiAnY29sdW1uJ1xuXHRcdH0sIHtcblx0XHRcdHByb3BlcnR5OiAnYWxpZ24taXRlbXMnLFxuXHRcdFx0dmFsdWU6ICdmbGV4LXN0YXJ0J1xuXHRcdH1dXG5cdF1cbn07Il19
