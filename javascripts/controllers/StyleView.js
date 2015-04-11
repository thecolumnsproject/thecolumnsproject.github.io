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
