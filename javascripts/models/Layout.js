// Layout Object Methods
// ----------------------
// This is the layout object that controls
// the way the table is rendered and styled.
// The methods below allow us to:
// 1) Traverse the template and construct a new object
// 2) Update the object when styles are adjusted

Columns.Layout = new function() {
	
	// Create a default JSON for the layout
	// and update this whenever we change layout or style
	this.layoutObject = {
		style: [{
			property: 'padding',
			value: '12px'
		}]
	};

	// We need to treat layout properties slightly differently than regular css properties
	// to account for browser-specific prefixes
	this.LAYOUT_PROPERTIES = [
		'flex-direction',
		'justify-content',
		'align-items'
	];

	this.update = function(refresh) {
		this.layoutObject = this.objectForElement(Columns.Template.$template.children().first(), true);
		Columns.data.layout = this.layoutObject;
		if (refresh) {
			Columns.Template.render();
		}
	}

	// Private
	this.objectForElement = function($element, recursive) {
		var _this = this;
		var object = {};
		object['style'] = this.objectForCSS($element.attr('style'));
		object['layout'] = this.objectForLayout($element);
		object['type'] = $element.hasClass(Columns.Template.ROW_VALUE_CLASS) ? 'single' : 'group';
		if (object.type == 'single') {
			object['data'] = $element.text().trim();
		} else {
			if (recursive) {
				object['values'] = [];
				// $element.children().each(function(i, child) {
				$element.children().toArray().forEach(function(child, i) {
					object.values.push(_this.objectForElement($(child), true));
				});
			}
		}
		return object;
	};

	this.objectForCSS = function(css) {
		var styleObj = [];
		// Do processing only if there's css
		if (css) {
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
		}
		return styleObj;	
	};

	this.objectForLayout = function($element) {
		var layoutObj = [];
		this.LAYOUT_PROPERTIES.forEach(function(prop, i) {
			var value = $element.attr('layout-' + prop);
			if (value) {
				layoutObj.push({
					property: prop,
					value: value
				});
			}
		});
		return layoutObj;
	};

	// this.addEventListener('Style.didChange', this.update, false);
};