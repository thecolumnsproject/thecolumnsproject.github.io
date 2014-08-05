var uploadedDataArrayBuffer;
var uploadedData = [];
var headers = [];
var deletedColumns = [];
var entityColumn;
var dateColumn;
var filterColumns = [];
var MAX_ROWS = 1000;

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

		parseFile(files[0]);
		return false;
	}

	$("#upload-data").change(function() {
		parseFile(this.files[0]);
	});

	function parseFile(file) {
		// Set up the view
		$(".welcome").removeClass('active');
		$(".searching-data").removeClass('active');
		$(".error-data").removeClass('active');
		$(".no-data").removeClass('active');
		$(".uploading-data").addClass('active');

		var reader = new FileReader();
		reader.onloadend = function(e) {
			uploadedDataArrayBuffer = e.target.result;
		};
		reader.readAsArrayBuffer(file);

		Papa.parse(file, {
			worker: true,
			step: function(row) {
				if (row.meta.lines > MAX_ROWS) {
					// console.log(row);
				}
				uploadedData.push(row.data[0]);
				// updateProgress(row.meta.lines);
			},
			complete: function(results) {
				if (uploadedData.length > MAX_ROWS) {
					$(".welcome").addClass('active');
					$(".uploading-data").removeClass('active');
					uploadedData = [];
					alert("Shoot, we can't handle that much data. Mind choosing a file with less than 1000 rows?");
				} else {
					renderData(uploadedData);
				}
			}
		});
	}

	function updateProgress(total) {
		var percentage = uploadedData.length / total;
		var newHeight = percentage * $(".uploading-data .progress").height();
		$(".uploading-data .full").css('height', newHeight = 'px');
	}

	function renderData(data) {
		
		// Set up the table
		var table = Columns.Templates['templates/table.hbs'];
		$("#results").addClass('upload');
		$("#results .table-container").empty();
		$("#results .table-container").append(table({editable: true}));

		headers = data[0];

		// Render the rows
		for (index in data) {

			if (index >= 100) break;

			var row = data[index];

			// Render the header row
			if (index == 0) {
				for (i in row) {
					var item = row[i];
					var template = Columns.Templates['templates/column-editable.hbs'];
					var html = template({name: item, original_column: i});
					$("#results-table thead tr").append(html);
				}
			} else {
				var values = [];
				for (i in row) {
					var value = row[i];
					values.push({
						value: value,
						formatted_value: value,
						original_column: i
					});
				}
				var html = Columns.Templates['templates/row.hbs'];
				$("#results-table tbody").append(html({values: values}));
			}
		}

		$(".uploading-data").removeClass('active');
		updatePublishButton('publish');

		// Handle editing of column names
		$('#results-table th input[type="text"]').blur(function() {
			var index = $(this).parent('th').data('original-column');
			// uploadedData[0][index] = $(this).val();
			headers[index] = $(this).val();

		});

		// Handle deleting columns
		$('#results-table th .delete-column').click(function() {
			var index = $('#results-table th .delete-column').index(this);
			var columnIndex = index + 1;

			// Remove displayed columns
			$("#results-table tr th:nth-child(" + columnIndex + ")").remove();
			$("#results-table tr td:nth-child(" + columnIndex + ")").remove();

			// Remove actual data
			// for (row in uploadedData) {
			// 	uploadedData[row].splice(index, 1);
			// }

			var deletionIndex = $(this).parents('th').data('original-column');
			deletedColumns.push(deletionIndex);

			// headers.splice(index, 1);

			updateEntityColumn();
			updateDateColumn();
		});

		// Handle setting the entity type
		$('#results-table th .entity-type').change(function() {
			var index = $('#results-table th .entity-type').index(this);
			var rowIndex = index + 1;
			if (this.checked) {
				entityColumn = $(this).parents('th').data('original-column');
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
				dateColumn = $(this).parents('th').data('original-column');
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

		// Handle setting filter columns
		$('#results-table th .filter').change(function() {
			var index = $('#results-table th .filter').index(this);
			var rowIndex = index + 1;
			if (this.checked) {
				filterColumns.push($(this).parents('th').data('original-column'));
				$("#results-table tr td:nth-child(" + rowIndex + ")").addClass('filter');
			} else {
				var indexToRemove = filterColumns.indexOf($(this).parents('th').data('original-column'));
				filterColumns.splice(indexToRemove, 1);
				$("#results-table tr td:nth-child(" + rowIndex + ")").removeClass('filter');
			}
		});

		function updateEntityColumn() {
			var $checkbox = $('#results-table th .entity-type:checked');
			if (index > -1) {
				entityColumn = $checkbox.parents('th').data('original-column');
			} else {
				entityColumn = null
			}
		}

		function updateDateColumn() {
			var $checkbox = $('#results-table th .date:checked');
			if (index > -1) {
				dateColumn = $checkbox.parents('th').data('original-column');;
			} else {
				dateColumn = null
			}
		}
	}

	$("#publish").click(function() {

		if (entityColumn == null || entityColumn == undefined) {
			alert('Please set an entity type');
			return;
		}

		updatePublishButton('publishing');
		var uploadWorker = new Worker('javascripts/workers/upload-data.js');
		uploadWorker.onmessage = function(e) {
			console.log(e.data);
			data = JSON.parse(e.data);
			if (data['status'] == 'success') {
				updatePublishButton('published');
			} else {
				alert('Whoops, something went wrong. Mind uploading again?');
				updatePublishButton('publish');
			}

		};

		// uploadWorker.postMessage({
		// 	uploadedDataArrayBuffer: uploadedDataArrayBuffer
		// 	headers: headers,
		// 	deletedColumns: deletedColumns,
		// 	entityColumn: entityColumn,
		// 	dateColumn: dateColumn
		// }, [uploadedDataArrayBuffer]);

		uploadWorker.postMessage({
			uploadedData: uploadedData,
			headers: headers,
			deletedColumns: deletedColumns,
			entityColumn: entityColumn,
			dateColumn: dateColumn,
			filterColumns: filterColumns
		});

		// // Prepare the data for publish
		// var type = headers[entityColumn];
		// var date;
		// var fallbackDate = new Date();
		// var publishData = {
		// 	data: {
		// 		type: type
		// 	}
		// };
		// var entities = [];
		// var entityCount = 0;

		// for(index in uploadedData) {
		// 	console.log(index);
		// 	if (index == 0) continue;
		// 	row = uploadedData[index];
		// 	if (dateColumn != null && dateColumn != undefined) {
		// 		date = new Date(row[dateColumn]);
		// 	} else {
		// 		date = fallbackDate;
		// 	}

		// 	var data = {
		// 		name: row[entityColumn],
		// 		columns: []
		// 	}

		// 	var cellCount = 0;
		// 	for(i in row) {
		// 		if (i == dateColumn || i == entityColumn) continue;
		// 		if (deletedColumns.indexOf(parseInt(i)) > -1) continue;

		// 		var column = {
		// 			name: headers[i],
		// 			rows: [{
		// 				value: row[i],
		// 				timestamp: date,
		// 				identifiers: {}
		// 			}]
		// 		};
		// 		data.columns.push(column);
		// 		cellCount++;

		// 		if (row.length - deletedColumns.length - 1 == cellCount) {
		// 			entities.push(data);
		// 			entityCount++;

		// 			if (uploadedData.length - 1 == entityCount) {
		// 				publishData.data['entities'] = entities;
		// 				console.log(publishData);

		// 				$.post(config.api.host + '/columns', publishData, function(data) {
		// 					console.log(data);
		// 					if (data.status == 'success') {
		// 						updatePublishButton('published');
		// 					} else {
		// 						alert('Whoops, something went wrong. Mind uploading again?');
		// 					}
		// 				});
		// 			}
		// 		}
		// 	}
		// }


		// $("#results-table tbody tr").each(function(index, row) {
		// 	if (dateColumn != null && dateColumn != undefined) {
		// 		date = $(row).find('td:nth-child(' + (dateColumn + 1) + ')').data('value');
		// 	} else {
		// 		date = fallbackDate;
		// 	}

		// 	var data = {
		// 		name: $(row).find('td:nth-child(' + (entityColumn + 1)+ ')').data('value'),
		// 		columns: []
		// 	}

		// 	var cellCount = 0;
		// 	$(row).find("td").each(function(index, cell) {
		// 		if (index == dateColumn || index == entityColumn) return;

		// 		var column = {
		// 			name: columnNames[index],
		// 			rows: [{
		// 				value: $(cell).data('value'),
		// 				timestamp: date,
		// 				identifiers: {}
		// 			}]
		// 		};
		// 		data.columns.push(column);
		// 		cellCount++;

		// 		if ($(row).find("td").length - 1 == cellCount) {
		// 			entities.push(data);
		// 			entityCount++;

		// 			if ($("#results-table tbody tr").length == entityCount) {
		// 				publishData.data['entities'] = entities;


		// 				$.post(config.api.host + '/columns', publishData, function(data) {
		// 					console.log(data);
		// 					if (data.status == 'success') {
		// 						updatePublishButton('published');
		// 					} else {
		// 						alert('Whoops, something went wrong. Mind uploading again?');
		// 					}
		// 				});
		// 			}
		// 		}
		// 	});

		// });
	});

	function updatePublishButton(mode) {
		var $button = $("#publish");
		$button.removeClass('publish').removeClass('publishing').removeClass('published');
		$button.addClass(mode);
	}
});