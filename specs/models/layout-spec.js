var ColumnsEvent 		= require('../../javascripts/models/ColumnsEvent.js');
var Layout 				= require('../../javascripts/models/Layout.js');
var TemplateView		= require('../../javascripts/controllers/TemplateView.js');
var TemplateGroupView	= require('../../javascripts/controllers/TemplateGroupView.js');
var DEFAULTS			= require('../../javascripts/styling/defaults.js');

jasmine.getFixtures().fixturesPath = 'specs/fixtures';

// var DEFAULTS = {
// 	styles: [
// 		[{
// 			property: 'color',
// 			value: '#3a3a3a'
// 		}],
// 		[{
// 			property: 'color',
// 			value: '#888'
// 		},{
// 			property: 'font-size',
// 			value: '14px'
// 		}, {
// 			property: 'margin-top',
// 			value: '4px'
// 		}],
// 		[{
// 			property: 'color',
// 			value: '#3a3a3a'
// 		},{
// 			property: 'font-size',
// 			value: '24px'
// 		}]	
// 	],
// 	layouts: [
// 		[{
// 			property: 'flex-direction',
// 			value: 'column'
// 		}, {
// 			property: 'align-items',
// 			value: 'flex-start'
// 		}]
// 	]
// };

describe('Layout', function() {

	afterEach(function() {
		ColumnsEvent.offAll();
	});

	describe('Initialization', function() {

		it('should initialize with a default layout given no items and no layout', function() {
			this.layout = new Layout();

			expect( this.layout.items ).toEqual( [] );
			expect( this.layout.model ).toEqual({
				type: 'group',
				style: [{
					property: 'padding',
					value: '12px'
				}],
				values: []
			});
		});

		it('should initialize with a default layout given 1 item and no layout', function() {
			var items = [ new Item({ title: "My Item" }) ];
			this.layout = new Layout({ items: items });

			expect( this.layout.items ).toEqual( items );
			expect( this.layout.model ).toEqual({
				type: 'group',
				style: [{
					property: 'padding',
					value: '12px'
				}],
				values: [{
					type: 'single',
					style: DEFAULTS.styles[ 0 ],
					data: items[ 0 ].unformattedTitle()
				}]
			});
		});

		it('should initialize with a default layout given 2 items and no layout', function() {
			var items = [ new Item({ title: "First Item" }), new Item({ title: "Second Item" }) ];
			this.layout = new Layout({ items: items });

			expect( this.layout.items ).toEqual( items );
			expect( this.layout.model ).toEqual({
				type: 'group',
				style: [{
					property: 'padding',
					value: '12px'
				}],
				values: [{
					type: 'group',
					layout: DEFAULTS.layouts[ 0 ],
					values: [{
						type: 'single',
						style: DEFAULTS.styles[ 0 ],
						data: items[ 0 ].unformattedTitle()
					},{
						type: 'single',
						data: items[ 1 ].unformattedTitle(),
						style: DEFAULTS.styles[ 1 ]
					}]
				}]
			});
		});

		it('should initialize with a default layout given 3 items and no layout', function() {
			var items = [
				new Item({ title: "First Item" }),
				new Item({ title: "Second Item" }),
				new Item({ title: "Third Item" })
			];
			this.layout = new Layout({ items: items });

			expect( this.layout.items ).toEqual( items );
			expect( this.layout.model ).toEqual({
				type: 'group',
				style: [{
					property: 'padding',
					value: '12px'
				}],
				values: [{
					type: 'group',
					layout: DEFAULTS.layouts[ 0 ],
					values: [{
						type: 'single',
						style: DEFAULTS.styles[ 0 ],
						data: items[ 0 ].unformattedTitle()
					},{
						type: 'single',
						data: items[ 1 ].unformattedTitle(),
						style: DEFAULTS.styles[ 1 ]
					}]
				}, {
					type: 'single',
					data: items[ 2 ].unformattedTitle(),
					style: DEFAULTS.styles[2]
				}]
			})
		});

		it('should initialize with a default layout given more than 3 items and no layout', function() {
			var items = [
				new Item({ title: "First Item" }),
				new Item({ title: "Second Item" }),
				new Item({ title: "Third Item" }),
				new Item({ title: "Fourth Item" }),
				new Item({ title: "Fifth Item" }),
			];
			this.layout = new Layout({ items: items });

			expect( this.layout.items ).toEqual( items );
			expect( this.layout.model ).toEqual({
				type: 'group',
				style: [{
					property: 'padding',
					value: '12px'
				}],
				values: [{
					type: 'group',
					layout: DEFAULTS.layouts[ 0 ],
					values: [{
						type: 'single',
						style: DEFAULTS.styles[ 0 ],
						data: items[ 0 ].unformattedTitle()
					},{
						type: 'single',
						data: items[ 1 ].unformattedTitle(),
						style: DEFAULTS.styles[ 1 ]
					}]
				}, {
					type: 'single',
					data: items[ 2 ].unformattedTitle(),
					style: DEFAULTS.styles[2]
				}]
			})
		});

		it('should initialize with given items and layout', function() {
			var items = [
				new Item({ title: "First Item" }),
				new Item({ title: "Second Item" }),
				new Item({ title: "Third Item" }),
				new Item({ title: "Fourth Item" }),
				new Item({ title: "Fifth Item" }),
			];
			var layout = {
				type: 'group',
				style: [{
					property: 'padding',
					value: '14px' // Changed from default for testing purposes
				}],
				values: [{
					type: 'group',
					layout: DEFAULTS.layouts[ 0 ],
					values: [{
						type: 'single',
						style: DEFAULTS.styles[ 0 ],
						data: items[ 0 ].unformattedTitle()
					},{
						type: 'single',
						data: items[ 1 ].unformattedTitle(),
						style: DEFAULTS.styles[ 1 ]
					}]
				}, {
					type: 'single',
					data: items[ 2 ].unformattedTitle(),
					style: DEFAULTS.styles[2]
				}]
			}

			this.layout = new Layout({
				items: items,
				layout: layout
			});

			expect( this.layout.items ).toEqual( items );
			expect( this.layout.model ).toEqual( layout );

		});

		it('should throw an error if any of the items are not of type Item', function() {
			var items = [ "hi" ];
			expect(function() {
				this.layout = new Layout({ items: items });
			}.bind( this )).toThrow("exception: all items must of type Item");
		});

	});

	describe('Updating', function() {

		beforeEach(function() {
			loadFixtures('template-with-styles.html');
			this.layout = new Layout();
			spyOn( this.layout, '_generateModelForTemplate' );
			spyOn( this.layout, '_emitChange' );
		});

		it('should generate a new layout model', function() {
			this.layout.update();
			expect( this.layout._generateModelForTemplate ).toHaveBeenCalledWith( $('.layout-template-row-group').first() );
			expect( this.layout._emitChange ).toHaveBeenCalled();
		});
	});

	describe('Querying the Layout', function() {

		beforeEach(function() {
			var items = [
				new Item({ title: "First Item" }),
				new Item({ title: "Second Item" }),
				new Item({ title: "Third Item" })
			];
			this.layout = new Layout({
				items: items,
				layout: {
					type: 'group',
					style: [{
						property: 'padding',
						value: '14px' // Changed from default for testing purposes
					}],
					values: [{
						type: 'group',
						layout: DEFAULTS.layouts[ 0 ],
						values: [{
							type: 'single',
							style: DEFAULTS.styles[ 0 ],
							data: items[ 0 ].unformattedTitle()
						},{
							type: 'single',
							data: items[ 1 ].unformattedTitle(),
							style: DEFAULTS.styles[ 1 ]
						}]
					}, {
						type: 'single',
						data: items[ 2 ].unformattedTitle()
					}]
				}
			});
		});

		it('should get the correct item styling', function() {
			expect( this.layout.getStyleForData("first_item") ).toEqual( DEFAULTS.styles[ 0 ] );
			expect( this.layout.getStyleForData("second_item") ).toEqual( DEFAULTS.styles[ 1 ] );
			expect( this.layout.getStyleForData("third_item") ).toBeNull();
			expect( this.layout.getStyleForData("fourth_item") ).toEqual([]);
		});
	});

	describe('Generating Layout Model', function() {

		beforeEach(function() {
			loadFixtures('template-with-styles.html');
			this.layout = new Layout();
		});

		it('should generate a layout model given the items and groups in the template', function() {
			var $row = $('.layout-template-row-group').first();
			expect( this.layout._generateModelForTemplate( $row ) ).toEqual({
				type: 'group',
				style: [{
					property: 'padding',
					value: '12px'
				}],
				layout: [{
					property: 'align-items',
					value: 'center'
				}, {
					property: 'flex-direction',
					value: 'row'
				}],
				values: [{
					type: 'group',
					style: [],
					layout: [{
						property: 'align-items',
						value: 'center'
					}, {
						property: 'flex-direction',
						value: 'column'
					}],
					values: [{
						type: 'single',
						style: [{
							property: 'font-size',
							value: '16px'
						}, {
							property: 'color',
							value: '#3a3a3a'
						}],
						data: 'my_item'
					}, {
						type: 'single',
						style: [{
							property: 'font-size',
							value: '12px'
						}, {
							property: 'color',
							value: '#888888'
						}, {
							property: 'margin-top',
							value: '6px'
						}],
						data: 'another_item'
					}]
				}, {
					type: 'single',
					style: [{
						property: 'font-size',
						value: '24px'
					}, {
						property: 'color',
						value: '#3a3a3a'
					}, {
						property: 'font-weight',
						value: 'bold'
					}],
					data: 'lonely_item'
				}]
			});
		});

		it('should not include inactive items', function() {
			loadFixtures('template-with-inactive-style.html');
			var $row = $('.layout-template-row-group').first();
			expect( this.layout._generateModelForTemplate( $row ) ).toEqual({
				type: 'group',
				style: [{
					property: 'padding',
					value: '12px'
				}],
				layout: [{
					property: 'align-items',
					value: 'center'
				}, {
					property: 'flex-direction',
					value: 'row'
				}],
				values: [{
					type: 'group',
					style: [],
					layout: [{
						property: 'align-items',
						value: 'center'
					}, {
						property: 'flex-direction',
						value: 'column'
					}],
					values: [{
						type: 'single',
						style: [{
							property: 'font-size',
							value: '16px'
						}, {
							property: 'color',
							value: '#3a3a3a'
						}],
						data: 'my_item'
					}, {
						type: 'single',
						style: [{
							property: 'font-size',
							value: '12px'
						}, {
							property: 'color',
							value: '#888888'
						}, {
							property: 'margin-top',
							value: '6px'
						}],
						data: 'another_item'
					}]
				}, {
					type: 'single',
					style: [{
						property: 'font-size',
						value: '24px'
					}, {
						property: 'color',
						value: '#3a3a3a'
					}, {
						property: 'font-weight',
						value: 'bold'
					}],
					data: 'lonely_item'
				}]
			});

		});

	});

	describe('Listening for Template Updates', function() {

		beforeEach(function() {
			this.layout = new Layout();
			spyOn( this.layout, 'update' );
		});

		it('should listen for template change events', function() {
			var templateView = new TemplateView();
			// var event = document.createEvent('CustomEvent');
			// event.initCustomEvent('Columns.TemplateView.DidChange', false, false, {
			// 	templateView: 	templateView
			// });

			// document.dispatchEvent( event );
			ColumnsEvent.send('Columns.TemplateView.DidChange', {
				templateView: 	templateView
			});
			expect( this.layout.update ).toHaveBeenCalled();
		});
	});

	describe('Emitting Change Events', function() {

		it('should emit a change event', function() {
			this.layout = new Layout();
			spyOn( ColumnsEvent, 'send' );
			this.layout._emitChange();

			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.Layout.DidChange');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].layout ).toEqual( this.layout );
		});
	});
});