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

	describe('Template Management', function() {

		describe('Removing Placeholders', function() {

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

		// This is used once a user starts to drag a template value.
		// If that value leaves a single other value its former group, we should remove that group.
		// The only exception is if the group is the master group for the row (i.e. the first group)
		describe('Dissolving Groups with A Single Value', function() {

			beforeEach(function() {
				loadFixtures('template-with-lonely-group.html');
				this.templateView = new TemplateView();
			});

			it('should dissolve any groups that only have a single non-dragging value', function() {
				this.templateView.dissolveSingleValueGroups();
				expect( $('.layout-template-row-value:only-child').parent().not('master > layout-template-row-group').length ).toBe( 0 );
			});
		});

		// We want to do this when a user
		// drags a value out of the tempate
		describe('Removing a Value', function() {

			beforeEach(function() {
				this.templateView = new TemplateView();
				loadFixtures('template-without-placeholders.html');
			});

			it('should remove a dragging value from the template when the current dragging item is a value view', function() {
				var item = new Item({ title: "My Item" });
				var valueView = new TemplateValueView( item, false );
				var $value = valueView.render();
				$('.layout-template-row-group').first().append( $value );
				expect( $value ).toBeInDOM();
				this.templateView.removeValue( valueView );
				expect( $value ).not.toBeInDOM();
			});

			it('should throw an error when not passed a value view', function() {
				var item = new Item({ title: "My Item" });
				var itemView = new ItemView( item );
				expect(function() {
					this.templateView.removeValue( itemView );
				}.bind(this) )
				.toThrow("exception: value must be of type TemplateValueView");
			});
		});

		describe('Inserting a New Value', function() {

			beforeEach(function() {
				loadFixtures('template-without-placeholders.html');
				this.templateView = new TemplateView( this.defaultLayout );
			});

			describe('Getting Positioning Information for a Given Value', function() {

				beforeEach(function() {
					this.$value = new TemplateValueView( new Item({ title: "My Item" }) ).render();
					this.$value.css({
						position: 'absolute',
						top: '50px',
						left: '26px',
						width: '46px',
						height: '24px'
					});
				});

				it('should determine values for all edges and the item middle with a default buffer and parent direction', function() {
					var $group = new TemplateGroupView().render();
					$group.append( this.$value );
					$('.layout-template-row-group').first().append( $group );

					var value = this.templateView.dimensionsForValue( this.$value );
					expect( value.top ).toBe( 50 );
					expect( value.left ).toBe( 26 );
					expect( value.bottom ).toBe( 74 );
					expect( value.right ).toBe( 72 );
					expect( value.middleX ).toBe( 49 );
					expect( value.middleY ).toBe( 62 );
					expect( value.dragMiddleX ).toBe( 49 );
					expect( value.dragMiddleY ).toBe( 62 );
					expect( value.dragMiddle ).toBe( 49 );
					expect( value.bufferTop ).toBe( 50 );
					expect( value.bufferLeft ).toBe( 35.2 );
					expect( value.bufferBottom ).toBe( 74 );
					expect( value.bufferRight ).toBe( 62.8 );
				});

				it('should determine values for all edges and the item middle with a given buffer and parent direction', function() {
					var $group = new TemplateGroupView({ layout: [{
						property: 	'flex-direction',
						value: 		'column'
					}] }).render();
					$group.append( this.$value );
					$('.layout-template-row-group').first().append( $group );

					var value = this.templateView.dimensionsForValue( this.$value, 0.6, 0.4 );
					expect( value.top ).toBe( 50 );
					expect( value.left ).toBe( 26 );
					expect( value.bottom ).toBe( 74 );
					expect( value.right ).toBe( 72 );
					expect( value.middleX ).toBe( 49 );
					expect( value.middleY ).toBe( 62 );
					expect( value.dragMiddleX ).toBe( 26 + this.$value.width() * 0.6 );
					expect( value.dragMiddleY ).toBe( 50 + this.$value.height() * 0.6 );
					expect( value.dragMiddle ).toBe( 50 + this.$value.height() * 0.6 );
					expect( value.bufferTop ).toBe( 50 + this.$value.height() * 0.4 );
					expect( value.bufferLeft ).toBe( 26 );
					expect( value.bufferBottom ).toBe( 74 - this.$value.height() * 0.4 );
					expect( value.bufferRight ).toBe( 72 );
				});
			});

			describe('Testing Whether A Drag Intersects A Value', function() {

				beforeEach(function() {
					this.values = {
						top: 			50,
						left: 			26,
						bottom: 		74,
						right: 			72,
						middleX: 		49,
						middleY: 		62,
						dragMiddleX: 	49,
						dragMiddleY: 	62,
						bufferTop: 		50,
						bufferLeft: 	35.2,
						bufferBottom: 	74,
						bufferRight: 	62.8
					};
					this.event = document.createEvent("MouseEvent");
				});

				it('should return true if the drag event is entirely inside the buffered item', function() {
					this.event.initMouseEvent( "mousemove", true, true, window, 1, 800, 600, 40, 60, false, false, false, false, 0, null );
					expect( this.templateView.isIntersected( this.values, this.event ) ).toBe( true );
				});

				it('should return false if the drag event is above the buffered item', function() {
					this.event.initMouseEvent( "mousemove", true, true, window, 1, 800, 600, 40, 40, false, false, false, false, 0, null );
					expect( this.templateView.isIntersected( this.values, this.event ) ).toBe( false );
				});

				it('should return false if the drag event is below the buffered item', function() {
					this.event.initMouseEvent( "mousemove", true, true, window, 1, 800, 600, 40, 80, false, false, false, false, 0, null );
					expect( this.templateView.isIntersected( this.values, this.event ) ).toBe( false );
				});

				it('should return false if the drag event is left of the buffered item', function() {
					this.event.initMouseEvent( "mousemove", true, true, window, 1, 800, 600, 30, 60, false, false, false, false, 0, null );
					expect( this.templateView.isIntersected( this.values, this.event ) ).toBe( false );
				});

				it('should return false if the drag event is right of the buffered item', function() {
					this.event.initMouseEvent( "mousemove", true, true, window, 1, 800, 600, 70, 60, false, false, false, false, 0, null );
					expect( this.templateView.isIntersected( this.values, this.event ) ).toBe( false );
				});

			});

			describe('Wrapping Existing Values with a New Group', function() {

				beforeEach(function() {
					this.$value = new TemplateValueView( new Item({ title: "My Item" }) ).render();
					this.$value.css({
						position: 'absolute',
						top: '50px',
						left: '26px',
						width: '46px',
						height: '24px'
					});
					$('.layout-template-row-group').first().append( this.$value );
				});

				it('should render a group with the value inside', function() {
					this.templateView.wrapValueWithGroup( this.$value );
					expect( this.$value.parent().parent().parent() ).toEqual('.layout-template-row');
				});

				it('should render the group with the correct layout direction', function() {
					this.templateView.wrapValueWithGroup( this.$value );
					expect( this.$value.parent().data('flex-direction') ).toBe('column');
				});
			});

			describe('Testing Whether an Existing Value is to the Left of a Drag', function() {
				beforeEach(function() {
					this.values = {
						top: 			50,
						left: 			26,
						bottom: 		74,
						right: 			72,
						middleX: 		49,
						middleY: 		62,
						dragMiddleX: 	49,
						dragMiddleY: 	62,
						dragMiddle: 	49,
						bufferTop: 		50,
						bufferLeft: 	35.2,
						bufferBottom: 	74,
						bufferRight: 	62.8
					};
					this.event = document.createEvent("MouseEvent");
				});

				it('should return true if the drag event is after the item drag threshold point', function() {
					this.event.initMouseEvent( "mousemove", true, true, window, 1, 800, 600, 50, 60, false, false, false, false, 0, null );
					expect( this.templateView.isPrevious( this.values, this.event.clientX ) ).toBe( true );
				});

				it('should return false if the drag event is before the item drag threshold point', function() {
					this.event.initMouseEvent( "mousemove", true, true, window, 1, 800, 600, 40, 40, false, false, false, false, 0, null );
					expect( this.templateView.isPrevious( this.values, this.event.clientX ) ).toBe( false );
				});
			});

			describe('Positioning the New Value', function() {

				it('should position the new value at the beginning of the template if there are no other values', function() {

				});
			});

			describe('Inserting a New Value', function() {

				
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
				this.newItem = new Item({ title: "My Item" });
				this.newItemView = new ItemView( this.newItem );
				this.event = document.createEvent('CustomEvent');
				this.event.initCustomEvent('Columns.ItemView.ItemDidBeginDrag', false, false, {
					item: 	this.newItemView,
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
				this.positionSpy = spyOn( this.templateView, 'positionDropForDragEventInParentWithPlaceholder' );
			});

			it('should remove existing placeholders and set up new ones if there is an active droppable item', function() {
				var itemView 	= new ItemView( this.newItem );
				var $item 		= itemView.render();
				this.templateView.droppableItems.push( itemView );
				document.dispatchEvent( this.event );
				expect( this.templateView.removePlaceholders ).toHaveBeenCalled();
				expect( this.positionSpy.calls.argsFor(0)[0] ).toEqual( this.event );
				expect( this.positionSpy.calls.argsFor(0)[1] ).toEqual( $item );
				expect( this.positionSpy.calls.argsFor(0)[2] ).toBe( true );
			});

			it('should do nothing if there is no active droppable item', function() {
				document.dispatchEvent( this.event );
				expect( this.templateView.removePlaceholders ).not.toHaveBeenCalled();
				expect( this.positionSpy ).not.toHaveBeenCalled();
			});
		});
	});

	describe('Responding to Value Drags', function() {

		beforeEach(function() {
			this.templateView = new TemplateView( this.defaultLayout );
			this.templateView.render();
		});

		describe('Drag Start', function() {

			beforeEach(function() {
				this.newItem = new Item({ title: "My Item" });
				this.valueView = new TemplateValueView( this.newItem, false );
				this.event = document.createEvent('CustomEvent');
				this.event.initCustomEvent('Columns.TemplateValueView.ValueDidBeginDragWithItem', false, false, {
					valueView: 	this.valueView,
					item: 		this.newItem,
					event: 		event,
					ui: 		{}
				});
			});

			it('should update the current dragging item', function() {
				document.dispatchEvent( this.event );
				expect( this.templateView.draggingItem ).toEqual( this.newItem );
			});

			it('should dissolve any groups that surround just a single value', function() {
				spyOn( this.templateView, 'dissolveSingleValueGroups' );
				document.dispatchEvent( this.event );
				expect( this.templateView.dissolveSingleValueGroups ).toHaveBeenCalled();
			});
		});

		describe('Drag Stop', function() {

			beforeEach(function() {
				this.newItem = new Item({ title: "My Item" });
				this.valueView = new TemplateValueView( this.newItem, false );
				this.valueView.render();
				this.event = document.createEvent('CustomEvent');
				this.event.initCustomEvent('Columns.TemplateValueView.ValueDidEndDragWithItem', false, false, {
					valueView: 	this.valueView,
					item: 		this.newItem,
					event: 		event,
					ui: 		{}
				});

				spyOn( this.templateView, 'removeValue' );
				spyOn( this.templateView, '_emitChange' );
			});

			it('should remove the value from the template if there is no active droppable item', function() {
				document.dispatchEvent( this.event );
				expect( this.templateView.removeValue ).toHaveBeenCalledWith( this.valueView );
			});

			it('should emit a change event if there is no active droppable item', function() {
				document.dispatchEvent( this.event );
				expect( this.templateView._emitChange ).toHaveBeenCalled();
			});

			it('should do nothing if there is an active droppable item', function() {
				var droppable = '<div class="fake"></div>';
				this.templateView.droppableItems.push( droppable );
				document.dispatchEvent( this.event );

				expect( this.templateView.removeValue ).not.toHaveBeenCalledWith();
				expect( this.templateView._emitChange ).not.toHaveBeenCalled();
			});

		});

		describe('Drag', function() {
			beforeEach(function() {
				this.newItem = new Item({ title: "My Item" });
				this.valueView = new TemplateValueView( this.newItem, false );
				this.event = document.createEvent('CustomEvent');
				this.event.initCustomEvent('Columns.TemplateValueView.ValueDidDragWithItem', false, false, {
					valueView: 	this.valueView,
					item: 		this.newItem,
					event: 		event,
					ui: 		{}
				});

				spyOn( this.templateView, 'removePlaceholders' );
				this.positionSpy = spyOn( this.templateView, 'positionDropForDragEventInParentWithPlaceholder' );
			});

			it('should remove existing placeholders and set up new ones if there is an active droppable item', function() {
				var $value = this.valueView.render();
				this.templateView.droppableItems.push( this.valueView );
				document.dispatchEvent( this.event );
				expect( this.templateView.removePlaceholders ).toHaveBeenCalled();
				expect( this.positionSpy.calls.argsFor(0)[0] ).toEqual( this.event );
				expect( this.positionSpy.calls.argsFor(0)[1] ).toEqual( $value );
				expect( this.positionSpy.calls.argsFor(0)[2] ).toBe( true );
			});

			it('should do nothing if there is no active droppable item', function() {
				document.dispatchEvent( this.event );
				expect( this.templateView.removePlaceholders ).not.toHaveBeenCalled();
				expect( this.positionSpy ).not.toHaveBeenCalled();
			});

		});
	});

	describe('Respond to Group Drop Events', function() {

		beforeEach(function() {
			this.templateView = new TemplateView( this.defaultLayout );
			this.templateView.render();
			this.newItem = new Item({ title: "My Item" });
			this.valueView = new TemplateValueView( this.newItem );
			this.groupView = new TemplateGroupView();
			this.event = document.createEvent('CustomEvent');
		});

		describe('Drop Over', function() {

			beforeEach(function() {
				this.event.initCustomEvent('Columns.TemplateGroupView.GroupDidBeginDropOverWithValueView', false, false, {
					groupView: 	this.groupView,
					valueView: 	this.valueView,
					event: 		event,
					ui: 		{}
				});
			});

			it('should add the group to the droppable items array only if not already present', function() {
				document.dispatchEvent( this.event );
				expect( this.templateView.droppableItems.length ).toBe( 1 );
			});

			it('should not add the group to the droppable items array if already present', function() {
				this.templateView.droppableItems.push( this.groupView );
				document.dispatchEvent( this.event );
				expect( this.templateView.droppableItems.length ).toBe( 1 );
			});
		});

		describe('Drop Out', function() {

			beforeEach(function() {
				this.event.initCustomEvent('Columns.TemplateGroupView.GroupDidEndDropOverWithValueView', false, false, {
					groupView: 	this.groupView,
					valueView: 	this.valueView,
					event: 		event,
					ui: 		{}
				});
				spyOn( this.groupView, 'removePlaceholders' );
			});

			it('should clear any placeholders within the group', function() {
				document.dispatchEvent( this.event );
				expect( this.groupView.removePlaceholders ).toHaveBeenCalled();
			});

			it('should remove the droppable item from the droppable items array', function() {
				this.templateView.droppableItems.push( {} );
				this.templateView.droppableItems.push( this.groupView );
				this.templateView.droppableItems.push( {} );
				document.dispatchEvent( this.event );
				expect( this.templateView.droppableItems.indexOf( this.groupView ) ).toBe( -1 );
			});
		});

		describe('Drop', function() {

			beforeEach(function() {
				this.event.initCustomEvent('Columns.TemplateGroupView.GroupDidDropWithValueView', false, false, {
					groupView: 	this.groupView,
					valueView: 	this.valueView,
					event: 		event,
					ui: 		{}
				});
				spyOn( this.groupView, 'removePlaceholders' );
				this.positionSpy = spyOn( this.templateView, 'positionDropForDragEventInParentWithPlaceholder' );
			});

			it('should do nothing if there are no droppable items', function() {
				document.dispatchEvent( this.event );

				expect( this.groupView.removePlaceholders ).not.toHaveBeenCalled();
				expect( this.templateView.positionDropForDragEventInParentWithPlaceholder ).not.toHaveBeenCalled();
			});

			it('should do nothing if this group is not the most recent droppable item', function() {
				this.templateView.droppableItems.push( this.groupView );
				this.templateView.droppableItems.push( {} );
				document.dispatchEvent( this.event );

				expect( this.groupView.removePlaceholders ).not.toHaveBeenCalled();
				expect( this.templateView.positionDropForDragEventInParentWithPlaceholder ).not.toHaveBeenCalled();
			});

			it('should clear any placeholders within the group', function() {
				this.templateView.droppableItems.push( {} );
				this.templateView.droppableItems.push( this.groupView );
				document.dispatchEvent( this.event );

				expect( this.groupView.removePlaceholders ).toHaveBeenCalled();
			});

			it('should position the drop within the template', function() {
				var $group = this.groupView.render();
				this.templateView.droppableItems.push( {} );
				this.templateView.droppableItems.push( this.groupView );
				document.dispatchEvent( this.event );

				expect( this.positionSpy ).toHaveBeenCalled();
				expect( this.positionSpy.calls.argsFor(0)[0] ).toEqual( this.event );
				expect( this.positionSpy.calls.argsFor(0)[1] ).toEqual( $group );
				expect( this.positionSpy.calls.argsFor(0)[2] ).toBe( false );
			});

			it('should clear the droppable items array', function() {
				this.templateView.droppableItems.push( {} );
				this.templateView.droppableItems.push( this.groupView );
				document.dispatchEvent( this.event );

				expect( this.templateView.droppableItems.length ).toBe( 0 );
			});
		});

	});

	describe('Dragging', function() {

	});

	describe('Respond to Embeddable Table Events', function() {

	});
});