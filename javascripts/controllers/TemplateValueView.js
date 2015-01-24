// Object to manage properties of and interaction
// with template value zones.
// Value zones are populated with items and
// can react to changes in an item's properties.

Handlebars.registerPartial('layout', Columns.Templates['templates/layout/layout.hbs']);
Handlebars.registerPartial('style', Columns.Templates['templates/layout/style.hbs']);

TemplateValueView = function( item, placeholder ) {

	if ( item && item instanceof Item ) {
		this.item = item
	} else if ( item ) {
		throw "exception: item must be of type Item"
	} else {
		this.item;
	}
	
	this.template = Columns.Templates['templates/layout/row-value.hbs'];
	this.placeholder = placeholder || false;
	this.$value;
};

TemplateValueView.prototype.render = function() {
	var $template = $( this.template({
		data: 			this.item.formattedTitle(),
		style: 			this.item.style.styles,
		placeholder: 	this.placeholder
	}));
	this.$value = $template;

	this._setupEvents();
	this._setupDrag();

	return this.$value;
};

TemplateValueView.prototype.update = function() {
	// Update the value's text
	this.$value.text( this.item.formattedTitle() );
	// Update the value's style
	this.$value.attr( 'style', this.item.style.css() );
	// Update the value's placeholder status

	// Alert any listeners that the value has changed
	// var event = new CustomEvent( 'Columns.ValueView.DidChange', {
	// 	valueView: 	this
	// });
	var event = document.createEvent('CustomEvent');
	event.initCustomEvent('Columns.TemplateValueView.DidChange', false, false, {
		valueView: 	this
	});
	document.dispatchEvent(event);

	return this.$value;
};

TemplateValueView.prototype._setupDrag = function() {

	this.$value.draggable({
		revert: 'invalid',
		revertDuration: 200,
		helper: function() {
			var itemView = new ItemView({ item: this.item });
			return itemView.render();
		},
		opacity: .2
	});

	this.$value.on( 'dragstart', $.proxy(function( event, ui ) {

		// Alert any listeners that the item has started drag
		// var event = new CustomEvent( 'Columns.ItemView.ItemDidBeginDrag', {
		// 	item: 	this,
		// 	event: 	event,
		// 	ui: 	ui
		// });
		var event = document.createEvent('CustomEvent');
		event.initCustomEvent('Columns.TemplateValueView.ValueDidBeginDragWithItem', false, false, {
			valueView: 	this,
			item: 		this.item,
			event: 		event,
			ui: 		ui
		});
		document.dispatchEvent(event);

	}, this) );

	this.$value.on( 'dragstop', $.proxy(function( event, ui ) {

		// Alert any listeners that the item has started drag
		// var event = new CustomEvent( 'Columns.ItemView.ItemDidBEndDrag', {
		// 	item: 	this,
		// 	event: 	event,
		// 	ui: 	ui
		// });
		var event = document.createEvent('CustomEvent');
		event.initCustomEvent('Columns.TemplateValueView.ValueDidEndDragWithItem', false, false, {
			valueView: 	this,
			item: 		this.item,
			event: 		event,
			ui: 		ui
		});
		document.dispatchEvent(event);

	}, this) );

	this.$value.on( 'drag', $.proxy(function( event, ui ) {

		// Alert any listeners that the item has started drag
		// var event = new CustomEvent( 'Columns.ItemView.ItemDidDrag', {
		// 	item: 	this,
		// 	event: 	event,
		// 	ui: 	ui
		// });
		var event = document.createEvent('CustomEvent');
		event.initCustomEvent('Columns.TemplateValueView.ValueDidDragWithItem', false, false, {
			valueView: 	this,
			item: 		this.item,
			event: 		event,
			ui: 		ui
		});
		document.dispatchEvent(event);

	}, this) );
};

TemplateValueView.prototype._setupEvents = function() {

	// Listen to updates for this item
	// and update if there's a match
	document.addEventListener( 'Columns.Item.DidChange', this._onItemDidChange.bind( this ), false);
};

TemplateValueView.prototype._onItemDidChange = function( event ) {
	var newItem = event.detail.item;
	if ( this.item.is( newItem ) ) {
		this.item = newItem;
		this.update();
	}
};