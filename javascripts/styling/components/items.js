Columns.styleData.components['items'] = {
	title: 'Items',
	rows: [{
		items: [{
			kind: 'single-segmented-button',
			label: 'Layout',
			property: 'flex-direction',
			buttons: [{
				property: 'flex-direction',
				values: {
					active: 'row',
					inactive: 'row'
				},
				icon: 'layout-horizontal'
			}, {
				property: 'flex-direction',
				values: {
					active: 'column',
					inactive: 'column'
				},
				icon: 'layout-vertical'
			}]
		}, {
			kind: 'single-segmented-button',
			label: 'Position',
			property: 'align-items',
			buttons: [{
				property: 'align-items',
				values: {
					active: 'flex-start',
					inactive: 'flex-start'
				},
				icon: 'position-left'
			}, {
				property: 'align-items',
				values: {
					active: 'center',
					inactive: 'center'
				},
				icon: 'position-center'
			}, {
				property: 'align-items',
				values: {
					active: 'flex-end',
					inactive: 'flex-end'
				},
				icon: 'position-right'
			}]
		}]
	}]
}