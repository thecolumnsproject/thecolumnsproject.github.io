jasmine.getFixtures().fixturesPath = 'specs/fixtures';

describe('Upload View', function() {

	afterEach(function() {
		ColumnsEvent.offAll();
	});

	beforeEach(function() {
		loadFixtures('upload.html');
		this.upload = new UploadView();
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

				expect( this.upload._setLoading ).toHaveBeenCalledWith( true, 'Uploading test.csv...' );
			});

			it('should set the loading message without the file name if one is not available', function() {
				var file = {};
				$('input[type="file"]').triggerHandler({
					type: 'change',
					target: {
						files: [ file ]
					}
				});

				expect( this.upload._setLoading ).toHaveBeenCalledWith( true, 'Uploading file...' );
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

				expect( this.upload._setLoading ).toHaveBeenCalledWith( false, "Shoot, something went wrong. Mind trying a different .csv?" );
			});

		});
	});

	describe('Parsing a CSV', function() {

		beforeEach(function() {
			spyOn( Papa, 'parse' );
		});

		describe('Using Papa Parse', function() {

			it('should pass the file', function() {
				var file = { name: 'test.csv' };
				this.upload._parseFile( file );
				expect( Papa.parse.calls.argsFor(0)[0] ).toEqual( file );
			});

			xit('should pass the correct step callback', function() {
				var file = { name: 'test.csv' };
				var step = function( row, handle ) { this._parseRow( row, handle, fileName ) }.bind( this.upload );
				this.upload._parseFile( file );
				expect( Papa.parse.calls.argsFor(0)[1].step ).toEqual( step );
			});

			xit('should pass the correct complete callback', function() {

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
		});

		it('should update the message text with a user provided string', function() {
			this.upload._setLoading( true, "hi" );
			expect( this.$button ).toHaveText( "hi" );
		});

		it('should use a default message text if none was provided', function() {
			this.upload._setLoading( true );
			expect( this.$button ).toHaveText( "Upload a .csv" );
		});

		it('should use a default message text if the one provided is not a string', function() {
			this.upload._setLoading( true, {} );
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
});