var Table 				= require('./models/Table.js');
var ItemView 			= require('./controllers/ItemsView.js');
var TemplateView 		= require('./controllers/TemplateView.js');
var StyleView 			= require('./controllers/StyleView.js');
var EmbedDetailsView 	= require('./controllers/EmbedDetailsView.js');
var UploadView 			= require('./controllers/UploadView.js');
var ColumnsAnalytics 	= require('./models/ColumnsAnalytics.js');
var Config 				= require('./config.js');

// Create the Table object
var table = new Table();

// Set up the Items View
var items = new ItemsView();

// Set up the Template
var template = new TemplateView();

// Set up the Style View
var style = new StyleView();

// Set up the Embed Panel
var embed = new EmbedDetailsView();

// Set up the Upload View
var upload = new UploadView();
upload.render();

// Set up analytics
if ( Config.env === 'production' ) {
	$('head').append( Columns.Templates['templates/analytics.hbs']() );
	ColumnsAnalytics.send({
		category: 'navigation',
		action: 'arrived',
		label: 'app'
	});

	$('.columns-header-nav-home').click(function() {
		ColumnsAnalytics.send({
			category: 'button',
			action: 'click',
			label: 'home'
		});
	});
}



