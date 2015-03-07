// Manage the display of a list of items
ItemsView = function( items ) {

	this.items 		= items || [];
	this.template 	= Columns.Templates['templates/layout/columns.hbs'];
	this.$items;

	this.render( items );
	this._setupEventListeners();
};

ItemsView.prototype.render = function() {

	// Remove any existing columns
	$('.layout-columns').remove();

	var $columns = $( this.template() );

	if ( this.items ) {
		this.items.forEach(function( item, i ) {

			var itemView = new ItemView( item );
			$columns.append( itemView.render() );

		});
	}

	$("#columns").append( $columns );

	// this.setupDragListeners($(this.LAYOUT_COLUMN_SELECTOR));
	// this.setupDropListeners();

	this.$items = $columns;
	return this.$items;
};

ItemsView.prototype.updateItem = function( item ) {

	// Re-render the item
	this.items.forEach(function( oldItem, i ) {

		if ( oldItem.is( item ) ) {
			var itemView = new ItemView( item );
			this.$items.find('.layout-column').eq( i ).replaceWith( itemView.render() );
		}

	}.bind( this ) );

	this._emitChange();
};

ItemsView.prototype._emitChange = function() {
	// Let everyone know that the items view has changed
	// var columnsEvent = document.createEvent('CustomEvent');
	// columnsEvent.initCustomEvent('Columns.ItemsView.DidChange', false, false, {
	// 	itemsView: 	this
	// });
	// document.dispatchEvent(columnsEvent);
	ColumnsEvent.send( 'Columns.ItemsView.DidChange', {
		itemsView: 	this
	});

};

ItemsView.prototype._setupEventListeners = function() {

	// Listen for table updates
	ColumnsEvent.on( 'Columns.Table.DidChange', this._onTableChange.bind( this ) );

	// Listen for item updates
	ColumnsEvent.on( 'Columns.Item.DidChange', this._onItemChange.bind( this ) );
};

ItemsView.prototype._onTableChange = function( event, data ) {

	this._updateWithItems( data.table.columns );
	this.render();
};

ItemsView.prototype._onItemChange = function( event, data ) {
	this.updateItem( data.item );
};

ItemsView.prototype._updateWithItems = function( items ) {

	if( items ) {

		if ( Array.isArray( items ) ) {

			items.forEach(function( item ) {
				this._updateWithItem( item );
			}.bind( this ));

			this._emitChange();

		} else {
			throw "exception Items must be array of items or single item";
		}
	}
};

ItemsView.prototype._updateWithItem = function( item ) {
	var duplicates = [];

	if ( item && item instanceof Item ) {
		duplicates = this.items.filter(function( existingItem ) {
			return existingItem.is( item );
		});

		if ( !duplicates.length ) {
			this.items.push( item );
		}
	}
};