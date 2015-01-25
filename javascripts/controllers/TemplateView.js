// Object to manage properties of and interaction
// with the template itself.

var ROW_GROUP_SELECTOR = '.layout-template-row-group', 
	ROW_VALUE_SELECTOR = '.layout-template-row-value';

TemplateView = function( layout )  {

	this.layout = layout || {};
	this.template = Columns.Templates['templates/layout/template.hbs'];
	this.$template;

	this.draggingItem;
	this.droppableItems = [];
};

TemplateView.prototype.render = function() {

	// Render the layout preview
	var preview = Columns.Templates['templates/layout/preview.hbs'];
	$('#layout').append(preview({
		source: config.embed.host + config.embed.path
	}));

	// For each node in the layout object,
	// render either a group or value
	// and recursively append them to each other
	// until we've constructed the full template
	var $row = this._renderRowComponent( this.layout );
	var $template = $( this.template() );
	$template.find('.layout-template-row').append( $row );
	$('#layout').append( $template );
	this.$template = $template;

	this._setupEvents();

	return this.$template;

};

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

		// Loop through all group subvalues and render those as well
		component.values.forEach(function (value, i) {
			$component.append( this._renderRowComponent( value ) );
		}.bind( this ));

		// Return the final component including rendered subviews
		return $component;

	} else if ( component.type === 'single' ) {
		componentView = new TemplateValueView( component.item );
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

	// Get any groups that only have a single item
	// but exclude the first group in the row
	var $groups = $( ROW_VALUE_SELECTOR + ':only-child' )
		.parent()
		.not( 'master > ' + ROW_GROUP_SELECTOR );

	// Unwrap the 'only children' of these groups
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

TemplateView.prototype._emitChange = function() {

};

TemplateView.prototype._setupEvents = function() {

	// Listen to drag events for items
	document.addEventListener( 'Columns.ItemView.ItemDidBeginDrag', this._onItemDidBeginDrag.bind( this ), false);
	document.addEventListener( 'Columns.ItemView.ItemDidEndDrag', this._onItemDidEndDrag.bind( this ), false);
	document.addEventListener( 'Columns.ItemView.ItemDidDrag', this._onItemDidDrag.bind( this ), false);

	// Listen to drag events for values
	document.addEventListener( 'Columns.TemplateValueView.ValueDidBeginDragWithItem', this._onValueDidBeginDrag.bind( this ), false);
	document.addEventListener( 'Columns.TemplateValueView.ValueDidEndDragWithItem', this._onValueDidEndDrag.bind( this ), false);
	document.addEventListener( 'Columns.TemplateValueView.ValueDidDragWithItem', this._onValueDidDrag.bind( this ), false);

	// Listen to drop events for groups
	document.addEventListener( 'Columns.TemplateGroupView.GroupDidBeginDropOverWithValueView', this._onGroupDidBeginDropOver.bind( this ), false);
	// document.addEventListener( 'Columns.TemplateValueView.ValueDidEndDragWithItem', this._onValueDidEndDrag.bind( this ), false);
	// document.addEventListener( 'Columns.TemplateValueView.ValueDidDragWithItem', this._onValueDidDrag.bind( this ), false);
};

TemplateView.prototype._onItemDidBeginDrag = function( event ) {
	this.draggingItem = event.detail.item;
};

TemplateView.prototype._onItemDidEndDrag = function( event ) {
	this.draggingItem = undefined;
	this.removePlaceholders();
};

TemplateView.prototype._onItemDidDrag = function( event ) {
	if ( this.droppableItems.length ) {
		this.removePlaceholders();
		this.positionDropForDragEventInParentWithPlaceholder( event, $( this.droppableItems[ this.droppableItems.length - 1 ] ), true );
	}
};

TemplateView.prototype._onValueDidBeginDrag = function( event ) {
	this.draggingItem = event.detail.valueView;
	this.dissolveSingleValueGroups();
};

TemplateView.prototype._onValueDidEndDrag = function( event ) {
	if ( !this.droppableItems.length ) {
		this.removeValue( event.detail.valueView );
		this._emitChange();
	}
}

TemplateView.prototype._onValueDidDrag = function( event ) {
	if ( this.droppableItems.length ) {
		this.removePlaceholders();
		this.positionDropForDragEventInParentWithPlaceholder( event, $( this.droppableItems[ this.droppableItems.length - 1 ] ), true );
	}
};

TemplateView.prototype._onGroupDidBeginDropOver = function( event ) {
	this.droppableItems.push( event.detail.groupView );
};

TemplateView.prototype.positionDropForDragEventInParentWithPlaceholder = function( event, $parent, placeholder ) {

};