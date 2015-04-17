var isMobile			= require('ismobilejs');
var Desktop 			= require('./controllers/DesktopView.js');
var Mobile 				= require('./controllers/MobileView.js');
var Config 				= require('./config.js');
var ColumnsAnalytics 	= require('./models/ColumnsAnalytics.js');

var app;

// First, check to see if we're on mobile.
// If we are, load the mobile site instead
if ( isMobile.any ) {
	app = new Mobile();
} else {
	app = new Desktop();
}

app.render();

// Set up analytics
if ( Config.env === 'production' ) {
	$('head').append( Columns.Templates['templates/analytics.hbs']() );
	ColumnsAnalytics.send({
		category: 'navigation',
		action: 'arrived',
		label: 'app'
	});
}

// Create the Table object
// var table = new Table();

// // Set up the Items View
// var items = new ItemsView();

// // Set up the Template
// var template = new TemplateView();

// // Set up the Style View
// var style = new StyleView();

// // Set up the Embed Panel
// var embed = new EmbedDetailsView();

// // Set up the Upload View
// var upload = new UploadView();
// upload.render();

// // Set up analytics
// if ( Config.env === 'production' ) {
// 	$('head').append( Columns.Templates['templates/analytics.hbs']() );
// 	ColumnsAnalytics.send({
// 		category: 'navigation',
// 		action: 'arrived',
// 		label: 'app'
// 	});

// 	$('.columns-header-nav-home').click(function() {
// 		ColumnsAnalytics.send({
// 			category: 'button',
// 			action: 'click',
// 			label: 'home'
// 		});
// 	});
// }



