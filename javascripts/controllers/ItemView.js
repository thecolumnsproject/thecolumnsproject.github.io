// Manage the display of a single item
// within the list of items
ItemView = function( item ) {

	this.item = item || new Item();
	this.template = Columns.Templates['templates/layout/column.hbs'];
	this.$item;
};

ItemView.prototype.render = function() {
	var $item = $( this.template({ title: this.item.formattedTitle() }) );
	$item.data('style', this.item.style.styles);
	this.$item = $item;

	this.setupEvents();

	return this.$item;
};

ItemView.prototype.setupEvents = function() {

	// Make the item draggable
	this.$item.draggable({
		revert: 'invalid',
		revertDuration: 200,
		helper: 'clone',
		// opacity: .2,
		cancel: '.inactive'
	});

	this.$item.on( 'dragstart', $.proxy(function( event, ui ) {

		// Alert any listeners that the item has started drag
		// var event = new CustomEvent( 'Columns.ItemView.ItemDidBeginDrag', {
		// 	item: 	this,
		// 	event: 	event,
		// 	ui: 	ui
		// });
		var event = document.createEvent('CustomEvent');
		event.initCustomEvent('Columns.ItemView.ItemDidBeginDrag', false, false, {
			item: 	this,
			event: 	event,
			ui: 	ui
		});
		document.dispatchEvent(event);

	}, this) );

	this.$item.on( 'dragstop', $.proxy(function( event, ui ) {

		// Alert any listeners that the item has started drag
		// var event = new CustomEvent( 'Columns.ItemView.ItemDidBEndDrag', {
		// 	item: 	this,
		// 	event: 	event,
		// 	ui: 	ui
		// });
		var event = document.createEvent('CustomEvent');
		event.initCustomEvent('Columns.ItemView.ItemDidEndDrag', false, false, {
			item: 	this,
			event: 	event,
			ui: 	ui
		});
		document.dispatchEvent(event);

	}, this) );

	this.$item.on( 'drag', $.proxy(function( event, ui ) {

		// Alert any listeners that the item has started drag
		// var event = new CustomEvent( 'Columns.ItemView.ItemDidDrag', {
		// 	item: 	this,
		// 	event: 	event,
		// 	ui: 	ui
		// });
		var event = document.createEvent('CustomEvent');
		event.initCustomEvent('Columns.ItemView.ItemDidDrag', false, false, {
			item: 	this,
			event: 	event,
			ui: 	ui
		});
		document.dispatchEvent(event);

	}, this) );
};