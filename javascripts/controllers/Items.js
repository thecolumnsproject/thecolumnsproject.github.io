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
	this.$items;

	this.init = function(items) {
		// Render the columns based on passed in data
		this.items = items;
		this.setupHandlebars();
		this.render(items);
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
			
			var dragText = $(this).text().trim();
			var $matches = $(Columns.Template.ROW_VALUE_SELECTOR).filter(function() {
	    		return $(this).text().trim() === dragText;
			});
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
			var $dropped = $(Columns.Template.ROW_VALUE_SELECTOR).filter(function() {
	    		return $(this).text().trim() === _this.getItemName(Columns.Template.DRAGGING_ITEM);
			}).not('.' + Columns.Template.ROW_VALUE_INACTIVE_CLASS);
			if ($dropped.length > 0) {
				return;
			}

			// Find the original token
			var $match = $(_this.LAYOUT_COLUMN_SELECTOR).filter(function() {
				return $(this).text().trim() === _this.getItemName(Columns.Template.DRAGGING_ITEM);
			}).first();

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

			// Track template remove event
			ga('send', 'event', 'template', 'remove', Columns.EmbedDetailsPanel.table_id);	
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
		var $item = $(this.ITEM_SELECTOR).filter(function() {
    		return $(this).text().trim() === $(template).text().trim();
		});
		if ($item.length > 0) {
			return $item.get(0);
		} else {
			return null;
		}
	};

	// Refresh the item styles with the template values.
	// Useful after applying a default template.
	this.updateItemStylesFromTemplate = function(template) {
		var _this = this;
		$(template.ROW_VALUE_SELECTOR).each(function(i, value) {
			var item = _this.getItemForTemplate(value);
			var css = $(value).attr('style');
			var styleObject = Columns.Layout.objectForCSS(css);
			var currentStyle = $(item).data('style') || [];
			$.merge(currentStyle, styleObject);
			$(item).data('style', currentStyle);
			$(item).addClass('inactive');
		});
	};

	this.render = function(items) {
		// $('.layout-columns').remove();
		var $columns = $( Columns.Templates['templates/layout/columns.hbs']() );

		if ( items ) {
			items.forEach(function( item, i ) {

				var itemView = new ItemView( item );
				$columns.append( itemView.render() );

			}.bind( this ));
		}

		$("#columns").append($columns);

		this.setupDragListeners($(this.LAYOUT_COLUMN_SELECTOR));
		this.setupDropListeners();

		this.$items = $('.layout-columns');
		return this.$items;

	};

	this.setupHandlebars = function() {
		Handlebars.registerPartial('layout-column', Columns.Templates['templates/layout/column.hbs']);
	};
};