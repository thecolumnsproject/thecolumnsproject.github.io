// Item Object
// -------------
// Use this model to store a column Item
// and manage its style information

Item = function( params ) {

	this.id;
	this.title;
	this.style;

	if ( params ) {
		// this.id 	= 
		this.title 	= params.title || '';
		this.style 	= new Style( params.style );
	}

	this._setupEventListeners();
}

Item.prototype.formattedTitle = function() {
	// Return a lowercase version of the title
	// with underscores instead of spaces
	if ( !this.title ) {
		return '_';
	} else if ( this.title === '_' ) {
		return this.title;
	} else {
		return this.title.toLowerCase().replace( /_/g, ' ' ).replace(/\b./g, function(m){ return m.toUpperCase(); });
	}
}

Item.prototype.unformattedTitle = function() {
	// Return a lowercase version of the title
	// with underscores instead of spaces
	if (!this.title) {
		return '_';
	} else {
		return this.title.toLowerCase().replace(/ /g, '_');
	}
}

// // Return the correct style attribute for a given property
// // @param { string } property -- the requested layout property
// // @return { string } the corresponding value
// Item.prototype.getStyle = function( property ) {
// 	var value;

// 	// Loop through each property until we find a match
// 	if ( this.style ) {
// 		value = this.style.get( property )
// 	}

// 	// As a last resort, check the css for the element
// 	// and return its value
// 	if ( value ) {
// 		return value;
// 	} else {
// 		return this.$group.css( property );
// 	}
// };

Item.prototype.is = function( item ) {
	if ( item instanceof Item ) {
		return this.title === item.title;
	} else {
		throw "exception: Comparison must be with another Item";
	}
}

Item.prototype._setupEventListeners = function() {

	// Listen for style changes on this Item
	document.addEventListener( 'Columns.StyleView.PropertyDidUpdateWithValueForItem', this._onItemStyleDidChange.bind( this ), false );
};

Item.prototype._onItemStyleDidChange = function( event ) {
	if ( this.is( event.detail.item ) ) {
		this.style.update( [{
			property: event.detail.property,
			value: event.detail.value
		}] );
		this._emitChange();
	}
};

Item.prototype._emitChange = function() {

	// Alert any listeners that the group has changed
	// var event = new CustomEvent( 'Columns.Item.DidChange', {
	// 	groupView: 	this
	// });
	var event = document.createEvent('CustomEvent');
	event.initCustomEvent('Columns.Item.DidChange', false, false, {
		item: 	this
	});
	document.dispatchEvent(event);
};