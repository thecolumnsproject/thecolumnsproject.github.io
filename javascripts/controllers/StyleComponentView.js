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