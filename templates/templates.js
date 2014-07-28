this["Columns"] = this["Columns"] || {};
this["Columns"]["Templates"] = this["Columns"]["Templates"] || {};

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
    + "'>\n	<i class=\"icon-x delete-column\"></i>\n	<input type='checkbox' name='entity-type' class='entity-type'><label for='entity-type'>This is the entity type</label>\n	<input type='checkbox' name='date' class='date'><label for='date'>This is the date</label>\n</th>";
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

this["Columns"]["Templates"]["templates/row.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<td data-value='"
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
  buffer += "\n</tr>";
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