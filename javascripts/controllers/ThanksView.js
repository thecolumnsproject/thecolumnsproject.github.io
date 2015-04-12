var ColumnsEvent 	= require('../models/ColumnsEvent.js');
var TEMPLATE 		= Columns.Templates['templates/thanks.hbs'];

function ThanksView() {

}

ThanksView.prototype.render = function() {

	this.$thanks = $( TEMPLATE() );

	this._setupEventListeners();

	return this.$thanks;
};

ThanksView.prototype.show = function() {
	this.$thanks.velocity({
		opacity: 1
	}, {
		duration: 200,
		easing: 'ease-out',
		begin: function() {
			this.$thanks.addClass('animating');
		}.bind( this ),
		complete: function() {
			this.$thanks.removeClass('animating');
			this.$thanks.addClass('active');
		}.bind( this )
	});
};

ThanksView.prototype.hide = function() {
	this.$thanks.velocity({
		opacity: 0
	}, {
		duration: 200,
		easing: 'ease-in',
		begin: function() {
			this.$thanks.addClass('animating');
		}.bind( this ),
		complete: function() {
			this.$thanks.removeClass('animating');
			this.$thanks.removeClass('active');
		}.bind( this )
	});
};

ThanksView.prototype._setupEventListeners = function() {

	// Listen to successful registrations
	ColumnsEvent.on( 'Columns.RegisterView.DidRegisterWithSuccess', this._onRegistrationSuccess.bind( this ) );
};

ThanksView.prototype._onRegistrationSuccess = function( event, data ) {

	this.show();
};

module.exports = ThanksView;