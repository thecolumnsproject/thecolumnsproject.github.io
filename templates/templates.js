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

this["Columns"]["Templates"]["templates/embed-table/body.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n						";
  stack1 = self.invokePartial(partials.row, 'row', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					";
  return buffer;
  }

  buffer += "<div class=\"columns-table-container\">\n			<section class=\"columns-table-wrapper\">\n				<div class=\"columns-table\">\n					";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.rows), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					\n\n				</div>\n				\n				";
  stack1 = self.invokePartial(partials.footer, 'footer', (depth0 && depth0.footer), helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</section>\n		</div>";
  return buffer;
  });

this["Columns"]["Templates"]["templates/embed-table/footer.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"columns-table-footer\">\n	<span class=\"columns-table-source\">\n		<i class=\"columns-table-footer-icon columns-verified-source-icon icon-circle-check-open\"></i>\n		";
  if (helper = helpers.source) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.source); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n	</span>\n	<span class=\"columns-table-items-count\">";
  if (helper = helpers.item_count) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.item_count); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " Items</span>\n	<i class=\"columns-table-footer-icon columns-logo icon-columns\"></i>\n</div>";
  return buffer;
  });

this["Columns"]["Templates"]["templates/embed-table/header.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"columns-table-header\">\n	<div class=\"columns-table-header-name\">\n		<span class=\"columns-table-title\">";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\n		<span class=\"columns-table-subtitle\">by ";
  if (helper = helpers.sort_by_column) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.sort_by_column); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\n	</div>\n	<div class=\"columns-table-header-controls\">\n		<button class=\"columns-table-header-button columns-table-filters-button\">\n			<i class=\"columns-table-header-icon icon-equalizer\"></i>\n		</button>\n		<button class=\"columns-table-header-button columns-table-close-button\">Close</button>\n	</div>\n</div>";
  return buffer;
  });

this["Columns"]["Templates"]["templates/embed-table/row-group.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n		";
  stack1 = (helper = helpers.ifIsGroup || (depth0 && depth0.ifIsGroup),options={hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.type), options) : helperMissing.call(depth0, "ifIsGroup", (depth0 && depth0.type), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		";
  stack1 = (helper = helpers.ifIsSingle || (depth0 && depth0.ifIsSingle),options={hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.type), options) : helperMissing.call(depth0, "ifIsSingle", (depth0 && depth0.type), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n			";
  stack1 = self.invokePartial(partials.group, 'group', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n			";
  stack1 = self.invokePartial(partials.column, 'column', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		";
  return buffer;
  }

  buffer += "<div class='row-group' data-direction='row'>\n	";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.values), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  });

this["Columns"]["Templates"]["templates/embed-table/row-layout.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;


  buffer += "<div class=\"columns-table-row\">\n		";
  stack1 = self.invokePartial(partials.group, 'group', (depth0 && depth0.layout), helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  });

this["Columns"]["Templates"]["templates/embed-table/row-value.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<span class=\"row-value\">"
    + escapeExpression(((stack1 = (depth0 && depth0.column)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>";
  return buffer;
  });

this["Columns"]["Templates"]["templates/embed-table/row.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var stack1, self=this;


  stack1 = self.invokePartial(partials.row_layout, 'row_layout', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
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