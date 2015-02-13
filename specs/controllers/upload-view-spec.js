jasmine.getFixtures().fixturesPath = 'specs/fixtures';

describe('Upload View', function() {

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
				spyOn( document, 'dispatchEvent' );	
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

				expect( document.dispatchEvent.calls.argsFor(0)[0].type ).toBe('Columns.UploadView.DidChooseFile');
				expect( document.dispatchEvent.calls.argsFor(0)[0].detail.uploadView ).toEqual( this.upload );
				expect( document.dispatchEvent.calls.argsFor(0)[0].detail.file ).toEqual( file );
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
				var row = { data: {} };
				this.upload._parseRow( row, this.handle, 'test.csv' );
				expect( this.upload._createColumnItems ).toHaveBeenCalledWith( row.data, 'test.csv' );
			});

			it('should identify subsequent rows and compile them as data points', function() {
				this.upload.parsedRows = 1;
				var row = { data: {} };
				this.upload._parseRow( row, this.handle, 'test.csv' );
				expect( this.upload._createRow ).toHaveBeenCalledWith( row.data, 'test.csv' );
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
				spyOn( document, 'dispatchEvent' );
			});

			it('should emit an event announcing the parsing of column items', function() {
				var columnNames = [
					'First Name',
					'Last Name',
					'Hometown'
				];
				this.upload._createColumnItems( columnNames, 'test.csv' );
				expect( document.dispatchEvent.calls.argsFor(0)[0].type ).toBe('Columns.UploadView.DidParseColumnNamesForFile');
				expect( document.dispatchEvent.calls.argsFor(0)[0].detail.uploadView ).toEqual( this.upload );
				expect( document.dispatchEvent.calls.argsFor(0)[0].detail.fileName ).toEqual( 'test.csv' );
				expect( document.dispatchEvent.calls.argsFor(0)[0].detail.columns ).toEqual( columnNames );
			});
		});

		describe('Create Data Row', function() {

			beforeEach(function() {
				spyOn( document, 'dispatchEvent' );
			});

			it('should emit an event announcing the parsing of a data row', function() {
				var data = [
					'Jeremy',
					'Lubin',
					'Princeton'
				];
				this.upload._createRow( data, 'test.csv' );
				expect( document.dispatchEvent.calls.argsFor(0)[0].type ).toBe('Columns.UploadView.DidParseDataRowForFile');
				expect( document.dispatchEvent.calls.argsFor(0)[0].detail.uploadView ).toEqual( this.upload );
				expect( document.dispatchEvent.calls.argsFor(0)[0].detail.fileName ).toEqual( 'test.csv' );
				expect( document.dispatchEvent.calls.argsFor(0)[0].detail.row ).toEqual( data );
			});
		});

		describe('Completion of Parsing', function() {

			beforeEach(function() {
				spyOn( document, 'dispatchEvent' );
			});

			it('should emit an event with the data', function() {
				var results = {};
				this.upload._onParseComplete( results, 'test.csv' );
				expect( document.dispatchEvent.calls.argsFor(0)[0].type ).toBe('Columns.UploadView.DidCompleteParseForFile');
				expect( document.dispatchEvent.calls.argsFor(0)[0].detail.uploadView ).toEqual( this.upload );
				expect( document.dispatchEvent.calls.argsFor(0)[0].detail.fileName ).toEqual( 'test.csv' );
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