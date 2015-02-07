describe('Style Segmented Button View', function() {

	describe('Initiation', function() {

		beforeEach(function() {

			this.buttonsView = new StyleSegmentedButtonView();
		});

		it('should have the correct defaults', function() {
			this.buttonsView = new StyleSegmentedButtonView();
			expect( this.buttonsView.label ).toBe( '' );
			expect( this.buttonsView.property ).toBe( '' );
			expect( this.buttonsView.buttons ).toEqual( [] );
		});

		it('should allow initiation with a label', function() {
			this.buttonsView = new StyleSegmentedButtonView({ label: 'My Segmented Button' });
			expect( this.buttonsView.label ).toBe('My Segmented Button');
		});

		it('should allow initiation with a current value', function() {
			this.buttonsView = new StyleSegmentedButtonView({ value: 'left' });
			expect( this.buttonsView.value ).toBe('left');
		});

		it('should allow initiation with a property', function() {
			this.buttonsView = new StyleSegmentedButtonView({ property: 'text-align' });
			expect( this.buttonsView.property ).toBe('text-align');
		});

		it('should allow intiation with a set of buttons, each with icon and value', function() {
			var buttons = [{
				icon: 'icon1',
				value: 'center'
			}, {
				icon: 'icon2',
				value: 'right'
			}];
			this.buttonsView = new StyleSegmentedButtonView({ buttons: buttons });
			expect( this.buttonsView.buttons ).toEqual( buttons );
		});
	});

	describe('Rendering', function() {

		beforeEach(function() {
			var buttons = [{
				icon: 'icon1',
				value: 'center'
			}, {
				icon: 'icon2',
				value: 'right'
			}];
			this.buttonsView = new StyleSegmentedButtonView({
				label: "My Segmented Button",
				property: 'text-align',
				value: 'center',
				buttons: buttons
			});
			this.$button = this.buttonsView.render();
		});

		it('should have the right class', function() {
			expect( this.$button ).toHaveClass('style-component-section-row-item');
			expect( this.$button ).toContainElement('.style-component-section-row-segmented-button');
		});

		it('should have the right label', function() {
			expect( this.$button.find('.style-component-section-row-item-label') ).toHaveText("My Segmented Button");
		});

		it('should have the right property', function() {
			expect( this.$button.find('.style-component-section-row-segmented-button') ).toHaveData('property', 'text-align');
		});

		it('should have the right number of buttons', function() {
			expect( this.$button.find('button').length ).toBe( 2 );
		});

		it('should render the buttons with the correct values', function() {
			expect( this.$button.find('button').eq( 0 ) ).toHaveData('value', 'center');
			expect( this.$button.find('button').eq( 1 ) ).toHaveData('value', 'right');
		});

		it('should set the correct button as active', function() {
			expect( this.$button.find('button').eq( 0 ) ).toHaveClass('active');
			expect( this.$button.find('button').eq( 1 ) ).not.toHaveClass('active');
		});
	});

	describe('Updating', function() {

		beforeEach(function() {
			var buttons = [{
				icon: 'icon1',
				value: 'center'
			}, {
				icon: 'icon2',
				value: 'right'
			}];
			this.buttonsView = new StyleSegmentedButtonView({
				label: "My Segmented Button",
				property: 'text-align',
				value: 'center',
				buttons: buttons
			});
		});

		it('should update its value', function() {
			this.buttonsView.update( 'right' );
			expect( this.buttonsView.value ).toBe('right');
		});

		it('should notify the app of the new value', function() {
			spyOn(document, 'dispatchEvent');
			this.buttonsView.update( 'right' );

			expect( document.dispatchEvent.calls.argsFor(0)[0].type ).toBe('Columns.StyleSegmentedButtonView.ValueDidUpdateForProperty');
			expect( document.dispatchEvent.calls.argsFor(0)[0].detail.property ).toBe( 'text-align' );
			expect( document.dispatchEvent.calls.argsFor(0)[0].detail.value ).toBe( 'right' );
		});

	});

	describe('Handling User Interaction', function() {

		beforeEach(function() {
			var buttons = [{
				icon: 'icon1',
				value: 'center'
			}, {
				icon: 'icon2',
				value: 'right'
			}];
			this.buttonsView = new StyleSegmentedButtonView({
				label: "My Segmented Button",
				property: 'text-align',
				value: 'center',
				buttons: buttons
			});
			this.$button = this.buttonsView.render();
		});

		it('should select the clicked button', function() {
			this.$button.find('button').eq( 1 ).trigger('click');
			expect( this.$button.find('button').eq( 1 ) ).toHaveClass('active');
		});

		it('should deselect the other buttons', function() {
			this.$button.find('button').eq( 1 ).trigger('click');
			expect( this.$button.find('button').eq( 0 ) ).not.toHaveClass('active');
		});

		it('should call the update method', function() {
			spyOn( this.buttonsView, 'update' );
			this.$button.find('button').eq( 1 ).trigger('click');
			expect( this.buttonsView.update ).toHaveBeenCalledWith( 'right' );
		});
	});
});