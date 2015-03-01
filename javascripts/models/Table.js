function Table( props )  {

	this.data = [];
	this.title = '';
	this.source = '';
	this.source_url = '';
	this.columns = [];
	this.layout = new Layout();
	this.id;

	this._update( props );
	this._setupEventListeners();
}

Table.prototype._update = function( props ) {

	if ( props ) {
		this.data = props.data || this.data;
		this.title = props.title || this.title;
		this.source = props.source || this.source;
		this.source_url = props.source_url || this.source_url;
		this.id = props.id || this.id;

		if ( props.columns ) {	
			this.columns = this.itemsFromColumnNames( props.columns );
		}

		if ( props.layout ) {
			this.layout = props.layout;
		} else {
			this.layout = new Layout( this.columns );
		}

		// Let everyone know that we've updated the table
		this._emitChange();
	}
};

Table.prototype._emitChange = function() {
	// Let everyone know that the table has been uploaded successfully
	var columnsEvent = document.createEvent('CustomEvent');
	columnsEvent.initCustomEvent('Columns.Table.DidChange', false, false, {
		table: 	this
	});
	document.dispatchEvent(columnsEvent);
};

Table.prototype._emitUploadSuccess = function() {
	var columnsEvent = document.createEvent('CustomEvent');
	columnsEvent.initCustomEvent('Columns.Table.DidUploadWithSuccess', false, false, {
		table: 	this
	});
	document.dispatchEvent(columnsEvent);
};

Table.prototype._emitUploadFail = function() {
	var columnsEvent = document.createEvent('CustomEvent');
	columnsEvent.initCustomEvent('Columns.Table.DidUploadWithFailure', false, false, {
		table: 	this
	});
	document.dispatchEvent(columnsEvent);
};

Table.prototype._emitUpdateSuccess = function() {
	var columnsEvent = document.createEvent('CustomEvent');
	columnsEvent.initCustomEvent('Columns.Table.DidUpdateWithSuccess', false, false, {
		table: 	this
	});
	document.dispatchEvent(columnsEvent);
};

Table.prototype._emitUpdateFail = function() {
	var columnsEvent = document.createEvent('CustomEvent');
	columnsEvent.initCustomEvent('Columns.Table.DidUpdateWithFailure', false, false, {
		table: 	this
	});
	document.dispatchEvent(columnsEvent);
};

Table.prototype.itemsFromColumnNames = function( columnNames ) {

	if ( typeof columnNames === 'string' ) {
		columnNames = [ columnNames ];
	}

	if( !Array.isArray( columnNames ) ) {
		throw "exception: Column names must be a string or an array of strings";
	}

	return columnNames.map(function( columnName ) {
		return new Item({ title: columnName });
	});
}

Table.prototype._uploadFile = function( file ) {
	var formData = new FormData();

	// Add any table meta-data to the form
	formData.append( "data", file );
	formData.append( "title", this.title );
	formData.append( "source", this.source );
	formData.append( "source_url", this.source_url );
	formData.append( "columns", this.stringFromColumns( this.columns ) );
	formData.append( "layout", JSON.stringify( this.layout ) );

	$.ajax({
        url: config.api.host + '/columns/table',  //Server script to process data
        type: 'POST',
        contentType: 'multipart/form-data',
        processData: false,
        data: formData,
        success: this._onUploadSuccess.bind( this )
    });
};

Table.prototype._updateTable = function() {
	var data = {
		title: this.title,
		source: this.source,
		source_url: this.source_url,
		layout: JSON.stringify( this.layout ),
		columns: this.stringFromColumns( this.columns )
	};
	$.post(config.api.host + '/columns/table/' + this.id, data, this._onUpdateSuccess.bind( this ) );
};

Table.prototype._setupEventListeners = function() {

	// Listen for column names parsing
	document.addEventListener( 'Columns.UploadView.DidParseColumnNamesForFile', this._onColumnNamesParsed.bind( this ), false );

	// Listen for row data parsing
	document.addEventListener( 'Columns.UploadView.DidParseDataRowForFile', this._onRowParsed.bind( this ), false );	

	// Listen for parsing completion
	document.addEventListener( 'Columns.UploadView.DidCompleteParseForFile', this._onParseComplete.bind( this ), false );

	// Listen for updates from the details panel
	document.addEventListener( 'Columns.EmbedDetailsView.DidUpdatePropertyWithValue', this._onTableUpdate.bind( this ), false );

};

Table.prototype._onColumnNamesParsed = function( event ) {

	this.columns = this.itemsFromColumnNames( event.detail.columns );
};

Table.prototype._onRowParsed = function( event ) {

	this.data.push( event.detail.row.data[ 0 ] );
};

Table.prototype._onParseComplete = function( event ) {

	this._uploadFile( event.detail.file );
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

	this._emitUploadSuccess();
};

Table.prototype._onUploadFail = function( request, status, error ) {

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

Table.prototype._onTableUpdate = function( event ) {
	var props = {};

	props[ event.detail.property ] = event.detail.value;

	this._update( props );
	this._updateTable();
};

Table.prototype.stringFromColumns = function( columns ) {

	return columns.map(function( column, i ) {
		return column.title;
	}).join();
};