// Manage the display of a single item
// within the list of items
ItemView = function( item ) {

	this.item = item || new Item();
	this.template = Columns.Templates['templates/layout/column.hbs'];
};

ItemView.prototype.render = function() {
	var $item = $( this.template({ title: this.item.title }) );
	$item.data('style', this.item.style.styles);
	return $item;
};