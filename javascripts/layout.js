// Add dummy columns to the page
Columns['data'] = {
	source: null,
	source_url: null,
	title: null,
	layout: null,
	columns: null,
	data: null
}

// Columns.Upload.init();
Columns.Template.init();
Columns.Items.init([
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
]);
Columns.Styling.init();
Columns.EmbedDetailsPanel.init();
Columns.Styling.updateStyling($(Columns.Template.$template).first());

$(function() {
	$('.columns-header-nav-home').click(function() {
		Columns.Upload.show();
	});

	$('.columns-header-nav-embed').click(function() {
		Columns.EmbedDetailsPanel.show();
	});
});

