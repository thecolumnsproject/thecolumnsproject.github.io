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
Columns.styleData.components['margins'] = {
	title: 'Inner Spacing',
	rows: [{
		items: [{
			kind: 'input',
			type: 'tel',
			prependIcon: 'margin-top',
			appendControls: true,
			label: 'Top',
			property: 'margin-top'
		}, {
			kind: 'input',
			type: 'tel',
			prependIcon: 'margin-bottom',
			appendControls: true,
			label: 'Bottom',
			property: 'margin-bottom'
		}, {
			kind: 'input',
			type: 'tel',
			prependIcon: 'margin-left',
			appendControls: true,
			label: 'Left',
			property: 'margin-left'
		}, {
			kind: 'input',
			type: 'tel',
			prependIcon: 'margin-right',
			appendControls: true,
			label: 'Right',
			property: 'margin-right'
		}]
	}]
};
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
Columns.styleData.types = {
	text: [
		Columns.styleData.components['text'],
		Columns.styleData.components['margins']
	],
	group: [
		Columns.styleData.components['items'],
	]
};