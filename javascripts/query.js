$(function() {
	
	// Focus on the query box when the page loads
	// $("#query").focus();

	// performSearch('startup tax incorp');

	var lastEntityIndex = 0;
	var lastRowIndex = 0;
	var currentPage = 0;
	var isGettingResults = false;
	var numOfIdentifierColumns = 0;
	var MAX_ROWS = 100;
	var displayedRows = 0;
	var addedRows = 0; // Keep track of how many rows are added each time an entity's column is rendered in case we need to resume later mid-way
	var masterColumns;
	var masterEntities;
	var masterType;

	$("#query-form").submit(function () {
		var query = $(this).find("#query").val();
		if (query == '') {
			$(".welcome").addClass('active');
			$(".searching-data").removeClass('active');
			removeTable();
		} else {
			$(".welcome").removeClass('active');
			$(".searching-data").addClass('active');
			performSearch(query);
		}
		$(".error-data").removeClass('active');
		$(".no-data").removeClass('active');
		return false;
	});

	// Catch when we've scrolled far enough to get more data
	$(window).scroll(function(e) {
		if (isGettingResults || $("#results").hasClass('upload') || $("#results-table tr").length == 0) return;
		var windowHeight = $(window).height();
		var windowScrollPosition = $(window).scrollTop();
		var lastRowPosition = $("#results-table tr").last().position().top;
		// console.log([windowHeight, windowScrollPosition, lastRowPosition].join(', '));

		if ( $("#results-table tr").last().position().top - $(window).height() - $(window).scrollTop() < 100) {
			isGettingResults = true;

			// If we have cached data left to render
			if (lastEntityIndex < masterEntities.length) {
				displayedRows = 0;
				parseEntities();
			} else {
				displayedRows = 0;
				lastEntityIndex = 0;
				lastRowIndex = 0;
				getMoreResults($("#query").val());
			}
		}
	});

	function performSearch(query) {
		$.get(config.api.host + '/columns?query=' + query + "&page=0", function(data) {
			// $("#results").append(JSON.stringify(data));
			console.log(data);
			createTable();
			lastEntityIndex = 0;
			var results = data.data;
			$(".searching-data").removeClass('active');
			if (data.status == 'success') {
				$(".error-data").removeClass('active');

				if (data.data == null) {
					$(".no-data").addClass('active');
					removeTable();
				} else {
					$(".no-data").removeClass('active');
					// parseResults(data.data);
					masterEntities = results.entities;
					masterType = results.type;
					masterColumns = results.columns;
					parseColumns();
					parseEntities();
				}

			} else {
				$(".error-data").addClass('active');
				removeTable();
			}
		});
	}

	function getMoreResults(query) {
		$('.searching-data').addClass('active additional');
		$(".error-data").removeClass('active additional');
		$(".no-data").removeClass('active additional');
		$.get(config.api.host + '/columns?query=' + query + "&page=" + (currentPage + 1), function(data) {
			// $("#results").append(JSON.stringify(data));
			console.log(data);
			lastEntityIndex = 0;
			// isGettingResults = false;
			var results = data.data;			
			$('.searching-data').removeClass('active additional');
			if (data.status == 'success') {
				if (data.data != null) {
					currentPage++;
					masterEntities = results.entities;
					masterType = results.type;
					parseEntities();
				}
			} else {
				$(".error-data").addClass('active additional');
			}
		});
	}

	function parseColumns() {
		var columns = masterColumns;
		columns.unshift(masterType);
		columns.unshift('date');
		for(column in columns) {
			addColumnAtIndex(columns[column].replace(/_/g, ' '), column);
		}
	}

	function parseEntities() {
		var time = performance.now();
		var entities = masterEntities;
		for(var i = lastEntityIndex; i < entities.length; i++) {

			// if (entity > lastEntityIndex + 100) {
			// 	lastEntityIndex = entity;
			// 	break;
			// }

			entity = entities[i];
			if (entity.columns.length == 0) {
				addEntityForType(entity, masterType);
			} else {
				for(column in entity.columns) {
					addRowsForEntityAndColumn(entity, entity.columns[column]);
				}
			}
		}
		console.log(performance.now() - time);
		isGettingResults = false;
	}

	// function parseResults(results) {
	// 	// $table = createTable();

	// 	results.columns.unshift(results.type);
	// 	results.columns.unshift('date');
	// 	for(column in results.columns) {
	// 		addColumnAtIndex(results.columns[column].replace(/_/g, ' '), column);
	// 	}

	// 	// results.columns.forEach(function(column, index) {
	// 	// 	addColumnAtIndex(column, index);
	// 	// });

	// 	// results.entities.forEach(function(entity, index) {

	// 	// });

	// 	for(entity in results.entities) {

	// 		if (entity > lastEntityIndex + 100) {
	// 			lastEntityIndex = entity;
	// 			break;
	// 		}

	// 		entity = results.entities[entity];
	// 		if (entity.columns.length == 0) {
	// 			addEntityForType(entity, results.type);
	// 		} else {
	// 			for(column in entity.columns) {
	// 				if (displayedRows > MAX_ROWS) break;
	// 				addRowsForEntityAndColumn(entity, entity.columns[column]);
	// 			}
	// 		}
	// 	}
	// }

	function createTable() {
		removeTable();
		var table = Columns.Templates['templates/table.hbs'];
		$("#results .table-container").append(table());
	}

	function removeTable() {
		$("#results .table-container").empty();
		$("#results").removeClass('upload');
	}

	function addColumnAtIndex(column, index) {
		index = parseInt(index);

		// Add the column header
		var template = Columns.Templates['templates/column.hbs'];
		var html = template({name: column});
		if ($("#results-table th").length > index) {
			$($("#results-table th").get(index)).before(html);
		} else {
			$("#results-table thead tr").append(html);
		}
	}

	function addIdentifierColumn(column) {

		// Determine whether this column has already been added
		if (indexForColumnName(column) > -1) {
			return;
		}

		// Figure out which index to use
		var index = numOfIdentifierColumns + 2; // Add one for date column and one for entity column
		numOfIdentifierColumns++;

		// Add the header column
		addColumnAtIndex(formattedName(column), index);

		// Add empty cells for any rows without this column
		var template = Columns.Templates['templates/cell.hbs'];
		var cell = template({
						value: '',
						formatted_value: '',
						original_column: ''
					});
		var $rows = $("#results-table tbody tr");
			if ($rows.length > 0) {
				$rows.each(function(index, row) {
					if ($(row).find('td').length > index) {
						$($(row).find('td').get(index)).before(cell);
					} else {
						$(row).append(cell);
					}
				});
			}
		}

	function addEntityForType(entity, type) {
		var position = indexForColumnName(type);
		values = [];
		for (var i = 0 ; i < $("#results-table th").length ; i++) {
			switch (i) {
				case position:
					values.push({
						value: entity.name,
						formatted_value: formattedName(entity.name),
						original_column: i
					});
					break;
				default:
					values.push({
						value: '',
						formatted_value: '',
						original_column: i
					});
			}
		}
		var html = Columns.Templates['templates/row.hbs'];
		$("#results-table tbody").append(html({values: values}));
	}

	function addRowsForEntityAndColumn(entity, column) {

		var $rows = $("#results-table tbody tr");
		for(var r = lastRowIndex; r < column.rows.length; r++) {

			var row = column.rows[r];
			var shouldExit = false;

			// Create any new identifier columns that are needed
			var keyString = '';
			if (row.identifier_columns != '') {
				for (idIndex in row.identifier_columns.split(',')) {
					var columnName = row.identifier_columns.split(',')[idIndex];
					addIdentifierColumn(columnName);
					keyString += ' ' + formattedName(columnName);
				}
			}

			// Get the column number for this data
			var position = indexForColumnName(column.name);

			// Does a row for this entity and timestamp exist?
			var key = row.timestamp + " " + entity.name + keyString;
			if ($rows.length > 0) {
				var numRows = $rows.length;
				$rows.each(function(index, value) {
					var $columns = $(value).find('td');
					var tempKey = $($columns[0]).data('value') + " " + $($columns[1]).data('value');
					if (row.identifier_columns != '') {
						for (idIndex in row.identifier_columns.split(',')) {
							var cName = row.identifier_columns.split(',')[idIndex];;
							var idIndex = indexForColumnName(cName);
							tempKey += ' ' + $($columns[idIndex]).data('value');
						}
					}

					// If yes, add the new data to the same row
					if (tempKey && tempKey == key) {
						var pos = position + 1;
						if ($(value).find('td:nth-child(' + pos + ')').text() == '') {
							$(value).find('td:nth-child(' + pos + ')').text(row.value);
						} else {
							shouldExit = newRow() ? false : true;
						}
						return false;
					}

					if (index == numRows-1) {
						shouldExit = newRow() ? false : true;
					}
				});
			} else {
				shouldExit = newRow() ? false : true;
			}

			if (shouldExit) {
				return;
			}

			function newRow() {
				if (displayedRows >= MAX_ROWS) {

					// Remember which row we were on so we can resume later
					lastRowIndex = r;
					return false; // We did not successfully make a new row
				}

				values = [];
				for (var i = 0 ; i < $("#results-table th").length ; i++) {
					switch (i) {
						case 0:
							values.push({
								value: row.timestamp,
								formatted_value: new Date(row.timestamp).getFullYear(),
								original_column: i
							});
							break;
						case 1:
							values.push({
								value: entity.name,
								formatted_value: formattedName(entity.name),
								original_column: i
							});
							break;
						case position:
							values.push({
								value: row.value,
								formatted_value: row.value,
								original_column: i
							});
							break;
						default:
							values.push({
								value: '',
								formatted_value: '',
								original_column: i
							});
					}
				}

				// Add the identifier column data
				if (row.identifier_columns != '') {
					var cNames = row.identifier_columns.split(',');
					for (i in cNames) {
						var cName = cNames[i];;
						var idValue = row.identifier_values.split(',')[i];
						var idIndex = indexForColumnName(cName);
						values[idIndex] = {
							value: idValue,
							formatted_value: idValue,
							original_column: idIndex
						}
					}
				}

				var html = Columns.Templates['templates/row.hbs'];
				$("#results-table tbody").append(html({values: values}));
				console.log('Rendering row ' + displayedRows);

				displayedRows++;

				// Set last row back to zero so the next entity will start at its first row
				lastRowIndex = 0;
				return true; // We successfully made a new row
			}
		}

		// Incremement the number of entities we've successfully completed
		lastEntityIndex++;
	}

	function indexForColumnName(columnName) {
		var haystack = $("#results-table th").get();
		var needle = $("#results-table th:contains(" + columnName.replace(/_/g, ' ') + ")").get()[0];
		return haystack.indexOf(needle); 
	}

	function formattedName(name) {
		return name.replace(/_/g, ' '); 
	}

});