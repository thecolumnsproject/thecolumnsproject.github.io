describe('Style View Spec', function() {

	describe('Initialization', function() {

		beforeEach(function() {
			this.$groups = 'fake groups';
			spyOn( TemplateView, 'getGroupsForItem' ).and.returnValue( this.$groups );
		});

		it('should initialize with the correct defaults', function() {
			var styleView = new StyleView();
			expect( styleView.item ).toBeUndefined();
			expect( styleView.templateGroups ).toEqual( [] );
		});

		it('should optionally initialize with an item', function() {
			var item = new Item({ title: "My Item" });
			var styleView = new StyleView( item );
			expect( styleView.item ).toEqual( item );
		});

		it('should throw an error if initialized with anything other than an Item, ItemView or TemplateValueView', function() {
			expect(function() {
				new StyleView( "nope" );
			}).toThrow("exception: Selection must be an Item, ItemView or TemplateValueView");
		});

		it('should determine all parent groups', function() {
			var item = new Item({ title: "My Item" });
			var styleView = new StyleView( item );
			expect( TemplateView.getGroupsForItem ).toHaveBeenCalledWith( item );
			expect( styleView.templateGroups ).toEqual( this.$groups );
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

		it('should throw an error if passed anything other than an Item, ItemView or TemplateValueView', function() {
			expect(function() {
				this.styleView.getItemForSelection("hi");
			}.bind( this ))
			.toThrow("exception: Selection must be an Item, ItemView or TemplateValueView");
		});
	});

	describe('Getting Current Values', function() {

		beforeEach(function() {
			this.item = new Item({
				title: 'My Item',
				style: 'font-size:14px;color:#3a3a3a;margin-left:12px;'
			});
			this.valueView = new TemplateValueView( this.item );
			this.styleView = new StyleView();
		});

		describe('Get Single Current Value', function() {

			it('should accept a jQuery object representing either a value or group', function() {
				expect(function() {
					this.styleView.getCurrentValue( this.valueView.render() );
				}.bind( this ))
				.not.toThrow();
			});

			it('should get the current value of a layout property', function() {
				expect( this.styleView.getCurrentValue( this.valueView.render() ) ).toBe()
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
			this.styleView = new StyleView();
		});

		it('should have the correct class', function() {

		});

		it('should render components for the correct items', function() {

		});

		it('should render the correct sub-components', function() {

		});

		it('should render sub-components with the correct default values', function() {

		});
	});

	describe('Updating', function() {

		it('should remove existing components', function() {

		});

		it('should update the item and / or value view and / or group', function() {

		});

		it('should render the new components', function() {

		});
	});

	describe('Determining Parent Selections', function() {

		it('throw an error if not passed an Item, ItemView or TemplateValueView', function() {

		});
	});

	describe('Listening to Template Events', function() {

	});

	describe('Listening to Items Events', function() {

	});
});