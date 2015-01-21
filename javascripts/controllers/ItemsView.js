// Manage the display of a list of items
ItemsView = function( items ) {

	this.items 		= items;
	this.template 	= Columns.Templates['templates/layout/columns.hbs'];
	this.$items;

	this.render(items);
};

ItemsView.prototype.render = function( items ) {

	// Remove any existing columns
	$('.layout-columns').remove();

	var $columns = $( this.template() );

	if ( items ) {
		items.forEach(function( item, i ) {

			var itemView = new ItemView( item );
			$columns.append( itemView.render() );

		}.bind( this ));
	}

	$("#columns").append( $columns );

	// this.setupDragListeners($(this.LAYOUT_COLUMN_SELECTOR));
	// this.setupDropListeners();

	this.$items = $('.layout-columns');
	return this.$items;
};