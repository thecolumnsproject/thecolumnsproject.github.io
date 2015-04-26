this["Columns"] = this["Columns"] || {};
this["Columns"]["Templates"] = this["Columns"]["Templates"] || {};

this["Columns"]["Templates"]["templates/analytics.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<!-- Google Analytics -->\n<script async src='//www.google-analytics.com/analytics.js'></script>\n<script>	\nwindow.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;\nga('create', 'UA-58560399-1', 'auto');\nga('send', 'pageview');\n</script>\n<!-- End Google Analytics -->\n\n<!-- start Mixpanel -->\n<script type=\"text/javascript\">(function(f,b){if(!b.__SV){var a,e,i,g;window.mixpanel=b;b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(\".\");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;\"undefined\"!==typeof d?c=b[d]=[]:d=\"mixpanel\";c.people=c.people||[];c.toString=function(b){var a=\"mixpanel\";\"mixpanel\"!==d&&(a+=\".\"+d);b||(a+=\" (stub)\");return a};c.people.toString=function(){return c.toString(1)+\".people (stub)\"};i=\"disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.track_charge people.clear_charges people.delete_user\".split(\" \");\nfor(g=0;g<i.length;g++)f(c,i[g]);b._i.push([a,e,d])};b.__SV=1.2;a=f.createElement(\"script\");a.type=\"text/javascript\";a.async=!0;a.src=\"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js\";e=f.getElementsByTagName(\"script\")[0];e.parentNode.insertBefore(a,e)}})(document,window.mixpanel||[]);\nmixpanel.init(\"a1a91a179d62492f1aa76b6fb878249e\");</script>\n<!-- end Mixpanel -->";
  });

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

this["Columns"]["Templates"]["templates/desktop.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<header class='columns-header'>\n	<nav class='columns-header-nav'>\n		<div class=\"columns-header-nav-home\">\n			<i class=\"icon-columns columns-header-nav-icon\"></i>\n			The Columns Project\n		</div>\n		<div class=\"columns-header-nav-embed\">\n			Embed Table\n		</div>\n	</nav>\n</header>\n\n<div id=\"upload\" class='active'>\n	<div class=\"upload-copy\">\n		<div class=\"upload-copy-logo\">\n			<i class=\"icon-columns\"></i>\n			<img src=\"/images/loading-white.gif\" alt=\"\" width='32'>\n		</div>\n		<div class=\"upload-copy-text\">\n			<h2>The Columns Project</h2>\n			<p>\n			Beautiful, embeddable tables.<br />\n			For a more knowledgeable web.\n			</p>\n			<p class='columns-upload-message'></p>\n			<button class=\"columns-button button-large columns-upload-button\">Upload a .csv</button>\n			<input type=\"file\" accept='text/csv' style=\"display:none;\"/>\n		</div>\n	</div>\n	<div class=\"upload-preview\">\n		<div class=\"upload-preview-screen newspaper\">\n			\n\n			<div class=\"upload-preview-screen-header animate\"></div>\n			<div class=\"upload-preview-screen-title animate\"></div>\n			<div class=\"upload-preview-screen-data-tagline animate\"></div>\n			<script type=\"text/javascript\" src=\"";
  if (helper = helpers.source) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.source); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" data-table-id=\"";
  if (helper = helpers.table) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.table); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" data-force-mobile='true' data-sample='true' async></script>\n			<div class=\"upload-preview-screen-paragraph animate\"></div>\n			<div class=\"upload-preview-screen-paragraph animate\"></div>\n			<div class=\"upload-preview-screen-paragraph animate\"></div>\n		</div>\n\n		<script type=\"text/javascript\">\n\n			var screens = ['newspaper', 'journal', 'blog'],\n				currentScreenIndex = 0,\n				$screen = $('.upload-preview-screen .animate');\n\n			setInterval(function() {\n				switchScreen();\n			}, 6000);\n\n			function switchScreen( screen ) {\n\n				$screen.velocity({\n					opacity: 0\n				}, {\n					complete: function( elements ) {\n						$screen.parent().removeClass( currentScreen() );\n						$screen.parent().addClass( nextScreen() );\n						currentScreenIndex = nextScreenIndex();\n					}\n				}).velocity({\n					opacity: 1\n				});\n			}\n\n			function currentScreen() {\n				return screens[ currentScreenIndex ];\n			}\n\n			function nextScreen() {\n				return screens[ nextScreenIndex() ];\n			}\n\n			function nextScreenIndex() {\n				if ( currentScreenIndex >= screens.length - 1 ) {\n					return 0;\n				} else {\n					return currentScreenIndex + 1\n				}\n			}\n\n		</script>\n	</div>\n</div>\n\n<div id=\"editor\">\n	<section id=\"columns\">\n		<h2>Columns</h2>\n		\n	</section>\n	<section id=\"layout\">\n\n	</section>\n	<section id=\"styling\">\n		<h2>Styling</h2>\n		\n	</section>\n</div>";
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
  var buffer = "", stack1, helper, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "inactive";
  }

