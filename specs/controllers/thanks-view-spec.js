var ThanksView = require('../../javascripts/controllers/ThanksView.js');
var ColumnsEvent = require('../../javascripts/models/ColumnsEvent.js');

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
		var $thanks;

		describe('Showing', function() {

			beforeEach(function( done ) {
				$thanks = thanks.render();

				$thanks.css({ opacity: 0 });
				$thanks.removeClass('active');

				thanks.show();

				setTimeout(function() {
					done();
				}, 300);
			});

			it('should have full opacity', function( done ) {
				expect( $thanks ).toHaveCss({ opacity: '1' });
				done();
			});

			it('should have the active class', function( done ) {
				expect( $thanks ).toHaveClass('active');
				done();
			});
		});

		describe('Hiding', function() {

			beforeEach(function( done ) {
				$thanks = thanks.render();

				$thanks.css({ opacity: 1 });
				$thanks.addClass('active');

				thanks.hide();

				setTimeout(function() {
					done();
				}, 300);
			});

			it('should have zero opacity', function( done ) {
				expect( $thanks ).toHaveCss({ opacity: '0' });
				done();
			});

			it('should not have the active class', function( done ) {
				expect( $thanks ).not.toHaveClass('active');
				done();
			});
		});
	});

	describe('Listening to Events', function() {

		beforeEach(function() {
			thanks._setupEventListeners();
		});

		it('should show on successful registration', function() {
			spyOn( thanks, 'show' );

			ColumnsEvent.send( 'Columns.RegisterView.DidRegisterWithSuccess', {
				registerView: {}
			});

			expect( thanks.show ).toHaveBeenCalled();
		});
	});
});