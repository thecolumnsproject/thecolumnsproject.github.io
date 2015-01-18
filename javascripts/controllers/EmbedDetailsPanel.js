// Embed Panel View Methods
// ----------------------
// This view controls meta data about the
// table, including name, source and the embed code
// The methods below allow us to:
// 1) Show and hide the panel
// 2) Update its fields
// 3) Update the data model when fields are altered

if (!window.Columns) window.Columns = {};
Columns.EmbedDetailsPanel = new function() {

	this.$this;
	this.ID = 'embed-details-panel';
	this.SELECTOR = '#' + this.ID;
	this.CLOSE_BUTTON_SELECTOR = '.' + 'columns-panel-header-close-button';
	this.BLOCKER_SELECTOR = '.' + 'columns-panel-blocker';
	this.table_id;

	this.init = function(table_id) {
		this.table_id = table_id;
		this.render(table_id);
	};

	this.setupListeners = function() {
		var _this = this;
		this.$this.find(this.CLOSE_BUTTON_SELECTOR).click(function() {
			_this.hide();
		});

		this.$this.find(this.BLOCKER_SELECTOR).click(function() {
			_this.hide();
		});

		this.$this.find('input').keyup(function() {
			var property = $(this).data('property');
			var value = $(this).val();
			Columns.data[property] = value;
			Columns.tables[0].renderData(Columns.data);
		});

		// Update the data on the server after the user tabs
		this.$this.find('input').blur(function() {
			Columns.Upload.updateTableData();

			// Track this update event click
			ga('send', 'event', 'field', 'edit', $(this).data('property'), _this.table_id);
		});

		this.$this.find('.columns-copy-embed-url').click(function() {
			// Track attempts to copy the embed code
			ga('send', 'event', 'button', 'click', 'copy embed code', _this.table_id);
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

	this.show = function() {
		this.$this.addClass('active');
	};

	this.hide = function() {
		this.$this.removeClass('active')
	}

	this.render = function(table_id) {
		var panel = Columns.Templates['templates/panels/panel.hbs'];
		var body = Columns.Templates['templates/embed-details-panel/body.hbs'];
		$('body').append(panel({
			id: this.ID,
			header: {
				title: 'Embed Details'
			},
			body: body({
				title: Columns.data.title,
				source: Columns.data.source,
				source_url: Columns.data.source_url,
				table_id: table_id,
				url: config.embed.host + config.embed.path
			}),
			footer: null,
		}));
		this.$this = $(this.SELECTOR);
		this.setupListeners();
	};

	this.setupHandlebars = function () {

	};

};