var Desktop 			= require('../../javascripts/controllers/DesktopView.js');
var Table 				= require('../../javascripts/models/Table.js');
var ItemView 			= require('../../javascripts/controllers/ItemsView.js');
var TemplateView 		= require('../../javascripts/controllers/TemplateView.js');
var StyleView 			= require('../../javascripts/controllers/StyleView.js');
var EmbedDetailsView 	= require('../../javascripts/controllers/EmbedDetailsView.js');
var UploadView 			= require('../../javascripts/controllers/UploadView.js');
var ColumnsEvent 		= require('../../javascripts/models/ColumnsEvent.js');
var ColumnsAnalytics 	= require('../../javascripts/models/ColumnsAnalytics.js');
var Config 				= require('../../javascripts/config.js');

jasmine.getFixtures().fixturesPath = 'specs/fixtures';

describe('Desktop View Spec', function() {
	var desktop = new Desktop();

	describe('Initialization', function() {

		it('should set up the correct objects', function() {
			expect( desktop.table instanceof Table ).toBeTruthy();
			expect( desktop.items instanceof ItemsView ).toBeTruthy();
			expect( desktop.template instanceof TemplateView ).toBeTruthy();
			expect( desktop.style instanceof StyleView ).toBeTruthy();
			expect( desktop.embed instanceof EmbedDetailsView ).toBeTruthy();
			expect( desktop.upload instanceof UploadView ).toBeTruthy();
		});

	});

	describe('Rendering', function() {
		var $desktop;

		beforeEach(function() {
			loadFixtures('app.html');
			spyOn( ColumnsEvent, 'send' );
			$desktop = desktop.render();
		});

		it('should render the header', function() {
			expect( $('.columns-header') ).toBeInDOM();
		});

		it('should render the landing screen', function() {
			expect( $('#upload') ).toBeInDOM();
			expect( $('#upload') ).toHaveClass('active');
		});

		it('should render the app skeleton', function() {
			expect( $('#editor') ).toBeInDOM();
			expect( $('#columns') ).toBeInDOM();
			expect( $('#layout') ).toBeInDOM();
			expect( $('#styling') ).toBeInDOM();
		});

		it('should emit a rendering complete event', function() {
			expect( ColumnsEvent.send.calls.argsFor(0)[0]).toBe('Columns.DesktopView.DidRender');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].desktopView ).toEqual( desktop );
		});
	});

	describe('Sending Analytics Events', function() {

		beforeEach(function() {
			loadFixtures('app.html');
			desktop.render();
			spyOn( ColumnsAnalytics, 'send' );
		});

		it('should ignore events sent by a table that is not a sample table', function() {
			$(document).trigger('ColumnsTableDidExpand', {
				table: new Table({ id: Config.embed.desktop['feature-table'] + 1 })
			});

			expect( ColumnsAnalytics.send ).not.toHaveBeenCalled();

		});

		it('should send an event when the preview table is expanded', function() {
			$(document).trigger('ColumnsTableDidExpand', {
				table: new Table({ id: Config.embed.desktop['feature-table'] })
			});
			expect( ColumnsAnalytics.send ).toHaveBeenCalledWith({
				category: 'sample table',
				action: 'expand'
			});
		});

		it('should track clicks on the feedback button', function() {
			$('.columns-header-nav-feedback').trigger('click');

			expect( ColumnsAnalytics.send ).toHaveBeenCalledWith({
				category: 'button',
				action: 'click',
				label: 'feedback'
			});
		});
	});
});