// Manage the display of a single item
// within the list of items
ItemView = function( item ) {

	this.item = item || new Item();
	this.template = Columns.Templates['templates/layout/column.hbs'];
	this.$item;
};

ItemView.prototype.render = function() {
	var $item = $( this.template({ title: this.item.formattedTitle() }) );
	$item.data('style', this.item.style.styles);
	this.$item = $item;

	// this.setupEvents();

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
};