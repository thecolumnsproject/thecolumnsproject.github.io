$(function() {
	
	// Focus on the query box when the page loads
	// $("#query").focus();

	// performSearch('startup tax incorp');

	$("#query-form").submit(function () {
		var query = $(this).find("#query").val();
		performSearch(query);
		return false;
	});

	function performSearch(query) {
		$.get(config.api.host + '/columns?query=' + query, function(data) {
			// $("#results").append(JSON.stringify(data));
			createTable();
			parseResults(data);
		});
	}

	function parseResults(results) {
		// $table = createTable();

		results.columns.unshift(results.type);
		for(column in results.columns) {
			addColumnAtIndex(results.columns[column].replace('_', ' '), column);
		}

		// results.columns.forEach(function(column, index) {
		// 	addColumnAtIndex(column, index);
		// });

		// results.entities.forEach(function(entity, index) {

		// });

		for(entity in results.entities) {
			entity = results.entities[entity];
			for(column in entity.columns) {
				addRowForEntityAndColumn(entity, entity.columns[column]);
			}
		}
	}

	function createTable() {
		var table = Columns.Templates['templates/table.hbs'];
		$("#results").empty();
		$("#results").append(table());
	}

	function addColumnAtIndex(column, index) {
		index = parseInt(index);
		var template = Columns.Templates['templates/column.hbs'];
		var html = template({name: column});
		if ($("#results-table th").length - 1 > index) {
			$("#results-table th").get[index].before(html);
		} else {
			$("#results-table thead tr").append(html);
		}
	}

	function addRowForEntityAndColumn(entity, column) {
		for(row in column.rows) {
			var row = column.rows[row];

			// Get the column number for this data
			var haystack = $("#results-table th").get();
			var needle = $("#results-table th:contains(" + column.name.replace('_', ' ') + ")").get()[0];
			var position = haystack.indexOf(needle); 

			// Does a row for this entity and timestamp exist?
			var key = row.timestamp + " " + entity.name;
			var $rows = $("#results-table tbody tr");
			if ($rows.length > 0) {
				var numRows = $rows.length;
				$rows.each(function(index, value) {
					var $columns = $(value).find('td');
					var tempKey = $($columns[0]).data('value') + " " + $($columns[1]).data('value');

					// If yes, add the new data to the same row
					if (tempKey && tempKey == key) {
						var pos = position + 1;
						$(value).find('td:nth-child(' + pos + ')').text(row.value);
						return false;
					}

					if (index == numRows-1) {
						newRow();
					}
				});
			} else {
				newRow();
			}

			function newRow() {
				values = [];
					for (var i = 0 ; i < $("#results-table th").length ; i++) {
						switch (i) {
							case 0:
								values.push({
									value: row.timestamp,
									formatted_value: new Date(row.timestamp).getFullYear()
								});
								break;
							case 1:
								values.push({
									value: entity.name,
									formatted_value: entity.name
								});
								break;
							case position:
								values.push({
									value: row.value,
									formatted_value: row.value
								});
								break;
							default:
								values.push({
									value: '',
									formatted_value: ''
								});
						}
					}
					var html = Columns.Templates['templates/row.hbs'];
					$("#results-table tbody").append(html({values: values}));
			}
		}
	}

});