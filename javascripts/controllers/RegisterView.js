var ColumnsEvent 	= require('../models/ColumnsEvent.js');
var Config 			= require('../config.js');
var TEMPLATE 		= Columns.Templates['templates/register.hbs'],
	ERROR_CLASS 	= 'error';

function RegisterView() {

}

RegisterView.prototype.render = function() {

	this.$register = $( TEMPLATE({
		source: Config.embed.host + Config.embed.path
	}) );

	this._setupInteractionEvents();
	return this.$register;
};

RegisterView.prototype.show = function() {
	this.$register.velocity({
		opacity: 1
	}, {
		duration: 200,
		easing: 'ease-out',
		begin: function() {
			this.$register.addClass('animating');
		}.bind( this ),
		complete: function() {
			this.$register.removeClass('animating');
			this.$register.addClass('active');
		}.bind( this )
	});
};

RegisterView.prototype.hide = function() {
	this.$register.velocity({
		opacity: 0
	}, {
		duration: 200,
		easing: 'ease-in',
		begin: function() {
			this.$register.addClass('animating');
		}.bind( this ),
		complete: function() {
			this.$register.removeClass('animating');
			this.$register.removeClass('active');
		}.bind( this )
	});
};

RegisterView.prototype.isEmailValid = function() {
	var value = this.$register.find('.columns-register-email-input input').val(),
		re = /\S+@\S+\.\S+/;

	return re.test( value );
};

RegisterView.prototype.setEmailError = function( error ) {
	var $field = this.$register.find('.columns-register-email-input');

	$field.removeClass( ERROR_CLASS );

	setTimeout(function() {
		if ( error ) {
			// Remove and add again so we
			// ensure a shake occurs
			$field.addClass( ERROR_CLASS );
		}
	}, 0);
}

RegisterView.prototype._setupInteractionEvents = function() {

	// Listen to taps on the register button
	this.$register.find('.columns-register-button').on( 'click', this._onRegistrationTap.bind( this ) );
};

RegisterView.prototype._onRegistrationTap = function( event ) {

	if ( this.isEmailValid() ) {
		this.setEmailError( false );
		this._onRegistrationSuccess();
	} else {
		this.setEmailError( true );
	}
};

RegisterView.prototype._onRegistrationSuccess = function() {

	this.hide();

	ColumnsEvent.send( 'Columns.RegisterView.DidRegisterWithSuccess', {
		registerView: this
	});
};

module.exports = RegisterView;