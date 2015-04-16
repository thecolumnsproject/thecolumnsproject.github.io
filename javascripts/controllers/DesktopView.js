var Table 				= require('../models/Table.js');
var ItemView 			= require('./ItemsView.js');
var TemplateView 		= require('./TemplateView.js');
var StyleView 			= require('./StyleView.js');
var EmbedDetailsView 	= require('./EmbedDetailsView.js');
var UploadView 			= require('./UploadView.js');
var ColumnsEvent 		= require('../models/ColumnsEvent.js');
var ColumnsAnalytics 	= require('../models/ColumnsAnalytics.js');
var Config 				= require('../config.js');

var TEMPLATE 			= Columns.Templates['templates/desktop.hbs'];

function DesktopView() {

	this.table = new Table();
	this.items = new ItemsView();
	this.template = new TemplateView();
	this.style = new StyleView();
	this.embed = new EmbedDetailsView();
	this.upload = new UploadView();
}

DesktopView.prototype.render = function() {

	this.$desktop = $( TEMPLATE({
		source: Config.embed.host + Config.embed.path,
		table: Config.embed.desktop['feature-table']
	}));

	$('#app').append( this.$desktop );
	this.upload.render();

	this._setupAnalytics();
	this._emitRender();

	return this.$desktop;
};

DesktopView.prototype._emitRender = function() {
	ColumnsEvent.send( 'Columns.DesktopView.DidRender', {
		desktopView: this
	});
};

DesktopView.prototype._setupAnalytics = function() {

	// $('.columns-header-nav-home').click(function() {
	// 	ColumnsAnalytics.send({
	// 		category: 'button',
	// 		action: 'click',
	// 		label: 'home'
	// 	});
	// });

	$(document).on('ColumnsTableDidExpand', function( event, data ) {
		if ( data.table.id === Config.embed.desktop['feature-table'] ) {
			ColumnsAnalytics.send({
				category: 'sample table',
				action: 'expand'
			});
		}
	});
};

module.exports = DesktopView;