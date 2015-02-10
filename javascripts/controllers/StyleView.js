var COMPONENT_TEMPLATE 	= Columns.Templates['templates/styling/component.hbs'],
	SECTION_TEMPLATE	= Columns.Templates['templates/styling/component-section.hbs'],
	ROW_TEMPLATE		= Columns.Templates['templates/styling/component-section-row.hbs'];

function StyleView( selection ) {

	this.item = selection ? this.getItemForSelection( selection ) : undefined;
	// this.templateGroups = this.item ? TemplateView.getGroupsForItem( this.item ) : [];
}

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

StyleView.prototype.getTemplatesForItem = function( item ) {
	// var 
};

StyleView.prototype.render = function() {

	// Get the appropriate data for the current item
	var type = this.item instanceof TemplateGroupView ? 'group' : 'text',
		title = this.item instanceof TemplateGroupView ? this.item.title() : this.item.title,
		componentData = Columns.styleData.types[type],
		$component,
		$componentBody,
		$section;

	// First create the component skeleton
	$component = $( COMPONENT_TEMPLATE({
		type: type,
		title: title
	}) );

	$componentBody = component.find('.style-component-body');

	// Next, loop through the data
	// creating the sections from the inside out
	componentData.forEach(function( section, i ) {
		$section = this._renderSection( section );
		$componentBody.append( $section );
	}.bind( this ) );

	this.$style = $component;

	$('#style').append( this.$style );
	return this.$style;
};

StyleView.prototype._renderSection = function( section ) {
	var $section,
		$sectionRows;
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

StyleView.prototype._renderRow = function( row ) {
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

StyleView.prototype._renderItem = function( item ) {
	var item;

	if ( item.kind === 'input' ) {
		item = new StyleInputView({
			unit: item.unit,
			type: item.type,
			canBeNegative: item.canBeNegative,
			appendControls: item.appendControls,
			prependIcon: item.prependIcon,
			label: item.label,
			property: item.property,
			value: item instanceof Item ? item.style.get( item.property ) : item.getStyle( item.property )
		});
	}

}