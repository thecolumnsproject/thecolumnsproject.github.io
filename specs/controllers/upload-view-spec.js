var ColumnsEvent 		= require('../../javascripts/models/ColumnsEvent.js');
var ColumnsAnalytics 	= require('../../javascripts/models/ColumnsAnalytics.js');
var Table 				= require('../../javascripts/models/Table.js');
var UploadView 			= require('../../javascripts/controllers/UploadView.js');

jasmine.getFixtures().fixturesPath = 'specs/fixtures';

describe('Upload View', function() {

	afterEach(function() {
		ColumnsEvent.offAll();
	});

	beforeEach(function() {
		loadFixtures('upload.html');
		this.upload = new UploadView();
		spyOn( ColumnsAnalytics, 'send' );
	});

	describe('Initialization', function() {

		it('should initialize with 0 parsed rows', function() {
			expect( this.upload.parsedRows ).toBe( 0 );
		});
	});

	describe('Rendering', function() {

		it('should attatch to the correct part of the DOM', function() {
			expect( this.upload.render() ).toEqual('#upload');
		});
	});

	describe('Listening to User Events', function() {

		beforeEach(function() {
			this.upload.render();
		});

		describe('Upload Button', function() {

			xit('should trigger a click on the file input field', function() {
				$('.columns-upload-button').trigger('click');
				// expect(  )
			});

			xit('should send an analytics event', function() {

			});
		});

		it('should respond to clicks on the upload button', function() {
			spyOn( this.upload, '_onUploadClick' );
			$('.columns-upload-button').trigger('click');

			// expect( this.upload._onUploadClick ).toHaveBeenCalled();
			// expect( this.upload._onFileChoice ).toHaveBeenCalled();
		});

		describe('Choosing a File', function() {

			beforeEach(function() {
				spyOn( this.upload, '_setLoading' );
				spyOn( this.upload, '_parseFile' );
				spyOn( ColumnsEvent, 'send' );	
			});

			it('should set the loading message with the file name', function() {				
				var file = { name: 'test.csv' };
				$('input[type="file"]').triggerHandler({
					type: 'change',
					target: {
						files: [ file ]
					}
				});

				expect( this.upload._setLoading ).toHaveBeenCalledWith( true, '', 'Uploading test.csv...' );
			});

			it('should set the loading message without the file name if one is not available', function() {
				var file = {};
				$('input[type="file"]').triggerHandler({
					type: 'change',
					target: {
						files: [ file ]
					}
				});

				expect( this.upload._setLoading ).toHaveBeenCalledWith( true, '', 'Uploading file...' );
			});

			it('should parse the file', function() {
				var file = { name: 'test.csv' };
				$('input[type="file"]').triggerHandler({
					type: 'change',
					target: {
						files: [ file ]
					}
				});

				expect( this.upload._parseFile ).toHaveBeenCalledWith( file );
			});

			it('should emit an event', function() {
				var file = { name: 'test.csv' };
				$('input[type="file"]').triggerHandler({
					type: 'change',
					target: {
						files: [ file ]
					}
				});

				expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.UploadView.DidChooseFile');
				expect( ColumnsEvent.send.calls.argsFor(0)[1].uploadView ).toEqual( this.upload );
				expect( ColumnsEvent.send.calls.argsFor(0)[1].file ).toEqual( file );
			});

			xit('should respond to the user choosing a file', function() {
				spyOn( this.upload, '_onFileChoice' );
				$('input[type="file"]').trigger('change');

				expect( this.upload._onFileChoice ).toHaveBeenCalled();

			});
		});

		xit('should respond to window resize events', function() {
			spyOn( this.upload, '_onWindowResize' );
			$(window).trigger('resize');

			expect( this.upload._onWindowResize ).toHaveBeenCalled();
		});
	});

	describe('Responding to Table Events', function() {

		describe('Upload Success', function() {

			beforeEach(function() {
				// this.columnsEvent = document.createEvent('CustomEvent');
				// this.columnsEvent.initCustomEvent('Columns.Table.DidUploadWithSuccess', false, false, {
				// 	table: 	new Table()
				// });
				this.upload.render();
			});

			it('should turn off the loading message', function() {
				spyOn( this.upload, '_setLoading' );

				ColumnsEvent.send('Columns.Table.DidUploadWithSuccess', {
					table: 	new Table()
				});

				expect( this.upload._setLoading ).toHaveBeenCalledWith( false );
			});

			it('should hide', function() {
				spyOn( this.upload, 'hide' );
				
				ColumnsEvent.send('Columns.Table.DidUploadWithSuccess', {
					table: 	new Table()
				});

				expect( this.upload.hide ).toHaveBeenCalled();
			});
		});

		describe('Upload Failure', function() {

			beforeEach(function() {
				// this.columnsEvent = document.createEvent('CustomEvent');
				// this.columnsEvent.initCustomEvent('Columns.Table.DidUploadWithFailure', false, false, {
				// 	table: 	new Table()
				// });
				this.upload.render();
			});

			it('should update the loading message', function() {
				spyOn( this.upload, '_setLoading' );
				
				ColumnsEvent.send('Columns.Table.DidUploadWithFailure', {
					table: 	new Table()
				});

				expect( this.upload._setLoading ).toHaveBeenCalledWith( false, "Try a different .csv", "Shoot, something went wrong." );
			});

		});

		describe('Open Success', function() {

			beforeEach(function() {
				this.upload.render();
			});

			it('should turn off the loading message', function() {
				spyOn( this.upload, '_setLoading' );

				ColumnsEvent.send('Columns.Table.DidOpenWithSuccess', {
					table: 	new Table()
				});

				expect( this.upload._setLoading ).toHaveBeenCalledWith( false );
			});

			it('should hide', function() {
				spyOn( this.upload, 'hide' );
				
				ColumnsEvent.send('Columns.Table.DidOpenWithSuccess', {
					table: 	new Table()
				});

				expect( this.upload.hide ).toHaveBeenCalled();
			});
		});

		describe('Open Failure', function() {

			beforeEach(function() {
				this.upload.render();
			});

			it('should update the loading message', function() {
				spyOn( this.upload, '_setLoading' );
				
				ColumnsEvent.send('Columns.Table.DidOpenWithFailure', {
					table: 	new Table()
				});

				expect( this.upload._setLoading ).toHaveBeenCalledWith( false, "Try a different id", "Shoot, we couldn't find that table." );
			});

		});
	});

	describe('Parsing a CSV', function() {
		var step, complete;

		beforeEach(function() {
			Papa.parse = function( item, options ) {
				step = options.step;
				complete = options.complete;
			};
			spyOn( Papa, 'parse' ).and.callThrough();
			// spyOn( Papa.parse, 'step' ).and.callThrough();
			// spyOn( Papa.parse, 'complete' ).and.callThrough();
		});

		describe('Parsing a File', function() {
			var file;

			beforeEach(function() {
				file = { name: 'test.csv' };
			});

			it('should pass the file', function() {
				this.upload._parseFile( file );
				expect( Papa.parse.calls.argsFor(0)[0] ).toEqual( file );
			});

			it('should parse each row', function() {
				spyOn( this.upload, '_parseRow' );
				this.upload._parseFile( file );
				step( 'row', 'handle' );

				expect( this.upload._parseRow ).toHaveBeenCalledWith( 'row', 'handle', file.name );
			});

			it('should pass the correct complete callback', function() {
				spyOn( this.upload, '_onParseComplete' );
				this.upload._parseFile( file );
				complete( 'results' );

				expect( this.upload._onParseComplete ).toHaveBeenCalledWith( 'results', file );
			});
		});

		describe('Parsing a String from a Blob', function() {
			var string, blob;

			beforeEach(function() {
				string = 'hi,there';
				blob = { name: 'name' };
			});

			it('should pass the string', function() {
				this.upload._parseStringFromBlob( string, blob );
				expect( Papa.parse.calls.argsFor(0)[0] ).toEqual( string );
			});

			it('should parse each row', function() {
				spyOn( this.upload, '_parseRow' );
				this.upload._parseStringFromBlob( string, blob );
				step( 'row', 'handle' );

				expect( this.upload._parseRow ).toHaveBeenCalledWith( 'row', 'handle', blob.name );
			});

			it('should pass the correct complete callback', function() {
				spyOn( this.upload, '_onParseComplete' );
				this.upload._parseStringFromBlob( string, blob );
				complete( 'results' );

				expect( this.upload._onParseComplete ).toHaveBeenCalledWith( 'results', blob );
			});

		});

		describe('Parsing a Row', function() {

			beforeEach(function() {
				this.handle = { abort: function() {} };
				spyOn( this.upload, '_createColumnItems' );
				spyOn( this.upload, '_createRow' );
				spyOn( this.handle, 'abort' );
			});

			it('should identify the header row and create items from the column names', function() {
				var row = { data: [ 'data' ] };
				this.upload._parseRow( row, this.handle, 'test.csv' );
				expect( this.upload._createColumnItems ).toHaveBeenCalledWith( row.data[ 0 ], 'test.csv' );
			});

			it('should identify subsequent rows and compile them as data points', function() {
				this.upload.parsedRows = 1;
				var row = { data: [ 'data' ] };
				this.upload._parseRow( row, this.handle, 'test.csv' );
				expect( this.upload._createRow ).toHaveBeenCalledWith( row.data[ 0 ], 'test.csv' );
			});

			it('should stop after the first 20 rows', function() {
				this.upload.parsedRows = 21;
				var row = { data: {} };
				this.upload._parseRow( row, this.handle, 'test.csv' );
				expect( this.upload._createRow ).not.toHaveBeenCalled();
				expect( this.handle.abort ).toHaveBeenCalled();
			});

		});

		describe('Create Column Items', function() {

			beforeEach(function() {
				spyOn( ColumnsEvent, 'send' );
			});

			it('should emit an event announcing the parsing of column items', function() {
				var columnNames = [
					'First Name',
					'Last Name',
					'Hometown'
				];
				this.upload._createColumnItems( columnNames, 'test.csv' );
				expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.UploadView.DidParseColumnNamesForFile');
				expect( ColumnsEvent.send.calls.argsFor(0)[1].uploadView ).toEqual( this.upload );
				expect( ColumnsEvent.send.calls.argsFor(0)[1].fileName ).toEqual( 'test.csv' );
				expect( ColumnsEvent.send.calls.argsFor(0)[1].columns ).toEqual( columnNames );
			});
		});

		describe('Create Data Row', function() {

			beforeEach(function() {
				spyOn( ColumnsEvent, 'send' );
			});

			it('should emit an event announcing the parsing of a data row', function() {
				var row = {
					data: [
						'Jeremy',
						'Lubin',
						'Princeton'
					]
				};
				this.upload._createRow( row, 'test.csv' );
				expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.UploadView.DidParseDataRowForFile');
				expect( ColumnsEvent.send.calls.argsFor(0)[1].uploadView ).toEqual( this.upload );
				expect( ColumnsEvent.send.calls.argsFor(0)[1].fileName ).toEqual( 'test.csv' );
				expect( ColumnsEvent.send.calls.argsFor(0)[1].row ).toEqual( row );
			});
		});

		describe('Completion of Parsing', function() {

			beforeEach(function() {
				spyOn( ColumnsEvent, 'send' );
			});

			it('should emit an event with the data', function() {
				var results = {};
				var file = { name: 'test.csv' };
				this.upload._onParseComplete( results, file );
				expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.UploadView.DidCompleteParseForFile');
				expect( ColumnsEvent.send.calls.argsFor(0)[1].uploadView ).toEqual( this.upload );
				expect( ColumnsEvent.send.calls.argsFor(0)[1].file ).toEqual( file );
			});
		});
	});

	xdescribe('Hiding the Upload View', function() {

		beforeEach(function( done ) {
			this.upload.render();
			this.upload.hide();
			setTimeout(function() {
				done();
			}, 300);
		});

		// TODO figure out why this test doesn't work
		it('should have no opacity', function( done ) {
			expect( this.upload.$upload ).toHaveCss({ opacity: '0' });
			done();
		});

		it('should not be active', function( done ) {
			expect( this.upload.$upload ).not.toHaveClass('active');
			done();
		});
	});

	describe('Showing the Upload View', function() {

		beforeEach(function( done ) {
			this.upload.render();
			this.upload.show();
			setTimeout(function() {
				done();
			}, 300);
		});

		it('should have full opacity', function( done ) {
			// console.log( $('body').html() );
			expect( this.upload.$upload ).toHaveCss({ opacity: '1' });
			done();
		});

		it('should not be active', function( done ) {
			expect( this.upload.$upload ).toHaveClass('active');
			done();
		});
	});

	describe('Updating the Loading Message', function() {

		beforeEach(function() {
			this.upload.render();
			this.$button = $('.columns-upload-button');
			this.$message = $('.columns-upload-message');
		});

		it('should update the button text with a user provided string', function() {
			this.upload._setLoading( true, "hi" );
			expect( this.$button ).toHaveText( "hi" );
		});

		it('should update the message text with a user provided string', function() {
			this.upload._setLoading( true, "hi", "there" );
			expect( this.$message ).toHaveText( "there" );
		});

		it('should use a default message text if none was provided', function() {
			this.upload._setLoading( true );
			expect( this.$message ).toHaveText( "" );
			expect( this.$button ).toHaveText( "Upload a .csv" );
		});

		it('should use a default message text if the one provided is not a string', function() {
			this.upload._setLoading( true, {}, {} );
			expect( this.$message ).toHaveText( "" );
			expect( this.$button ).toHaveText( "Upload a .csv" );
		});

		it('should optionally turn on the loading animation', function() {
			this.upload._setLoading( true );
			expect( this.upload.$upload ).toHaveClass( 'loading' );
			expect( this.$button ).toHaveProp( 'disabled', true );
		});

		it('should optionally turn off the loading animation', function() {
			this.upload._setLoading( false );
			expect( this.upload.$upload ).not.toHaveClass( 'loading' );
			expect( this.$button ).toHaveProp( 'disabled', false );
		});
	});

	describe('Sending Analytics Events', function() {

		beforeEach(function() {
			this.upload.render();
		});

		it('should send an event when the upload button is clicked', function() {
			$('.columns-upload-button').trigger('click');

			expect( ColumnsAnalytics.send ).toHaveBeenCalledWith({
				category: 'button',
				action: 'click',
				label: 'upload'
			});
		});

		it('should send an event when a file is chosen', function() {
			var file = {};
			$('input[type="file"]').triggerHandler({
				type: 'change',
				target: {
					files: [ file ]
				}
			});

			expect( ColumnsAnalytics.send ).toHaveBeenCalledWith({
				category: 'file',
				action: 'chosen',
			});
		});
	});

	describe('Sample Data', function() {

		beforeEach(function( done ) {
			this.upload.render();
			done();
		});

		it('should respond to clicks on the sample data button', function( done ) {
			spyOn( this.upload, '_onSampleDataClick' );
			$('.columns-upload-sample-data-button').trigger('click');
			setTimeout(function() {
				expect( this.upload._onSampleDataClick ).toHaveBeenCalled();
				done();
			}.bind( this ), 0);
		});

		it('should download the sample data', function() {
			spyOn( $, 'get' );
			this.upload._onSampleDataClick();
			expect( $.get.calls.mostRecent().args[0].indexOf("/data/sample-data.csv") ).toBe( 0 );
		});

		it('should set the loading message', function() {
			spyOn( this.upload, '_setLoading' );
			this.upload._onSampleDataClick();
			expect( this.upload._setLoading ).toHaveBeenCalledWith( true, '', 'Preparing sample data...' );
		});

		it('should emit an event', function() {
			spyOn( ColumnsEvent, 'send' );
			this.upload._onSampleDataClick();
			expect( ColumnsEvent.send ).toHaveBeenCalledWith('Columns.UploadView.DidChooseSampleData', {
				uploadView: this.upload,
				name: 'Sample Data'
			});
		});

		it('should send an analytics event', function() {
			this.upload._onSampleDataClick();

			expect( ColumnsAnalytics.send ).toHaveBeenCalledWith({
				category: 'button',
				action: 'click',
				label: 'sample data'
			});
		});

		xit('should convert downloaded data to blob and csv string', function() {
			this.upload._onSampleDataDownloaded( 'hi,there' );
			expect(  )
		});
	});
});