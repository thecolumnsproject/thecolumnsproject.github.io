Columns.styleData.components['text'] = {
	title: 'Text',
	rows: [{
		items: [{
			kind: 'input',
			type: 'tel',
			prependIcon: false,
			appendControls: true,
			label: 'Size',
			property: 'font-size'
		}, {
			kind: 'multiple-segmented-button',
			label: 'Style',
			buttons: [{
				property: 'font-weight',
				values: {
					active: 'bold',
					inactive: 'normal'
				},
				icon: 'bold'
			}, {
				property: 'font-style',
				values: {
					active: 'italic',
					inactive: 'normal'
				},
				icon: 'italic'
			}, {
				property: 'text-decoration',
				values: {
					active: 'underline',
					inactive: 'none'
				},
				icon: 'underline'
			}]
		}]
	}, {
		items: [{
			kind: 'input',
			type: 'color',
			prependIcon: false,
			appendControls: false,
			label: 'Color',
			property: 'color',
		}, {
			kind: 'single-segmented-button',
			label: 'Alignment',
			buttons: [{
				property: 'text-align',
				values: {
					active: 'left',
					inactive: 'left'
				},
				icon: 'text-align-left'
			}, {
				property: 'text-align',
				values: {
					active: 'center',
					inactive: 'center'
				},
				icon: 'text-align-center'
			}, {
				property: 'text-align',
				values: {
					active: 'right',
					inactive: 'right'
				},
				icon: 'text-align-right'
			}]
		}]
	}]
};