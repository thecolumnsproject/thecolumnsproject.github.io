// Add dummy columns to the page
var DATA = [
	'First Name',
	'Last Name',
	'Hometown',
	'Age',
	'Unit'
];

Columns['styleData'] = {
	components: {},
	types: {}
};

Columns.Template.init();
Columns.Items.init(DATA);
Columns.Styling.init();

