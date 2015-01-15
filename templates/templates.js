this["Columns"] = this["Columns"] || {};
this["Columns"]["Templates"] = this["Columns"]["Templates"] || {};

this["Columns"]["Templates"]["templates/cell.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<td data-value='";
  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "' data-original-column='";
  if (helper = helpers.original_column) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.original_column); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "'>";
  if (helper = helpers.formatted_value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.formatted_value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>";
  return buffer;
  });

this["Columns"]["Templates"]["templates/column-editable.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<th class='editable' data-original-column='";
  if (helper = helpers.original_column) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.original_column); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "'>\n	<input type='text' value='";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "'><br />\n	<i class=\"icon-x delete-column\"></i>\n	<input type='checkbox' name='entity-type' class='entity-type'><label for='entity-type'>This is the entity type</label><br />\n	<input type='checkbox' name='date' class='date'><label for='date'>This is the date</label><br />\n	<input type='checkbox' name='filter' class='filter'><label for='date'>This is a filter column</label>\n</th>";
  return buffer;
  });

this["Columns"]["Templates"]["templates/column.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<th>";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</th>";
  return buffer;
  });

this["Columns"]["Templates"]["templates/embed-details-panel/body.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "value=\"";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "value=\"";
  if (helper = helpers.source) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.source); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "value=\"";
  if (helper = helpers.source_url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.source_url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"";
  return buffer;
  }

  buffer += "<div class=\"columns-panel-input-area\">\n	<div class=\"columns-panel-input-icon\">\n		<i class=\"icon-title\"></i>\n	</div>\n	<div class=\"columns-panel-input\">\n		<label class=\"columns-panel-input-label\">Table Title</label>\n		<input type=\"text\" placeholder=\"My Table\" data-property=\"title\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.title), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n	</div>\n</div>\n<div class=\"columns-panel-input-group\">\n	<div class=\"columns-panel-input-area\">\n		<div class=\"columns-panel-input-icon\">\n			<i class=\"icon-source\"></i>\n		</div>\n		<div class=\"columns-panel-input\">\n			<label class=\"columns-panel-input-label\">Data Source</label>\n			<input type=\"text\" placeholder=\"The Data Authority\" data-property=\"source\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.source), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n		</div>\n	</div>\n	<div class=\"columns-panel-input-area\">\n		<div class=\"columns-panel-input-icon\">\n			<i class=\"icon-link\"></i>\n		</div>\n		<div class=\"columns-panel-input\">\n			<label class=\"columns-panel-input-label\">Source URL</label>\n			<input type=\"url\" placeholder=\"http://thedataauthority.com\" data-property=\"source_url\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.source_url), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n		</div>\n	</div>\n</div>\n<div class=\"columns-panel-textarea-area\" id=\"embed-code\">\n	<div class=\"columns-panel-textarea-icon\">\n		<i class=\"icon-code\"></i>\n	</div>\n	<div class=\"columns-panel-input\">\n		<label class=\"columns-panel-textarea-label\">Embed Code</label>\n		<textarea readonly ><script type=\"text/javascript\" src=\"";
  if (helper = helpers.url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" data-table-id=\"";
  if (helper = helpers.table_id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.table_id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" async></script></textarea>\n		<button class=\"columns-button button-small button-tertiary columns-copy-embed-url\">\n			Copy Embed Code\n		</button>\n	</div>\n</div>";
  return buffer;
  });

this["Columns"]["Templates"]["templates/layout/column.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<div class=\"layout-column active\">\n	<i class=\"icon-text layout-column-icon\"></i>\n	"
    + escapeExpression((helper = helpers.parseData || (depth0 && depth0.parseData),options={hash:{},data:data},helper ? helper.call(depth0, depth0, options) : helperMissing.call(depth0, "parseData", depth0, options)))
    + "\n</div>";
  return buffer;
  });

this["Columns"]["Templates"]["templates/layout/columns.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		";
  stack1 = self.invokePartial(partials['layout-column'], 'layout-column', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	";
  return buffer;
  }

  buffer += "<div class=\"layout-columns\">\n	";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.columns), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  });

this["Columns"]["Templates"]["templates/layout/layout.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\ndata-";
  if (helper = helpers.property) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.property); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "='";
  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "' layout-";
  if (helper = helpers.property) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.property); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "='";
  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "'\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.layout), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["Columns"]["Templates"]["templates/layout/preview.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"layout-table-preview\">\n	<img src=\"/images/paragraph_1.png\">\n	<!-- // <script type=\"text/javascript\" src=\"https://thecolumnsproject.github.io/public/embed-table.js\" data-preview=\"true\" async></script> -->\n	<script type=\"text/javascript\" src=\"";
  if (helper = helpers.source) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.source); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" data-preview=\"true\" async></script>\n	<img src=\"/images/paragraph.png\">\n	<img src=\"/images/paragraph_1.png\">\n	<!-- <img src=\"/images/paragraph.png\"> -->\n</div>";
  return buffer;
  });

this["Columns"]["Templates"]["templates/layout/row-group.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, helper, options, self=this, helperMissing=helpers.helperMissing, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  
  return "placeholder";
  }

