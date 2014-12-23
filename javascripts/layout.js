// Add dummy columns to the page
var DATA = [
	'First Name',
	'Last Name',
	'Hometown',
	'Age',
	'Unit'
];

// Store the currently dragging item
var DRAGGING_ITEM;

// UI Constants
var ROW_VALUE_CLASS = 'layout-template-row-value',
	ROW_VALUE_PLACEHOLDER_CLASS = 'placeholder';

// Set up the columns options
Handlebars.registerPartial('layout-column', Columns.Templates['templates/layout/column.hbs']);
var columns = Columns.Templates['templates/layout/columns.hbs'];
$("#layout").append(columns({columns: DATA}));

// Set up the layout template
Handlebars.registerPartial('layout-row-group', Columns.Templates['templates/layout/row-group.hbs']);
Handlebars.registerPartial('layout-row-value', Columns.Templates['templates/layout/row-value.hbs']);
var template = Columns.Templates['templates/layout/template.hbs'];
$("#layout").append(template());

// Set up drag and drop
$('.layout-column').on('dragstart', function(e) {
	e.originalEvent.dataTransfer.setData('text', e.target.innerHTML);
	DRAGGING_ITEM = this;
});

$('.layout-template-row-group').on('dragover', function(e) {
	
	// Remove any existing placeholders
	$('.' + ROW_VALUE_CLASS + '.' + ROW_VALUE_PLACEHOLDER_CLASS).remove();

	// Create a placeholder for the item
	var data = DRAGGING_ITEM.innerHTML;
	var item = Columns.Templates['templates/layout/row-value.hbs'];
	$(this).append(item({data: data, placeholder: true}));

	e.preventDefault();

});


$('.layout-template-row-group').on('dragenter', function(e) {
	e.preventDefault();
	var data = e.originalEvent.dataTransfer.getData('text');
	console.log(data);
	$(this).addClass('dragover');
});

$('.layout-template-row-group').on('dragleave', function(e) {
	// e.preventDefault();
	var data = e.originalEvent.dataTransfer.getData('text');
	console.log(data);
	$(this).removeClass('dragover');
});

$('.layout-template-row-group').on('drop', function(e) {
	e.preventDefault();

	// Remove any existing placeholders
	$('.' + ROW_VALUE_CLASS + '.' + ROW_VALUE_PLACEHOLDER_CLASS).remove();

	// Drop the element
	var data = e.originalEvent.dataTransfer.getData('text');
	var item = Columns.Templates['templates/layout/row-value.hbs'];
	$(this).append(item({data: data}));
	$(this).removeClass('dragover');
	




	// e.target.appendChild(data);
});

