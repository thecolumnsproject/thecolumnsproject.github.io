// Embed Panel View Methods
// ----------------------
// This view controls meta data about the
// table, including name, source and the embed code
// The methods below allow us to:
// 1) Show and hide the panel
// 2) Update its fields
// 3) Update the data model when fields are altered

Columns.EmbedDetailsPanel = new function() {

	this.$this;
	this.ID = 'embed-details-panel';
	this.SELECTOR = '#' + this.ID;
	this.CLOSE_BUTTON_SELECTOR = '.' + 'columns-panel-header-close-button';
	this.BLOCKER_SELECTOR = '.' + 'columns-panel-blocker';

	this.init = function() {
		this.render();
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
		});
	};

	this.show = function() {
		this.$this.addClass('active');
	};

	this.hide = function() {
		this.$this.removeClass('active')
	}

	this.render = function() {
		var panel = Columns.Templates['templates/panels/panel.hbs'];
		var body = Columns.Templates['templates/embed-details-panel/body.hbs'];
		$('#styling').append(panel({
			id: this.ID,
			header: {
				title: 'Embed Details'
			},
			body: body(),
			footer: null
		}));
		this.$this = $(this.SELECTOR);
		this.setupListeners();
	};

	this.setupHandlebars = function () {

	};

};