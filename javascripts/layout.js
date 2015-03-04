// Add dummy columns to the page
Columns['data'] = {
	source: null,
	title: null,
	sort_by_column: null,
	source_url: null,
	layout: null,
	columns: null,
	file_name: null,
	data: []
	// source: 'Lubin Truth Institute',
	// title: 'Friends of Mine',
	// sort_by_column: 'age',
	// data: [{
	// 	first_name: 'Jeremy',
	// 	last_name: 'Lubin',
	// 	hometown: 'Princeton',
	// 	age: 27,
	// 	unit: 'Years'
	// },
	// {
	// 	first_name: 'Jess',
	// 	last_name: 'Schwartz',
	// 	hometown: 'Mechanicsburg',
	// 	age: 28,
	// 	unit: 'Years'
	// },
	// {
	// 	first_name: 'Amir',
	// 	last_name: 'Kanpurwala',
	// 	hometown: 'Princeton',
	// 	age: 27,
	// 	unit: 'Years'
	// },
	// {
	// 	first_name: 'Jeff',
	// 	last_name: 'LaFlam',
	// 	hometown: 'Raliegh',
	// 	age: 28,
	// 	unit: 'Years'
	// },
	// {
	// 	first_name: 'Phil',
	// 	last_name: 'Chacko',
	// 	hometown: 'Princeton',
	// 	age: 28,
	// 	unit: 'Years'
	// },
	// {
	// 	first_name: 'Albert',
	// 	last_name: 'Choi',
	// 	hometown: 'Raliegh',
	// 	age: 13,
	// 	unit: 'Years'
	// },
	// {
	// 	first_name: 'Kelly',
	// 	last_name: 'Fee',
	// 	hometown: 'Chicago',
	// 	age: 27,
	// 	unit: 'Years'
	// },
	// {
	// 	first_name: 'Elaine',
	// 	last_name: 'Zelby',
	// 	hometown: 'Chicago',
	// 	age: 27,
	// 	unit: 'Years'
	// },
	// {
	// 	first_name: 'Kousha',
	// 	last_name: 'Navidar',
	// 	hometown: 'Albany',
	// 	age: 26,
	// 	unit: 'Years'
	// },
	// {
	// 	first_name: 'Craig',
	// 	last_name: 'Hosang',
	// 	hometown: 'Alameda',
	// 	age: 28,
	// 	unit: 'Years'
	// }]
};

// Columns.Upload.init();
// Columns.Template.init();
// Columns.Items.init();
// Columns.Styling.init();
// Columns.Styling.updateStyling($(Columns.Template.$template).first());

$(function() {
	$('.columns-header-nav-home').click(function() {
		Columns.Upload.show();

		// Track this click
		ga('send', 'event', 'button', 'click', 'home');
	});

	$('.columns-header-nav-embed').click(function() {
		Columns.EmbedDetailsPanel.show();

		// Track this click
		ga('send', 'event', 'button', 'click', 'embed');
	});
});

