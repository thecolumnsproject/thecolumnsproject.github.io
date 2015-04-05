var ColumnsEvent 		= require('../../javascripts/models/ColumnsEvent.js');
var TemplateValueView 	= require('../../javascripts/controllers/TemplateValueView.js');

describe('Item View', function() {

	afterEach(function() {
		ColumnsEvent.offAll();
	});

	describe('Initialization', function() {

		it('should initialize with a given item', function() {
			var item = new Item({title: "My Item"});
			var itemView = new ItemView(item);
			expect(itemView.item).toBe(item);
		});

		it('should initialize with an empty item if one was not passed in', function() {
			var itemView = new ItemView();
			expect(itemView.item).toEqual(new Item());
		});

		it('should initiatize with the correct template', function() {
			var itemView = new ItemView();
			expect(itemView.template).toEqual(Columns.Templates['templates/layout/column.hbs']);
		});

		it('should initiatize as unselected', function() {
			var itemView = new ItemView();
			expect( itemView.selected ).toBeFalsy();
		});
	});

	describe('Rendering', function() {

		beforeEach(function() {
			var item = new Item({
				title: 'my_item',
				style: 'font-size:14px;color:#3a3a3a;margin-left:12px;',
				active: false
			});
			this.itemView = new ItemView(item);
		});

		it('should render with the correct html elements', function() {
			expect( this.itemView.render() ).toHaveClass('layout-column');
		});

		it('should have the correct text', function() {
			expect( this.itemView.render() ).toContainText('My Item');
		});

		it('should have the correct css', function() {
			expect( this.itemView.render().data('style') ).toEqual([{
				property: 'font-size',
				value: '14px'
			}, {
				property: 'color',
				value: '#3a3a3a'
			}, {
				property: 'margin-left',
				value: '12px'
			}]);
		});

		it('should have the correct active status', function() {
			expect( this.itemView.render() ).toHaveClass('inactive');
		});

		it('should have the correct selected status', function() {
			this.itemView.selected = true;
			expect( this.itemView.render() ).toHaveClass('selected');
		});

		it('should replace itself if already rendered', function() {
			var $old = this.itemView.render();
			this.itemView.item.title = "New Title";
			var $new = this.itemView.render();
			expect( this.itemView.$item ).toEqual( $new );
			expect( this.itemView.$item ).not.toEqual( $old );
		});
	});

	describe('Dragging', function() {

		beforeEach(function() {
			var item = new Item({
				title: 'My Item',
				style: 'font-size:14px;color:#3a3a3a;margin-left:12px;'
			});

			this.fakeUI		= {};
			this.item 		= new ItemView( item );
			this.$item		= this.item.render();

			spyOn( ColumnsEvent, 'send' );

		});

		it('should be draggable', function() {
			expect( this.$item.draggable('instance') ).toBeDefined();
		});

		describe('Drag Start', function() {

			it('should emit an event on drag start', function() {
				this.$item.trigger('dragstart', this.fakeUI);
				expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.ItemView.ItemDidBeginDrag');
				expect( ColumnsEvent.send.calls.argsFor(0)[1].item ).toEqual( this.item );
				expect( ColumnsEvent.send.calls.argsFor(0)[1].ui ).toEqual( this.fakeUI );
			});

			it('should get dragging class on drag start', function() {
				this.$item.trigger('dragstart', this.fakeUI);
				expect( this.$item ).toHaveClass('dragging');
			});
		});

		describe('Drag Stop', function() {

			it('should emit an event on drag stop', function() {
				this.$item.trigger('dragstop', this.fakeUI);
				expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.ItemView.ItemDidEndDrag');
				expect( ColumnsEvent.send.calls.argsFor(0)[1].item ).toEqual( this.item );
				expect( ColumnsEvent.send.calls.argsFor(0)[1].ui ).toEqual( this.fakeUI );
			});

			it('should lose dragging class on drag stop', function() {
				this.$item.trigger('dragstop', this.fakeUI);
				expect( this.$item ).not.toHaveClass('dragging');
			});
		});

		it('should emit an event on drag', function() {
			this.$item.trigger('drag', this.fakeUI);
			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.ItemView.ItemDidDrag');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].item ).toEqual( this.item );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].ui ).toEqual( this.fakeUI );
		});
	});

	describe('Clicking', function() {

		beforeEach(function() {
			this.itemView	= new ItemView( new Item({ title: "My Item" }) );
			this.$item		= this.itemView.render();
			spyOn( ColumnsEvent, 'send' );
		});

		it('should emit an event on click', function() {
			this.$item.trigger('click');
			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.ItemView.ItemDidSelect');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].itemView ).toEqual( this.itemView );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].item ).toEqual( this.itemView.item );
		});

		it('should get selected on click', function() {
			this.$item.trigger('click');
			expect( this.itemView.selected ).toBeTruthy();
			expect( this.$item ).toHaveClass('selected');
		});

	});

	describe('Listening to Events', function() {

		describe('Value Selection', function() {
			var item;

			beforeEach(function() {
				item = new Item({ title: "My Item" });
				this.itemView = new ItemView( item );
				this.itemView.render();
			});

			it('should set itself as selected if the value represents this item', function() {
				spyOn( item, 'is' ).and.returnValue( true );

				ColumnsEvent.send('Columns.TemplateValueView.ValueDidSelectWithItem', {
					valueView: 	new TemplateValueView(),
					item: 		item
				});

				expect( this.itemView.$item ).toHaveClass('selected');
			});

			it('should set itself as unselected if the value does not represent this item', function () {
				spyOn( item, 'is' ).and.returnValue( false );

				this.itemView.$item.addClass('selected');
				ColumnsEvent.send('Columns.TemplateValueView.ValueDidSelectWithItem', {
					valueView: 	new TemplateValueView(),
					item: 		item
				});

				expect( this.itemView.$item ).not.toHaveClass('selected');
			});
		});

		describe('Item View Selection', function() {
			var item;

			beforeEach(function() {
				item = new Item({ title: "My Item" });
				this.itemView = new ItemView( item );
				this.itemView.render();
				this.itemView.selected = true;
				this.itemView.$item.addClass('selected');
			});

			it('should do nothing if the view represents this item', function() {
				ColumnsEvent.send( 'Columns.ItemView.ItemDidSelect', {
					itemView: 	this.itemView,
					item: 		item
				});

				expect( this.itemView.selected ).toBeTruthy();
				expect( this.itemView.$item ).toHaveClass('selected');
			});

			it('should set itself as unselected if the view does not represent this item', function () {
				var otherItem = new Item({ title: 'Other Item' });
				ColumnsEvent.send( 'Columns.ItemView.ItemDidSelect', {
					itemView: 	new ItemView( otherItem ),
					item: 		otherItem
				});

				expect( this.itemView.selected ).toBeFalsy();
				expect( this.itemView.$item ).not.toHaveClass('selected');
			});
		});

		describe('Setting Selection State', function() {

			beforeEach(function() {
				item = new Item({ title: "My Item" });
				this.itemView = new ItemView( item );
				this.$itemView = this.itemView.render();
			});

			it('should set selected as true', function() {
				this.itemView._setSelected( true );
				expect( this.itemView.selected ).toBeTruthy();
				expect( this.itemView.$item ).toHaveClass('selected');
			});

			it('should set selected as false', function() {
				this.itemView.selected = true;
				this.itemView.$item.addClass('selected');

				this.itemView._setSelected( false );

				expect( this.itemView.selected ).toBeFalsy();
				expect( this.itemView.$item ).not.toHaveClass('selected');

			});
		});
	});
});