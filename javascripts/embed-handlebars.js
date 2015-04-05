// Setup necessary handlebars templates and helpers
// Handlebars.registerPartial('row', Columns.EmbeddableTemplates['templates/embed-table/row.hbs']);
Handlebars.registerHelper('partial', function(name, ctx, hash) {
    var ps = Handlebars.partials;
    if(typeof ps[name] !== 'function')
        ps[name] = Handlebars.compile(ps[name]);
    return ps[name](ctx, hash);
});
Handlebars.registerPartial('group', Columns.EmbeddableTemplates['templates/embed-table/row-group.hbs']);
Handlebars.registerPartial('column', Columns.EmbeddableTemplates['templates/embed-table/row-value.hbs']);
Handlebars.registerPartial('footer', Columns.EmbeddableTemplates['templates/embed-table/footer.hbs']);
Handlebars.registerPartial('layout', Columns.EmbeddableTemplates['templates/embed-table/layout.hbs']);
Handlebars.registerPartial('style', Columns.EmbeddableTemplates['templates/embed-table/style.hbs']);

Handlebars.registerHelper('ifIsGroup', function(type, options) {
	return type == 'group' ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('ifIsSingle', function(type, options) {
	return type == 'single' ? options.fn(this) : options.inverse(this);
});

module.exports = Handlebars;