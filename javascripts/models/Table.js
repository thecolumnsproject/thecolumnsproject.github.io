var ColumnsEvent 		= require('./ColumnsEvent.js');
var ColumnsAnalytics	= require('./ColumnsAnalytics.js');
var Layout 				= require('./Layout.js');
var Item 				= require('./Item.js');
var config 				= require('../config.js');
var DEFAULTS			= require('../styling/defaults.js');

var MAX_COLUMN_LENGTH 	= 64;

function Table( props )  {

	this.data = [];
	this.title = '';
	this.source = '';
	this.source_url = '';
	this.columns = [];
	this.layout;
	this.id;

	this._update( props );
	this._setupEventListeners();
}

Table.prototype._update = function( props ) {

	if ( props ) {
		this.data = props.data || this.data;

		// Allow empty strings for these properties
		this.title = typeof props.title !== 'undefined' ? props.title : this.title;
		this.source = typeof props.source !== 'undefined' ? props.source : this.source;
		this.source_url = typeof props.source_url !== 'undefined' ? props.source_url : this.source_url;

		this.id = props.id || this.id;

		if ( props.layout && props.layout instanceof Layout ) {
			this.layout = props.layout;
		} else if ( props.layout ) {
			this.layout = new Layout({ layout: props.layout });
		}

		if ( props.columns ) {	
			this.columns = this.itemsFromColumnNames( props.columns );
		}

		// Only create a new layout if there are columns
		if ( !this.layout && this.columns.length ) {
			this.layout = new Layout( { items: this.columns } );
		}

		// Let everyone know that we've updated the table
		this._emitChange();
	}
};

Table.prototype._emitChange = function() {
	// Let everyone know that the table has been uploaded successfully
	// var columnsEvent = document.createEvent('CustomEvent');
	// columnsEvent.initCustomEvent('Columns.Table.DidChange', false, false, {
	// 	table: 	this
	// });
	// document.dispatchEvent(columnsEvent);
	ColumnsEvent.send('Columns.Table.DidChange', {
		table: 	this
	});
};

Table.prototype._emitUploadSuccess = function() {
	// var columnsEvent = document.createEvent('CustomEvent');
	// columnsEvent.initCustomEvent('Columns.Table.DidUploadWithSuccess', false, false, {
	// 	table: 	this
	// });
	// document.dispatchEvent(columnsEvent);
	ColumnsEvent.send('Columns.Table.DidUploadWithSuccess', {
		table: 	this
	});
};

Table.prototype._emitUploadFail = function() {
	// var columnsEvent = document.createEvent('CustomEvent');
	// columnsEvent.initCustomEvent('Columns.Table.DidUploadWithFailure', false, false, {
	// 	table: 	this
	// });
	// document.dispatchEvent(columnsEvent);
	ColumnsEvent.send('Columns.Table.DidUploadWithFailure', {
		table: 	this
	});
};

Table.prototype._emitUpdateSuccess = function() {
	// var columnsEvent = document.createEvent('CustomEvent');
	// columnsEvent.initCustomEvent('Columns.Table.DidUpdateWithSuccess', false, false, {
	// 	table: 	this
	// });
	// document.dispatchEvent(columnsEvent);
	ColumnsEvent.send('Columns.Table.DidUpdateWithSuccess', {
		table: 	this
	});
};

Table.prototype._emitUpdateFail = function() {
	// var columnsEvent = document.createEvent('CustomEvent');
	// columnsEvent.initCustomEvent('Columns.Table.DidUpdateWithFailure', false, false, {
	// 	table: 	this
	// });
	// document.dispatchEvent(columnsEvent);
	ColumnsEvent.send('Columns.Table.DidUpdateWithFailure', {
		table: 	this
	});
};

Table.prototype._emitOpenSuccess = function() {
	// var columnsEvent = document.createEvent('CustomEvent');
	// columnsEvent.initCustomEvent('Columns.Table.DidOpenWithSuccess', false, false, {
	// 	table: 	this
	// });
	// document.dispatchEvent(columnsEvent);
	ColumnsEvent.send('Columns.Table.DidOpenWithSuccess', {
		table: 	this
	});
};

Table.prototype._emitOpenFail = function() {
	// var columnsEvent = document.createEvent('CustomEvent');
	// columnsEvent.initCustomEvent('Columns.Table.DidOpenWithFailure', false, false, {
	// 	table: 	this
	// });
	// document.dispatchEvent(columnsEvent);
	ColumnsEvent.send('Columns.Table.DidOpenWithFailure', {
		table: 	this
	});
};

