// Styling View Methods
// ----------------------
// This class controls the way the style modules
// are rendered and applies those styles back to the layout model
// The methods below allow us to:
// 1) Render the modules based on selected items
// 2) Update item styling
// 3) Trigger a model update

Columns.Styling = new function() {

	// UI Constants
	this.STYLE_COMPONENT_SELECTOR = '.' + 'style-component';
	this.STLYE_COMPONENT_ROW_ITEM_SELECTOR = '.' + 'style-component-section-row-item';
	this.STYLE_COMPONENT_INPUT_SELECTOR = '.' + 'style-component-section-row-input';
	this.STYLE_COMPONENT_SEGMENTED_BUTTON_SELECTOR = '.' + 'style-component-section-row-segmentedButton';

	// Globals
	this._currentItems = [];
	this._layout = {};

	this.init = function() {
		this.setupHandlebars();
		this.render();
		this.setupStyleListeners($(Columns.Template.ROW_VALUE_SELECTOR));
		this.setupStyleListeners($(Columns.Template.ROW_GROUP_SELECTOR));
		this.setupItemListeners($(Columns.Items.LAYOUT_COLUMN_SELECTOR));
	};

	this.initWithItem = function(item) {
		this.init();
		this.updateStyling(item);
	};

	this.setupScrollListeners = function() {
		// Scroll the style section down as the use scrolls the page
		$(window).scroll(function() {
			// console.log("Height " +$(document).height());
			// console.log("Scroll " +$(window).scrollTop());
			// console.log("Style " +$.Velocity.hook($("#styling"), "translateY"));
			var scroll;
			var maxScroll = $(document).height() - $(window).height();
			var minScroll = 0;
			scroll = $(window).scrollTop() < minScroll ? 0 : $(window).scrollTop();
			scroll = scroll > maxScroll ? parseInt($.Velocity.hook($("#styling"), "translateY")) : scroll; /* Keep current position */
			$("#styling").velocity({
				translateY: scroll
			}, {
				duration: 0
			});
		});
	};

	// Every time an item is clicked,
	// either in the list of items or on the canvas,
	// update the current item and update the styling area.
	// We always update the Item first and then apply those styles
	// back to the Template if the Item has been placed there.
	this.setupStyleListeners = function($template) {
		var _this = this;
		if ($template.hasClass(Columns.Template.ROW_VALUE_CLASS)) {
			$template.click(function(e) {
				var item = Columns.Items.getItemForTemplate($template.get(0));
				// _this._currentItems = [item];
				_this.updateStyling(item);

				// Don't pass the click on to the encompassing group
				e.stopPropagation();
			});
		}

		if ($template.hasClass(Columns.Template.ROW_GROUP_CLASS)) {
			$template.click(function() {
				// _this._currentItems = [this];
				_this.updateStyling(this);
			});
		}
	};

	this.setupItemListeners = function($item) {
		var _this = this;
		$item.click(function() {
			// Get the corresponding layout object
			// var $layoutItem = $(Columns.Template.ROW_VALUE_SELECTOR + ":contains('" + this.innerHTML + "')");
			// if ($layoutItem.length > 0) {
			// 	_this._currentItems = [$layoutItem.get(0)];
			// } else {
			// 	_this._currentItems = [this];
			// }
			// _this._currentItems = [this];
			_this.updateStyling(this);
		});
	};

	// Updating the style tab
	// -----------------------
	// 1) Determine which components we need to show
	// 2) Render each component
	// 3) Connect each component's value with the selected item
	this.updateStyling = function(item) {
		var _this = this;
		$(Columns.Items.LAYOUT_COLUMN_SELECTOR + '.styling').removeClass('styling');
		$(item).addClass('styling');
		var template = Columns.Template.getTemplateForItem(item) || item;
		var items = [template];
		this._currentItems = [template];
		var $parents = $(template).parents();
		$parents.each(function(i, parent) {
			if ($(parent).hasClass(Columns.Template.ROW_GROUP_CLASS)) {
				items.push(parent);
				_this._currentItems.push(parent);
			}

			if (i == $parents.length - 1) {
				_this.renderStyleComponents(items);
			}
		});
	}

	this.renderStyleComponents = function(items) {
		var _this = this;
		$(_this.STYLE_COMPONENT_SELECTOR).remove();
		var component = Columns.Templates['templates/styling/component.hbs'];
		items.forEach(function(item, i) {
			var type = Columns.Items.getItemType(item);

			// Assign all current values for item type
			_this.populateCurrentValues(item);

			$('#styling').append(component({
				index: i,
				type: type,
				name: Columns.Items.getItemName(item),
				styles: Columns.styleData.types[type]
			}));

			if (i == items.length - 1) {
				_this.connectStyleComponents();
			}
		});
	};

	this.populateCurrentValues = function(item) {

		function traverseData(data) {
			Object.keys(data).forEach(function(key, i) {
				if (key == 'property') {
					var value;
					var existingStyles = $(item).data('style');
					if (existingStyles) {
						existingStyles.every(function(style, i) {
							if (style.property == data[key]['name']) {
								value = style.value;
								return false;
							}
						});
					}
					data[key]['current_value'] = value || $(item).css(data[key]['name']);
				} else {
					if (typeof data[key] == 'object') {
						traverseData(data[key]);
					}
				}
			});
		}

		var type = Columns.Items.getItemType(item);
		var data = Columns.styleData.types[type];
		traverseData(data);

	}

	this.connectStyleComponents = function() {
		var _this = this;

		// Input Methods
		// --------------
		$(_this.STYLE_COMPONENT_INPUT_SELECTOR).find('input').keyup(function() {
			// Apply styling to the current component
			var properties = {};
			properties[$(this).data('property')] = $(this).val();
			_this.updateCurrentItemWithProperties(this, properties);
		});

		$(_this.STYLE_COMPONENT_INPUT_SELECTOR).find('input').change(function() {
			// Apply styling to the current component
			var properties = {};
			properties[$(this).data('property')] = $(this).val();
			_this.updateCurrentItemWithProperties(this, properties);
		});

		$(_this.STYLE_COMPONENT_INPUT_SELECTOR).find('.increment').click(function() {
			// Get the associated input field and its value
			var $input = $(this).parents(_this.STYLE_COMPONENT_INPUT_SELECTOR).find('input');
			var value = $input.val();
			// Parse the number and the unit
			var substrings = _this.getValueSubstrings(value);
			var number = isNaN(substrings.number) ? 0 : substrings.number;
			var unit = substrings.unit == '' ? 'px' : substrings.unit;
			var newValue = (number + 1) + unit;
			$input.val(newValue).trigger('change');
		});

		$(_this.STYLE_COMPONENT_INPUT_SELECTOR).find('.decrement').click(function() {
			// Get the associated input field and its value
			var $input = $(this).parents(_this.STYLE_COMPONENT_INPUT_SELECTOR).find('input');
			var value = $input.val();
			// Parse the number and the unit
			var substrings = _this.getValueSubstrings(value);
			var number = isNaN(substrings.number) ? 0 : substrings.number;
			if ($input.data('negative') == false) {
				number = number <= 0 ? 1 : number;
			}
			var unit = substrings.unit == '' ? 'px' : substrings.unit;
			var newValue = (number - 1) + unit;
			$input.val(newValue).trigger('change');
		});

		// Button Methods
		// --------------
		$(_this.STYLE_COMPONENT_SEGMENTED_BUTTON_SELECTOR).find('button').click(function() {
			// If this is a single segmented button, unselect all siblings
			var $segmentedButton = $(this).parents(_this.STYLE_COMPONENT_SEGMENTED_BUTTON_SELECTOR);
			var property = $segmentedButton.data('property') || $(this).data('property');
			var properties = {};

			if ($segmentedButton.hasClass('single-segmented-button')) {
				$(this).siblings().removeClass('active');
			}

			// Toggle this button's active state and add its property to the hash
			if (!$(this).hasClass('active')) {
				properties[property] = $(this).data('value') || $(this).data('active-value');
				$(this).addClass('active');
			} else {
				if ($segmentedButton.hasClass('multiple-segmented-button')) {
					properties[property] = $(this).data('inactive-value');
					$(this).removeClass('active');
				}
			}

			// Special handler for switching item position buttons from left-right to top-bottom and vice versa
			// TODO improve logic for locating the align-items control
			if (property == 'flex-direction') {
				// var $positionButton = $segmentedButton.parents(_this.STLYE_COMPONENT_ROW_ITEM_SELECTOR).siblings().find("[data-property='align-items']");
				// switch ($(this).data('value')) {
				// 	case 'row':
				// 		$positionButton.addClass('row');
				// 		$positionButton.removeClass('column');
				// 		break;
				// 	case 'column':
				// 		$positionButton.addClass('column');
				// 		$positionButton.removeClass('row');
				// 		break;
				// }
				setupItemsPositionButtons($segmentedButton);
			}

			_this.updateCurrentItemWithProperties(this, properties);
		});

		// Special handler for switching item position buttons from left-right to top-bottom and vice versa
		// TODO improve logic for locating the align-items control
		function setupItemsPositionButtons($layoutButton) {
			var $positionButton = $layoutButton.parents(_this.STLYE_COMPONENT_ROW_ITEM_SELECTOR)
									.siblings().find("[data-property='align-items']");
			switch ($layoutButton.find('button.active').data('value')) {
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
		$("[data-property='flex-direction']").each(function(i, button) {
			setupItemsPositionButtons($(button));
		});
	};

	this.getCurrentItemForComponent = function(component) {
		var index = $(component).parents(this.STYLE_COMPONENT_SELECTOR).data('component-index');
		return this._currentItems[index];
	};

	this.updateCurrentItemWithProperties = function(component, properties) {
		var index = $(component).parents(this.STYLE_COMPONENT_SELECTOR).data('component-index');
		var item = this._currentItems[index];
		var template = Columns.Template.getTemplateForItem(item);

		// If any of the properties are layout-related,
		// apply them differently to account for browser-prefixes
		Object.keys(properties).forEach(function(property) {
			if (Columns.Layout.LAYOUT_PROPERTIES.indexOf(property) > -1) {
				$(item).attr('layout-' + property, properties[property]);
			}
		});

		// Convert properties from CSS-style to Layout-style
		var tmp = document.createElement('div');
		$(tmp).css(properties);
		var tmpCSS = $(tmp).attr('style');
		var styleObject = Columns.Layout.objectForCSS(tmpCSS);

		var currentStyle = $(item).data('style') || [];
		$.merge(currentStyle, styleObject);
		$(item).data('style', currentStyle);

		if (template) {
			$(template).css(properties);
		}
		// var event = new Event('Style.didChange', {
		// 	'item': item
		// });
		// dispatchEvent(event);
		Columns.Layout.update(false);
	};

	this.getValueSubstrings = function(value) {
		var re = /([\d|\.|\-]*)(.*)/;
		var result = re.exec(value);
		return {
			number: parseFloat(result[1]),
			unit: result[2]
		}
	};

	this.render = function() {
		this.setupScrollListeners();
	};

	this.setupHandlebars = function() {
		Handlebars.registerPartial('text-component', Columns.Templates['templates/styling/components/text.hbs']);
		Handlebars.registerPartial('input', Columns.Templates['templates/styling/components/input.hbs']);
		Handlebars.registerPartial('single-segmented-button', Columns.Templates['templates/styling/components/single-segmented-button.hbs']);
		Handlebars.registerPartial('multiple-segmented-button', Columns.Templates['templates/styling/components/multiple-segmented-button.hbs']);

		// Handlebars helper to determine which style template to show
		// Handlebars.registerHelper('partial', function(name, ctx, hash) {
		//     var ps = Handlebars.partials;
		//     if(typeof ps[name] !== 'function')
		//         ps[name] = Handlebars.compile(ps[name]);
		//     return ps[name](ctx, hash);
		// });

		Handlebars.registerHelper('ifIsInput', function(kind, options) {
			return kind == 'input' ? options.fn(this) : options.inverse(this);
		});

		Handlebars.registerHelper('ifIsSingleSegmentedButton', function(kind, options) {
			return kind == 'single-segmented-button' ? options.fn(this) : options.inverse(this);
		});

		Handlebars.registerHelper('ifIsMultipleSegmentedButton', function(kind, options) {
			return kind == 'multiple-segmented-button' ? options.fn(this) : options.inverse(this);
		});

		Handlebars.registerHelper('ifIsCurrentValue', function(value, currentValue, options) {
			return value == currentValue ? options.fn(this) : options.inverse(this);
		});
	};
};