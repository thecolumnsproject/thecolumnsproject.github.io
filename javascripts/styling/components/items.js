Columns.styleData.components['items'] = {
	title: 'Items',
	rows: [{
		items: [{
			kind: 'segmented-button',
			label: 'Layout',
			property: {
				name:'flex-direction'
			},
			buttons: [{
				value: 'row',
				icon: 'layout-horizontal'
			}, {
				value: 'column',
				icon: 'layout-vertical'
			}]
		}, {
			kind: 'segmented-button',
			label: 'Alignment',
			property: {
				name:'align-items'
			},
			buttons: [{
				value: 'flex-start',
				icon: 'position-left'
			}, {
				value: 'center',
				icon: 'position-center'
			}, {
				value: 'flex-end',
				icon: 'position-right'
			}]
		}]
	}]
}