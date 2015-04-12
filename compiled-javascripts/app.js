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
	env: env,
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
var Table 				= require('../models/Table.js');
var ItemView 			= require('./ItemsView.js');
var TemplateView 		= require('./TemplateView.js');
var StyleView 			= require('./StyleView.js');
var EmbedDetailsView 	= require('./EmbedDetailsView.js');
var UploadView 			= require('./UploadView.js');
var ColumnsEvent 	= require('../models/ColumnsEvent.js');
var ColumnsAnalytics 	= require('../models/ColumnsAnalytics.js');
var Config 				= require('../config.js');

var TEMPLATE 			= Columns.Templates['templates/desktop.hbs'];

function DesktopView() {

	this.table = new Table();
	this.items = new ItemsView();
	this.template = new TemplateView();
	this.style = new StyleView();
	this.embed = new EmbedDetailsView();
	this.upload = new UploadView();
}

DesktopView.prototype.render = function() {

	this.$desktop = $( TEMPLATE() );

	$('#app').append( this.$desktop );
	this.upload.render();

	this._setupAnalytics();
	this._emitRender();

	return this.$desktop;
};

DesktopView.prototype._emitRender = function() {
	ColumnsEvent.send( 'Columns.DesktopView.DidRender', {
		desktopView: this
	});
};

DesktopView.prototype._setupAnalytics = function() {

	// Set up analytics
	if ( Config.env === 'production' ) {
		$('head').append( Columns.Templates['templates/analytics.hbs']() );
		ColumnsAnalytics.send({
			category: 'navigation',
			action: 'arrived',
			label: 'app'
		});

		$('.columns-header-nav-home').click(function() {
			ColumnsAnalytics.send({
				category: 'button',
				action: 'click',
				label: 'home'
			});
		});
	}
};

module.exports = DesktopView;
},{"../config.js":2,"../models/ColumnsAnalytics.js":20,"../models/ColumnsEvent.js":21,"../models/Table.js":25,"./EmbedDetailsView.js":4,"./ItemsView.js":6,"./StyleView.js":13,"./TemplateView.js":16,"./UploadView.js":18}],4:[function(require,module,exports){
var ColumnsEvent 			= require('../models/ColumnsEvent.js');
var ColumnsAnalytics		= require('../models/ColumnsAnalytics.js');
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

	$('#app').append( this.$embed );
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

	this.$embed.find('.columns-copy-embed-url').on( 'click', this._onCopyClick.bind( this ) );
};

EmbedDetailsView.prototype._onTableUpload = function( event, data ) {
	this.table = data.table;
	this.render();
};

EmbedDetailsView.prototype._onEmbedButtonClick = function( event) {
	this.show();

	ColumnsAnalytics.send({
		category: 'button',
		action: 'click',
		label: 'embed'
	});
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

	ColumnsAnalytics.send({
		category: 'field',
		action: 'edit',
		label: property,
		table_id: this.table.id
	});
};

EmbedDetailsView.prototype._onCopyClick = function( event ) {
	ColumnsAnalytics.send({
		category: 'button',
		action: 'click',
		label: 'copy embed code',
		table_id: this.table.id
	});
};

module.exports = EmbedDetailsView;


},{"../config.js":2,"../models/ColumnsAnalytics.js":20,"../models/ColumnsEvent.js":21}],5:[function(require,module,exports){
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
},{"../models/ColumnsEvent.js":21}],6:[function(require,module,exports){
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
},{"../models/ColumnsEvent.js":21,"./ItemView.js":5}],7:[function(require,module,exports){
var RegisterView 	= require('./RegisterView.js');
var ThanksView 		= require('./ThanksView.js');

function MobileView() {
	this.register = new RegisterView();
	this.thanks = new ThanksView();
}

MobileView.prototype.render = function() {

	$('#app').addClass('mobile');
	this.$mobile = $("#app.mobile");

	// this.$mobile.append( this.register.render() );
	this.$mobile.append( this.thanks.render() );

	// this._setupAnalytics();
	// this._emitRender();

	return this.$mobile;
};

module.exports = MobileView;
},{"./RegisterView.js":8,"./ThanksView.js":17}],8:[function(require,module,exports){
var TEMPLATE = Columns.Templates['templates/register.hbs'];

function RegisterView() {

}

RegisterView.prototype.render = function() {

	this.$render = $( TEMPLATE() );
	return this.$render;
};

module.exports = RegisterView;
},{}],9:[function(require,module,exports){
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
},{"../models/ColumnsEvent.js":21,"./StyleInputView.js":10,"./StyleMultipleSegmentedButtonView.js":11,"./StyleSegmentedButtonView.js":12}],10:[function(require,module,exports){
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
},{"../models/ColumnsEvent.js":21}],11:[function(require,module,exports){
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
},{"../models/ColumnsEvent.js":21}],12:[function(require,module,exports){
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
},{"../models/ColumnsEvent.js":21}],13:[function(require,module,exports){
var ColumnsEvent 					= require('../models/ColumnsEvent.js');
var Columns 						= require('../../compiled-javascripts/styling/compiled-data.js');
var StyleComponentView 				= require('./StyleComponentView.js');
var TemplateGroupView 				= require('./TemplateGroupView.js');
var TemplateValueView 				= require('./TemplateValueView.js');

function StyleView() {
	this._setupEventListeners();
}

StyleView.prototype.render = function() {
	this.$style = $('#styling');
};

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

	// Listen to app render event
	ColumnsEvent.on( 'Columns.DesktopView.DidRender', this._onDesktopRender.bind( this ) );

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

StyleView.prototype._onDesktopRender = function( event, data ) {
	this.render();
}

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

},{"../../compiled-javascripts/styling/compiled-data.js":1,"../models/ColumnsEvent.js":21,"./StyleComponentView.js":9,"./TemplateGroupView.js":14,"./TemplateValueView.js":15}],14:[function(require,module,exports){
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
},{"../models/ColumnsEvent.js":21}],15:[function(require,module,exports){
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
},{"../models/ColumnsEvent.js":21}],16:[function(require,module,exports){
var ColumnsEvent 				= require('../models/ColumnsEvent.js');
var ColumnsAnalytics			= require('../models/ColumnsAnalytics.js');
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

	// Listen to app render event
	ColumnsEvent.on( 'Columns.DesktopView.DidRender', this._onDesktopRender.bind( this ) );
	
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

TemplateView.prototype._onDesktopRender = function( event, data ) {
	this._renderPreview();
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

		ColumnsAnalytics.send({
			category: 'template',
			action: 'remove',
			table_id: this.table.id
		});
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

	ColumnsAnalytics.send({
		category: 'template',
		action: 'add',
		table_id: this.table.id
	});

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
},{"../config.js":2,"../models/ColumnsAnalytics.js":20,"../models/ColumnsEvent.js":21,"./TemplateGroupView.js":14,"./TemplateValueView.js":15}],17:[function(require,module,exports){
var TEMPLATE = Columns.Templates['templates/thanks.hbs'];

function ThanksView() {

}

ThanksView.prototype.render = function() {

	this.$thanks = $( TEMPLATE() );
	return this.$thanks;
};

module.exports = ThanksView;
},{}],18:[function(require,module,exports){
var ColumnsEvent 		= require('../models/ColumnsEvent.js');
var ColumnsAnalytics 	= require('../models/ColumnsAnalytics.js');

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

	ColumnsAnalytics.send({
		category: 'button',
		action: 'click',
		label: 'upload'
	});
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

	ColumnsAnalytics.send({
		category: 'file',
		action: 'chosen'
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

},{"../models/ColumnsAnalytics.js":20,"../models/ColumnsEvent.js":21}],19:[function(require,module,exports){
var isMobile			= require('ismobilejs');
var Desktop 			= require('./controllers/DesktopView.js');
var Mobile 				= require('./controllers/MobileView.js');

var app;

// First, check to see if we're on mobile.
// If we are, load the mobile site instead
if ( isMobile.any ) {
	app = new Mobile();
} else {
	app = new Desktop();
}

app.render();

// Create the Table object
// var table = new Table();

// // Set up the Items View
// var items = new ItemsView();

// // Set up the Template
// var template = new TemplateView();

// // Set up the Style View
// var style = new StyleView();

// // Set up the Embed Panel
// var embed = new EmbedDetailsView();

// // Set up the Upload View
// var upload = new UploadView();
// upload.render();

// // Set up analytics
// if ( Config.env === 'production' ) {
// 	$('head').append( Columns.Templates['templates/analytics.hbs']() );
// 	ColumnsAnalytics.send({
// 		category: 'navigation',
// 		action: 'arrived',
// 		label: 'app'
// 	});

// 	$('.columns-header-nav-home').click(function() {
// 		ColumnsAnalytics.send({
// 			category: 'button',
// 			action: 'click',
// 			label: 'home'
// 		});
// 	});
// }




},{"./controllers/DesktopView.js":3,"./controllers/MobileView.js":7,"ismobilejs":27}],20:[function(require,module,exports){
var Config = require('../config.js');

module.exports = ColumnsAnalytics;

function ColumnsAnalytics() {}

ColumnsAnalytics.send = function( props ) {
	var props = props || {},
		mixpanelObj = {};

	// Make sure the properties are santized
	props.action = props.action || '';
	props.category = props.category || '';
	props.label = props.label || '';
	props.description = props.description || props.category + ' ' + props.action + ' ' + props.label;
	props.description = props.description == '  ' ? '' : props.description;
	if ( props.table_id ) {
		mixpanelObj['Table ID'] = props.table_id;
	}

	// Send a Google Analytics event
	if ( window.ga ) {
		ga( 'send', 'event', props.category, props.action, props.label, props.table_id );
	}

	// Send a mixpanel event
	if ( window.mixpanel ) {
		mixpanel.track( props.description, mixpanelObj );
	}

};
},{"../config.js":2}],21:[function(require,module,exports){
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
},{}],22:[function(require,module,exports){
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
},{"./ColumnsEvent.js":21,"./Style.js":24}],23:[function(require,module,exports){
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
},{"../styling/defaults.js":26,"./ColumnsEvent.js":21}],24:[function(require,module,exports){
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
},{"./ColumnsEvent.js":21}],25:[function(require,module,exports){
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
},{"../config.js":2,"../styling/defaults.js":26,"./ColumnsEvent.js":21,"./Item.js":22,"./Layout.js":23}],26:[function(require,module,exports){
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
},{}],27:[function(require,module,exports){
/**
 * isMobile.js v0.3.5
 *
 * A simple library to detect Apple phones and tablets,
 * Android phones and tablets, other mobile devices (like blackberry, mini-opera and windows phone),
 * and any kind of seven inch device, via user agent sniffing.
 *
 * @author: Kai Mallea (kmallea@gmail.com)
 *
 * @license: http://creativecommons.org/publicdomain/zero/1.0/
 */
(function (global) {

    var apple_phone         = /iPhone/i,
        apple_ipod          = /iPod/i,
        apple_tablet        = /iPad/i,
        android_phone       = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i, // Match 'Android' AND 'Mobile'
        android_tablet      = /Android/i,
        windows_phone       = /IEMobile/i,
        windows_tablet      = /(?=.*\bWindows\b)(?=.*\bARM\b)/i, // Match 'Windows' AND 'ARM'
        other_blackberry    = /BlackBerry/i,
        other_blackberry_10 = /BB10/i,
        other_opera         = /Opera Mini/i,
        other_firefox       = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i, // Match 'Firefox' AND 'Mobile'
        seven_inch = new RegExp(
            '(?:' +         // Non-capturing group

            'Nexus 7' +     // Nexus 7

            '|' +           // OR

            'BNTV250' +     // B&N Nook Tablet 7 inch

            '|' +           // OR

            'Kindle Fire' + // Kindle Fire

            '|' +           // OR

            'Silk' +        // Kindle Fire, Silk Accelerated

            '|' +           // OR

            'GT-P1000' +    // Galaxy Tab 7 inch

            ')',            // End non-capturing group

            'i');           // Case-insensitive matching

    var match = function(regex, userAgent) {
        return regex.test(userAgent);
    };

    var IsMobileClass = function(userAgent) {
        var ua = userAgent || navigator.userAgent;

        this.apple = {
            phone:  match(apple_phone, ua),
            ipod:   match(apple_ipod, ua),
            tablet: match(apple_tablet, ua),
            device: match(apple_phone, ua) || match(apple_ipod, ua) || match(apple_tablet, ua)
        };
        this.android = {
            phone:  match(android_phone, ua),
            tablet: !match(android_phone, ua) && match(android_tablet, ua),
            device: match(android_phone, ua) || match(android_tablet, ua)
        };
        this.windows = {
            phone:  match(windows_phone, ua),
            tablet: match(windows_tablet, ua),
            device: match(windows_phone, ua) || match(windows_tablet, ua)
        };
        this.other = {
            blackberry:   match(other_blackberry, ua),
            blackberry10: match(other_blackberry_10, ua),
            opera:        match(other_opera, ua),
            firefox:      match(other_firefox, ua),
            device:       match(other_blackberry, ua) || match(other_blackberry_10, ua) || match(other_opera, ua) || match(other_firefox, ua)
        };
        this.seven_inch = match(seven_inch, ua);
        this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch;
        // excludes 'other' devices and ipods, targeting touchscreen phones
        this.phone = this.apple.phone || this.android.phone || this.windows.phone;
        // excludes 7 inch devices, classifying as phone or tablet is left to the user
        this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet;

        if (typeof window === 'undefined') {
            return this;
        }
    };

    var instantiate = function() {
        var IM = new IsMobileClass();
        IM.Class = IsMobileClass;
        return IM;
    };

    if (typeof module != 'undefined' && module.exports && typeof window === 'undefined') {
        //node
        module.exports = IsMobileClass;
    } else if (typeof module != 'undefined' && module.exports && typeof window !== 'undefined') {
        //browserify
        module.exports = instantiate();
    } else if (typeof define === 'function' && define.amd) {
        //AMD
        define(global.isMobile = instantiate());
    } else {
        global.isMobile = instantiate();
    }

})(this);

},{}]},{},[19])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb21waWxlZC1qYXZhc2NyaXB0cy9zdHlsaW5nL2NvbXBpbGVkLWRhdGEuanMiLCJqYXZhc2NyaXB0cy9jb25maWcuanMiLCJqYXZhc2NyaXB0cy9jb250cm9sbGVycy9EZXNrdG9wVmlldy5qcyIsImphdmFzY3JpcHRzL2NvbnRyb2xsZXJzL0VtYmVkRGV0YWlsc1ZpZXcuanMiLCJqYXZhc2NyaXB0cy9jb250cm9sbGVycy9JdGVtVmlldy5qcyIsImphdmFzY3JpcHRzL2NvbnRyb2xsZXJzL0l0ZW1zVmlldy5qcyIsImphdmFzY3JpcHRzL2NvbnRyb2xsZXJzL01vYmlsZVZpZXcuanMiLCJqYXZhc2NyaXB0cy9jb250cm9sbGVycy9SZWdpc3RlclZpZXcuanMiLCJqYXZhc2NyaXB0cy9jb250cm9sbGVycy9TdHlsZUNvbXBvbmVudFZpZXcuanMiLCJqYXZhc2NyaXB0cy9jb250cm9sbGVycy9TdHlsZUlucHV0Vmlldy5qcyIsImphdmFzY3JpcHRzL2NvbnRyb2xsZXJzL1N0eWxlTXVsdGlwbGVTZWdtZW50ZWRCdXR0b25WaWV3LmpzIiwiamF2YXNjcmlwdHMvY29udHJvbGxlcnMvU3R5bGVTZWdtZW50ZWRCdXR0b25WaWV3LmpzIiwiamF2YXNjcmlwdHMvY29udHJvbGxlcnMvU3R5bGVWaWV3LmpzIiwiamF2YXNjcmlwdHMvY29udHJvbGxlcnMvVGVtcGxhdGVHcm91cFZpZXcuanMiLCJqYXZhc2NyaXB0cy9jb250cm9sbGVycy9UZW1wbGF0ZVZhbHVlVmlldy5qcyIsImphdmFzY3JpcHRzL2NvbnRyb2xsZXJzL1RlbXBsYXRlVmlldy5qcyIsImphdmFzY3JpcHRzL2NvbnRyb2xsZXJzL1RoYW5rc1ZpZXcuanMiLCJqYXZhc2NyaXB0cy9jb250cm9sbGVycy9VcGxvYWRWaWV3LmpzIiwiamF2YXNjcmlwdHMvbWFpbi5qcyIsImphdmFzY3JpcHRzL21vZGVscy9Db2x1bW5zQW5hbHl0aWNzLmpzIiwiamF2YXNjcmlwdHMvbW9kZWxzL0NvbHVtbnNFdmVudC5qcyIsImphdmFzY3JpcHRzL21vZGVscy9JdGVtLmpzIiwiamF2YXNjcmlwdHMvbW9kZWxzL0xheW91dC5qcyIsImphdmFzY3JpcHRzL21vZGVscy9TdHlsZS5qcyIsImphdmFzY3JpcHRzL21vZGVscy9UYWJsZS5qcyIsImphdmFzY3JpcHRzL3N0eWxpbmcvZGVmYXVsdHMuanMiLCJub2RlX21vZHVsZXMvaXNtb2JpbGVqcy9pc01vYmlsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNySUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25wQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0tBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIkNvbHVtbnNbJ3N0eWxlRGF0YSddID0ge1xuXHRjb21wb25lbnRzOiB7fSxcblx0dHlwZXM6IHt9XG59O1xuQ29sdW1ucy5zdHlsZURhdGEuY29tcG9uZW50c1snaXRlbXMnXSA9IHtcblx0dGl0bGU6ICdJdGVtcycsXG5cdHJvd3M6IFt7XG5cdFx0aXRlbXM6IFt7XG5cdFx0XHRraW5kOiAnc2VnbWVudGVkLWJ1dHRvbicsXG5cdFx0XHRsYWJlbDogJ0xheW91dCcsXG5cdFx0XHRwcm9wZXJ0eToge1xuXHRcdFx0XHRuYW1lOidmbGV4LWRpcmVjdGlvbidcblx0XHRcdH0sXG5cdFx0XHRidXR0b25zOiBbe1xuXHRcdFx0XHR2YWx1ZTogJ3JvdycsXG5cdFx0XHRcdGljb246ICdsYXlvdXQtaG9yaXpvbnRhbCdcblx0XHRcdH0sIHtcblx0XHRcdFx0dmFsdWU6ICdjb2x1bW4nLFxuXHRcdFx0XHRpY29uOiAnbGF5b3V0LXZlcnRpY2FsJ1xuXHRcdFx0fV1cblx0XHR9LCB7XG5cdFx0XHRraW5kOiAnc2VnbWVudGVkLWJ1dHRvbicsXG5cdFx0XHRsYWJlbDogJ0FsaWdubWVudCcsXG5cdFx0XHRwcm9wZXJ0eToge1xuXHRcdFx0XHRuYW1lOidhbGlnbi1pdGVtcydcblx0XHRcdH0sXG5cdFx0XHRidXR0b25zOiBbe1xuXHRcdFx0XHR2YWx1ZTogJ2ZsZXgtc3RhcnQnLFxuXHRcdFx0XHRpY29uOiAncG9zaXRpb24tbGVmdCdcblx0XHRcdH0sIHtcblx0XHRcdFx0dmFsdWU6ICdjZW50ZXInLFxuXHRcdFx0XHRpY29uOiAncG9zaXRpb24tY2VudGVyJ1xuXHRcdFx0fSwge1xuXHRcdFx0XHR2YWx1ZTogJ2ZsZXgtZW5kJyxcblx0XHRcdFx0aWNvbjogJ3Bvc2l0aW9uLXJpZ2h0J1xuXHRcdFx0fV1cblx0XHR9XVxuXHR9XVxufVxuQ29sdW1ucy5zdHlsZURhdGEuY29tcG9uZW50c1snbWFyZ2lucyddID0ge1xuXHR0aXRsZTogJ1NwYWNpbmcnLFxuXHRyb3dzOiBbe1xuXHRcdGl0ZW1zOiBbe1xuXHRcdFx0a2luZDogJ2lucHV0Jyxcblx0XHRcdHR5cGU6ICd0ZWwnLFxuXHRcdFx0Y2FuQmVOZWdhdGl2ZTogdHJ1ZSxcblx0XHRcdHByZXBlbmRJY29uOiAnbWFyZ2luLXRvcCcsXG5cdFx0XHRhcHBlbmRDb250cm9sczogdHJ1ZSxcblx0XHRcdGxhYmVsOiAnVG9wJyxcblx0XHRcdHByb3BlcnR5OiAnbWFyZ2luLXRvcCcsXG5cdFx0XHRkZWZhdWx0OiAnMHB4J1xuXHRcdH0sIHtcblx0XHRcdGtpbmQ6ICdpbnB1dCcsXG5cdFx0XHR0eXBlOiAndGVsJyxcblx0XHRcdGNhbkJlTmVnYXRpdmU6IHRydWUsXG5cdFx0XHRwcmVwZW5kSWNvbjogJ21hcmdpbi1ib3R0b20nLFxuXHRcdFx0YXBwZW5kQ29udHJvbHM6IHRydWUsXG5cdFx0XHRsYWJlbDogJ0JvdHRvbScsXG5cdFx0XHRwcm9wZXJ0eTogJ21hcmdpbi1ib3R0b20nLFxuXHRcdFx0ZGVmYXVsdDogJzBweCdcblx0XHR9XVxuXHR9LCB7XG5cdFx0aXRlbXM6IFt7XG5cdFx0XHRraW5kOiAnaW5wdXQnLFxuXHRcdFx0dHlwZTogJ3RlbCcsXG5cdFx0XHRjYW5CZU5lZ2F0aXZlOiB0cnVlLFxuXHRcdFx0cHJlcGVuZEljb246ICdtYXJnaW4tbGVmdCcsXG5cdFx0XHRhcHBlbmRDb250cm9sczogdHJ1ZSxcblx0XHRcdGxhYmVsOiAnTGVmdCcsXG5cdFx0XHRwcm9wZXJ0eTogJ21hcmdpbi1sZWZ0Jyxcblx0XHRcdGRlZmF1bHQ6ICcwcHgnXG5cdFx0fSwge1xuXHRcdFx0a2luZDogJ2lucHV0Jyxcblx0XHRcdHR5cGU6ICd0ZWwnLFxuXHRcdFx0Y2FuQmVOZWdhdGl2ZTogdHJ1ZSxcblx0XHRcdHByZXBlbmRJY29uOiAnbWFyZ2luLXJpZ2h0Jyxcblx0XHRcdGFwcGVuZENvbnRyb2xzOiB0cnVlLFxuXHRcdFx0bGFiZWw6ICdSaWdodCcsXG5cdFx0XHRwcm9wZXJ0eTogJ21hcmdpbi1yaWdodCcsXG5cdFx0XHRkZWZhdWx0OiAnMHB4J1xuXHRcdH1dXG5cdH1dXG59O1xuQ29sdW1ucy5zdHlsZURhdGEuY29tcG9uZW50c1sndGV4dCddID0ge1xuXHR0aXRsZTogJ1RleHQnLFxuXHRyb3dzOiBbe1xuXHRcdGl0ZW1zOiBbe1xuXHRcdFx0a2luZDogJ2lucHV0Jyxcblx0XHRcdHR5cGU6ICd0ZWwnLFxuXHRcdFx0cHJlcGVuZEljb246IGZhbHNlLFxuXHRcdFx0YXBwZW5kQ29udHJvbHM6IHRydWUsXG5cdFx0XHRsYWJlbDogJ1NpemUnLFxuXHRcdFx0cHJvcGVydHk6ICdmb250LXNpemUnLFxuXHRcdFx0ZGVmYXVsdDogJzE0cHgnXG5cdFx0fSwge1xuXHRcdFx0a2luZDogJ211bHRpcGxlLXNlZ21lbnRlZC1idXR0b24nLFxuXHRcdFx0bGFiZWw6ICdTdHlsZScsXG5cdFx0XHRidXR0b25zOiBbe1xuXHRcdFx0XHRwcm9wZXJ0eToge1xuXHRcdFx0XHRcdG5hbWU6ICdmb250LXdlaWdodCdcblx0XHRcdFx0fSxcblx0XHRcdFx0dmFsdWVzOiB7XG5cdFx0XHRcdFx0YWN0aXZlOiAnYm9sZCcsXG5cdFx0XHRcdFx0aW5hY3RpdmU6ICdub3JtYWwnLFxuXHRcdFx0XHRcdGRlZmF1bHQ6ICdub3JtYWwnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGljb246ICdib2xkJ1xuXHRcdFx0fSwge1xuXHRcdFx0XHRwcm9wZXJ0eToge1xuXHRcdFx0XHRcdG5hbWU6J2ZvbnQtc3R5bGUnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHZhbHVlczoge1xuXHRcdFx0XHRcdGFjdGl2ZTogJ2l0YWxpYycsXG5cdFx0XHRcdFx0aW5hY3RpdmU6ICdub3JtYWwnLFxuXHRcdFx0XHRcdGRlZmF1bHQ6ICdub3JtYWwnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGljb246ICdpdGFsaWMnXG5cdFx0XHR9LCB7XG5cdFx0XHRcdHByb3BlcnR5OiB7XG5cdFx0XHRcdFx0bmFtZTondGV4dC1kZWNvcmF0aW9uJ1xuXHRcdFx0XHR9LFxuXHRcdFx0XHR2YWx1ZXM6IHtcblx0XHRcdFx0XHRhY3RpdmU6ICd1bmRlcmxpbmUnLFxuXHRcdFx0XHRcdGluYWN0aXZlOiAnbm9uZScsXG5cdFx0XHRcdFx0ZGVmYXVsdDogJ25vbmUnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGljb246ICd1bmRlcmxpbmUnXG5cdFx0XHR9XVxuXHRcdH1dXG5cdH0sIHtcblx0XHRpdGVtczogW3tcblx0XHRcdGtpbmQ6ICdpbnB1dCcsXG5cdFx0XHR0eXBlOiAnY29sb3InLFxuXHRcdFx0cHJlcGVuZEljb246IGZhbHNlLFxuXHRcdFx0YXBwZW5kQ29udHJvbHM6IGZhbHNlLFxuXHRcdFx0bGFiZWw6ICdDb2xvcicsXG5cdFx0XHRwcm9wZXJ0eTogJ2NvbG9yJyxcblx0XHRcdGRlZmF1bHQ6ICcjM2EzYTNhJ1xuXHRcdH0sIHtcblx0XHRcdGtpbmQ6ICdzZWdtZW50ZWQtYnV0dG9uJyxcblx0XHRcdGxhYmVsOiAnQWxpZ25tZW50Jyxcblx0XHRcdHByb3BlcnR5OiB7XG5cdFx0XHRcdG5hbWU6ICd0ZXh0LWFsaWduJyxcblx0XHRcdFx0ZGVmYXVsdDogJ2xlZnQnXG5cdFx0XHR9LFxuXHRcdFx0YnV0dG9uczogW3tcblx0XHRcdFx0dmFsdWU6ICdsZWZ0Jyxcblx0XHRcdFx0aWNvbjogJ3RleHQtYWxpZ24tbGVmdCdcblx0XHRcdH0sIHtcblx0XHRcdFx0dmFsdWU6ICdjZW50ZXInLFxuXHRcdFx0XHRpY29uOiAndGV4dC1hbGlnbi1jZW50ZXInXG5cdFx0XHR9LCB7XG5cdFx0XHRcdHZhbHVlOiAncmlnaHQnLFxuXHRcdFx0XHRpY29uOiAndGV4dC1hbGlnbi1yaWdodCdcblx0XHRcdH1dXG5cdFx0fV1cblx0fV1cbn07XG5Db2x1bW5zLnN0eWxlRGF0YS50eXBlcyA9IHtcblx0dGV4dDogW1xuXHRcdENvbHVtbnMuc3R5bGVEYXRhLmNvbXBvbmVudHNbJ3RleHQnXSxcblx0XHRDb2x1bW5zLnN0eWxlRGF0YS5jb21wb25lbnRzWydtYXJnaW5zJ11cblx0XSxcblx0Z3JvdXA6IFtcblx0XHRDb2x1bW5zLnN0eWxlRGF0YS5jb21wb25lbnRzWydpdGVtcyddLFxuXHRdXG59O1xubW9kdWxlLmV4cG9ydHMgPSBDb2x1bW5zOyIsInZhciBlbnYgPSAne3tlbnZpcm9ubWVudH19Jztcbm1vZHVsZS5leHBvcnRzID0ge1xuXHRlbnY6IGVudixcblx0ZGV2ZWxvcG1lbnQ6IHtcblx0XHRhcGk6IHtcblx0XHRcdGhvc3Q6ICdodHRwOi8vMTI3LjAuMC4xOjgwODAnXG5cdFx0fSxcblx0XHR3ZWI6IHtcblx0XHRcdGhvc3Q6ICdodHRwOi8vMTI3LjAuMC4xJ1xuXHRcdH0sXG5cdFx0ZW1iZWQ6IHtcblx0XHRcdGhvc3Q6ICdodHRwOi8vMTI3LjAuMC4xJyxcblx0XHRcdHBhdGg6ICcvcHVibGljL2VtYmVkLXRhYmxlLmpzJ1xuXHRcdH1cblx0fSxcblx0c3RhZ2luZzoge1xuXHRcdGFwaToge1xuXHRcdFx0aG9zdDogJ2h0dHA6Ly9hcGlzdGcudGhlY29sdW1uc3Byb2plY3QuY29tJ1xuXHRcdH0sXG5cdFx0d2ViOiB7XG5cdFx0XHRob3N0OiAnaHR0cDovL2FwcHN0Zy50aGVjb2x1bW5zcHJvamVjdC5jb20nXG5cdFx0fSxcblx0XHRlbWJlZDoge1xuXHRcdFx0aG9zdDogJ2h0dHA6Ly9zdGcuY29sdW0ubnonLFxuXHRcdFx0cGF0aDogJy9wdWJsaWMvZW1iZWQtdGFibGUuanMnXG5cdFx0fVxuXHR9LFxuXHRwcm9kdWN0aW9uOiB7XG5cdFx0YXBpOiB7XG5cdFx0XHRob3N0OiAnaHR0cDovL2FwaS50aGVjb2x1bW5zcHJvamVjdC5jb20nXG5cdFx0fSxcblx0XHR3ZWI6IHtcblx0XHRcdGhvc3Q6ICdodHRwOi8vYXBwLnRoZWNvbHVtbnNwcm9qZWN0LmNvbSdcblx0XHR9LFxuXHRcdGVtYmVkOiB7XG5cdFx0XHRob3N0OiAnaHR0cDovL2NvbHVtLm56Jyxcblx0XHRcdHBhdGg6ICcvcHVibGljL2VtYmVkLXRhYmxlLmpzJ1xuXHRcdH1cblx0fVxufVtlbnZdOyIsInZhciBUYWJsZSBcdFx0XHRcdD0gcmVxdWlyZSgnLi4vbW9kZWxzL1RhYmxlLmpzJyk7XG52YXIgSXRlbVZpZXcgXHRcdFx0PSByZXF1aXJlKCcuL0l0ZW1zVmlldy5qcycpO1xudmFyIFRlbXBsYXRlVmlldyBcdFx0PSByZXF1aXJlKCcuL1RlbXBsYXRlVmlldy5qcycpO1xudmFyIFN0eWxlVmlldyBcdFx0XHQ9IHJlcXVpcmUoJy4vU3R5bGVWaWV3LmpzJyk7XG52YXIgRW1iZWREZXRhaWxzVmlldyBcdD0gcmVxdWlyZSgnLi9FbWJlZERldGFpbHNWaWV3LmpzJyk7XG52YXIgVXBsb2FkVmlldyBcdFx0XHQ9IHJlcXVpcmUoJy4vVXBsb2FkVmlldy5qcycpO1xudmFyIENvbHVtbnNFdmVudCBcdD0gcmVxdWlyZSgnLi4vbW9kZWxzL0NvbHVtbnNFdmVudC5qcycpO1xudmFyIENvbHVtbnNBbmFseXRpY3MgXHQ9IHJlcXVpcmUoJy4uL21vZGVscy9Db2x1bW5zQW5hbHl0aWNzLmpzJyk7XG52YXIgQ29uZmlnIFx0XHRcdFx0PSByZXF1aXJlKCcuLi9jb25maWcuanMnKTtcblxudmFyIFRFTVBMQVRFIFx0XHRcdD0gQ29sdW1ucy5UZW1wbGF0ZXNbJ3RlbXBsYXRlcy9kZXNrdG9wLmhicyddO1xuXG5mdW5jdGlvbiBEZXNrdG9wVmlldygpIHtcblxuXHR0aGlzLnRhYmxlID0gbmV3IFRhYmxlKCk7XG5cdHRoaXMuaXRlbXMgPSBuZXcgSXRlbXNWaWV3KCk7XG5cdHRoaXMudGVtcGxhdGUgPSBuZXcgVGVtcGxhdGVWaWV3KCk7XG5cdHRoaXMuc3R5bGUgPSBuZXcgU3R5bGVWaWV3KCk7XG5cdHRoaXMuZW1iZWQgPSBuZXcgRW1iZWREZXRhaWxzVmlldygpO1xuXHR0aGlzLnVwbG9hZCA9IG5ldyBVcGxvYWRWaWV3KCk7XG59XG5cbkRlc2t0b3BWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbigpIHtcblxuXHR0aGlzLiRkZXNrdG9wID0gJCggVEVNUExBVEUoKSApO1xuXG5cdCQoJyNhcHAnKS5hcHBlbmQoIHRoaXMuJGRlc2t0b3AgKTtcblx0dGhpcy51cGxvYWQucmVuZGVyKCk7XG5cblx0dGhpcy5fc2V0dXBBbmFseXRpY3MoKTtcblx0dGhpcy5fZW1pdFJlbmRlcigpO1xuXG5cdHJldHVybiB0aGlzLiRkZXNrdG9wO1xufTtcblxuRGVza3RvcFZpZXcucHJvdG90eXBlLl9lbWl0UmVuZGVyID0gZnVuY3Rpb24oKSB7XG5cdENvbHVtbnNFdmVudC5zZW5kKCAnQ29sdW1ucy5EZXNrdG9wVmlldy5EaWRSZW5kZXInLCB7XG5cdFx0ZGVza3RvcFZpZXc6IHRoaXNcblx0fSk7XG59O1xuXG5EZXNrdG9wVmlldy5wcm90b3R5cGUuX3NldHVwQW5hbHl0aWNzID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gU2V0IHVwIGFuYWx5dGljc1xuXHRpZiAoIENvbmZpZy5lbnYgPT09ICdwcm9kdWN0aW9uJyApIHtcblx0XHQkKCdoZWFkJykuYXBwZW5kKCBDb2x1bW5zLlRlbXBsYXRlc1sndGVtcGxhdGVzL2FuYWx5dGljcy5oYnMnXSgpICk7XG5cdFx0Q29sdW1uc0FuYWx5dGljcy5zZW5kKHtcblx0XHRcdGNhdGVnb3J5OiAnbmF2aWdhdGlvbicsXG5cdFx0XHRhY3Rpb246ICdhcnJpdmVkJyxcblx0XHRcdGxhYmVsOiAnYXBwJ1xuXHRcdH0pO1xuXG5cdFx0JCgnLmNvbHVtbnMtaGVhZGVyLW5hdi1ob21lJykuY2xpY2soZnVuY3Rpb24oKSB7XG5cdFx0XHRDb2x1bW5zQW5hbHl0aWNzLnNlbmQoe1xuXHRcdFx0XHRjYXRlZ29yeTogJ2J1dHRvbicsXG5cdFx0XHRcdGFjdGlvbjogJ2NsaWNrJyxcblx0XHRcdFx0bGFiZWw6ICdob21lJ1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRGVza3RvcFZpZXc7IiwidmFyIENvbHVtbnNFdmVudCBcdFx0XHQ9IHJlcXVpcmUoJy4uL21vZGVscy9Db2x1bW5zRXZlbnQuanMnKTtcbnZhciBDb2x1bW5zQW5hbHl0aWNzXHRcdD0gcmVxdWlyZSgnLi4vbW9kZWxzL0NvbHVtbnNBbmFseXRpY3MuanMnKTtcbnZhciBjb25maWcgXHRcdFx0XHRcdD0gcmVxdWlyZSgnLi4vY29uZmlnLmpzJyk7XG5cbnZhciBQQU5FTF9URU1QTEFURSBcdFx0XHQ9IENvbHVtbnMuVGVtcGxhdGVzWyd0ZW1wbGF0ZXMvcGFuZWxzL3BhbmVsLmhicyddLFxuXHRCT0RZX1RFTVBMQVRFIFx0XHRcdD0gQ29sdW1ucy5UZW1wbGF0ZXNbJ3RlbXBsYXRlcy9lbWJlZC1kZXRhaWxzLXBhbmVsL2JvZHkuaGJzJ10sXG5cdFNFTEVDVE9SIFx0XHRcdFx0PSAnI2VtYmVkLWRldGFpbHMtcGFuZWwnLFxuXHRDTE9TRV9CVVRUT05fU0VMRUNUT1IgXHQ9ICcuY29sdW1ucy1wYW5lbC1oZWFkZXItY2xvc2UtYnV0dG9uJyxcblx0QkxPQ0tFUl9TRUxFQ1RPUiBcdFx0PSAnLmNvbHVtbnMtcGFuZWwtYmxvY2tlcic7XG5cbmZ1bmN0aW9uIEVtYmVkRGV0YWlsc1ZpZXcoIHRhYmxlICkge1xuXHR0aGlzLnRhYmxlID0gdGFibGU7XG5cdHRoaXMuX3NldHVwRXZlbnRMaXN0ZW5lcnMoKTtcbn1cblxuRW1iZWREZXRhaWxzVmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oKSB7XG5cblx0dmFyICRlbWJlZCA9ICQoIFBBTkVMX1RFTVBMQVRFKHtcblx0XHRpZDogdGhpcy50YWJsZS5pZCxcblx0XHRoZWFkZXI6IHtcblx0XHRcdHRpdGxlOiAnRW1iZWQgRGV0YWlscydcblx0XHR9LFxuXHRcdGJvZHk6IEJPRFlfVEVNUExBVEUoe1xuXHRcdFx0dGl0bGU6IHRoaXMudGFibGUudGl0bGUsXG5cdFx0XHRzb3VyY2U6IHRoaXMudGFibGUuc291cmNlLFxuXHRcdFx0c291cmNlX3VybDogdGhpcy50YWJsZS5zb3VyY2VfdXJsLFxuXHRcdFx0dGFibGVfaWQ6IHRoaXMudGFibGUuaWQsXG5cdFx0XHR1cmw6IGNvbmZpZy5lbWJlZC5ob3N0ICsgY29uZmlnLmVtYmVkLnBhdGhcblx0XHR9KSxcblx0XHRmb290ZXI6IG51bGwsXG5cdH0pICk7XG5cblx0dGhpcy4kZW1iZWQgPSAkZW1iZWQ7XG5cdHRoaXMuX3NldHVwSW50ZXJhY3Rpb25MaXN0ZW5lcnMoKTtcblxuXHQkKCcjYXBwJykuYXBwZW5kKCB0aGlzLiRlbWJlZCApO1xuXHRyZXR1cm4gdGhpcy4kZW1iZWQ7XG59O1xuXG5FbWJlZERldGFpbHNWaWV3LnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24oKSB7XG5cdHRoaXMuJGVtYmVkLmFkZENsYXNzKCdhY3RpdmUnKTtcbn07XG5cbkVtYmVkRGV0YWlsc1ZpZXcucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbigpIHtcblx0dGhpcy4kZW1iZWQucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xufTtcblxuRW1iZWREZXRhaWxzVmlldy5wcm90b3R5cGUuX2VtaXRDaGFuZ2UgPSBmdW5jdGlvbiggcHJvcGVydHksIHZhbHVlICkge1xuXHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdC8vIGNvbHVtbnNFdmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuRW1iZWREZXRhaWxzVmlldy5EaWRVcGRhdGVQcm9wZXJ0eVdpdGhWYWx1ZScsIGZhbHNlLCBmYWxzZSwge1xuXHQvLyBcdGVtYmVkOiBcdHRoaXMsXG5cdC8vIFx0cHJvcGVydHk6IHByb3BlcnR5LFxuXHQvLyBcdHZhbHVlOiB2YWx1ZVxuXHQvLyB9KTtcblx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjb2x1bW5zRXZlbnQpO1xuXHRDb2x1bW5zRXZlbnQuc2VuZCggJ0NvbHVtbnMuRW1iZWREZXRhaWxzVmlldy5EaWRVcGRhdGVQcm9wZXJ0eVdpdGhWYWx1ZScsIHtcblx0XHRlbWJlZDogXHR0aGlzLFxuXHRcdHByb3BlcnR5OiBwcm9wZXJ0eSxcblx0XHR2YWx1ZTogdmFsdWVcblx0fSk7XG59O1xuXG5FbWJlZERldGFpbHNWaWV3LnByb3RvdHlwZS5fc2V0dXBFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uKCkge1xuXG5cdC8vIFNob3VsZCBsaXN0ZW4gZm9yIHRhYmxlIHVwbG9hZCBzdWNjZXNzXG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuVGFibGUuRGlkVXBsb2FkV2l0aFN1Y2Nlc3MnLCB0aGlzLl9vblRhYmxlVXBsb2FkLmJpbmQoIHRoaXMgKSApO1xufTtcblxuRW1iZWREZXRhaWxzVmlldy5wcm90b3R5cGUuX3NldHVwSW50ZXJhY3Rpb25MaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBTaG91bGQgbGlzdGVuIHRvIGNsaWNrcyBvbiB0aGUgZW1iZWQgYnV0dG9uXG5cdCQoJy5jb2x1bW5zLWhlYWRlci1uYXYtZW1iZWQnKS5vbiggJ2NsaWNrJywgdGhpcy5fb25FbWJlZEJ1dHRvbkNsaWNrLmJpbmQoIHRoaXMgKSApO1xuXG5cdC8vIFNob3VsZCBsaXN0ZW4gdG8gY2xpY2tzIG9uIHRoZSBoaWRlIGJ1dHRvblxuXHR0aGlzLiRlbWJlZC5maW5kKCBDTE9TRV9CVVRUT05fU0VMRUNUT1IgKS5vbiggJ2NsaWNrJywgdGhpcy5fb25DbG9zZUJ1dHRvbkNsaWNrLmJpbmQoIHRoaXMgKSApO1xuXG5cdC8vIFNob3VsZCBsaXN0ZW4gdG8gY2xpY2tzIG9uIHRoZSBibG9ja2VyXG5cdHRoaXMuJGVtYmVkLmZpbmQoIEJMT0NLRVJfU0VMRUNUT1IgKS5vbiggJ2NsaWNrJywgdGhpcy5fb25CbG9ja2VyQ2xpY2suYmluZCggdGhpcyApICk7XG5cblx0Ly8gU2hvdWxkIGxpc3RlbiB0byBrZXl1cCBldmVudHMgb24gaW5wdXQgZmllbGRzXG5cdHRoaXMuJGVtYmVkLmZpbmQoJ2lucHV0Jykub24oICdrZXl1cCcsIHRoaXMuX29uSW5wdXRLZXl1cC5iaW5kKCB0aGlzICkgKTtcblxuXHQvLyBTaG91bGQgbGlzdGVuIHRvIGJsdXIgZXZlbnRzIG9uIGlucHV0IGZpZWxkc1xuXHR0aGlzLiRlbWJlZC5maW5kKCdpbnB1dCcpLm9uKCAnYmx1cicsIHRoaXMuX29uSW5wdXRCbHVyLmJpbmQoIHRoaXMgKSApO1xuXG5cdHRoaXMuJGVtYmVkLmZpbmQoJy5jb2x1bW5zLWNvcHktZW1iZWQtdXJsJykub24oICdjbGljaycsIHRoaXMuX29uQ29weUNsaWNrLmJpbmQoIHRoaXMgKSApO1xufTtcblxuRW1iZWREZXRhaWxzVmlldy5wcm90b3R5cGUuX29uVGFibGVVcGxvYWQgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdHRoaXMudGFibGUgPSBkYXRhLnRhYmxlO1xuXHR0aGlzLnJlbmRlcigpO1xufTtcblxuRW1iZWREZXRhaWxzVmlldy5wcm90b3R5cGUuX29uRW1iZWRCdXR0b25DbGljayA9IGZ1bmN0aW9uKCBldmVudCkge1xuXHR0aGlzLnNob3coKTtcblxuXHRDb2x1bW5zQW5hbHl0aWNzLnNlbmQoe1xuXHRcdGNhdGVnb3J5OiAnYnV0dG9uJyxcblx0XHRhY3Rpb246ICdjbGljaycsXG5cdFx0bGFiZWw6ICdlbWJlZCdcblx0fSk7XG59O1xuXG5FbWJlZERldGFpbHNWaWV3LnByb3RvdHlwZS5fb25DbG9zZUJ1dHRvbkNsaWNrID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuXHR0aGlzLmhpZGUoKTtcbn07XG5cbkVtYmVkRGV0YWlsc1ZpZXcucHJvdG90eXBlLl9vbkJsb2NrZXJDbGljayA9IGZ1bmN0aW9uKCBldmVudCApIHtcblx0dGhpcy5oaWRlKCk7XG59O1xuXG5FbWJlZERldGFpbHNWaWV3LnByb3RvdHlwZS5fb25JbnB1dEtleXVwID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuXHR2YXIgJGZpZWxkIFx0XHQ9ICQoIGV2ZW50LnRhcmdldCApLFxuXHRcdHByb3BlcnR5XHQ9ICRmaWVsZC5kYXRhKCdwcm9wZXJ0eScpLFxuXHRcdHZhbHVlXHRcdD0gJGZpZWxkLnZhbCgpO1xuXG5cdHRoaXMuX2VtaXRDaGFuZ2UoIHByb3BlcnR5LCB2YWx1ZSApOyBcbn07XG5cbkVtYmVkRGV0YWlsc1ZpZXcucHJvdG90eXBlLl9vbklucHV0Qmx1ciA9IGZ1bmN0aW9uKCBldmVudCApIHtcblx0dmFyICRmaWVsZCBcdFx0PSAkKCBldmVudC50YXJnZXQgKSxcblx0XHRwcm9wZXJ0eVx0PSAkZmllbGQuZGF0YSgncHJvcGVydHknKSxcblx0XHR2YWx1ZVx0XHQ9ICRmaWVsZC52YWwoKTtcblxuXHR0aGlzLl9lbWl0Q2hhbmdlKCBwcm9wZXJ0eSwgdmFsdWUgKTsgXG5cblx0Q29sdW1uc0FuYWx5dGljcy5zZW5kKHtcblx0XHRjYXRlZ29yeTogJ2ZpZWxkJyxcblx0XHRhY3Rpb246ICdlZGl0Jyxcblx0XHRsYWJlbDogcHJvcGVydHksXG5cdFx0dGFibGVfaWQ6IHRoaXMudGFibGUuaWRcblx0fSk7XG59O1xuXG5FbWJlZERldGFpbHNWaWV3LnByb3RvdHlwZS5fb25Db3B5Q2xpY2sgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdENvbHVtbnNBbmFseXRpY3Muc2VuZCh7XG5cdFx0Y2F0ZWdvcnk6ICdidXR0b24nLFxuXHRcdGFjdGlvbjogJ2NsaWNrJyxcblx0XHRsYWJlbDogJ2NvcHkgZW1iZWQgY29kZScsXG5cdFx0dGFibGVfaWQ6IHRoaXMudGFibGUuaWRcblx0fSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVtYmVkRGV0YWlsc1ZpZXc7XG5cbiIsInZhciBDb2x1bW5zRXZlbnQgXHQ9IHJlcXVpcmUoJy4uL21vZGVscy9Db2x1bW5zRXZlbnQuanMnKTtcblxudmFyIERSQUdHSU5HX0NMQVNTID0gJ2RyYWdnaW5nJyxcblx0SU5BQ1RJVkVfQ0xBU1MgPSAnaW5hY3RpdmUnLFxuXHRTRUxFQ1RFRF9DTEFTUyA9ICdzZWxlY3RlZCcsXG5cdElURU1fU0VMRUNUT1IgPSAnLmxheW91dC1jb2x1bW4nO1xuXG4vLyBNYW5hZ2UgdGhlIGRpc3BsYXkgb2YgYSBzaW5nbGUgaXRlbVxuLy8gd2l0aGluIHRoZSBsaXN0IG9mIGl0ZW1zXG5JdGVtVmlldyA9IGZ1bmN0aW9uKCBpdGVtICkge1xuXG5cdHRoaXMuaXRlbSA9IGl0ZW0gfHwgbmV3IEl0ZW0oKTtcblx0dGhpcy50ZW1wbGF0ZSA9IENvbHVtbnMuVGVtcGxhdGVzWyd0ZW1wbGF0ZXMvbGF5b3V0L2NvbHVtbi5oYnMnXTtcblx0dGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xuXHR0aGlzLiRpdGVtO1xufTtcblxuSXRlbVZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgJGl0ZW0gPSAkKCB0aGlzLnRlbXBsYXRlKHtcblx0XHR0aXRsZTogdGhpcy5pdGVtLmZvcm1hdHRlZFRpdGxlKCksXG5cdFx0YWN0aXZlOiB0aGlzLml0ZW0uYWN0aXZlLFxuXHRcdHNlbGVjdGVkOiB0aGlzLnNlbGVjdGVkXG5cdH0pICk7XG5cdCRpdGVtLmRhdGEoJ3N0eWxlJywgdGhpcy5pdGVtLnN0eWxlLnN0eWxlcyk7XG5cdHRoaXMuJGl0ZW0gPSAkaXRlbTtcblxuXHR0aGlzLnNldHVwRXZlbnRzKCk7XG5cdHRoaXMuX3NldHVwRXZlbnRMaXN0ZW5lcnMoKTtcblxuXHRyZXR1cm4gdGhpcy4kaXRlbTtcbn07XG5cbkl0ZW1WaWV3LnByb3RvdHlwZS5zZXR1cEV2ZW50cyA9IGZ1bmN0aW9uKCkge1xuXG5cdC8vIE1ha2UgdGhlIGl0ZW0gZHJhZ2dhYmxlXG5cdHRoaXMuJGl0ZW0uZHJhZ2dhYmxlKHtcblx0XHRyZXZlcnQ6ICdpbnZhbGlkJyxcblx0XHRyZXZlcnREdXJhdGlvbjogMjAwLFxuXHRcdGhlbHBlcjogJ2Nsb25lJyxcblx0XHQvLyBvcGFjaXR5OiAuMixcblx0XHRjYW5jZWw6ICcuaW5hY3RpdmUnXG5cdH0pO1xuXG5cdHRoaXMuJGl0ZW0ub24oICdkcmFnc3RhcnQnLCAkLnByb3h5KGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XG5cblx0XHQvLyBNYWtlIGluYWN0aXZlXG5cdFx0JCggZXZlbnQudGFyZ2V0ICkuYWRkQ2xhc3MoIERSQUdHSU5HX0NMQVNTICk7XG5cblx0XHQvLyBBbGVydCBhbnkgbGlzdGVuZXJzIHRoYXQgdGhlIGl0ZW0gaGFzIHN0YXJ0ZWQgZHJhZ1xuXHRcdC8vIHZhciBldmVudCA9IG5ldyBDdXN0b21FdmVudCggJ0NvbHVtbnMuSXRlbVZpZXcuSXRlbURpZEJlZ2luRHJhZycsIHtcblx0XHQvLyBcdGl0ZW06IFx0dGhpcyxcblx0XHQvLyBcdGV2ZW50OiBcdGV2ZW50LFxuXHRcdC8vIFx0dWk6IFx0dWlcblx0XHQvLyB9KTtcblx0XHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdFx0Ly8gY29sdW1uc0V2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5JdGVtVmlldy5JdGVtRGlkQmVnaW5EcmFnJywgZmFsc2UsIGZhbHNlLCB7XG5cdFx0Ly8gXHRpdGVtOiBcdHRoaXMsXG5cdFx0Ly8gXHRldmVudDogXHRldmVudCxcblx0XHQvLyBcdHVpOiBcdHVpXG5cdFx0Ly8gfSk7XG5cdFx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjb2x1bW5zRXZlbnQpO1xuXHRcdENvbHVtbnNFdmVudC5zZW5kKCAnQ29sdW1ucy5JdGVtVmlldy5JdGVtRGlkQmVnaW5EcmFnJywge1xuXHRcdFx0aXRlbTogXHR0aGlzLFxuXHRcdFx0ZXZlbnQ6IFx0ZXZlbnQsXG5cdFx0XHR1aTogXHR1aVxuXHRcdH0gKVxuXG5cdH0sIHRoaXMpICk7XG5cblx0dGhpcy4kaXRlbS5vbiggJ2RyYWdzdG9wJywgJC5wcm94eShmdW5jdGlvbiggZXZlbnQsIHVpICkge1x0XHRcblxuXHRcdC8vIE1ha2UgYWN0aXZlIGFnYWluXG5cdFx0JCggZXZlbnQudGFyZ2V0ICkucmVtb3ZlQ2xhc3MoIERSQUdHSU5HX0NMQVNTICk7XG5cblx0XHQvLyBBbGVydCBhbnkgbGlzdGVuZXJzIHRoYXQgdGhlIGl0ZW0gaGFzIHN0YXJ0ZWQgZHJhZ1xuXHRcdC8vIHZhciBldmVudCA9IG5ldyBDdXN0b21FdmVudCggJ0NvbHVtbnMuSXRlbVZpZXcuSXRlbURpZEJFbmREcmFnJywge1xuXHRcdC8vIFx0aXRlbTogXHR0aGlzLFxuXHRcdC8vIFx0ZXZlbnQ6IFx0ZXZlbnQsXG5cdFx0Ly8gXHR1aTogXHR1aVxuXHRcdC8vIH0pO1xuXHRcdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0XHQvLyBjb2x1bW5zRXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLkl0ZW1WaWV3Lkl0ZW1EaWRFbmREcmFnJywgZmFsc2UsIGZhbHNlLCB7XG5cdFx0Ly8gXHRpdGVtOiBcdHRoaXMsXG5cdFx0Ly8gXHRldmVudDogXHRldmVudCxcblx0XHQvLyBcdHVpOiBcdHVpXG5cdFx0Ly8gfSk7XG5cdFx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjb2x1bW5zRXZlbnQpO1xuXHRcdENvbHVtbnNFdmVudC5zZW5kKCAnQ29sdW1ucy5JdGVtVmlldy5JdGVtRGlkRW5kRHJhZycsIHtcblx0XHRcdGl0ZW06IFx0dGhpcyxcblx0XHRcdGV2ZW50OiBcdGV2ZW50LFxuXHRcdFx0dWk6IFx0dWlcblx0XHR9IClcblxuXHR9LCB0aGlzKSApO1xuXG5cdHRoaXMuJGl0ZW0ub24oICdkcmFnJywgJC5wcm94eShmdW5jdGlvbiggZXZlbnQsIHVpICkge1xuXG5cdFx0Ly8gQWxlcnQgYW55IGxpc3RlbmVycyB0aGF0IHRoZSBpdGVtIGhhcyBzdGFydGVkIGRyYWdcblx0XHQvLyB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoICdDb2x1bW5zLkl0ZW1WaWV3Lkl0ZW1EaWREcmFnJywge1xuXHRcdC8vIFx0aXRlbTogXHR0aGlzLFxuXHRcdC8vIFx0ZXZlbnQ6IFx0ZXZlbnQsXG5cdFx0Ly8gXHR1aTogXHR1aVxuXHRcdC8vIH0pO1xuXHRcdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0XHQvLyBjb2x1bW5zRXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLkl0ZW1WaWV3Lkl0ZW1EaWREcmFnJywgZmFsc2UsIGZhbHNlLCB7XG5cdFx0Ly8gXHRpdGVtOiBcdHRoaXMsXG5cdFx0Ly8gXHRldmVudDogXHRldmVudCxcblx0XHQvLyBcdHVpOiBcdHVpXG5cdFx0Ly8gfSk7XG5cdFx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjb2x1bW5zRXZlbnQpO1xuXHRcdENvbHVtbnNFdmVudC5zZW5kKCAnQ29sdW1ucy5JdGVtVmlldy5JdGVtRGlkRHJhZycsIHtcblx0XHRcdGl0ZW06IFx0dGhpcyxcblx0XHRcdGV2ZW50OiBcdGV2ZW50LFxuXHRcdFx0dWk6IFx0dWlcblx0XHR9IClcblxuXHR9LCB0aGlzKSApO1xuXG5cdHRoaXMuJGl0ZW0ub24oICdjbGljaycsICQucHJveHkoZnVuY3Rpb24oIGV2ZW50ICkgeztcblxuXHRcdHRoaXMuX3NldFNlbGVjdGVkKCB0cnVlICk7XG5cblx0XHRDb2x1bW5zRXZlbnQuc2VuZCggJ0NvbHVtbnMuSXRlbVZpZXcuSXRlbURpZFNlbGVjdCcsIHtcblx0XHRcdGl0ZW1WaWV3OiBcdHRoaXMsXG5cdFx0XHRpdGVtOiBcdFx0dGhpcy5pdGVtXG5cdFx0fSApO1xuXG5cdH0sIHRoaXMgKSApO1xufTtcblxuSXRlbVZpZXcucHJvdG90eXBlLl9zZXRTZWxlY3RlZCA9IGZ1bmN0aW9uKCBzZWxlY3RlZCApIHtcblxuXHRpZiAoIHNlbGVjdGVkID09PSB0cnVlICkge1xuXHRcdHRoaXMuc2VsZWN0ZWQgPSB0cnVlO1xuXHRcdHRoaXMuJGl0ZW0uYWRkQ2xhc3MoIFNFTEVDVEVEX0NMQVNTICk7XG5cdH0gZWxzZSBpZiAoIHNlbGVjdGVkID09PSBmYWxzZSApIHtcblx0XHR0aGlzLnNlbGVjdGVkID0gZmFsc2U7XG5cdFx0dGhpcy4kaXRlbS5yZW1vdmVDbGFzcyggU0VMRUNURURfQ0xBU1MgKTtcblx0fVxufTtcblxuSXRlbVZpZXcucHJvdG90eXBlLl9zZXR1cEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gTGlzdGVuIHRvIHZhbHVlIHNlbGVjdGlvbiBldmVudHNcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5UZW1wbGF0ZVZhbHVlVmlldy5WYWx1ZURpZFNlbGVjdFdpdGhJdGVtJywgdGhpcy5fb25WYWx1ZVZpZXdTZWxlY3Rpb24uYmluZCggdGhpcyApKTtcblxuXHQvLyBMaXN0ZW4gdG8gaXRlbSB2aWV3IHNlbGVjdGlvbiBldmVudHNcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5JdGVtVmlldy5JdGVtRGlkU2VsZWN0JywgdGhpcy5fb25JdGVtU2VsZWN0aW9uLmJpbmQoIHRoaXMgKSk7XHRcbn07XG5cbkl0ZW1WaWV3LnByb3RvdHlwZS5fb25WYWx1ZVZpZXdTZWxlY3Rpb24gPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdHZhciBpdGVtID0gZGF0YS5pdGVtO1xuXG5cdGlmICggdGhpcy5pdGVtLmlzKCBpdGVtICkgKSB7XG5cdFx0dGhpcy5fc2V0U2VsZWN0ZWQoIHRydWUgKTtcblx0fSBlbHNlIHtcblx0XHR0aGlzLl9zZXRTZWxlY3RlZCggZmFsc2UgKTtcblx0fVxufTtcblxuSXRlbVZpZXcucHJvdG90eXBlLl9vbkl0ZW1TZWxlY3Rpb24gPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdHZhciBpdGVtID0gZGF0YS5pdGVtO1xuXG5cdGlmICggIXRoaXMuaXRlbS5pcyggaXRlbSApICkge1xuXHRcdHRoaXMuX3NldFNlbGVjdGVkKCBmYWxzZSApO1xuXHR9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEl0ZW1WaWV3OyIsInZhciBDb2x1bW5zRXZlbnQgXHQ9IHJlcXVpcmUoJy4uL21vZGVscy9Db2x1bW5zRXZlbnQuanMnKTtcbnZhciBJdGVtVmlldyBcdFx0PSByZXF1aXJlKCcuL0l0ZW1WaWV3LmpzJyk7XG5cbi8vIE1hbmFnZSB0aGUgZGlzcGxheSBvZiBhIGxpc3Qgb2YgaXRlbXNcbkl0ZW1zVmlldyA9IGZ1bmN0aW9uKCBpdGVtcyApIHtcblxuXHR0aGlzLml0ZW1zIFx0XHQ9IGl0ZW1zIHx8IFtdO1xuXHR0aGlzLnZpZXdzIFx0XHQ9IFtdO1xuXHR0aGlzLnRlbXBsYXRlIFx0PSBDb2x1bW5zLlRlbXBsYXRlc1sndGVtcGxhdGVzL2xheW91dC9jb2x1bW5zLmhicyddO1xuXHR0aGlzLiRpdGVtcztcblxuXHR0aGlzLnJlbmRlciggaXRlbXMgKTtcblx0dGhpcy5fc2V0dXBFdmVudExpc3RlbmVycygpO1xufTtcblxuSXRlbXNWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbigpIHtcblx0dmFyIGl0ZW1WaWV3LFxuXHRcdCRjb2x1bW5zID0gJCggdGhpcy50ZW1wbGF0ZSgpICk7XG5cblx0Ly8gUmVtb3ZlIGFueSBleGlzdGluZyBjb2x1bW5zXG5cdCQoJy5sYXlvdXQtY29sdW1ucycpLnJlbW92ZSgpO1xuXG5cdGlmICggdGhpcy5pdGVtcyApIHtcblx0XHR0aGlzLml0ZW1zLmZvckVhY2goZnVuY3Rpb24oIGl0ZW0sIGkgKSB7XG5cblx0XHRcdGl0ZW1WaWV3ID0gdGhpcy5pdGVtVmlld0Zvckl0ZW0oIGl0ZW0gKTtcblx0XHRcdFxuXHRcdFx0aWYgKCAhaXRlbVZpZXcgKSB7XG5cdFx0XHRcdGl0ZW1WaWV3ID0gbmV3IEl0ZW1WaWV3KCBpdGVtICk7XG5cdFx0XHRcdHRoaXMudmlld3MucHVzaCggaXRlbVZpZXcgKTtcblx0XHRcdH1cblxuXHRcdFx0JGNvbHVtbnMuYXBwZW5kKCBpdGVtVmlldy5yZW5kZXIoKSApO1xuXG5cdFx0fS5iaW5kKCB0aGlzICkpO1xuXHR9XG5cblx0JChcIiNjb2x1bW5zXCIpLmFwcGVuZCggJGNvbHVtbnMgKTtcblxuXHQvLyB0aGlzLnNldHVwRHJhZ0xpc3RlbmVycygkKHRoaXMuTEFZT1VUX0NPTFVNTl9TRUxFQ1RPUikpO1xuXHQvLyB0aGlzLnNldHVwRHJvcExpc3RlbmVycygpO1xuXG5cdHRoaXMuJGl0ZW1zID0gJGNvbHVtbnM7XG5cdHJldHVybiB0aGlzLiRpdGVtcztcbn07XG5cbkl0ZW1zVmlldy5wcm90b3R5cGUuaXRlbVZpZXdGb3JJdGVtID0gZnVuY3Rpb24oIGl0ZW0gKSB7XG5cdHZhciBpdGVtVmlldztcblxuXHRpZiAoIGl0ZW0gaW5zdGFuY2VvZiBJdGVtICYmIHRoaXMudmlld3MubGVuZ3RoICkge1xuXHRcdGl0ZW1WaWV3ID0gdGhpcy52aWV3cy5maWx0ZXIoZnVuY3Rpb24oIHZpZXcsIGkgKSB7XG5cdFx0XHRyZXR1cm4gdmlldy5pdGVtLnRpdGxlID09PSBpdGVtLnRpdGxlO1xuXHRcdH0uYmluZCggdGhpcyApIClbIDAgXTtcblx0fVxuXG5cdHJldHVybiBpdGVtVmlldztcbn07XG5cbkl0ZW1zVmlldy5wcm90b3R5cGUudXBkYXRlSXRlbSA9IGZ1bmN0aW9uKCBpdGVtICkge1xuXG5cdC8vIFJlLXJlbmRlciB0aGUgaXRlbVxuXHR0aGlzLml0ZW1zLmZvckVhY2goZnVuY3Rpb24oIG9sZEl0ZW0sIGkgKSB7XG5cblx0XHRpZiAoIG9sZEl0ZW0uaXMoIGl0ZW0gKSApIHtcblx0XHRcdHZhciBpdGVtVmlldyA9IHRoaXMuaXRlbVZpZXdGb3JJdGVtKCBpdGVtICk7XG5cdFx0XHR0aGlzLiRpdGVtcy5maW5kKCcubGF5b3V0LWNvbHVtbicpLmVxKCBpICkucmVwbGFjZVdpdGgoIGl0ZW1WaWV3LnJlbmRlcigpICk7XG5cdFx0fVxuXG5cdH0uYmluZCggdGhpcyApICk7XG5cblx0dGhpcy5fZW1pdENoYW5nZSgpO1xufTtcblxuSXRlbXNWaWV3LnByb3RvdHlwZS5fZW1pdENoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXHQvLyBMZXQgZXZlcnlvbmUga25vdyB0aGF0IHRoZSBpdGVtcyB2aWV3IGhhcyBjaGFuZ2VkXG5cdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0Ly8gY29sdW1uc0V2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5JdGVtc1ZpZXcuRGlkQ2hhbmdlJywgZmFsc2UsIGZhbHNlLCB7XG5cdC8vIFx0aXRlbXNWaWV3OiBcdHRoaXNcblx0Ly8gfSk7XG5cdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY29sdW1uc0V2ZW50KTtcblx0Q29sdW1uc0V2ZW50LnNlbmQoICdDb2x1bW5zLkl0ZW1zVmlldy5EaWRDaGFuZ2UnLCB7XG5cdFx0aXRlbXNWaWV3OiBcdHRoaXNcblx0fSk7XG5cbn07XG5cbkl0ZW1zVmlldy5wcm90b3R5cGUuX3NldHVwRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBMaXN0ZW4gZm9yIHRhYmxlIHVwZGF0ZXNcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5UYWJsZS5EaWRDaGFuZ2UnLCB0aGlzLl9vblRhYmxlQ2hhbmdlLmJpbmQoIHRoaXMgKSApO1xuXG5cdC8vIExpc3RlbiBmb3IgaXRlbSB1cGRhdGVzXG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuSXRlbS5EaWRDaGFuZ2UnLCB0aGlzLl9vbkl0ZW1DaGFuZ2UuYmluZCggdGhpcyApICk7XG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuSXRlbS5BY3RpdmVTdGF0ZURpZENoYW5nZScsIHRoaXMuX29uSXRlbUNoYW5nZS5iaW5kKCB0aGlzICkgKTtcbn07XG5cbkl0ZW1zVmlldy5wcm90b3R5cGUuX29uVGFibGVDaGFuZ2UgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cblx0dGhpcy5fdXBkYXRlV2l0aEl0ZW1zKCBkYXRhLnRhYmxlLmNvbHVtbnMgKTtcblx0dGhpcy5yZW5kZXIoKTtcbn07XG5cbkl0ZW1zVmlldy5wcm90b3R5cGUuX29uSXRlbUNoYW5nZSA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblx0dGhpcy51cGRhdGVJdGVtKCBkYXRhLml0ZW0gKTtcbn07XG5cbkl0ZW1zVmlldy5wcm90b3R5cGUuX3VwZGF0ZVdpdGhJdGVtcyA9IGZ1bmN0aW9uKCBpdGVtcyApIHtcblxuXHRpZiggaXRlbXMgKSB7XG5cblx0XHRpZiAoIEFycmF5LmlzQXJyYXkoIGl0ZW1zICkgKSB7XG5cblx0XHRcdGl0ZW1zLmZvckVhY2goZnVuY3Rpb24oIGl0ZW0gKSB7XG5cdFx0XHRcdHRoaXMuX3VwZGF0ZVdpdGhJdGVtKCBpdGVtICk7XG5cdFx0XHR9LmJpbmQoIHRoaXMgKSk7XG5cblx0XHRcdHRoaXMuX2VtaXRDaGFuZ2UoKTtcblxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aHJvdyBcImV4Y2VwdGlvbiBJdGVtcyBtdXN0IGJlIGFycmF5IG9mIGl0ZW1zIG9yIHNpbmdsZSBpdGVtXCI7XG5cdFx0fVxuXHR9XG59O1xuXG5JdGVtc1ZpZXcucHJvdG90eXBlLl91cGRhdGVXaXRoSXRlbSA9IGZ1bmN0aW9uKCBpdGVtICkge1xuXHR2YXIgZHVwbGljYXRlcyA9IFtdO1xuXG5cdGlmICggaXRlbSAmJiBpdGVtIGluc3RhbmNlb2YgSXRlbSApIHtcblx0XHRkdXBsaWNhdGVzID0gdGhpcy5pdGVtcy5maWx0ZXIoZnVuY3Rpb24oIGV4aXN0aW5nSXRlbSApIHtcblx0XHRcdHJldHVybiBleGlzdGluZ0l0ZW0uaXMoIGl0ZW0gKTtcblx0XHR9KTtcblxuXHRcdGlmICggIWR1cGxpY2F0ZXMubGVuZ3RoICkge1xuXHRcdFx0dGhpcy5pdGVtcy5wdXNoKCBpdGVtICk7XG5cdFx0fVxuXHR9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEl0ZW1zVmlldzsiLCJ2YXIgUmVnaXN0ZXJWaWV3IFx0PSByZXF1aXJlKCcuL1JlZ2lzdGVyVmlldy5qcycpO1xudmFyIFRoYW5rc1ZpZXcgXHRcdD0gcmVxdWlyZSgnLi9UaGFua3NWaWV3LmpzJyk7XG5cbmZ1bmN0aW9uIE1vYmlsZVZpZXcoKSB7XG5cdHRoaXMucmVnaXN0ZXIgPSBuZXcgUmVnaXN0ZXJWaWV3KCk7XG5cdHRoaXMudGhhbmtzID0gbmV3IFRoYW5rc1ZpZXcoKTtcbn1cblxuTW9iaWxlVmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oKSB7XG5cblx0JCgnI2FwcCcpLmFkZENsYXNzKCdtb2JpbGUnKTtcblx0dGhpcy4kbW9iaWxlID0gJChcIiNhcHAubW9iaWxlXCIpO1xuXG5cdC8vIHRoaXMuJG1vYmlsZS5hcHBlbmQoIHRoaXMucmVnaXN0ZXIucmVuZGVyKCkgKTtcblx0dGhpcy4kbW9iaWxlLmFwcGVuZCggdGhpcy50aGFua3MucmVuZGVyKCkgKTtcblxuXHQvLyB0aGlzLl9zZXR1cEFuYWx5dGljcygpO1xuXHQvLyB0aGlzLl9lbWl0UmVuZGVyKCk7XG5cblx0cmV0dXJuIHRoaXMuJG1vYmlsZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTW9iaWxlVmlldzsiLCJ2YXIgVEVNUExBVEUgPSBDb2x1bW5zLlRlbXBsYXRlc1sndGVtcGxhdGVzL3JlZ2lzdGVyLmhicyddO1xuXG5mdW5jdGlvbiBSZWdpc3RlclZpZXcoKSB7XG5cbn1cblxuUmVnaXN0ZXJWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbigpIHtcblxuXHR0aGlzLiRyZW5kZXIgPSAkKCBURU1QTEFURSgpICk7XG5cdHJldHVybiB0aGlzLiRyZW5kZXI7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlZ2lzdGVyVmlldzsiLCJ2YXIgQ29sdW1uc0V2ZW50IFx0XHRcdFx0XHRcdFx0PSByZXF1aXJlKCcuLi9tb2RlbHMvQ29sdW1uc0V2ZW50LmpzJyk7XG52YXIgU3R5bGVJbnB1dFZpZXcgXHRcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoJy4vU3R5bGVJbnB1dFZpZXcuanMnKTtcbnZhciBTdHlsZVNlZ21lbnRlZEJ1dHRvblZpZXcgXHRcdFx0XHQ9IHJlcXVpcmUoJy4vU3R5bGVTZWdtZW50ZWRCdXR0b25WaWV3LmpzJyk7XG52YXIgU3R5bGVNdWx0aXBsZVNlZ21lbnRlZEJ1dHRvblZpZXcgXHRcdD0gcmVxdWlyZSgnLi9TdHlsZU11bHRpcGxlU2VnbWVudGVkQnV0dG9uVmlldy5qcycpO1xuXG52YXIgQ09NUE9ORU5UX1RFTVBMQVRFIFx0PSBDb2x1bW5zLlRlbXBsYXRlc1sndGVtcGxhdGVzL3N0eWxpbmcvY29tcG9uZW50LmhicyddLFxuXHRTRUNUSU9OX1RFTVBMQVRFXHQ9IENvbHVtbnMuVGVtcGxhdGVzWyd0ZW1wbGF0ZXMvc3R5bGluZy9jb21wb25lbnQtc2VjdGlvbi5oYnMnXSxcblx0Uk9XX1RFTVBMQVRFXHRcdD0gQ29sdW1ucy5UZW1wbGF0ZXNbJ3RlbXBsYXRlcy9zdHlsaW5nL2NvbXBvbmVudC1zZWN0aW9uLXJvdy5oYnMnXTtcblxuZnVuY3Rpb24gU3R5bGVDb21wb25lbnRWaWV3KCBzZWxlY3Rpb24gKSB7XG5cblx0dGhpcy5pdGVtID0gc2VsZWN0aW9uO1xuXHQvLyB0aGlzLml0ZW0gPSBzZWxlY3Rpb24gPyB0aGlzLmdldEl0ZW1Gb3JTZWxlY3Rpb24oIHNlbGVjdGlvbiApIDogdW5kZWZpbmVkO1xuXHQvLyB0aGlzLnRlbXBsYXRlR3JvdXBzID0gdGhpcy5pdGVtID8gVGVtcGxhdGVWaWV3LmdldEdyb3Vwc0Zvckl0ZW0oIHRoaXMuaXRlbSApIDogW107XG59XG5cbi8vIFN0eWxlQ29tcG9uZW50Vmlldy5wcm90b3R5cGUuZ2V0SXRlbUZvclNlbGVjdGlvbiA9IGZ1bmN0aW9uKCBzZWxlY3Rpb24gKSB7XG5cbi8vIFx0aWYoIHNlbGVjdGlvbiBpbnN0YW5jZW9mIEl0ZW0gKSB7XG4vLyBcdFx0cmV0dXJuIHNlbGVjdGlvbjtcbi8vIFx0fSBlbHNlIGlmICggc2VsZWN0aW9uIGluc3RhbmNlb2YgSXRlbVZpZXcgKSB7XG4vLyBcdFx0cmV0dXJuIHNlbGVjdGlvbi5pdGVtO1xuLy8gXHR9IGVsc2UgaWYgKCBzZWxlY3Rpb24gaW5zdGFuY2VvZiBUZW1wbGF0ZVZhbHVlVmlldyApIHtcbi8vIFx0XHRyZXR1cm4gc2VsZWN0aW9uLml0ZW07XG4vLyBcdH0gZWxzZSBpZiAoIHNlbGVjdGlvbiBpbnN0YW5jZW9mIFRlbXBsYXRlR3JvdXBWaWV3ICkge1xuLy8gXHRcdHJldHVybiBzZWxlY3Rpb247XG4vLyBcdH0gZWxzZSB7XG4vLyBcdFx0dGhyb3cgXCJleGNlcHRpb246IFNlbGVjdGlvbiBtdXN0IGJlIGFuIEl0ZW0sIEl0ZW1WaWV3LCBUZW1wbGF0ZVZhbHVlVmlldyBvciBUZW1wbGF0ZUdyb3VwVmlld1wiO1xuLy8gXHR9XG4vLyB9O1xuXG4vLyBTdHlsZUNvbXBvbmVudFZpZXcucHJvdG90eXBlLmdldFRlbXBsYXRlc0Zvckl0ZW0gPSBmdW5jdGlvbiggaXRlbSApIHtcbi8vIFx0Ly8gdmFyIFxuLy8gfTtcblxuU3R5bGVDb21wb25lbnRWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBHZXQgdGhlIGFwcHJvcHJpYXRlIGRhdGEgZm9yIHRoZSBjdXJyZW50IGl0ZW1cblx0dmFyIHR5cGUgPSB0aGlzLml0ZW0gaW5zdGFuY2VvZiBUZW1wbGF0ZUdyb3VwVmlldyA/ICdncm91cCcgOiAndGV4dCcsXG5cdFx0dGl0bGUgPSB0aGlzLml0ZW0gaW5zdGFuY2VvZiBUZW1wbGF0ZUdyb3VwVmlldyA/IHRoaXMuaXRlbS50aXRsZSgpIDogdGhpcy5pdGVtLmZvcm1hdHRlZFRpdGxlKCksXG5cdFx0Y29tcG9uZW50RGF0YSA9IENvbHVtbnMuc3R5bGVEYXRhLnR5cGVzW3R5cGVdLFxuXHRcdCRjb21wb25lbnQsXG5cdFx0JGNvbXBvbmVudEJvZHksXG5cdFx0JHNlY3Rpb247XG5cblx0Ly8gRmlyc3QgY3JlYXRlIHRoZSBjb21wb25lbnQgc2tlbGV0b25cblx0JGNvbXBvbmVudCA9ICQoIENPTVBPTkVOVF9URU1QTEFURSh7XG5cdFx0dHlwZTogdHlwZSxcblx0XHRuYW1lOiB0aXRsZVxuXHR9KSApO1xuXG5cdCRjb21wb25lbnRCb2R5ID0gJGNvbXBvbmVudC5maW5kKCcuc3R5bGUtY29tcG9uZW50LWJvZHknKTtcblxuXHQvLyBOZXh0LCBsb29wIHRocm91Z2ggdGhlIGRhdGFcblx0Ly8gY3JlYXRpbmcgdGhlIHNlY3Rpb25zIGZyb20gdGhlIGluc2lkZSBvdXRcblx0Y29tcG9uZW50RGF0YS5mb3JFYWNoKGZ1bmN0aW9uKCBzZWN0aW9uLCBpICkge1xuXHRcdCRzZWN0aW9uID0gdGhpcy5fcmVuZGVyU2VjdGlvbiggc2VjdGlvbiApO1xuXHRcdCRjb21wb25lbnRCb2R5LmFwcGVuZCggJHNlY3Rpb24gKTtcblx0fS5iaW5kKCB0aGlzICkgKTtcblxuXHR0aGlzLiRzdHlsZSA9ICRjb21wb25lbnQ7XG5cdHRoaXMuX3NldHVwRXZlbnRMaXN0ZW5lcnMoKTtcblxuXHRpZiAoIHRoaXMuaXRlbSBpbnN0YW5jZW9mIFRlbXBsYXRlR3JvdXBWaWV3ICkge1xuXHRcdHRoaXMudXBkYXRlQWxpZ25tZW50QnV0dG9ucyggdGhpcy5pdGVtLmdldFN0eWxlKCdmbGV4LWRpcmVjdGlvbicpICk7XG5cdH1cblxuXHRyZXR1cm4gdGhpcy4kc3R5bGU7XG59O1xuXG5TdHlsZUNvbXBvbmVudFZpZXcucHJvdG90eXBlLl9yZW5kZXJTZWN0aW9uID0gZnVuY3Rpb24oIHNlY3Rpb24gKSB7XG5cdHZhciAkc2VjdGlvbixcblx0XHQkc2VjdGlvblJvd3MsXG5cdFx0JHJvdztcblxuXHQkc2VjdGlvbiA9ICQoIFNFQ1RJT05fVEVNUExBVEUoe1xuXHRcdHRpdGxlOiBzZWN0aW9uLnRpdGxlXG5cdH0pICk7XG5cblx0JHNlY3Rpb25Sb3dzID0gJHNlY3Rpb24uZmluZCgnLnN0eWxlLWNvbXBvbmVudC1zZWN0aW9uLXJvd3MnKTtcblxuXHQvLyBMb29wIHRocm91Z2ggZWFjaCBzZWN0aW9uLFxuXHQvLyBjcmVhdGluZyByb3dzIGZyb20gdGhlIGluc2lkZSBvdXRcblx0c2VjdGlvbi5yb3dzLmZvckVhY2goZnVuY3Rpb24oIHJvdywgaSkge1xuXHRcdCRyb3cgPSB0aGlzLl9yZW5kZXJSb3coIHJvdyApO1xuXHRcdCRzZWN0aW9uUm93cy5hcHBlbmQoICRyb3cgKTtcblx0fS5iaW5kKCB0aGlzICkgKTtcblxuXHRyZXR1cm4gJHNlY3Rpb247XG59O1xuXG5TdHlsZUNvbXBvbmVudFZpZXcucHJvdG90eXBlLl9yZW5kZXJSb3cgPSBmdW5jdGlvbiggcm93ICkge1xuXHR2YXIgJHJvdyxcblx0XHQkaXRlbTtcblxuXHQkcm93ID0gJCggUk9XX1RFTVBMQVRFKCkgKTtcblxuXHQvLyBMb29wIHRocm91Z2ggZWFjaCBpdGVtLFxuXHQvLyByZW5kZXJpbmcgaXQgcHJvcGVybHkgZGVwZW5kaW5nIG9uIGl0cyB0eXBlXG5cdHJvdy5pdGVtcy5mb3JFYWNoKGZ1bmN0aW9uKCBpdGVtLCBpICkge1xuXHRcdCRpdGVtID0gdGhpcy5fcmVuZGVySXRlbSggaXRlbSApO1xuXHRcdCRyb3cuYXBwZW5kKCAkaXRlbSApO1xuXHR9LmJpbmQoIHRoaXMgKSApO1xuXG5cdHJldHVybiAkcm93O1xuXG59O1xuXG5TdHlsZUNvbXBvbmVudFZpZXcucHJvdG90eXBlLl9yZW5kZXJJdGVtID0gZnVuY3Rpb24oIGl0ZW0gKSB7XG5cdHZhciBpdGVtO1xuXG5cdGlmICggaXRlbS5raW5kID09PSAnaW5wdXQnICkge1xuXG5cdFx0aXRlbSA9IG5ldyBTdHlsZUlucHV0Vmlldyh7XG5cdFx0XHRpdGVtOiB0aGlzLml0ZW0sXG5cdFx0XHR1bml0OiBpdGVtLnVuaXQsXG5cdFx0XHR0eXBlOiBpdGVtLnR5cGUsXG5cdFx0XHRjYW5CZU5lZ2F0aXZlOiBpdGVtLmNhbkJlTmVnYXRpdmUsXG5cdFx0XHRhcHBlbmRDb250cm9sczogaXRlbS5hcHBlbmRDb250cm9scyxcblx0XHRcdHByZXBlbmRJY29uOiBpdGVtLnByZXBlbmRJY29uLFxuXHRcdFx0bGFiZWw6IGl0ZW0ubGFiZWwsXG5cdFx0XHRwcm9wZXJ0eTogaXRlbS5wcm9wZXJ0eSxcblx0XHRcdHZhbHVlOiB0aGlzLml0ZW0uZ2V0U3R5bGUoIGl0ZW0ucHJvcGVydHkgKSB8fCBpdGVtLmRlZmF1bHRcblx0XHR9KTtcblx0XHRyZXR1cm4gaXRlbS5yZW5kZXIoKTtcblxuXHR9IGVsc2UgaWYgKCBpdGVtLmtpbmQgPT09ICdzZWdtZW50ZWQtYnV0dG9uJyApIHtcblxuXHRcdGl0ZW0gPSBuZXcgU3R5bGVTZWdtZW50ZWRCdXR0b25WaWV3KHtcblx0XHRcdGl0ZW06IHRoaXMuaXRlbSxcblx0XHRcdGxhYmVsOiBpdGVtLmxhYmVsLFxuXHRcdFx0cHJvcGVydHk6IGl0ZW0ucHJvcGVydHkubmFtZSxcblx0XHRcdGJ1dHRvbnM6IGl0ZW0uYnV0dG9ucyxcblx0XHRcdHZhbHVlOiB0aGlzLml0ZW0uZ2V0U3R5bGUoIGl0ZW0ucHJvcGVydHkubmFtZSApIHx8IGl0ZW0ucHJvcGVydHkuZGVmYXVsdFxuXHRcdH0pO1xuXHRcdHJldHVybiBpdGVtLnJlbmRlcigpO1xuXG5cdH0gZWxzZSBpZiAoIGl0ZW0ua2luZCA9PT0gJ211bHRpcGxlLXNlZ21lbnRlZC1idXR0b24nICkge1xuXG5cdFx0aXRlbSA9IG5ldyBTdHlsZU11bHRpcGxlU2VnbWVudGVkQnV0dG9uVmlldyh7XG5cdFx0XHRpdGVtOiB0aGlzLml0ZW0sXG5cdFx0XHRsYWJlbDogaXRlbS5sYWJlbCxcblx0XHRcdGJ1dHRvbnM6IGl0ZW0uYnV0dG9ucy5tYXAoZnVuY3Rpb24oIGJ1dHRvbiwgaSApIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRpY29uOiBidXR0b24uaWNvbixcblx0XHRcdFx0XHRwcm9wZXJ0eTogYnV0dG9uLnByb3BlcnR5Lm5hbWUsXG5cdFx0XHRcdFx0dmFsdWVzOiB7XG5cdFx0XHRcdFx0XHRhY3RpdmU6IGJ1dHRvbi52YWx1ZXMuYWN0aXZlLFxuXHRcdFx0XHRcdFx0aW5hY3RpdmU6IGJ1dHRvbi52YWx1ZXMuaW5hY3RpdmUsXG5cdFx0XHRcdFx0XHRjdXJyZW50OiB0aGlzLml0ZW0uZ2V0U3R5bGUoIGJ1dHRvbi5wcm9wZXJ0eS5uYW1lICkgfHwgYnV0dG9uLnZhbHVlcy5kZWZhdWx0XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXHRcdFx0fS5iaW5kKCB0aGlzICkpXG5cdFx0fSk7XG5cdFx0cmV0dXJuIGl0ZW0ucmVuZGVyKCk7XG5cblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHR9XG59O1xuXG5TdHlsZUNvbXBvbmVudFZpZXcucHJvdG90eXBlLl9zZXR1cEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gTGlzdGVuIGZvciBpbnB1dCB1cGRhdGVzXG5cdC8vIGlmIHRoaXMgaXMgZm9yIGEgZ3JvdXBcblx0aWYgKCB0aGlzLml0ZW0gaW5zdGFuY2VvZiBUZW1wbGF0ZUdyb3VwVmlldyApIHtcblx0XHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLlN0eWxlU2VnbWVudGVkQnV0dG9uVmlldy5WYWx1ZURpZFVwZGF0ZUZvclByb3BlcnR5QW5kSXRlbScsIHRoaXMuX29uU3R5bGVVcGRhdGUuYmluZCggdGhpcyApKTtcblx0fVxufTtcblxuU3R5bGVDb21wb25lbnRWaWV3LnByb3RvdHlwZS5fb25TdHlsZVVwZGF0ZSA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblxuXHQvLyBJZiB0aGlzIGlzIGEgY2hhbmdlIGZvciB0aGUgZmxleC1kaXJlY3Rpb24gcHJvcGVydHksXG5cdC8vIHVwZGF0ZSB0aGUgY2xhc3NlcyBvbiB0aGUgYWxpZ25tZW50IGJ1dHRvbnNcblx0aWYgKCBkYXRhLml0ZW0gPT09IHRoaXMuaXRlbSAmJiBkYXRhLnByb3BlcnR5ID09PSAnZmxleC1kaXJlY3Rpb24nICkge1xuXHRcdHRoaXMudXBkYXRlQWxpZ25tZW50QnV0dG9ucyggZGF0YS52YWx1ZSApO1xuXHR9XG59O1xuXG5TdHlsZUNvbXBvbmVudFZpZXcucHJvdG90eXBlLnVwZGF0ZUFsaWdubWVudEJ1dHRvbnMgPSBmdW5jdGlvbiggZGlyZWN0aW9uICkge1xuXHR2YXIgJGJ1dHRvbnMgPSB0aGlzLiRzdHlsZS5maW5kKCdbZGF0YS1wcm9wZXJ0eT1cImFsaWduLWl0ZW1zXCJdJyk7XG5cblx0aWYgKCBkaXJlY3Rpb24gPT09ICdjb2x1bW4nICkge1xuXHRcdCRidXR0b25zLmFkZENsYXNzKCdjb2x1bW4nKTtcblx0XHQkYnV0dG9ucy5yZW1vdmVDbGFzcygncm93Jyk7XG5cdH0gZWxzZSB7XG5cdFx0JGJ1dHRvbnMuYWRkQ2xhc3MoJ3JvdycpO1xuXHRcdCRidXR0b25zLnJlbW92ZUNsYXNzKCdjb2x1bW4nKTtcblx0fVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0eWxlQ29tcG9uZW50VmlldzsiLCJ2YXIgQ29sdW1uc0V2ZW50ID0gcmVxdWlyZSgnLi4vbW9kZWxzL0NvbHVtbnNFdmVudC5qcycpO1xuXG5mdW5jdGlvbiBTdHlsZUlucHV0Vmlldyggb3B0aW9ucyApIHtcblx0XG5cdHRoaXMudHlwZSA9ICd0ZWwnO1xuXHR0aGlzLnVuaXQgPSAnJztcblx0dGhpcy5jYW5CZU5lZ2F0aXZlID0gdHJ1ZTtcblx0dGhpcy5jYW5CZURlY2ltYWwgPSBmYWxzZTtcblx0dGhpcy5wcm9wZXJ0eSA9IHVuZGVmaW5lZDtcblx0dGhpcy52YWx1ZSA9IHVuZGVmaW5lZDtcblx0dGhpcy5wcmVwZW5kSWNvbiA9IHVuZGVmaW5lZDtcblx0dGhpcy5hcHBlbmRDb250cm9scyA9IGZhbHNlO1xuXHR0aGlzLmxhYmVsID0gJyc7XG5cdHRoaXMuaXRlbSA9IHVuZGVmaW5lZDtcblxuXHRpZiAoIG9wdGlvbnMgKSB7XG5cdFx0dGhpcy51bml0ID0gb3B0aW9ucy51bml0IHx8IHRoaXMudW5pdDtcblx0XHR0aGlzLnR5cGUgPSBvcHRpb25zLnR5cGUgfHwgdGhpcy50eXBlO1xuXHRcdHRoaXMuY2FuQmVOZWdhdGl2ZSA9IG9wdGlvbnMuY2FuQmVOZWdhdGl2ZSA9PT0gZmFsc2UgPyBmYWxzZSA6IHRoaXMuY2FuQmVOZWdhdGl2ZTtcblx0XHR0aGlzLmNhbkJlRGVjaW1hbCA9IG9wdGlvbnMuY2FuQmVEZWNpbWFsID09PSB0cnVlID8gdHJ1ZSA6IHRoaXMuY2FuQmVEZWNpbWFsO1xuXHRcdHRoaXMucHJvcGVydHkgPSBvcHRpb25zLnByb3BlcnR5IHx8IHRoaXMucHJvcGVydHk7XG5cdFx0dGhpcy52YWx1ZSA9IHRoaXMuZm9ybWF0VmFsdWUoIG9wdGlvbnMudmFsdWUgKSB8fCB0aGlzLnZhbHVlO1xuXHRcdHRoaXMucHJlcGVuZEljb24gPSBvcHRpb25zLnByZXBlbmRJY29uIHx8IHRoaXMucHJlcGVuZEljb247XG5cdFx0dGhpcy5hcHBlbmRDb250cm9scyA9IG9wdGlvbnMuYXBwZW5kQ29udHJvbHMgPT09IHRydWUgPyB0cnVlIDogdGhpcy5hcHBlbmRDb250cm9scztcblx0XHR0aGlzLmxhYmVsID0gb3B0aW9ucy5sYWJlbCB8fCB0aGlzLmxhYmVsO1xuXHRcdHRoaXMuaXRlbSA9IG9wdGlvbnMuaXRlbSB8fCB0aGlzLml0ZW07XG5cdH1cblxuXHR0aGlzLnRlbXBsYXRlID0gQ29sdW1ucy5UZW1wbGF0ZXNbJ3RlbXBsYXRlcy9zdHlsaW5nL2NvbXBvbmVudHMvaW5wdXQuaGJzJ107XG59XG5cblN0eWxlSW5wdXRWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbigpIHtcblxuXHR2YXIgdGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlKHtcblx0XHRwcmVwZW5kSWNvbjogdGhpcy5wcmVwZW5kSWNvbixcblx0XHRhcHBlbmRDb250cm9sczogdGhpcy5hcHBlbmRDb250cm9scyxcblx0XHR0eXBlOiB0aGlzLnR5cGUsXG5cdFx0cHJvcGVydHk6IHRoaXMucHJvcGVydHksXG5cdFx0dmFsdWU6IHRoaXMudmFsdWUsXG5cdFx0Y2FuQmVOZWdhdGl2ZTogdGhpcy5jYW5CZU5lZ2F0aXZlLFxuXHRcdGxhYmVsOiB0aGlzLmxhYmVsXG5cdH0pO1xuXG5cdHRoaXMuJHRlbXBsYXRlID0gJCggdGVtcGxhdGUgKTtcblxuXHQvLyBpZiAoIHRoaXMuYXBwZW5kQ29udHJvbHMgKSB7XG5cdFx0dGhpcy5fc2V0dXBDb250cm9scygpO1xuXHQvLyB9XG5cblx0cmV0dXJuIHRoaXMuJHRlbXBsYXRlO1xufVxuXG5TdHlsZUlucHV0Vmlldy5wcm90b3R5cGUuX3NldHVwQ29udHJvbHMgPSBmdW5jdGlvbigpIHtcblxuXHRpZiAoIHRoaXMudHlwZSA9PT0gJ2NvbG9yJyApIHtcblx0XHR0aGlzLiR0ZW1wbGF0ZS5maW5kKCdpbnB1dCcpLm9uKCAnaW5wdXQnLCB0aGlzLl9vbkNoYW5nZS5iaW5kKCB0aGlzICkgKTtcblx0fVxuXG5cdHRoaXMuJHRlbXBsYXRlLmZpbmQoJ2lucHV0Jykub24oICdrZXl1cCcsIHRoaXMuX29uQ2hhbmdlLmJpbmQoIHRoaXMgKSApO1xuXHR0aGlzLiR0ZW1wbGF0ZS5maW5kKCdpbnB1dCcpLm9uKCAnY2hhbmdlJywgdGhpcy5fb25DaGFuZ2UuYmluZCggdGhpcyApICk7XG5cdHRoaXMuJHRlbXBsYXRlLmZpbmQoJy5pbmNyZW1lbnQnKS5vbiggJ2NsaWNrJywgdGhpcy5fb25JbmNyZW1lbnQuYmluZCggdGhpcyApICk7XG5cdHRoaXMuJHRlbXBsYXRlLmZpbmQoJy5kZWNyZW1lbnQnKS5vbiggJ2NsaWNrJywgdGhpcy5fb25EZWNyZW1lbnQuYmluZCggdGhpcyApICk7XHRcbn1cblxuU3R5bGVJbnB1dFZpZXcucHJvdG90eXBlLl9vbkNoYW5nZSA9IGZ1bmN0aW9uKCBldmVudCApIHtcblx0dmFyIG5ld1ZhbHVlID0gdGhpcy5mb3JtYXRWYWx1ZSggdGhpcy4kdGVtcGxhdGUuZmluZCgnaW5wdXQnKS52YWwoKSApXG5cdHRoaXMudXBkYXRlKCBuZXdWYWx1ZSApO1xufVxuXG5TdHlsZUlucHV0Vmlldy5wcm90b3R5cGUuX29uSW5jcmVtZW50ID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuXHR2YXIgbmV3VmFsdWUgPSB0aGlzLmluY3JlbWVudCggdGhpcy4kdGVtcGxhdGUuZmluZCgnaW5wdXQnKS52YWwoKSApO1xuXHR0aGlzLnVwZGF0ZSggbmV3VmFsdWUgKTtcbn1cblxuU3R5bGVJbnB1dFZpZXcucHJvdG90eXBlLl9vbkRlY3JlbWVudCA9IGZ1bmN0aW9uKCBldmVudCApIHtcblx0dmFyIG5ld1ZhbHVlID0gdGhpcy5kZWNyZW1lbnQoIHRoaXMuJHRlbXBsYXRlLmZpbmQoJ2lucHV0JykudmFsKCkgKTtcblx0dGhpcy51cGRhdGUoIG5ld1ZhbHVlICk7XG59XG5cblN0eWxlSW5wdXRWaWV3LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdHRoaXMudmFsdWUgPSB2YWx1ZTtcblx0dGhpcy4kdGVtcGxhdGUuZmluZCgnaW5wdXQnKS52YWwoIHZhbHVlICk7XG5cblx0Ly8gQWxlcnQgYW55IGxpc3RlbmVycyB0aGF0IHRoZSBpdGVtIGhhcyBzdGFydGVkIGRyYWdcblx0Ly8gdmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCAnQ29sdW1ucy5TdHlsZUlucHV0Vmlldy5WYWx1ZURpZFVwZGF0ZUZvclByb3BlcnR5Jywge1xuXHQvLyBcdGl0ZW06IFx0dGhpcyxcblx0Ly8gXHRldmVudDogXHRldmVudCxcblx0Ly8gXHR1aTogXHR1aVxuXHQvLyB9KTtcblx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHQvLyBjb2x1bW5zRXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLlN0eWxlSW5wdXRWaWV3LlZhbHVlRGlkVXBkYXRlRm9yUHJvcGVydHlBbmRJdGVtJywgZmFsc2UsIGZhbHNlLCB7XG5cdC8vIFx0aXRlbTogdGhpcy5pdGVtLFxuXHQvLyBcdHByb3BlcnR5OiB0aGlzLnByb3BlcnR5LFxuXHQvLyBcdHZhbHVlOiBcdHZhbHVlXG5cdC8vIH0pO1xuXHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGNvbHVtbnNFdmVudCk7XG5cdENvbHVtbnNFdmVudC5zZW5kKCAnQ29sdW1ucy5TdHlsZUlucHV0Vmlldy5WYWx1ZURpZFVwZGF0ZUZvclByb3BlcnR5QW5kSXRlbScsIHtcblx0XHRpdGVtOiB0aGlzLml0ZW0sXG5cdFx0cHJvcGVydHk6IHRoaXMucHJvcGVydHksXG5cdFx0dmFsdWU6IFx0dmFsdWVcblx0fSApXG59XG5cblN0eWxlSW5wdXRWaWV3LnByb3RvdHlwZS5pbmNyZW1lbnQgPSBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdHZhciBwYXJzZWRWYWx1ZSA9IHRoaXMucGFyc2VWYWx1ZSggdmFsdWUgKSxcblx0XHRudW1iZXIgPSArcGFyc2VkVmFsdWUubnVtYmVyLFxuXHRcdHVuaXQgPSBwYXJzZWRWYWx1ZS51bml0LFxuXHRcdG5ld051bWJlcjtcblxuXHRuZXdOdW1iZXIgPSArcGFyc2VkVmFsdWUubnVtYmVyICsgMTtcblxuXHQvLyBGb3JtYXQgYW5kIHJldHVybiB0aGUgbmV3IHZhbHVlXG5cdHJldHVybiB0aGlzLmZvcm1hdFZhbHVlKCBuZXdOdW1iZXIgKyB1bml0ICk7XG59XG5cblN0eWxlSW5wdXRWaWV3LnByb3RvdHlwZS5kZWNyZW1lbnQgPSBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdHZhciBwYXJzZWRWYWx1ZSA9IHRoaXMucGFyc2VWYWx1ZSggdmFsdWUgKSxcblx0XHRudW1iZXIgPSArcGFyc2VkVmFsdWUubnVtYmVyLFxuXHRcdHVuaXQgPSBwYXJzZWRWYWx1ZS51bml0LFxuXHRcdG5ld051bWJlcjtcblxuXHRuZXdOdW1iZXIgPSArcGFyc2VkVmFsdWUubnVtYmVyIC0gMTtcblxuXHQvLyBGb3JtYXQgYW5kIHJldHVybiB0aGUgbmV3IHZhbHVlXG5cdHJldHVybiB0aGlzLmZvcm1hdFZhbHVlKCBuZXdOdW1iZXIgKyB1bml0ICk7XG59XG5cblN0eWxlSW5wdXRWaWV3LnByb3RvdHlwZS5wYXJzZVZhbHVlID0gZnVuY3Rpb24oIHZhbHVlICkge1xuXHR2YXIgcmUgPSAvKFtcXGR8XFwufFxcLV0qKSguKikvLFxuXHRcdHJlc3VsdCA9IHJlLmV4ZWModmFsdWUpO1xuXG5cdHJldHVybiB7XG5cdFx0bnVtYmVyOiByZXN1bHRbIDEgXSxcblx0XHR1bml0OiByZXN1bHRbIDIgXVxuXHR9XG59XG5cblN0eWxlSW5wdXRWaWV3LnByb3RvdHlwZS52YWxpZGF0ZVZhbHVlID0gZnVuY3Rpb24oIHZhbHVlICkge1xuXG5cdC8vIElmIHRoZSB2YWx1ZSBpcyBpbGxlZ2FsbHkgbmVnYXRpdmUsXG5cdC8vIHNldCBpdCB0byAwXG5cdGlmICggdmFsdWUgPCAwICYmICF0aGlzLmNhbkJlTmVnYXRpdmUgKSB7XG5cdFx0cmV0dXJuIDA7XG5cdH1cblxuXHQvLyBJZiB0aGUgdmFsdWUgbXVzdCBiZSBhbiBpbnQsIHBhcnNlIGl0IGFzIGFuIGludFxuXHRpZiAoICF0aGlzLmNhbkJlRGVjaW1hbCApIHtcblx0XHRyZXR1cm4gcGFyc2VJbnQoIHZhbHVlICk7XG5cdH1cblxuXHQvLyBJZiBubyBtb2RpZmljYXRpb25zIGFyZSBuZWNlc3NhcnksXG5cdC8vIHJldHVybiB0aGUgdmFsdWUgYXMtaXNcblx0cmV0dXJuIHBhcnNlRmxvYXQoIHZhbHVlICk7XG59XG5cblN0eWxlSW5wdXRWaWV3LnByb3RvdHlwZS5mb3JtYXRWYWx1ZSA9IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblxuXHQvLyBEb24ndCBkbyBhbnl0aGluZyBpZiB0aGlzIGlzIGEgY29sb3IgdmFsdWVcblx0aWYgKCB0aGlzLnR5cGUgPT09ICdjb2xvcicgKSB7XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9XG5cblx0dmFyXHRwYXJzZWRWYWx1ZSA9IHRoaXMucGFyc2VWYWx1ZSggdmFsdWUgKSxcblx0XHRudW1iZXIgPSB0aGlzLnZhbGlkYXRlVmFsdWUoIHBhcnNlZFZhbHVlLm51bWJlciApLFxuXHRcdHVuaXQgPSBwYXJzZWRWYWx1ZS51bml0IHx8IHRoaXMudW5pdDtcblxuXHRyZXR1cm4gbnVtYmVyICsgdW5pdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTdHlsZUlucHV0VmlldzsiLCJ2YXIgQ29sdW1uc0V2ZW50ID0gcmVxdWlyZSgnLi4vbW9kZWxzL0NvbHVtbnNFdmVudC5qcycpO1xuXG5IYW5kbGViYXJzLnJlZ2lzdGVySGVscGVyKCdpZklzQ3VycmVudFZhbHVlJywgZnVuY3Rpb24odmFsdWUsIGN1cnJlbnRWYWx1ZSwgb3B0aW9ucykge1xuXHRyZXR1cm4gdmFsdWUgPT0gY3VycmVudFZhbHVlID8gb3B0aW9ucy5mbih0aGlzKSA6IG9wdGlvbnMuaW52ZXJzZSh0aGlzKTtcbn0pO1xuXG52YXIgVEVNUExBVEUgPSBDb2x1bW5zLlRlbXBsYXRlc1sndGVtcGxhdGVzL3N0eWxpbmcvY29tcG9uZW50cy9tdWx0aXBsZS1zZWdtZW50ZWQtYnV0dG9uLmhicyddO1xuXG5mdW5jdGlvbiBTdHlsZU11bHRpcGxlU2VnbWVudGVkQnV0dG9uVmlldyggb3B0aW9ucyApIHtcblxuXHR0aGlzLmxhYmVsID0gJyc7XG5cdHRoaXMuYnV0dG9ucyA9IFtdO1xuXHR0aGlzLnByb3BlcnRpZXMgPSB7fTtcblx0dGhpcy5pdGVtID0gdW5kZWZpbmVkO1xuXG5cdGlmICggb3B0aW9ucyApIHtcblx0XHR0aGlzLmxhYmVsID0gb3B0aW9ucy5sYWJlbCB8fCB0aGlzLmxhYmVsO1xuXHRcdHRoaXMuYnV0dG9ucyA9IG9wdGlvbnMuYnV0dG9ucyB8fCB0aGlzLmJ1dHRvbnM7XG5cdFx0dGhpcy5pdGVtID0gb3B0aW9ucy5pdGVtIHx8IHRoaXMuaXRlbTtcblx0fVxuXG5cdHRoaXMuYnV0dG9ucy5mb3JFYWNoKGZ1bmN0aW9uKCBidXR0b24sIGkgKSB7XG5cdFx0dGhpcy5wcm9wZXJ0aWVzW2J1dHRvbi5wcm9wZXJ0eV0gPSBidXR0b24udmFsdWVzLmN1cnJlbnQ7XG5cdH0uYmluZCggdGhpcyApKTtcbn1cblxuU3R5bGVNdWx0aXBsZVNlZ21lbnRlZEJ1dHRvblZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKCkge1xuXG5cdHZhciB0ZW1wbGF0ZSA9IFRFTVBMQVRFKHtcblx0XHRsYWJlbDogdGhpcy5sYWJlbCxcblx0XHRidXR0b25zOiB0aGlzLmJ1dHRvbnNcblx0fSk7XG5cblx0dGhpcy4kdGVtcGxhdGUgPSAkKCB0ZW1wbGF0ZSApO1xuXG5cdHRoaXMuX3NldHVwQ29udHJvbHMoKTtcblxuXHRyZXR1cm4gdGhpcy4kdGVtcGxhdGU7XG59O1xuXG5TdHlsZU11bHRpcGxlU2VnbWVudGVkQnV0dG9uVmlldy5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oIHByb3BlcnR5LCB2YWx1ZSApIHtcblxuXHR0aGlzLnByb3BlcnRpZXNbcHJvcGVydHldID0gdmFsdWU7XG5cblx0Ly8gQWxlcnQgYW55IGxpc3RlbmVycyB0aGF0IHRoZSBpdGVtIGhhcyBzdGFydGVkIGRyYWdcblx0Ly8gdmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCAnQ29sdW1ucy5TdHlsZU11bHRpcGxlU2VnbWVudGVkQnV0dG9uVmlldy5WYWx1ZURpZFVwZGF0ZUZvclByb3BlcnR5Jywge1xuXHQvLyBcdGl0ZW06IFx0dGhpcyxcblx0Ly8gXHRldmVudDogXHRldmVudCxcblx0Ly8gXHR1aTogXHR1aVxuXHQvLyB9KTtcblx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHQvLyBjb2x1bW5zRXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLlN0eWxlTXVsdGlwbGVTZWdtZW50ZWRCdXR0b25WaWV3LlZhbHVlRGlkVXBkYXRlRm9yUHJvcGVydHlBbmRJdGVtJywgZmFsc2UsIGZhbHNlLCB7XG5cdC8vIFx0aXRlbTogdGhpcy5pdGVtLFxuXHQvLyBcdHByb3BlcnR5OiBwcm9wZXJ0eSxcblx0Ly8gXHR2YWx1ZTogXHR2YWx1ZVxuXHQvLyB9KTtcblx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjb2x1bW5zRXZlbnQpO1xuXHRDb2x1bW5zRXZlbnQuc2VuZCggJ0NvbHVtbnMuU3R5bGVNdWx0aXBsZVNlZ21lbnRlZEJ1dHRvblZpZXcuVmFsdWVEaWRVcGRhdGVGb3JQcm9wZXJ0eUFuZEl0ZW0nLCB7XG5cdFx0aXRlbTogdGhpcy5pdGVtLFxuXHRcdHByb3BlcnR5OiBwcm9wZXJ0eSxcblx0XHR2YWx1ZTogXHR2YWx1ZVxuXHR9ICk7XG59XG5cblN0eWxlTXVsdGlwbGVTZWdtZW50ZWRCdXR0b25WaWV3LnByb3RvdHlwZS5fc2V0dXBDb250cm9scyA9IGZ1bmN0aW9uKCkge1xuXG5cdHRoaXMuJHRlbXBsYXRlLmZpbmQoJ2J1dHRvbicpLm9uKCAnY2xpY2snLCB0aGlzLl9vbkNsaWNrLmJpbmQoIHRoaXMgKSApO1xufTtcblxuU3R5bGVNdWx0aXBsZVNlZ21lbnRlZEJ1dHRvblZpZXcucHJvdG90eXBlLl9vbkNsaWNrID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuXHR2YXIgJGJ1dHRvbiA9ICQoIGV2ZW50LnRhcmdldCApLmlzKCdidXR0b24nKSA/ICQoIGV2ZW50LnRhcmdldCApIDogJCggZXZlbnQudGFyZ2V0ICkucGFyZW50cygnYnV0dG9uJykuZmlyc3QoKSxcblx0XHRwcm9wZXJ0eSA9ICRidXR0b24uZGF0YSgncHJvcGVydHknKSxcblx0XHR2YWx1ZTtcblxuXHRpZiAoICRidXR0b24uaGFzQ2xhc3MoJ2FjdGl2ZScpICkge1xuXHRcdHZhbHVlID0gJGJ1dHRvbi5kYXRhKCdpbmFjdGl2ZS12YWx1ZScpO1xuXHR9IGVsc2Uge1xuXHRcdHZhbHVlID0gJGJ1dHRvbi5kYXRhKCdhY3RpdmUtdmFsdWUnKTtcblx0fVxuXG5cdCRidXR0b24udG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuXG5cdHRoaXMudXBkYXRlKCBwcm9wZXJ0eSwgdmFsdWUgKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU3R5bGVNdWx0aXBsZVNlZ21lbnRlZEJ1dHRvblZpZXc7IiwidmFyIENvbHVtbnNFdmVudCBcdFx0XHRcdFx0PSByZXF1aXJlKCcuLi9tb2RlbHMvQ29sdW1uc0V2ZW50LmpzJyk7XG5cbkhhbmRsZWJhcnMucmVnaXN0ZXJIZWxwZXIoJ2lmSXNDdXJyZW50VmFsdWUnLCBmdW5jdGlvbih2YWx1ZSwgY3VycmVudFZhbHVlLCBvcHRpb25zKSB7XG5cdHJldHVybiB2YWx1ZSA9PSBjdXJyZW50VmFsdWUgPyBvcHRpb25zLmZuKHRoaXMpIDogb3B0aW9ucy5pbnZlcnNlKHRoaXMpO1xufSk7XG5cbmZ1bmN0aW9uIFN0eWxlU2VnbWVudGVkQnV0dG9uVmlldyggb3B0aW9ucyApIHtcblxuXHR0aGlzLmxhYmVsID0gJyc7XG5cdHRoaXMucHJvcGVydHkgPSAnJztcblx0dGhpcy5idXR0b25zID0gW107XG5cdHRoaXMudmFsdWUgPSAnJztcblx0dGhpcy5pdGVtID0gdW5kZWZpbmVkO1xuXG5cdGlmKCBvcHRpb25zICkge1xuXHRcdHRoaXMubGFiZWwgPSBvcHRpb25zLmxhYmVsIHx8IHRoaXMubGFiZWw7XG5cdFx0dGhpcy5wcm9wZXJ0eSA9IG9wdGlvbnMucHJvcGVydHkgfHwgdGhpcy5wcm9wZXJ0eTtcblx0XHR0aGlzLmJ1dHRvbnMgPSBvcHRpb25zLmJ1dHRvbnMgfHwgdGhpcy5idXR0b25zO1xuXHRcdHRoaXMudmFsdWUgPSBvcHRpb25zLnZhbHVlIHx8IHRoaXMudmFsdWU7XG5cdFx0dGhpcy5pdGVtID0gb3B0aW9ucy5pdGVtIHx8IHRoaXMuaXRlbTtcblx0fVxuXG5cdHRoaXMudGVtcGxhdGUgPSBDb2x1bW5zLlRlbXBsYXRlc1sndGVtcGxhdGVzL3N0eWxpbmcvY29tcG9uZW50cy9zZWdtZW50ZWQtYnV0dG9uLmhicyddO1xufVxuXG5TdHlsZVNlZ21lbnRlZEJ1dHRvblZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKCkge1xuXG5cdHZhciB0ZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGUoe1xuXHRcdGxhYmVsOiB0aGlzLmxhYmVsLFxuXHRcdHByb3BlcnR5OiB0aGlzLnByb3BlcnR5LFxuXHRcdHZhbHVlOiB0aGlzLnZhbHVlLFxuXHRcdGJ1dHRvbnM6IHRoaXMuYnV0dG9uc1xuXHR9KTtcblxuXHR0aGlzLiR0ZW1wbGF0ZSA9ICQoIHRlbXBsYXRlICk7XG5cblx0dGhpcy5fc2V0dXBDb250cm9scygpO1xuXG5cdHJldHVybiB0aGlzLiR0ZW1wbGF0ZTtcbn07XG5cblN0eWxlU2VnbWVudGVkQnV0dG9uVmlldy5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oIHZhbHVlICkge1xuXG5cdHRoaXMudmFsdWUgPSB2YWx1ZTtcblxuXHQvLyBBbGVydCBhbnkgbGlzdGVuZXJzIHRoYXQgdGhlIGl0ZW0gaGFzIHN0YXJ0ZWQgZHJhZ1xuXHQvLyB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoICdDb2x1bW5zLlN0eWxlU2VnbWVudGVkQnV0dG9uVmlldy5WYWx1ZURpZFVwZGF0ZUZvclByb3BlcnR5Jywge1xuXHQvLyBcdGl0ZW06IFx0dGhpcyxcblx0Ly8gXHRldmVudDogXHRldmVudCxcblx0Ly8gXHR1aTogXHR1aVxuXHQvLyB9KTtcblx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHQvLyBjb2x1bW5zRXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLlN0eWxlU2VnbWVudGVkQnV0dG9uVmlldy5WYWx1ZURpZFVwZGF0ZUZvclByb3BlcnR5QW5kSXRlbScsIGZhbHNlLCBmYWxzZSwge1xuXHQvLyBcdGl0ZW06IHRoaXMuaXRlbSxcblx0Ly8gXHRwcm9wZXJ0eTogdGhpcy5wcm9wZXJ0eSxcblx0Ly8gXHR2YWx1ZTogXHR2YWx1ZVxuXHQvLyB9KTtcblx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjb2x1bW5zRXZlbnQpO1xuXHRDb2x1bW5zRXZlbnQuc2VuZCggJ0NvbHVtbnMuU3R5bGVTZWdtZW50ZWRCdXR0b25WaWV3LlZhbHVlRGlkVXBkYXRlRm9yUHJvcGVydHlBbmRJdGVtJywge1xuXHRcdGl0ZW06IHRoaXMuaXRlbSxcblx0XHRwcm9wZXJ0eTogdGhpcy5wcm9wZXJ0eSxcblx0XHR2YWx1ZTogXHR2YWx1ZVxuXHR9KTtcbn07XG5cblN0eWxlU2VnbWVudGVkQnV0dG9uVmlldy5wcm90b3R5cGUuX3NldHVwQ29udHJvbHMgPSBmdW5jdGlvbigpIHtcblxuXHR0aGlzLiR0ZW1wbGF0ZS5maW5kKCdidXR0b24nKS5vbiggJ2NsaWNrJywgdGhpcy5fb25DbGljay5iaW5kKCB0aGlzICkgKTtcbn07XG5cblN0eWxlU2VnbWVudGVkQnV0dG9uVmlldy5wcm90b3R5cGUuX29uQ2xpY2sgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdHZhciAkYnV0dG9uID0gJCggZXZlbnQudGFyZ2V0ICkuaXMoJ2J1dHRvbicpID8gJCggZXZlbnQudGFyZ2V0ICkgOiAkKCBldmVudC50YXJnZXQgKS5wYXJlbnRzKCdidXR0b24nKS5maXJzdCgpO1xuXG5cdHRoaXMuJHRlbXBsYXRlLmZpbmQoJ2J1dHRvbicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0JGJ1dHRvbi5hZGRDbGFzcygnYWN0aXZlJyk7XG5cblx0dGhpcy51cGRhdGUoICRidXR0b24uZGF0YSgndmFsdWUnKSApO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTdHlsZVNlZ21lbnRlZEJ1dHRvblZpZXc7IiwidmFyIENvbHVtbnNFdmVudCBcdFx0XHRcdFx0PSByZXF1aXJlKCcuLi9tb2RlbHMvQ29sdW1uc0V2ZW50LmpzJyk7XG52YXIgQ29sdW1ucyBcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoJy4uLy4uL2NvbXBpbGVkLWphdmFzY3JpcHRzL3N0eWxpbmcvY29tcGlsZWQtZGF0YS5qcycpO1xudmFyIFN0eWxlQ29tcG9uZW50VmlldyBcdFx0XHRcdD0gcmVxdWlyZSgnLi9TdHlsZUNvbXBvbmVudFZpZXcuanMnKTtcbnZhciBUZW1wbGF0ZUdyb3VwVmlldyBcdFx0XHRcdD0gcmVxdWlyZSgnLi9UZW1wbGF0ZUdyb3VwVmlldy5qcycpO1xudmFyIFRlbXBsYXRlVmFsdWVWaWV3IFx0XHRcdFx0PSByZXF1aXJlKCcuL1RlbXBsYXRlVmFsdWVWaWV3LmpzJyk7XG5cbmZ1bmN0aW9uIFN0eWxlVmlldygpIHtcblx0dGhpcy5fc2V0dXBFdmVudExpc3RlbmVycygpO1xufVxuXG5TdHlsZVZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLiRzdHlsZSA9ICQoJyNzdHlsaW5nJyk7XG59O1xuXG5TdHlsZVZpZXcucHJvdG90eXBlLnVwZGF0ZVdpdGhTZWxlY3Rpb24gPSBmdW5jdGlvbiggc2VsZWN0aW9uICkge1xuXHR2YXIgY29tcG9uZW50Vmlldyxcblx0XHQkY29tcG9uZW50O1xuXG5cdC8vIENyZWF0ZSBhIGNvbXBvbmVudCB2aWV3IHdpdGggdGhlIG5ldyBpdGVtXG5cdHNlbGVjdGlvbiA9IHRoaXMuZ2V0SXRlbUZvclNlbGVjdGlvbiggc2VsZWN0aW9uICk7XG5cdGNvbXBvbmVudFZpZXcgPSBuZXcgU3R5bGVDb21wb25lbnRWaWV3KCBzZWxlY3Rpb24gKTtcblx0JGNvbXBvbmVudCA9IGNvbXBvbmVudFZpZXcucmVuZGVyKCk7XG5cblx0Ly8gQ2xlYXIgdGhlIHN0eWxlIHBhbmUgaWYgd2UncmUgYWJvdXQgdG8gcmVuZGVyIGFuIGl0ZW0uXG5cdC8vIE90aGVyd2lzZSwgYXBwZW5kIHRvIHRoZSBlbmQgb2YgdGhlIHBhbmVcblx0aWYoIHNlbGVjdGlvbiBpbnN0YW5jZW9mIEl0ZW0gKSB7XG5cdFx0JCgnLnN0eWxlLWNvbXBvbmVudCcpLnJlbW92ZSgpO1xuXHR9XG5cdFxuXHR0aGlzLiRzdHlsZS5hcHBlbmQoICRjb21wb25lbnQgKTtcbn07XG5cblN0eWxlVmlldy5wcm90b3R5cGUuZ2V0SXRlbUZvclNlbGVjdGlvbiA9IGZ1bmN0aW9uKCBzZWxlY3Rpb24gKSB7XG5cblx0aWYoIHNlbGVjdGlvbiBpbnN0YW5jZW9mIEl0ZW0gKSB7XG5cdFx0cmV0dXJuIHNlbGVjdGlvbjtcblx0fSBlbHNlIGlmICggc2VsZWN0aW9uIGluc3RhbmNlb2YgSXRlbVZpZXcgKSB7XG5cdFx0cmV0dXJuIHNlbGVjdGlvbi5pdGVtO1xuXHR9IGVsc2UgaWYgKCBzZWxlY3Rpb24gaW5zdGFuY2VvZiBUZW1wbGF0ZVZhbHVlVmlldyApIHtcblx0XHRyZXR1cm4gc2VsZWN0aW9uLml0ZW07XG5cdH0gZWxzZSBpZiAoIHNlbGVjdGlvbiBpbnN0YW5jZW9mIFRlbXBsYXRlR3JvdXBWaWV3ICkge1xuXHRcdHJldHVybiBzZWxlY3Rpb247XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgXCJleGNlcHRpb246IFNlbGVjdGlvbiBtdXN0IGJlIGFuIEl0ZW0sIEl0ZW1WaWV3LCBUZW1wbGF0ZVZhbHVlVmlldyBvciBUZW1wbGF0ZUdyb3VwVmlld1wiO1xuXHR9XG59O1xuXG5TdHlsZVZpZXcucHJvdG90eXBlLl9zZXR1cEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gTGlzdGVuIHRvIGFwcCByZW5kZXIgZXZlbnRcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5EZXNrdG9wVmlldy5EaWRSZW5kZXInLCB0aGlzLl9vbkRlc2t0b3BSZW5kZXIuYmluZCggdGhpcyApICk7XG5cblx0Ly8gTGlzdGVuIHRvIHVkcGF0ZXMgZnJvbSBzdHlsaW5nIGNvbnRyb2xzXG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuU3R5bGVJbnB1dFZpZXcuVmFsdWVEaWRVcGRhdGVGb3JQcm9wZXJ0eUFuZEl0ZW0nLCB0aGlzLl9vblN0eWxlVXBkYXRlLmJpbmQoIHRoaXMgKSk7XG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuU3R5bGVTZWdtZW50ZWRCdXR0b25WaWV3LlZhbHVlRGlkVXBkYXRlRm9yUHJvcGVydHlBbmRJdGVtJywgdGhpcy5fb25TdHlsZVVwZGF0ZS5iaW5kKCB0aGlzICkpO1xuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLlN0eWxlTXVsdGlwbGVTZWdtZW50ZWRCdXR0b25WaWV3LlZhbHVlRGlkVXBkYXRlRm9yUHJvcGVydHlBbmRJdGVtJywgdGhpcy5fb25TdHlsZVVwZGF0ZS5iaW5kKCB0aGlzICkpO1xuXG5cdC8vIExpc3RlbiB0byB2YWx1ZSB2aWV3IHNlbGVjdGlvblxuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLlRlbXBsYXRlVmFsdWVWaWV3LlZhbHVlRGlkU2VsZWN0V2l0aEl0ZW0nLCB0aGlzLl9vbkl0ZW1TZWxlY3Rpb24uYmluZCggdGhpcyApKTtcblxuXHQvLyBMaXN0ZW4gdG8gaXRlbSBzZWxlY3Rpb25cblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5JdGVtVmlldy5JdGVtRGlkU2VsZWN0JywgdGhpcy5fb25JdGVtU2VsZWN0aW9uLmJpbmQoIHRoaXMgKSk7XG5cblx0Ly8gTGlzdGVuIGZvciB0aGUgdGVtcGxhdGUgdG8gZmluaXNoIHJlbmRlcmluZ1xuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLlRlbXBsYXRlVmlldy5EaWRSZW5kZXInLCB0aGlzLl9vblRlbXBsYXRlRGlkUmVuZGVyLmJpbmQoIHRoaXMgKSk7XHRcbn07XG5cblN0eWxlVmlldy5wcm90b3R5cGUuX29uRGVza3RvcFJlbmRlciA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblx0dGhpcy5yZW5kZXIoKTtcbn1cblxuU3R5bGVWaWV3LnByb3RvdHlwZS5fb25TdHlsZVVwZGF0ZSA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblxuXHR0aGlzLl9lbWl0Q2hhbmdlKCBkYXRhLml0ZW0sIGRhdGEucHJvcGVydHksIGRhdGEudmFsdWUgKTtcbn07XG5cblN0eWxlVmlldy5wcm90b3R5cGUuX29uSXRlbVNlbGVjdGlvbiA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblx0dmFyIGl0ZW0gPSBkYXRhLml0ZW0sXG5cdFx0Z3JvdXBzID0gVGVtcGxhdGVWaWV3LmdldEdyb3Vwc0Zvckl0ZW0oIGl0ZW0gKTtcblxuXHQvLyBVcGRhdGUgdGhlIHN0eWxlIHBhbmVsIHdpdGggdGhlIHNlbGVjdGVkIGl0ZW1cblx0dGhpcy51cGRhdGVXaXRoU2VsZWN0aW9uKCBpdGVtICk7XG5cblx0Ly8gQWxzbyB1cGRhdGUgd2l0aCBhbnkgcGFyZW50IGdyb3Vwc1xuXHRpZiAoIGdyb3VwcyAmJiBncm91cHMubGVuZ3RoICkge1xuXHRcdGdyb3Vwcy5mb3JFYWNoKGZ1bmN0aW9uKCBncm91cCApIHtcblx0XHRcdHRoaXMudXBkYXRlV2l0aFNlbGVjdGlvbiggZ3JvdXAgKTtcblx0XHR9LmJpbmQoIHRoaXMgKSk7XG5cdH1cbn07XG5cblN0eWxlVmlldy5wcm90b3R5cGUuX29uVGVtcGxhdGVEaWRSZW5kZXIgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdHRoaXMudXBkYXRlV2l0aFNlbGVjdGlvbiggVGVtcGxhdGVWaWV3Lmdyb3Vwc1sgMCBdICk7XG59O1xuXG5TdHlsZVZpZXcucHJvdG90eXBlLl9lbWl0Q2hhbmdlID0gZnVuY3Rpb24oIGl0ZW0sIHByb3BlcnR5LCB2YWx1ZSApIHtcblxuXHQvLyBBbGVydCBhbnkgbGlzdGVuZXJzIHRoYXQgdGhlIGdyb3VwIGlzIG5vdyBlbmdhZ2VkIHRvIGJlIGRyb3BwZWQgdXBvblxuXHQvLyB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoICdDb2x1bW5zLlN0eWxlVmlldy5Qcm9wZXJ0eURpZFVwZGF0ZVdpdGhWYWx1ZUZvckdyb3VwVmlldycsIHtcblx0XHQvLyBncm91cFZpZXc6IFx0aXRlbSxcblx0XHQvLyBwcm9wZXJ0eTogcHJvcGVydHksXG5cdFx0Ly8gdmFsdWU6IHZhbHVlXG5cdC8vIH0pO1xuXG5cdHZhciBldmVudFR5cGUsXG5cdFx0ZGF0YTtcblxuXHRpZiAoIGl0ZW0gaW5zdGFuY2VvZiBJdGVtICkge1xuXG5cdFx0ZXZlbnRUeXBlID0gJ0NvbHVtbnMuU3R5bGVWaWV3LlByb3BlcnR5RGlkVXBkYXRlV2l0aFZhbHVlRm9ySXRlbSc7XG5cdFx0ZGF0YSA9IHtcblx0XHRcdGl0ZW06IFx0aXRlbSxcblx0XHRcdHByb3BlcnR5OiBwcm9wZXJ0eSxcblx0XHRcdHZhbHVlOiB2YWx1ZVxuXHRcdH07XG5cdFx0Q29sdW1uc0V2ZW50LnNlbmQoIGV2ZW50VHlwZSwgZGF0YSApO1xuXG5cdH0gZWxzZSBpZiAoIGl0ZW0gaW5zdGFuY2VvZiBUZW1wbGF0ZUdyb3VwVmlldyApIHtcblx0XHRcblx0XHRldmVudFR5cGUgPSAnQ29sdW1ucy5TdHlsZVZpZXcuUHJvcGVydHlEaWRVcGRhdGVXaXRoVmFsdWVGb3JHcm91cFZpZXcnO1xuXHRcdGRhdGEgPSB7XG5cdFx0XHRncm91cFZpZXc6IFx0aXRlbSxcblx0XHRcdHByb3BlcnR5OiBwcm9wZXJ0eSxcblx0XHRcdHZhbHVlOiB2YWx1ZVxuXHRcdH07XG5cdFx0Q29sdW1uc0V2ZW50LnNlbmQoIGV2ZW50VHlwZSwgZGF0YSApO1xuXG5cdH0gZWxzZSB7XG5cdFx0Ly8gRG8gbm90aGluZ1xuXHR9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0eWxlVmlldztcbiIsInZhciBDb2x1bW5zRXZlbnQgPSByZXF1aXJlKCcuLi9tb2RlbHMvQ29sdW1uc0V2ZW50LmpzJyk7XG5cbi8vIE9iamVjdCB0byBtYW5hZ2UgcHJvcGVydGllcyBvZiBhbmQgaW50ZXJhY3Rpb25cbi8vIHdpdGggdGVtcGxhdGUgZ3JvdXAgem9uZXMuXG4vLyBHcm91cCB6b25lcyBhcmUgcG9wdWxhdGVkIHdpdGggdmFsdWUgem9uZXMgYW5kXG4vLyBjYW4gaGF2ZSB0aGVpciBsYXlvdXQgYW5kIHN0eWxlIGFsdGVyZWQuXG5cbkhhbmRsZWJhcnMucmVnaXN0ZXJQYXJ0aWFsKCdsYXlvdXQnLCBDb2x1bW5zLlRlbXBsYXRlc1sndGVtcGxhdGVzL2xheW91dC9sYXlvdXQuaGJzJ10pO1xuSGFuZGxlYmFycy5yZWdpc3RlclBhcnRpYWwoJ3N0eWxlJywgQ29sdW1ucy5UZW1wbGF0ZXNbJ3RlbXBsYXRlcy9sYXlvdXQvc3R5bGUuaGJzJ10pO1xuXG52YXIgUk9XX0dST1VQX1NFTEVDVE9SID0gJy5sYXlvdXQtdGVtcGxhdGUtcm93LWdyb3VwJywgXG5cdFJPV19WQUxVRV9TRUxFQ1RPUiA9ICcubGF5b3V0LXRlbXBsYXRlLXJvdy12YWx1ZScsXG5cdExBWU9VVF9QUk9QRVJUSUVTID0gW1xuXHRcdCdhbGlnbi1pdGVtcycsXG5cdFx0J2ZsZXgtZGlyZWN0aW9uJyxcblx0XHQnanVzdGlmeS1jb250ZW50Jyxcblx0XTtcblxuVGVtcGxhdGVHcm91cFZpZXcgPSBmdW5jdGlvbiggcGFyYW1zICkge1xuXG5cdGlmICggcGFyYW1zICkge1xuXHRcdHRoaXMubGF5b3V0IFx0XHQ9IHBhcmFtcy5sYXlvdXQgfHwgW107XG5cdFx0dGhpcy5zdHlsZVx0XHRcdD0gbmV3IFN0eWxlKCBwYXJhbXMuc3R5bGUgfHwgW10gKTtcblx0XHR0aGlzLnBsYWNlaG9sZGVyIFx0PSBwYXJhbXMucGxhY2Vob2xkZXIgfHwgZmFsc2U7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5sYXlvdXQgXHRcdD0gW107XG5cdFx0dGhpcy5zdHlsZVx0XHRcdD0gbmV3IFN0eWxlKCBbXSApO1xuXHRcdHRoaXMucGxhY2Vob2xkZXIgXHQ9IGZhbHNlO1xuXHR9XG5cblx0dGhpcy50ZW1wbGF0ZSA9IENvbHVtbnMuVGVtcGxhdGVzWyd0ZW1wbGF0ZXMvbGF5b3V0L3Jvdy1ncm91cC5oYnMnXTtcblx0dGhpcy4kZ3JvdXA7XG59O1xuXG4vLyBSZXR1cm4gdGhlIGxheW91dCBwcm9wZXJ0aWVzIGFzIGFuIG9iamVjdCxcbi8vIGdpdmVuIGFueSBqUXVlcnkgZ3JvdXAgb2JqZWN0XG5UZW1wbGF0ZUdyb3VwVmlldy5sYXlvdXRGb3JHcm91cCA9IGZ1bmN0aW9uKCAkZ3JvdXAgKSB7XG5cdHZhciBsYXlvdXQgPSBbXTtcblxuXHRpZiAoICEoICRncm91cCBpbnN0YW5jZW9mIGpRdWVyeSApICkge1xuXHRcdHRocm93IFwiZXhjZXB0aW9uOiBncm91cCBtdXN0IGJlIGpRdWVyeSBvYmplY3RcIjtcblx0fVxuXG5cdExBWU9VVF9QUk9QRVJUSUVTLmZvckVhY2goZnVuY3Rpb24oIHByb3BlcnR5LCBpICkge1xuXHRcdHZhciB2YWx1ZSA9ICRncm91cC5kYXRhKCBwcm9wZXJ0eSApO1xuXHRcdGlmICggdmFsdWUgKSB7XG5cdFx0XHRsYXlvdXQucHVzaCh7XG5cdFx0XHRcdHByb3BlcnR5OiBwcm9wZXJ0eSxcblx0XHRcdFx0dmFsdWU6IHZhbHVlXG5cdFx0XHR9KTtcblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gbGF5b3V0O1xufTtcblxuVGVtcGxhdGVHcm91cFZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgJHRlbXBsYXRlID0gJCggdGhpcy50ZW1wbGF0ZSh7XG5cdFx0cGxhY2Vob2xkZXI6IFx0dGhpcy5wbGFjZWhvbGRlcixcblx0XHRzdHlsZTogXHRcdFx0dGhpcy5zdHlsZS5zdHlsZXMsXG5cdFx0bGF5b3V0OiBcdFx0dGhpcy5sYXlvdXRcblx0fSkpO1xuXHR0aGlzLiRncm91cCA9ICR0ZW1wbGF0ZTtcblxuXHR0aGlzLl9zZXR1cEV2ZW50cygpO1xuXHR0aGlzLl9zZXR1cERyb3AoKTtcblxuXHRyZXR1cm4gdGhpcy4kZ3JvdXA7XG59O1xuXG5UZW1wbGF0ZUdyb3VwVmlldy5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oIHByb3BlcnR5LCB2YWx1ZSApIHtcblxuXHQvLyBSZXBsYWNlIGVhY2ggbGF5b3V0IHZhbHVlIHdpdGggYSBwb3RlbnRpYWwgbmV3IG9uZVxuXHR0aGlzLmxheW91dC5mb3JFYWNoKGZ1bmN0aW9uKCBsYXlvdXQsIGkgKSB7XG5cdFx0dGhpcy4kZ3JvdXAuZGF0YSggbGF5b3V0LnByb3BlcnR5LCBsYXlvdXQudmFsdWUgKTtcblx0XHR0aGlzLiRncm91cC5hdHRyKCAnbGF5b3V0LScgKyBsYXlvdXQucHJvcGVydHksIGxheW91dC52YWx1ZSApO1xuXHR9LmJpbmQoIHRoaXMgKSk7XG5cblx0Ly8gQWxlcnQgYW55IGxpc3RlbmVycyB0aGF0IHRoZSBncm91cCBoYXMgY2hhbmdlZFxuXHQvLyB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoICdDb2x1bW5zLkdyb3VwVmlldy5EaWRDaGFuZ2UnLCB7XG5cdC8vIFx0Z3JvdXBWaWV3OiBcdHRoaXNcblx0Ly8gfSk7XG5cdC8vIHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHQvLyBldmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuVGVtcGxhdGVHcm91cFZpZXcuRGlkQ2hhbmdlJywgZmFsc2UsIGZhbHNlLCB7XG5cdC8vIFx0Z3JvdXBWaWV3OiBcdHRoaXNcblx0Ly8gfSk7XG5cdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuXG5cdENvbHVtbnNFdmVudC5zZW5kKCdDb2x1bW5zLlRlbXBsYXRlR3JvdXBWaWV3LkRpZENoYW5nZScsIHtcblx0XHRncm91cFZpZXc6IFx0dGhpc1xuXHR9KTtcblxuXHRyZXR1cm4gdGhpcy4kZ3JvdXA7XG59O1xuXG4vLyBSZXR1cm4gdGhlIGNvcnJlY3QgbGF5b3V0IGF0dHJpYnV0ZSBmb3IgYSBnaXZlbiBwcm9wZXJ0eVxuLy8gQHBhcmFtIHsgc3RyaW5nIH0gcHJvcGVydHkgLS0gdGhlIHJlcXVlc3RlZCBsYXlvdXQgcHJvcGVydHlcbi8vIEByZXR1cm4geyBzdHJpbmcgfSB0aGUgY29ycmVzcG9uZGluZyB2YWx1ZVxuVGVtcGxhdGVHcm91cFZpZXcucHJvdG90eXBlLmdldFN0eWxlID0gZnVuY3Rpb24oIHByb3BlcnR5ICkge1xuXHR2YXIgdmFsdWU7XG5cblx0Ly8gSWYgdGhlcmUgd2FzIG5vdCBtYXRjaCBpbiB0aGUgbGF5b3V0IG9iamVjdCxcblx0Ly8gY2hlY2sgdGhlIHN0eWxlIG9iamVjdFxuXHQvLyBMb29wIHRocm91Z2ggZWFjaCBwcm9wZXJ0eSB1bnRpbCB3ZSBmaW5kIGEgbWF0Y2hcblx0aWYgKCB0aGlzLnN0eWxlICkge1xuXHRcdHZhbHVlID0gdGhpcy5zdHlsZS5nZXQoIHByb3BlcnR5IClcblx0fVxuXG5cdC8vIExvb3AgdGhyb3VnaCBlYWNoIGxheW91dCBwcm9wZXJ0eVxuXHQvLyB1bnRpbCB3ZSBmaW5kIGEgbWF0Y2hcblx0Ly8gcG90ZW50aWFsbHkgYSBiZXR0ZXIgb25lIHRoYXQgaW4gdGhlIHN0eWxlIHNldFxuXHR0aGlzLmxheW91dC5mb3JFYWNoKGZ1bmN0aW9uKCBsYXlvdXQsIGkgKSB7XG5cdFx0aWYgKCBsYXlvdXQucHJvcGVydHkgPT09IHByb3BlcnR5ICkge1xuXHRcdFx0dmFsdWUgPSBsYXlvdXQudmFsdWVcblx0XHR9XG5cdH0pO1xuXG5cdC8vIEFzIGEgbGFzdCByZXNvcnQsIGNoZWNrIHRoZSBjc3MgZm9yIHRoZSBlbGVtZW50XG5cdC8vIGFuZCByZXR1cm4gaXRzIHZhbHVlXG5cdGlmICggdmFsdWUgKSB7XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiB0aGlzLiRncm91cC5jc3MoIHByb3BlcnR5ICk7XG5cdH1cbn07XG5cbi8vIEdldCB0aGUgdGVtcGxhdGUncyB0aXRsZSBmb3IgZGlzcGxheVxuLy8gU2hvdWxkIGJlICdSb3cnIGZvciB0aGUgZmlyc3QgZ3JvdXAgaW4gdGhlIHRlbXBsYXRlXG4vLyBhbmQgJ0dyb3VwJyBmb3IgYWxsIG90aGVyc1xuLy8gQHJldHVybiB7IHN0cmluZyB9IC0tIFRoZSBncm91cCdzIHRpdGxlXG5UZW1wbGF0ZUdyb3VwVmlldy5wcm90b3R5cGUudGl0bGUgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBJcyB0aGlzIHRoZSBmaXJzdCBncm91cCBpbiB0aGUgdGVtcGxhdGU/XG5cdGlmICggdGhpcy4kZ3JvdXAucGFyZW50KCcubGF5b3V0LXRlbXBsYXRlLXJvdycpLmxlbmd0aCApIHtcblx0XHRyZXR1cm4gJ1Jvdyc7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuICdHcm91cCc7XG5cdH1cbn07XG5cblRlbXBsYXRlR3JvdXBWaWV3LnByb3RvdHlwZS5yZW1vdmVQbGFjZWhvbGRlcnMgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBSZW1vdmUgYW55IHBsYWNlaG9sZGVyIHZhbHVlc1xuXHR0aGlzLiRncm91cC5maW5kKFJPV19WQUxVRV9TRUxFQ1RPUikuZmlsdGVyKCcucGxhY2Vob2xkZXInKS5yZW1vdmUoKTtcblxuXHQvLyBSZW1vdmUgYW55IHBsYWNlaG9sZGVyIGdyb3VwcyB3aGlsZSBsZWF2aW5nIHRoZWlyIGNoaWxkcmVuXG5cdHRoaXMuJGdyb3VwLmZpbmQoUk9XX0dST1VQX1NFTEVDVE9SKS5maWx0ZXIoJy5wbGFjZWhvbGRlcicpLmNoaWxkcmVuKCkudW53cmFwKCk7XG59O1xuXG5UZW1wbGF0ZUdyb3VwVmlldy5wcm90b3R5cGUuX21lcmdlTGF5b3V0ID0gZnVuY3Rpb24oIHByb3BlcnR5LCB2YWx1ZSApIHtcblx0dmFyIGV4aXN0aW5nUHJvcGVydHkgPSBmYWxzZTtcblxuXHQvLyBMb29wIHRocm91Z2ggdGhlIG9sZCBwcm9wZXJ0aWVzXG5cdC8vIGNvbXBhcmluZyBlYWNoIHdpdGggdGhlIG5ldyBwcm9wZXJ0eS5cblx0Ly8gUmVwbGFjZSBhbiBleGlzdGluZyBwcm9wZXJ0eSBhbnl0aW1lIGEgbmV3IG9uZSBtYXRjaGVzIGl0LlxuXHQvLyBBdCB0aGUgZW5kLCBhcHBlbmQgYW55IHJlbWFpbmluZyBuZXcgcHJvcGVydGllcyB0byB0aGUgbWVyZ2VkIHN0eWxlcyBhcnJheS5cblx0dGhpcy5sYXlvdXQuZm9yRWFjaChmdW5jdGlvbiggbGF5b3V0LCBpICkge1xuXHRcdGlmICggbGF5b3V0LnByb3BlcnR5ID09PSBwcm9wZXJ0eSApIHtcblx0XHRcdGxheW91dC52YWx1ZSA9IHZhbHVlO1xuXHRcdFx0dGhpcy5sYXlvdXRbIGkgXSA9IGxheW91dDtcblx0XHRcdGV4aXN0aW5nUHJvcGVydHkgPSB0cnVlO1xuXHRcdH1cblx0fS5iaW5kKCB0aGlzICkpO1xuXG5cdC8vIEFkZCBhbGwgcmVtYWluaW5nIG5ldyBzdHlsZXMgdG8gdGhlIHN0eWxlcyBhcnJheVxuXHRpZiAoICFleGlzdGluZ1Byb3BlcnR5ICkge1xuXHRcdHRoaXMubGF5b3V0LnB1c2goe1xuXHRcdFx0cHJvcGVydHk6IHByb3BlcnR5LFxuXHRcdFx0dmFsdWU6IHZhbHVlXG5cdFx0fSk7XG5cdH1cbn07XG5cblRlbXBsYXRlR3JvdXBWaWV3LnByb3RvdHlwZS5fc2V0dXBEcm9wID0gZnVuY3Rpb24oKSB7XG5cdHRoaXMuJGdyb3VwLmRyb3BwYWJsZSh7XG5cdFx0dG9sZXJhbmNlOiAncG9pbnRlcidcblx0fSk7XG5cblx0dGhpcy4kZ3JvdXAub24oICdkcm9wb3ZlcicsICQucHJveHkoZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcblxuXHRcdC8vIEFsZXJ0IGFueSBsaXN0ZW5lcnMgdGhhdCB0aGUgZ3JvdXAgaXMgbm93IGVuZ2FnZWQgdG8gYmUgZHJvcHBlZCB1cG9uXG5cdFx0Ly8gdmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCAnQ29sdW1ucy5UZW1wbGF0ZUdyb3VwVmlldy5Hcm91cERpZEJlZ2luRHJvcE92ZXJXaXRoVmFsdWVWaWV3Jywge1xuXHRcdC8vIGdyb3VwVmlldzogXHR0aGlzLFxuXHRcdC8vIHZhbHVlVmlldzogXHR1aS5kcm9wcGFibGUsXG5cdFx0Ly8gZXZlbnQ6IFx0XHRldmVudCxcblx0XHQvLyB1aTogXHRcdHVpXG5cdFx0Ly8gfSk7XG5cdFx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHRcdC8vIGNvbHVtbnNFdmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuVGVtcGxhdGVHcm91cFZpZXcuR3JvdXBEaWRCZWdpbkRyb3BPdmVyV2l0aFZhbHVlVmlldycsIGZhbHNlLCBmYWxzZSwge1xuXHRcdC8vIFx0Z3JvdXBWaWV3OiBcdHRoaXMsXG5cdFx0Ly8gXHR2YWx1ZVZpZXc6IFx0dWkuZHJvcHBhYmxlLFxuXHRcdC8vIFx0ZXZlbnQ6IFx0XHRldmVudCxcblx0XHQvLyBcdHVpOiBcdFx0dWlcblx0XHQvLyB9KTtcblx0XHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGNvbHVtbnNFdmVudCk7XG5cdFx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuVGVtcGxhdGVHcm91cFZpZXcuR3JvdXBEaWRCZWdpbkRyb3BPdmVyV2l0aFZhbHVlVmlldycsIHtcblx0XHRcdGdyb3VwVmlldzogXHR0aGlzLFxuXHRcdFx0dmFsdWVWaWV3OiBcdHVpLmRyb3BwYWJsZSxcblx0XHRcdGV2ZW50OiBcdFx0ZXZlbnQsXG5cdFx0XHR1aTogXHRcdHVpXG5cdFx0fSk7XG5cblx0fSwgdGhpcykgKTtcblxuXHR0aGlzLiRncm91cC5vbiggJ2Ryb3BvdXQnLCAkLnByb3h5KGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XG5cblx0XHQvLyBBbGVydCBhbnkgbGlzdGVuZXJzIHRoYXQgdGhlIGdyb3VwIGlzIG5vdyBlbmdhZ2VkIHRvIGJlIGRyb3BwZWQgdXBvblxuXHRcdC8vIHZhciBldmVudCA9IG5ldyBDdXN0b21FdmVudCggJ0NvbHVtbnMuVGVtcGxhdGVHcm91cFZpZXcuR3JvdXBEaWRFbmREcm9wT3ZlcldpdGhWYWx1ZVZpZXcnLCB7XG5cdFx0Ly8gZ3JvdXBWaWV3OiBcdHRoaXMsXG5cdFx0Ly8gdmFsdWVWaWV3OiBcdHVpLmRyb3BwYWJsZSxcblx0XHQvLyBldmVudDogXHRcdGV2ZW50LFxuXHRcdC8vIHVpOiBcdFx0dWlcblx0XHQvLyB9KTtcblx0XHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdFx0Ly8gY29sdW1uc0V2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5UZW1wbGF0ZUdyb3VwVmlldy5Hcm91cERpZEVuZERyb3BPdmVyV2l0aFZhbHVlVmlldycsIGZhbHNlLCBmYWxzZSwge1xuXHRcdC8vIFx0Z3JvdXBWaWV3OiBcdHRoaXMsXG5cdFx0Ly8gXHR2YWx1ZVZpZXc6IFx0dWkuZHJvcHBhYmxlLFxuXHRcdC8vIFx0ZXZlbnQ6IFx0XHRldmVudCxcblx0XHQvLyBcdHVpOiBcdFx0dWlcblx0XHQvLyB9KTtcblx0XHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGNvbHVtbnNFdmVudCk7XG5cdFx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuVGVtcGxhdGVHcm91cFZpZXcuR3JvdXBEaWRFbmREcm9wT3ZlcldpdGhWYWx1ZVZpZXcnLCB7XG5cdFx0XHRncm91cFZpZXc6IFx0dGhpcyxcblx0XHRcdHZhbHVlVmlldzogXHR1aS5kcm9wcGFibGUsXG5cdFx0XHRldmVudDogXHRcdGV2ZW50LFxuXHRcdFx0dWk6IFx0XHR1aVxuXHRcdH0pO1xuXG5cdH0sIHRoaXMpICk7XG5cblx0dGhpcy4kZ3JvdXAub24oICdkcm9wJywgJC5wcm94eShmdW5jdGlvbiggZXZlbnQsIHVpICkge1xuXG5cdFx0Ly8gQWxlcnQgYW55IGxpc3RlbmVycyB0aGF0IHRoZSBncm91cCBpcyBub3cgZW5nYWdlZCB0byBiZSBkcm9wcGVkIHVwb25cblx0XHQvLyB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoICdDb2x1bW5zLlRlbXBsYXRlR3JvdXBWaWV3Lkdyb3VwRGlkRHJvcFdpdGhWYWx1ZVZpZXcnLCB7XG5cdFx0Ly8gZ3JvdXBWaWV3OiBcdHRoaXMsXG5cdFx0Ly8gdmFsdWVWaWV3OiBcdHVpLmRyb3BwYWJsZSxcblx0XHQvLyBldmVudDogXHRcdGV2ZW50LFxuXHRcdC8vIHVpOiBcdFx0dWlcblx0XHQvLyB9KTtcblx0XHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdFx0Ly8gY29sdW1uc0V2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5UZW1wbGF0ZUdyb3VwVmlldy5Hcm91cERpZERyb3BXaXRoVmFsdWVWaWV3JywgZmFsc2UsIGZhbHNlLCB7XG5cdFx0Ly8gXHRncm91cFZpZXc6IFx0dGhpcyxcblx0XHQvLyBcdHZhbHVlVmlldzogXHR1aS5kcm9wcGFibGUsXG5cdFx0Ly8gXHRldmVudDogXHRcdGV2ZW50LFxuXHRcdC8vIFx0dWk6IFx0XHR1aVxuXHRcdC8vIH0pO1xuXHRcdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY29sdW1uc0V2ZW50KTtcblx0XHRDb2x1bW5zRXZlbnQuc2VuZCgnQ29sdW1ucy5UZW1wbGF0ZUdyb3VwVmlldy5Hcm91cERpZERyb3BXaXRoVmFsdWVWaWV3Jywge1xuXHRcdFx0Z3JvdXBWaWV3OiBcdHRoaXMsXG5cdFx0XHR2YWx1ZVZpZXc6IFx0dWkuZHJvcHBhYmxlLFxuXHRcdFx0ZXZlbnQ6IFx0XHRldmVudCxcblx0XHRcdHVpOiBcdFx0dWlcblx0XHR9KTtcblxuXHR9LCB0aGlzKSApO1xufTtcblxuVGVtcGxhdGVHcm91cFZpZXcucHJvdG90eXBlLl9zZXR1cEV2ZW50cyA9IGZ1bmN0aW9uKCkge1xuXG5cdC8vIExpc3RlbiB0byB1cGRhdGVzIGZvciB0aGlzIGdyb3VwXG5cdC8vIGFuZCB1cGRhdGUgaWYgdGhlcmUncyBhIG1hdGNoXG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuU3R5bGVWaWV3LlByb3BlcnR5RGlkVXBkYXRlV2l0aFZhbHVlRm9yR3JvdXBWaWV3JywgdGhpcy5fb25Hcm91cERpZENoYW5nZS5iaW5kKCB0aGlzICkgKTtcbn07XG5cblRlbXBsYXRlR3JvdXBWaWV3LnByb3RvdHlwZS5fb25Hcm91cERpZENoYW5nZSA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblx0dmFyICRuZXdHcm91cCA9IGRhdGEuZ3JvdXBWaWV3LiRncm91cDtcblx0aWYgKCB0aGlzLiRncm91cC5pcyggJG5ld0dyb3VwICkgKSB7XG5cdFx0dGhpcy5fbWVyZ2VMYXlvdXQoIGRhdGEucHJvcGVydHksIGRhdGEudmFsdWUgKVxuXHRcdHRoaXMudXBkYXRlKCk7XG5cdH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVGVtcGxhdGVHcm91cFZpZXc7IiwidmFyIENvbHVtbnNFdmVudCA9IHJlcXVpcmUoJy4uL21vZGVscy9Db2x1bW5zRXZlbnQuanMnKTtcblxuLy8gT2JqZWN0IHRvIG1hbmFnZSBwcm9wZXJ0aWVzIG9mIGFuZCBpbnRlcmFjdGlvblxuLy8gd2l0aCB0ZW1wbGF0ZSB2YWx1ZSB6b25lcy5cbi8vIFZhbHVlIHpvbmVzIGFyZSBwb3B1bGF0ZWQgd2l0aCBpdGVtcyBhbmRcbi8vIGNhbiByZWFjdCB0byBjaGFuZ2VzIGluIGFuIGl0ZW0ncyBwcm9wZXJ0aWVzLlxuXG5IYW5kbGViYXJzLnJlZ2lzdGVyUGFydGlhbCgnbGF5b3V0JywgQ29sdW1ucy5UZW1wbGF0ZXNbJ3RlbXBsYXRlcy9sYXlvdXQvbGF5b3V0LmhicyddKTtcbkhhbmRsZWJhcnMucmVnaXN0ZXJQYXJ0aWFsKCdzdHlsZScsIENvbHVtbnMuVGVtcGxhdGVzWyd0ZW1wbGF0ZXMvbGF5b3V0L3N0eWxlLmhicyddKTtcblxuVGVtcGxhdGVWYWx1ZVZpZXcgPSBmdW5jdGlvbiggaXRlbSwgcGxhY2Vob2xkZXIgKSB7XG5cblx0aWYgKCBpdGVtICYmIGl0ZW0gaW5zdGFuY2VvZiBJdGVtICkge1xuXHRcdHRoaXMuaXRlbSA9IGl0ZW1cblx0fSBlbHNlIGlmICggaXRlbSApIHtcblx0XHR0aHJvdyBcImV4Y2VwdGlvbjogaXRlbSBtdXN0IGJlIG9mIHR5cGUgSXRlbVwiXG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5pdGVtO1xuXHR9XG5cdFxuXHR0aGlzLnRlbXBsYXRlID0gQ29sdW1ucy5UZW1wbGF0ZXNbJ3RlbXBsYXRlcy9sYXlvdXQvcm93LXZhbHVlLmhicyddO1xuXHR0aGlzLnBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXIgfHwgZmFsc2U7XG5cdHRoaXMuJHZhbHVlO1xufTtcblxuVGVtcGxhdGVWYWx1ZVZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgJHRlbXBsYXRlID0gJCggdGhpcy50ZW1wbGF0ZSh7XG5cdFx0ZGF0YTogXHRcdFx0dGhpcy5pdGVtLmZvcm1hdHRlZFRpdGxlKCksXG5cdFx0c3R5bGU6IFx0XHRcdHRoaXMuaXRlbS5zdHlsZS5zdHlsZXMsXG5cdFx0cGxhY2Vob2xkZXI6IFx0dGhpcy5wbGFjZWhvbGRlclxuXHR9KSk7XG5cdHRoaXMuJHZhbHVlID0gJHRlbXBsYXRlO1xuXG5cdGlmICggIXRoaXMucGxhY2Vob2xkZXIgKSB7XG5cdFx0dGhpcy5fc2V0dXBFdmVudHMoKTtcblx0XHR0aGlzLl9zZXR1cERyYWcoKTtcblx0XHR0aGlzLl9zZXR1cENsaWNrKCk7XG5cdH1cblxuXHRyZXR1cm4gdGhpcy4kdmFsdWU7XG59O1xuXG5UZW1wbGF0ZVZhbHVlVmlldy5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oKSB7XG5cdC8vIFVwZGF0ZSB0aGUgdmFsdWUncyB0ZXh0XG5cdHRoaXMuJHZhbHVlLnRleHQoIHRoaXMuaXRlbS5mb3JtYXR0ZWRUaXRsZSgpICk7XG5cdC8vIFVwZGF0ZSB0aGUgdmFsdWUncyBzdHlsZVxuXHR0aGlzLiR2YWx1ZS5hdHRyKCAnc3R5bGUnLCB0aGlzLml0ZW0uc3R5bGUuY3NzKCkgKTtcblx0Ly8gVXBkYXRlIHRoZSB2YWx1ZSdzIHBsYWNlaG9sZGVyIHN0YXR1c1xuXG5cdC8vIEFsZXJ0IGFueSBsaXN0ZW5lcnMgdGhhdCB0aGUgdmFsdWUgaGFzIGNoYW5nZWRcblx0Ly8gdmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCAnQ29sdW1ucy5WYWx1ZVZpZXcuRGlkQ2hhbmdlJywge1xuXHQvLyBcdHZhbHVlVmlldzogXHR0aGlzXG5cdC8vIH0pO1xuXHQvLyB2YXIgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0Ly8gZXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLlRlbXBsYXRlVmFsdWVWaWV3LkRpZENoYW5nZScsIGZhbHNlLCBmYWxzZSwge1xuXHQvLyBcdHZhbHVlVmlldzogXHR0aGlzXG5cdC8vIH0pO1xuXHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcblx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuVGVtcGxhdGVWYWx1ZVZpZXcuRGlkQ2hhbmdlJywge1xuXHRcdHZhbHVlVmlldzogXHR0aGlzXG5cdH0pO1xuXG5cdHJldHVybiB0aGlzLiR2YWx1ZTtcbn07XG5cblRlbXBsYXRlVmFsdWVWaWV3LnByb3RvdHlwZS5fc2V0dXBEcmFnID0gZnVuY3Rpb24oKSB7XG5cblx0dGhpcy4kdmFsdWUuZHJhZ2dhYmxlKHtcblx0XHQvLyByZXZlcnQ6ICdpbnZhbGlkJyxcblx0XHQvLyByZXZlcnREdXJhdGlvbjogMjAwLFxuXHRcdGhlbHBlcjogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgaXRlbVZpZXcgPSBuZXcgSXRlbVZpZXcoIHRoaXMuaXRlbSApO1xuXHRcdFx0cmV0dXJuIGl0ZW1WaWV3LnJlbmRlcigpO1xuXHRcdH0uYmluZCggdGhpcyApLFxuXHRcdG9wYWNpdHk6IC4yXG5cdH0pO1xuXG5cdHRoaXMuJHZhbHVlLm9uKCAnZHJhZ3N0YXJ0JywgJC5wcm94eShmdW5jdGlvbiggZXZlbnQsIHVpICkge1xuXG5cdFx0JCggZXZlbnQudGFyZ2V0ICkuYWRkQ2xhc3MoJ2luYWN0aXZlJyk7XG5cblx0XHQvLyBNYWtlIHN1cmUgdGhpcyBvYmplY3Qgbm8gbG9uZ2VyIHJlY2VpdmVzIGV2ZW50IHVwZGF0ZXNcblx0XHR0aGlzLl90ZWFyZG93bkV2ZW50cygpO1xuXG5cdFx0Ly8gQWxlcnQgYW55IGxpc3RlbmVycyB0aGF0IHRoZSBpdGVtIGhhcyBzdGFydGVkIGRyYWdcblx0XHQvLyB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoICdDb2x1bW5zLkl0ZW1WaWV3Lkl0ZW1EaWRCZWdpbkRyYWcnLCB7XG5cdFx0Ly8gXHRpdGVtOiBcdHRoaXMsXG5cdFx0Ly8gXHRldmVudDogXHRldmVudCxcblx0XHQvLyBcdHVpOiBcdHVpXG5cdFx0Ly8gfSk7XG5cdFx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHRcdC8vIGNvbHVtbnNFdmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuVGVtcGxhdGVWYWx1ZVZpZXcuVmFsdWVEaWRCZWdpbkRyYWdXaXRoSXRlbScsIGZhbHNlLCBmYWxzZSwge1xuXHRcdC8vIFx0dmFsdWVWaWV3OiBcdHRoaXMsXG5cdFx0Ly8gXHRpdGVtOiBcdFx0dGhpcy5pdGVtLFxuXHRcdC8vIFx0ZXZlbnQ6IFx0XHRldmVudCxcblx0XHQvLyBcdHVpOiBcdFx0dWlcblx0XHQvLyB9KTtcblx0XHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGNvbHVtbnNFdmVudCk7XG5cdFx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuVGVtcGxhdGVWYWx1ZVZpZXcuVmFsdWVEaWRCZWdpbkRyYWdXaXRoSXRlbScsIHtcblx0XHRcdHZhbHVlVmlldzogXHR0aGlzLFxuXHRcdFx0aXRlbTogXHRcdHRoaXMuaXRlbSxcblx0XHRcdGV2ZW50OiBcdFx0ZXZlbnQsXG5cdFx0XHR1aTogXHRcdHVpXG5cdFx0fSk7XG5cblx0fSwgdGhpcykgKTtcblxuXHR0aGlzLiR2YWx1ZS5vbiggJ2RyYWdzdG9wJywgJC5wcm94eShmdW5jdGlvbiggZXZlbnQsIHVpICkge1xuXG5cdFx0JCggZXZlbnQudGFyZ2V0ICkucmVtb3ZlKCk7XG5cblx0XHQvLyBBbGVydCBhbnkgbGlzdGVuZXJzIHRoYXQgdGhlIGl0ZW0gaGFzIHN0YXJ0ZWQgZHJhZ1xuXHRcdC8vIHZhciBldmVudCA9IG5ldyBDdXN0b21FdmVudCggJ0NvbHVtbnMuSXRlbVZpZXcuSXRlbURpZEJFbmREcmFnJywge1xuXHRcdC8vIFx0aXRlbTogXHR0aGlzLFxuXHRcdC8vIFx0ZXZlbnQ6IFx0ZXZlbnQsXG5cdFx0Ly8gXHR1aTogXHR1aVxuXHRcdC8vIH0pO1xuXHRcdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0XHQvLyBjb2x1bW5zRXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLlRlbXBsYXRlVmFsdWVWaWV3LlZhbHVlRGlkRW5kRHJhZ1dpdGhJdGVtJywgZmFsc2UsIGZhbHNlLCB7XG5cdFx0Ly8gXHR2YWx1ZVZpZXc6IFx0dGhpcyxcblx0XHQvLyBcdGl0ZW06IFx0XHR0aGlzLml0ZW0sXG5cdFx0Ly8gXHRldmVudDogXHRcdGV2ZW50LFxuXHRcdC8vIFx0dWk6IFx0XHR1aVxuXHRcdC8vIH0pO1xuXHRcdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY29sdW1uc0V2ZW50KTtcblx0XHRDb2x1bW5zRXZlbnQuc2VuZCgnQ29sdW1ucy5UZW1wbGF0ZVZhbHVlVmlldy5WYWx1ZURpZEVuZERyYWdXaXRoSXRlbScsIHtcblx0XHRcdHZhbHVlVmlldzogXHR0aGlzLFxuXHRcdFx0aXRlbTogXHRcdHRoaXMuaXRlbSxcblx0XHRcdGV2ZW50OiBcdFx0ZXZlbnQsXG5cdFx0XHR1aTogXHRcdHVpXG5cdFx0fSk7XG5cblx0fSwgdGhpcykgKTtcblxuXHR0aGlzLiR2YWx1ZS5vbiggJ2RyYWcnLCAkLnByb3h5KGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XG5cblx0XHQvLyBBbGVydCBhbnkgbGlzdGVuZXJzIHRoYXQgdGhlIGl0ZW0gaGFzIHN0YXJ0ZWQgZHJhZ1xuXHRcdC8vIHZhciBldmVudCA9IG5ldyBDdXN0b21FdmVudCggJ0NvbHVtbnMuSXRlbVZpZXcuSXRlbURpZERyYWcnLCB7XG5cdFx0Ly8gXHRpdGVtOiBcdHRoaXMsXG5cdFx0Ly8gXHRldmVudDogXHRldmVudCxcblx0XHQvLyBcdHVpOiBcdHVpXG5cdFx0Ly8gfSk7XG5cdFx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHRcdC8vIGNvbHVtbnNFdmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuVGVtcGxhdGVWYWx1ZVZpZXcuVmFsdWVEaWREcmFnV2l0aEl0ZW0nLCBmYWxzZSwgZmFsc2UsIHtcblx0XHQvLyBcdHZhbHVlVmlldzogXHR0aGlzLFxuXHRcdC8vIFx0aXRlbTogXHRcdHRoaXMuaXRlbSxcblx0XHQvLyBcdGV2ZW50OiBcdFx0ZXZlbnQsXG5cdFx0Ly8gXHR1aTogXHRcdHVpXG5cdFx0Ly8gfSk7XG5cdFx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjb2x1bW5zRXZlbnQpO1xuXHRcdENvbHVtbnNFdmVudC5zZW5kKCdDb2x1bW5zLlRlbXBsYXRlVmFsdWVWaWV3LlZhbHVlRGlkRHJhZ1dpdGhJdGVtJywge1xuXHRcdFx0dmFsdWVWaWV3OiBcdHRoaXMsXG5cdFx0XHRpdGVtOiBcdFx0dGhpcy5pdGVtLFxuXHRcdFx0ZXZlbnQ6IFx0XHRldmVudCxcblx0XHRcdHVpOiBcdFx0dWlcblx0XHR9KTtcblxuXHR9LCB0aGlzKSApO1xufTtcblxuVGVtcGxhdGVWYWx1ZVZpZXcucHJvdG90eXBlLl9zZXR1cENsaWNrID0gZnVuY3Rpb24oKSB7XG5cblx0dGhpcy4kdmFsdWUub24oICdjbGljaycsICQucHJveHkoZnVuY3Rpb24oIGV2ZW50ICkge1xuXG5cdFx0dGhpcy4kdmFsdWUuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XG5cblx0XHRDb2x1bW5zRXZlbnQuc2VuZCgnQ29sdW1ucy5UZW1wbGF0ZVZhbHVlVmlldy5WYWx1ZURpZFNlbGVjdFdpdGhJdGVtJywge1xuXHRcdFx0dmFsdWVWaWV3OiBcdHRoaXMsXG5cdFx0XHRpdGVtOiBcdFx0dGhpcy5pdGVtXG5cdFx0fSk7XG5cblx0fSwgdGhpcyApICk7XG59O1xuXG5UZW1wbGF0ZVZhbHVlVmlldy5wcm90b3R5cGUuX3NldHVwRXZlbnRzID0gZnVuY3Rpb24oKSB7XG5cblx0dGhpcy5vbkl0ZW1EaWRDaGFuZ2UgPSB0aGlzLl9vbkl0ZW1EaWRDaGFuZ2UuYmluZCggdGhpcyApO1xuXG5cdC8vIExpc3RlbiB0byB1cGRhdGVzIGZvciB0aGlzIGl0ZW1cblx0Ly8gYW5kIHVwZGF0ZSBpZiB0aGVyZSdzIGEgbWF0Y2hcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5JdGVtLkRpZENoYW5nZScsIHRoaXMub25JdGVtRGlkQ2hhbmdlICk7XG59O1xuXG5UZW1wbGF0ZVZhbHVlVmlldy5wcm90b3R5cGUuX3RlYXJkb3duRXZlbnRzID0gZnVuY3Rpb24oKSB7XG5cblx0Q29sdW1uc0V2ZW50Lm9mZiggJ0NvbHVtbnMuSXRlbS5EaWRDaGFuZ2UnLCB0aGlzLm9uSXRlbURpZENoYW5nZSApO1xufTtcblxuVGVtcGxhdGVWYWx1ZVZpZXcucHJvdG90eXBlLl9vbkl0ZW1EaWRDaGFuZ2UgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdHZhciBuZXdJdGVtID0gZGF0YS5pdGVtO1xuXHRpZiAoIHRoaXMuaXRlbS5pcyggbmV3SXRlbSApICkge1xuXHRcdHRoaXMuaXRlbSA9IG5ld0l0ZW07XG5cdFx0dGhpcy51cGRhdGUoKTtcblx0fVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBUZW1wbGF0ZVZhbHVlVmlldzsiLCJ2YXIgQ29sdW1uc0V2ZW50IFx0XHRcdFx0PSByZXF1aXJlKCcuLi9tb2RlbHMvQ29sdW1uc0V2ZW50LmpzJyk7XG52YXIgQ29sdW1uc0FuYWx5dGljc1x0XHRcdD0gcmVxdWlyZSgnLi4vbW9kZWxzL0NvbHVtbnNBbmFseXRpY3MuanMnKTtcbnZhciBUZW1wbGF0ZUdyb3VwVmlldyBcdFx0XHQ9IHJlcXVpcmUoJy4vVGVtcGxhdGVHcm91cFZpZXcuanMnKTtcbnZhciBUZW1wbGF0ZVZhbHVlVmlldyBcdFx0XHQ9IHJlcXVpcmUoJy4vVGVtcGxhdGVWYWx1ZVZpZXcuanMnKTtcbnZhciBjb25maWcgXHRcdFx0XHRcdFx0PSByZXF1aXJlKCcuLi9jb25maWcuanMnKTtcblxuLy8gT2JqZWN0IHRvIG1hbmFnZSBwcm9wZXJ0aWVzIG9mIGFuZCBpbnRlcmFjdGlvblxuLy8gd2l0aCB0aGUgdGVtcGxhdGUgaXRzZWxmLlxuXG52YXIgUk9XX0dST1VQX1NFTEVDVE9SIFx0XHQ9ICcubGF5b3V0LXRlbXBsYXRlLXJvdy1ncm91cCcsIFxuXHRST1dfVkFMVUVfU0VMRUNUT1IgXHRcdD0gJy5sYXlvdXQtdGVtcGxhdGUtcm93LXZhbHVlJyxcblx0RFJBR0dJTkdfSVRFTV9TRUxFQ1RPUiBcdD0gJy51aS1kcmFnZ2FibGUtZHJhZ2dpbmcnLFxuXHRFWFBBTkRFRF9DTEFTUyBcdFx0XHQ9ICdleHBhbmRlZCcsXG5cdERST1BQQUJMRV9DTEFTUyBcdFx0PSAnZHJvcHBhYmxlJztcblxuVGVtcGxhdGVWaWV3ID0gZnVuY3Rpb24oIGxheW91dCApICB7XG5cblx0dGhpcy5sYXlvdXQgPSBsYXlvdXQ7O1xuXHR0aGlzLnRlbXBsYXRlID0gQ29sdW1ucy5UZW1wbGF0ZXNbJ3RlbXBsYXRlcy9sYXlvdXQvdGVtcGxhdGUuaGJzJ107XG5cdHRoaXMuJHRlbXBsYXRlO1xuXG5cdHRoaXMuZHJhZ2dpbmdJdGVtO1xuXHR0aGlzLmRyb3BwYWJsZUl0ZW1zID0gW107XG5cblx0dGhpcy5fc2V0dXBFdmVudExpc3RlbmVycygpO1xuXG5cdFRlbXBsYXRlVmlldy5ncm91cHMgPSBbXTtcbn07XG5cbi8vIENsYXNzIE1ldGhvZHNcbi8vIC0tLS0tLS0tLS0tLS0tLS1cblRlbXBsYXRlVmlldy5ncm91cHMgPSBbXTtcblxuLy8gUmV0dXJuIHRoZSBjb3JyZWN0IHZhbHVlIERPTSByZXByZXNlbnRhdGlvbiBmb3IgYW4gaXRlbVxuLy8gQHBhcmFtIHsgSXRlbSB9IGl0ZW0gLS0gdGhlIEl0ZW0gdG8gcmV0cml2ZVxuLy8gQHJldHVybiB7IGpRdWVyeSB9IHRoZSBjb3JyZXNwb25kaW5nIHRlbXBsYXRlIHJlcHJlc2V0YXRpb25cblRlbXBsYXRlVmlldy5nZXRWYWx1ZUZvckl0ZW0gPSBmdW5jdGlvbiggaXRlbSApIHtcblx0dmFyICR2YWx1ZXM7XG5cblx0Ly8gVGhyb3cgYW4gZXJyb3IgaWYgdGhlIGl0ZW0gaXNuJ3Qgb2YgdGhlIGNvcnJlY3QgdHlwZVxuXHRpZiggISggaXRlbSBpbnN0YW5jZW9mIEl0ZW0pICkge1xuXHRcdHRocm93IFwiZXhwZWN0aW9uOiBpdGVtIG11c3QgYmUgb2YgdHlwZSBJdGVtXCI7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gRmluZCBhbGwgdGhlIGN1cnJlbnQgdmFsdWVzIGluIHRoZSB0ZW1wbGF0ZVxuXHQvLyBhbmQgZmlsdGVyIHRoZW0gYnkgdGhlaXIgaW5uZXIgdGV4dFxuXHQvLyByZXR1cm5pbmcgb25seSB0aGUgZmlyc3QgdGhhdCBtYXRjaGVzIHRoZSBpdGVtJ3MgdGl0bGVcblx0JHZhbHVlcyA9ICQoUk9XX1ZBTFVFX1NFTEVDVE9SKS5maWx0ZXIoZnVuY3Rpb24oIGksIGVsZW1lbnQgKSB7XG5cdFx0cmV0dXJuICQoIGVsZW1lbnQgKS50ZXh0KCkudHJpbSgpID09PSBpdGVtLmZvcm1hdHRlZFRpdGxlKCk7XG5cdH0pO1xuXG5cdC8vIFJldHVybiB1bmRlZmluZWQgaWYgdGhlcmUgYXJlIG5vIHJlc3VsdGluZyB2YWx1ZXNcblx0aWYgKCAhJHZhbHVlcy5sZW5ndGggKSB7XG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gJHZhbHVlcztcblx0fVxufVxuXG5UZW1wbGF0ZVZpZXcuZ2V0R3JvdXBzRm9ySXRlbSA9IGZ1bmN0aW9uKCBpdGVtICkge1xuXHR2YXIgJHZhbHVlO1xuXG5cdC8vIElmIHRoZSBpdGVtIGlzIG9mIHR5cGUgSXRlbSwgY29udmVydCBpdCBpbnRvIGEgdmFsdWVcblx0aWYgKCBpdGVtIGluc3RhbmNlb2YgSXRlbSApIHtcblx0XHQkdmFsdWUgPSB0aGlzLmdldFZhbHVlRm9ySXRlbSggaXRlbSApO1xuXHR9IGVsc2UgaWYgKCBpdGVtIGluc3RhbmNlb2YgalF1ZXJ5ICYmIGl0ZW0uaGFzQ2xhc3MoUk9XX1ZBTFVFX1NFTEVDVE9SKSApIHtcblx0XHQkdmFsdWUgPSBpdGVtO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IFwiZXhwZWN0aW9uOiBpdGVtIG11c3QgYmUgb2YgdHlwZSBJdGVtIG9yIGpRdWVyeSB0ZW1wbGF0ZSByb3dcIjtcblx0fVxuXG5cdC8vIElmIHRoaXMgdmFsdWUgaXNuJ3QgaW4gdGhlIHRlbXBsYXRlLCByZXR1cm4gdW5kZWZpbmVkXG5cdGlmKCAhJHZhbHVlICkge1xuXHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdH1cblxuXHQvLyBSZXR1cm4gdGhlIHZhbHVlJ3MgcGFyZW50IGdyb3Vwc1xuXHRyZXR1cm4gJHZhbHVlLnBhcmVudHMoUk9XX0dST1VQX1NFTEVDVE9SKS5tYXAoZnVuY3Rpb24oIGksIGdyb3VwICkge1xuXHRcdHJldHVybiBUZW1wbGF0ZVZpZXcuZ2V0R3JvdXBWaWV3Rm9yR3JvdXAoICQoIGdyb3VwICkgKTtcblx0fSkudG9BcnJheSgpO1xuXG59O1xuXG5UZW1wbGF0ZVZpZXcuZ2V0R3JvdXBWaWV3Rm9yR3JvdXAgPSBmdW5jdGlvbiggZ3JvdXAgKSB7XG5cdHZhciBuZXdHcm91cCA9IFtdO1xuXG5cdGlmICggISggZ3JvdXAgaW5zdGFuY2VvZiBUZW1wbGF0ZUdyb3VwVmlldyApICYmICEoIGdyb3VwIGluc3RhbmNlb2YgalF1ZXJ5ICkgKSB7XG5cdFx0dGhyb3cgXCJleGNlcHRpb246IGdyb3VwIG11c3QgYmUgVGVtcGxhdGVHcm91cFZpZXcgb3IgalF1ZXJ5IG9iamVjdFwiO1xuXHR9XG5cblx0bmV3R3JvdXAgPSBUZW1wbGF0ZVZpZXcuZ3JvdXBzLmZpbHRlcihmdW5jdGlvbiggb2xkR3JvdXAsIGkgKSB7XG5cdFx0aWYgKCBncm91cCBpbnN0YW5jZW9mIFRlbXBsYXRlR3JvdXBWaWV3ICYmIGdyb3VwID09PSBvbGRHcm91cCApIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0gZWxzZSBpZiAoIGdyb3VwIGluc3RhbmNlb2YgalF1ZXJ5ICYmIGdyb3VwLmlzKCBvbGRHcm91cC4kZ3JvdXAgKSApIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9KTtcblxuXHRpZiAoIG5ld0dyb3VwLmxlbmd0aCApIHtcblx0XHRyZXR1cm4gbmV3R3JvdXBbIDAgXTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHR9XG59O1xuXG5UZW1wbGF0ZVZpZXcucmVtb3ZlR3JvdXAgPSBmdW5jdGlvbiggZ3JvdXAgKSB7XG5cdHZhciBncm91cFZpZXcgPSBncm91cCxcblx0XHRpbmRleDtcblxuXHQvLyBJZiB0aGUgZ3JvdXAgaXMgYSBqcXVlcnkgb2JqZWN0LCBnZXQgaXRzIGdyb3VwIHZpZXdcblx0aWYgKCBncm91cFZpZXcgaW5zdGFuY2VvZiBqUXVlcnkgKSB7XG5cdFx0Z3JvdXBWaWV3ID0gVGVtcGxhdGVWaWV3LmdldEdyb3VwVmlld0Zvckdyb3VwKCBncm91cFZpZXcgKTtcblx0fVxuXG5cdC8vIEdldCB0aGUgZ3JvdXAncyBpbmRleCBpbiB0aGUgZ3JvdXBzIGFycmF5XG5cdGluZGV4ID0gVGVtcGxhdGVWaWV3Lmdyb3Vwcy5pbmRleE9mKCBncm91cFZpZXcgKTtcblxuXHQvLyBMZXQgdGhlIGdyb3VwIGtub3cgdGhhdCBpdCdzIGFib3V0IHRvIGJlIHJlbW92ZWRcblx0Ly8gYW5kIHRoZW4gcmVtb3ZlIGl0XG5cdGlmICggaW5kZXggPj0gMCApIHtcblx0XHRDb2x1bW5zRXZlbnQuc2VuZCgnQ29sdW1ucy5UZW1wbGF0ZVZpZXcuV2lsbFJlbW92ZUdyb3VwVmlldycsIHtcblx0XHRcdGdyb3VwVmlldzogXHRncm91cFZpZXdcblx0XHR9KTtcblxuXHRcdFRlbXBsYXRlVmlldy5ncm91cHMuc3BsaWNlKCBpbmRleCwgMSApO1xuXHR9XG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKCkge1xuXG5cdC8vIFJlbmRlciB0aGUgbGF5b3V0IHByZXZpZXdcblx0dGhpcy5fcmVuZGVyUHJldmlldygpO1xuXG5cdC8vIFJlbmRlciBhbmQgcmV0dXJuIHRoZSB0ZW1wbGF0ZVxuXHRyZXR1cm4gdGhpcy5fcmVuZGVyVGVtcGxhdGUoKTtcbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuX3JlbmRlclByZXZpZXcgPSBmdW5jdGlvbigpIHtcblxuXHR2YXIgcHJldmlldyA9IENvbHVtbnMuVGVtcGxhdGVzWyd0ZW1wbGF0ZXMvbGF5b3V0L3ByZXZpZXcuaGJzJ10sXG5cdFx0JHByZXZpZXcgPSAkKCBwcmV2aWV3KHtcblx0XHRcdHNvdXJjZTogY29uZmlnLmVtYmVkLmhvc3QgKyBjb25maWcuZW1iZWQucGF0aFxuXHRcdH0pICk7XG5cblx0dGhpcy4kcHJldmlldyA9ICRwcmV2aWV3XG5cdCQoJyNsYXlvdXQnKS5hcHBlbmQoICRwcmV2aWV3ICk7XG5cblx0cmV0dXJuIHRoaXMuJHByZXZpZXc7XG5cbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuX3JlbmRlclRlbXBsYXRlID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gRm9yIGVhY2ggbm9kZSBpbiB0aGUgbGF5b3V0IG9iamVjdCxcblx0Ly8gcmVuZGVyIGVpdGhlciBhIGdyb3VwIG9yIHZhbHVlXG5cdC8vIGFuZCByZWN1cnNpdmVseSBhcHBlbmQgdGhlbSB0byBlYWNoIG90aGVyXG5cdC8vIHVudGlsIHdlJ3ZlIGNvbnN0cnVjdGVkIHRoZSBmdWxsIHRlbXBsYXRlXG5cdHZhciAkcm93ID0gdGhpcy5fcmVuZGVyUm93Q29tcG9uZW50KCB0aGlzLmxheW91dC5tb2RlbCApO1xuXHR2YXIgJHRlbXBsYXRlID0gJCggdGhpcy50ZW1wbGF0ZSgpICk7XG5cdCR0ZW1wbGF0ZS5maW5kKCcubGF5b3V0LXRlbXBsYXRlLXJvdycpLmFwcGVuZCggJHJvdyApO1xuXHQkKCcjbGF5b3V0JykuYXBwZW5kKCAkdGVtcGxhdGUgKTtcblx0dGhpcy4kdGVtcGxhdGUgPSAkdGVtcGxhdGU7XG5cblx0dGhpcy5fc2V0dXBUZW1wbGF0ZUV2ZW50cygpO1xuXHR0aGlzLl9lbWl0UmVuZGVyKCk7XG5cdHRoaXMuX2VtaXRDaGFuZ2UoKTtcblxuXHRyZXR1cm4gdGhpcy4kdGVtcGxhdGU7XG5cbn1cblxuXG4vLyBSZW5kZXIgYSBwb3J0aW9uIG9mIHRoZSByb3cgbGF5b3V0IG9iamVjdFxuLy8gQHBhcmFtIHsgb2JqZWN0IH0gY29tcG9uZW50IC0tIFRoZSBjb21wb25lbnQgdG8gcmVuZGVyIChlaXRoZXIgYSBncm91cCBvciB2YWx1ZSlcbi8vIEByZXR1cm4geyBqUXVlcnkgb2JqZWN0IH0gLS0gdGhlIGNvbXBvbmVudCdzIHJlbmRlcmVkIGxheW91dFxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5fcmVuZGVyUm93Q29tcG9uZW50ID0gZnVuY3Rpb24oIGNvbXBvbmVudCApIHtcblx0dmFyIGNvbXBvbmVudFZpZXcsXG5cdFx0JGNvbXBvbmVudDtcblxuXHQvLyBSZW5kZXIgdGhlIHRvcCBsZXZlbCBjb21wb25lbnRcblx0Ly8gYXMgYSBncm91cCBpZiBpdCdzIGEgZ3JvdXBcblx0Ly8gb3IgYSB2YWx1ZSBpZiBpdCdzIGEgdmFsdWVcblx0aWYgKCBjb21wb25lbnQudHlwZSA9PT0gJ2dyb3VwJyApIHtcblx0XHRjb21wb25lbnRWaWV3ID0gbmV3IFRlbXBsYXRlR3JvdXBWaWV3KHsgbGF5b3V0OiBjb21wb25lbnQubGF5b3V0LCBzdHlsZTogY29tcG9uZW50LnN0eWxlIH0pO1xuXHRcdCRjb21wb25lbnQgPSBjb21wb25lbnRWaWV3LnJlbmRlcigpO1xuXG5cdFx0Ly8gQWRkIHRoZSBncm91cCB0byB0aGUgZ3JvdXBzIGFycmF5XG5cdFx0VGVtcGxhdGVWaWV3Lmdyb3Vwcy5wdXNoKCBjb21wb25lbnRWaWV3ICk7XG5cblx0XHQvLyBMb29wIHRocm91Z2ggYWxsIGdyb3VwIHN1YnZhbHVlcyBhbmQgcmVuZGVyIHRob3NlIGFzIHdlbGxcblx0XHRjb21wb25lbnQudmFsdWVzLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBpKSB7XG5cdFx0XHQkY29tcG9uZW50LmFwcGVuZCggdGhpcy5fcmVuZGVyUm93Q29tcG9uZW50KCB2YWx1ZSApICk7XG5cdFx0fS5iaW5kKCB0aGlzICkpO1xuXG5cdFx0Ly8gUmV0dXJuIHRoZSBmaW5hbCBjb21wb25lbnQgaW5jbHVkaW5nIHJlbmRlcmVkIHN1YnZpZXdzXG5cdFx0cmV0dXJuICRjb21wb25lbnQ7XG5cblx0fSBlbHNlIGlmICggY29tcG9uZW50LnR5cGUgPT09ICdzaW5nbGUnICkge1xuXHRcdHZhciBpdGVtID0gdGhpcy50YWJsZS5nZXRJdGVtRm9yRGF0YSggY29tcG9uZW50LmRhdGEgKTtcblx0XHRjb21wb25lbnRWaWV3ID0gbmV3IFRlbXBsYXRlVmFsdWVWaWV3KCBpdGVtICk7XG5cdFx0cmV0dXJuIGNvbXBvbmVudFZpZXcucmVuZGVyKCk7XG5cdH1cblxufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5yZW1vdmVQbGFjZWhvbGRlcnMgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBSZW1vdmUgYW55IHBsYWNlaG9sZGVyIHZhbHVlc1xuXHQkKFJPV19WQUxVRV9TRUxFQ1RPUikuZmlsdGVyKCcucGxhY2Vob2xkZXInKS5yZW1vdmUoKTtcblxuXHQvLyBSZW1vdmUgYW55IHBsYWNlaG9sZGVyIGdyb3VwcyB3aGlsZSBsZWF2aW5nIHRoZWlyIGNoaWxkcmVuXG5cdCQoUk9XX0dST1VQX1NFTEVDVE9SKS5maWx0ZXIoJy5wbGFjZWhvbGRlcicpLmNoaWxkcmVuKCkudW53cmFwKCk7XG59O1xuXG4vLyBJZiB0aGlzIHRoZXJlJ3Mgb25seSBvbmUgaXRlbSBsZWZ0IGluIHRoZSBzdXJyb3VuaW5nIGdyb3VwLCBkaXNzb2x2ZSB0aGUgZ3JvdXAuXG4vLyBVbmxlc3MgdGhlIHBhcmVudCBncm91cCBpcyB0aGUgdmVyeSBmaXJzdCBncm91cCBpbiB0aGUgY2VsbC5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuZGlzc29sdmVTaW5nbGVWYWx1ZUdyb3VwcyA9IGZ1bmN0aW9uKCkge1xuXG5cdC8vIEdldCBhbnkgZ3JvdXBzIHRoYXQgb25seSBoYXZlIGEgc2luZ2xlIGFjdGl2ZSBpdGVtXG5cdC8vIGJ1dCBleGNsdWRlIHRoZSBmaXJzdCBncm91cCBpbiB0aGUgcm93XG5cdHZhciAkZ3JvdXBzID0gJCggUk9XX0dST1VQX1NFTEVDVE9SICkubm90KCAnLm1hc3RlciA+ICcgKyBST1dfR1JPVVBfU0VMRUNUT1IgKS5maWx0ZXIoZnVuY3Rpb24oIGksIGdyb3VwICkge1xuXHRcdHJldHVybiAkKCBncm91cCApLmNoaWxkcmVuKCBST1dfVkFMVUVfU0VMRUNUT1IgKS5ub3QoICcuaW5hY3RpdmUnICkubGVuZ3RoID09PSAxO1xuXHR9KTtcblxuXHQvLyB2YXIgJGdyb3VwcyA9ICQoIFJPV19WQUxVRV9TRUxFQ1RPUiArICc6b25seS1jaGlsZCcgKVxuXHQvLyBcdC5wYXJlbnQoKVxuXHQvLyBcdC5ub3QoICdtYXN0ZXIgPiAnICsgUk9XX0dST1VQX1NFTEVDVE9SICk7XG5cblx0Ly8gVW53cmFwIHRoZSAnb25seSBjaGlsZHJlbicgb2YgdGhlc2UgZ3JvdXBzXG5cdCRncm91cHMuZWFjaChmdW5jdGlvbiggaSwgZ3JvdXAgKSB7XG5cdFx0VGVtcGxhdGVWaWV3LnJlbW92ZUdyb3VwKCAkKCBncm91cCApICk7XG5cdH0pO1xuXG5cdCRncm91cHMuY2hpbGRyZW4oKS51bndyYXAoKTtcbn07XG5cbi8vIFJlbW92ZSB0aGUgZHJhZ2dpbmcgaXRlbSBmcm9tIHRoZSB0ZW1wbGF0ZVxuLy8gaWYgaXQgaXMgYSB2YWx1ZS4gUHJlc3VtYWJseSB0aGlzIGlzIGJlY2F1c2Vcbi8vIHRoZSB1c2VyIGp1c3QgZHJhZ2dlZCBpdCBvdXQgb2YgdGhlIHRlbXBsYXRlXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLnJlbW92ZVZhbHVlID0gZnVuY3Rpb24oIHZhbHVlVmlldyApIHtcblxuXHRpZiAoIHZhbHVlVmlldyBpbnN0YW5jZW9mIFRlbXBsYXRlVmFsdWVWaWV3ICkge1xuXHRcdHZhbHVlVmlldy4kdmFsdWUucmVtb3ZlKCk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgXCJleGNlcHRpb246IHZhbHVlIG11c3QgYmUgb2YgdHlwZSBUZW1wbGF0ZVZhbHVlVmlld1wiO1xuXHR9XG59O1xuXG4vLyBBbmltYXRlIHRoZSBkcmFnZ2luZyBoZWxwZXIgdG8gdGhlIHBvc2l0aW9uIG9mIGl0cyByZXNwZWN0aXZlIGl0ZW1cblRlbXBsYXRlVmlldy5wcm90b3R5cGUucmVtb3ZlRHJhZ2dpbmdWYWx1ZSA9IGZ1bmN0aW9uKCBjYWxsYmFjayApIHtcblx0dmFyICRoZWxwZXIgPSAkKCcudWktZHJhZ2dhYmxlLWRyYWdnaW5nLnVpLWRyYWdnYWJsZS1oYW5kbGUnKVxuXHRcdCRjbG9uZSA9ICRoZWxwZXIuY2xvbmUoKSxcblx0XHQkaXRlbSA9ICQoJyNjb2x1bW5zIC5sYXlvdXQtY29sdW1uJykuZmlsdGVyKGZ1bmN0aW9uKCBpLCBpdGVtICkge1xuXHRcdFx0Ly8gY29uc29sZS5sb2coJCggaXRlbSApLnRleHQoKS50cmltKCkpO1xuXHRcdFx0cmV0dXJuICRjbG9uZS50ZXh0KCkudHJpbSgpID09PSAkKCBpdGVtICkudGV4dCgpLnRyaW0oKTtcblx0XHR9KS5maXJzdCgpO1xuXG5cdC8vIEZpbmQgdGhlIHBvc2l0aW9uIG9mIHRoZSBvcmlnaW5hbCB0b2tlblxuXHQvLyB2YXIgb3JpZ2luYWxQb3NpdGlvbiA9IHtcblx0Ly8gXHR0b3A6ICRtYXRjaC5vZmZzZXQoKS50b3AsXG5cdC8vIFx0bGVmdDogJG1hdGNoLm9mZnNldCgpLmxlZnRcblx0Ly8gfTtcblxuXHQvLyBDaGFuZ2UgdGhlIGNsb25lIHRvIHBvc2l0aW9uIGZpeGVkXG5cdC8vIGFuZCBhZGQgdG8gY29sdW1ucyBjb250YWluZXJcblx0JCgnLmxheW91dC1jb2x1bW5zJykuYXBwZW5kKCAkY2xvbmUgKTtcblx0JGNsb25lLmNzcyh7XG5cdFx0cG9zaXRpb246ICdmaXhlZCcsXG5cdFx0dG9wOiAkaGVscGVyLm9mZnNldCgpLnRvcCxcblx0XHRsZWZ0OiAkaGVscGVyLm9mZnNldCgpLmxlZnRcblx0fSk7XG5cblx0Ly8gJGNsb25lLmFwcGVuZFRvKCcubGF5b3V0LWNvbHVtbnMnKTtcblxuXHQkY2xvbmUudmVsb2NpdHkoe1xuXHRcdHRyYW5zbGF0ZVg6ICRpdGVtLm9mZnNldCgpLmxlZnQgLSAkY2xvbmUub2Zmc2V0KCkubGVmdCxcblx0XHR0cmFuc2xhdGVZOiAkaXRlbS5vZmZzZXQoKS50b3AgLSAkY2xvbmUub2Zmc2V0KCkudG9wXG5cdH0sIHtcblx0XHRkdXJhdGlvbjogMjAwLFxuXHRcdGNvbXBsZXRlOiB0aGlzLl9vbkRyYWdnaW5nVmFsdWVSZW1vdmVkLmJpbmQoIHRoaXMgKVxuXHR9KTtcbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuX29uRHJhZ2dpbmdWYWx1ZVJlbW92ZWQgPSBmdW5jdGlvbiAoIGVsZW1lbnRzICkge1xuXHRcblx0Ly8gUmVtb3ZlIHRoZSBjbG9uZSBmcm9tIHRoZSBET01cblx0JCggZWxlbWVudHNbIDAgXSApLnJlbW92ZSgpO1xuXG5cdC8vIEVtaXQgYSBjaGFuZ2UgZXZlbnRcblx0dGhpcy5fZW1pdENoYW5nZSgpO1xuXG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLl9lbWl0Q2hhbmdlID0gZnVuY3Rpb24oKSB7XG5cdFxuXHQvLyBFbWl0IGEgY2hhbmdlIGV2ZW50XG5cdC8vIHZhciBldmVudCA9IG5ldyBDdXN0b21FdmVudCggJ0NvbHVtbnMuVGVtcGxhdGVWaWV3LkRpZENoYW5nZScsIHtcblx0Ly8gdGVtcGxhdGVWaWV3OiBcdHRoaXNcblx0Ly8gfSk7XG5cdC8vIHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHQvLyBldmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuVGVtcGxhdGVWaWV3LkRpZENoYW5nZScsIGZhbHNlLCBmYWxzZSwge1xuXHQvLyBcdHRlbXBsYXRlVmlldzogXHR0aGlzXG5cdC8vIH0pO1xuXHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcblxuXHRDb2x1bW5zRXZlbnQuc2VuZCgnQ29sdW1ucy5UZW1wbGF0ZVZpZXcuRGlkQ2hhbmdlJywge1xuXHRcdHRlbXBsYXRlVmlldzogdGhpc1xuXHR9KTtcbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuX2VtaXRSZW5kZXIgPSBmdW5jdGlvbigpIHtcblx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuVGVtcGxhdGVWaWV3LkRpZFJlbmRlcicsIHtcblx0XHR0ZW1wbGF0ZVZpZXc6IHRoaXNcblx0fSk7XG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLl9zZXR1cEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gTGlzdGVuIHRvIGFwcCByZW5kZXIgZXZlbnRcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5EZXNrdG9wVmlldy5EaWRSZW5kZXInLCB0aGlzLl9vbkRlc2t0b3BSZW5kZXIuYmluZCggdGhpcyApICk7XG5cdFxuXHQvLyBMaXN0ZW4gdG8gdGhlIHRhYmxlIHVwbG9hZCBldmVudFxuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLlRhYmxlLkRpZFVwbG9hZFdpdGhTdWNjZXNzJywgdGhpcy5fb25UZW1wbGF0ZVVwbG9hZC5iaW5kKCB0aGlzICkgKTtcbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuX3NldHVwVGVtcGxhdGVFdmVudHMgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBMaXN0ZW4gdG8gZHJhZyBldmVudHMgZm9yIGl0ZW1zXG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuSXRlbVZpZXcuSXRlbURpZEJlZ2luRHJhZycsIHRoaXMuX29uSXRlbURpZEJlZ2luRHJhZy5iaW5kKCB0aGlzICkpO1xuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLkl0ZW1WaWV3Lkl0ZW1EaWRFbmREcmFnJywgdGhpcy5fb25JdGVtRGlkRW5kRHJhZy5iaW5kKCB0aGlzICkpO1xuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLkl0ZW1WaWV3Lkl0ZW1EaWREcmFnJywgdGhpcy5fb25JdGVtRGlkRHJhZy5iaW5kKCB0aGlzICkpO1xuXG5cdC8vIExpc3RlbiB0byBkcmFnIGV2ZW50cyBmb3IgdmFsdWVzXG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuVGVtcGxhdGVWYWx1ZVZpZXcuVmFsdWVEaWRCZWdpbkRyYWdXaXRoSXRlbScsIHRoaXMuX29uVmFsdWVEaWRCZWdpbkRyYWcuYmluZCggdGhpcyApKTtcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5UZW1wbGF0ZVZhbHVlVmlldy5WYWx1ZURpZEVuZERyYWdXaXRoSXRlbScsIHRoaXMuX29uVmFsdWVEaWRFbmREcmFnLmJpbmQoIHRoaXMgKSk7XG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuVGVtcGxhdGVWYWx1ZVZpZXcuVmFsdWVEaWREcmFnV2l0aEl0ZW0nLCB0aGlzLl9vblZhbHVlRGlkRHJhZy5iaW5kKCB0aGlzICkpO1xuXG5cdC8vIExpc3RlbiB0byBkcm9wIGV2ZW50cyBmb3IgZ3JvdXBzXG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuVGVtcGxhdGVHcm91cFZpZXcuR3JvdXBEaWRCZWdpbkRyb3BPdmVyV2l0aFZhbHVlVmlldycsIHRoaXMuX29uR3JvdXBEaWRCZWdpbkRyb3BPdmVyLmJpbmQoIHRoaXMgKSk7XG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuVGVtcGxhdGVHcm91cFZpZXcuR3JvdXBEaWRFbmREcm9wT3ZlcldpdGhWYWx1ZVZpZXcnLCB0aGlzLl9vbkdyb3VwRGlkRW5kRHJvcE92ZXIuYmluZCggdGhpcyApKTtcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5UZW1wbGF0ZUdyb3VwVmlldy5Hcm91cERpZERyb3BXaXRoVmFsdWVWaWV3JywgdGhpcy5fb25Hcm91cERpZERyb3AuYmluZCggdGhpcyApKTtcblxuXHQvLyBMaXN0ZW4gdG8gZW1iZWRkZWQgdGFibGUgZXZlbnRzXG5cdENvbHVtbnNFdmVudC5vbignQ29sdW1uc1RhYmxlRGlkUmVuZGVyRGF0YScsIHRoaXMuX29uVGFibGVEaWRSZW5kZXJEYXRhLmJpbmQoIHRoaXMgKSApO1xuXHRDb2x1bW5zRXZlbnQub24oJ0NvbHVtbnNUYWJsZURpZFNjcm9sbCcsIHRoaXMuX29uVGFibGVEaWRTY3JvbGwuYmluZCggdGhpcyApICk7XG5cdENvbHVtbnNFdmVudC5vbignQ29sdW1uc1RhYmxlV2lsbEV4cGFuZCcsIHRoaXMuX29uVGFibGVXaWxsRXhwYW5kLmJpbmQoIHRoaXMgKSApO1xuXHRDb2x1bW5zRXZlbnQub24oJ0NvbHVtbnNUYWJsZURpZEV4cGFuZCcsIHRoaXMuX29uVGFibGVEaWRFeHBhbmQuYmluZCggdGhpcyApICk7XG5cdENvbHVtbnNFdmVudC5vbignQ29sdW1uc1RhYmxlRGlkQ29sbGFwc2UnLCB0aGlzLl9vblRhYmxlRGlkQ29sbGFwc2UuYmluZCggdGhpcyApICk7XG5cblx0Ly8gTGlzdGVuIGZvciB1cGRhdGVzIHRvIHZhbHVlcyBhbmQgZ3JvdXBzXG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuVGVtcGxhdGVWYWx1ZVZpZXcuRGlkQ2hhbmdlJywgdGhpcy5fb25UZW1wbGF0ZVZpZXdEaWRDaGFuZ2UuYmluZCggdGhpcyApKTtcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5UZW1wbGF0ZUdyb3VwVmlldy5EaWRDaGFuZ2UnLCB0aGlzLl9vblRlbXBsYXRlVmlld0RpZENoYW5nZS5iaW5kKCB0aGlzICkpO1xufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5fb25EZXNrdG9wUmVuZGVyID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXHR0aGlzLl9yZW5kZXJQcmV2aWV3KCk7XG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLl9vblRlbXBsYXRlVmlld0RpZENoYW5nZSA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblx0dGhpcy5fZW1pdENoYW5nZSgpO1xufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5fb25UZW1wbGF0ZVVwbG9hZCA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblx0dGhpcy50YWJsZSA9IGRhdGEudGFibGU7XG5cdHRoaXMubGF5b3V0ID0gZGF0YS50YWJsZS5sYXlvdXQ7XG5cdHRoaXMuX3JlbmRlclRlbXBsYXRlKCk7XG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLl9vblRhYmxlRGlkUmVuZGVyRGF0YSA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblx0dGhpcy4kdGVtcGxhdGUuZmluZCgnLmxheW91dC10ZW1wbGF0ZS1yb3cnKS5jc3Moe1xuXHRcdGhlaWdodDogZGF0YS50YWJsZS50YWxsZXN0Um93SGVpZ2h0KClcblx0fSk7XG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLl9vblRhYmxlV2lsbEV4cGFuZCA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblxuXHQvLyBNb3ZlIHRoZSB0ZW1wbGF0ZSBkb3duIGJlbG93IHRoZSBoZWFkZXJcblx0dGhpcy4kdGVtcGxhdGUudmVsb2NpdHkoe1xuXHRcdHRyYW5zbGF0ZVk6IDBcblx0fSwge1xuXHRcdGR1cmF0aW9uOiA0MDBcblx0fSk7XG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLl9vblRhYmxlRGlkRXhwYW5kID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXG5cdHRoaXMuJHByZXZpZXcuYWRkQ2xhc3MoIEVYUEFOREVEX0NMQVNTICk7XG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLl9vblRhYmxlRGlkQ29sbGFwc2UgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cblx0dGhpcy4kcHJldmlldy5yZW1vdmVDbGFzcyggRVhQQU5ERURfQ0xBU1MgKTtcbn07XG5cdFxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5fb25UYWJsZURpZFNjcm9sbCA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblxuXHQvLyBNb3ZlIHRoZSB0ZW1wbGF0ZSB1cCB1bnRpbCBpdCBoaXRzIHRoZSBoZWFkZXJcblx0dmFyIG1pblNjcm9sbCA9IC0yNCxcblx0XHRtYXhTY3JvbGwgPSAwLFxuXHRcdHNjcm9sbCA9IC0kKCcuY29sdW1ucy10YWJsZS1jb250YWluZXInKS5zY3JvbGxUb3AoKTtcblxuXHQvLyBNYWtlIHN1cmUgdGhlIHNjcm9sbCBpcyB3aXRoaW4gYm91bmRzXG5cdHNjcm9sbCA9IHNjcm9sbCA8IG1pblNjcm9sbCA/IG1pblNjcm9sbCA6IHNjcm9sbDtcblx0c2Nyb2xsID0gc2Nyb2xsID4gbWF4U2Nyb2xsID8gbWF4U2Nyb2xsIDogc2Nyb2xsO1xuXG5cdC8vIEFkanVzdCB0aGUgdGVtcGxhdGVcblx0JC5WZWxvY2l0eS5ob29rKCB0aGlzLiR0ZW1wbGF0ZSwgXCJ0cmFuc2xhdGVZXCIsIHNjcm9sbCArIFwicHhcIiApO1xufTtcbiBcblRlbXBsYXRlVmlldy5wcm90b3R5cGUuX29uSXRlbURpZEJlZ2luRHJhZyA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblx0dGhpcy5kcmFnZ2luZ0l0ZW0gPSBkYXRhLml0ZW0uaXRlbTtcbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuX29uSXRlbURpZEVuZERyYWcgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdHRoaXMuZHJhZ2dpbmdJdGVtID0gdW5kZWZpbmVkO1xuXHR0aGlzLnJlbW92ZVBsYWNlaG9sZGVycygpO1xufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5fb25JdGVtRGlkRHJhZyA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblx0aWYgKCB0aGlzLmRyb3BwYWJsZUl0ZW1zLmxlbmd0aCApIHtcblx0XHR0aGlzLnJlbW92ZVBsYWNlaG9sZGVycygpO1xuXHRcdHRoaXMucG9zaXRpb25Ecm9wRm9yRHJhZ0V2ZW50SW5QYXJlbnRXaXRoUGxhY2Vob2xkZXIoIGRhdGEuZXZlbnQsIHRoaXMuZHJvcHBhYmxlSXRlbXNbIHRoaXMuZHJvcHBhYmxlSXRlbXMubGVuZ3RoIC0gMSBdLiRncm91cCwgdHJ1ZSApO1xuXHR9XG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLl9vblZhbHVlRGlkQmVnaW5EcmFnID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXHR0aGlzLmRyYWdnaW5nSXRlbSA9IGRhdGEudmFsdWVWaWV3Lml0ZW07XG5cdHRoaXMuZGlzc29sdmVTaW5nbGVWYWx1ZUdyb3VwcygpO1xufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5fb25WYWx1ZURpZEVuZERyYWcgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdC8vIGlmICggIXRoaXMuZHJvcHBhYmxlSXRlbXMubGVuZ3RoICkge1xuXHRpZiAoICFUZW1wbGF0ZVZpZXcuZ2V0VmFsdWVGb3JJdGVtKCBkYXRhLnZhbHVlVmlldy5pdGVtICkgKSB7XG5cdFx0dGhpcy5yZW1vdmVEcmFnZ2luZ1ZhbHVlKCk7XG5cblx0XHRDb2x1bW5zQW5hbHl0aWNzLnNlbmQoe1xuXHRcdFx0Y2F0ZWdvcnk6ICd0ZW1wbGF0ZScsXG5cdFx0XHRhY3Rpb246ICdyZW1vdmUnLFxuXHRcdFx0dGFibGVfaWQ6IHRoaXMudGFibGUuaWRcblx0XHR9KTtcblx0XHQvLyB0aGlzLl9lbWl0Q2hhbmdlKCk7XG5cdH1cbn1cblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5fb25WYWx1ZURpZERyYWcgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdGlmICggdGhpcy5kcm9wcGFibGVJdGVtcy5sZW5ndGggKSB7XG5cdFx0dGhpcy5yZW1vdmVQbGFjZWhvbGRlcnMoKTtcblx0XHR0aGlzLnBvc2l0aW9uRHJvcEZvckRyYWdFdmVudEluUGFyZW50V2l0aFBsYWNlaG9sZGVyKCBkYXRhLmV2ZW50LCB0aGlzLmRyb3BwYWJsZUl0ZW1zWyB0aGlzLmRyb3BwYWJsZUl0ZW1zLmxlbmd0aCAtIDEgXS4kZ3JvdXAgLCB0cnVlICk7XG5cdH1cbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuX29uR3JvdXBEaWRCZWdpbkRyb3BPdmVyID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXHRpZiAoIHRoaXMuZHJvcHBhYmxlSXRlbXMuaW5kZXhPZiggZGF0YS5ncm91cFZpZXcgKSA9PSAtMSApIHtcblx0XHR0aGlzLmRyb3BwYWJsZUl0ZW1zLnB1c2goIGRhdGEuZ3JvdXBWaWV3ICk7XG5cdH1cblxuXHQkKCBEUkFHR0lOR19JVEVNX1NFTEVDVE9SICkuYWRkQ2xhc3MoIERST1BQQUJMRV9DTEFTUyApO1xufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5fb25Hcm91cERpZEVuZERyb3BPdmVyID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXHR2YXIgZ3JvdXBWaWV3ID0gZGF0YS5ncm91cFZpZXc7XG5cblx0Z3JvdXBWaWV3LnJlbW92ZVBsYWNlaG9sZGVycygpO1xuXHR0aGlzLmRyb3BwYWJsZUl0ZW1zLnNwbGljZSggdGhpcy5kcm9wcGFibGVJdGVtcy5pbmRleE9mKCBncm91cFZpZXcgKSwgMSApO1xuXG5cdCQoIERSQUdHSU5HX0lURU1fU0VMRUNUT1IgKS5yZW1vdmVDbGFzcyggRFJPUFBBQkxFX0NMQVNTICk7XG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLl9vbkdyb3VwRGlkRHJvcCA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblx0dmFyIGdyb3VwVmlldyA9IGRhdGEuZ3JvdXBWaWV3O1xuXG5cdC8vIERvbid0IGRvIGFueXRoaW5nIGlmIHRoaXMgZ3JvdXAgaXNuJ3QgdGhlIG1vc3QgcmVjZW50bHkgaG92ZXJlZCBvdmVyXG5cdC8vIG9mIGlmIHRoZXJlIGFyZSBjdXJyZW50bHkgbm8gaG92ZXJlZCBncm91cHMgKHdoaWNoIHNob3VsZCBuZXZlciBiZSB0aGUgY2FzZSlcblx0aWYgKCAhdGhpcy5kcm9wcGFibGVJdGVtcy5sZW5ndGggfHwgdGhpcy5kcm9wcGFibGVJdGVtc1sgdGhpcy5kcm9wcGFibGVJdGVtcy5sZW5ndGggLSAxIF0gIT09IGdyb3VwVmlldyApIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvLyBPdGhlcndpc2UsIGNsZWFyIGFsbCB0aGUgZ3JvdXAncyBwbGFjZWhvbGRlcnNcblx0Z3JvdXBWaWV3LnJlbW92ZVBsYWNlaG9sZGVycygpO1xuXG5cdC8vIEFuZCBmaW5hbGx5IHBvc2l0aW9uIHRoZSBuZXcgaXRlbSBpbiB0aGUgdGVtcGxhdGVcblx0dGhpcy5wb3NpdGlvbkRyb3BGb3JEcmFnRXZlbnRJblBhcmVudFdpdGhQbGFjZWhvbGRlciggZGF0YS5ldmVudCwgdGhpcy5kcm9wcGFibGVJdGVtc1sgdGhpcy5kcm9wcGFibGVJdGVtcy5sZW5ndGggLSAxIF0uJGdyb3VwICwgZmFsc2UgKVxuXG5cdC8vIEVtcHR5IHRoZSBkcm9wcGFibGUgaXRlbXMgYXJyYXlcblx0dGhpcy5kcm9wcGFibGVJdGVtcyA9IFtdO1xuXG5cdENvbHVtbnNBbmFseXRpY3Muc2VuZCh7XG5cdFx0Y2F0ZWdvcnk6ICd0ZW1wbGF0ZScsXG5cdFx0YWN0aW9uOiAnYWRkJyxcblx0XHR0YWJsZV9pZDogdGhpcy50YWJsZS5pZFxuXHR9KTtcblxufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5kaW1lbnNpb25zRm9yVmFsdWUgPSBmdW5jdGlvbiggJHZhbHVlLCBkcmFnVGhyZXNob2xkLCBidWZmZXIgKSB7XG5cdHZhciBkcmFnVGhyZXNob2xkXHQ9IGRyYWdUaHJlc2hvbGQgfHwgMC41LFxuXHRcdGJ1ZmZlciBcdFx0XHQ9IGJ1ZmZlciB8fCAwLjIsXG5cdFx0ZGlyZWN0aW9uIFx0XHQ9ICR2YWx1ZS5wYXJlbnQoKS5kYXRhKCdmbGV4LWRpcmVjdGlvbicpIHx8ICdyb3cnLFxuXHRcdGJ1ZmZlclhcdFx0XHQ9IGRpcmVjdGlvbiA9PT0gJ3JvdycgPyBidWZmZXIgOiAwLFxuXHRcdGJ1ZmZlcllcdFx0XHQ9IGRpcmVjdGlvbiA9PT0gJ2NvbHVtbicgPyBidWZmZXIgOiAwO1xuXG5cdHJldHVybiB7XG5cdFx0dG9wOiBcdFx0XHQkdmFsdWUub2Zmc2V0KCkudG9wLFxuXHRcdGxlZnQ6IFx0XHRcdCR2YWx1ZS5vZmZzZXQoKS5sZWZ0LFxuXHRcdGJvdHRvbTogXHRcdCR2YWx1ZS5vZmZzZXQoKS50b3AgKyAkdmFsdWUuaGVpZ2h0KCksXG5cdFx0cmlnaHQ6IFx0XHRcdCR2YWx1ZS5vZmZzZXQoKS5sZWZ0ICsgJHZhbHVlLndpZHRoKCksXG5cblx0XHRtaWRkbGVYOiBcdFx0JHZhbHVlLm9mZnNldCgpLmxlZnQgKyAoICR2YWx1ZS53aWR0aCgpIC8gMiApLFxuXHRcdG1pZGRsZVk6IFx0XHQkdmFsdWUub2Zmc2V0KCkudG9wICsgKCAkdmFsdWUuaGVpZ2h0KCkgLyAyICksXG5cblx0XHRkcmFnTWlkZGxlWDogXHQkdmFsdWUub2Zmc2V0KCkubGVmdCArICggJHZhbHVlLndpZHRoKCkgKiBkcmFnVGhyZXNob2xkICksXG5cdFx0ZHJhZ01pZGRsZVk6IFx0JHZhbHVlLm9mZnNldCgpLnRvcCArICggJHZhbHVlLmhlaWdodCgpICogZHJhZ1RocmVzaG9sZCApLFxuXHRcdGRyYWdNaWRkbGU6IFx0ZGlyZWN0aW9uID09PSAncm93JyA/IFx0JHZhbHVlLm9mZnNldCgpLmxlZnQgKyAoICR2YWx1ZS53aWR0aCgpICogZHJhZ1RocmVzaG9sZCApIDpcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCR2YWx1ZS5vZmZzZXQoKS50b3AgKyAoICR2YWx1ZS5oZWlnaHQoKSAqIGRyYWdUaHJlc2hvbGQgKSxcblxuXHRcdGJ1ZmZlclRvcDogXHRcdCR2YWx1ZS5vZmZzZXQoKS50b3AgKyAoICR2YWx1ZS5oZWlnaHQoKSAqIGJ1ZmZlclkgKSxcblx0XHRidWZmZXJMZWZ0OiBcdCR2YWx1ZS5vZmZzZXQoKS5sZWZ0ICsgKCAkdmFsdWUud2lkdGgoKSAqIGJ1ZmZlclggKSxcblx0XHRidWZmZXJCb3R0b206IFx0JHZhbHVlLm9mZnNldCgpLnRvcCArICR2YWx1ZS5oZWlnaHQoKSAtICggJHZhbHVlLmhlaWdodCgpICogYnVmZmVyWSApLFxuXHRcdGJ1ZmZlclJpZ2h0OiBcdCR2YWx1ZS5vZmZzZXQoKS5sZWZ0ICsgJHZhbHVlLndpZHRoKCkgLSAoICR2YWx1ZS53aWR0aCgpICogYnVmZmVyWCApXG5cdH07XG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLmlzSW50ZXJzZWN0ZWQgPSBmdW5jdGlvbiggdmFsdWVzLCBldmVudCApIHtcblxuXHQvLyBBY2NvdW50IGZvciB0aGUgbGF5b3V0J3Mgc2Nyb2xsIG9mZnNldCwgd2hpY2ggY2FuIG1lc3MgdXAgdGhlIGNhbGN1bGF0aW9uc1xuXHR2YXIgc2Nyb2xsT2Zmc2V0IFx0PSBwYXJzZUludCgkLlZlbG9jaXR5Lmhvb2soJChcIiNsYXlvdXRcIiksIFwidHJhbnNsYXRlWVwiKSkgfHwgMCxcblx0XHRkcmFnT2Zmc2V0WCBcdD0gZXZlbnQuY2xpZW50WCxcblx0XHRkcmFnT2Zmc2V0WVx0XHQ9IGV2ZW50LmNsaWVudFk7XG5cblx0cmV0dXJuIFx0dmFsdWVzLmJ1ZmZlckxlZnQgXHRcdFx0XHRcdDw9IGRyYWdPZmZzZXRYICYmXG5cdFx0XHR2YWx1ZXMuYnVmZmVyUmlnaHQgXHRcdFx0XHRcdD49IGRyYWdPZmZzZXRYICYmXG5cdFx0XHR2YWx1ZXMuYnVmZmVyVG9wIC0gc2Nyb2xsT2Zmc2V0IFx0PD0gZHJhZ09mZnNldFkgJiZcblx0XHRcdHZhbHVlcy5idWZmZXJCb3R0b20gLSBzY3JvbGxPZmZzZXQgXHQ+PSBkcmFnT2Zmc2V0WTtcbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuaXNQcmV2aW91cyA9IGZ1bmN0aW9uKCB2YWx1ZXMsIGRyYWdQb2ludCApIHtcblx0cmV0dXJuIGRyYWdQb2ludCA+PSB2YWx1ZXMuZHJhZ01pZGRsZTtcbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUud3JhcFZhbHVlV2l0aEdyb3VwID0gZnVuY3Rpb24oICR2YWx1ZSwgcGxhY2Vob2xkZXIgKSB7XG5cdFxuXHQvLyBNYWtlIHN1cmUgdGhlIGdyb3VwIGhhcyB0aGUgb3Bwb3NpdGUgZGlyZWN0aW9uIG9mIGl0cyBwYXJlbnRcblx0dmFyIGRpcmVjdGlvbiBcdD0gJHZhbHVlLnBhcmVudCgpLmRhdGEoJ2ZsZXgtZGlyZWN0aW9uJykgPT09ICdjb2x1bW4nID8gJ3JvdycgOiAnY29sdW1uJztcblx0dmFyIGdyb3VwIFx0XHQ9IG5ldyBUZW1wbGF0ZUdyb3VwVmlldyh7XG5cdFx0cGxhY2Vob2xkZXI6IHBsYWNlaG9sZGVyLFxuXHRcdGxheW91dDogW3tcblx0XHRcdHByb3BlcnR5OiAgXHQnZmxleC1kaXJlY3Rpb24nLFxuXHRcdFx0dmFsdWU6IFx0XHQgZGlyZWN0aW9uXG5cdFx0fV1cblx0fSk7XG5cblx0dmFyICRncm91cCA9IGdyb3VwLnJlbmRlcigpO1xuXG5cdC8vIEZpcnN0IGFkZCB0aGUgZ3JvdXAgdG8gdGhlIERPTSBiZWZvcmUgdGhlIHZhbHVlXG5cdC8vIGFuZCB0aGVuIG1vdmUgdGhlIHZhbHVlIGludG8gdGhlIGdyb3VwLlxuXHQvLyBXZSBkbyB0aGlzIGluc3RlYWQgb2YganF1ZXJ5J3Mgd3JhcCBiZWNhdXNlIHdyYXAgaW5zZXJ0cyBhIGNsb25lXG5cdC8vIGFuZCB3ZSBuZWVkIHRoZSBwcmV2aW91c2x5IHJlbmRlcmVkIG9iamVjdCBpdHNlbGYgaW4gdGhlIERPTS5cblx0JGdyb3VwLmluc2VydEJlZm9yZSggJHZhbHVlICk7XG5cdCRncm91cC5hcHBlbmQoICR2YWx1ZSApO1xuXG5cdC8vIFdyYXAgdGhlIHZhbHVlIHdpdGggdGhlIG5ldyBncm91cFxuXHQvLyAkdmFsdWUud3JhcCggJGdyb3VwICk7XG5cdC8vICRncm91cC5hcHBlbmQoICR2YWx1ZSApO1xuXG5cdGlmICggIXBsYWNlaG9sZGVyICkge1xuXHRcdFRlbXBsYXRlVmlldy5ncm91cHMucHVzaCggZ3JvdXAgKTtcblx0fVxuXG5cdFxuXHQvLyByZXR1cm4gJHZhbHVlLndyYXAoICRncm91cCApO1xufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5pbnNlcnREcm9wQmVmb3JlRWxlbWVudEluUGFyZW50V2l0aFBsYWNlaG9sZGVyID0gZnVuY3Rpb24oIGl0ZW0sICRwcmV2aW91cywgJHBhcmVudCwgcGxhY2Vob2xkZXIgKSB7XG5cblx0Ly8gQ3JlYXRlIGEgbmV3IHZhbHVlIHZpZXcgd2l0aCB0aGUgYXBwcm9wcmlhdGUgcGxhY2Vob2xkZXIgc3RhdHVzXG5cdHZhciB2YWx1ZVZpZXcgXHQ9IG5ldyBUZW1wbGF0ZVZhbHVlVmlldyggaXRlbSwgcGxhY2Vob2xkZXIgKSxcblx0XHQkdmFsdWUgXHRcdD0gdmFsdWVWaWV3LnJlbmRlcigpO1xuXG5cdC8vIElmIHRoZXJlIGlzIGEgcHJldmlvdXMgaXRlbSwgaW5zZXJ0IHRoZSBuZXcgaXRlbSBqdXN0IGFmdGVyIGl0XG5cdC8vIE90aGVyd2lzZSBqdXN0IGFkZCB0aGUgaXRlbSB0byB0aGUgcGFyZW50IGFzIHRoZSBmaXJzdCBjaGlsZFxuXHRpZiAoICRwcmV2aW91cyApIHtcblx0XHQkcHJldmlvdXMuYWZ0ZXIoICR2YWx1ZSApO1xuXHR9IGVsc2Uge1x0XG5cdFx0JHBhcmVudC5wcmVwZW5kKCAkdmFsdWUgKTtcblx0fVxuXG5cdGlmICggIXBsYWNlaG9sZGVyICkge1xuXHRcdHRoaXMuX2VtaXRDaGFuZ2UoKTtcblx0fSBcbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUucG9zaXRpb25Ecm9wRm9yRHJhZ0V2ZW50SW5QYXJlbnRXaXRoUGxhY2Vob2xkZXIgPSBmdW5jdGlvbiggZXZlbnQsICRwYXJlbnQsIHBsYWNlaG9sZGVyICkge1xuXHRcdFxuXHRcdC8vIE1ha2Ugc3VyZSB3ZSBoYXZlIGEgcGFyZW50XG5cdFx0aWYgKCAhJHBhcmVudCApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBTZXQgdXAgbmVjZXNzYXJ5IHZhcmlhYmxlcy4gVGhlbixcblx0XHQvLyBHZXQgYWxsIHRoZSBpdGVtcyBpbiB0aGUgZ3JvdXBcblx0XHQvLyBhbmQgZmlsdGVyIG91dCB0aGUgcGxhY2Vob2xkZXJzXG5cdFx0Ly8gYW5kIHRoZSBkcmFnZ2luZyBpdGVtXG5cdFx0dmFyIGRpbWVuc2lvbnMsXG5cdFx0XHRkcmFnUG9pbnQsXG5cdFx0XHQkcHJldmlvdXNDaGlsZCxcblx0XHRcdCRjaGlsZCxcblx0XHRcdCRjaGlsZHJlbiA9ICRwYXJlbnQuY2hpbGRyZW4oKVxuXHRcdFx0XHRcdFx0Lm5vdCgnLnBsYWNlaG9sZGVyJylcblx0XHRcdFx0XHRcdC5ub3QoJy5pbmFjdGl2ZScpXG5cdFx0XHRcdFx0XHQubm90KCcudWktZHJhZ2dhYmxlLWRyYWdnaW5nJyk7XG5cblx0XHQvLyBJZiB0aGVyZSBhcmVuJ3QgYW55IGNoaWxkcmVuLFxuXHRcdC8vIGp1c3QgaW5zZXJ0IHRoZSBwbGFjZWhvbGRlciBhdCB0aGUgYmVnaW5uaW5nXG5cdFx0aWYgKCAhJGNoaWxkcmVuLmxlbmd0aCApIHtcblx0XHRcdHRoaXMuaW5zZXJ0RHJvcEJlZm9yZUVsZW1lbnRJblBhcmVudFdpdGhQbGFjZWhvbGRlciggdGhpcy5kcmFnZ2luZ0l0ZW0sIG51bGwsICRwYXJlbnQsIHBsYWNlaG9sZGVyKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQkY2hpbGRyZW4uZWFjaChmdW5jdGlvbiggaSwgY2hpbGQgKSB7XG5cdFx0XHQkY2hpbGQgPSAkKCBjaGlsZCApO1xuXG5cdFx0XHQvLyBBcmUgd2UgaW50ZXJzZWN0aW5nIGRpcmVjdGx5IHdpdGggdGhlIGNoaWxkP1xuXHRcdFx0ZGltZW5zaW9ucyA9IHRoaXMuZGltZW5zaW9uc0ZvclZhbHVlKCAkY2hpbGQgKTtcblx0XHRcdGlmICggdGhpcy5pc0ludGVyc2VjdGVkKCBkaW1lbnNpb25zLCBldmVudCApICkge1xuXHRcdFx0XHQvLyBSZXNldCB0aGUgcHJldmlvdXMgY2hpbGRcblx0XHRcdFx0JHByZXZpb3VzQ2hpbGQgPSBudWxsO1xuXG5cdFx0XHRcdC8vIFdyYXAgdGhlIHR3byBpdGVtcyBpbiBhIGdyb3VwXG5cdFx0XHRcdC8vIGFuZCBtYWtlIHRoZSBuZXcgZ3JvdXAgdGhlIG5ldyBwYXJlbnRcblx0XHRcdFx0dGhpcy53cmFwVmFsdWVXaXRoR3JvdXAoICRjaGlsZCwgcGxhY2Vob2xkZXIgKTtcblx0XHRcdFx0JHBhcmVudCA9ICRjaGlsZC5wYXJlbnQoKTtcblxuXHRcdFx0XHQvLyBEZXRlcm1pbmUgd2hldGhlciB0aGUgbmV3IHZhbHVlIGdvZXMgZmlyc3Qgb3Igc2Vjb25kIGluIHRoZSBuZXcgZ3JvdXBcblx0XHRcdFx0Ly8gdXNpbmcgbmV3IGRpbWVuc2lvbnMgYXMgYSByZXN1bHQgb2YgdGhlIG5ldyBncm91cFxuXHRcdFx0XHRkaW1lbnNpb25zID0gdGhpcy5kaW1lbnNpb25zRm9yVmFsdWUoICRjaGlsZCApO1xuXHRcdFx0XHRkcmFnUG9pbnQgPSAkcGFyZW50LmRhdGEoJ2ZsZXgtZGlyZWN0aW9uJykgPT0gJ2NvbHVtbicgPyBldmVudC5jbGllbnRZIDogZXZlbnQuY2xpZW50WDtcblx0XHRcdFx0aWYgKCB0aGlzLmlzUHJldmlvdXMoIGRpbWVuc2lvbnMsIGRyYWdQb2ludCkgKSB7XG5cdFx0XHRcdFx0JHByZXZpb3VzQ2hpbGQgPSAkY2hpbGQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gUHJlcGFyZSBkaW1lbnNpb25zIGZvciBkZXRlcm1pbmluZyB3aGljaCB2YWx1ZXMgZ29lcyBmaXJzdCBpbiB0aGUgZ3JvdXBcblx0XHRcdFx0ZGltZW5zaW9ucyA9IHRoaXMuZGltZW5zaW9uc0ZvclZhbHVlKCAkY2hpbGQgKTtcblx0XHRcdFx0ZHJhZ1BvaW50ID0gJHBhcmVudC5kYXRhKCdmbGV4LWRpcmVjdGlvbicpID09ICdjb2x1bW4nID8gZXZlbnQuY2xpZW50WSA6IGV2ZW50LmNsaWVudFg7XG5cdFx0XHRcdGlmICggdGhpcy5pc1ByZXZpb3VzKCBkaW1lbnNpb25zLCBkcmFnUG9pbnQpICkge1xuXHRcdFx0XHRcdCRwcmV2aW91c0NoaWxkID0gJGNoaWxkO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHR9LmJpbmQoIHRoaXMgKSk7XG5cblx0XHQvLyBBZGQgdGhlIG5ldyBpdGVtIHRvIHRoZSBuZXcgZ3JvdXBcblx0XHR0aGlzLmluc2VydERyb3BCZWZvcmVFbGVtZW50SW5QYXJlbnRXaXRoUGxhY2Vob2xkZXIoIHRoaXMuZHJhZ2dpbmdJdGVtLCAkcHJldmlvdXNDaGlsZCwgJHBhcmVudCwgcGxhY2Vob2xkZXIgKTtcblx0XHRcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVGVtcGxhdGVWaWV3OyIsInZhciBURU1QTEFURSA9IENvbHVtbnMuVGVtcGxhdGVzWyd0ZW1wbGF0ZXMvdGhhbmtzLmhicyddO1xuXG5mdW5jdGlvbiBUaGFua3NWaWV3KCkge1xuXG59XG5cblRoYW5rc1ZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKCkge1xuXG5cdHRoaXMuJHRoYW5rcyA9ICQoIFRFTVBMQVRFKCkgKTtcblx0cmV0dXJuIHRoaXMuJHRoYW5rcztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVGhhbmtzVmlldzsiLCJ2YXIgQ29sdW1uc0V2ZW50IFx0XHQ9IHJlcXVpcmUoJy4uL21vZGVscy9Db2x1bW5zRXZlbnQuanMnKTtcbnZhciBDb2x1bW5zQW5hbHl0aWNzIFx0PSByZXF1aXJlKCcuLi9tb2RlbHMvQ29sdW1uc0FuYWx5dGljcy5qcycpO1xuXG52YXIgTUFYX1JPV1MgPSAyMCxcblx0VVBMT0FEX0JVVFRPTl9TRUxFQ1RPUiA9ICcuY29sdW1ucy11cGxvYWQtYnV0dG9uJztcblxuZnVuY3Rpb24gVXBsb2FkVmlldygpIHtcblx0dGhpcy5wYXJzZWRSb3dzID0gMDtcbn1cblxuVXBsb2FkVmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oKSB7XG5cblx0dGhpcy4kdXBsb2FkID0gJCgnI3VwbG9hZCcpO1xuXG5cdHRoaXMuX3NldHVwRXZlbnRMaXN0ZW5lcnMoKTtcblx0cmV0dXJuIHRoaXMuJHVwbG9hZDtcbn07XG5cblVwbG9hZFZpZXcucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbigpIHtcblx0dGhpcy4kdXBsb2FkLnZlbG9jaXR5KHtcblx0XHRvcGFjaXR5OiAxXG5cdH0sIHtcblx0XHRkdXJhdGlvbjogMjAwLFxuXHRcdGVhc2luZzogJ2Vhc2Utb3V0Jyxcblx0XHRiZWdpbjogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLiR1cGxvYWQuYWRkQ2xhc3MoJ2FuaW1hdGluZycpO1xuXHRcdH0uYmluZCggdGhpcyApLFxuXHRcdGNvbXBsZXRlOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuJHVwbG9hZC5yZW1vdmVDbGFzcygnYW5pbWF0aW5nJyk7XG5cdFx0XHR0aGlzLiR1cGxvYWQuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdH0uYmluZCggdGhpcyApXG5cdH0pO1xufTtcblxuVXBsb2FkVmlldy5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLiR1cGxvYWQudmVsb2NpdHkoe1xuXHRcdG9wYWNpdHk6IDBcblx0fSwge1xuXHRcdGR1cmF0aW9uOiAyMDAsXG5cdFx0ZWFzaW5nOiAnZWFzZS1pbicsXG5cdFx0YmVnaW46IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy4kdXBsb2FkLmFkZENsYXNzKCdhbmltYXRpbmcnKTtcblx0XHR9LmJpbmQoIHRoaXMgKSxcblx0XHRjb21wbGV0ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLiR1cGxvYWQucmVtb3ZlQ2xhc3MoJ2FuaW1hdGluZycpO1xuXHRcdFx0dGhpcy4kdXBsb2FkLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHR9LmJpbmQoIHRoaXMgKVxuXHR9KTtcbn07XG5cblVwbG9hZFZpZXcucHJvdG90eXBlLl9zZXRMb2FkaW5nID0gZnVuY3Rpb24oIGxvYWRpbmcsIG1lc3NhZ2UgKSB7XG5cdHZhciAkYnV0dG9uID0gdGhpcy4kdXBsb2FkLmZpbmQoIFVQTE9BRF9CVVRUT05fU0VMRUNUT1IgKTtcblxuXHQvLyBTZXQgdGhlIG1lc3NhZ2Vcblx0aWYgKCBtZXNzYWdlICYmIHR5cGVvZiBtZXNzYWdlID09PSAnc3RyaW5nJyApIHtcblx0XHQkYnV0dG9uLnRleHQoIG1lc3NhZ2UgKTtcblx0fSBlbHNlIHtcblx0XHQkYnV0dG9uLnRleHQoXCJVcGxvYWQgYSAuY3N2XCIpO1xuXHR9XG5cblx0Ly8gU2V0IHRoZSBsb2FkaW5nIHN0YXRlXG5cdGlmICggbG9hZGluZyApIHtcblx0XHR0aGlzLiR1cGxvYWQuYWRkQ2xhc3MoJ2xvYWRpbmcnKTtcblx0XHQkYnV0dG9uLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy4kdXBsb2FkLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XG5cdFx0JGJ1dHRvbi5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcblx0fVxufTtcblxuVXBsb2FkVmlldy5wcm90b3R5cGUuX3NldHVwRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBMaXN0ZW4gZm9yIGNsaWNrcyBvbiB0aGUgdXBsb2FkIGJ1dHRvblxuXHR0aGlzLiR1cGxvYWQuZmluZCggVVBMT0FEX0JVVFRPTl9TRUxFQ1RPUiApLm9uKCAnY2xpY2snLCB0aGlzLl9vblVwbG9hZENsaWNrLmJpbmQoIHRoaXMgKSApO1xuXG5cdC8vIExpc3RlbiBmb3IgZmlsZSBjaG9pY2VzIGZyb20gdGhlIGZpbGUgcGlja2VyXG5cdHRoaXMuJHVwbG9hZC5maW5kKCdpbnB1dFt0eXBlPVwiZmlsZVwiXScpLm9uKCAnY2hhbmdlJywgdGhpcy5fb25GaWxlQ2hvaWNlLmJpbmQoIHRoaXMgKSApO1xuXG5cdC8vIExpc3RlbiBmb3Igd2luZG93IHJlc2l6ZSBldmVudHNcblx0JCh3aW5kb3cpLm9uKCAncmVzaXplJywgdGhpcy5fb25XaW5kb3dSZXNpemUuYmluZCggdGhpcyApICk7XG5cblx0Ly8gTGlzdGVuIGZvciBzdWNjZXNzZnVsIHRhYmxlIHVwbG9hZHNcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5UYWJsZS5EaWRVcGxvYWRXaXRoU3VjY2VzcycsIHRoaXMuX29uVGFibGVVcGxvYWRTdWNjZXNzLmJpbmQoIHRoaXMgKSApO1xuXG5cdC8vIExpc3RlbiBmb3IgZmFpbGVkIHRhYmxlIHVwbG9hZHNcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5UYWJsZS5EaWRVcGxvYWRXaXRoRmFpbHVyZScsIHRoaXMuX29uVGFibGVVcGxvYWRGYWlsLmJpbmQoIHRoaXMgKSApO1xufTtcblxuVXBsb2FkVmlldy5wcm90b3R5cGUuX29uVXBsb2FkQ2xpY2sgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG5cblx0Ly8gVHJpZ2dlciBjbGljayBvbiBmaWxlIGlucHV0IGZpZWxkXG5cdHRoaXMuJHVwbG9hZC5maW5kKCdpbnB1dFt0eXBlPVwiZmlsZVwiXScpLnRyaWdnZXIoJ2NsaWNrJyk7XG5cblx0Ly8gVHJhY2sgdGhpcyBjbGlja1xuXHQvLyBnYSgnc2VuZCcsICdldmVudCcsICdidXR0b24nLCAnY2xpY2snLCAndXBsb2FkJyk7XG5cblx0Q29sdW1uc0FuYWx5dGljcy5zZW5kKHtcblx0XHRjYXRlZ29yeTogJ2J1dHRvbicsXG5cdFx0YWN0aW9uOiAnY2xpY2snLFxuXHRcdGxhYmVsOiAndXBsb2FkJ1xuXHR9KTtcbn07XG5cblVwbG9hZFZpZXcucHJvdG90eXBlLl9vbkZpbGVDaG9pY2UgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdHZhciBmaWxlID0gZXZlbnQudGFyZ2V0LmZpbGVzWyAwIF07XG5cdHRoaXMuX3BhcnNlRmlsZSggZmlsZSApO1xuXG5cdGlmICggZmlsZS5uYW1lICkge1xuXHRcdHRoaXMuX3NldExvYWRpbmcoIHRydWUsICdVcGxvYWRpbmcgJyArIGZpbGUubmFtZSArICcuLi4nICk7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5fc2V0TG9hZGluZyggdHJ1ZSwgJ1VwbG9hZGluZyBmaWxlLi4uJyApO1xuXHR9XG5cblx0Ly8gQW5ub3VuY2UgZmlsZSB1cGxvYWQgZXZlbnRcblx0Ly8gQWxlcnQgYW55IGxpc3RlbmVycyB0aGF0IHRoZSBncm91cCBoYXMgY2hhbmdlZFxuXHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCAnQ29sdW1ucy5VcGxvYWRWaWV3LkRpZENob29zZUZpbGUnLCB7XG5cdFx0Ly8gdXBsb2FkVmlldzogXHR0aGlzLFxuXHRcdC8vIGZpbGU6IFx0XHRcdGZpbGVcblx0Ly8gfSk7XG5cdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0Ly8gY29sdW1uc0V2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5VcGxvYWRWaWV3LkRpZENob29zZUZpbGUnLCBmYWxzZSwgZmFsc2UsIHtcblx0Ly8gXHR1cGxvYWRWaWV3OiBcdHRoaXMsXG5cdC8vIFx0ZmlsZTogXHRcdFx0ZmlsZVxuXHQvLyB9KTtcblx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjb2x1bW5zRXZlbnQpO1xuXHRDb2x1bW5zRXZlbnQuc2VuZCgnQ29sdW1ucy5VcGxvYWRWaWV3LkRpZENob29zZUZpbGUnLCB7XG5cdFx0dXBsb2FkVmlldzogXHR0aGlzLFxuXHRcdGZpbGU6IFx0XHRcdGZpbGVcblx0fSk7XG5cblx0Q29sdW1uc0FuYWx5dGljcy5zZW5kKHtcblx0XHRjYXRlZ29yeTogJ2ZpbGUnLFxuXHRcdGFjdGlvbjogJ2Nob3Nlbidcblx0fSk7XG59O1xuXG5VcGxvYWRWaWV3LnByb3RvdHlwZS5fb25XaW5kb3dSZXNpemUgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG5cbn07XG5cblVwbG9hZFZpZXcucHJvdG90eXBlLl9vblRhYmxlVXBsb2FkU3VjY2VzcyA9IGZ1bmN0aW9uKCBldmVudCApIHtcblxuXHR0aGlzLl9zZXRMb2FkaW5nKCBmYWxzZSApO1xuXHR0aGlzLmhpZGUoKTtcbn07XG5cblVwbG9hZFZpZXcucHJvdG90eXBlLl9vblRhYmxlVXBsb2FkRmFpbCA9IGZ1bmN0aW9uKCBldmVudCApIHtcblxuXHR0aGlzLl9zZXRMb2FkaW5nKCBmYWxzZSwgXCJTaG9vdCwgc29tZXRoaW5nIHdlbnQgd3JvbmcuIE1pbmQgdHJ5aW5nIGEgZGlmZmVyZW50IC5jc3Y/XCIpXG59O1xuXG5VcGxvYWRWaWV3LnByb3RvdHlwZS5fcGFyc2VGaWxlID0gZnVuY3Rpb24oIGZpbGUgKSB7XG5cdFBhcGEucGFyc2UoIGZpbGUsIHtcblx0XHRzdGVwOiBmdW5jdGlvbiggcm93LCBoYW5kbGUgKSB7XG5cdFx0XHR0aGlzLl9wYXJzZVJvdyggcm93LCBoYW5kbGUsIGZpbGUubmFtZSApO1xuXHRcdH0uYmluZCggdGhpcyApLFxuXHRcdGNvbXBsZXRlOiBmdW5jdGlvbiggcmVzdWx0cyApIHtcblx0XHRcdHRoaXMuX29uUGFyc2VDb21wbGV0ZSggcmVzdWx0cywgZmlsZSApO1xuXHRcdH0uYmluZCggdGhpcyApXG5cdH0pO1xufTtcblxuVXBsb2FkVmlldy5wcm90b3R5cGUuX3BhcnNlUm93ID0gZnVuY3Rpb24oIHJvdywgaGFuZGxlLCBmaWxlTmFtZSApIHtcblxuXHQvLyBJZiB0aGlzIGlzIHRoZSBmaXJzdCByb3csIHRyZWF0IGl0IGFzIGEgaGVhZGVyXG5cdC8vIGFuZCBjcmVhdGUgY29sdW1uIGl0ZW1zIGZyb20gaXRzIGNvbnRlbnRzXG5cdC8vXG5cdC8vIElmIGl0J3Mgbm90IHRoZSBmaXJzdCByb3csIHRyZWF0IGl0IGFzIGRhdGFcblx0Ly8gYW5kIGFkZCBpdCB0byBvdXIgZGF0YSBzZXRcblx0Ly8gXG5cdC8vIElmIGl0J3MgYmV5b25kIHRoZSAyMHRoIHJvdywgc3RvcCB0aGUgcGFyc2luZ1xuXHRpZiAoIHRoaXMucGFyc2VkUm93cyA9PT0gMCApIHtcblx0XHR0aGlzLl9jcmVhdGVDb2x1bW5JdGVtcyggcm93LmRhdGFbIDAgXSwgZmlsZU5hbWUgKTtcblx0fSBlbHNlIGlmICggdGhpcy5wYXJzZWRSb3dzIDw9IE1BWF9ST1dTICkge1xuXHRcdHRoaXMuX2NyZWF0ZVJvdyggcm93LmRhdGFbIDAgXSwgZmlsZU5hbWUgKTtcblx0fSBlbHNlIHtcblx0XHRoYW5kbGUuYWJvcnQoKTtcblx0fVxuXG5cdC8vIFVwZGF0ZSB0aGUgcGFyc2VkIHJvd3MgY291bnRcblx0dGhpcy5wYXJzZWRSb3dzKys7XG59O1xuXG5VcGxvYWRWaWV3LnByb3RvdHlwZS5fY3JlYXRlQ29sdW1uSXRlbXMgPSBmdW5jdGlvbiggZGF0YSwgZmlsZU5hbWUgKSB7XG5cblx0Ly8gQW5ub3VuY2UgY29sdW1ucyBwYXJzaW5nXG5cdC8vIEFsZXJ0IGFueSBsaXN0ZW5lcnMgdGhhdCB0aGUgZ3JvdXAgaGFzIGNoYW5nZWRcblx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IG5ldyBDdXN0b21FdmVudCggJ0NvbHVtbnMuVXBsb2FkVmlldy5EaWRQYXJzZUNvbHVtbk5hbWVzRm9yRmlsZScsIHtcblx0XHQvLyB1cGxvYWRWaWV3OiBcdHRoaXMsXG5cdFx0Ly8gZmlsZU5hbWU6IFx0XHRmaWxlTmFtZSxcblx0XHQvLyBjb2x1bXM6IFx0XHRkYXRhXG5cdC8vIH0pO1xuXHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdC8vIGNvbHVtbnNFdmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuVXBsb2FkVmlldy5EaWRQYXJzZUNvbHVtbk5hbWVzRm9yRmlsZScsIGZhbHNlLCBmYWxzZSwge1xuXHQvLyBcdHVwbG9hZFZpZXc6IFx0dGhpcyxcblx0Ly8gXHRmaWxlTmFtZTogXHRcdGZpbGVOYW1lLFxuXHQvLyBcdGNvbHVtbnM6IFx0XHRkYXRhXG5cdC8vIH0pO1xuXHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGNvbHVtbnNFdmVudCk7XG5cdENvbHVtbnNFdmVudC5zZW5kKCdDb2x1bW5zLlVwbG9hZFZpZXcuRGlkUGFyc2VDb2x1bW5OYW1lc0ZvckZpbGUnLCB7XG5cdFx0dXBsb2FkVmlldzogXHR0aGlzLFxuXHRcdGZpbGVOYW1lOiBcdFx0ZmlsZU5hbWUsXG5cdFx0Y29sdW1uczogXHRcdGRhdGFcblx0fSk7XG59O1xuXG5VcGxvYWRWaWV3LnByb3RvdHlwZS5fY3JlYXRlUm93ID0gZnVuY3Rpb24oIHJvdywgZmlsZU5hbWUgKSB7XG5cblx0Ly8gQW5ub3VuY2Ugcm93IHBhcnNpbmdcblx0Ly8gQWxlcnQgYW55IGxpc3RlbmVycyB0aGF0IHRoZSBncm91cCBoYXMgY2hhbmdlZFxuXHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCAnQ29sdW1ucy5VcGxvYWRWaWV3LkRpZFBhcnNlRGF0YVJvd0ZvckZpbGUnLCB7XG5cdFx0Ly8gdXBsb2FkVmlldzogXHR0aGlzLFxuXHRcdC8vIGZpbGVOYW1lOiBcdFx0ZmlsZU5hbWUsXG5cdFx0Ly8gcm93OiBcdFx0XHRkYXRhXG5cdC8vIH0pO1xuXHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdC8vIGNvbHVtbnNFdmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuVXBsb2FkVmlldy5EaWRQYXJzZURhdGFSb3dGb3JGaWxlJywgZmFsc2UsIGZhbHNlLCB7XG5cdC8vIFx0dXBsb2FkVmlldzogXHR0aGlzLFxuXHQvLyBcdGZpbGVOYW1lOiBcdFx0ZmlsZU5hbWUsXG5cdC8vIFx0cm93OiBcdFx0XHRyb3dcblx0Ly8gfSk7XG5cdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY29sdW1uc0V2ZW50KTtcblx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuVXBsb2FkVmlldy5EaWRQYXJzZURhdGFSb3dGb3JGaWxlJywge1xuXHRcdHVwbG9hZFZpZXc6IFx0dGhpcyxcblx0XHRmaWxlTmFtZTogXHRcdGZpbGVOYW1lLFxuXHRcdHJvdzogXHRcdFx0cm93XG5cdH0pO1xufTtcblxuVXBsb2FkVmlldy5wcm90b3R5cGUuX29uUGFyc2VDb21wbGV0ZSA9IGZ1bmN0aW9uKCByZXN1bHRzLCBmaWxlICkge1xuXG5cdC8vIEFubm91bmNlIHBhcnNpbmcgY29tcGxldGVcblx0Ly8gQWxlcnQgYW55IGxpc3RlbmVycyB0aGF0IHRoZSBncm91cCBoYXMgY2hhbmdlZFxuXHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCAnQ29sdW1ucy5VcGxvYWRWaWV3LkRpZENvbXBsZXRlUGFyc2VGb3JGaWxlJywge1xuXHRcdC8vIHVwbG9hZFZpZXc6IFx0XHR0aGlzLFxuXHRcdC8vIGZpbGVOYW1lOiBcdFx0ZmlsZU5hbWVcblx0Ly8gfSk7XG5cdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0Ly8gY29sdW1uc0V2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5VcGxvYWRWaWV3LkRpZENvbXBsZXRlUGFyc2VGb3JGaWxlJywgZmFsc2UsIGZhbHNlLCB7XG5cdC8vIFx0dXBsb2FkVmlldzogXHR0aGlzLFxuXHQvLyBcdGZpbGU6IFx0XHRcdGZpbGVcblx0Ly8gfSk7XG5cdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY29sdW1uc0V2ZW50KTtcblx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuVXBsb2FkVmlldy5EaWRDb21wbGV0ZVBhcnNlRm9yRmlsZScsIHtcblx0XHR1cGxvYWRWaWV3OiBcdHRoaXMsXG5cdFx0ZmlsZTogXHRcdFx0ZmlsZVxuXHR9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVXBsb2FkVmlldztcbiIsInZhciBpc01vYmlsZVx0XHRcdD0gcmVxdWlyZSgnaXNtb2JpbGVqcycpO1xudmFyIERlc2t0b3AgXHRcdFx0PSByZXF1aXJlKCcuL2NvbnRyb2xsZXJzL0Rlc2t0b3BWaWV3LmpzJyk7XG52YXIgTW9iaWxlIFx0XHRcdFx0PSByZXF1aXJlKCcuL2NvbnRyb2xsZXJzL01vYmlsZVZpZXcuanMnKTtcblxudmFyIGFwcDtcblxuLy8gRmlyc3QsIGNoZWNrIHRvIHNlZSBpZiB3ZSdyZSBvbiBtb2JpbGUuXG4vLyBJZiB3ZSBhcmUsIGxvYWQgdGhlIG1vYmlsZSBzaXRlIGluc3RlYWRcbmlmICggaXNNb2JpbGUuYW55ICkge1xuXHRhcHAgPSBuZXcgTW9iaWxlKCk7XG59IGVsc2Uge1xuXHRhcHAgPSBuZXcgRGVza3RvcCgpO1xufVxuXG5hcHAucmVuZGVyKCk7XG5cbi8vIENyZWF0ZSB0aGUgVGFibGUgb2JqZWN0XG4vLyB2YXIgdGFibGUgPSBuZXcgVGFibGUoKTtcblxuLy8gLy8gU2V0IHVwIHRoZSBJdGVtcyBWaWV3XG4vLyB2YXIgaXRlbXMgPSBuZXcgSXRlbXNWaWV3KCk7XG5cbi8vIC8vIFNldCB1cCB0aGUgVGVtcGxhdGVcbi8vIHZhciB0ZW1wbGF0ZSA9IG5ldyBUZW1wbGF0ZVZpZXcoKTtcblxuLy8gLy8gU2V0IHVwIHRoZSBTdHlsZSBWaWV3XG4vLyB2YXIgc3R5bGUgPSBuZXcgU3R5bGVWaWV3KCk7XG5cbi8vIC8vIFNldCB1cCB0aGUgRW1iZWQgUGFuZWxcbi8vIHZhciBlbWJlZCA9IG5ldyBFbWJlZERldGFpbHNWaWV3KCk7XG5cbi8vIC8vIFNldCB1cCB0aGUgVXBsb2FkIFZpZXdcbi8vIHZhciB1cGxvYWQgPSBuZXcgVXBsb2FkVmlldygpO1xuLy8gdXBsb2FkLnJlbmRlcigpO1xuXG4vLyAvLyBTZXQgdXAgYW5hbHl0aWNzXG4vLyBpZiAoIENvbmZpZy5lbnYgPT09ICdwcm9kdWN0aW9uJyApIHtcbi8vIFx0JCgnaGVhZCcpLmFwcGVuZCggQ29sdW1ucy5UZW1wbGF0ZXNbJ3RlbXBsYXRlcy9hbmFseXRpY3MuaGJzJ10oKSApO1xuLy8gXHRDb2x1bW5zQW5hbHl0aWNzLnNlbmQoe1xuLy8gXHRcdGNhdGVnb3J5OiAnbmF2aWdhdGlvbicsXG4vLyBcdFx0YWN0aW9uOiAnYXJyaXZlZCcsXG4vLyBcdFx0bGFiZWw6ICdhcHAnXG4vLyBcdH0pO1xuXG4vLyBcdCQoJy5jb2x1bW5zLWhlYWRlci1uYXYtaG9tZScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuLy8gXHRcdENvbHVtbnNBbmFseXRpY3Muc2VuZCh7XG4vLyBcdFx0XHRjYXRlZ29yeTogJ2J1dHRvbicsXG4vLyBcdFx0XHRhY3Rpb246ICdjbGljaycsXG4vLyBcdFx0XHRsYWJlbDogJ2hvbWUnXG4vLyBcdFx0fSk7XG4vLyBcdH0pO1xuLy8gfVxuXG5cblxuIiwidmFyIENvbmZpZyA9IHJlcXVpcmUoJy4uL2NvbmZpZy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbHVtbnNBbmFseXRpY3M7XG5cbmZ1bmN0aW9uIENvbHVtbnNBbmFseXRpY3MoKSB7fVxuXG5Db2x1bW5zQW5hbHl0aWNzLnNlbmQgPSBmdW5jdGlvbiggcHJvcHMgKSB7XG5cdHZhciBwcm9wcyA9IHByb3BzIHx8IHt9LFxuXHRcdG1peHBhbmVsT2JqID0ge307XG5cblx0Ly8gTWFrZSBzdXJlIHRoZSBwcm9wZXJ0aWVzIGFyZSBzYW50aXplZFxuXHRwcm9wcy5hY3Rpb24gPSBwcm9wcy5hY3Rpb24gfHwgJyc7XG5cdHByb3BzLmNhdGVnb3J5ID0gcHJvcHMuY2F0ZWdvcnkgfHwgJyc7XG5cdHByb3BzLmxhYmVsID0gcHJvcHMubGFiZWwgfHwgJyc7XG5cdHByb3BzLmRlc2NyaXB0aW9uID0gcHJvcHMuZGVzY3JpcHRpb24gfHwgcHJvcHMuY2F0ZWdvcnkgKyAnICcgKyBwcm9wcy5hY3Rpb24gKyAnICcgKyBwcm9wcy5sYWJlbDtcblx0cHJvcHMuZGVzY3JpcHRpb24gPSBwcm9wcy5kZXNjcmlwdGlvbiA9PSAnICAnID8gJycgOiBwcm9wcy5kZXNjcmlwdGlvbjtcblx0aWYgKCBwcm9wcy50YWJsZV9pZCApIHtcblx0XHRtaXhwYW5lbE9ialsnVGFibGUgSUQnXSA9IHByb3BzLnRhYmxlX2lkO1xuXHR9XG5cblx0Ly8gU2VuZCBhIEdvb2dsZSBBbmFseXRpY3MgZXZlbnRcblx0aWYgKCB3aW5kb3cuZ2EgKSB7XG5cdFx0Z2EoICdzZW5kJywgJ2V2ZW50JywgcHJvcHMuY2F0ZWdvcnksIHByb3BzLmFjdGlvbiwgcHJvcHMubGFiZWwsIHByb3BzLnRhYmxlX2lkICk7XG5cdH1cblxuXHQvLyBTZW5kIGEgbWl4cGFuZWwgZXZlbnRcblx0aWYgKCB3aW5kb3cubWl4cGFuZWwgKSB7XG5cdFx0bWl4cGFuZWwudHJhY2soIHByb3BzLmRlc2NyaXB0aW9uLCBtaXhwYW5lbE9iaiApO1xuXHR9XG5cbn07IiwiZnVuY3Rpb24gQ29sdW1uc0V2ZW50ICgpIHtcblxufVxuXG5Db2x1bW5zRXZlbnQuc2VuZCA9IGZ1bmN0aW9uKCB0eXBlLCBkYXRhICkge1xuXHQkKGRvY3VtZW50KS50cmlnZ2VyKCB0eXBlLCBkYXRhICk7XG59O1xuXG5Db2x1bW5zRXZlbnQub24gPSBmdW5jdGlvbiggdHlwZSwgY2FsbGJhY2sgKSB7XG5cdCQoZG9jdW1lbnQpLm9uKCB0eXBlLCBjYWxsYmFjayApO1xufTtcblxuQ29sdW1uc0V2ZW50Lm9mZiA9IGZ1bmN0aW9uKCB0eXBlLCBjYWxsYmFjayApIHtcblx0JChkb2N1bWVudCkub2ZmKCB0eXBlLCBjYWxsYmFjayApO1xufTtcblxuQ29sdW1uc0V2ZW50Lm9mZkFsbCA9IGZ1bmN0aW9uKCkge1xuXHQkKGRvY3VtZW50KS5vZmYoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ29sdW1uc0V2ZW50OyIsInZhciBDb2x1bW5zRXZlbnQgPSByZXF1aXJlKCcuL0NvbHVtbnNFdmVudC5qcycpO1xudmFyIFN0eWxlIFx0XHQgPSByZXF1aXJlKCcuL1N0eWxlLmpzJyk7XG5cbi8vIEl0ZW0gT2JqZWN0XG4vLyAtLS0tLS0tLS0tLS0tXG4vLyBVc2UgdGhpcyBtb2RlbCB0byBzdG9yZSBhIGNvbHVtbiBJdGVtXG4vLyBhbmQgbWFuYWdlIGl0cyBzdHlsZSBpbmZvcm1hdGlvblxuXG5JdGVtID0gZnVuY3Rpb24oIHBhcmFtcyApIHtcblxuXHR0aGlzLmlkO1xuXHR0aGlzLnRpdGxlO1xuXHR0aGlzLnN0eWxlO1xuXHR0aGlzLmFjdGl2ZSA9IHRydWU7XG5cblx0aWYgKCBwYXJhbXMgKSB7XG5cdFx0Ly8gdGhpcy5pZCBcdD0gXG5cdFx0dGhpcy50aXRsZSBcdD0gcGFyYW1zLnRpdGxlIHx8ICcnO1xuXHRcdHRoaXMuc3R5bGUgXHQ9IG5ldyBTdHlsZSggcGFyYW1zLnN0eWxlICk7XG5cdFx0dGhpcy5hY3RpdmUgPSBwYXJhbXMuYWN0aXZlID09PSBmYWxzZSA/IGZhbHNlIDogdHJ1ZTtcblx0fVxuXG5cdHRoaXMuX3NldHVwRXZlbnRMaXN0ZW5lcnMoKTtcbn1cblxuSXRlbS5mb3JtYXR0ZWRUaXRsZSA9IGZ1bmN0aW9uKCB0aXRsZSApIHtcblx0Ly8gUmV0dXJuIGEgbG93ZXJjYXNlIHZlcnNpb24gb2YgdGhlIHRpdGxlXG5cdC8vIHdpdGggdW5kZXJzY29yZXMgaW5zdGVhZCBvZiBzcGFjZXNcblx0aWYgKCAhdGl0bGUgKSB7XG5cdFx0cmV0dXJuICdfJztcblx0fSBlbHNlIGlmICggdGl0bGUgPT09ICdfJyApIHtcblx0XHRyZXR1cm4gdGl0bGU7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIHRpdGxlLnRvTG93ZXJDYXNlKCkucmVwbGFjZSggL18vZywgJyAnICkucmVwbGFjZSgvXFxiLi9nLCBmdW5jdGlvbihtKXsgcmV0dXJuIG0udG9VcHBlckNhc2UoKTsgfSk7XG5cdH1cbn07XG5cbkl0ZW0udW5mb3JtYXR0ZWRUaXRsZSA9IGZ1bmN0aW9uKCB0aXRsZSApIHtcblx0aWYgKCF0aXRsZSkge1xuXHRcdHJldHVybiAnXyc7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIHRpdGxlLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvIC9nLCAnXycpO1xuXHR9XG59O1xuXG5JdGVtLnByb3RvdHlwZS5mb3JtYXR0ZWRUaXRsZSA9IGZ1bmN0aW9uKCkge1xuXHQvLyBSZXR1cm4gYSBsb3dlcmNhc2UgdmVyc2lvbiBvZiB0aGUgdGl0bGVcblx0Ly8gd2l0aCB1bmRlcnNjb3JlcyBpbnN0ZWFkIG9mIHNwYWNlc1xuXHQvLyBpZiAoICF0aGlzLnRpdGxlICkge1xuXHQvLyBcdHJldHVybiAnXyc7XG5cdC8vIH0gZWxzZSBpZiAoIHRoaXMudGl0bGUgPT09ICdfJyApIHtcblx0Ly8gXHRyZXR1cm4gdGhpcy50aXRsZTtcblx0Ly8gfSBlbHNlIHtcblx0Ly8gXHRyZXR1cm4gdGhpcy50aXRsZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoIC9fL2csICcgJyApLnJlcGxhY2UoL1xcYi4vZywgZnVuY3Rpb24obSl7IHJldHVybiBtLnRvVXBwZXJDYXNlKCk7IH0pO1xuXHQvLyB9XG5cdHJldHVybiBJdGVtLmZvcm1hdHRlZFRpdGxlKCB0aGlzLnRpdGxlICk7XG59O1xuXG5JdGVtLnByb3RvdHlwZS51bmZvcm1hdHRlZFRpdGxlID0gZnVuY3Rpb24oKSB7XG5cdC8vIFJldHVybiBhIGxvd2VyY2FzZSB2ZXJzaW9uIG9mIHRoZSB0aXRsZVxuXHQvLyB3aXRoIHVuZGVyc2NvcmVzIGluc3RlYWQgb2Ygc3BhY2VzXG5cdC8vIGlmICghdGhpcy50aXRsZSkge1xuXHQvLyBcdHJldHVybiAnXyc7XG5cdC8vIH0gZWxzZSB7XG5cdC8vIFx0cmV0dXJuIHRoaXMudGl0bGUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8gL2csICdfJyk7XG5cdC8vIH1cblx0cmV0dXJuIEl0ZW0udW5mb3JtYXR0ZWRUaXRsZSggdGhpcy50aXRsZSApO1xufTtcblxuLy8gUmV0dXJuIHRoZSBjb3JyZWN0IHN0eWxlIGF0dHJpYnV0ZSBmb3IgYSBnaXZlbiBwcm9wZXJ0eVxuLy8gQHBhcmFtIHsgc3RyaW5nIH0gcHJvcGVydHkgLS0gdGhlIHJlcXVlc3RlZCBsYXlvdXQgcHJvcGVydHlcbi8vIEByZXR1cm4geyBzdHJpbmcgfSB0aGUgY29ycmVzcG9uZGluZyB2YWx1ZVxuSXRlbS5wcm90b3R5cGUuZ2V0U3R5bGUgPSBmdW5jdGlvbiggcHJvcGVydHkgKSB7XG5cdHZhciB2YWx1ZTtcblxuXHQvLyBDaGVjayB3aGV0aGVyIHRoaXMgaXMgYSBrbm93biBzdHlsZVxuXHRpZiAoIHRoaXMuc3R5bGUgKSB7XG5cdFx0dmFsdWUgPSB0aGlzLnN0eWxlLmdldCggcHJvcGVydHkgKTtcblx0fVxuXG5cdHJldHVybiB2YWx1ZTtcblxuXHQvLyBJZiBub3QsIGNoZWNrIHRoZSBjc3MgZm9yIHRoZSBlbGVtZW50XG5cdC8vIGFuZCByZXR1cm4gaXRzIHZhbHVlXG5cdC8vIGlmICggdmFsdWUgKSB7XG5cdC8vIFx0cmV0dXJuIHZhbHVlO1xuXHQvLyB9IGVsc2Uge1xuXHQvLyBcdC8vIFRoaXMgaXMgYSBoYWNrISEhXG5cdC8vIFx0cmV0dXJuIHRoaXMuJGdyb3VwLmNzcyggcHJvcGVydHkgKTtcblx0Ly8gfVxufTtcblxuSXRlbS5wcm90b3R5cGUuaXMgPSBmdW5jdGlvbiggaXRlbSApIHtcblx0aWYgKCBpdGVtIGluc3RhbmNlb2YgSXRlbSApIHtcblx0XHRyZXR1cm4gdGhpcy50aXRsZSA9PT0gaXRlbS50aXRsZTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBcImV4Y2VwdGlvbjogQ29tcGFyaXNvbiBtdXN0IGJlIHdpdGggYW5vdGhlciBJdGVtXCI7XG5cdH1cbn1cblxuSXRlbS5wcm90b3R5cGUuX3NldEFjdGl2ZSA9IGZ1bmN0aW9uKCBhY3RpdmUgKSB7XG5cblx0aWYgKCB0aGlzLmFjdGl2ZSAhPT0gYWN0aXZlICkge1xuXHRcdHRoaXMuYWN0aXZlID0gYWN0aXZlO1xuXHRcdHRoaXMuX2VtaXRBY3RpdmVTdGF0ZUNoYW5nZSgpO1x0XHRcblx0fVxuXHRcbn07XG5cbkl0ZW0ucHJvdG90eXBlLl9zZXR1cEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gTGlzdGVuIGZvciBzdHlsZSBjaGFuZ2VzIG9uIHRoaXMgSXRlbVxuXHQvLyAkKGRvY3VtZW50KS5vbiggJ0NvbHVtbnMuU3R5bGVWaWV3LlByb3BlcnR5RGlkVXBkYXRlV2l0aFZhbHVlRm9ySXRlbScsIHRoaXMsIGZhbHNlICk7XG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuU3R5bGVWaWV3LlByb3BlcnR5RGlkVXBkYXRlV2l0aFZhbHVlRm9ySXRlbScsIHRoaXMuX29uSXRlbVN0eWxlRGlkQ2hhbmdlLmJpbmQoIHRoaXMgKSApO1xuXG5cdC8vIExpc3RlbiBmb3IgdGVtcGxhdGUgdXBkYXRlIGV2ZW50c1xuXHQvLyAkKGRvY3VtZW50KS5vbiggJ0NvbHVtbnMuVGVtcGxhdGVWaWV3LkRpZENoYW5nZScsIHRoaXMsIGZhbHNlICk7XG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuVGVtcGxhdGVWaWV3LkRpZENoYW5nZScsIHRoaXMuX29uVGVtcGxhdGVDaGFuZ2UuYmluZCggdGhpcyApICk7XG59O1xuXG5JdGVtLnByb3RvdHlwZS5fb25JdGVtU3R5bGVEaWRDaGFuZ2UgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdGlmICggdGhpcy5pcyggZGF0YS5pdGVtICkgKSB7XG5cdFx0dGhpcy5zdHlsZS51cGRhdGUoIFt7XG5cdFx0XHRwcm9wZXJ0eTogZGF0YS5wcm9wZXJ0eSxcblx0XHRcdHZhbHVlOiBkYXRhLnZhbHVlXG5cdFx0fV0gKTtcblx0XHR0aGlzLl9lbWl0Q2hhbmdlKCk7XG5cdH1cbn07XG5cbkl0ZW0ucHJvdG90eXBlLl9vblRlbXBsYXRlQ2hhbmdlID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuXG5cdC8vIENoZWNrIHdoZXRoZXIgdGhlIGl0ZW0gZXhpc3RzIGluIHRoZSB0ZW1wbGF0ZVxuXHRpZiAoIFRlbXBsYXRlVmlldy5nZXRWYWx1ZUZvckl0ZW0oIHRoaXMgKSApIHtcblx0XHR0aGlzLl9zZXRBY3RpdmUoIGZhbHNlICk7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5fc2V0QWN0aXZlKCB0cnVlICk7XG5cdH1cbn07XG5cbkl0ZW0ucHJvdG90eXBlLl9lbWl0Q2hhbmdlID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gQWxlcnQgYW55IGxpc3RlbmVycyB0aGF0IHRoZSBncm91cCBoYXMgY2hhbmdlZFxuXHQvLyB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoICdDb2x1bW5zLkl0ZW0uRGlkQ2hhbmdlJywge1xuXHQvLyBcdGdyb3VwVmlldzogXHR0aGlzXG5cdC8vIH0pO1xuXHQvLyB2YXIgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0Ly8gZXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLkl0ZW0uRGlkQ2hhbmdlJywgZmFsc2UsIGZhbHNlLCB7XG5cdC8vIFx0aXRlbTogXHR0aGlzXG5cdC8vIH0pO1xuXHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcblx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuSXRlbS5EaWRDaGFuZ2UnLCB7XG5cdFx0aXRlbTogXHR0aGlzXG5cdH0pO1xufTtcblxuSXRlbS5wcm90b3R5cGUuX2VtaXRBY3RpdmVTdGF0ZUNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXG5cdENvbHVtbnNFdmVudC5zZW5kKCdDb2x1bW5zLkl0ZW0uQWN0aXZlU3RhdGVEaWRDaGFuZ2UnLCB7XG5cdFx0aXRlbTogdGhpc1xuXHR9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSXRlbTsiLCIvLyBMYXlvdXQgT2JqZWN0IE1ldGhvZHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFRoaXMgaXMgdGhlIGxheW91dCBvYmplY3QgdGhhdCBjb250cm9sc1xuLy8gdGhlIHdheSB0aGUgdGFibGUgaXMgcmVuZGVyZWQgYW5kIHN0eWxlZC5cbi8vIFRoZSBtZXRob2RzIGJlbG93IGFsbG93IHVzIHRvOlxuLy8gMSkgVHJhdmVyc2UgdGhlIHRlbXBsYXRlIGFuZCBjb25zdHJ1Y3QgYSBuZXcgb2JqZWN0XG4vLyAyKSBVcGRhdGUgdGhlIG9iamVjdCB3aGVuIHN0eWxlcyBhcmUgYWRqdXN0ZWRcblxudmFyIENvbHVtbnNFdmVudCBcdD0gcmVxdWlyZSgnLi9Db2x1bW5zRXZlbnQuanMnKTtcbnZhciBERUZBVUxUU1x0XHQ9IHJlcXVpcmUoJy4uL3N0eWxpbmcvZGVmYXVsdHMuanMnKTtcblxuLy8gQ29sdW1ucy5MYXlvdXQgPSBuZXcgZnVuY3Rpb24oKSB7XG5mdW5jdGlvbiBMYXlvdXQoIGl0ZW1zICkge1xuXG5cdC8vIE1ha2Ugc3VyZSBhbGwgaXRlbXMgYXJlIG9mIHJpZ2h0IHR5cGVcblx0dGhpcy5pdGVtcyA9IFtdO1xuXHRpZiAoIGl0ZW1zICkge1xuXHRcdGl0ZW1zLmZvckVhY2goZnVuY3Rpb24oIGl0ZW0sIGkgKSB7XG5cdFx0XHRpZiAoIGl0ZW0gaW5zdGFuY2VvZiBJdGVtICkge1xuXHRcdFx0XHR0aGlzLml0ZW1zLnB1c2goIGl0ZW0gKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRocm93IFwiZXhjZXB0aW9uOiBhbGwgaXRlbXMgbXVzdCBvZiB0eXBlIEl0ZW1cIjtcblx0XHRcdH1cblx0XHR9LmJpbmQoIHRoaXMgKSk7XG5cdH1cblxuXHQvLyBCdWlsZCBhIGRlZmF1bHQgbGF5b3V0IHdpdGggdGhlIHBhc3NlZC1pbiBpdGVtc1xuXHR0aGlzLm1vZGVsID0gdGhpcy5kZWZhdWx0TGF5b3V0KCB0aGlzLml0ZW1zICk7XG5cblx0dGhpcy5fc2V0dXBFdmVudExpc3RlbmVycygpO1xufVxuXG5MYXlvdXQucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgJHRlbXBsYXRlID0gJCgnLmxheW91dC10ZW1wbGF0ZS1yb3ctZ3JvdXAnKS5maXJzdCgpO1xuXHR0aGlzLm1vZGVsID0gdGhpcy5fZ2VuZXJhdGVNb2RlbEZvclRlbXBsYXRlKCAkdGVtcGxhdGUgKTtcblx0dGhpcy5fZW1pdENoYW5nZSgpO1xufTtcblxuTGF5b3V0LnByb3RvdHlwZS5fZ2VuZXJhdGVNb2RlbEZvclRlbXBsYXRlID0gZnVuY3Rpb24oICR0ZW1wbGF0ZSApIHtcblx0dmFyIG1vZGVsID0ge30sXG5cdFx0c3ViTW9kZWwsXG5cdFx0aXRlbSxcblx0XHRncm91cDtcblxuXHQvLyBTa2lwIGluYWN0aXZlIGl0ZW1zXG5cdGlmICggJHRlbXBsYXRlLmhhc0NsYXNzKCdpbmFjdGl2ZScpICkge1xuXHRcdHJldHVybjtcblx0fVxuXHRcblx0Ly8gSXMgdGhlIHRlbXBsYXRlIGEgdmFsdWUgb3IgYSBncm91cD9cblx0aWYgKCAkdGVtcGxhdGUuaGFzQ2xhc3MoJ2xheW91dC10ZW1wbGF0ZS1yb3ctZ3JvdXAnKSApIHtcblx0XHRncm91cCA9IG5ldyBUZW1wbGF0ZUdyb3VwVmlldyh7IHN0eWxlOiAkdGVtcGxhdGUuYXR0cignc3R5bGUnKSB9KVxuXG5cdFx0Ly8gU2V0IHRoZSBtb2RlbCB0eXBlXG5cdFx0bW9kZWxbJ3R5cGUnXSA9ICdncm91cCc7XG5cblx0XHQvLyBTZXQgdGhlIG1vZGVsIHN0eWxlXG5cdFx0bW9kZWxbJ3N0eWxlJ10gPSBncm91cC5zdHlsZS5zdHlsZXM7XG5cblx0XHQvLyBTZXQgdGhlIG1vZGVsIGxheW91dFxuXHRcdG1vZGVsWydsYXlvdXQnXSA9IFRlbXBsYXRlR3JvdXBWaWV3LmxheW91dEZvckdyb3VwKCAkdGVtcGxhdGUgKTtcblxuXHRcdC8vIEdldCB0aGUgZ3JvdXAncyB2YWx1ZXNcblx0XHRtb2RlbFsndmFsdWVzJ10gPSBbXTtcblx0XHQkdGVtcGxhdGUuY2hpbGRyZW4oKS5lYWNoKGZ1bmN0aW9uKCBpLCBjaGlsZCApIHtcblx0XHRcdHN1Yk1vZGVsID0gdGhpcy5fZ2VuZXJhdGVNb2RlbEZvclRlbXBsYXRlKCAkKCBjaGlsZCApICk7XG5cdFx0XHRpZiAoIHN1Yk1vZGVsICkge1xuXHRcdFx0XHRtb2RlbC52YWx1ZXMucHVzaCggc3ViTW9kZWwgKTtcblx0XHRcdH1cblx0XHR9LmJpbmQoIHRoaXMgKSApO1xuXG5cdH0gZWxzZSBpZiAoICR0ZW1wbGF0ZS5oYXNDbGFzcygnbGF5b3V0LXRlbXBsYXRlLXJvdy12YWx1ZScpICkge1xuXHRcdC8vIGl0ZW0gPSBuZXcgSXRlbSh7XG5cdFx0Ly8gXHR0aXRsZTogJHRlbXBsYXRlLnRleHQoKS50cmltKCksXG5cdFx0Ly8gXHRzdHlsZTogJHRlbXBsYXRlLmF0dHIoJ3N0eWxlJylcblx0XHQvLyB9KTtcblxuXHRcdC8vIHN0eWxlID0gbmV3IFN0eWxlKCAkdGVtcGxhdGUuYXR0cignc3R5bGUnKSApLnN0eWxlcztcblxuXHRcdC8vIFNldCB0aGUgbW9kZWwgdHlwZVxuXHRcdG1vZGVsWyd0eXBlJ10gPSAnc2luZ2xlJztcblxuXHRcdC8vIFNldCB0aGUgbW9kZWwncyBzdHlsZVxuXHRcdG1vZGVsWydzdHlsZSddID0gbmV3IFN0eWxlKCAkdGVtcGxhdGUuYXR0cignc3R5bGUnKSApLnN0eWxlcztcblxuXHRcdC8vIFNldCB0aGUgdmFsdWUncyBkYXRhXG5cdFx0bW9kZWxbJ2RhdGEnXSA9IEl0ZW0udW5mb3JtYXR0ZWRUaXRsZSggJHRlbXBsYXRlLnRleHQoKS50cmltKCkgKTtcblx0fVxuXG5cdHJldHVybiBtb2RlbDtcbn07XG5cbkxheW91dC5wcm90b3R5cGUuX2VtaXRDaGFuZ2UgPSBmdW5jdGlvbigpIHtcblx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuTGF5b3V0LkRpZENoYW5nZScsIHtcblx0XHRsYXlvdXQ6IFx0dGhpc1xuXHR9KTtcbn07XG5cbkxheW91dC5wcm90b3R5cGUuX3NldHVwRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBMaXN0ZW4gdG8gdGVtcGxhdGUgY2hhbmdlIGV2ZW50c1xuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLlRlbXBsYXRlVmlldy5EaWRDaGFuZ2UnLCB0aGlzLl9vblRlbXBsYXRlVmlld0NoYW5nZS5iaW5kKCB0aGlzICkgKTtcbn07XG5cbkxheW91dC5wcm90b3R5cGUuX29uVGVtcGxhdGVWaWV3Q2hhbmdlID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuXHR0aGlzLnVwZGF0ZSgpO1xufTtcblxuLy8gRGVmYXVsdCBsYXlvdXRzIGZvciB2YXJpb3VzIGNvbHVtbiBudW1iZXJzXG5MYXlvdXQucHJvdG90eXBlLmRlZmF1bHRMYXlvdXQgPSBmdW5jdGlvbiggaXRlbXMgKSB7XG5cdFxuXHQvLyBTZXQgdXAgdGhlIGRlZmF1bHQgbGF5b3V0XG5cdHZhciBsYXlvdXQgPSB7XG5cdFx0dHlwZTogJ2dyb3VwJyxcblx0XHRzdHlsZTogW3tcblx0XHRcdHByb3BlcnR5OiAncGFkZGluZycsXG5cdFx0XHR2YWx1ZTogJzEycHgnXG5cdFx0fV0sXG5cdFx0dmFsdWVzOiBbXVxuXHR9O1xuXG5cdC8vIEFkZCB0byB0aGUgZGVmYXVsdCBsYXlvdXRcblx0Ly8gYWNjb3JkaW5nIHRvIHRoZSBudW1iZXIgb2YgaXRlbXNcblx0c3dpdGNoICggaXRlbXMubGVuZ3RoICkge1xuXHRcdGNhc2UgMDpcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMTpcblx0XHRcdGxheW91dFsndmFsdWVzJ10gPSBbe1xuXHRcdFx0XHR0eXBlOiAnc2luZ2xlJyxcblx0XHRcdFx0c3R5bGU6IERFRkFVTFRTLnN0eWxlc1sgMCBdLFxuXHRcdFx0XHRkYXRhOiBpdGVtc1sgMCBdLnVuZm9ybWF0dGVkVGl0bGUoKVxuXHRcdFx0fV07XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDI6XG5cdFx0XHRsYXlvdXRbJ3ZhbHVlcyddID0gW3tcblx0XHRcdFx0dHlwZTogJ2dyb3VwJyxcblx0XHRcdFx0bGF5b3V0OiBERUZBVUxUUy5sYXlvdXRzWyAwIF0sXG5cdFx0XHRcdHZhbHVlczogW3tcblx0XHRcdFx0XHR0eXBlOiAnc2luZ2xlJyxcblx0XHRcdFx0XHRzdHlsZTogREVGQVVMVFMuc3R5bGVzWyAwIF0sXG5cdFx0XHRcdFx0ZGF0YTogaXRlbXNbIDAgXS51bmZvcm1hdHRlZFRpdGxlKClcblx0XHRcdFx0fSx7XG5cdFx0XHRcdFx0dHlwZTogJ3NpbmdsZScsXG5cdFx0XHRcdFx0c3R5bGU6IERFRkFVTFRTLnN0eWxlc1sgMSBdLFxuXHRcdFx0XHRcdGRhdGE6IGl0ZW1zWyAxIF0udW5mb3JtYXR0ZWRUaXRsZSgpXG5cdFx0XHRcdH1dXG5cdFx0XHR9XTtcblx0XHRcdGJyZWFrO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHRsYXlvdXRbJ3ZhbHVlcyddID0gW3tcblx0XHRcdFx0dHlwZTogJ2dyb3VwJyxcblx0XHRcdFx0bGF5b3V0OiBERUZBVUxUUy5sYXlvdXRzWyAwIF0sXG5cdFx0XHRcdHZhbHVlczogW3tcblx0XHRcdFx0XHR0eXBlOiAnc2luZ2xlJyxcblx0XHRcdFx0XHRzdHlsZTogREVGQVVMVFMuc3R5bGVzWyAwIF0sXG5cdFx0XHRcdFx0ZGF0YTogaXRlbXNbIDAgXS51bmZvcm1hdHRlZFRpdGxlKClcblx0XHRcdFx0fSx7XG5cdFx0XHRcdFx0dHlwZTogJ3NpbmdsZScsXG5cdFx0XHRcdFx0c3R5bGU6IERFRkFVTFRTLnN0eWxlc1sgMSBdLFxuXHRcdFx0XHRcdGRhdGE6IGl0ZW1zWyAxIF0udW5mb3JtYXR0ZWRUaXRsZSgpXG5cdFx0XHRcdH1dXG5cdFx0XHR9LCB7XG5cdFx0XHRcdHR5cGU6ICdzaW5nbGUnLFxuXHRcdFx0XHRzdHlsZTogREVGQVVMVFMuc3R5bGVzWyAyIF0sXG5cdFx0XHRcdGRhdGE6IGl0ZW1zWyAyIF0udW5mb3JtYXR0ZWRUaXRsZSgpXG5cdFx0XHR9XTtcblx0XHRcdGJyZWFrO1xuXHR9XG5cdHJldHVybiBsYXlvdXQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IExheW91dDsiLCJ2YXIgQ29sdW1uc0V2ZW50ID0gcmVxdWlyZSgnLi9Db2x1bW5zRXZlbnQuanMnKTtcblxuLy8gU3R5bGUgT2JqZWN0XG4vLyAtLS0tLS0tLS0tLS0tXG4vLyBVc2UgdGhpcyBtb2RlbCB0byBoYW5kbGUgc3R5bGluZyBpbmZvcm1hdGlvbi5cblxuU3R5bGUgPSBmdW5jdGlvbiggc3R5bGVzICkge1xuXG5cdC8vIEFjY2VwdCBlaXRoZXIgYW4gYXJyYXkgb2YgbXVsdGlwbGUgc3R5bGVzXG5cdC8vIG9yIGp1c3QgYSBzaW5nbGUgc3R5bGUgb2JqZWN0XG5cdGlmICggQXJyYXkuaXNBcnJheSggc3R5bGVzICkgKSB7XG5cdFx0dGhpcy5zdHlsZXMgPSBzdHlsZXM7XG5cdH0gZWxzZSBpZiAoIHR5cGVvZiBzdHlsZXMgPT09ICdvYmplY3QnICkge1xuXHRcdHRoaXMuc3R5bGVzID0gWyBzdHlsZXMgXTtcblx0fSBlbHNlIGlmICggdHlwZW9mIHN0eWxlcyA9PT0gJ3N0cmluZycpIHtcblx0XHR0aGlzLnN0eWxlcyA9IHRoaXMuX3BhcnNlQ1NTKCBzdHlsZXMgKTtcblx0fSBlbHNlIHtcblx0XHR0aGlzLnN0eWxlcyA9IFtdO1xuXHR9XG59O1xuXG5TdHlsZS5wYXJzZUNTUyA9IGZ1bmN0aW9uKCBjc3MgKSB7XG5cblx0Ly8gQWNjZXB0IGEgQ1NTIHN0cmluZ1xuXHQvLyBhbmQgY29udmVydCBpdCBpbnRvIGFuIGFycmF5IG9mIGNzcyBwcm9wZXJ0aWVzIGFuZCB2YWx1ZXNcblx0aWYgKCB0eXBlb2YgY3NzICE9PSAnc3RyaW5nJyApIHRocm93IFwiZXhjZXB0aW9uOiBDU1MgbXVzdCBiZSBpbiBzdHJpbmcgZm9ybWF0XCI7XG5cblx0dmFyIHN0eWxlT2JqID0gW107XG5cblx0Ly8gUmVtb3ZlIGFsbCBzcGFjZXNcblx0Y3NzID0gY3NzLnJlcGxhY2UoLyAvZywgJycpO1xuXHQvLyBSZW1vdmUgdGhlIGxhc3Qgc2VtaWNvbG9uXG5cdGNzcyA9IGNzcy5zbGljZSgwLCAtMSk7XG5cdC8vIFNwbGl0IHN0eWxlc1xuXHRzdHlsZXMgPSBjc3Muc3BsaXQoJzsnKTtcblx0Ly8gQ3JlYXQgb2JqZWN0IGZvciBlYWNoIHN0eWxlXG5cdHN0eWxlcy5mb3JFYWNoKGZ1bmN0aW9uKHN0eWxlLCBpKSB7XG5cdFx0c3R5bGUgPSBzdHlsZS5zcGxpdCgnOicpO1xuXHRcdHN0eWxlT2JqLnB1c2goe1xuXHRcdFx0cHJvcGVydHk6IHN0eWxlWzBdLFxuXHRcdFx0dmFsdWU6IHN0eWxlWzFdXG5cdFx0fSk7XG5cdH0pO1xuXHRyZXR1cm4gc3R5bGVPYmo7XG59O1xuXG5TdHlsZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oIHN0eWxlcyApIHtcblx0dmFyIG5ld1N0eWxlcyA9IFtdO1xuXG5cdC8vIEFjY2VwdCBhIHN0cmluZywgYXJyYXksIG9yIG9iamVjdCBvZiBzdHlsZXNcblx0Ly8gYW5kIGV4dGVuZCB0aGUgY3VycmVudCBzdHlsZXMgb2JqZWN0IHdpdGggaXRzIHZhbHVlc1xuXHRpZiAoIHR5cGVvZiBzdHlsZXMgPT09ICdzdHJpbmcnICkge1xuXHRcdG5ld1N0eWxlcyA9IHRoaXMuX3BhcnNlQ1NTKCBzdHlsZXMgKTtcblx0fSBlbHNlIGlmICggQXJyYXkuaXNBcnJheSAoIHN0eWxlcyApICkge1xuXHRcdG5ld1N0eWxlcyA9IHN0eWxlcztcblx0fSBlbHNlIGlmICggdHlwZW9mIHN0eWxlcyA9PT0gJ29iamVjdCcgKSB7XG5cdFx0bmV3U3R5bGVzLnB1c2goc3R5bGVzKTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBcImV4Y2VwdGlvbjogQ1NTIG11c3QgYmUgYSBzdHJpbmcsIGFycmF5IG9yIG9iamVjdFwiO1xuXHR9XG5cblx0Ly8gTm93IGNvbXBsZXRlIHRoZSBtZXJnZVxuXHR0aGlzLl9tZXJnZUNTUyggbmV3U3R5bGVzICk7XG59O1xuXG5TdHlsZS5wcm90b3R5cGUuY3NzID0gZnVuY3Rpb24oKSB7XG5cdHZhciBjc3MgPSAnJztcblx0dGhpcy5zdHlsZXMuZm9yRWFjaChmdW5jdGlvbiggc3R5bGUsIGkgKSB7XG5cdFx0Y3NzICs9IHN0eWxlLnByb3BlcnR5ICsgJzonICsgc3R5bGUudmFsdWUgKyAnOyc7XG5cdH0pO1xuXHRyZXR1cm4gY3NzO1xufTtcblxuLy8gUmV0dXJuIHRoZSBzdHlsZSB2YWx1ZSBmb3IgYSBnaXZlbiBwcm9wZXJ0eVxuLy8gQHBhcmFtIHsgc3RyaW5nIH0gcHJvcGVydHlcbi8vIEByZXR1cm4geyBzdHJpbmcgfSB2YWx1ZVxuU3R5bGUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKCBwcm9wZXJ0eSApIHtcblx0dmFyIHZhbHVlO1xuXG5cdC8vIExvb3AgdGhyb3VnaCBlYWNoIHByb3BlcnR5IHVudGlsIHdlIGZpbmQgYSBtYXRjaFxuXHR0aGlzLnN0eWxlcy5mb3JFYWNoKGZ1bmN0aW9uKCBzdHlsZSwgaSApIHtcblx0XHRpZiAoIHN0eWxlLnByb3BlcnR5ID09PSBwcm9wZXJ0eSApIHtcblx0XHRcdHZhbHVlID0gc3R5bGUudmFsdWVcblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiB2YWx1ZTtcbn07XG5cblN0eWxlLnByb3RvdHlwZS5fcGFyc2VDU1MgPSBmdW5jdGlvbiggY3NzICkge1xuXG5cdHJldHVybiBTdHlsZS5wYXJzZUNTUyggY3NzICk7XHRcbn07XG5cblN0eWxlLnByb3RvdHlwZS5fbWVyZ2VDU1MgPSBmdW5jdGlvbiggY3NzICkge1xuXHQvLyBBY2NlcHQgYW4gYXJyYXkgb2YgY3NzIHN0eWxlIG9iamVjdHNcblx0aWYgKCAhQXJyYXkuaXNBcnJheSggY3NzICkgKSB0aHJvdyBcImV4Y2VwdGlvbjogQ1NTIG11c3QgYmUgYW4gYXJyYXlcIjtcblxuXHR2YXIgbmV3U3R5bGVzID0gY3NzLm1hcChmdW5jdGlvbiggc3R5bGUgKSB7IHJldHVybiBzdHlsZTsgfSksXG5cdFx0b2xkSW5kZXgsXG5cdFx0b2xkSW5kaWNlcyA9IHRoaXMuc3R5bGVzLmxlbmd0aDtcblxuXHQvLyBMb29wIHRocm91Z2ggdGhlIG9sZCBwcm9wZXJ0aWVzXG5cdC8vIGNvbXBhcmluZyBlYWNoIHdpdGggYWxsIHRoZSBuZXcgcHJvcGVydGllcy5cblx0Ly8gUmVwbGFjZSBhbiBleGlzdGluZyBwcm9wZXJ0eSBhbnl0aW1lIGEgbmV3IG9uZSBtYXRjaGVzIGl0XG5cdC8vIGFuZCB0aGVuIHJlbW92ZSB0aGF0IG5ldyBwcm9wZXJ0eSBmcm9tIHRoZSBhcnJheS5cblx0Ly8gQXQgdGhlIGVuZCwgYXBwZW5kIGFueSByZW1haW5pbmcgbmV3IHByb3BlcnRpZXMgdG8gdGhlIG1lcmdlZCBzdHlsZXMgYXJyYXkuXG5cdGNzcy5mb3JFYWNoKGZ1bmN0aW9uKCBuZXdTdHlsZSwgbmV3SW5kZXggKSB7XG5cdFx0Zm9yICggb2xkSW5kZXggPSAwIDsgb2xkSW5kZXggPCBvbGRJbmRpY2VzIDsgb2xkSW5kZXgrKyApIHtcblx0XHRcdGlmICggdGhpcy5zdHlsZXNbIG9sZEluZGV4IF0ucHJvcGVydHkgPT0gbmV3U3R5bGUucHJvcGVydHkgKSB7XG5cdFx0XHRcdHRoaXMuc3R5bGVzWyBvbGRJbmRleCBdID0gbmV3U3R5bGU7XG5cdFx0XHRcdG5ld1N0eWxlcy5zcGxpY2UoIG5ld1N0eWxlcy5pbmRleE9mKCBuZXdTdHlsZSApLCAxICk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHR9LmJpbmQoIHRoaXMgKSk7XG5cblx0Ly8gQWRkIGFsbCByZW1haW5pbmcgbmV3IHN0eWxlcyB0byB0aGUgc3R5bGVzIGFycmF5XG5cdHRoaXMuc3R5bGVzID0gdGhpcy5zdHlsZXMuY29uY2F0KCBuZXdTdHlsZXMgKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU3R5bGU7IiwidmFyIENvbHVtbnNFdmVudCBcdD0gcmVxdWlyZSgnLi9Db2x1bW5zRXZlbnQuanMnKTtcbnZhciBMYXlvdXQgXHRcdFx0PSByZXF1aXJlKCcuL0xheW91dC5qcycpO1xudmFyIEl0ZW0gXHRcdFx0PSByZXF1aXJlKCcuL0l0ZW0uanMnKTtcbnZhciBjb25maWcgXHRcdFx0PSByZXF1aXJlKCcuLi9jb25maWcuanMnKTtcbnZhciBERUZBVUxUU1x0XHQ9IHJlcXVpcmUoJy4uL3N0eWxpbmcvZGVmYXVsdHMuanMnKTtcblxuZnVuY3Rpb24gVGFibGUoIHByb3BzICkgIHtcblxuXHR0aGlzLmRhdGEgPSBbXTtcblx0dGhpcy50aXRsZSA9ICcnO1xuXHR0aGlzLnNvdXJjZSA9ICcnO1xuXHR0aGlzLnNvdXJjZV91cmwgPSAnJztcblx0dGhpcy5jb2x1bW5zID0gW107XG5cdHRoaXMubGF5b3V0O1xuXHR0aGlzLmlkO1xuXG5cdHRoaXMuX3VwZGF0ZSggcHJvcHMgKTtcblx0dGhpcy5fc2V0dXBFdmVudExpc3RlbmVycygpO1xufVxuXG5UYWJsZS5wcm90b3R5cGUuX3VwZGF0ZSA9IGZ1bmN0aW9uKCBwcm9wcyApIHtcblxuXHRpZiAoIHByb3BzICkge1xuXHRcdHRoaXMuZGF0YSA9IHByb3BzLmRhdGEgfHwgdGhpcy5kYXRhO1xuXHRcdHRoaXMudGl0bGUgPSBwcm9wcy50aXRsZSB8fCB0aGlzLnRpdGxlO1xuXHRcdHRoaXMuc291cmNlID0gcHJvcHMuc291cmNlIHx8IHRoaXMuc291cmNlO1xuXHRcdHRoaXMuc291cmNlX3VybCA9IHByb3BzLnNvdXJjZV91cmwgfHwgdGhpcy5zb3VyY2VfdXJsO1xuXHRcdHRoaXMuaWQgPSBwcm9wcy5pZCB8fCB0aGlzLmlkO1xuXG5cdFx0aWYgKCBwcm9wcy5jb2x1bW5zICkge1x0XG5cdFx0XHR0aGlzLmNvbHVtbnMgPSB0aGlzLml0ZW1zRnJvbUNvbHVtbk5hbWVzKCBwcm9wcy5jb2x1bW5zICk7XG5cdFx0fVxuXG5cdFx0aWYgKCBwcm9wcy5sYXlvdXQgKSB7XG5cdFx0XHR0aGlzLmxheW91dCA9IHByb3BzLmxheW91dDtcblx0XHR9IGVsc2UgaWYgKCAhdGhpcy5sYXlvdXQgKSB7XG5cdFx0XHR0aGlzLmxheW91dCA9IG5ldyBMYXlvdXQoIHRoaXMuY29sdW1ucyApO1xuXHRcdH1cblxuXHRcdC8vIExldCBldmVyeW9uZSBrbm93IHRoYXQgd2UndmUgdXBkYXRlZCB0aGUgdGFibGVcblx0XHR0aGlzLl9lbWl0Q2hhbmdlKCk7XG5cdH1cbn07XG5cblRhYmxlLnByb3RvdHlwZS5fZW1pdENoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXHQvLyBMZXQgZXZlcnlvbmUga25vdyB0aGF0IHRoZSB0YWJsZSBoYXMgYmVlbiB1cGxvYWRlZCBzdWNjZXNzZnVsbHlcblx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHQvLyBjb2x1bW5zRXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLlRhYmxlLkRpZENoYW5nZScsIGZhbHNlLCBmYWxzZSwge1xuXHQvLyBcdHRhYmxlOiBcdHRoaXNcblx0Ly8gfSk7XG5cdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY29sdW1uc0V2ZW50KTtcblx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuVGFibGUuRGlkQ2hhbmdlJywge1xuXHRcdHRhYmxlOiBcdHRoaXNcblx0fSk7XG59O1xuXG5UYWJsZS5wcm90b3R5cGUuX2VtaXRVcGxvYWRTdWNjZXNzID0gZnVuY3Rpb24oKSB7XG5cdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0Ly8gY29sdW1uc0V2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5UYWJsZS5EaWRVcGxvYWRXaXRoU3VjY2VzcycsIGZhbHNlLCBmYWxzZSwge1xuXHQvLyBcdHRhYmxlOiBcdHRoaXNcblx0Ly8gfSk7XG5cdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY29sdW1uc0V2ZW50KTtcblx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuVGFibGUuRGlkVXBsb2FkV2l0aFN1Y2Nlc3MnLCB7XG5cdFx0dGFibGU6IFx0dGhpc1xuXHR9KTtcbn07XG5cblRhYmxlLnByb3RvdHlwZS5fZW1pdFVwbG9hZEZhaWwgPSBmdW5jdGlvbigpIHtcblx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHQvLyBjb2x1bW5zRXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLlRhYmxlLkRpZFVwbG9hZFdpdGhGYWlsdXJlJywgZmFsc2UsIGZhbHNlLCB7XG5cdC8vIFx0dGFibGU6IFx0dGhpc1xuXHQvLyB9KTtcblx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjb2x1bW5zRXZlbnQpO1xuXHRDb2x1bW5zRXZlbnQuc2VuZCgnQ29sdW1ucy5UYWJsZS5EaWRVcGxvYWRXaXRoRmFpbHVyZScsIHtcblx0XHR0YWJsZTogXHR0aGlzXG5cdH0pO1xufTtcblxuVGFibGUucHJvdG90eXBlLl9lbWl0VXBkYXRlU3VjY2VzcyA9IGZ1bmN0aW9uKCkge1xuXHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdC8vIGNvbHVtbnNFdmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuVGFibGUuRGlkVXBkYXRlV2l0aFN1Y2Nlc3MnLCBmYWxzZSwgZmFsc2UsIHtcblx0Ly8gXHR0YWJsZTogXHR0aGlzXG5cdC8vIH0pO1xuXHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGNvbHVtbnNFdmVudCk7XG5cdENvbHVtbnNFdmVudC5zZW5kKCdDb2x1bW5zLlRhYmxlLkRpZFVwZGF0ZVdpdGhTdWNjZXNzJywge1xuXHRcdHRhYmxlOiBcdHRoaXNcblx0fSk7XG59O1xuXG5UYWJsZS5wcm90b3R5cGUuX2VtaXRVcGRhdGVGYWlsID0gZnVuY3Rpb24oKSB7XG5cdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0Ly8gY29sdW1uc0V2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5UYWJsZS5EaWRVcGRhdGVXaXRoRmFpbHVyZScsIGZhbHNlLCBmYWxzZSwge1xuXHQvLyBcdHRhYmxlOiBcdHRoaXNcblx0Ly8gfSk7XG5cdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY29sdW1uc0V2ZW50KTtcblx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuVGFibGUuRGlkVXBkYXRlV2l0aEZhaWx1cmUnLCB7XG5cdFx0dGFibGU6IFx0dGhpc1xuXHR9KTtcbn07XG5cbi8vIFJldHVybiBhbiBpdGVtIGdpdmVuIGEgZGF0YSBjb2x1bW4gbmFtZVxuLy8gQHBhcmFtIHtzdHJpbmd9IGRhdGEgLS0gdGhlIHVuZm9ybWF0dGVkIGNvbHVtbiB0aXRsZSB0byBzZWFyY2ggYWdhaW5zdCAoJ2ZpcnN0X25hbWUnKVxuLy8gQHJldHVybiB7SXRlbX0gLS0gdGhlIG1hdGNoaW5nIGl0ZW1cblRhYmxlLnByb3RvdHlwZS5nZXRJdGVtRm9yRGF0YSA9IGZ1bmN0aW9uKCBkYXRhICkge1xuXHR2YXIgaXRlbTtcblxuXHRpZiAoIGRhdGEgJiYgdGhpcy5jb2x1bW5zICYmIHRoaXMuY29sdW1ucy5sZW5ndGggKSB7XG5cdFx0aXRlbSA9IHRoaXMuY29sdW1ucy5maWx0ZXIoZnVuY3Rpb24oIGNvbHVtbiApIHtcblx0XHRcdHJldHVybiBkYXRhID09PSBjb2x1bW4udW5mb3JtYXR0ZWRUaXRsZSgpO1xuXHRcdH0uYmluZCggdGhpcyApKVsgMCBdO1xuXHR9XG5cblx0cmV0dXJuIGl0ZW07XG59O1xuXG5UYWJsZS5wcm90b3R5cGUuaXRlbXNGcm9tQ29sdW1uTmFtZXMgPSBmdW5jdGlvbiggY29sdW1uTmFtZXMgKSB7XG5cblx0aWYgKCB0eXBlb2YgY29sdW1uTmFtZXMgPT09ICdzdHJpbmcnICkge1xuXHRcdGNvbHVtbk5hbWVzID0gWyBjb2x1bW5OYW1lcyBdO1xuXHR9XG5cblx0aWYoIGNvbHVtbk5hbWVzIGluc3RhbmNlb2YgSXRlbSApIHtcblx0XHRjb2x1bW5OYW1lcyA9IFsgY29sdW1uTmFtZXMgXTtcblx0fVxuXG5cdGlmKCAhQXJyYXkuaXNBcnJheSggY29sdW1uTmFtZXMgKSApIHtcblx0XHR0aHJvdyBcImV4Y2VwdGlvbjogQ29sdW1uIG5hbWVzIG11c3QgYmUgYSBzdHJpbmcgb3IgYW4gYXJyYXkgb2Ygc3RyaW5nc1wiO1xuXHR9XG5cblx0cmV0dXJuIGNvbHVtbk5hbWVzLm1hcChmdW5jdGlvbiggY29sdW1uTmFtZSwgaSApIHtcblx0XHQvLyB2YXIgaXRlbTtcblxuXHRcdC8vIGlmICggY29sdW1uTmFtZSBpbnN0YW5jZW9mIEl0ZW0gKSB7XG5cdFx0Ly8gXHRyZXR1cm4gY29sdW1uTmFtZTtcblx0XHQvLyB9IGVsc2Uge1xuXHRcdC8vIFx0aXRlbSA9IG5ldyBJdGVtKHtcblx0XHQvLyBcdFx0dGl0bGU6IGNvbHVtbk5hbWUsXG5cdFx0Ly8gXHRcdHN0eWxlOiBERUZBVUxUUy5zdHlsZXNbIGkgXTtcblx0XHQvLyBcdH0pXG5cdFx0Ly8gfVxuXHRcdHJldHVybiBjb2x1bW5OYW1lIGluc3RhbmNlb2YgSXRlbSA/IGNvbHVtbk5hbWUgOiBuZXcgSXRlbSh7IHRpdGxlOiBjb2x1bW5OYW1lLCBzdHlsZTogREVGQVVMVFMuc3R5bGVzWyBpIF0gfSk7XG5cdH0pO1xufVxuXG5UYWJsZS5wcm90b3R5cGUuX3VwbG9hZEZpbGUgPSBmdW5jdGlvbiggZmlsZSApIHtcblx0dmFyIGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG5cblx0Ly8gQWRkIGFueSB0YWJsZSBtZXRhLWRhdGEgdG8gdGhlIGZvcm1cblx0Zm9ybURhdGEuYXBwZW5kKCBcImRhdGFcIiwgZmlsZSApO1xuXHRmb3JtRGF0YS5hcHBlbmQoIFwidGl0bGVcIiwgdGhpcy50aXRsZSApO1xuXHRmb3JtRGF0YS5hcHBlbmQoIFwic291cmNlXCIsIHRoaXMuc291cmNlICk7XG5cdGZvcm1EYXRhLmFwcGVuZCggXCJzb3VyY2VfdXJsXCIsIHRoaXMuc291cmNlX3VybCApO1xuXHRmb3JtRGF0YS5hcHBlbmQoIFwiY29sdW1uc1wiLCB0aGlzLnN0cmluZ0Zyb21Db2x1bW5zKCB0aGlzLmNvbHVtbnMgKSApO1xuXHQvLyBmb3JtRGF0YS5hcHBlbmQoIFwibGF5b3V0XCIsIEpTT04uc3RyaW5naWZ5KCB0aGlzLmxheW91dC5tb2RlbCApICk7XG5cblx0Ly8gdGhpcy5fb25VcGxvYWRTdWNjZXNzKCB7XG5cdC8vIFx0c3RhdHVzOiAnc3VjY2VzcycsXG5cdC8vIFx0ZGF0YToge1xuXHQvLyBcdFx0dGFibGVfaWQ6IDFcblx0Ly8gXHR9XG5cdC8vIH0pO1xuXG5cdCQuYWpheCh7XG4gICAgICAgIHVybDogY29uZmlnLmFwaS5ob3N0ICsgJy9jb2x1bW5zL3RhYmxlJywgIC8vU2VydmVyIHNjcmlwdCB0byBwcm9jZXNzIGRhdGFcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICBjb250ZW50VHlwZTogZmFsc2UsXG4gICAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcbiAgICAgICAgZGF0YTogZm9ybURhdGEsXG4gICAgICAgIHN1Y2Nlc3M6IHRoaXMuX29uVXBsb2FkU3VjY2Vzcy5iaW5kKCB0aGlzIClcbiAgICB9KTtcbn07XG5cblRhYmxlLnByb3RvdHlwZS5fdXBkYXRlVGFibGUgPSBmdW5jdGlvbigpIHtcblx0dmFyIGRhdGEgPSB7XG5cdFx0dGl0bGU6IHRoaXMudGl0bGUsXG5cdFx0c291cmNlOiB0aGlzLnNvdXJjZSxcblx0XHRzb3VyY2VfdXJsOiB0aGlzLnNvdXJjZV91cmwsXG5cdFx0bGF5b3V0OiBKU09OLnN0cmluZ2lmeSggdGhpcy5sYXlvdXQubW9kZWwgKSxcblx0XHRjb2x1bW5zOiB0aGlzLnN0cmluZ0Zyb21Db2x1bW5zKCB0aGlzLmNvbHVtbnMgKVxuXHR9O1xuXHQkLnBvc3QoY29uZmlnLmFwaS5ob3N0ICsgJy9jb2x1bW5zL3RhYmxlLycgKyB0aGlzLmlkLCBkYXRhLCB0aGlzLl9vblVwZGF0ZVN1Y2Nlc3MuYmluZCggdGhpcyApICk7XG59O1xuXG5UYWJsZS5wcm90b3R5cGUuX3NldHVwRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBMaXN0ZW4gZm9yIGNvbHVtbiBuYW1lcyBwYXJzaW5nXG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuVXBsb2FkVmlldy5EaWRQYXJzZUNvbHVtbk5hbWVzRm9yRmlsZScsIHRoaXMuX29uQ29sdW1uTmFtZXNQYXJzZWQuYmluZCggdGhpcyApKTtcblxuXHQvLyBMaXN0ZW4gZm9yIHJvdyBkYXRhIHBhcnNpbmdcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5VcGxvYWRWaWV3LkRpZFBhcnNlRGF0YVJvd0ZvckZpbGUnLCB0aGlzLl9vblJvd1BhcnNlZC5iaW5kKCB0aGlzICkgKTtcdFxuXG5cdC8vIExpc3RlbiBmb3IgcGFyc2luZyBjb21wbGV0aW9uXG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuVXBsb2FkVmlldy5EaWRDb21wbGV0ZVBhcnNlRm9yRmlsZScsIHRoaXMuX29uUGFyc2VDb21wbGV0ZS5iaW5kKCB0aGlzICkgKTtcblxuXHQvLyBMaXN0ZW4gZm9yIHVwZGF0ZXMgZnJvbSB0aGUgZGV0YWlscyBwYW5lbFxuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLkVtYmVkRGV0YWlsc1ZpZXcuRGlkVXBkYXRlUHJvcGVydHlXaXRoVmFsdWUnLCB0aGlzLl9vblRhYmxlVXBkYXRlLmJpbmQoIHRoaXMgKSApO1xuXG5cdC8vIExpc3RlbiBmb3IgbGF5b3V0IHVwZGF0ZXNcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5MYXlvdXQuRGlkQ2hhbmdlJywgdGhpcy5fb25MYXlvdXRVcGRhdGUuYmluZCggdGhpcyApICk7XG5cbn07XG5cblRhYmxlLnByb3RvdHlwZS5fb25Db2x1bW5OYW1lc1BhcnNlZCA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblxuXHR0aGlzLmNvbHVtbnMgPSB0aGlzLml0ZW1zRnJvbUNvbHVtbk5hbWVzKCBkYXRhLmNvbHVtbnMgKTtcbn07XG5cblRhYmxlLnByb3RvdHlwZS5fb25Sb3dQYXJzZWQgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdHZhciByb3cgPSBkYXRhLnJvdyxcblx0XHRkYXRhID0ge307XG5cblx0cm93LmZvckVhY2goZnVuY3Rpb24oIHZhbHVlLCBpICkge1xuXHRcdGRhdGFbIHRoaXMuY29sdW1uc1sgaSBdLnVuZm9ybWF0dGVkVGl0bGUoKSBdID0gdmFsdWU7XG5cdH0uYmluZCggdGhpcyApKTtcblxuXHR0aGlzLmRhdGEucHVzaCggZGF0YSApO1xufTtcblxuVGFibGUucHJvdG90eXBlLl9vblBhcnNlQ29tcGxldGUgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cblx0dGhpcy5fdXBsb2FkRmlsZSggZGF0YS5maWxlICk7XG59O1xuXG5UYWJsZS5wcm90b3R5cGUuX29uVXBsb2FkU3VjY2VzcyA9IGZ1bmN0aW9uKCBkYXRhLCBzdGF0dXMsIHJlcXVlc3QgKSB7XG5cblx0Ly8gQ2hlY2sgZm9yIGEgc2VydmVyLXNpZGUgZXJyb3Jcblx0aWYgKCBkYXRhLnN0YXR1cyAhPT0gJ3N1Y2Nlc3MnICkge1xuXHRcdHRoaXMuX29uVXBsb2FkRmFpbCggcmVxdWVzdCwgc3RhdHVzLCBkYXRhLm1lc3NhZ2UgKTtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvLyBTZXQgdGhlIFRhYmxlIElEXG5cdHRoaXMuX3VwZGF0ZSh7XG5cdFx0aWQ6IGRhdGEuZGF0YS50YWJsZV9pZFxuXHR9KTtcblxuXHR0aGlzLl9lbWl0VXBsb2FkU3VjY2VzcygpO1xufTtcblxuVGFibGUucHJvdG90eXBlLl9vblVwbG9hZEZhaWwgPSBmdW5jdGlvbiggcmVxdWVzdCwgc3RhdHVzLCBlcnJvciApIHtcblxuXHR0aGlzLl9lbWl0VXBsb2FkRmFpbCgpO1xufTtcblxuVGFibGUucHJvdG90eXBlLl9vblVwZGF0ZVN1Y2Nlc3MgPSBmdW5jdGlvbiggZGF0YSwgc3RhdHVzLCByZXF1ZXN0ICkge1xuXG5cdC8vIENoZWNrIGZvciBhIHNlcnZlci1zaWRlIGVycm9yXG5cdGlmICggZGF0YS5zdGF0dXMgIT09ICdzdWNjZXNzJyApIHtcblx0XHR0aGlzLl9lbWl0VXBkYXRlRmFpbCgpO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdHRoaXMuX2VtaXRVcGRhdGVTdWNjZXNzKCk7XG59O1xuXG5UYWJsZS5wcm90b3R5cGUuX29uVGFibGVVcGRhdGUgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdHZhciBwcm9wcyA9IHt9O1xuXG5cdHByb3BzWyBkYXRhLnByb3BlcnR5IF0gPSBkYXRhLnZhbHVlO1xuXG5cdHRoaXMuX3VwZGF0ZSggcHJvcHMgKTtcblx0dGhpcy5fdXBkYXRlVGFibGUoKTtcbn07XG5cblRhYmxlLnByb3RvdHlwZS5fb25MYXlvdXRVcGRhdGUgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdHRoaXMuX3VwZGF0ZSh7XG5cdFx0bGF5b3V0OiBkYXRhLmxheW91dFxuXHR9KTtcblx0dGhpcy5fdXBkYXRlVGFibGUoKTtcbn07XG5cblRhYmxlLnByb3RvdHlwZS5zdHJpbmdGcm9tQ29sdW1ucyA9IGZ1bmN0aW9uKCBjb2x1bW5zICkge1xuXG5cdHJldHVybiBjb2x1bW5zLm1hcChmdW5jdGlvbiggY29sdW1uLCBpICkge1xuXHRcdHJldHVybiBjb2x1bW4udGl0bGU7XG5cdH0pLmpvaW4oKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVGFibGU7IiwiLy8gV2UgbmVlZCB0byB0cmVhdCBsYXlvdXQgcHJvcGVydGllcyBzbGlnaHRseSBkaWZmZXJlbnRseSB0aGFuIHJlZ3VsYXIgY3NzIHByb3BlcnRpZXNcbi8vIHRvIGFjY291bnQgZm9yIGJyb3dzZXItc3BlY2lmaWMgcHJlZml4ZXNcbm1vZHVsZS5leHBvcnRzID0ge1xuXHRzdHlsZXM6IFtcblx0XHRbe1xuXHRcdFx0cHJvcGVydHk6ICdjb2xvcicsXG5cdFx0XHR2YWx1ZTogJyMzYTNhM2EnXG5cdFx0fV0sXG5cdFx0W3tcblx0XHRcdHByb3BlcnR5OiAnY29sb3InLFxuXHRcdFx0dmFsdWU6ICcjODg4J1xuXHRcdH0se1xuXHRcdFx0cHJvcGVydHk6ICdmb250LXNpemUnLFxuXHRcdFx0dmFsdWU6ICcxNHB4J1xuXHRcdH0sIHtcblx0XHRcdHByb3BlcnR5OiAnbWFyZ2luLXRvcCcsXG5cdFx0XHR2YWx1ZTogJzRweCdcblx0XHR9XSxcblx0XHRbe1xuXHRcdFx0cHJvcGVydHk6ICdjb2xvcicsXG5cdFx0XHR2YWx1ZTogJyMzYTNhM2EnXG5cdFx0fSx7XG5cdFx0XHRwcm9wZXJ0eTogJ2ZvbnQtc2l6ZScsXG5cdFx0XHR2YWx1ZTogJzI0cHgnXG5cdFx0fV1cdFxuXHRdLFxuXHRsYXlvdXRzOiBbXG5cdFx0W3tcblx0XHRcdHByb3BlcnR5OiAnZmxleC1kaXJlY3Rpb24nLFxuXHRcdFx0dmFsdWU6ICdjb2x1bW4nXG5cdFx0fSwge1xuXHRcdFx0cHJvcGVydHk6ICdhbGlnbi1pdGVtcycsXG5cdFx0XHR2YWx1ZTogJ2ZsZXgtc3RhcnQnXG5cdFx0fV1cblx0XVxufTsiLCIvKipcbiAqIGlzTW9iaWxlLmpzIHYwLjMuNVxuICpcbiAqIEEgc2ltcGxlIGxpYnJhcnkgdG8gZGV0ZWN0IEFwcGxlIHBob25lcyBhbmQgdGFibGV0cyxcbiAqIEFuZHJvaWQgcGhvbmVzIGFuZCB0YWJsZXRzLCBvdGhlciBtb2JpbGUgZGV2aWNlcyAobGlrZSBibGFja2JlcnJ5LCBtaW5pLW9wZXJhIGFuZCB3aW5kb3dzIHBob25lKSxcbiAqIGFuZCBhbnkga2luZCBvZiBzZXZlbiBpbmNoIGRldmljZSwgdmlhIHVzZXIgYWdlbnQgc25pZmZpbmcuXG4gKlxuICogQGF1dGhvcjogS2FpIE1hbGxlYSAoa21hbGxlYUBnbWFpbC5jb20pXG4gKlxuICogQGxpY2Vuc2U6IGh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL3B1YmxpY2RvbWFpbi96ZXJvLzEuMC9cbiAqL1xuKGZ1bmN0aW9uIChnbG9iYWwpIHtcblxuICAgIHZhciBhcHBsZV9waG9uZSAgICAgICAgID0gL2lQaG9uZS9pLFxuICAgICAgICBhcHBsZV9pcG9kICAgICAgICAgID0gL2lQb2QvaSxcbiAgICAgICAgYXBwbGVfdGFibGV0ICAgICAgICA9IC9pUGFkL2ksXG4gICAgICAgIGFuZHJvaWRfcGhvbmUgICAgICAgPSAvKD89LipcXGJBbmRyb2lkXFxiKSg/PS4qXFxiTW9iaWxlXFxiKS9pLCAvLyBNYXRjaCAnQW5kcm9pZCcgQU5EICdNb2JpbGUnXG4gICAgICAgIGFuZHJvaWRfdGFibGV0ICAgICAgPSAvQW5kcm9pZC9pLFxuICAgICAgICB3aW5kb3dzX3Bob25lICAgICAgID0gL0lFTW9iaWxlL2ksXG4gICAgICAgIHdpbmRvd3NfdGFibGV0ICAgICAgPSAvKD89LipcXGJXaW5kb3dzXFxiKSg/PS4qXFxiQVJNXFxiKS9pLCAvLyBNYXRjaCAnV2luZG93cycgQU5EICdBUk0nXG4gICAgICAgIG90aGVyX2JsYWNrYmVycnkgICAgPSAvQmxhY2tCZXJyeS9pLFxuICAgICAgICBvdGhlcl9ibGFja2JlcnJ5XzEwID0gL0JCMTAvaSxcbiAgICAgICAgb3RoZXJfb3BlcmEgICAgICAgICA9IC9PcGVyYSBNaW5pL2ksXG4gICAgICAgIG90aGVyX2ZpcmVmb3ggICAgICAgPSAvKD89LipcXGJGaXJlZm94XFxiKSg/PS4qXFxiTW9iaWxlXFxiKS9pLCAvLyBNYXRjaCAnRmlyZWZveCcgQU5EICdNb2JpbGUnXG4gICAgICAgIHNldmVuX2luY2ggPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgJyg/OicgKyAgICAgICAgIC8vIE5vbi1jYXB0dXJpbmcgZ3JvdXBcblxuICAgICAgICAgICAgJ05leHVzIDcnICsgICAgIC8vIE5leHVzIDdcblxuICAgICAgICAgICAgJ3wnICsgICAgICAgICAgIC8vIE9SXG5cbiAgICAgICAgICAgICdCTlRWMjUwJyArICAgICAvLyBCJk4gTm9vayBUYWJsZXQgNyBpbmNoXG5cbiAgICAgICAgICAgICd8JyArICAgICAgICAgICAvLyBPUlxuXG4gICAgICAgICAgICAnS2luZGxlIEZpcmUnICsgLy8gS2luZGxlIEZpcmVcblxuICAgICAgICAgICAgJ3wnICsgICAgICAgICAgIC8vIE9SXG5cbiAgICAgICAgICAgICdTaWxrJyArICAgICAgICAvLyBLaW5kbGUgRmlyZSwgU2lsayBBY2NlbGVyYXRlZFxuXG4gICAgICAgICAgICAnfCcgKyAgICAgICAgICAgLy8gT1JcblxuICAgICAgICAgICAgJ0dULVAxMDAwJyArICAgIC8vIEdhbGF4eSBUYWIgNyBpbmNoXG5cbiAgICAgICAgICAgICcpJywgICAgICAgICAgICAvLyBFbmQgbm9uLWNhcHR1cmluZyBncm91cFxuXG4gICAgICAgICAgICAnaScpOyAgICAgICAgICAgLy8gQ2FzZS1pbnNlbnNpdGl2ZSBtYXRjaGluZ1xuXG4gICAgdmFyIG1hdGNoID0gZnVuY3Rpb24ocmVnZXgsIHVzZXJBZ2VudCkge1xuICAgICAgICByZXR1cm4gcmVnZXgudGVzdCh1c2VyQWdlbnQpO1xuICAgIH07XG5cbiAgICB2YXIgSXNNb2JpbGVDbGFzcyA9IGZ1bmN0aW9uKHVzZXJBZ2VudCkge1xuICAgICAgICB2YXIgdWEgPSB1c2VyQWdlbnQgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudDtcblxuICAgICAgICB0aGlzLmFwcGxlID0ge1xuICAgICAgICAgICAgcGhvbmU6ICBtYXRjaChhcHBsZV9waG9uZSwgdWEpLFxuICAgICAgICAgICAgaXBvZDogICBtYXRjaChhcHBsZV9pcG9kLCB1YSksXG4gICAgICAgICAgICB0YWJsZXQ6IG1hdGNoKGFwcGxlX3RhYmxldCwgdWEpLFxuICAgICAgICAgICAgZGV2aWNlOiBtYXRjaChhcHBsZV9waG9uZSwgdWEpIHx8IG1hdGNoKGFwcGxlX2lwb2QsIHVhKSB8fCBtYXRjaChhcHBsZV90YWJsZXQsIHVhKVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuZHJvaWQgPSB7XG4gICAgICAgICAgICBwaG9uZTogIG1hdGNoKGFuZHJvaWRfcGhvbmUsIHVhKSxcbiAgICAgICAgICAgIHRhYmxldDogIW1hdGNoKGFuZHJvaWRfcGhvbmUsIHVhKSAmJiBtYXRjaChhbmRyb2lkX3RhYmxldCwgdWEpLFxuICAgICAgICAgICAgZGV2aWNlOiBtYXRjaChhbmRyb2lkX3Bob25lLCB1YSkgfHwgbWF0Y2goYW5kcm9pZF90YWJsZXQsIHVhKVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLndpbmRvd3MgPSB7XG4gICAgICAgICAgICBwaG9uZTogIG1hdGNoKHdpbmRvd3NfcGhvbmUsIHVhKSxcbiAgICAgICAgICAgIHRhYmxldDogbWF0Y2god2luZG93c190YWJsZXQsIHVhKSxcbiAgICAgICAgICAgIGRldmljZTogbWF0Y2god2luZG93c19waG9uZSwgdWEpIHx8IG1hdGNoKHdpbmRvd3NfdGFibGV0LCB1YSlcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5vdGhlciA9IHtcbiAgICAgICAgICAgIGJsYWNrYmVycnk6ICAgbWF0Y2gob3RoZXJfYmxhY2tiZXJyeSwgdWEpLFxuICAgICAgICAgICAgYmxhY2tiZXJyeTEwOiBtYXRjaChvdGhlcl9ibGFja2JlcnJ5XzEwLCB1YSksXG4gICAgICAgICAgICBvcGVyYTogICAgICAgIG1hdGNoKG90aGVyX29wZXJhLCB1YSksXG4gICAgICAgICAgICBmaXJlZm94OiAgICAgIG1hdGNoKG90aGVyX2ZpcmVmb3gsIHVhKSxcbiAgICAgICAgICAgIGRldmljZTogICAgICAgbWF0Y2gob3RoZXJfYmxhY2tiZXJyeSwgdWEpIHx8IG1hdGNoKG90aGVyX2JsYWNrYmVycnlfMTAsIHVhKSB8fCBtYXRjaChvdGhlcl9vcGVyYSwgdWEpIHx8IG1hdGNoKG90aGVyX2ZpcmVmb3gsIHVhKVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNldmVuX2luY2ggPSBtYXRjaChzZXZlbl9pbmNoLCB1YSk7XG4gICAgICAgIHRoaXMuYW55ID0gdGhpcy5hcHBsZS5kZXZpY2UgfHwgdGhpcy5hbmRyb2lkLmRldmljZSB8fCB0aGlzLndpbmRvd3MuZGV2aWNlIHx8IHRoaXMub3RoZXIuZGV2aWNlIHx8IHRoaXMuc2V2ZW5faW5jaDtcbiAgICAgICAgLy8gZXhjbHVkZXMgJ290aGVyJyBkZXZpY2VzIGFuZCBpcG9kcywgdGFyZ2V0aW5nIHRvdWNoc2NyZWVuIHBob25lc1xuICAgICAgICB0aGlzLnBob25lID0gdGhpcy5hcHBsZS5waG9uZSB8fCB0aGlzLmFuZHJvaWQucGhvbmUgfHwgdGhpcy53aW5kb3dzLnBob25lO1xuICAgICAgICAvLyBleGNsdWRlcyA3IGluY2ggZGV2aWNlcywgY2xhc3NpZnlpbmcgYXMgcGhvbmUgb3IgdGFibGV0IGlzIGxlZnQgdG8gdGhlIHVzZXJcbiAgICAgICAgdGhpcy50YWJsZXQgPSB0aGlzLmFwcGxlLnRhYmxldCB8fCB0aGlzLmFuZHJvaWQudGFibGV0IHx8IHRoaXMud2luZG93cy50YWJsZXQ7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgaW5zdGFudGlhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIElNID0gbmV3IElzTW9iaWxlQ2xhc3MoKTtcbiAgICAgICAgSU0uQ2xhc3MgPSBJc01vYmlsZUNsYXNzO1xuICAgICAgICByZXR1cm4gSU07XG4gICAgfTtcblxuICAgIGlmICh0eXBlb2YgbW9kdWxlICE9ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzICYmIHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIC8vbm9kZVxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IElzTW9iaWxlQ2xhc3M7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIC8vYnJvd3NlcmlmeVxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGluc3RhbnRpYXRlKCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgLy9BTURcbiAgICAgICAgZGVmaW5lKGdsb2JhbC5pc01vYmlsZSA9IGluc3RhbnRpYXRlKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGdsb2JhbC5pc01vYmlsZSA9IGluc3RhbnRpYXRlKCk7XG4gICAgfVxuXG59KSh0aGlzKTtcbiJdfQ==
