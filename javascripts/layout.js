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
Columns.Styling.updateStyling($(Columns.Template.$template).first());