// Return an item given a data column name
// @param {string} data -- the unformatted column title to search against ('first_name')
// @return {Item} -- the matching item
Table.prototype.getItemForData = function( data ) {
	var item;

	if ( data && this.columns && this.columns.length ) {
		item = this.columns.filter(function( column ) {
			return data === column.unformattedTitle();
		}.bind( this ))[ 0 ];
	}

	return item;
};

Table.prototype.itemsFromColumnNames = function( columnNames ) {

	if ( typeof columnNames === 'string' ) {
		columnNames = [ columnNames ];
	}

	if( columnNames instanceof Item ) {
		columnNames = [ columnNames ];
	}

	if( !Array.isArray( columnNames ) ) {
		throw "exception: Column names must be a string or an array of strings";
	}

	var counts = {};
	return columnNames.map(function( columnName, i ) {

		if ( columnName instanceof Item ) {
			return columnName;
		} else {
			// Clean the column name
			columnName = this.cleanColumn( columnName );

			// Update the counts object with this column
			counts[ columnName ] = ( counts[ columnName ] || 0 ) + 1;

			// Update the column with a count if it's a duplicate
			if ( counts[ columnName ] > 1 ) {
				columnName = this.appendColumnWithCount( columnName, counts[ columnName ] );
			}

			// If we have an existing layout model, use it's styles
			// otherwise go with the default
			var style = DEFAULTS.styles[ i ];
			if ( this.layout ) {
				style = this.layout.getStyleForData( Item.unformattedTitle( columnName ) );
			}

			return new Item({ title: columnName, style: style });
		}

	}.bind( this ));
};

Table.prototype.cleanColumn = function( column ) {
	var cleanColumn = column;

	// Replace any trailing whitespace and periods
	cleanColumn = cleanColumn.replace(/^[.\s]+|[.\s]+$/g, "");

	// Remove any periods within columns
	cleanColumn = cleanColumn.replace(/[.]/g, '' );

	// Replace any commas with dashes
	cleanColumn = cleanColumn.replace( ",", " -" );

	// Make sure it's not too long for the DB
	cleanColumn = cleanColumn.substring( 0, MAX_COLUMN_LENGTH );

	return cleanColumn;
}

Table.prototype.appendColumnWithCount = function( column, count ) {
	var separator = ' ',
		difference = MAX_COLUMN_LENGTH - ( column.length + separator.length + count.toString().length );

	// If the column + count + separator length goes over the limit,
	// truncate the column as necessary
	if ( difference < 0 ) {
		column = column.substring( 0, column.length + difference );
	}

	return column += separator + count;
};

Table.prototype._uploadFile = function( file ) {

	// Skip the actual upload if we're in debug mode
	// if ( config.env == 'development' && config.debug == "true" ) {
	// 	this._onUploadSuccess({
	// 		status: 'success',
	// 		data: {
	// 			table_id: 1
	// 		}
	// 	});
	// 	return;
	// }

	var formData = new FormData();

	// Add any table meta-data to the form
	formData.append( "data", file );
	formData.append( "title", this.title );
	formData.append( "source", this.source );
	formData.append( "source_url", this.source_url );
	formData.append( "columns", this.stringFromColumns( this.columns ) );
	// formData.append( "layout", JSON.stringify( this.layout.model ) );

	// this._onUploadSuccess( {
	// 	status: 'success',
	// 	data: {
	// 		table_id: 1
	// 	}
	// });

	$.ajax({
        url: config.api.host + '/columns/table',  //Server script to process data
        type: 'POST',
        contentType: false,
        processData: false,
        data: formData,
        success: this._onUploadSuccess.bind( this )
    });
};

Table.prototype._updateTable = function() {

	// Skip the actual upload if we're in debug mode
	// if ( config.env == 'development' && config.debug == "true" ) {
	// 	this._onUpdateSuccess({
	// 		status: 'success'
	// 	});
	// 	return;
	// }

	var data = {
		title: this.title,
		source: this.source,
		source_url: this.source_url,
		layout: JSON.stringify( this.layout.model ),
		columns: this.stringFromColumns( this.columns )
	};
	$.post(config.api.host + '/columns/table/' + this.id, data, this._onUpdateSuccess.bind( this ) );
};

