jasmine.getFixtures().fixturesPath = 'specs/fixtures';

describe('Style View Spec', function() {

	afterEach(function() {
		ColumnsEvent.offAll();
	});

	describe('Initialization', function() {

		beforeEach(function() {
			// this.$groups = 'fake groups';
			// spyOn( TemplateView, 'getGroupsForItem' ).and.returnValue( this.$groups );
		});

		it('should initialize with the correct defaults', function() {
			var componentView = new StyleComponentView();
			expect( componentView.item ).toBeUndefined();
			// expect( componentView.templateGroups ).toEqual( [] );
		});

		it('should optionally initialize with an item', function() {
			var item = new Item({ title: "My Item" });
			var componentView = new StyleComponentView( item );
			expect( componentView.item ).toEqual( item );
		});

		it('should optionally initialize with a TemplateGroupView', function() {
			var item = new TemplateGroupView();
			var componentView = new StyleComponentView( item );
			expect( componentView.item ).toEqual( item );
		});

		xit('should throw an error if initialized with anything other than an Item, ItemView, TemplateValueView or TemplateGroupView', function() {
			expect(function() {
				new StyleComponentView( "nope" );
			}).toThrow("exception: Selection must be an Item, ItemView, TemplateValueView or TemplateGroupView");
		});

		xit('should determine all parent groups', function() {
			var item = new Item({ title: "My Item" });
			var componentView = new StyleComponentView( item );
			expect( TemplateView.getGroupsForItem ).toHaveBeenCalledWith( item );
			expect( componentView.templateGroups ).toEqual( this.$groups );
		});
	});

	xdescribe('Getting an Item from a Selection', function() {

		beforeEach(function() {
			this.componentView = new StyleComponentView();
		});

		it('should return an item if passed an item', function() {
			var item = new Item({ title: "My Item" });
			expect( this.componentView.getItemForSelection( item ) ).toEqual( item );
		});

		it('should return an item if passed an item view', function() {
			var item = new Item({ title: "My Item" });
			var itemView = new ItemView( item );
			expect( this.componentView.getItemForSelection( itemView ) ).toEqual( item );
		});

		it('should return an item if passed a value view', function() {
			var item = new Item({ title: "My Item" });
			var valueView = new TemplateValueView( item );
			expect( this.componentView.getItemForSelection( valueView ) ).toEqual( item );
		});

		it('should return the group view if passed a TemplateGroupView', function() {
			var item = new TemplateGroupView();
			expect( this.componentView.getItemForSelection( item ) ).toEqual( item );
		});

		it('should throw an error if passed anything other than an Item, ItemView, TemplateValueView or TemplateGroupView', function() {
			expect(function() {
				this.componentView.getItemForSelection("hi");
			}.bind( this ))
			.toThrow("exception: Selection must be an Item, ItemView, TemplateValueView or TemplateGroupView");
		});
	});

	xdescribe('Getting Current Values', function() {

		beforeEach(function() {
			this.item = new Item({
				title: 'My Item',
				style: 'font-size:14px;color:#3a3a3a;margin-left:12px;'
			});
			this.valueView = new TemplateValueView( this.item );
			this.componentView = new StyleComponentView();
		});

		describe('Get Single Current Value', function() {

			it('should accept a jQuery object representing either a value or group', function() {
				expect(function() {
					this.componentView.getCurrentValue( this.valueView.render() );
				}.bind( this ))
				.not.toThrow();
			});

			it('should get the current value of a layout property', function() {
				expect( this.componentView.getCurrentValue( this.valueView.render() ) ).toBe()
			});

			it('should get the current value of a style property', function() {

			});

			it('should return undefined if the value has not been set', function() {

			});
		});

		describe('Get All Current Values', function() {

		});
	});

	describe('Rendering', function() {

		beforeEach(function() {
			loadFixtures('style-bare.html');

			var item = new Item({
				title: 'My Item',
				style: 'font-size:14px;color:#3a3a3a;margin-left:12px;'
			});
			var group = new TemplateGroupView({
				layout: [{
					property:'flex-direction',
					value: 'row'
				}, {
					property: 'justify-content',
					value: 'flex-start'
				}, {
					property: 'align-items',
					value: 'center'
				}],
				style: [{
					property: 'font-size',
					value: '12px'
				}]
			});

			// spyOn( this.groupStyleView, 'getStyle' );
			// spyOn( this.groupStyleView, 'getStyle' );

			this.$itemStyle = new StyleComponentView( item ).render();
			
			group.render();
			this.groupStyleView = new StyleComponentView( group );
			spyOn( group, 'title' ).and.returnValue('Group');
			this.$groupStyle = this.groupStyleView.render();
		});

		it('should have the correct class', function() {
			expect( this.$itemStyle ).toHaveClass('style-component');
			expect( this.$groupStyle ).toHaveClass('style-component');
		});

		it('should render component with the correct item title', function() {
			expect( this.$itemStyle.find('.style-component-header-title') ).toHaveText('My Item');
			expect( this.$groupStyle.find('.style-component-header-title') ).toHaveText('Group');
		});

		it('should render the correct sub-components for text', function() {
			expect( this.$itemStyle.find('.style-component-section').length ).toBe( 2 );
			expect( this.$itemStyle.find('.style-component-section-row').length ).toBe( 4 );
			expect( this.$itemStyle.find('.style-component-section-row-input').length ).toBe( 6 );
			expect( this.$itemStyle.find('.style-component-section-row-segmented-button').length ).toBe( 1 );
			expect( this.$itemStyle.find('.style-component-section-row-multiple-segmented-button').length ).toBe( 1 );
		});

		it('should render the correct sub-components for a group', function() {
			expect( this.$groupStyle.find('.style-component-section').length ).toBe( 1 );
			expect( this.$groupStyle.find('.style-component-section-row').length ).toBe( 1 );
			expect( this.$groupStyle.find('.style-component-section-row-segmented-button').length ).toBe( 2 );
		});

		xit('should render sub-components with the correct default values', function() {

		});

		xit('should clear existing components on item rendering', function() {
			expect( this.$itemStyle.prevAll().length ).toBe( 0 );
		});

		xit('should append to existing components on group rendering', function() {
			expect( this.$groupStyle.prevAll().length ).toBe( 1 );
		});
	});

	xdescribe('Updating', function() {

		it('should remove existing components', function() {

		});

		it('should update the item and / or value view and / or group', function() {

		});

		it('should render the new components', function() {

		});
	});

	xdescribe('Determining Parent Selections', function() {

		it('throw an error if not passed an Item, ItemView or TemplateValueView', function() {

		});
	});
});