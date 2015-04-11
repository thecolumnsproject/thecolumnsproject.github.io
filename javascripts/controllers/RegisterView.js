var TEMPLATE = Columns.Templates['templates/register.hbs'];

function RegisterView() {

}

RegisterView.prototype.render = function() {

	this.$render = $( TEMPLATE() );
	return this.$render;
};

module.exports = RegisterView;