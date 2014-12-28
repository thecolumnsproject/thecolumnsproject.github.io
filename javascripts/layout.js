// Add dummy columns to the page
var DATA = [
	'First Name',
	'Last Name',
	'Hometown',
	'Age',
	'Unit'
];

Columns.Template.init();
Columns.Items.init(DATA);
Columns.Styling.init();
Columns.EmbedDetailsPanel.init();
Columns.Styling.updateStyling($(Columns.Template.$template).first());

$(function() {
	$('.columns-header-nav-embed').click(function() {
		Columns.EmbedDetailsPanel.show();
	});
});