Table.prototype._openTable = function( table_id ) {
	$.get( config.api.host + '/columns/table/' + table_id, this._onOpenSuccess.bind( this ) );
};

Table.prototype._setupEventListeners = function() {

	// Listen for file choice
	ColumnsEvent.on( 'Columns.UploadView.DidChooseFile', this._onFileChosen.bind( this ));

	// Listen for sample data choice
	ColumnsEvent.on( 'Columns.UploadView.DidChooseSampleData', this._onSampleDataChosen.bind( this ));

	// Listen for column names parsing
	ColumnsEvent.on( 'Columns.UploadView.DidParseColumnNamesForFile', this._onColumnNamesParsed.bind( this ));

	// Listen for row data parsing
	ColumnsEvent.on( 'Columns.UploadView.DidParseDataRowForFile', this._onRowParsed.bind( this ) );	

	// Listen for parsing completion
	ColumnsEvent.on( 'Columns.UploadView.DidCompleteParseForFile', this._onParseComplete.bind( this ) );

	// Listen for updates from the details panel
	ColumnsEvent.on( 'Columns.EmbedDetailsView.DidUpdatePropertyWithValue', this._onTableUpdate.bind( this ) );

	// Listen for layout updates
	ColumnsEvent.on( 'Columns.Layout.DidChange', this._onLayoutUpdate.bind( this ) );

};

Table.prototype._onFileChosen = function( event, data ) {

	// Set the file name as the initial table name,
	// but remove the .csv extension
	this._update({
		title: data.file.name.replace(/.csv/, '')
	});

};

Table.prototype._onSampleDataChosen = function( event, data ) {

	// Set the passed on name as the initial table name,
	this._update({
		title: data.title,
		source: data.source
	});
};

Table.prototype._onColumnNamesParsed = function( event, data ) {

	this.columns = this.itemsFromColumnNames( data.columns );
};

Table.prototype._onRowParsed = function( event, data ) {
	var row = data.row,
		data = {};

	row.forEach(function( value, i ) {
		data[ this.columns[ i ].unformattedTitle() ] = value;
	}.bind( this ));

	this.data.push( data );
};

Table.prototype._onParseComplete = function( event, data ) {

	this._uploadFile( data.file );
};

Table.prototype._onExistingTableChosen = function( event, data ) {

	// Set the Table ID
	this._update({
		id: data.table_id
	});

	this._openTable( data.table_id );
};

Table.prototype._onUploadSuccess = function( data, status, request ) {

	// Check for a server-side error
	if ( data.status !== 'success' ) {
		this._onUploadFail( request, status, data.message );
		return;
	}

	// Set the Table ID
	this._update({
		id: data.data.table_id
	});

	ColumnsAnalytics.send({
		category: 'table',
		action: 'upload',
		label: 'success',
		description: this.title,
		table_id: this.id
	});

	this._emitUploadSuccess();
};

Table.prototype._onUploadFail = function( request, status, error ) {

	ColumnsAnalytics.send({
		category: 'table',
		action: 'upload',
		label: 'fail',
		description: error,
		table_id: this.id
	});

	this._emitUploadFail();
};

Table.prototype._onUpdateSuccess = function( data, status, request ) {

	// Check for a server-side error
	if ( data.status !== 'success' ) {
		this._emitUpdateFail();
		return;
	}

	this._emitUpdateSuccess();
};

Table.prototype._onOpenSuccess = function( data, status, request ) {

	if ( data.status !== 'success' ) {
		this._emitOpenFail();
		return;
	}

	
	if ( data.data ) {
		var table_data = data.data;	
		this._update({
			columns: table_data.columns.split(","),
			data: table_data.data,
			source: table_data.source,
			source_url: table_data.source_url,
			title: table_data.title,
			layout: JSON.parse( table_data.layout )
		});
	}

	this._emitOpenSuccess();
};

Table.prototype._onTableUpdate = function( event, data ) {
	var props = {};

	props[ data.property ] = data.value;

	this._update( props );
	this._updateTable();
};

Table.prototype._onLayoutUpdate = function( event, data ) {
	this._update({
		layout: data.layout
	});
	this._updateTable();
};

Table.prototype.stringFromColumns = function( columns ) {

	return columns.map(function( column, i ) {
		return column.title;
	}).join();
};

module.exports = Table;