function program3(depth0,data) {
  
  var stack1;
  stack1 = self.invokePartial(partials.layout, 'layout', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }

function program5(depth0,data) {
  
  var stack1;
  stack1 = self.invokePartial(partials.style, 'style', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }

function program7(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n				";
  stack1 = (helper = helpers.ifIsGroup || (depth0 && depth0.ifIsGroup),options={hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.type), options) : helperMissing.call(depth0, "ifIsGroup", (depth0 && depth0.type), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				";
  stack1 = (helper = helpers.ifIsSingle || (depth0 && depth0.ifIsSingle),options={hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.type), options) : helperMissing.call(depth0, "ifIsSingle", (depth0 && depth0.type), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			";
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n					";
  stack1 = self.invokePartial(partials['layout-row-group'], 'layout-row-group', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				";
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n					";
  stack1 = self.invokePartial(partials['layout-row-value'], 'layout-row-value', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				";
  return buffer;
  }

  buffer += "<div class=\"layout-template-row-group\n			";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.placeholder), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"\n			";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.layout), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.style), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n			";
  options={hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data}
  if (helper = helpers.values) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.values); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.values) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>	";
  return buffer;
  });

this["Columns"]["Templates"]["templates/layout/row-value.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, helper, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "placeholder";
  }

  buffer += " <span class=\"layout-template-row-value \n			";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.placeholder), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"\n			";
  stack1 = self.invokePartial(partials.style, 'style', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n			"
    + escapeExpression((helper = helpers.parseData || (depth0 && depth0.parseData),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.data), options) : helperMissing.call(depth0, "parseData", (depth0 && depth0.data), options)))
    + "\n</span>";
  return buffer;
  });

this["Columns"]["Templates"]["templates/layout/style.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  if (helper = helpers.property) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.property); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":";
  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ";";
  return buffer;
  }

  buffer += "style='";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.style), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'";
  return buffer;
  });

this["Columns"]["Templates"]["templates/layout/template.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;


  buffer += "<div class=\"layout-template\">\n	<div class=\"layout-template-row master\">\n		";
  stack1 = self.invokePartial(partials['layout-row-group'], 'layout-row-group', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "	\n	</div>\n</div>";
  return buffer;
  });

this["Columns"]["Templates"]["templates/panels/panel.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"columns-panel-container\" id=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n	<div class=\"columns-panel-blocker\"></div>\n	<div class=\"columns-panel\">\n		<div class=\"columns-panel-header\">\n			<div class=\"columns-panel-header-close-button\">\n				<i class=\"icon-close\"></i> \n	 	 	</div>\n	 	 	<span class=\"columns-panel-header-title\">\n	 	 		"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.header)),stack1 == null || stack1 === false ? stack1 : stack1.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n	 	 	</span>\n	 	</div>\n		<div class=\"columns-panel-body\">\n			";
  if (helper = helpers.body) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.body); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</div>\n		<div class=\"columns-panel-footer\">\n			";
  if (helper = helpers.footer) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.footer); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</div>\n	</div>\n</div>";
  return buffer;
  });

this["Columns"]["Templates"]["templates/row.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<td class='"
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "' data-value='"
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "' data-original-column='"
    + escapeExpression(((stack1 = (depth0 && depth0.original_column)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "'>"
    + escapeExpression(((stack1 = (depth0 && depth0.formatted_value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n	";
  return buffer;
  }

  buffer += "<tr>\n	";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.values), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " \n</tr>";
  return buffer;
  });

this["Columns"]["Templates"]["templates/styling/component.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, helper, options, self=this, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n		<div class=\"style-component-section\">\n			<div class=\"style-component-section-title\">\n				";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n			</div>\n			<div class=\"style-component-section-rows\">\n				";
  options={hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data}
  if (helper = helpers.rows) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.rows); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.rows) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</div>\n		</div>\n		";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n					<div class=\"style-component-section-row\">\n						";
  options={hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data}
  if (helper = helpers.items) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.items); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.items) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					</div>\n				";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n							<div class=\"style-component-section-row-item\">\n								";
  stack1 = (helper = helpers.ifIsInput || (depth0 && depth0.ifIsInput),options={hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.kind), options) : helperMissing.call(depth0, "ifIsInput", (depth0 && depth0.kind), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n								";
  stack1 = (helper = helpers.ifIsSingleSegmentedButton || (depth0 && depth0.ifIsSingleSegmentedButton),options={hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.kind), options) : helperMissing.call(depth0, "ifIsSingleSegmentedButton", (depth0 && depth0.kind), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n								";
  stack1 = (helper = helpers.ifIsMultipleSegmentedButton || (depth0 && depth0.ifIsMultipleSegmentedButton),options={hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.kind), options) : helperMissing.call(depth0, "ifIsMultipleSegmentedButton", (depth0 && depth0.kind), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n								<label class='style-component-section-row-item-label'>";
  if (helper = helpers.label) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.label); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</label>\n							</div>\n						";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n									";
  stack1 = self.invokePartial(partials.input, 'input', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n								";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n									";
  stack1 = self.invokePartial(partials['single-segmented-button'], 'single-segmented-button', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n								";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n									";
  stack1 = self.invokePartial(partials['multiple-segmented-button'], 'multiple-segmented-button', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n								";
  return buffer;
  }

  buffer += "<div class=\"style-component\" data-component-index='";
  if (helper = helpers.index) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.index); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "'>\n	<div class=\"style-component-header\">\n		<i class=\"icon-";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " style-component-header-icon\"></i>\n		<span class=\"style-component-header-title\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\n	</div>\n	<div class=\"style-component-body\">\n		";
  options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}
  if (helper = helpers.styles) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.styles); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.styles) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		\n	</div>\n</div>";
  return buffer;
  });

