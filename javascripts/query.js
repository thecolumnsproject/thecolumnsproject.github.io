$(function() {
	
	// Focus on the query box when the page loads
	// $("#query").focus();

	// performSearch('startup tax incorp');

	var lastEntityIndex = 0;
	var currentPage = 0;
	var isGettingResults = false;

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
		console.log([windowHeight, windowScrollPosition, lastRowPosition].join(', '));

		if ( $("#results-table tr").last().position().top - $(window).height() - $(window).scrollTop() < 100) {
			isGettingResults = true;
			getMoreResults($("#query").val());
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
					parseColumns(results.columns, results.type);
					parseEntities(results.entities, results.type);
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
		$.get(config.api.host + '/columns?query=' + query + "&page=" + (currentPage + 1), function(data) {
			// $("#results").append(JSON.stringify(data));
			console.log(data);
			lastEntityIndex = 0;
			isGettingResults = false;
			var results = data.data;			
			$('.searching-data').removeClass('active additional');
			if (data.status == 'success' && data.data != null) {
				$(".no-data").removeClass('active');
				currentPage++;
				parseEntities(results.entities, results.type);
			} else {
				$(".error-data").addClass('active additional');
			}
		});
	}

	function parseColumns(columns, type) {
		columns.unshift(type);
		columns.unshift('date');
		for(column in columns) {
			addColumnAtIndex(columns[column].replace(/ /g, '_'), column);
		}
	}

	function parseEntities(entities, type) {
		for(entity in entities) {

			if (entity > lastEntityIndex + 100) {
				lastEntityIndex = entity;
				break;
			}

			entity = entities[entity];
			if (entity.columns.length == 0) {
				addEntityForType(entity, type);
			} else {
				for(column in entity.columns) {
					addRowForEntityAndColumn(entity, entity.columns[column]);
				}
			}
		}
	}

	function parseResults(results) {
		// $table = createTable();

		results.columns.unshift(results.type);
		results.columns.unshift('date');
		for(column in results.columns) {
			addColumnAtIndex(results.columns[column].replace('_', ' '), column);
		}

		// results.columns.forEach(function(column, index) {
		// 	addColumnAtIndex(column, index);
		// });

		// results.entities.forEach(function(entity, index) {

		// });

		for(entity in results.entities) {

			if (entity > lastEntityIndex + 100) {
				lastEntityIndex = entity;
				break;
			}

			entity = results.entities[entity];
			if (entity.columns.length == 0) {
				addEntityForType(entity, results.type);
			} else {
				for(column in entity.columns) {
					addRowForEntityAndColumn(entity, entity.columns[column]);
				}
			}
		}
	}

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
		var template = Columns.Templates['templates/column.hbs'];
		var html = template({name: column});
		if ($("#results-table th").length > index) {
			$("#results-table th").get[index].before(html);
		} else {
			$("#results-table thead tr").append(html);
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

	function addRowForEntityAndColumn(entity, column) {
		for(row in column.rows) {
			var row = column.rows[row];

			// Get the column number for this data
			var position = indexForColumnName(column.name);

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
					var html = Columns.Templates['templates/row.hbs'];
					$("#results-table tbody").append(html({values: values}));
			}
		}
	}

	function indexForColumnName(columnName) {
		var haystack = $("#results-table th").get();
		var needle = $("#results-table th:contains(" + columnName.replace('_', ' ') + ")").get()[0];
		return haystack.indexOf(needle); 
	}

	function formattedName(name) {
		return name.replace('_', ' ');
	}

});