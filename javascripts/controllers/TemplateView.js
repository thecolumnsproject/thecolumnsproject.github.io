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
	document.addEventListener( 'Columns.TemplateGroupView.GroupDidEndDropOverWithValueView', this._onGroupDidEndDropOver.bind( this ), false);
	document.addEventListener( 'Columns.TemplateGroupView.GroupDidDropWithValueView', this._onGroupDidDrop.bind( this ), false);

};

TemplateView.prototype._onItemDidBeginDrag = function( event ) {
	this.draggingItem = event.detail.item.item;
};

TemplateView.prototype._onItemDidEndDrag = function( event ) {
	this.draggingItem = undefined;
	this.removePlaceholders();
};

TemplateView.prototype._onItemDidDrag = function( event ) {
	if ( this.droppableItems.length ) {
		this.removePlaceholders();
		this.positionDropForDragEventInParentWithPlaceholder( event, this.droppableItems[ this.droppableItems.length - 1 ].$item, true );
	}
};

TemplateView.prototype._onValueDidBeginDrag = function( event ) {
	this.draggingItem = event.detail.valueView.item;
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
		this.positionDropForDragEventInParentWithPlaceholder( event, this.droppableItems[ this.droppableItems.length - 1 ].$value , true );
	}
};

TemplateView.prototype._onGroupDidBeginDropOver = function( event ) {
	if ( this.droppableItems.indexOf( event.detail.groupView ) == -1 ) {
		this.droppableItems.push( event.detail.groupView );
	}
};

TemplateView.prototype._onGroupDidEndDropOver = function( event ) {
	var groupView = event.detail.groupView;

	groupView.removePlaceholders();
	this.droppableItems.splice( this.droppableItems.indexOf( groupView ), 1 );
};

TemplateView.prototype._onGroupDidDrop = function( event ) {
	var groupView = event.detail.groupView;

	// Don't do anything if this group isn't the most recently hovered over
	// of if there are currently no hovered groups (which should never be the case)
	if ( !this.droppableItems.length || this.droppableItems[ this.droppableItems.length - 1 ] !== groupView ) {
		return;
	}

	// Otherwise, clear all the group's placeholders
	groupView.removePlaceholders();

	// And finally position the new item in the template
	this.positionDropForDragEventInParentWithPlaceholder( event, this.droppableItems[ this.droppableItems.length - 1 ].$group , false )

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

TemplateView.prototype.wrapValueWithGroup = function( $value ) {
	
	// Make sure the group has the opposite direction of its parent
	var direction 	= $value.parent().data('flex-direction') === 'column' ? 'row' : 'column';
	var $group 		= new TemplateGroupView({
		placeholder: true,
		layout: [{
			property:  	'flex-direction',
			value: 		 direction
		}]
	}).render();

	// Wrap the value with the new group
	$value.wrap( $group );
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

	// Emit a change event
	// var event = new CustomEvent( 'Columns.TemplateView.DidChange', {
	// templateView: 	this
	// });
	var event = document.createEvent('CustomEvent');
	event.initCustomEvent('Columns.TemplateView.DidChange', false, false, {
		templateView: 	this
	});
	document.dispatchEvent(event);
};

TemplateView.prototype.positionDropForDragEventInParentWithPlaceholder = function( event, $parent, placeholder ) {

};