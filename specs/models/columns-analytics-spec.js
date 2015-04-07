var ColumnsAnalytics = require('../../javascripts/models/ColumnsAnalytics.js');

describe('Columns Analyitics Framework', function() {

	describe('Sending an analytics event', function() {

		window.ga;
		window.mixpanel;

		beforeEach(function() {
			ga = jasmine.createSpy( 'ga' );
			mixpanel = jasmine.createSpyObj( 'mixpanel', ['track'] );
		});

		it('send a google analytics event', function() {
			ColumnsAnalytics.send({
				category: 'template',
				action: 'add',
				label: 'property',
				table_id: 1,
				description: 'Added item to template'
			});

			expect( ga ).toHaveBeenCalledWith( 'send', 'event', 'template', 'add', 'property', 1 );
		});

		it('send a google analytics event if not passed a category', function() {
			ColumnsAnalytics.send({
				action: 'add',
				label: 'property',
				table_id: 1,
				description: 'Added item to template'
			});

			expect( ga ).toHaveBeenCalledWith( 'send', 'event', '', 'add', 'property',  1 );
		});

		it('send a google analytics event if not passed an action', function() {
			ColumnsAnalytics.send({
				label: 'property',
				table_id: 1,
				description: 'Added item to template'
			});

			expect( ga ).toHaveBeenCalledWith( 'send', 'event', '', '', 'property',  1 );
		});

		it('send a google analytics event if not passed a label', function() {
			ColumnsAnalytics.send({
				table_id: 1,
				description: 'Added item to template'
			});

			expect( ga ).toHaveBeenCalledWith( 'send', 'event', '', '', '',  1 );
		});

		it('send a google analytics event if not passed a table_id', function() {
			ColumnsAnalytics.send({
				category: 'template',
				action: 'add',
				label: 'property',
				description: 'Added item to template'
			});

			expect( ga ).toHaveBeenCalledWith( 'send', 'event', 'template', 'add', 'property', undefined );
		});

		it('should send a mixpanel event with the passed in description', function() {
			ColumnsAnalytics.send({
				description: 'Added item to template',
				table_id: 1
			});

			expect( mixpanel.track ).toHaveBeenCalledWith('Added item to template', { 'Table ID': 1 });
		});

		it('should send a mixpanel event if not passed a description', function() {
			ColumnsAnalytics.send({
				category: 'template',
				action: 'add',
				label: 'property',
			});

			expect( mixpanel.track ).toHaveBeenCalledWith('template add property', {});
		});

		it('should send a blank mixpanel event if no data is supplied', function() {
			ColumnsAnalytics.send();

			expect( mixpanel.track ).toHaveBeenCalledWith( '', {} );
		});
	});
});