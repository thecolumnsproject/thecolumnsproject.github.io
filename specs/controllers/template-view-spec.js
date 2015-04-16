var ColumnsEvent 		= require('../../javascripts/models/ColumnsEvent.js');
var ColumnsAnalytics 	= require('../../javascripts/models/ColumnsAnalytics.js');
var Layout 				= require('../../javascripts/models/Layout.js');
var Table 				= require('../../javascripts/models/Table.js');
var TemplateView 		= require('../../javascripts/controllers/TemplateView.js');
var ItemView 			= require('../../javascripts/controllers/ItemView.js');

jasmine.getFixtures().fixturesPath = 'specs/fixtures';

describe('Template View', function() {

	beforeEach(function() {
		spyOn( ColumnsAnalytics, 'send' );
		this.defaultLayout = new Layout([
			new Item({
				title: 'First Name',
				style: new Style([{
					property: 'color',
					value: '#3a3a3a'
				}])
			}),
			new Item({
				title: 'Hometown',
				style: new Style([{
					property: 'color',
					value: '#3a3a3a'
				}])
			}),
			new Item({
				title: 'Age',
				style: new Style([{
					property: 'color',
					value: '#3a3a3a'
				}])
			})
		]);

		this.table = new Table({
			columns: [ "First Name", "Hometown", "Age" ]
		});
		
		// this.defaultLayout = {
		// 	type: 'group',
		// 	style: [{
		// 		property: 'padding',
		// 		value: '12px'
		// 	}],
		// 	values: [{
		// 		type: 'group',
		// 		layout: [{
		// 			property: 'flex-direction',
		// 			value: 'column'
		// 		}, {
		// 			property: 'align-items',
		// 			value: 'flex-start'
		// 		}],
		// 		values: [{
		// 			type: 'single',
		// 			item: new Item({
		// 				title: 'First Name',
		// 				style: new Style([{
		// 					property: 'color',
		// 					value: '#3a3a3a'
		// 				}])
		// 			})
		// 		},{
		// 			type: 'single',
		// 			item: new Item({
		// 				title: 'Hometown',
		// 				style: new Style([{
		// 					property: 'color',
		// 					value: '#888'
		// 				},{
		// 					property: 'font-size',
		// 					value: '14px'
		// 				}, {
		// 					property: 'margin-top',
		// 					value: '4px'
		// 				}])
		// 			})
		// 		}]
		// 	}, {
		// 		type: 'single',
		// 		item: new Item({
		// 			title: 'Age',
		// 			style: new Style([{
		// 				property: 'color',
		// 				value: '#3a3a3a'
		// 			},{
		// 				property: 'font-size',
		// 				value: '24px'
		// 			}])
		// 		})
		// 	}]
		// };
	});

	afterEach(function() {
		ColumnsEvent.offAll();
	});

	describe('Initialization', function() {

		it('should initialize with a layout object', function() {
			var templateView = new TemplateView( this.defaultLayout );
			expect( templateView.layout ).toEqual( this.defaultLayout );
		});

		it('should initialize without a layout object', function() {
			var templateView = new TemplateView();
			expect( templateView.layout ).toBeUndefined();
		});

		it('should initalize with the correct template', function() {
			var templateView = new TemplateView();
			expect( templateView.template ).toEqual( Columns.Templates['templates/layout/template.hbs'] );
		});

		it('should initialize with a droppable items array', function() {
			var templateView = new TemplateView();
			expect( templateView.droppableItems ).toEqual( [] );
		});

		xit('should initialize with an empty groups array', function() {
			var templateView = new TemplateView();
			expect( templateView.groups ).toEqual( [] );
		});
	});

	describe('Rendering', function() {

		beforeEach(function() {
			loadFixtures('layout.html');
			this.templateView = new TemplateView( this.defaultLayout );
			this.templateView.table = this.table;
		});

		describe('Preview Rendering', function() {
			it('should render the embeddable', function() {
				this.templateView._renderPreview();
				expect( $('#layout .layout-table-preview')[0] ).toBeInDOM();
			});

			it('should create reference to the preview', function() {
				var $preview = this.templateView._renderPreview();
				expect( this.templateView.$preview ).toEqual( $preview );
			});
		});

		describe('Template Rendering', function() {
			xit('should render the template', function() {
				this.templateView._renderTemplate();
				expect( $('#layout .layout-template')[0] ).toBeInDOM();
			});

			it('should kick off the rendering of components', function() {
				var layoutString = JSON.stringify( this.templateView.layout.model );
				spyOn( this.templateView, '_renderRowComponent' );
				this.templateView._renderTemplate();
				expect( JSON.stringify( this.templateView._renderRowComponent.calls.argsFor(0)[0] ) ).toBe( layoutString );
			});

			it('should create a reference to the rendered template', function() {
				var $template = this.templateView._renderTemplate();
				expect( $template ).toEqual( this.templateView.$template );
			});

			it('should emit a change event', function() {
				spyOn( this.templateView, '_emitChange' );
				this.templateView._renderTemplate();
				expect( this.templateView._emitChange ).toHaveBeenCalled();
			});

			it('should emit a render event', function() {
				spyOn( this.templateView, '_emitRender' );
				this.templateView._renderTemplate();
				expect( this.templateView._emitRender ).toHaveBeenCalled();
			});
		});

		describe('Component Rendering', function() {

			it('should render the correct number of groups', function() {
				var $template = this.templateView._renderTemplate();
				expect( $template.find('.layout-template-row-group').length ).toBe(2);
			});

			it('should add the groups to the master array', function() {
				var $template = this.templateView._renderTemplate();
				expect( TemplateView.groups.length ).toBe(2);
			});

			it('should render the correct number of values', function() {
				var $template = this.templateView._renderTemplate();
				expect( $template.find('.layout-template-row-value').length ).toBe(3);
			});

			it('should nest the groups and values properly', function() {
				var $template = this.templateView._renderTemplate();
				expect( $template.find('.layout-template-row-value').parent() ).toHaveClass('layout-template-row-group');
				expect( $template.find('.layout-template-row-group').parent().first() ).toHaveClass('layout-template-row');
				expect( $template.find('.layout-template-row-group').eq(1).parent() ).toHaveClass('layout-template-row-group');
			});
		});

		describe('Overall Rendering', function() {

			it('should render the preview', function() {
				spyOn( this.templateView, '_renderPreview' );
				this.templateView.render();
				expect( this.templateView._renderPreview ).toHaveBeenCalled();
			});

			it('should render the template', function() {
				spyOn( this.templateView, '_renderTemplate' );
				this.templateView.render();
				expect( this.templateView._renderTemplate ).toHaveBeenCalled();
			});
		});
	});

	describe('Template Management', function() {

		describe('Getting a TemplateGroupView for a jquery group element', function() {
			var groups = [];

			beforeEach(function() {
				var group1 = new TemplateGroupView({
					layout: [{
						property:'flex-direction',
						value: 'row'
					}, {
						property: 'justify-content',
						value: 'flex-start'
					}, {
						property: 'align-items',
						value: 'center'
					}]
				});

				var group2 = new TemplateGroupView({
					layout: [{
						property:'flex-direction',
						value: 'row'
					}, {
						property: 'justify-content',
						value: 'flex-start'
					}, {
						property: 'align-items',
						value: 'center'
					}]
				});

				this.$group1 = group1.render();
				this.$group2 = group2.render();

				groups = [ group1, group2 ];
				TemplateView.groups = groups;
			});

			it('should return the correct group given a jquery group element', function() {
				expect( TemplateView.getGroupViewForGroup( this.$group2 ) ).toEqual( groups[ 1 ] );
				expect( TemplateView.getGroupViewForGroup( this.$group1 ) ).toEqual( groups[ 0 ] );
			});

			it('should return the correct group if given a TemplateGroupView', function() {
				expect( TemplateView.getGroupViewForGroup( groups[ 1 ] ) ).toEqual( groups[ 1 ] );
				expect( TemplateView.getGroupViewForGroup( groups[ 0 ] ) ).toEqual( groups[ 0 ] );
			});

			it('should return undefined if the group is not found', function() {
				expect( TemplateView.getGroupViewForGroup( new TemplateGroupView() ) ).toBeUndefined();
			});

			it('should throw an error if passed anything other than a jquery object or TemplateGroupView', function() {
				expect(function() {
					TemplateView.getGroupViewForGroup( 'hi' );
				}).toThrow("exception: group must be TemplateGroupView or jQuery object");
			});
		});

		describe('Removing Groups', function() {
			var groups = [];

			beforeEach(function() {
				var group1 = new TemplateGroupView({
					layout: [{
						property:'flex-direction',
						value: 'row'
					}, {
						property: 'justify-content',
						value: 'flex-start'
					}, {
						property: 'align-items',
						value: 'center'
					}]
				});

				var group2 = new TemplateGroupView({
					layout: [{
						property:'flex-direction',
						value: 'row'
					}, {
						property: 'justify-content',
						value: 'flex-start'
					}, {
						property: 'align-items',
						value: 'center'
					}]
				});

				this.$group1 = group1.render();
				this.$group2 = group2.render();

				groups = [ group1, group2 ];
				TemplateView.groups = [
					group1, group2
				];
			});

			it('should remove the TemplateGroupViews associated with the passed in jquery objects from the groups array', function() {
				TemplateView.removeGroup( this.$group1 );
				expect( TemplateView.groups.indexOf( groups[ 0 ] ) ).toBe( -1 );
			});

			it('should remove the TemplateGroupViews from the groups array', function() {
				TemplateView.removeGroup( groups[ 0 ] );
				expect( TemplateView.groups.indexOf( groups[ 0 ] ) ).toBe( -1 );
			});

			it('should ignore values that are not jquery objects or TemplateGroupViews', function() {
				TemplateView.removeGroup( 'hi' );
				expect( TemplateView.groups.length ).toBe( 2 );
			});

			it('should ignore objects that are not in the groups array', function() {
				TemplateView.removeGroup( new TemplateGroupView() );
				expect( TemplateView.groups.length ).toBe( 2 );
			});

			it('should notify the group that it is about to be removed', function() {
				spyOn( ColumnsEvent, 'send' );
				TemplateView.removeGroup( groups[ 0 ] );

				expect( ColumnsEvent.send ).toHaveBeenCalled();
				expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.TemplateView.WillRemoveGroupView');
				expect( ColumnsEvent.send.calls.argsFor(0)[1].groupView ).toEqual( groups[ 0 ] );
			});
		});

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
				TemplateView.groups.push( this.templateView );
				spyOn( TemplateView, 'removeGroup' );
			});

			it('should dissolve any groups that only have a single non-dragging value', function() {
				this.templateView.dissolveSingleValueGroups();
				expect( $('.lonely').parents(".layout-template-row-group").length ).toBe( 1 );
			});

			it('should remove those groups from the array of groups in the template', function() {
				this.templateView.dissolveSingleValueGroups();
				// expect( TemplateView.removeGroup ).toHaveBeenCalledWith( $('.lonely-group') );
				expect( TemplateView.removeGroup ).toHaveBeenCalled();
			});
		});

		// We want to do this when a user
		// drags a value out of the tempate
		describe('Removing a Value', function() {

			beforeEach(function( done ) {
				this.templateView = new TemplateView();
				// loadFixtures('template-without-placeholders.html');
				loadFixtures('items.html');
				appendLoadFixtures('template-with-dragging-value.html');

				spyOn( this.templateView, '_emitChange' );
				this.templateView.removeDraggingValue();

				setTimeout(function() {
					done();
				}, 400 );
			});

			// xit('should remove a dragging value from the template when the current dragging item is a value view', function() {
			// 	var item = new Item({ title: "My Item" });
			// 	var valueView = new TemplateValueView( item, false );
			// 	var $value = valueView.render();
			// 	$('.layout-template-row-group').first().append( $value );
			// 	expect( $value ).toBeInDOM();
			// 	this.templateView.removeValue( valueView );
			// 	expect( $value ).not.toBeInDOM();
			// });

			// xit('should animate the value helper to the location of its item view counterpart', function( done ) {
			// 	var valueOffset = $('#columns .layout-column').eq( 0 ).offset(),
			// 		itemOffset = $('#columns .layout-column').eq( 1 ).offset();

			// 	expect( valueOffset ).toEqual( itemOffset );
			// 	done();
			// });

			xit('should emit a change event', function( done ) {
				expect( this.templateView._emitChange ).toHaveBeenCalled();
				done();
			});

			// xit('should throw an error when not passed a value view', function() {
			// 	var item = new Item({ title: "My Item" });
			// 	var itemView = new ItemView( item );
			// 	expect(function() {
			// 		this.templateView.removeValue( itemView );
			// 	}.bind(this) )
			// 	.toThrow("exception: value must be of type TemplateValueView");
			// });
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

				it('should render the group with the correct placeholder status', function() {
					this.templateView.wrapValueWithGroup( this.$value, true );
					expect( this.$value.parent() ).toHaveClass('placeholder');
				});

				it('should add the group to the groups array if not a placeholder', function() {
					this.templateView.wrapValueWithGroup( this.$value );
					expect( TemplateView.groups.length ).toBe( 1 );
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

				beforeEach(function() {
					this.dropSpy = spyOn( this.templateView, 'insertDropBeforeElementInParentWithPlaceholder' );
					jasmine.getFixtures().cleanUp();
					loadFixtures('template-bare.html');
				});

				it('should do nothing if the parent is undefined', function() {
					// Create mouse event coordinates that we know will be inside the group
					// and set up the currently dragging item
					var item = new Item({ title: "My Item "});
					var $group = $('.layout-template-row-group');
					var event = {
						clientX: $group.offset().left + ( $group.width() / 2 ),
						clientY: $group.offset().top + ( $group.height() / 2 )
					};	

					this.draggingItem = item;
					this.templateView.positionDropForDragEventInParentWithPlaceholder( event, undefined, false );
					expect( this.dropSpy ).not.toHaveBeenCalled();
				});

				it('should position the new value at the beginning of the template if there are no other values', function() {
					// Create mouse event coordinates that we know will be inside the group
					// and set up the currently dragging item
					var item = new Item({ title: "My Item "});
					var $group = $('.layout-template-row-group');
					var event = {
						clientX: $group.offset().left + ( $group.width() / 2 ),
						clientY: $group.offset().top + ( $group.height() / 2 )
					};	

					this.templateView.draggingItem = item;
					this.templateView.positionDropForDragEventInParentWithPlaceholder( event, $group, false );
					expect( this.dropSpy ).toHaveBeenCalledWith( item, null, $group, false );
				});

				it('should position the new value after the correct existing item', function() {
					// Add a value to the group
					var $group = $('.layout-template-row-group').first();
					var $value = new TemplateValueView( new Item({ title: "My Existing Item"}) ).render();
					$group.append( $value );

					// Create mouse event coordinates that we know will be after the existing value view
					// and set up the currently dragging item
					var item = new Item({ title: "My Item "});
					var event = {
						clientX: $value.offset().left + ( $value.width() * .6 ),
						clientY: $value.offset().top + ( $value.height() * 2 )
					};

					this.templateView.draggingItem = item;
					this.templateView.positionDropForDragEventInParentWithPlaceholder( event, $group, false );
					expect( this.dropSpy ).toHaveBeenCalledWith( item, $value, $group, false );

				});

				it('should create a new group if the new value itersects an existing value', function() {
					// Add a value to the group
					var $group = $('.layout-template-row-group').first();
					var $value = new TemplateValueView( new Item({ title: "My Existing Item"}) ).render();
					$group.append( $value );

					// Create mouse event coordinates that we know will be after the existing value view
					// and set up the currently dragging item
					var item = new Item({ title: "My Item "});
					var event = {
						clientX: $value.offset().left + ( $value.width() * .6 ),
						clientY: $value.offset().top + ( $value.height() * .6 )
					};

					this.templateView.draggingItem = item;
					this.templateView.positionDropForDragEventInParentWithPlaceholder( event, $group, false );
					expect( this.dropSpy ).toHaveBeenCalledWith( item, $value, $('.layout-template-row-group').eq( 1 ), false );
				});

				it('should position the new value in a new group before the other item when appropriate', function() {
					// Add a value to the group
					var $group = $('.layout-template-row-group').first();
					var $value = new TemplateValueView( new Item({ title: "My Existing Item"}) ).render();
					$group.append( $value );

					// Create mouse event coordinates that we know will be after the existing value view
					// and set up the currently dragging item
					var item = new Item({ title: "My Item "});
					var event = {
						clientX: $value.offset().left + ( $value.width() * .2 ),
						clientY: $value.offset().top + ( $value.height() * .2 )
					};

					this.templateView.draggingItem = item;
					this.templateView.positionDropForDragEventInParentWithPlaceholder( event, $group, false );
					expect( this.dropSpy ).toHaveBeenCalledWith( item, null, $('.layout-template-row-group').eq( 1 ), false );
				});
			});

			describe('Inserting a New Value', function() {

				beforeEach(function() {
					this.item 		= new Item({ title: "My Item" });
					this.$group 	= new TemplateGroupView().render();
					this.$previous 	= new TemplateValueView( new Item({ title: "Other Item" }) ).render();
					spyOn( this.templateView, '_emitChange' );
				});

				it('should place the new value as the first child of the parent if the previous item is null', function() {
					this.templateView.insertDropBeforeElementInParentWithPlaceholder( this.item, null, this.$group, false );
					expect( this.$group.children().eq( 0 ) ).toContainText("My Item");
				});

				it('should place the new value after the previous item if it is not null', function() {
					this.$group.append( this.$previous );
					this.templateView.insertDropBeforeElementInParentWithPlaceholder( this.item, this.$previous, this.$group, false );
					expect( this.$group.children().eq( 1 ) ).toContainText("My Item");
				});

				it('should create the new item as a placeholder if appropriate', function() {
					this.$group.append( this.$previous );
					this.templateView.insertDropBeforeElementInParentWithPlaceholder( this.item, this.$previous, this.$group, true );
					expect( this.$group.children().eq( 1 ) ).toHaveClass("placeholder");
				});

				it('should not create the new item as a placeholder when appropriate', function() {
					this.$group.append( this.$previous );
					this.templateView.insertDropBeforeElementInParentWithPlaceholder( this.item, this.$previous, this.$group, false );
					expect( this.$group.children().eq( 1 ) ).not.toHaveClass("placeholder");
				});

				it('should emit a change event if the new item is not a placeholder', function() {
					this.$group.append( this.$previous );
					this.templateView.insertDropBeforeElementInParentWithPlaceholder( this.item, this.$previous, this.$group, false );

					expect( this.templateView._emitChange ).toHaveBeenCalled();
				});

				xit('should send an analytics event about the new item when not a placeholder', function() {

				});
			});
		});
	});

	describe('Responding to Item Drags', function() {
		var event = {};

		beforeEach(function() {
			this.templateView = new TemplateView( this.defaultLayout );
			this.templateView.table = this.table;
			this.templateView.render();
		});

		describe('Drag Start', function() {

			beforeEach(function() {
				this.newItem = new Item({ title: "My Item" });
				this.newItemView = new ItemView( this.newItem );
				// this.event = document.createEvent('CustomEvent');
				// this.event.initCustomEvent('Columns.ItemView.ItemDidBeginDrag', false, false, {
				// 	item: 	this.newItemView,
				// 	event: 	event,
				// 	ui: 	{}
				// });
			});

			it('should update the current dragging item', function() {
				ColumnsEvent.send('Columns.ItemView.ItemDidBeginDrag', {
					item: 	this.newItemView,
					event: 	event,
					ui: 	{}
				});
				expect( this.templateView.draggingItem ).toEqual( this.newItem );
			});
		});

		describe('Drag Stop', function() {
			beforeEach(function() {
				this.newItem = new Item({ title: "My Item" });
				// this.event = document.createEvent('CustomEvent');
				// this.event.initCustomEvent('Columns.ItemView.ItemDidEndDrag', false, false, {
				// 	item: 	this.newItem,
				// 	event: 	event,
				// 	ui: 	{}
				// });

				spyOn( this.templateView, 'removePlaceholders');
			});

			it('should remove any placeholders', function() {
				ColumnsEvent.send('Columns.ItemView.ItemDidEndDrag', {
					item: 	this.newItem,
					event: 	event,
					ui: 	{}
				});
				expect( this.templateView.removePlaceholders ).toHaveBeenCalled();
			});

			it('should reset the dragging item', function() {
				ColumnsEvent.send('Columns.ItemView.ItemDidEndDrag', {
					item: 	this.newItem,
					event: 	event,
					ui: 	{}
				});
				expect( this.templateView.draggingItem ).toBeUndefined();
			});
		});

		describe('Drag', function() {
			beforeEach(function() {
				var event = {};
				this.newItem = new Item({ title: "My Item" });
				// this.event = document.createEvent('CustomEvent');
				// this.event.initCustomEvent('Columns.ItemView.ItemDidDrag', false, false, {
				// 	item: 	this.newItem,
				// 	event: 	event,
				// 	ui: 	{}
				// });

				spyOn( this.templateView, 'removePlaceholders' );
				this.positionSpy = spyOn( this.templateView, 'positionDropForDragEventInParentWithPlaceholder' );
			});

			it('should remove existing placeholders and set up new ones if there is an active droppable item', function() {
				var groupView	 	= new TemplateGroupView();
				var $group 			= groupView.render();
				var item 	 		= new Item({ title: "My Item"});
				this.templateView.draggingItem = item;
				this.templateView.droppableItems.push( groupView );

				ColumnsEvent.send('Columns.ItemView.ItemDidDrag', {
					item: 	this.newItem,
					event: 	event,
					ui: 	{}
				});

				expect( this.templateView.removePlaceholders ).toHaveBeenCalled();
				expect( this.positionSpy.calls.argsFor(0)[0] ).toEqual( event );
				expect( this.positionSpy.calls.argsFor(0)[1] ).toEqual( $group );
				expect( this.positionSpy.calls.argsFor(0)[2] ).toBe( true );
			});

			it('should do nothing if there is no active droppable item', function() {
				ColumnsEvent.send('Columns.ItemView.ItemDidDrag', {
					item: 	this.newItem,
					event: 	event,
					ui: 	{}
				});

				expect( this.templateView.removePlaceholders ).not.toHaveBeenCalled();
				expect( this.positionSpy ).not.toHaveBeenCalled();
			});
		});
	});

	describe('Responding to Table Events', function() {

		beforeEach(function() {
			this.templateView = new TemplateView();
		});

		it('should render the template when the table is initially uploaded', function() {
			var table = new Table({ layout: new Layout() });
			spyOn( this.templateView, '_renderTemplate' );

			// var columnsEvent = document.createEvent('CustomEvent');
			// columnsEvent.initCustomEvent('Columns.Table.DidUploadWithSuccess', false, false, {
			// 	table: 	new Table({ layout: new Layout() })
			// });
			// document.dispatchEvent(columnsEvent);
			ColumnsEvent.send('Columns.Table.DidUploadWithSuccess', {
				table: 	table
			});

			expect( this.templateView.layout ).toEqual( new Layout() );
			expect( this.templateView.table ).toEqual( table );
			expect( this.templateView._renderTemplate ).toHaveBeenCalled();
		});
	});

	describe('Responding to Desktop App Events', function() {

		beforeEach(function() {
			this.templateView = new TemplateView();
		});

		it('should render the preview', function() {
			spyOn( this.templateView, '_renderPreview' );
			
			ColumnsEvent.send('Columns.DesktopView.DidRender', {
				desktopView: {}
			});

			expect( this.templateView._renderPreview ).toHaveBeenCalled();
		});
	});

	describe('Template Querying', function() {


		describe('Getting the value element for an Item', function() {

			beforeEach(function() {
				loadFixtures('template-with-values.html');
			});

			it('should return a jQuery object representing the template value view for the item', function() {
				var item = new Item({ title: "My Item" });
				expect( TemplateView.getValueForItem( item ) ).toBeInDOM();
			});

			it('should return undefined if the item does not exist in the template', function() {
				var item = new Item({ title: "No Item" });
				expect( TemplateView.getValueForItem( item ) ).toBeUndefined();
			});

			it('should only return DOM elements with the correct value class', function() {
				var item = new Item({ title: "My Item" });
				expect( TemplateView.getValueForItem( item ) ).toHaveClass('layout-template-row-value');
			});

			it('should throw an error if passing anything other than an Item', function() {
				expect(function() {
					TemplateView.getValueForItem( "hi" );
				}.bind( this ))
				.toThrow("expection: item must be of type Item");
			});
		});

		describe('Getting the group objects for an item', function() {

			beforeEach(function() {
				spyOn( TemplateView, 'getValueForItem' ).and.callThrough();
				spyOn( TemplateView, 'getGroupViewForGroup' );
			});

			it('should convert the item into a value jQuery object', function() {
				var item = new Item({ title: "My Item" });
				groups = TemplateView.getGroupsForItem( item );
				expect( TemplateView.getValueForItem ).toHaveBeenCalledWith( item );
			});

			xit('should return an array of TemplateGroupView objects for a value with parents', function() {
				var item = new Item({ title: "My Item" });
				// expect( TemplateView.getGroupsForItem( item ).$group ).toBeInDOM();
				expect( TemplateView.getGroupViewForGroup.calls.count() ).toBe( 2 );
			});

			xit('should return a minimum of one parent for the wrapper group', function() {
				var item = new Item({ title: "Lonely Item" });
				// expect( TemplateView.getGroupsForItem( item ).length ).toBe( 1 );
				expect( TemplateView.getGroupViewForGroup.calls.count() ).toBe( 1 );
			});

			it('should return undefined for an item that is not in the template', function() {
				var item = new Item({ title: "No Item" });
				expect( TemplateView.getGroupsForItem( item ) ).toBeUndefined();
			});	

			xit('should return the right number of groups', function() {
				var item = new Item({ title: "My Item" });
				expect( TemplateView.getGroupsForItem( item ).length ).toBe( 2 );
			});

			xit('should only return DOM elements with the correct group class', function() {
				var item = new Item({ title: "My Item" });
				expect( TemplateView.getGroupsForItem( item ) ).toHaveClass('layout-template-row-group');
			});

			it('should throw an error if passed anything other than a jQuery object or Item', function() {
				expect(function() {
					TemplateView.getGroupsForItem( "hi" );
				}.bind( this ))
				.toThrow("expection: item must be of type Item or jQuery template row");
			});
		});
	});

	describe('Responding to Value Drags', function() {
		var event = {};

		beforeEach(function() {
			this.templateView = new TemplateView( this.defaultLayout );
			this.templateView.table = this.table;
			this.templateView.render();
		});

		describe('Drag Start', function() {

			beforeEach(function() {
				this.newItem = new Item({ title: "My Item" });
				this.valueView = new TemplateValueView( this.newItem, false );
				// this.event = document.createEvent('CustomEvent');
				// this.event.initCustomEvent('Columns.TemplateValueView.ValueDidBeginDragWithItem', false, false, {
				// 	valueView: 	this.valueView,
				// 	item: 		this.newItem,
				// 	event: 		event,
				// 	ui: 		{}
				// });
			});

			it('should update the current dragging item', function() {
				ColumnsEvent.send('Columns.TemplateValueView.ValueDidBeginDragWithItem', {
					valueView: 	this.valueView,
					item: 		this.newItem,
					event: 		event,
					ui: 		{}
				});
				expect( this.templateView.draggingItem ).toEqual( this.newItem );
			});

			it('should dissolve any groups that surround just a single value', function() {
				spyOn( this.templateView, 'dissolveSingleValueGroups' );
				
				ColumnsEvent.send('Columns.TemplateValueView.ValueDidBeginDragWithItem', {
					valueView: 	this.valueView,
					item: 		this.newItem,
					event: 		event,
					ui: 		{}
				});

				expect( this.templateView.dissolveSingleValueGroups ).toHaveBeenCalled();
			});
		});

		describe('Drag Stop', function() {

			beforeEach(function( done ) {
				this.newItem = new Item({ title: "My Item" });
				this.valueView = new TemplateValueView( this.newItem, false );
				this.valueView.render();
				// this.event = document.createEvent('CustomEvent');
				// this.event.initCustomEvent('Columns.TemplateValueView.ValueDidEndDragWithItem', false, false, {
				// 	valueView: 	this.valueView,
				// 	item: 		this.newItem,
				// 	event: 		event,
				// 	ui: 		{}
				// });

				spyOn( this.templateView, 'removeDraggingValue' );
				// spyOn( this.templateView, '_emitChange' );

				setTimeout(function() {
					done();
				}, 400 );
			});

			it('should remove the value from the template if the value is no longer in the template', function( done ) {
				spyOn( TemplateView, 'getValueForItem' ).and.returnValue( undefined );
				ColumnsEvent.send('Columns.TemplateValueView.ValueDidEndDragWithItem', {
					valueView: 	this.valueView,
					item: 		this.newItem,
					event: 		event,
					ui: 		{}
				});

				expect( this.templateView.removeDraggingValue ).toHaveBeenCalled();
				done();
					
			});

			xit('should emit a change event only after a delay if the value is no longer in the template', function( done ) {
				spyOn( TemplateView, 'getValueForItem' ).and.returnValue( undefined );
				ColumnsEvent.send('Columns.TemplateValueView.ValueDidEndDragWithItem', {
					valueView: 	this.valueView,
					item: 		this.newItem,
					event: 		event,
					ui: 		{}
				});

				expect( this.templateView._emitChange ).toHaveBeenCalled();
				done();
			});

			xit('should not remove the value if the value is still in the template', function( done ) {
				spyOn( TemplateView, 'getValueForItem' ).and.returnValue( {} );
				// this.templateView.droppableItems.push('hi');
				ColumnsEvent.send('Columns.TemplateValueView.ValueDidEndDragWithItem', {
					valueView: 	this.valueView,
					item: 		this.newItem,
					event: 		event,
					ui: 		{}
				});

				// expect( this.templateView._emitChange ).not.toHaveBeenCalled();
				expect( this.templateView.removeDraggingValue ).not.toHaveBeenCalled();
				done();
			});

			it('should do nothing if there is the value is still in the template', function( done ) {
				spyOn( TemplateView, 'getValueForItem' ).and.returnValue( {} );
				// var droppable = '<div class="fake"></div>';
				// this.templateView.droppableItems.push( droppable );
				ColumnsEvent.send('Columns.TemplateValueView.ValueDidEndDragWithItem', {
					valueView: 	this.valueView,
					item: 		this.newItem,
					event: 		event,
					ui: 		{}
				});

				expect( this.templateView.removeDraggingValue ).not.toHaveBeenCalledWith();
				// expect( this.templateView._emitChange ).not.toHaveBeenCalled();
				done();
			});

		});

		describe('Drag', function() {
			beforeEach(function() {
				this.newItem = new Item({ title: "My Item" });
				this.valueView = new TemplateValueView( this.newItem, false );
				// this.event = document.createEvent('CustomEvent');
				// this.event.initCustomEvent('Columns.TemplateValueView.ValueDidDragWithItem', false, false, {
				// 	valueView: 	this.valueView,
				// 	item: 		this.newItem,
				// 	event: 		event,
				// 	ui: 		{}
				// });

				spyOn( this.templateView, 'removePlaceholders' );
				this.positionSpy = spyOn( this.templateView, 'positionDropForDragEventInParentWithPlaceholder' );
			});

			it('should remove existing placeholders and set up new ones if there is an active droppable item', function() {
				var groupView	 	= new TemplateGroupView();
				var $group 			= groupView.render();
				var item 	 		= new Item({ title: "My Item"});
				this.templateView.draggingItem = item;
				this.templateView.droppableItems.push( groupView );

				ColumnsEvent.send('Columns.TemplateValueView.ValueDidDragWithItem', {
					valueView: 	this.valueView,
					item: 		this.newItem,
					event: 		event,
					ui: 		{}
				});

				expect( this.templateView.removePlaceholders ).toHaveBeenCalled();
				expect( this.positionSpy.calls.argsFor(0)[0] ).toEqual( event );
				expect( this.positionSpy.calls.argsFor(0)[1] ).toEqual( $group );
				expect( this.positionSpy.calls.argsFor(0)[2] ).toBe( true );
			});

			it('should do nothing if there is no active droppable item', function() {
				ColumnsEvent.send('Columns.TemplateValueView.ValueDidDragWithItem', {
					valueView: 	this.valueView,
					item: 		this.newItem,
					event: 		event,
					ui: 		{}
				});

				expect( this.templateView.removePlaceholders ).not.toHaveBeenCalled();
				expect( this.positionSpy ).not.toHaveBeenCalled();
			});
		});
	});

	describe('Respond to Group Drop Events', function() {

		beforeEach(function() {
			this.templateView = new TemplateView( this.defaultLayout );
			this.templateView.table = this.table;
			this.templateView.render();
			this.newItem = new Item({ title: "My Item" });
			this.valueView = new TemplateValueView( this.newItem );
			this.groupView = new TemplateGroupView();
			// this.event = document.createEvent('CustomEvent');
		});

		describe('Drop Over', function() {

			beforeEach(function() {
				// this.event.initCustomEvent('Columns.TemplateGroupView.GroupDidBeginDropOverWithValueView', false, false, {
				// 	groupView: 	this.groupView,
				// 	valueView: 	this.valueView,
				// 	event: 		event,
				// 	ui: 		{}
				// });
			});

			it('should add the group to the droppable items array only if not already present', function() {
				ColumnsEvent.send('Columns.TemplateGroupView.GroupDidBeginDropOverWithValueView', {
					groupView: 	this.groupView,
					valueView: 	this.valueView,
					event: 		event,
					ui: 		{}
				});
				expect( this.templateView.droppableItems.length ).toBe( 1 );
			});

			it('should not add the group to the droppable items array if already present', function() {
				this.templateView.droppableItems.push( this.groupView );
				
				ColumnsEvent.send('Columns.TemplateGroupView.GroupDidBeginDropOverWithValueView', {
					groupView: 	this.groupView,
					valueView: 	this.valueView,
					event: 		event,
					ui: 		{}
				});

				expect( this.templateView.droppableItems.length ).toBe( 1 );
			});

			it('should make sure the dragging element gets the droppable class', function() {
				loadFixtures('dragging-item-view.html');

				ColumnsEvent.send('Columns.TemplateGroupView.GroupDidBeginDropOverWithValueView', {
					groupView: 	this.groupView,
					valueView: 	this.valueView,
					event: 		event,
					ui: 		{}
				});

				expect( $('.ui-draggable-dragging') ).toHaveClass('droppable');
			});
		});

		describe('Drop Out', function() {

			beforeEach(function() {
				// this.event.initCustomEvent('Columns.TemplateGroupView.GroupDidEndDropOverWithValueView', false, false, {
				// 	groupView: 	this.groupView,
				// 	valueView: 	this.valueView,
				// 	event: 		event,
				// 	ui: 		{}
				// });
				spyOn( this.groupView, 'removePlaceholders' );
			});

			it('should clear any placeholders within the group', function() {
				ColumnsEvent.send('Columns.TemplateGroupView.GroupDidEndDropOverWithValueView', {
					groupView: 	this.groupView,
					valueView: 	this.valueView,
					event: 		event,
					ui: 		{}
				});
				expect( this.groupView.removePlaceholders ).toHaveBeenCalled();
			});

			it('should remove the droppable item from the droppable items array', function() {
				this.templateView.droppableItems.push( {} );
				this.templateView.droppableItems.push( this.groupView );
				this.templateView.droppableItems.push( {} );

				ColumnsEvent.send('Columns.TemplateGroupView.GroupDidEndDropOverWithValueView', {
					groupView: 	this.groupView,
					valueView: 	this.valueView,
					event: 		event,
					ui: 		{}
				});

				expect( this.templateView.droppableItems.indexOf( this.groupView ) ).toBe( -1 );
			});

			it('should make sure the dragging element loses the droppable class', function() {
				loadFixtures('dragging-item-view.html');
				$('.ui-draggable-dragging').addClass('droppable');
				
				ColumnsEvent.send('Columns.TemplateGroupView.GroupDidEndDropOverWithValueView', {
					groupView: 	this.groupView,
					valueView: 	this.valueView,
					event: 		event,
					ui: 		{}
				});

				expect( $('.ui-draggable-dragging') ).not.toHaveClass('droppable');
			});
		});

		describe('Drop', function() {
			var event = {};

			beforeEach(function() {
				// this.event.initCustomEvent('Columns.TemplateGroupView.GroupDidDropWithValueView', false, false, {
				// 	groupView: 	this.groupView,
				// 	valueView: 	this.valueView,
				// 	event: 		event,
				// 	ui: 		{}
				// });
				spyOn( this.groupView, 'removePlaceholders' );
				this.positionSpy = spyOn( this.templateView, 'positionDropForDragEventInParentWithPlaceholder' );
			});

			it('should do nothing if there are no droppable items', function() {
				ColumnsEvent.send('Columns.TemplateGroupView.GroupDidDropWithValueView', {
					groupView: 	this.groupView,
					valueView: 	this.valueView,
					event: 		event,
					ui: 		{}
				});

				expect( this.groupView.removePlaceholders ).not.toHaveBeenCalled();
				expect( this.templateView.positionDropForDragEventInParentWithPlaceholder ).not.toHaveBeenCalled();
			});

			it('should do nothing if this group is not the most recent droppable item', function() {
				this.templateView.droppableItems.push( this.groupView );
				this.templateView.droppableItems.push( {} );
				
				ColumnsEvent.send('Columns.TemplateGroupView.GroupDidDropWithValueView', {
					groupView: 	this.groupView,
					valueView: 	this.valueView,
					event: 		event,
					ui: 		{}
				});

				expect( this.groupView.removePlaceholders ).not.toHaveBeenCalled();
				expect( this.templateView.positionDropForDragEventInParentWithPlaceholder ).not.toHaveBeenCalled();
			});

			it('should clear any placeholders within the group', function() {
				this.templateView.droppableItems.push( {} );
				this.templateView.droppableItems.push( this.groupView );
				
				ColumnsEvent.send('Columns.TemplateGroupView.GroupDidDropWithValueView', {
					groupView: 	this.groupView,
					valueView: 	this.valueView,
					event: 		event,
					ui: 		{}
				});

				expect( this.groupView.removePlaceholders ).toHaveBeenCalled();
			});

			it('should position the drop within the template', function() {
				var $group = this.groupView.render();
				this.templateView.droppableItems.push( {} );
				this.templateView.droppableItems.push( this.groupView );
				
				ColumnsEvent.send('Columns.TemplateGroupView.GroupDidDropWithValueView', {
					groupView: 	this.groupView,
					valueView: 	this.valueView,
					event: 		event,
					ui: 		{}
				});

				expect( this.positionSpy ).toHaveBeenCalled();
				expect( this.positionSpy.calls.argsFor(0)[0] ).toEqual( event );
				expect( this.positionSpy.calls.argsFor(0)[1] ).toEqual( $group );
				expect( this.positionSpy.calls.argsFor(0)[2] ).toBe( false );
			});

			it('should clear the droppable items array', function() {
				this.templateView.droppableItems.push( {} );
				this.templateView.droppableItems.push( this.groupView );
				
				ColumnsEvent.send('Columns.TemplateGroupView.GroupDidDropWithValueView', {
					groupView: 	this.groupView,
					valueView: 	this.valueView,
					event: 		event,
					ui: 		{}
				});

				expect( this.templateView.droppableItems.length ).toBe( 0 );
			});
		});

	});

	describe('Respond to Value and Group Updates', function() {

		beforeEach(function() {
			this.templateView = new TemplateView( this.defaultLayout );
			this.templateView.table = this.table;
			this.templateView.render();
			spyOn( this.templateView, '_emitChange' );
		});

		it('should emit a change event when a value view is updated', function() {
			ColumnsEvent.send('Columns.TemplateValueView.DidChange', {
				valueView: 	new TemplateValueView()
			});

			expect( this.templateView._emitChange ).toHaveBeenCalled();
		});

		it('should emit a change event when a group view is updated', function() {
			ColumnsEvent.send('Columns.TemplateGroupView.DidChange', {
				groupView: 	new TemplateGroupView()
			});

			expect( this.templateView._emitChange ).toHaveBeenCalled();
		});
	});

	describe('Respond to Embeddable Table Events', function() {

		beforeEach(function() {
			this.templateView 	= new TemplateView( this.defaultLayout );
			this.templateView.table = this.table;
			this.$template 		= this.templateView.render();
		});

		// describe('Table Will Expand', function() {

		// 	beforeEach(function( done ) {
		// 		$.Velocity.hook(this.$template, "translateY", "-100px");
		// 		$(document).trigger('ColumnsTableWillExpand');
		// 		setTimeout(function() {
		// 			done();
		// 		}, 400);
		// 	});

		// 	it('should adjust the template position when the table is about to expand', function( done ) {
		// 		expect( $.Velocity.hook( this.$template, "translateY" ) ).toBe( 0 );
		// 		done();
		// 	});
		// });

		it('should add the expanded class to the template once the table has expanded', function() {
			$(document).trigger('ColumnsTableDidExpand');
			expect( this.templateView.$preview ).toHaveClass('expanded');
		});

		it('should remove the expanded class from the template once the table has collapsed', function() {
			$(document).trigger('ColumnsTableDidCollapse');
			expect( this.templateView.$preview ).not.toHaveClass('expanded');
		});

		describe('Table Did Render', function() {

			it('should adjust the template height to match the tallest row once the table renders', function() {
				var table = { tallestRowHeight: function() {} };
				loadFixtures('embed-table.html');
				spyOn( table, 'tallestRowHeight' ).and.returnValue( 186 );
				$(document).trigger('ColumnsTableDidRenderData', { table: table });
				expect( this.$template.find('.layout-template-row').height() ).toBe( 186 );

			});
		});

		describe('Scrolling the Template with the Table', function() {

			beforeEach(function() {
				loadFixtures('embed-table.html');
				this.$table = $('.columns-table-container');
			});

			it('should scroll with the expanded table', function() {
				spyOn( $.fn, 'scrollTop' ).and.returnValue( 12 );
				$(document).trigger('ColumnsTableDidScroll');

				expect( $.fn.scrollTop ).toHaveBeenCalled();
				expect( $.Velocity.hook( this.$template, "translateY" ) ).toBe( '-12px' );
			});

			it('should have a maximum scroll position', function() {
				spyOn( $.fn, 'scrollTop' ).and.returnValue( -12 );
				$(document).trigger('ColumnsTableDidScroll');

				expect( $.fn.scrollTop ).toHaveBeenCalled();
				expect( $.Velocity.hook( this.$template, "translateY" ) ).toBe( '0px' );
			});

			it('should have a minimum scroll position', function() {
				spyOn( $.fn, 'scrollTop' ).and.returnValue( 36 );
				$(document).trigger('ColumnsTableDidScroll');

				expect( $.fn.scrollTop ).toHaveBeenCalled();
				expect( $.Velocity.hook( this.$template, "translateY" ) ).toBe( '-24px' );
			});
		});
	});

	describe('Emitting Change Events', function() {

		it('should emit a change event', function() {
			var templateView = new TemplateView();
			spyOn( ColumnsEvent, 'send' );
			templateView._emitChange();

			expect( ColumnsEvent.send ).toHaveBeenCalled();
			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.TemplateView.DidChange');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].templateView ).toEqual( templateView );
		});

		it('should emit an even when it initally renders', function() {
			var templateView = new TemplateView();
			spyOn( ColumnsEvent, 'send' );
			templateView._emitRender();

			expect( ColumnsEvent.send ).toHaveBeenCalled();
			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.TemplateView.DidRender');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].templateView ).toEqual( templateView );
		});
	});

	describe('Sending Analytics Events', function() {
		var templateView;

		beforeEach(function() {
			// spyOn( ColumnsAnalytics, 'send' );
			templateView = new TemplateView( this.defaultLayout );
			templateView._setupTemplateEvents();
			templateView.table = new Table({ id: 4 });
		});

		it('should send an event when an item is removed from the template', function() {
			var valueView = new TemplateValueView( new Item({ title: "My Item" }) );
			spyOn( TemplateView, 'getValueForItem' ).and.returnValue( undefined );
			spyOn( templateView, 'removeDraggingValue' );
			ColumnsEvent.send('Columns.TemplateValueView.ValueDidEndDragWithItem', {
				valueView: valueView
			});

			expect( ColumnsAnalytics.send ).toHaveBeenCalledWith({
				category: 'template',
				action: 'remove',
				table_id: 4
			});
		});

		it('should send an event when an item is added to the template', function() {
			var groupView = new TemplateGroupView();
			groupView.render();
			spyOn( templateView, 'positionDropForDragEventInParentWithPlaceholder' );
			templateView.droppableItems.push( groupView );

			ColumnsEvent.send('Columns.TemplateGroupView.GroupDidDropWithValueView', {
				event: {},
				groupView: groupView
			});

			expect( ColumnsAnalytics.send ).toHaveBeenCalledWith({
				category: 'template',
				action: 'add',
				table_id: 4
			});
		});

	});
});