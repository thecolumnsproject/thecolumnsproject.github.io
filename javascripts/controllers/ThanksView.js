var TEMPLATE = Columns.Templates['templates/thanks.hbs'];

function ThanksView() {

}

ThanksView.prototype.render = function() {

	this.$thanks = $( TEMPLATE() );
	return this.$thanks;
};

module.exports = ThanksView;