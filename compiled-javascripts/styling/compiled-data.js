Columns.styleData.components['items'] = {
	title: 'Items',
	rows: [{
		items: [{
			kind: 'single-segmented-button',
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
			kind: 'single-segmented-button',
			label: 'Position',
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
Columns.styleData.components['margins'] = {
	title: 'Inner Spacing',
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
		}, {
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
Columns.styleData.components['text'] = {
	title: 'Text',
	rows: [{
		items: [{
			kind: 'input',
			type: 'tel',
			prependIcon: false,
			appendControls: true,
			label: 'Size',
			property: {
				name: 'font-size'
			}
		}, {
			kind: 'multiple-segmented-button',
			label: 'Style',
			buttons: [{
				property: {
					name: 'font-weight'
				},
				values: {
					active: 'bold',
					inactive: 'normal'
				},
				icon: 'bold'
			}, {
				property: {
					name:'font-style'
				},
				values: {
					active: 'italic',
					inactive: 'normal'
				},
				icon: 'italic'
			}, {
				property: {
					name:'text-decoration'
				},
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
			property: {
				name:'color'
			}
		}, {
			kind: 'single-segmented-button',
			label: 'Alignment',
			property: {
				name: 'text-align'
			},
			buttons: [{
				value: 'left',
				icon: 'text-align-left'
			}, {
				value: 'center',
				icon: 'text-align-center'
			}, {
				value: 'right',
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