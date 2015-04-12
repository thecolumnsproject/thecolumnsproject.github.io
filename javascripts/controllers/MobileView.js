var RegisterView 	= require('./RegisterView.js');
var ThanksView 		= require('./ThanksView.js');

function MobileView() {
	this.register = new RegisterView();
	this.thanks = new ThanksView();
}

MobileView.prototype.render = function() {

	$('#app').addClass('mobile');
	this.$mobile = $("#app.mobile");

	this.$mobile.append( this.register.render() );
	this.$mobile.append( this.thanks.render() );

	// this._setupAnalytics();
	// this._emitRender();

	return this.$mobile;
};

module.exports = MobileView;