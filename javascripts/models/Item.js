// Item Object
// -------------
// Use this model to store a column Item
// and manage its style information

Item = function( params ) {

	this.id;
	this.title;
	this.style;

	if ( params ) {
		this.title = params.title || '';
		this.style = new Style( params.style );
	}
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