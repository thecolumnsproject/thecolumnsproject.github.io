Columns.styleData.components['margins'] = {
	title: 'Spacing',
	rows: [{
		items: [{
			kind: 'input',
			type: 'tel',
			prependIcon: 'margin-top',
			appendControls: true,
			label: 'Top',
			property: {
				name:'margin-top'
			}
		}, {
			kind: 'input',
			type: 'tel',
			prependIcon: 'margin-bottom',
			appendControls: true,
			label: 'Bottom',
			property: {
				name:'margin-bottom'
			}
		}]
	}, {
		items: [{
			kind: 'input',
			type: 'tel',
			prependIcon: 'margin-left',
			appendControls: true,
			label: 'Left',
			property: {
				name:'margin-left'
			}
		}, {
			kind: 'input',
			type: 'tel',
			prependIcon: 'margin-right',
			appendControls: true,
			label: 'Right',
			property: {
				name:'margin-right'
			}
		}]
	}]
};