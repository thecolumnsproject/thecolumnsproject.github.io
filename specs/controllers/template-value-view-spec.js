describe('Template Value View', function() {

	describe('Initiation', function() {

		it('should initiate with an item', function() {
			var item = new Item({ title: "My Item" });
			var valueView = new TemplateValueView( item );
			expect( valueView.item ).toEqual( item );
		});

		it('should initiate without an item', function() {
			var valueView = new TemplateValueView();
			expect( valueView.itemId ).toBeUndefined();
		});

		it('should not accept anything other than an item', function() {
			expect(function() {
				new TemplateValueView({});
			})
			.toThrow("exception: item must be of type Item");
		});

		it('should initiate with the correct template', function() {
			var valueView = new TemplateValueView();
			expect( valueView.template ).toEqual( Columns.Templates['templates/layout/row-value.hbs'] );
		});

		it('should optionally instaniate as a placeholder', function() {
			var item = new Item({ title: "My Item" });
			var valueView = new TemplateValueView( item, true );
			expect( valueView.placeholder ).toBe( true );
		});
	});

	describe('Rendering', function() {
		
		beforeEach(function() {
			this.item = new Item({
				title: 'My Item',
				style: 'font-size:14px;color:#3a3a3a;margin-left:12px;'
			});
			this.valueView = new TemplateValueView( this.item );
		});

		it('should render the formatted item title', function() {
			var $value = this.valueView.render();
			expect( $value ).toContainText("My Item");
		});

		it('should render the item with the correct styling', function() {
			var $value = this.valueView.render();
			expect( $value ).toHaveCss({
				'font-size': 	'14px',
				'color': 		'rgb(58, 58, 58)',
				'margin-left': 	'12px'
			});
		});

		it('should render as a placeholder when apppropriate', function() {
			var valueView = new TemplateValueView( this.item, true );
			var $value = valueView.render();
			expect( $value ).toHaveClass('placeholder');
		});

		it('should not render as a placeholder when normal', function() {
			var valueView = new TemplateValueView( this.item );
			var $value = valueView.render();
			expect( $value ).not.toHaveClass('placeholder');
		});

		it('should create a reference to its UI', function() {
			var $value = this.valueView.render();
			expect( this.valueView.$value ).toEqual( $value );
		});
	});

	describe('Updating', function() {

		beforeEach(function() {
			this.valueView = new TemplateValueView( new Item({
				title: 'My Item',
				style: 'font-size:14px;color:#3a3a3a;margin-left:12px;'
			}));
			this.valueView.render();
		});

		it('should render the item with the correct updated styling', function() {
			this.valueView.item = new Item({
				title: 'My Item',
				style: 'font-size:16px;color:#888888;margin-left:14px;'
			});
			var $value = this.valueView.update();
			expect( $value ).toHaveCss({
				'font-size': 	'16px',
				'color': 		'rgb(136, 136, 136)',
				'margin-left': 	'14px'
			});
		});

		it('should create a reference to its UI', function() {
			this.valueView.item = new Item({
				title: 'My Item',
				style: 'font-size:16px;color:#888888;margin-left:14px;'
			});
			var $value = this.valueView.update();
			expect( this.valueView.$value ).toEqual( $value );
		});

		it('should emit an event once the update has finished', function() {
			spyOn(document, 'dispatchEvent');
			this.valueView.item = new Item({
				title: 'My Item',
				style: 'font-size:16px;color:#888888;margin-left:14px;'
			});
			var $value = this.valueView.update();
			expect( document.dispatchEvent ).toHaveBeenCalled();
			expect( document.dispatchEvent.calls.argsFor(0)[0].type ).toBe('Columns.TemplateValueView.DidChange');
			expect( document.dispatchEvent.calls.argsFor(0)[0].detail.valueView ).toEqual( this.valueView );
		});
	});

	describe('Responding to Events', function() {

		beforeEach(function() {
			this.item = new Item({
				title: 'My Item',
				style: 'font-size:14px;color:#3a3a3a;margin-left:12px;'
			});
			this.valueView = new TemplateValueView( this.item );
			this.valueView.render();
			this.spy = spyOn(this.valueView, 'update');
		});

		it('should respond to Item change events for the item it owns', function() {
			var newItem = new Item({
				title: 'My Item',
				style: 'font-size:16px;color:#3a3a3a;margin-left:12px;'
			});

			var event = document.createEvent('CustomEvent');
			event.initCustomEvent('Columns.Item.DidChange', false, false, { item: newItem });
			document.dispatchEvent( event );

			expect( this.spy ).toHaveBeenCalled();
			expect( this.valueView.item ).toEqual( newItem );
		});

		it('should ignore Item change events for other items', function() {
			var newItem = new Item({
				title: 'Other Item',
				style: 'font-size:16px;color:#3a3a3a;margin-left:12px;'
			});

			var event = document.createEvent('CustomEvent');
			event.initCustomEvent('Columns.Item.DidChange', false, false, { item: newItem });
			document.dispatchEvent( event );

			expect( this.spy ).not.toHaveBeenCalled();
			expect( this.valueView.item ).toEqual( this.item );
		});
	});

	describe('Dragging', function() {

		beforeEach(function() {
			this.valueView	= new TemplateValueView( new Item({ title: "My Item" }) );;
			this.$value		= this.valueView.render();
			this.fakeUI		= {};

			spyOn(document, 'dispatchEvent');
		});

		it('should be draggable', function() {
			expect( this.$value.draggable('instance') ).toBeDefined();
		});

		it('should emit an event on drag start', function() {
			this.$value.trigger('dragstart', this.fakeUI);
			expect( document.dispatchEvent.calls.argsFor(0)[0].type ).toBe('Columns.TemplateValueView.ValueDidBeginDragWithItem');
			expect( document.dispatchEvent.calls.argsFor(0)[0].detail.valueView ).toEqual( this.valueView );
			expect( document.dispatchEvent.calls.argsFor(0)[0].detail.item ).toEqual( this.valueView.item );
			expect( document.dispatchEvent.calls.argsFor(0)[0].detail.ui ).toEqual( this.fakeUI );
		});

		it('should emit an event on drag stop', function() {
			this.$value.trigger('dragstop', this.fakeUI);
			expect( document.dispatchEvent.calls.argsFor(0)[0].type ).toBe('Columns.TemplateValueView.ValueDidEndDragWithItem');
			expect( document.dispatchEvent.calls.argsFor(0)[0].detail.valueView ).toEqual( this.valueView );
			expect( document.dispatchEvent.calls.argsFor(0)[0].detail.item ).toEqual( this.valueView.item );
			expect( document.dispatchEvent.calls.argsFor(0)[0].detail.ui ).toEqual( this.fakeUI );
		});

		it('should emit an event on drag', function() {
			this.$value.trigger('drag', this.fakeUI);
			expect( document.dispatchEvent.calls.argsFor(0)[0].type ).toBe('Columns.TemplateValueView.ValueDidDragWithItem');
			expect( document.dispatchEvent.calls.argsFor(0)[0].detail.valueView ).toEqual( this.valueView );
			expect( document.dispatchEvent.calls.argsFor(0)[0].detail.item ).toEqual( this.valueView.item );
			expect( document.dispatchEvent.calls.argsFor(0)[0].detail.ui ).toEqual( this.fakeUI );
		});
	});

	// afterEach(function() {
	// 	document.removeEventListener( 'Columns.Item.DidChange', TemplateValueView._onItemDidChange.bind, false);
	// });
});