var ColumnsEvent 		= require('../../javascripts/models/ColumnsEvent.js');

jasmine.getFixtures().fixturesPath = 'specs/fixtures';

describe('Template Group View', function() {

	afterEach(function() {
		ColumnsEvent.offAll();
	});

	describe('Initialization', function() {

		beforeEach(function() {
			this.layout = [{
				property:'flex-direction',
				value: 'row'
			}, {
				property: 'justify-content',
				value: 'flex-start'
			}, {
				property: 'align-items',
				value: 'center'
			}];
			this.style = new Style([{
				property: 'padding',
				value: '12px'
			}])
		});

		it('should initialize without any properties', function() {
			var group = new TemplateGroupView();
			expect( group.layout ).toEqual( [] );
			expect( group.placeholder ).toBe( false );
		});

		it('should iniialize with a layout', function() {
			var group = new TemplateGroupView({ layout: this.layout });
			expect( group.layout ).toEqual( this.layout );
			expect( group.placeholder ).toBe( false );
		});

		it('should initialize with a style object', function() {
			var group = new TemplateGroupView({ layout: this.layout, style: this.style });
			expect( group.layout ).toEqual( this.layout );
			expect( group.placeholder ).toBe( false );
		});

		it('should optionally iniialize as a placeholder', function() {
			var group = new TemplateGroupView({ layout: this.layout, placeholder: true });
			expect( group.layout ).toEqual( this.layout );
			expect( group.placeholder ).toBe( true );
		});

		it('should initialize with the correct template', function()  {
			var group = new TemplateGroupView({ layout: this.layout });
			expect( group.template ).toEqual( Columns.Templates['templates/layout/row-group.hbs'] );
		});
	});

	describe('Generating Layout Objects', function() {

		it('should return a layout object given a jQuery object', function() {
			var $group = $('<div />').data({
				'align-items': 'center',
				'flex-direction': 'column'
			});
			expect( TemplateGroupView.layoutForGroup( $group ) ).toEqual([{
				property: 'align-items',
				value: 'center'
			}, {
				property: 'flex-direction',
				value: 'column'
			}]);
		});

		it('should throw an error if not passed a jQuery object', function() {
			expect(function() {
				TemplateGroupView.layoutForGroup( 'Hi' );
			}).toThrow("exception: group must be jQuery object");
		});
	});

	describe('Rendering', function() {

		beforeEach(function() {
			this.layout = [{
				property:'flex-direction',
				value: 'row'
			}, {
				property: 'justify-content',
				value: 'flex-start'
			}, {
				property: 'align-items',
				value: 'center'
			}]
			this.groupView = new TemplateGroupView({ layout: this.layout });
		});

		it('should render the group with the correct layout', function() {
			var $group = this.groupView.render();
			expect( $group.data('flex-direction') ).toBe('row');
			expect( $group.data('justify-content') ).toBe('flex-start');
			expect( $group.data('align-items') ).toBe('center');
		});

		it('should render as a placeholder when apppropriate', function() {
			var groupView = new TemplateGroupView({ layout: this.item, placeholder: true });
			var $group = groupView.render();
			expect( $group ).toHaveClass('placeholder');
		});

		it('should not render as a placeholder when normal', function() {
			var groupView = new TemplateGroupView( this.item, false );
			var $group = groupView.render();
			expect( $group ).not.toHaveClass('placeholder');
		});

		it('should create a reference to its UI', function() {
			var $group = this.groupView.render();
			expect( this.groupView.$group ).toEqual( $group );
		});
	});

	describe('Updating the Layout Object', function() {

		beforeEach(function() {
			this.groupView = new TemplateGroupView({
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
		});

		it('should replace existing layouts', function() {
			this.groupView._mergeLayout( 'align-items', 'left' );
			expect( this.groupView.layout ).toEqual( [{
				property:'flex-direction',
				value: 'row'
			}, {
				property: 'justify-content',
				value: 'flex-start'
			}, {
				property: 'align-items',
				value: 'left'
			}] );
		});

		it('should append new layouts', function() {
			this.groupView._mergeLayout( 'flex-grow', '0' );
			expect( this.groupView.layout ).toEqual( [{
				property:'flex-direction',
				value: 'row'
			}, {
				property: 'justify-content',
				value: 'flex-start'
			}, {
				property: 'align-items',
				value: 'center'
			}, {
				property: 'flex-grow',
				value: '0'
			}] );
		});
	});

	describe('Updating the Group View', function() {

		beforeEach(function() {
			this.groupView = new TemplateGroupView({
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
			this.groupView.render();
		});

		it('should render the item with the correct updated layout', function() {
			this.groupView.layout = [{
				property:'flex-direction',
				value: 'column'
			}, {
				property: 'justify-content',
				value: 'flex-start'
			}, {
				property: 'align-items',
				value: 'flex-end'
			}, {
				property: 'align-content',
				value: 'stretch'
			}];
			var $group = this.groupView.update();
			expect( $group.data('flex-direction') ).toBe('column');
			expect( $group.data('justify-content') ).toBe('flex-start');
			expect( $group.data('align-items') ).toBe('flex-end');
			expect( $group.data('align-content') ).toBe('stretch');

			expect( $group.attr('layout-flex-direction') ).toBe('column');
			expect( $group.attr('layout-justify-content') ).toBe('flex-start');
			expect( $group.attr('layout-align-items') ).toBe('flex-end');
			expect( $group.attr('layout-align-content') ).toBe('stretch');
		});

		it('should create a reference to its UI', function() {
			this.groupView.layout = [{
				property:'flex-direction',
				value: 'column'
			}, {
				property: 'justify-content',
				value: 'flex-start'
			}, {
				property: 'align-items',
				value: 'flex-end'
			}, {
				property: 'align-content',
				value: 'stretch'
			}];
			var $group = this.groupView.update();
			expect( this.groupView.$group ).toEqual( $group );
		});

		it('should emit an event once the update has finished', function() {
			spyOn( ColumnsEvent, 'send' );
			this.groupView.layout = [{
				property:'flex-direction',
				value: 'column'
			}, {
				property: 'justify-content',
				value: 'flex-start'
			}, {
				property: 'align-items',
				value: 'flex-end'
			}, {
				property: 'align-content',
				value: 'stretch'
			}];
			this.groupView.update();
			expect( ColumnsEvent.send ).toHaveBeenCalled();
			expect( ColumnsEvent.send.calls.argsFor(0)[0]).toBe('Columns.TemplateGroupView.DidChange');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].groupView ).toEqual( this.groupView );
		});
	});	

	describe('Getting Group Titles', function() {

		beforeEach(function() {
			loadFixtures('template-bare.html');
			this.groupView = new TemplateGroupView();
			this.$group = this.groupView.render();
		})

		it('should return "Row" if the group is the first in the template', function() {
			$('.layout-template-row').append( this.$group );
			expect( this.groupView.title() ).toBe('Row');
		});

		it('should return "Group" for any other group', function() {
			$('.layout-template-row-group').append( this.$group );
			expect( this.groupView.title() ).toBe('Group');
		});
	});

	describe('Getting Layout Values for Group', function() {

		beforeEach(function() {
			this.groupView = new TemplateGroupView({
				layout: [{
					property:'flex-direction',
					value: 'row'
				}, {
					property: 'justify-content',
					value: 'flex-start'
				}, {
					property: 'align-items',
					value: 'center'
				}],
				style: [{
					property: 'font-size',
					value: '12px'
				}]
			});
			this.$group = this.groupView.render();
		});

		it('should return the correct layout value for an existing property', function() {
			expect( this.groupView.getStyle( 'align-items' ) ).toBe('center');
		});

		it('should return the style value of a property if it is not part of the layout object', function() {
			expect( this.groupView.getStyle( 'font-size' ) ).toBe('12px');
		});

		it('should return the default css value of a property that is not part of the layout or style objects', function() {
			expect( this.groupView.getStyle( 'text-align' ) ).toBe( '' );
		});

		xit('should return undefined for a property that does not exist for the group', function() {
			expect( this.groupView.getStyle( 'text-align' ) ).toBeUndefined();
		});
	});

	describe('Responding to Events', function() {

		beforeEach(function() {
			this.layout = [{
				property:'flex-direction',
				value: 'row'
			}, {
				property: 'justify-content',
				value: 'flex-start'
			}, {
				property: 'align-items',
				value: 'center'
			}];
			this.groupView = new TemplateGroupView({ layout: this.layout });
			this.groupView.render();
			spyOn( this.groupView, '_mergeLayout');
			spyOn( this.groupView, 'update');
		});

		it('should respond to layout change events for itself', function() {
			// var event = document.createEvent('CustomEvent');
			// event.initCustomEvent('Columns.StyleView.PropertyDidUpdateWithValueForGroupView', false, false, {
			// 	groupView: this.groupView,
			// 	property: 'align-items',
			// 	value: 'left'
			// });
			// document.dispatchEvent( event );
			ColumnsEvent.send('Columns.StyleView.PropertyDidUpdateWithValueForGroupView', {
				groupView: this.groupView,
				property: 'align-items',
				value: 'left'
			});

			expect( this.groupView._mergeLayout ).toHaveBeenCalledWith( 'align-items', 'left' );
			expect( this.groupView.update ).toHaveBeenCalled();
		});

		it('should ignore change events for other groups', function() {
			var newGroupView = new TemplateGroupView( this.layout );
			// var event = document.createEvent('CustomEvent');
			// event.initCustomEvent('Columns.StyleView.PropertyDidUpdateWithValueForGroupView', false, false, {
			// 	groupView: newGroupView,
			// 	property: 'align-items',
			// 	value: 'left'
			// });
			// document.dispatchEvent( event );
			ColumnsEvent.send('Columns.StyleView.PropertyDidUpdateWithValueForGroupView', {
				groupView: newGroupView,
				property: 'align-items',
				value: 'left'
			});

			expect( this.groupView._mergeLayout ).not.toHaveBeenCalled();
			expect( this.groupView.update ).not.toHaveBeenCalled();
		});
	});

	describe('Dropping', function() {

		beforeEach(function() {
			this.groupView	= new TemplateGroupView({
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
			this.$group		= this.groupView.render();
			this.valueView 	= new TemplateValueView( new Item({ title: "My Item" }) );
			this.fakeUI		= {
				droppable: this.valueView
			};

			spyOn( ColumnsEvent, 'send' );
		});

		it('should be droppable', function() {
			expect( this.$group.droppable('instance') ).toBeDefined();
		});

		it('should emit an event on drop over', function() {
			this.$group.trigger('dropover', this.fakeUI);
			expect( ColumnsEvent.send.calls.argsFor(0)[0]).toBe('Columns.TemplateGroupView.GroupDidBeginDropOverWithValueView');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].groupView ).toEqual( this.groupView );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].valueView ).toEqual( this.valueView );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].ui ).toEqual( this.fakeUI );
		});

		it('should emit an event on drop out', function() {
			this.$group.trigger('dropout', this.fakeUI);
			expect( ColumnsEvent.send.calls.argsFor(0)[0]).toBe('Columns.TemplateGroupView.GroupDidEndDropOverWithValueView');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].groupView ).toEqual( this.groupView );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].valueView ).toEqual( this.valueView );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].ui ).toEqual( this.fakeUI );
		});

		it('should emit an event on drop', function() {
			this.$group.trigger('drop', this.fakeUI);
			expect( ColumnsEvent.send.calls.argsFor(0)[0]).toBe('Columns.TemplateGroupView.GroupDidDropWithValueView');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].groupView ).toEqual( this.groupView );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].valueView ).toEqual( this.valueView );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].ui ).toEqual( this.fakeUI );
		});
	});

	describe('Managing UI', function() {

		it('should remove inner placeholders', function() {
			var groupView 		= new TemplateGroupView();
			var $group 			= groupView.render();
			$group.append( readFixtures('inner-template-with-placeholders.html') );
			groupView.removePlaceholders();
			expect( $group.find('.layout-template-row-value').length ).toBe( 1 );
			expect( $group.find('.layout-template-row-group').length ).toBe( 0 );
		});
	});
});