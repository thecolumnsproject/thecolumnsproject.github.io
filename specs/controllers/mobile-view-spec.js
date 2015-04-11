var MobileView 		= require('../../javascripts/controllers/MobileView.js');
var RegisterView 	= require('../../javascripts/controllers/RegisterView.js');
var ThanksView 		= require('../../javascripts/controllers/ThanksView.js');

jasmine.getFixtures().fixturesPath = 'specs/fixtures';

describe('Mobile View', function() {
	var mobile;

	beforeEach(function() {
		loadFixtures('app.html');
		mobile = new MobileView();
	});

	describe('Initalizing', function() {1

		it('should initialize the correct subviews', function() {
			expect( mobile.register instanceof RegisterView ).toBeTruthy();
			expect( mobile.thanks instanceof ThanksView ).toBeTruthy();
		});
	});

	describe('Rendering', function() {
		var $mobile;

		beforeEach(function() {
			$mobile = mobile.render();
		});

		it('should return the app element', function() {
			expect( $mobile ).toEqual('#app');
		});

		it('should add a mobile class to the app element', function() {
			expect( $mobile ).toHaveClass('mobile');
		});

		it('should render the register view', function() {
			expect( $mobile.find('#register').length ).toBe( 1 );
		});

	});
});

