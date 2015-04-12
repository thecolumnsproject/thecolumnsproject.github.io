var ThanksView = require('../../javascripts/controllers/ThanksView.js');

describe('Thanks View', function() {
	var thanks;

	beforeEach(function() {
		thanks = new ThanksView();
	});

	describe('Rendering', function() {
		var $thanks;

		beforeEach(function() {
			$thanks = thanks.render();
		});

		it('should have the correct id', function() {
			expect( $thanks ).toHaveId('thanks');
		});

		it('should not be active', function() {
			expect( $thanks ).not.toHaveClass('active');
		});
	});

	describe('Showing and Hiding', function() {

	});
});