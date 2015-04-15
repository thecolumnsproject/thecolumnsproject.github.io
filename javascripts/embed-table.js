// require('../bower_components/jquery/dist/jquery.js');

// Load Velocity, where it will attach to jquery
// require('../bower_components/velocity/velocity.js');
var Config = require('./embed-config.js');
	// Columnsbars = require('./embed-handlebars.js');
	// $$ = require('jquery-browserify');

// Require Handlebars and our handlebars templates
// var Handlebars = require('../bower_components/handlebars/handlebars.js');
// require('../templates/embeddable-templates.js');

var ColumnsTable = require('../javascripts/models/ColumnsTable.js');

// File System Constants
// var API_HOST = '{{api_host}}';
// var ROOT_PATH = '{{root_path}}';
// var API_HOST = 'http://127.0.0.1:8080/api';
// var API_HOST = 'http://api-env-qdfe3rbbmw.elasticbeanstalk.com/api';
// var ROOT_PATH = 'http://127.0.0.1/';
// var ROOT_PATH = 'https://thecolumnsproject.github.io/';
// if (env) {
// 	switch (env) {
// 		case 'local':
// 			ROOT_PATH = 'http://localhost/'
// 			break;
// 		default:
// 			ROOT_PATH = 'https://thecolumnsproject.github.io/';
// 	}
// }
// var EMBED_PATH = ROOT_PATH + '/public/embed-table.js';
// var CSS_PATH = ROOT_PATH + '/css/embed-table.css';
// var IMG_PATH = ROOT_PATH + '/images/';

// document.addEventListener("DOMContentLoaded", function(event) { 
  //do work
// });
(function() {

	// Basic setup operations before we start creating tables
	// ------------------------------------------------------

	// Do the following tasks only once per page
	if(!Columns.hasFinishedSetup) { Columns.hasFinishedSetup = false; };
	if (!Columns.hasFinishedSetup) {

		// Add the table stylsheet to the page
		var style = document.createElement('link');
		style.rel = 'stylesheet';
		style.type = 'text/css';
		style.href = Config.css_path;
		style.media = 'all';
		document.head.appendChild(style);

		// // Setup necessary handlebars templates and helpers
		// // Handlebars.registerPartial('row', Columns.EmbeddableTemplates['templates/embed-table/row.hbs']);
		// Handlebars.registerHelper('partial', function(name, ctx, hash) {
		//     var ps = Handlebars.partials;
		//     if(typeof ps[name] !== 'function')
		//         ps[name] = Handlebars.compile(ps[name]);
		//     return ps[name](ctx, hash);
		// });
		// Handlebars.registerPartial('group', Columns.EmbeddableTemplates['templates/embed-table/row-group.hbs']);
		// Handlebars.registerPartial('column', Columns.EmbeddableTemplates['templates/embed-table/row-value.hbs']);
		// Handlebars.registerPartial('footer', Columns.EmbeddableTemplates['templates/embed-table/footer.hbs']);
		// Handlebars.registerPartial('layout', Columns.EmbeddableTemplates['templates/embed-table/layout.hbs']);
		// Handlebars.registerPartial('style', Columns.EmbeddableTemplates['templates/embed-table/style.hbs']);

		// Handlebars.registerHelper('ifIsGroup', function(type, options) {
		// 	return type == 'group' ? options.fn(this) : options.inverse(this);
		// });

		// Handlebars.registerHelper('ifIsSingle', function(type, options) {
		// 	return type == 'single' ? options.fn(this) : options.inverse(this);
		// });

		// Create global variables to store our tables and manage the load process
		if(!Columns.scripts) { Columns.scripts = []; };
		if(!Columns.tables) { Columns.tables = []; };

		// Add Google Analytics to the site if we're not in preview mode
		var scripts = $$('script').filter(function(i, script) {
			return $$(script).data('preview') === true; 
		});
		if ( !scripts.length ) {
			$$('head').append( Columns.EmbeddableTemplates['templates/embed-table/analytics.hbs']() );
		}

		// Make sure we don't do this setup again
		Columns.hasFinishedSetup = true;
	}

	var scripts = Columns.scripts;
	var tables = Columns.tables;
		
	// Find all the scripts generaged by us
	// and create a new table for each one!
	var scriptTags = document.getElementsByTagName('script');
	for (var i = 0; i < scriptTags.length ; i++) {
		var scriptTag = scriptTags[i];
		if (scriptTag.src.search( Config.embed_path ) > -1
			&& scripts.indexOf( scriptTag ) < 0
			&& scriptTag.type === 'text/javascript' /* To eliminate accidental use of cached script */ ) {

			scripts.push(scriptTag);

			// Create a new table
			var table = new ColumnsTable(scriptTag);
			// table.preview = $$(scriptTag).data('preview');
			tables.push(table);
			table.render();

			// If we're in preview mode, make sure we listen for data update events
			if ( !table.preview ) {
				// Columns.Template.setupTableEventListeners(table.$$table);
				table.fetchData();	
			}
		}
	}


})();