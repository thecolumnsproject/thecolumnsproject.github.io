var ColumnsEvent 		= require('../../javascripts/models/ColumnsEvent.js');

describe('Columns Events', function() {

	describe('Sending Events', function() {

		beforeEach(function() {
			
		});

		it('should accept a mandatory type and detail object', function() {
			spyOn( $.fn, 'trigger' );
			ColumnsEvent.send( 'my.type', {} );
			expect( $.fn.trigger ).toHaveBeenCalledWith( 'my.type', {} );
		});

		it('should call the correct callbacks', function() {
			var callback = jasmine.createSpy('callback');
			$(document).on( 'my.type', callback );
			ColumnsEvent.send( 'my.type', {} );
			expect( callback ).toHaveBeenCalled();
		});
	});

	describe('Registering Event Listeners', function() {

		beforeEach(function() {
			spyOn( $.fn, 'on' );
		});

		it('should accept a mandatory type and callback', function() {
			var callback = {};
			ColumnsEvent.on( 'my.type', callback );
			expect( $.fn.on ).toHaveBeenCalledWith( 'my.type', callback );
		});

	});

	describe('Removing Event Listeners', function() {

		it('should accept a type and callback', function() {
			spyOn( $.fn, 'off' );
			ColumnsEvent.off( 'my.type', {} );
			expect( $.fn.off ).toHaveBeenCalledWith( 'my.type', {} );
		});

		it('should no longer call the callback', function() {
			var callback = jasmine.createSpy('callback');
			$(document).on( 'my.type', callback );
			ColumnsEvent.off( 'my.type', callback );
			$(document).trigger( 'my.type' );
			expect( callback ).not.toHaveBeenCalled();
		});
	});

	describe('Removing All Event Listeners', function() {

		it('should no longer call any callbacks', function() {
			var callback1 = jasmine.createSpy('callback1');
			var callback2 = jasmine.createSpy('callback2');
			$(document).on( 'my.type', callback1 );
			$(document).on( 'other.type', callback2 );

			ColumnsEvent.offAll();

			$(document).trigger('my.type');
			$(document).trigger('other.type');

			expect( callback1 ).not.toHaveBeenCalled();
			expect( callback2 ).not.toHaveBeenCalled();

		});
	});
});