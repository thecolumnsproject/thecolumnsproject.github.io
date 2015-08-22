
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
	var embed;

	beforeEach(function() {
		loadFixtures('embed-script.html');

		var scriptTags = document.getElementsByTagName('script'),
			script = scriptTags[ scriptTags.length - 1];

		embed = new ColumnsTable( script );
	});

	afterEach(function() {
		ColumnsEvent.offAll();
	});

	describe('Initialization', function() {

		it('should be in preview mode when in the app', function() {
			var newEmbed = new ColumnsTable('<script type="text/javascript" src="http://colum.nz/public/embed-table.js" data-preview="true" async></script>');
			expect( newEmbed.preview ).toBe( true );
		});

		it('should not be in preview mode when embedded', function() {
			var newEmbed = new ColumnsTable('<script type="text/javascript" src="http://colum.nz/public/embed-table.js" async></script>');
			expect( newEmbed.preview ).toBeUndefined();
		});
	});

	describe('Rendering a Row', function() {
		var layout = {
			type: 'group',
			style: [{
				property: 'padding',
				value: '12px'
			}],
			values: []
		};

		it('should be z-indexed relative to position in the table', function() {
			expect( embed.renderRow( {}, 5, layout ) ).toHaveCss( { "z-index": "-5"} );
			expect( embed.renderRow( {}, 10, layout ) ).toHaveCss( { "z-index": "-10"} );
			expect( embed.renderRow( {}, 0, layout ) ).toHaveCss( { "z-index": "0"} );
		});
	});

	describe('Listening to Editor Events', function() {

		beforeEach(function() {			
			embed.render();
			embed._setupEventListeners();
		});

		it('should re-render when table details are udpated', function() {
			// spyOn( this.embed, 'generateLayout' );
			// spyOn( this.embed, 'renderData' );
			ColumnsEvent.send( 'Columns.Table.DidChange', {
				table: new Table({ title: 'My Table' })
			});

			expect( embed.$$table.find('.columns-table-title') ).toHaveText('My Table');
		});
	});
});