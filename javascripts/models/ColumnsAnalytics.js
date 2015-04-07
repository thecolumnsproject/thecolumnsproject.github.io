var Config = require('../config.js');

module.exports = ColumnsAnalytics;

function ColumnsAnalytics() {}

ColumnsAnalytics.send = function( props ) {
	var props = props || {},
		mixpanelObj = {};

	// Make sure the properties are santized
	props.action = props.action || '';
	props.category = props.category || '';
	props.label = props.label || '';
	props.description = props.description || props.category + ' ' + props.action + ' ' + props.label;
	props.description = props.description == '  ' ? '' : props.description;
	if ( props.table_id ) {
		mixpanelObj['Table ID'] = props.table_id;
	}

	// Send a Google Analytics event
	if ( window.ga ) {
		ga( 'send', 'event', props.category, props.action, props.label, props.table_id );
	}

	// Send a mixpanel event
	if ( window.mixpanel ) {
		mixpanel.track( props.description, mixpanelObj );
	}

};