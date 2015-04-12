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

	this.$mobile.append( this.register.render() );
	this.$mobile.append( this.thanks.render() );

	// this._setupAnalytics();
	// this._emitRender();

	return this.$mobile;
};

module.exports = MobileView;
},{"./RegisterView.js":8,"./ThanksView.js":17}],8:[function(require,module,exports){
var ColumnsEvent 	= require('../models/ColumnsEvent.js');
var TEMPLATE 		= Columns.Templates['templates/register.hbs'],
	ERROR_CLASS 	= 'error';

function RegisterView() {

}

RegisterView.prototype.render = function() {

	this.$register = $( TEMPLATE() );

	this._setupInteractionEvents();
	return this.$register;
};

RegisterView.prototype.show = function() {
	this.$register.velocity({
		opacity: 1
	}, {
		duration: 200,
		easing: 'ease-out',
		begin: function() {
			this.$register.addClass('animating');
		}.bind( this ),
		complete: function() {
			this.$register.removeClass('animating');
			this.$register.addClass('active');
		}.bind( this )
	});
};

RegisterView.prototype.hide = function() {
	this.$register.velocity({
		opacity: 0
	}, {
		duration: 200,
		easing: 'ease-in',
		begin: function() {
			this.$register.addClass('animating');
		}.bind( this ),
		complete: function() {
			this.$register.removeClass('animating');
			this.$register.removeClass('active');
		}.bind( this )
	});
};

RegisterView.prototype.isEmailValid = function() {
	var value = this.$register.find('.columns-register-email-input input').val(),
		re = /\S+@\S+\.\S+/;

	return re.test( value );
};

RegisterView.prototype.setEmailError = function( error ) {
	var $field = this.$register.find('.columns-register-email-input');

	$field.removeClass( ERROR_CLASS );

	setTimeout(function() {
		if ( error ) {
			// Remove and add again so we
			// ensure a shake occurs
			$field.addClass( ERROR_CLASS );
		}
	}, 0);
}

RegisterView.prototype._setupInteractionEvents = function() {

	// Listen to taps on the register button
	this.$register.find('.columns-register-button').on( 'click', this._onRegistrationTap.bind( this ) );
};

RegisterView.prototype._onRegistrationTap = function( event ) {

	if ( this.isEmailValid() ) {
		this.setEmailError( false );
		this._onRegistrationSuccess();
	} else {
		this.setEmailError( true );
	}
};

RegisterView.prototype._onRegistrationSuccess = function() {

	this.hide();

	ColumnsEvent.send( 'Columns.RegisterView.DidRegisterWithSuccess', {
		registerView: this
	});
};

module.exports = RegisterView;
},{"../models/ColumnsEvent.js":21}],9:[function(require,module,exports){
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
var ColumnsEvent 	= require('../models/ColumnsEvent.js');
var TEMPLATE 		= Columns.Templates['templates/thanks.hbs'];

function ThanksView() {

}

ThanksView.prototype.render = function() {

	this.$thanks = $( TEMPLATE() );

	this._setupEventListeners();

	return this.$thanks;
};

ThanksView.prototype.show = function() {
	this.$thanks.velocity({
		opacity: 1
	}, {
		duration: 200,
		easing: 'ease-out',
		begin: function() {
			this.$thanks.addClass('animating');
		}.bind( this ),
		complete: function() {
			this.$thanks.removeClass('animating');
			this.$thanks.addClass('active');
		}.bind( this )
	});
};

ThanksView.prototype.hide = function() {
	this.$thanks.velocity({
		opacity: 0
	}, {
		duration: 200,
		easing: 'ease-in',
		begin: function() {
			this.$thanks.addClass('animating');
		}.bind( this ),
		complete: function() {
			this.$thanks.removeClass('animating');
			this.$thanks.removeClass('active');
		}.bind( this )
	});
};

ThanksView.prototype._setupEventListeners = function() {

	// Listen to successful registrations
	ColumnsEvent.on( 'Columns.RegisterView.DidRegisterWithSuccess', this._onRegistrationSuccess.bind( this ) );
};

ThanksView.prototype._onRegistrationSuccess = function( event, data ) {

	this.show();
};

module.exports = ThanksView;
},{"../models/ColumnsEvent.js":21}],18:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb21waWxlZC1qYXZhc2NyaXB0cy9zdHlsaW5nL2NvbXBpbGVkLWRhdGEuanMiLCJqYXZhc2NyaXB0cy9jb25maWcuanMiLCJqYXZhc2NyaXB0cy9jb250cm9sbGVycy9EZXNrdG9wVmlldy5qcyIsImphdmFzY3JpcHRzL2NvbnRyb2xsZXJzL0VtYmVkRGV0YWlsc1ZpZXcuanMiLCJqYXZhc2NyaXB0cy9jb250cm9sbGVycy9JdGVtVmlldy5qcyIsImphdmFzY3JpcHRzL2NvbnRyb2xsZXJzL0l0ZW1zVmlldy5qcyIsImphdmFzY3JpcHRzL2NvbnRyb2xsZXJzL01vYmlsZVZpZXcuanMiLCJqYXZhc2NyaXB0cy9jb250cm9sbGVycy9SZWdpc3RlclZpZXcuanMiLCJqYXZhc2NyaXB0cy9jb250cm9sbGVycy9TdHlsZUNvbXBvbmVudFZpZXcuanMiLCJqYXZhc2NyaXB0cy9jb250cm9sbGVycy9TdHlsZUlucHV0Vmlldy5qcyIsImphdmFzY3JpcHRzL2NvbnRyb2xsZXJzL1N0eWxlTXVsdGlwbGVTZWdtZW50ZWRCdXR0b25WaWV3LmpzIiwiamF2YXNjcmlwdHMvY29udHJvbGxlcnMvU3R5bGVTZWdtZW50ZWRCdXR0b25WaWV3LmpzIiwiamF2YXNjcmlwdHMvY29udHJvbGxlcnMvU3R5bGVWaWV3LmpzIiwiamF2YXNjcmlwdHMvY29udHJvbGxlcnMvVGVtcGxhdGVHcm91cFZpZXcuanMiLCJqYXZhc2NyaXB0cy9jb250cm9sbGVycy9UZW1wbGF0ZVZhbHVlVmlldy5qcyIsImphdmFzY3JpcHRzL2NvbnRyb2xsZXJzL1RlbXBsYXRlVmlldy5qcyIsImphdmFzY3JpcHRzL2NvbnRyb2xsZXJzL1RoYW5rc1ZpZXcuanMiLCJqYXZhc2NyaXB0cy9jb250cm9sbGVycy9VcGxvYWRWaWV3LmpzIiwiamF2YXNjcmlwdHMvbWFpbi5qcyIsImphdmFzY3JpcHRzL21vZGVscy9Db2x1bW5zQW5hbHl0aWNzLmpzIiwiamF2YXNjcmlwdHMvbW9kZWxzL0NvbHVtbnNFdmVudC5qcyIsImphdmFzY3JpcHRzL21vZGVscy9JdGVtLmpzIiwiamF2YXNjcmlwdHMvbW9kZWxzL0xheW91dC5qcyIsImphdmFzY3JpcHRzL21vZGVscy9TdHlsZS5qcyIsImphdmFzY3JpcHRzL21vZGVscy9UYWJsZS5qcyIsImphdmFzY3JpcHRzL3N0eWxpbmcvZGVmYXVsdHMuanMiLCJub2RlX21vZHVsZXMvaXNtb2JpbGVqcy9pc01vYmlsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNySUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25wQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25LQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdFJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiQ29sdW1uc1snc3R5bGVEYXRhJ10gPSB7XG5cdGNvbXBvbmVudHM6IHt9LFxuXHR0eXBlczoge31cbn07XG5Db2x1bW5zLnN0eWxlRGF0YS5jb21wb25lbnRzWydpdGVtcyddID0ge1xuXHR0aXRsZTogJ0l0ZW1zJyxcblx0cm93czogW3tcblx0XHRpdGVtczogW3tcblx0XHRcdGtpbmQ6ICdzZWdtZW50ZWQtYnV0dG9uJyxcblx0XHRcdGxhYmVsOiAnTGF5b3V0Jyxcblx0XHRcdHByb3BlcnR5OiB7XG5cdFx0XHRcdG5hbWU6J2ZsZXgtZGlyZWN0aW9uJ1xuXHRcdFx0fSxcblx0XHRcdGJ1dHRvbnM6IFt7XG5cdFx0XHRcdHZhbHVlOiAncm93Jyxcblx0XHRcdFx0aWNvbjogJ2xheW91dC1ob3Jpem9udGFsJ1xuXHRcdFx0fSwge1xuXHRcdFx0XHR2YWx1ZTogJ2NvbHVtbicsXG5cdFx0XHRcdGljb246ICdsYXlvdXQtdmVydGljYWwnXG5cdFx0XHR9XVxuXHRcdH0sIHtcblx0XHRcdGtpbmQ6ICdzZWdtZW50ZWQtYnV0dG9uJyxcblx0XHRcdGxhYmVsOiAnQWxpZ25tZW50Jyxcblx0XHRcdHByb3BlcnR5OiB7XG5cdFx0XHRcdG5hbWU6J2FsaWduLWl0ZW1zJ1xuXHRcdFx0fSxcblx0XHRcdGJ1dHRvbnM6IFt7XG5cdFx0XHRcdHZhbHVlOiAnZmxleC1zdGFydCcsXG5cdFx0XHRcdGljb246ICdwb3NpdGlvbi1sZWZ0J1xuXHRcdFx0fSwge1xuXHRcdFx0XHR2YWx1ZTogJ2NlbnRlcicsXG5cdFx0XHRcdGljb246ICdwb3NpdGlvbi1jZW50ZXInXG5cdFx0XHR9LCB7XG5cdFx0XHRcdHZhbHVlOiAnZmxleC1lbmQnLFxuXHRcdFx0XHRpY29uOiAncG9zaXRpb24tcmlnaHQnXG5cdFx0XHR9XVxuXHRcdH1dXG5cdH1dXG59XG5Db2x1bW5zLnN0eWxlRGF0YS5jb21wb25lbnRzWydtYXJnaW5zJ10gPSB7XG5cdHRpdGxlOiAnU3BhY2luZycsXG5cdHJvd3M6IFt7XG5cdFx0aXRlbXM6IFt7XG5cdFx0XHRraW5kOiAnaW5wdXQnLFxuXHRcdFx0dHlwZTogJ3RlbCcsXG5cdFx0XHRjYW5CZU5lZ2F0aXZlOiB0cnVlLFxuXHRcdFx0cHJlcGVuZEljb246ICdtYXJnaW4tdG9wJyxcblx0XHRcdGFwcGVuZENvbnRyb2xzOiB0cnVlLFxuXHRcdFx0bGFiZWw6ICdUb3AnLFxuXHRcdFx0cHJvcGVydHk6ICdtYXJnaW4tdG9wJyxcblx0XHRcdGRlZmF1bHQ6ICcwcHgnXG5cdFx0fSwge1xuXHRcdFx0a2luZDogJ2lucHV0Jyxcblx0XHRcdHR5cGU6ICd0ZWwnLFxuXHRcdFx0Y2FuQmVOZWdhdGl2ZTogdHJ1ZSxcblx0XHRcdHByZXBlbmRJY29uOiAnbWFyZ2luLWJvdHRvbScsXG5cdFx0XHRhcHBlbmRDb250cm9sczogdHJ1ZSxcblx0XHRcdGxhYmVsOiAnQm90dG9tJyxcblx0XHRcdHByb3BlcnR5OiAnbWFyZ2luLWJvdHRvbScsXG5cdFx0XHRkZWZhdWx0OiAnMHB4J1xuXHRcdH1dXG5cdH0sIHtcblx0XHRpdGVtczogW3tcblx0XHRcdGtpbmQ6ICdpbnB1dCcsXG5cdFx0XHR0eXBlOiAndGVsJyxcblx0XHRcdGNhbkJlTmVnYXRpdmU6IHRydWUsXG5cdFx0XHRwcmVwZW5kSWNvbjogJ21hcmdpbi1sZWZ0Jyxcblx0XHRcdGFwcGVuZENvbnRyb2xzOiB0cnVlLFxuXHRcdFx0bGFiZWw6ICdMZWZ0Jyxcblx0XHRcdHByb3BlcnR5OiAnbWFyZ2luLWxlZnQnLFxuXHRcdFx0ZGVmYXVsdDogJzBweCdcblx0XHR9LCB7XG5cdFx0XHRraW5kOiAnaW5wdXQnLFxuXHRcdFx0dHlwZTogJ3RlbCcsXG5cdFx0XHRjYW5CZU5lZ2F0aXZlOiB0cnVlLFxuXHRcdFx0cHJlcGVuZEljb246ICdtYXJnaW4tcmlnaHQnLFxuXHRcdFx0YXBwZW5kQ29udHJvbHM6IHRydWUsXG5cdFx0XHRsYWJlbDogJ1JpZ2h0Jyxcblx0XHRcdHByb3BlcnR5OiAnbWFyZ2luLXJpZ2h0Jyxcblx0XHRcdGRlZmF1bHQ6ICcwcHgnXG5cdFx0fV1cblx0fV1cbn07XG5Db2x1bW5zLnN0eWxlRGF0YS5jb21wb25lbnRzWyd0ZXh0J10gPSB7XG5cdHRpdGxlOiAnVGV4dCcsXG5cdHJvd3M6IFt7XG5cdFx0aXRlbXM6IFt7XG5cdFx0XHRraW5kOiAnaW5wdXQnLFxuXHRcdFx0dHlwZTogJ3RlbCcsXG5cdFx0XHRwcmVwZW5kSWNvbjogZmFsc2UsXG5cdFx0XHRhcHBlbmRDb250cm9sczogdHJ1ZSxcblx0XHRcdGxhYmVsOiAnU2l6ZScsXG5cdFx0XHRwcm9wZXJ0eTogJ2ZvbnQtc2l6ZScsXG5cdFx0XHRkZWZhdWx0OiAnMTRweCdcblx0XHR9LCB7XG5cdFx0XHRraW5kOiAnbXVsdGlwbGUtc2VnbWVudGVkLWJ1dHRvbicsXG5cdFx0XHRsYWJlbDogJ1N0eWxlJyxcblx0XHRcdGJ1dHRvbnM6IFt7XG5cdFx0XHRcdHByb3BlcnR5OiB7XG5cdFx0XHRcdFx0bmFtZTogJ2ZvbnQtd2VpZ2h0J1xuXHRcdFx0XHR9LFxuXHRcdFx0XHR2YWx1ZXM6IHtcblx0XHRcdFx0XHRhY3RpdmU6ICdib2xkJyxcblx0XHRcdFx0XHRpbmFjdGl2ZTogJ25vcm1hbCcsXG5cdFx0XHRcdFx0ZGVmYXVsdDogJ25vcm1hbCdcblx0XHRcdFx0fSxcblx0XHRcdFx0aWNvbjogJ2JvbGQnXG5cdFx0XHR9LCB7XG5cdFx0XHRcdHByb3BlcnR5OiB7XG5cdFx0XHRcdFx0bmFtZTonZm9udC1zdHlsZSdcblx0XHRcdFx0fSxcblx0XHRcdFx0dmFsdWVzOiB7XG5cdFx0XHRcdFx0YWN0aXZlOiAnaXRhbGljJyxcblx0XHRcdFx0XHRpbmFjdGl2ZTogJ25vcm1hbCcsXG5cdFx0XHRcdFx0ZGVmYXVsdDogJ25vcm1hbCdcblx0XHRcdFx0fSxcblx0XHRcdFx0aWNvbjogJ2l0YWxpYydcblx0XHRcdH0sIHtcblx0XHRcdFx0cHJvcGVydHk6IHtcblx0XHRcdFx0XHRuYW1lOid0ZXh0LWRlY29yYXRpb24nXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHZhbHVlczoge1xuXHRcdFx0XHRcdGFjdGl2ZTogJ3VuZGVybGluZScsXG5cdFx0XHRcdFx0aW5hY3RpdmU6ICdub25lJyxcblx0XHRcdFx0XHRkZWZhdWx0OiAnbm9uZSdcblx0XHRcdFx0fSxcblx0XHRcdFx0aWNvbjogJ3VuZGVybGluZSdcblx0XHRcdH1dXG5cdFx0fV1cblx0fSwge1xuXHRcdGl0ZW1zOiBbe1xuXHRcdFx0a2luZDogJ2lucHV0Jyxcblx0XHRcdHR5cGU6ICdjb2xvcicsXG5cdFx0XHRwcmVwZW5kSWNvbjogZmFsc2UsXG5cdFx0XHRhcHBlbmRDb250cm9sczogZmFsc2UsXG5cdFx0XHRsYWJlbDogJ0NvbG9yJyxcblx0XHRcdHByb3BlcnR5OiAnY29sb3InLFxuXHRcdFx0ZGVmYXVsdDogJyMzYTNhM2EnXG5cdFx0fSwge1xuXHRcdFx0a2luZDogJ3NlZ21lbnRlZC1idXR0b24nLFxuXHRcdFx0bGFiZWw6ICdBbGlnbm1lbnQnLFxuXHRcdFx0cHJvcGVydHk6IHtcblx0XHRcdFx0bmFtZTogJ3RleHQtYWxpZ24nLFxuXHRcdFx0XHRkZWZhdWx0OiAnbGVmdCdcblx0XHRcdH0sXG5cdFx0XHRidXR0b25zOiBbe1xuXHRcdFx0XHR2YWx1ZTogJ2xlZnQnLFxuXHRcdFx0XHRpY29uOiAndGV4dC1hbGlnbi1sZWZ0J1xuXHRcdFx0fSwge1xuXHRcdFx0XHR2YWx1ZTogJ2NlbnRlcicsXG5cdFx0XHRcdGljb246ICd0ZXh0LWFsaWduLWNlbnRlcidcblx0XHRcdH0sIHtcblx0XHRcdFx0dmFsdWU6ICdyaWdodCcsXG5cdFx0XHRcdGljb246ICd0ZXh0LWFsaWduLXJpZ2h0J1xuXHRcdFx0fV1cblx0XHR9XVxuXHR9XVxufTtcbkNvbHVtbnMuc3R5bGVEYXRhLnR5cGVzID0ge1xuXHR0ZXh0OiBbXG5cdFx0Q29sdW1ucy5zdHlsZURhdGEuY29tcG9uZW50c1sndGV4dCddLFxuXHRcdENvbHVtbnMuc3R5bGVEYXRhLmNvbXBvbmVudHNbJ21hcmdpbnMnXVxuXHRdLFxuXHRncm91cDogW1xuXHRcdENvbHVtbnMuc3R5bGVEYXRhLmNvbXBvbmVudHNbJ2l0ZW1zJ10sXG5cdF1cbn07XG5tb2R1bGUuZXhwb3J0cyA9IENvbHVtbnM7IiwidmFyIGVudiA9ICd7e2Vudmlyb25tZW50fX0nO1xubW9kdWxlLmV4cG9ydHMgPSB7XG5cdGVudjogZW52LFxuXHRkZXZlbG9wbWVudDoge1xuXHRcdGFwaToge1xuXHRcdFx0aG9zdDogJ2h0dHA6Ly8xMjcuMC4wLjE6ODA4MCdcblx0XHR9LFxuXHRcdHdlYjoge1xuXHRcdFx0aG9zdDogJ2h0dHA6Ly8xMjcuMC4wLjEnXG5cdFx0fSxcblx0XHRlbWJlZDoge1xuXHRcdFx0aG9zdDogJ2h0dHA6Ly8xMjcuMC4wLjEnLFxuXHRcdFx0cGF0aDogJy9wdWJsaWMvZW1iZWQtdGFibGUuanMnXG5cdFx0fVxuXHR9LFxuXHRzdGFnaW5nOiB7XG5cdFx0YXBpOiB7XG5cdFx0XHRob3N0OiAnaHR0cDovL2FwaXN0Zy50aGVjb2x1bW5zcHJvamVjdC5jb20nXG5cdFx0fSxcblx0XHR3ZWI6IHtcblx0XHRcdGhvc3Q6ICdodHRwOi8vYXBwc3RnLnRoZWNvbHVtbnNwcm9qZWN0LmNvbSdcblx0XHR9LFxuXHRcdGVtYmVkOiB7XG5cdFx0XHRob3N0OiAnaHR0cDovL3N0Zy5jb2x1bS5ueicsXG5cdFx0XHRwYXRoOiAnL3B1YmxpYy9lbWJlZC10YWJsZS5qcydcblx0XHR9XG5cdH0sXG5cdHByb2R1Y3Rpb246IHtcblx0XHRhcGk6IHtcblx0XHRcdGhvc3Q6ICdodHRwOi8vYXBpLnRoZWNvbHVtbnNwcm9qZWN0LmNvbSdcblx0XHR9LFxuXHRcdHdlYjoge1xuXHRcdFx0aG9zdDogJ2h0dHA6Ly9hcHAudGhlY29sdW1uc3Byb2plY3QuY29tJ1xuXHRcdH0sXG5cdFx0ZW1iZWQ6IHtcblx0XHRcdGhvc3Q6ICdodHRwOi8vY29sdW0ubnonLFxuXHRcdFx0cGF0aDogJy9wdWJsaWMvZW1iZWQtdGFibGUuanMnXG5cdFx0fVxuXHR9XG59W2Vudl07IiwidmFyIFRhYmxlIFx0XHRcdFx0PSByZXF1aXJlKCcuLi9tb2RlbHMvVGFibGUuanMnKTtcbnZhciBJdGVtVmlldyBcdFx0XHQ9IHJlcXVpcmUoJy4vSXRlbXNWaWV3LmpzJyk7XG52YXIgVGVtcGxhdGVWaWV3IFx0XHQ9IHJlcXVpcmUoJy4vVGVtcGxhdGVWaWV3LmpzJyk7XG52YXIgU3R5bGVWaWV3IFx0XHRcdD0gcmVxdWlyZSgnLi9TdHlsZVZpZXcuanMnKTtcbnZhciBFbWJlZERldGFpbHNWaWV3IFx0PSByZXF1aXJlKCcuL0VtYmVkRGV0YWlsc1ZpZXcuanMnKTtcbnZhciBVcGxvYWRWaWV3IFx0XHRcdD0gcmVxdWlyZSgnLi9VcGxvYWRWaWV3LmpzJyk7XG52YXIgQ29sdW1uc0V2ZW50IFx0PSByZXF1aXJlKCcuLi9tb2RlbHMvQ29sdW1uc0V2ZW50LmpzJyk7XG52YXIgQ29sdW1uc0FuYWx5dGljcyBcdD0gcmVxdWlyZSgnLi4vbW9kZWxzL0NvbHVtbnNBbmFseXRpY3MuanMnKTtcbnZhciBDb25maWcgXHRcdFx0XHQ9IHJlcXVpcmUoJy4uL2NvbmZpZy5qcycpO1xuXG52YXIgVEVNUExBVEUgXHRcdFx0PSBDb2x1bW5zLlRlbXBsYXRlc1sndGVtcGxhdGVzL2Rlc2t0b3AuaGJzJ107XG5cbmZ1bmN0aW9uIERlc2t0b3BWaWV3KCkge1xuXG5cdHRoaXMudGFibGUgPSBuZXcgVGFibGUoKTtcblx0dGhpcy5pdGVtcyA9IG5ldyBJdGVtc1ZpZXcoKTtcblx0dGhpcy50ZW1wbGF0ZSA9IG5ldyBUZW1wbGF0ZVZpZXcoKTtcblx0dGhpcy5zdHlsZSA9IG5ldyBTdHlsZVZpZXcoKTtcblx0dGhpcy5lbWJlZCA9IG5ldyBFbWJlZERldGFpbHNWaWV3KCk7XG5cdHRoaXMudXBsb2FkID0gbmV3IFVwbG9hZFZpZXcoKTtcbn1cblxuRGVza3RvcFZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKCkge1xuXG5cdHRoaXMuJGRlc2t0b3AgPSAkKCBURU1QTEFURSgpICk7XG5cblx0JCgnI2FwcCcpLmFwcGVuZCggdGhpcy4kZGVza3RvcCApO1xuXHR0aGlzLnVwbG9hZC5yZW5kZXIoKTtcblxuXHR0aGlzLl9zZXR1cEFuYWx5dGljcygpO1xuXHR0aGlzLl9lbWl0UmVuZGVyKCk7XG5cblx0cmV0dXJuIHRoaXMuJGRlc2t0b3A7XG59O1xuXG5EZXNrdG9wVmlldy5wcm90b3R5cGUuX2VtaXRSZW5kZXIgPSBmdW5jdGlvbigpIHtcblx0Q29sdW1uc0V2ZW50LnNlbmQoICdDb2x1bW5zLkRlc2t0b3BWaWV3LkRpZFJlbmRlcicsIHtcblx0XHRkZXNrdG9wVmlldzogdGhpc1xuXHR9KTtcbn07XG5cbkRlc2t0b3BWaWV3LnByb3RvdHlwZS5fc2V0dXBBbmFseXRpY3MgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBTZXQgdXAgYW5hbHl0aWNzXG5cdGlmICggQ29uZmlnLmVudiA9PT0gJ3Byb2R1Y3Rpb24nICkge1xuXHRcdCQoJ2hlYWQnKS5hcHBlbmQoIENvbHVtbnMuVGVtcGxhdGVzWyd0ZW1wbGF0ZXMvYW5hbHl0aWNzLmhicyddKCkgKTtcblx0XHRDb2x1bW5zQW5hbHl0aWNzLnNlbmQoe1xuXHRcdFx0Y2F0ZWdvcnk6ICduYXZpZ2F0aW9uJyxcblx0XHRcdGFjdGlvbjogJ2Fycml2ZWQnLFxuXHRcdFx0bGFiZWw6ICdhcHAnXG5cdFx0fSk7XG5cblx0XHQkKCcuY29sdW1ucy1oZWFkZXItbmF2LWhvbWUnKS5jbGljayhmdW5jdGlvbigpIHtcblx0XHRcdENvbHVtbnNBbmFseXRpY3Muc2VuZCh7XG5cdFx0XHRcdGNhdGVnb3J5OiAnYnV0dG9uJyxcblx0XHRcdFx0YWN0aW9uOiAnY2xpY2snLFxuXHRcdFx0XHRsYWJlbDogJ2hvbWUnXG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBEZXNrdG9wVmlldzsiLCJ2YXIgQ29sdW1uc0V2ZW50IFx0XHRcdD0gcmVxdWlyZSgnLi4vbW9kZWxzL0NvbHVtbnNFdmVudC5qcycpO1xudmFyIENvbHVtbnNBbmFseXRpY3NcdFx0PSByZXF1aXJlKCcuLi9tb2RlbHMvQ29sdW1uc0FuYWx5dGljcy5qcycpO1xudmFyIGNvbmZpZyBcdFx0XHRcdFx0PSByZXF1aXJlKCcuLi9jb25maWcuanMnKTtcblxudmFyIFBBTkVMX1RFTVBMQVRFIFx0XHRcdD0gQ29sdW1ucy5UZW1wbGF0ZXNbJ3RlbXBsYXRlcy9wYW5lbHMvcGFuZWwuaGJzJ10sXG5cdEJPRFlfVEVNUExBVEUgXHRcdFx0PSBDb2x1bW5zLlRlbXBsYXRlc1sndGVtcGxhdGVzL2VtYmVkLWRldGFpbHMtcGFuZWwvYm9keS5oYnMnXSxcblx0U0VMRUNUT1IgXHRcdFx0XHQ9ICcjZW1iZWQtZGV0YWlscy1wYW5lbCcsXG5cdENMT1NFX0JVVFRPTl9TRUxFQ1RPUiBcdD0gJy5jb2x1bW5zLXBhbmVsLWhlYWRlci1jbG9zZS1idXR0b24nLFxuXHRCTE9DS0VSX1NFTEVDVE9SIFx0XHQ9ICcuY29sdW1ucy1wYW5lbC1ibG9ja2VyJztcblxuZnVuY3Rpb24gRW1iZWREZXRhaWxzVmlldyggdGFibGUgKSB7XG5cdHRoaXMudGFibGUgPSB0YWJsZTtcblx0dGhpcy5fc2V0dXBFdmVudExpc3RlbmVycygpO1xufVxuXG5FbWJlZERldGFpbHNWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbigpIHtcblxuXHR2YXIgJGVtYmVkID0gJCggUEFORUxfVEVNUExBVEUoe1xuXHRcdGlkOiB0aGlzLnRhYmxlLmlkLFxuXHRcdGhlYWRlcjoge1xuXHRcdFx0dGl0bGU6ICdFbWJlZCBEZXRhaWxzJ1xuXHRcdH0sXG5cdFx0Ym9keTogQk9EWV9URU1QTEFURSh7XG5cdFx0XHR0aXRsZTogdGhpcy50YWJsZS50aXRsZSxcblx0XHRcdHNvdXJjZTogdGhpcy50YWJsZS5zb3VyY2UsXG5cdFx0XHRzb3VyY2VfdXJsOiB0aGlzLnRhYmxlLnNvdXJjZV91cmwsXG5cdFx0XHR0YWJsZV9pZDogdGhpcy50YWJsZS5pZCxcblx0XHRcdHVybDogY29uZmlnLmVtYmVkLmhvc3QgKyBjb25maWcuZW1iZWQucGF0aFxuXHRcdH0pLFxuXHRcdGZvb3RlcjogbnVsbCxcblx0fSkgKTtcblxuXHR0aGlzLiRlbWJlZCA9ICRlbWJlZDtcblx0dGhpcy5fc2V0dXBJbnRlcmFjdGlvbkxpc3RlbmVycygpO1xuXG5cdCQoJyNhcHAnKS5hcHBlbmQoIHRoaXMuJGVtYmVkICk7XG5cdHJldHVybiB0aGlzLiRlbWJlZDtcbn07XG5cbkVtYmVkRGV0YWlsc1ZpZXcucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbigpIHtcblx0dGhpcy4kZW1iZWQuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xufTtcblxuRW1iZWREZXRhaWxzVmlldy5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLiRlbWJlZC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG59O1xuXG5FbWJlZERldGFpbHNWaWV3LnByb3RvdHlwZS5fZW1pdENoYW5nZSA9IGZ1bmN0aW9uKCBwcm9wZXJ0eSwgdmFsdWUgKSB7XG5cdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0Ly8gY29sdW1uc0V2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5FbWJlZERldGFpbHNWaWV3LkRpZFVwZGF0ZVByb3BlcnR5V2l0aFZhbHVlJywgZmFsc2UsIGZhbHNlLCB7XG5cdC8vIFx0ZW1iZWQ6IFx0dGhpcyxcblx0Ly8gXHRwcm9wZXJ0eTogcHJvcGVydHksXG5cdC8vIFx0dmFsdWU6IHZhbHVlXG5cdC8vIH0pO1xuXHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGNvbHVtbnNFdmVudCk7XG5cdENvbHVtbnNFdmVudC5zZW5kKCAnQ29sdW1ucy5FbWJlZERldGFpbHNWaWV3LkRpZFVwZGF0ZVByb3BlcnR5V2l0aFZhbHVlJywge1xuXHRcdGVtYmVkOiBcdHRoaXMsXG5cdFx0cHJvcGVydHk6IHByb3BlcnR5LFxuXHRcdHZhbHVlOiB2YWx1ZVxuXHR9KTtcbn07XG5cbkVtYmVkRGV0YWlsc1ZpZXcucHJvdG90eXBlLl9zZXR1cEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gU2hvdWxkIGxpc3RlbiBmb3IgdGFibGUgdXBsb2FkIHN1Y2Nlc3Ncblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5UYWJsZS5EaWRVcGxvYWRXaXRoU3VjY2VzcycsIHRoaXMuX29uVGFibGVVcGxvYWQuYmluZCggdGhpcyApICk7XG59O1xuXG5FbWJlZERldGFpbHNWaWV3LnByb3RvdHlwZS5fc2V0dXBJbnRlcmFjdGlvbkxpc3RlbmVycyA9IGZ1bmN0aW9uKCkge1xuXG5cdC8vIFNob3VsZCBsaXN0ZW4gdG8gY2xpY2tzIG9uIHRoZSBlbWJlZCBidXR0b25cblx0JCgnLmNvbHVtbnMtaGVhZGVyLW5hdi1lbWJlZCcpLm9uKCAnY2xpY2snLCB0aGlzLl9vbkVtYmVkQnV0dG9uQ2xpY2suYmluZCggdGhpcyApICk7XG5cblx0Ly8gU2hvdWxkIGxpc3RlbiB0byBjbGlja3Mgb24gdGhlIGhpZGUgYnV0dG9uXG5cdHRoaXMuJGVtYmVkLmZpbmQoIENMT1NFX0JVVFRPTl9TRUxFQ1RPUiApLm9uKCAnY2xpY2snLCB0aGlzLl9vbkNsb3NlQnV0dG9uQ2xpY2suYmluZCggdGhpcyApICk7XG5cblx0Ly8gU2hvdWxkIGxpc3RlbiB0byBjbGlja3Mgb24gdGhlIGJsb2NrZXJcblx0dGhpcy4kZW1iZWQuZmluZCggQkxPQ0tFUl9TRUxFQ1RPUiApLm9uKCAnY2xpY2snLCB0aGlzLl9vbkJsb2NrZXJDbGljay5iaW5kKCB0aGlzICkgKTtcblxuXHQvLyBTaG91bGQgbGlzdGVuIHRvIGtleXVwIGV2ZW50cyBvbiBpbnB1dCBmaWVsZHNcblx0dGhpcy4kZW1iZWQuZmluZCgnaW5wdXQnKS5vbiggJ2tleXVwJywgdGhpcy5fb25JbnB1dEtleXVwLmJpbmQoIHRoaXMgKSApO1xuXG5cdC8vIFNob3VsZCBsaXN0ZW4gdG8gYmx1ciBldmVudHMgb24gaW5wdXQgZmllbGRzXG5cdHRoaXMuJGVtYmVkLmZpbmQoJ2lucHV0Jykub24oICdibHVyJywgdGhpcy5fb25JbnB1dEJsdXIuYmluZCggdGhpcyApICk7XG5cblx0dGhpcy4kZW1iZWQuZmluZCgnLmNvbHVtbnMtY29weS1lbWJlZC11cmwnKS5vbiggJ2NsaWNrJywgdGhpcy5fb25Db3B5Q2xpY2suYmluZCggdGhpcyApICk7XG59O1xuXG5FbWJlZERldGFpbHNWaWV3LnByb3RvdHlwZS5fb25UYWJsZVVwbG9hZCA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblx0dGhpcy50YWJsZSA9IGRhdGEudGFibGU7XG5cdHRoaXMucmVuZGVyKCk7XG59O1xuXG5FbWJlZERldGFpbHNWaWV3LnByb3RvdHlwZS5fb25FbWJlZEJ1dHRvbkNsaWNrID0gZnVuY3Rpb24oIGV2ZW50KSB7XG5cdHRoaXMuc2hvdygpO1xuXG5cdENvbHVtbnNBbmFseXRpY3Muc2VuZCh7XG5cdFx0Y2F0ZWdvcnk6ICdidXR0b24nLFxuXHRcdGFjdGlvbjogJ2NsaWNrJyxcblx0XHRsYWJlbDogJ2VtYmVkJ1xuXHR9KTtcbn07XG5cbkVtYmVkRGV0YWlsc1ZpZXcucHJvdG90eXBlLl9vbkNsb3NlQnV0dG9uQ2xpY2sgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdHRoaXMuaGlkZSgpO1xufTtcblxuRW1iZWREZXRhaWxzVmlldy5wcm90b3R5cGUuX29uQmxvY2tlckNsaWNrID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuXHR0aGlzLmhpZGUoKTtcbn07XG5cbkVtYmVkRGV0YWlsc1ZpZXcucHJvdG90eXBlLl9vbklucHV0S2V5dXAgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdHZhciAkZmllbGQgXHRcdD0gJCggZXZlbnQudGFyZ2V0ICksXG5cdFx0cHJvcGVydHlcdD0gJGZpZWxkLmRhdGEoJ3Byb3BlcnR5JyksXG5cdFx0dmFsdWVcdFx0PSAkZmllbGQudmFsKCk7XG5cblx0dGhpcy5fZW1pdENoYW5nZSggcHJvcGVydHksIHZhbHVlICk7IFxufTtcblxuRW1iZWREZXRhaWxzVmlldy5wcm90b3R5cGUuX29uSW5wdXRCbHVyID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuXHR2YXIgJGZpZWxkIFx0XHQ9ICQoIGV2ZW50LnRhcmdldCApLFxuXHRcdHByb3BlcnR5XHQ9ICRmaWVsZC5kYXRhKCdwcm9wZXJ0eScpLFxuXHRcdHZhbHVlXHRcdD0gJGZpZWxkLnZhbCgpO1xuXG5cdHRoaXMuX2VtaXRDaGFuZ2UoIHByb3BlcnR5LCB2YWx1ZSApOyBcblxuXHRDb2x1bW5zQW5hbHl0aWNzLnNlbmQoe1xuXHRcdGNhdGVnb3J5OiAnZmllbGQnLFxuXHRcdGFjdGlvbjogJ2VkaXQnLFxuXHRcdGxhYmVsOiBwcm9wZXJ0eSxcblx0XHR0YWJsZV9pZDogdGhpcy50YWJsZS5pZFxuXHR9KTtcbn07XG5cbkVtYmVkRGV0YWlsc1ZpZXcucHJvdG90eXBlLl9vbkNvcHlDbGljayA9IGZ1bmN0aW9uKCBldmVudCApIHtcblx0Q29sdW1uc0FuYWx5dGljcy5zZW5kKHtcblx0XHRjYXRlZ29yeTogJ2J1dHRvbicsXG5cdFx0YWN0aW9uOiAnY2xpY2snLFxuXHRcdGxhYmVsOiAnY29weSBlbWJlZCBjb2RlJyxcblx0XHR0YWJsZV9pZDogdGhpcy50YWJsZS5pZFxuXHR9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRW1iZWREZXRhaWxzVmlldztcblxuIiwidmFyIENvbHVtbnNFdmVudCBcdD0gcmVxdWlyZSgnLi4vbW9kZWxzL0NvbHVtbnNFdmVudC5qcycpO1xuXG52YXIgRFJBR0dJTkdfQ0xBU1MgPSAnZHJhZ2dpbmcnLFxuXHRJTkFDVElWRV9DTEFTUyA9ICdpbmFjdGl2ZScsXG5cdFNFTEVDVEVEX0NMQVNTID0gJ3NlbGVjdGVkJyxcblx0SVRFTV9TRUxFQ1RPUiA9ICcubGF5b3V0LWNvbHVtbic7XG5cbi8vIE1hbmFnZSB0aGUgZGlzcGxheSBvZiBhIHNpbmdsZSBpdGVtXG4vLyB3aXRoaW4gdGhlIGxpc3Qgb2YgaXRlbXNcbkl0ZW1WaWV3ID0gZnVuY3Rpb24oIGl0ZW0gKSB7XG5cblx0dGhpcy5pdGVtID0gaXRlbSB8fCBuZXcgSXRlbSgpO1xuXHR0aGlzLnRlbXBsYXRlID0gQ29sdW1ucy5UZW1wbGF0ZXNbJ3RlbXBsYXRlcy9sYXlvdXQvY29sdW1uLmhicyddO1xuXHR0aGlzLnNlbGVjdGVkID0gZmFsc2U7XG5cdHRoaXMuJGl0ZW07XG59O1xuXG5JdGVtVmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oKSB7XG5cdHZhciAkaXRlbSA9ICQoIHRoaXMudGVtcGxhdGUoe1xuXHRcdHRpdGxlOiB0aGlzLml0ZW0uZm9ybWF0dGVkVGl0bGUoKSxcblx0XHRhY3RpdmU6IHRoaXMuaXRlbS5hY3RpdmUsXG5cdFx0c2VsZWN0ZWQ6IHRoaXMuc2VsZWN0ZWRcblx0fSkgKTtcblx0JGl0ZW0uZGF0YSgnc3R5bGUnLCB0aGlzLml0ZW0uc3R5bGUuc3R5bGVzKTtcblx0dGhpcy4kaXRlbSA9ICRpdGVtO1xuXG5cdHRoaXMuc2V0dXBFdmVudHMoKTtcblx0dGhpcy5fc2V0dXBFdmVudExpc3RlbmVycygpO1xuXG5cdHJldHVybiB0aGlzLiRpdGVtO1xufTtcblxuSXRlbVZpZXcucHJvdG90eXBlLnNldHVwRXZlbnRzID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gTWFrZSB0aGUgaXRlbSBkcmFnZ2FibGVcblx0dGhpcy4kaXRlbS5kcmFnZ2FibGUoe1xuXHRcdHJldmVydDogJ2ludmFsaWQnLFxuXHRcdHJldmVydER1cmF0aW9uOiAyMDAsXG5cdFx0aGVscGVyOiAnY2xvbmUnLFxuXHRcdC8vIG9wYWNpdHk6IC4yLFxuXHRcdGNhbmNlbDogJy5pbmFjdGl2ZSdcblx0fSk7XG5cblx0dGhpcy4kaXRlbS5vbiggJ2RyYWdzdGFydCcsICQucHJveHkoZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcblxuXHRcdC8vIE1ha2UgaW5hY3RpdmVcblx0XHQkKCBldmVudC50YXJnZXQgKS5hZGRDbGFzcyggRFJBR0dJTkdfQ0xBU1MgKTtcblxuXHRcdC8vIEFsZXJ0IGFueSBsaXN0ZW5lcnMgdGhhdCB0aGUgaXRlbSBoYXMgc3RhcnRlZCBkcmFnXG5cdFx0Ly8gdmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCAnQ29sdW1ucy5JdGVtVmlldy5JdGVtRGlkQmVnaW5EcmFnJywge1xuXHRcdC8vIFx0aXRlbTogXHR0aGlzLFxuXHRcdC8vIFx0ZXZlbnQ6IFx0ZXZlbnQsXG5cdFx0Ly8gXHR1aTogXHR1aVxuXHRcdC8vIH0pO1xuXHRcdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0XHQvLyBjb2x1bW5zRXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLkl0ZW1WaWV3Lkl0ZW1EaWRCZWdpbkRyYWcnLCBmYWxzZSwgZmFsc2UsIHtcblx0XHQvLyBcdGl0ZW06IFx0dGhpcyxcblx0XHQvLyBcdGV2ZW50OiBcdGV2ZW50LFxuXHRcdC8vIFx0dWk6IFx0dWlcblx0XHQvLyB9KTtcblx0XHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGNvbHVtbnNFdmVudCk7XG5cdFx0Q29sdW1uc0V2ZW50LnNlbmQoICdDb2x1bW5zLkl0ZW1WaWV3Lkl0ZW1EaWRCZWdpbkRyYWcnLCB7XG5cdFx0XHRpdGVtOiBcdHRoaXMsXG5cdFx0XHRldmVudDogXHRldmVudCxcblx0XHRcdHVpOiBcdHVpXG5cdFx0fSApXG5cblx0fSwgdGhpcykgKTtcblxuXHR0aGlzLiRpdGVtLm9uKCAnZHJhZ3N0b3AnLCAkLnByb3h5KGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XHRcdFxuXG5cdFx0Ly8gTWFrZSBhY3RpdmUgYWdhaW5cblx0XHQkKCBldmVudC50YXJnZXQgKS5yZW1vdmVDbGFzcyggRFJBR0dJTkdfQ0xBU1MgKTtcblxuXHRcdC8vIEFsZXJ0IGFueSBsaXN0ZW5lcnMgdGhhdCB0aGUgaXRlbSBoYXMgc3RhcnRlZCBkcmFnXG5cdFx0Ly8gdmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCAnQ29sdW1ucy5JdGVtVmlldy5JdGVtRGlkQkVuZERyYWcnLCB7XG5cdFx0Ly8gXHRpdGVtOiBcdHRoaXMsXG5cdFx0Ly8gXHRldmVudDogXHRldmVudCxcblx0XHQvLyBcdHVpOiBcdHVpXG5cdFx0Ly8gfSk7XG5cdFx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHRcdC8vIGNvbHVtbnNFdmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuSXRlbVZpZXcuSXRlbURpZEVuZERyYWcnLCBmYWxzZSwgZmFsc2UsIHtcblx0XHQvLyBcdGl0ZW06IFx0dGhpcyxcblx0XHQvLyBcdGV2ZW50OiBcdGV2ZW50LFxuXHRcdC8vIFx0dWk6IFx0dWlcblx0XHQvLyB9KTtcblx0XHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGNvbHVtbnNFdmVudCk7XG5cdFx0Q29sdW1uc0V2ZW50LnNlbmQoICdDb2x1bW5zLkl0ZW1WaWV3Lkl0ZW1EaWRFbmREcmFnJywge1xuXHRcdFx0aXRlbTogXHR0aGlzLFxuXHRcdFx0ZXZlbnQ6IFx0ZXZlbnQsXG5cdFx0XHR1aTogXHR1aVxuXHRcdH0gKVxuXG5cdH0sIHRoaXMpICk7XG5cblx0dGhpcy4kaXRlbS5vbiggJ2RyYWcnLCAkLnByb3h5KGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XG5cblx0XHQvLyBBbGVydCBhbnkgbGlzdGVuZXJzIHRoYXQgdGhlIGl0ZW0gaGFzIHN0YXJ0ZWQgZHJhZ1xuXHRcdC8vIHZhciBldmVudCA9IG5ldyBDdXN0b21FdmVudCggJ0NvbHVtbnMuSXRlbVZpZXcuSXRlbURpZERyYWcnLCB7XG5cdFx0Ly8gXHRpdGVtOiBcdHRoaXMsXG5cdFx0Ly8gXHRldmVudDogXHRldmVudCxcblx0XHQvLyBcdHVpOiBcdHVpXG5cdFx0Ly8gfSk7XG5cdFx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHRcdC8vIGNvbHVtbnNFdmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuSXRlbVZpZXcuSXRlbURpZERyYWcnLCBmYWxzZSwgZmFsc2UsIHtcblx0XHQvLyBcdGl0ZW06IFx0dGhpcyxcblx0XHQvLyBcdGV2ZW50OiBcdGV2ZW50LFxuXHRcdC8vIFx0dWk6IFx0dWlcblx0XHQvLyB9KTtcblx0XHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGNvbHVtbnNFdmVudCk7XG5cdFx0Q29sdW1uc0V2ZW50LnNlbmQoICdDb2x1bW5zLkl0ZW1WaWV3Lkl0ZW1EaWREcmFnJywge1xuXHRcdFx0aXRlbTogXHR0aGlzLFxuXHRcdFx0ZXZlbnQ6IFx0ZXZlbnQsXG5cdFx0XHR1aTogXHR1aVxuXHRcdH0gKVxuXG5cdH0sIHRoaXMpICk7XG5cblx0dGhpcy4kaXRlbS5vbiggJ2NsaWNrJywgJC5wcm94eShmdW5jdGlvbiggZXZlbnQgKSB7O1xuXG5cdFx0dGhpcy5fc2V0U2VsZWN0ZWQoIHRydWUgKTtcblxuXHRcdENvbHVtbnNFdmVudC5zZW5kKCAnQ29sdW1ucy5JdGVtVmlldy5JdGVtRGlkU2VsZWN0Jywge1xuXHRcdFx0aXRlbVZpZXc6IFx0dGhpcyxcblx0XHRcdGl0ZW06IFx0XHR0aGlzLml0ZW1cblx0XHR9ICk7XG5cblx0fSwgdGhpcyApICk7XG59O1xuXG5JdGVtVmlldy5wcm90b3R5cGUuX3NldFNlbGVjdGVkID0gZnVuY3Rpb24oIHNlbGVjdGVkICkge1xuXG5cdGlmICggc2VsZWN0ZWQgPT09IHRydWUgKSB7XG5cdFx0dGhpcy5zZWxlY3RlZCA9IHRydWU7XG5cdFx0dGhpcy4kaXRlbS5hZGRDbGFzcyggU0VMRUNURURfQ0xBU1MgKTtcblx0fSBlbHNlIGlmICggc2VsZWN0ZWQgPT09IGZhbHNlICkge1xuXHRcdHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcblx0XHR0aGlzLiRpdGVtLnJlbW92ZUNsYXNzKCBTRUxFQ1RFRF9DTEFTUyApO1xuXHR9XG59O1xuXG5JdGVtVmlldy5wcm90b3R5cGUuX3NldHVwRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBMaXN0ZW4gdG8gdmFsdWUgc2VsZWN0aW9uIGV2ZW50c1xuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLlRlbXBsYXRlVmFsdWVWaWV3LlZhbHVlRGlkU2VsZWN0V2l0aEl0ZW0nLCB0aGlzLl9vblZhbHVlVmlld1NlbGVjdGlvbi5iaW5kKCB0aGlzICkpO1xuXG5cdC8vIExpc3RlbiB0byBpdGVtIHZpZXcgc2VsZWN0aW9uIGV2ZW50c1xuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLkl0ZW1WaWV3Lkl0ZW1EaWRTZWxlY3QnLCB0aGlzLl9vbkl0ZW1TZWxlY3Rpb24uYmluZCggdGhpcyApKTtcdFxufTtcblxuSXRlbVZpZXcucHJvdG90eXBlLl9vblZhbHVlVmlld1NlbGVjdGlvbiA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblx0dmFyIGl0ZW0gPSBkYXRhLml0ZW07XG5cblx0aWYgKCB0aGlzLml0ZW0uaXMoIGl0ZW0gKSApIHtcblx0XHR0aGlzLl9zZXRTZWxlY3RlZCggdHJ1ZSApO1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMuX3NldFNlbGVjdGVkKCBmYWxzZSApO1xuXHR9XG59O1xuXG5JdGVtVmlldy5wcm90b3R5cGUuX29uSXRlbVNlbGVjdGlvbiA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblx0dmFyIGl0ZW0gPSBkYXRhLml0ZW07XG5cblx0aWYgKCAhdGhpcy5pdGVtLmlzKCBpdGVtICkgKSB7XG5cdFx0dGhpcy5fc2V0U2VsZWN0ZWQoIGZhbHNlICk7XG5cdH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSXRlbVZpZXc7IiwidmFyIENvbHVtbnNFdmVudCBcdD0gcmVxdWlyZSgnLi4vbW9kZWxzL0NvbHVtbnNFdmVudC5qcycpO1xudmFyIEl0ZW1WaWV3IFx0XHQ9IHJlcXVpcmUoJy4vSXRlbVZpZXcuanMnKTtcblxuLy8gTWFuYWdlIHRoZSBkaXNwbGF5IG9mIGEgbGlzdCBvZiBpdGVtc1xuSXRlbXNWaWV3ID0gZnVuY3Rpb24oIGl0ZW1zICkge1xuXG5cdHRoaXMuaXRlbXMgXHRcdD0gaXRlbXMgfHwgW107XG5cdHRoaXMudmlld3MgXHRcdD0gW107XG5cdHRoaXMudGVtcGxhdGUgXHQ9IENvbHVtbnMuVGVtcGxhdGVzWyd0ZW1wbGF0ZXMvbGF5b3V0L2NvbHVtbnMuaGJzJ107XG5cdHRoaXMuJGl0ZW1zO1xuXG5cdHRoaXMucmVuZGVyKCBpdGVtcyApO1xuXHR0aGlzLl9zZXR1cEV2ZW50TGlzdGVuZXJzKCk7XG59O1xuXG5JdGVtc1ZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgaXRlbVZpZXcsXG5cdFx0JGNvbHVtbnMgPSAkKCB0aGlzLnRlbXBsYXRlKCkgKTtcblxuXHQvLyBSZW1vdmUgYW55IGV4aXN0aW5nIGNvbHVtbnNcblx0JCgnLmxheW91dC1jb2x1bW5zJykucmVtb3ZlKCk7XG5cblx0aWYgKCB0aGlzLml0ZW1zICkge1xuXHRcdHRoaXMuaXRlbXMuZm9yRWFjaChmdW5jdGlvbiggaXRlbSwgaSApIHtcblxuXHRcdFx0aXRlbVZpZXcgPSB0aGlzLml0ZW1WaWV3Rm9ySXRlbSggaXRlbSApO1xuXHRcdFx0XG5cdFx0XHRpZiAoICFpdGVtVmlldyApIHtcblx0XHRcdFx0aXRlbVZpZXcgPSBuZXcgSXRlbVZpZXcoIGl0ZW0gKTtcblx0XHRcdFx0dGhpcy52aWV3cy5wdXNoKCBpdGVtVmlldyApO1xuXHRcdFx0fVxuXG5cdFx0XHQkY29sdW1ucy5hcHBlbmQoIGl0ZW1WaWV3LnJlbmRlcigpICk7XG5cblx0XHR9LmJpbmQoIHRoaXMgKSk7XG5cdH1cblxuXHQkKFwiI2NvbHVtbnNcIikuYXBwZW5kKCAkY29sdW1ucyApO1xuXG5cdC8vIHRoaXMuc2V0dXBEcmFnTGlzdGVuZXJzKCQodGhpcy5MQVlPVVRfQ09MVU1OX1NFTEVDVE9SKSk7XG5cdC8vIHRoaXMuc2V0dXBEcm9wTGlzdGVuZXJzKCk7XG5cblx0dGhpcy4kaXRlbXMgPSAkY29sdW1ucztcblx0cmV0dXJuIHRoaXMuJGl0ZW1zO1xufTtcblxuSXRlbXNWaWV3LnByb3RvdHlwZS5pdGVtVmlld0Zvckl0ZW0gPSBmdW5jdGlvbiggaXRlbSApIHtcblx0dmFyIGl0ZW1WaWV3O1xuXG5cdGlmICggaXRlbSBpbnN0YW5jZW9mIEl0ZW0gJiYgdGhpcy52aWV3cy5sZW5ndGggKSB7XG5cdFx0aXRlbVZpZXcgPSB0aGlzLnZpZXdzLmZpbHRlcihmdW5jdGlvbiggdmlldywgaSApIHtcblx0XHRcdHJldHVybiB2aWV3Lml0ZW0udGl0bGUgPT09IGl0ZW0udGl0bGU7XG5cdFx0fS5iaW5kKCB0aGlzICkgKVsgMCBdO1xuXHR9XG5cblx0cmV0dXJuIGl0ZW1WaWV3O1xufTtcblxuSXRlbXNWaWV3LnByb3RvdHlwZS51cGRhdGVJdGVtID0gZnVuY3Rpb24oIGl0ZW0gKSB7XG5cblx0Ly8gUmUtcmVuZGVyIHRoZSBpdGVtXG5cdHRoaXMuaXRlbXMuZm9yRWFjaChmdW5jdGlvbiggb2xkSXRlbSwgaSApIHtcblxuXHRcdGlmICggb2xkSXRlbS5pcyggaXRlbSApICkge1xuXHRcdFx0dmFyIGl0ZW1WaWV3ID0gdGhpcy5pdGVtVmlld0Zvckl0ZW0oIGl0ZW0gKTtcblx0XHRcdHRoaXMuJGl0ZW1zLmZpbmQoJy5sYXlvdXQtY29sdW1uJykuZXEoIGkgKS5yZXBsYWNlV2l0aCggaXRlbVZpZXcucmVuZGVyKCkgKTtcblx0XHR9XG5cblx0fS5iaW5kKCB0aGlzICkgKTtcblxuXHR0aGlzLl9lbWl0Q2hhbmdlKCk7XG59O1xuXG5JdGVtc1ZpZXcucHJvdG90eXBlLl9lbWl0Q2hhbmdlID0gZnVuY3Rpb24oKSB7XG5cdC8vIExldCBldmVyeW9uZSBrbm93IHRoYXQgdGhlIGl0ZW1zIHZpZXcgaGFzIGNoYW5nZWRcblx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHQvLyBjb2x1bW5zRXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLkl0ZW1zVmlldy5EaWRDaGFuZ2UnLCBmYWxzZSwgZmFsc2UsIHtcblx0Ly8gXHRpdGVtc1ZpZXc6IFx0dGhpc1xuXHQvLyB9KTtcblx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjb2x1bW5zRXZlbnQpO1xuXHRDb2x1bW5zRXZlbnQuc2VuZCggJ0NvbHVtbnMuSXRlbXNWaWV3LkRpZENoYW5nZScsIHtcblx0XHRpdGVtc1ZpZXc6IFx0dGhpc1xuXHR9KTtcblxufTtcblxuSXRlbXNWaWV3LnByb3RvdHlwZS5fc2V0dXBFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uKCkge1xuXG5cdC8vIExpc3RlbiBmb3IgdGFibGUgdXBkYXRlc1xuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLlRhYmxlLkRpZENoYW5nZScsIHRoaXMuX29uVGFibGVDaGFuZ2UuYmluZCggdGhpcyApICk7XG5cblx0Ly8gTGlzdGVuIGZvciBpdGVtIHVwZGF0ZXNcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5JdGVtLkRpZENoYW5nZScsIHRoaXMuX29uSXRlbUNoYW5nZS5iaW5kKCB0aGlzICkgKTtcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5JdGVtLkFjdGl2ZVN0YXRlRGlkQ2hhbmdlJywgdGhpcy5fb25JdGVtQ2hhbmdlLmJpbmQoIHRoaXMgKSApO1xufTtcblxuSXRlbXNWaWV3LnByb3RvdHlwZS5fb25UYWJsZUNoYW5nZSA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblxuXHR0aGlzLl91cGRhdGVXaXRoSXRlbXMoIGRhdGEudGFibGUuY29sdW1ucyApO1xuXHR0aGlzLnJlbmRlcigpO1xufTtcblxuSXRlbXNWaWV3LnByb3RvdHlwZS5fb25JdGVtQ2hhbmdlID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXHR0aGlzLnVwZGF0ZUl0ZW0oIGRhdGEuaXRlbSApO1xufTtcblxuSXRlbXNWaWV3LnByb3RvdHlwZS5fdXBkYXRlV2l0aEl0ZW1zID0gZnVuY3Rpb24oIGl0ZW1zICkge1xuXG5cdGlmKCBpdGVtcyApIHtcblxuXHRcdGlmICggQXJyYXkuaXNBcnJheSggaXRlbXMgKSApIHtcblxuXHRcdFx0aXRlbXMuZm9yRWFjaChmdW5jdGlvbiggaXRlbSApIHtcblx0XHRcdFx0dGhpcy5fdXBkYXRlV2l0aEl0ZW0oIGl0ZW0gKTtcblx0XHRcdH0uYmluZCggdGhpcyApKTtcblxuXHRcdFx0dGhpcy5fZW1pdENoYW5nZSgpO1xuXG5cdFx0fSBlbHNlIHtcblx0XHRcdHRocm93IFwiZXhjZXB0aW9uIEl0ZW1zIG11c3QgYmUgYXJyYXkgb2YgaXRlbXMgb3Igc2luZ2xlIGl0ZW1cIjtcblx0XHR9XG5cdH1cbn07XG5cbkl0ZW1zVmlldy5wcm90b3R5cGUuX3VwZGF0ZVdpdGhJdGVtID0gZnVuY3Rpb24oIGl0ZW0gKSB7XG5cdHZhciBkdXBsaWNhdGVzID0gW107XG5cblx0aWYgKCBpdGVtICYmIGl0ZW0gaW5zdGFuY2VvZiBJdGVtICkge1xuXHRcdGR1cGxpY2F0ZXMgPSB0aGlzLml0ZW1zLmZpbHRlcihmdW5jdGlvbiggZXhpc3RpbmdJdGVtICkge1xuXHRcdFx0cmV0dXJuIGV4aXN0aW5nSXRlbS5pcyggaXRlbSApO1xuXHRcdH0pO1xuXG5cdFx0aWYgKCAhZHVwbGljYXRlcy5sZW5ndGggKSB7XG5cdFx0XHR0aGlzLml0ZW1zLnB1c2goIGl0ZW0gKTtcblx0XHR9XG5cdH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSXRlbXNWaWV3OyIsInZhciBSZWdpc3RlclZpZXcgXHQ9IHJlcXVpcmUoJy4vUmVnaXN0ZXJWaWV3LmpzJyk7XG52YXIgVGhhbmtzVmlldyBcdFx0PSByZXF1aXJlKCcuL1RoYW5rc1ZpZXcuanMnKTtcblxuZnVuY3Rpb24gTW9iaWxlVmlldygpIHtcblx0dGhpcy5yZWdpc3RlciA9IG5ldyBSZWdpc3RlclZpZXcoKTtcblx0dGhpcy50aGFua3MgPSBuZXcgVGhhbmtzVmlldygpO1xufVxuXG5Nb2JpbGVWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbigpIHtcblxuXHQkKCcjYXBwJykuYWRkQ2xhc3MoJ21vYmlsZScpO1xuXHR0aGlzLiRtb2JpbGUgPSAkKFwiI2FwcC5tb2JpbGVcIik7XG5cblx0dGhpcy4kbW9iaWxlLmFwcGVuZCggdGhpcy5yZWdpc3Rlci5yZW5kZXIoKSApO1xuXHR0aGlzLiRtb2JpbGUuYXBwZW5kKCB0aGlzLnRoYW5rcy5yZW5kZXIoKSApO1xuXG5cdC8vIHRoaXMuX3NldHVwQW5hbHl0aWNzKCk7XG5cdC8vIHRoaXMuX2VtaXRSZW5kZXIoKTtcblxuXHRyZXR1cm4gdGhpcy4kbW9iaWxlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBNb2JpbGVWaWV3OyIsInZhciBDb2x1bW5zRXZlbnQgXHQ9IHJlcXVpcmUoJy4uL21vZGVscy9Db2x1bW5zRXZlbnQuanMnKTtcbnZhciBURU1QTEFURSBcdFx0PSBDb2x1bW5zLlRlbXBsYXRlc1sndGVtcGxhdGVzL3JlZ2lzdGVyLmhicyddLFxuXHRFUlJPUl9DTEFTUyBcdD0gJ2Vycm9yJztcblxuZnVuY3Rpb24gUmVnaXN0ZXJWaWV3KCkge1xuXG59XG5cblJlZ2lzdGVyVmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oKSB7XG5cblx0dGhpcy4kcmVnaXN0ZXIgPSAkKCBURU1QTEFURSgpICk7XG5cblx0dGhpcy5fc2V0dXBJbnRlcmFjdGlvbkV2ZW50cygpO1xuXHRyZXR1cm4gdGhpcy4kcmVnaXN0ZXI7XG59O1xuXG5SZWdpc3RlclZpZXcucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbigpIHtcblx0dGhpcy4kcmVnaXN0ZXIudmVsb2NpdHkoe1xuXHRcdG9wYWNpdHk6IDFcblx0fSwge1xuXHRcdGR1cmF0aW9uOiAyMDAsXG5cdFx0ZWFzaW5nOiAnZWFzZS1vdXQnLFxuXHRcdGJlZ2luOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuJHJlZ2lzdGVyLmFkZENsYXNzKCdhbmltYXRpbmcnKTtcblx0XHR9LmJpbmQoIHRoaXMgKSxcblx0XHRjb21wbGV0ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLiRyZWdpc3Rlci5yZW1vdmVDbGFzcygnYW5pbWF0aW5nJyk7XG5cdFx0XHR0aGlzLiRyZWdpc3Rlci5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdFx0fS5iaW5kKCB0aGlzIClcblx0fSk7XG59O1xuXG5SZWdpc3RlclZpZXcucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbigpIHtcblx0dGhpcy4kcmVnaXN0ZXIudmVsb2NpdHkoe1xuXHRcdG9wYWNpdHk6IDBcblx0fSwge1xuXHRcdGR1cmF0aW9uOiAyMDAsXG5cdFx0ZWFzaW5nOiAnZWFzZS1pbicsXG5cdFx0YmVnaW46IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy4kcmVnaXN0ZXIuYWRkQ2xhc3MoJ2FuaW1hdGluZycpO1xuXHRcdH0uYmluZCggdGhpcyApLFxuXHRcdGNvbXBsZXRlOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuJHJlZ2lzdGVyLnJlbW92ZUNsYXNzKCdhbmltYXRpbmcnKTtcblx0XHRcdHRoaXMuJHJlZ2lzdGVyLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHR9LmJpbmQoIHRoaXMgKVxuXHR9KTtcbn07XG5cblJlZ2lzdGVyVmlldy5wcm90b3R5cGUuaXNFbWFpbFZhbGlkID0gZnVuY3Rpb24oKSB7XG5cdHZhciB2YWx1ZSA9IHRoaXMuJHJlZ2lzdGVyLmZpbmQoJy5jb2x1bW5zLXJlZ2lzdGVyLWVtYWlsLWlucHV0IGlucHV0JykudmFsKCksXG5cdFx0cmUgPSAvXFxTK0BcXFMrXFwuXFxTKy87XG5cblx0cmV0dXJuIHJlLnRlc3QoIHZhbHVlICk7XG59O1xuXG5SZWdpc3RlclZpZXcucHJvdG90eXBlLnNldEVtYWlsRXJyb3IgPSBmdW5jdGlvbiggZXJyb3IgKSB7XG5cdHZhciAkZmllbGQgPSB0aGlzLiRyZWdpc3Rlci5maW5kKCcuY29sdW1ucy1yZWdpc3Rlci1lbWFpbC1pbnB1dCcpO1xuXG5cdCRmaWVsZC5yZW1vdmVDbGFzcyggRVJST1JfQ0xBU1MgKTtcblxuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdGlmICggZXJyb3IgKSB7XG5cdFx0XHQvLyBSZW1vdmUgYW5kIGFkZCBhZ2FpbiBzbyB3ZVxuXHRcdFx0Ly8gZW5zdXJlIGEgc2hha2Ugb2NjdXJzXG5cdFx0XHQkZmllbGQuYWRkQ2xhc3MoIEVSUk9SX0NMQVNTICk7XG5cdFx0fVxuXHR9LCAwKTtcbn1cblxuUmVnaXN0ZXJWaWV3LnByb3RvdHlwZS5fc2V0dXBJbnRlcmFjdGlvbkV2ZW50cyA9IGZ1bmN0aW9uKCkge1xuXG5cdC8vIExpc3RlbiB0byB0YXBzIG9uIHRoZSByZWdpc3RlciBidXR0b25cblx0dGhpcy4kcmVnaXN0ZXIuZmluZCgnLmNvbHVtbnMtcmVnaXN0ZXItYnV0dG9uJykub24oICdjbGljaycsIHRoaXMuX29uUmVnaXN0cmF0aW9uVGFwLmJpbmQoIHRoaXMgKSApO1xufTtcblxuUmVnaXN0ZXJWaWV3LnByb3RvdHlwZS5fb25SZWdpc3RyYXRpb25UYXAgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG5cblx0aWYgKCB0aGlzLmlzRW1haWxWYWxpZCgpICkge1xuXHRcdHRoaXMuc2V0RW1haWxFcnJvciggZmFsc2UgKTtcblx0XHR0aGlzLl9vblJlZ2lzdHJhdGlvblN1Y2Nlc3MoKTtcblx0fSBlbHNlIHtcblx0XHR0aGlzLnNldEVtYWlsRXJyb3IoIHRydWUgKTtcblx0fVxufTtcblxuUmVnaXN0ZXJWaWV3LnByb3RvdHlwZS5fb25SZWdpc3RyYXRpb25TdWNjZXNzID0gZnVuY3Rpb24oKSB7XG5cblx0dGhpcy5oaWRlKCk7XG5cblx0Q29sdW1uc0V2ZW50LnNlbmQoICdDb2x1bW5zLlJlZ2lzdGVyVmlldy5EaWRSZWdpc3RlcldpdGhTdWNjZXNzJywge1xuXHRcdHJlZ2lzdGVyVmlldzogdGhpc1xuXHR9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVnaXN0ZXJWaWV3OyIsInZhciBDb2x1bW5zRXZlbnQgXHRcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoJy4uL21vZGVscy9Db2x1bW5zRXZlbnQuanMnKTtcbnZhciBTdHlsZUlucHV0VmlldyBcdFx0XHRcdFx0XHRcdD0gcmVxdWlyZSgnLi9TdHlsZUlucHV0Vmlldy5qcycpO1xudmFyIFN0eWxlU2VnbWVudGVkQnV0dG9uVmlldyBcdFx0XHRcdD0gcmVxdWlyZSgnLi9TdHlsZVNlZ21lbnRlZEJ1dHRvblZpZXcuanMnKTtcbnZhciBTdHlsZU11bHRpcGxlU2VnbWVudGVkQnV0dG9uVmlldyBcdFx0PSByZXF1aXJlKCcuL1N0eWxlTXVsdGlwbGVTZWdtZW50ZWRCdXR0b25WaWV3LmpzJyk7XG5cbnZhciBDT01QT05FTlRfVEVNUExBVEUgXHQ9IENvbHVtbnMuVGVtcGxhdGVzWyd0ZW1wbGF0ZXMvc3R5bGluZy9jb21wb25lbnQuaGJzJ10sXG5cdFNFQ1RJT05fVEVNUExBVEVcdD0gQ29sdW1ucy5UZW1wbGF0ZXNbJ3RlbXBsYXRlcy9zdHlsaW5nL2NvbXBvbmVudC1zZWN0aW9uLmhicyddLFxuXHRST1dfVEVNUExBVEVcdFx0PSBDb2x1bW5zLlRlbXBsYXRlc1sndGVtcGxhdGVzL3N0eWxpbmcvY29tcG9uZW50LXNlY3Rpb24tcm93LmhicyddO1xuXG5mdW5jdGlvbiBTdHlsZUNvbXBvbmVudFZpZXcoIHNlbGVjdGlvbiApIHtcblxuXHR0aGlzLml0ZW0gPSBzZWxlY3Rpb247XG5cdC8vIHRoaXMuaXRlbSA9IHNlbGVjdGlvbiA/IHRoaXMuZ2V0SXRlbUZvclNlbGVjdGlvbiggc2VsZWN0aW9uICkgOiB1bmRlZmluZWQ7XG5cdC8vIHRoaXMudGVtcGxhdGVHcm91cHMgPSB0aGlzLml0ZW0gPyBUZW1wbGF0ZVZpZXcuZ2V0R3JvdXBzRm9ySXRlbSggdGhpcy5pdGVtICkgOiBbXTtcbn1cblxuLy8gU3R5bGVDb21wb25lbnRWaWV3LnByb3RvdHlwZS5nZXRJdGVtRm9yU2VsZWN0aW9uID0gZnVuY3Rpb24oIHNlbGVjdGlvbiApIHtcblxuLy8gXHRpZiggc2VsZWN0aW9uIGluc3RhbmNlb2YgSXRlbSApIHtcbi8vIFx0XHRyZXR1cm4gc2VsZWN0aW9uO1xuLy8gXHR9IGVsc2UgaWYgKCBzZWxlY3Rpb24gaW5zdGFuY2VvZiBJdGVtVmlldyApIHtcbi8vIFx0XHRyZXR1cm4gc2VsZWN0aW9uLml0ZW07XG4vLyBcdH0gZWxzZSBpZiAoIHNlbGVjdGlvbiBpbnN0YW5jZW9mIFRlbXBsYXRlVmFsdWVWaWV3ICkge1xuLy8gXHRcdHJldHVybiBzZWxlY3Rpb24uaXRlbTtcbi8vIFx0fSBlbHNlIGlmICggc2VsZWN0aW9uIGluc3RhbmNlb2YgVGVtcGxhdGVHcm91cFZpZXcgKSB7XG4vLyBcdFx0cmV0dXJuIHNlbGVjdGlvbjtcbi8vIFx0fSBlbHNlIHtcbi8vIFx0XHR0aHJvdyBcImV4Y2VwdGlvbjogU2VsZWN0aW9uIG11c3QgYmUgYW4gSXRlbSwgSXRlbVZpZXcsIFRlbXBsYXRlVmFsdWVWaWV3IG9yIFRlbXBsYXRlR3JvdXBWaWV3XCI7XG4vLyBcdH1cbi8vIH07XG5cbi8vIFN0eWxlQ29tcG9uZW50Vmlldy5wcm90b3R5cGUuZ2V0VGVtcGxhdGVzRm9ySXRlbSA9IGZ1bmN0aW9uKCBpdGVtICkge1xuLy8gXHQvLyB2YXIgXG4vLyB9O1xuXG5TdHlsZUNvbXBvbmVudFZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKCkge1xuXG5cdC8vIEdldCB0aGUgYXBwcm9wcmlhdGUgZGF0YSBmb3IgdGhlIGN1cnJlbnQgaXRlbVxuXHR2YXIgdHlwZSA9IHRoaXMuaXRlbSBpbnN0YW5jZW9mIFRlbXBsYXRlR3JvdXBWaWV3ID8gJ2dyb3VwJyA6ICd0ZXh0Jyxcblx0XHR0aXRsZSA9IHRoaXMuaXRlbSBpbnN0YW5jZW9mIFRlbXBsYXRlR3JvdXBWaWV3ID8gdGhpcy5pdGVtLnRpdGxlKCkgOiB0aGlzLml0ZW0uZm9ybWF0dGVkVGl0bGUoKSxcblx0XHRjb21wb25lbnREYXRhID0gQ29sdW1ucy5zdHlsZURhdGEudHlwZXNbdHlwZV0sXG5cdFx0JGNvbXBvbmVudCxcblx0XHQkY29tcG9uZW50Qm9keSxcblx0XHQkc2VjdGlvbjtcblxuXHQvLyBGaXJzdCBjcmVhdGUgdGhlIGNvbXBvbmVudCBza2VsZXRvblxuXHQkY29tcG9uZW50ID0gJCggQ09NUE9ORU5UX1RFTVBMQVRFKHtcblx0XHR0eXBlOiB0eXBlLFxuXHRcdG5hbWU6IHRpdGxlXG5cdH0pICk7XG5cblx0JGNvbXBvbmVudEJvZHkgPSAkY29tcG9uZW50LmZpbmQoJy5zdHlsZS1jb21wb25lbnQtYm9keScpO1xuXG5cdC8vIE5leHQsIGxvb3AgdGhyb3VnaCB0aGUgZGF0YVxuXHQvLyBjcmVhdGluZyB0aGUgc2VjdGlvbnMgZnJvbSB0aGUgaW5zaWRlIG91dFxuXHRjb21wb25lbnREYXRhLmZvckVhY2goZnVuY3Rpb24oIHNlY3Rpb24sIGkgKSB7XG5cdFx0JHNlY3Rpb24gPSB0aGlzLl9yZW5kZXJTZWN0aW9uKCBzZWN0aW9uICk7XG5cdFx0JGNvbXBvbmVudEJvZHkuYXBwZW5kKCAkc2VjdGlvbiApO1xuXHR9LmJpbmQoIHRoaXMgKSApO1xuXG5cdHRoaXMuJHN0eWxlID0gJGNvbXBvbmVudDtcblx0dGhpcy5fc2V0dXBFdmVudExpc3RlbmVycygpO1xuXG5cdGlmICggdGhpcy5pdGVtIGluc3RhbmNlb2YgVGVtcGxhdGVHcm91cFZpZXcgKSB7XG5cdFx0dGhpcy51cGRhdGVBbGlnbm1lbnRCdXR0b25zKCB0aGlzLml0ZW0uZ2V0U3R5bGUoJ2ZsZXgtZGlyZWN0aW9uJykgKTtcblx0fVxuXG5cdHJldHVybiB0aGlzLiRzdHlsZTtcbn07XG5cblN0eWxlQ29tcG9uZW50Vmlldy5wcm90b3R5cGUuX3JlbmRlclNlY3Rpb24gPSBmdW5jdGlvbiggc2VjdGlvbiApIHtcblx0dmFyICRzZWN0aW9uLFxuXHRcdCRzZWN0aW9uUm93cyxcblx0XHQkcm93O1xuXG5cdCRzZWN0aW9uID0gJCggU0VDVElPTl9URU1QTEFURSh7XG5cdFx0dGl0bGU6IHNlY3Rpb24udGl0bGVcblx0fSkgKTtcblxuXHQkc2VjdGlvblJvd3MgPSAkc2VjdGlvbi5maW5kKCcuc3R5bGUtY29tcG9uZW50LXNlY3Rpb24tcm93cycpO1xuXG5cdC8vIExvb3AgdGhyb3VnaCBlYWNoIHNlY3Rpb24sXG5cdC8vIGNyZWF0aW5nIHJvd3MgZnJvbSB0aGUgaW5zaWRlIG91dFxuXHRzZWN0aW9uLnJvd3MuZm9yRWFjaChmdW5jdGlvbiggcm93LCBpKSB7XG5cdFx0JHJvdyA9IHRoaXMuX3JlbmRlclJvdyggcm93ICk7XG5cdFx0JHNlY3Rpb25Sb3dzLmFwcGVuZCggJHJvdyApO1xuXHR9LmJpbmQoIHRoaXMgKSApO1xuXG5cdHJldHVybiAkc2VjdGlvbjtcbn07XG5cblN0eWxlQ29tcG9uZW50Vmlldy5wcm90b3R5cGUuX3JlbmRlclJvdyA9IGZ1bmN0aW9uKCByb3cgKSB7XG5cdHZhciAkcm93LFxuXHRcdCRpdGVtO1xuXG5cdCRyb3cgPSAkKCBST1dfVEVNUExBVEUoKSApO1xuXG5cdC8vIExvb3AgdGhyb3VnaCBlYWNoIGl0ZW0sXG5cdC8vIHJlbmRlcmluZyBpdCBwcm9wZXJseSBkZXBlbmRpbmcgb24gaXRzIHR5cGVcblx0cm93Lml0ZW1zLmZvckVhY2goZnVuY3Rpb24oIGl0ZW0sIGkgKSB7XG5cdFx0JGl0ZW0gPSB0aGlzLl9yZW5kZXJJdGVtKCBpdGVtICk7XG5cdFx0JHJvdy5hcHBlbmQoICRpdGVtICk7XG5cdH0uYmluZCggdGhpcyApICk7XG5cblx0cmV0dXJuICRyb3c7XG5cbn07XG5cblN0eWxlQ29tcG9uZW50Vmlldy5wcm90b3R5cGUuX3JlbmRlckl0ZW0gPSBmdW5jdGlvbiggaXRlbSApIHtcblx0dmFyIGl0ZW07XG5cblx0aWYgKCBpdGVtLmtpbmQgPT09ICdpbnB1dCcgKSB7XG5cblx0XHRpdGVtID0gbmV3IFN0eWxlSW5wdXRWaWV3KHtcblx0XHRcdGl0ZW06IHRoaXMuaXRlbSxcblx0XHRcdHVuaXQ6IGl0ZW0udW5pdCxcblx0XHRcdHR5cGU6IGl0ZW0udHlwZSxcblx0XHRcdGNhbkJlTmVnYXRpdmU6IGl0ZW0uY2FuQmVOZWdhdGl2ZSxcblx0XHRcdGFwcGVuZENvbnRyb2xzOiBpdGVtLmFwcGVuZENvbnRyb2xzLFxuXHRcdFx0cHJlcGVuZEljb246IGl0ZW0ucHJlcGVuZEljb24sXG5cdFx0XHRsYWJlbDogaXRlbS5sYWJlbCxcblx0XHRcdHByb3BlcnR5OiBpdGVtLnByb3BlcnR5LFxuXHRcdFx0dmFsdWU6IHRoaXMuaXRlbS5nZXRTdHlsZSggaXRlbS5wcm9wZXJ0eSApIHx8IGl0ZW0uZGVmYXVsdFxuXHRcdH0pO1xuXHRcdHJldHVybiBpdGVtLnJlbmRlcigpO1xuXG5cdH0gZWxzZSBpZiAoIGl0ZW0ua2luZCA9PT0gJ3NlZ21lbnRlZC1idXR0b24nICkge1xuXG5cdFx0aXRlbSA9IG5ldyBTdHlsZVNlZ21lbnRlZEJ1dHRvblZpZXcoe1xuXHRcdFx0aXRlbTogdGhpcy5pdGVtLFxuXHRcdFx0bGFiZWw6IGl0ZW0ubGFiZWwsXG5cdFx0XHRwcm9wZXJ0eTogaXRlbS5wcm9wZXJ0eS5uYW1lLFxuXHRcdFx0YnV0dG9uczogaXRlbS5idXR0b25zLFxuXHRcdFx0dmFsdWU6IHRoaXMuaXRlbS5nZXRTdHlsZSggaXRlbS5wcm9wZXJ0eS5uYW1lICkgfHwgaXRlbS5wcm9wZXJ0eS5kZWZhdWx0XG5cdFx0fSk7XG5cdFx0cmV0dXJuIGl0ZW0ucmVuZGVyKCk7XG5cblx0fSBlbHNlIGlmICggaXRlbS5raW5kID09PSAnbXVsdGlwbGUtc2VnbWVudGVkLWJ1dHRvbicgKSB7XG5cblx0XHRpdGVtID0gbmV3IFN0eWxlTXVsdGlwbGVTZWdtZW50ZWRCdXR0b25WaWV3KHtcblx0XHRcdGl0ZW06IHRoaXMuaXRlbSxcblx0XHRcdGxhYmVsOiBpdGVtLmxhYmVsLFxuXHRcdFx0YnV0dG9uczogaXRlbS5idXR0b25zLm1hcChmdW5jdGlvbiggYnV0dG9uLCBpICkge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGljb246IGJ1dHRvbi5pY29uLFxuXHRcdFx0XHRcdHByb3BlcnR5OiBidXR0b24ucHJvcGVydHkubmFtZSxcblx0XHRcdFx0XHR2YWx1ZXM6IHtcblx0XHRcdFx0XHRcdGFjdGl2ZTogYnV0dG9uLnZhbHVlcy5hY3RpdmUsXG5cdFx0XHRcdFx0XHRpbmFjdGl2ZTogYnV0dG9uLnZhbHVlcy5pbmFjdGl2ZSxcblx0XHRcdFx0XHRcdGN1cnJlbnQ6IHRoaXMuaXRlbS5nZXRTdHlsZSggYnV0dG9uLnByb3BlcnR5Lm5hbWUgKSB8fCBidXR0b24udmFsdWVzLmRlZmF1bHRcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cdFx0XHR9LmJpbmQoIHRoaXMgKSlcblx0XHR9KTtcblx0XHRyZXR1cm4gaXRlbS5yZW5kZXIoKTtcblxuXHR9IGVsc2Uge1xuXHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdH1cbn07XG5cblN0eWxlQ29tcG9uZW50Vmlldy5wcm90b3R5cGUuX3NldHVwRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBMaXN0ZW4gZm9yIGlucHV0IHVwZGF0ZXNcblx0Ly8gaWYgdGhpcyBpcyBmb3IgYSBncm91cFxuXHRpZiAoIHRoaXMuaXRlbSBpbnN0YW5jZW9mIFRlbXBsYXRlR3JvdXBWaWV3ICkge1xuXHRcdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuU3R5bGVTZWdtZW50ZWRCdXR0b25WaWV3LlZhbHVlRGlkVXBkYXRlRm9yUHJvcGVydHlBbmRJdGVtJywgdGhpcy5fb25TdHlsZVVwZGF0ZS5iaW5kKCB0aGlzICkpO1xuXHR9XG59O1xuXG5TdHlsZUNvbXBvbmVudFZpZXcucHJvdG90eXBlLl9vblN0eWxlVXBkYXRlID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXG5cdC8vIElmIHRoaXMgaXMgYSBjaGFuZ2UgZm9yIHRoZSBmbGV4LWRpcmVjdGlvbiBwcm9wZXJ0eSxcblx0Ly8gdXBkYXRlIHRoZSBjbGFzc2VzIG9uIHRoZSBhbGlnbm1lbnQgYnV0dG9uc1xuXHRpZiAoIGRhdGEuaXRlbSA9PT0gdGhpcy5pdGVtICYmIGRhdGEucHJvcGVydHkgPT09ICdmbGV4LWRpcmVjdGlvbicgKSB7XG5cdFx0dGhpcy51cGRhdGVBbGlnbm1lbnRCdXR0b25zKCBkYXRhLnZhbHVlICk7XG5cdH1cbn07XG5cblN0eWxlQ29tcG9uZW50Vmlldy5wcm90b3R5cGUudXBkYXRlQWxpZ25tZW50QnV0dG9ucyA9IGZ1bmN0aW9uKCBkaXJlY3Rpb24gKSB7XG5cdHZhciAkYnV0dG9ucyA9IHRoaXMuJHN0eWxlLmZpbmQoJ1tkYXRhLXByb3BlcnR5PVwiYWxpZ24taXRlbXNcIl0nKTtcblxuXHRpZiAoIGRpcmVjdGlvbiA9PT0gJ2NvbHVtbicgKSB7XG5cdFx0JGJ1dHRvbnMuYWRkQ2xhc3MoJ2NvbHVtbicpO1xuXHRcdCRidXR0b25zLnJlbW92ZUNsYXNzKCdyb3cnKTtcblx0fSBlbHNlIHtcblx0XHQkYnV0dG9ucy5hZGRDbGFzcygncm93Jyk7XG5cdFx0JGJ1dHRvbnMucmVtb3ZlQ2xhc3MoJ2NvbHVtbicpO1xuXHR9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU3R5bGVDb21wb25lbnRWaWV3OyIsInZhciBDb2x1bW5zRXZlbnQgPSByZXF1aXJlKCcuLi9tb2RlbHMvQ29sdW1uc0V2ZW50LmpzJyk7XG5cbmZ1bmN0aW9uIFN0eWxlSW5wdXRWaWV3KCBvcHRpb25zICkge1xuXHRcblx0dGhpcy50eXBlID0gJ3RlbCc7XG5cdHRoaXMudW5pdCA9ICcnO1xuXHR0aGlzLmNhbkJlTmVnYXRpdmUgPSB0cnVlO1xuXHR0aGlzLmNhbkJlRGVjaW1hbCA9IGZhbHNlO1xuXHR0aGlzLnByb3BlcnR5ID0gdW5kZWZpbmVkO1xuXHR0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuXHR0aGlzLnByZXBlbmRJY29uID0gdW5kZWZpbmVkO1xuXHR0aGlzLmFwcGVuZENvbnRyb2xzID0gZmFsc2U7XG5cdHRoaXMubGFiZWwgPSAnJztcblx0dGhpcy5pdGVtID0gdW5kZWZpbmVkO1xuXG5cdGlmICggb3B0aW9ucyApIHtcblx0XHR0aGlzLnVuaXQgPSBvcHRpb25zLnVuaXQgfHwgdGhpcy51bml0O1xuXHRcdHRoaXMudHlwZSA9IG9wdGlvbnMudHlwZSB8fCB0aGlzLnR5cGU7XG5cdFx0dGhpcy5jYW5CZU5lZ2F0aXZlID0gb3B0aW9ucy5jYW5CZU5lZ2F0aXZlID09PSBmYWxzZSA/IGZhbHNlIDogdGhpcy5jYW5CZU5lZ2F0aXZlO1xuXHRcdHRoaXMuY2FuQmVEZWNpbWFsID0gb3B0aW9ucy5jYW5CZURlY2ltYWwgPT09IHRydWUgPyB0cnVlIDogdGhpcy5jYW5CZURlY2ltYWw7XG5cdFx0dGhpcy5wcm9wZXJ0eSA9IG9wdGlvbnMucHJvcGVydHkgfHwgdGhpcy5wcm9wZXJ0eTtcblx0XHR0aGlzLnZhbHVlID0gdGhpcy5mb3JtYXRWYWx1ZSggb3B0aW9ucy52YWx1ZSApIHx8IHRoaXMudmFsdWU7XG5cdFx0dGhpcy5wcmVwZW5kSWNvbiA9IG9wdGlvbnMucHJlcGVuZEljb24gfHwgdGhpcy5wcmVwZW5kSWNvbjtcblx0XHR0aGlzLmFwcGVuZENvbnRyb2xzID0gb3B0aW9ucy5hcHBlbmRDb250cm9scyA9PT0gdHJ1ZSA/IHRydWUgOiB0aGlzLmFwcGVuZENvbnRyb2xzO1xuXHRcdHRoaXMubGFiZWwgPSBvcHRpb25zLmxhYmVsIHx8IHRoaXMubGFiZWw7XG5cdFx0dGhpcy5pdGVtID0gb3B0aW9ucy5pdGVtIHx8IHRoaXMuaXRlbTtcblx0fVxuXG5cdHRoaXMudGVtcGxhdGUgPSBDb2x1bW5zLlRlbXBsYXRlc1sndGVtcGxhdGVzL3N0eWxpbmcvY29tcG9uZW50cy9pbnB1dC5oYnMnXTtcbn1cblxuU3R5bGVJbnB1dFZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKCkge1xuXG5cdHZhciB0ZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGUoe1xuXHRcdHByZXBlbmRJY29uOiB0aGlzLnByZXBlbmRJY29uLFxuXHRcdGFwcGVuZENvbnRyb2xzOiB0aGlzLmFwcGVuZENvbnRyb2xzLFxuXHRcdHR5cGU6IHRoaXMudHlwZSxcblx0XHRwcm9wZXJ0eTogdGhpcy5wcm9wZXJ0eSxcblx0XHR2YWx1ZTogdGhpcy52YWx1ZSxcblx0XHRjYW5CZU5lZ2F0aXZlOiB0aGlzLmNhbkJlTmVnYXRpdmUsXG5cdFx0bGFiZWw6IHRoaXMubGFiZWxcblx0fSk7XG5cblx0dGhpcy4kdGVtcGxhdGUgPSAkKCB0ZW1wbGF0ZSApO1xuXG5cdC8vIGlmICggdGhpcy5hcHBlbmRDb250cm9scyApIHtcblx0XHR0aGlzLl9zZXR1cENvbnRyb2xzKCk7XG5cdC8vIH1cblxuXHRyZXR1cm4gdGhpcy4kdGVtcGxhdGU7XG59XG5cblN0eWxlSW5wdXRWaWV3LnByb3RvdHlwZS5fc2V0dXBDb250cm9scyA9IGZ1bmN0aW9uKCkge1xuXG5cdGlmICggdGhpcy50eXBlID09PSAnY29sb3InICkge1xuXHRcdHRoaXMuJHRlbXBsYXRlLmZpbmQoJ2lucHV0Jykub24oICdpbnB1dCcsIHRoaXMuX29uQ2hhbmdlLmJpbmQoIHRoaXMgKSApO1xuXHR9XG5cblx0dGhpcy4kdGVtcGxhdGUuZmluZCgnaW5wdXQnKS5vbiggJ2tleXVwJywgdGhpcy5fb25DaGFuZ2UuYmluZCggdGhpcyApICk7XG5cdHRoaXMuJHRlbXBsYXRlLmZpbmQoJ2lucHV0Jykub24oICdjaGFuZ2UnLCB0aGlzLl9vbkNoYW5nZS5iaW5kKCB0aGlzICkgKTtcblx0dGhpcy4kdGVtcGxhdGUuZmluZCgnLmluY3JlbWVudCcpLm9uKCAnY2xpY2snLCB0aGlzLl9vbkluY3JlbWVudC5iaW5kKCB0aGlzICkgKTtcblx0dGhpcy4kdGVtcGxhdGUuZmluZCgnLmRlY3JlbWVudCcpLm9uKCAnY2xpY2snLCB0aGlzLl9vbkRlY3JlbWVudC5iaW5kKCB0aGlzICkgKTtcdFxufVxuXG5TdHlsZUlucHV0Vmlldy5wcm90b3R5cGUuX29uQ2hhbmdlID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuXHR2YXIgbmV3VmFsdWUgPSB0aGlzLmZvcm1hdFZhbHVlKCB0aGlzLiR0ZW1wbGF0ZS5maW5kKCdpbnB1dCcpLnZhbCgpIClcblx0dGhpcy51cGRhdGUoIG5ld1ZhbHVlICk7XG59XG5cblN0eWxlSW5wdXRWaWV3LnByb3RvdHlwZS5fb25JbmNyZW1lbnQgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdHZhciBuZXdWYWx1ZSA9IHRoaXMuaW5jcmVtZW50KCB0aGlzLiR0ZW1wbGF0ZS5maW5kKCdpbnB1dCcpLnZhbCgpICk7XG5cdHRoaXMudXBkYXRlKCBuZXdWYWx1ZSApO1xufVxuXG5TdHlsZUlucHV0Vmlldy5wcm90b3R5cGUuX29uRGVjcmVtZW50ID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuXHR2YXIgbmV3VmFsdWUgPSB0aGlzLmRlY3JlbWVudCggdGhpcy4kdGVtcGxhdGUuZmluZCgnaW5wdXQnKS52YWwoKSApO1xuXHR0aGlzLnVwZGF0ZSggbmV3VmFsdWUgKTtcbn1cblxuU3R5bGVJbnB1dFZpZXcucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0dGhpcy52YWx1ZSA9IHZhbHVlO1xuXHR0aGlzLiR0ZW1wbGF0ZS5maW5kKCdpbnB1dCcpLnZhbCggdmFsdWUgKTtcblxuXHQvLyBBbGVydCBhbnkgbGlzdGVuZXJzIHRoYXQgdGhlIGl0ZW0gaGFzIHN0YXJ0ZWQgZHJhZ1xuXHQvLyB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoICdDb2x1bW5zLlN0eWxlSW5wdXRWaWV3LlZhbHVlRGlkVXBkYXRlRm9yUHJvcGVydHknLCB7XG5cdC8vIFx0aXRlbTogXHR0aGlzLFxuXHQvLyBcdGV2ZW50OiBcdGV2ZW50LFxuXHQvLyBcdHVpOiBcdHVpXG5cdC8vIH0pO1xuXHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdC8vIGNvbHVtbnNFdmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuU3R5bGVJbnB1dFZpZXcuVmFsdWVEaWRVcGRhdGVGb3JQcm9wZXJ0eUFuZEl0ZW0nLCBmYWxzZSwgZmFsc2UsIHtcblx0Ly8gXHRpdGVtOiB0aGlzLml0ZW0sXG5cdC8vIFx0cHJvcGVydHk6IHRoaXMucHJvcGVydHksXG5cdC8vIFx0dmFsdWU6IFx0dmFsdWVcblx0Ly8gfSk7XG5cdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY29sdW1uc0V2ZW50KTtcblx0Q29sdW1uc0V2ZW50LnNlbmQoICdDb2x1bW5zLlN0eWxlSW5wdXRWaWV3LlZhbHVlRGlkVXBkYXRlRm9yUHJvcGVydHlBbmRJdGVtJywge1xuXHRcdGl0ZW06IHRoaXMuaXRlbSxcblx0XHRwcm9wZXJ0eTogdGhpcy5wcm9wZXJ0eSxcblx0XHR2YWx1ZTogXHR2YWx1ZVxuXHR9IClcbn1cblxuU3R5bGVJbnB1dFZpZXcucHJvdG90eXBlLmluY3JlbWVudCA9IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0dmFyIHBhcnNlZFZhbHVlID0gdGhpcy5wYXJzZVZhbHVlKCB2YWx1ZSApLFxuXHRcdG51bWJlciA9ICtwYXJzZWRWYWx1ZS5udW1iZXIsXG5cdFx0dW5pdCA9IHBhcnNlZFZhbHVlLnVuaXQsXG5cdFx0bmV3TnVtYmVyO1xuXG5cdG5ld051bWJlciA9ICtwYXJzZWRWYWx1ZS5udW1iZXIgKyAxO1xuXG5cdC8vIEZvcm1hdCBhbmQgcmV0dXJuIHRoZSBuZXcgdmFsdWVcblx0cmV0dXJuIHRoaXMuZm9ybWF0VmFsdWUoIG5ld051bWJlciArIHVuaXQgKTtcbn1cblxuU3R5bGVJbnB1dFZpZXcucHJvdG90eXBlLmRlY3JlbWVudCA9IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0dmFyIHBhcnNlZFZhbHVlID0gdGhpcy5wYXJzZVZhbHVlKCB2YWx1ZSApLFxuXHRcdG51bWJlciA9ICtwYXJzZWRWYWx1ZS5udW1iZXIsXG5cdFx0dW5pdCA9IHBhcnNlZFZhbHVlLnVuaXQsXG5cdFx0bmV3TnVtYmVyO1xuXG5cdG5ld051bWJlciA9ICtwYXJzZWRWYWx1ZS5udW1iZXIgLSAxO1xuXG5cdC8vIEZvcm1hdCBhbmQgcmV0dXJuIHRoZSBuZXcgdmFsdWVcblx0cmV0dXJuIHRoaXMuZm9ybWF0VmFsdWUoIG5ld051bWJlciArIHVuaXQgKTtcbn1cblxuU3R5bGVJbnB1dFZpZXcucHJvdG90eXBlLnBhcnNlVmFsdWUgPSBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdHZhciByZSA9IC8oW1xcZHxcXC58XFwtXSopKC4qKS8sXG5cdFx0cmVzdWx0ID0gcmUuZXhlYyh2YWx1ZSk7XG5cblx0cmV0dXJuIHtcblx0XHRudW1iZXI6IHJlc3VsdFsgMSBdLFxuXHRcdHVuaXQ6IHJlc3VsdFsgMiBdXG5cdH1cbn1cblxuU3R5bGVJbnB1dFZpZXcucHJvdG90eXBlLnZhbGlkYXRlVmFsdWUgPSBmdW5jdGlvbiggdmFsdWUgKSB7XG5cblx0Ly8gSWYgdGhlIHZhbHVlIGlzIGlsbGVnYWxseSBuZWdhdGl2ZSxcblx0Ly8gc2V0IGl0IHRvIDBcblx0aWYgKCB2YWx1ZSA8IDAgJiYgIXRoaXMuY2FuQmVOZWdhdGl2ZSApIHtcblx0XHRyZXR1cm4gMDtcblx0fVxuXG5cdC8vIElmIHRoZSB2YWx1ZSBtdXN0IGJlIGFuIGludCwgcGFyc2UgaXQgYXMgYW4gaW50XG5cdGlmICggIXRoaXMuY2FuQmVEZWNpbWFsICkge1xuXHRcdHJldHVybiBwYXJzZUludCggdmFsdWUgKTtcblx0fVxuXG5cdC8vIElmIG5vIG1vZGlmaWNhdGlvbnMgYXJlIG5lY2Vzc2FyeSxcblx0Ly8gcmV0dXJuIHRoZSB2YWx1ZSBhcy1pc1xuXHRyZXR1cm4gcGFyc2VGbG9hdCggdmFsdWUgKTtcbn1cblxuU3R5bGVJbnB1dFZpZXcucHJvdG90eXBlLmZvcm1hdFZhbHVlID0gZnVuY3Rpb24oIHZhbHVlICkge1xuXG5cdC8vIERvbid0IGRvIGFueXRoaW5nIGlmIHRoaXMgaXMgYSBjb2xvciB2YWx1ZVxuXHRpZiAoIHRoaXMudHlwZSA9PT0gJ2NvbG9yJyApIHtcblx0XHRyZXR1cm4gdmFsdWU7XG5cdH1cblxuXHR2YXJcdHBhcnNlZFZhbHVlID0gdGhpcy5wYXJzZVZhbHVlKCB2YWx1ZSApLFxuXHRcdG51bWJlciA9IHRoaXMudmFsaWRhdGVWYWx1ZSggcGFyc2VkVmFsdWUubnVtYmVyICksXG5cdFx0dW5pdCA9IHBhcnNlZFZhbHVlLnVuaXQgfHwgdGhpcy51bml0O1xuXG5cdHJldHVybiBudW1iZXIgKyB1bml0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFN0eWxlSW5wdXRWaWV3OyIsInZhciBDb2x1bW5zRXZlbnQgPSByZXF1aXJlKCcuLi9tb2RlbHMvQ29sdW1uc0V2ZW50LmpzJyk7XG5cbkhhbmRsZWJhcnMucmVnaXN0ZXJIZWxwZXIoJ2lmSXNDdXJyZW50VmFsdWUnLCBmdW5jdGlvbih2YWx1ZSwgY3VycmVudFZhbHVlLCBvcHRpb25zKSB7XG5cdHJldHVybiB2YWx1ZSA9PSBjdXJyZW50VmFsdWUgPyBvcHRpb25zLmZuKHRoaXMpIDogb3B0aW9ucy5pbnZlcnNlKHRoaXMpO1xufSk7XG5cbnZhciBURU1QTEFURSA9IENvbHVtbnMuVGVtcGxhdGVzWyd0ZW1wbGF0ZXMvc3R5bGluZy9jb21wb25lbnRzL211bHRpcGxlLXNlZ21lbnRlZC1idXR0b24uaGJzJ107XG5cbmZ1bmN0aW9uIFN0eWxlTXVsdGlwbGVTZWdtZW50ZWRCdXR0b25WaWV3KCBvcHRpb25zICkge1xuXG5cdHRoaXMubGFiZWwgPSAnJztcblx0dGhpcy5idXR0b25zID0gW107XG5cdHRoaXMucHJvcGVydGllcyA9IHt9O1xuXHR0aGlzLml0ZW0gPSB1bmRlZmluZWQ7XG5cblx0aWYgKCBvcHRpb25zICkge1xuXHRcdHRoaXMubGFiZWwgPSBvcHRpb25zLmxhYmVsIHx8IHRoaXMubGFiZWw7XG5cdFx0dGhpcy5idXR0b25zID0gb3B0aW9ucy5idXR0b25zIHx8IHRoaXMuYnV0dG9ucztcblx0XHR0aGlzLml0ZW0gPSBvcHRpb25zLml0ZW0gfHwgdGhpcy5pdGVtO1xuXHR9XG5cblx0dGhpcy5idXR0b25zLmZvckVhY2goZnVuY3Rpb24oIGJ1dHRvbiwgaSApIHtcblx0XHR0aGlzLnByb3BlcnRpZXNbYnV0dG9uLnByb3BlcnR5XSA9IGJ1dHRvbi52YWx1ZXMuY3VycmVudDtcblx0fS5iaW5kKCB0aGlzICkpO1xufVxuXG5TdHlsZU11bHRpcGxlU2VnbWVudGVkQnV0dG9uVmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oKSB7XG5cblx0dmFyIHRlbXBsYXRlID0gVEVNUExBVEUoe1xuXHRcdGxhYmVsOiB0aGlzLmxhYmVsLFxuXHRcdGJ1dHRvbnM6IHRoaXMuYnV0dG9uc1xuXHR9KTtcblxuXHR0aGlzLiR0ZW1wbGF0ZSA9ICQoIHRlbXBsYXRlICk7XG5cblx0dGhpcy5fc2V0dXBDb250cm9scygpO1xuXG5cdHJldHVybiB0aGlzLiR0ZW1wbGF0ZTtcbn07XG5cblN0eWxlTXVsdGlwbGVTZWdtZW50ZWRCdXR0b25WaWV3LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiggcHJvcGVydHksIHZhbHVlICkge1xuXG5cdHRoaXMucHJvcGVydGllc1twcm9wZXJ0eV0gPSB2YWx1ZTtcblxuXHQvLyBBbGVydCBhbnkgbGlzdGVuZXJzIHRoYXQgdGhlIGl0ZW0gaGFzIHN0YXJ0ZWQgZHJhZ1xuXHQvLyB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoICdDb2x1bW5zLlN0eWxlTXVsdGlwbGVTZWdtZW50ZWRCdXR0b25WaWV3LlZhbHVlRGlkVXBkYXRlRm9yUHJvcGVydHknLCB7XG5cdC8vIFx0aXRlbTogXHR0aGlzLFxuXHQvLyBcdGV2ZW50OiBcdGV2ZW50LFxuXHQvLyBcdHVpOiBcdHVpXG5cdC8vIH0pO1xuXHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdC8vIGNvbHVtbnNFdmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuU3R5bGVNdWx0aXBsZVNlZ21lbnRlZEJ1dHRvblZpZXcuVmFsdWVEaWRVcGRhdGVGb3JQcm9wZXJ0eUFuZEl0ZW0nLCBmYWxzZSwgZmFsc2UsIHtcblx0Ly8gXHRpdGVtOiB0aGlzLml0ZW0sXG5cdC8vIFx0cHJvcGVydHk6IHByb3BlcnR5LFxuXHQvLyBcdHZhbHVlOiBcdHZhbHVlXG5cdC8vIH0pO1xuXHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGNvbHVtbnNFdmVudCk7XG5cdENvbHVtbnNFdmVudC5zZW5kKCAnQ29sdW1ucy5TdHlsZU11bHRpcGxlU2VnbWVudGVkQnV0dG9uVmlldy5WYWx1ZURpZFVwZGF0ZUZvclByb3BlcnR5QW5kSXRlbScsIHtcblx0XHRpdGVtOiB0aGlzLml0ZW0sXG5cdFx0cHJvcGVydHk6IHByb3BlcnR5LFxuXHRcdHZhbHVlOiBcdHZhbHVlXG5cdH0gKTtcbn1cblxuU3R5bGVNdWx0aXBsZVNlZ21lbnRlZEJ1dHRvblZpZXcucHJvdG90eXBlLl9zZXR1cENvbnRyb2xzID0gZnVuY3Rpb24oKSB7XG5cblx0dGhpcy4kdGVtcGxhdGUuZmluZCgnYnV0dG9uJykub24oICdjbGljaycsIHRoaXMuX29uQ2xpY2suYmluZCggdGhpcyApICk7XG59O1xuXG5TdHlsZU11bHRpcGxlU2VnbWVudGVkQnV0dG9uVmlldy5wcm90b3R5cGUuX29uQ2xpY2sgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdHZhciAkYnV0dG9uID0gJCggZXZlbnQudGFyZ2V0ICkuaXMoJ2J1dHRvbicpID8gJCggZXZlbnQudGFyZ2V0ICkgOiAkKCBldmVudC50YXJnZXQgKS5wYXJlbnRzKCdidXR0b24nKS5maXJzdCgpLFxuXHRcdHByb3BlcnR5ID0gJGJ1dHRvbi5kYXRhKCdwcm9wZXJ0eScpLFxuXHRcdHZhbHVlO1xuXG5cdGlmICggJGJ1dHRvbi5oYXNDbGFzcygnYWN0aXZlJykgKSB7XG5cdFx0dmFsdWUgPSAkYnV0dG9uLmRhdGEoJ2luYWN0aXZlLXZhbHVlJyk7XG5cdH0gZWxzZSB7XG5cdFx0dmFsdWUgPSAkYnV0dG9uLmRhdGEoJ2FjdGl2ZS12YWx1ZScpO1xuXHR9XG5cblx0JGJ1dHRvbi50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG5cblx0dGhpcy51cGRhdGUoIHByb3BlcnR5LCB2YWx1ZSApO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTdHlsZU11bHRpcGxlU2VnbWVudGVkQnV0dG9uVmlldzsiLCJ2YXIgQ29sdW1uc0V2ZW50IFx0XHRcdFx0XHQ9IHJlcXVpcmUoJy4uL21vZGVscy9Db2x1bW5zRXZlbnQuanMnKTtcblxuSGFuZGxlYmFycy5yZWdpc3RlckhlbHBlcignaWZJc0N1cnJlbnRWYWx1ZScsIGZ1bmN0aW9uKHZhbHVlLCBjdXJyZW50VmFsdWUsIG9wdGlvbnMpIHtcblx0cmV0dXJuIHZhbHVlID09IGN1cnJlbnRWYWx1ZSA/IG9wdGlvbnMuZm4odGhpcykgOiBvcHRpb25zLmludmVyc2UodGhpcyk7XG59KTtcblxuZnVuY3Rpb24gU3R5bGVTZWdtZW50ZWRCdXR0b25WaWV3KCBvcHRpb25zICkge1xuXG5cdHRoaXMubGFiZWwgPSAnJztcblx0dGhpcy5wcm9wZXJ0eSA9ICcnO1xuXHR0aGlzLmJ1dHRvbnMgPSBbXTtcblx0dGhpcy52YWx1ZSA9ICcnO1xuXHR0aGlzLml0ZW0gPSB1bmRlZmluZWQ7XG5cblx0aWYoIG9wdGlvbnMgKSB7XG5cdFx0dGhpcy5sYWJlbCA9IG9wdGlvbnMubGFiZWwgfHwgdGhpcy5sYWJlbDtcblx0XHR0aGlzLnByb3BlcnR5ID0gb3B0aW9ucy5wcm9wZXJ0eSB8fCB0aGlzLnByb3BlcnR5O1xuXHRcdHRoaXMuYnV0dG9ucyA9IG9wdGlvbnMuYnV0dG9ucyB8fCB0aGlzLmJ1dHRvbnM7XG5cdFx0dGhpcy52YWx1ZSA9IG9wdGlvbnMudmFsdWUgfHwgdGhpcy52YWx1ZTtcblx0XHR0aGlzLml0ZW0gPSBvcHRpb25zLml0ZW0gfHwgdGhpcy5pdGVtO1xuXHR9XG5cblx0dGhpcy50ZW1wbGF0ZSA9IENvbHVtbnMuVGVtcGxhdGVzWyd0ZW1wbGF0ZXMvc3R5bGluZy9jb21wb25lbnRzL3NlZ21lbnRlZC1idXR0b24uaGJzJ107XG59XG5cblN0eWxlU2VnbWVudGVkQnV0dG9uVmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oKSB7XG5cblx0dmFyIHRlbXBsYXRlID0gdGhpcy50ZW1wbGF0ZSh7XG5cdFx0bGFiZWw6IHRoaXMubGFiZWwsXG5cdFx0cHJvcGVydHk6IHRoaXMucHJvcGVydHksXG5cdFx0dmFsdWU6IHRoaXMudmFsdWUsXG5cdFx0YnV0dG9uczogdGhpcy5idXR0b25zXG5cdH0pO1xuXG5cdHRoaXMuJHRlbXBsYXRlID0gJCggdGVtcGxhdGUgKTtcblxuXHR0aGlzLl9zZXR1cENvbnRyb2xzKCk7XG5cblx0cmV0dXJuIHRoaXMuJHRlbXBsYXRlO1xufTtcblxuU3R5bGVTZWdtZW50ZWRCdXR0b25WaWV3LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiggdmFsdWUgKSB7XG5cblx0dGhpcy52YWx1ZSA9IHZhbHVlO1xuXG5cdC8vIEFsZXJ0IGFueSBsaXN0ZW5lcnMgdGhhdCB0aGUgaXRlbSBoYXMgc3RhcnRlZCBkcmFnXG5cdC8vIHZhciBldmVudCA9IG5ldyBDdXN0b21FdmVudCggJ0NvbHVtbnMuU3R5bGVTZWdtZW50ZWRCdXR0b25WaWV3LlZhbHVlRGlkVXBkYXRlRm9yUHJvcGVydHknLCB7XG5cdC8vIFx0aXRlbTogXHR0aGlzLFxuXHQvLyBcdGV2ZW50OiBcdGV2ZW50LFxuXHQvLyBcdHVpOiBcdHVpXG5cdC8vIH0pO1xuXHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdC8vIGNvbHVtbnNFdmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuU3R5bGVTZWdtZW50ZWRCdXR0b25WaWV3LlZhbHVlRGlkVXBkYXRlRm9yUHJvcGVydHlBbmRJdGVtJywgZmFsc2UsIGZhbHNlLCB7XG5cdC8vIFx0aXRlbTogdGhpcy5pdGVtLFxuXHQvLyBcdHByb3BlcnR5OiB0aGlzLnByb3BlcnR5LFxuXHQvLyBcdHZhbHVlOiBcdHZhbHVlXG5cdC8vIH0pO1xuXHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGNvbHVtbnNFdmVudCk7XG5cdENvbHVtbnNFdmVudC5zZW5kKCAnQ29sdW1ucy5TdHlsZVNlZ21lbnRlZEJ1dHRvblZpZXcuVmFsdWVEaWRVcGRhdGVGb3JQcm9wZXJ0eUFuZEl0ZW0nLCB7XG5cdFx0aXRlbTogdGhpcy5pdGVtLFxuXHRcdHByb3BlcnR5OiB0aGlzLnByb3BlcnR5LFxuXHRcdHZhbHVlOiBcdHZhbHVlXG5cdH0pO1xufTtcblxuU3R5bGVTZWdtZW50ZWRCdXR0b25WaWV3LnByb3RvdHlwZS5fc2V0dXBDb250cm9scyA9IGZ1bmN0aW9uKCkge1xuXG5cdHRoaXMuJHRlbXBsYXRlLmZpbmQoJ2J1dHRvbicpLm9uKCAnY2xpY2snLCB0aGlzLl9vbkNsaWNrLmJpbmQoIHRoaXMgKSApO1xufTtcblxuU3R5bGVTZWdtZW50ZWRCdXR0b25WaWV3LnByb3RvdHlwZS5fb25DbGljayA9IGZ1bmN0aW9uKCBldmVudCApIHtcblx0dmFyICRidXR0b24gPSAkKCBldmVudC50YXJnZXQgKS5pcygnYnV0dG9uJykgPyAkKCBldmVudC50YXJnZXQgKSA6ICQoIGV2ZW50LnRhcmdldCApLnBhcmVudHMoJ2J1dHRvbicpLmZpcnN0KCk7XG5cblx0dGhpcy4kdGVtcGxhdGUuZmluZCgnYnV0dG9uJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHQkYnV0dG9uLmFkZENsYXNzKCdhY3RpdmUnKTtcblxuXHR0aGlzLnVwZGF0ZSggJGJ1dHRvbi5kYXRhKCd2YWx1ZScpICk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0eWxlU2VnbWVudGVkQnV0dG9uVmlldzsiLCJ2YXIgQ29sdW1uc0V2ZW50IFx0XHRcdFx0XHQ9IHJlcXVpcmUoJy4uL21vZGVscy9Db2x1bW5zRXZlbnQuanMnKTtcbnZhciBDb2x1bW5zIFx0XHRcdFx0XHRcdD0gcmVxdWlyZSgnLi4vLi4vY29tcGlsZWQtamF2YXNjcmlwdHMvc3R5bGluZy9jb21waWxlZC1kYXRhLmpzJyk7XG52YXIgU3R5bGVDb21wb25lbnRWaWV3IFx0XHRcdFx0PSByZXF1aXJlKCcuL1N0eWxlQ29tcG9uZW50Vmlldy5qcycpO1xudmFyIFRlbXBsYXRlR3JvdXBWaWV3IFx0XHRcdFx0PSByZXF1aXJlKCcuL1RlbXBsYXRlR3JvdXBWaWV3LmpzJyk7XG52YXIgVGVtcGxhdGVWYWx1ZVZpZXcgXHRcdFx0XHQ9IHJlcXVpcmUoJy4vVGVtcGxhdGVWYWx1ZVZpZXcuanMnKTtcblxuZnVuY3Rpb24gU3R5bGVWaWV3KCkge1xuXHR0aGlzLl9zZXR1cEV2ZW50TGlzdGVuZXJzKCk7XG59XG5cblN0eWxlVmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oKSB7XG5cdHRoaXMuJHN0eWxlID0gJCgnI3N0eWxpbmcnKTtcbn07XG5cblN0eWxlVmlldy5wcm90b3R5cGUudXBkYXRlV2l0aFNlbGVjdGlvbiA9IGZ1bmN0aW9uKCBzZWxlY3Rpb24gKSB7XG5cdHZhciBjb21wb25lbnRWaWV3LFxuXHRcdCRjb21wb25lbnQ7XG5cblx0Ly8gQ3JlYXRlIGEgY29tcG9uZW50IHZpZXcgd2l0aCB0aGUgbmV3IGl0ZW1cblx0c2VsZWN0aW9uID0gdGhpcy5nZXRJdGVtRm9yU2VsZWN0aW9uKCBzZWxlY3Rpb24gKTtcblx0Y29tcG9uZW50VmlldyA9IG5ldyBTdHlsZUNvbXBvbmVudFZpZXcoIHNlbGVjdGlvbiApO1xuXHQkY29tcG9uZW50ID0gY29tcG9uZW50Vmlldy5yZW5kZXIoKTtcblxuXHQvLyBDbGVhciB0aGUgc3R5bGUgcGFuZSBpZiB3ZSdyZSBhYm91dCB0byByZW5kZXIgYW4gaXRlbS5cblx0Ly8gT3RoZXJ3aXNlLCBhcHBlbmQgdG8gdGhlIGVuZCBvZiB0aGUgcGFuZVxuXHRpZiggc2VsZWN0aW9uIGluc3RhbmNlb2YgSXRlbSApIHtcblx0XHQkKCcuc3R5bGUtY29tcG9uZW50JykucmVtb3ZlKCk7XG5cdH1cblx0XG5cdHRoaXMuJHN0eWxlLmFwcGVuZCggJGNvbXBvbmVudCApO1xufTtcblxuU3R5bGVWaWV3LnByb3RvdHlwZS5nZXRJdGVtRm9yU2VsZWN0aW9uID0gZnVuY3Rpb24oIHNlbGVjdGlvbiApIHtcblxuXHRpZiggc2VsZWN0aW9uIGluc3RhbmNlb2YgSXRlbSApIHtcblx0XHRyZXR1cm4gc2VsZWN0aW9uO1xuXHR9IGVsc2UgaWYgKCBzZWxlY3Rpb24gaW5zdGFuY2VvZiBJdGVtVmlldyApIHtcblx0XHRyZXR1cm4gc2VsZWN0aW9uLml0ZW07XG5cdH0gZWxzZSBpZiAoIHNlbGVjdGlvbiBpbnN0YW5jZW9mIFRlbXBsYXRlVmFsdWVWaWV3ICkge1xuXHRcdHJldHVybiBzZWxlY3Rpb24uaXRlbTtcblx0fSBlbHNlIGlmICggc2VsZWN0aW9uIGluc3RhbmNlb2YgVGVtcGxhdGVHcm91cFZpZXcgKSB7XG5cdFx0cmV0dXJuIHNlbGVjdGlvbjtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBcImV4Y2VwdGlvbjogU2VsZWN0aW9uIG11c3QgYmUgYW4gSXRlbSwgSXRlbVZpZXcsIFRlbXBsYXRlVmFsdWVWaWV3IG9yIFRlbXBsYXRlR3JvdXBWaWV3XCI7XG5cdH1cbn07XG5cblN0eWxlVmlldy5wcm90b3R5cGUuX3NldHVwRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBMaXN0ZW4gdG8gYXBwIHJlbmRlciBldmVudFxuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLkRlc2t0b3BWaWV3LkRpZFJlbmRlcicsIHRoaXMuX29uRGVza3RvcFJlbmRlci5iaW5kKCB0aGlzICkgKTtcblxuXHQvLyBMaXN0ZW4gdG8gdWRwYXRlcyBmcm9tIHN0eWxpbmcgY29udHJvbHNcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5TdHlsZUlucHV0Vmlldy5WYWx1ZURpZFVwZGF0ZUZvclByb3BlcnR5QW5kSXRlbScsIHRoaXMuX29uU3R5bGVVcGRhdGUuYmluZCggdGhpcyApKTtcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5TdHlsZVNlZ21lbnRlZEJ1dHRvblZpZXcuVmFsdWVEaWRVcGRhdGVGb3JQcm9wZXJ0eUFuZEl0ZW0nLCB0aGlzLl9vblN0eWxlVXBkYXRlLmJpbmQoIHRoaXMgKSk7XG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuU3R5bGVNdWx0aXBsZVNlZ21lbnRlZEJ1dHRvblZpZXcuVmFsdWVEaWRVcGRhdGVGb3JQcm9wZXJ0eUFuZEl0ZW0nLCB0aGlzLl9vblN0eWxlVXBkYXRlLmJpbmQoIHRoaXMgKSk7XG5cblx0Ly8gTGlzdGVuIHRvIHZhbHVlIHZpZXcgc2VsZWN0aW9uXG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuVGVtcGxhdGVWYWx1ZVZpZXcuVmFsdWVEaWRTZWxlY3RXaXRoSXRlbScsIHRoaXMuX29uSXRlbVNlbGVjdGlvbi5iaW5kKCB0aGlzICkpO1xuXG5cdC8vIExpc3RlbiB0byBpdGVtIHNlbGVjdGlvblxuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLkl0ZW1WaWV3Lkl0ZW1EaWRTZWxlY3QnLCB0aGlzLl9vbkl0ZW1TZWxlY3Rpb24uYmluZCggdGhpcyApKTtcblxuXHQvLyBMaXN0ZW4gZm9yIHRoZSB0ZW1wbGF0ZSB0byBmaW5pc2ggcmVuZGVyaW5nXG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuVGVtcGxhdGVWaWV3LkRpZFJlbmRlcicsIHRoaXMuX29uVGVtcGxhdGVEaWRSZW5kZXIuYmluZCggdGhpcyApKTtcdFxufTtcblxuU3R5bGVWaWV3LnByb3RvdHlwZS5fb25EZXNrdG9wUmVuZGVyID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXHR0aGlzLnJlbmRlcigpO1xufVxuXG5TdHlsZVZpZXcucHJvdG90eXBlLl9vblN0eWxlVXBkYXRlID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXG5cdHRoaXMuX2VtaXRDaGFuZ2UoIGRhdGEuaXRlbSwgZGF0YS5wcm9wZXJ0eSwgZGF0YS52YWx1ZSApO1xufTtcblxuU3R5bGVWaWV3LnByb3RvdHlwZS5fb25JdGVtU2VsZWN0aW9uID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXHR2YXIgaXRlbSA9IGRhdGEuaXRlbSxcblx0XHRncm91cHMgPSBUZW1wbGF0ZVZpZXcuZ2V0R3JvdXBzRm9ySXRlbSggaXRlbSApO1xuXG5cdC8vIFVwZGF0ZSB0aGUgc3R5bGUgcGFuZWwgd2l0aCB0aGUgc2VsZWN0ZWQgaXRlbVxuXHR0aGlzLnVwZGF0ZVdpdGhTZWxlY3Rpb24oIGl0ZW0gKTtcblxuXHQvLyBBbHNvIHVwZGF0ZSB3aXRoIGFueSBwYXJlbnQgZ3JvdXBzXG5cdGlmICggZ3JvdXBzICYmIGdyb3Vwcy5sZW5ndGggKSB7XG5cdFx0Z3JvdXBzLmZvckVhY2goZnVuY3Rpb24oIGdyb3VwICkge1xuXHRcdFx0dGhpcy51cGRhdGVXaXRoU2VsZWN0aW9uKCBncm91cCApO1xuXHRcdH0uYmluZCggdGhpcyApKTtcblx0fVxufTtcblxuU3R5bGVWaWV3LnByb3RvdHlwZS5fb25UZW1wbGF0ZURpZFJlbmRlciA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblx0dGhpcy51cGRhdGVXaXRoU2VsZWN0aW9uKCBUZW1wbGF0ZVZpZXcuZ3JvdXBzWyAwIF0gKTtcbn07XG5cblN0eWxlVmlldy5wcm90b3R5cGUuX2VtaXRDaGFuZ2UgPSBmdW5jdGlvbiggaXRlbSwgcHJvcGVydHksIHZhbHVlICkge1xuXG5cdC8vIEFsZXJ0IGFueSBsaXN0ZW5lcnMgdGhhdCB0aGUgZ3JvdXAgaXMgbm93IGVuZ2FnZWQgdG8gYmUgZHJvcHBlZCB1cG9uXG5cdC8vIHZhciBldmVudCA9IG5ldyBDdXN0b21FdmVudCggJ0NvbHVtbnMuU3R5bGVWaWV3LlByb3BlcnR5RGlkVXBkYXRlV2l0aFZhbHVlRm9yR3JvdXBWaWV3Jywge1xuXHRcdC8vIGdyb3VwVmlldzogXHRpdGVtLFxuXHRcdC8vIHByb3BlcnR5OiBwcm9wZXJ0eSxcblx0XHQvLyB2YWx1ZTogdmFsdWVcblx0Ly8gfSk7XG5cblx0dmFyIGV2ZW50VHlwZSxcblx0XHRkYXRhO1xuXG5cdGlmICggaXRlbSBpbnN0YW5jZW9mIEl0ZW0gKSB7XG5cblx0XHRldmVudFR5cGUgPSAnQ29sdW1ucy5TdHlsZVZpZXcuUHJvcGVydHlEaWRVcGRhdGVXaXRoVmFsdWVGb3JJdGVtJztcblx0XHRkYXRhID0ge1xuXHRcdFx0aXRlbTogXHRpdGVtLFxuXHRcdFx0cHJvcGVydHk6IHByb3BlcnR5LFxuXHRcdFx0dmFsdWU6IHZhbHVlXG5cdFx0fTtcblx0XHRDb2x1bW5zRXZlbnQuc2VuZCggZXZlbnRUeXBlLCBkYXRhICk7XG5cblx0fSBlbHNlIGlmICggaXRlbSBpbnN0YW5jZW9mIFRlbXBsYXRlR3JvdXBWaWV3ICkge1xuXHRcdFxuXHRcdGV2ZW50VHlwZSA9ICdDb2x1bW5zLlN0eWxlVmlldy5Qcm9wZXJ0eURpZFVwZGF0ZVdpdGhWYWx1ZUZvckdyb3VwVmlldyc7XG5cdFx0ZGF0YSA9IHtcblx0XHRcdGdyb3VwVmlldzogXHRpdGVtLFxuXHRcdFx0cHJvcGVydHk6IHByb3BlcnR5LFxuXHRcdFx0dmFsdWU6IHZhbHVlXG5cdFx0fTtcblx0XHRDb2x1bW5zRXZlbnQuc2VuZCggZXZlbnRUeXBlLCBkYXRhICk7XG5cblx0fSBlbHNlIHtcblx0XHQvLyBEbyBub3RoaW5nXG5cdH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU3R5bGVWaWV3O1xuIiwidmFyIENvbHVtbnNFdmVudCA9IHJlcXVpcmUoJy4uL21vZGVscy9Db2x1bW5zRXZlbnQuanMnKTtcblxuLy8gT2JqZWN0IHRvIG1hbmFnZSBwcm9wZXJ0aWVzIG9mIGFuZCBpbnRlcmFjdGlvblxuLy8gd2l0aCB0ZW1wbGF0ZSBncm91cCB6b25lcy5cbi8vIEdyb3VwIHpvbmVzIGFyZSBwb3B1bGF0ZWQgd2l0aCB2YWx1ZSB6b25lcyBhbmRcbi8vIGNhbiBoYXZlIHRoZWlyIGxheW91dCBhbmQgc3R5bGUgYWx0ZXJlZC5cblxuSGFuZGxlYmFycy5yZWdpc3RlclBhcnRpYWwoJ2xheW91dCcsIENvbHVtbnMuVGVtcGxhdGVzWyd0ZW1wbGF0ZXMvbGF5b3V0L2xheW91dC5oYnMnXSk7XG5IYW5kbGViYXJzLnJlZ2lzdGVyUGFydGlhbCgnc3R5bGUnLCBDb2x1bW5zLlRlbXBsYXRlc1sndGVtcGxhdGVzL2xheW91dC9zdHlsZS5oYnMnXSk7XG5cbnZhciBST1dfR1JPVVBfU0VMRUNUT1IgPSAnLmxheW91dC10ZW1wbGF0ZS1yb3ctZ3JvdXAnLCBcblx0Uk9XX1ZBTFVFX1NFTEVDVE9SID0gJy5sYXlvdXQtdGVtcGxhdGUtcm93LXZhbHVlJyxcblx0TEFZT1VUX1BST1BFUlRJRVMgPSBbXG5cdFx0J2FsaWduLWl0ZW1zJyxcblx0XHQnZmxleC1kaXJlY3Rpb24nLFxuXHRcdCdqdXN0aWZ5LWNvbnRlbnQnLFxuXHRdO1xuXG5UZW1wbGF0ZUdyb3VwVmlldyA9IGZ1bmN0aW9uKCBwYXJhbXMgKSB7XG5cblx0aWYgKCBwYXJhbXMgKSB7XG5cdFx0dGhpcy5sYXlvdXQgXHRcdD0gcGFyYW1zLmxheW91dCB8fCBbXTtcblx0XHR0aGlzLnN0eWxlXHRcdFx0PSBuZXcgU3R5bGUoIHBhcmFtcy5zdHlsZSB8fCBbXSApO1xuXHRcdHRoaXMucGxhY2Vob2xkZXIgXHQ9IHBhcmFtcy5wbGFjZWhvbGRlciB8fCBmYWxzZTtcblx0fSBlbHNlIHtcblx0XHR0aGlzLmxheW91dCBcdFx0PSBbXTtcblx0XHR0aGlzLnN0eWxlXHRcdFx0PSBuZXcgU3R5bGUoIFtdICk7XG5cdFx0dGhpcy5wbGFjZWhvbGRlciBcdD0gZmFsc2U7XG5cdH1cblxuXHR0aGlzLnRlbXBsYXRlID0gQ29sdW1ucy5UZW1wbGF0ZXNbJ3RlbXBsYXRlcy9sYXlvdXQvcm93LWdyb3VwLmhicyddO1xuXHR0aGlzLiRncm91cDtcbn07XG5cbi8vIFJldHVybiB0aGUgbGF5b3V0IHByb3BlcnRpZXMgYXMgYW4gb2JqZWN0LFxuLy8gZ2l2ZW4gYW55IGpRdWVyeSBncm91cCBvYmplY3RcblRlbXBsYXRlR3JvdXBWaWV3LmxheW91dEZvckdyb3VwID0gZnVuY3Rpb24oICRncm91cCApIHtcblx0dmFyIGxheW91dCA9IFtdO1xuXG5cdGlmICggISggJGdyb3VwIGluc3RhbmNlb2YgalF1ZXJ5ICkgKSB7XG5cdFx0dGhyb3cgXCJleGNlcHRpb246IGdyb3VwIG11c3QgYmUgalF1ZXJ5IG9iamVjdFwiO1xuXHR9XG5cblx0TEFZT1VUX1BST1BFUlRJRVMuZm9yRWFjaChmdW5jdGlvbiggcHJvcGVydHksIGkgKSB7XG5cdFx0dmFyIHZhbHVlID0gJGdyb3VwLmRhdGEoIHByb3BlcnR5ICk7XG5cdFx0aWYgKCB2YWx1ZSApIHtcblx0XHRcdGxheW91dC5wdXNoKHtcblx0XHRcdFx0cHJvcGVydHk6IHByb3BlcnR5LFxuXHRcdFx0XHR2YWx1ZTogdmFsdWVcblx0XHRcdH0pO1xuXHRcdH1cblx0fSk7XG5cdHJldHVybiBsYXlvdXQ7XG59O1xuXG5UZW1wbGF0ZUdyb3VwVmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oKSB7XG5cdHZhciAkdGVtcGxhdGUgPSAkKCB0aGlzLnRlbXBsYXRlKHtcblx0XHRwbGFjZWhvbGRlcjogXHR0aGlzLnBsYWNlaG9sZGVyLFxuXHRcdHN0eWxlOiBcdFx0XHR0aGlzLnN0eWxlLnN0eWxlcyxcblx0XHRsYXlvdXQ6IFx0XHR0aGlzLmxheW91dFxuXHR9KSk7XG5cdHRoaXMuJGdyb3VwID0gJHRlbXBsYXRlO1xuXG5cdHRoaXMuX3NldHVwRXZlbnRzKCk7XG5cdHRoaXMuX3NldHVwRHJvcCgpO1xuXG5cdHJldHVybiB0aGlzLiRncm91cDtcbn07XG5cblRlbXBsYXRlR3JvdXBWaWV3LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiggcHJvcGVydHksIHZhbHVlICkge1xuXG5cdC8vIFJlcGxhY2UgZWFjaCBsYXlvdXQgdmFsdWUgd2l0aCBhIHBvdGVudGlhbCBuZXcgb25lXG5cdHRoaXMubGF5b3V0LmZvckVhY2goZnVuY3Rpb24oIGxheW91dCwgaSApIHtcblx0XHR0aGlzLiRncm91cC5kYXRhKCBsYXlvdXQucHJvcGVydHksIGxheW91dC52YWx1ZSApO1xuXHRcdHRoaXMuJGdyb3VwLmF0dHIoICdsYXlvdXQtJyArIGxheW91dC5wcm9wZXJ0eSwgbGF5b3V0LnZhbHVlICk7XG5cdH0uYmluZCggdGhpcyApKTtcblxuXHQvLyBBbGVydCBhbnkgbGlzdGVuZXJzIHRoYXQgdGhlIGdyb3VwIGhhcyBjaGFuZ2VkXG5cdC8vIHZhciBldmVudCA9IG5ldyBDdXN0b21FdmVudCggJ0NvbHVtbnMuR3JvdXBWaWV3LkRpZENoYW5nZScsIHtcblx0Ly8gXHRncm91cFZpZXc6IFx0dGhpc1xuXHQvLyB9KTtcblx0Ly8gdmFyIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdC8vIGV2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5UZW1wbGF0ZUdyb3VwVmlldy5EaWRDaGFuZ2UnLCBmYWxzZSwgZmFsc2UsIHtcblx0Ly8gXHRncm91cFZpZXc6IFx0dGhpc1xuXHQvLyB9KTtcblx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG5cblx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuVGVtcGxhdGVHcm91cFZpZXcuRGlkQ2hhbmdlJywge1xuXHRcdGdyb3VwVmlldzogXHR0aGlzXG5cdH0pO1xuXG5cdHJldHVybiB0aGlzLiRncm91cDtcbn07XG5cbi8vIFJldHVybiB0aGUgY29ycmVjdCBsYXlvdXQgYXR0cmlidXRlIGZvciBhIGdpdmVuIHByb3BlcnR5XG4vLyBAcGFyYW0geyBzdHJpbmcgfSBwcm9wZXJ0eSAtLSB0aGUgcmVxdWVzdGVkIGxheW91dCBwcm9wZXJ0eVxuLy8gQHJldHVybiB7IHN0cmluZyB9IHRoZSBjb3JyZXNwb25kaW5nIHZhbHVlXG5UZW1wbGF0ZUdyb3VwVmlldy5wcm90b3R5cGUuZ2V0U3R5bGUgPSBmdW5jdGlvbiggcHJvcGVydHkgKSB7XG5cdHZhciB2YWx1ZTtcblxuXHQvLyBJZiB0aGVyZSB3YXMgbm90IG1hdGNoIGluIHRoZSBsYXlvdXQgb2JqZWN0LFxuXHQvLyBjaGVjayB0aGUgc3R5bGUgb2JqZWN0XG5cdC8vIExvb3AgdGhyb3VnaCBlYWNoIHByb3BlcnR5IHVudGlsIHdlIGZpbmQgYSBtYXRjaFxuXHRpZiAoIHRoaXMuc3R5bGUgKSB7XG5cdFx0dmFsdWUgPSB0aGlzLnN0eWxlLmdldCggcHJvcGVydHkgKVxuXHR9XG5cblx0Ly8gTG9vcCB0aHJvdWdoIGVhY2ggbGF5b3V0IHByb3BlcnR5XG5cdC8vIHVudGlsIHdlIGZpbmQgYSBtYXRjaFxuXHQvLyBwb3RlbnRpYWxseSBhIGJldHRlciBvbmUgdGhhdCBpbiB0aGUgc3R5bGUgc2V0XG5cdHRoaXMubGF5b3V0LmZvckVhY2goZnVuY3Rpb24oIGxheW91dCwgaSApIHtcblx0XHRpZiAoIGxheW91dC5wcm9wZXJ0eSA9PT0gcHJvcGVydHkgKSB7XG5cdFx0XHR2YWx1ZSA9IGxheW91dC52YWx1ZVxuXHRcdH1cblx0fSk7XG5cblx0Ly8gQXMgYSBsYXN0IHJlc29ydCwgY2hlY2sgdGhlIGNzcyBmb3IgdGhlIGVsZW1lbnRcblx0Ly8gYW5kIHJldHVybiBpdHMgdmFsdWVcblx0aWYgKCB2YWx1ZSApIHtcblx0XHRyZXR1cm4gdmFsdWU7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIHRoaXMuJGdyb3VwLmNzcyggcHJvcGVydHkgKTtcblx0fVxufTtcblxuLy8gR2V0IHRoZSB0ZW1wbGF0ZSdzIHRpdGxlIGZvciBkaXNwbGF5XG4vLyBTaG91bGQgYmUgJ1JvdycgZm9yIHRoZSBmaXJzdCBncm91cCBpbiB0aGUgdGVtcGxhdGVcbi8vIGFuZCAnR3JvdXAnIGZvciBhbGwgb3RoZXJzXG4vLyBAcmV0dXJuIHsgc3RyaW5nIH0gLS0gVGhlIGdyb3VwJ3MgdGl0bGVcblRlbXBsYXRlR3JvdXBWaWV3LnByb3RvdHlwZS50aXRsZSA9IGZ1bmN0aW9uKCkge1xuXG5cdC8vIElzIHRoaXMgdGhlIGZpcnN0IGdyb3VwIGluIHRoZSB0ZW1wbGF0ZT9cblx0aWYgKCB0aGlzLiRncm91cC5wYXJlbnQoJy5sYXlvdXQtdGVtcGxhdGUtcm93JykubGVuZ3RoICkge1xuXHRcdHJldHVybiAnUm93Jztcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gJ0dyb3VwJztcblx0fVxufTtcblxuVGVtcGxhdGVHcm91cFZpZXcucHJvdG90eXBlLnJlbW92ZVBsYWNlaG9sZGVycyA9IGZ1bmN0aW9uKCkge1xuXG5cdC8vIFJlbW92ZSBhbnkgcGxhY2Vob2xkZXIgdmFsdWVzXG5cdHRoaXMuJGdyb3VwLmZpbmQoUk9XX1ZBTFVFX1NFTEVDVE9SKS5maWx0ZXIoJy5wbGFjZWhvbGRlcicpLnJlbW92ZSgpO1xuXG5cdC8vIFJlbW92ZSBhbnkgcGxhY2Vob2xkZXIgZ3JvdXBzIHdoaWxlIGxlYXZpbmcgdGhlaXIgY2hpbGRyZW5cblx0dGhpcy4kZ3JvdXAuZmluZChST1dfR1JPVVBfU0VMRUNUT1IpLmZpbHRlcignLnBsYWNlaG9sZGVyJykuY2hpbGRyZW4oKS51bndyYXAoKTtcbn07XG5cblRlbXBsYXRlR3JvdXBWaWV3LnByb3RvdHlwZS5fbWVyZ2VMYXlvdXQgPSBmdW5jdGlvbiggcHJvcGVydHksIHZhbHVlICkge1xuXHR2YXIgZXhpc3RpbmdQcm9wZXJ0eSA9IGZhbHNlO1xuXG5cdC8vIExvb3AgdGhyb3VnaCB0aGUgb2xkIHByb3BlcnRpZXNcblx0Ly8gY29tcGFyaW5nIGVhY2ggd2l0aCB0aGUgbmV3IHByb3BlcnR5LlxuXHQvLyBSZXBsYWNlIGFuIGV4aXN0aW5nIHByb3BlcnR5IGFueXRpbWUgYSBuZXcgb25lIG1hdGNoZXMgaXQuXG5cdC8vIEF0IHRoZSBlbmQsIGFwcGVuZCBhbnkgcmVtYWluaW5nIG5ldyBwcm9wZXJ0aWVzIHRvIHRoZSBtZXJnZWQgc3R5bGVzIGFycmF5LlxuXHR0aGlzLmxheW91dC5mb3JFYWNoKGZ1bmN0aW9uKCBsYXlvdXQsIGkgKSB7XG5cdFx0aWYgKCBsYXlvdXQucHJvcGVydHkgPT09IHByb3BlcnR5ICkge1xuXHRcdFx0bGF5b3V0LnZhbHVlID0gdmFsdWU7XG5cdFx0XHR0aGlzLmxheW91dFsgaSBdID0gbGF5b3V0O1xuXHRcdFx0ZXhpc3RpbmdQcm9wZXJ0eSA9IHRydWU7XG5cdFx0fVxuXHR9LmJpbmQoIHRoaXMgKSk7XG5cblx0Ly8gQWRkIGFsbCByZW1haW5pbmcgbmV3IHN0eWxlcyB0byB0aGUgc3R5bGVzIGFycmF5XG5cdGlmICggIWV4aXN0aW5nUHJvcGVydHkgKSB7XG5cdFx0dGhpcy5sYXlvdXQucHVzaCh7XG5cdFx0XHRwcm9wZXJ0eTogcHJvcGVydHksXG5cdFx0XHR2YWx1ZTogdmFsdWVcblx0XHR9KTtcblx0fVxufTtcblxuVGVtcGxhdGVHcm91cFZpZXcucHJvdG90eXBlLl9zZXR1cERyb3AgPSBmdW5jdGlvbigpIHtcblx0dGhpcy4kZ3JvdXAuZHJvcHBhYmxlKHtcblx0XHR0b2xlcmFuY2U6ICdwb2ludGVyJ1xuXHR9KTtcblxuXHR0aGlzLiRncm91cC5vbiggJ2Ryb3BvdmVyJywgJC5wcm94eShmdW5jdGlvbiggZXZlbnQsIHVpICkge1xuXG5cdFx0Ly8gQWxlcnQgYW55IGxpc3RlbmVycyB0aGF0IHRoZSBncm91cCBpcyBub3cgZW5nYWdlZCB0byBiZSBkcm9wcGVkIHVwb25cblx0XHQvLyB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoICdDb2x1bW5zLlRlbXBsYXRlR3JvdXBWaWV3Lkdyb3VwRGlkQmVnaW5Ecm9wT3ZlcldpdGhWYWx1ZVZpZXcnLCB7XG5cdFx0Ly8gZ3JvdXBWaWV3OiBcdHRoaXMsXG5cdFx0Ly8gdmFsdWVWaWV3OiBcdHVpLmRyb3BwYWJsZSxcblx0XHQvLyBldmVudDogXHRcdGV2ZW50LFxuXHRcdC8vIHVpOiBcdFx0dWlcblx0XHQvLyB9KTtcblx0XHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdFx0Ly8gY29sdW1uc0V2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5UZW1wbGF0ZUdyb3VwVmlldy5Hcm91cERpZEJlZ2luRHJvcE92ZXJXaXRoVmFsdWVWaWV3JywgZmFsc2UsIGZhbHNlLCB7XG5cdFx0Ly8gXHRncm91cFZpZXc6IFx0dGhpcyxcblx0XHQvLyBcdHZhbHVlVmlldzogXHR1aS5kcm9wcGFibGUsXG5cdFx0Ly8gXHRldmVudDogXHRcdGV2ZW50LFxuXHRcdC8vIFx0dWk6IFx0XHR1aVxuXHRcdC8vIH0pO1xuXHRcdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY29sdW1uc0V2ZW50KTtcblx0XHRDb2x1bW5zRXZlbnQuc2VuZCgnQ29sdW1ucy5UZW1wbGF0ZUdyb3VwVmlldy5Hcm91cERpZEJlZ2luRHJvcE92ZXJXaXRoVmFsdWVWaWV3Jywge1xuXHRcdFx0Z3JvdXBWaWV3OiBcdHRoaXMsXG5cdFx0XHR2YWx1ZVZpZXc6IFx0dWkuZHJvcHBhYmxlLFxuXHRcdFx0ZXZlbnQ6IFx0XHRldmVudCxcblx0XHRcdHVpOiBcdFx0dWlcblx0XHR9KTtcblxuXHR9LCB0aGlzKSApO1xuXG5cdHRoaXMuJGdyb3VwLm9uKCAnZHJvcG91dCcsICQucHJveHkoZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcblxuXHRcdC8vIEFsZXJ0IGFueSBsaXN0ZW5lcnMgdGhhdCB0aGUgZ3JvdXAgaXMgbm93IGVuZ2FnZWQgdG8gYmUgZHJvcHBlZCB1cG9uXG5cdFx0Ly8gdmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCAnQ29sdW1ucy5UZW1wbGF0ZUdyb3VwVmlldy5Hcm91cERpZEVuZERyb3BPdmVyV2l0aFZhbHVlVmlldycsIHtcblx0XHQvLyBncm91cFZpZXc6IFx0dGhpcyxcblx0XHQvLyB2YWx1ZVZpZXc6IFx0dWkuZHJvcHBhYmxlLFxuXHRcdC8vIGV2ZW50OiBcdFx0ZXZlbnQsXG5cdFx0Ly8gdWk6IFx0XHR1aVxuXHRcdC8vIH0pO1xuXHRcdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0XHQvLyBjb2x1bW5zRXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLlRlbXBsYXRlR3JvdXBWaWV3Lkdyb3VwRGlkRW5kRHJvcE92ZXJXaXRoVmFsdWVWaWV3JywgZmFsc2UsIGZhbHNlLCB7XG5cdFx0Ly8gXHRncm91cFZpZXc6IFx0dGhpcyxcblx0XHQvLyBcdHZhbHVlVmlldzogXHR1aS5kcm9wcGFibGUsXG5cdFx0Ly8gXHRldmVudDogXHRcdGV2ZW50LFxuXHRcdC8vIFx0dWk6IFx0XHR1aVxuXHRcdC8vIH0pO1xuXHRcdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY29sdW1uc0V2ZW50KTtcblx0XHRDb2x1bW5zRXZlbnQuc2VuZCgnQ29sdW1ucy5UZW1wbGF0ZUdyb3VwVmlldy5Hcm91cERpZEVuZERyb3BPdmVyV2l0aFZhbHVlVmlldycsIHtcblx0XHRcdGdyb3VwVmlldzogXHR0aGlzLFxuXHRcdFx0dmFsdWVWaWV3OiBcdHVpLmRyb3BwYWJsZSxcblx0XHRcdGV2ZW50OiBcdFx0ZXZlbnQsXG5cdFx0XHR1aTogXHRcdHVpXG5cdFx0fSk7XG5cblx0fSwgdGhpcykgKTtcblxuXHR0aGlzLiRncm91cC5vbiggJ2Ryb3AnLCAkLnByb3h5KGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XG5cblx0XHQvLyBBbGVydCBhbnkgbGlzdGVuZXJzIHRoYXQgdGhlIGdyb3VwIGlzIG5vdyBlbmdhZ2VkIHRvIGJlIGRyb3BwZWQgdXBvblxuXHRcdC8vIHZhciBldmVudCA9IG5ldyBDdXN0b21FdmVudCggJ0NvbHVtbnMuVGVtcGxhdGVHcm91cFZpZXcuR3JvdXBEaWREcm9wV2l0aFZhbHVlVmlldycsIHtcblx0XHQvLyBncm91cFZpZXc6IFx0dGhpcyxcblx0XHQvLyB2YWx1ZVZpZXc6IFx0dWkuZHJvcHBhYmxlLFxuXHRcdC8vIGV2ZW50OiBcdFx0ZXZlbnQsXG5cdFx0Ly8gdWk6IFx0XHR1aVxuXHRcdC8vIH0pO1xuXHRcdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0XHQvLyBjb2x1bW5zRXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLlRlbXBsYXRlR3JvdXBWaWV3Lkdyb3VwRGlkRHJvcFdpdGhWYWx1ZVZpZXcnLCBmYWxzZSwgZmFsc2UsIHtcblx0XHQvLyBcdGdyb3VwVmlldzogXHR0aGlzLFxuXHRcdC8vIFx0dmFsdWVWaWV3OiBcdHVpLmRyb3BwYWJsZSxcblx0XHQvLyBcdGV2ZW50OiBcdFx0ZXZlbnQsXG5cdFx0Ly8gXHR1aTogXHRcdHVpXG5cdFx0Ly8gfSk7XG5cdFx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjb2x1bW5zRXZlbnQpO1xuXHRcdENvbHVtbnNFdmVudC5zZW5kKCdDb2x1bW5zLlRlbXBsYXRlR3JvdXBWaWV3Lkdyb3VwRGlkRHJvcFdpdGhWYWx1ZVZpZXcnLCB7XG5cdFx0XHRncm91cFZpZXc6IFx0dGhpcyxcblx0XHRcdHZhbHVlVmlldzogXHR1aS5kcm9wcGFibGUsXG5cdFx0XHRldmVudDogXHRcdGV2ZW50LFxuXHRcdFx0dWk6IFx0XHR1aVxuXHRcdH0pO1xuXG5cdH0sIHRoaXMpICk7XG59O1xuXG5UZW1wbGF0ZUdyb3VwVmlldy5wcm90b3R5cGUuX3NldHVwRXZlbnRzID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gTGlzdGVuIHRvIHVwZGF0ZXMgZm9yIHRoaXMgZ3JvdXBcblx0Ly8gYW5kIHVwZGF0ZSBpZiB0aGVyZSdzIGEgbWF0Y2hcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5TdHlsZVZpZXcuUHJvcGVydHlEaWRVcGRhdGVXaXRoVmFsdWVGb3JHcm91cFZpZXcnLCB0aGlzLl9vbkdyb3VwRGlkQ2hhbmdlLmJpbmQoIHRoaXMgKSApO1xufTtcblxuVGVtcGxhdGVHcm91cFZpZXcucHJvdG90eXBlLl9vbkdyb3VwRGlkQ2hhbmdlID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXHR2YXIgJG5ld0dyb3VwID0gZGF0YS5ncm91cFZpZXcuJGdyb3VwO1xuXHRpZiAoIHRoaXMuJGdyb3VwLmlzKCAkbmV3R3JvdXAgKSApIHtcblx0XHR0aGlzLl9tZXJnZUxheW91dCggZGF0YS5wcm9wZXJ0eSwgZGF0YS52YWx1ZSApXG5cdFx0dGhpcy51cGRhdGUoKTtcblx0fVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBUZW1wbGF0ZUdyb3VwVmlldzsiLCJ2YXIgQ29sdW1uc0V2ZW50ID0gcmVxdWlyZSgnLi4vbW9kZWxzL0NvbHVtbnNFdmVudC5qcycpO1xuXG4vLyBPYmplY3QgdG8gbWFuYWdlIHByb3BlcnRpZXMgb2YgYW5kIGludGVyYWN0aW9uXG4vLyB3aXRoIHRlbXBsYXRlIHZhbHVlIHpvbmVzLlxuLy8gVmFsdWUgem9uZXMgYXJlIHBvcHVsYXRlZCB3aXRoIGl0ZW1zIGFuZFxuLy8gY2FuIHJlYWN0IHRvIGNoYW5nZXMgaW4gYW4gaXRlbSdzIHByb3BlcnRpZXMuXG5cbkhhbmRsZWJhcnMucmVnaXN0ZXJQYXJ0aWFsKCdsYXlvdXQnLCBDb2x1bW5zLlRlbXBsYXRlc1sndGVtcGxhdGVzL2xheW91dC9sYXlvdXQuaGJzJ10pO1xuSGFuZGxlYmFycy5yZWdpc3RlclBhcnRpYWwoJ3N0eWxlJywgQ29sdW1ucy5UZW1wbGF0ZXNbJ3RlbXBsYXRlcy9sYXlvdXQvc3R5bGUuaGJzJ10pO1xuXG5UZW1wbGF0ZVZhbHVlVmlldyA9IGZ1bmN0aW9uKCBpdGVtLCBwbGFjZWhvbGRlciApIHtcblxuXHRpZiAoIGl0ZW0gJiYgaXRlbSBpbnN0YW5jZW9mIEl0ZW0gKSB7XG5cdFx0dGhpcy5pdGVtID0gaXRlbVxuXHR9IGVsc2UgaWYgKCBpdGVtICkge1xuXHRcdHRocm93IFwiZXhjZXB0aW9uOiBpdGVtIG11c3QgYmUgb2YgdHlwZSBJdGVtXCJcblx0fSBlbHNlIHtcblx0XHR0aGlzLml0ZW07XG5cdH1cblx0XG5cdHRoaXMudGVtcGxhdGUgPSBDb2x1bW5zLlRlbXBsYXRlc1sndGVtcGxhdGVzL2xheW91dC9yb3ctdmFsdWUuaGJzJ107XG5cdHRoaXMucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlciB8fCBmYWxzZTtcblx0dGhpcy4kdmFsdWU7XG59O1xuXG5UZW1wbGF0ZVZhbHVlVmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oKSB7XG5cdHZhciAkdGVtcGxhdGUgPSAkKCB0aGlzLnRlbXBsYXRlKHtcblx0XHRkYXRhOiBcdFx0XHR0aGlzLml0ZW0uZm9ybWF0dGVkVGl0bGUoKSxcblx0XHRzdHlsZTogXHRcdFx0dGhpcy5pdGVtLnN0eWxlLnN0eWxlcyxcblx0XHRwbGFjZWhvbGRlcjogXHR0aGlzLnBsYWNlaG9sZGVyXG5cdH0pKTtcblx0dGhpcy4kdmFsdWUgPSAkdGVtcGxhdGU7XG5cblx0aWYgKCAhdGhpcy5wbGFjZWhvbGRlciApIHtcblx0XHR0aGlzLl9zZXR1cEV2ZW50cygpO1xuXHRcdHRoaXMuX3NldHVwRHJhZygpO1xuXHRcdHRoaXMuX3NldHVwQ2xpY2soKTtcblx0fVxuXG5cdHJldHVybiB0aGlzLiR2YWx1ZTtcbn07XG5cblRlbXBsYXRlVmFsdWVWaWV3LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbigpIHtcblx0Ly8gVXBkYXRlIHRoZSB2YWx1ZSdzIHRleHRcblx0dGhpcy4kdmFsdWUudGV4dCggdGhpcy5pdGVtLmZvcm1hdHRlZFRpdGxlKCkgKTtcblx0Ly8gVXBkYXRlIHRoZSB2YWx1ZSdzIHN0eWxlXG5cdHRoaXMuJHZhbHVlLmF0dHIoICdzdHlsZScsIHRoaXMuaXRlbS5zdHlsZS5jc3MoKSApO1xuXHQvLyBVcGRhdGUgdGhlIHZhbHVlJ3MgcGxhY2Vob2xkZXIgc3RhdHVzXG5cblx0Ly8gQWxlcnQgYW55IGxpc3RlbmVycyB0aGF0IHRoZSB2YWx1ZSBoYXMgY2hhbmdlZFxuXHQvLyB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoICdDb2x1bW5zLlZhbHVlVmlldy5EaWRDaGFuZ2UnLCB7XG5cdC8vIFx0dmFsdWVWaWV3OiBcdHRoaXNcblx0Ly8gfSk7XG5cdC8vIHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHQvLyBldmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuVGVtcGxhdGVWYWx1ZVZpZXcuRGlkQ2hhbmdlJywgZmFsc2UsIGZhbHNlLCB7XG5cdC8vIFx0dmFsdWVWaWV3OiBcdHRoaXNcblx0Ly8gfSk7XG5cdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuXHRDb2x1bW5zRXZlbnQuc2VuZCgnQ29sdW1ucy5UZW1wbGF0ZVZhbHVlVmlldy5EaWRDaGFuZ2UnLCB7XG5cdFx0dmFsdWVWaWV3OiBcdHRoaXNcblx0fSk7XG5cblx0cmV0dXJuIHRoaXMuJHZhbHVlO1xufTtcblxuVGVtcGxhdGVWYWx1ZVZpZXcucHJvdG90eXBlLl9zZXR1cERyYWcgPSBmdW5jdGlvbigpIHtcblxuXHR0aGlzLiR2YWx1ZS5kcmFnZ2FibGUoe1xuXHRcdC8vIHJldmVydDogJ2ludmFsaWQnLFxuXHRcdC8vIHJldmVydER1cmF0aW9uOiAyMDAsXG5cdFx0aGVscGVyOiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBpdGVtVmlldyA9IG5ldyBJdGVtVmlldyggdGhpcy5pdGVtICk7XG5cdFx0XHRyZXR1cm4gaXRlbVZpZXcucmVuZGVyKCk7XG5cdFx0fS5iaW5kKCB0aGlzICksXG5cdFx0b3BhY2l0eTogLjJcblx0fSk7XG5cblx0dGhpcy4kdmFsdWUub24oICdkcmFnc3RhcnQnLCAkLnByb3h5KGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XG5cblx0XHQkKCBldmVudC50YXJnZXQgKS5hZGRDbGFzcygnaW5hY3RpdmUnKTtcblxuXHRcdC8vIE1ha2Ugc3VyZSB0aGlzIG9iamVjdCBubyBsb25nZXIgcmVjZWl2ZXMgZXZlbnQgdXBkYXRlc1xuXHRcdHRoaXMuX3RlYXJkb3duRXZlbnRzKCk7XG5cblx0XHQvLyBBbGVydCBhbnkgbGlzdGVuZXJzIHRoYXQgdGhlIGl0ZW0gaGFzIHN0YXJ0ZWQgZHJhZ1xuXHRcdC8vIHZhciBldmVudCA9IG5ldyBDdXN0b21FdmVudCggJ0NvbHVtbnMuSXRlbVZpZXcuSXRlbURpZEJlZ2luRHJhZycsIHtcblx0XHQvLyBcdGl0ZW06IFx0dGhpcyxcblx0XHQvLyBcdGV2ZW50OiBcdGV2ZW50LFxuXHRcdC8vIFx0dWk6IFx0dWlcblx0XHQvLyB9KTtcblx0XHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdFx0Ly8gY29sdW1uc0V2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5UZW1wbGF0ZVZhbHVlVmlldy5WYWx1ZURpZEJlZ2luRHJhZ1dpdGhJdGVtJywgZmFsc2UsIGZhbHNlLCB7XG5cdFx0Ly8gXHR2YWx1ZVZpZXc6IFx0dGhpcyxcblx0XHQvLyBcdGl0ZW06IFx0XHR0aGlzLml0ZW0sXG5cdFx0Ly8gXHRldmVudDogXHRcdGV2ZW50LFxuXHRcdC8vIFx0dWk6IFx0XHR1aVxuXHRcdC8vIH0pO1xuXHRcdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY29sdW1uc0V2ZW50KTtcblx0XHRDb2x1bW5zRXZlbnQuc2VuZCgnQ29sdW1ucy5UZW1wbGF0ZVZhbHVlVmlldy5WYWx1ZURpZEJlZ2luRHJhZ1dpdGhJdGVtJywge1xuXHRcdFx0dmFsdWVWaWV3OiBcdHRoaXMsXG5cdFx0XHRpdGVtOiBcdFx0dGhpcy5pdGVtLFxuXHRcdFx0ZXZlbnQ6IFx0XHRldmVudCxcblx0XHRcdHVpOiBcdFx0dWlcblx0XHR9KTtcblxuXHR9LCB0aGlzKSApO1xuXG5cdHRoaXMuJHZhbHVlLm9uKCAnZHJhZ3N0b3AnLCAkLnByb3h5KGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XG5cblx0XHQkKCBldmVudC50YXJnZXQgKS5yZW1vdmUoKTtcblxuXHRcdC8vIEFsZXJ0IGFueSBsaXN0ZW5lcnMgdGhhdCB0aGUgaXRlbSBoYXMgc3RhcnRlZCBkcmFnXG5cdFx0Ly8gdmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCAnQ29sdW1ucy5JdGVtVmlldy5JdGVtRGlkQkVuZERyYWcnLCB7XG5cdFx0Ly8gXHRpdGVtOiBcdHRoaXMsXG5cdFx0Ly8gXHRldmVudDogXHRldmVudCxcblx0XHQvLyBcdHVpOiBcdHVpXG5cdFx0Ly8gfSk7XG5cdFx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHRcdC8vIGNvbHVtbnNFdmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuVGVtcGxhdGVWYWx1ZVZpZXcuVmFsdWVEaWRFbmREcmFnV2l0aEl0ZW0nLCBmYWxzZSwgZmFsc2UsIHtcblx0XHQvLyBcdHZhbHVlVmlldzogXHR0aGlzLFxuXHRcdC8vIFx0aXRlbTogXHRcdHRoaXMuaXRlbSxcblx0XHQvLyBcdGV2ZW50OiBcdFx0ZXZlbnQsXG5cdFx0Ly8gXHR1aTogXHRcdHVpXG5cdFx0Ly8gfSk7XG5cdFx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjb2x1bW5zRXZlbnQpO1xuXHRcdENvbHVtbnNFdmVudC5zZW5kKCdDb2x1bW5zLlRlbXBsYXRlVmFsdWVWaWV3LlZhbHVlRGlkRW5kRHJhZ1dpdGhJdGVtJywge1xuXHRcdFx0dmFsdWVWaWV3OiBcdHRoaXMsXG5cdFx0XHRpdGVtOiBcdFx0dGhpcy5pdGVtLFxuXHRcdFx0ZXZlbnQ6IFx0XHRldmVudCxcblx0XHRcdHVpOiBcdFx0dWlcblx0XHR9KTtcblxuXHR9LCB0aGlzKSApO1xuXG5cdHRoaXMuJHZhbHVlLm9uKCAnZHJhZycsICQucHJveHkoZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcblxuXHRcdC8vIEFsZXJ0IGFueSBsaXN0ZW5lcnMgdGhhdCB0aGUgaXRlbSBoYXMgc3RhcnRlZCBkcmFnXG5cdFx0Ly8gdmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCAnQ29sdW1ucy5JdGVtVmlldy5JdGVtRGlkRHJhZycsIHtcblx0XHQvLyBcdGl0ZW06IFx0dGhpcyxcblx0XHQvLyBcdGV2ZW50OiBcdGV2ZW50LFxuXHRcdC8vIFx0dWk6IFx0dWlcblx0XHQvLyB9KTtcblx0XHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdFx0Ly8gY29sdW1uc0V2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5UZW1wbGF0ZVZhbHVlVmlldy5WYWx1ZURpZERyYWdXaXRoSXRlbScsIGZhbHNlLCBmYWxzZSwge1xuXHRcdC8vIFx0dmFsdWVWaWV3OiBcdHRoaXMsXG5cdFx0Ly8gXHRpdGVtOiBcdFx0dGhpcy5pdGVtLFxuXHRcdC8vIFx0ZXZlbnQ6IFx0XHRldmVudCxcblx0XHQvLyBcdHVpOiBcdFx0dWlcblx0XHQvLyB9KTtcblx0XHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGNvbHVtbnNFdmVudCk7XG5cdFx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuVGVtcGxhdGVWYWx1ZVZpZXcuVmFsdWVEaWREcmFnV2l0aEl0ZW0nLCB7XG5cdFx0XHR2YWx1ZVZpZXc6IFx0dGhpcyxcblx0XHRcdGl0ZW06IFx0XHR0aGlzLml0ZW0sXG5cdFx0XHRldmVudDogXHRcdGV2ZW50LFxuXHRcdFx0dWk6IFx0XHR1aVxuXHRcdH0pO1xuXG5cdH0sIHRoaXMpICk7XG59O1xuXG5UZW1wbGF0ZVZhbHVlVmlldy5wcm90b3R5cGUuX3NldHVwQ2xpY2sgPSBmdW5jdGlvbigpIHtcblxuXHR0aGlzLiR2YWx1ZS5vbiggJ2NsaWNrJywgJC5wcm94eShmdW5jdGlvbiggZXZlbnQgKSB7XG5cblx0XHR0aGlzLiR2YWx1ZS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcblxuXHRcdENvbHVtbnNFdmVudC5zZW5kKCdDb2x1bW5zLlRlbXBsYXRlVmFsdWVWaWV3LlZhbHVlRGlkU2VsZWN0V2l0aEl0ZW0nLCB7XG5cdFx0XHR2YWx1ZVZpZXc6IFx0dGhpcyxcblx0XHRcdGl0ZW06IFx0XHR0aGlzLml0ZW1cblx0XHR9KTtcblxuXHR9LCB0aGlzICkgKTtcbn07XG5cblRlbXBsYXRlVmFsdWVWaWV3LnByb3RvdHlwZS5fc2V0dXBFdmVudHMgPSBmdW5jdGlvbigpIHtcblxuXHR0aGlzLm9uSXRlbURpZENoYW5nZSA9IHRoaXMuX29uSXRlbURpZENoYW5nZS5iaW5kKCB0aGlzICk7XG5cblx0Ly8gTGlzdGVuIHRvIHVwZGF0ZXMgZm9yIHRoaXMgaXRlbVxuXHQvLyBhbmQgdXBkYXRlIGlmIHRoZXJlJ3MgYSBtYXRjaFxuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLkl0ZW0uRGlkQ2hhbmdlJywgdGhpcy5vbkl0ZW1EaWRDaGFuZ2UgKTtcbn07XG5cblRlbXBsYXRlVmFsdWVWaWV3LnByb3RvdHlwZS5fdGVhcmRvd25FdmVudHMgPSBmdW5jdGlvbigpIHtcblxuXHRDb2x1bW5zRXZlbnQub2ZmKCAnQ29sdW1ucy5JdGVtLkRpZENoYW5nZScsIHRoaXMub25JdGVtRGlkQ2hhbmdlICk7XG59O1xuXG5UZW1wbGF0ZVZhbHVlVmlldy5wcm90b3R5cGUuX29uSXRlbURpZENoYW5nZSA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblx0dmFyIG5ld0l0ZW0gPSBkYXRhLml0ZW07XG5cdGlmICggdGhpcy5pdGVtLmlzKCBuZXdJdGVtICkgKSB7XG5cdFx0dGhpcy5pdGVtID0gbmV3SXRlbTtcblx0XHR0aGlzLnVwZGF0ZSgpO1xuXHR9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRlbXBsYXRlVmFsdWVWaWV3OyIsInZhciBDb2x1bW5zRXZlbnQgXHRcdFx0XHQ9IHJlcXVpcmUoJy4uL21vZGVscy9Db2x1bW5zRXZlbnQuanMnKTtcbnZhciBDb2x1bW5zQW5hbHl0aWNzXHRcdFx0PSByZXF1aXJlKCcuLi9tb2RlbHMvQ29sdW1uc0FuYWx5dGljcy5qcycpO1xudmFyIFRlbXBsYXRlR3JvdXBWaWV3IFx0XHRcdD0gcmVxdWlyZSgnLi9UZW1wbGF0ZUdyb3VwVmlldy5qcycpO1xudmFyIFRlbXBsYXRlVmFsdWVWaWV3IFx0XHRcdD0gcmVxdWlyZSgnLi9UZW1wbGF0ZVZhbHVlVmlldy5qcycpO1xudmFyIGNvbmZpZyBcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoJy4uL2NvbmZpZy5qcycpO1xuXG4vLyBPYmplY3QgdG8gbWFuYWdlIHByb3BlcnRpZXMgb2YgYW5kIGludGVyYWN0aW9uXG4vLyB3aXRoIHRoZSB0ZW1wbGF0ZSBpdHNlbGYuXG5cbnZhciBST1dfR1JPVVBfU0VMRUNUT1IgXHRcdD0gJy5sYXlvdXQtdGVtcGxhdGUtcm93LWdyb3VwJywgXG5cdFJPV19WQUxVRV9TRUxFQ1RPUiBcdFx0PSAnLmxheW91dC10ZW1wbGF0ZS1yb3ctdmFsdWUnLFxuXHREUkFHR0lOR19JVEVNX1NFTEVDVE9SIFx0PSAnLnVpLWRyYWdnYWJsZS1kcmFnZ2luZycsXG5cdEVYUEFOREVEX0NMQVNTIFx0XHRcdD0gJ2V4cGFuZGVkJyxcblx0RFJPUFBBQkxFX0NMQVNTIFx0XHQ9ICdkcm9wcGFibGUnO1xuXG5UZW1wbGF0ZVZpZXcgPSBmdW5jdGlvbiggbGF5b3V0ICkgIHtcblxuXHR0aGlzLmxheW91dCA9IGxheW91dDs7XG5cdHRoaXMudGVtcGxhdGUgPSBDb2x1bW5zLlRlbXBsYXRlc1sndGVtcGxhdGVzL2xheW91dC90ZW1wbGF0ZS5oYnMnXTtcblx0dGhpcy4kdGVtcGxhdGU7XG5cblx0dGhpcy5kcmFnZ2luZ0l0ZW07XG5cdHRoaXMuZHJvcHBhYmxlSXRlbXMgPSBbXTtcblxuXHR0aGlzLl9zZXR1cEV2ZW50TGlzdGVuZXJzKCk7XG5cblx0VGVtcGxhdGVWaWV3Lmdyb3VwcyA9IFtdO1xufTtcblxuLy8gQ2xhc3MgTWV0aG9kc1xuLy8gLS0tLS0tLS0tLS0tLS0tLVxuVGVtcGxhdGVWaWV3Lmdyb3VwcyA9IFtdO1xuXG4vLyBSZXR1cm4gdGhlIGNvcnJlY3QgdmFsdWUgRE9NIHJlcHJlc2VudGF0aW9uIGZvciBhbiBpdGVtXG4vLyBAcGFyYW0geyBJdGVtIH0gaXRlbSAtLSB0aGUgSXRlbSB0byByZXRyaXZlXG4vLyBAcmV0dXJuIHsgalF1ZXJ5IH0gdGhlIGNvcnJlc3BvbmRpbmcgdGVtcGxhdGUgcmVwcmVzZXRhdGlvblxuVGVtcGxhdGVWaWV3LmdldFZhbHVlRm9ySXRlbSA9IGZ1bmN0aW9uKCBpdGVtICkge1xuXHR2YXIgJHZhbHVlcztcblxuXHQvLyBUaHJvdyBhbiBlcnJvciBpZiB0aGUgaXRlbSBpc24ndCBvZiB0aGUgY29ycmVjdCB0eXBlXG5cdGlmKCAhKCBpdGVtIGluc3RhbmNlb2YgSXRlbSkgKSB7XG5cdFx0dGhyb3cgXCJleHBlY3Rpb246IGl0ZW0gbXVzdCBiZSBvZiB0eXBlIEl0ZW1cIjtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvLyBGaW5kIGFsbCB0aGUgY3VycmVudCB2YWx1ZXMgaW4gdGhlIHRlbXBsYXRlXG5cdC8vIGFuZCBmaWx0ZXIgdGhlbSBieSB0aGVpciBpbm5lciB0ZXh0XG5cdC8vIHJldHVybmluZyBvbmx5IHRoZSBmaXJzdCB0aGF0IG1hdGNoZXMgdGhlIGl0ZW0ncyB0aXRsZVxuXHQkdmFsdWVzID0gJChST1dfVkFMVUVfU0VMRUNUT1IpLmZpbHRlcihmdW5jdGlvbiggaSwgZWxlbWVudCApIHtcblx0XHRyZXR1cm4gJCggZWxlbWVudCApLnRleHQoKS50cmltKCkgPT09IGl0ZW0uZm9ybWF0dGVkVGl0bGUoKTtcblx0fSk7XG5cblx0Ly8gUmV0dXJuIHVuZGVmaW5lZCBpZiB0aGVyZSBhcmUgbm8gcmVzdWx0aW5nIHZhbHVlc1xuXHRpZiAoICEkdmFsdWVzLmxlbmd0aCApIHtcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiAkdmFsdWVzO1xuXHR9XG59XG5cblRlbXBsYXRlVmlldy5nZXRHcm91cHNGb3JJdGVtID0gZnVuY3Rpb24oIGl0ZW0gKSB7XG5cdHZhciAkdmFsdWU7XG5cblx0Ly8gSWYgdGhlIGl0ZW0gaXMgb2YgdHlwZSBJdGVtLCBjb252ZXJ0IGl0IGludG8gYSB2YWx1ZVxuXHRpZiAoIGl0ZW0gaW5zdGFuY2VvZiBJdGVtICkge1xuXHRcdCR2YWx1ZSA9IHRoaXMuZ2V0VmFsdWVGb3JJdGVtKCBpdGVtICk7XG5cdH0gZWxzZSBpZiAoIGl0ZW0gaW5zdGFuY2VvZiBqUXVlcnkgJiYgaXRlbS5oYXNDbGFzcyhST1dfVkFMVUVfU0VMRUNUT1IpICkge1xuXHRcdCR2YWx1ZSA9IGl0ZW07XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgXCJleHBlY3Rpb246IGl0ZW0gbXVzdCBiZSBvZiB0eXBlIEl0ZW0gb3IgalF1ZXJ5IHRlbXBsYXRlIHJvd1wiO1xuXHR9XG5cblx0Ly8gSWYgdGhpcyB2YWx1ZSBpc24ndCBpbiB0aGUgdGVtcGxhdGUsIHJldHVybiB1bmRlZmluZWRcblx0aWYoICEkdmFsdWUgKSB7XG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0fVxuXG5cdC8vIFJldHVybiB0aGUgdmFsdWUncyBwYXJlbnQgZ3JvdXBzXG5cdHJldHVybiAkdmFsdWUucGFyZW50cyhST1dfR1JPVVBfU0VMRUNUT1IpLm1hcChmdW5jdGlvbiggaSwgZ3JvdXAgKSB7XG5cdFx0cmV0dXJuIFRlbXBsYXRlVmlldy5nZXRHcm91cFZpZXdGb3JHcm91cCggJCggZ3JvdXAgKSApO1xuXHR9KS50b0FycmF5KCk7XG5cbn07XG5cblRlbXBsYXRlVmlldy5nZXRHcm91cFZpZXdGb3JHcm91cCA9IGZ1bmN0aW9uKCBncm91cCApIHtcblx0dmFyIG5ld0dyb3VwID0gW107XG5cblx0aWYgKCAhKCBncm91cCBpbnN0YW5jZW9mIFRlbXBsYXRlR3JvdXBWaWV3ICkgJiYgISggZ3JvdXAgaW5zdGFuY2VvZiBqUXVlcnkgKSApIHtcblx0XHR0aHJvdyBcImV4Y2VwdGlvbjogZ3JvdXAgbXVzdCBiZSBUZW1wbGF0ZUdyb3VwVmlldyBvciBqUXVlcnkgb2JqZWN0XCI7XG5cdH1cblxuXHRuZXdHcm91cCA9IFRlbXBsYXRlVmlldy5ncm91cHMuZmlsdGVyKGZ1bmN0aW9uKCBvbGRHcm91cCwgaSApIHtcblx0XHRpZiAoIGdyb3VwIGluc3RhbmNlb2YgVGVtcGxhdGVHcm91cFZpZXcgJiYgZ3JvdXAgPT09IG9sZEdyb3VwICkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSBlbHNlIGlmICggZ3JvdXAgaW5zdGFuY2VvZiBqUXVlcnkgJiYgZ3JvdXAuaXMoIG9sZEdyb3VwLiRncm91cCApICkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH0pO1xuXG5cdGlmICggbmV3R3JvdXAubGVuZ3RoICkge1xuXHRcdHJldHVybiBuZXdHcm91cFsgMCBdO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdH1cbn07XG5cblRlbXBsYXRlVmlldy5yZW1vdmVHcm91cCA9IGZ1bmN0aW9uKCBncm91cCApIHtcblx0dmFyIGdyb3VwVmlldyA9IGdyb3VwLFxuXHRcdGluZGV4O1xuXG5cdC8vIElmIHRoZSBncm91cCBpcyBhIGpxdWVyeSBvYmplY3QsIGdldCBpdHMgZ3JvdXAgdmlld1xuXHRpZiAoIGdyb3VwVmlldyBpbnN0YW5jZW9mIGpRdWVyeSApIHtcblx0XHRncm91cFZpZXcgPSBUZW1wbGF0ZVZpZXcuZ2V0R3JvdXBWaWV3Rm9yR3JvdXAoIGdyb3VwVmlldyApO1xuXHR9XG5cblx0Ly8gR2V0IHRoZSBncm91cCdzIGluZGV4IGluIHRoZSBncm91cHMgYXJyYXlcblx0aW5kZXggPSBUZW1wbGF0ZVZpZXcuZ3JvdXBzLmluZGV4T2YoIGdyb3VwVmlldyApO1xuXG5cdC8vIExldCB0aGUgZ3JvdXAga25vdyB0aGF0IGl0J3MgYWJvdXQgdG8gYmUgcmVtb3ZlZFxuXHQvLyBhbmQgdGhlbiByZW1vdmUgaXRcblx0aWYgKCBpbmRleCA+PSAwICkge1xuXHRcdENvbHVtbnNFdmVudC5zZW5kKCdDb2x1bW5zLlRlbXBsYXRlVmlldy5XaWxsUmVtb3ZlR3JvdXBWaWV3Jywge1xuXHRcdFx0Z3JvdXBWaWV3OiBcdGdyb3VwVmlld1xuXHRcdH0pO1xuXG5cdFx0VGVtcGxhdGVWaWV3Lmdyb3Vwcy5zcGxpY2UoIGluZGV4LCAxICk7XG5cdH1cbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gUmVuZGVyIHRoZSBsYXlvdXQgcHJldmlld1xuXHR0aGlzLl9yZW5kZXJQcmV2aWV3KCk7XG5cblx0Ly8gUmVuZGVyIGFuZCByZXR1cm4gdGhlIHRlbXBsYXRlXG5cdHJldHVybiB0aGlzLl9yZW5kZXJUZW1wbGF0ZSgpO1xufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5fcmVuZGVyUHJldmlldyA9IGZ1bmN0aW9uKCkge1xuXG5cdHZhciBwcmV2aWV3ID0gQ29sdW1ucy5UZW1wbGF0ZXNbJ3RlbXBsYXRlcy9sYXlvdXQvcHJldmlldy5oYnMnXSxcblx0XHQkcHJldmlldyA9ICQoIHByZXZpZXcoe1xuXHRcdFx0c291cmNlOiBjb25maWcuZW1iZWQuaG9zdCArIGNvbmZpZy5lbWJlZC5wYXRoXG5cdFx0fSkgKTtcblxuXHR0aGlzLiRwcmV2aWV3ID0gJHByZXZpZXdcblx0JCgnI2xheW91dCcpLmFwcGVuZCggJHByZXZpZXcgKTtcblxuXHRyZXR1cm4gdGhpcy4kcHJldmlldztcblxufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5fcmVuZGVyVGVtcGxhdGUgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBGb3IgZWFjaCBub2RlIGluIHRoZSBsYXlvdXQgb2JqZWN0LFxuXHQvLyByZW5kZXIgZWl0aGVyIGEgZ3JvdXAgb3IgdmFsdWVcblx0Ly8gYW5kIHJlY3Vyc2l2ZWx5IGFwcGVuZCB0aGVtIHRvIGVhY2ggb3RoZXJcblx0Ly8gdW50aWwgd2UndmUgY29uc3RydWN0ZWQgdGhlIGZ1bGwgdGVtcGxhdGVcblx0dmFyICRyb3cgPSB0aGlzLl9yZW5kZXJSb3dDb21wb25lbnQoIHRoaXMubGF5b3V0Lm1vZGVsICk7XG5cdHZhciAkdGVtcGxhdGUgPSAkKCB0aGlzLnRlbXBsYXRlKCkgKTtcblx0JHRlbXBsYXRlLmZpbmQoJy5sYXlvdXQtdGVtcGxhdGUtcm93JykuYXBwZW5kKCAkcm93ICk7XG5cdCQoJyNsYXlvdXQnKS5hcHBlbmQoICR0ZW1wbGF0ZSApO1xuXHR0aGlzLiR0ZW1wbGF0ZSA9ICR0ZW1wbGF0ZTtcblxuXHR0aGlzLl9zZXR1cFRlbXBsYXRlRXZlbnRzKCk7XG5cdHRoaXMuX2VtaXRSZW5kZXIoKTtcblx0dGhpcy5fZW1pdENoYW5nZSgpO1xuXG5cdHJldHVybiB0aGlzLiR0ZW1wbGF0ZTtcblxufVxuXG5cbi8vIFJlbmRlciBhIHBvcnRpb24gb2YgdGhlIHJvdyBsYXlvdXQgb2JqZWN0XG4vLyBAcGFyYW0geyBvYmplY3QgfSBjb21wb25lbnQgLS0gVGhlIGNvbXBvbmVudCB0byByZW5kZXIgKGVpdGhlciBhIGdyb3VwIG9yIHZhbHVlKVxuLy8gQHJldHVybiB7IGpRdWVyeSBvYmplY3QgfSAtLSB0aGUgY29tcG9uZW50J3MgcmVuZGVyZWQgbGF5b3V0XG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLl9yZW5kZXJSb3dDb21wb25lbnQgPSBmdW5jdGlvbiggY29tcG9uZW50ICkge1xuXHR2YXIgY29tcG9uZW50Vmlldyxcblx0XHQkY29tcG9uZW50O1xuXG5cdC8vIFJlbmRlciB0aGUgdG9wIGxldmVsIGNvbXBvbmVudFxuXHQvLyBhcyBhIGdyb3VwIGlmIGl0J3MgYSBncm91cFxuXHQvLyBvciBhIHZhbHVlIGlmIGl0J3MgYSB2YWx1ZVxuXHRpZiAoIGNvbXBvbmVudC50eXBlID09PSAnZ3JvdXAnICkge1xuXHRcdGNvbXBvbmVudFZpZXcgPSBuZXcgVGVtcGxhdGVHcm91cFZpZXcoeyBsYXlvdXQ6IGNvbXBvbmVudC5sYXlvdXQsIHN0eWxlOiBjb21wb25lbnQuc3R5bGUgfSk7XG5cdFx0JGNvbXBvbmVudCA9IGNvbXBvbmVudFZpZXcucmVuZGVyKCk7XG5cblx0XHQvLyBBZGQgdGhlIGdyb3VwIHRvIHRoZSBncm91cHMgYXJyYXlcblx0XHRUZW1wbGF0ZVZpZXcuZ3JvdXBzLnB1c2goIGNvbXBvbmVudFZpZXcgKTtcblxuXHRcdC8vIExvb3AgdGhyb3VnaCBhbGwgZ3JvdXAgc3VidmFsdWVzIGFuZCByZW5kZXIgdGhvc2UgYXMgd2VsbFxuXHRcdGNvbXBvbmVudC52YWx1ZXMuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGkpIHtcblx0XHRcdCRjb21wb25lbnQuYXBwZW5kKCB0aGlzLl9yZW5kZXJSb3dDb21wb25lbnQoIHZhbHVlICkgKTtcblx0XHR9LmJpbmQoIHRoaXMgKSk7XG5cblx0XHQvLyBSZXR1cm4gdGhlIGZpbmFsIGNvbXBvbmVudCBpbmNsdWRpbmcgcmVuZGVyZWQgc3Vidmlld3Ncblx0XHRyZXR1cm4gJGNvbXBvbmVudDtcblxuXHR9IGVsc2UgaWYgKCBjb21wb25lbnQudHlwZSA9PT0gJ3NpbmdsZScgKSB7XG5cdFx0dmFyIGl0ZW0gPSB0aGlzLnRhYmxlLmdldEl0ZW1Gb3JEYXRhKCBjb21wb25lbnQuZGF0YSApO1xuXHRcdGNvbXBvbmVudFZpZXcgPSBuZXcgVGVtcGxhdGVWYWx1ZVZpZXcoIGl0ZW0gKTtcblx0XHRyZXR1cm4gY29tcG9uZW50Vmlldy5yZW5kZXIoKTtcblx0fVxuXG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLnJlbW92ZVBsYWNlaG9sZGVycyA9IGZ1bmN0aW9uKCkge1xuXG5cdC8vIFJlbW92ZSBhbnkgcGxhY2Vob2xkZXIgdmFsdWVzXG5cdCQoUk9XX1ZBTFVFX1NFTEVDVE9SKS5maWx0ZXIoJy5wbGFjZWhvbGRlcicpLnJlbW92ZSgpO1xuXG5cdC8vIFJlbW92ZSBhbnkgcGxhY2Vob2xkZXIgZ3JvdXBzIHdoaWxlIGxlYXZpbmcgdGhlaXIgY2hpbGRyZW5cblx0JChST1dfR1JPVVBfU0VMRUNUT1IpLmZpbHRlcignLnBsYWNlaG9sZGVyJykuY2hpbGRyZW4oKS51bndyYXAoKTtcbn07XG5cbi8vIElmIHRoaXMgdGhlcmUncyBvbmx5IG9uZSBpdGVtIGxlZnQgaW4gdGhlIHN1cnJvdW5pbmcgZ3JvdXAsIGRpc3NvbHZlIHRoZSBncm91cC5cbi8vIFVubGVzcyB0aGUgcGFyZW50IGdyb3VwIGlzIHRoZSB2ZXJ5IGZpcnN0IGdyb3VwIGluIHRoZSBjZWxsLlxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5kaXNzb2x2ZVNpbmdsZVZhbHVlR3JvdXBzID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gR2V0IGFueSBncm91cHMgdGhhdCBvbmx5IGhhdmUgYSBzaW5nbGUgYWN0aXZlIGl0ZW1cblx0Ly8gYnV0IGV4Y2x1ZGUgdGhlIGZpcnN0IGdyb3VwIGluIHRoZSByb3dcblx0dmFyICRncm91cHMgPSAkKCBST1dfR1JPVVBfU0VMRUNUT1IgKS5ub3QoICcubWFzdGVyID4gJyArIFJPV19HUk9VUF9TRUxFQ1RPUiApLmZpbHRlcihmdW5jdGlvbiggaSwgZ3JvdXAgKSB7XG5cdFx0cmV0dXJuICQoIGdyb3VwICkuY2hpbGRyZW4oIFJPV19WQUxVRV9TRUxFQ1RPUiApLm5vdCggJy5pbmFjdGl2ZScgKS5sZW5ndGggPT09IDE7XG5cdH0pO1xuXG5cdC8vIHZhciAkZ3JvdXBzID0gJCggUk9XX1ZBTFVFX1NFTEVDVE9SICsgJzpvbmx5LWNoaWxkJyApXG5cdC8vIFx0LnBhcmVudCgpXG5cdC8vIFx0Lm5vdCggJ21hc3RlciA+ICcgKyBST1dfR1JPVVBfU0VMRUNUT1IgKTtcblxuXHQvLyBVbndyYXAgdGhlICdvbmx5IGNoaWxkcmVuJyBvZiB0aGVzZSBncm91cHNcblx0JGdyb3Vwcy5lYWNoKGZ1bmN0aW9uKCBpLCBncm91cCApIHtcblx0XHRUZW1wbGF0ZVZpZXcucmVtb3ZlR3JvdXAoICQoIGdyb3VwICkgKTtcblx0fSk7XG5cblx0JGdyb3Vwcy5jaGlsZHJlbigpLnVud3JhcCgpO1xufTtcblxuLy8gUmVtb3ZlIHRoZSBkcmFnZ2luZyBpdGVtIGZyb20gdGhlIHRlbXBsYXRlXG4vLyBpZiBpdCBpcyBhIHZhbHVlLiBQcmVzdW1hYmx5IHRoaXMgaXMgYmVjYXVzZVxuLy8gdGhlIHVzZXIganVzdCBkcmFnZ2VkIGl0IG91dCBvZiB0aGUgdGVtcGxhdGVcblRlbXBsYXRlVmlldy5wcm90b3R5cGUucmVtb3ZlVmFsdWUgPSBmdW5jdGlvbiggdmFsdWVWaWV3ICkge1xuXG5cdGlmICggdmFsdWVWaWV3IGluc3RhbmNlb2YgVGVtcGxhdGVWYWx1ZVZpZXcgKSB7XG5cdFx0dmFsdWVWaWV3LiR2YWx1ZS5yZW1vdmUoKTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBcImV4Y2VwdGlvbjogdmFsdWUgbXVzdCBiZSBvZiB0eXBlIFRlbXBsYXRlVmFsdWVWaWV3XCI7XG5cdH1cbn07XG5cbi8vIEFuaW1hdGUgdGhlIGRyYWdnaW5nIGhlbHBlciB0byB0aGUgcG9zaXRpb24gb2YgaXRzIHJlc3BlY3RpdmUgaXRlbVxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5yZW1vdmVEcmFnZ2luZ1ZhbHVlID0gZnVuY3Rpb24oIGNhbGxiYWNrICkge1xuXHR2YXIgJGhlbHBlciA9ICQoJy51aS1kcmFnZ2FibGUtZHJhZ2dpbmcudWktZHJhZ2dhYmxlLWhhbmRsZScpXG5cdFx0JGNsb25lID0gJGhlbHBlci5jbG9uZSgpLFxuXHRcdCRpdGVtID0gJCgnI2NvbHVtbnMgLmxheW91dC1jb2x1bW4nKS5maWx0ZXIoZnVuY3Rpb24oIGksIGl0ZW0gKSB7XG5cdFx0XHQvLyBjb25zb2xlLmxvZygkKCBpdGVtICkudGV4dCgpLnRyaW0oKSk7XG5cdFx0XHRyZXR1cm4gJGNsb25lLnRleHQoKS50cmltKCkgPT09ICQoIGl0ZW0gKS50ZXh0KCkudHJpbSgpO1xuXHRcdH0pLmZpcnN0KCk7XG5cblx0Ly8gRmluZCB0aGUgcG9zaXRpb24gb2YgdGhlIG9yaWdpbmFsIHRva2VuXG5cdC8vIHZhciBvcmlnaW5hbFBvc2l0aW9uID0ge1xuXHQvLyBcdHRvcDogJG1hdGNoLm9mZnNldCgpLnRvcCxcblx0Ly8gXHRsZWZ0OiAkbWF0Y2gub2Zmc2V0KCkubGVmdFxuXHQvLyB9O1xuXG5cdC8vIENoYW5nZSB0aGUgY2xvbmUgdG8gcG9zaXRpb24gZml4ZWRcblx0Ly8gYW5kIGFkZCB0byBjb2x1bW5zIGNvbnRhaW5lclxuXHQkKCcubGF5b3V0LWNvbHVtbnMnKS5hcHBlbmQoICRjbG9uZSApO1xuXHQkY2xvbmUuY3NzKHtcblx0XHRwb3NpdGlvbjogJ2ZpeGVkJyxcblx0XHR0b3A6ICRoZWxwZXIub2Zmc2V0KCkudG9wLFxuXHRcdGxlZnQ6ICRoZWxwZXIub2Zmc2V0KCkubGVmdFxuXHR9KTtcblxuXHQvLyAkY2xvbmUuYXBwZW5kVG8oJy5sYXlvdXQtY29sdW1ucycpO1xuXG5cdCRjbG9uZS52ZWxvY2l0eSh7XG5cdFx0dHJhbnNsYXRlWDogJGl0ZW0ub2Zmc2V0KCkubGVmdCAtICRjbG9uZS5vZmZzZXQoKS5sZWZ0LFxuXHRcdHRyYW5zbGF0ZVk6ICRpdGVtLm9mZnNldCgpLnRvcCAtICRjbG9uZS5vZmZzZXQoKS50b3Bcblx0fSwge1xuXHRcdGR1cmF0aW9uOiAyMDAsXG5cdFx0Y29tcGxldGU6IHRoaXMuX29uRHJhZ2dpbmdWYWx1ZVJlbW92ZWQuYmluZCggdGhpcyApXG5cdH0pO1xufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5fb25EcmFnZ2luZ1ZhbHVlUmVtb3ZlZCA9IGZ1bmN0aW9uICggZWxlbWVudHMgKSB7XG5cdFxuXHQvLyBSZW1vdmUgdGhlIGNsb25lIGZyb20gdGhlIERPTVxuXHQkKCBlbGVtZW50c1sgMCBdICkucmVtb3ZlKCk7XG5cblx0Ly8gRW1pdCBhIGNoYW5nZSBldmVudFxuXHR0aGlzLl9lbWl0Q2hhbmdlKCk7XG5cbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuX2VtaXRDaGFuZ2UgPSBmdW5jdGlvbigpIHtcblx0XG5cdC8vIEVtaXQgYSBjaGFuZ2UgZXZlbnRcblx0Ly8gdmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCAnQ29sdW1ucy5UZW1wbGF0ZVZpZXcuRGlkQ2hhbmdlJywge1xuXHQvLyB0ZW1wbGF0ZVZpZXc6IFx0dGhpc1xuXHQvLyB9KTtcblx0Ly8gdmFyIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdC8vIGV2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5UZW1wbGF0ZVZpZXcuRGlkQ2hhbmdlJywgZmFsc2UsIGZhbHNlLCB7XG5cdC8vIFx0dGVtcGxhdGVWaWV3OiBcdHRoaXNcblx0Ly8gfSk7XG5cdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuXG5cdENvbHVtbnNFdmVudC5zZW5kKCdDb2x1bW5zLlRlbXBsYXRlVmlldy5EaWRDaGFuZ2UnLCB7XG5cdFx0dGVtcGxhdGVWaWV3OiB0aGlzXG5cdH0pO1xufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5fZW1pdFJlbmRlciA9IGZ1bmN0aW9uKCkge1xuXHRDb2x1bW5zRXZlbnQuc2VuZCgnQ29sdW1ucy5UZW1wbGF0ZVZpZXcuRGlkUmVuZGVyJywge1xuXHRcdHRlbXBsYXRlVmlldzogdGhpc1xuXHR9KTtcbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuX3NldHVwRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBMaXN0ZW4gdG8gYXBwIHJlbmRlciBldmVudFxuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLkRlc2t0b3BWaWV3LkRpZFJlbmRlcicsIHRoaXMuX29uRGVza3RvcFJlbmRlci5iaW5kKCB0aGlzICkgKTtcblx0XG5cdC8vIExpc3RlbiB0byB0aGUgdGFibGUgdXBsb2FkIGV2ZW50XG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuVGFibGUuRGlkVXBsb2FkV2l0aFN1Y2Nlc3MnLCB0aGlzLl9vblRlbXBsYXRlVXBsb2FkLmJpbmQoIHRoaXMgKSApO1xufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5fc2V0dXBUZW1wbGF0ZUV2ZW50cyA9IGZ1bmN0aW9uKCkge1xuXG5cdC8vIExpc3RlbiB0byBkcmFnIGV2ZW50cyBmb3IgaXRlbXNcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5JdGVtVmlldy5JdGVtRGlkQmVnaW5EcmFnJywgdGhpcy5fb25JdGVtRGlkQmVnaW5EcmFnLmJpbmQoIHRoaXMgKSk7XG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuSXRlbVZpZXcuSXRlbURpZEVuZERyYWcnLCB0aGlzLl9vbkl0ZW1EaWRFbmREcmFnLmJpbmQoIHRoaXMgKSk7XG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuSXRlbVZpZXcuSXRlbURpZERyYWcnLCB0aGlzLl9vbkl0ZW1EaWREcmFnLmJpbmQoIHRoaXMgKSk7XG5cblx0Ly8gTGlzdGVuIHRvIGRyYWcgZXZlbnRzIGZvciB2YWx1ZXNcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5UZW1wbGF0ZVZhbHVlVmlldy5WYWx1ZURpZEJlZ2luRHJhZ1dpdGhJdGVtJywgdGhpcy5fb25WYWx1ZURpZEJlZ2luRHJhZy5iaW5kKCB0aGlzICkpO1xuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLlRlbXBsYXRlVmFsdWVWaWV3LlZhbHVlRGlkRW5kRHJhZ1dpdGhJdGVtJywgdGhpcy5fb25WYWx1ZURpZEVuZERyYWcuYmluZCggdGhpcyApKTtcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5UZW1wbGF0ZVZhbHVlVmlldy5WYWx1ZURpZERyYWdXaXRoSXRlbScsIHRoaXMuX29uVmFsdWVEaWREcmFnLmJpbmQoIHRoaXMgKSk7XG5cblx0Ly8gTGlzdGVuIHRvIGRyb3AgZXZlbnRzIGZvciBncm91cHNcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5UZW1wbGF0ZUdyb3VwVmlldy5Hcm91cERpZEJlZ2luRHJvcE92ZXJXaXRoVmFsdWVWaWV3JywgdGhpcy5fb25Hcm91cERpZEJlZ2luRHJvcE92ZXIuYmluZCggdGhpcyApKTtcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5UZW1wbGF0ZUdyb3VwVmlldy5Hcm91cERpZEVuZERyb3BPdmVyV2l0aFZhbHVlVmlldycsIHRoaXMuX29uR3JvdXBEaWRFbmREcm9wT3Zlci5iaW5kKCB0aGlzICkpO1xuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLlRlbXBsYXRlR3JvdXBWaWV3Lkdyb3VwRGlkRHJvcFdpdGhWYWx1ZVZpZXcnLCB0aGlzLl9vbkdyb3VwRGlkRHJvcC5iaW5kKCB0aGlzICkpO1xuXG5cdC8vIExpc3RlbiB0byBlbWJlZGRlZCB0YWJsZSBldmVudHNcblx0Q29sdW1uc0V2ZW50Lm9uKCdDb2x1bW5zVGFibGVEaWRSZW5kZXJEYXRhJywgdGhpcy5fb25UYWJsZURpZFJlbmRlckRhdGEuYmluZCggdGhpcyApICk7XG5cdENvbHVtbnNFdmVudC5vbignQ29sdW1uc1RhYmxlRGlkU2Nyb2xsJywgdGhpcy5fb25UYWJsZURpZFNjcm9sbC5iaW5kKCB0aGlzICkgKTtcblx0Q29sdW1uc0V2ZW50Lm9uKCdDb2x1bW5zVGFibGVXaWxsRXhwYW5kJywgdGhpcy5fb25UYWJsZVdpbGxFeHBhbmQuYmluZCggdGhpcyApICk7XG5cdENvbHVtbnNFdmVudC5vbignQ29sdW1uc1RhYmxlRGlkRXhwYW5kJywgdGhpcy5fb25UYWJsZURpZEV4cGFuZC5iaW5kKCB0aGlzICkgKTtcblx0Q29sdW1uc0V2ZW50Lm9uKCdDb2x1bW5zVGFibGVEaWRDb2xsYXBzZScsIHRoaXMuX29uVGFibGVEaWRDb2xsYXBzZS5iaW5kKCB0aGlzICkgKTtcblxuXHQvLyBMaXN0ZW4gZm9yIHVwZGF0ZXMgdG8gdmFsdWVzIGFuZCBncm91cHNcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5UZW1wbGF0ZVZhbHVlVmlldy5EaWRDaGFuZ2UnLCB0aGlzLl9vblRlbXBsYXRlVmlld0RpZENoYW5nZS5iaW5kKCB0aGlzICkpO1xuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLlRlbXBsYXRlR3JvdXBWaWV3LkRpZENoYW5nZScsIHRoaXMuX29uVGVtcGxhdGVWaWV3RGlkQ2hhbmdlLmJpbmQoIHRoaXMgKSk7XG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLl9vbkRlc2t0b3BSZW5kZXIgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdHRoaXMuX3JlbmRlclByZXZpZXcoKTtcbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuX29uVGVtcGxhdGVWaWV3RGlkQ2hhbmdlID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXHR0aGlzLl9lbWl0Q2hhbmdlKCk7XG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLl9vblRlbXBsYXRlVXBsb2FkID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXHR0aGlzLnRhYmxlID0gZGF0YS50YWJsZTtcblx0dGhpcy5sYXlvdXQgPSBkYXRhLnRhYmxlLmxheW91dDtcblx0dGhpcy5fcmVuZGVyVGVtcGxhdGUoKTtcbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuX29uVGFibGVEaWRSZW5kZXJEYXRhID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXHR0aGlzLiR0ZW1wbGF0ZS5maW5kKCcubGF5b3V0LXRlbXBsYXRlLXJvdycpLmNzcyh7XG5cdFx0aGVpZ2h0OiBkYXRhLnRhYmxlLnRhbGxlc3RSb3dIZWlnaHQoKVxuXHR9KTtcbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuX29uVGFibGVXaWxsRXhwYW5kID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXG5cdC8vIE1vdmUgdGhlIHRlbXBsYXRlIGRvd24gYmVsb3cgdGhlIGhlYWRlclxuXHR0aGlzLiR0ZW1wbGF0ZS52ZWxvY2l0eSh7XG5cdFx0dHJhbnNsYXRlWTogMFxuXHR9LCB7XG5cdFx0ZHVyYXRpb246IDQwMFxuXHR9KTtcbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuX29uVGFibGVEaWRFeHBhbmQgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cblx0dGhpcy4kcHJldmlldy5hZGRDbGFzcyggRVhQQU5ERURfQ0xBU1MgKTtcbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuX29uVGFibGVEaWRDb2xsYXBzZSA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblxuXHR0aGlzLiRwcmV2aWV3LnJlbW92ZUNsYXNzKCBFWFBBTkRFRF9DTEFTUyApO1xufTtcblx0XG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLl9vblRhYmxlRGlkU2Nyb2xsID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXG5cdC8vIE1vdmUgdGhlIHRlbXBsYXRlIHVwIHVudGlsIGl0IGhpdHMgdGhlIGhlYWRlclxuXHR2YXIgbWluU2Nyb2xsID0gLTI0LFxuXHRcdG1heFNjcm9sbCA9IDAsXG5cdFx0c2Nyb2xsID0gLSQoJy5jb2x1bW5zLXRhYmxlLWNvbnRhaW5lcicpLnNjcm9sbFRvcCgpO1xuXG5cdC8vIE1ha2Ugc3VyZSB0aGUgc2Nyb2xsIGlzIHdpdGhpbiBib3VuZHNcblx0c2Nyb2xsID0gc2Nyb2xsIDwgbWluU2Nyb2xsID8gbWluU2Nyb2xsIDogc2Nyb2xsO1xuXHRzY3JvbGwgPSBzY3JvbGwgPiBtYXhTY3JvbGwgPyBtYXhTY3JvbGwgOiBzY3JvbGw7XG5cblx0Ly8gQWRqdXN0IHRoZSB0ZW1wbGF0ZVxuXHQkLlZlbG9jaXR5Lmhvb2soIHRoaXMuJHRlbXBsYXRlLCBcInRyYW5zbGF0ZVlcIiwgc2Nyb2xsICsgXCJweFwiICk7XG59O1xuIFxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5fb25JdGVtRGlkQmVnaW5EcmFnID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXHR0aGlzLmRyYWdnaW5nSXRlbSA9IGRhdGEuaXRlbS5pdGVtO1xufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5fb25JdGVtRGlkRW5kRHJhZyA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblx0dGhpcy5kcmFnZ2luZ0l0ZW0gPSB1bmRlZmluZWQ7XG5cdHRoaXMucmVtb3ZlUGxhY2Vob2xkZXJzKCk7XG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLl9vbkl0ZW1EaWREcmFnID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXHRpZiAoIHRoaXMuZHJvcHBhYmxlSXRlbXMubGVuZ3RoICkge1xuXHRcdHRoaXMucmVtb3ZlUGxhY2Vob2xkZXJzKCk7XG5cdFx0dGhpcy5wb3NpdGlvbkRyb3BGb3JEcmFnRXZlbnRJblBhcmVudFdpdGhQbGFjZWhvbGRlciggZGF0YS5ldmVudCwgdGhpcy5kcm9wcGFibGVJdGVtc1sgdGhpcy5kcm9wcGFibGVJdGVtcy5sZW5ndGggLSAxIF0uJGdyb3VwLCB0cnVlICk7XG5cdH1cbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuX29uVmFsdWVEaWRCZWdpbkRyYWcgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdHRoaXMuZHJhZ2dpbmdJdGVtID0gZGF0YS52YWx1ZVZpZXcuaXRlbTtcblx0dGhpcy5kaXNzb2x2ZVNpbmdsZVZhbHVlR3JvdXBzKCk7XG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLl9vblZhbHVlRGlkRW5kRHJhZyA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblx0Ly8gaWYgKCAhdGhpcy5kcm9wcGFibGVJdGVtcy5sZW5ndGggKSB7XG5cdGlmICggIVRlbXBsYXRlVmlldy5nZXRWYWx1ZUZvckl0ZW0oIGRhdGEudmFsdWVWaWV3Lml0ZW0gKSApIHtcblx0XHR0aGlzLnJlbW92ZURyYWdnaW5nVmFsdWUoKTtcblxuXHRcdENvbHVtbnNBbmFseXRpY3Muc2VuZCh7XG5cdFx0XHRjYXRlZ29yeTogJ3RlbXBsYXRlJyxcblx0XHRcdGFjdGlvbjogJ3JlbW92ZScsXG5cdFx0XHR0YWJsZV9pZDogdGhpcy50YWJsZS5pZFxuXHRcdH0pO1xuXHRcdC8vIHRoaXMuX2VtaXRDaGFuZ2UoKTtcblx0fVxufVxuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLl9vblZhbHVlRGlkRHJhZyA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblx0aWYgKCB0aGlzLmRyb3BwYWJsZUl0ZW1zLmxlbmd0aCApIHtcblx0XHR0aGlzLnJlbW92ZVBsYWNlaG9sZGVycygpO1xuXHRcdHRoaXMucG9zaXRpb25Ecm9wRm9yRHJhZ0V2ZW50SW5QYXJlbnRXaXRoUGxhY2Vob2xkZXIoIGRhdGEuZXZlbnQsIHRoaXMuZHJvcHBhYmxlSXRlbXNbIHRoaXMuZHJvcHBhYmxlSXRlbXMubGVuZ3RoIC0gMSBdLiRncm91cCAsIHRydWUgKTtcblx0fVxufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5fb25Hcm91cERpZEJlZ2luRHJvcE92ZXIgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdGlmICggdGhpcy5kcm9wcGFibGVJdGVtcy5pbmRleE9mKCBkYXRhLmdyb3VwVmlldyApID09IC0xICkge1xuXHRcdHRoaXMuZHJvcHBhYmxlSXRlbXMucHVzaCggZGF0YS5ncm91cFZpZXcgKTtcblx0fVxuXG5cdCQoIERSQUdHSU5HX0lURU1fU0VMRUNUT1IgKS5hZGRDbGFzcyggRFJPUFBBQkxFX0NMQVNTICk7XG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLl9vbkdyb3VwRGlkRW5kRHJvcE92ZXIgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdHZhciBncm91cFZpZXcgPSBkYXRhLmdyb3VwVmlldztcblxuXHRncm91cFZpZXcucmVtb3ZlUGxhY2Vob2xkZXJzKCk7XG5cdHRoaXMuZHJvcHBhYmxlSXRlbXMuc3BsaWNlKCB0aGlzLmRyb3BwYWJsZUl0ZW1zLmluZGV4T2YoIGdyb3VwVmlldyApLCAxICk7XG5cblx0JCggRFJBR0dJTkdfSVRFTV9TRUxFQ1RPUiApLnJlbW92ZUNsYXNzKCBEUk9QUEFCTEVfQ0xBU1MgKTtcbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuX29uR3JvdXBEaWREcm9wID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICkge1xuXHR2YXIgZ3JvdXBWaWV3ID0gZGF0YS5ncm91cFZpZXc7XG5cblx0Ly8gRG9uJ3QgZG8gYW55dGhpbmcgaWYgdGhpcyBncm91cCBpc24ndCB0aGUgbW9zdCByZWNlbnRseSBob3ZlcmVkIG92ZXJcblx0Ly8gb2YgaWYgdGhlcmUgYXJlIGN1cnJlbnRseSBubyBob3ZlcmVkIGdyb3VwcyAod2hpY2ggc2hvdWxkIG5ldmVyIGJlIHRoZSBjYXNlKVxuXHRpZiAoICF0aGlzLmRyb3BwYWJsZUl0ZW1zLmxlbmd0aCB8fCB0aGlzLmRyb3BwYWJsZUl0ZW1zWyB0aGlzLmRyb3BwYWJsZUl0ZW1zLmxlbmd0aCAtIDEgXSAhPT0gZ3JvdXBWaWV3ICkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vIE90aGVyd2lzZSwgY2xlYXIgYWxsIHRoZSBncm91cCdzIHBsYWNlaG9sZGVyc1xuXHRncm91cFZpZXcucmVtb3ZlUGxhY2Vob2xkZXJzKCk7XG5cblx0Ly8gQW5kIGZpbmFsbHkgcG9zaXRpb24gdGhlIG5ldyBpdGVtIGluIHRoZSB0ZW1wbGF0ZVxuXHR0aGlzLnBvc2l0aW9uRHJvcEZvckRyYWdFdmVudEluUGFyZW50V2l0aFBsYWNlaG9sZGVyKCBkYXRhLmV2ZW50LCB0aGlzLmRyb3BwYWJsZUl0ZW1zWyB0aGlzLmRyb3BwYWJsZUl0ZW1zLmxlbmd0aCAtIDEgXS4kZ3JvdXAgLCBmYWxzZSApXG5cblx0Ly8gRW1wdHkgdGhlIGRyb3BwYWJsZSBpdGVtcyBhcnJheVxuXHR0aGlzLmRyb3BwYWJsZUl0ZW1zID0gW107XG5cblx0Q29sdW1uc0FuYWx5dGljcy5zZW5kKHtcblx0XHRjYXRlZ29yeTogJ3RlbXBsYXRlJyxcblx0XHRhY3Rpb246ICdhZGQnLFxuXHRcdHRhYmxlX2lkOiB0aGlzLnRhYmxlLmlkXG5cdH0pO1xuXG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLmRpbWVuc2lvbnNGb3JWYWx1ZSA9IGZ1bmN0aW9uKCAkdmFsdWUsIGRyYWdUaHJlc2hvbGQsIGJ1ZmZlciApIHtcblx0dmFyIGRyYWdUaHJlc2hvbGRcdD0gZHJhZ1RocmVzaG9sZCB8fCAwLjUsXG5cdFx0YnVmZmVyIFx0XHRcdD0gYnVmZmVyIHx8IDAuMixcblx0XHRkaXJlY3Rpb24gXHRcdD0gJHZhbHVlLnBhcmVudCgpLmRhdGEoJ2ZsZXgtZGlyZWN0aW9uJykgfHwgJ3JvdycsXG5cdFx0YnVmZmVyWFx0XHRcdD0gZGlyZWN0aW9uID09PSAncm93JyA/IGJ1ZmZlciA6IDAsXG5cdFx0YnVmZmVyWVx0XHRcdD0gZGlyZWN0aW9uID09PSAnY29sdW1uJyA/IGJ1ZmZlciA6IDA7XG5cblx0cmV0dXJuIHtcblx0XHR0b3A6IFx0XHRcdCR2YWx1ZS5vZmZzZXQoKS50b3AsXG5cdFx0bGVmdDogXHRcdFx0JHZhbHVlLm9mZnNldCgpLmxlZnQsXG5cdFx0Ym90dG9tOiBcdFx0JHZhbHVlLm9mZnNldCgpLnRvcCArICR2YWx1ZS5oZWlnaHQoKSxcblx0XHRyaWdodDogXHRcdFx0JHZhbHVlLm9mZnNldCgpLmxlZnQgKyAkdmFsdWUud2lkdGgoKSxcblxuXHRcdG1pZGRsZVg6IFx0XHQkdmFsdWUub2Zmc2V0KCkubGVmdCArICggJHZhbHVlLndpZHRoKCkgLyAyICksXG5cdFx0bWlkZGxlWTogXHRcdCR2YWx1ZS5vZmZzZXQoKS50b3AgKyAoICR2YWx1ZS5oZWlnaHQoKSAvIDIgKSxcblxuXHRcdGRyYWdNaWRkbGVYOiBcdCR2YWx1ZS5vZmZzZXQoKS5sZWZ0ICsgKCAkdmFsdWUud2lkdGgoKSAqIGRyYWdUaHJlc2hvbGQgKSxcblx0XHRkcmFnTWlkZGxlWTogXHQkdmFsdWUub2Zmc2V0KCkudG9wICsgKCAkdmFsdWUuaGVpZ2h0KCkgKiBkcmFnVGhyZXNob2xkICksXG5cdFx0ZHJhZ01pZGRsZTogXHRkaXJlY3Rpb24gPT09ICdyb3cnID8gXHQkdmFsdWUub2Zmc2V0KCkubGVmdCArICggJHZhbHVlLndpZHRoKCkgKiBkcmFnVGhyZXNob2xkICkgOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0JHZhbHVlLm9mZnNldCgpLnRvcCArICggJHZhbHVlLmhlaWdodCgpICogZHJhZ1RocmVzaG9sZCApLFxuXG5cdFx0YnVmZmVyVG9wOiBcdFx0JHZhbHVlLm9mZnNldCgpLnRvcCArICggJHZhbHVlLmhlaWdodCgpICogYnVmZmVyWSApLFxuXHRcdGJ1ZmZlckxlZnQ6IFx0JHZhbHVlLm9mZnNldCgpLmxlZnQgKyAoICR2YWx1ZS53aWR0aCgpICogYnVmZmVyWCApLFxuXHRcdGJ1ZmZlckJvdHRvbTogXHQkdmFsdWUub2Zmc2V0KCkudG9wICsgJHZhbHVlLmhlaWdodCgpIC0gKCAkdmFsdWUuaGVpZ2h0KCkgKiBidWZmZXJZICksXG5cdFx0YnVmZmVyUmlnaHQ6IFx0JHZhbHVlLm9mZnNldCgpLmxlZnQgKyAkdmFsdWUud2lkdGgoKSAtICggJHZhbHVlLndpZHRoKCkgKiBidWZmZXJYIClcblx0fTtcbn07XG5cblRlbXBsYXRlVmlldy5wcm90b3R5cGUuaXNJbnRlcnNlY3RlZCA9IGZ1bmN0aW9uKCB2YWx1ZXMsIGV2ZW50ICkge1xuXG5cdC8vIEFjY291bnQgZm9yIHRoZSBsYXlvdXQncyBzY3JvbGwgb2Zmc2V0LCB3aGljaCBjYW4gbWVzcyB1cCB0aGUgY2FsY3VsYXRpb25zXG5cdHZhciBzY3JvbGxPZmZzZXQgXHQ9IHBhcnNlSW50KCQuVmVsb2NpdHkuaG9vaygkKFwiI2xheW91dFwiKSwgXCJ0cmFuc2xhdGVZXCIpKSB8fCAwLFxuXHRcdGRyYWdPZmZzZXRYIFx0PSBldmVudC5jbGllbnRYLFxuXHRcdGRyYWdPZmZzZXRZXHRcdD0gZXZlbnQuY2xpZW50WTtcblxuXHRyZXR1cm4gXHR2YWx1ZXMuYnVmZmVyTGVmdCBcdFx0XHRcdFx0PD0gZHJhZ09mZnNldFggJiZcblx0XHRcdHZhbHVlcy5idWZmZXJSaWdodCBcdFx0XHRcdFx0Pj0gZHJhZ09mZnNldFggJiZcblx0XHRcdHZhbHVlcy5idWZmZXJUb3AgLSBzY3JvbGxPZmZzZXQgXHQ8PSBkcmFnT2Zmc2V0WSAmJlxuXHRcdFx0dmFsdWVzLmJ1ZmZlckJvdHRvbSAtIHNjcm9sbE9mZnNldCBcdD49IGRyYWdPZmZzZXRZO1xufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5pc1ByZXZpb3VzID0gZnVuY3Rpb24oIHZhbHVlcywgZHJhZ1BvaW50ICkge1xuXHRyZXR1cm4gZHJhZ1BvaW50ID49IHZhbHVlcy5kcmFnTWlkZGxlO1xufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS53cmFwVmFsdWVXaXRoR3JvdXAgPSBmdW5jdGlvbiggJHZhbHVlLCBwbGFjZWhvbGRlciApIHtcblx0XG5cdC8vIE1ha2Ugc3VyZSB0aGUgZ3JvdXAgaGFzIHRoZSBvcHBvc2l0ZSBkaXJlY3Rpb24gb2YgaXRzIHBhcmVudFxuXHR2YXIgZGlyZWN0aW9uIFx0PSAkdmFsdWUucGFyZW50KCkuZGF0YSgnZmxleC1kaXJlY3Rpb24nKSA9PT0gJ2NvbHVtbicgPyAncm93JyA6ICdjb2x1bW4nO1xuXHR2YXIgZ3JvdXAgXHRcdD0gbmV3IFRlbXBsYXRlR3JvdXBWaWV3KHtcblx0XHRwbGFjZWhvbGRlcjogcGxhY2Vob2xkZXIsXG5cdFx0bGF5b3V0OiBbe1xuXHRcdFx0cHJvcGVydHk6ICBcdCdmbGV4LWRpcmVjdGlvbicsXG5cdFx0XHR2YWx1ZTogXHRcdCBkaXJlY3Rpb25cblx0XHR9XVxuXHR9KTtcblxuXHR2YXIgJGdyb3VwID0gZ3JvdXAucmVuZGVyKCk7XG5cblx0Ly8gRmlyc3QgYWRkIHRoZSBncm91cCB0byB0aGUgRE9NIGJlZm9yZSB0aGUgdmFsdWVcblx0Ly8gYW5kIHRoZW4gbW92ZSB0aGUgdmFsdWUgaW50byB0aGUgZ3JvdXAuXG5cdC8vIFdlIGRvIHRoaXMgaW5zdGVhZCBvZiBqcXVlcnkncyB3cmFwIGJlY2F1c2Ugd3JhcCBpbnNlcnRzIGEgY2xvbmVcblx0Ly8gYW5kIHdlIG5lZWQgdGhlIHByZXZpb3VzbHkgcmVuZGVyZWQgb2JqZWN0IGl0c2VsZiBpbiB0aGUgRE9NLlxuXHQkZ3JvdXAuaW5zZXJ0QmVmb3JlKCAkdmFsdWUgKTtcblx0JGdyb3VwLmFwcGVuZCggJHZhbHVlICk7XG5cblx0Ly8gV3JhcCB0aGUgdmFsdWUgd2l0aCB0aGUgbmV3IGdyb3VwXG5cdC8vICR2YWx1ZS53cmFwKCAkZ3JvdXAgKTtcblx0Ly8gJGdyb3VwLmFwcGVuZCggJHZhbHVlICk7XG5cblx0aWYgKCAhcGxhY2Vob2xkZXIgKSB7XG5cdFx0VGVtcGxhdGVWaWV3Lmdyb3Vwcy5wdXNoKCBncm91cCApO1xuXHR9XG5cblx0XG5cdC8vIHJldHVybiAkdmFsdWUud3JhcCggJGdyb3VwICk7XG59O1xuXG5UZW1wbGF0ZVZpZXcucHJvdG90eXBlLmluc2VydERyb3BCZWZvcmVFbGVtZW50SW5QYXJlbnRXaXRoUGxhY2Vob2xkZXIgPSBmdW5jdGlvbiggaXRlbSwgJHByZXZpb3VzLCAkcGFyZW50LCBwbGFjZWhvbGRlciApIHtcblxuXHQvLyBDcmVhdGUgYSBuZXcgdmFsdWUgdmlldyB3aXRoIHRoZSBhcHByb3ByaWF0ZSBwbGFjZWhvbGRlciBzdGF0dXNcblx0dmFyIHZhbHVlVmlldyBcdD0gbmV3IFRlbXBsYXRlVmFsdWVWaWV3KCBpdGVtLCBwbGFjZWhvbGRlciApLFxuXHRcdCR2YWx1ZSBcdFx0PSB2YWx1ZVZpZXcucmVuZGVyKCk7XG5cblx0Ly8gSWYgdGhlcmUgaXMgYSBwcmV2aW91cyBpdGVtLCBpbnNlcnQgdGhlIG5ldyBpdGVtIGp1c3QgYWZ0ZXIgaXRcblx0Ly8gT3RoZXJ3aXNlIGp1c3QgYWRkIHRoZSBpdGVtIHRvIHRoZSBwYXJlbnQgYXMgdGhlIGZpcnN0IGNoaWxkXG5cdGlmICggJHByZXZpb3VzICkge1xuXHRcdCRwcmV2aW91cy5hZnRlciggJHZhbHVlICk7XG5cdH0gZWxzZSB7XHRcblx0XHQkcGFyZW50LnByZXBlbmQoICR2YWx1ZSApO1xuXHR9XG5cblx0aWYgKCAhcGxhY2Vob2xkZXIgKSB7XG5cdFx0dGhpcy5fZW1pdENoYW5nZSgpO1xuXHR9IFxufTtcblxuVGVtcGxhdGVWaWV3LnByb3RvdHlwZS5wb3NpdGlvbkRyb3BGb3JEcmFnRXZlbnRJblBhcmVudFdpdGhQbGFjZWhvbGRlciA9IGZ1bmN0aW9uKCBldmVudCwgJHBhcmVudCwgcGxhY2Vob2xkZXIgKSB7XG5cdFx0XG5cdFx0Ly8gTWFrZSBzdXJlIHdlIGhhdmUgYSBwYXJlbnRcblx0XHRpZiAoICEkcGFyZW50ICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIFNldCB1cCBuZWNlc3NhcnkgdmFyaWFibGVzLiBUaGVuLFxuXHRcdC8vIEdldCBhbGwgdGhlIGl0ZW1zIGluIHRoZSBncm91cFxuXHRcdC8vIGFuZCBmaWx0ZXIgb3V0IHRoZSBwbGFjZWhvbGRlcnNcblx0XHQvLyBhbmQgdGhlIGRyYWdnaW5nIGl0ZW1cblx0XHR2YXIgZGltZW5zaW9ucyxcblx0XHRcdGRyYWdQb2ludCxcblx0XHRcdCRwcmV2aW91c0NoaWxkLFxuXHRcdFx0JGNoaWxkLFxuXHRcdFx0JGNoaWxkcmVuID0gJHBhcmVudC5jaGlsZHJlbigpXG5cdFx0XHRcdFx0XHQubm90KCcucGxhY2Vob2xkZXInKVxuXHRcdFx0XHRcdFx0Lm5vdCgnLmluYWN0aXZlJylcblx0XHRcdFx0XHRcdC5ub3QoJy51aS1kcmFnZ2FibGUtZHJhZ2dpbmcnKTtcblxuXHRcdC8vIElmIHRoZXJlIGFyZW4ndCBhbnkgY2hpbGRyZW4sXG5cdFx0Ly8ganVzdCBpbnNlcnQgdGhlIHBsYWNlaG9sZGVyIGF0IHRoZSBiZWdpbm5pbmdcblx0XHRpZiAoICEkY2hpbGRyZW4ubGVuZ3RoICkge1xuXHRcdFx0dGhpcy5pbnNlcnREcm9wQmVmb3JlRWxlbWVudEluUGFyZW50V2l0aFBsYWNlaG9sZGVyKCB0aGlzLmRyYWdnaW5nSXRlbSwgbnVsbCwgJHBhcmVudCwgcGxhY2Vob2xkZXIpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdCRjaGlsZHJlbi5lYWNoKGZ1bmN0aW9uKCBpLCBjaGlsZCApIHtcblx0XHRcdCRjaGlsZCA9ICQoIGNoaWxkICk7XG5cblx0XHRcdC8vIEFyZSB3ZSBpbnRlcnNlY3RpbmcgZGlyZWN0bHkgd2l0aCB0aGUgY2hpbGQ/XG5cdFx0XHRkaW1lbnNpb25zID0gdGhpcy5kaW1lbnNpb25zRm9yVmFsdWUoICRjaGlsZCApO1xuXHRcdFx0aWYgKCB0aGlzLmlzSW50ZXJzZWN0ZWQoIGRpbWVuc2lvbnMsIGV2ZW50ICkgKSB7XG5cdFx0XHRcdC8vIFJlc2V0IHRoZSBwcmV2aW91cyBjaGlsZFxuXHRcdFx0XHQkcHJldmlvdXNDaGlsZCA9IG51bGw7XG5cblx0XHRcdFx0Ly8gV3JhcCB0aGUgdHdvIGl0ZW1zIGluIGEgZ3JvdXBcblx0XHRcdFx0Ly8gYW5kIG1ha2UgdGhlIG5ldyBncm91cCB0aGUgbmV3IHBhcmVudFxuXHRcdFx0XHR0aGlzLndyYXBWYWx1ZVdpdGhHcm91cCggJGNoaWxkLCBwbGFjZWhvbGRlciApO1xuXHRcdFx0XHQkcGFyZW50ID0gJGNoaWxkLnBhcmVudCgpO1xuXG5cdFx0XHRcdC8vIERldGVybWluZSB3aGV0aGVyIHRoZSBuZXcgdmFsdWUgZ29lcyBmaXJzdCBvciBzZWNvbmQgaW4gdGhlIG5ldyBncm91cFxuXHRcdFx0XHQvLyB1c2luZyBuZXcgZGltZW5zaW9ucyBhcyBhIHJlc3VsdCBvZiB0aGUgbmV3IGdyb3VwXG5cdFx0XHRcdGRpbWVuc2lvbnMgPSB0aGlzLmRpbWVuc2lvbnNGb3JWYWx1ZSggJGNoaWxkICk7XG5cdFx0XHRcdGRyYWdQb2ludCA9ICRwYXJlbnQuZGF0YSgnZmxleC1kaXJlY3Rpb24nKSA9PSAnY29sdW1uJyA/IGV2ZW50LmNsaWVudFkgOiBldmVudC5jbGllbnRYO1xuXHRcdFx0XHRpZiAoIHRoaXMuaXNQcmV2aW91cyggZGltZW5zaW9ucywgZHJhZ1BvaW50KSApIHtcblx0XHRcdFx0XHQkcHJldmlvdXNDaGlsZCA9ICRjaGlsZDtcblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBQcmVwYXJlIGRpbWVuc2lvbnMgZm9yIGRldGVybWluaW5nIHdoaWNoIHZhbHVlcyBnb2VzIGZpcnN0IGluIHRoZSBncm91cFxuXHRcdFx0XHRkaW1lbnNpb25zID0gdGhpcy5kaW1lbnNpb25zRm9yVmFsdWUoICRjaGlsZCApO1xuXHRcdFx0XHRkcmFnUG9pbnQgPSAkcGFyZW50LmRhdGEoJ2ZsZXgtZGlyZWN0aW9uJykgPT0gJ2NvbHVtbicgPyBldmVudC5jbGllbnRZIDogZXZlbnQuY2xpZW50WDtcblx0XHRcdFx0aWYgKCB0aGlzLmlzUHJldmlvdXMoIGRpbWVuc2lvbnMsIGRyYWdQb2ludCkgKSB7XG5cdFx0XHRcdFx0JHByZXZpb3VzQ2hpbGQgPSAkY2hpbGQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdH0uYmluZCggdGhpcyApKTtcblxuXHRcdC8vIEFkZCB0aGUgbmV3IGl0ZW0gdG8gdGhlIG5ldyBncm91cFxuXHRcdHRoaXMuaW5zZXJ0RHJvcEJlZm9yZUVsZW1lbnRJblBhcmVudFdpdGhQbGFjZWhvbGRlciggdGhpcy5kcmFnZ2luZ0l0ZW0sICRwcmV2aW91c0NoaWxkLCAkcGFyZW50LCBwbGFjZWhvbGRlciApO1xuXHRcdFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBUZW1wbGF0ZVZpZXc7IiwidmFyIENvbHVtbnNFdmVudCBcdD0gcmVxdWlyZSgnLi4vbW9kZWxzL0NvbHVtbnNFdmVudC5qcycpO1xudmFyIFRFTVBMQVRFIFx0XHQ9IENvbHVtbnMuVGVtcGxhdGVzWyd0ZW1wbGF0ZXMvdGhhbmtzLmhicyddO1xuXG5mdW5jdGlvbiBUaGFua3NWaWV3KCkge1xuXG59XG5cblRoYW5rc1ZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKCkge1xuXG5cdHRoaXMuJHRoYW5rcyA9ICQoIFRFTVBMQVRFKCkgKTtcblxuXHR0aGlzLl9zZXR1cEV2ZW50TGlzdGVuZXJzKCk7XG5cblx0cmV0dXJuIHRoaXMuJHRoYW5rcztcbn07XG5cblRoYW5rc1ZpZXcucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbigpIHtcblx0dGhpcy4kdGhhbmtzLnZlbG9jaXR5KHtcblx0XHRvcGFjaXR5OiAxXG5cdH0sIHtcblx0XHRkdXJhdGlvbjogMjAwLFxuXHRcdGVhc2luZzogJ2Vhc2Utb3V0Jyxcblx0XHRiZWdpbjogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLiR0aGFua3MuYWRkQ2xhc3MoJ2FuaW1hdGluZycpO1xuXHRcdH0uYmluZCggdGhpcyApLFxuXHRcdGNvbXBsZXRlOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuJHRoYW5rcy5yZW1vdmVDbGFzcygnYW5pbWF0aW5nJyk7XG5cdFx0XHR0aGlzLiR0aGFua3MuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdH0uYmluZCggdGhpcyApXG5cdH0pO1xufTtcblxuVGhhbmtzVmlldy5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLiR0aGFua3MudmVsb2NpdHkoe1xuXHRcdG9wYWNpdHk6IDBcblx0fSwge1xuXHRcdGR1cmF0aW9uOiAyMDAsXG5cdFx0ZWFzaW5nOiAnZWFzZS1pbicsXG5cdFx0YmVnaW46IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy4kdGhhbmtzLmFkZENsYXNzKCdhbmltYXRpbmcnKTtcblx0XHR9LmJpbmQoIHRoaXMgKSxcblx0XHRjb21wbGV0ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLiR0aGFua3MucmVtb3ZlQ2xhc3MoJ2FuaW1hdGluZycpO1xuXHRcdFx0dGhpcy4kdGhhbmtzLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHR9LmJpbmQoIHRoaXMgKVxuXHR9KTtcbn07XG5cblRoYW5rc1ZpZXcucHJvdG90eXBlLl9zZXR1cEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gTGlzdGVuIHRvIHN1Y2Nlc3NmdWwgcmVnaXN0cmF0aW9uc1xuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLlJlZ2lzdGVyVmlldy5EaWRSZWdpc3RlcldpdGhTdWNjZXNzJywgdGhpcy5fb25SZWdpc3RyYXRpb25TdWNjZXNzLmJpbmQoIHRoaXMgKSApO1xufTtcblxuVGhhbmtzVmlldy5wcm90b3R5cGUuX29uUmVnaXN0cmF0aW9uU3VjY2VzcyA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblxuXHR0aGlzLnNob3coKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVGhhbmtzVmlldzsiLCJ2YXIgQ29sdW1uc0V2ZW50IFx0XHQ9IHJlcXVpcmUoJy4uL21vZGVscy9Db2x1bW5zRXZlbnQuanMnKTtcbnZhciBDb2x1bW5zQW5hbHl0aWNzIFx0PSByZXF1aXJlKCcuLi9tb2RlbHMvQ29sdW1uc0FuYWx5dGljcy5qcycpO1xuXG52YXIgTUFYX1JPV1MgPSAyMCxcblx0VVBMT0FEX0JVVFRPTl9TRUxFQ1RPUiA9ICcuY29sdW1ucy11cGxvYWQtYnV0dG9uJztcblxuZnVuY3Rpb24gVXBsb2FkVmlldygpIHtcblx0dGhpcy5wYXJzZWRSb3dzID0gMDtcbn1cblxuVXBsb2FkVmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oKSB7XG5cblx0dGhpcy4kdXBsb2FkID0gJCgnI3VwbG9hZCcpO1xuXG5cdHRoaXMuX3NldHVwRXZlbnRMaXN0ZW5lcnMoKTtcblx0cmV0dXJuIHRoaXMuJHVwbG9hZDtcbn07XG5cblVwbG9hZFZpZXcucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbigpIHtcblx0dGhpcy4kdXBsb2FkLnZlbG9jaXR5KHtcblx0XHRvcGFjaXR5OiAxXG5cdH0sIHtcblx0XHRkdXJhdGlvbjogMjAwLFxuXHRcdGVhc2luZzogJ2Vhc2Utb3V0Jyxcblx0XHRiZWdpbjogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLiR1cGxvYWQuYWRkQ2xhc3MoJ2FuaW1hdGluZycpO1xuXHRcdH0uYmluZCggdGhpcyApLFxuXHRcdGNvbXBsZXRlOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuJHVwbG9hZC5yZW1vdmVDbGFzcygnYW5pbWF0aW5nJyk7XG5cdFx0XHR0aGlzLiR1cGxvYWQuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdH0uYmluZCggdGhpcyApXG5cdH0pO1xufTtcblxuVXBsb2FkVmlldy5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLiR1cGxvYWQudmVsb2NpdHkoe1xuXHRcdG9wYWNpdHk6IDBcblx0fSwge1xuXHRcdGR1cmF0aW9uOiAyMDAsXG5cdFx0ZWFzaW5nOiAnZWFzZS1pbicsXG5cdFx0YmVnaW46IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy4kdXBsb2FkLmFkZENsYXNzKCdhbmltYXRpbmcnKTtcblx0XHR9LmJpbmQoIHRoaXMgKSxcblx0XHRjb21wbGV0ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLiR1cGxvYWQucmVtb3ZlQ2xhc3MoJ2FuaW1hdGluZycpO1xuXHRcdFx0dGhpcy4kdXBsb2FkLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHR9LmJpbmQoIHRoaXMgKVxuXHR9KTtcbn07XG5cblVwbG9hZFZpZXcucHJvdG90eXBlLl9zZXRMb2FkaW5nID0gZnVuY3Rpb24oIGxvYWRpbmcsIG1lc3NhZ2UgKSB7XG5cdHZhciAkYnV0dG9uID0gdGhpcy4kdXBsb2FkLmZpbmQoIFVQTE9BRF9CVVRUT05fU0VMRUNUT1IgKTtcblxuXHQvLyBTZXQgdGhlIG1lc3NhZ2Vcblx0aWYgKCBtZXNzYWdlICYmIHR5cGVvZiBtZXNzYWdlID09PSAnc3RyaW5nJyApIHtcblx0XHQkYnV0dG9uLnRleHQoIG1lc3NhZ2UgKTtcblx0fSBlbHNlIHtcblx0XHQkYnV0dG9uLnRleHQoXCJVcGxvYWQgYSAuY3N2XCIpO1xuXHR9XG5cblx0Ly8gU2V0IHRoZSBsb2FkaW5nIHN0YXRlXG5cdGlmICggbG9hZGluZyApIHtcblx0XHR0aGlzLiR1cGxvYWQuYWRkQ2xhc3MoJ2xvYWRpbmcnKTtcblx0XHQkYnV0dG9uLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy4kdXBsb2FkLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XG5cdFx0JGJ1dHRvbi5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcblx0fVxufTtcblxuVXBsb2FkVmlldy5wcm90b3R5cGUuX3NldHVwRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBMaXN0ZW4gZm9yIGNsaWNrcyBvbiB0aGUgdXBsb2FkIGJ1dHRvblxuXHR0aGlzLiR1cGxvYWQuZmluZCggVVBMT0FEX0JVVFRPTl9TRUxFQ1RPUiApLm9uKCAnY2xpY2snLCB0aGlzLl9vblVwbG9hZENsaWNrLmJpbmQoIHRoaXMgKSApO1xuXG5cdC8vIExpc3RlbiBmb3IgZmlsZSBjaG9pY2VzIGZyb20gdGhlIGZpbGUgcGlja2VyXG5cdHRoaXMuJHVwbG9hZC5maW5kKCdpbnB1dFt0eXBlPVwiZmlsZVwiXScpLm9uKCAnY2hhbmdlJywgdGhpcy5fb25GaWxlQ2hvaWNlLmJpbmQoIHRoaXMgKSApO1xuXG5cdC8vIExpc3RlbiBmb3Igd2luZG93IHJlc2l6ZSBldmVudHNcblx0JCh3aW5kb3cpLm9uKCAncmVzaXplJywgdGhpcy5fb25XaW5kb3dSZXNpemUuYmluZCggdGhpcyApICk7XG5cblx0Ly8gTGlzdGVuIGZvciBzdWNjZXNzZnVsIHRhYmxlIHVwbG9hZHNcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5UYWJsZS5EaWRVcGxvYWRXaXRoU3VjY2VzcycsIHRoaXMuX29uVGFibGVVcGxvYWRTdWNjZXNzLmJpbmQoIHRoaXMgKSApO1xuXG5cdC8vIExpc3RlbiBmb3IgZmFpbGVkIHRhYmxlIHVwbG9hZHNcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5UYWJsZS5EaWRVcGxvYWRXaXRoRmFpbHVyZScsIHRoaXMuX29uVGFibGVVcGxvYWRGYWlsLmJpbmQoIHRoaXMgKSApO1xufTtcblxuVXBsb2FkVmlldy5wcm90b3R5cGUuX29uVXBsb2FkQ2xpY2sgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG5cblx0Ly8gVHJpZ2dlciBjbGljayBvbiBmaWxlIGlucHV0IGZpZWxkXG5cdHRoaXMuJHVwbG9hZC5maW5kKCdpbnB1dFt0eXBlPVwiZmlsZVwiXScpLnRyaWdnZXIoJ2NsaWNrJyk7XG5cblx0Ly8gVHJhY2sgdGhpcyBjbGlja1xuXHQvLyBnYSgnc2VuZCcsICdldmVudCcsICdidXR0b24nLCAnY2xpY2snLCAndXBsb2FkJyk7XG5cblx0Q29sdW1uc0FuYWx5dGljcy5zZW5kKHtcblx0XHRjYXRlZ29yeTogJ2J1dHRvbicsXG5cdFx0YWN0aW9uOiAnY2xpY2snLFxuXHRcdGxhYmVsOiAndXBsb2FkJ1xuXHR9KTtcbn07XG5cblVwbG9hZFZpZXcucHJvdG90eXBlLl9vbkZpbGVDaG9pY2UgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdHZhciBmaWxlID0gZXZlbnQudGFyZ2V0LmZpbGVzWyAwIF07XG5cdHRoaXMuX3BhcnNlRmlsZSggZmlsZSApO1xuXG5cdGlmICggZmlsZS5uYW1lICkge1xuXHRcdHRoaXMuX3NldExvYWRpbmcoIHRydWUsICdVcGxvYWRpbmcgJyArIGZpbGUubmFtZSArICcuLi4nICk7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5fc2V0TG9hZGluZyggdHJ1ZSwgJ1VwbG9hZGluZyBmaWxlLi4uJyApO1xuXHR9XG5cblx0Ly8gQW5ub3VuY2UgZmlsZSB1cGxvYWQgZXZlbnRcblx0Ly8gQWxlcnQgYW55IGxpc3RlbmVycyB0aGF0IHRoZSBncm91cCBoYXMgY2hhbmdlZFxuXHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCAnQ29sdW1ucy5VcGxvYWRWaWV3LkRpZENob29zZUZpbGUnLCB7XG5cdFx0Ly8gdXBsb2FkVmlldzogXHR0aGlzLFxuXHRcdC8vIGZpbGU6IFx0XHRcdGZpbGVcblx0Ly8gfSk7XG5cdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0Ly8gY29sdW1uc0V2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5VcGxvYWRWaWV3LkRpZENob29zZUZpbGUnLCBmYWxzZSwgZmFsc2UsIHtcblx0Ly8gXHR1cGxvYWRWaWV3OiBcdHRoaXMsXG5cdC8vIFx0ZmlsZTogXHRcdFx0ZmlsZVxuXHQvLyB9KTtcblx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjb2x1bW5zRXZlbnQpO1xuXHRDb2x1bW5zRXZlbnQuc2VuZCgnQ29sdW1ucy5VcGxvYWRWaWV3LkRpZENob29zZUZpbGUnLCB7XG5cdFx0dXBsb2FkVmlldzogXHR0aGlzLFxuXHRcdGZpbGU6IFx0XHRcdGZpbGVcblx0fSk7XG5cblx0Q29sdW1uc0FuYWx5dGljcy5zZW5kKHtcblx0XHRjYXRlZ29yeTogJ2ZpbGUnLFxuXHRcdGFjdGlvbjogJ2Nob3Nlbidcblx0fSk7XG59O1xuXG5VcGxvYWRWaWV3LnByb3RvdHlwZS5fb25XaW5kb3dSZXNpemUgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG5cbn07XG5cblVwbG9hZFZpZXcucHJvdG90eXBlLl9vblRhYmxlVXBsb2FkU3VjY2VzcyA9IGZ1bmN0aW9uKCBldmVudCApIHtcblxuXHR0aGlzLl9zZXRMb2FkaW5nKCBmYWxzZSApO1xuXHR0aGlzLmhpZGUoKTtcbn07XG5cblVwbG9hZFZpZXcucHJvdG90eXBlLl9vblRhYmxlVXBsb2FkRmFpbCA9IGZ1bmN0aW9uKCBldmVudCApIHtcblxuXHR0aGlzLl9zZXRMb2FkaW5nKCBmYWxzZSwgXCJTaG9vdCwgc29tZXRoaW5nIHdlbnQgd3JvbmcuIE1pbmQgdHJ5aW5nIGEgZGlmZmVyZW50IC5jc3Y/XCIpXG59O1xuXG5VcGxvYWRWaWV3LnByb3RvdHlwZS5fcGFyc2VGaWxlID0gZnVuY3Rpb24oIGZpbGUgKSB7XG5cdFBhcGEucGFyc2UoIGZpbGUsIHtcblx0XHRzdGVwOiBmdW5jdGlvbiggcm93LCBoYW5kbGUgKSB7XG5cdFx0XHR0aGlzLl9wYXJzZVJvdyggcm93LCBoYW5kbGUsIGZpbGUubmFtZSApO1xuXHRcdH0uYmluZCggdGhpcyApLFxuXHRcdGNvbXBsZXRlOiBmdW5jdGlvbiggcmVzdWx0cyApIHtcblx0XHRcdHRoaXMuX29uUGFyc2VDb21wbGV0ZSggcmVzdWx0cywgZmlsZSApO1xuXHRcdH0uYmluZCggdGhpcyApXG5cdH0pO1xufTtcblxuVXBsb2FkVmlldy5wcm90b3R5cGUuX3BhcnNlUm93ID0gZnVuY3Rpb24oIHJvdywgaGFuZGxlLCBmaWxlTmFtZSApIHtcblxuXHQvLyBJZiB0aGlzIGlzIHRoZSBmaXJzdCByb3csIHRyZWF0IGl0IGFzIGEgaGVhZGVyXG5cdC8vIGFuZCBjcmVhdGUgY29sdW1uIGl0ZW1zIGZyb20gaXRzIGNvbnRlbnRzXG5cdC8vXG5cdC8vIElmIGl0J3Mgbm90IHRoZSBmaXJzdCByb3csIHRyZWF0IGl0IGFzIGRhdGFcblx0Ly8gYW5kIGFkZCBpdCB0byBvdXIgZGF0YSBzZXRcblx0Ly8gXG5cdC8vIElmIGl0J3MgYmV5b25kIHRoZSAyMHRoIHJvdywgc3RvcCB0aGUgcGFyc2luZ1xuXHRpZiAoIHRoaXMucGFyc2VkUm93cyA9PT0gMCApIHtcblx0XHR0aGlzLl9jcmVhdGVDb2x1bW5JdGVtcyggcm93LmRhdGFbIDAgXSwgZmlsZU5hbWUgKTtcblx0fSBlbHNlIGlmICggdGhpcy5wYXJzZWRSb3dzIDw9IE1BWF9ST1dTICkge1xuXHRcdHRoaXMuX2NyZWF0ZVJvdyggcm93LmRhdGFbIDAgXSwgZmlsZU5hbWUgKTtcblx0fSBlbHNlIHtcblx0XHRoYW5kbGUuYWJvcnQoKTtcblx0fVxuXG5cdC8vIFVwZGF0ZSB0aGUgcGFyc2VkIHJvd3MgY291bnRcblx0dGhpcy5wYXJzZWRSb3dzKys7XG59O1xuXG5VcGxvYWRWaWV3LnByb3RvdHlwZS5fY3JlYXRlQ29sdW1uSXRlbXMgPSBmdW5jdGlvbiggZGF0YSwgZmlsZU5hbWUgKSB7XG5cblx0Ly8gQW5ub3VuY2UgY29sdW1ucyBwYXJzaW5nXG5cdC8vIEFsZXJ0IGFueSBsaXN0ZW5lcnMgdGhhdCB0aGUgZ3JvdXAgaGFzIGNoYW5nZWRcblx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IG5ldyBDdXN0b21FdmVudCggJ0NvbHVtbnMuVXBsb2FkVmlldy5EaWRQYXJzZUNvbHVtbk5hbWVzRm9yRmlsZScsIHtcblx0XHQvLyB1cGxvYWRWaWV3OiBcdHRoaXMsXG5cdFx0Ly8gZmlsZU5hbWU6IFx0XHRmaWxlTmFtZSxcblx0XHQvLyBjb2x1bXM6IFx0XHRkYXRhXG5cdC8vIH0pO1xuXHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdC8vIGNvbHVtbnNFdmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuVXBsb2FkVmlldy5EaWRQYXJzZUNvbHVtbk5hbWVzRm9yRmlsZScsIGZhbHNlLCBmYWxzZSwge1xuXHQvLyBcdHVwbG9hZFZpZXc6IFx0dGhpcyxcblx0Ly8gXHRmaWxlTmFtZTogXHRcdGZpbGVOYW1lLFxuXHQvLyBcdGNvbHVtbnM6IFx0XHRkYXRhXG5cdC8vIH0pO1xuXHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGNvbHVtbnNFdmVudCk7XG5cdENvbHVtbnNFdmVudC5zZW5kKCdDb2x1bW5zLlVwbG9hZFZpZXcuRGlkUGFyc2VDb2x1bW5OYW1lc0ZvckZpbGUnLCB7XG5cdFx0dXBsb2FkVmlldzogXHR0aGlzLFxuXHRcdGZpbGVOYW1lOiBcdFx0ZmlsZU5hbWUsXG5cdFx0Y29sdW1uczogXHRcdGRhdGFcblx0fSk7XG59O1xuXG5VcGxvYWRWaWV3LnByb3RvdHlwZS5fY3JlYXRlUm93ID0gZnVuY3Rpb24oIHJvdywgZmlsZU5hbWUgKSB7XG5cblx0Ly8gQW5ub3VuY2Ugcm93IHBhcnNpbmdcblx0Ly8gQWxlcnQgYW55IGxpc3RlbmVycyB0aGF0IHRoZSBncm91cCBoYXMgY2hhbmdlZFxuXHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCAnQ29sdW1ucy5VcGxvYWRWaWV3LkRpZFBhcnNlRGF0YVJvd0ZvckZpbGUnLCB7XG5cdFx0Ly8gdXBsb2FkVmlldzogXHR0aGlzLFxuXHRcdC8vIGZpbGVOYW1lOiBcdFx0ZmlsZU5hbWUsXG5cdFx0Ly8gcm93OiBcdFx0XHRkYXRhXG5cdC8vIH0pO1xuXHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdC8vIGNvbHVtbnNFdmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuVXBsb2FkVmlldy5EaWRQYXJzZURhdGFSb3dGb3JGaWxlJywgZmFsc2UsIGZhbHNlLCB7XG5cdC8vIFx0dXBsb2FkVmlldzogXHR0aGlzLFxuXHQvLyBcdGZpbGVOYW1lOiBcdFx0ZmlsZU5hbWUsXG5cdC8vIFx0cm93OiBcdFx0XHRyb3dcblx0Ly8gfSk7XG5cdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY29sdW1uc0V2ZW50KTtcblx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuVXBsb2FkVmlldy5EaWRQYXJzZURhdGFSb3dGb3JGaWxlJywge1xuXHRcdHVwbG9hZFZpZXc6IFx0dGhpcyxcblx0XHRmaWxlTmFtZTogXHRcdGZpbGVOYW1lLFxuXHRcdHJvdzogXHRcdFx0cm93XG5cdH0pO1xufTtcblxuVXBsb2FkVmlldy5wcm90b3R5cGUuX29uUGFyc2VDb21wbGV0ZSA9IGZ1bmN0aW9uKCByZXN1bHRzLCBmaWxlICkge1xuXG5cdC8vIEFubm91bmNlIHBhcnNpbmcgY29tcGxldGVcblx0Ly8gQWxlcnQgYW55IGxpc3RlbmVycyB0aGF0IHRoZSBncm91cCBoYXMgY2hhbmdlZFxuXHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCAnQ29sdW1ucy5VcGxvYWRWaWV3LkRpZENvbXBsZXRlUGFyc2VGb3JGaWxlJywge1xuXHRcdC8vIHVwbG9hZFZpZXc6IFx0XHR0aGlzLFxuXHRcdC8vIGZpbGVOYW1lOiBcdFx0ZmlsZU5hbWVcblx0Ly8gfSk7XG5cdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0Ly8gY29sdW1uc0V2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5VcGxvYWRWaWV3LkRpZENvbXBsZXRlUGFyc2VGb3JGaWxlJywgZmFsc2UsIGZhbHNlLCB7XG5cdC8vIFx0dXBsb2FkVmlldzogXHR0aGlzLFxuXHQvLyBcdGZpbGU6IFx0XHRcdGZpbGVcblx0Ly8gfSk7XG5cdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY29sdW1uc0V2ZW50KTtcblx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuVXBsb2FkVmlldy5EaWRDb21wbGV0ZVBhcnNlRm9yRmlsZScsIHtcblx0XHR1cGxvYWRWaWV3OiBcdHRoaXMsXG5cdFx0ZmlsZTogXHRcdFx0ZmlsZVxuXHR9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVXBsb2FkVmlldztcbiIsInZhciBpc01vYmlsZVx0XHRcdD0gcmVxdWlyZSgnaXNtb2JpbGVqcycpO1xudmFyIERlc2t0b3AgXHRcdFx0PSByZXF1aXJlKCcuL2NvbnRyb2xsZXJzL0Rlc2t0b3BWaWV3LmpzJyk7XG52YXIgTW9iaWxlIFx0XHRcdFx0PSByZXF1aXJlKCcuL2NvbnRyb2xsZXJzL01vYmlsZVZpZXcuanMnKTtcblxudmFyIGFwcDtcblxuLy8gRmlyc3QsIGNoZWNrIHRvIHNlZSBpZiB3ZSdyZSBvbiBtb2JpbGUuXG4vLyBJZiB3ZSBhcmUsIGxvYWQgdGhlIG1vYmlsZSBzaXRlIGluc3RlYWRcbmlmICggaXNNb2JpbGUuYW55ICkge1xuXHRhcHAgPSBuZXcgTW9iaWxlKCk7XG59IGVsc2Uge1xuXHRhcHAgPSBuZXcgRGVza3RvcCgpO1xufVxuXG5hcHAucmVuZGVyKCk7XG5cbi8vIENyZWF0ZSB0aGUgVGFibGUgb2JqZWN0XG4vLyB2YXIgdGFibGUgPSBuZXcgVGFibGUoKTtcblxuLy8gLy8gU2V0IHVwIHRoZSBJdGVtcyBWaWV3XG4vLyB2YXIgaXRlbXMgPSBuZXcgSXRlbXNWaWV3KCk7XG5cbi8vIC8vIFNldCB1cCB0aGUgVGVtcGxhdGVcbi8vIHZhciB0ZW1wbGF0ZSA9IG5ldyBUZW1wbGF0ZVZpZXcoKTtcblxuLy8gLy8gU2V0IHVwIHRoZSBTdHlsZSBWaWV3XG4vLyB2YXIgc3R5bGUgPSBuZXcgU3R5bGVWaWV3KCk7XG5cbi8vIC8vIFNldCB1cCB0aGUgRW1iZWQgUGFuZWxcbi8vIHZhciBlbWJlZCA9IG5ldyBFbWJlZERldGFpbHNWaWV3KCk7XG5cbi8vIC8vIFNldCB1cCB0aGUgVXBsb2FkIFZpZXdcbi8vIHZhciB1cGxvYWQgPSBuZXcgVXBsb2FkVmlldygpO1xuLy8gdXBsb2FkLnJlbmRlcigpO1xuXG4vLyAvLyBTZXQgdXAgYW5hbHl0aWNzXG4vLyBpZiAoIENvbmZpZy5lbnYgPT09ICdwcm9kdWN0aW9uJyApIHtcbi8vIFx0JCgnaGVhZCcpLmFwcGVuZCggQ29sdW1ucy5UZW1wbGF0ZXNbJ3RlbXBsYXRlcy9hbmFseXRpY3MuaGJzJ10oKSApO1xuLy8gXHRDb2x1bW5zQW5hbHl0aWNzLnNlbmQoe1xuLy8gXHRcdGNhdGVnb3J5OiAnbmF2aWdhdGlvbicsXG4vLyBcdFx0YWN0aW9uOiAnYXJyaXZlZCcsXG4vLyBcdFx0bGFiZWw6ICdhcHAnXG4vLyBcdH0pO1xuXG4vLyBcdCQoJy5jb2x1bW5zLWhlYWRlci1uYXYtaG9tZScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuLy8gXHRcdENvbHVtbnNBbmFseXRpY3Muc2VuZCh7XG4vLyBcdFx0XHRjYXRlZ29yeTogJ2J1dHRvbicsXG4vLyBcdFx0XHRhY3Rpb246ICdjbGljaycsXG4vLyBcdFx0XHRsYWJlbDogJ2hvbWUnXG4vLyBcdFx0fSk7XG4vLyBcdH0pO1xuLy8gfVxuXG5cblxuIiwidmFyIENvbmZpZyA9IHJlcXVpcmUoJy4uL2NvbmZpZy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbHVtbnNBbmFseXRpY3M7XG5cbmZ1bmN0aW9uIENvbHVtbnNBbmFseXRpY3MoKSB7fVxuXG5Db2x1bW5zQW5hbHl0aWNzLnNlbmQgPSBmdW5jdGlvbiggcHJvcHMgKSB7XG5cdHZhciBwcm9wcyA9IHByb3BzIHx8IHt9LFxuXHRcdG1peHBhbmVsT2JqID0ge307XG5cblx0Ly8gTWFrZSBzdXJlIHRoZSBwcm9wZXJ0aWVzIGFyZSBzYW50aXplZFxuXHRwcm9wcy5hY3Rpb24gPSBwcm9wcy5hY3Rpb24gfHwgJyc7XG5cdHByb3BzLmNhdGVnb3J5ID0gcHJvcHMuY2F0ZWdvcnkgfHwgJyc7XG5cdHByb3BzLmxhYmVsID0gcHJvcHMubGFiZWwgfHwgJyc7XG5cdHByb3BzLmRlc2NyaXB0aW9uID0gcHJvcHMuZGVzY3JpcHRpb24gfHwgcHJvcHMuY2F0ZWdvcnkgKyAnICcgKyBwcm9wcy5hY3Rpb24gKyAnICcgKyBwcm9wcy5sYWJlbDtcblx0cHJvcHMuZGVzY3JpcHRpb24gPSBwcm9wcy5kZXNjcmlwdGlvbiA9PSAnICAnID8gJycgOiBwcm9wcy5kZXNjcmlwdGlvbjtcblx0aWYgKCBwcm9wcy50YWJsZV9pZCApIHtcblx0XHRtaXhwYW5lbE9ialsnVGFibGUgSUQnXSA9IHByb3BzLnRhYmxlX2lkO1xuXHR9XG5cblx0Ly8gU2VuZCBhIEdvb2dsZSBBbmFseXRpY3MgZXZlbnRcblx0aWYgKCB3aW5kb3cuZ2EgKSB7XG5cdFx0Z2EoICdzZW5kJywgJ2V2ZW50JywgcHJvcHMuY2F0ZWdvcnksIHByb3BzLmFjdGlvbiwgcHJvcHMubGFiZWwsIHByb3BzLnRhYmxlX2lkICk7XG5cdH1cblxuXHQvLyBTZW5kIGEgbWl4cGFuZWwgZXZlbnRcblx0aWYgKCB3aW5kb3cubWl4cGFuZWwgKSB7XG5cdFx0bWl4cGFuZWwudHJhY2soIHByb3BzLmRlc2NyaXB0aW9uLCBtaXhwYW5lbE9iaiApO1xuXHR9XG5cbn07IiwiZnVuY3Rpb24gQ29sdW1uc0V2ZW50ICgpIHtcblxufVxuXG5Db2x1bW5zRXZlbnQuc2VuZCA9IGZ1bmN0aW9uKCB0eXBlLCBkYXRhICkge1xuXHQkKGRvY3VtZW50KS50cmlnZ2VyKCB0eXBlLCBkYXRhICk7XG59O1xuXG5Db2x1bW5zRXZlbnQub24gPSBmdW5jdGlvbiggdHlwZSwgY2FsbGJhY2sgKSB7XG5cdCQoZG9jdW1lbnQpLm9uKCB0eXBlLCBjYWxsYmFjayApO1xufTtcblxuQ29sdW1uc0V2ZW50Lm9mZiA9IGZ1bmN0aW9uKCB0eXBlLCBjYWxsYmFjayApIHtcblx0JChkb2N1bWVudCkub2ZmKCB0eXBlLCBjYWxsYmFjayApO1xufTtcblxuQ29sdW1uc0V2ZW50Lm9mZkFsbCA9IGZ1bmN0aW9uKCkge1xuXHQkKGRvY3VtZW50KS5vZmYoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ29sdW1uc0V2ZW50OyIsInZhciBDb2x1bW5zRXZlbnQgPSByZXF1aXJlKCcuL0NvbHVtbnNFdmVudC5qcycpO1xudmFyIFN0eWxlIFx0XHQgPSByZXF1aXJlKCcuL1N0eWxlLmpzJyk7XG5cbi8vIEl0ZW0gT2JqZWN0XG4vLyAtLS0tLS0tLS0tLS0tXG4vLyBVc2UgdGhpcyBtb2RlbCB0byBzdG9yZSBhIGNvbHVtbiBJdGVtXG4vLyBhbmQgbWFuYWdlIGl0cyBzdHlsZSBpbmZvcm1hdGlvblxuXG5JdGVtID0gZnVuY3Rpb24oIHBhcmFtcyApIHtcblxuXHR0aGlzLmlkO1xuXHR0aGlzLnRpdGxlO1xuXHR0aGlzLnN0eWxlO1xuXHR0aGlzLmFjdGl2ZSA9IHRydWU7XG5cblx0aWYgKCBwYXJhbXMgKSB7XG5cdFx0Ly8gdGhpcy5pZCBcdD0gXG5cdFx0dGhpcy50aXRsZSBcdD0gcGFyYW1zLnRpdGxlIHx8ICcnO1xuXHRcdHRoaXMuc3R5bGUgXHQ9IG5ldyBTdHlsZSggcGFyYW1zLnN0eWxlICk7XG5cdFx0dGhpcy5hY3RpdmUgPSBwYXJhbXMuYWN0aXZlID09PSBmYWxzZSA/IGZhbHNlIDogdHJ1ZTtcblx0fVxuXG5cdHRoaXMuX3NldHVwRXZlbnRMaXN0ZW5lcnMoKTtcbn1cblxuSXRlbS5mb3JtYXR0ZWRUaXRsZSA9IGZ1bmN0aW9uKCB0aXRsZSApIHtcblx0Ly8gUmV0dXJuIGEgbG93ZXJjYXNlIHZlcnNpb24gb2YgdGhlIHRpdGxlXG5cdC8vIHdpdGggdW5kZXJzY29yZXMgaW5zdGVhZCBvZiBzcGFjZXNcblx0aWYgKCAhdGl0bGUgKSB7XG5cdFx0cmV0dXJuICdfJztcblx0fSBlbHNlIGlmICggdGl0bGUgPT09ICdfJyApIHtcblx0XHRyZXR1cm4gdGl0bGU7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIHRpdGxlLnRvTG93ZXJDYXNlKCkucmVwbGFjZSggL18vZywgJyAnICkucmVwbGFjZSgvXFxiLi9nLCBmdW5jdGlvbihtKXsgcmV0dXJuIG0udG9VcHBlckNhc2UoKTsgfSk7XG5cdH1cbn07XG5cbkl0ZW0udW5mb3JtYXR0ZWRUaXRsZSA9IGZ1bmN0aW9uKCB0aXRsZSApIHtcblx0aWYgKCF0aXRsZSkge1xuXHRcdHJldHVybiAnXyc7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIHRpdGxlLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvIC9nLCAnXycpO1xuXHR9XG59O1xuXG5JdGVtLnByb3RvdHlwZS5mb3JtYXR0ZWRUaXRsZSA9IGZ1bmN0aW9uKCkge1xuXHQvLyBSZXR1cm4gYSBsb3dlcmNhc2UgdmVyc2lvbiBvZiB0aGUgdGl0bGVcblx0Ly8gd2l0aCB1bmRlcnNjb3JlcyBpbnN0ZWFkIG9mIHNwYWNlc1xuXHQvLyBpZiAoICF0aGlzLnRpdGxlICkge1xuXHQvLyBcdHJldHVybiAnXyc7XG5cdC8vIH0gZWxzZSBpZiAoIHRoaXMudGl0bGUgPT09ICdfJyApIHtcblx0Ly8gXHRyZXR1cm4gdGhpcy50aXRsZTtcblx0Ly8gfSBlbHNlIHtcblx0Ly8gXHRyZXR1cm4gdGhpcy50aXRsZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoIC9fL2csICcgJyApLnJlcGxhY2UoL1xcYi4vZywgZnVuY3Rpb24obSl7IHJldHVybiBtLnRvVXBwZXJDYXNlKCk7IH0pO1xuXHQvLyB9XG5cdHJldHVybiBJdGVtLmZvcm1hdHRlZFRpdGxlKCB0aGlzLnRpdGxlICk7XG59O1xuXG5JdGVtLnByb3RvdHlwZS51bmZvcm1hdHRlZFRpdGxlID0gZnVuY3Rpb24oKSB7XG5cdC8vIFJldHVybiBhIGxvd2VyY2FzZSB2ZXJzaW9uIG9mIHRoZSB0aXRsZVxuXHQvLyB3aXRoIHVuZGVyc2NvcmVzIGluc3RlYWQgb2Ygc3BhY2VzXG5cdC8vIGlmICghdGhpcy50aXRsZSkge1xuXHQvLyBcdHJldHVybiAnXyc7XG5cdC8vIH0gZWxzZSB7XG5cdC8vIFx0cmV0dXJuIHRoaXMudGl0bGUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8gL2csICdfJyk7XG5cdC8vIH1cblx0cmV0dXJuIEl0ZW0udW5mb3JtYXR0ZWRUaXRsZSggdGhpcy50aXRsZSApO1xufTtcblxuLy8gUmV0dXJuIHRoZSBjb3JyZWN0IHN0eWxlIGF0dHJpYnV0ZSBmb3IgYSBnaXZlbiBwcm9wZXJ0eVxuLy8gQHBhcmFtIHsgc3RyaW5nIH0gcHJvcGVydHkgLS0gdGhlIHJlcXVlc3RlZCBsYXlvdXQgcHJvcGVydHlcbi8vIEByZXR1cm4geyBzdHJpbmcgfSB0aGUgY29ycmVzcG9uZGluZyB2YWx1ZVxuSXRlbS5wcm90b3R5cGUuZ2V0U3R5bGUgPSBmdW5jdGlvbiggcHJvcGVydHkgKSB7XG5cdHZhciB2YWx1ZTtcblxuXHQvLyBDaGVjayB3aGV0aGVyIHRoaXMgaXMgYSBrbm93biBzdHlsZVxuXHRpZiAoIHRoaXMuc3R5bGUgKSB7XG5cdFx0dmFsdWUgPSB0aGlzLnN0eWxlLmdldCggcHJvcGVydHkgKTtcblx0fVxuXG5cdHJldHVybiB2YWx1ZTtcblxuXHQvLyBJZiBub3QsIGNoZWNrIHRoZSBjc3MgZm9yIHRoZSBlbGVtZW50XG5cdC8vIGFuZCByZXR1cm4gaXRzIHZhbHVlXG5cdC8vIGlmICggdmFsdWUgKSB7XG5cdC8vIFx0cmV0dXJuIHZhbHVlO1xuXHQvLyB9IGVsc2Uge1xuXHQvLyBcdC8vIFRoaXMgaXMgYSBoYWNrISEhXG5cdC8vIFx0cmV0dXJuIHRoaXMuJGdyb3VwLmNzcyggcHJvcGVydHkgKTtcblx0Ly8gfVxufTtcblxuSXRlbS5wcm90b3R5cGUuaXMgPSBmdW5jdGlvbiggaXRlbSApIHtcblx0aWYgKCBpdGVtIGluc3RhbmNlb2YgSXRlbSApIHtcblx0XHRyZXR1cm4gdGhpcy50aXRsZSA9PT0gaXRlbS50aXRsZTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBcImV4Y2VwdGlvbjogQ29tcGFyaXNvbiBtdXN0IGJlIHdpdGggYW5vdGhlciBJdGVtXCI7XG5cdH1cbn1cblxuSXRlbS5wcm90b3R5cGUuX3NldEFjdGl2ZSA9IGZ1bmN0aW9uKCBhY3RpdmUgKSB7XG5cblx0aWYgKCB0aGlzLmFjdGl2ZSAhPT0gYWN0aXZlICkge1xuXHRcdHRoaXMuYWN0aXZlID0gYWN0aXZlO1xuXHRcdHRoaXMuX2VtaXRBY3RpdmVTdGF0ZUNoYW5nZSgpO1x0XHRcblx0fVxuXHRcbn07XG5cbkl0ZW0ucHJvdG90eXBlLl9zZXR1cEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gTGlzdGVuIGZvciBzdHlsZSBjaGFuZ2VzIG9uIHRoaXMgSXRlbVxuXHQvLyAkKGRvY3VtZW50KS5vbiggJ0NvbHVtbnMuU3R5bGVWaWV3LlByb3BlcnR5RGlkVXBkYXRlV2l0aFZhbHVlRm9ySXRlbScsIHRoaXMsIGZhbHNlICk7XG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuU3R5bGVWaWV3LlByb3BlcnR5RGlkVXBkYXRlV2l0aFZhbHVlRm9ySXRlbScsIHRoaXMuX29uSXRlbVN0eWxlRGlkQ2hhbmdlLmJpbmQoIHRoaXMgKSApO1xuXG5cdC8vIExpc3RlbiBmb3IgdGVtcGxhdGUgdXBkYXRlIGV2ZW50c1xuXHQvLyAkKGRvY3VtZW50KS5vbiggJ0NvbHVtbnMuVGVtcGxhdGVWaWV3LkRpZENoYW5nZScsIHRoaXMsIGZhbHNlICk7XG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuVGVtcGxhdGVWaWV3LkRpZENoYW5nZScsIHRoaXMuX29uVGVtcGxhdGVDaGFuZ2UuYmluZCggdGhpcyApICk7XG59O1xuXG5JdGVtLnByb3RvdHlwZS5fb25JdGVtU3R5bGVEaWRDaGFuZ2UgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdGlmICggdGhpcy5pcyggZGF0YS5pdGVtICkgKSB7XG5cdFx0dGhpcy5zdHlsZS51cGRhdGUoIFt7XG5cdFx0XHRwcm9wZXJ0eTogZGF0YS5wcm9wZXJ0eSxcblx0XHRcdHZhbHVlOiBkYXRhLnZhbHVlXG5cdFx0fV0gKTtcblx0XHR0aGlzLl9lbWl0Q2hhbmdlKCk7XG5cdH1cbn07XG5cbkl0ZW0ucHJvdG90eXBlLl9vblRlbXBsYXRlQ2hhbmdlID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuXG5cdC8vIENoZWNrIHdoZXRoZXIgdGhlIGl0ZW0gZXhpc3RzIGluIHRoZSB0ZW1wbGF0ZVxuXHRpZiAoIFRlbXBsYXRlVmlldy5nZXRWYWx1ZUZvckl0ZW0oIHRoaXMgKSApIHtcblx0XHR0aGlzLl9zZXRBY3RpdmUoIGZhbHNlICk7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5fc2V0QWN0aXZlKCB0cnVlICk7XG5cdH1cbn07XG5cbkl0ZW0ucHJvdG90eXBlLl9lbWl0Q2hhbmdlID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gQWxlcnQgYW55IGxpc3RlbmVycyB0aGF0IHRoZSBncm91cCBoYXMgY2hhbmdlZFxuXHQvLyB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoICdDb2x1bW5zLkl0ZW0uRGlkQ2hhbmdlJywge1xuXHQvLyBcdGdyb3VwVmlldzogXHR0aGlzXG5cdC8vIH0pO1xuXHQvLyB2YXIgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0Ly8gZXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLkl0ZW0uRGlkQ2hhbmdlJywgZmFsc2UsIGZhbHNlLCB7XG5cdC8vIFx0aXRlbTogXHR0aGlzXG5cdC8vIH0pO1xuXHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcblx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuSXRlbS5EaWRDaGFuZ2UnLCB7XG5cdFx0aXRlbTogXHR0aGlzXG5cdH0pO1xufTtcblxuSXRlbS5wcm90b3R5cGUuX2VtaXRBY3RpdmVTdGF0ZUNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXG5cdENvbHVtbnNFdmVudC5zZW5kKCdDb2x1bW5zLkl0ZW0uQWN0aXZlU3RhdGVEaWRDaGFuZ2UnLCB7XG5cdFx0aXRlbTogdGhpc1xuXHR9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSXRlbTsiLCIvLyBMYXlvdXQgT2JqZWN0IE1ldGhvZHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFRoaXMgaXMgdGhlIGxheW91dCBvYmplY3QgdGhhdCBjb250cm9sc1xuLy8gdGhlIHdheSB0aGUgdGFibGUgaXMgcmVuZGVyZWQgYW5kIHN0eWxlZC5cbi8vIFRoZSBtZXRob2RzIGJlbG93IGFsbG93IHVzIHRvOlxuLy8gMSkgVHJhdmVyc2UgdGhlIHRlbXBsYXRlIGFuZCBjb25zdHJ1Y3QgYSBuZXcgb2JqZWN0XG4vLyAyKSBVcGRhdGUgdGhlIG9iamVjdCB3aGVuIHN0eWxlcyBhcmUgYWRqdXN0ZWRcblxudmFyIENvbHVtbnNFdmVudCBcdD0gcmVxdWlyZSgnLi9Db2x1bW5zRXZlbnQuanMnKTtcbnZhciBERUZBVUxUU1x0XHQ9IHJlcXVpcmUoJy4uL3N0eWxpbmcvZGVmYXVsdHMuanMnKTtcblxuLy8gQ29sdW1ucy5MYXlvdXQgPSBuZXcgZnVuY3Rpb24oKSB7XG5mdW5jdGlvbiBMYXlvdXQoIGl0ZW1zICkge1xuXG5cdC8vIE1ha2Ugc3VyZSBhbGwgaXRlbXMgYXJlIG9mIHJpZ2h0IHR5cGVcblx0dGhpcy5pdGVtcyA9IFtdO1xuXHRpZiAoIGl0ZW1zICkge1xuXHRcdGl0ZW1zLmZvckVhY2goZnVuY3Rpb24oIGl0ZW0sIGkgKSB7XG5cdFx0XHRpZiAoIGl0ZW0gaW5zdGFuY2VvZiBJdGVtICkge1xuXHRcdFx0XHR0aGlzLml0ZW1zLnB1c2goIGl0ZW0gKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRocm93IFwiZXhjZXB0aW9uOiBhbGwgaXRlbXMgbXVzdCBvZiB0eXBlIEl0ZW1cIjtcblx0XHRcdH1cblx0XHR9LmJpbmQoIHRoaXMgKSk7XG5cdH1cblxuXHQvLyBCdWlsZCBhIGRlZmF1bHQgbGF5b3V0IHdpdGggdGhlIHBhc3NlZC1pbiBpdGVtc1xuXHR0aGlzLm1vZGVsID0gdGhpcy5kZWZhdWx0TGF5b3V0KCB0aGlzLml0ZW1zICk7XG5cblx0dGhpcy5fc2V0dXBFdmVudExpc3RlbmVycygpO1xufVxuXG5MYXlvdXQucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgJHRlbXBsYXRlID0gJCgnLmxheW91dC10ZW1wbGF0ZS1yb3ctZ3JvdXAnKS5maXJzdCgpO1xuXHR0aGlzLm1vZGVsID0gdGhpcy5fZ2VuZXJhdGVNb2RlbEZvclRlbXBsYXRlKCAkdGVtcGxhdGUgKTtcblx0dGhpcy5fZW1pdENoYW5nZSgpO1xufTtcblxuTGF5b3V0LnByb3RvdHlwZS5fZ2VuZXJhdGVNb2RlbEZvclRlbXBsYXRlID0gZnVuY3Rpb24oICR0ZW1wbGF0ZSApIHtcblx0dmFyIG1vZGVsID0ge30sXG5cdFx0c3ViTW9kZWwsXG5cdFx0aXRlbSxcblx0XHRncm91cDtcblxuXHQvLyBTa2lwIGluYWN0aXZlIGl0ZW1zXG5cdGlmICggJHRlbXBsYXRlLmhhc0NsYXNzKCdpbmFjdGl2ZScpICkge1xuXHRcdHJldHVybjtcblx0fVxuXHRcblx0Ly8gSXMgdGhlIHRlbXBsYXRlIGEgdmFsdWUgb3IgYSBncm91cD9cblx0aWYgKCAkdGVtcGxhdGUuaGFzQ2xhc3MoJ2xheW91dC10ZW1wbGF0ZS1yb3ctZ3JvdXAnKSApIHtcblx0XHRncm91cCA9IG5ldyBUZW1wbGF0ZUdyb3VwVmlldyh7IHN0eWxlOiAkdGVtcGxhdGUuYXR0cignc3R5bGUnKSB9KVxuXG5cdFx0Ly8gU2V0IHRoZSBtb2RlbCB0eXBlXG5cdFx0bW9kZWxbJ3R5cGUnXSA9ICdncm91cCc7XG5cblx0XHQvLyBTZXQgdGhlIG1vZGVsIHN0eWxlXG5cdFx0bW9kZWxbJ3N0eWxlJ10gPSBncm91cC5zdHlsZS5zdHlsZXM7XG5cblx0XHQvLyBTZXQgdGhlIG1vZGVsIGxheW91dFxuXHRcdG1vZGVsWydsYXlvdXQnXSA9IFRlbXBsYXRlR3JvdXBWaWV3LmxheW91dEZvckdyb3VwKCAkdGVtcGxhdGUgKTtcblxuXHRcdC8vIEdldCB0aGUgZ3JvdXAncyB2YWx1ZXNcblx0XHRtb2RlbFsndmFsdWVzJ10gPSBbXTtcblx0XHQkdGVtcGxhdGUuY2hpbGRyZW4oKS5lYWNoKGZ1bmN0aW9uKCBpLCBjaGlsZCApIHtcblx0XHRcdHN1Yk1vZGVsID0gdGhpcy5fZ2VuZXJhdGVNb2RlbEZvclRlbXBsYXRlKCAkKCBjaGlsZCApICk7XG5cdFx0XHRpZiAoIHN1Yk1vZGVsICkge1xuXHRcdFx0XHRtb2RlbC52YWx1ZXMucHVzaCggc3ViTW9kZWwgKTtcblx0XHRcdH1cblx0XHR9LmJpbmQoIHRoaXMgKSApO1xuXG5cdH0gZWxzZSBpZiAoICR0ZW1wbGF0ZS5oYXNDbGFzcygnbGF5b3V0LXRlbXBsYXRlLXJvdy12YWx1ZScpICkge1xuXHRcdC8vIGl0ZW0gPSBuZXcgSXRlbSh7XG5cdFx0Ly8gXHR0aXRsZTogJHRlbXBsYXRlLnRleHQoKS50cmltKCksXG5cdFx0Ly8gXHRzdHlsZTogJHRlbXBsYXRlLmF0dHIoJ3N0eWxlJylcblx0XHQvLyB9KTtcblxuXHRcdC8vIHN0eWxlID0gbmV3IFN0eWxlKCAkdGVtcGxhdGUuYXR0cignc3R5bGUnKSApLnN0eWxlcztcblxuXHRcdC8vIFNldCB0aGUgbW9kZWwgdHlwZVxuXHRcdG1vZGVsWyd0eXBlJ10gPSAnc2luZ2xlJztcblxuXHRcdC8vIFNldCB0aGUgbW9kZWwncyBzdHlsZVxuXHRcdG1vZGVsWydzdHlsZSddID0gbmV3IFN0eWxlKCAkdGVtcGxhdGUuYXR0cignc3R5bGUnKSApLnN0eWxlcztcblxuXHRcdC8vIFNldCB0aGUgdmFsdWUncyBkYXRhXG5cdFx0bW9kZWxbJ2RhdGEnXSA9IEl0ZW0udW5mb3JtYXR0ZWRUaXRsZSggJHRlbXBsYXRlLnRleHQoKS50cmltKCkgKTtcblx0fVxuXG5cdHJldHVybiBtb2RlbDtcbn07XG5cbkxheW91dC5wcm90b3R5cGUuX2VtaXRDaGFuZ2UgPSBmdW5jdGlvbigpIHtcblx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuTGF5b3V0LkRpZENoYW5nZScsIHtcblx0XHRsYXlvdXQ6IFx0dGhpc1xuXHR9KTtcbn07XG5cbkxheW91dC5wcm90b3R5cGUuX3NldHVwRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBMaXN0ZW4gdG8gdGVtcGxhdGUgY2hhbmdlIGV2ZW50c1xuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLlRlbXBsYXRlVmlldy5EaWRDaGFuZ2UnLCB0aGlzLl9vblRlbXBsYXRlVmlld0NoYW5nZS5iaW5kKCB0aGlzICkgKTtcbn07XG5cbkxheW91dC5wcm90b3R5cGUuX29uVGVtcGxhdGVWaWV3Q2hhbmdlID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuXHR0aGlzLnVwZGF0ZSgpO1xufTtcblxuLy8gRGVmYXVsdCBsYXlvdXRzIGZvciB2YXJpb3VzIGNvbHVtbiBudW1iZXJzXG5MYXlvdXQucHJvdG90eXBlLmRlZmF1bHRMYXlvdXQgPSBmdW5jdGlvbiggaXRlbXMgKSB7XG5cdFxuXHQvLyBTZXQgdXAgdGhlIGRlZmF1bHQgbGF5b3V0XG5cdHZhciBsYXlvdXQgPSB7XG5cdFx0dHlwZTogJ2dyb3VwJyxcblx0XHRzdHlsZTogW3tcblx0XHRcdHByb3BlcnR5OiAncGFkZGluZycsXG5cdFx0XHR2YWx1ZTogJzEycHgnXG5cdFx0fV0sXG5cdFx0dmFsdWVzOiBbXVxuXHR9O1xuXG5cdC8vIEFkZCB0byB0aGUgZGVmYXVsdCBsYXlvdXRcblx0Ly8gYWNjb3JkaW5nIHRvIHRoZSBudW1iZXIgb2YgaXRlbXNcblx0c3dpdGNoICggaXRlbXMubGVuZ3RoICkge1xuXHRcdGNhc2UgMDpcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMTpcblx0XHRcdGxheW91dFsndmFsdWVzJ10gPSBbe1xuXHRcdFx0XHR0eXBlOiAnc2luZ2xlJyxcblx0XHRcdFx0c3R5bGU6IERFRkFVTFRTLnN0eWxlc1sgMCBdLFxuXHRcdFx0XHRkYXRhOiBpdGVtc1sgMCBdLnVuZm9ybWF0dGVkVGl0bGUoKVxuXHRcdFx0fV07XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDI6XG5cdFx0XHRsYXlvdXRbJ3ZhbHVlcyddID0gW3tcblx0XHRcdFx0dHlwZTogJ2dyb3VwJyxcblx0XHRcdFx0bGF5b3V0OiBERUZBVUxUUy5sYXlvdXRzWyAwIF0sXG5cdFx0XHRcdHZhbHVlczogW3tcblx0XHRcdFx0XHR0eXBlOiAnc2luZ2xlJyxcblx0XHRcdFx0XHRzdHlsZTogREVGQVVMVFMuc3R5bGVzWyAwIF0sXG5cdFx0XHRcdFx0ZGF0YTogaXRlbXNbIDAgXS51bmZvcm1hdHRlZFRpdGxlKClcblx0XHRcdFx0fSx7XG5cdFx0XHRcdFx0dHlwZTogJ3NpbmdsZScsXG5cdFx0XHRcdFx0c3R5bGU6IERFRkFVTFRTLnN0eWxlc1sgMSBdLFxuXHRcdFx0XHRcdGRhdGE6IGl0ZW1zWyAxIF0udW5mb3JtYXR0ZWRUaXRsZSgpXG5cdFx0XHRcdH1dXG5cdFx0XHR9XTtcblx0XHRcdGJyZWFrO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHRsYXlvdXRbJ3ZhbHVlcyddID0gW3tcblx0XHRcdFx0dHlwZTogJ2dyb3VwJyxcblx0XHRcdFx0bGF5b3V0OiBERUZBVUxUUy5sYXlvdXRzWyAwIF0sXG5cdFx0XHRcdHZhbHVlczogW3tcblx0XHRcdFx0XHR0eXBlOiAnc2luZ2xlJyxcblx0XHRcdFx0XHRzdHlsZTogREVGQVVMVFMuc3R5bGVzWyAwIF0sXG5cdFx0XHRcdFx0ZGF0YTogaXRlbXNbIDAgXS51bmZvcm1hdHRlZFRpdGxlKClcblx0XHRcdFx0fSx7XG5cdFx0XHRcdFx0dHlwZTogJ3NpbmdsZScsXG5cdFx0XHRcdFx0c3R5bGU6IERFRkFVTFRTLnN0eWxlc1sgMSBdLFxuXHRcdFx0XHRcdGRhdGE6IGl0ZW1zWyAxIF0udW5mb3JtYXR0ZWRUaXRsZSgpXG5cdFx0XHRcdH1dXG5cdFx0XHR9LCB7XG5cdFx0XHRcdHR5cGU6ICdzaW5nbGUnLFxuXHRcdFx0XHRzdHlsZTogREVGQVVMVFMuc3R5bGVzWyAyIF0sXG5cdFx0XHRcdGRhdGE6IGl0ZW1zWyAyIF0udW5mb3JtYXR0ZWRUaXRsZSgpXG5cdFx0XHR9XTtcblx0XHRcdGJyZWFrO1xuXHR9XG5cdHJldHVybiBsYXlvdXQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IExheW91dDsiLCJ2YXIgQ29sdW1uc0V2ZW50ID0gcmVxdWlyZSgnLi9Db2x1bW5zRXZlbnQuanMnKTtcblxuLy8gU3R5bGUgT2JqZWN0XG4vLyAtLS0tLS0tLS0tLS0tXG4vLyBVc2UgdGhpcyBtb2RlbCB0byBoYW5kbGUgc3R5bGluZyBpbmZvcm1hdGlvbi5cblxuU3R5bGUgPSBmdW5jdGlvbiggc3R5bGVzICkge1xuXG5cdC8vIEFjY2VwdCBlaXRoZXIgYW4gYXJyYXkgb2YgbXVsdGlwbGUgc3R5bGVzXG5cdC8vIG9yIGp1c3QgYSBzaW5nbGUgc3R5bGUgb2JqZWN0XG5cdGlmICggQXJyYXkuaXNBcnJheSggc3R5bGVzICkgKSB7XG5cdFx0dGhpcy5zdHlsZXMgPSBzdHlsZXM7XG5cdH0gZWxzZSBpZiAoIHR5cGVvZiBzdHlsZXMgPT09ICdvYmplY3QnICkge1xuXHRcdHRoaXMuc3R5bGVzID0gWyBzdHlsZXMgXTtcblx0fSBlbHNlIGlmICggdHlwZW9mIHN0eWxlcyA9PT0gJ3N0cmluZycpIHtcblx0XHR0aGlzLnN0eWxlcyA9IHRoaXMuX3BhcnNlQ1NTKCBzdHlsZXMgKTtcblx0fSBlbHNlIHtcblx0XHR0aGlzLnN0eWxlcyA9IFtdO1xuXHR9XG59O1xuXG5TdHlsZS5wYXJzZUNTUyA9IGZ1bmN0aW9uKCBjc3MgKSB7XG5cblx0Ly8gQWNjZXB0IGEgQ1NTIHN0cmluZ1xuXHQvLyBhbmQgY29udmVydCBpdCBpbnRvIGFuIGFycmF5IG9mIGNzcyBwcm9wZXJ0aWVzIGFuZCB2YWx1ZXNcblx0aWYgKCB0eXBlb2YgY3NzICE9PSAnc3RyaW5nJyApIHRocm93IFwiZXhjZXB0aW9uOiBDU1MgbXVzdCBiZSBpbiBzdHJpbmcgZm9ybWF0XCI7XG5cblx0dmFyIHN0eWxlT2JqID0gW107XG5cblx0Ly8gUmVtb3ZlIGFsbCBzcGFjZXNcblx0Y3NzID0gY3NzLnJlcGxhY2UoLyAvZywgJycpO1xuXHQvLyBSZW1vdmUgdGhlIGxhc3Qgc2VtaWNvbG9uXG5cdGNzcyA9IGNzcy5zbGljZSgwLCAtMSk7XG5cdC8vIFNwbGl0IHN0eWxlc1xuXHRzdHlsZXMgPSBjc3Muc3BsaXQoJzsnKTtcblx0Ly8gQ3JlYXQgb2JqZWN0IGZvciBlYWNoIHN0eWxlXG5cdHN0eWxlcy5mb3JFYWNoKGZ1bmN0aW9uKHN0eWxlLCBpKSB7XG5cdFx0c3R5bGUgPSBzdHlsZS5zcGxpdCgnOicpO1xuXHRcdHN0eWxlT2JqLnB1c2goe1xuXHRcdFx0cHJvcGVydHk6IHN0eWxlWzBdLFxuXHRcdFx0dmFsdWU6IHN0eWxlWzFdXG5cdFx0fSk7XG5cdH0pO1xuXHRyZXR1cm4gc3R5bGVPYmo7XG59O1xuXG5TdHlsZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oIHN0eWxlcyApIHtcblx0dmFyIG5ld1N0eWxlcyA9IFtdO1xuXG5cdC8vIEFjY2VwdCBhIHN0cmluZywgYXJyYXksIG9yIG9iamVjdCBvZiBzdHlsZXNcblx0Ly8gYW5kIGV4dGVuZCB0aGUgY3VycmVudCBzdHlsZXMgb2JqZWN0IHdpdGggaXRzIHZhbHVlc1xuXHRpZiAoIHR5cGVvZiBzdHlsZXMgPT09ICdzdHJpbmcnICkge1xuXHRcdG5ld1N0eWxlcyA9IHRoaXMuX3BhcnNlQ1NTKCBzdHlsZXMgKTtcblx0fSBlbHNlIGlmICggQXJyYXkuaXNBcnJheSAoIHN0eWxlcyApICkge1xuXHRcdG5ld1N0eWxlcyA9IHN0eWxlcztcblx0fSBlbHNlIGlmICggdHlwZW9mIHN0eWxlcyA9PT0gJ29iamVjdCcgKSB7XG5cdFx0bmV3U3R5bGVzLnB1c2goc3R5bGVzKTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBcImV4Y2VwdGlvbjogQ1NTIG11c3QgYmUgYSBzdHJpbmcsIGFycmF5IG9yIG9iamVjdFwiO1xuXHR9XG5cblx0Ly8gTm93IGNvbXBsZXRlIHRoZSBtZXJnZVxuXHR0aGlzLl9tZXJnZUNTUyggbmV3U3R5bGVzICk7XG59O1xuXG5TdHlsZS5wcm90b3R5cGUuY3NzID0gZnVuY3Rpb24oKSB7XG5cdHZhciBjc3MgPSAnJztcblx0dGhpcy5zdHlsZXMuZm9yRWFjaChmdW5jdGlvbiggc3R5bGUsIGkgKSB7XG5cdFx0Y3NzICs9IHN0eWxlLnByb3BlcnR5ICsgJzonICsgc3R5bGUudmFsdWUgKyAnOyc7XG5cdH0pO1xuXHRyZXR1cm4gY3NzO1xufTtcblxuLy8gUmV0dXJuIHRoZSBzdHlsZSB2YWx1ZSBmb3IgYSBnaXZlbiBwcm9wZXJ0eVxuLy8gQHBhcmFtIHsgc3RyaW5nIH0gcHJvcGVydHlcbi8vIEByZXR1cm4geyBzdHJpbmcgfSB2YWx1ZVxuU3R5bGUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKCBwcm9wZXJ0eSApIHtcblx0dmFyIHZhbHVlO1xuXG5cdC8vIExvb3AgdGhyb3VnaCBlYWNoIHByb3BlcnR5IHVudGlsIHdlIGZpbmQgYSBtYXRjaFxuXHR0aGlzLnN0eWxlcy5mb3JFYWNoKGZ1bmN0aW9uKCBzdHlsZSwgaSApIHtcblx0XHRpZiAoIHN0eWxlLnByb3BlcnR5ID09PSBwcm9wZXJ0eSApIHtcblx0XHRcdHZhbHVlID0gc3R5bGUudmFsdWVcblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiB2YWx1ZTtcbn07XG5cblN0eWxlLnByb3RvdHlwZS5fcGFyc2VDU1MgPSBmdW5jdGlvbiggY3NzICkge1xuXG5cdHJldHVybiBTdHlsZS5wYXJzZUNTUyggY3NzICk7XHRcbn07XG5cblN0eWxlLnByb3RvdHlwZS5fbWVyZ2VDU1MgPSBmdW5jdGlvbiggY3NzICkge1xuXHQvLyBBY2NlcHQgYW4gYXJyYXkgb2YgY3NzIHN0eWxlIG9iamVjdHNcblx0aWYgKCAhQXJyYXkuaXNBcnJheSggY3NzICkgKSB0aHJvdyBcImV4Y2VwdGlvbjogQ1NTIG11c3QgYmUgYW4gYXJyYXlcIjtcblxuXHR2YXIgbmV3U3R5bGVzID0gY3NzLm1hcChmdW5jdGlvbiggc3R5bGUgKSB7IHJldHVybiBzdHlsZTsgfSksXG5cdFx0b2xkSW5kZXgsXG5cdFx0b2xkSW5kaWNlcyA9IHRoaXMuc3R5bGVzLmxlbmd0aDtcblxuXHQvLyBMb29wIHRocm91Z2ggdGhlIG9sZCBwcm9wZXJ0aWVzXG5cdC8vIGNvbXBhcmluZyBlYWNoIHdpdGggYWxsIHRoZSBuZXcgcHJvcGVydGllcy5cblx0Ly8gUmVwbGFjZSBhbiBleGlzdGluZyBwcm9wZXJ0eSBhbnl0aW1lIGEgbmV3IG9uZSBtYXRjaGVzIGl0XG5cdC8vIGFuZCB0aGVuIHJlbW92ZSB0aGF0IG5ldyBwcm9wZXJ0eSBmcm9tIHRoZSBhcnJheS5cblx0Ly8gQXQgdGhlIGVuZCwgYXBwZW5kIGFueSByZW1haW5pbmcgbmV3IHByb3BlcnRpZXMgdG8gdGhlIG1lcmdlZCBzdHlsZXMgYXJyYXkuXG5cdGNzcy5mb3JFYWNoKGZ1bmN0aW9uKCBuZXdTdHlsZSwgbmV3SW5kZXggKSB7XG5cdFx0Zm9yICggb2xkSW5kZXggPSAwIDsgb2xkSW5kZXggPCBvbGRJbmRpY2VzIDsgb2xkSW5kZXgrKyApIHtcblx0XHRcdGlmICggdGhpcy5zdHlsZXNbIG9sZEluZGV4IF0ucHJvcGVydHkgPT0gbmV3U3R5bGUucHJvcGVydHkgKSB7XG5cdFx0XHRcdHRoaXMuc3R5bGVzWyBvbGRJbmRleCBdID0gbmV3U3R5bGU7XG5cdFx0XHRcdG5ld1N0eWxlcy5zcGxpY2UoIG5ld1N0eWxlcy5pbmRleE9mKCBuZXdTdHlsZSApLCAxICk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHR9LmJpbmQoIHRoaXMgKSk7XG5cblx0Ly8gQWRkIGFsbCByZW1haW5pbmcgbmV3IHN0eWxlcyB0byB0aGUgc3R5bGVzIGFycmF5XG5cdHRoaXMuc3R5bGVzID0gdGhpcy5zdHlsZXMuY29uY2F0KCBuZXdTdHlsZXMgKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU3R5bGU7IiwidmFyIENvbHVtbnNFdmVudCBcdD0gcmVxdWlyZSgnLi9Db2x1bW5zRXZlbnQuanMnKTtcbnZhciBMYXlvdXQgXHRcdFx0PSByZXF1aXJlKCcuL0xheW91dC5qcycpO1xudmFyIEl0ZW0gXHRcdFx0PSByZXF1aXJlKCcuL0l0ZW0uanMnKTtcbnZhciBjb25maWcgXHRcdFx0PSByZXF1aXJlKCcuLi9jb25maWcuanMnKTtcbnZhciBERUZBVUxUU1x0XHQ9IHJlcXVpcmUoJy4uL3N0eWxpbmcvZGVmYXVsdHMuanMnKTtcblxuZnVuY3Rpb24gVGFibGUoIHByb3BzICkgIHtcblxuXHR0aGlzLmRhdGEgPSBbXTtcblx0dGhpcy50aXRsZSA9ICcnO1xuXHR0aGlzLnNvdXJjZSA9ICcnO1xuXHR0aGlzLnNvdXJjZV91cmwgPSAnJztcblx0dGhpcy5jb2x1bW5zID0gW107XG5cdHRoaXMubGF5b3V0O1xuXHR0aGlzLmlkO1xuXG5cdHRoaXMuX3VwZGF0ZSggcHJvcHMgKTtcblx0dGhpcy5fc2V0dXBFdmVudExpc3RlbmVycygpO1xufVxuXG5UYWJsZS5wcm90b3R5cGUuX3VwZGF0ZSA9IGZ1bmN0aW9uKCBwcm9wcyApIHtcblxuXHRpZiAoIHByb3BzICkge1xuXHRcdHRoaXMuZGF0YSA9IHByb3BzLmRhdGEgfHwgdGhpcy5kYXRhO1xuXHRcdHRoaXMudGl0bGUgPSBwcm9wcy50aXRsZSB8fCB0aGlzLnRpdGxlO1xuXHRcdHRoaXMuc291cmNlID0gcHJvcHMuc291cmNlIHx8IHRoaXMuc291cmNlO1xuXHRcdHRoaXMuc291cmNlX3VybCA9IHByb3BzLnNvdXJjZV91cmwgfHwgdGhpcy5zb3VyY2VfdXJsO1xuXHRcdHRoaXMuaWQgPSBwcm9wcy5pZCB8fCB0aGlzLmlkO1xuXG5cdFx0aWYgKCBwcm9wcy5jb2x1bW5zICkge1x0XG5cdFx0XHR0aGlzLmNvbHVtbnMgPSB0aGlzLml0ZW1zRnJvbUNvbHVtbk5hbWVzKCBwcm9wcy5jb2x1bW5zICk7XG5cdFx0fVxuXG5cdFx0aWYgKCBwcm9wcy5sYXlvdXQgKSB7XG5cdFx0XHR0aGlzLmxheW91dCA9IHByb3BzLmxheW91dDtcblx0XHR9IGVsc2UgaWYgKCAhdGhpcy5sYXlvdXQgKSB7XG5cdFx0XHR0aGlzLmxheW91dCA9IG5ldyBMYXlvdXQoIHRoaXMuY29sdW1ucyApO1xuXHRcdH1cblxuXHRcdC8vIExldCBldmVyeW9uZSBrbm93IHRoYXQgd2UndmUgdXBkYXRlZCB0aGUgdGFibGVcblx0XHR0aGlzLl9lbWl0Q2hhbmdlKCk7XG5cdH1cbn07XG5cblRhYmxlLnByb3RvdHlwZS5fZW1pdENoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXHQvLyBMZXQgZXZlcnlvbmUga25vdyB0aGF0IHRoZSB0YWJsZSBoYXMgYmVlbiB1cGxvYWRlZCBzdWNjZXNzZnVsbHlcblx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHQvLyBjb2x1bW5zRXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLlRhYmxlLkRpZENoYW5nZScsIGZhbHNlLCBmYWxzZSwge1xuXHQvLyBcdHRhYmxlOiBcdHRoaXNcblx0Ly8gfSk7XG5cdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY29sdW1uc0V2ZW50KTtcblx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuVGFibGUuRGlkQ2hhbmdlJywge1xuXHRcdHRhYmxlOiBcdHRoaXNcblx0fSk7XG59O1xuXG5UYWJsZS5wcm90b3R5cGUuX2VtaXRVcGxvYWRTdWNjZXNzID0gZnVuY3Rpb24oKSB7XG5cdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0Ly8gY29sdW1uc0V2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5UYWJsZS5EaWRVcGxvYWRXaXRoU3VjY2VzcycsIGZhbHNlLCBmYWxzZSwge1xuXHQvLyBcdHRhYmxlOiBcdHRoaXNcblx0Ly8gfSk7XG5cdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY29sdW1uc0V2ZW50KTtcblx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuVGFibGUuRGlkVXBsb2FkV2l0aFN1Y2Nlc3MnLCB7XG5cdFx0dGFibGU6IFx0dGhpc1xuXHR9KTtcbn07XG5cblRhYmxlLnByb3RvdHlwZS5fZW1pdFVwbG9hZEZhaWwgPSBmdW5jdGlvbigpIHtcblx0Ly8gdmFyIGNvbHVtbnNFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHQvLyBjb2x1bW5zRXZlbnQuaW5pdEN1c3RvbUV2ZW50KCdDb2x1bW5zLlRhYmxlLkRpZFVwbG9hZFdpdGhGYWlsdXJlJywgZmFsc2UsIGZhbHNlLCB7XG5cdC8vIFx0dGFibGU6IFx0dGhpc1xuXHQvLyB9KTtcblx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjb2x1bW5zRXZlbnQpO1xuXHRDb2x1bW5zRXZlbnQuc2VuZCgnQ29sdW1ucy5UYWJsZS5EaWRVcGxvYWRXaXRoRmFpbHVyZScsIHtcblx0XHR0YWJsZTogXHR0aGlzXG5cdH0pO1xufTtcblxuVGFibGUucHJvdG90eXBlLl9lbWl0VXBkYXRlU3VjY2VzcyA9IGZ1bmN0aW9uKCkge1xuXHQvLyB2YXIgY29sdW1uc0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cdC8vIGNvbHVtbnNFdmVudC5pbml0Q3VzdG9tRXZlbnQoJ0NvbHVtbnMuVGFibGUuRGlkVXBkYXRlV2l0aFN1Y2Nlc3MnLCBmYWxzZSwgZmFsc2UsIHtcblx0Ly8gXHR0YWJsZTogXHR0aGlzXG5cdC8vIH0pO1xuXHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGNvbHVtbnNFdmVudCk7XG5cdENvbHVtbnNFdmVudC5zZW5kKCdDb2x1bW5zLlRhYmxlLkRpZFVwZGF0ZVdpdGhTdWNjZXNzJywge1xuXHRcdHRhYmxlOiBcdHRoaXNcblx0fSk7XG59O1xuXG5UYWJsZS5wcm90b3R5cGUuX2VtaXRVcGRhdGVGYWlsID0gZnVuY3Rpb24oKSB7XG5cdC8vIHZhciBjb2x1bW5zRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblx0Ly8gY29sdW1uc0V2ZW50LmluaXRDdXN0b21FdmVudCgnQ29sdW1ucy5UYWJsZS5EaWRVcGRhdGVXaXRoRmFpbHVyZScsIGZhbHNlLCBmYWxzZSwge1xuXHQvLyBcdHRhYmxlOiBcdHRoaXNcblx0Ly8gfSk7XG5cdC8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY29sdW1uc0V2ZW50KTtcblx0Q29sdW1uc0V2ZW50LnNlbmQoJ0NvbHVtbnMuVGFibGUuRGlkVXBkYXRlV2l0aEZhaWx1cmUnLCB7XG5cdFx0dGFibGU6IFx0dGhpc1xuXHR9KTtcbn07XG5cbi8vIFJldHVybiBhbiBpdGVtIGdpdmVuIGEgZGF0YSBjb2x1bW4gbmFtZVxuLy8gQHBhcmFtIHtzdHJpbmd9IGRhdGEgLS0gdGhlIHVuZm9ybWF0dGVkIGNvbHVtbiB0aXRsZSB0byBzZWFyY2ggYWdhaW5zdCAoJ2ZpcnN0X25hbWUnKVxuLy8gQHJldHVybiB7SXRlbX0gLS0gdGhlIG1hdGNoaW5nIGl0ZW1cblRhYmxlLnByb3RvdHlwZS5nZXRJdGVtRm9yRGF0YSA9IGZ1bmN0aW9uKCBkYXRhICkge1xuXHR2YXIgaXRlbTtcblxuXHRpZiAoIGRhdGEgJiYgdGhpcy5jb2x1bW5zICYmIHRoaXMuY29sdW1ucy5sZW5ndGggKSB7XG5cdFx0aXRlbSA9IHRoaXMuY29sdW1ucy5maWx0ZXIoZnVuY3Rpb24oIGNvbHVtbiApIHtcblx0XHRcdHJldHVybiBkYXRhID09PSBjb2x1bW4udW5mb3JtYXR0ZWRUaXRsZSgpO1xuXHRcdH0uYmluZCggdGhpcyApKVsgMCBdO1xuXHR9XG5cblx0cmV0dXJuIGl0ZW07XG59O1xuXG5UYWJsZS5wcm90b3R5cGUuaXRlbXNGcm9tQ29sdW1uTmFtZXMgPSBmdW5jdGlvbiggY29sdW1uTmFtZXMgKSB7XG5cblx0aWYgKCB0eXBlb2YgY29sdW1uTmFtZXMgPT09ICdzdHJpbmcnICkge1xuXHRcdGNvbHVtbk5hbWVzID0gWyBjb2x1bW5OYW1lcyBdO1xuXHR9XG5cblx0aWYoIGNvbHVtbk5hbWVzIGluc3RhbmNlb2YgSXRlbSApIHtcblx0XHRjb2x1bW5OYW1lcyA9IFsgY29sdW1uTmFtZXMgXTtcblx0fVxuXG5cdGlmKCAhQXJyYXkuaXNBcnJheSggY29sdW1uTmFtZXMgKSApIHtcblx0XHR0aHJvdyBcImV4Y2VwdGlvbjogQ29sdW1uIG5hbWVzIG11c3QgYmUgYSBzdHJpbmcgb3IgYW4gYXJyYXkgb2Ygc3RyaW5nc1wiO1xuXHR9XG5cblx0cmV0dXJuIGNvbHVtbk5hbWVzLm1hcChmdW5jdGlvbiggY29sdW1uTmFtZSwgaSApIHtcblx0XHQvLyB2YXIgaXRlbTtcblxuXHRcdC8vIGlmICggY29sdW1uTmFtZSBpbnN0YW5jZW9mIEl0ZW0gKSB7XG5cdFx0Ly8gXHRyZXR1cm4gY29sdW1uTmFtZTtcblx0XHQvLyB9IGVsc2Uge1xuXHRcdC8vIFx0aXRlbSA9IG5ldyBJdGVtKHtcblx0XHQvLyBcdFx0dGl0bGU6IGNvbHVtbk5hbWUsXG5cdFx0Ly8gXHRcdHN0eWxlOiBERUZBVUxUUy5zdHlsZXNbIGkgXTtcblx0XHQvLyBcdH0pXG5cdFx0Ly8gfVxuXHRcdHJldHVybiBjb2x1bW5OYW1lIGluc3RhbmNlb2YgSXRlbSA/IGNvbHVtbk5hbWUgOiBuZXcgSXRlbSh7IHRpdGxlOiBjb2x1bW5OYW1lLCBzdHlsZTogREVGQVVMVFMuc3R5bGVzWyBpIF0gfSk7XG5cdH0pO1xufVxuXG5UYWJsZS5wcm90b3R5cGUuX3VwbG9hZEZpbGUgPSBmdW5jdGlvbiggZmlsZSApIHtcblx0dmFyIGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG5cblx0Ly8gQWRkIGFueSB0YWJsZSBtZXRhLWRhdGEgdG8gdGhlIGZvcm1cblx0Zm9ybURhdGEuYXBwZW5kKCBcImRhdGFcIiwgZmlsZSApO1xuXHRmb3JtRGF0YS5hcHBlbmQoIFwidGl0bGVcIiwgdGhpcy50aXRsZSApO1xuXHRmb3JtRGF0YS5hcHBlbmQoIFwic291cmNlXCIsIHRoaXMuc291cmNlICk7XG5cdGZvcm1EYXRhLmFwcGVuZCggXCJzb3VyY2VfdXJsXCIsIHRoaXMuc291cmNlX3VybCApO1xuXHRmb3JtRGF0YS5hcHBlbmQoIFwiY29sdW1uc1wiLCB0aGlzLnN0cmluZ0Zyb21Db2x1bW5zKCB0aGlzLmNvbHVtbnMgKSApO1xuXHQvLyBmb3JtRGF0YS5hcHBlbmQoIFwibGF5b3V0XCIsIEpTT04uc3RyaW5naWZ5KCB0aGlzLmxheW91dC5tb2RlbCApICk7XG5cblx0Ly8gdGhpcy5fb25VcGxvYWRTdWNjZXNzKCB7XG5cdC8vIFx0c3RhdHVzOiAnc3VjY2VzcycsXG5cdC8vIFx0ZGF0YToge1xuXHQvLyBcdFx0dGFibGVfaWQ6IDFcblx0Ly8gXHR9XG5cdC8vIH0pO1xuXG5cdCQuYWpheCh7XG4gICAgICAgIHVybDogY29uZmlnLmFwaS5ob3N0ICsgJy9jb2x1bW5zL3RhYmxlJywgIC8vU2VydmVyIHNjcmlwdCB0byBwcm9jZXNzIGRhdGFcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICBjb250ZW50VHlwZTogZmFsc2UsXG4gICAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcbiAgICAgICAgZGF0YTogZm9ybURhdGEsXG4gICAgICAgIHN1Y2Nlc3M6IHRoaXMuX29uVXBsb2FkU3VjY2Vzcy5iaW5kKCB0aGlzIClcbiAgICB9KTtcbn07XG5cblRhYmxlLnByb3RvdHlwZS5fdXBkYXRlVGFibGUgPSBmdW5jdGlvbigpIHtcblx0dmFyIGRhdGEgPSB7XG5cdFx0dGl0bGU6IHRoaXMudGl0bGUsXG5cdFx0c291cmNlOiB0aGlzLnNvdXJjZSxcblx0XHRzb3VyY2VfdXJsOiB0aGlzLnNvdXJjZV91cmwsXG5cdFx0bGF5b3V0OiBKU09OLnN0cmluZ2lmeSggdGhpcy5sYXlvdXQubW9kZWwgKSxcblx0XHRjb2x1bW5zOiB0aGlzLnN0cmluZ0Zyb21Db2x1bW5zKCB0aGlzLmNvbHVtbnMgKVxuXHR9O1xuXHQkLnBvc3QoY29uZmlnLmFwaS5ob3N0ICsgJy9jb2x1bW5zL3RhYmxlLycgKyB0aGlzLmlkLCBkYXRhLCB0aGlzLl9vblVwZGF0ZVN1Y2Nlc3MuYmluZCggdGhpcyApICk7XG59O1xuXG5UYWJsZS5wcm90b3R5cGUuX3NldHVwRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBMaXN0ZW4gZm9yIGNvbHVtbiBuYW1lcyBwYXJzaW5nXG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuVXBsb2FkVmlldy5EaWRQYXJzZUNvbHVtbk5hbWVzRm9yRmlsZScsIHRoaXMuX29uQ29sdW1uTmFtZXNQYXJzZWQuYmluZCggdGhpcyApKTtcblxuXHQvLyBMaXN0ZW4gZm9yIHJvdyBkYXRhIHBhcnNpbmdcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5VcGxvYWRWaWV3LkRpZFBhcnNlRGF0YVJvd0ZvckZpbGUnLCB0aGlzLl9vblJvd1BhcnNlZC5iaW5kKCB0aGlzICkgKTtcdFxuXG5cdC8vIExpc3RlbiBmb3IgcGFyc2luZyBjb21wbGV0aW9uXG5cdENvbHVtbnNFdmVudC5vbiggJ0NvbHVtbnMuVXBsb2FkVmlldy5EaWRDb21wbGV0ZVBhcnNlRm9yRmlsZScsIHRoaXMuX29uUGFyc2VDb21wbGV0ZS5iaW5kKCB0aGlzICkgKTtcblxuXHQvLyBMaXN0ZW4gZm9yIHVwZGF0ZXMgZnJvbSB0aGUgZGV0YWlscyBwYW5lbFxuXHRDb2x1bW5zRXZlbnQub24oICdDb2x1bW5zLkVtYmVkRGV0YWlsc1ZpZXcuRGlkVXBkYXRlUHJvcGVydHlXaXRoVmFsdWUnLCB0aGlzLl9vblRhYmxlVXBkYXRlLmJpbmQoIHRoaXMgKSApO1xuXG5cdC8vIExpc3RlbiBmb3IgbGF5b3V0IHVwZGF0ZXNcblx0Q29sdW1uc0V2ZW50Lm9uKCAnQ29sdW1ucy5MYXlvdXQuRGlkQ2hhbmdlJywgdGhpcy5fb25MYXlvdXRVcGRhdGUuYmluZCggdGhpcyApICk7XG5cbn07XG5cblRhYmxlLnByb3RvdHlwZS5fb25Db2x1bW5OYW1lc1BhcnNlZCA9IGZ1bmN0aW9uKCBldmVudCwgZGF0YSApIHtcblxuXHR0aGlzLmNvbHVtbnMgPSB0aGlzLml0ZW1zRnJvbUNvbHVtbk5hbWVzKCBkYXRhLmNvbHVtbnMgKTtcbn07XG5cblRhYmxlLnByb3RvdHlwZS5fb25Sb3dQYXJzZWQgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdHZhciByb3cgPSBkYXRhLnJvdyxcblx0XHRkYXRhID0ge307XG5cblx0cm93LmZvckVhY2goZnVuY3Rpb24oIHZhbHVlLCBpICkge1xuXHRcdGRhdGFbIHRoaXMuY29sdW1uc1sgaSBdLnVuZm9ybWF0dGVkVGl0bGUoKSBdID0gdmFsdWU7XG5cdH0uYmluZCggdGhpcyApKTtcblxuXHR0aGlzLmRhdGEucHVzaCggZGF0YSApO1xufTtcblxuVGFibGUucHJvdG90eXBlLl9vblBhcnNlQ29tcGxldGUgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cblx0dGhpcy5fdXBsb2FkRmlsZSggZGF0YS5maWxlICk7XG59O1xuXG5UYWJsZS5wcm90b3R5cGUuX29uVXBsb2FkU3VjY2VzcyA9IGZ1bmN0aW9uKCBkYXRhLCBzdGF0dXMsIHJlcXVlc3QgKSB7XG5cblx0Ly8gQ2hlY2sgZm9yIGEgc2VydmVyLXNpZGUgZXJyb3Jcblx0aWYgKCBkYXRhLnN0YXR1cyAhPT0gJ3N1Y2Nlc3MnICkge1xuXHRcdHRoaXMuX29uVXBsb2FkRmFpbCggcmVxdWVzdCwgc3RhdHVzLCBkYXRhLm1lc3NhZ2UgKTtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvLyBTZXQgdGhlIFRhYmxlIElEXG5cdHRoaXMuX3VwZGF0ZSh7XG5cdFx0aWQ6IGRhdGEuZGF0YS50YWJsZV9pZFxuXHR9KTtcblxuXHR0aGlzLl9lbWl0VXBsb2FkU3VjY2VzcygpO1xufTtcblxuVGFibGUucHJvdG90eXBlLl9vblVwbG9hZEZhaWwgPSBmdW5jdGlvbiggcmVxdWVzdCwgc3RhdHVzLCBlcnJvciApIHtcblxuXHR0aGlzLl9lbWl0VXBsb2FkRmFpbCgpO1xufTtcblxuVGFibGUucHJvdG90eXBlLl9vblVwZGF0ZVN1Y2Nlc3MgPSBmdW5jdGlvbiggZGF0YSwgc3RhdHVzLCByZXF1ZXN0ICkge1xuXG5cdC8vIENoZWNrIGZvciBhIHNlcnZlci1zaWRlIGVycm9yXG5cdGlmICggZGF0YS5zdGF0dXMgIT09ICdzdWNjZXNzJyApIHtcblx0XHR0aGlzLl9lbWl0VXBkYXRlRmFpbCgpO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdHRoaXMuX2VtaXRVcGRhdGVTdWNjZXNzKCk7XG59O1xuXG5UYWJsZS5wcm90b3R5cGUuX29uVGFibGVVcGRhdGUgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdHZhciBwcm9wcyA9IHt9O1xuXG5cdHByb3BzWyBkYXRhLnByb3BlcnR5IF0gPSBkYXRhLnZhbHVlO1xuXG5cdHRoaXMuX3VwZGF0ZSggcHJvcHMgKTtcblx0dGhpcy5fdXBkYXRlVGFibGUoKTtcbn07XG5cblRhYmxlLnByb3RvdHlwZS5fb25MYXlvdXRVcGRhdGUgPSBmdW5jdGlvbiggZXZlbnQsIGRhdGEgKSB7XG5cdHRoaXMuX3VwZGF0ZSh7XG5cdFx0bGF5b3V0OiBkYXRhLmxheW91dFxuXHR9KTtcblx0dGhpcy5fdXBkYXRlVGFibGUoKTtcbn07XG5cblRhYmxlLnByb3RvdHlwZS5zdHJpbmdGcm9tQ29sdW1ucyA9IGZ1bmN0aW9uKCBjb2x1bW5zICkge1xuXG5cdHJldHVybiBjb2x1bW5zLm1hcChmdW5jdGlvbiggY29sdW1uLCBpICkge1xuXHRcdHJldHVybiBjb2x1bW4udGl0bGU7XG5cdH0pLmpvaW4oKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVGFibGU7IiwiLy8gV2UgbmVlZCB0byB0cmVhdCBsYXlvdXQgcHJvcGVydGllcyBzbGlnaHRseSBkaWZmZXJlbnRseSB0aGFuIHJlZ3VsYXIgY3NzIHByb3BlcnRpZXNcbi8vIHRvIGFjY291bnQgZm9yIGJyb3dzZXItc3BlY2lmaWMgcHJlZml4ZXNcbm1vZHVsZS5leHBvcnRzID0ge1xuXHRzdHlsZXM6IFtcblx0XHRbe1xuXHRcdFx0cHJvcGVydHk6ICdjb2xvcicsXG5cdFx0XHR2YWx1ZTogJyMzYTNhM2EnXG5cdFx0fV0sXG5cdFx0W3tcblx0XHRcdHByb3BlcnR5OiAnY29sb3InLFxuXHRcdFx0dmFsdWU6ICcjODg4J1xuXHRcdH0se1xuXHRcdFx0cHJvcGVydHk6ICdmb250LXNpemUnLFxuXHRcdFx0dmFsdWU6ICcxNHB4J1xuXHRcdH0sIHtcblx0XHRcdHByb3BlcnR5OiAnbWFyZ2luLXRvcCcsXG5cdFx0XHR2YWx1ZTogJzRweCdcblx0XHR9XSxcblx0XHRbe1xuXHRcdFx0cHJvcGVydHk6ICdjb2xvcicsXG5cdFx0XHR2YWx1ZTogJyMzYTNhM2EnXG5cdFx0fSx7XG5cdFx0XHRwcm9wZXJ0eTogJ2ZvbnQtc2l6ZScsXG5cdFx0XHR2YWx1ZTogJzI0cHgnXG5cdFx0fV1cdFxuXHRdLFxuXHRsYXlvdXRzOiBbXG5cdFx0W3tcblx0XHRcdHByb3BlcnR5OiAnZmxleC1kaXJlY3Rpb24nLFxuXHRcdFx0dmFsdWU6ICdjb2x1bW4nXG5cdFx0fSwge1xuXHRcdFx0cHJvcGVydHk6ICdhbGlnbi1pdGVtcycsXG5cdFx0XHR2YWx1ZTogJ2ZsZXgtc3RhcnQnXG5cdFx0fV1cblx0XVxufTsiLCIvKipcbiAqIGlzTW9iaWxlLmpzIHYwLjMuNVxuICpcbiAqIEEgc2ltcGxlIGxpYnJhcnkgdG8gZGV0ZWN0IEFwcGxlIHBob25lcyBhbmQgdGFibGV0cyxcbiAqIEFuZHJvaWQgcGhvbmVzIGFuZCB0YWJsZXRzLCBvdGhlciBtb2JpbGUgZGV2aWNlcyAobGlrZSBibGFja2JlcnJ5LCBtaW5pLW9wZXJhIGFuZCB3aW5kb3dzIHBob25lKSxcbiAqIGFuZCBhbnkga2luZCBvZiBzZXZlbiBpbmNoIGRldmljZSwgdmlhIHVzZXIgYWdlbnQgc25pZmZpbmcuXG4gKlxuICogQGF1dGhvcjogS2FpIE1hbGxlYSAoa21hbGxlYUBnbWFpbC5jb20pXG4gKlxuICogQGxpY2Vuc2U6IGh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL3B1YmxpY2RvbWFpbi96ZXJvLzEuMC9cbiAqL1xuKGZ1bmN0aW9uIChnbG9iYWwpIHtcblxuICAgIHZhciBhcHBsZV9waG9uZSAgICAgICAgID0gL2lQaG9uZS9pLFxuICAgICAgICBhcHBsZV9pcG9kICAgICAgICAgID0gL2lQb2QvaSxcbiAgICAgICAgYXBwbGVfdGFibGV0ICAgICAgICA9IC9pUGFkL2ksXG4gICAgICAgIGFuZHJvaWRfcGhvbmUgICAgICAgPSAvKD89LipcXGJBbmRyb2lkXFxiKSg/PS4qXFxiTW9iaWxlXFxiKS9pLCAvLyBNYXRjaCAnQW5kcm9pZCcgQU5EICdNb2JpbGUnXG4gICAgICAgIGFuZHJvaWRfdGFibGV0ICAgICAgPSAvQW5kcm9pZC9pLFxuICAgICAgICB3aW5kb3dzX3Bob25lICAgICAgID0gL0lFTW9iaWxlL2ksXG4gICAgICAgIHdpbmRvd3NfdGFibGV0ICAgICAgPSAvKD89LipcXGJXaW5kb3dzXFxiKSg/PS4qXFxiQVJNXFxiKS9pLCAvLyBNYXRjaCAnV2luZG93cycgQU5EICdBUk0nXG4gICAgICAgIG90aGVyX2JsYWNrYmVycnkgICAgPSAvQmxhY2tCZXJyeS9pLFxuICAgICAgICBvdGhlcl9ibGFja2JlcnJ5XzEwID0gL0JCMTAvaSxcbiAgICAgICAgb3RoZXJfb3BlcmEgICAgICAgICA9IC9PcGVyYSBNaW5pL2ksXG4gICAgICAgIG90aGVyX2ZpcmVmb3ggICAgICAgPSAvKD89LipcXGJGaXJlZm94XFxiKSg/PS4qXFxiTW9iaWxlXFxiKS9pLCAvLyBNYXRjaCAnRmlyZWZveCcgQU5EICdNb2JpbGUnXG4gICAgICAgIHNldmVuX2luY2ggPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgJyg/OicgKyAgICAgICAgIC8vIE5vbi1jYXB0dXJpbmcgZ3JvdXBcblxuICAgICAgICAgICAgJ05leHVzIDcnICsgICAgIC8vIE5leHVzIDdcblxuICAgICAgICAgICAgJ3wnICsgICAgICAgICAgIC8vIE9SXG5cbiAgICAgICAgICAgICdCTlRWMjUwJyArICAgICAvLyBCJk4gTm9vayBUYWJsZXQgNyBpbmNoXG5cbiAgICAgICAgICAgICd8JyArICAgICAgICAgICAvLyBPUlxuXG4gICAgICAgICAgICAnS2luZGxlIEZpcmUnICsgLy8gS2luZGxlIEZpcmVcblxuICAgICAgICAgICAgJ3wnICsgICAgICAgICAgIC8vIE9SXG5cbiAgICAgICAgICAgICdTaWxrJyArICAgICAgICAvLyBLaW5kbGUgRmlyZSwgU2lsayBBY2NlbGVyYXRlZFxuXG4gICAgICAgICAgICAnfCcgKyAgICAgICAgICAgLy8gT1JcblxuICAgICAgICAgICAgJ0dULVAxMDAwJyArICAgIC8vIEdhbGF4eSBUYWIgNyBpbmNoXG5cbiAgICAgICAgICAgICcpJywgICAgICAgICAgICAvLyBFbmQgbm9uLWNhcHR1cmluZyBncm91cFxuXG4gICAgICAgICAgICAnaScpOyAgICAgICAgICAgLy8gQ2FzZS1pbnNlbnNpdGl2ZSBtYXRjaGluZ1xuXG4gICAgdmFyIG1hdGNoID0gZnVuY3Rpb24ocmVnZXgsIHVzZXJBZ2VudCkge1xuICAgICAgICByZXR1cm4gcmVnZXgudGVzdCh1c2VyQWdlbnQpO1xuICAgIH07XG5cbiAgICB2YXIgSXNNb2JpbGVDbGFzcyA9IGZ1bmN0aW9uKHVzZXJBZ2VudCkge1xuICAgICAgICB2YXIgdWEgPSB1c2VyQWdlbnQgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudDtcblxuICAgICAgICB0aGlzLmFwcGxlID0ge1xuICAgICAgICAgICAgcGhvbmU6ICBtYXRjaChhcHBsZV9waG9uZSwgdWEpLFxuICAgICAgICAgICAgaXBvZDogICBtYXRjaChhcHBsZV9pcG9kLCB1YSksXG4gICAgICAgICAgICB0YWJsZXQ6IG1hdGNoKGFwcGxlX3RhYmxldCwgdWEpLFxuICAgICAgICAgICAgZGV2aWNlOiBtYXRjaChhcHBsZV9waG9uZSwgdWEpIHx8IG1hdGNoKGFwcGxlX2lwb2QsIHVhKSB8fCBtYXRjaChhcHBsZV90YWJsZXQsIHVhKVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFuZHJvaWQgPSB7XG4gICAgICAgICAgICBwaG9uZTogIG1hdGNoKGFuZHJvaWRfcGhvbmUsIHVhKSxcbiAgICAgICAgICAgIHRhYmxldDogIW1hdGNoKGFuZHJvaWRfcGhvbmUsIHVhKSAmJiBtYXRjaChhbmRyb2lkX3RhYmxldCwgdWEpLFxuICAgICAgICAgICAgZGV2aWNlOiBtYXRjaChhbmRyb2lkX3Bob25lLCB1YSkgfHwgbWF0Y2goYW5kcm9pZF90YWJsZXQsIHVhKVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLndpbmRvd3MgPSB7XG4gICAgICAgICAgICBwaG9uZTogIG1hdGNoKHdpbmRvd3NfcGhvbmUsIHVhKSxcbiAgICAgICAgICAgIHRhYmxldDogbWF0Y2god2luZG93c190YWJsZXQsIHVhKSxcbiAgICAgICAgICAgIGRldmljZTogbWF0Y2god2luZG93c19waG9uZSwgdWEpIHx8IG1hdGNoKHdpbmRvd3NfdGFibGV0LCB1YSlcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5vdGhlciA9IHtcbiAgICAgICAgICAgIGJsYWNrYmVycnk6ICAgbWF0Y2gob3RoZXJfYmxhY2tiZXJyeSwgdWEpLFxuICAgICAgICAgICAgYmxhY2tiZXJyeTEwOiBtYXRjaChvdGhlcl9ibGFja2JlcnJ5XzEwLCB1YSksXG4gICAgICAgICAgICBvcGVyYTogICAgICAgIG1hdGNoKG90aGVyX29wZXJhLCB1YSksXG4gICAgICAgICAgICBmaXJlZm94OiAgICAgIG1hdGNoKG90aGVyX2ZpcmVmb3gsIHVhKSxcbiAgICAgICAgICAgIGRldmljZTogICAgICAgbWF0Y2gob3RoZXJfYmxhY2tiZXJyeSwgdWEpIHx8IG1hdGNoKG90aGVyX2JsYWNrYmVycnlfMTAsIHVhKSB8fCBtYXRjaChvdGhlcl9vcGVyYSwgdWEpIHx8IG1hdGNoKG90aGVyX2ZpcmVmb3gsIHVhKVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNldmVuX2luY2ggPSBtYXRjaChzZXZlbl9pbmNoLCB1YSk7XG4gICAgICAgIHRoaXMuYW55ID0gdGhpcy5hcHBsZS5kZXZpY2UgfHwgdGhpcy5hbmRyb2lkLmRldmljZSB8fCB0aGlzLndpbmRvd3MuZGV2aWNlIHx8IHRoaXMub3RoZXIuZGV2aWNlIHx8IHRoaXMuc2V2ZW5faW5jaDtcbiAgICAgICAgLy8gZXhjbHVkZXMgJ290aGVyJyBkZXZpY2VzIGFuZCBpcG9kcywgdGFyZ2V0aW5nIHRvdWNoc2NyZWVuIHBob25lc1xuICAgICAgICB0aGlzLnBob25lID0gdGhpcy5hcHBsZS5waG9uZSB8fCB0aGlzLmFuZHJvaWQucGhvbmUgfHwgdGhpcy53aW5kb3dzLnBob25lO1xuICAgICAgICAvLyBleGNsdWRlcyA3IGluY2ggZGV2aWNlcywgY2xhc3NpZnlpbmcgYXMgcGhvbmUgb3IgdGFibGV0IGlzIGxlZnQgdG8gdGhlIHVzZXJcbiAgICAgICAgdGhpcy50YWJsZXQgPSB0aGlzLmFwcGxlLnRhYmxldCB8fCB0aGlzLmFuZHJvaWQudGFibGV0IHx8IHRoaXMud2luZG93cy50YWJsZXQ7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgaW5zdGFudGlhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIElNID0gbmV3IElzTW9iaWxlQ2xhc3MoKTtcbiAgICAgICAgSU0uQ2xhc3MgPSBJc01vYmlsZUNsYXNzO1xuICAgICAgICByZXR1cm4gSU07XG4gICAgfTtcblxuICAgIGlmICh0eXBlb2YgbW9kdWxlICE9ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzICYmIHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIC8vbm9kZVxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IElzTW9iaWxlQ2xhc3M7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIC8vYnJvd3NlcmlmeVxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGluc3RhbnRpYXRlKCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgLy9BTURcbiAgICAgICAgZGVmaW5lKGdsb2JhbC5pc01vYmlsZSA9IGluc3RhbnRpYXRlKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGdsb2JhbC5pc01vYmlsZSA9IGluc3RhbnRpYXRlKCk7XG4gICAgfVxuXG59KSh0aGlzKTtcbiJdfQ==
