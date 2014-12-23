$(function() {

	// Add dummy columns to the page
	var DATA = [
		'First Name',
		'Last Name',
		'Hometown',
		'Age',
		'Unit'
	];

	// Store the currently dragging item
	var DRAGGING_ITEM,
		DROPPABLE_ITEMS = [];

	// UI Constants
	var ROW_VALUE_CLASS = 'layout-template-row-value',
		ROW_VALUE_PLACEHOLDER_CLASS = 'placeholder',
		ROW_GROUP_CLASS = 'layout-template-row-group',
		ROW_GROUP_PLACEHOLDER_CLASS = 'placeholder';

	// Set up the columns options
	Handlebars.registerPartial('layout-column', Columns.Templates['templates/layout/column.hbs']);
	var columns = Columns.Templates['templates/layout/columns.hbs'];
	$("#layout").append(columns({columns: DATA}));

	// Set up the layout template
	Handlebars.registerPartial('layout-row-group', Columns.Templates['templates/layout/row-group.hbs']);
	Handlebars.registerPartial('layout-row-value', Columns.Templates['templates/layout/row-value.hbs']);
	Handlebars.registerPartial('layout', Columns.Templates['templates/embed-table/layout.hbs']);
	var template = Columns.Templates['templates/layout/template.hbs'];
	$("#layout").append(template());

	// Set up drag and drop
	$('.layout-column').draggable({
		revert: true,
		revertDuration: 200,
		helper: 'clone',
		opacity: .2
	});


	$('.layout-column').on('dragstart', function(e) {
		// e.originalEvent.dataTransfer.setData('text', e.target.innerHTML);
		DRAGGING_ITEM = this;
	});

	// $('.layout-column').on('drag', function(e) {
	// 	console.log(e.originalEvent.clientX);
	// });

	$('.layout-column').on('dragstop', function(e) {

		// Remove any existing placeholders
		$('.' + ROW_GROUP_CLASS + '.' + ROW_GROUP_PLACEHOLDER_CLASS).children().unwrap();
		$('.' + ROW_VALUE_CLASS + '.' + ROW_VALUE_PLACEHOLDER_CLASS).remove();

		// Reset the dragging data
		DRAGGING_ITEM = undefined;
		console.log('dragend');
	});

	$('.layout-column').on('drag', function(e) {

		if (DROPPABLE_ITEMS.length > 0) {
			// Remove any existing placeholders
			$('.' + ROW_VALUE_CLASS + '.' + ROW_VALUE_PLACEHOLDER_CLASS).remove();
			$('.' + ROW_GROUP_CLASS + '.' + ROW_GROUP_PLACEHOLDER_CLASS).children().unwrap();

			// Determine where to put the placeholder
			var droppable = DROPPABLE_ITEMS[DROPPABLE_ITEMS.length - 1];
			positionDropForDragEventInParentWithPlaceholder(e, $(droppable), true)
		}
	});

	function setupGroupDraggingListeners($group) {
		$group.droppable();

		// $group.on('dragover', function(e) {
			
		// 	// Remove any existing placeholders
		// 	$('.' + ROW_VALUE_CLASS + '.' + ROW_VALUE_PLACEHOLDER_CLASS).remove();
		// 	$('.' + ROW_GROUP_CLASS + '.' + ROW_GROUP_PLACEHOLDER_CLASS).children().unwrap();

		// 	// Determine where to put the placeholder
		// 	positionDropForDragEventInParentWithPlaceholder(e, $(this), true);

		// 	e.preventDefault();
		// 	e.stopPropagation();

		// });


		$group.on('dropover', function(e) {
			e.preventDefault();
			e.stopPropagation();

			if (DROPPABLE_ITEMS.indexOf(this) == -1) {
				DROPPABLE_ITEMS.push(this);
			}

			// $(this).addClass('dragover');
			if ($group.hasClass('placeholder')) {
				console.log('drag started in:');
				console.log($(this));
			}
		});

		$group.on('dropout', function(e) {
			// $(this).removeClass('dragover');

			// Remove any existing placeholders
			$(this).children('.' + ROW_GROUP_CLASS + '.' + ROW_GROUP_PLACEHOLDER_CLASS).children().unwrap();
			$(this).children('.' + ROW_VALUE_CLASS + '.' + ROW_VALUE_PLACEHOLDER_CLASS).remove();

			var index = DROPPABLE_ITEMS.indexOf(this);
			if (index > -1) {
				DROPPABLE_ITEMS.splice(index, 1);
			}

			if ($group.hasClass('placeholder')) {
				console.log('drag ended in:');
				console.log($(this));
			}
		});

		$group.on('drop', function(e) {
			e.preventDefault();
			e.stopPropagation();

			// Only do stuff if this is the most recently dragged upon item
			if (DROPPABLE_ITEMS.indexOf(this) < DROPPABLE_ITEMS.length - 1) {
				return;
			}

			// Remove any existing placeholders
			$(this).children('.' + ROW_GROUP_CLASS + '.' + ROW_GROUP_PLACEHOLDER_CLASS).children().unwrap();
			$(this).children('.' + ROW_VALUE_CLASS + '.' + ROW_VALUE_PLACEHOLDER_CLASS).remove();

			DROPPABLE_ITEMS = [];

			// Drop the element
			positionDropForDragEventInParentWithPlaceholder(e, $(this), false);
			// $(this).removeClass('dragover');
			console.log('drop');

		});
	}
	setupGroupDraggingListeners($('.' + ROW_GROUP_CLASS));

	// Template Querying Functions
	// ----------------------------

	function createDropWithPlaceholder(placeholder) {
		if (!placeholder) placeholder = false;
		var data = DRAGGING_ITEM.innerHTML;
		var item = Columns.Templates['templates/layout/row-value.hbs'];
		return item({data: data, placeholder: placeholder});
	}

	function insertDropBeforeElementInParentWithPlaceholder($previous, $parent, placeholder) {
		var placeholder = createDropWithPlaceholder(placeholder);
		if ($previous) {
			$previous.after(placeholder);
		} else {
			$parent.prepend(placeholder);
		}
	}

	function positionDropForDragEventInParentWithPlaceholder(event, $parent, placeholder) {

		// Get all the items in the group
		// var rowPlaceholderSelector = "." + ROW_VALUE_CLASS + "." + ROW_VALUE_PLACEHOLDER_CLASS;
		var $children = $parent.children().not('.' + ROW_VALUE_PLACEHOLDER_CLASS);

		// If there aren't any children,
		// just insert the placeholder at the beginning
		if ($children.length == 0) {
			insertDropBeforeElementInParentWithPlaceholder(null, $parent, placeholder);
		}

		var dragOffsetX = event.originalEvent.clientX;
		var dragOffsetY = event.originalEvent.clientY;

		// Loop through each child until we find
		// the one that we're just to the left of
		var $previousChild;
		var dragThreshold = .5;
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

			// If we're intersecting directly with this child,
			// set it as the new intersect child
			if (childEdgeLeft <= dragOffsetX &&
				childEdgeRight >= dragOffsetX &&
				childEdgeTop <= dragOffsetY &&
				childEdgeBottom >= dragOffsetY) {

				var wrapper = Columns.Templates['templates/layout/row-group.hbs'];

				// Make sure that the inner group we're about to create
				// has the opposite cross-axis as the parent
				// and that we look for previous children based on the
				// correct axis
				var direction = 'column';
				var dragOffset = dragOffsetY;
				var childMiddle = childMiddleY;
				if ($parent.data('flex-direction') == direction) {
					direction = 'row';
					dragOffset = dragOffsetX;
					childMiddle = childMiddleX;
				}

				$parent = $child.wrap(wrapper({
					placeholder: placeholder,
					layout: [{
						property: 'flex-direction',
						value: direction
					}]
				})).parent();

				// If this is going to be a permanent group, setup drop events
				if (!placeholder) {
					setupGroupDraggingListeners($parent);
				}

				// Check whether the drag is before of after the intersecting element
				if (dragOffset >= childMiddle) {
					$previousChild = $child;
				}

				insertDropBeforeElementInParentWithPlaceholder($previousChild, $parent, placeholder);
				return false;

			} else {

				// If we're more than the drag treshold past the child
				// set this as the new previous child
				if (dragOffsetX >= childMiddleX) {
					$previousChild = $child;
				}

				// Once we've gone through all of the elements, move to the next test
				if (index == $children.length - 1) {
					insertDropBeforeElementInParentWithPlaceholder($previousChild, $parent, placeholder);
					return false;
				}
			}
		});
	}



});

