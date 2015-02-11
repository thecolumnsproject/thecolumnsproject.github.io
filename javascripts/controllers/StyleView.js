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
	document.addEventListener( 'Columns.StyleInputView.ValueDidUpdateForPropertyAndItem', this._onStyleUpdate.bind( this ), false);
	document.addEventListener( 'Columns.StyleSegmentedButtonView.ValueDidUpdateForPropertyAndItem', this._onStyleUpdate.bind( this ), false);
	document.addEventListener( 'Columns.StyleMultipleSegmentedButtonView.ValueDidUpdateForPropertyAndItem', this._onStyleUpdate.bind( this ), false);
};

StyleView.prototype._onStyleUpdate = function( event ) {

	this._emitChange( event.detail.item, event.detail.property, event.detail.value );
};

StyleView.prototype._emitChange = function( item, property, value ) {

	// Alert any listeners that the group is now engaged to be dropped upon
	// var event = new CustomEvent( 'Columns.StyleView.PropertyDidUpdateWithValueForGroupView', {
		// groupView: 	item,
		// property: property,
		// value: value
	// });

	var columnsEvent = document.createEvent('CustomEvent'),
		eventType;

	if ( item instanceof Item ) {

		eventType = 'Columns.StyleView.PropertyDidUpdateWithValueForItem';
		columnsEvent.initCustomEvent( eventType, false, false, {
			item: 	item,
			property: property,
			value: value
		});
		document.dispatchEvent(columnsEvent);

	} else if ( item instanceof TemplateGroupView ) {
		
		eventType = 'Columns.StyleView.PropertyDidUpdateWithValueForGroupView';
		columnsEvent.initCustomEvent( eventType, false, false, {
			groupView: 	item,
			property: property,
			value: value
		});
		document.dispatchEvent(columnsEvent);

	} else {
		// Do nothing
	}
};

