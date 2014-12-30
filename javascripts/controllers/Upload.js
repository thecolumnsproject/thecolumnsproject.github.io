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
			// $(this).siblings('input').trigger('click');
			Columns.data.columns = [
				'First Name',
				'Last Name',
				'Hometown',
				'Age',
				'Units',
				'First Name',
				'Last Name',
				'Hometown',
				'Age',
				'Units',
				'First Name',
				'Last Name',
				'Hometown',
				'Age',
				'Units'
			];
			Columns.Items.render(Columns.data.columns);
			Columns.Layout.updateWithDefaultLayout(Columns.data.columns, true);
			Columns.Styling.updateStyling($(Columns.Template.$template).first());
			Columns.Items.updateItemStylesFromTemplate(Columns.Template);
			_this.hide();
		});

		$("input[type='file']").change(function() {
			var file = this.files[0];
			_this.parseFile(file);
			_this.setLoading(true, file.name);
		});
	};

	this.parseFile = function(file) {
		var _this = this;
		var rowsParsed = 0;
		Papa.parse(file, {
			worker: true,
			step: function(row) {
				rowsParsed++;
				if (rowsParsed == 1) {
					Columns.data.columns = row.data[0];
				}
				// uploadedData.push(row.data[0]);
				// updateProgress(row.meta.lines);
			},
			complete: function(results) {
				// if (uploadedData.length > MAX_ROWS) {
				// 	$(".welcome").addClass('active');
				// 	$(".uploading-data").removeClass('active');
				// 	uploadedData = [];
				// 	alert("Shoot, we can't handle that much data. Mind choosing a file with less than 1000 rows?");
				// } else {
					// renderData(uploadedData);
				// }
				_this.setLoading(false);
				// Columns.Template.init();
				// Columns.Items.init(Columns.data.columns);
				// Columns.Styling.init();
				// Columns.EmbedDetailsPanel.init();
				// Columns.Styling.updateStyling($(Columns.Template.$template).first());
				_this.hide();
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

	this.setLoading = function(loading, name) {
		var $button = this.$this.find(this.UPLOAD_BUTTON_SELECTOR);
		if (loading) {
			this.$this.addClass('loading');
			$button.text('Uploading ' + name + '...');
			$button.prop('disabled', true);
		} else {
			this.$this.removeClass('loading');
			$button.text('Upload a .csv');
			$button.prop('disabled', false);
		}
	}

	this.render = function() {
		this.$this = $(this.SELECTOR);
		this.setupListeners();
		this.setupResizeListeners();
	};

}