function program3(depth0,data) {
  
  
  return "selected";
  }

  buffer += "<div class=\"layout-column ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.active), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n	<i class=\"icon-text layout-column-icon\"></i>\n	";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n</div>";
  return buffer;
  });

this["Columns"]["Templates"]["templates/layout/columns.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"layout-columns\">\n\n</div>";
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
    + "\" data-preview='true' async></script>\n	<img src=\"/images/paragraph.png\">\n	<img src=\"/images/paragraph_1.png\">\n	<!-- <img src=\"/images/paragraph.png\"> -->\n</div>";
  return buffer;
  });

this["Columns"]["Templates"]["templates/layout/row-group.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;

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

  buffer += "<div class=\"layout-template-row-group\n			";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.placeholder), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"\n			";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.layout), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.style), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "></div>\n				";
  return buffer;
  });

this["Columns"]["Templates"]["templates/layout/row-value.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, helper, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "placeholder";
  }

  buffer += " <span class=\"layout-template-row-value \n			";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.placeholder), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"\n			";
  stack1 = self.invokePartial(partials.style, 'style', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n			";
  if (helper = helpers.data) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.data); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
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
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  buffer += "<div class=\"layout-template\">\n	<div class=\"layout-template-row master\">\n		\n	</div>\n</div>";
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

this["Columns"]["Templates"]["templates/register.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div id=\"register\" class='active'>\n\n	<div class=\"columns-register-copy\">\n		<i class=\"icon-columns\"></i>\n		<h2>The Columns Project</h2>\n		<p>\n		Beautiful, embeddable tables.<br />\n		For a more knowledgeable web.\n		</p>\n	</div>\n\n	<div class=\"columns-register-embed\">\n		<script type=\"text/javascript\" src=\"";
  if (helper = helpers.source) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.source); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" data-table-id=\"";
  if (helper = helpers.table) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.table); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" data-sample=\"true\" async></script>\n	</div>\n\n	<div class=\"columns-register-form\">\n		<div class=\"columns-register-email-input\">\n			<input type='email' name='email' placeholder='Email Address' />\n		</div>\n		<div class=\"columns-register-button columns-button button-large button-secondary\">\n			I'm Ready to Embed\n		</div>\n	</div>\n\n</div>";
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

this["Columns"]["Templates"]["templates/styling/component-section-row.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"style-component-section-row\">\n\n</div>";
  });

this["Columns"]["Templates"]["templates/styling/component-section.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"style-component-section\">\n	<div class=\"style-component-section-title\">\n		";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n	</div>\n	<div class=\"style-component-section-rows\">\n	</div>\n</div>";
  return buffer;
  });

this["Columns"]["Templates"]["templates/styling/component.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"style-component\">\n	<div class=\"style-component-header\">\n		<i class=\"icon-";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " style-component-header-icon\"></i>\n		<span class=\"style-component-header-title\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\n	</div>\n	<div class=\"style-component-body\">\n		\n		\n	</div>\n</div>";
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
  buffer += "\n			<div class=\"style-component-section-row-input-prepend\">\n				<i class=\"icon-";
  if (helper = helpers.prependIcon) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.prependIcon); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"></i>\n			</div>\n		";
  return buffer;
  }

