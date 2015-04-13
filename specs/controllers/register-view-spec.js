var RegisterView 	= require('../../javascripts/controllers/RegisterView.js');
var ColumnsEvent 	= require('../../javascripts/models/ColumnsEvent.js');
var Config 			= require('../../javascripts/config.js');

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

	describe('Registering', function() {

		describe('Performing a Registration', function() {

			beforeEach(function() {
	      		spyOn( $, 'post' );
	      		register._performRegistration('lubin.jeremy@gmail.com');
	    	});

			it('should post to the correct api', function() {
				expect( $.post.calls.mostRecent().args[0] ).toEqual( Config.api.host + '/columns/register' );
			});

			it('should post the correct data', function() {
				expect( $.post.calls.mostRecent().args[1] ).toEqual({
	      			user: "lubin.jeremy@gmail.com",
	      		});
			});
		});

		describe('Success', function() {

			beforeEach(function() {
				spyOn( register, 'hide' );
				spyOn( ColumnsEvent, 'send' );
				register._onRegistrationSuccess();
			});

			it('should hide itself', function() {
				expect( register.hide ).toHaveBeenCalled();
			});

			it('should emit an event', function() {
				expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.RegisterView.DidRegisterWithSuccess');
				expect( ColumnsEvent.send.calls.argsFor(0)[1].registerView ).toEqual( register );
			});
		});
	});

	describe('Showing and Hiding', function() {
		var $register;

		describe('Showing', function() {

			beforeEach(function( done ) {
				$register = register.render();

				$register.css({ opacity: 0 });
				$register.removeClass('active');

				register.show();

				setTimeout(function() {
					done();
				}, 300);
			});

			it('should have full opacity', function( done ) {
				expect( $register ).toHaveCss({ opacity: '1' });
				done();
			});

			it('should have the active class', function( done ) {
				expect( $register ).toHaveClass('active');
				done();
			});
		});

		describe('Hiding', function() {

			beforeEach(function( done ) {
				$register = register.render();

				$register.css({ opacity: 1 });
				$register.addClass('active');

				register.hide();

				setTimeout(function() {
					done();
				}, 300);
			});

			it('should have zero opacity', function( done ) {
				expect( $register ).toHaveCss({ opacity: '0' });
				done();
			});

			it('should not have the active class', function( done ) {
				expect( $register ).not.toHaveClass('active');
				done();
			});
		});
	});

	describe('Listening to User Events', function() {

		describe('Register Button', function() {
			var $register;

			beforeEach(function() {
				$register = register.render();
				spyOn( register, 'setEmailError' );
				spyOn( register, '_onRegistrationSuccess' );
			});

			it('should set an error if the email is invalid', function() {
				spyOn( register, 'isEmailValid').and.returnValue( false );
				$register.find('.columns-register-button').trigger('click');

				expect( register.setEmailError ).toHaveBeenCalledWith( true );
				expect( register._onRegistrationSuccess ).not.toHaveBeenCalled();
			});

			it('should call the registration success function if the email is valid', function() {
				spyOn( register, 'isEmailValid').and.returnValue( true );
				$register.find('.columns-register-button').trigger('click');

				expect( register.setEmailError ).toHaveBeenCalledWith( false );
				expect( register._onRegistrationSuccess ).toHaveBeenCalled();
			});
		});

	});

	describe('Setting Email Field Errors', function() {
		var $register, $field;

		beforeEach(function( done ) {
			$register = register.render();
			$field = $register.find('.columns-register-email-input');
			done();
		});

		it('should add an error class if passed true', function( done ) {
			$field.removeClass('error');
			register.setEmailError( true );

			setTimeout(function() {
				expect( $register.find('.columns-register-email-input') ).toHaveClass('error');
				done();
			}, 10);
		});


		it('should add an error class if passed false', function( done ) {
			$field.addClass('error');
			register.setEmailError( false );
			setTimeout(function() {
				expect( $register.find('.columns-register-email-input') ).not.toHaveClass('error');
				done();
			}, 10);
		});
	});
});