$(function() {
	
	// Focus on the query box when the page loads
	// $("#query").focus();

	$("#query-form").submit(function () {
		var query = $(this).find("#query").val();
		performSearch(query);
		return false;
	});

	function performSearch(query) {
		$.get('http://localhost:8080/api/columns?query=' + query, function(data) {
			// $("#results").append(JSON.stringify(data));
			parseResults(data);
		});
	}

	function parseResults(results) {
		// $table = createTable();

		for(column in results.columns) {
			addColumnAtIndex(results.columns[column], column);
		}

		// results.columns.forEach(function(column, index) {
		// 	addColumnAtIndex(column, index);
		// });

		// results.entities.forEach(function(entity, index) {

		// });

		for(entity in results.entities) {
			entity = results.entities[entity];
			for(column in entity.columns) {
				addRowForEntityAndColumnAndData(entity, column, entity.columns[column]);
			}
		}
	}

	function createTable() {
		var table = Columns.Templates['templates/table.hbs'];
		$("#results").append(table());
	}
	createTable();

	function addColumnAtIndex(column, index) {
		index = parseInt(index);
		var template = Columns.Templates['templates/column.hbs'];
		var html = template({name: column});
		if ($("#results-table th").length - 2 > index) {
			$("#results-table th").get[index].before(html);
		} else {
			$("#results-table thead tr").append(html);
		}
	}

	function addRowForEntityAndColumnAndData(entity, column, data) {
		for(datum in data) {

			// Get the column number for this data
			var haystack = $("#results-table th").get();
			var needle = $("#results-table th:contains(" + column + ")").get()[0];
			var position = haystack.indexOf(needle);

			// Does a row for this entity and timestamp exist?
			var key = data[datum].timestamp + " " + entity.name;
			var $rows = $("#results-table tbody tr");
			if ($rows.length > 0) {
				var numRows = $rows.length;
				$rows.each(function(index, value) {
					var $columns = $(value).find('td');
					var tempKey = $($columns[0]).text() + " " + $($columns[1]).text();

					// If yes, add the new data to the same row
					if (tempKey && tempKey == key) {
						var pos = position + 1;
						$(value).find('td:nth-child(' + pos + ')').text(data[datum].value);
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
								values.push(data[datum].timestamp);
								break;
							case 1:
								values.push(entity.name);
								break;
							case position:
								values.push(data[datum].value);
								break;
							default:
								values.push('');
						}
					}
					var html = Columns.Templates['templates/row.hbs'];
					$("#results-table tbody").append(html({values: values}));
			}
		}
	}

});