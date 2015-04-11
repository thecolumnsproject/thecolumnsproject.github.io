var RegisterView = require('../../javascripts/controllers/RegisterView.js');

describe('Register View', function() {
	var register;

	beforeEach(function() {
		register = new RegisterView();
	});

	describe('Rendering', function() {
		var $register;

		beforeEach(function() {
			$register = register.render();
		});

		it('should be active', function() {
			expect( $register ).toHaveClass('active');
		});

		it('should render the header', function() {
			expect( $register.find('.columns-register-copy').length ).toBe( 1 );
		});

		it('should render the sample table', function() {

		});

		it('should render the register form', function() {

		});
	});
});