this["Columns"]["Templates"]["templates/styling/components/input.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "prepend";
  }

function program3(depth0,data) {
  
  
  return "append";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n		<div class=\"style-component-section-row-input-prepend\">\n			<i class=\"icon-";
  if (helper = helpers.prependIcon) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.prependIcon); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"></i>\n		</div>\n	";
  return buffer;
  }

function program7(depth0,data) {
  
  
  return "\n		<div class=\"style-component-section-row-input-append\">\n			<button class='increment'>\n				<i class=\"icon-caret-up\"></i>\n			</button>\n			<button class='decrement'>\n				<i class=\"icon-caret-down\"></i>\n			</button>\n		</div>\n	";
  }

  buffer += "<div class=\"style-component-section-row-input ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.prependIcon), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.appendControls), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.prependIcon), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	<input type=\"";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" data-property='"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.property)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "' value='"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.property)),stack1 == null || stack1 === false ? stack1 : stack1.current_value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "' data-negative='";
  if (helper = helpers.canBeNegative) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.canBeNegative); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "'/>\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.appendControls), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  });

this["Columns"]["Templates"]["templates/styling/components/multiple-segmented-button.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "data-property='"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.property)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "'";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n		<button data-property='"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.property)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "'\n				data-active-value='"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.values)),stack1 == null || stack1 === false ? stack1 : stack1.active)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "'\n				data-inactive-value='"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.values)),stack1 == null || stack1 === false ? stack1 : stack1.inactive)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "'\n				class=\"";
  stack1 = (helper = helpers.ifIsCurrentValue || (depth0 && depth0.ifIsCurrentValue),options={hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data},helper ? helper.call(depth0, ((stack1 = (depth0 && depth0.values)),stack1 == null || stack1 === false ? stack1 : stack1.active), ((stack1 = (depth0 && depth0.property)),stack1 == null || stack1 === false ? stack1 : stack1.current_value), options) : helperMissing.call(depth0, "ifIsCurrentValue", ((stack1 = (depth0 && depth0.values)),stack1 == null || stack1 === false ? stack1 : stack1.active), ((stack1 = (depth0 && depth0.property)),stack1 == null || stack1 === false ? stack1 : stack1.current_value), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n			";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.icon), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.text), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</button>\n	";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "active";
  }

function program6(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "<i class=\"icon-";
  if (helper = helpers.icon) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.icon); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"></i>";
  return buffer;
  }

function program8(depth0,data) {
  
  
  return "<span></span>";
  }

  buffer += "<div class=\"style-component-section-row-segmentedButton ";
  if (helper = helpers.kind) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.kind); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.property), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n	";
  options={hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data}
  if (helper = helpers.buttons) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.buttons); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.buttons) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  });

this["Columns"]["Templates"]["templates/styling/components/single-segmented-button.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "data-property='"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.property)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "'";
  return buffer;
  }

function program3(depth0,data,depth1) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n		<button data-value='";
  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "' class=\"";
  stack1 = (helper = helpers.ifIsCurrentValue || (depth0 && depth0.ifIsCurrentValue),options={hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.value), ((stack1 = (depth1 && depth1.property)),stack1 == null || stack1 === false ? stack1 : stack1.current_value), options) : helperMissing.call(depth0, "ifIsCurrentValue", (depth0 && depth0.value), ((stack1 = (depth1 && depth1.property)),stack1 == null || stack1 === false ? stack1 : stack1.current_value), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n			";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.icon), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.text), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</button>\n	";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "active";
  }

function program6(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "<i class=\"icon-";
  if (helper = helpers.icon) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.icon); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"></i>";
  return buffer;
  }

function program8(depth0,data) {
  
  
  return "<span></span>";
  }

  buffer += "<div class=\"style-component-section-row-segmentedButton ";
  if (helper = helpers.kind) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.kind); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.property), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n	";
  options={hash:{},inverse:self.noop,fn:self.programWithDepth(3, program3, data, depth0),data:data}
  if (helper = helpers.buttons) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.buttons); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.buttons) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(3, program3, data, depth0),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  });

this["Columns"]["Templates"]["templates/styling/types/text.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"style-component-section\">\n	\n</div>";
  });

this["Columns"]["Templates"]["templates/table.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  
  return "editable";
  }

  buffer += "<table id='results-table' class='";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.editable), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'>\n	<thead>\n		<tr></tr>\n	</thead>\n	<tbody></tbody>\n</table>";
  return buffer;
  });