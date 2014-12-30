// Items View Methods
// ----------------------
// This class controls the way the items are rendered
// and the way users interact with them
// The methods below allow us to:
// 1) Render the items
// 2) Drag them in and out of the template
// 3) Style them 

Columns.Items = new function() {

	// UI Constants
	this.ITEM_CLASS = 'layout-column';
	this.ITEM_SELECTOR = '.' + this.ITEM_CLASS;
	this.LAYOUT_COLUMN_SELECTOR = this.ITEM_SELECTOR; /* alias */

	this.init = function(data) {
		// Render the columns based on passed in data
		this.setupHandlebars();
		this.render(data);
	};

	this.setupDragListeners = function($columns) {
		$columns.draggable({
			revert: 'invalid',
			revertDuration: 200,
			helper: 'clone',
			// opacity: .2,
			cancel: '.inactive'
		});

		$columns.on('dragstart', function(e) {
			// e.originalEvent.dataTransfer.setData('text', e.target.innerHTML);
			Columns.Template.DRAGGING_ITEM = this;
			$(this).addClass('inactive');
		});

		$columns.on('dragstop', function(e) {
			
			var $matches = $(Columns.Template.ROW_VALUE_SELECTOR + ":contains('" + $(this).text().trim() + "')");
			if ($matches.length == 0) {
				$(this).removeClass('inactive');
			}
			
			// Remove any existing placeholders
			$(Columns.Template.ROW_GROUP_PLACEHOLDER_SELECTOR).children().unwrap();
			$(Columns.Template.ROW_VALUE_PLACEHOLDER_SELECTOR).remove();

			// Reset the dragging data
			$(Columns.Template.ROW_GROUP_SELECTOR).removeClass('dragover');
			Columns.Template.DRAGGING_ITEM = undefined;
			console.log('dragend');
		});

		$columns.on('drag', function(e) {

			if (Columns.Template.DROPPABLE_ITEMS.length > 0) {

				// Remove any existing placeholders
				$(Columns.Template.ROW_GROUP_PLACEHOLDER_SELECTOR).children().unwrap();
				$(Columns.Template.ROW_VALUE_PLACEHOLDER_SELECTOR).remove();

				// Determine where to put the placeholder
				var droppable = Columns.Template.DROPPABLE_ITEMS[Columns.Template.DROPPABLE_ITEMS.length - 1];
				Columns.Template.positionDropForDragEventInParentWithPlaceholder(e, $(droppable), true);

				// Make sure that only the correct group is highlighted
				$(Columns.Template.ROW_GROUP_SELECTOR).removeClass('dragover');
				$(droppable).addClass('dragover');

			}
		});
	};

	this.setupDropListeners = function() {
		var _this = this;
		$('body').droppable({
			accept: Columns.Template.ROW_VALUE_SELECTOR
		});

		$('body').on('drop', function(e, ui) {

			// Don't do anything if we're over a template droppable
			if (Columns.Template.DROPPABLE_ITEMS.length > 0) {
				return;
			}

			// Also don't do anything if we just dropped into a template
			var $dropped = $(Columns.Template.ROW_VALUE_SELECTOR + ":contains('" + _this.getItemName(Columns.Template.DRAGGING_ITEM) + "')").not('.' + Columns.Template.ROW_VALUE_INACTIVE_CLASS);
			if ($dropped.length > 0) {
				return;
			}

			// Find the original token
			var $match = $(_this.LAYOUT_COLUMN_SELECTOR + ":contains('" + _this.getItemName(Columns.Template.DRAGGING_ITEM) + "')").first();

			// Find the position of the original token
			var originalPosition = {
				top: $match.offset().top,
				left: $match.offset().left
			};

			// Animate the helper to the position
			var $helper = $(ui.helper).clone();
			$helper.css({
				position: 'fixed',
				top: $(ui.helper).offset().top,
				left: $(ui.helper).offset().left
			});
			$helper.appendTo('.layout-columns');
			$helper.velocity({
				translateX: originalPosition.left - $helper.offset().left,
				translateY: originalPosition.top - $helper.offset().top
			}, {
				duration: 200,
				complete: function() {
					$match.removeClass('placeholder');
					$match.removeClass('inactive');
					$helper.remove();
				}
			});
		});
	};

	this.getItemType = function(item) {
		var $item = $(item);
		if ($item.hasClass(Columns.Template.ROW_VALUE_CLASS) || $item.hasClass(this.ITEM_CLASS)) {
			return 'text';
		} else {
			return 'group';
		}
	};

	this.getItemName = function(item) {
		var $item = $(item);
		if ($item.hasClass(Columns.Template.ROW_VALUE_CLASS) || $item.hasClass(this.ITEM_CLASS)) {
			return $(item).text().trim();
		} else if ($item.parent().hasClass('master')) {
			return 'Row';
		} else {
			return 'Group';
		}
	};

	this.getItemForTemplate = function(template) {
		var $item = $(this.ITEM_SELECTOR + ":contains('" + $(template).text().trim() + "')");
		if ($item.length > 0) {
			return $item.get(0);
		} else {
			return null;
		}
	};

	this.render = function(items) {
		$('.layout-columns').remove();
		var columns = Columns.Templates['templates/layout/columns.hbs'];
		$("#columns").append(columns({columns: items}));

		this.setupDragListeners($(this.LAYOUT_COLUMN_SELECTOR));
		this.setupDropListeners();

	};

	this.setupHandlebars = function() {
		Handlebars.registerPartial('layout-column', Columns.Templates['templates/layout/column.hbs']);
	};
};