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
			path: '/public/embed-table.js',
			desktop: {
				'feature-table': 129
			},
			mobile: {
				'feature-table': 129
			}
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
			path: '/public/embed-table.js',
			desktop: {
				'feature-table': 8
			},
			mobile: {
				'feature-table': 5
			}
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
			path: '/public/embed-table.js',
			desktop: {
				'feature-table': 180
			},
			mobile: {
				'feature-table': 181
			}
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
var ColumnsEvent 		= require('../models/ColumnsEvent.js');
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

	this.$desktop = $( TEMPLATE({
		source: Config.embed.host + Config.embed.path,
		table: Config.embed.desktop['feature-table']
	}));

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

	// $('.columns-header-nav-home').click(function() {
	// 	ColumnsAnalytics.send({
	// 		category: 'button',
	// 		action: 'click',
	// 		label: 'home'
	// 	});
	// });

	$(document).on('ColumnsTableDidExpand', function( event, data ) {
		if ( data.table.id === Config.embed.desktop['feature-table'] ) {
			ColumnsAnalytics.send({
				category: 'sample table',
				action: 'expand'
			});
		}
	});
};

module.exports = DesktopView;
},{"../config.js":2,"../models/ColumnsAnalytics.js":19,"../models/ColumnsEvent.js":20,"../models/Table.js":24,"./EmbedDetailsView.js":4,"./ItemsView.js":6,"./StyleView.js":13,"./TemplateView.js":16,"./UploadView.js":18}],4:[function(require,module,exports){
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


},{"../config.js":2,"../models/ColumnsAnalytics.js":19,"../models/ColumnsEvent.js":20}],5:[function(require,module,exports){
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
},{"../models/ColumnsEvent.js":20}],6:[function(require,module,exports){
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
},{"../models/ColumnsEvent.js":20,"./ItemView.js":5}],7:[function(require,module,exports){
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
var ColumnsEvent 		= require('../models/ColumnsEvent.js');
var ColumnsAnalytics 	= require('../models/ColumnsAnalytics.js');
var Config 				= require('../config.js');
var TEMPLATE 			= Columns.Templates['templates/register.hbs'],
	ERROR_CLASS 		= 'error';

function RegisterView() {

}

RegisterView.prototype.render = function() {

	this.$register = $( TEMPLATE({
		source: Config.embed.host + Config.embed.path,
		table: Config.embed.mobile['feature-table']
	}) );

	this._setupInteractionEvents();
	this._setupAnalyticsEvents();
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
		this._performRegistration( this.$register.find('.columns-register-email-input input').val() );
	} else {
		this.setEmailError( true );
	}
};

RegisterView.prototype._performRegistration = function( email ) {

	$.post( Config.api.host + '/columns/register', { user: email }, function( data ) {
		console.log( data );
		if ( data.status === 'success' ) {
			this._onRegistrationSuccess();
		} else {
			this._onRegistrationFail();
		}
	}.bind( this )).fail(function() {
		this._onRegistrationFail();
	}.bind( this ));
};

RegisterView.prototype._onRegistrationSuccess = function() {

	this.hide();

	ColumnsEvent.send( 'Columns.RegisterView.DidRegisterWithSuccess', {
		registerView: this
	});
};

RegisterView.prototype._onRegistrationFail = function() {
	
};

RegisterView.prototype._setupAnalyticsEvents = function() {

	$(document).on('ColumnsTableDidExpand', function( event, data ) {
		if ( data.table.id === Config.embed.mobile['feature-table'] ) {
			ColumnsAnalytics.send({
				category: 'sample table',
				action: 'expand'
			});
		}
	});

	this.$register.find('.columns-register-email-input input').on( 'blur', function( event ) {
		ColumnsAnalytics.send({
			category: 'register form',
			action: 'filled',
			label: 'email'
		});
	});

	this.$register.find('.columns-register-button').on( 'click', function( event ) {
		ColumnsAnalytics.send({
			category: 'register form',
			action: 'submit',
		});
	});
};

module.exports = RegisterView;
},{"../config.js":2,"../models/ColumnsAnalytics.js":19,"../models/ColumnsEvent.js":20}],9:[function(require,module,exports){
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
},{"../models/ColumnsEvent.js":20,"./StyleInputView.js":10,"./StyleMultipleSegmentedButtonView.js":11,"./StyleSegmentedButtonView.js":12}],10:[function(require,module,exports){
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
},{"../models/ColumnsEvent.js":20}],11:[function(require,module,exports){
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
},{"../models/ColumnsEvent.js":20}],12:[function(require,module,exports){
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
},{"../models/ColumnsEvent.js":20}],13:[function(require,module,exports){
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

},{"../../compiled-javascripts/styling/compiled-data.js":1,"../models/ColumnsEvent.js":20,"./StyleComponentView.js":9,"./TemplateGroupView.js":14,"./TemplateValueView.js":15}],14:[function(require,module,exports){
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
},{"../models/ColumnsEvent.js":20}],15:[function(require,module,exports){
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
},{"../models/ColumnsEvent.js":20}],16:[function(require,module,exports){
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
	$('.layout-table-preview').append( $template );
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
	ColumnsEvent.on('ColumnsTableWillCollapse', this._onTableWillCollapse.bind( this ) );
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

TemplateView.prototype._onTableWillCollapse = function( event, data ) {

	// Move the template down below the header
	this.$template.velocity({
		translateY: 0
	}, {
		duration: 400
	});
};

TemplateView.prototype._onTableDidCollapse = function( event, data ) {

	this.$preview.removeClass( EXPANDED_CLASS );
};
	
TemplateView.prototype._onTableDidScroll = function( event, data ) {

	// Move the template up until it hits the header
	var minScroll = -24,
		maxScroll = 0,
		scroll = -$('#layout .columns-table-container').scrollTop();

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
},{"../config.js":2,"../models/ColumnsAnalytics.js":19,"../models/ColumnsEvent.js":20,"./TemplateGroupView.js":14,"./TemplateValueView.js":15}],17:[function(require,module,exports){
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
},{"../models/ColumnsEvent.js":20}],18:[function(require,module,exports){
var ColumnsEvent 		= require('../models/ColumnsEvent.js');
var ColumnsAnalytics 	= require('../models/ColumnsAnalytics.js');

var MAX_ROWS = 20,
	UPLOAD_BUTTON_SELECTOR = '.columns-upload-button',
	UPLOAD_MESSAGE_SELECTOR = '.columns-upload-message';

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

UploadView.prototype._setLoading = function( loading, action, message ) {
	var $button = this.$upload.find( UPLOAD_BUTTON_SELECTOR ),
		$message = this.$upload.find( UPLOAD_MESSAGE_SELECTOR );

	// Set the message
	if ( message && typeof message === 'string' ) {
		$message.text( message );
	} else {
		$message.text("");
	}

	// Set the action
	if ( action && typeof action === 'string' ) {
		$button.text( action );
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
		this._setLoading( true, '', 'Uploading ' + file.name + '...' );
	} else {
		this._setLoading( true, '', 'Uploading file...' );
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

	this._setLoading( false, "Shoot, something went wrong.", "Try a different .csv");
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

},{"../models/ColumnsAnalytics.js":19,"../models/ColumnsEvent.js":20}],19:[function(require,module,exports){
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
},{"../config.js":2}],20:[function(require,module,exports){
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
},{}],21:[function(require,module,exports){
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
},{"./ColumnsEvent.js":20,"./Style.js":23}],22:[function(require,module,exports){
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
},{"../styling/defaults.js":25,"./ColumnsEvent.js":20}],23:[function(require,module,exports){
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
},{"./ColumnsEvent.js":20}],24:[function(require,module,exports){
var ColumnsEvent 		= require('./ColumnsEvent.js');
var Layout 				= require('./Layout.js');
var Item 				= require('./Item.js');
var config 				= require('../config.js');
var DEFAULTS			= require('../styling/defaults.js');

var MAX_COLUMN_LENGTH 	= 64;

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

	var counts = {};
	return columnNames.map(function( columnName, i ) {

		if ( columnName instanceof Item ) {
			return columnName;
		} else {
			// Clean the column name
			columnName = this.cleanColumn( columnName );

			// Update the counts object with this column
			counts[ columnName ] = ( counts[ columnName ] || 0 ) + 1;

			// Update the column with a count if it's a duplicate
			if ( counts[ columnName ] > 1 ) {
				columnName = this.appendColumnWithCount( columnName, counts[ columnName ] );
			}

			return new Item({ title: columnName, style: DEFAULTS.styles[ i ] });
		}

	}.bind( this ));
};

Table.prototype.cleanColumn = function( column ) {
	var cleanColumn = column;

	// Replace any trailing whitespace and periods
	cleanColumn = cleanColumn.replace(/^[.\s]+|[.\s]+$/g, "");

	// Make sure it's not too long for the DB
	cleanColumn = cleanColumn.substring( 0, MAX_COLUMN_LENGTH );

	return cleanColumn;
}

Table.prototype.appendColumnWithCount = function( column, count ) {
	var separator = ' ',
		difference = MAX_COLUMN_LENGTH - ( column.length + separator.length + count.toString().length );

	// If the column + count + separator length goes over the limit,
	// truncate the column as necessary
	if ( difference < 0 ) {
		column = column.substring( 0, column.length + difference );
	}

	return column += separator + count;
};

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
},{"../config.js":2,"../styling/defaults.js":25,"./ColumnsEvent.js":20,"./Item.js":21,"./Layout.js":22}],25:[function(require,module,exports){
// We need to treat layout properties slightly differently than regular css properties
// to account for browser-specific prefixes
module.exports = {
	styles: [
		[{
			property: 'color',
			value: '#3a3a3a'
		},{
			property: 'font-size',
			value: '16px'
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
},{}],26:[function(require,module,exports){
var Desktop 			= require('../../javascripts/controllers/DesktopView.js');
var Table 				= require('../../javascripts/models/Table.js');
var ItemView 			= require('../../javascripts/controllers/ItemsView.js');
var TemplateView 		= require('../../javascripts/controllers/TemplateView.js');
var StyleView 			= require('../../javascripts/controllers/StyleView.js');
var EmbedDetailsView 	= require('../../javascripts/controllers/EmbedDetailsView.js');
var UploadView 			= require('../../javascripts/controllers/UploadView.js');
var ColumnsEvent 		= require('../../javascripts/models/ColumnsEvent.js');
var ColumnsAnalytics 	= require('../../javascripts/models/ColumnsAnalytics.js');
var Config 				= require('../../javascripts/config.js');

jasmine.getFixtures().fixturesPath = 'specs/fixtures';

describe('Desktop View Spec', function() {
	var desktop = new Desktop();

	describe('Initialization', function() {

		it('should set up the correct objects', function() {
			expect( desktop.table instanceof Table ).toBeTruthy();
			expect( desktop.items instanceof ItemsView ).toBeTruthy();
			expect( desktop.template instanceof TemplateView ).toBeTruthy();
			expect( desktop.style instanceof StyleView ).toBeTruthy();
			expect( desktop.embed instanceof EmbedDetailsView ).toBeTruthy();
			expect( desktop.upload instanceof UploadView ).toBeTruthy();
		});

	});

	describe('Rendering', function() {
		var $desktop;

		beforeEach(function() {
			loadFixtures('app.html');
			spyOn( ColumnsEvent, 'send' );
			$desktop = desktop.render();
		});

		it('should render the header', function() {
			expect( $('.columns-header') ).toBeInDOM();
		});

		it('should render the landing screen', function() {
			expect( $('#upload') ).toBeInDOM();
			expect( $('#upload') ).toHaveClass('active');
		});

		it('should render the app skeleton', function() {
			expect( $('#editor') ).toBeInDOM();
			expect( $('#columns') ).toBeInDOM();
			expect( $('#layout') ).toBeInDOM();
			expect( $('#styling') ).toBeInDOM();
		});

		it('should emit a rendering complete event', function() {
			expect( ColumnsEvent.send.calls.argsFor(0)[0]).toBe('Columns.DesktopView.DidRender');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].desktopView ).toEqual( desktop );
		});
	});

	describe('Sending Analytics Events', function() {

		beforeEach(function() {
			desktop.render();
			spyOn( ColumnsAnalytics, 'send' );
		});

		it('should ignore events sent by a table that is not a sample table', function() {
			$(document).trigger('ColumnsTableDidExpand', {
				table: new Table({ id: Config.embed.desktop['feature-table'] + 1 })
			});

			expect( ColumnsAnalytics.send ).not.toHaveBeenCalled();

		});

		it('should send an event when the preview table is expanded', function() {
			$(document).trigger('ColumnsTableDidExpand', {
				table: new Table({ id: Config.embed.desktop['feature-table'] })
			});
			expect( ColumnsAnalytics.send ).toHaveBeenCalledWith({
				category: 'sample table',
				action: 'expand'
			});
		});
	});
});
},{"../../javascripts/config.js":2,"../../javascripts/controllers/DesktopView.js":3,"../../javascripts/controllers/EmbedDetailsView.js":4,"../../javascripts/controllers/ItemsView.js":6,"../../javascripts/controllers/StyleView.js":13,"../../javascripts/controllers/TemplateView.js":16,"../../javascripts/controllers/UploadView.js":18,"../../javascripts/models/ColumnsAnalytics.js":19,"../../javascripts/models/ColumnsEvent.js":20,"../../javascripts/models/Table.js":24}],27:[function(require,module,exports){
var ColumnsEvent 		= require('../../javascripts/models/ColumnsEvent.js');
var ColumnsAnalytics	= require('../../javascripts/models/ColumnsAnalytics.js');
var Table 				= require('../../javascripts/models/Table.js');
var EmbedDetailsView 	= require('../../javascripts/controllers/EmbedDetailsView.js');
var config 				= require('../../javascripts/config.js');

jasmine.getFixtures().fixturesPath = 'specs/fixtures';

describe('Embed Details View', function() {

	beforeEach(function() {
		spyOn( ColumnsAnalytics, 'send' );
		loadFixtures('app.html');
	});

	afterEach(function() {
		ColumnsEvent.offAll();
	});

	describe('Initialization', function() {

		it('should initialize with a table object', function() {
			var table = new Table();
			var embed = new EmbedDetailsView( table );
			expect( embed.table ).toEqual( table );
		});

	});

	describe('Rendering', function() {

		beforeEach(function() {
			this.embed = new EmbedDetailsView( new Table({ id: 4 }) );
			this.$embed = this.embed.render();
		});

		it('should attached to the correct part of the DOM', function() {
			expect( this.$embed.parent() ).toEqual('#app');
		});

		it('should contain an input field for title', function() {
			expect( this.$embed ).toContainElement( ".columns-panel-input [data-property='title']" );
		});

		it('should contain an input field for source', function() {
			expect( this.$embed ).toContainElement( ".columns-panel-input [data-property='source']" );
		});

		it('should contain an input field for source url', function() {
			expect( this.$embed ).toContainElement( ".columns-panel-input [data-property='source_url']" );
		});

		it('should contain a field for the embed url', function() {
			// expect( this.$embed.find('textarea script') ).toHaveAttr( 'src', config.embed.host + config.embed.path )
			// expect( this.$embed.find('textarea script') ).toHaveAttr( 'data-table-id', 4 );
			expect( this.$embed.find('textarea') ).toContainText('<script type="text/javascript" src="' + config.embed.host + config.embed.path + '" data-table-id="' + 4 + '" async></script>');
		});

		it('should save a reference to the template', function() {
			expect( this.embed.$embed ).toEqual( this.$embed );
		});

		it('should be hidden', function() {
			expect( this.$embed ).not.toHaveClass('active');
		})
	});

	describe('Hiding and Showing', function() {

		beforeEach(function() {
			this.embed = new EmbedDetailsView( new Table({ id: 4 }));
			this.embed.render();
		});

		it('should hide', function() {
			this.embed.hide();
			expect( this.embed.$embed ).not.toHaveClass('active');
		});

		it('should show', function() {
			this.embed.show();
			expect( this.embed.$embed ).toHaveClass('active');
		});

	});

	describe('Listening to User Events', function() {

		beforeEach(function() {
			appendLoadFixtures('header.html');
			this.embed = new EmbedDetailsView( new Table({ id: 4 }));
			this.embed.render();
		});

		it('should show when the embed button is clicked', function() {			
			spyOn( this.embed, 'show' );
			$('.columns-header-nav-embed').trigger('click');
			expect( this.embed.show ).toHaveBeenCalled();
		});

		it('should hide when the close button is clicked', function() {
			spyOn( this.embed, 'hide' );
			$('.columns-panel-header-close-button').trigger('click');
			expect( this.embed.hide ).toHaveBeenCalled();
		});

		it('should hide when the blocker is cliked', function() {
			spyOn( this.embed, 'hide' );
			$('.columns-panel-blocker').trigger('click');
			expect( this.embed.hide ).toHaveBeenCalled();
		});

		it('should respond to keyup events on the title input', function() {
			var $title = $('input[data-property="title"]');
			$title.val('hola');
			spyOn( this.embed, '_emitChange' );

			$title.trigger('keyup');
			expect( this.embed._emitChange ).toHaveBeenCalledWith( 'title', 'hola' );
		});

		it('should respond to keyup events on the source input', function() {
			var $source = $('input[data-property="source"]');
			$source.val('hola');
			spyOn( this.embed, '_emitChange' );

			$source.trigger('keyup');
			expect( this.embed._emitChange ).toHaveBeenCalledWith( 'source', 'hola' );
		});

		it('should respond to keyup events on the source_url input', function() {
			var $sourceUrl = $('input[data-property="source_url"]');
			$sourceUrl.val('hola');
			spyOn( this.embed, '_emitChange' );

			$sourceUrl.trigger('keyup');
			expect( this.embed._emitChange ).toHaveBeenCalledWith( 'source_url', 'hola' );
		});

		xit('should copy the embed url when the copy link is clicked', function() {

		});

	});

	describe('Sending Analytics Events', function() {
		window.ga;
		window.mixpanel;

		beforeEach(function() {
			appendLoadFixtures('header.html');
			this.embed = new EmbedDetailsView( new Table({ id: 4 }));
			this.embed.render();
		});

		it('should send an analytics event on title blur', function() {
			// spyOn( ColumnsAnalytics, 'send' );
			var $title = $('input[data-property="title"]');
			$title.val('hola');
			$title.trigger('blur');

			expect( ColumnsAnalytics.send ).toHaveBeenCalledWith({
				category: 'field',
				action: 'edit',
				label: 'title',
				table_id: 4
			});
		});

		it('should send an analytics event on source blur', function() {
			// spyOn( ColumnsAnalytics, 'send' );
			var $source = $('input[data-property="source"]');
			$source.val('hola');
			$source.trigger('blur');

			expect( ColumnsAnalytics.send ).toHaveBeenCalledWith({
				category: 'field',
				action: 'edit',
				label: 'source',
				table_id: 4
			});
		});

		it('should send an analytics event on title blur', function() {
			// spyOn( ColumnsAnalytics, 'send' );
			var $sourceUrl = $('input[data-property="source_url"]');
			$sourceUrl.val('hola');
			$sourceUrl.trigger('blur');

			expect( ColumnsAnalytics.send ).toHaveBeenCalledWith({
				category: 'field',
				action: 'edit',
				label: 'source_url',
				table_id: 4
			});
		});

		it('should send an analytics event on copy button click', function() {
			// spyOn( ColumnsAnalytics, 'send' );
			var $copy = this.embed.$embed.find('.columns-copy-embed-url');
			$copy.trigger('click');

			expect( ColumnsAnalytics.send.calls.argsFor(0)[0] ).toEqual({
				category: 'button',
				action: 'click',
				label: 'copy embed code',
				table_id: 4
			});
		});

		it('should track clicks on the embed button', function() {
			// spyOn( ColumnsAnalytics, 'send' );
			$('.columns-header-nav-embed').trigger('click');

			expect( ColumnsAnalytics.send.calls.argsFor(0)[0] ).toEqual({
				category: 'button',
				action: 'click',
				label: 'embed'
			});
		});

	});

	describe('Listening to Table Events', function() {

		beforeEach(function() {
			this.embed = new EmbedDetailsView();
			spyOn( this.embed, 'render' );
		});

		it('should render upon table upload', function() {
			var table = new Table({ id: 6 });
			ColumnsEvent.send('Columns.Table.DidUploadWithSuccess', {
				table: 	table
			});

			expect( this.embed.table ).toEqual( table );
			expect( this.embed.render ).toHaveBeenCalled();
		});

	});

	describe('Emitting Update Events', function() {

		beforeEach(function() {
			this.embed = new EmbedDetailsView( new Table({ id: 4 }));
			this.embed.render();
		});

		it('should emit an event on change', function() {
			spyOn( ColumnsEvent, 'send' );
			this.embed._emitChange( 'property', 'value' );

			expect( ColumnsEvent.send.calls.argsFor(0)[0]).toBe('Columns.EmbedDetailsView.DidUpdatePropertyWithValue');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].embed ).toEqual( this.embed );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].property ).toBe( 'property' );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].value ).toBe( 'value' );
		});

	});

});
},{"../../javascripts/config.js":2,"../../javascripts/controllers/EmbedDetailsView.js":4,"../../javascripts/models/ColumnsAnalytics.js":19,"../../javascripts/models/ColumnsEvent.js":20,"../../javascripts/models/Table.js":24}],28:[function(require,module,exports){
var ColumnsEvent 		= require('../../javascripts/models/ColumnsEvent.js');
var TemplateValueView 	= require('../../javascripts/controllers/TemplateValueView.js');

describe('Item View', function() {

	afterEach(function() {
		ColumnsEvent.offAll();
	});

	describe('Initialization', function() {

		it('should initialize with a given item', function() {
			var item = new Item({title: "My Item"});
			var itemView = new ItemView(item);
			expect(itemView.item).toBe(item);
		});

		it('should initialize with an empty item if one was not passed in', function() {
			var itemView = new ItemView();
			expect(itemView.item).toEqual(new Item());
		});

		it('should initiatize with the correct template', function() {
			var itemView = new ItemView();
			expect(itemView.template).toEqual(Columns.Templates['templates/layout/column.hbs']);
		});

		it('should initiatize as unselected', function() {
			var itemView = new ItemView();
			expect( itemView.selected ).toBeFalsy();
		});
	});

	describe('Rendering', function() {

		beforeEach(function() {
			var item = new Item({
				title: 'my_item',
				style: 'font-size:14px;color:#3a3a3a;margin-left:12px;',
				active: false
			});
			this.itemView = new ItemView(item);
		});

		it('should render with the correct html elements', function() {
			expect( this.itemView.render() ).toHaveClass('layout-column');
		});

		it('should have the correct text', function() {
			expect( this.itemView.render() ).toContainText('My Item');
		});

		it('should have the correct css', function() {
			expect( this.itemView.render().data('style') ).toEqual([{
				property: 'font-size',
				value: '14px'
			}, {
				property: 'color',
				value: '#3a3a3a'
			}, {
				property: 'margin-left',
				value: '12px'
			}]);
		});

		it('should have the correct active status', function() {
			expect( this.itemView.render() ).toHaveClass('inactive');
		});

		it('should have the correct selected status', function() {
			this.itemView.selected = true;
			expect( this.itemView.render() ).toHaveClass('selected');
		});

		it('should replace itself if already rendered', function() {
			var $old = this.itemView.render();
			this.itemView.item.title = "New Title";
			var $new = this.itemView.render();
			expect( this.itemView.$item ).toEqual( $new );
			expect( this.itemView.$item ).not.toEqual( $old );
		});
	});

	describe('Dragging', function() {

		beforeEach(function() {
			var item = new Item({
				title: 'My Item',
				style: 'font-size:14px;color:#3a3a3a;margin-left:12px;'
			});

			this.fakeUI		= {};
			this.item 		= new ItemView( item );
			this.$item		= this.item.render();

			spyOn( ColumnsEvent, 'send' );

		});

		it('should be draggable', function() {
			expect( this.$item.draggable('instance') ).toBeDefined();
		});

		describe('Drag Start', function() {

			it('should emit an event on drag start', function() {
				this.$item.trigger('dragstart', this.fakeUI);
				expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.ItemView.ItemDidBeginDrag');
				expect( ColumnsEvent.send.calls.argsFor(0)[1].item ).toEqual( this.item );
				expect( ColumnsEvent.send.calls.argsFor(0)[1].ui ).toEqual( this.fakeUI );
			});

			it('should get dragging class on drag start', function() {
				this.$item.trigger('dragstart', this.fakeUI);
				expect( this.$item ).toHaveClass('dragging');
			});
		});

		describe('Drag Stop', function() {

			it('should emit an event on drag stop', function() {
				this.$item.trigger('dragstop', this.fakeUI);
				expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.ItemView.ItemDidEndDrag');
				expect( ColumnsEvent.send.calls.argsFor(0)[1].item ).toEqual( this.item );
				expect( ColumnsEvent.send.calls.argsFor(0)[1].ui ).toEqual( this.fakeUI );
			});

			it('should lose dragging class on drag stop', function() {
				this.$item.trigger('dragstop', this.fakeUI);
				expect( this.$item ).not.toHaveClass('dragging');
			});
		});

		it('should emit an event on drag', function() {
			this.$item.trigger('drag', this.fakeUI);
			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.ItemView.ItemDidDrag');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].item ).toEqual( this.item );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].ui ).toEqual( this.fakeUI );
		});
	});

	describe('Clicking', function() {

		beforeEach(function() {
			this.itemView	= new ItemView( new Item({ title: "My Item" }) );
			this.$item		= this.itemView.render();
			spyOn( ColumnsEvent, 'send' );
		});

		it('should emit an event on click', function() {
			this.$item.trigger('click');
			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.ItemView.ItemDidSelect');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].itemView ).toEqual( this.itemView );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].item ).toEqual( this.itemView.item );
		});

		it('should get selected on click', function() {
			this.$item.trigger('click');
			expect( this.itemView.selected ).toBeTruthy();
			expect( this.$item ).toHaveClass('selected');
		});

	});

	describe('Listening to Events', function() {

		describe('Value Selection', function() {
			var item;

			beforeEach(function() {
				item = new Item({ title: "My Item" });
				this.itemView = new ItemView( item );
				this.itemView.render();
			});

			it('should set itself as selected if the value represents this item', function() {
				spyOn( item, 'is' ).and.returnValue( true );

				ColumnsEvent.send('Columns.TemplateValueView.ValueDidSelectWithItem', {
					valueView: 	new TemplateValueView(),
					item: 		item
				});

				expect( this.itemView.$item ).toHaveClass('selected');
			});

			it('should set itself as unselected if the value does not represent this item', function () {
				spyOn( item, 'is' ).and.returnValue( false );

				this.itemView.$item.addClass('selected');
				ColumnsEvent.send('Columns.TemplateValueView.ValueDidSelectWithItem', {
					valueView: 	new TemplateValueView(),
					item: 		item
				});

				expect( this.itemView.$item ).not.toHaveClass('selected');
			});
		});

		describe('Item View Selection', function() {
			var item;

			beforeEach(function() {
				item = new Item({ title: "My Item" });
				this.itemView = new ItemView( item );
				this.itemView.render();
				this.itemView.selected = true;
				this.itemView.$item.addClass('selected');
			});

			it('should do nothing if the view represents this item', function() {
				ColumnsEvent.send( 'Columns.ItemView.ItemDidSelect', {
					itemView: 	this.itemView,
					item: 		item
				});

				expect( this.itemView.selected ).toBeTruthy();
				expect( this.itemView.$item ).toHaveClass('selected');
			});

			it('should set itself as unselected if the view does not represent this item', function () {
				var otherItem = new Item({ title: 'Other Item' });
				ColumnsEvent.send( 'Columns.ItemView.ItemDidSelect', {
					itemView: 	new ItemView( otherItem ),
					item: 		otherItem
				});

				expect( this.itemView.selected ).toBeFalsy();
				expect( this.itemView.$item ).not.toHaveClass('selected');
			});
		});

		describe('Setting Selection State', function() {

			beforeEach(function() {
				item = new Item({ title: "My Item" });
				this.itemView = new ItemView( item );
				this.$itemView = this.itemView.render();
			});

			it('should set selected as true', function() {
				this.itemView._setSelected( true );
				expect( this.itemView.selected ).toBeTruthy();
				expect( this.itemView.$item ).toHaveClass('selected');
			});

			it('should set selected as false', function() {
				this.itemView.selected = true;
				this.itemView.$item.addClass('selected');

				this.itemView._setSelected( false );

				expect( this.itemView.selected ).toBeFalsy();
				expect( this.itemView.$item ).not.toHaveClass('selected');

			});
		});
	});
});
},{"../../javascripts/controllers/TemplateValueView.js":15,"../../javascripts/models/ColumnsEvent.js":20}],29:[function(require,module,exports){
var ColumnsEvent 		= require('../../javascripts/models/ColumnsEvent.js');
var Table 				= require('../../javascripts/models/Table.js');
var ItemsView 			= require('../../javascripts/controllers/ItemsView.js');

jasmine.getFixtures().fixturesPath = 'specs/fixtures';

describe('Items View', function() {

	afterEach(function() {
		ColumnsEvent.offAll();
	});

	describe('Initialization', function() {

		it('should accept an array of Items', function() {
			var items = [ new Item({ title: 'First Name' }), new Item({ title: 'Last Name' }), new Item({ title: 'Hometown' }), new Item({ title: 'Age' }) ];
			var itemsView = new ItemsView( items );
			expect( itemsView.items ).toEqual( items );
		});

		it ('shoud accept no items', function() {
			var itemsView = new ItemsView();
			expect( itemsView.items ).toEqual( [] );
		});

		it('should initiatize with the correct template', function() {
			var itemsView = new ItemsView();
			expect( itemsView.template ).toEqual( Columns.Templates['templates/layout/columns.hbs'] );
		});

		it('should initiatize with an empty item views array', function() {
			var itemsView = new ItemsView();
			expect( itemsView.views ).toEqual( [] );
		});
	});

	describe('Rendering', function() {

		beforeEach(function() {
			this.itemsView = new ItemsView([ new Item({ title: 'First Name' }), new Item({ title: 'Last Name' }), new Item({ title: 'Hometown' }), new Item({ title: 'Age' }) ]);
		});

		it('should contain a column for each item', function() {
			loadFixtures('columns.html');
			this.itemsView.render();
			expect( $('.layout-column').length ).toBe(4);
		});

		it('should append new items', function() {
			loadFixtures('columns.html');
			this.itemsView.render();

			var newItems = [ new Item({ title: 'Batting Average' }), new Item({ title: 'Baseball Player' }), new Item({ title: 'Season' }), new Item({ title: 'Team' }), new Item({ title: 'Coach' }) ];
			this.itemsView._updateWithItems( newItems );
			this.itemsView.render();

			var $columns = $('.layout-column');
			expect( $columns.length ).toBe( 9 );
			expect( $columns.eq( 4 ) ).toContainText('Batting Average');
			// expect( $columns ).not.toContainText('First Name');
		});

		it('should create references to item views', function() {
			// this.itemsView.render();
			expect( this.itemsView.views.length ).toBe( 4 );
			expect( this.itemsView.views[ 2 ].item.title ).toBe('Hometown');
		});

		it('should append new item views', function() {
			var newItems = [ new Item({ title: 'Batting Average' }), new Item({ title: 'Baseball Player' }), new Item({ title: 'Season' }), new Item({ title: 'Team' }), new Item({ title: 'Coach' }) ];
			this.itemsView._updateWithItems( newItems );
			this.itemsView.render();

			expect( this.itemsView.views.length ).toBe( 9 );
			expect( this.itemsView.views[ 4 ].item.title ).toBe('Batting Average');
		});
	});

	describe('Updating an Existing Item', function() {

		beforeEach(function() {
			this.item = new Item({ title: 'Last Name' });
			this.itemsView = new ItemsView([ new Item({ title: 'First Name' }), this.item, new Item({ title: 'Hometown' }), new Item({ title: 'Age' }) ]);
			this.$items = this.itemsView.render();
		});

		it('should re-render the given item', function() {
			// expect( this.$items.find('.layout-column').eq( 1 ) ).not.toHaveClass('inactive');

			this.item.active = false;
			this.itemsView.updateItem( this.item );

			expect( this.$items.find('.layout-column').eq( 1 ) ).toHaveClass('inactive');
		});

		it('should emit a change event', function() {
			spyOn( this.itemsView, '_emitChange' );
			this.itemsView.updateItem( this.item );
			expect( this.itemsView._emitChange ).toHaveBeenCalled();
		});
	});

	describe('Updating With New Items', function() {

		beforeEach(function() {
			this.itemsView = new ItemsView([ new Item({ title: 'First Name' }), new Item({ title: 'Last Name' }), new Item({ title: 'Hometown' }), new Item({ title: 'Age' }) ]);
			this.newItems = [
				new Item({ title: 'First Name' }),
				new Item({ title: 'School' }),
				new Item({ title: 'Middle Name' }),
				'hello'
			];
		});

		it('should append new items and ignore duplicates and non-items', function() {
			this.itemsView._updateWithItems( this.newItems );
			expect( this.itemsView.items.length ).toBe( 6 );
			expect( this.itemsView.items ).toEqual( [
				new Item({ title: 'First Name' }),
				new Item({ title: 'Last Name' }),
				new Item({ title: 'Hometown' }),
				new Item({ title: 'Age' }),
				new Item({ title: 'School' }),
				new Item({ title: 'Middle Name' }),
			] );

		});

		xit('should add new item views to the array', function() {
			this.itemsView.render();
			this.itemsView._updateWithItems( this.newItems );
			expect( this.itemsView.views.length ).toBe( 6 );
		});

		it('should do nothing if not passed any items', function() {
			this.itemsView._updateWithItems();
			expect( this.itemsView.items.length ).toBe( 4 );
			expect( this.itemsView.items ).toEqual( [
				new Item({ title: 'First Name' }),
				new Item({ title: 'Last Name' }),
				new Item({ title: 'Hometown' }),
				new Item({ title: 'Age' })
			] );
		});

		it('should throw an error if not passed an array or single item', function() {
			expect( function() {
				this.itemsView._updateWithItems( 'hi' );
			}.bind( this )).toThrow("exception Items must be array of items or single item");
		});

		it('should emit a change event', function() {
			spyOn( this.itemsView, '_emitChange' );

			this.itemsView._updateWithItems( this.newItems );

			expect( this.itemsView._emitChange ).toHaveBeenCalled();
		});
	});

	describe('Updating with a Single Item', function() {

		beforeEach(function() {
			this.itemsView = new ItemsView([ new Item({ title: 'First Name' }), new Item({ title: 'Last Name' }), new Item({ title: 'Hometown' }), new Item({ title: 'Age' }) ]);
		});

		it('should append a new item', function() {
			this.itemsView._updateWithItem( new Item({ title: 'School' }) );
			expect( this.itemsView.items.length ).toBe( 5 );
			expect( this.itemsView.items ).toEqual( [
				new Item({ title: 'First Name' }),
				new Item({ title: 'Last Name' }),
				new Item({ title: 'Hometown' }),
				new Item({ title: 'Age' }),
				new Item({ title: 'School' }),
			] );
		});

		it('should ignore duplicate items', function() {
			this.itemsView._updateWithItem( new Item({ title: 'Hometown' }) );
			expect( this.itemsView.items.length ).toBe( 4 );
			expect( this.itemsView.items ).toEqual( [
				new Item({ title: 'First Name' }),
				new Item({ title: 'Last Name' }),
				new Item({ title: 'Hometown' }),
				new Item({ title: 'Age' }),
			] );
		});

		it('should ignore non-items', function() {
			this.itemsView._updateWithItem( 'hi' );
			expect( this.itemsView.items.length ).toBe( 4 );
			expect( this.itemsView.items ).toEqual( [
				new Item({ title: 'First Name' }),
				new Item({ title: 'Last Name' }),
				new Item({ title: 'Hometown' }),
				new Item({ title: 'Age' }),
			] );
		});
	});

	describe('Get an itemview for a given item', function() {

		beforeEach(function() {
			this.itemsView = new ItemsView([ new Item({ title: 'First Name' }), new Item({ title: 'Last Name' }), new Item({ title: 'Hometown' }), new Item({ title: 'Age' }) ]);
		});

		it('should return the first itemview that matches the given item', function() {
			expect( this.itemsView.itemViewForItem( new Item({ title: 'Last Name' }) ) ).toEqual( this.itemsView.views[ 1 ] );
		});

		it('should return undefined if there is no match', function() {
			expect( this.itemsView.itemViewForItem( new Item({ title: 'Birthday' }) ) ).toBeUndefined();
		});

		it('should return undefined if not passed an item', function() {
			expect( this.itemsView.itemViewForItem( "hi" ) ).toBeUndefined();
		});
	});	

	describe('Responding to Events', function() {

		beforeEach(function() {
			this.itemsView = new ItemsView();
			this.items = [
				new Item({ title: 'First Name' }),
				new Item({ title: 'Last Name' }),
				new Item({ title: 'Hometown' }),
				new Item({ title: 'Age' }),
			];
		});

		describe('Table Change Events', function() {

			it('should update itself with any new items', function() {
				spyOn( this.itemsView, '_updateWithItems' );
				spyOn( this.itemsView, 'render' );

				// var columnsEvent = document.createEvent('CustomEvent');
				// columnsEvent.initCustomEvent('Columns.Table.DidChange', false, false, {
				// 	table: 	new Table({ columns: this.items })
				// });
				// // document.dispatchEvent(columnsEvent);
				// $(document).trigger({
				// 	type: 'Columns.Table.DidChange',
				// 	detail: {
				// 		table: 	new Table({ columns: this.items })
				// 	}
				// })

				ColumnsEvent.send( 'Columns.Table.DidChange', {
					table: 	new Table({ columns: this.items })
				});

				expect( this.itemsView._updateWithItems ).toHaveBeenCalledWith( this.items );
				expect( this.itemsView.render ).toHaveBeenCalled();
			});
		});

		describe('Item Updates', function() {

			beforeEach(function() {
				this.item = new Item({ title: 'Last Name'});
				// this.event = document.createEvent('CustomEvent');
				// this.event.initCustomEvent('Columns.Item.DidChange', false, false, {
				// 	item: 	this.item
				// });

				spyOn( this.itemsView, 'updateItem' );
			});

			it('should update the given item on change events', function() {
				// document.dispatchEvent( this.event );
				ColumnsEvent.send( 'Columns.Item.DidChange', {
					item: 	this.item
				});
				expect( this.itemsView.updateItem ).toHaveBeenCalledWith( this.item );
			});

			it('should update the given item on active state change events', function() {
				// document.dispatchEvent( this.event );
				ColumnsEvent.send( 'Columns.Item.ActiveStateDidChange', {
					item: 	this.item
				});
				expect( this.itemsView.updateItem ).toHaveBeenCalledWith( this.item );
			});
		});
	});

	describe('Emitting Change Events', function() {

		beforeEach(function() {
			this.itemsView = new ItemsView();
			spyOn( ColumnsEvent, 'send' );
		});

		it('should emit a change event', function() {
			this.itemsView._emitChange();

			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.ItemsView.DidChange');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].itemsView ).toEqual( this.itemsView );
		});
	});
});
},{"../../javascripts/controllers/ItemsView.js":6,"../../javascripts/models/ColumnsEvent.js":20,"../../javascripts/models/Table.js":24}],30:[function(require,module,exports){
var MobileView 		= require('../../javascripts/controllers/MobileView.js');
var RegisterView 	= require('../../javascripts/controllers/RegisterView.js');
var ThanksView 		= require('../../javascripts/controllers/ThanksView.js');

jasmine.getFixtures().fixturesPath = 'specs/fixtures';

describe('Mobile View', function() {
	var mobile;

	beforeEach(function() {
		loadFixtures('app.html');
		mobile = new MobileView();
	});

	describe('Initalizing', function() {1

		it('should initialize the correct subviews', function() {
			expect( mobile.register instanceof RegisterView ).toBeTruthy();
			expect( mobile.thanks instanceof ThanksView ).toBeTruthy();
		});
	});

	describe('Rendering', function() {
		var $mobile;

		beforeEach(function() {
			$mobile = mobile.render();
		});

		it('should return the app element', function() {
			expect( $mobile ).toEqual('#app');
		});

		it('should add a mobile class to the app element', function() {
			expect( $mobile ).toHaveClass('mobile');
		});

		it('should render the register view', function() {
			expect( $mobile.find('#register').length ).toBe( 1 );
		});

	});
});


},{"../../javascripts/controllers/MobileView.js":7,"../../javascripts/controllers/RegisterView.js":8,"../../javascripts/controllers/ThanksView.js":17}],31:[function(require,module,exports){
var RegisterView 		= require('../../javascripts/controllers/RegisterView.js');
var Table 				= require('../../javascripts/models/Table.js');
var ColumnsEvent 		= require('../../javascripts/models/ColumnsEvent.js');
var ColumnsAnalytics 	= require('../../javascripts/models/ColumnsAnalytics.js');
var Config 				= require('../../javascripts/config.js');

describe('Register View', function() {
	var register;

	beforeEach(function() {
		register = new RegisterView();
	});

	describe('Rendering', function() {
		var $register;

		beforeEach(function() {
			$register = register.render();
		});

		it('should be active', function() {
			expect( $register ).toHaveClass('active');
		});

		it('should render the header', function() {
			expect( $register.find('.columns-register-copy').length ).toBe( 1 );
		});

		it('should render the sample table', function() {

		});

		it('should render the register form', function() {

		});
	});

	describe('Registering', function() {

		// describe('Performing a Registration', function() {

		// 	beforeEach(function() {
	 //      		spyOn( $, 'post' );
	 //      		register._performRegistration('lubin.jeremy@gmail.com');
	 //    	});

		// 	it('should post to the correct api', function() {
		// 		expect( $.post.calls.mostRecent().args[0] ).toEqual( Config.api.host + '/columns/register' );
		// 	});

		// 	it('should post the correct data', function() {
		// 		expect( $.post.calls.mostRecent().args[1] ).toEqual({
	 //      			user: "lubin.jeremy@gmail.com",
	 //      		});
		// 	});
		// });

		describe('Success', function() {

			beforeEach(function() {
				spyOn( register, 'hide' );
				spyOn( ColumnsEvent, 'send' );
				register._onRegistrationSuccess();
			});

			it('should hide itself', function() {
				expect( register.hide ).toHaveBeenCalled();
			});

			it('should emit an event', function() {
				expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.RegisterView.DidRegisterWithSuccess');
				expect( ColumnsEvent.send.calls.argsFor(0)[1].registerView ).toEqual( register );
			});
		});
	});

	describe('Showing and Hiding', function() {
		var $register;

		describe('Showing', function() {

			beforeEach(function( done ) {
				$register = register.render();

				$register.css({ opacity: 0 });
				$register.removeClass('active');

				register.show();

				setTimeout(function() {
					done();
				}, 300);
			});

			it('should have full opacity', function( done ) {
				expect( $register ).toHaveCss({ opacity: '1' });
				done();
			});

			it('should have the active class', function( done ) {
				expect( $register ).toHaveClass('active');
				done();
			});
		});

		describe('Hiding', function() {

			beforeEach(function( done ) {
				$register = register.render();

				$register.css({ opacity: 1 });
				$register.addClass('active');

				register.hide();

				setTimeout(function() {
					done();
				}, 300);
			});

			it('should have zero opacity', function( done ) {
				expect( $register ).toHaveCss({ opacity: '0' });
				done();
			});

			it('should not have the active class', function( done ) {
				expect( $register ).not.toHaveClass('active');
				done();
			});
		});
	});

	describe('Listening to User Events', function() {

		describe('Register Button', function() {
			var $register;

			beforeEach(function() {
				$register = register.render();
				spyOn( register, 'setEmailError' );
				spyOn( register, '_performRegistration' );
			});

			it('should set an error if the email is invalid', function() {
				spyOn( register, 'isEmailValid').and.returnValue( false );
				$register.find('.columns-register-button').trigger('click');

				expect( register.setEmailError ).toHaveBeenCalledWith( true );
				expect( register._performRegistration ).not.toHaveBeenCalled();
			});

			it('should call the registration success function if the email is valid', function() {
				spyOn( register, 'isEmailValid').and.returnValue( true );
				$register.find('.columns-register-button').trigger('click');

				expect( register.setEmailError ).toHaveBeenCalledWith( false );
				expect( register._performRegistration ).toHaveBeenCalled();
			});
		});

	});

	describe('Setting Email Field Errors', function() {
		var $register, $field;

		beforeEach(function( done ) {
			$register = register.render();
			$field = $register.find('.columns-register-email-input');
			done();
		});

		it('should add an error class if passed true', function( done ) {
			$field.removeClass('error');
			register.setEmailError( true );

			setTimeout(function() {
				expect( $register.find('.columns-register-email-input') ).toHaveClass('error');
				done();
			}, 10);
		});


		it('should add an error class if passed false', function( done ) {
			$field.addClass('error');
			register.setEmailError( false );
			setTimeout(function() {
				expect( $register.find('.columns-register-email-input') ).not.toHaveClass('error');
				done();
			}, 10);
		});
	});

	describe('Sending Analytics Events', function() {

		beforeEach(function() {
			register.render();
			spyOn( ColumnsAnalytics, 'send' );
		});

		it('should ignore events sent by a table that is not a sample table', function() {
			$(document).trigger('ColumnsTableDidExpand', {
				table: new Table({ id: Config.embed.mobile['feature-table'] + 1 })
			});

			expect( ColumnsAnalytics.send ).not.toHaveBeenCalled();

		});

		it('should send an event when the preview table is expanded', function() {
			$(document).trigger('ColumnsTableDidExpand', {
				table: new Table({ id: Config.embed.mobile['feature-table'] })
			});
			expect( ColumnsAnalytics.send ).toHaveBeenCalledWith({
				category: 'sample table',
				action: 'expand'
			});
		});

		it('should send an event when the user enters an email address', function() {
			register.$register.find('.columns-register-email-input input').trigger('blur');
			expect( ColumnsAnalytics.send ).toHaveBeenCalledWith({
				category: 'register form',
				action: 'filled',
				label: 'email'
			});
		});

		it('should send an event when the user presses the register button', function() {
			register.$register.find('.columns-register-button').trigger('click');
			expect( ColumnsAnalytics.send ).toHaveBeenCalledWith({
				category: 'register form',
				action: 'submit',
			});
		});
	});
});
},{"../../javascripts/config.js":2,"../../javascripts/controllers/RegisterView.js":8,"../../javascripts/models/ColumnsAnalytics.js":19,"../../javascripts/models/ColumnsEvent.js":20,"../../javascripts/models/Table.js":24}],32:[function(require,module,exports){
var ColumnsEvent 		= require('../../javascripts/models/ColumnsEvent.js');
var StyleComponentView 	= require('../../javascripts/controllers/StyleComponentView.js');

jasmine.getFixtures().fixturesPath = 'specs/fixtures';

describe('Style Component View Spec', function() {

	afterEach(function() {
		ColumnsEvent.offAll();
	});

	describe('Initialization', function() {

		beforeEach(function() {
			// this.$groups = 'fake groups';
			// spyOn( TemplateView, 'getGroupsForItem' ).and.returnValue( this.$groups );
		});

		it('should initialize with the correct defaults', function() {
			var componentView = new StyleComponentView();
			expect( componentView.item ).toBeUndefined();
			// expect( componentView.templateGroups ).toEqual( [] );
		});

		it('should optionally initialize with an item', function() {
			var item = new Item({ title: "My Item" });
			var componentView = new StyleComponentView( item );
			expect( componentView.item ).toEqual( item );
		});

		it('should optionally initialize with a TemplateGroupView', function() {
			var item = new TemplateGroupView();
			var componentView = new StyleComponentView( item );
			expect( componentView.item ).toEqual( item );
		});

		xit('should throw an error if initialized with anything other than an Item, ItemView, TemplateValueView or TemplateGroupView', function() {
			expect(function() {
				new StyleComponentView( "nope" );
			}).toThrow("exception: Selection must be an Item, ItemView, TemplateValueView or TemplateGroupView");
		});

		xit('should determine all parent groups', function() {
			var item = new Item({ title: "My Item" });
			var componentView = new StyleComponentView( item );
			expect( TemplateView.getGroupsForItem ).toHaveBeenCalledWith( item );
			expect( componentView.templateGroups ).toEqual( this.$groups );
		});
	});

	xdescribe('Getting an Item from a Selection', function() {

		beforeEach(function() {
			this.componentView = new StyleComponentView();
		});

		it('should return an item if passed an item', function() {
			var item = new Item({ title: "My Item" });
			expect( this.componentView.getItemForSelection( item ) ).toEqual( item );
		});

		it('should return an item if passed an item view', function() {
			var item = new Item({ title: "My Item" });
			var itemView = new ItemView( item );
			expect( this.componentView.getItemForSelection( itemView ) ).toEqual( item );
		});

		it('should return an item if passed a value view', function() {
			var item = new Item({ title: "My Item" });
			var valueView = new TemplateValueView( item );
			expect( this.componentView.getItemForSelection( valueView ) ).toEqual( item );
		});

		it('should return the group view if passed a TemplateGroupView', function() {
			var item = new TemplateGroupView();
			expect( this.componentView.getItemForSelection( item ) ).toEqual( item );
		});

		it('should throw an error if passed anything other than an Item, ItemView, TemplateValueView or TemplateGroupView', function() {
			expect(function() {
				this.componentView.getItemForSelection("hi");
			}.bind( this ))
			.toThrow("exception: Selection must be an Item, ItemView, TemplateValueView or TemplateGroupView");
		});
	});

	xdescribe('Getting Current Values', function() {

		beforeEach(function() {
			this.item = new Item({
				title: 'My Item',
				style: 'font-size:14px;color:#3a3a3a;margin-left:12px;'
			});
			this.valueView = new TemplateValueView( this.item );
			this.componentView = new StyleComponentView();
		});

		describe('Get Single Current Value', function() {

			it('should accept a jQuery object representing either a value or group', function() {
				expect(function() {
					this.componentView.getCurrentValue( this.valueView.render() );
				}.bind( this ))
				.not.toThrow();
			});

			it('should get the current value of a layout property', function() {
				expect( this.componentView.getCurrentValue( this.valueView.render() ) ).toBe()
			});

			it('should get the current value of a style property', function() {

			});

			it('should return undefined if the value has not been set', function() {

			});
		});

		describe('Get All Current Values', function() {

		});
	});

	describe('Rendering', function() {

		beforeEach(function() {
			loadFixtures('style-bare.html');

			var item = new Item({
				title: 'My Item',
				style: 'font-size:14px;color:#3a3a3a;margin-left:12px;'
			});
			var group = new TemplateGroupView({
				layout: [{
					property:'flex-direction',
					value: 'row'
				}, {
					property: 'justify-content',
					value: 'flex-start'
				}, {
					property: 'align-items',
					value: 'center'
				}],
				style: [{
					property: 'font-size',
					value: '12px'
				}]
			});

			// spyOn( this.groupStyleView, 'getStyle' );
			// spyOn( this.groupStyleView, 'getStyle' );

			this.$itemStyle = new StyleComponentView( item ).render();
			
			group.render();
			this.groupStyleView = new StyleComponentView( group );
			spyOn( group, 'title' ).and.returnValue('Group');
			spyOn( this.groupStyleView, '_setupEventListeners' );
			spyOn( this.groupStyleView, 'updateAlignmentButtons' );
			this.$groupStyle = this.groupStyleView.render();
		});

		it('should have the correct class', function() {
			expect( this.$itemStyle ).toHaveClass('style-component');
			expect( this.$groupStyle ).toHaveClass('style-component');
		});

		it('should render component with the correct item title', function() {
			expect( this.$itemStyle.find('.style-component-header-title') ).toHaveText('My Item');
			expect( this.$groupStyle.find('.style-component-header-title') ).toHaveText('Group');
		});

		it('should render the correct sub-components for text', function() {
			expect( this.$itemStyle.find('.style-component-section').length ).toBe( 2 );
			expect( this.$itemStyle.find('.style-component-section-row').length ).toBe( 4 );
			expect( this.$itemStyle.find('.style-component-section-row-input').length ).toBe( 6 );
			expect( this.$itemStyle.find('.style-component-section-row-segmented-button').length ).toBe( 1 );
			expect( this.$itemStyle.find('.style-component-section-row-multiple-segmented-button').length ).toBe( 1 );
		});

		it('should render the correct sub-components for a group', function() {
			expect( this.$groupStyle.find('.style-component-section').length ).toBe( 1 );
			expect( this.$groupStyle.find('.style-component-section-row').length ).toBe( 1 );
			expect( this.$groupStyle.find('.style-component-section-row-segmented-button').length ).toBe( 2 );
		});

		xit('should render sub-components with the correct default values', function() {

		});

		xit('should clear existing components on item rendering', function() {
			expect( this.$itemStyle.prevAll().length ).toBe( 0 );
		});

		xit('should append to existing components on group rendering', function() {
			expect( this.$groupStyle.prevAll().length ).toBe( 1 );
		});

		it('should update the alignment buttons for the flex-direction', function() {
			expect( this.groupStyleView.updateAlignmentButtons ).toHaveBeenCalled();
		});
	});

	describe('Rotating Alignment Buttons For Layout Changes', function() {

		beforeEach(function() {
			loadFixtures('style-bare.html');
			this.group = new TemplateGroupView({
				layout: [{
					property:'flex-direction',
					value: 'row'
				}, {
					property: 'justify-content',
					value: 'flex-start'
				}, {
					property: 'align-items',
					value: 'center'
				}],
				style: [{
					property: 'font-size',
					value: '12px'
				}]
			});

			this.groupStyleView = new StyleComponentView( this.group );

			spyOn( this.group, 'title' ).and.returnValue('Group');

			this.$groupStyle = this.groupStyleView.render();
		});

		it('should apply the correct classes to the alignment buttons', function() {
			ColumnsEvent.send( 'Columns.StyleSegmentedButtonView.ValueDidUpdateForPropertyAndItem', {
				item: this.group,
				property: 'flex-direction',
				value: 	'column'
			});

			expect( this.$groupStyle.find('[data-property="align-items"]') ).toHaveClass( 'column' );
			expect( this.$groupStyle.find('[data-property="align-items"]') ).not.toHaveClass( 'row' );
		});
	});

	xdescribe('Updating', function() {

		it('should remove existing components', function() {

		});

		it('should update the item and / or value view and / or group', function() {

		});

		it('should render the new components', function() {

		});
	});

	xdescribe('Determining Parent Selections', function() {

		it('throw an error if not passed an Item, ItemView or TemplateValueView', function() {

		});
	});
});
},{"../../javascripts/controllers/StyleComponentView.js":9,"../../javascripts/models/ColumnsEvent.js":20}],33:[function(require,module,exports){
var ColumnsEvent 		= require('../../javascripts/models/ColumnsEvent.js');
var StyleInputView 		= require('../../javascripts/controllers/StyleInputView.js');

describe('Style Input View', function() {

	afterEach(function() {
		ColumnsEvent.offAll();
	});

	describe('Initialization', function() {

		it('should default to text type', function() {
			var inputView = new StyleInputView();
			expect( inputView.type ).toBe('tel');
			expect( inputView.unit ).toBe( '' );
			expect( inputView.canBeNegative ).toBe( true );
			expect( inputView.canBeDecimal ).toBe( false );
			expect( inputView.property ).toBeUndefined();
			expect( inputView.value ).toBeUndefined();
			expect( inputView.prependIcon ).toBeUndefined();
			expect( inputView.appendControls ).toBe( false );
			expect( inputView.label ).toBeFalsy();
			expect( inputView.item ).toBeUndefined();
		});

		it('should allow a custom type', function() {
			var inputView = new StyleInputView({ type: 'color' });
			expect( inputView.type ).toEqual( 'color' );
		});

		it('should be associated with an object that it styles', function() {
			var item = new Item({ title: "My Item" });
			var inputView = new StyleInputView({ item: item });
			expect( inputView.item ).toEqual( item );
		});

		it('should allow a custom unit', function() {
			var inputView = new StyleInputView({ unit: 'em' });
			expect( inputView.unit ).toBe('em');
		});

		it('should be associated with a css property', function() {
			var inputView = new StyleInputView({ property: 'font-size' });
			expect( inputView.property ).toBe('font-size');
		});

		it('should allow a default value', function() {
			var inputView = new StyleInputView({ unit: 'px', value: '200' });
			expect( inputView.value ).toBe('200px');

			inputView = new StyleInputView({ value: '200px' });
			expect( inputView.value ).toBe('200px');
		});

		it('should allow a prepend icon', function() {
			var inputView = new StyleInputView({ prependIcon: 'margin-top' });
			expect( inputView.prependIcon ).toBe('margin-top');
		});

		it('should increment and decrement optionally', function() {
			var inputView = new StyleInputView({ appendControls: true });
			expect( inputView.appendControls ).toBe( true );
		});

		it('should allow a label', function() {
			var inputView = new StyleInputView({ label: 'Margin Top' });
			expect( inputView.label ).toBe('Margin Top');
		});

		it('should optionally not allow negative values', function() {
			var inputView = new StyleInputView({ canBeNegative: false });
			expect( inputView.canBeNegative ).toBe( false );
		});

		it('should optionally allow decimal values', function() {
			var inputView = new StyleInputView({ canBeDecimal: true });
			expect( inputView.canBeDecimal ).toBe( true );
		});

	});

	describe('Rendering', function() {

		beforeEach(function() {
			this.inputView = new StyleInputView();
		});

		it('should render without any accessories', function() {
			var $input = this.inputView.render();
			expect( $input ).toHaveClass('style-component-section-row-item');
			expect( $input ).toContainElement('.style-component-section-row-input');
			expect( $input ).toContainElement('input');
			expect( $input ).not.toContainElement('.style-component-section-row-input-prepend');
			expect( $input ).not.toContainElement('.style-component-section-row-input-append');
			expect( $input.find('input') ).toHaveValue( '' );
			expect( $input.find('.style-component-section-row-item-label') ).toBeEmpty();
		});

		it('should render with the correct prepend icon', function() {
			this.inputView.prependIcon = 'margin-top';
			var $input = this.inputView.render();
			expect( $input ).toContainElement('.style-component-section-row-input-prepend');
		});

		it('should render with the correct default value', function() {
			this.inputView.value = '20px';
			var $input = this.inputView.render();
			expect( $input.find('input') ).toHaveValue('20px');
		});

		it('should render with the correct label', function() {
			this.inputView.label = 'My Label';
			var $input = this.inputView.render();
			expect( $input.find('.style-component-section-row-item-label') ).toHaveText("My Label");
		});

		it('should render with the increment and decrement controls', function() {
			this.inputView.appendControls = true;
			var $input = this.inputView.render();
			expect( $input ).toContainElement('.style-component-section-row-input-append');
		});
	});

	describe('Updating', function() {

		beforeEach(function() {
			this.inputView = new StyleInputView();
			this.$input = this.inputView.render();
		});

		it('should update the input value', function() {
			this.inputView.update( '4' );
			expect( this.inputView.value ).toBe( '4' );
			expect( this.$input.find('input') ).toHaveValue( '4' );
		});

		it('should fire an update event', function() {
			var item = new Item({ title: "My Item" });
			spyOn( ColumnsEvent, 'send' );
			this.inputView.item = item;
			this.inputView.property = 'font-size';
			this.inputView.update( '4' );

			expect( ColumnsEvent.send.calls.argsFor(0)[0]).toBe('Columns.StyleInputView.ValueDidUpdateForPropertyAndItem');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].item ).toEqual( item );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].property ).toBe( 'font-size' );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].value ).toBe( '4' );
		});

	});

	describe('Handle User Interaction', function() {

		beforeEach(function() {
			this.inputView = new StyleInputView({
				canBeDecimal: false,
				canBeNegative: false,
				appendControls: true
			});
			this.$input = this.inputView.render();
			spyOn( this.inputView, 'update' );
		});

		it('should update upon input event for the color field', function() {
			this.inputView = new StyleInputView({
				canBeDecimal: false,
				canBeNegative: false,
				appendControls: false,
				type: 'color',
				value: '#3a3a3a'
			});
			this.$input = this.inputView.render();
			spyOn( this.inputView, 'update' );

			this.$input.find('input').trigger('input');
			expect( this.inputView.update ).toHaveBeenCalledWith( '#3a3a3a' );
		});

		it('should update upon value change', function() {
			this.$input.find('input').val( 2 );
			this.$input.find('input').trigger('change');
			expect( this.inputView.update ).toHaveBeenCalledWith( '2' );
		});

		it('should update upon keyup', function() {
			this.$input.find('input').val( 2 );
			this.$input.find('input').trigger('change');
			expect( this.inputView.update ).toHaveBeenCalledWith( '2' );
		});

		it('should update when incremented', function() {
			spyOn( this.inputView, 'increment' ).and.returnValue( '3' );
			this.$input.find('input').val( 2 );
			this.$input.find('.increment').trigger('click');
			expect( this.inputView.increment ).toHaveBeenCalledWith( '2' );
			expect( this.inputView.update ).toHaveBeenCalledWith( '3' );
		});

		it('should update when decremented', function() {
			spyOn( this.inputView, 'decrement' ).and.returnValue( '1' );
			this.$input.find('input').val( 2 );
			this.$input.find('.decrement').trigger('click');
			expect( this.inputView.decrement ).toHaveBeenCalledWith( '2' );
			expect( this.inputView.update ).toHaveBeenCalledWith( '1' );
		});
	});

	xdescribe('Incrementing and Decrementing Values', function() {

		beforeEach(function() {
			this.inputView = new StyleInputView({
				canBeDecimal: false,
				canBeNegative: false,
				unit: 'em',
			});
		});

		it('should increment the value when the user clicks the up arrow', function() {
			expect( this.inputView.increment( 2 ) ).toBe( '3em' );
			expect( this.inputView.increment( 2.1 ) ).toBe( '3em' );
			expect( this.inputView.increment( -4 ) ).toBe( '0em' );
			expect( this.inputView.increment( '2px' ) ).toBe( '3px' );
			expect( this.inputView.increment( '2.1px' ) ).toBe( '3px' );
			expect( this.inputView.increment( '-4px' ) ).toBe( '0px' );
		});

		it('should decrement the value when the user clicks the down arrow', function() {
			expect( this.inputView.decrement( 2 ) ).toBe( '1em' );
			expect( this.inputView.decrement( 2.1 ) ).toBe( '1em' );
			expect( this.inputView.decrement( -4 ) ).toBe( '0em' );
			expect( this.inputView.decrement( '2px' ) ).toBe( '1px' );
			expect( this.inputView.decrement( '2.1px' ) ).toBe( '1px' );
			expect( this.inputView.decrement( '-4px' ) ).toBe( '0px' );
		});
	});

	describe('Parsing Values', function() {

		beforeEach(function() {
			this.inputView = new StyleInputView();
		});

		it('should split the value into number and unit', function() {
			expect( this.inputView.parseValue( '200px' ).number ).toBe( '200' );
			expect( this.inputView.parseValue( '200px' ).unit ).toBe( 'px' );
		});

		xit('should ignore anything before the first number', function() {
			expect( this.inputView.parseValue( 'adsf200px' ).number ).toBe( 200 );
			expect( this.inputView.parseValue( 'asdf200px' ).unit ).toBe( 'px' );
		});
	});

	describe('Formatting Values', function() {

		beforeEach(function() {
			this.inputView = new StyleInputView();
		});

		it('should add the unit if one has been specified', function() {
			this.inputView.unit = 'px';
			expect( this.inputView.formatValue( 200 ) ).toBe("200px");
		});

		it('should not add a unit if the user supplied their own', function() {
			this.inputView.unit = 'px';
			expect( this.inputView.formatValue( '200%' ) ).toBe( "200%" );
			expect( this.inputView.formatValue( '200em' ) ).toBe( "200em" );
		});

		it('should do nothing if the field is type color', function() {
			this.inputView.type = 'color';
			expect( this.inputView.formatValue( '#3a3a3a' ) ).toBe( "#3a3a3a" );
		});
	});

	describe('Validating Values', function() {

		beforeEach(function() {
			this.inputView = new StyleInputView();
		});

		it('should allow negative values if that behavior has been specified', function() {
			var value = this.inputView.validateValue( -200 );
			expect( value ).toBe( -200 );
		});

		it('should prevent decimals if that behavior has been specified', function() {
			var value = this.inputView.validateValue( 2.1 );
			expect( value ).toBe( 2 );
		});

		it('should prevent the value from being negative if that behavior has been specified', function() {
			this.inputView.canBeNegative = false;
			var value = this.inputView.validateValue( -200 );
			expect( value ).toBe( 0 );
		});

		it('should allow decimal values if that behavior has been specified', function() {
			this.inputView.canBeDecimal = true;
			var value = this.inputView.validateValue( 2.1 );
			expect( value ).toBe( 2.1 );
		});
	});
});
},{"../../javascripts/controllers/StyleInputView.js":10,"../../javascripts/models/ColumnsEvent.js":20}],34:[function(require,module,exports){
var ColumnsEvent 						= require('../../javascripts/models/ColumnsEvent.js');
var StyleMultipleSegmentedButtonView 	= require('../../javascripts/controllers/StyleMultipleSegmentedButtonView.js');

describe('Style Multiple Segmented Button View', function() {

	afterEach(function() {
		ColumnsEvent.offAll();
	});

	describe('Initiation', function() {

		it('should have the correct defaults', function() {
			var buttonsView = new StyleMultipleSegmentedButtonView();
			expect( buttonsView.label ).toBe( '' );
			expect( buttonsView.buttons ).toEqual( [] );
			expect( buttonsView.properties ).toEqual( {} );
			expect( buttonsView.item ).toBeUndefined();
		});

		it('should be associated with an object that it styles', function() {
			var item = new Item({ title: "My Item" });
			var buttonsView = new StyleMultipleSegmentedButtonView({ item: item });
			expect( buttonsView.item ).toEqual( item );
		});

		it('should allow initiation with a label', function() {
			var buttonsView = new StyleMultipleSegmentedButtonView({ label: 'My Label' });
			expect( buttonsView.label ).toBe( 'My Label' );
		});

		it('should allow initiation with a set of buttons, each with icon, property and active, inactive and current values', function() {
			var buttons = [{
				property: 'font-weight',
				values: {
					active: 'bold',
					inactive: 'normal'
				},
				icon: 'bold'
			}, {
				property: 'font-style',
				values: {
					active: 'italic',
					inactive: 'normal'
				},
				icon: 'italic'
			}, {
				property: 'text-decoration',
				values: {
					active: 'underline',
					inactive: 'none'
				},
				icon: 'underline'
			}];
			var buttonsView = new StyleMultipleSegmentedButtonView({ buttons: buttons });
			expect( buttonsView.buttons ).toEqual( buttons );
		});

		it('should create a properties hash from the buttons', function() {
			var buttons = [{
				property: 'font-weight',
				values: {
					active: 'bold',
					inactive: 'normal',
					current: 'bold'
				},
				icon: 'bold'
			}, {
				property: 'font-style',
				values: {
					active: 'italic',
					inactive: 'normal',
					current: 'normal'
				},
				icon: 'italic'
			}, {
				property: 'text-decoration',
				values: {
					active: 'underline',
					inactive: 'none',
					current: 'auto'
				},
				icon: 'underline'
			}];
			var buttonsView = new StyleMultipleSegmentedButtonView({ buttons: buttons });
			expect( buttonsView.properties ).toEqual({
				'font-weight': 'bold',
				'font-style': 'normal',
				'text-decoration': 'auto'
			});
		});
	});

	describe('Rendering', function() {

		beforeEach(function() {

			var buttons = [{
				property: 'font-weight',
				values: {
					active: 'bold',
					inactive: 'normal',
					current: 'bold'
				},
				icon: 'bold'
			}, {
				property: 'font-style',
				values: {
					active: 'italic',
					inactive: 'normal',
					current: 'normal'
				},
				icon: 'italic'
			}, {
				property: 'text-decoration',
				values: {
					active: 'underline',
					inactive: 'none',
					current: 'auto'
				},
				icon: 'underline'
			}];
			this.buttonsView = new StyleMultipleSegmentedButtonView({
				label: "My Segmented Button",
				buttons: buttons
			});
			this.$button = this.buttonsView.render();
		});

		it('should have the right class', function() {
			expect( this.$button ).toHaveClass('style-component-section-row-item');
			expect( this.$button ).toContainElement('.style-component-section-row-multiple-segmented-button');
		});

		it('should have the right label', function() {
			expect( this.$button.find('.style-component-section-row-item-label') ).toHaveText("My Segmented Button");
		});

		it('should have the right number of buttons', function() {
			expect( this.$button.find('button').length ).toBe( 3 );
		});

		it('should render the buttons with the correct attributes', function() {
			expect( this.$button.find('button').eq( 0 ) ).toHaveData('property', 'font-weight');
			expect( this.$button.find('button').eq( 0 ) ).toHaveData('active-value', 'bold');
			expect( this.$button.find('button').eq( 0 ) ).toHaveData('inactive-value', 'normal');
			expect( this.$button.find('button').eq( 1 ) ).toHaveData('property', 'font-style');
			expect( this.$button.find('button').eq( 1 ) ).toHaveData('active-value', 'italic');
			expect( this.$button.find('button').eq( 1 ) ).toHaveData('inactive-value', 'normal');
			expect( this.$button.find('button').eq( 2 ) ).toHaveData('property', 'text-decoration');
			expect( this.$button.find('button').eq( 2 ) ).toHaveData('active-value', 'underline');
			expect( this.$button.find('button').eq( 2 ) ).toHaveData('inactive-value', 'none');
		});

		it('should set the correct button as active', function() {
			expect( this.$button.find('button').eq( 0 ) ).toHaveClass('active');
			expect( this.$button.find('button').eq( 1 ) ).not.toHaveClass('active');
			expect( this.$button.find('button').eq( 2 ) ).not.toHaveClass('active');
		});
	});

	describe('Updating', function() {

		beforeEach(function() {

			var buttons = [{
				property: 'font-weight',
				values: {
					active: 'bold',
					inactive: 'normal',
					current: 'bold'
				},
				icon: 'bold'
			}, {
				property: 'font-style',
				values: {
					active: 'italic',
					inactive: 'normal',
					current: 'normal'
				},
				icon: 'italic'
			}, {
				property: 'text-decoration',
				values: {
					active: 'underline',
					inactive: 'none',
					current: 'auto'
				},
				icon: 'underline'
			}];
			this.buttonsView = new StyleMultipleSegmentedButtonView();
		});

		it('should update its value', function() {
			this.buttonsView.update( 'text-align', 'left' );
			expect( this.buttonsView.properties['text-align'] ).toBe('left');
		});

		it('should notify the app of the new value', function() {
			var item = new Item({ title: "My Item" });
			spyOn( ColumnsEvent, 'send' );
			this.buttonsView.item = item;
			this.buttonsView.update( 'text-align', 'right' );

			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.StyleMultipleSegmentedButtonView.ValueDidUpdateForPropertyAndItem');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].item ).toEqual( item );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].property ).toBe( 'text-align' );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].value ).toBe( 'right' );
		});
	});

	describe('Handing User Interaction', function() {

		beforeEach(function() {

			var buttons = [{
				property: 'font-weight',
				values: {
					active: 'bold',
					inactive: 'normal',
					current: 'bold'
				},
				icon: 'bold'
			}, {
				property: 'font-style',
				values: {
					active: 'italic',
					inactive: 'normal',
					current: 'normal'
				},
				icon: 'italic'
			}, {
				property: 'text-decoration',
				values: {
					active: 'underline',
					inactive: 'none',
					current: 'auto'
				},
				icon: 'underline'
			}];
			this.buttonsView = new StyleMultipleSegmentedButtonView({ buttons: buttons });
			this.$button = this.buttonsView.render();
		});

		it('should select the clicked button if it was inactive', function() {
			this.$button.find('button').eq( 1 ).trigger('click');
			expect( this.$button.find('button').eq( 1 ) ).toHaveClass('active');
		});

		it('should deselect the clicked button if it was active', function() {
			this.$button.find('button').eq( 0 ).trigger('click');
			expect( this.$button.find('button').eq( 0 ) ).not.toHaveClass('active');
		});

		it('should call the update method with the correct property and value', function() {
			spyOn( this.buttonsView, 'update' );
			this.$button.find('button').eq( 0 ).trigger('click');
			this.$button.find('button').eq( 1 ).trigger('click');
			expect( this.buttonsView.update ).toHaveBeenCalledWith( 'font-weight', 'normal' );
			expect( this.buttonsView.update ).toHaveBeenCalledWith( 'font-style', 'italic' );
		});
	});
});
},{"../../javascripts/controllers/StyleMultipleSegmentedButtonView.js":11,"../../javascripts/models/ColumnsEvent.js":20}],35:[function(require,module,exports){
var ColumnsEvent 				= require('../../javascripts/models/ColumnsEvent.js');
var StyleSegmentedButtonView 	= require('../../javascripts/controllers/StyleSegmentedButtonView.js');

describe('Style Segmented Button View', function() {

	afterEach(function() {
		ColumnsEvent.offAll();
	});

	describe('Initiation', function() {

		beforeEach(function() {

			this.buttonsView = new StyleSegmentedButtonView();
		});

		it('should have the correct defaults', function() {
			this.buttonsView = new StyleSegmentedButtonView();
			expect( this.buttonsView.label ).toBe( '' );
			expect( this.buttonsView.property ).toBe( '' );
			expect( this.buttonsView.buttons ).toEqual( [] );
			expect( this.buttonsView.item ).toBeUndefined();
		});

		it('should be associated with an object that it styles', function() {
			var item = new Item({ title: "My Item" });
			var buttonsView = new StyleSegmentedButtonView({ item: item });
			expect( buttonsView.item ).toEqual( item );
		});

		it('should allow initiation with a label', function() {
			this.buttonsView = new StyleSegmentedButtonView({ label: 'My Segmented Button' });
			expect( this.buttonsView.label ).toBe('My Segmented Button');
		});

		it('should allow initiation with a current value', function() {
			this.buttonsView = new StyleSegmentedButtonView({ value: 'left' });
			expect( this.buttonsView.value ).toBe('left');
		});

		it('should allow initiation with a property', function() {
			this.buttonsView = new StyleSegmentedButtonView({ property: 'text-align' });
			expect( this.buttonsView.property ).toBe('text-align');
		});

		it('should allow intiation with a set of buttons, each with icon and value', function() {
			var buttons = [{
				icon: 'icon1',
				value: 'center'
			}, {
				icon: 'icon2',
				value: 'right'
			}];
			this.buttonsView = new StyleSegmentedButtonView({ buttons: buttons });
			expect( this.buttonsView.buttons ).toEqual( buttons );
		});
	});

	describe('Rendering', function() {

		beforeEach(function() {
			var buttons = [{
				icon: 'icon1',
				value: 'center'
			}, {
				icon: 'icon2',
				value: 'right'
			}];
			this.buttonsView = new StyleSegmentedButtonView({
				label: "My Segmented Button",
				property: 'text-align',
				value: 'center',
				buttons: buttons
			});
			this.$button = this.buttonsView.render();
		});

		it('should have the right class', function() {
			expect( this.$button ).toHaveClass('style-component-section-row-item');
			expect( this.$button ).toContainElement('.style-component-section-row-segmented-button');
		});

		it('should have the right label', function() {
			expect( this.$button.find('.style-component-section-row-item-label') ).toHaveText("My Segmented Button");
		});

		it('should have the right property', function() {
			expect( this.$button.find('.style-component-section-row-segmented-button') ).toHaveData('property', 'text-align');
		});

		it('should have the right number of buttons', function() {
			expect( this.$button.find('button').length ).toBe( 2 );
		});

		it('should render the buttons with the correct values', function() {
			expect( this.$button.find('button').eq( 0 ) ).toHaveData('value', 'center');
			expect( this.$button.find('button').eq( 1 ) ).toHaveData('value', 'right');
		});

		it('should set the correct button as active', function() {
			expect( this.$button.find('button').eq( 0 ) ).toHaveClass('active');
			expect( this.$button.find('button').eq( 1 ) ).not.toHaveClass('active');
		});
	});

	describe('Updating', function() {

		beforeEach(function() {
			var buttons = [{
				icon: 'icon1',
				value: 'center'
			}, {
				icon: 'icon2',
				value: 'right'
			}];
			this.buttonsView = new StyleSegmentedButtonView({
				label: "My Segmented Button",
				property: 'text-align',
				value: 'center',
				buttons: buttons
			});
		});

		it('should update its value', function() {
			this.buttonsView.update( 'right' );
			expect( this.buttonsView.value ).toBe('right');
		});

		it('should notify the app of the new value', function() {
			var item = new Item({ title: "My Item" });
			spyOn( ColumnsEvent, 'send' );
			this.buttonsView.item = item;
			this.buttonsView.update( 'right' );

			expect( ColumnsEvent.send.calls.argsFor(0)[0]).toBe('Columns.StyleSegmentedButtonView.ValueDidUpdateForPropertyAndItem');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].item ).toEqual( item );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].property ).toBe( 'text-align' );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].value ).toBe( 'right' );
		});

	});

	describe('Handling User Interaction', function() {

		beforeEach(function() {
			var buttons = [{
				icon: 'icon1',
				value: 'center'
			}, {
				icon: 'icon2',
				value: 'right'
			}];
			this.buttonsView = new StyleSegmentedButtonView({
				label: "My Segmented Button",
				property: 'text-align',
				value: 'center',
				buttons: buttons
			});
			this.$button = this.buttonsView.render();
		});

		it('should select the clicked button', function() {
			this.$button.find('button').eq( 1 ).trigger('click');
			expect( this.$button.find('button').eq( 1 ) ).toHaveClass('active');
		});

		it('should deselect the other buttons', function() {
			this.$button.find('button').eq( 1 ).trigger('click');
			expect( this.$button.find('button').eq( 0 ) ).not.toHaveClass('active');
		});

		it('should call the update method', function() {
			spyOn( this.buttonsView, 'update' );
			this.$button.find('button').eq( 1 ).trigger('click');
			expect( this.buttonsView.update ).toHaveBeenCalledWith( 'right' );
		});
	});
});
},{"../../javascripts/controllers/StyleSegmentedButtonView.js":12,"../../javascripts/models/ColumnsEvent.js":20}],36:[function(require,module,exports){
var ColumnsEvent 		= require('../../javascripts/models/ColumnsEvent.js');
var StyleView 			= require('../../javascripts/controllers/StyleView.js');

jasmine.getFixtures().fixturesPath = 'specs/fixtures';

describe('Style View', function() {

	afterEach(function() {
		ColumnsEvent.offAll();
	});

	beforeEach(function() {
		loadFixtures('style-bare.html');
	});

	describe('Rendering', function() {

		it('should attach to the #style element already on the page', function() {
			var styleView = new StyleView();
			styleView.render();
			expect( styleView.$style ).toEqual('#styling');
		});

		xit('should initialize with the row as its default component', function() {
			var styleView = new StyleView();
			console.log( $('#styling').html() );
			expect( styleView.$style.find('.style-component').length ).toBe( 1 );
			expect( styleView.$style.find('.style-component') ).toHaveText( 'Row' );
		});
	});

	describe('Updating Components', function() {

		beforeEach(function() {
			this.styleView = new StyleView();
			this.styleView.render();
		});

		it('should replace existing components with item components', function() {
			var selection = new Item({ title: "My Item" });
			this.styleView.updateWithSelection( selection );
			expect( $('.style-component').length ).toBe( 1 );
		});

		it('should append group components to existing components ', function() {
			var selection = new TemplateGroupView();
			selection.render();
			this.styleView.updateWithSelection( selection );
			expect( $('.style-component').length ).toBe( 2 );
		});
	});

	describe('Getting an Item from a Selection', function() {

		beforeEach(function() {
			this.styleView = new StyleView();
		});

		it('should return an item if passed an item', function() {
			var item = new Item({ title: "My Item" });
			expect( this.styleView.getItemForSelection( item ) ).toEqual( item );
		});

		it('should return an item if passed an item view', function() {
			var item = new Item({ title: "My Item" });
			var itemView = new ItemView( item );
			expect( this.styleView.getItemForSelection( itemView ) ).toEqual( item );
		});

		it('should return an item if passed a value view', function() {
			var item = new Item({ title: "My Item" });
			var valueView = new TemplateValueView( item );
			expect( this.styleView.getItemForSelection( valueView ) ).toEqual( item );
		});

		it('should return the group view if passed a TemplateGroupView', function() {
			var item = new TemplateGroupView();
			expect( this.styleView.getItemForSelection( item ) ).toEqual( item );
		});

		it('should throw an error if passed anything other than an Item, ItemView, TemplateValueView or TemplateGroupView', function() {
			expect(function() {
				this.styleView.getItemForSelection("hi");
			}.bind( this ))
			.toThrow("exception: Selection must be an Item, ItemView, TemplateValueView or TemplateGroupView");
		});
	});

	describe('Listening to Template Events', function() {

		beforeEach(function() {
			this.styleView = new StyleView();
			spyOn( this.styleView, 'updateWithSelection' );
			spyOn( TemplateView, 'getGroupsForItem' ).and.returnValue([
				new TemplateGroupView(),
				new TemplateGroupView()
			]);
		});

		it('should update the styling item and parent groups on value view selection', function() {
			loadFixtures('template-with-values.html');
			var item = new Item({ title: "My Item"});
			var valueView = new TemplateValueView( item );
			ColumnsEvent.send('Columns.TemplateValueView.ValueDidSelectWithItem', {
				valueView: 	valueView,
				item: 		item
			});
			expect( this.styleView.updateWithSelection.calls.count() ).toBe( 3 );
			expect( this.styleView.updateWithSelection.calls.argsFor(0)[0] ).toEqual( item );
			expect( this.styleView.updateWithSelection.calls.argsFor(1)[0] instanceof TemplateGroupView ).toBeTruthy();
			expect( this.styleView.updateWithSelection.calls.argsFor(2)[0] instanceof TemplateGroupView ).toBeTruthy();
		});

		it('should render the row component when the table initially uploads', function() {
			
			var templateView = new TemplateView();
			var groupView = new TemplateGroupView();
			TemplateView.groups.push( groupView );

			ColumnsEvent.send('Columns.TemplateView.DidRender', {
				templateView: templateView
			});

			expect( this.styleView.updateWithSelection ).toHaveBeenCalledWith( groupView );
		});

	});

	describe('Responding to Desktop App Events', function() {

		beforeEach(function() {
			this.styleView = new StyleView();
		});

		it('should render the preview', function() {
			spyOn( this.styleView, 'render' );
			
			ColumnsEvent.send('Columns.DesktopView.DidRender', {
				desktopView: {}
			});

			expect( this.styleView.render ).toHaveBeenCalled();
		});
	});

	describe('Listening to Items Events', function() {

		beforeEach(function() {
			this.styleView = new StyleView();
			spyOn( this.styleView, 'updateWithSelection' );
			spyOn( TemplateView, 'getGroupsForItem' ).and.returnValue([
				new TemplateGroupView(),
				new TemplateGroupView()
			]);
		});

		it('should update with the item that was selected', function() {
			loadFixtures('template-with-values.html');
			var item = new Item({ title: "My Item" });
			var itemView = new ItemView( item );

			ColumnsEvent.send( 'Columns.ItemView.ItemDidSelect', {
				itemView: 	itemView,
				item: 		item
			});

			expect( this.styleView.updateWithSelection.calls.count() ).toBe( 3 );
			expect( this.styleView.updateWithSelection.calls.argsFor(0)[0] ).toEqual( item );
			expect( this.styleView.updateWithSelection.calls.argsFor(1)[0] instanceof TemplateGroupView ).toBeTruthy();
			expect( this.styleView.updateWithSelection.calls.argsFor(2)[0] instanceof TemplateGroupView ).toBeTruthy();
		});
	});

	describe('Listening to Style Updates', function() {
		beforeEach(function() {
			this.styleView = new StyleView();
			spyOn( this.styleView, '_emitChange');
		});

		it('should respond to input view events', function() {
			var item = new Item({ title: "My Item" });
			// var event = document.createEvent('CustomEvent');
			// event.initCustomEvent('Columns.StyleInputView.ValueDidUpdateForPropertyAndItem', false, false, {
			// 	item: 	item,
			// 	property: 'font-size',
			// 	value: 	'12px'
			// });

			// document.dispatchEvent( event );
			ColumnsEvent.send( 'Columns.StyleInputView.ValueDidUpdateForPropertyAndItem', {
				item: 	item,
				property: 'font-size',
				value: 	'12px'
			});
			expect( this.styleView._emitChange ).toHaveBeenCalledWith( item, 'font-size', '12px' );
		});

		it('should respond to segmented button view events', function() {
			var item = new Item({ title: "My Item" });
			// var event = document.createEvent('CustomEvent');
			// event.initCustomEvent('Columns.StyleSegmentedButtonView.ValueDidUpdateForPropertyAndItem', false, false, {
			// 	item: 	item,
			// 	property: 'font-size',
			// 	value: 	'12px'
			// });

			// document.dispatchEvent( event );
			ColumnsEvent.send( 'Columns.StyleSegmentedButtonView.ValueDidUpdateForPropertyAndItem', {
				item: 	item,
				property: 'font-size',
				value: 	'12px'
			});

			expect( this.styleView._emitChange ).toHaveBeenCalledWith( item, 'font-size', '12px' );
		});

		it('should respond to multiple segmented button view events', function() {
			var item = new Item({ title: "My Item" });
			// var event = document.createEvent('CustomEvent');
			// event.initCustomEvent('Columns.StyleMultipleSegmentedButtonView.ValueDidUpdateForPropertyAndItem', false, false, {
			// 	item: 	item,
			// 	property: 'font-size',
			// 	value: 	'12px'
			// });

			// document.dispatchEvent( event );
			ColumnsEvent.send('Columns.StyleMultipleSegmentedButtonView.ValueDidUpdateForPropertyAndItem', {
				item: 	item,
				property: 'font-size',
				value: 	'12px'
			});

			expect( this.styleView._emitChange ).toHaveBeenCalledWith( item, 'font-size', '12px' );
		});
	});

	describe('Emitting Change Events', function() {

		beforeEach(function() {
			this.styleView = new StyleView();
			spyOn( ColumnsEvent, 'send' );
		});

		it('should alert the app of the style changes for a TemplateGroupView', function() {
			var item = new TemplateGroupView();
			this.styleView._emitChange( item, 'align-items', 'center' );
			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.StyleView.PropertyDidUpdateWithValueForGroupView');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].groupView ).toEqual( item );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].property ).toBe( 'align-items' );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].value ).toBe( 'center' );
		});

		it('should alert the app of the style changes for an Item', function() {
			var item = new Item({ title: "My Item" });
			this.styleView._emitChange( item, 'text-align', 'left' );
			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.StyleView.PropertyDidUpdateWithValueForItem');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].item ).toEqual( item );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].property ).toBe( 'text-align' );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].value ).toBe( 'left' );
		});

		it('should do nothing if the item is not a TemplateGroupView or Item', function() {
			var item = 'Hi';
			this.styleView._emitChange( item, 'text-align', 'left' );
			expect( ColumnsEvent.send ).not.toHaveBeenCalled();
		});
	});
});
},{"../../javascripts/controllers/StyleView.js":13,"../../javascripts/models/ColumnsEvent.js":20}],37:[function(require,module,exports){
var ColumnsEvent 		= require('../../javascripts/models/ColumnsEvent.js');

jasmine.getFixtures().fixturesPath = 'specs/fixtures';

describe('Template Group View', function() {

	afterEach(function() {
		ColumnsEvent.offAll();
	});

	describe('Initialization', function() {

		beforeEach(function() {
			this.layout = [{
				property:'flex-direction',
				value: 'row'
			}, {
				property: 'justify-content',
				value: 'flex-start'
			}, {
				property: 'align-items',
				value: 'center'
			}];
			this.style = new Style([{
				property: 'padding',
				value: '12px'
			}])
		});

		it('should initialize without any properties', function() {
			var group = new TemplateGroupView();
			expect( group.layout ).toEqual( [] );
			expect( group.placeholder ).toBe( false );
		});

		it('should iniialize with a layout', function() {
			var group = new TemplateGroupView({ layout: this.layout });
			expect( group.layout ).toEqual( this.layout );
			expect( group.placeholder ).toBe( false );
		});

		it('should initialize with a style object', function() {
			var group = new TemplateGroupView({ layout: this.layout, style: this.style });
			expect( group.layout ).toEqual( this.layout );
			expect( group.placeholder ).toBe( false );
		});

		it('should optionally iniialize as a placeholder', function() {
			var group = new TemplateGroupView({ layout: this.layout, placeholder: true });
			expect( group.layout ).toEqual( this.layout );
			expect( group.placeholder ).toBe( true );
		});

		it('should initialize with the correct template', function()  {
			var group = new TemplateGroupView({ layout: this.layout });
			expect( group.template ).toEqual( Columns.Templates['templates/layout/row-group.hbs'] );
		});
	});

	describe('Generating Layout Objects', function() {

		it('should return a layout object given a jQuery object', function() {
			var $group = $('<div />').data({
				'align-items': 'center',
				'flex-direction': 'column'
			});
			expect( TemplateGroupView.layoutForGroup( $group ) ).toEqual([{
				property: 'align-items',
				value: 'center'
			}, {
				property: 'flex-direction',
				value: 'column'
			}]);
		});

		it('should throw an error if not passed a jQuery object', function() {
			expect(function() {
				TemplateGroupView.layoutForGroup( 'Hi' );
			}).toThrow("exception: group must be jQuery object");
		});
	});

	describe('Rendering', function() {

		beforeEach(function() {
			this.layout = [{
				property:'flex-direction',
				value: 'row'
			}, {
				property: 'justify-content',
				value: 'flex-start'
			}, {
				property: 'align-items',
				value: 'center'
			}]
			this.groupView = new TemplateGroupView({ layout: this.layout });
		});

		it('should render the group with the correct layout', function() {
			var $group = this.groupView.render();
			expect( $group.data('flex-direction') ).toBe('row');
			expect( $group.data('justify-content') ).toBe('flex-start');
			expect( $group.data('align-items') ).toBe('center');
		});

		it('should render as a placeholder when apppropriate', function() {
			var groupView = new TemplateGroupView({ layout: this.item, placeholder: true });
			var $group = groupView.render();
			expect( $group ).toHaveClass('placeholder');
		});

		it('should not render as a placeholder when normal', function() {
			var groupView = new TemplateGroupView( this.item, false );
			var $group = groupView.render();
			expect( $group ).not.toHaveClass('placeholder');
		});

		it('should create a reference to its UI', function() {
			var $group = this.groupView.render();
			expect( this.groupView.$group ).toEqual( $group );
		});
	});

	describe('Updating the Layout Object', function() {

		beforeEach(function() {
			this.groupView = new TemplateGroupView({
				layout: [{
					property:'flex-direction',
					value: 'row'
				}, {
					property: 'justify-content',
					value: 'flex-start'
				}, {
					property: 'align-items',
					value: 'center'
				}]
			});
		});

		it('should replace existing layouts', function() {
			this.groupView._mergeLayout( 'align-items', 'left' );
			expect( this.groupView.layout ).toEqual( [{
				property:'flex-direction',
				value: 'row'
			}, {
				property: 'justify-content',
				value: 'flex-start'
			}, {
				property: 'align-items',
				value: 'left'
			}] );
		});

		it('should append new layouts', function() {
			this.groupView._mergeLayout( 'flex-grow', '0' );
			expect( this.groupView.layout ).toEqual( [{
				property:'flex-direction',
				value: 'row'
			}, {
				property: 'justify-content',
				value: 'flex-start'
			}, {
				property: 'align-items',
				value: 'center'
			}, {
				property: 'flex-grow',
				value: '0'
			}] );
		});
	});

	describe('Updating the Group View', function() {

		beforeEach(function() {
			this.groupView = new TemplateGroupView({
				layout: [{
					property:'flex-direction',
					value: 'row'
				}, {
					property: 'justify-content',
					value: 'flex-start'
				}, {
					property: 'align-items',
					value: 'center'
				}]
			});
			this.groupView.render();
		});

		it('should render the item with the correct updated layout', function() {
			this.groupView.layout = [{
				property:'flex-direction',
				value: 'column'
			}, {
				property: 'justify-content',
				value: 'flex-start'
			}, {
				property: 'align-items',
				value: 'flex-end'
			}, {
				property: 'align-content',
				value: 'stretch'
			}];
			var $group = this.groupView.update();
			expect( $group.data('flex-direction') ).toBe('column');
			expect( $group.data('justify-content') ).toBe('flex-start');
			expect( $group.data('align-items') ).toBe('flex-end');
			expect( $group.data('align-content') ).toBe('stretch');

			expect( $group.attr('layout-flex-direction') ).toBe('column');
			expect( $group.attr('layout-justify-content') ).toBe('flex-start');
			expect( $group.attr('layout-align-items') ).toBe('flex-end');
			expect( $group.attr('layout-align-content') ).toBe('stretch');
		});

		it('should create a reference to its UI', function() {
			this.groupView.layout = [{
				property:'flex-direction',
				value: 'column'
			}, {
				property: 'justify-content',
				value: 'flex-start'
			}, {
				property: 'align-items',
				value: 'flex-end'
			}, {
				property: 'align-content',
				value: 'stretch'
			}];
			var $group = this.groupView.update();
			expect( this.groupView.$group ).toEqual( $group );
		});

		it('should emit an event once the update has finished', function() {
			spyOn( ColumnsEvent, 'send' );
			this.groupView.layout = [{
				property:'flex-direction',
				value: 'column'
			}, {
				property: 'justify-content',
				value: 'flex-start'
			}, {
				property: 'align-items',
				value: 'flex-end'
			}, {
				property: 'align-content',
				value: 'stretch'
			}];
			this.groupView.update();
			expect( ColumnsEvent.send ).toHaveBeenCalled();
			expect( ColumnsEvent.send.calls.argsFor(0)[0]).toBe('Columns.TemplateGroupView.DidChange');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].groupView ).toEqual( this.groupView );
		});
	});	

	describe('Getting Group Titles', function() {

		beforeEach(function() {
			loadFixtures('template-bare.html');
			this.groupView = new TemplateGroupView();
			this.$group = this.groupView.render();
		})

		it('should return "Row" if the group is the first in the template', function() {
			$('.layout-template-row').append( this.$group );
			expect( this.groupView.title() ).toBe('Row');
		});

		it('should return "Group" for any other group', function() {
			$('.layout-template-row-group').append( this.$group );
			expect( this.groupView.title() ).toBe('Group');
		});
	});

	describe('Getting Layout Values for Group', function() {

		beforeEach(function() {
			this.groupView = new TemplateGroupView({
				layout: [{
					property:'flex-direction',
					value: 'row'
				}, {
					property: 'justify-content',
					value: 'flex-start'
				}, {
					property: 'align-items',
					value: 'center'
				}],
				style: [{
					property: 'font-size',
					value: '12px'
				}]
			});
			this.$group = this.groupView.render();
		});

		it('should return the correct layout value for an existing property', function() {
			expect( this.groupView.getStyle( 'align-items' ) ).toBe('center');
		});

		it('should return the style value of a property if it is not part of the layout object', function() {
			expect( this.groupView.getStyle( 'font-size' ) ).toBe('12px');
		});

		it('should return the default css value of a property that is not part of the layout or style objects', function() {
			expect( this.groupView.getStyle( 'text-align' ) ).toBe( '' );
		});

		xit('should return undefined for a property that does not exist for the group', function() {
			expect( this.groupView.getStyle( 'text-align' ) ).toBeUndefined();
		});
	});

	describe('Responding to Events', function() {

		beforeEach(function() {
			this.layout = [{
				property:'flex-direction',
				value: 'row'
			}, {
				property: 'justify-content',
				value: 'flex-start'
			}, {
				property: 'align-items',
				value: 'center'
			}];
			this.groupView = new TemplateGroupView({ layout: this.layout });
			this.groupView.render();
			spyOn( this.groupView, '_mergeLayout');
			spyOn( this.groupView, 'update');
		});

		it('should respond to layout change events for itself', function() {
			// var event = document.createEvent('CustomEvent');
			// event.initCustomEvent('Columns.StyleView.PropertyDidUpdateWithValueForGroupView', false, false, {
			// 	groupView: this.groupView,
			// 	property: 'align-items',
			// 	value: 'left'
			// });
			// document.dispatchEvent( event );
			ColumnsEvent.send('Columns.StyleView.PropertyDidUpdateWithValueForGroupView', {
				groupView: this.groupView,
				property: 'align-items',
				value: 'left'
			});

			expect( this.groupView._mergeLayout ).toHaveBeenCalledWith( 'align-items', 'left' );
			expect( this.groupView.update ).toHaveBeenCalled();
		});

		it('should ignore change events for other groups', function() {
			var newGroupView = new TemplateGroupView( this.layout );
			// var event = document.createEvent('CustomEvent');
			// event.initCustomEvent('Columns.StyleView.PropertyDidUpdateWithValueForGroupView', false, false, {
			// 	groupView: newGroupView,
			// 	property: 'align-items',
			// 	value: 'left'
			// });
			// document.dispatchEvent( event );
			ColumnsEvent.send('Columns.StyleView.PropertyDidUpdateWithValueForGroupView', {
				groupView: newGroupView,
				property: 'align-items',
				value: 'left'
			});

			expect( this.groupView._mergeLayout ).not.toHaveBeenCalled();
			expect( this.groupView.update ).not.toHaveBeenCalled();
		});
	});

	describe('Dropping', function() {

		beforeEach(function() {
			this.groupView	= new TemplateGroupView({
				layout: [{
					property:'flex-direction',
					value: 'row'
				}, {
					property: 'justify-content',
					value: 'flex-start'
				}, {
					property: 'align-items',
					value: 'center'
				}]
			});
			this.$group		= this.groupView.render();
			this.valueView 	= new TemplateValueView( new Item({ title: "My Item" }) );
			this.fakeUI		= {
				droppable: this.valueView
			};

			spyOn( ColumnsEvent, 'send' );
		});

		it('should be droppable', function() {
			expect( this.$group.droppable('instance') ).toBeDefined();
		});

		it('should emit an event on drop over', function() {
			this.$group.trigger('dropover', this.fakeUI);
			expect( ColumnsEvent.send.calls.argsFor(0)[0]).toBe('Columns.TemplateGroupView.GroupDidBeginDropOverWithValueView');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].groupView ).toEqual( this.groupView );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].valueView ).toEqual( this.valueView );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].ui ).toEqual( this.fakeUI );
		});

		it('should emit an event on drop out', function() {
			this.$group.trigger('dropout', this.fakeUI);
			expect( ColumnsEvent.send.calls.argsFor(0)[0]).toBe('Columns.TemplateGroupView.GroupDidEndDropOverWithValueView');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].groupView ).toEqual( this.groupView );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].valueView ).toEqual( this.valueView );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].ui ).toEqual( this.fakeUI );
		});

		it('should emit an event on drop', function() {
			this.$group.trigger('drop', this.fakeUI);
			expect( ColumnsEvent.send.calls.argsFor(0)[0]).toBe('Columns.TemplateGroupView.GroupDidDropWithValueView');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].groupView ).toEqual( this.groupView );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].valueView ).toEqual( this.valueView );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].ui ).toEqual( this.fakeUI );
		});
	});

	describe('Managing UI', function() {

		it('should remove inner placeholders', function() {
			var groupView 		= new TemplateGroupView();
			var $group 			= groupView.render();
			$group.append( readFixtures('inner-template-with-placeholders.html') );
			groupView.removePlaceholders();
			expect( $group.find('.layout-template-row-value').length ).toBe( 1 );
			expect( $group.find('.layout-template-row-group').length ).toBe( 0 );
		});
	});
});
},{"../../javascripts/models/ColumnsEvent.js":20}],38:[function(require,module,exports){
var ColumnsEvent 		= require('../../javascripts/models/ColumnsEvent.js');

describe('Template Value View', function() {

	afterEach(function() {
		ColumnsEvent.offAll();
	});

	describe('Initiation', function() {

		it('should initiate with an item', function() {
			var item = new Item({ title: "My Item" });
			var valueView = new TemplateValueView( item );
			expect( valueView.item ).toEqual( item );
		});

		it('should initiate without an item', function() {
			var valueView = new TemplateValueView();
			expect( valueView.itemId ).toBeUndefined();
		});

		it('should not accept anything other than an item', function() {
			expect(function() {
				new TemplateValueView({});
			})
			.toThrow("exception: item must be of type Item");
		});

		it('should initiate with the correct template', function() {
			var valueView = new TemplateValueView();
			expect( valueView.template ).toEqual( Columns.Templates['templates/layout/row-value.hbs'] );
		});

		it('should optionally instaniate as a placeholder', function() {
			var item = new Item({ title: "My Item" });
			var valueView = new TemplateValueView( item, true );
			expect( valueView.placeholder ).toBe( true );
		});
	});

	describe('Rendering', function() {
		
		beforeEach(function() {
			this.item = new Item({
				title: 'My Item',
				style: 'font-size:14px;color:#3a3a3a;margin-left:12px;'
			});
			this.valueView = new TemplateValueView( this.item );
		});

		it('should render the formatted item title', function() {
			var $value = this.valueView.render();
			expect( $value ).toContainText("My Item");
		});

		it('should render the item with the correct styling', function() {
			var $value = this.valueView.render();
			expect( $value ).toHaveCss({
				'font-size': 	'14px',
				'color': 		'rgb(58, 58, 58)',
				'margin-left': 	'12px'
			});
		});

		it('should render as a placeholder when apppropriate', function() {
			var valueView = new TemplateValueView( this.item, true );
			var $value = valueView.render();
			expect( $value ).toHaveClass('placeholder');
		});

		it('should not render as a placeholder when normal', function() {
			var valueView = new TemplateValueView( this.item );
			var $value = valueView.render();
			expect( $value ).not.toHaveClass('placeholder');
		});

		it('should create a reference to its UI', function() {
			var $value = this.valueView.render();
			expect( this.valueView.$value ).toEqual( $value );
		});
	});

	describe('Updating', function() {

		beforeEach(function() {
			this.valueView = new TemplateValueView( new Item({
				title: 'My Item',
				style: 'font-size:14px;color:#3a3a3a;margin-left:12px;'
			}));
			this.valueView.render();
		});

		it('should render the item with the correct updated styling', function() {
			this.valueView.item = new Item({
				title: 'My Item',
				style: 'font-size:16px;color:#888888;margin-left:14px;'
			});
			var $value = this.valueView.update();
			expect( $value ).toHaveCss({
				'font-size': 	'16px',
				'color': 		'rgb(136, 136, 136)',
				'margin-left': 	'14px'
			});
		});

		it('should create a reference to its UI', function() {
			this.valueView.item = new Item({
				title: 'My Item',
				style: 'font-size:16px;color:#888888;margin-left:14px;'
			});
			var $value = this.valueView.update();
			expect( this.valueView.$value ).toEqual( $value );
		});

		it('should emit an event once the update has finished', function() {
			spyOn( ColumnsEvent, 'send' );
			this.valueView.item = new Item({
				title: 'My Item',
				style: 'font-size:16px;color:#888888;margin-left:14px;'
			});
			var $value = this.valueView.update();
			expect( ColumnsEvent.send ).toHaveBeenCalled();
			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.TemplateValueView.DidChange');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].valueView ).toEqual( this.valueView );
		});
	});

	describe('Responding to Events', function() {

		beforeEach(function() {
			this.item = new Item({
				title: 'My Item',
				style: 'font-size:14px;color:#3a3a3a;margin-left:12px;'
			});
			this.valueView = new TemplateValueView( this.item );
			this.valueView.render();
			this.spy = spyOn(this.valueView, 'update');
		});

		it('should respond to Item change events for the item it owns', function() {
			var newItem = new Item({
				title: 'My Item',
				style: 'font-size:16px;color:#3a3a3a;margin-left:12px;'
			});

			// var event = document.createEvent('CustomEvent');
			// event.initCustomEvent('Columns.Item.DidChange', false, false, { item: newItem });
			// document.dispatchEvent( event );
			ColumnsEvent.send( 'Columns.Item.DidChange', { item: newItem } );

			expect( this.spy ).toHaveBeenCalled();
			expect( this.valueView.item ).toEqual( newItem );
		});

		it('should ignore Item change events for other items', function() {
			var newItem = new Item({
				title: 'Other Item',
				style: 'font-size:16px;color:#3a3a3a;margin-left:12px;'
			});

			// var event = document.createEvent('CustomEvent');
			// event.initCustomEvent('Columns.Item.DidChange', false, false, { item: newItem });
			// document.dispatchEvent( event );
			ColumnsEvent.send( 'Columns.Item.DidChange', { item: newItem } );

			expect( this.spy ).not.toHaveBeenCalled();
			expect( this.valueView.item ).toEqual( this.item );
		});

		it('should ignore item change events if it is a placeholder', function() {
			var item = new Item({
				title: 'My Item',
				style: 'font-size:14px;color:#3a3a3a;margin-left:12px;'
			});
			var valueView = new TemplateValueView( item, true );
			valueView.render();
			spyOn( valueView, 'update' );

			ColumnsEvent.send( 'Columns.Item.DidChange', { item: item } );

			expect( valueView.update ).not.toHaveBeenCalled();
		});
	});

	describe('Removing event listeners', function() {

		it('should no longer respond to item change events', function() {
			var item = new Item({
				title: 'My Item',
				style: 'font-size:14px;color:#3a3a3a;margin-left:12px;'
			});
			var valueView = new TemplateValueView( item );
			valueView.render();
			spyOn( valueView, 'update' );

			valueView._teardownEvents();
			ColumnsEvent.send( 'Columns.Item.DidChange', { item: item } );

			expect( valueView.update ).not.toHaveBeenCalled();
		});
	});

	describe('Dragging', function() {

		beforeEach(function() {
			this.valueView	= new TemplateValueView( new Item({ title: "My Item" }) );
			this.$value		= this.valueView.render();
			this.fakeUI		= {};

			spyOn( ColumnsEvent, 'send' );
		});

		it('should be draggable', function() {
			expect( this.$value.draggable('instance') ).toBeDefined();
		});

		describe('Drag Start', function() {

			it('should emit an event on drag start', function() {
				this.$value.trigger('dragstart', this.fakeUI);
				expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.TemplateValueView.ValueDidBeginDragWithItem');
				expect( ColumnsEvent.send.calls.argsFor(0)[1].valueView ).toEqual( this.valueView );
				expect( ColumnsEvent.send.calls.argsFor(0)[1].item ).toEqual( this.valueView.item );
				expect( ColumnsEvent.send.calls.argsFor(0)[1].ui ).toEqual( this.fakeUI );
			});

			it('should become inactive on drag start', function() {
				this.$value.trigger('dragstart', this.fakeUI);
				expect( this.valueView.$value ).toHaveClass('inactive');
			});
		});		

		describe('Drag', function() {

			it('should emit an event on drag', function() {
				this.$value.trigger('drag', this.fakeUI);
				expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.TemplateValueView.ValueDidDragWithItem');
				expect( ColumnsEvent.send.calls.argsFor(0)[1].valueView ).toEqual( this.valueView );
				expect( ColumnsEvent.send.calls.argsFor(0)[1].item ).toEqual( this.valueView.item );
				expect( ColumnsEvent.send.calls.argsFor(0)[1].ui ).toEqual( this.fakeUI );
			});
		});

		describe('Drag Stop', function() {

			it('should emit an event on drag stop', function() {
				this.$value.trigger('dragstop', this.fakeUI);
				expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.TemplateValueView.ValueDidEndDragWithItem');
				expect( ColumnsEvent.send.calls.argsFor(0)[1].valueView ).toEqual( this.valueView );
				expect( ColumnsEvent.send.calls.argsFor(0)[1].item ).toEqual( this.valueView.item );
				expect( ColumnsEvent.send.calls.argsFor(0)[1].ui ).toEqual( this.fakeUI );
			});

			xit('should no longer respond to events', function() {
				spyOn( this.valueView, '_teardownEvents' );
				this.$value.trigger('dragstop', this.fakeUI);
				expect( this.valueView._teardownEvents ).toHaveBeenCalled();
			});

			it('should remove itself from the template', function() {
				this.$value.trigger('drag', this.fakeUI);
				expect( this.valueView.$value ).not.toBeInDOM();
			});
		});
			
	});

	describe('Clicking', function() {

		beforeEach(function() {
			this.valueView	= new TemplateValueView( new Item({ title: "My Item" }) );
			this.$value		= this.valueView.render();
			spyOn( ColumnsEvent, 'send' );
		});

		it('should emit an event on click', function() {
			this.$value.trigger('click');
			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.TemplateValueView.ValueDidSelectWithItem');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].valueView ).toEqual( this.valueView );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].item ).toEqual( this.valueView.item );
		});

		it('should get selected on click', function() {
			this.$value.trigger('click');
			expect( this.$value ).toHaveClass('selected');
		});
	});

	// afterEach(function() {
	// 	document.removeEventListener( 'Columns.Item.DidChange', TemplateValueView._onItemDidChange.bind, false);
	// });
});
},{"../../javascripts/models/ColumnsEvent.js":20}],39:[function(require,module,exports){
var ColumnsEvent 		= require('../../javascripts/models/ColumnsEvent.js');
var ColumnsAnalytics 	= require('../../javascripts/models/ColumnsAnalytics.js');
var Layout 				= require('../../javascripts/models/Layout.js');
var Table 				= require('../../javascripts/models/Table.js');
var TemplateView 		= require('../../javascripts/controllers/TemplateView.js');
var ItemView 			= require('../../javascripts/controllers/ItemView.js');

jasmine.getFixtures().fixturesPath = 'specs/fixtures';

describe('Template View', function() {

	beforeEach(function() {
		spyOn( ColumnsAnalytics, 'send' );
		this.defaultLayout = new Layout([
			new Item({
				title: 'First Name',
				style: new Style([{
					property: 'color',
					value: '#3a3a3a'
				}])
			}),
			new Item({
				title: 'Hometown',
				style: new Style([{
					property: 'color',
					value: '#3a3a3a'
				}])
			}),
			new Item({
				title: 'Age',
				style: new Style([{
					property: 'color',
					value: '#3a3a3a'
				}])
			})
		]);

		this.table = new Table({
			columns: [ "First Name", "Hometown", "Age" ]
		});
		
		// this.defaultLayout = {
		// 	type: 'group',
		// 	style: [{
		// 		property: 'padding',
		// 		value: '12px'
		// 	}],
		// 	values: [{
		// 		type: 'group',
		// 		layout: [{
		// 			property: 'flex-direction',
		// 			value: 'column'
		// 		}, {
		// 			property: 'align-items',
		// 			value: 'flex-start'
		// 		}],
		// 		values: [{
		// 			type: 'single',
		// 			item: new Item({
		// 				title: 'First Name',
		// 				style: new Style([{
		// 					property: 'color',
		// 					value: '#3a3a3a'
		// 				}])
		// 			})
		// 		},{
		// 			type: 'single',
		// 			item: new Item({
		// 				title: 'Hometown',
		// 				style: new Style([{
		// 					property: 'color',
		// 					value: '#888'
		// 				},{
		// 					property: 'font-size',
		// 					value: '14px'
		// 				}, {
		// 					property: 'margin-top',
		// 					value: '4px'
		// 				}])
		// 			})
		// 		}]
		// 	}, {
		// 		type: 'single',
		// 		item: new Item({
		// 			title: 'Age',
		// 			style: new Style([{
		// 				property: 'color',
		// 				value: '#3a3a3a'
		// 			},{
		// 				property: 'font-size',
		// 				value: '24px'
		// 			}])
		// 		})
		// 	}]
		// };
	});

	afterEach(function() {
		ColumnsEvent.offAll();
	});

	describe('Initialization', function() {

		it('should initialize with a layout object', function() {
			var templateView = new TemplateView( this.defaultLayout );
			expect( templateView.layout ).toEqual( this.defaultLayout );
		});

		it('should initialize without a layout object', function() {
			var templateView = new TemplateView();
			expect( templateView.layout ).toBeUndefined();
		});

		it('should initalize with the correct template', function() {
			var templateView = new TemplateView();
			expect( templateView.template ).toEqual( Columns.Templates['templates/layout/template.hbs'] );
		});

		it('should initialize with a droppable items array', function() {
			var templateView = new TemplateView();
			expect( templateView.droppableItems ).toEqual( [] );
		});

		xit('should initialize with an empty groups array', function() {
			var templateView = new TemplateView();
			expect( templateView.groups ).toEqual( [] );
		});
	});

	describe('Rendering', function() {

		beforeEach(function() {
			loadFixtures('layout.html');
			this.templateView = new TemplateView( this.defaultLayout );
			this.templateView.table = this.table;
		});

		describe('Preview Rendering', function() {
			it('should render the embeddable', function() {
				this.templateView._renderPreview();
				expect( $('#layout .layout-table-preview')[0] ).toBeInDOM();
			});

			it('should create reference to the preview', function() {
				var $preview = this.templateView._renderPreview();
				expect( this.templateView.$preview ).toEqual( $preview );
			});
		});

		describe('Template Rendering', function() {
			xit('should render the template', function() {
				this.templateView._renderTemplate();
				expect( $('#layout .layout-template')[0] ).toBeInDOM();
			});

			it('should kick off the rendering of components', function() {
				var layoutString = JSON.stringify( this.templateView.layout.model );
				spyOn( this.templateView, '_renderRowComponent' );
				this.templateView._renderTemplate();
				expect( JSON.stringify( this.templateView._renderRowComponent.calls.argsFor(0)[0] ) ).toBe( layoutString );
			});

			it('should create a reference to the rendered template', function() {
				var $template = this.templateView._renderTemplate();
				expect( $template ).toEqual( this.templateView.$template );
			});

			it('should emit a change event', function() {
				spyOn( this.templateView, '_emitChange' );
				this.templateView._renderTemplate();
				expect( this.templateView._emitChange ).toHaveBeenCalled();
			});

			it('should emit a render event', function() {
				spyOn( this.templateView, '_emitRender' );
				this.templateView._renderTemplate();
				expect( this.templateView._emitRender ).toHaveBeenCalled();
			});
		});

		describe('Component Rendering', function() {

			it('should render the correct number of groups', function() {
				var $template = this.templateView._renderTemplate();
				expect( $template.find('.layout-template-row-group').length ).toBe(2);
			});

			it('should add the groups to the master array', function() {
				var $template = this.templateView._renderTemplate();
				expect( TemplateView.groups.length ).toBe(2);
			});

			it('should render the correct number of values', function() {
				var $template = this.templateView._renderTemplate();
				expect( $template.find('.layout-template-row-value').length ).toBe(3);
			});

			it('should nest the groups and values properly', function() {
				var $template = this.templateView._renderTemplate();
				expect( $template.find('.layout-template-row-value').parent() ).toHaveClass('layout-template-row-group');
				expect( $template.find('.layout-template-row-group').parent().first() ).toHaveClass('layout-template-row');
				expect( $template.find('.layout-template-row-group').eq(1).parent() ).toHaveClass('layout-template-row-group');
			});
		});

		describe('Overall Rendering', function() {

			it('should render the preview', function() {
				spyOn( this.templateView, '_renderPreview' );
				this.templateView.render();
				expect( this.templateView._renderPreview ).toHaveBeenCalled();
			});

			it('should render the template', function() {
				spyOn( this.templateView, '_renderTemplate' );
				this.templateView.render();
				expect( this.templateView._renderTemplate ).toHaveBeenCalled();
			});
		});
	});

	describe('Template Management', function() {

		describe('Getting a TemplateGroupView for a jquery group element', function() {
			var groups = [];

			beforeEach(function() {
				var group1 = new TemplateGroupView({
					layout: [{
						property:'flex-direction',
						value: 'row'
					}, {
						property: 'justify-content',
						value: 'flex-start'
					}, {
						property: 'align-items',
						value: 'center'
					}]
				});

				var group2 = new TemplateGroupView({
					layout: [{
						property:'flex-direction',
						value: 'row'
					}, {
						property: 'justify-content',
						value: 'flex-start'
					}, {
						property: 'align-items',
						value: 'center'
					}]
				});

				this.$group1 = group1.render();
				this.$group2 = group2.render();

				groups = [ group1, group2 ];
				TemplateView.groups = groups;
			});

			it('should return the correct group given a jquery group element', function() {
				expect( TemplateView.getGroupViewForGroup( this.$group2 ) ).toEqual( groups[ 1 ] );
				expect( TemplateView.getGroupViewForGroup( this.$group1 ) ).toEqual( groups[ 0 ] );
			});

			it('should return the correct group if given a TemplateGroupView', function() {
				expect( TemplateView.getGroupViewForGroup( groups[ 1 ] ) ).toEqual( groups[ 1 ] );
				expect( TemplateView.getGroupViewForGroup( groups[ 0 ] ) ).toEqual( groups[ 0 ] );
			});

			it('should return undefined if the group is not found', function() {
				expect( TemplateView.getGroupViewForGroup( new TemplateGroupView() ) ).toBeUndefined();
			});

			it('should throw an error if passed anything other than a jquery object or TemplateGroupView', function() {
				expect(function() {
					TemplateView.getGroupViewForGroup( 'hi' );
				}).toThrow("exception: group must be TemplateGroupView or jQuery object");
			});
		});

		describe('Removing Groups', function() {
			var groups = [];

			beforeEach(function() {
				var group1 = new TemplateGroupView({
					layout: [{
						property:'flex-direction',
						value: 'row'
					}, {
						property: 'justify-content',
						value: 'flex-start'
					}, {
						property: 'align-items',
						value: 'center'
					}]
				});

				var group2 = new TemplateGroupView({
					layout: [{
						property:'flex-direction',
						value: 'row'
					}, {
						property: 'justify-content',
						value: 'flex-start'
					}, {
						property: 'align-items',
						value: 'center'
					}]
				});

				this.$group1 = group1.render();
				this.$group2 = group2.render();

				groups = [ group1, group2 ];
				TemplateView.groups = [
					group1, group2
				];
			});

			it('should remove the TemplateGroupViews associated with the passed in jquery objects from the groups array', function() {
				TemplateView.removeGroup( this.$group1 );
				expect( TemplateView.groups.indexOf( groups[ 0 ] ) ).toBe( -1 );
			});

			it('should remove the TemplateGroupViews from the groups array', function() {
				TemplateView.removeGroup( groups[ 0 ] );
				expect( TemplateView.groups.indexOf( groups[ 0 ] ) ).toBe( -1 );
			});

			it('should ignore values that are not jquery objects or TemplateGroupViews', function() {
				TemplateView.removeGroup( 'hi' );
				expect( TemplateView.groups.length ).toBe( 2 );
			});

			it('should ignore objects that are not in the groups array', function() {
				TemplateView.removeGroup( new TemplateGroupView() );
				expect( TemplateView.groups.length ).toBe( 2 );
			});

			it('should notify the group that it is about to be removed', function() {
				spyOn( ColumnsEvent, 'send' );
				TemplateView.removeGroup( groups[ 0 ] );

				expect( ColumnsEvent.send ).toHaveBeenCalled();
				expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.TemplateView.WillRemoveGroupView');
				expect( ColumnsEvent.send.calls.argsFor(0)[1].groupView ).toEqual( groups[ 0 ] );
			});
		});

		describe('Removing Placeholders', function() {

			beforeEach(function() {
				loadFixtures('template-with-placeholders.html');
				this.templateView = new TemplateView();
			});

			it('should remove placeholders', function() {
				this.templateView.removePlaceholders();
				expect( $('.layout-template-row-value.placeholder').length ).toBe( 0 );
				expect( $('.layout-template-row-group.placeholder').length ).toBe( 0 );
			});

			it('should preserve non-placeholder values of placeholder groups', function() {
				this.templateView.removePlaceholders();
				expect( $('.layout-template-row-value').length ).toBe( 1 );
			});
		});

		// This is used once a user starts to drag a template value.
		// If that value leaves a single other value its former group, we should remove that group.
		// The only exception is if the group is the master group for the row (i.e. the first group)
		describe('Dissolving Groups with A Single Value', function() {

			beforeEach(function() {
				loadFixtures('template-with-lonely-group.html');
				this.templateView = new TemplateView();
				TemplateView.groups.push( this.templateView );
				spyOn( TemplateView, 'removeGroup' );
			});

			it('should dissolve any groups that only have a single non-dragging value', function() {
				this.templateView.dissolveSingleValueGroups();
				expect( $('.lonely').parents(".layout-template-row-group").length ).toBe( 1 );
			});

			it('should remove those groups from the array of groups in the template', function() {
				this.templateView.dissolveSingleValueGroups();
				// expect( TemplateView.removeGroup ).toHaveBeenCalledWith( $('.lonely-group') );
				expect( TemplateView.removeGroup ).toHaveBeenCalled();
			});
		});

		// We want to do this when a user
		// drags a value out of the tempate
		describe('Removing a Value', function() {

			beforeEach(function( done ) {
				this.templateView = new TemplateView();
				// loadFixtures('template-without-placeholders.html');
				loadFixtures('items.html');
				appendLoadFixtures('template-with-dragging-value.html');

				spyOn( this.templateView, '_emitChange' );
				this.templateView.removeDraggingValue();

				setTimeout(function() {
					done();
				}, 400 );
			});

			// xit('should remove a dragging value from the template when the current dragging item is a value view', function() {
			// 	var item = new Item({ title: "My Item" });
			// 	var valueView = new TemplateValueView( item, false );
			// 	var $value = valueView.render();
			// 	$('.layout-template-row-group').first().append( $value );
			// 	expect( $value ).toBeInDOM();
			// 	this.templateView.removeValue( valueView );
			// 	expect( $value ).not.toBeInDOM();
			// });

			// xit('should animate the value helper to the location of its item view counterpart', function( done ) {
			// 	var valueOffset = $('#columns .layout-column').eq( 0 ).offset(),
			// 		itemOffset = $('#columns .layout-column').eq( 1 ).offset();

			// 	expect( valueOffset ).toEqual( itemOffset );
			// 	done();
			// });

			xit('should emit a change event', function( done ) {
				expect( this.templateView._emitChange ).toHaveBeenCalled();
				done();
			});

			// xit('should throw an error when not passed a value view', function() {
			// 	var item = new Item({ title: "My Item" });
			// 	var itemView = new ItemView( item );
			// 	expect(function() {
			// 		this.templateView.removeValue( itemView );
			// 	}.bind(this) )
			// 	.toThrow("exception: value must be of type TemplateValueView");
			// });
		});

		describe('Inserting a New Value', function() {

			beforeEach(function() {
				loadFixtures('template-without-placeholders.html');
				this.templateView = new TemplateView( this.defaultLayout );
			});

			describe('Getting Positioning Information for a Given Value', function() {

				beforeEach(function() {
					this.$value = new TemplateValueView( new Item({ title: "My Item" }) ).render();
					this.$value.css({
						position: 'absolute',
						top: '50px',
						left: '26px',
						width: '46px',
						height: '24px'
					});
				});

				it('should determine values for all edges and the item middle with a default buffer and parent direction', function() {
					var $group = new TemplateGroupView().render();
					$group.append( this.$value );
					$('.layout-template-row-group').first().append( $group );

					var value = this.templateView.dimensionsForValue( this.$value );
					expect( value.top ).toBe( 50 );
					expect( value.left ).toBe( 26 );
					expect( value.bottom ).toBe( 74 );
					expect( value.right ).toBe( 72 );
					expect( value.middleX ).toBe( 49 );
					expect( value.middleY ).toBe( 62 );
					expect( value.dragMiddleX ).toBe( 49 );
					expect( value.dragMiddleY ).toBe( 62 );
					expect( value.dragMiddle ).toBe( 49 );
					expect( value.bufferTop ).toBe( 50 );
					expect( value.bufferLeft ).toBe( 35.2 );
					expect( value.bufferBottom ).toBe( 74 );
					expect( value.bufferRight ).toBe( 62.8 );
				});

				it('should determine values for all edges and the item middle with a given buffer and parent direction', function() {
					var $group = new TemplateGroupView({ layout: [{
						property: 	'flex-direction',
						value: 		'column'
					}] }).render();
					$group.append( this.$value );
					$('.layout-template-row-group').first().append( $group );

					var value = this.templateView.dimensionsForValue( this.$value, 0.6, 0.4 );
					expect( value.top ).toBe( 50 );
					expect( value.left ).toBe( 26 );
					expect( value.bottom ).toBe( 74 );
					expect( value.right ).toBe( 72 );
					expect( value.middleX ).toBe( 49 );
					expect( value.middleY ).toBe( 62 );
					expect( value.dragMiddleX ).toBe( 26 + this.$value.width() * 0.6 );
					expect( value.dragMiddleY ).toBe( 50 + this.$value.height() * 0.6 );
					expect( value.dragMiddle ).toBe( 50 + this.$value.height() * 0.6 );
					expect( value.bufferTop ).toBe( 50 + this.$value.height() * 0.4 );
					expect( value.bufferLeft ).toBe( 26 );
					expect( value.bufferBottom ).toBe( 74 - this.$value.height() * 0.4 );
					expect( value.bufferRight ).toBe( 72 );
				});
			});

			describe('Testing Whether A Drag Intersects A Value', function() {

				beforeEach(function() {
					this.values = {
						top: 			50,
						left: 			26,
						bottom: 		74,
						right: 			72,
						middleX: 		49,
						middleY: 		62,
						dragMiddleX: 	49,
						dragMiddleY: 	62,
						bufferTop: 		50,
						bufferLeft: 	35.2,
						bufferBottom: 	74,
						bufferRight: 	62.8
					};
					this.event = document.createEvent("MouseEvent");
				});

				it('should return true if the drag event is entirely inside the buffered item', function() {
					this.event.initMouseEvent( "mousemove", true, true, window, 1, 800, 600, 40, 60, false, false, false, false, 0, null );
					expect( this.templateView.isIntersected( this.values, this.event ) ).toBe( true );
				});

				it('should return false if the drag event is above the buffered item', function() {
					this.event.initMouseEvent( "mousemove", true, true, window, 1, 800, 600, 40, 40, false, false, false, false, 0, null );
					expect( this.templateView.isIntersected( this.values, this.event ) ).toBe( false );
				});

				it('should return false if the drag event is below the buffered item', function() {
					this.event.initMouseEvent( "mousemove", true, true, window, 1, 800, 600, 40, 80, false, false, false, false, 0, null );
					expect( this.templateView.isIntersected( this.values, this.event ) ).toBe( false );
				});

				it('should return false if the drag event is left of the buffered item', function() {
					this.event.initMouseEvent( "mousemove", true, true, window, 1, 800, 600, 30, 60, false, false, false, false, 0, null );
					expect( this.templateView.isIntersected( this.values, this.event ) ).toBe( false );
				});

				it('should return false if the drag event is right of the buffered item', function() {
					this.event.initMouseEvent( "mousemove", true, true, window, 1, 800, 600, 70, 60, false, false, false, false, 0, null );
					expect( this.templateView.isIntersected( this.values, this.event ) ).toBe( false );
				});

			});

			describe('Wrapping Existing Values with a New Group', function() {

				beforeEach(function() {
					this.$value = new TemplateValueView( new Item({ title: "My Item" }) ).render();
					this.$value.css({
						position: 'absolute',
						top: '50px',
						left: '26px',
						width: '46px',
						height: '24px'
					});
					$('.layout-template-row-group').first().append( this.$value );
				});

				it('should render a group with the value inside', function() {
					this.templateView.wrapValueWithGroup( this.$value );
					expect( this.$value.parent().parent().parent() ).toEqual('.layout-template-row');
				});

				it('should render the group with the correct layout direction', function() {
					this.templateView.wrapValueWithGroup( this.$value );
					expect( this.$value.parent().data('flex-direction') ).toBe('column');
				});

				it('should render the group with the correct placeholder status', function() {
					this.templateView.wrapValueWithGroup( this.$value, true );
					expect( this.$value.parent() ).toHaveClass('placeholder');
				});

				it('should add the group to the groups array if not a placeholder', function() {
					this.templateView.wrapValueWithGroup( this.$value );
					expect( TemplateView.groups.length ).toBe( 1 );
				});
			});

			describe('Testing Whether an Existing Value is to the Left of a Drag', function() {
				beforeEach(function() {
					this.values = {
						top: 			50,
						left: 			26,
						bottom: 		74,
						right: 			72,
						middleX: 		49,
						middleY: 		62,
						dragMiddleX: 	49,
						dragMiddleY: 	62,
						dragMiddle: 	49,
						bufferTop: 		50,
						bufferLeft: 	35.2,
						bufferBottom: 	74,
						bufferRight: 	62.8
					};
					this.event = document.createEvent("MouseEvent");
				});

				it('should return true if the drag event is after the item drag threshold point', function() {
					this.event.initMouseEvent( "mousemove", true, true, window, 1, 800, 600, 50, 60, false, false, false, false, 0, null );
					expect( this.templateView.isPrevious( this.values, this.event.clientX ) ).toBe( true );
				});

				it('should return false if the drag event is before the item drag threshold point', function() {
					this.event.initMouseEvent( "mousemove", true, true, window, 1, 800, 600, 40, 40, false, false, false, false, 0, null );
					expect( this.templateView.isPrevious( this.values, this.event.clientX ) ).toBe( false );
				});
			});

			describe('Positioning the New Value', function() {

				beforeEach(function() {
					this.dropSpy = spyOn( this.templateView, 'insertDropBeforeElementInParentWithPlaceholder' );
					jasmine.getFixtures().cleanUp();
					loadFixtures('template-bare.html');
				});

				it('should do nothing if the parent is undefined', function() {
					// Create mouse event coordinates that we know will be inside the group
					// and set up the currently dragging item
					var item = new Item({ title: "My Item "});
					var $group = $('.layout-template-row-group');
					var event = {
						clientX: $group.offset().left + ( $group.width() / 2 ),
						clientY: $group.offset().top + ( $group.height() / 2 )
					};	

					this.draggingItem = item;
					this.templateView.positionDropForDragEventInParentWithPlaceholder( event, undefined, false );
					expect( this.dropSpy ).not.toHaveBeenCalled();
				});

				it('should position the new value at the beginning of the template if there are no other values', function() {
					// Create mouse event coordinates that we know will be inside the group
					// and set up the currently dragging item
					var item = new Item({ title: "My Item "});
					var $group = $('.layout-template-row-group');
					var event = {
						clientX: $group.offset().left + ( $group.width() / 2 ),
						clientY: $group.offset().top + ( $group.height() / 2 )
					};	

					this.templateView.draggingItem = item;
					this.templateView.positionDropForDragEventInParentWithPlaceholder( event, $group, false );
					expect( this.dropSpy ).toHaveBeenCalledWith( item, null, $group, false );
				});

				it('should position the new value after the correct existing item', function() {
					// Add a value to the group
					var $group = $('.layout-template-row-group').first();
					var $value = new TemplateValueView( new Item({ title: "My Existing Item"}) ).render();
					$group.append( $value );

					// Create mouse event coordinates that we know will be after the existing value view
					// and set up the currently dragging item
					var item = new Item({ title: "My Item "});
					var event = {
						clientX: $value.offset().left + ( $value.width() * .6 ),
						clientY: $value.offset().top + ( $value.height() * 2 )
					};

					this.templateView.draggingItem = item;
					this.templateView.positionDropForDragEventInParentWithPlaceholder( event, $group, false );
					expect( this.dropSpy ).toHaveBeenCalledWith( item, $value, $group, false );

				});

				it('should create a new group if the new value itersects an existing value', function() {
					// Add a value to the group
					var $group = $('.layout-template-row-group').first();
					var $value = new TemplateValueView( new Item({ title: "My Existing Item"}) ).render();
					$group.append( $value );

					// Create mouse event coordinates that we know will be after the existing value view
					// and set up the currently dragging item
					var item = new Item({ title: "My Item "});
					var event = {
						clientX: $value.offset().left + ( $value.width() * .6 ),
						clientY: $value.offset().top + ( $value.height() * .6 )
					};

					this.templateView.draggingItem = item;
					this.templateView.positionDropForDragEventInParentWithPlaceholder( event, $group, false );
					expect( this.dropSpy ).toHaveBeenCalledWith( item, $value, $('.layout-template-row-group').eq( 1 ), false );
				});

				it('should position the new value in a new group before the other item when appropriate', function() {
					// Add a value to the group
					var $group = $('.layout-template-row-group').first();
					var $value = new TemplateValueView( new Item({ title: "My Existing Item"}) ).render();
					$group.append( $value );

					// Create mouse event coordinates that we know will be after the existing value view
					// and set up the currently dragging item
					var item = new Item({ title: "My Item "});
					var event = {
						clientX: $value.offset().left + ( $value.width() * .2 ),
						clientY: $value.offset().top + ( $value.height() * .2 )
					};

					this.templateView.draggingItem = item;
					this.templateView.positionDropForDragEventInParentWithPlaceholder( event, $group, false );
					expect( this.dropSpy ).toHaveBeenCalledWith( item, null, $('.layout-template-row-group').eq( 1 ), false );
				});
			});

			describe('Inserting a New Value', function() {

				beforeEach(function() {
					this.item 		= new Item({ title: "My Item" });
					this.$group 	= new TemplateGroupView().render();
					this.$previous 	= new TemplateValueView( new Item({ title: "Other Item" }) ).render();
					spyOn( this.templateView, '_emitChange' );
				});

				it('should place the new value as the first child of the parent if the previous item is null', function() {
					this.templateView.insertDropBeforeElementInParentWithPlaceholder( this.item, null, this.$group, false );
					expect( this.$group.children().eq( 0 ) ).toContainText("My Item");
				});

				it('should place the new value after the previous item if it is not null', function() {
					this.$group.append( this.$previous );
					this.templateView.insertDropBeforeElementInParentWithPlaceholder( this.item, this.$previous, this.$group, false );
					expect( this.$group.children().eq( 1 ) ).toContainText("My Item");
				});

				it('should create the new item as a placeholder if appropriate', function() {
					this.$group.append( this.$previous );
					this.templateView.insertDropBeforeElementInParentWithPlaceholder( this.item, this.$previous, this.$group, true );
					expect( this.$group.children().eq( 1 ) ).toHaveClass("placeholder");
				});

				it('should not create the new item as a placeholder when appropriate', function() {
					this.$group.append( this.$previous );
					this.templateView.insertDropBeforeElementInParentWithPlaceholder( this.item, this.$previous, this.$group, false );
					expect( this.$group.children().eq( 1 ) ).not.toHaveClass("placeholder");
				});

				it('should emit a change event if the new item is not a placeholder', function() {
					this.$group.append( this.$previous );
					this.templateView.insertDropBeforeElementInParentWithPlaceholder( this.item, this.$previous, this.$group, false );

					expect( this.templateView._emitChange ).toHaveBeenCalled();
				});

				xit('should send an analytics event about the new item when not a placeholder', function() {

				});
			});
		});
	});

	describe('Responding to Item Drags', function() {
		var event = {};

		beforeEach(function() {
			this.templateView = new TemplateView( this.defaultLayout );
			this.templateView.table = this.table;
			this.templateView.render();
		});

		describe('Drag Start', function() {

			beforeEach(function() {
				this.newItem = new Item({ title: "My Item" });
				this.newItemView = new ItemView( this.newItem );
				// this.event = document.createEvent('CustomEvent');
				// this.event.initCustomEvent('Columns.ItemView.ItemDidBeginDrag', false, false, {
				// 	item: 	this.newItemView,
				// 	event: 	event,
				// 	ui: 	{}
				// });
			});

			it('should update the current dragging item', function() {
				ColumnsEvent.send('Columns.ItemView.ItemDidBeginDrag', {
					item: 	this.newItemView,
					event: 	event,
					ui: 	{}
				});
				expect( this.templateView.draggingItem ).toEqual( this.newItem );
			});
		});

		describe('Drag Stop', function() {
			beforeEach(function() {
				this.newItem = new Item({ title: "My Item" });
				// this.event = document.createEvent('CustomEvent');
				// this.event.initCustomEvent('Columns.ItemView.ItemDidEndDrag', false, false, {
				// 	item: 	this.newItem,
				// 	event: 	event,
				// 	ui: 	{}
				// });

				spyOn( this.templateView, 'removePlaceholders');
			});

			it('should remove any placeholders', function() {
				ColumnsEvent.send('Columns.ItemView.ItemDidEndDrag', {
					item: 	this.newItem,
					event: 	event,
					ui: 	{}
				});
				expect( this.templateView.removePlaceholders ).toHaveBeenCalled();
			});

			it('should reset the dragging item', function() {
				ColumnsEvent.send('Columns.ItemView.ItemDidEndDrag', {
					item: 	this.newItem,
					event: 	event,
					ui: 	{}
				});
				expect( this.templateView.draggingItem ).toBeUndefined();
			});
		});

		describe('Drag', function() {
			beforeEach(function() {
				var event = {};
				this.newItem = new Item({ title: "My Item" });
				// this.event = document.createEvent('CustomEvent');
				// this.event.initCustomEvent('Columns.ItemView.ItemDidDrag', false, false, {
				// 	item: 	this.newItem,
				// 	event: 	event,
				// 	ui: 	{}
				// });

				spyOn( this.templateView, 'removePlaceholders' );
				this.positionSpy = spyOn( this.templateView, 'positionDropForDragEventInParentWithPlaceholder' );
			});

			it('should remove existing placeholders and set up new ones if there is an active droppable item', function() {
				var groupView	 	= new TemplateGroupView();
				var $group 			= groupView.render();
				var item 	 		= new Item({ title: "My Item"});
				this.templateView.draggingItem = item;
				this.templateView.droppableItems.push( groupView );

				ColumnsEvent.send('Columns.ItemView.ItemDidDrag', {
					item: 	this.newItem,
					event: 	event,
					ui: 	{}
				});

				expect( this.templateView.removePlaceholders ).toHaveBeenCalled();
				expect( this.positionSpy.calls.argsFor(0)[0] ).toEqual( event );
				expect( this.positionSpy.calls.argsFor(0)[1] ).toEqual( $group );
				expect( this.positionSpy.calls.argsFor(0)[2] ).toBe( true );
			});

			it('should do nothing if there is no active droppable item', function() {
				ColumnsEvent.send('Columns.ItemView.ItemDidDrag', {
					item: 	this.newItem,
					event: 	event,
					ui: 	{}
				});

				expect( this.templateView.removePlaceholders ).not.toHaveBeenCalled();
				expect( this.positionSpy ).not.toHaveBeenCalled();
			});
		});
	});

	describe('Responding to Table Events', function() {

		beforeEach(function() {
			this.templateView = new TemplateView();
		});

		it('should render the template when the table is initially uploaded', function() {
			var table = new Table({ layout: new Layout() });
			spyOn( this.templateView, '_renderTemplate' );

			// var columnsEvent = document.createEvent('CustomEvent');
			// columnsEvent.initCustomEvent('Columns.Table.DidUploadWithSuccess', false, false, {
			// 	table: 	new Table({ layout: new Layout() })
			// });
			// document.dispatchEvent(columnsEvent);
			ColumnsEvent.send('Columns.Table.DidUploadWithSuccess', {
				table: 	table
			});

			expect( this.templateView.layout ).toEqual( new Layout() );
			expect( this.templateView.table ).toEqual( table );
			expect( this.templateView._renderTemplate ).toHaveBeenCalled();
		});
	});

	describe('Responding to Desktop App Events', function() {

		beforeEach(function() {
			this.templateView = new TemplateView();
		});

		it('should render the preview', function() {
			spyOn( this.templateView, '_renderPreview' );
			
			ColumnsEvent.send('Columns.DesktopView.DidRender', {
				desktopView: {}
			});

			expect( this.templateView._renderPreview ).toHaveBeenCalled();
		});
	});

	describe('Template Querying', function() {


		describe('Getting the value element for an Item', function() {

			beforeEach(function() {
				loadFixtures('template-with-values.html');
			});

			it('should return a jQuery object representing the template value view for the item', function() {
				var item = new Item({ title: "My Item" });
				expect( TemplateView.getValueForItem( item ) ).toBeInDOM();
			});

			it('should return undefined if the item does not exist in the template', function() {
				var item = new Item({ title: "No Item" });
				expect( TemplateView.getValueForItem( item ) ).toBeUndefined();
			});

			it('should only return DOM elements with the correct value class', function() {
				var item = new Item({ title: "My Item" });
				expect( TemplateView.getValueForItem( item ) ).toHaveClass('layout-template-row-value');
			});

			it('should throw an error if passing anything other than an Item', function() {
				expect(function() {
					TemplateView.getValueForItem( "hi" );
				}.bind( this ))
				.toThrow("expection: item must be of type Item");
			});
		});

		describe('Getting the group objects for an item', function() {

			beforeEach(function() {
				spyOn( TemplateView, 'getValueForItem' ).and.callThrough();
				spyOn( TemplateView, 'getGroupViewForGroup' );
			});

			it('should convert the item into a value jQuery object', function() {
				var item = new Item({ title: "My Item" });
				groups = TemplateView.getGroupsForItem( item );
				expect( TemplateView.getValueForItem ).toHaveBeenCalledWith( item );
			});

			xit('should return an array of TemplateGroupView objects for a value with parents', function() {
				var item = new Item({ title: "My Item" });
				// expect( TemplateView.getGroupsForItem( item ).$group ).toBeInDOM();
				expect( TemplateView.getGroupViewForGroup.calls.count() ).toBe( 2 );
			});

			xit('should return a minimum of one parent for the wrapper group', function() {
				var item = new Item({ title: "Lonely Item" });
				// expect( TemplateView.getGroupsForItem( item ).length ).toBe( 1 );
				expect( TemplateView.getGroupViewForGroup.calls.count() ).toBe( 1 );
			});

			it('should return undefined for an item that is not in the template', function() {
				var item = new Item({ title: "No Item" });
				expect( TemplateView.getGroupsForItem( item ) ).toBeUndefined();
			});	

			xit('should return the right number of groups', function() {
				var item = new Item({ title: "My Item" });
				expect( TemplateView.getGroupsForItem( item ).length ).toBe( 2 );
			});

			xit('should only return DOM elements with the correct group class', function() {
				var item = new Item({ title: "My Item" });
				expect( TemplateView.getGroupsForItem( item ) ).toHaveClass('layout-template-row-group');
			});

			it('should throw an error if passed anything other than a jQuery object or Item', function() {
				expect(function() {
					TemplateView.getGroupsForItem( "hi" );
				}.bind( this ))
				.toThrow("expection: item must be of type Item or jQuery template row");
			});
		});
	});

	describe('Responding to Value Drags', function() {
		var event = {};

		beforeEach(function() {
			this.templateView = new TemplateView( this.defaultLayout );
			this.templateView.table = this.table;
			this.templateView.render();
		});

		describe('Drag Start', function() {

			beforeEach(function() {
				this.newItem = new Item({ title: "My Item" });
				this.valueView = new TemplateValueView( this.newItem, false );
				// this.event = document.createEvent('CustomEvent');
				// this.event.initCustomEvent('Columns.TemplateValueView.ValueDidBeginDragWithItem', false, false, {
				// 	valueView: 	this.valueView,
				// 	item: 		this.newItem,
				// 	event: 		event,
				// 	ui: 		{}
				// });
			});

			it('should update the current dragging item', function() {
				ColumnsEvent.send('Columns.TemplateValueView.ValueDidBeginDragWithItem', {
					valueView: 	this.valueView,
					item: 		this.newItem,
					event: 		event,
					ui: 		{}
				});
				expect( this.templateView.draggingItem ).toEqual( this.newItem );
			});

			it('should dissolve any groups that surround just a single value', function() {
				spyOn( this.templateView, 'dissolveSingleValueGroups' );
				
				ColumnsEvent.send('Columns.TemplateValueView.ValueDidBeginDragWithItem', {
					valueView: 	this.valueView,
					item: 		this.newItem,
					event: 		event,
					ui: 		{}
				});

				expect( this.templateView.dissolveSingleValueGroups ).toHaveBeenCalled();
			});
		});

		describe('Drag Stop', function() {

			beforeEach(function( done ) {
				this.newItem = new Item({ title: "My Item" });
				this.valueView = new TemplateValueView( this.newItem, false );
				this.valueView.render();
				// this.event = document.createEvent('CustomEvent');
				// this.event.initCustomEvent('Columns.TemplateValueView.ValueDidEndDragWithItem', false, false, {
				// 	valueView: 	this.valueView,
				// 	item: 		this.newItem,
				// 	event: 		event,
				// 	ui: 		{}
				// });

				spyOn( this.templateView, 'removeDraggingValue' );
				// spyOn( this.templateView, '_emitChange' );

				setTimeout(function() {
					done();
				}, 400 );
			});

			it('should remove the value from the template if the value is no longer in the template', function( done ) {
				spyOn( TemplateView, 'getValueForItem' ).and.returnValue( undefined );
				ColumnsEvent.send('Columns.TemplateValueView.ValueDidEndDragWithItem', {
					valueView: 	this.valueView,
					item: 		this.newItem,
					event: 		event,
					ui: 		{}
				});

				expect( this.templateView.removeDraggingValue ).toHaveBeenCalled();
				done();
					
			});

			xit('should emit a change event only after a delay if the value is no longer in the template', function( done ) {
				spyOn( TemplateView, 'getValueForItem' ).and.returnValue( undefined );
				ColumnsEvent.send('Columns.TemplateValueView.ValueDidEndDragWithItem', {
					valueView: 	this.valueView,
					item: 		this.newItem,
					event: 		event,
					ui: 		{}
				});

				expect( this.templateView._emitChange ).toHaveBeenCalled();
				done();
			});

			xit('should not remove the value if the value is still in the template', function( done ) {
				spyOn( TemplateView, 'getValueForItem' ).and.returnValue( {} );
				// this.templateView.droppableItems.push('hi');
				ColumnsEvent.send('Columns.TemplateValueView.ValueDidEndDragWithItem', {
					valueView: 	this.valueView,
					item: 		this.newItem,
					event: 		event,
					ui: 		{}
				});

				// expect( this.templateView._emitChange ).not.toHaveBeenCalled();
				expect( this.templateView.removeDraggingValue ).not.toHaveBeenCalled();
				done();
			});

			it('should do nothing if there is the value is still in the template', function( done ) {
				spyOn( TemplateView, 'getValueForItem' ).and.returnValue( {} );
				// var droppable = '<div class="fake"></div>';
				// this.templateView.droppableItems.push( droppable );
				ColumnsEvent.send('Columns.TemplateValueView.ValueDidEndDragWithItem', {
					valueView: 	this.valueView,
					item: 		this.newItem,
					event: 		event,
					ui: 		{}
				});

				expect( this.templateView.removeDraggingValue ).not.toHaveBeenCalledWith();
				// expect( this.templateView._emitChange ).not.toHaveBeenCalled();
				done();
			});

		});

		describe('Drag', function() {
			beforeEach(function() {
				this.newItem = new Item({ title: "My Item" });
				this.valueView = new TemplateValueView( this.newItem, false );
				// this.event = document.createEvent('CustomEvent');
				// this.event.initCustomEvent('Columns.TemplateValueView.ValueDidDragWithItem', false, false, {
				// 	valueView: 	this.valueView,
				// 	item: 		this.newItem,
				// 	event: 		event,
				// 	ui: 		{}
				// });

				spyOn( this.templateView, 'removePlaceholders' );
				this.positionSpy = spyOn( this.templateView, 'positionDropForDragEventInParentWithPlaceholder' );
			});

			it('should remove existing placeholders and set up new ones if there is an active droppable item', function() {
				var groupView	 	= new TemplateGroupView();
				var $group 			= groupView.render();
				var item 	 		= new Item({ title: "My Item"});
				this.templateView.draggingItem = item;
				this.templateView.droppableItems.push( groupView );

				ColumnsEvent.send('Columns.TemplateValueView.ValueDidDragWithItem', {
					valueView: 	this.valueView,
					item: 		this.newItem,
					event: 		event,
					ui: 		{}
				});

				expect( this.templateView.removePlaceholders ).toHaveBeenCalled();
				expect( this.positionSpy.calls.argsFor(0)[0] ).toEqual( event );
				expect( this.positionSpy.calls.argsFor(0)[1] ).toEqual( $group );
				expect( this.positionSpy.calls.argsFor(0)[2] ).toBe( true );
			});

			it('should do nothing if there is no active droppable item', function() {
				ColumnsEvent.send('Columns.TemplateValueView.ValueDidDragWithItem', {
					valueView: 	this.valueView,
					item: 		this.newItem,
					event: 		event,
					ui: 		{}
				});

				expect( this.templateView.removePlaceholders ).not.toHaveBeenCalled();
				expect( this.positionSpy ).not.toHaveBeenCalled();
			});
		});
	});

	describe('Respond to Group Drop Events', function() {

		beforeEach(function() {
			this.templateView = new TemplateView( this.defaultLayout );
			this.templateView.table = this.table;
			this.templateView.render();
			this.newItem = new Item({ title: "My Item" });
			this.valueView = new TemplateValueView( this.newItem );
			this.groupView = new TemplateGroupView();
			// this.event = document.createEvent('CustomEvent');
		});

		describe('Drop Over', function() {

			beforeEach(function() {
				// this.event.initCustomEvent('Columns.TemplateGroupView.GroupDidBeginDropOverWithValueView', false, false, {
				// 	groupView: 	this.groupView,
				// 	valueView: 	this.valueView,
				// 	event: 		event,
				// 	ui: 		{}
				// });
			});

			it('should add the group to the droppable items array only if not already present', function() {
				ColumnsEvent.send('Columns.TemplateGroupView.GroupDidBeginDropOverWithValueView', {
					groupView: 	this.groupView,
					valueView: 	this.valueView,
					event: 		event,
					ui: 		{}
				});
				expect( this.templateView.droppableItems.length ).toBe( 1 );
			});

			it('should not add the group to the droppable items array if already present', function() {
				this.templateView.droppableItems.push( this.groupView );
				
				ColumnsEvent.send('Columns.TemplateGroupView.GroupDidBeginDropOverWithValueView', {
					groupView: 	this.groupView,
					valueView: 	this.valueView,
					event: 		event,
					ui: 		{}
				});

				expect( this.templateView.droppableItems.length ).toBe( 1 );
			});

			it('should make sure the dragging element gets the droppable class', function() {
				loadFixtures('dragging-item-view.html');

				ColumnsEvent.send('Columns.TemplateGroupView.GroupDidBeginDropOverWithValueView', {
					groupView: 	this.groupView,
					valueView: 	this.valueView,
					event: 		event,
					ui: 		{}
				});

				expect( $('.ui-draggable-dragging') ).toHaveClass('droppable');
			});
		});

		describe('Drop Out', function() {

			beforeEach(function() {
				// this.event.initCustomEvent('Columns.TemplateGroupView.GroupDidEndDropOverWithValueView', false, false, {
				// 	groupView: 	this.groupView,
				// 	valueView: 	this.valueView,
				// 	event: 		event,
				// 	ui: 		{}
				// });
				spyOn( this.groupView, 'removePlaceholders' );
			});

			it('should clear any placeholders within the group', function() {
				ColumnsEvent.send('Columns.TemplateGroupView.GroupDidEndDropOverWithValueView', {
					groupView: 	this.groupView,
					valueView: 	this.valueView,
					event: 		event,
					ui: 		{}
				});
				expect( this.groupView.removePlaceholders ).toHaveBeenCalled();
			});

			it('should remove the droppable item from the droppable items array', function() {
				this.templateView.droppableItems.push( {} );
				this.templateView.droppableItems.push( this.groupView );
				this.templateView.droppableItems.push( {} );

				ColumnsEvent.send('Columns.TemplateGroupView.GroupDidEndDropOverWithValueView', {
					groupView: 	this.groupView,
					valueView: 	this.valueView,
					event: 		event,
					ui: 		{}
				});

				expect( this.templateView.droppableItems.indexOf( this.groupView ) ).toBe( -1 );
			});

			it('should make sure the dragging element loses the droppable class', function() {
				loadFixtures('dragging-item-view.html');
				$('.ui-draggable-dragging').addClass('droppable');
				
				ColumnsEvent.send('Columns.TemplateGroupView.GroupDidEndDropOverWithValueView', {
					groupView: 	this.groupView,
					valueView: 	this.valueView,
					event: 		event,
					ui: 		{}
				});

				expect( $('.ui-draggable-dragging') ).not.toHaveClass('droppable');
			});
		});

		describe('Drop', function() {
			var event = {};

			beforeEach(function() {
				// this.event.initCustomEvent('Columns.TemplateGroupView.GroupDidDropWithValueView', false, false, {
				// 	groupView: 	this.groupView,
				// 	valueView: 	this.valueView,
				// 	event: 		event,
				// 	ui: 		{}
				// });
				spyOn( this.groupView, 'removePlaceholders' );
				this.positionSpy = spyOn( this.templateView, 'positionDropForDragEventInParentWithPlaceholder' );
			});

			it('should do nothing if there are no droppable items', function() {
				ColumnsEvent.send('Columns.TemplateGroupView.GroupDidDropWithValueView', {
					groupView: 	this.groupView,
					valueView: 	this.valueView,
					event: 		event,
					ui: 		{}
				});

				expect( this.groupView.removePlaceholders ).not.toHaveBeenCalled();
				expect( this.templateView.positionDropForDragEventInParentWithPlaceholder ).not.toHaveBeenCalled();
			});

			it('should do nothing if this group is not the most recent droppable item', function() {
				this.templateView.droppableItems.push( this.groupView );
				this.templateView.droppableItems.push( {} );
				
				ColumnsEvent.send('Columns.TemplateGroupView.GroupDidDropWithValueView', {
					groupView: 	this.groupView,
					valueView: 	this.valueView,
					event: 		event,
					ui: 		{}
				});

				expect( this.groupView.removePlaceholders ).not.toHaveBeenCalled();
				expect( this.templateView.positionDropForDragEventInParentWithPlaceholder ).not.toHaveBeenCalled();
			});

			it('should clear any placeholders within the group', function() {
				this.templateView.droppableItems.push( {} );
				this.templateView.droppableItems.push( this.groupView );
				
				ColumnsEvent.send('Columns.TemplateGroupView.GroupDidDropWithValueView', {
					groupView: 	this.groupView,
					valueView: 	this.valueView,
					event: 		event,
					ui: 		{}
				});

				expect( this.groupView.removePlaceholders ).toHaveBeenCalled();
			});

			it('should position the drop within the template', function() {
				var $group = this.groupView.render();
				this.templateView.droppableItems.push( {} );
				this.templateView.droppableItems.push( this.groupView );
				
				ColumnsEvent.send('Columns.TemplateGroupView.GroupDidDropWithValueView', {
					groupView: 	this.groupView,
					valueView: 	this.valueView,
					event: 		event,
					ui: 		{}
				});

				expect( this.positionSpy ).toHaveBeenCalled();
				expect( this.positionSpy.calls.argsFor(0)[0] ).toEqual( event );
				expect( this.positionSpy.calls.argsFor(0)[1] ).toEqual( $group );
				expect( this.positionSpy.calls.argsFor(0)[2] ).toBe( false );
			});

			it('should clear the droppable items array', function() {
				this.templateView.droppableItems.push( {} );
				this.templateView.droppableItems.push( this.groupView );
				
				ColumnsEvent.send('Columns.TemplateGroupView.GroupDidDropWithValueView', {
					groupView: 	this.groupView,
					valueView: 	this.valueView,
					event: 		event,
					ui: 		{}
				});

				expect( this.templateView.droppableItems.length ).toBe( 0 );
			});
		});

	});

	describe('Respond to Value and Group Updates', function() {

		beforeEach(function() {
			this.templateView = new TemplateView( this.defaultLayout );
			this.templateView.table = this.table;
			this.templateView.render();
			spyOn( this.templateView, '_emitChange' );
		});

		it('should emit a change event when a value view is updated', function() {
			ColumnsEvent.send('Columns.TemplateValueView.DidChange', {
				valueView: 	new TemplateValueView()
			});

			expect( this.templateView._emitChange ).toHaveBeenCalled();
		});

		it('should emit a change event when a group view is updated', function() {
			ColumnsEvent.send('Columns.TemplateGroupView.DidChange', {
				groupView: 	new TemplateGroupView()
			});

			expect( this.templateView._emitChange ).toHaveBeenCalled();
		});
	});

	describe('Respond to Embeddable Table Events', function() {

		beforeEach(function() {
			this.templateView 	= new TemplateView( this.defaultLayout );
			this.templateView.table = this.table;
			this.$template 		= this.templateView.render();
		});

		// describe('Table Will Expand', function() {

		// 	beforeEach(function( done ) {
		// 		$.Velocity.hook(this.$template, "translateY", "-100px");
		// 		$(document).trigger('ColumnsTableWillExpand');
		// 		setTimeout(function() {
		// 			done();
		// 		}, 400);
		// 	});

		// 	it('should adjust the template position when the table is about to expand', function( done ) {
		// 		expect( $.Velocity.hook( this.$template, "translateY" ) ).toBe( 0 );
		// 		done();
		// 	});
		// });

		it('should add the expanded class to the template once the table has expanded', function() {
			$(document).trigger('ColumnsTableDidExpand');
			expect( this.templateView.$preview ).toHaveClass('expanded');
		});

		it('should remove the expanded class from the template once the table has collapsed', function() {
			$(document).trigger('ColumnsTableDidCollapse');
			expect( this.templateView.$preview ).not.toHaveClass('expanded');
		});

		describe('Table Did Render', function() {

			it('should adjust the template height to match the tallest row once the table renders', function() {
				var table = { tallestRowHeight: function() {} };
				loadFixtures('embed-table.html');
				spyOn( table, 'tallestRowHeight' ).and.returnValue( 186 );
				$(document).trigger('ColumnsTableDidRenderData', { table: table });
				expect( this.$template.find('.layout-template-row').height() ).toBe( 186 );

			});
		});

		describe('Scrolling the Template with the Table', function() {

			beforeEach(function() {
				loadFixtures('embed-table.html');
				this.$table = $('.columns-table-container');
			});

			it('should scroll with the expanded table', function() {
				spyOn( $.fn, 'scrollTop' ).and.returnValue( 12 );
				$(document).trigger('ColumnsTableDidScroll');

				expect( $.fn.scrollTop ).toHaveBeenCalled();
				expect( $.Velocity.hook( this.$template, "translateY" ) ).toBe( '-12px' );
			});

			it('should have a maximum scroll position', function() {
				spyOn( $.fn, 'scrollTop' ).and.returnValue( -12 );
				$(document).trigger('ColumnsTableDidScroll');

				expect( $.fn.scrollTop ).toHaveBeenCalled();
				expect( $.Velocity.hook( this.$template, "translateY" ) ).toBe( '0px' );
			});

			it('should have a minimum scroll position', function() {
				spyOn( $.fn, 'scrollTop' ).and.returnValue( 36 );
				$(document).trigger('ColumnsTableDidScroll');

				expect( $.fn.scrollTop ).toHaveBeenCalled();
				expect( $.Velocity.hook( this.$template, "translateY" ) ).toBe( '-24px' );
			});
		});
	});

	describe('Emitting Change Events', function() {

		it('should emit a change event', function() {
			var templateView = new TemplateView();
			spyOn( ColumnsEvent, 'send' );
			templateView._emitChange();

			expect( ColumnsEvent.send ).toHaveBeenCalled();
			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.TemplateView.DidChange');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].templateView ).toEqual( templateView );
		});

		it('should emit an even when it initally renders', function() {
			var templateView = new TemplateView();
			spyOn( ColumnsEvent, 'send' );
			templateView._emitRender();

			expect( ColumnsEvent.send ).toHaveBeenCalled();
			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.TemplateView.DidRender');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].templateView ).toEqual( templateView );
		});
	});

	describe('Sending Analytics Events', function() {
		var templateView;

		beforeEach(function() {
			// spyOn( ColumnsAnalytics, 'send' );
			templateView = new TemplateView( this.defaultLayout );
			templateView._setupTemplateEvents();
			templateView.table = new Table({ id: 4 });
		});

		it('should send an event when an item is removed from the template', function() {
			var valueView = new TemplateValueView( new Item({ title: "My Item" }) );
			spyOn( TemplateView, 'getValueForItem' ).and.returnValue( undefined );
			spyOn( templateView, 'removeDraggingValue' );
			ColumnsEvent.send('Columns.TemplateValueView.ValueDidEndDragWithItem', {
				valueView: valueView
			});

			expect( ColumnsAnalytics.send ).toHaveBeenCalledWith({
				category: 'template',
				action: 'remove',
				table_id: 4
			});
		});

		it('should send an event when an item is added to the template', function() {
			var groupView = new TemplateGroupView();
			groupView.render();
			spyOn( templateView, 'positionDropForDragEventInParentWithPlaceholder' );
			templateView.droppableItems.push( groupView );

			ColumnsEvent.send('Columns.TemplateGroupView.GroupDidDropWithValueView', {
				event: {},
				groupView: groupView
			});

			expect( ColumnsAnalytics.send ).toHaveBeenCalledWith({
				category: 'template',
				action: 'add',
				table_id: 4
			});
		});

	});
});
},{"../../javascripts/controllers/ItemView.js":5,"../../javascripts/controllers/TemplateView.js":16,"../../javascripts/models/ColumnsAnalytics.js":19,"../../javascripts/models/ColumnsEvent.js":20,"../../javascripts/models/Layout.js":22,"../../javascripts/models/Table.js":24}],40:[function(require,module,exports){
var ThanksView = require('../../javascripts/controllers/ThanksView.js');
var ColumnsEvent = require('../../javascripts/models/ColumnsEvent.js');

describe('Thanks View', function() {
	var thanks;

	beforeEach(function() {
		thanks = new ThanksView();
	});

	describe('Rendering', function() {
		var $thanks;

		beforeEach(function() {
			$thanks = thanks.render();
		});

		it('should have the correct id', function() {
			expect( $thanks ).toHaveId('thanks');
		});

		it('should not be active', function() {
			expect( $thanks ).not.toHaveClass('active');
		});
	});

	describe('Showing and Hiding', function() {
		var $thanks;

		describe('Showing', function() {

			beforeEach(function( done ) {
				$thanks = thanks.render();

				$thanks.css({ opacity: 0 });
				$thanks.removeClass('active');

				thanks.show();

				setTimeout(function() {
					done();
				}, 300);
			});

			it('should have full opacity', function( done ) {
				expect( $thanks ).toHaveCss({ opacity: '1' });
				done();
			});

			it('should have the active class', function( done ) {
				expect( $thanks ).toHaveClass('active');
				done();
			});
		});

		describe('Hiding', function() {

			beforeEach(function( done ) {
				$thanks = thanks.render();

				$thanks.css({ opacity: 1 });
				$thanks.addClass('active');

				thanks.hide();

				setTimeout(function() {
					done();
				}, 300);
			});

			it('should have zero opacity', function( done ) {
				expect( $thanks ).toHaveCss({ opacity: '0' });
				done();
			});

			it('should not have the active class', function( done ) {
				expect( $thanks ).not.toHaveClass('active');
				done();
			});
		});
	});

	describe('Listening to Events', function() {

		beforeEach(function() {
			thanks._setupEventListeners();
		});

		it('should show on successful registration', function() {
			spyOn( thanks, 'show' );

			ColumnsEvent.send( 'Columns.RegisterView.DidRegisterWithSuccess', {
				registerView: {}
			});

			expect( thanks.show ).toHaveBeenCalled();
		});
	});
});
},{"../../javascripts/controllers/ThanksView.js":17,"../../javascripts/models/ColumnsEvent.js":20}],41:[function(require,module,exports){
var ColumnsEvent 		= require('../../javascripts/models/ColumnsEvent.js');
var ColumnsAnalytics 	= require('../../javascripts/models/ColumnsAnalytics.js');
var Table 				= require('../../javascripts/models/Table.js');
var UploadView 			= require('../../javascripts/controllers/UploadView.js');

jasmine.getFixtures().fixturesPath = 'specs/fixtures';

describe('Upload View', function() {

	afterEach(function() {
		ColumnsEvent.offAll();
	});

	beforeEach(function() {
		loadFixtures('upload.html');
		this.upload = new UploadView();
		spyOn( ColumnsAnalytics, 'send' );
	});

	describe('Initialization', function() {

		it('should initialize with 0 parsed rows', function() {
			expect( this.upload.parsedRows ).toBe( 0 );
		});
	});

	describe('Rendering', function() {

		it('should attatch to the correct part of the DOM', function() {
			expect( this.upload.render() ).toEqual('#upload');
		});
	});

	describe('Listening to User Events', function() {

		beforeEach(function() {
			this.upload.render();
		});

		describe('Upload Button', function() {

			xit('should trigger a click on the file input field', function() {
				$('.columns-upload-button').trigger('click');
				// expect(  )
			});

			xit('should send an analytics event', function() {

			});
		});

		it('should respond to clicks on the upload button', function() {
			spyOn( this.upload, '_onUploadClick' );
			$('.columns-upload-button').trigger('click');

			// expect( this.upload._onUploadClick ).toHaveBeenCalled();
			// expect( this.upload._onFileChoice ).toHaveBeenCalled();
		});

		describe('Choosing a File', function() {

			beforeEach(function() {
				spyOn( this.upload, '_setLoading' );
				spyOn( this.upload, '_parseFile' );
				spyOn( ColumnsEvent, 'send' );	
			});

			it('should set the loading message with the file name', function() {				
				var file = { name: 'test.csv' };
				$('input[type="file"]').triggerHandler({
					type: 'change',
					target: {
						files: [ file ]
					}
				});

				expect( this.upload._setLoading ).toHaveBeenCalledWith( true, '', 'Uploading test.csv...' );
			});

			it('should set the loading message without the file name if one is not available', function() {
				var file = {};
				$('input[type="file"]').triggerHandler({
					type: 'change',
					target: {
						files: [ file ]
					}
				});

				expect( this.upload._setLoading ).toHaveBeenCalledWith( true, '', 'Uploading file...' );
			});

			it('should parse the file', function() {
				var file = { name: 'test.csv' };
				$('input[type="file"]').triggerHandler({
					type: 'change',
					target: {
						files: [ file ]
					}
				});

				expect( this.upload._parseFile ).toHaveBeenCalledWith( file );
			});

			it('should emit an event', function() {
				var file = { name: 'test.csv' };
				$('input[type="file"]').triggerHandler({
					type: 'change',
					target: {
						files: [ file ]
					}
				});

				expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.UploadView.DidChooseFile');
				expect( ColumnsEvent.send.calls.argsFor(0)[1].uploadView ).toEqual( this.upload );
				expect( ColumnsEvent.send.calls.argsFor(0)[1].file ).toEqual( file );
			});

			xit('should respond to the user choosing a file', function() {
				spyOn( this.upload, '_onFileChoice' );
				$('input[type="file"]').trigger('change');

				expect( this.upload._onFileChoice ).toHaveBeenCalled();

			});
		});

		xit('should respond to window resize events', function() {
			spyOn( this.upload, '_onWindowResize' );
			$(window).trigger('resize');

			expect( this.upload._onWindowResize ).toHaveBeenCalled();
		});
	});

	describe('Responding to Table Events', function() {

		describe('Upload Success', function() {

			beforeEach(function() {
				// this.columnsEvent = document.createEvent('CustomEvent');
				// this.columnsEvent.initCustomEvent('Columns.Table.DidUploadWithSuccess', false, false, {
				// 	table: 	new Table()
				// });
				this.upload.render();
			});

			it('should turn off the loading message', function() {
				spyOn( this.upload, '_setLoading' );

				ColumnsEvent.send('Columns.Table.DidUploadWithSuccess', {
					table: 	new Table()
				});

				expect( this.upload._setLoading ).toHaveBeenCalledWith( false );
			});

			it('should hide', function() {
				spyOn( this.upload, 'hide' );
				
				ColumnsEvent.send('Columns.Table.DidUploadWithSuccess', {
					table: 	new Table()
				});

				expect( this.upload.hide ).toHaveBeenCalled();
			});
		});

		describe('Upload Failure', function() {

			beforeEach(function() {
				// this.columnsEvent = document.createEvent('CustomEvent');
				// this.columnsEvent.initCustomEvent('Columns.Table.DidUploadWithFailure', false, false, {
				// 	table: 	new Table()
				// });
				this.upload.render();
			});

			it('should update the loading message', function() {
				spyOn( this.upload, '_setLoading' );
				
				ColumnsEvent.send('Columns.Table.DidUploadWithFailure', {
					table: 	new Table()
				});

				expect( this.upload._setLoading ).toHaveBeenCalledWith( false, "Shoot, something went wrong.", "Try a different .csv" );
			});

		});
	});

	describe('Parsing a CSV', function() {

		beforeEach(function() {
			spyOn( Papa, 'parse' );
		});

		describe('Using Papa Parse', function() {

			it('should pass the file', function() {
				var file = { name: 'test.csv' };
				this.upload._parseFile( file );
				expect( Papa.parse.calls.argsFor(0)[0] ).toEqual( file );
			});

			xit('should pass the correct step callback', function() {
				var file = { name: 'test.csv' };
				var step = function( row, handle ) { this._parseRow( row, handle, fileName ) }.bind( this.upload );
				this.upload._parseFile( file );
				expect( Papa.parse.calls.argsFor(0)[1].step ).toEqual( step );
			});

			xit('should pass the correct complete callback', function() {

			});
		});

		describe('Parsing a Row', function() {

			beforeEach(function() {
				this.handle = { abort: function() {} };
				spyOn( this.upload, '_createColumnItems' );
				spyOn( this.upload, '_createRow' );
				spyOn( this.handle, 'abort' );
			});

			it('should identify the header row and create items from the column names', function() {
				var row = { data: [ 'data' ] };
				this.upload._parseRow( row, this.handle, 'test.csv' );
				expect( this.upload._createColumnItems ).toHaveBeenCalledWith( row.data[ 0 ], 'test.csv' );
			});

			it('should identify subsequent rows and compile them as data points', function() {
				this.upload.parsedRows = 1;
				var row = { data: [ 'data' ] };
				this.upload._parseRow( row, this.handle, 'test.csv' );
				expect( this.upload._createRow ).toHaveBeenCalledWith( row.data[ 0 ], 'test.csv' );
			});

			it('should stop after the first 20 rows', function() {
				this.upload.parsedRows = 21;
				var row = { data: {} };
				this.upload._parseRow( row, this.handle, 'test.csv' );
				expect( this.upload._createRow ).not.toHaveBeenCalled();
				expect( this.handle.abort ).toHaveBeenCalled();
			});

		});

		describe('Create Column Items', function() {

			beforeEach(function() {
				spyOn( ColumnsEvent, 'send' );
			});

			it('should emit an event announcing the parsing of column items', function() {
				var columnNames = [
					'First Name',
					'Last Name',
					'Hometown'
				];
				this.upload._createColumnItems( columnNames, 'test.csv' );
				expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.UploadView.DidParseColumnNamesForFile');
				expect( ColumnsEvent.send.calls.argsFor(0)[1].uploadView ).toEqual( this.upload );
				expect( ColumnsEvent.send.calls.argsFor(0)[1].fileName ).toEqual( 'test.csv' );
				expect( ColumnsEvent.send.calls.argsFor(0)[1].columns ).toEqual( columnNames );
			});
		});

		describe('Create Data Row', function() {

			beforeEach(function() {
				spyOn( ColumnsEvent, 'send' );
			});

			it('should emit an event announcing the parsing of a data row', function() {
				var row = {
					data: [
						'Jeremy',
						'Lubin',
						'Princeton'
					]
				};
				this.upload._createRow( row, 'test.csv' );
				expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.UploadView.DidParseDataRowForFile');
				expect( ColumnsEvent.send.calls.argsFor(0)[1].uploadView ).toEqual( this.upload );
				expect( ColumnsEvent.send.calls.argsFor(0)[1].fileName ).toEqual( 'test.csv' );
				expect( ColumnsEvent.send.calls.argsFor(0)[1].row ).toEqual( row );
			});
		});

		describe('Completion of Parsing', function() {

			beforeEach(function() {
				spyOn( ColumnsEvent, 'send' );
			});

			it('should emit an event with the data', function() {
				var results = {};
				var file = { name: 'test.csv' };
				this.upload._onParseComplete( results, file );
				expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.UploadView.DidCompleteParseForFile');
				expect( ColumnsEvent.send.calls.argsFor(0)[1].uploadView ).toEqual( this.upload );
				expect( ColumnsEvent.send.calls.argsFor(0)[1].file ).toEqual( file );
			});
		});
	});

	xdescribe('Hiding the Upload View', function() {

		beforeEach(function( done ) {
			this.upload.render();
			this.upload.hide();
			setTimeout(function() {
				done();
			}, 300);
		});

		// TODO figure out why this test doesn't work
		it('should have no opacity', function( done ) {
			expect( this.upload.$upload ).toHaveCss({ opacity: '0' });
			done();
		});

		it('should not be active', function( done ) {
			expect( this.upload.$upload ).not.toHaveClass('active');
			done();
		});
	});

	describe('Showing the Upload View', function() {

		beforeEach(function( done ) {
			this.upload.render();
			this.upload.show();
			setTimeout(function() {
				done();
			}, 300);
		});

		it('should have full opacity', function( done ) {
			// console.log( $('body').html() );
			expect( this.upload.$upload ).toHaveCss({ opacity: '1' });
			done();
		});

		it('should not be active', function( done ) {
			expect( this.upload.$upload ).toHaveClass('active');
			done();
		});
	});

	describe('Updating the Loading Message', function() {

		beforeEach(function() {
			this.upload.render();
			this.$button = $('.columns-upload-button');
			this.$message = $('.columns-upload-message');
		});

		it('should update the button text with a user provided string', function() {
			this.upload._setLoading( true, "hi" );
			expect( this.$button ).toHaveText( "hi" );
		});

		it('should update the message text with a user provided string', function() {
			this.upload._setLoading( true, "hi", "there" );
			expect( this.$message ).toHaveText( "there" );
		});

		it('should use a default message text if none was provided', function() {
			this.upload._setLoading( true );
			expect( this.$message ).toHaveText( "" );
			expect( this.$button ).toHaveText( "Upload a .csv" );
		});

		it('should use a default message text if the one provided is not a string', function() {
			this.upload._setLoading( true, {}, {} );
			expect( this.$message ).toHaveText( "" );
			expect( this.$button ).toHaveText( "Upload a .csv" );
		});

		it('should optionally turn on the loading animation', function() {
			this.upload._setLoading( true );
			expect( this.upload.$upload ).toHaveClass( 'loading' );
			expect( this.$button ).toHaveProp( 'disabled', true );
		});

		it('should optionally turn off the loading animation', function() {
			this.upload._setLoading( false );
			expect( this.upload.$upload ).not.toHaveClass( 'loading' );
			expect( this.$button ).toHaveProp( 'disabled', false );
		});
	});

	describe('Sending Analytics Events', function() {

		beforeEach(function() {
			this.upload.render();
		});

		it('should send an event when the upload button is clicked', function() {
			$('.columns-upload-button').trigger('click');

			expect( ColumnsAnalytics.send ).toHaveBeenCalledWith({
				category: 'button',
				action: 'click',
				label: 'upload'
			});
		});

		it('should send an event when a file is chosen', function() {
			var file = {};
			$('input[type="file"]').triggerHandler({
				type: 'change',
				target: {
					files: [ file ]
				}
			});

			expect( ColumnsAnalytics.send ).toHaveBeenCalledWith({
				category: 'file',
				action: 'chosen',
			});
		});
	});
});
},{"../../javascripts/controllers/UploadView.js":18,"../../javascripts/models/ColumnsAnalytics.js":19,"../../javascripts/models/ColumnsEvent.js":20,"../../javascripts/models/Table.js":24}],42:[function(require,module,exports){

// var API_HOST = 'http://127.0.0.1:8080';
// var ROOT_PATH = 'http://127.0.0.1';
// var EMBED_PATH = ROOT_PATH + '/public/embed-table.js';
// var CSS_PATH = ROOT_PATH + '/css/embed-table.css';
// var IMG_PATH = ROOT_PATH + '/images/';

// var Velocity = require('../../bower_components/velocity/velocity.js');
// var Hammer = require('../../vendor/hammer.js');
// var PreventGhostClick = require('../../vendor/prevent-ghost-click.js');

// $$ = $;
// var Columnsbars = require('../../javascripts/embed-handlebars.js'),
// 	ColumnsTable = require('../../javascripts/models/ColumnsTable.js');

// jasmine.getFixtures().fixturesPath = 'specs/fixtures';

xdescribe('Embeddable Table', function() {

	beforeEach(function() {
		loadFixtures('embed-script.html');

		var scriptTags = document.getElementsByTagName('script'),
			script = scriptTags[ scriptTags.length - 1];

		this.embed = new ColumnsTable( script );
	});

	describe('Initialization', function() {

		it('should be in preview mode when in the app', function() {
			var embed = new ColumnsTable('<script type="text/javascript" src="http://colum.nz/public/embed-table.js" data-preview="true" async></script>');
			expect( embed.preview ).toBe( true );
		});

		it('should not be in preview mode when embedded', function() {
			var embed = new ColumnsTable('<script type="text/javascript" src="http://colum.nz/public/embed-table.js" async></script>');
			expect( embed.preview ).toBeUndefined();
		});
	});

	describe('Listening to Editor Events', function() {

		beforeEach(function() {			
			this.embed.render();
		});

		it('should re-render when table details are udpated', function() {
			// spyOn( this.embed, 'generateLayout' );
			// spyOn( this.embed, 'renderData' );

			ColumnsEvent.send( 'Columns.Table.DidChange', {
				table: new Table({ title: 'My Table' })
			});

			expect( this.embed.$$table.find('.columns-table-title') ).toHaveText('My Table');
		});
	});
});
},{}],43:[function(require,module,exports){
xdescribe('Main Spec', function() {
	var isMobile;

	beforeEach(function() {
		
	});

	it('should load the desktop template if the user is on a desktop', function() {
		isMobile.any = false;

		expect()
	});
});
},{}],44:[function(require,module,exports){
var ColumnsAnalytics = require('../../javascripts/models/ColumnsAnalytics.js');

describe('Columns Analyitics Framework', function() {

	describe('Sending an analytics event', function() {

		window.ga;
		window.mixpanel;

		beforeEach(function() {
			ga = jasmine.createSpy( 'ga' );
			mixpanel = jasmine.createSpyObj( 'mixpanel', ['track'] );
		});

		it('send a google analytics event', function() {
			ColumnsAnalytics.send({
				category: 'template',
				action: 'add',
				label: 'property',
				table_id: 1,
				description: 'Added item to template'
			});

			expect( ga ).toHaveBeenCalledWith( 'send', 'event', 'template', 'add', 'property', 1 );
		});

		it('send a google analytics event if not passed a category', function() {
			ColumnsAnalytics.send({
				action: 'add',
				label: 'property',
				table_id: 1,
				description: 'Added item to template'
			});

			expect( ga ).toHaveBeenCalledWith( 'send', 'event', '', 'add', 'property',  1 );
		});

		it('send a google analytics event if not passed an action', function() {
			ColumnsAnalytics.send({
				label: 'property',
				table_id: 1,
				description: 'Added item to template'
			});

			expect( ga ).toHaveBeenCalledWith( 'send', 'event', '', '', 'property',  1 );
		});

		it('send a google analytics event if not passed a label', function() {
			ColumnsAnalytics.send({
				table_id: 1,
				description: 'Added item to template'
			});

			expect( ga ).toHaveBeenCalledWith( 'send', 'event', '', '', '',  1 );
		});

		it('send a google analytics event if not passed a table_id', function() {
			ColumnsAnalytics.send({
				category: 'template',
				action: 'add',
				label: 'property',
				description: 'Added item to template'
			});

			expect( ga ).toHaveBeenCalledWith( 'send', 'event', 'template', 'add', 'property', undefined );
		});

		it('should send a mixpanel event with the passed in description', function() {
			ColumnsAnalytics.send({
				description: 'Added item to template',
				table_id: 1
			});

			expect( mixpanel.track ).toHaveBeenCalledWith('Added item to template', { 'Table ID': 1 });
		});

		it('should send a mixpanel event if not passed a description', function() {
			ColumnsAnalytics.send({
				category: 'template',
				action: 'add',
				label: 'property',
			});

			expect( mixpanel.track ).toHaveBeenCalledWith('template add property', {});
		});

		it('should send a blank mixpanel event if no data is supplied', function() {
			ColumnsAnalytics.send();

			expect( mixpanel.track ).toHaveBeenCalledWith( '', {} );
		});
	});
});
},{"../../javascripts/models/ColumnsAnalytics.js":19}],45:[function(require,module,exports){
var ColumnsEvent 		= require('../../javascripts/models/ColumnsEvent.js');

describe('Columns Events', function() {

	describe('Sending Events', function() {

		beforeEach(function() {
			
		});

		it('should accept a mandatory type and detail object', function() {
			spyOn( $.fn, 'trigger' );
			ColumnsEvent.send( 'my.type', {} );
			expect( $.fn.trigger ).toHaveBeenCalledWith( 'my.type', {} );
		});

		it('should call the correct callbacks', function() {
			var callback = jasmine.createSpy('callback');
			$(document).on( 'my.type', callback );
			ColumnsEvent.send( 'my.type', {} );
			expect( callback ).toHaveBeenCalled();
		});
	});

	describe('Registering Event Listeners', function() {

		beforeEach(function() {
			spyOn( $.fn, 'on' );
		});

		it('should accept a mandatory type and callback', function() {
			var callback = {};
			ColumnsEvent.on( 'my.type', callback );
			expect( $.fn.on ).toHaveBeenCalledWith( 'my.type', callback );
		});

	});

	describe('Removing Event Listeners', function() {

		it('should accept a type and callback', function() {
			spyOn( $.fn, 'off' );
			ColumnsEvent.off( 'my.type', {} );
			expect( $.fn.off ).toHaveBeenCalledWith( 'my.type', {} );
		});

		it('should no longer call the callback', function() {
			var callback = jasmine.createSpy('callback');
			$(document).on( 'my.type', callback );
			ColumnsEvent.off( 'my.type', callback );
			$(document).trigger( 'my.type' );
			expect( callback ).not.toHaveBeenCalled();
		});
	});

	describe('Removing All Event Listeners', function() {

		it('should no longer call any callbacks', function() {
			var callback1 = jasmine.createSpy('callback1');
			var callback2 = jasmine.createSpy('callback2');
			$(document).on( 'my.type', callback1 );
			$(document).on( 'other.type', callback2 );

			ColumnsEvent.offAll();

			$(document).trigger('my.type');
			$(document).trigger('other.type');

			expect( callback1 ).not.toHaveBeenCalled();
			expect( callback2 ).not.toHaveBeenCalled();

		});
	});
});
},{"../../javascripts/models/ColumnsEvent.js":20}],46:[function(require,module,exports){
var ColumnsEvent 		= require('../../javascripts/models/ColumnsEvent.js');

describe('Item Model', function() {

	afterEach(function() {
		ColumnsEvent.offAll();
	});

	describe('Construction', function() {

		it ('should allow construction with no parameters', function() {
			var item = new Item();
			expect(item.title).toBeUndefined();
			expect(item.style).toBeUndefined();
		});

		it('should default to the active state', function() {
			var item = new Item();
			expect( item.active ).toBeTruthy();
		});

		it('should allow construction with a title, style and active state', function() {
			var item = new Item({
				title: "My Item",
				style: 'font-size:14px;color:#3a3a3a;',
				active: false
			});
			expect(item.title).toBe('My Item');
			expect(item.style.styles).toEqual([{
				property: 'font-size',
				value: '14px'
			}, {
				property: 'color',
				value: '#3a3a3a'
			}]);
			expect( item.active ).toBe( false );
		});

		xit('should assign itself an id based on the unformatted item name', function() {
			var item = new Item({ title: "My Item" });
			expect( item.id ).toBe('my_item');
		});
	});

	describe('Title Formatting', function() {

		it('should uppercase titles and replace underscores with spaces', function() {
			var item = new Item({title: "my_column"});
			expect(item.formattedTitle()).toBe('My Column');
		});

		it('should replace empty titles with an underscore', function() {
			var item = new Item({title: ''});
			expect(item.formattedTitle()).toBe('_');
		});

		it('should return a single unscore as is', function() {
			var item = new Item({title: '_'});
			expect(item.formattedTitle()).toBe('_');
		});
	});

	describe('Title Unformatting', function() {

		it('should lowercase titles and replace spaces with an underscore', function() {
			var item = new Item({title: "My Column"});
			expect(item.unformattedTitle()).toBe('my_column');
		});

		it('should replace empty titles with an underscore', function() {
			var item = new Item({title: ''});
			expect(item.unformattedTitle()).toBe('_');
		});
	});

	describe('Getting Style Attributes', function() {

		beforeEach(function() {
			this.item = new Item({
				title: "My Item",
				style: 'font-size:14px;color:#3a3a3a;'
			});
		});

		it('should return the style value of a property if it is part of the style object', function() {
			expect( this.item.getStyle( 'font-size' ) ).toBe('14px');
		});

		xit('should return the default css value of a property that is not part of the style object', function() {
			expect( this.item.getStyle( 'text-align' ) ).toBe( 'left' );
		});
	});

	describe('Comparing Items', function() {

		beforeEach(function() {
			this.item = new Item({ title: 'My Item' });
		});

		it('should return true if the passed in item is equal to this one', function() {
			var otherItem = new Item({ title: 'My Item' });
			expect( this.item.is( otherItem ) ).toBe(true);
		});

		it('should return false if the passed in Item is not equal to this one', function() {
			var otherItem = new Item({ title: 'Other Item' });
			expect( this.item.is( otherItem ) ).toBe(false);
		});

		it('should throw an error if the passed in object is not an Item', function() {
			var otherItem = {};
			expect(function() {
				this.item.is( otherItem );
			}.bind( this ))
			.toThrow("exception: Comparison must be with another Item");
		});
	});

	describe('Responding to Events', function() {

		beforeEach(function() {
			this.item = new Item({ title: "My Item" });
			spyOn( this.item, '_emitChange' );
		});

		describe('Style Events', function() {

			beforeEach(function() {
				spyOn( this.item.style, 'update');
			});

			it('should respond to style change events for itself', function() {
				// var event = document.createEvent('CustomEvent');
				// event.initCustomEvent('Columns.StyleView.PropertyDidUpdateWithValueForItem', false, false, {
				// 	item: this.item,
				// 	property: 'font-size',
				// 	value: '12px'
				// });
				// document.dispatchEvent( event );
				ColumnsEvent.send('Columns.StyleView.PropertyDidUpdateWithValueForItem', {
					item: this.item,
					property: 'font-size',
					value: '12px'
				});

				expect( this.item.style.update ).toHaveBeenCalledWith( [{ property: 'font-size', value: '12px' }] );
				expect( this.item._emitChange ).toHaveBeenCalled();
			});

			it('should ignore Item change events for other items', function() {
				var newItem = new Item({ title: "Other Item" });
				// var event = document.createEvent('CustomEvent');
				// event.initCustomEvent('Columns.StyleView.PropertyDidUpdateWithValueForGroupItem', false, false, {
				// 	item: newItem,
				// 	property: 'font-size',
				// 	value: '12px'
				// });
				// document.dispatchEvent( event );
				ColumnsEvent.send('Columns.StyleView.PropertyDidUpdateWithValueForGroupItem', {
					item: newItem,
					property: 'font-size',
					value: '12px'
				});

				expect( this.item.style.update ).not.toHaveBeenCalled();
				expect( this.item._emitChange ).not.toHaveBeenCalled();
			});
		});

		describe('Template Events', function() {

			beforeEach(function() {
				spyOn( this.item, '_setActive' );
				// this.event = document.createEvent('CustomEvent');
				// this.event.initCustomEvent('Columns.TemplateView.DidChange', false, false, {
				// 	templateView: 	new TemplateView()
				// });
			});

			it('should set itself as inactive if found in the template', function() {
				spyOn( TemplateView, 'getValueForItem' ).and.returnValue( undefined );

				ColumnsEvent.send('Columns.TemplateView.DidChange', {
					templateView: 	new TemplateView()
				});

				expect( this.item._setActive ).toHaveBeenCalledWith( true );
			});

			it('should set itself as active if not found in the template', function() {
				spyOn( TemplateView, 'getValueForItem' ).and.returnValue( new TemplateValueView( this.item ) );

				ColumnsEvent.send('Columns.TemplateView.DidChange', {
					templateView: 	new TemplateView()
				});

				expect( this.item._setActive ).toHaveBeenCalledWith( false );
			});
		});
	});

	describe('Managing Active State', function() {

		beforeEach(function() {
			this.item = new Item({ title: "My Item" });
			spyOn( this.item, '_emitActiveStateChange' );
		});

		it('should set active attribute to true', function() {
			this.item._setActive( true );
			expect( this.item.active ).toBe( true );
		});

		it('should set active attribute to false', function() {
			this.item._setActive( false );
			expect( this.item.active ).toBe( false );
		});

		it('should emit a change event if the active state was changed', function() {
			this.item._setActive( false );
			expect( this.item._emitActiveStateChange ).toHaveBeenCalled();
		});

		it('should not emit a change event if the active state was not changed', function() {
			this.item._setActive( true );
			expect( this.item._emitActiveStateChange ).not.toHaveBeenCalled();
		});

	});

	describe('Emitting Change Events', function() {

		var item;
		beforeEach(function() {
			item = new Item({ title: "My Item" });
			spyOn( ColumnsEvent, 'send' );
		})

		it('should alert the app that it has been updated', function() {
			item._emitChange();

			expect( ColumnsEvent.send ).toHaveBeenCalled();
			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.Item.DidChange');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].item ).toEqual( item );
		});

		it('should alert the app that it has changed in active state', function() {
			item._emitActiveStateChange();

			expect( ColumnsEvent.send ).toHaveBeenCalled();
			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.Item.ActiveStateDidChange');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].item ).toEqual( item );
		});
	});
});
},{"../../javascripts/models/ColumnsEvent.js":20}],47:[function(require,module,exports){
var ColumnsEvent 		= require('../../javascripts/models/ColumnsEvent.js');
var Layout 				= require('../../javascripts/models/Layout.js');
var TemplateView		= require('../../javascripts/controllers/TemplateView.js');
var TemplateGroupView	= require('../../javascripts/controllers/TemplateGroupView.js');
var DEFAULTS			= require('../../javascripts/styling/defaults.js');

jasmine.getFixtures().fixturesPath = 'specs/fixtures';

// var DEFAULTS = {
// 	styles: [
// 		[{
// 			property: 'color',
// 			value: '#3a3a3a'
// 		}],
// 		[{
// 			property: 'color',
// 			value: '#888'
// 		},{
// 			property: 'font-size',
// 			value: '14px'
// 		}, {
// 			property: 'margin-top',
// 			value: '4px'
// 		}],
// 		[{
// 			property: 'color',
// 			value: '#3a3a3a'
// 		},{
// 			property: 'font-size',
// 			value: '24px'
// 		}]	
// 	],
// 	layouts: [
// 		[{
// 			property: 'flex-direction',
// 			value: 'column'
// 		}, {
// 			property: 'align-items',
// 			value: 'flex-start'
// 		}]
// 	]
// };

describe('Layout', function() {

	afterEach(function() {
		ColumnsEvent.offAll();
	});

	describe('Initialization', function() {

		it('should initialize with a default layout given no items', function() {
			this.layout = new Layout();

			expect( this.layout.items ).toEqual( [] );
			expect( this.layout.model ).toEqual({
				type: 'group',
				style: [{
					property: 'padding',
					value: '12px'
				}],
				values: []
			});
		});

		it('should initialize with a default layout given 1 item', function() {
			var items = [ new Item({ title: "My Item" }) ];
			this.layout = new Layout( items );

			expect( this.layout.items ).toEqual( items );
			expect( this.layout.model ).toEqual({
				type: 'group',
				style: [{
					property: 'padding',
					value: '12px'
				}],
				values: [{
					type: 'single',
					style: DEFAULTS.styles[ 0 ],
					data: items[ 0 ].unformattedTitle()
				}]
			});
		});

		it('should initialize with a default layout given 2 items', function() {
			var items = [ new Item({ title: "First Item" }), new Item({ title: "Second Item" }) ];
			this.layout = new Layout( items );

			expect( this.layout.items ).toEqual( items );
			expect( this.layout.model ).toEqual({
				type: 'group',
				style: [{
					property: 'padding',
					value: '12px'
				}],
				values: [{
					type: 'group',
					layout: DEFAULTS.layouts[ 0 ],
					values: [{
						type: 'single',
						style: DEFAULTS.styles[ 0 ],
						data: items[ 0 ].unformattedTitle()
					},{
						type: 'single',
						data: items[ 1 ].unformattedTitle(),
						style: DEFAULTS.styles[ 1 ]
					}]
				}]
			});
		});

		it('should initialize with a default layout given 3 items', function() {
			var items = [
				new Item({ title: "First Item" }),
				new Item({ title: "Second Item" }),
				new Item({ title: "Third Item" })
			];
			this.layout = new Layout( items );

			expect( this.layout.items ).toEqual( items );
			expect( this.layout.model ).toEqual({
				type: 'group',
				style: [{
					property: 'padding',
					value: '12px'
				}],
				values: [{
					type: 'group',
					layout: DEFAULTS.layouts[ 0 ],
					values: [{
						type: 'single',
						style: DEFAULTS.styles[ 0 ],
						data: items[ 0 ].unformattedTitle()
					},{
						type: 'single',
						data: items[ 1 ].unformattedTitle(),
						style: DEFAULTS.styles[ 1 ]
					}]
				}, {
					type: 'single',
					data: items[ 2 ].unformattedTitle(),
					style: DEFAULTS.styles[2]
				}]
			})
		});

		it('should initialize with a default layout given more than 3 items', function() {
			var items = [
				new Item({ title: "First Item" }),
				new Item({ title: "Second Item" }),
				new Item({ title: "Third Item" }),
				new Item({ title: "Fourth Item" }),
				new Item({ title: "Fifth Item" }),
			];
			this.layout = new Layout( items );

			expect( this.layout.items ).toEqual( items );
			expect( this.layout.model ).toEqual({
				type: 'group',
				style: [{
					property: 'padding',
					value: '12px'
				}],
				values: [{
					type: 'group',
					layout: DEFAULTS.layouts[ 0 ],
					values: [{
						type: 'single',
						style: DEFAULTS.styles[ 0 ],
						data: items[ 0 ].unformattedTitle()
					},{
						type: 'single',
						data: items[ 1 ].unformattedTitle(),
						style: DEFAULTS.styles[ 1 ]
					}]
				}, {
					type: 'single',
					data: items[ 2 ].unformattedTitle(),
					style: DEFAULTS.styles[2]
				}]
			})
		});

		it('should throw an error if any of the items are not of type Item', function() {
			var items = [ "hi" ];
			expect(function() {
				this.layout = new Layout( items );
			}.bind( this )).toThrow("exception: all items must of type Item");
		});

	});

	describe('Updating', function() {

		beforeEach(function() {
			loadFixtures('template-with-styles.html');
			this.layout = new Layout();
			spyOn( this.layout, '_generateModelForTemplate' );
			spyOn( this.layout, '_emitChange' );
		});

		it('should generate a new layout model', function() {
			this.layout.update();
			expect( this.layout._generateModelForTemplate ).toHaveBeenCalledWith( $('.layout-template-row-group').first() );
			expect( this.layout._emitChange ).toHaveBeenCalled();
		});
	});

	describe('Generating Layout Model', function() {

		beforeEach(function() {
			loadFixtures('template-with-styles.html');
			this.layout = new Layout();
		});

		it('should generate a layout model given the items and groups in the template', function() {
			var $row = $('.layout-template-row-group').first();
			expect( this.layout._generateModelForTemplate( $row ) ).toEqual({
				type: 'group',
				style: [{
					property: 'padding',
					value: '12px'
				}],
				layout: [{
					property: 'align-items',
					value: 'center'
				}, {
					property: 'flex-direction',
					value: 'row'
				}],
				values: [{
					type: 'group',
					style: [],
					layout: [{
						property: 'align-items',
						value: 'center'
					}, {
						property: 'flex-direction',
						value: 'column'
					}],
					values: [{
						type: 'single',
						style: [{
							property: 'font-size',
							value: '16px'
						}, {
							property: 'color',
							value: '#3a3a3a'
						}],
						data: 'my_item'
					}, {
						type: 'single',
						style: [{
							property: 'font-size',
							value: '12px'
						}, {
							property: 'color',
							value: '#888888'
						}, {
							property: 'margin-top',
							value: '6px'
						}],
						data: 'another_item'
					}]
				}, {
					type: 'single',
					style: [{
						property: 'font-size',
						value: '24px'
					}, {
						property: 'color',
						value: '#3a3a3a'
					}, {
						property: 'font-weight',
						value: 'bold'
					}],
					data: 'lonely_item'
				}]
			});
		});

		it('should not include inactive items', function() {
			loadFixtures('template-with-inactive-style.html');
			var $row = $('.layout-template-row-group').first();
			expect( this.layout._generateModelForTemplate( $row ) ).toEqual({
				type: 'group',
				style: [{
					property: 'padding',
					value: '12px'
				}],
				layout: [{
					property: 'align-items',
					value: 'center'
				}, {
					property: 'flex-direction',
					value: 'row'
				}],
				values: [{
					type: 'group',
					style: [],
					layout: [{
						property: 'align-items',
						value: 'center'
					}, {
						property: 'flex-direction',
						value: 'column'
					}],
					values: [{
						type: 'single',
						style: [{
							property: 'font-size',
							value: '16px'
						}, {
							property: 'color',
							value: '#3a3a3a'
						}],
						data: 'my_item'
					}, {
						type: 'single',
						style: [{
							property: 'font-size',
							value: '12px'
						}, {
							property: 'color',
							value: '#888888'
						}, {
							property: 'margin-top',
							value: '6px'
						}],
						data: 'another_item'
					}]
				}, {
					type: 'single',
					style: [{
						property: 'font-size',
						value: '24px'
					}, {
						property: 'color',
						value: '#3a3a3a'
					}, {
						property: 'font-weight',
						value: 'bold'
					}],
					data: 'lonely_item'
				}]
			});

		});

	});

	describe('Listening for Template Updates', function() {

		beforeEach(function() {
			this.layout = new Layout();
			spyOn( this.layout, 'update' );
		});

		it('should listen for template change events', function() {
			var templateView = new TemplateView();
			// var event = document.createEvent('CustomEvent');
			// event.initCustomEvent('Columns.TemplateView.DidChange', false, false, {
			// 	templateView: 	templateView
			// });

			// document.dispatchEvent( event );
			ColumnsEvent.send('Columns.TemplateView.DidChange', {
				templateView: 	templateView
			});
			expect( this.layout.update ).toHaveBeenCalled();
		});
	});

	describe('Emitting Change Events', function() {

		it('should emit a change event', function() {
			this.layout = new Layout();
			spyOn( ColumnsEvent, 'send' );
			this.layout._emitChange();

			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.Layout.DidChange');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].layout ).toEqual( this.layout );
		});
	});
});
},{"../../javascripts/controllers/TemplateGroupView.js":14,"../../javascripts/controllers/TemplateView.js":16,"../../javascripts/models/ColumnsEvent.js":20,"../../javascripts/models/Layout.js":22,"../../javascripts/styling/defaults.js":25}],48:[function(require,module,exports){
var ColumnsEvent 		= require('../../javascripts/models/ColumnsEvent.js');

describe('Style Model', function() {

	afterEach(function() {
		ColumnsEvent.offAll();
	});

	describe('Construction', function() {

		it('should allow construction without a style object', function() {
			var style = new Style();
			expect( style.styles ).toEqual( [] );
		});	

		it('should allow construction with a string', function() {
			var style = new Style( 'font-size:14px;color:#3a3a3a;' );
			expect(style.styles).toEqual([{
				property: 'font-size',
				value: '14px'
			}, {
				property: 'color',
				value: '#3a3a3a'
			}]);
		});

		it('should allow construction with an array', function() {
			var styles = [{
				property: 'font-size',
				value: '14px'
			}, {
				property: 'color',
				value: '#3a3a3a'
			}];
			var style = new Style( styles );
			expect( style.styles ).toEqual( styles );
		});

		it('should allow construction with an object', function() {
			var styles = {
				property: 'font-size',
				value: '14px'
			};
			var style = new Style( styles );
			expect( style.styles ).toEqual([ styles ]);
		});
	});

	describe('Parsing', function() {

		beforeEach(function() {
			this.style = new Style();
		});

		it('should not accept non-string css', function() {
			var css = { hello:'there' };
			expect(function() {
				this.style._parseCSS( css )
			}.bind(this) )
			.toThrow("exception: CSS must be in string format");
		});

		it('should convert CSS to an object', function() {
			var css = 'font-size:14px;color:#3a3a3a;';
			var obj = this.style._parseCSS(css);
			expect(obj).toEqual([{
				property: 'font-size',
				value: '14px'
			}, {
				property: 'color',
				value: '#3a3a3a'
			}]);
		});
	});

	describe('Converting to CSS', function() {

		it('should convert styles to css', function() {
			var style = new Style([{
				property: 'font-size',
				value: '12px'
			}, {
				property: 'color',
				value: '#888'
			}, {
				property: 'font-weight',
				value: '300'
			}, {
				property: 'margin-right',
				value: '10px'
			}]);
			expect( style.css() ).toBe('font-size:12px;color:#888;font-weight:300;margin-right:10px;')
		});
	});

	describe('Querying', function() {

		beforeEach(function() {
			this.style = new Style([{
				property: 'font-size',
				value: '12px'
			}, {
				property: 'color',
				value: '#888'
			}, {
				property: 'font-weight',
				value: '300'
			}, {
				property: 'margin-right',
				value: '10px'
			}]);
		})
		
		it('should return the style attribute for a given property', function() {
			expect( this.style.get('font-size') ).toBe('12px');
		});

		it('should return undefined if the item does not have the property set', function() {
			expect( this.style.get('text-align') ).toBeUndefined();
		});
	});

	describe('Merging', function() {

		beforeEach(function() {
			this.style = new Style([{
				property: 'font-size',
				value: '12px'
			}, {
				property: 'color',
				value: '#888'
			}, {
				property: 'font-weight',
				value: '300'
			}, {
				property: 'margin-right',
				value: '10px'
			}]);
		});

		it('should only merge arrays of style objects', function() {
			expect(function() {
				this.style._mergeCSS('font-size:14px;color:#3a3a3a;');
			}.bind(this) )
			.toThrow("exception: CSS must be an array");
		});

		it('should replace existing styles and append new ones', function() {
			this.style._mergeCSS([{
				property: 'font-size',
				value: '14px'
			}, {
				property: 'font-weight',
				value: '400'
			}]);
			expect(this.style.styles).toEqual([{
				property: 'font-size',
				value: '14px'
			}, {
				property: 'color',
				value: '#888'
			}, {
				property: 'font-weight',
				value: '400'
			}, {
				property: 'margin-right',
				value: '10px'
			}]);
		});
	});

	describe('Updating', function() {

		beforeEach(function() {
			this.style = new Style([{
				property: 'font-size',
				value: '12px'
			}, {
				property: 'color',
				value: '#888'
			}]);
		});

		it('should accept a css string', function() {
			this.style.update('font-size:14px;color:#3a3a3a;');
			expect(this.style.styles).toEqual([{
				property: 'font-size',
				value: '14px'
			}, {
				property: 'color',
				value: '#3a3a3a'
			}]);
		});

		it('should accept an object of styles', function() {
			this.style.update({
				property: 'font-size',
				value: '14px'
			});
			expect(this.style.styles).toEqual([{
				property: 'font-size',
				value: '14px'
			}, {
				property: 'color',
				value: '#888'
			}]);
		});

		it('should accept an array of style objects', function() {
			this.style.update([{
				property: 'font-size',
				value: '14px'
			}, {
				property: 'color',
				value: '#3a3a3a'
			}]);
			expect(this.style.styles).toEqual([{
				property: 'font-size',
				value: '14px'
			}, {
				property: 'color',
				value: '#3a3a3a'
			}]);
		});

		it('should update when there is no existing style data', function() {
			this.style.styles = [];
			this.style.update('font-size:14px;color:#3a3a3a;');
			expect(this.style.styles).toEqual([{
				property: 'font-size',
				value: '14px'
			}, {
				property: 'color',
				value: '#3a3a3a'
			}]);
		});

		it('should throw when it is passed an undefined value', function() {
			expect(function() {
				this.style.update( undefined )
			}.bind(this) )
			.toThrow("exception: CSS must be a string, array or object");
		})
	});
});
},{"../../javascripts/models/ColumnsEvent.js":20}],49:[function(require,module,exports){
var ColumnsEvent 		= require('../../javascripts/models/ColumnsEvent.js');
var Item 				= require('../../javascripts/models/Item.js');
var Table 				= require('../../javascripts/models/Table.js');
var Layout 				= require('../../javascripts/models/Layout.js');
var EmbedDetailsView 	= require('../../javascripts/controllers/EmbedDetailsView.js');
var UploadView 			= require('../../javascripts/controllers/UploadView.js');
var config 				= require('../../javascripts/config.js');
var DEFAULTS			= require('../../javascripts/styling/defaults.js');

describe('Table', function () {

	afterEach(function() {
		ColumnsEvent.offAll();
	});

	describe('Initialization', function() {

		it('should initialize with the correct defaults', function() {
			var table = new Table();
			expect( table.data ).toEqual( [] );
			expect( table.title ).toBe( '' );
			expect( table.source ).toBe( '' );
			expect( table.source_url ).toBe( '' );
			expect( table.columns ).toEqual( [] );
			expect( table.layout ).toBeUndefined();
			expect( table.id ).toBeUndefined();
		});

		it('should initialize with a data array', function() {
			var data = [
				[ 'Jeremy', 'Lubin', 'Princeton' ],
				[ 'Jess', 'Schwartz', 'Mechanicsburg' ],
				[ 'Amir', 'Kanpurwala', 'West Windsor' ]
			];
			var table = new Table( { data: data } );
			expect( table.data ).toEqual( data );
		});

		it('should initialize with a title', function() {
			var meta = { title: "My Table" };
			var table = new Table( meta );
			expect( table.title ).toBe("My Table");
		});

		it('should initialize with a source', function() {
			var meta = { source: "My Source" };
			var table = new Table( meta );
			expect( table.source ).toBe("My Source");
		});

		it('should initialize with a source url', function() {
			var meta = { source_url: "https://mysource.com/my-table" };
			var table = new Table( meta );
			expect( table.source_url ).toBe("https://mysource.com/my-table");
		});

		it('should initialize with columns', function () {
			var meta = { columns: [ "First Name", "Last Name", "Hometown" ] };
			var table = new Table( meta );
			expect( table.columns[ 0 ].title ).toEqual("First Name");
			expect( table.columns[ 1 ].title ).toEqual("Last Name");
			expect( table.columns[ 2 ].title ).toEqual("Hometown");
		});

		it('should initialize with a layout', function() {
			var meta = { columns: [ "First Name", "Last Name", "Hometown" ] };
			var table = new Table( meta );
			expect( table.layout instanceof Layout ).toBeTruthy();
		});

		xit('should initialize with event listeners', function() {
			var table = new Table();
			spyOn( table, '_setupEventListeners' );
			expect( table._setupEventListeners ).toHaveBeenCalled();
		});
	});

	describe('Updating Table Properties', function() {

		beforeEach(function() {
			this.table = new Table();
		});

		it('should merge the passed in properties with the existing ones', function() {
			var data = [
				[ 'Jeremy', 'Lubin', 'Princeton' ],
				[ 'Jess', 'Schwartz', 'Mechanicsburg' ],
				[ 'Amir', 'Kanpurwala', 'West Windsor' ]
			];
			var props = {
				data: data,
      			title: "My Table",
      			source: "The Noun Project",
      			source_url: "https://thenounproject.com/my-table",
      			columns: [ "First Name", "Last Name", "Hometown" ],
      			id: 4
      		}

      		this.table._update( props );
      		expect( this.table.data ).toEqual( data );
      		expect( this.table.title ).toBe("My Table");
      		expect( this.table.source ).toBe("The Noun Project");
      		expect( this.table.source_url ).toBe("https://thenounproject.com/my-table");
      		expect( this.table.columns[ 0 ].title ).toEqual("First Name");
			expect( this.table.columns[ 1 ].title ).toEqual("Last Name");
			expect( this.table.columns[ 2 ].title ).toEqual("Hometown");
			expect( this.table.id ).toBe( 4 );
			expect( this.table.layout instanceof Layout ).toBeTruthy();
		});

		xit('should update the layout with new columns', function() {
			var props = {
      			columns: [ "First Name", "Last Name", "Hometown" ]
      		}
      		this.table._udpate( props  );
      		expect( this.table.layout instanceof Layout ).toBeTruthy();
		});

		it('should not properties that are not provided', function() {
			this.table._update();
			expect( this.table.data ).toEqual( [] );
			expect( this.table.title ).toBe( '' );
			expect( this.table.source ).toBe( '' );
			expect( this.table.source_url ).toBe( '' );
			expect( this.table.columns ).toEqual( [] );
			expect( this.table.layout ).toBeUndefined();
			expect( this.table.id ).toBeUndefined();
		});

		it('should emit an update event', function() {
			spyOn( this.table, '_emitChange' );
			this.table._update( {} );

			expect( this.table._emitChange ).toHaveBeenCalled();
		});

		it('should not emit an update event if there were no params', function() {
			spyOn( this.table, '_emitChange' );
			this.table._update();

			expect( this.table._emitChange ).not.toHaveBeenCalled();
		});
	});

	describe('Emitting Events', function() {

		beforeEach(function() {
			this.table = new Table();
		});

		it('should emit a change event', function() {
			spyOn( ColumnsEvent, 'send' );
			this.table._emitChange();

			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.Table.DidChange');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].table ).toEqual( this.table );
		});

		it('should emit an upload success event', function() {
			spyOn( ColumnsEvent, 'send' );
			this.table._emitUploadSuccess();

			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.Table.DidUploadWithSuccess');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].table ).toEqual( this.table );
		});

		it('should emit an upload failure event', function() {
			spyOn( ColumnsEvent, 'send' );
			this.table._emitUploadFail();

			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.Table.DidUploadWithFailure');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].table ).toEqual( this.table );
		});

		it('should emit an update success event', function() {
			spyOn( ColumnsEvent, 'send' );
			this.table._emitUpdateSuccess();

			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.Table.DidUpdateWithSuccess');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].table ).toEqual( this.table );
		});

		it('should emit an update failure event', function() {
			spyOn( ColumnsEvent, 'send' );
			this.table._emitUpdateFail();

			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.Table.DidUpdateWithFailure');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].table ).toEqual( this.table );
		});
	});

	describe('Creating Items', function() {
		var table;

		beforeEach(function() {
			table = new Table();
			spyOn( table, 'cleanColumn' ).and.callThrough();
		});

		it('should create items from an array of column names', function() {
			var names = [ "First Name", "Last Name", "Hometown" ];
			var columns = table.itemsFromColumnNames( names );
			expect( columns[ 0 ].title ).toEqual("First Name");
			expect( columns[ 1 ].title ).toEqual("Last Name");
			expect( columns[ 2 ].title ).toEqual("Hometown");
		});

		it('should create an item from a single column name', function() {
			var names = "First Name";
			var columns = table.itemsFromColumnNames( names );
			expect( columns[ 0 ].title ).toEqual("First Name");
		});

		it('should attach default styles to the first three items', function() {
			var names = [ "First Name", "Last Name", "Hometown", "Age" ];
			var columns = table.itemsFromColumnNames( names );
			expect( columns[ 0 ].style.styles ).toEqual( DEFAULTS.styles[0] );
			expect( columns[ 1 ].style.styles ).toEqual( DEFAULTS.styles[1] );
			expect( columns[ 2 ].style.styles ).toEqual( DEFAULTS.styles[2] );
			expect( columns[ 3 ].style.styles ).toEqual( [] );
		});

		it('should return items if passed an array of items', function() {
			var items = [ new Item({ title: 'First Name' }), new Item({ title: 'Last Name' }), new Item({ title: 'Hometown' }), new Item({ title: 'Age' }) ];
			var columns = table.itemsFromColumnNames( items );
			expect( columns.length ).toBe( 4 );
			expect( columns ).toEqual([ new Item({ title: 'First Name' }), new Item({ title: 'Last Name' }), new Item({ title: 'Hometown' }), new Item({ title: 'Age' })] );
		});

		it('should append a number to any duplicate columns', function() {
			var items = [ 'First Name', 'First Name', 'First Name', 'First Name' ];
			expect( table.itemsFromColumnNames( items )[ 0 ].title ).toEqual( 'First Name' );
			expect( table.itemsFromColumnNames( items )[ 1 ].title ).toEqual( 'First Name 2' );
			expect( table.itemsFromColumnNames( items )[ 2 ].title ).toEqual( 'First Name 3' );
			expect( table.itemsFromColumnNames( items )[ 3 ].title ).toEqual( 'First Name 4' );
		});

		it('should clean all of the columns', function() {
			var items = [ 'First Name', 'Last Name', 'Hometown', 'Age' ];
			var columns = table.itemsFromColumnNames( items );
			expect( table.cleanColumn.calls.count() ).toBe( 4 );
		});

		it('should return an item if passed a single item', function() {
			var item = new Item({ title: "My Item" });
			var columns = table.itemsFromColumnNames( item );
			expect( columns[ 0 ].title ).toEqual("My Item");
		});

		it('should throw an error if sent anything other than an array or a string', function() {
			var names = 5;
			expect(function() {
				table.itemsFromColumnNames( names );
			}).toThrow("exception: Column names must be a string or an array of strings");
		});
	});

	describe('Appending a number to a column name', function() {
		var table,
			column;

		beforeEach(function() {
			table = new Table();
		});

		it('should append the count to the column so that the name is longer after than it was before', function() {
			column = 'This is my column name';
			expect( table.appendColumnWithCount( column, 10 ).length ).toBe( column.length + 3 );
			expect( table.appendColumnWithCount( column, 1 ).length ).toBe( column.length + 2 );
		});

		it('should truncate the column so that the name is the same length before as after if appending the count would put the column over the limit', function() {
			column = 'aherhaskflqoetickdneglticoelfotiedcstufidosqleidcjflawudjftoweud';
			expect( table.appendColumnWithCount( column, 10 ).length ).toBe( 64 );
			expect( table.appendColumnWithCount( column, 1 ).length ).toBe( 64 );
			expect( table.appendColumnWithCount( column + 'haera' , 10 ).length ).toBe( 64 );
		});

		it('should append the count to the column name, separated by an underscore', function() {
			expect( table.appendColumnWithCount( "Hi this is a column", 10 ) ).toBe( "Hi this is a column 10" );
			expect( table.appendColumnWithCount( "aherhaskflqoetickdneglticoelfotiedcstufidosqleidcjflawudjftoweudasdf", 10 ) ).toBe( "aherhaskflqoetickdneglticoelfotiedcstufidosqleidcjflawudjftow 10" );
		});
	});

	describe('Cleaning a table column name', function() {
		var table;

		beforeEach(function() {
			table = new Table();
		});

		it('should remove trailing periods and whitespace', function() {
			expect( table.cleanColumn( 'Github.' ) ).toEqual( 'Github' );
		});

		it('should truncate anything after the 64th character', function() {
			expect( table.cleanColumn('hi') ).toBe('hi');
			expect( table.cleanColumn( 'aherhaskflqoetickdneglticoelfotiedcstufidosqleidcjflawudjftoweudci') )
				.toBe('aherhaskflqoetickdneglticoelfotiedcstufidosqleidcjflawudjftoweud');
			expect( table.cleanColumn( 'aherhaskflqoetickdneglticoelfotied cstufidosqleidcjflawudjftoweudci aherhaskflqoetickdneglticoelfotiedcstufidosqleidcjflawudjftoweudci') )
				.toBe('aherhaskflqoetickdneglticoelfotied cstufidosqleidcjflawudjftoweu');
		})

	});

	describe('Listening for Table Events', function() {

		beforeEach(function() {
			this.table = new Table();
		});

		it('should listen for item creation', function() {
			spyOn( this.table, 'itemsFromColumnNames' ).and.callThrough();
			var columns = [ "First Name", "Last Name", "Hometown" ];
			// var columnsEvent = document.createEvent('CustomEvent');
			// columnsEvent.initCustomEvent('Columns.UploadView.DidParseColumnNamesForFile', false, false, {
			// 	uploadView: 	new UploadView(),
			// 	fileName: 		"My File",
			// 	columns: 		columns
			// });
			// document.dispatchEvent(columnsEvent);

			ColumnsEvent.send('Columns.UploadView.DidParseColumnNamesForFile', {
				uploadView: 	new UploadView(),
				fileName: 		"My File",
				columns: 		columns
			});

			expect( this.table.itemsFromColumnNames ).toHaveBeenCalledWith( columns );
			expect( this.table.columns[ 0 ].title ).toEqual("First Name");
			expect( this.table.columns[ 1 ].title ).toEqual("Last Name");
			expect( this.table.columns[ 2 ].title ).toEqual("Hometown");
		});

		it('should listen for row creation', function() {
			this.table.columns = [ new Item({ title: 'First Name' }), new Item({ title: 'Last Name' }), new Item({ title: 'Hometown' }), new Item({ title: 'Age' }) ];
			this.table.data = [{
				'first_name': 'Jeremy',
				'last_name': 'Lubin',
				'hometown': 'Princeton'				
			}, {
				'first_name': 'Jess',
				'last_name': 'Schwartz',
				'hometown': 'Mechanicsburg'	
			}];
			var row = [ 'Amir', 'Kanpurwala', 'West Windsor' ];
			// var columnsEvent = document.createEvent('CustomEvent');
			// columnsEvent.initCustomEvent('Columns.UploadView.DidParseDataRowForFile', false, false, {
			// 	uploadView: 	this,
			// 	fileName: 		"My File",
			// 	row: 			row
			// });
			// document.dispatchEvent(columnsEvent);

			ColumnsEvent.send('Columns.UploadView.DidParseDataRowForFile', {
				uploadView: 	this,
				fileName: 		"My File",
				row: 			row
			});

			// expect( this.table.data ).toEqual([
			// 	[ 'Jeremy', 'Lubin', 'Princeton' ],
			// 	[ 'Jess', 'Schwartz', 'Mechanicsburg' ],
			// 	[ 'Amir', 'Kanpurwala', 'West Windsor' ]
			// ]);
			expect( this.table.data ).toEqual([{
				'first_name': 'Jeremy',
				'last_name': 'Lubin',
				'hometown': 'Princeton'				
			}, {
				'first_name': 'Jess',
				'last_name': 'Schwartz',
				'hometown': 'Mechanicsburg'	
			}, {
				'first_name': 'Amir',
				'last_name': 'Kanpurwala',
				'hometown': 'West Windsor'	
			}]);
		});

		it('should listen for parsing completion', function() {
			spyOn( this.table, '_uploadFile' );
			var file = { name: 'test.csv' };
			// var columnsEvent = document.createEvent('CustomEvent');
			// columnsEvent.initCustomEvent('Columns.UploadView.DidCompleteParseForFile', false, false, {
			// 	uploadView: 	this,
			// 	file: 			file
			// });
			
			ColumnsEvent.send('Columns.UploadView.DidCompleteParseForFile', {
				uploadView: 	this,
				file: 			file
			});

			expect( this.table._uploadFile ).toHaveBeenCalledWith( file );
		});

		it('should listen to layout updates', function() {
			spyOn( this.table, '_update' );
			spyOn( this.table, '_updateTable' );
				
			var layout = new Layout();

			ColumnsEvent.send('Columns.Layout.DidChange', {
				layout: 	layout
			});

			expect( this.table._update ).toHaveBeenCalledWith({ layout: layout });
			expect( this.table._updateTable ).toHaveBeenCalled();
		});

		it('should listen for updates to table meta-data', function() {
			spyOn( this.table, '_update' );
			spyOn( this.table, '_updateTable' );

			// var columnsEvent = document.createEvent('CustomEvent');
			// columnsEvent.initCustomEvent('Columns.EmbedDetailsView.DidUpdatePropertyWithValue', false, false, {
			// 	embed: 	new EmbedDetailsView(),
			// 	property: 'title',
			// 	value: 'My New Table Name'
			// });
			
			ColumnsEvent.send('Columns.EmbedDetailsView.DidUpdatePropertyWithValue', {
				embed: 	new EmbedDetailsView(),
				property: 'title',
				value: 'My New Table Name'
			});

			expect( this.table._update ).toHaveBeenCalledWith({ title: 'My New Table Name' });
			expect( this.table._updateTable ).toHaveBeenCalled();
		});

	});

	xdescribe('Uploading a File', function() {

		beforeEach(function() {
      		jasmine.Ajax.install();
      		this.table = new Table({
      			title: "My Table",
      			source: "The Noun Project",
      			source_url: "https://thenounproject.com/my-table"
      		});
    	});

	    afterEach(function() {
	    	jasmine.Ajax.uninstall();
	    });

		it('should upload a file to the api with the correct parameters', function() {
			var file = { name: 'test.csv' };

			this.table._uploadFile( file );

			expect( jasmine.Ajax.requests.mostRecent().url ).toBe( config.api.host + '/columns/table' );
		});

		it('should set a table id on success', function() {
			spyOn( this.table, '_update' );
			spyOn( this.table, '_emitUploadSuccess' );
			var data = {
				status: 'success',
				data: {
					table_id: 4
				}
			};
			this.table._onUploadSuccess( data );

			expect( this.table._update ).toHaveBeenCalledWith({ id: 4 });
			expect( this.table._emitUploadSuccess ).toHaveBeenCalled();
		});

		it('should redirect to the failure function when an error is returned from the server', function() {
			spyOn( this.table, '_update' );
			spyOn( this.table, '_onUploadFail' );
			var data = {
				status: 'fail',
				message: 'problemz'
			};
			this.table._onUploadSuccess( data, 'status', 'request' );

			expect( this.table._update ).not.toHaveBeenCalled();
			expect( this.table._onUploadFail ).toHaveBeenCalledWith( 'request', 'status', 'problemz' );
		});

		it('should notify the app on failure', function() {
			spyOn( this.table, '_emitUploadFail' );

			this.table._onUploadFail( 'request', 'status', 'problemz' );

			expect( this.table._emitUploadFail ).toHaveBeenCalled();
		});

	});

	describe('Uploading Updated Table Meta-Data', function() {

		beforeEach(function() {
      		// jasmine.Ajax.install();
      		spyOn( $, 'post' );
      		this.table = new Table({
      			title: "My Table",
      			source: "The Noun Project",
      			source_url: "https://thenounproject.com/my-table",
      			columns: [ "First Name", "Last Name", "Hometown" ],
      			id: 4
      		});
    	});

	    afterEach(function() {
	    	// jasmine.Ajax.uninstall();
	    });

		it('should upload meta-data to the api with the correct table id and data', function() {
			this.table._updateTable();

      		expect( $.post.calls.mostRecent().args[0] ).toEqual( config.api.host + '/columns/table/4' );
      		expect( $.post.calls.mostRecent().args[1] ).toEqual({
      			title: "My Table",
      			source: "The Noun Project",
      			source_url: "https://thenounproject.com/my-table",
      			layout: JSON.stringify( new Layout( this.table.columns ).model ),
      			columns: "First Name,Last Name,Hometown"
      		});
		});

		it('should notify the app on success', function() {
			spyOn( this.table, '_emitUpdateSuccess' );

			this.table._onUpdateSuccess({ status: 'success' });

			expect( this.table._emitUpdateSuccess ).toHaveBeenCalled();
		});

		it('should notify the app on failure', function() {
			spyOn( this.table, '_emitUpdateFail' );
			spyOn( this.table, '_emitUpdateSuccess' );

			this.table._onUpdateSuccess({ status: 'fail', message: 'problemz' });

			expect( this.table._emitUpdateFail ).toHaveBeenCalled();
			expect( this.table._emitUpdateSuccess ).not.toHaveBeenCalled();
		});
	});

	describe('Get Item for column name', function() {

		beforeEach(function() {
			this.table = new Table({
      			columns: [ "First Name", "Last Name", "Hometown" ],
      		});
		});

		it('should return the correct item given an unformatted name', function() {
			expect( this.table.getItemForData( 'first_name' ) ).toEqual( this.table.columns[ 0 ] );
			expect( this.table.getItemForData( 'hometown' ) ).toEqual( this.table.columns[ 2 ] );
		});

		it('should return undefined if there is no item match', function() {
			expect( this.table.getItemForData( 'hello' ) ).toBeUndefined();
		});

		it('should return undefined if there are no items', function() {
			this.table.columns = undefined;
			expect( this.table.getItemForData( 'first_name' ) ).toBeUndefined();
		});

		it('should return undefined if there is no data passed in', function() {
			expect( this.table.getItemForData() ).toBeUndefined();
		});
	});

	describe('Get String from Column Names', function() {

		beforeEach(function() {
			this.table = new Table({
				columns: [ "First Name", "Last Name", "Hometown" ]
			});
		});

		it('should return a string from column names', function() {
			var string = this.table.stringFromColumns( this.table.columns );
			expect( string ).toBe( "First Name,Last Name,Hometown" );
		});
	});
});
},{"../../javascripts/config.js":2,"../../javascripts/controllers/EmbedDetailsView.js":4,"../../javascripts/controllers/UploadView.js":18,"../../javascripts/models/ColumnsEvent.js":20,"../../javascripts/models/Item.js":21,"../../javascripts/models/Layout.js":22,"../../javascripts/models/Table.js":24,"../../javascripts/styling/defaults.js":25}],50:[function(require,module,exports){
xdescribe('Group Model', function() {

	describe('Initialization', function() {

		beforeEach(function() {
			this.layout = [{
				property:'flex-direction',
					value: 'row'
				}, {
					property: 'justify-content',
					value: 'flex-start'
				}, {
					property: 'align-items',
					value: 'center'
			}]
		});

		it('should initialize without any properties', function() {
			var group = new TemplateGroup();
			expect( group.layout ).toBeUndefined();
			expect( group.placeholder ).toBe( false );
		});

		it('should iniialize with a layout', function() {
			// var layout = 
			var group = new TemplateGroup({ layout: this.layout });
			expect( group.layout ).toEqual( this.layout );
			expect( group.placeholder ).toBe( false );
		});

		it('should optionally iniialize as a placeholder', function() {


		});
	});
});
},{}]},{},[26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50]);
