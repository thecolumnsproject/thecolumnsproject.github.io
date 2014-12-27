Columns.styleData.components['margins'] = {
	title: 'Spacing',
	rows: [{
		items: [{
			kind: 'input',
			type: 'tel',
			canBeNegative: true,
			prependIcon: 'margin-top',
			appendControls: true,
			label: 'Top',
			property: {
				name:'margin-top'
			}
		}, {
			kind: 'input',
			type: 'tel',
			canBeNegative: true,
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
			canBeNegative: true,
			prependIcon: 'margin-left',
			appendControls: true,
			label: 'Left',
			property: {
				name:'margin-left'
			}
		}, {
			kind: 'input',
			type: 'tel',
			canBeNegative: true,
			prependIcon: 'margin-right',
			appendControls: true,
			label: 'Right',
			property: {
				name:'margin-right'
			}
		}]
	}]
};