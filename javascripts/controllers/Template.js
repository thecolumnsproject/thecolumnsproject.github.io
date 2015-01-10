// Template Object Methods
// -----------------------
// This class handles changes to the Template
// when things are dragged and dropped on insertAfter
// as well as when styles are changed and it needs to re-render.
// It also handles all listeners associated with the template.

Columns.Template = new function() {

	// UI Constants
	this.TEMPLATE_PREVIEW_SELECTOR = '.layout-table-preview';
	this.ROW_VALUE_CLASS = 'layout-template-row-value';
	this.ROW_VALUE_PLACEHOLDER_CLASS = 'placeholder';
	this.ROW_VALUE_INACTIVE_CLASS = 'inactive';
	this.ROW_VALUE_INACTIVE_SELECTOR = '.' + this.ROW_VALUE_INACTIVE_CLASS;
	this.ROW_VALUE_SELECTOR = '.' + this.ROW_VALUE_CLASS;
	this.ROW_VALUE_PLACEHOLDER_SELECTOR = this.ROW_VALUE_SELECTOR + '.' + this.ROW_VALUE_PLACEHOLDER_CLASS;
	this.ROW_GROUP_CLASS = 'layout-template-row-group';
	this.ROW_GROUP_PLACEHOLDER_CLASS = 'placeholder';
	this.ROW_GROUP_SELECTOR = '.' + this.ROW_GROUP_CLASS;
	this.ROW_GROUP_PLACEHOLDER_SELECTOR = this.ROW_GROUP_SELECTOR + '.' + this.ROW_GROUP_PLACEHOLDER_CLASS;
	this.TEMPLATE_EMPTY_CLASS = 'empty';

	this.$template;

	// Hold data associated with drag and drop
	this.DROPPABLE_ITEMS = [];
	this.DRAGGING_ITEM;

	// Create the model and render it
	this.init = function() {
		this.setupHandlebars();
		this.renderTemplate();
		this.render(Columns.Layout.layoutObject);
	};

	// Get notified when the table is doing things
	this.setupTableEventListeners = function($table) {
		var _this = this;

		// When the table is about to expand
		$(document).on('ColumnsTableWillExpand', function(e) {
			// Move the template down below the header
			_this.$template.parents('.layout-template').velocity({
				translateY: 0
			}, {
				duration: 400
			});
		});

		// When the table is done expanding
		$(document).on('ColumnsTableDidExpand', function(e) {
			// Add the expanded class to the template
			$('.layout-table-preview').addClass('expanded');
		});

		// When the table is done collapsing
		$(document).on('ColumnsTableDidCollapse', function(e) {
			// Add the expanded class to the template
			$('.layout-table-preview').removeClass('expanded');
		});

		// When the table is scrolled
		$(document).on('ColumnsTableDidScroll', function(e, data) {
			var $table = data.table.$$table;

			// Move the template up until it hits the header
			var minScroll = -24;
			// var maxScroll = 64;
			var scroll = 0 - $table.find('.columns-table-container').scrollTop();
			scroll = scroll < minScroll ? minScroll : scroll;
			// console.log(scroll);
			// _this.$template.velocity({
			// 	translateY: scroll
			// }, {
			// 	duration: 0,
			// 	delay: 0
			// });
			$.Velocity.hook(_this.$template.parents('.layout-template'), "translateY", scroll + "px");
		});

		$(document).on('ColumnsTableDidRenderData', function(e, data) {
			_this.$template.css({
				height: data.table.tallestRowHeight()
			});
		});
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
			scroll = scroll > maxScroll ? parseInt($.Velocity.hook($("#layout"), "translateY")) : scroll; /* Keep current position */
			$("#layout").velocity({
				translateY: scroll
			}, {
				duration: 0
			});
		});


	};

	this.setupDropListeners = function($group) {
		var _this = this;
		$group.droppable({
			tolerance: 'pointer'
		});
		$group.on('dropover', function(e) {

			if (_this.DROPPABLE_ITEMS.indexOf(this) == -1) {
				_this.DROPPABLE_ITEMS.push(this);
			}

			// Make sure that only this class has the dragover appearance
			$(_this.ROW_GROUP_SELECTOR).removeClass('dragover');
			// $(this).addClass('dragover');

			_this.$template.removeClass('empty');

			$('.ui-draggable-dragging').addClass('droppable');
		});

		$group.on('dropout', function(e) {
			// $(this).removeClass('dragover');

			// Remove any existing placeholders
			$(this).children(_this.ROW_GROUP_PLACEHOLDER_SELECTOR).children().unwrap();
			$(this).children(_this.ROW_VALUE_PLACEHOLDER_SELECTOR).remove();

			var index = _this.DROPPABLE_ITEMS.indexOf(this);
			if (index > -1) {
				_this.DROPPABLE_ITEMS.splice(index, 1);
			}

			if (_this.isEmpty()) {
				_this.$template.addClass('empty');
			}

			$('.ui-draggable-dragging').removeClass('droppable');
		});

		$group.on('drop', function(e) {

			// Only do stuff if this is the most recently dragged upon item
			if (_this.DROPPABLE_ITEMS.length == 0 || _this.DROPPABLE_ITEMS.indexOf(this) < _this.DROPPABLE_ITEMS.length - 1) {
				return;
			}

			// Remove any existing placeholders
			$(this).children(_this.ROW_GROUP_PLACEHOLDER_SELECTOR).children().unwrap();
			$(this).children(_this.ROW_VALUE_PLACEHOLDER_SELECTOR).remove();

			_this.DROPPABLE_ITEMS = [];

			// Drop the element
			_this.positionDropForDragEventInParentWithPlaceholder(e, $(this), false);
			// $(this).removeClass('dragover');
		});
	};

	this.setupDragListeners = function($value) {
		var _this = this;
		$value.draggable({
			revert: 'invalid',
			revertDuration: 200,
			helper: function() {
				var column = Columns.Templates['templates/layout/column.hbs']
				return column($value.text());
			},
			opacity: .2
		});

		$value.on('dragstart', function(e) {
			// e.originalEvent.dataTransfer.setData('text', e.target.innerHTML);
			// _this.DRAGGING_ITEM = this;
			_this.DRAGGING_ITEM = Columns.Items.getItemForTemplate(this);
			$(this).addClass('inactive');

			// If this there's only one item left in the surrouning group, dissolve the group.
			// Unless the parent group is the very first group in the cell.
			// We check for three items because one is the item being dragged, the second is its handle
			// and the third is the lonely remaining item in the group that will now be single
			var $children = $(this).parent().children();
			if ($children.length == 3 && !$(this).parent().parent().hasClass('layout-template-row')) {
				$children.unwrap();
			}
		});

		$value.on('drag', function(e) {
			if (_this.DROPPABLE_ITEMS.length > 0) {

				// Remove any existing placeholders
				$(_this.ROW_VALUE_PLACEHOLDER_SELECTOR).remove();
				$(_this.ROW_GROUP_PLACEHOLDER_SELECTOR).children().unwrap();

				// Determine where to put the placeholder
				var droppable = _this.DROPPABLE_ITEMS[_this.DROPPABLE_ITEMS.length - 1];
				_this.positionDropForDragEventInParentWithPlaceholder(e, $(droppable), true);

				// Make sure that only the correct group is highlighted
				$(_this.ROW_GROUP_SELECTOR).removeClass('dragover');
				$(droppable).addClass('dragover');

			}
		});

		$value.on('dragstop', function(e) {
			$(this).remove();
			Columns.Layout.update(false);
			Columns.tables[0].generateLayout(Columns.Layout.layoutObject, true);
		});
	}

	this.setupGroupPlaceholderListeners = function($group) {
		$group.mouseenter(function() {
			$(this).parent().removeClass('dragover');
		});

		$group.mouseleave(function() {
			$(this).parent().addClass('dragover');
		});
	};

	// Template Querying Functions
	// ----------------------------

	this.createDropWithPlaceholder = function(placeholder) {
		if (!placeholder) placeholder = false;
		var data = Columns.Items.getItemName(this.DRAGGING_ITEM);
		var item = Columns.Templates['templates/layout/row-value.hbs'];
		var style = $(this.DRAGGING_ITEM).data('style');
		return item({data: data, placeholder: placeholder, style: style});
	};

	this.insertDropBeforeElementInParentWithPlaceholder = function($previous, $parent, placeholder) {
		var template = this.createDropWithPlaceholder(placeholder);
		var $placeholder = $(template);

		this.setupDragListeners($placeholder);
		if ($previous) {
			$previous.after($placeholder);
		} else {
			$parent.prepend($placeholder);
		}

		if (!placeholder) {
			Columns.Layout.update(false);
			Columns.tables[0].generateLayout(Columns.Layout.layoutObject, true);
			Columns.Styling.updateStyling(Columns.Items.getItemForTemplate($placeholder));
		}

		// _this.$template.removeClass('empty');

		// Add listeners for styling purposes
		// SEE layout-style.js
		Columns.Styling.setupStyleListeners($placeholder);
	};

	this.positionDropForDragEventInParentWithPlaceholder = function(event, $parent, placeholder) {
		var _this = this;

		// Get all the items in the group
		// var rowPlaceholderSelector = "." + ROW_VALUE_CLASS + "." + ROW_VALUE_PLACEHOLDER_CLASS;
		var $children = $parent.children()
						.not(this.ROW_VALUE_PLACEHOLDER_SELECTOR)
						.not('.' + this.ROW_VALUE_INACTIVE_CLASS)
						.not('.ui-draggable-dragging');

		// If there aren't any children,
		// just insert the placeholder at the beginning
		if ($children.length == 0) {
			this.insertDropBeforeElementInParentWithPlaceholder(null, $parent, placeholder);
		}

		var dragOffsetX = event.originalEvent.clientX;
		var dragOffsetY = event.originalEvent.clientY;

		// Loop through each child until we find
		// the one that we're just to the left of
		var $previousChild;
		var dragThreshold = 0.5;
		$children.each(function(index, child) {
			$child = $(child);

			// Find the edges of the child
			var childEdgeLeft = $child.offset().left;
			var childEdgeRight = childEdgeLeft + $child.width();
			var childEdgeTop = $child.offset().top;
			var childEdgeBottom = childEdgeTop + $child.height();

			// Find the offset for the middle of this child
			var childMiddleX = childEdgeLeft + ($child.width() * dragThreshold);
			var childMiddleY = childEdgeTop + ($child.height() * dragThreshold);

			// Add a small buffer around groups so that it's possible to hover
			// over both elements within as well as the group itself.
			// We'll reduce the size of children in the direction of the group
			// in order to acheive this.
			var buffer = 0.2,
				bufferX,
				bufferY,
				direction = $parent.data('flex-direction') || 'row';

			if (direction == 'row') {
				bufferX = $child.width() * buffer;
				bufferY = 0;
			} else {
				bufferX = 0;
				bufferY = $child.height() * buffer;
			}

			// Also account for any scrolling the template has done
			// in order to stay fixed with the page scroll
			var scrollOffset = parseInt($.Velocity.hook($("#layout"), "translateY"));

			// If we're intersecting directly with this child,
			// set it as the new intersect child
			if (childEdgeLeft + bufferX <= dragOffsetX &&
				childEdgeRight - bufferX>= dragOffsetX &&
				childEdgeTop - scrollOffset + bufferY <= dragOffsetY &&
				childEdgeBottom - scrollOffset - bufferY >= dragOffsetY) {

				// Reset the previous child
				$previousChild = undefined;

				var wrapper = Columns.Templates['templates/layout/row-group.hbs'];

				// Make sure that the inner group we're about to create
				// has the opposite cross-axis as the parent
				// and that we look for previous children based on the
				// correct axis
				var dragOffset,
					childMiddle,
					childDirection;

				if (direction == 'row') {
					childDirection = 'column';
					dragOffset = dragOffsetY;
					childMiddle = childMiddleY;
				} else {
					childDirection = 'row';
					dragOffset = dragOffsetX;
					childMiddle = childMiddleX;
				}

				$parent = $child.wrap(wrapper({
					placeholder: placeholder,
					layout: [{
						property: 'flex-direction',
						value: childDirection
					}]
				})).parent();

				// If this is going to be a permanent group, setup drop events
				if (placeholder) {
					// DROPPABLE_ITEMS.push($parent);
				} else {
					_this.setupDropListeners($parent);
				}

				// Check whether the drag is before or after the intersecting element
				if (dragOffset >= childMiddle) {
					$previousChild = $child;
				}

				_this.insertDropBeforeElementInParentWithPlaceholder($previousChild, $parent, placeholder);
				return false;

			} else {

				var dragOffset,
					childMiddle;

				if (direction == 'row') {
					dragOffset = dragOffsetX;
					childMiddle = childMiddleX;
				} else {
					dragOffset = dragOffsetY;
					childMiddle = childMiddleY;
				}

				// If we're more than the drag treshold past the child
				// set this as the new previous child
				if (dragOffset >= childMiddle) {
					$previousChild = $child;
				}

				// Once we've gone through all of the elements, move to the next test
				if (index == $children.length - 1) {
					_this.insertDropBeforeElementInParentWithPlaceholder($previousChild, $parent, placeholder);
					return false;
				}
			}
		});
	};

	this.isEmpty = function() {
		return this.$template.find(this.ROW_VALUE_SELECTOR).not(this.ROW_VALUE_INACTIVE_SELECTOR).length == 0;
	};

	this.getTemplateForItem = function(item) {
		var $templateItem = $(this.ROW_VALUE_SELECTOR).filter(function() {
    		return $(this).text().trim() === $(item).text().trim();
		});
		if ($templateItem.length > 0) {
			return $templateItem.get(0);
		} else {
			return null;
		}
	};

	this.renderTemplate = function() {
		var template = Columns.Templates['templates/layout/preview.hbs'];
		$('#layout').append(template({
			source: config.embed.host + config.embed.path
		}));
	};

	this.render = function(layout) {
		$('.layout-template').remove();
		var template = Columns.Templates['templates/layout/template.hbs'];
		$(this.TEMPLATE_PREVIEW_SELECTOR).append(template(layout));

		this.$template = $('.layout-template-row.master');
		if ($(this.ROW_VALUE_SELECTOR).length > 0)
			this.setupDragListeners($(this.ROW_VALUE_SELECTOR));
		if ($(this.ROW_GROUP_SELECTOR).length > 0)
			this.setupDropListeners($(this.ROW_GROUP_SELECTOR));
		// this.setupScrollListeners();
		// this.setupTableEventListeners();
	};

	this.setupHandlebars = function() {
		Handlebars.registerPartial('layout-row-group', Columns.Templates['templates/layout/row-group.hbs']);
		Handlebars.registerPartial('layout-row-value', Columns.Templates['templates/layout/row-value.hbs']);
		Handlebars.registerPartial('layout', Columns.Templates['templates/layout/layout.hbs']);
		Handlebars.registerPartial('style', Columns.Templates['templates/layout/style.hbs']);

		Handlebars.registerHelper('ifIsGroup', function(type, options) {
			return type == 'group' ? options.fn(this) : options.inverse(this);
		});

		Handlebars.registerHelper('ifIsSingle', function(type, options) {
			return type == 'single' ? options.fn(this) : options.inverse(this);
		});

		Handlebars.registerHelper('parseData', function(data, options) {
			return data.toLowerCase().replace(/_/g, ' ').replace(/\b./g, function(m){ return m.toUpperCase(); });
		});
	};
};