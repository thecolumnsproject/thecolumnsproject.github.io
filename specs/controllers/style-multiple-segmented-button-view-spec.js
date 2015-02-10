describe('Style Multiple Segmented Button View', function() {

	describe('Initiation', function() {

		it('should have the correct defaults', function() {
			var buttonsView = new StyleMultipleSegmentedButtonView();
			expect( buttonsView.label ).toBe( '' );
			expect( buttonsView.buttons ).toEqual( [] );
			expect( buttonsView.properties ).toEqual( {} );
			expect( buttonsView.item ).toBeUndefined();
		});

		it('should be associated with an object that it styles', function() {
			var item = new Item({ title: "My Item" });
			var buttonsView = new StyleMultipleSegmentedButtonView({ item: item });
			expect( buttonsView.item ).toEqual( item );
		});

		it('should allow initiation with a label', function() {
			var buttonsView = new StyleMultipleSegmentedButtonView({ label: 'My Label' });
			expect( buttonsView.label ).toBe( 'My Label' );
		});

		it('should allow initiation with a set of buttons, each with icon, property and active, inactive and current values', function() {
			var buttons = [{
				property: 'font-weight',
				values: {
					active: 'bold',
					inactive: 'normal'
				},
				icon: 'bold'
			}, {
				property: 'font-style',
				values: {
					active: 'italic',
					inactive: 'normal'
				},
				icon: 'italic'
			}, {
				property: 'text-decoration',
				values: {
					active: 'underline',
					inactive: 'none'
				},
				icon: 'underline'
			}];
			var buttonsView = new StyleMultipleSegmentedButtonView({ buttons: buttons });
			expect( buttonsView.buttons ).toEqual( buttons );
		});

		it('should create a properties hash from the buttons', function() {
			var buttons = [{
				property: 'font-weight',
				values: {
					active: 'bold',
					inactive: 'normal',
					current: 'bold'
				},
				icon: 'bold'
			}, {
				property: 'font-style',
				values: {
					active: 'italic',
					inactive: 'normal',
					current: 'normal'
				},
				icon: 'italic'
			}, {
				property: 'text-decoration',
				values: {
					active: 'underline',
					inactive: 'none',
					current: 'auto'
				},
				icon: 'underline'
			}];
			var buttonsView = new StyleMultipleSegmentedButtonView({ buttons: buttons });
			expect( buttonsView.properties ).toEqual({
				'font-weight': 'bold',
				'font-style': 'normal',
				'text-decoration': 'auto'
			});
		});
	});

	describe('Rendering', function() {

		beforeEach(function() {

			var buttons = [{
				property: 'font-weight',
				values: {
					active: 'bold',
					inactive: 'normal',
					current: 'bold'
				},
				icon: 'bold'
			}, {
				property: 'font-style',
				values: {
					active: 'italic',
					inactive: 'normal',
					current: 'normal'
				},
				icon: 'italic'
			}, {
				property: 'text-decoration',
				values: {
					active: 'underline',
					inactive: 'none',
					current: 'auto'
				},
				icon: 'underline'
			}];
			this.buttonsView = new StyleMultipleSegmentedButtonView({
				label: "My Segmented Button",
				buttons: buttons
			});
			this.$button = this.buttonsView.render();
		});

		it('should have the right class', function() {
			expect( this.$button ).toHaveClass('style-component-section-row-item');
			expect( this.$button ).toContainElement('.style-component-section-row-multiple-segmented-button');
		});

		it('should have the right label', function() {
			expect( this.$button.find('.style-component-section-row-item-label') ).toHaveText("My Segmented Button");
		});

		it('should have the right number of buttons', function() {
			expect( this.$button.find('button').length ).toBe( 3 );
		});

		it('should render the buttons with the correct attributes', function() {
			expect( this.$button.find('button').eq( 0 ) ).toHaveData('property', 'font-weight');
			expect( this.$button.find('button').eq( 0 ) ).toHaveData('active-value', 'bold');
			expect( this.$button.find('button').eq( 0 ) ).toHaveData('inactive-value', 'normal');
			expect( this.$button.find('button').eq( 1 ) ).toHaveData('property', 'font-style');
			expect( this.$button.find('button').eq( 1 ) ).toHaveData('active-value', 'italic');
			expect( this.$button.find('button').eq( 1 ) ).toHaveData('inactive-value', 'normal');
			expect( this.$button.find('button').eq( 2 ) ).toHaveData('property', 'text-decoration');
			expect( this.$button.find('button').eq( 2 ) ).toHaveData('active-value', 'underline');
			expect( this.$button.find('button').eq( 2 ) ).toHaveData('inactive-value', 'none');
		});

		it('should set the correct button as active', function() {
			expect( this.$button.find('button').eq( 0 ) ).toHaveClass('active');
			expect( this.$button.find('button').eq( 1 ) ).not.toHaveClass('active');
			expect( this.$button.find('button').eq( 2 ) ).not.toHaveClass('active');
		});
	});

	describe('Updating', function() {

		beforeEach(function() {

			var buttons = [{
				property: 'font-weight',
				values: {
					active: 'bold',
					inactive: 'normal',
					current: 'bold'
				},
				icon: 'bold'
			}, {
				property: 'font-style',
				values: {
					active: 'italic',
					inactive: 'normal',
					current: 'normal'
				},
				icon: 'italic'
			}, {
				property: 'text-decoration',
				values: {
					active: 'underline',
					inactive: 'none',
					current: 'auto'
				},
				icon: 'underline'
			}];
			this.buttonsView = new StyleMultipleSegmentedButtonView();
		});

		it('should update its value', function() {
			this.buttonsView.update( 'text-align', 'left' );
			expect( this.buttonsView.properties['text-align'] ).toBe('left');
		});

		it('should notify the app of the new value', function() {
			var item = new Item({ title: "My Item" });
			spyOn(document, 'dispatchEvent');
			this.buttonsView.item = item;
			this.buttonsView.update( 'text-align', 'right' );

			expect( document.dispatchEvent.calls.argsFor(0)[0].type ).toBe('Columns.StyleMultipleSegmentedButtonView.ValueDidUpdateForPropertyAndItem');
			expect( document.dispatchEvent.calls.argsFor(0)[0].detail.item ).toEqual( item );
			expect( document.dispatchEvent.calls.argsFor(0)[0].detail.property ).toBe( 'text-align' );
			expect( document.dispatchEvent.calls.argsFor(0)[0].detail.value ).toBe( 'right' );
		});
	});

	describe('Handing User Interaction', function() {

		beforeEach(function() {

			var buttons = [{
				property: 'font-weight',
				values: {
					active: 'bold',
					inactive: 'normal',
					current: 'bold'
				},
				icon: 'bold'
			}, {
				property: 'font-style',
				values: {
					active: 'italic',
					inactive: 'normal',
					current: 'normal'
				},
				icon: 'italic'
			}, {
				property: 'text-decoration',
				values: {
					active: 'underline',
					inactive: 'none',
					current: 'auto'
				},
				icon: 'underline'
			}];
			this.buttonsView = new StyleMultipleSegmentedButtonView({ buttons: buttons });
			this.$button = this.buttonsView.render();
		});

		it('should select the clicked button if it was inactive', function() {
			this.$button.find('button').eq( 1 ).trigger('click');
			expect( this.$button.find('button').eq( 1 ) ).toHaveClass('active');
		});

		it('should deselect the clicked button if it was active', function() {
			this.$button.find('button').eq( 0 ).trigger('click');
			expect( this.$button.find('button').eq( 0 ) ).not.toHaveClass('active');
		});

		it('should call the update method with the correct property and value', function() {
			spyOn( this.buttonsView, 'update' );
			this.$button.find('button').eq( 0 ).trigger('click');
			this.$button.find('button').eq( 1 ).trigger('click');
			expect( this.buttonsView.update ).toHaveBeenCalledWith( 'font-weight', 'normal' );
			expect( this.buttonsView.update ).toHaveBeenCalledWith( 'font-style', 'italic' );
		});
	});
});