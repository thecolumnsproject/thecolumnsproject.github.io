jasmine.getFixtures().fixturesPath = 'specs/fixtures';

describe('Style View', function() {

	afterEach(function() {
		ColumnsEvent.offAll();
	});

	beforeEach(function() {
		loadFixtures('style-bare.html');
	});

	describe('Initalization', function() {

		it('should attach to the #style element already on the page', function() {
			var styleView = new StyleView();
			expect( styleView.$style ).toEqual('#styling');
		});
	});

	describe('Updating Components', function() {

		beforeEach(function() {
			this.styleView = new StyleView();
		});

		it('should replace existing components with item components', function() {
			var selection = new Item({ title: "My Item" });
			this.styleView.updateWithSelection( selection );
			expect( $('.style-component').length ).toBe( 1 );
		});

		it('should append group compoents to existing components ', function() {
			var selection = new TemplateGroupView();
			selection.render();
			this.styleView.updateWithSelection( selection );
			expect( $('.style-component').length ).toBe( 2 );
		});
	});

	describe('Getting an Item from a Selection', function() {

		beforeEach(function() {
			this.styleView = new StyleView();
		});

		it('should return an item if passed an item', function() {
			var item = new Item({ title: "My Item" });
			expect( this.styleView.getItemForSelection( item ) ).toEqual( item );
		});

		it('should return an item if passed an item view', function() {
			var item = new Item({ title: "My Item" });
			var itemView = new ItemView( item );
			expect( this.styleView.getItemForSelection( itemView ) ).toEqual( item );
		});

		it('should return an item if passed a value view', function() {
			var item = new Item({ title: "My Item" });
			var valueView = new TemplateValueView( item );
			expect( this.styleView.getItemForSelection( valueView ) ).toEqual( item );
		});

		it('should return the group view if passed a TemplateGroupView', function() {
			var item = new TemplateGroupView();
			expect( this.styleView.getItemForSelection( item ) ).toEqual( item );
		});

		it('should throw an error if passed anything other than an Item, ItemView, TemplateValueView or TemplateGroupView', function() {
			expect(function() {
				this.styleView.getItemForSelection("hi");
			}.bind( this ))
			.toThrow("exception: Selection must be an Item, ItemView, TemplateValueView or TemplateGroupView");
		});
	});

	describe('Listening to Template Events', function() {

	});

	describe('Listening to Items Events', function() {

	});

	describe('Listening to Style Updates', function() {
		beforeEach(function() {
			this.styleView = new StyleView();
			spyOn( this.styleView, '_emitChange');
		});

		it('should respond to input view events', function() {
			var item = new Item({ title: "My Item" });
			// var event = document.createEvent('CustomEvent');
			// event.initCustomEvent('Columns.StyleInputView.ValueDidUpdateForPropertyAndItem', false, false, {
			// 	item: 	item,
			// 	property: 'font-size',
			// 	value: 	'12px'
			// });

			// document.dispatchEvent( event );
			ColumnsEvent.send( 'Columns.StyleInputView.ValueDidUpdateForPropertyAndItem', {
				item: 	item,
				property: 'font-size',
				value: 	'12px'
			});
			expect( this.styleView._emitChange ).toHaveBeenCalledWith( item, 'font-size', '12px' );
		});

		it('should respond to segmented button view events', function() {
			var item = new Item({ title: "My Item" });
			// var event = document.createEvent('CustomEvent');
			// event.initCustomEvent('Columns.StyleSegmentedButtonView.ValueDidUpdateForPropertyAndItem', false, false, {
			// 	item: 	item,
			// 	property: 'font-size',
			// 	value: 	'12px'
			// });

			// document.dispatchEvent( event );
			ColumnsEvent.send( 'Columns.StyleSegmentedButtonView.ValueDidUpdateForPropertyAndItem', {
				item: 	item,
				property: 'font-size',
				value: 	'12px'
			});

			expect( this.styleView._emitChange ).toHaveBeenCalledWith( item, 'font-size', '12px' );
		});

		it('should respond to multiple segmented button view events', function() {
			var item = new Item({ title: "My Item" });
			// var event = document.createEvent('CustomEvent');
			// event.initCustomEvent('Columns.StyleMultipleSegmentedButtonView.ValueDidUpdateForPropertyAndItem', false, false, {
			// 	item: 	item,
			// 	property: 'font-size',
			// 	value: 	'12px'
			// });

			// document.dispatchEvent( event );
			ColumnsEvent.send('Columns.StyleMultipleSegmentedButtonView.ValueDidUpdateForPropertyAndItem', {
				item: 	item,
				property: 'font-size',
				value: 	'12px'
			});

			expect( this.styleView._emitChange ).toHaveBeenCalledWith( item, 'font-size', '12px' );
		});
	});

	describe('Emitting Change Events', function() {

		beforeEach(function() {
			this.styleView = new StyleView();
			spyOn( ColumnsEvent, 'send' );
		});

		it('should alert the app of the style changes for a TemplateGroupView', function() {
			var item = new TemplateGroupView();
			this.styleView._emitChange( item, 'align-items', 'center' );
			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.StyleView.PropertyDidUpdateWithValueForGroupView');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].groupView ).toEqual( item );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].property ).toBe( 'align-items' );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].value ).toBe( 'center' );
		});

		it('should alert the app of the style changes for an Item', function() {
			var item = new Item({ title: "My Item" });
			this.styleView._emitChange( item, 'text-align', 'left' );
			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.StyleView.PropertyDidUpdateWithValueForItem');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].item ).toEqual( item );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].property ).toBe( 'text-align' );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].value ).toBe( 'left' );
		});

		it('should do nothing if the item is not a TemplateGroupView or Item', function() {
			var item = 'Hi';
			this.styleView._emitChange( item, 'text-align', 'left' );
			expect( ColumnsEvent.send ).not.toHaveBeenCalled();
		});
	});
});