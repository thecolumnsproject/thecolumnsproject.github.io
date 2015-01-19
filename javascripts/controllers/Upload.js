// Upload View Methods
// ----------------------
// This view controls the data upload process
// and serves as a splash screen
// The methods below allow us to:
// 1) Show and hide the upload screen
// 2) Drag and drop or upload a file from the system file picker
// 3) Process the uploaded data

Columns.Upload = new function() {

	this.$this;
	this.ID = 'upload';
	this.SELECTOR = '#' + this.ID;
	this.UPLOAD_BUTTON_SELECTOR = '.' + 'columns-upload-button';
	this.MAX_ROWS = 20;
	this.table_id;

	this.init = function() {
		this.render();
	};

	this.setupResizeListeners = function() {
		var _this = this;
		var _$this = this.$this;

		$(window).resize(function() {
			if (!_$this.hasClass('active')) {
				_$this.velocity({
					translateX: -_$this.width()
				}, {
					duration: 0
				});
			}
		});
	};

	this.setupListeners = function() {
		var _this = this;
		var _$this = this.$this;
		_$this.find(_this.UPLOAD_BUTTON_SELECTOR).click(function() {
			$(this).siblings('input').trigger('click');

			// Track this click
			ga('send', 'event', 'button', 'click', 'upload');
			mixpanel.track(
				"Clicked Upload button"
			);

			// Columns.data.columns = [
			// 	'First Name',
			// 	'Last Name',
			// 	'Hometown',
			// 	'Age',
			// 	'Unit'
			// ];
			// Columns.Items.render(Columns.data.columns);
			// Columns.Layout.updateWithDefaultLayout(Columns.data.columns, true);
			// // Columns.Styling.updateStyling($(Columns.Template.$template).first());
			// Columns.Items.updateItemStylesFromTemplate(Columns.Template);
			// Columns.Styling.initWithItem($(Columns.Template.$template).first());
			// // Columns.Styling.updateStyling($(Columns.Template.$template).first());
			// _this.hide();

			// // Expand the preview table as the upload screen fades
			// Columns.tables[0].generateLayout(Columns.Layout.layoutObject, false);
			// Columns.tables[0].renderData(Columns.data.data);
			// // Columns.tables[0].expand();
		});

		$("input[type='file']").change(function() {
			var file = this.files[0];
			_this.parseFile(file);
			_this.setLoading(true, "Uploading " + file.name + "...");

			// Track this click
			ga('send', 'event', 'file', 'chosen');
			mixpanel.track(
				"Chose file"
			);
		});
	};

	this.parseFile = function(file) {
		var _this = this;
		var rowsParsed = 0;
		Columns.data.data = [];
		Papa.parse(file, {
			// worker: true,
			step: function(row, handle) {
				var obj = {};

				rowsParsed++;
				if (rowsParsed == 1) {
					Columns.data.columns = row.data[0].map(function( column ) {
						return column ? column : '_';
					});
				} else {
					row.data[0].forEach(function(value, index) {
						obj[Columns.data.columns[index].toLowerCase().replace(/ /g, '_')] = value;
					});
					Columns.data.data.push(obj);

				}

				// _this.setLoading(true, {
					// name: file.name,
					// row: rowsParsed,
					// total_rows: row.meta.lines
				// });

				if (rowsParsed >= _this.MAX_ROWS) {
					handle.abort();
				}
				// uploadedData.push(row.data[0]);
				// updateProgress(row.meta.lines);
			},
			complete: function(results) {
				Columns.Layout.updateWithDefaultLayout(Columns.data.columns, true);
				Columns.data.file_name = file.name;
				_this.uploadFile(file, Columns.data);
				// if (uploadedData.length > MAX_ROWS) {
				// 	$(".welcome").addClass('active');
				// 	$(".uploading-data").removeClass('active');
				// 	uploadedData = [];
				// 	alert("Shoot, we can't handle that much data. Mind choosing a file with less than 1000 rows?");
				// } else {
					// renderData(uploadedData);
				// }
				// Columns.Items.render(Columns.data.columns);
				// Columns.Layout.updateWithDefaultLayout(Columns.data.columns, true);
				// // Columns.Styling.updateStyling($(Columns.Template.$template).first());
				// Columns.Items.updateItemStylesFromTemplate(Columns.Template);
				// Columns.Styling.initWithItem($(Columns.Template.$template).first());
				// // Columns.Styling.updateStyling($(Columns.Template.$template).first());
				// // _this.hide();

				// // Expand the preview table as the upload screen fades
				// Columns.tables[0].generateLayout(Columns.Layout.layoutObject, false);
				// Columns.tables[0].renderData(Columns.data);
				// // Columns.tables[0].expand();
				// // Columns.Template.init();
				// // Columns.Items.init(Columns.data.columns);
				// // Columns.Styling.init();
				// // Columns.EmbedDetailsPanel.init();
				// // Columns.Styling.updateStyling($(Columns.Template.$template).first());
				// _this.setLoading(false);
				// _this.hide();
			}
		});
	};

	this.uploadFile = function(file, data) {
		var _this = this;
		var formData = new FormData();
		formData.append("data", file);
		formData.append("title", data.title);
		formData.append("source", data.source);
		formData.append("source_url", data.source_url);
		formData.append("columns", data.columns);
		formData.append("layout", JSON.stringify(data.layout));

		$.ajax({
	        url: config.api.host + '/columns/table',  //Server script to process data
	        type: 'POST',
	        // xhr: function() {  // Custom XMLHttpRequest
	        //     var myXhr = $.ajaxSettings.xhr();
	        //     if(myXhr.upload){ // Check if upload property exists
	        //         myXhr.upload.addEventListener('progress',progressHandlingFunction, false); // For handling the progress of the upload
	        //     }
	        //     return myXhr;
	        // },
	        //Ajax events
	        // beforeSend: beforeSendHandler,
	        success: function(data) {
	        	if (data.status == 'success') {
	        		_this.table_id = data.data.table_id;
	        		Columns.Items.render(Columns.data.columns);
					Columns.Items.updateItemStylesFromTemplate(Columns.Template);
					Columns.Styling.initWithItem($(Columns.Template.$template).first());
					Columns.EmbedDetailsPanel.init(data.data.table_id);

					// Expand the preview table as the upload screen fades
					Columns.tables[0].generateLayout(Columns.Layout.layoutObject, false);
					Columns.tables[0].renderData(Columns.data);
					_this.setLoading(false);
					_this.hide();

					// Track this upload
					ga('send', 'event', 'file', 'uploaded', '', Columns.EmbedDetailsPanel.table_id);
					mixpanel.track(
						"File uploaded successfully"
					);
	        	} else {
	        		console.log(data.message);
	        		_this.setLoading(false, "Shoot, something went wrong. Mind trying a different .csv?");
	        	}
	        },
	        // error: errorHandler,
	        // Form data
	        data: formData,
	        //Options to tell jQuery not to process data or worry about content-type.
	        cache: false,
	        contentType: false,
	        processData: false
	    });
	};

	this.updateTableData = function() {
		var data = {
			title: Columns.data.title,
			source: Columns.data.source,
			source_url: Columns.data.source_url,
			layout: JSON.stringify(Columns.data.layout),
			columns: Columns.data.columns.join(",")
		};
		$.post(config.api.host + '/columns/table/' + this.table_id, data, function(response) {
			if (response.status == 'success') {
				console.log('Data updated!');
			} else {
				console.log('Problem updating!');
				console.log(response.message);
			}
		});
	};

	this.hide = function() {
		var _this = this;
		var _$this = this.$this;

		_$this.velocity({
			// translateX: -_$this.width(),
			opacity: 0,
		}, {
			duration: 200,
			easing: 'ease-in',
			begin: function() {
				_$this.addClass('animating');
			},
			complete: function() {
				_$this.removeClass('animating');
				_$this.removeClass('active');
			}
		});
	};

	this.show = function() {
		var _this = this;
		var _$this = this.$this;

		_$this.velocity({
			// translateX: 0,
			opacity: 1
		}, {
			duration: 200,
			easing: 'ease-out',
			begin: function() {
				_$this.addClass('animating');
			},
			complete: function() {
				_$this.removeClass('animating');
				_$this.addClass('active');
			}
		});
	};

	this.setLoading = function(loading, message) {
		var $button = this.$this.find(this.UPLOAD_BUTTON_SELECTOR);
		if ( !message ) {
			message = "Upload a .csv";
		}
		if ( loading ) {
			this.$this.addClass('loading');
			// var text = "Uploading";
			// if (upload.row) {
			// 	text += " row " + upload.row;
			// 	if (upload.total_rows) {
			// 		text += " of " + upload.total_rows
			// 	}
			// 	if (upload.name) {
			// 		text += " from " + upload.name;
			// 	}
			// }
			// else if (upload.name) {
			// 	text += " " + upload.name;
			// }
			// text+= "...";
			$button.prop('disabled', true);
		} else {
			this.$this.removeClass('loading');
			$button.prop('disabled', false);
		}

		$button.text(message);

	}

	this.render = function() {
		this.$this = $(this.SELECTOR);
		this.setupListeners();
		// this.setupResizeListeners();
	};

}