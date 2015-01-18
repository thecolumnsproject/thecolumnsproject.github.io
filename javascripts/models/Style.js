// Style Object
// -------------
// Use this model to handle styling information.

Style = function(styles) {

	// Accept either an array of multiple styles
	// or just a single style object
	if ( Array.isArray( styles ) ) {
		this.styles = styles;
	} else if ( typeof styles === 'object' ) {
		this.styles = [ styles ]
	} else {
		this.styles = [];
	}
};

Style.prototype._parseCSS = function(css) {

	// Accept a CSS string
	// and convert it into an array of css properties and values
	if (typeof css !== 'string') throw "exception: CSS must be in string format";

	var styleObj = [];

	// Remove all spaces
	css = css.replace(/ /g, '');
	// Remove the last semicolon
	css = css.slice(0, -1);
	// Split styles
	styles = css.split(';');
	// Creat object for each style
	styles.forEach(function(style, i) {
		style = style.split(':');
		styleObj.push({
			property: style[0],
			value: style[1]
		});
	});
	return styleObj;	
};