describe('Style Input View', function() {

	describe('Initialization', function() {

		it('should default to text type', function() {
			var inputView = new StyleInputView();
			expect( inputView.type ).toBe('tel');
			expect( inputView.unit ).toBe( '' );
			expect( inputView.canBeNegative ).toBe( true );
			expect( inputView.canBeDecimal ).toBe( false );
			expect( inputView.property ).toBeUndefined();
			expect( inputView.value ).toBeUndefined();
			expect( inputView.prependIcon ).toBeUndefined();
			expect( inputView.appendControls ).toBe( false );
			expect( inputView.label ).toBeFalsy();
		});

		it('should allow a custom unit', function() {
			var inputView = new StyleInputView({ unit: 'em' });
			expect( inputView.unit ).toBe('em');
		});

		it('should be associated with a css property', function() {
			var inputView = new StyleInputView({ property: 'font-size' });
			expect( inputView.property ).toBe('font-size');
		});

		it('should allow a default value', function() {
			var inputView = new StyleInputView({ unit: 'px', value: '200' });
			expect( inputView.value ).toBe('200px');

			inputView = new StyleInputView({ value: '200px' });
			expect( inputView.value ).toBe('200px');
		});

		it('should allow a prepend icon', function() {
			var inputView = new StyleInputView({ prependIcon: 'margin-top' });
			expect( inputView.prependIcon ).toBe('margin-top');
		});

		it('should increment and decrement optionally', function() {
			var inputView = new StyleInputView({ appendControls: true });
			expect( inputView.appendControls ).toBe( true );
		});

		it('should allow a label', function() {
			var inputView = new StyleInputView({ label: 'Margin Top' });
			expect( inputView.label ).toBe('Margin Top');
		});

		it('should optionally not allow negative values', function() {
			var inputView = new StyleInputView({ canBeNegative: false });
			expect( inputView.canBeNegative ).toBe( false );
		});

		it('should optionally allow decimal values', function() {
			var inputView = new StyleInputView({ canBeDecimal: true });
			expect( inputView.canBeDecimal ).toBe( true );
		});

	});

	describe('Rendering', function() {

		beforeEach(function() {
			this.inputView = new StyleInputView();
		});

		it('should render without any accessories', function() {
			var $input = this.inputView.render();
			expect( $input ).toHaveClass('style-component-section-row-item');
			expect( $input ).toContainElement('.style-component-section-row-input');
			expect( $input ).toContainElement('input');
			expect( $input ).not.toContainElement('.style-component-section-row-input-prepend');
			expect( $input ).not.toContainElement('.style-component-section-row-input-append');
			expect( $input.find('input') ).toHaveValue( '' );
			expect( $input.find('.style-component-section-row-item-label') ).toBeEmpty();
		});

		it('should render with the correct prepend icon', function() {
			this.inputView.prependIcon = 'margin-top';
			var $input = this.inputView.render();
			expect( $input ).toContainElement('.style-component-section-row-input-prepend');
		});

		it('should render with the correct default value', function() {
			this.inputView.value = '20px';
			var $input = this.inputView.render();
			expect( $input.find('input') ).toHaveValue('20px');
		});

		it('should render with the correct label', function() {
			this.inputView.label = 'My Label';
			var $input = this.inputView.render();
			expect( $input.find('.style-component-section-row-item-label') ).toHaveText("My Label");
		});

		it('should render with the increment and decrement controls', function() {
			this.inputView.appendControls = true;
			var $input = this.inputView.render();
			expect( $input ).toContainElement('.style-component-section-row-input-append');
		});
	});

	describe('Updating', function() {

		beforeEach(function() {
			this.inputView = new StyleInputView();
			this.$input = this.inputView.render();
		});

		it('should update the input value', function() {
			this.inputView.update( '4' );
			expect( this.inputView.value ).toBe( '4' );
			expect( this.$input.find('input') ).toHaveValue( '4' );
		});

		it('should fire an update event', function() {
			spyOn(document, 'dispatchEvent');
			this.inputView.property = 'font-size';
			this.inputView.update( '4' );

			expect( document.dispatchEvent.calls.argsFor(0)[0].type ).toBe('Columns.StyleInputView.ValueDidUpdateForProperty');
			expect( document.dispatchEvent.calls.argsFor(0)[0].detail.property ).toBe( 'font-size' );
			expect( document.dispatchEvent.calls.argsFor(0)[0].detail.value ).toBe( '4' );
		});

	});

	describe('Handle User Interaction', function() {

		beforeEach(function() {
			this.inputView = new StyleInputView({
				canBeDecimal: false,
				canBeNegative: false,
				appendControls: true
			});
			this.$input = this.inputView.render();
			spyOn( this.inputView, 'update' );
		});

		it('should update upon value change', function() {
			this.$input.find('input').val( 2 );
			this.$input.find('input').trigger('change');
			expect( this.inputView.update ).toHaveBeenCalledWith( '2' );
		});

		it('should update upon keyup', function() {
			this.$input.find('input').val( 2 );
			this.$input.find('input').trigger('change');
			expect( this.inputView.update ).toHaveBeenCalledWith( '2' );
		});

		it('should update when incremented', function() {
			spyOn( this.inputView, 'increment' ).and.returnValue( '3' );
			this.$input.find('input').val( 2 );
			this.$input.find('.increment').trigger('click');
			expect( this.inputView.increment ).toHaveBeenCalledWith( '2' );
			expect( this.inputView.update ).toHaveBeenCalledWith( '3' );
		});

		it('should update when decremented', function() {
			spyOn( this.inputView, 'decrement' ).and.returnValue( '1' );
			this.$input.find('input').val( 2 );
			this.$input.find('.decrement').trigger('click');
			expect( this.inputView.decrement ).toHaveBeenCalledWith( '2' );
			expect( this.inputView.update ).toHaveBeenCalledWith( '1' );
		});
	});

	xdescribe('Incrementing and Decrementing Values', function() {

		beforeEach(function() {
			this.inputView = new StyleInputView({
				canBeDecimal: false,
				canBeNegative: false,
				unit: 'em',
			});
		});

		it('should increment the value when the user clicks the up arrow', function() {
			expect( this.inputView.increment( 2 ) ).toBe( '3em' );
			expect( this.inputView.increment( 2.1 ) ).toBe( '3em' );
			expect( this.inputView.increment( -4 ) ).toBe( '0em' );
			expect( this.inputView.increment( '2px' ) ).toBe( '3px' );
			expect( this.inputView.increment( '2.1px' ) ).toBe( '3px' );
			expect( this.inputView.increment( '-4px' ) ).toBe( '0px' );
		});

		it('should decrement the value when the user clicks the down arrow', function() {
			expect( this.inputView.decrement( 2 ) ).toBe( '1em' );
			expect( this.inputView.decrement( 2.1 ) ).toBe( '1em' );
			expect( this.inputView.decrement( -4 ) ).toBe( '0em' );
			expect( this.inputView.decrement( '2px' ) ).toBe( '1px' );
			expect( this.inputView.decrement( '2.1px' ) ).toBe( '1px' );
			expect( this.inputView.decrement( '-4px' ) ).toBe( '0px' );
		});
	});

	describe('Parsing Values', function() {

		beforeEach(function() {
			this.inputView = new StyleInputView();
		});

		it('should split the value into number and unit', function() {
			expect( this.inputView.parseValue( '200px' ).number ).toBe( '200' );
			expect( this.inputView.parseValue( '200px' ).unit ).toBe( 'px' );
		});

		xit('should ignore anything before the first number', function() {
			expect( this.inputView.parseValue( 'adsf200px' ).number ).toBe( 200 );
			expect( this.inputView.parseValue( 'asdf200px' ).unit ).toBe( 'px' );
		});
	});

	describe('Formatting Values', function() {

		beforeEach(function() {
			this.inputView = new StyleInputView();
		});

		it('should add the unit if one has been specified', function() {
			this.inputView.unit = 'px';
			expect( this.inputView.formatValue( 200 ) ).toBe("200px");
		});

		it('should not add a unit if the user supplied their own', function() {
			this.inputView.unit = 'px';
			expect( this.inputView.formatValue( '200%' ) ).toBe( "200%" );
			expect( this.inputView.formatValue( '200em' ) ).toBe( "200em" );
		});
	});

	describe('Validating Values', function() {

		beforeEach(function() {
			this.inputView = new StyleInputView();
		});

		it('should allow negative values if that behavior has been specified', function() {
			var value = this.inputView.validateValue( -200 );
			expect( value ).toBe( -200 );
		});

		it('should prevent decimals if that behavior has been specified', function() {
			var value = this.inputView.validateValue( 2.1 );
			expect( value ).toBe( 2 );
		});

		it('should prevent the value from being negative if that behavior has been specified', function() {
			this.inputView.canBeNegative = false;
			var value = this.inputView.validateValue( -200 );
			expect( value ).toBe( 0 );
		});

		it('should allow decimal values if that behavior has been specified', function() {
			this.inputView.canBeDecimal = true;
			var value = this.inputView.validateValue( 2.1 );
			expect( value ).toBe( 2.1 );
		});
	});
});