function program7(depth0,data) {
  
  
  return "\n			<div class=\"style-component-section-row-input-append\">\n				<button class='increment'>\n					<i class=\"icon-caret-up\"></i>\n				</button>\n				<button class='decrement'>\n					<i class=\"icon-caret-down\"></i>\n				</button>\n			</div>\n		";
  }

  buffer += "<div class=\"style-component-section-row-item\">\n	<div class=\"style-component-section-row-input ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.prependIcon), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.appendControls), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n		";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.prependIcon), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		<input type='";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "' data-property='";
  if (helper = helpers.property) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.property); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "' value='";
  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "' data-negative='";
  if (helper = helpers.canBeNegative) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.canBeNegative); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "'/>\n		";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.appendControls), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</div>\n	<label class='style-component-section-row-item-label'>";
  if (helper = helpers.label) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.label); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</label>\n</div>";
  return buffer;
  });

this["Columns"]["Templates"]["templates/styling/components/multiple-segmented-button.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n			<button data-property='";
  if (helper = helpers.property) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.property); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "'\n					data-active-value='"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.values)),stack1 == null || stack1 === false ? stack1 : stack1.active)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "'\n					data-inactive-value='"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.values)),stack1 == null || stack1 === false ? stack1 : stack1.inactive)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "'\n					class=\"";
  stack1 = (helper = helpers.ifIsCurrentValue || (depth0 && depth0.ifIsCurrentValue),options={hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data},helper ? helper.call(depth0, ((stack1 = (depth0 && depth0.values)),stack1 == null || stack1 === false ? stack1 : stack1.active), ((stack1 = (depth0 && depth0.values)),stack1 == null || stack1 === false ? stack1 : stack1.current), options) : helperMissing.call(depth0, "ifIsCurrentValue", ((stack1 = (depth0 && depth0.values)),stack1 == null || stack1 === false ? stack1 : stack1.active), ((stack1 = (depth0 && depth0.values)),stack1 == null || stack1 === false ? stack1 : stack1.current), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n				";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.icon), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.text), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</button>\n		";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "active";
  }

function program4(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "<i class=\"icon-";
  if (helper = helpers.icon) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.icon); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"></i>";
  return buffer;
  }

function program6(depth0,data) {
  
  
  return "<span></span>";
  }

  buffer += "<div class=\"style-component-section-row-item\">\n	<div class=\"style-component-section-row-multiple-segmented-button\">\n		";
  options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}
  if (helper = helpers.buttons) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.buttons); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.buttons) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</div>\n	<label class='style-component-section-row-item-label'>";
  if (helper = helpers.label) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.label); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</label>\n</div>";
  return buffer;
  });

this["Columns"]["Templates"]["templates/styling/components/segmented-button.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "data-property='";
  if (helper = helpers.property) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.property); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "'";
  return buffer;
  }

function program3(depth0,data,depth1) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n			<button data-value='";
  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "' class=\"";
  stack1 = (helper = helpers.ifIsCurrentValue || (depth0 && depth0.ifIsCurrentValue),options={hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.value), (depth1 && depth1.value), options) : helperMissing.call(depth0, "ifIsCurrentValue", (depth0 && depth0.value), (depth1 && depth1.value), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n				";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.icon), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.text), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</button>\n		";
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

  buffer += "<div class=\"style-component-section-row-item\">\n	<div class=\"style-component-section-row-segmented-button ";
  if (helper = helpers.kind) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.kind); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.property), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n		";
  options={hash:{},inverse:self.noop,fn:self.programWithDepth(3, program3, data, depth0),data:data}
  if (helper = helpers.buttons) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.buttons); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.buttons) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(3, program3, data, depth0),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</div>\n	<label class='style-component-section-row-item-label'>";
  if (helper = helpers.label) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.label); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</label>\n</div>";
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

this["Columns"]["Templates"]["templates/thanks.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"thanks\">\n\n	<div class=\"columns-thanks-header\">\n		<i class=\"icon-columns\"></i>\n		<h2>Thanks!</h2>\n		<p>\n		Right now it's only possible to<br />\n		embed tables from a desktop.\n		</p>\n		<img src=\"/images/designer_desktops@2x.png\" width='288'>\n	</div>\n\n	<div class=\"columns-thanks-message\">\n		We've emailed a friendly reminder<br />\n		to launch The Columns Project<br />\n		when you're back at your desk.\n	</div>\n\n</div>";
  });