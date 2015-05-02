
// var API_HOST = '{{api_host}}';
// var ROOT_PATH = '{{root_path}}';
// var EMBED_PATH = ROOT_PATH + '/public/embed-table.js';
// var CSS_PATH = ROOT_PATH + '/css/embed-table.css';
// var IMG_PATH = ROOT_PATH + '/images/';

// var Velocity = require('../../bower_components/velocity/velocity.js');
// var Hammer = require('../../vendor/hammer.js');
// var PreventGhostClick = require('../../vendor/prevent-ghost-click.js');

// $$ = $;
// var Columnsbars = require('../../javascripts/embed-handlebars.js'),
var ColumnsEvent = require('../../javascripts/models/ColumnsEvent.js');
var Table 		 = require('../../javascripts/models/Table.js');
var ColumnsTable = require('../../javascripts/models/ColumnsTable.js');

jasmine.getFixtures().fixturesPath = 'specs/fixtures';

describe('Embeddable Table', function() {

	beforeEach(function() {
		loadFixtures('embed-script.html');

		var scriptTags = document.getElementsByTagName('script'),
			script = scriptTags[ scriptTags.length - 1];

		this.embed = new ColumnsTable( script );
	});

	describe('Initialization', function() {

		it('should be in preview mode when in the app', function() {
			var embed = new ColumnsTable('<script type="text/javascript" src="http://colum.nz/public/embed-table.js" data-preview="true" async></script>');
			expect( embed.preview ).toBe( true );
		});

		it('should not be in preview mode when embedded', function() {
			var embed = new ColumnsTable('<script type="text/javascript" src="http://colum.nz/public/embed-table.js" async></script>');
			expect( embed.preview ).toBeUndefined();
		});
	});

	describe('Listening to Editor Events', function() {

		beforeEach(function() {			
			this.embed.render();
		});

		it('should re-render when table details are udpated', function() {
			// spyOn( this.embed, 'generateLayout' );
			// spyOn( this.embed, 'renderData' );

			ColumnsEvent.send( 'Columns.Table.DidChange', {
				table: new Table({ title: 'My Table' })
			});

			expect( this.embed.$$table.find('.columns-table-title') ).toHaveText('My Table');
		});
	});
});