// Add dummy columns to the page
Columns['data'] = {
	source: null,
	source_url: null,
	title: null,
	layout: null,
	columns: null,
	data: null
}

Columns.Upload.init();

$(function() {
	$('.columns-header-nav-home').click(function() {
		Columns.Upload.show();
	});

	$('.columns-header-nav-embed').click(function() {
		Columns.EmbedDetailsPanel.show();
	});
});

