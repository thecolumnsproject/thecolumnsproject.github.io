Columns['styleData'] = {
	components: {},
	types: {}
};

$(function() {

	// UI Constants
	var FIRST_ROW_SELECTOR = '.layout-template-row.master',
		ROW_VALUE_CLASS = 'layout-template-row-value',
		ROW_VALUE_SELECTOR = '.' + ROW_VALUE_CLASS,
		ROW_GROUP_CLASS = 'layout-template-row-group',
		ROW_GROUP_SELECTOR = '.' + ROW_GROUP_CLASS,
		ITEM_CLASS = 'layout-column',
		ITEM_SELECTOR = '.' + ITEM_CLASS;

	var STYLE_COMPONENT_SELECTOR = '.' + 'style-component',
		STYLE_COMPONENT_INPUT_SELECTOR = '.' + 'style-component-section-row-input',
		STYLE_COMPONENT_SEGMENTED_BUTTON_SELECTOR = '.' + 'style-component-section-row-segmentedButton';

	// We need to treat layout properties slightly differently than regular css properties
	// to account for browser-specific prefixes
	var LAYOUT_PROPERTIES = [
		'flex-direction',
		'justify-content',
		'align-items'
	];

	var _currentItems = [];
	var _layout = {};

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
		this._layoutObject = {
			style: [{
				property: 'padding',
				value: '12px'
			}]
		};

		this.update = function() {
			this._layoutObject = this.objectForElement($(FIRST_ROW_SELECTOR).children().first(), true);
			console.log(JSON.stringify(this._layoutObject));
		}

		// Private
		this.objectForElement = function($element, recursive) {
			var _this = this;
			var object = {};
			object['style'] = this.objectForCSS($element);
			object['layout'] = this.objectForLayout($element);
			object['type'] = $element.hasClass(ROW_VALUE_CLASS) ? 'single' : 'group';
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

		this.objectForCSS = function($element) {
			var styleObj = [];
			var css = $element.attr('style');
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
			LAYOUT_PROPERTIES.forEach(function(prop, i) {
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
	}

	// Every time an item is clicked,
	// either in the list of items or on the canvas,
	// update the current item and update the styling area
	Columns.setupTemplateListeners = function($template) {
		
		if ($template.hasClass(ROW_VALUE_CLASS)) {
			$template.click(function(e) {
				_currentItems = [this];
				updateStyling(this);

				// Don't pass the click on to the encompassing group
				e.stopPropagation();
			});
		}

		if ($template.hasClass(ROW_GROUP_CLASS)) {
			$template.click(function() {
				_currentItems = [this];
				updateStyling(this);
			});
		}
	}
	Columns.setupTemplateListeners($(ROW_VALUE_SELECTOR));
	Columns.setupTemplateListeners($(ROW_GROUP_SELECTOR));

	$(ITEM_SELECTOR).click(function() {
		// Get the corresponding layout object
		var $layoutItem = $(ROW_VALUE_SELECTOR + ":contains('" + this.innerHTML + "')");
		if ($layoutItem.length > 0) {
			_currentItems = [$layoutItem.get(0)];
		} else {
			_currentItems = [this];
		}

		updateStyling(_currentItems[0]);
	});

	// Responding to changes in the style tab
	// ---------------------------------------
	// 1) Update the master layout object with the new value
	// 2) Re-render the table with the new layout object

	// Updating the style tab
	// -----------------------
	// 1) Determine which components we need to show
	// 2) Render each component
	// 3) Connect each component's value with the selected item
	function updateStyling(item) {
		var items = [item];
		var $parents = $(item).parents();
		$parents.each(function(i, parent) {
			if ($(parent).hasClass(ROW_GROUP_CLASS)) {
				items.push(parent);
				_currentItems.push(parent);
			}

			if (i == $parents.length - 1) {
				renderStyleComponents(items);
			}
		});
	}

	function renderStyleComponents(items) {
		$(STYLE_COMPONENT_SELECTOR).remove();
		var component = Columns.Templates['templates/styling/component.hbs'];
		items.forEach(function(item, i) {
			$('#styling').append(component({
				index: i,
				type: getItemType(item),
				name: getItemName(item),
				styles: Columns.styleData.types[getItemType(item)]
			}));

			if (i == items.length - 1) {
				connectStyleComponents();
			}
		});
	}

	function connectStyleComponents() {
		
		// Input Methods
		// --------------
		$(STYLE_COMPONENT_INPUT_SELECTOR).find('input').keyup(function() {
			// Apply styling to the current component
			var properties = {};
			properties[$(this).data('property')] = $(this).val();
			updateCurrentItemWithProperties(this, properties);
		});

		$(STYLE_COMPONENT_INPUT_SELECTOR).find('input').change(function() {
			// Apply styling to the current component
			var properties = {};
			properties[$(this).data('property')] = $(this).val();
			updateCurrentItemWithProperties(this, properties);
		});

		$(STYLE_COMPONENT_INPUT_SELECTOR).find('.increment').click(function() {
			// Get the associated input field and its value
			var $input = $(this).parents(STYLE_COMPONENT_INPUT_SELECTOR).find('input');
			var value = $input.val();
			// Parse the number and the unit
			var substrings = getValueSubstrings(value);
			var number = isNaN(substrings.number) ? 0 : substrings.number;
			var unit = substrings.unit == '' ? 'px' : substrings.unit;
			var newValue = (number + 1) + unit;
			$input.val(newValue).trigger('change');
		});

		$(STYLE_COMPONENT_INPUT_SELECTOR).find('.decrement').click(function() {
			// Get the associated input field and its value
			var $input = $(this).parents(STYLE_COMPONENT_INPUT_SELECTOR).find('input');
			var value = $input.val();
			// Parse the number and the unit
			var substrings = getValueSubstrings(value);
			var number = isNaN(substrings.number) ? 0 : substrings.number;
			number = number <= 0 ? 1 : number;
			var unit = substrings.unit == '' ? 'px' : substrings.unit;
			var newValue = (number - 1) + unit;
			$input.val(newValue).trigger('change');
		});

		// Button Methods
		// --------------
		$(STYLE_COMPONENT_SEGMENTED_BUTTON_SELECTOR).find('button').click(function() {
			// If this is a single segmented button, unselect all siblings
			var properties = {};
			if ($(this).parents(STYLE_COMPONENT_SEGMENTED_BUTTON_SELECTOR).hasClass('single-segmented-button')) {
				$(this).siblings().removeClass('active').each(function(i, sibling) {
					properties[$(sibling).data('property')] = $(sibling).data('inactive-value');
				});
			}

			// Toggle this button's active state and add its property to the hash
			if ($(this).hasClass('active')) {
				properties[$(this).data('property')] = $(this).data('inactive-value');
			} else {
				properties[$(this).data('property')] = $(this).data('active-value');
			}

			// Special handler for switching item position buttons from left-right to top-bottom and vice versa
			// TODO improve logic for locating the align-items control
			if ($(this).data('property') == 'flex-direction') {
				var $positionButton = $(this).parents(STYLE_COMPONENT_SEGMENTED_BUTTON_SELECTOR).siblings("[data-property='align-items']");
				switch ($(this).data('active-value')) {
					case 'row':
						$positionButton.addClass('row');
						$positionButton.removeClass('column');
						break;
					case 'column':
						$positionButton.addClass('column');
						$positionButton.removeClass('row');
						break;
				}
			}

			updateCurrentItemWithProperties(this, properties);
			$(this).toggleClass('active');
		});

		function getCurrentItemForComponent(component) {
			var index = $(this).parents(STYLE_COMPONENT_SELECTOR).data('component-index');
			return _currentItems[index];
		}

		function updateCurrentItemWithProperties(component, properties) {
			var index = $(component).parents(STYLE_COMPONENT_SELECTOR).data('component-index');
			var item = _currentItems[index];

			// If any of the properties are layout-related,
			// apply them differently to account for browser-prefixes
			Object.keys(properties).forEach(function(property) {
				if (LAYOUT_PROPERTIES.indexOf(property) > -1) {
					$(item).attr('layout-' + property, properties[property]);
				}
			});

			$(item).css(properties);
			Columns.Layout.update();
		}

		function getValueSubstrings(value) {
			var re = /([\d|\.|\-]*)(.*)/;
			var result = re.exec(value);
			return {
				number: parseFloat(result[1]),
				unit: result[2]
			}
		}
	}

	// Updating the table
	// -------------------
	// 1) Re-render the table with the the JSON
	// 2) Reconnect draggable and droppable item handlers


	// Utility functions
	// ------------------
	// TODO: replace these with properties on the data store for the columns
	function getItemType(item) {
		var $item = $(item);
		if ($item.hasClass(ROW_VALUE_CLASS) || $item.hasClass(ITEM_CLASS)) {
			return 'text';
		} else {
			return 'group';
		}
	}

	function getItemName(item) {
		var $item = $(item);
		if ($item.hasClass(ROW_VALUE_CLASS) || $item.hasClass(ITEM_CLASS)) {
			return item.innerHTML;
		} else if ($item.hasClass('master')) {
			return 'Row';
		} else {
			return 'Group';
		}
	}

	// Handlebars partial registration
	// --------------------------------
	Handlebars.registerPartial('text-component', Columns.Templates['templates/styling/components/text.hbs']);
	Handlebars.registerPartial('input', Columns.Templates['templates/styling/components/input.hbs']);
	Handlebars.registerPartial('segmented-button', Columns.Templates['templates/styling/components/segmented-button.hbs']);

	// Handlebars helper to determine which style template to show
	Handlebars.registerHelper('partial', function(name, ctx, hash) {
	    var ps = Handlebars.partials;
	    if(typeof ps[name] !== 'function')
	        ps[name] = Handlebars.compile(ps[name]);
	    return ps[name](ctx, hash);
	});

	Handlebars.registerHelper('ifIsInput', function(kind, options) {
		return kind == 'input' ? options.fn(this) : options.inverse(this)
	});

	Handlebars.registerHelper('ifIsSegmentedButton', function(kind, options) {
		return kind == 'single-segmented-button' || kind == 'multiple-segmented-button' ? options.fn(this) : options.inverse(this)
	});


});