var ColumnsEvent 		= require('../../javascripts/models/ColumnsEvent.js');

describe('Item Model', function() {

	afterEach(function() {
		ColumnsEvent.offAll();
	});

	describe('Construction', function() {

		it ('should allow construction with no parameters', function() {
			var item = new Item();
			expect(item.title).toBeUndefined();
			expect(item.style).toBeUndefined();
		});

		it('should default to the active state', function() {
			var item = new Item();
			expect( item.active ).toBeTruthy();
		});

		it('should allow construction with a title, style and active state', function() {
			var item = new Item({
				title: "My Item",
				style: 'font-size:14px;color:#3a3a3a;',
				active: false
			});
			expect(item.title).toBe('My Item');
			expect(item.style.styles).toEqual([{
				property: 'font-size',
				value: '14px'
			}, {
				property: 'color',
				value: '#3a3a3a'
			}]);
			expect( item.active ).toBe( false );
		});

		xit('should assign itself an id based on the unformatted item name', function() {
			var item = new Item({ title: "My Item" });
			expect( item.id ).toBe('my_item');
		});
	});

	describe('Title Formatting', function() {

		it('should uppercase titles and replace underscores with spaces', function() {
			var item = new Item({title: "my_column"});
			expect(item.formattedTitle()).toBe('My Column');
		});

		it('should replace empty titles with an underscore', function() {
			var item = new Item({title: ''});
			expect(item.formattedTitle()).toBe('_');
		});

		it('should return a single unscore as is', function() {
			var item = new Item({title: '_'});
			expect(item.formattedTitle()).toBe('_');
		});
	});

	describe('Title Unformatting', function() {

		it('should lowercase titles and replace spaces with an underscore', function() {
			var item = new Item({title: "My Column"});
			expect(item.unformattedTitle()).toBe('my_column');
		});

		it('should replace empty titles with an underscore', function() {
			var item = new Item({title: ''});
			expect(item.unformattedTitle()).toBe('_');
		});
	});

	describe('Getting Style Attributes', function() {

		beforeEach(function() {
			this.item = new Item({
				title: "My Item",
				style: 'font-size:14px;color:#3a3a3a;'
			});
		});

		it('should return the style value of a property if it is part of the style object', function() {
			expect( this.item.getStyle( 'font-size' ) ).toBe('14px');
		});

		xit('should return the default css value of a property that is not part of the style object', function() {
			expect( this.item.getStyle( 'text-align' ) ).toBe( 'left' );
		});
	});

	describe('Comparing Items', function() {

		beforeEach(function() {
			this.item = new Item({ title: 'My Item' });
		});

		it('should return true if the passed in item is equal to this one', function() {
			var otherItem = new Item({ title: 'My Item' });
			expect( this.item.is( otherItem ) ).toBe(true);
		});

		it('should return false if the passed in Item is not equal to this one', function() {
			var otherItem = new Item({ title: 'Other Item' });
			expect( this.item.is( otherItem ) ).toBe(false);
		});

		it('should throw an error if the passed in object is not an Item', function() {
			var otherItem = {};
			expect(function() {
				this.item.is( otherItem );
			}.bind( this ))
			.toThrow("exception: Comparison must be with another Item");
		});
	});

	describe('Responding to Events', function() {

		beforeEach(function() {
			this.item = new Item({ title: "My Item" });
			spyOn( this.item, '_emitChange' );
		});

		describe('Style Events', function() {

			beforeEach(function() {
				spyOn( this.item.style, 'update');
			});

			it('should respond to style change events for itself', function() {
				// var event = document.createEvent('CustomEvent');
				// event.initCustomEvent('Columns.StyleView.PropertyDidUpdateWithValueForItem', false, false, {
				// 	item: this.item,
				// 	property: 'font-size',
				// 	value: '12px'
				// });
				// document.dispatchEvent( event );
				ColumnsEvent.send('Columns.StyleView.PropertyDidUpdateWithValueForItem', {
					item: this.item,
					property: 'font-size',
					value: '12px'
				});

				expect( this.item.style.update ).toHaveBeenCalledWith( [{ property: 'font-size', value: '12px' }] );
				expect( this.item._emitChange ).toHaveBeenCalled();
			});

			it('should ignore Item change events for other items', function() {
				var newItem = new Item({ title: "Other Item" });
				// var event = document.createEvent('CustomEvent');
				// event.initCustomEvent('Columns.StyleView.PropertyDidUpdateWithValueForGroupItem', false, false, {
				// 	item: newItem,
				// 	property: 'font-size',
				// 	value: '12px'
				// });
				// document.dispatchEvent( event );
				ColumnsEvent.send('Columns.StyleView.PropertyDidUpdateWithValueForGroupItem', {
					item: newItem,
					property: 'font-size',
					value: '12px'
				});

				expect( this.item.style.update ).not.toHaveBeenCalled();
				expect( this.item._emitChange ).not.toHaveBeenCalled();
			});
		});

		describe('Template Events', function() {

			beforeEach(function() {
				spyOn( this.item, '_setActive' );
				// this.event = document.createEvent('CustomEvent');
				// this.event.initCustomEvent('Columns.TemplateView.DidChange', false, false, {
				// 	templateView: 	new TemplateView()
				// });
			});

			it('should set itself as inactive if found in the template', function() {
				spyOn( TemplateView, 'getValueForItem' ).and.returnValue( undefined );

				ColumnsEvent.send('Columns.TemplateView.DidChange', {
					templateView: 	new TemplateView()
				});

				expect( this.item._setActive ).toHaveBeenCalledWith( true );
			});

			it('should set itself as active if not found in the template', function() {
				spyOn( TemplateView, 'getValueForItem' ).and.returnValue( new TemplateValueView( this.item ) );

				ColumnsEvent.send('Columns.TemplateView.DidChange', {
					templateView: 	new TemplateView()
				});

				expect( this.item._setActive ).toHaveBeenCalledWith( false );
			});
		});
	});

	describe('Managing Active State', function() {

		beforeEach(function() {
			this.item = new Item({ title: "My Item" });
			spyOn( this.item, '_emitActiveStateChange' );
		});

		it('should set active attribute to true', function() {
			this.item._setActive( true );
			expect( this.item.active ).toBe( true );
		});

		it('should set active attribute to false', function() {
			this.item._setActive( false );
			expect( this.item.active ).toBe( false );
		});

		it('should emit a change event if the active state was changed', function() {
			this.item._setActive( false );
			expect( this.item._emitActiveStateChange ).toHaveBeenCalled();
		});

		it('should not emit a change event if the active state was not changed', function() {
			this.item._setActive( true );
			expect( this.item._emitActiveStateChange ).not.toHaveBeenCalled();
		});

	});

	describe('Emitting Change Events', function() {

		var item;
		beforeEach(function() {
			item = new Item({ title: "My Item" });
			spyOn( ColumnsEvent, 'send' );
		})

		it('should alert the app that it has been updated', function() {
			item._emitChange();

			expect( ColumnsEvent.send ).toHaveBeenCalled();
			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.Item.DidChange');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].item ).toEqual( item );
		});

		it('should alert the app that it has changed in active state', function() {
			item._emitActiveStateChange();

			expect( ColumnsEvent.send ).toHaveBeenCalled();
			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.Item.ActiveStateDidChange');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].item ).toEqual( item );
		});
	});
});