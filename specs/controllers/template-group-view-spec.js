describe('Template Group View', function() {

	describe('Initialization', function() {

		beforeEach(function() {
			this.layout = [{
				property:'flex-direction',
				value: 'row'
			}, {
				property: 'justify-content':
				value: 'flex-start'
			}, {
				property: 'align-items',
				value: 'center'
			}]
		});

		it('should initialize without any properties', function() {
			var group = new TemplateGroupView();
			expect( group.layout ).toBeUndefined();
			expect( group.placeholder ).toBe( false );
		});

		it('should iniialize with a layout', function() {
			var group = new TemplateGroupView( this.layout );
			expect( group.layout ).toEqual( this.layout );
			expect( group.placeholder ).toBe( false );
		});

		it('should optionally iniialize as a placeholder', function() {
			var group = new TemplateGroupView( this.layout, true );
			expect( group.layout ).toEqual( this.layout );
			expect( group.placeholder ).toBe( true );

		});
	});

	describe('Rendering', function() {

		beforeEach(function() {
			this.layout = [{
				property:'flex-direction',
				value: 'row'
			}, {
				property: 'justify-content':
				value: 'flex-start'
			}, {
				property: 'align-items',
				value: 'center'
			}]
			this.groupView = new TemplateGroupView( this.layout );
		});

		it('should render the group with the correct layout', function() {
			var $group = this.groupView.render();
			expect( $group.data('flex-direction') ).toBe('row');
			expect( $group.data('justify-content') ).toBe('flex-start');
			expect( $group.data('align-items') ).toBe('center');
		});

		it('should render as a placeholder when apppropriate', function() {
			var groupView = new TemplateGroupView( this.item, true );
			var $group = groupView.render();
			expect( $group ).toHaveClass('placeholder');
		});

		it('should not render as a placeholder when normal', function() {
			var groupView = new TemplateGroupView( this.item, true );
			var $group = groupView.render();
			expect( $group ).not.toHaveClass('placeholder');
		});

		it('should create a reference to its UI', function() {
			var $group = this.groupView.render();
			expect( this.groupView.$group ).toEqual( $group );
		});
	});

	describe('Updating', function() {

		beforeEach(function() {
			this.groupView = new TemplateGroupView([{
				property:'flex-direction',
				value: 'row'
			}, {
				property: 'justify-content':
				value: 'flex-start'
			}, {
				property: 'align-items',
				value: 'center'
			}]);
			this.groupView.render();
		});

		it('should render the item with the correct updated layout', function() {
			this.groupView.layout = [{
				property:'flex-direction',
				value: 'column'
			}, {
				property: 'justify-content':
				value: 'flex-start'
			}, {
				property: 'align-items',
				value: 'flex-end'
			}, {
				property: 'align-content',
				value: 'stretch'
			}];
			var $group = this.groupView.update();
			expect( $group.data('flex-direction') ).toBe('column');
			expect( $group.data('justify-content') ).toBe('flex-start');
			expect( $group.data('align-items') ).toBe('flex-end');
			expect( $group.data('align-content') ).toBe('stretch');
		});

		it('should create a reference to its UI', function() {
			this.groupView.layout = [{
				property:'flex-direction',
				value: 'column'
			}, {
				property: 'justify-content':
				value: 'flex-start'
			}, {
				property: 'align-items',
				value: 'flex-end'
			}, {
				property: 'align-content',
				value: 'stretch'
			}];
			var $group = this.groupView.update();
			expect( this.groupView.$group ).toEqual( $group );
		});
	});

	describe('Responding to Events', function() {

		beforeEach(function() {
			this.groupView = new TemplateGroupView([{
				property:'flex-direction',
				value: 'row'
			}, {
				property: 'justify-content':
				value: 'flex-start'
			}, {
				property: 'align-items',
				value: 'center'
			}]);
			this.groupView.render();
			this.spy = spyOn(this.groupView, 'update');
		});

		it('should respond to layout change events for itself', function() {
			var newItem = new Item({
				title: 'My Item',
				style: 'font-size:16px;color:#3a3a3a;margin-left:12px;'
			});

			var event = document.createEvent('CustomEvent');
			event.initCustomEvent('Columns.StyleView.layoutDidChangeForGroupView', false, false, { item: newItem });
			document.dispatchEvent( event );

			expect( this.spy ).toHaveBeenCalled();
			expect( this.groupView.item ).toEqual( newItem );
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
			expect( this.groupView.item ).toEqual( this.item );
		});
	});
});