jasmine.getFixtures().fixturesPath = 'specs/fixtures';

describe('Template View', function() {

	beforeEach(function() {
		this.defaultLayout = {
			type: 'group',
			style: [{
				property: 'padding',
				value: '12px'
			}],
			values: [{
				type: 'group',
				layout: [{
					property: 'flex-direction',
					value: 'column'
				}, {
					property: 'align-items',
					value: 'flex-start'
				}],
				values: [{
					type: 'single',
					item: new Item({
						title: 'First Name',
						style: new Style([{
							property: 'color',
							value: '#3a3a3a'
						}])
					})
				},{
					type: 'single',
					item: new Item({
						title: 'Hometown',
						style: new Style([{
							property: 'color',
							value: '#888'
						},{
							property: 'font-size',
							value: '14px'
						}, {
							property: 'margin-top',
							value: '4px'
						}])
					})
				}]
			}, {
				type: 'single',
				item: new Item({
					title: 'Age',
					style: new Style([{
						property: 'color',
						value: '#3a3a3a'
					},{
						property: 'font-size',
						value: '24px'
					}])
				})
			}]
		};
	});

	describe('Initialization', function() {

		it('should initialize with a layout object', function() {
			var templateView = new TemplateView( this.defaultLayout );
			expect( templateView.layout ).toEqual( this.defaultLayout );
		});

		it('should initialize without a layout object', function() {
			var templateView = new TemplateView();
			expect( templateView.layout ).toEqual( {} );
		});

		it('should initalize with the correct template', function() {
			var templateView = new TemplateView();
			expect( templateView.template ).toEqual( Columns.Templates['templates/layout/template.hbs'] );
		});

		it('should initialize with a droppable items array', function() {
			var templateView = new TemplateView();
			expect( templateView.droppableItems ).toEqual( [] );
		});
	});

	describe('Rendering', function() {

		beforeEach(function() {
			loadFixtures('layout.html');
			this.templateView = new TemplateView( this.defaultLayout );
		});

		describe('Overall Rendering', function() {

			it('should render the embeddable', function() {
				this.templateView.render();
				expect( $('#layout .layout-table-preview')[0] ).toBeInDOM();
			});

			it('should render the template', function() {
				this.templateView.render();
				expect( $('#layout .layout-template')[0] ).toBeInDOM();
			});

			it('should kick off the rendering of components', function() {
				spyOn(this.templateView, '_renderRowComponent');
				this.templateView.render();
				expect( this.templateView._renderRowComponent ).toHaveBeenCalledWith( this.defaultLayout );
			});

			it('should create a reference to the rendered template', function() {
				var $template = this.templateView.render();
				expect( $template ).toEqual( this.templateView.$template );
			});
		});

		describe('Component Rendering', function() {

			it('should render the correct number of groups', function() {
				var $template = this.templateView.render();
				expect( $template.find('.layout-template-row-group').length ).toBe(2);
			});

			it('should render the correct number of values', function() {
				var $template = this.templateView.render();
				expect( $template.find('.layout-template-row-value').length ).toBe(3);
			});

			it('should nest the groups and values properly', function() {
				var $template = this.templateView.render();
				expect( $template.find('.layout-template-row-value').parent() ).toHaveClass('layout-template-row-group');
				expect( $template.find('.layout-template-row-group').parent().first() ).toHaveClass('layout-template-row');
				expect( $template.find('.layout-template-row-group').eq(1).parent() ).toHaveClass('layout-template-row-group');
			});
		});
	});

	describe('Managing Placholders', function() {

		describe('Removal', function() {

			beforeEach(function() {
				loadFixtures('template-with-placeholders.html');
				this.templateView = new TemplateView();
			});

			it('should remove placeholders', function() {
				this.templateView.removePlaceholders();
				expect( $('.layout-template-row-value.placeholder').length ).toBe( 0 );
				expect( $('.layout-template-row-group.placeholder').length ).toBe( 0 );
			});

			it('should preserve non-placeholder values of placeholder groups', function() {
				this.templateView.removePlaceholders();
				expect( $('.layout-template-row-value').length ).toBe( 1 );
			});
		});
	});

	describe('Responding to Item Drags', function() {

		beforeEach(function() {
			this.templateView = new TemplateView( this.defaultLayout );
			this.templateView.render();
		});

		describe('Drag Start', function() {

			beforeEach(function() {
				this.newItem = new ItemView( new Item({ title: "My Item" }) );
				this.event = document.createEvent('CustomEvent');
				this.event.initCustomEvent('Columns.ItemView.ItemDidBeginDrag', false, false, {
					item: 	this.newItem,
					event: 	event,
					ui: 	{}
				});
			});

			it('should update the current dragging item', function() {
				document.dispatchEvent( this.event );
				expect( this.templateView.draggingItem ).toEqual( this.newItem );
			});
		});

		describe('Drag Stop', function() {
			beforeEach(function() {
				this.newItem = new Item({ title: "My Item" });
				this.event = document.createEvent('CustomEvent');
				this.event.initCustomEvent('Columns.ItemView.ItemDidEndDrag', false, false, {
					item: 	this.newItem,
					event: 	event,
					ui: 	{}
				});

				spyOn( this.templateView, 'removePlaceholders');
			});

			it('should remove any placeholders', function() {
				document.dispatchEvent( this.event );
				expect( this.templateView.removePlaceholders ).toHaveBeenCalled();
			});

			it('should reset the dragging item', function() {
				document.dispatchEvent( this.event );
				expect( this.templateView.draggingItem ).toBeUndefined();
			});
		});

		describe('Drag', function() {
			beforeEach(function() {
				this.newItem = new Item({ title: "My Item" });
				this.event = document.createEvent('CustomEvent');
				this.event.initCustomEvent('Columns.ItemView.ItemDidDrag', false, false, {
					item: 	this.newItem,
					event: 	event,
					ui: 	{}
				});

				spyOn( this.templateView, 'removePlaceholders' );
				spyOn( this.templateView, 'positionDropForDragEventInParentWithPlaceholder' );
			});

			it('should remove existing placeholders and set up new ones if there is an active droppable item', function() {
				var droppable = '<div></div>';
				this.templateView.droppableItems.push( droppable );
				document.dispatchEvent( this.event );
				expect( this.templateView.removePlaceholders ).toHaveBeenCalled();
				expect( this.templateView.positionDropForDragEventInParentWithPlaceholder ).toHaveBeenCalledWith( this.event, $(droppable), true );
			});
		});
	});

	describe('Responding to Value Drags', function() {

	});

	describe('Respond to Group Drop Events', function() {

	});

	describe('Dragging', function() {

	});

	describe('Respond to Embeddable Table Events', function() {

	});
});