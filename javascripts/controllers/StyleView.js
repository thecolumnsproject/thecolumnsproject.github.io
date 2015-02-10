function StyleView( selection ) {

	this.item = selection ? this.getItemForSelection( selection ) : undefined;
	this.templateGroups = this.item ? TemplateView.getGroupsForItem( this.item ) : [];
}

StyleView.prototype.getItemForSelection = function( selection ) {

	if( selection instanceof Item ) {
		return selection;
	} else if ( selection instanceof ItemView ) {
		return selection.item;
	} else if ( selection instanceof TemplateValueView ) {
		return selection.item;
	} else {
		throw "exception: Selection must be an Item, ItemView or TemplateValueView";
	}
};

StyleView.prototype.getTemplatesForItem = function( item ) {
	// var 
};