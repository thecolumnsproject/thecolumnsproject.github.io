describe('Template Group View', function() {

	describe('Initialization', function() {

		beforeEach(function() {
			this.layout = [{
				property:'flex-direction',
				value: 'row'
			}, {
				property: 'justify-content',
				value: 'flex-start'
			}, {
				property: 'align-items',
				value: 'center'
			}]
		});

		it('should initialize without any properties', function() {
			var group = new TemplateGroupView();
			expect( group.layout ).toEqual( [] );
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

		it('should initialize with the correct template', function()  {
			var group = new TemplateGroupView( this.layout );
			expect( group.template ).toEqual( Columns.Templates['templates/layout/row-group.hbs'] );
		});
	});

	describe('Rendering', function() {

		beforeEach(function() {
			this.layout = [{
				property:'flex-direction',
				value: 'row'
			}, {
				property: 'justify-content',
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
			var groupView = new TemplateGroupView( this.item, false );
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
				property: 'justify-content',
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
				property: 'justify-content',
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
				property: 'justify-content',
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

		it('should emit an event once the update has finished', function() {
			spyOn(document, 'dispatchEvent');
			this.groupView.layout = [{
				property:'flex-direction',
				value: 'column'
			}, {
				property: 'justify-content',
				value: 'flex-start'
			}, {
				property: 'align-items',
				value: 'flex-end'
			}, {
				property: 'align-content',
				value: 'stretch'
			}];
			this.groupView.update();
			expect( document.dispatchEvent ).toHaveBeenCalled();
			expect( document.dispatchEvent.calls.argsFor(0)[0].type ).toBe('Columns.TemplateGroupView.DidChange');
			expect( document.dispatchEvent.calls.argsFor(0)[0].detail.groupView ).toEqual( this.groupView );
		});
	});	

	describe('Responding to Events', function() {

		beforeEach(function() {
			this.layout = [{
				property:'flex-direction',
				value: 'row'
			}, {
				property: 'justify-content',
				value: 'flex-start'
			}, {
				property: 'align-items',
				value: 'center'
			}];
			this.groupView = new TemplateGroupView( this.layout );
			this.groupView.render();
			this.spy = spyOn(this.groupView, 'update');
		});

		it('should respond to layout change events for itself', function() {
			var event = document.createEvent('CustomEvent');
			event.initCustomEvent('Columns.StyleView.LayoutDidChangeForGroupView', false, false, {
				styleView: {},
				groupView: this.groupView,
				layout: this.layout
			});
			document.dispatchEvent( event );

			expect( this.spy ).toHaveBeenCalled();
		});

		it('should ignore Item change events for other items', function() {
			var newGroupView = new TemplateGroupView( this.layout );
			var event = document.createEvent('CustomEvent');
			event.initCustomEvent('Columns.Item.DidChange', false, false, {
				styleView: {},
				groupView: newGroupView,
				layout: this.layout
			});
			document.dispatchEvent( event );

			expect( this.spy ).not.toHaveBeenCalled();
		});
	});

	describe('Dropping', function() {

		beforeEach(function() {
			this.groupView	= new TemplateGroupView([{
				property:'flex-direction',
				value: 'row'
			}, {
				property: 'justify-content',
				value: 'flex-start'
			}, {
				property: 'align-items',
				value: 'center'
			}]);;
			this.$group		= this.groupView.render();
			this.valueView 	= new TemplateValueView( new Item({ title: "My Item" }) );
			this.fakeUI		= {
				droppable: this.valueView
			};

			spyOn(document, 'dispatchEvent');
		});

		it('should be droppable', function() {
			expect( this.$group.droppable('instance') ).toBeDefined();
		});

		it('should emit an event on drop over', function() {
			this.$group.trigger('dropover', this.fakeUI);
			expect( document.dispatchEvent.calls.argsFor(0)[0].type ).toBe('Columns.TemplateGroupView.GroupDidBeginDropOverWithValueView');
			expect( document.dispatchEvent.calls.argsFor(0)[0].detail.groupView ).toEqual( this.groupView );
			expect( document.dispatchEvent.calls.argsFor(0)[0].detail.valueView ).toEqual( this.valueView );
			expect( document.dispatchEvent.calls.argsFor(0)[0].detail.ui ).toEqual( this.fakeUI );
		});

		it('should emit an event on drop out', function() {
			this.$group.trigger('dropout', this.fakeUI);
			expect( document.dispatchEvent.calls.argsFor(0)[0].type ).toBe('Columns.TemplateGroupView.GroupDidEndDropOverWithValueView');
			expect( document.dispatchEvent.calls.argsFor(0)[0].detail.groupView ).toEqual( this.groupView );
			expect( document.dispatchEvent.calls.argsFor(0)[0].detail.valueView ).toEqual( this.valueView );
			expect( document.dispatchEvent.calls.argsFor(0)[0].detail.ui ).toEqual( this.fakeUI );
		});

		it('should emit an event on drop', function() {
			this.$group.trigger('drop', this.fakeUI);
			expect( document.dispatchEvent.calls.argsFor(0)[0].type ).toBe('Columns.TemplateGroupView.GroupDidDropWithValueView');
			expect( document.dispatchEvent.calls.argsFor(0)[0].detail.groupView ).toEqual( this.groupView );
			expect( document.dispatchEvent.calls.argsFor(0)[0].detail.valueView ).toEqual( this.valueView );
			expect( document.dispatchEvent.calls.argsFor(0)[0].detail.ui ).toEqual( this.fakeUI );
		});
	});
});