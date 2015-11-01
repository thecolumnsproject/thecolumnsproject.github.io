var ColumnsEvent 		= require('../../javascripts/models/ColumnsEvent.js');
var ColumnsAnalytics 	= require('../../javascripts/models/ColumnsAnalytics.js');
var Item 				= require('../../javascripts/models/Item.js');
var Table 				= require('../../javascripts/models/Table.js');
var Layout 				= require('../../javascripts/models/Layout.js');
var EmbedDetailsView 	= require('../../javascripts/controllers/EmbedDetailsView.js');
var UploadView 			= require('../../javascripts/controllers/UploadView.js');
var config 				= require('../../javascripts/config.js');
var DEFAULTS			= require('../../javascripts/styling/defaults.js');

describe('Table', function () {

	afterEach(function() {
		ColumnsEvent.offAll();
	});

	describe('Initialization', function() {

		it('should initialize with the correct defaults', function() {
			var table = new Table();
			expect( table.data ).toEqual( [] );
			expect( table.title ).toBe( '' );
			expect( table.source ).toBe( '' );
			expect( table.source_url ).toBe( '' );
			expect( table.columns ).toEqual( [] );
			expect( table.layout ).toBeUndefined();
			expect( table.id ).toBeUndefined();
		});

		it('should initialize with a data array', function() {
			var data = [
				[ 'Jeremy', 'Lubin', 'Princeton' ],
				[ 'Jess', 'Schwartz', 'Mechanicsburg' ],
				[ 'Amir', 'Kanpurwala', 'West Windsor' ]
			];
			var table = new Table( { data: data } );
			expect( table.data ).toEqual( data );
		});

		it('should initialize with a title', function() {
			var meta = { title: "My Table" };
			var table = new Table( meta );
			expect( table.title ).toBe("My Table");
		});

		it('should initialize with a source', function() {
			var meta = { source: "My Source" };
			var table = new Table( meta );
			expect( table.source ).toBe("My Source");
		});

		it('should initialize with a source url', function() {
			var meta = { source_url: "https://mysource.com/my-table" };
			var table = new Table( meta );
			expect( table.source_url ).toBe("https://mysource.com/my-table");
		});

		it('should initialize with columns', function () {
			var meta = { columns: [ "First Name", "Last Name", "Hometown" ] };
			var table = new Table( meta );
			expect( table.columns[ 0 ].title ).toEqual("First Name");
			expect( table.columns[ 1 ].title ).toEqual("Last Name");
			expect( table.columns[ 2 ].title ).toEqual("Hometown");
		});

		it('should initialize with a layout', function() {
			var meta = { columns: [ "First Name", "Last Name", "Hometown" ] };
			var table = new Table( meta );
			expect( table.layout instanceof Layout ).toBeTruthy();
		});

		xit('should initialize with event listeners', function() {
			var table = new Table();
			spyOn( table, '_setupEventListeners' );
			expect( table._setupEventListeners ).toHaveBeenCalled();
		});
	});

	describe('Updating Table Properties', function() {

		beforeEach(function() {
			this.table = new Table();
		});

		it('should merge the passed in properties with the existing ones', function() {
			var data = [
				[ 'Jeremy', 'Lubin', 'Princeton' ],
				[ 'Jess', 'Schwartz', 'Mechanicsburg' ],
				[ 'Amir', 'Kanpurwala', 'West Windsor' ]
			];
			var props = {
				data: data,
      			title: "My Table",
      			source: "The Noun Project",
      			source_url: "https://thenounproject.com/my-table",
      			columns: [ "First Name", "Last Name", "Hometown" ],
      			id: 4
      		}

      		this.table._update( props );
      		expect( this.table.data ).toEqual( data );
      		expect( this.table.title ).toBe("My Table");
      		expect( this.table.source ).toBe("The Noun Project");
      		expect( this.table.source_url ).toBe("https://thenounproject.com/my-table");
      		expect( this.table.columns[ 0 ].title ).toEqual("First Name");
			expect( this.table.columns[ 1 ].title ).toEqual("Last Name");
			expect( this.table.columns[ 2 ].title ).toEqual("Hometown");
			expect( this.table.id ).toBe( 4 );
			expect( this.table.layout instanceof Layout ).toBeTruthy();
		});

		xit('should update the layout with new columns', function() {
			var props = {
      			columns: [ "First Name", "Last Name", "Hometown" ]
      		}
      		this.table._udpate( props  );
      		expect( this.table.layout instanceof Layout ).toBeTruthy();
		});

		it('should convert simple layout model objects to full Layout objects', function() {
			var props = {
				layout: {}
			}

			this.table._update( props );
			expect( this.table.layout instanceof Layout ).toBeTruthy();
		});

		it('should not properties that are not provided', function() {
			this.table._update();
			expect( this.table.data ).toEqual( [] );
			expect( this.table.title ).toBe( '' );
			expect( this.table.source ).toBe( '' );
			expect( this.table.source_url ).toBe( '' );
			expect( this.table.columns ).toEqual( [] );
			expect( this.table.layout ).toBeUndefined();
			expect( this.table.id ).toBeUndefined();
		});

		it('should emit an update event', function() {
			spyOn( this.table, '_emitChange' );
			this.table._update( {} );

			expect( this.table._emitChange ).toHaveBeenCalled();
		});

		it('should not emit an update event if there were no params', function() {
			spyOn( this.table, '_emitChange' );
			this.table._update();

			expect( this.table._emitChange ).not.toHaveBeenCalled();
		});

		it('should allow empty strings', function() {
			this.table.title = "hello";
			this.table.source = "the source";
			this.table.source_url = "http://thesource.com/hello";

			this.table._update({
				title: '',
				source: '',
				source_url: ''
			});

			expect( this.table.title ).toBe('');
			expect( this.table.source ).toBe('');
			expect( this.table.source_url ).toBe('');
		});
	});

	describe('Emitting Events', function() {

		beforeEach(function() {
			this.table = new Table();
		});

		it('should emit a change event', function() {
			spyOn( ColumnsEvent, 'send' );
			this.table._emitChange();

			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.Table.DidChange');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].table ).toEqual( this.table );
		});

		it('should emit an upload success event', function() {
			spyOn( ColumnsEvent, 'send' );
			this.table._emitUploadSuccess();

			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.Table.DidUploadWithSuccess');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].table ).toEqual( this.table );
		});

		it('should emit an upload failure event', function() {
			spyOn( ColumnsEvent, 'send' );
			this.table._emitUploadFail();

			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.Table.DidUploadWithFailure');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].table ).toEqual( this.table );
		});

		it('should emit an update success event', function() {
			spyOn( ColumnsEvent, 'send' );
			this.table._emitUpdateSuccess();

			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.Table.DidUpdateWithSuccess');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].table ).toEqual( this.table );
		});

		it('should emit an update failure event', function() {
			spyOn( ColumnsEvent, 'send' );
			this.table._emitUpdateFail();

			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.Table.DidUpdateWithFailure');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].table ).toEqual( this.table );
		});

		it('should emit an open success event', function() {
			spyOn( ColumnsEvent, 'send' );
			this.table._emitOpenSuccess();

			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.Table.DidOpenWithSuccess');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].table ).toEqual( this.table );
		});

		it('should emit an open failure event', function() {
			spyOn( ColumnsEvent, 'send' );
			this.table._emitOpenFail();

			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.Table.DidOpenWithFailure');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].table ).toEqual( this.table );
		});
	});

	describe('Creating Items', function() {
		var table;

		beforeEach(function() {
			table = new Table();
			spyOn( table, 'cleanColumn' ).and.callThrough();
		});

		it('should create items from an array of column names', function() {
			var names = [ "First Name", "Last Name", "Hometown" ];
			var columns = table.itemsFromColumnNames( names );
			expect( columns[ 0 ].title ).toEqual("First Name");
			expect( columns[ 1 ].title ).toEqual("Last Name");
			expect( columns[ 2 ].title ).toEqual("Hometown");
		});

		it('should create an item from a single column name', function() {
			var names = "First Name";
			var columns = table.itemsFromColumnNames( names );
			expect( columns[ 0 ].title ).toEqual("First Name");
		});

		it('should attach default styles to the first three items', function() {
			var names = [ "First Name", "Last Name", "Hometown", "Age" ];
			var columns = table.itemsFromColumnNames( names );
			expect( columns[ 0 ].style.styles ).toEqual( DEFAULTS.styles[0] );
			expect( columns[ 1 ].style.styles ).toEqual( DEFAULTS.styles[1] );
			expect( columns[ 2 ].style.styles ).toEqual( DEFAULTS.styles[2] );
			expect( columns[ 3 ].style.styles ).toEqual( [] );
		});

		it('should return items if passed an array of items', function() {
			var items = [ new Item({ title: 'First Name' }), new Item({ title: 'Last Name' }), new Item({ title: 'Hometown' }), new Item({ title: 'Age' }) ];
			var columns = table.itemsFromColumnNames( items );
			expect( columns.length ).toBe( 4 );
			expect( columns ).toEqual([ new Item({ title: 'First Name' }), new Item({ title: 'Last Name' }), new Item({ title: 'Hometown' }), new Item({ title: 'Age' })] );
		});

		it('should append a number to any duplicate columns', function() {
			var items = [ 'First Name', 'First Name', 'First Name', 'First Name' ];
			expect( table.itemsFromColumnNames( items )[ 0 ].title ).toEqual( 'First Name' );
			expect( table.itemsFromColumnNames( items )[ 1 ].title ).toEqual( 'First Name 2' );
			expect( table.itemsFromColumnNames( items )[ 2 ].title ).toEqual( 'First Name 3' );
			expect( table.itemsFromColumnNames( items )[ 3 ].title ).toEqual( 'First Name 4' );
		});

		it('should clean all of the columns', function() {
			var items = [ 'First Name', 'Last Name', 'Hometown', 'Age' ];
			var columns = table.itemsFromColumnNames( items );
			expect( table.cleanColumn.calls.count() ).toBe( 4 );
		});

		it('should return an item if passed a single item', function() {
			var item = new Item({ title: "My Item" });
			var columns = table.itemsFromColumnNames( item );
			expect( columns[ 0 ].title ).toEqual("My Item");
		});

		it('should throw an error if sent anything other than an array or a string', function() {
			var names = 5;
			expect(function() {
				table.itemsFromColumnNames( names );
			}).toThrow("exception: Column names must be a string or an array of strings");
		});

		it('should give the items their specified styling if a layout exists', function() {
			var layout = new Layout({ layout: {
				type: 'single',
				style: DEFAULTS.styles[ 1 ],
				data: "my_item"
			}});
			table.layout = layout;
			var columns = table.itemsFromColumnNames( "My Item" );

			expect( columns[ 0 ].style.styles ).toEqual( DEFAULTS.styles[ 1 ] );
		});

		it('should give the items the default styling if a layout does not exist', function() {
			var columns = table.itemsFromColumnNames( "My Item" );
			expect( columns[ 0 ].style.styles ).toEqual( DEFAULTS.styles[ 0 ] );
		});
	});

	describe('Appending a number to a column name', function() {
		var table,
			column;

		beforeEach(function() {
			table = new Table();
		});

		it('should append the count to the column so that the name is longer after than it was before', function() {
			column = 'This is my column name';
			expect( table.appendColumnWithCount( column, 10 ).length ).toBe( column.length + 3 );
			expect( table.appendColumnWithCount( column, 1 ).length ).toBe( column.length + 2 );
		});

		it('should truncate the column so that the name is the same length before as after if appending the count would put the column over the limit', function() {
			column = 'aherhaskflqoetickdneglticoelfotiedcstufidosqleidcjflawudjftoweud';
			expect( table.appendColumnWithCount( column, 10 ).length ).toBe( 64 );
			expect( table.appendColumnWithCount( column, 1 ).length ).toBe( 64 );
			expect( table.appendColumnWithCount( column + 'haera' , 10 ).length ).toBe( 64 );
		});

		it('should append the count to the column name, separated by an underscore', function() {
			expect( table.appendColumnWithCount( "Hi this is a column", 10 ) ).toBe( "Hi this is a column 10" );
			expect( table.appendColumnWithCount( "aherhaskflqoetickdneglticoelfotiedcstufidosqleidcjflawudjftoweudasdf", 10 ) ).toBe( "aherhaskflqoetickdneglticoelfotiedcstufidosqleidcjflawudjftow 10" );
		});
	});

	describe('Cleaning a table column name', function() {
		var table;

		beforeEach(function() {
			table = new Table();
		});

		it('should remove trailing periods and whitespace', function() {
			expect( table.cleanColumn( 'Github.' ) ).toEqual( 'Github' );
		});

		it('should remove any periods within column names', function() {
			expect( table.cleanColumn( 'Studio Filter10F 5&2 A23 A24 Abk. Abr. AD ADC AEF AF Ampl. Anch.' ) ).toBe('Studio Filter10F 5&2 A23 A24 Abk Abr AD ADC AEF AF Ampl Anch');
		});

		it('should truncate anything after the 64th character', function() {
			expect( table.cleanColumn('hi') ).toBe('hi');
			expect( table.cleanColumn( 'aherhaskflqoetickdneglticoelfotiedcstufidosqleidcjflawudjftoweudci') )
				.toBe('aherhaskflqoetickdneglticoelfotiedcstufidosqleidcjflawudjftoweud');
			expect( table.cleanColumn( 'aherhaskflqoetickdneglticoelfotied cstufidosqleidcjflawudjftoweudci aherhaskflqoetickdneglticoelfotiedcstufidosqleidcjflawudjftoweudci') )
				.toBe('aherhaskflqoetickdneglticoelfotied cstufidosqleidcjflawudjftoweu');
		});

		it('should replace commas with dashes', function() {
			expect( table.cleanColumn('There was a will, there was a way') ).toBe('There was a will - there was a way');
		});

	});

	describe('Responding to File Choice', function() {

		beforeEach(function() {
			this.table = new Table();
		});

		it('should set the table title to the file name, without extension', function() {
			var file = { name: 'test.csv' };
			spyOn( this.table, '_update' );
			this.table._onFileChosen( null, { file: file } );

			expect( this.table._update ).toHaveBeenCalledWith({ title:  'test' });
		});
	});

	describe('Listening for Table Events', function() {

		beforeEach(function() {
			this.table = new Table();
		});

		it('should listen for item creation', function() {
			spyOn( this.table, 'itemsFromColumnNames' ).and.callThrough();
			var columns = [ "First Name", "Last Name", "Hometown" ];
			// var columnsEvent = document.createEvent('CustomEvent');
			// columnsEvent.initCustomEvent('Columns.UploadView.DidParseColumnNamesForFile', false, false, {
			// 	uploadView: 	new UploadView(),
			// 	fileName: 		"My File",
			// 	columns: 		columns
			// });
			// document.dispatchEvent(columnsEvent);

			ColumnsEvent.send('Columns.UploadView.DidParseColumnNamesForFile', {
				uploadView: 	new UploadView(),
				fileName: 		"My File",
				columns: 		columns
			});

			expect( this.table.itemsFromColumnNames ).toHaveBeenCalledWith( columns );
			expect( this.table.columns[ 0 ].title ).toEqual("First Name");
			expect( this.table.columns[ 1 ].title ).toEqual("Last Name");
			expect( this.table.columns[ 2 ].title ).toEqual("Hometown");
		});

		it('should listen for row creation', function() {
			this.table.columns = [ new Item({ title: 'First Name' }), new Item({ title: 'Last Name' }), new Item({ title: 'Hometown' }), new Item({ title: 'Age' }) ];
			this.table.data = [{
				'first_name': 'Jeremy',
				'last_name': 'Lubin',
				'hometown': 'Princeton'				
			}, {
				'first_name': 'Jess',
				'last_name': 'Schwartz',
				'hometown': 'Mechanicsburg'	
			}];
			var row = [ 'Amir', 'Kanpurwala', 'West Windsor' ];
			// var columnsEvent = document.createEvent('CustomEvent');
			// columnsEvent.initCustomEvent('Columns.UploadView.DidParseDataRowForFile', false, false, {
			// 	uploadView: 	this,
			// 	fileName: 		"My File",
			// 	row: 			row
			// });
			// document.dispatchEvent(columnsEvent);

			ColumnsEvent.send('Columns.UploadView.DidParseDataRowForFile', {
				uploadView: 	this,
				fileName: 		"My File",
				row: 			row
			});

			// expect( this.table.data ).toEqual([
			// 	[ 'Jeremy', 'Lubin', 'Princeton' ],
			// 	[ 'Jess', 'Schwartz', 'Mechanicsburg' ],
			// 	[ 'Amir', 'Kanpurwala', 'West Windsor' ]
			// ]);
			expect( this.table.data ).toEqual([{
				'first_name': 'Jeremy',
				'last_name': 'Lubin',
				'hometown': 'Princeton'				
			}, {
				'first_name': 'Jess',
				'last_name': 'Schwartz',
				'hometown': 'Mechanicsburg'	
			}, {
				'first_name': 'Amir',
				'last_name': 'Kanpurwala',
				'hometown': 'West Windsor'	
			}]);
		});

		it('should listen for parsing completion', function() {
			spyOn( this.table, '_uploadFile' );
			var file = { name: 'test.csv' };
			// var columnsEvent = document.createEvent('CustomEvent');
			// columnsEvent.initCustomEvent('Columns.UploadView.DidCompleteParseForFile', false, false, {
			// 	uploadView: 	this,
			// 	file: 			file
			// });
			
			ColumnsEvent.send('Columns.UploadView.DidCompleteParseForFile', {
				uploadView: 	this,
				file: 			file
			});

			expect( this.table._uploadFile ).toHaveBeenCalledWith( file );
		});

		it('should listen to layout updates', function() {
			spyOn( this.table, '_update' );
			spyOn( this.table, '_updateTable' );
				
			var layout = new Layout();

			ColumnsEvent.send('Columns.Layout.DidChange', {
				layout: 	layout
			});

			expect( this.table._update ).toHaveBeenCalledWith({ layout: layout });
			expect( this.table._updateTable ).toHaveBeenCalled();
		});

		it('should listen for updates to table meta-data', function() {
			spyOn( this.table, '_update' );
			spyOn( this.table, '_updateTable' );

			// var columnsEvent = document.createEvent('CustomEvent');
			// columnsEvent.initCustomEvent('Columns.EmbedDetailsView.DidUpdatePropertyWithValue', false, false, {
			// 	embed: 	new EmbedDetailsView(),
			// 	property: 'title',
			// 	value: 'My New Table Name'
			// });
			
			ColumnsEvent.send('Columns.EmbedDetailsView.DidUpdatePropertyWithValue', {
				embed: 	new EmbedDetailsView(),
				property: 'title',
				value: 'My New Table Name'
			});

			expect( this.table._update ).toHaveBeenCalledWith({ title: 'My New Table Name' });
			expect( this.table._updateTable ).toHaveBeenCalled();
		});

		// it('should listen to existing table selection', function() {

		// });

	});

	describe('Uploading a File', function() {

		beforeEach(function() {
      		jasmine.Ajax.install();
      		this.table = new Table({
      			title: "My Table",
      			source: "The Noun Project",
      			source_url: "https://thenounproject.com/my-table"
      		});
    	});

	    afterEach(function() {
	    	jasmine.Ajax.uninstall();
	    });

		it('should upload a file to the api with the correct parameters', function() {
			var file = { name: 'test.csv' };

			this.table._uploadFile( file );

			expect( jasmine.Ajax.requests.mostRecent().url ).toBe( config.api.host + '/columns/table' );
		});

		it('should set a table id on success', function() {
			spyOn( this.table, '_update' );
			spyOn( this.table, '_emitUploadSuccess' );
			var data = {
				status: 'success',
				data: {
					table_id: 4
				}
			};
			this.table._onUploadSuccess( data );

			expect( this.table._update ).toHaveBeenCalledWith({ id: 4 });
			expect( this.table._emitUploadSuccess ).toHaveBeenCalled();
		});

		it('should redirect to the failure function when an error is returned from the server', function() {
			spyOn( this.table, '_update' );
			spyOn( this.table, '_onUploadFail' );
			var data = {
				status: 'fail',
				message: 'problemz'
			};
			this.table._onUploadSuccess( data, 'status', 'request' );

			expect( this.table._update ).not.toHaveBeenCalled();
			expect( this.table._onUploadFail ).toHaveBeenCalledWith( 'request', 'status', 'problemz' );
		});

		it('should notify the app on failure', function() {
			spyOn( this.table, '_emitUploadFail' );

			this.table._onUploadFail( 'request', 'status', 'problemz' );

			expect( this.table._emitUploadFail ).toHaveBeenCalled();
		});

		it('should send an analytics event on upload fail', function() {
			spyOn( ColumnsAnalytics, 'send' );
			this.table._onUploadFail( 'request', 'status', "I have failed you." )

			expect( ColumnsAnalytics.send ).toHaveBeenCalledWith({
				category: 'table',
				action: 'upload',
				label: 'fail',
				description: 'I have failed you.',
				table_id: undefined
			});
		});

		it('should send an analytics event on table upload success', function() {
			this.table.title = 'My Table';
			spyOn( ColumnsAnalytics, 'send' );
			var data = {
				status: 'success',
				data: {
					table_id: 4	
				}
			};
			this.table._onUploadSuccess( data );

			expect( ColumnsAnalytics.send ).toHaveBeenCalledWith({
				category: 'table',
				action: 'upload',
				label: 'success',
				description: 'My Table',
				table_id: 4
			});
		});

	});

	describe('Uploading Updated Table Meta-Data', function() {

		beforeEach(function() {
      		// jasmine.Ajax.install();
      		spyOn( $, 'post' );
      		this.table = new Table({
      			title: "My Table",
      			source: "The Noun Project",
      			source_url: "https://thenounproject.com/my-table",
      			columns: [ "First Name", "Last Name", "Hometown" ],
      			id: 4
      		});
    	});

	    afterEach(function() {
	    	// jasmine.Ajax.uninstall();
	    });

		it('should upload meta-data to the api with the correct table id and data', function() {
			this.table._updateTable();

      		expect( $.post.calls.mostRecent().args[0] ).toEqual( config.api.host + '/columns/table/4' );
      		expect( $.post.calls.mostRecent().args[1] ).toEqual({
      			title: "My Table",
      			source: "The Noun Project",
      			source_url: "https://thenounproject.com/my-table",
      			layout: JSON.stringify( new Layout({ items: this.table.columns }).model ),
      			columns: "First Name,Last Name,Hometown"
      		});
		});

		it('should notify the app on success', function() {
			spyOn( this.table, '_emitUpdateSuccess' );

			this.table._onUpdateSuccess({ status: 'success' });

			expect( this.table._emitUpdateSuccess ).toHaveBeenCalled();
		});

		it('should notify the app on failure', function() {
			spyOn( this.table, '_emitUpdateFail' );
			spyOn( this.table, '_emitUpdateSuccess' );

			this.table._onUpdateSuccess({ status: 'fail', message: 'problemz' });

			expect( this.table._emitUpdateFail ).toHaveBeenCalled();
			expect( this.table._emitUpdateSuccess ).not.toHaveBeenCalled();
		});
	});

	describe('Getting an existing table', function() {

		beforeEach(function() {
			spyOn( $, 'get' );
			this.table = new Table();
		});

		it('should set the table id attribute on the Table model', function() {
			spyOn( this.table, '_update' );
			spyOn( this.table, '_openTable' );

			this.table._onExistingTableChosen( null, { table_id: 2} );
			expect( this.table._update ).toHaveBeenCalledWith({
				id: 2
			});
			expect( this.table._openTable ).toHaveBeenCalledWith( 2 );
		});

		it('should download the correct table data', function() {
			this.table._openTable( 2 );
			expect( $.get.calls.mostRecent().args[0] ).toEqual( config.api.host + '/columns/table/2' );
		});

		it('should properly set the downloaded table attributes on the Table model on success', function() {
			spyOn( this.table, '_update' );
			// spyOn( this.table, '_emitOpenSuccess' );

			var columns = "Rank,Movie Title (click to view),Studio,Total Gross / Theaters,,Opening / Theaters,2,Open,Close";
			var layout = '{"type":"group","style":[{"property":"padding","value":"12px"}],"layout":[],"values":[{"type":"group","style":[],"layout":[{"property":"align-items","value":"flex-start"},{"property":"flex-direction","value":"column"}],"values":[{"type":"single","style":[{"property":"color","value":"#3a3a3a"},{"property":"font-size","value":"16px"}],"data":"rank"},{"type":"single","style":[{"property":"color","value":"#888"},{"property":"font-size","value":"14px"},{"property":"margin-top","value":"4px"}],"data":"movie_title_(click_to_view)"}]},{"type":"single","style":[{"property":"color","value":"#3a3a3a"},{"property":"font-size","value":"24px"}],"data":"studio"}]}';
			var table_data = [{
				"2": "4",
				"_": "3,885",
				"close": "-",
				"movie_title_(click_to_view)": "American Sniper",
				"open": "12/25/2015",
				"opening_/_theaters": "$633,456",
				"rank": "1",
				"studio": "WB",
				"total_gross_/_theaters": "$349,709,071"
			}, {
				"2": "4,151",
				"_": "4,151",
				"close": "3/19/2015",
				"movie_title_(click_to_view)": "The Hunger Games: Mockingjay - Part 1",
				"open": "11/21/2015",
				"opening_/_theaters": "$121,897,634",
				"rank": "2",
				"studio": "LGF",
				"total_gross_/_theaters": "$337,135,885"
			}];
			var data = {
				status: "success",
				data: {
					columns: columns,
					data: table_data,
					source: "who",
					source_url: "where",
					title: "whut",
					layout: layout
				}
			};

			this.table._onOpenSuccess( data );

			expect( this.table._update ).toHaveBeenCalledWith({
				columns: columns.split(","),
				data: table_data,
				source: "who",
				source_url: "where",
				title: "whut",
				layout: JSON.parse( layout )
			});
		});

		it('should notify the app on success', function() {
			spyOn( this.table, '_emitOpenSuccess' );

			this.table._onOpenSuccess({ status: 'success' });

			expect( this.table._emitOpenSuccess ).toHaveBeenCalled();
		});

		it('should notify the app on failure', function() {
			spyOn( this.table, '_emitOpenFail' );
			spyOn( this.table, '_emitOpenSuccess' );

			this.table._onOpenSuccess({ status: 'fail', message: 'problemz' });

			expect( this.table._emitOpenFail ).toHaveBeenCalled();
			expect( this.table._emitOpenSuccess ).not.toHaveBeenCalled();
		});

	});

	describe('Get Item for column name', function() {

		beforeEach(function() {
			this.table = new Table({
      			columns: [ "First Name", "Last Name", "Hometown" ],
      		});
		});

		it('should return the correct item given an unformatted name', function() {
			expect( this.table.getItemForData( 'first_name' ) ).toEqual( this.table.columns[ 0 ] );
			expect( this.table.getItemForData( 'hometown' ) ).toEqual( this.table.columns[ 2 ] );
		});

		it('should return undefined if there is no item match', function() {
			expect( this.table.getItemForData( 'hello' ) ).toBeUndefined();
		});

		it('should return undefined if there are no items', function() {
			this.table.columns = undefined;
			expect( this.table.getItemForData( 'first_name' ) ).toBeUndefined();
		});

		it('should return undefined if there is no data passed in', function() {
			expect( this.table.getItemForData() ).toBeUndefined();
		});
	});

	describe('Get String from Column Names', function() {

		beforeEach(function() {
			this.table = new Table({
				columns: [ "First Name", "Last Name", "Hometown" ]
			});
		});

		it('should return a string from column names', function() {
			var string = this.table.stringFromColumns( this.table.columns );
			expect( string ).toBe( "First Name,Last Name,Hometown" );
		});
	});
});