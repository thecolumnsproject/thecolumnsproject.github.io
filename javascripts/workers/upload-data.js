importScripts('../config.js'); 

self.onmessage = function(e) {
	var _self = self;
	var CHUNK_SIZE = 10000;
	var chunksSent = 0;

	// Papa.parse(e.data.uploadedDataArrayBuffer, {
	// 	step: function(row) {
	// 		_self.postMessage(row);
	// 	},
	// 	complete: function(results) {
	// 		_self.postMessage(results.data);
	// 	},
	// 	error: function(err, file, inputElem, reason) {
	// 		_self.postMessage(err);
	// 	}
	// });

	var uploadedData = e.data.uploadedData,
		headers = e.data.headers,
		deletedColumns = e.data.deletedColumns,
		entityColumn = e.data.entityColumn,
		dateColumn = e.data.dateColumn,
		filterColumns = e.data.filterColumns


	// Prepare the data for publish
	var type = headers[entityColumn];
	var date;
	var fallbackDate = new Date();
	var publishData = {
		data: {
			type: type
		}
	};
	var entities = [];
	var entitiesHash = {};
	var entityCount = 0;
	var cellCountReductionForDateColumn = dateColumn == null || dateColumn == undefined ? 0 : 1;
	var identifierColumns = filterColumns.map(function(index) {
		return headers[index]
	});
	var finalHeaders = [];

	for (h in headers) {
		if (h == dateColumn || h == entityColumn) continue;
		if (deletedColumns.indexOf(parseInt(h)) > -1) continue;
		if (filterColumns.indexOf(parseInt(h)) > -1) continue;
		finalHeaders.push(headers[h]);
	}
	publishData.data['columns'] = finalHeaders;

	for(index in uploadedData) {
		if (index == 0) continue;

		row = uploadedData[index];
		if (dateColumn != null && dateColumn != undefined) {
			date = new Date(row[dateColumn]);
			date = date.toISOString();
		} else {
			date = null;
		}

		var entityName = row[entityColumn];
		if ( !(entityName in entitiesHash) ) {
			entitiesHash[entityName] = {};
		}

		// var data = {
		// 	name: row[entityColumn],
		// 	columns: []
		// }
		var columnsHash = entitiesHash[entityName];
		var cellCount = 0;
		for(i in row) {	
			if (i == dateColumn || i == entityColumn) continue;
			if (deletedColumns.indexOf(parseInt(i)) > -1) continue;
			if (filterColumns.indexOf(parseInt(i)) > -1) continue;

			var columnName = headers[i];
			if ( !(columnName in columnsHash) ) {
				columnsHash[columnName] = [];
			}

			var data = {
				value: row[i],
				timestamp: date,
				identifiers: {}
			};

			for(idIndex in identifierColumns) {
				data.identifiers[identifierColumns[idIndex]] = row[filterColumns[idIndex]];
			}

			columnsHash[columnName].push(data);

			// var column = {
			// 	name: headers[i],
			// 	rows: [{
			// 		value: row[i],
			// 		timestamp: date,
			// 		identifiers: {}
			// 	}]
			// };

			// data.columns.push(column);
			cellCount++;

			if (row.length - deletedColumns.length - 1 - cellCountReductionForDateColumn - identifierColumns.length == cellCount) {
				// entities.push(data);
				entitiesHash[entityName] = columnsHash;
				entityCount++;

				// if (entityCount >= CHUNK_SIZE) {
				// 	publishData.data['entities'] = entities;
				// 	upload(publishData);
				// 	entities = [];
				// 	entityCount = 0;
				// }

				if (uploadedData.length - 1 == entityCount) {
					for (eName in entitiesHash) {
						var clmns = [];
						for (cName in entitiesHash[eName]) {
							clmns.push({
								name: cName,
								rows: entitiesHash[eName][cName]
							});
						}
						entities.push({
							name: eName,
							columns: clmns
						});
					}

					publishData.data['entities'] = entities;
					// self.postMessage(publishData);
					upload(publishData);
				}
			}
		}
	}

	// if (entityCount < CHUNK_SIZE) {
	// 	publishData.data['entities'] = entities;
	// 	upload(publishData);
	// }

	function upload(data) {
		var http = new XMLHttpRequest();
		http.open('POST', config.api.host + '/columns', true);
		http.setRequestHeader("Content-type", "application/json");
		http.onreadystatechange = function() {
			if (http.readyState == 4) {
		    	_self.postMessage(http.responseText);
			}
		}
		http.send(JSON.stringify(data));
		// chunksSent++;
		// _self.postMessage(chunksSent);

		// $.post(config.api.host + '/columns', publishData, function(data) {
		// 	self.postMessage(data);
		// 	// if (data.status == 'success') {
		// 	// 	updatePublishButton('published');
		// 	// } else {
		// 	// 	alert('Whoops, something went wrong. Mind uploading again?');
		// 	// }
		// });
	}
};