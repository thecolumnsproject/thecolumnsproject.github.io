var uploadedData;
var deletedColumns = [];
var entityColumn;
var dateColumn;

$(function() {

	// Handle dropped file on window
	var doc = document.documentElement;
	doc.ondragover = function(e) {
		return false;
	}
	doc.ondragend = function(e) {
		return false;
	}
	doc.ondrop = function(e) {
			
		var files = e.dataTransfer.files;
		// var formData = new FormData();
		// formData.append('file', files[0]);

		Papa.parse(files[0], {
			complete: function(results) {
				uploadedData = results.data;
				renderData(uploadedData);
			}
		});

		return false;
	}

	function renderData(data) {
		
		// Set up the table
		var table = Columns.Templates['templates/table.hbs'];
		$("#results").empty().addClass('upload');
		$("#results").append(table({editable: true}));

		// Render the rows
		for (index in data) {

			if (index >= 100) break;

			var row = data[index];

			// Render the header row
			if (index == 0) {
				for (i in row) {
					var item = row[i];
					var template = Columns.Templates['templates/column-editable.hbs'];
					var html = template({name: item});
					$("#results-table thead tr").append(html);
				}
			} else {
				var values = [];
				for (i in row) {
					var value = row[i];
					values.push({
						value: value,
						formatted_value: value
					});
				}
				var html = Columns.Templates['templates/row.hbs'];
				$("#results-table tbody").append(html({values: values}));
			}
		}

		// Handle editing of column names
		$('#results-table th input').blur(function() {
			var index = $('#results-table th input').index(this);
			uploadedData[0][index] = $(this).val();
		});

		// Handle deleting columns
		$('#results-table th .delete-column').click(function() {
			var index = $('#results-table th .delete-column').index(this);
			var columnIndex = index + 1;
			deletedColumns.push(index);

			// Remove displayed columns
			$("#results-table tr th:nth-child(" + columnIndex + ")").remove();
			$("#results-table tr td:nth-child(" + columnIndex + ")").remove();

			// Remove actual data
			for (row in uploadedData) {
				uploadedData[row].splice(index, 1);
			}
		});

		// Handle setting the entity type
		$('#results-table th .entity-type').change(function() {
			var index = $('#results-table th .entity-type').index(this);
			var rowIndex = index + 1;
			if (this.checked) {
				entityColumn = index;
				$("#results-table tr td:nth-child(" + rowIndex + ")").addClass('entity');

				// Uncheck all the other boxes
				$('#results-table th .entity-type').each(function(index, box) {
					boxIndex = $('#results-table th .entity-type').index(box) + 1;
					if (boxIndex != rowIndex) {
						$(box).prop('checked', false);
						$("#results-table tr td:nth-child(" + boxIndex + ")").removeClass('entity');
					}
				});
			} else {
				entityColumn = null;
				$("#results-table tr td:nth-child(" + rowIndex + ")").removeClass('entity');
			}
		});

		// Handle setting the entity type
		$('#results-table th .date').change(function() {
			var index = $('#results-table th .date').index(this);
			var rowIndex = index + 1;
			if (this.checked) {
				dateColumn = index;
				$("#results-table tr td:nth-child(" + rowIndex + ")").addClass('date');

				// Uncheck all the other boxes
				$('#results-table th .date').each(function(index, box) {
					boxIndex = $('#results-table th .date').index(box) + 1;
					if (boxIndex != rowIndex) {
						$(box).prop('checked', false);
						$("#results-table tr td:nth-child(" + boxIndex + ")").removeClass('date');
					}
				});
			} else {
				dateColumn = null;
				$("#results-table tr td:nth-child(" + rowIndex + ")").removeClass('date');
			}
		});
	}

	$("#publish").click(function() {

		if (entityColumn == null || entityColumn == undefined) {
			alert('Please set an entity type');
			return;
		}

		// Prepare the data for publish
		var columnNames = uploadedData[0];
		var type = columnNames[entityColumn];
		var date;
		var fallbackDate = new Date();
		var publishData = {
			data: {
				type: type
			}
		};
		var entities = [];
		var entityCount = 0;
		$("#results-table tbody tr").each(function(index, row) {
			if (dateColumn != null && dateColumn != undefined) {
				date = $(row).find('td:nth-child(' + (dateColumn + 1) + ')').data('value');
			} else {
				date = fallbackDate;
			}

			var data = {
				name: $(row).find('td:nth-child(' + (entityColumn + 1)+ ')').data('value'),
				columns: []
			}

			var cellCount = 0;
			$(row).find("td").each(function(index, cell) {
				if (index == dateColumn || index == entityColumn) return;

				var column = {
					name: columnNames[index],
					rows: [{
						value: $(cell).data('value'),
						timestamp: date,
						identifiers: {}
					}]
				};
				data.columns.push(column);
				cellCount++;

				if ($(row).find("td").length - 1 == cellCount) {
					entities.push(data);
					entityCount++;

					if ($("#results-table tbody tr").length == entityCount) {
						publishData.data['entities'] = entities;

						$.post(config.api.host + '/columns', publishData, function(data) {
							console.log(data);
						});
					}
				}
			});

		});

	});
});