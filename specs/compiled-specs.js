(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
jasmine.getFixtures().fixturesPath = 'specs/fixtures';

describe('Embed Details View', function() {

	afterEach(function() {
		ColumnsEvent.offAll();
	});

	describe('Initialization', function() {

		it('should initialize with a table object', function() {
			var table = new Table();
			var embed = new EmbedDetailsView( table );
			expect( embed.table ).toEqual( table );
		});

	});

	describe('Rendering', function() {

		beforeEach(function() {
			this.embed = new EmbedDetailsView( new Table({ id: 4 }) );
			this.$embed = this.embed.render();
		});

		it('should attached to the correct part of the DOM', function() {
			expect( this.$embed.parent() ).toEqual('body');
		});

		it('should contain an input field for title', function() {
			expect( this.$embed ).toContainElement( ".columns-panel-input [data-property='title']" );
		});

		it('should contain an input field for source', function() {
			expect( this.$embed ).toContainElement( ".columns-panel-input [data-property='source']" );
		});

		it('should contain an input field for source url', function() {
			expect( this.$embed ).toContainElement( ".columns-panel-input [data-property='source_url']" );
		});

		it('should contain a field for the embed url', function() {
			// expect( this.$embed.find('textarea script') ).toHaveAttr( 'src', config.embed.host + config.embed.path )
			// expect( this.$embed.find('textarea script') ).toHaveAttr( 'data-table-id', 4 );
			expect( this.$embed.find('textarea') ).toContainText('<script type="text/javascript" src="' + config.embed.host + config.embed.path + '" data-table-id="' + 4 + '" async></script>');
		});

		it('should save a reference to the template', function() {
			expect( this.embed.$embed ).toEqual( this.$embed );
		});

		it('should be hidden', function() {
			expect( this.$embed ).not.toHaveClass('active');
		})
	});

	describe('Hiding and Showing', function() {

		beforeEach(function() {
			this.embed = new EmbedDetailsView( new Table({ id: 4 }));
			this.embed.render();
		});

		it('should hide', function() {
			this.embed.hide();
			expect( this.embed.$embed ).not.toHaveClass('active');
		});

		it('should show', function() {
			this.embed.show();
			expect( this.embed.$embed ).toHaveClass('active');
		});

	});

	describe('Listening to User Events', function() {

		beforeEach(function() {
			loadFixtures('header.html');
			this.embed = new EmbedDetailsView( new Table({ id: 4 }));
			this.embed.render();
		});

		it('should show when the embed button is clicked', function() {			
			spyOn( this.embed, 'show' );
			$('.columns-header-nav-embed').trigger('click');
			expect( this.embed.show ).toHaveBeenCalled();
		});

		it('should hide when the close button is clicked', function() {
			spyOn( this.embed, 'hide' );
			$('.columns-panel-header-close-button').trigger('click');
			expect( this.embed.hide ).toHaveBeenCalled();
		});

		it('should hide when the blocker is cliked', function() {
			spyOn( this.embed, 'hide' );
			$('.columns-panel-blocker').trigger('click');
			expect( this.embed.hide ).toHaveBeenCalled();
		});

		it('should respond to keyup events on the title input', function() {
			var $title = $('input[data-property="title"]');
			$title.val('hola');
			spyOn( this.embed, '_emitChange' );

			$title.trigger('keyup');
			expect( this.embed._emitChange ).toHaveBeenCalledWith( 'title', 'hola' );
		});

		it('should respond to keyup events on the source input', function() {
			var $source = $('input[data-property="source"]');
			$source.val('hola');
			spyOn( this.embed, '_emitChange' );

			$source.trigger('keyup');
			expect( this.embed._emitChange ).toHaveBeenCalledWith( 'source', 'hola' );
		});

		it('should respond to keyup events on the source_url input', function() {
			var $sourceUrl = $('input[data-property="source_url"]');
			$sourceUrl.val('hola');
			spyOn( this.embed, '_emitChange' );

			$sourceUrl.trigger('keyup');
			expect( this.embed._emitChange ).toHaveBeenCalledWith( 'source_url', 'hola' );
		});

		it('should respond to blur events on the title input', function() {
			var $title = $('input[data-property="title"]');
			$title.val('hola');
			spyOn( this.embed, '_emitChange' );

			$title.trigger('blur');
			expect( this.embed._emitChange ).toHaveBeenCalledWith( 'title', 'hola' );
		});

		it('should respond to blur events on the source input', function() {
			var $source = $('input[data-property="source"]');
			$source.val('hola');
			spyOn( this.embed, '_emitChange' );

			$source.trigger('blur');
			expect( this.embed._emitChange ).toHaveBeenCalledWith( 'source', 'hola' );
		});

		it('should respond to blur events on the source_url input', function() {
			var $sourceUrl = $('input[data-property="source_url"]');
			$sourceUrl.val('hola');
			spyOn( this.embed, '_emitChange' );

			$sourceUrl.trigger('blur');
			expect( this.embed._emitChange ).toHaveBeenCalledWith( 'source_url', 'hola' );
		});

		xit('should copy the embed url when the copy link is clicked', function() {

		});

	});

	describe('Listening to Table Events', function() {

		beforeEach(function() {
			this.embed = new EmbedDetailsView();
			spyOn( this.embed, 'render' );
		});

		it('should render upon table upload', function() {
			var table = new Table({ id: 6 });
			ColumnsEvent.send('Columns.Table.DidUploadWithSuccess', {
				table: 	table
			});

			expect( this.embed.table ).toEqual( table );
			expect( this.embed.render ).toHaveBeenCalled();
		});

	});

	describe('Emitting Update Events', function() {

		beforeEach(function() {
			this.embed = new EmbedDetailsView( new Table({ id: 4 }));
			this.embed.render();
		});

		it('should emit an event on change', function() {
			spyOn( ColumnsEvent, 'send' );
			this.embed._emitChange( 'property', 'value' );

			expect( ColumnsEvent.send.calls.argsFor(0)[0]).toBe('Columns.EmbedDetailsView.DidUpdatePropertyWithValue');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].embed ).toEqual( this.embed );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].property ).toBe( 'property' );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].value ).toBe( 'value' );
		});
	});

});
},{}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
jasmine.getFixtures().fixturesPath = 'specs/fixtures';

describe('Items View', function() {

	afterEach(function() {
		ColumnsEvent.offAll();
	});

	describe('Initialization', function() {

		it('should accept an array of Items', function() {
			var items = [ new Item({ title: 'First Name' }), new Item({ title: 'Last Name' }), new Item({ title: 'Hometown' }), new Item({ title: 'Age' }) ];
			var itemsView = new ItemsView( items );
			expect( itemsView.items ).toEqual( items );
		});

		it ('shoud accept no items', function() {
			var itemsView = new ItemsView();
			expect( itemsView.items ).toEqual( [] );
		});

		it('should initiatize with the correct template', function() {
			var itemsView = new ItemsView();
			expect( itemsView.template ).toEqual( Columns.Templates['templates/layout/columns.hbs'] );
		});

		it('should initiatize with an empty item views array', function() {
			var itemsView = new ItemsView();
			expect( itemsView.views ).toEqual( [] );
		});
	});

	describe('Rendering', function() {

		beforeEach(function() {
			this.itemsView = new ItemsView([ new Item({ title: 'First Name' }), new Item({ title: 'Last Name' }), new Item({ title: 'Hometown' }), new Item({ title: 'Age' }) ]);
		});

		it('should contain a column for each item', function() {
			loadFixtures('columns.html');
			this.itemsView.render();
			expect( $('.layout-column').length ).toBe(4);
		});

		it('should append new items', function() {
			loadFixtures('columns.html');
			this.itemsView.render();

			var newItems = [ new Item({ title: 'Batting Average' }), new Item({ title: 'Baseball Player' }), new Item({ title: 'Season' }), new Item({ title: 'Team' }), new Item({ title: 'Coach' }) ];
			this.itemsView._updateWithItems( newItems );
			this.itemsView.render();

			var $columns = $('.layout-column');
			expect( $columns.length ).toBe( 9 );
			expect( $columns.eq( 4 ) ).toContainText('Batting Average');
			// expect( $columns ).not.toContainText('First Name');
		});

		it('should create references to item views', function() {
			// this.itemsView.render();
			expect( this.itemsView.views.length ).toBe( 4 );
			expect( this.itemsView.views[ 2 ].item.title ).toBe('Hometown');
		});

		it('should append new item views', function() {
			var newItems = [ new Item({ title: 'Batting Average' }), new Item({ title: 'Baseball Player' }), new Item({ title: 'Season' }), new Item({ title: 'Team' }), new Item({ title: 'Coach' }) ];
			this.itemsView._updateWithItems( newItems );
			this.itemsView.render();

			expect( this.itemsView.views.length ).toBe( 9 );
			expect( this.itemsView.views[ 4 ].item.title ).toBe('Batting Average');
		});
	});

	describe('Updating an Existing Item', function() {

		beforeEach(function() {
			this.item = new Item({ title: 'Last Name' });
			this.itemsView = new ItemsView([ new Item({ title: 'First Name' }), this.item, new Item({ title: 'Hometown' }), new Item({ title: 'Age' }) ]);
			this.$items = this.itemsView.render();
		});

		it('should re-render the given item', function() {
			// expect( this.$items.find('.layout-column').eq( 1 ) ).not.toHaveClass('inactive');

			this.item.active = false;
			this.itemsView.updateItem( this.item );

			expect( this.$items.find('.layout-column').eq( 1 ) ).toHaveClass('inactive');
		});

		it('should emit a change event', function() {
			spyOn( this.itemsView, '_emitChange' );
			this.itemsView.updateItem( this.item );
			expect( this.itemsView._emitChange ).toHaveBeenCalled();
		});
	});

	describe('Updating With New Items', function() {

		beforeEach(function() {
			this.itemsView = new ItemsView([ new Item({ title: 'First Name' }), new Item({ title: 'Last Name' }), new Item({ title: 'Hometown' }), new Item({ title: 'Age' }) ]);
			this.newItems = [
				new Item({ title: 'First Name' }),
				new Item({ title: 'School' }),
				new Item({ title: 'Middle Name' }),
				'hello'
			];
		});

		it('should append new items and ignore duplicates and non-items', function() {
			this.itemsView._updateWithItems( this.newItems );
			expect( this.itemsView.items.length ).toBe( 6 );
			expect( this.itemsView.items ).toEqual( [
				new Item({ title: 'First Name' }),
				new Item({ title: 'Last Name' }),
				new Item({ title: 'Hometown' }),
				new Item({ title: 'Age' }),
				new Item({ title: 'School' }),
				new Item({ title: 'Middle Name' }),
			] );

		});

		xit('should add new item views to the array', function() {
			this.itemsView.render();
			this.itemsView._updateWithItems( this.newItems );
			expect( this.itemsView.views.length ).toBe( 6 );
		});

		it('should do nothing if not passed any items', function() {
			this.itemsView._updateWithItems();
			expect( this.itemsView.items.length ).toBe( 4 );
			expect( this.itemsView.items ).toEqual( [
				new Item({ title: 'First Name' }),
				new Item({ title: 'Last Name' }),
				new Item({ title: 'Hometown' }),
				new Item({ title: 'Age' })
			] );
		});

		it('should throw an error if not passed an array or single item', function() {
			expect( function() {
				this.itemsView._updateWithItems( 'hi' );
			}.bind( this )).toThrow("exception Items must be array of items or single item");
		});

		it('should emit a change event', function() {
			spyOn( this.itemsView, '_emitChange' );

			this.itemsView._updateWithItems( this.newItems );

			expect( this.itemsView._emitChange ).toHaveBeenCalled();
		});
	});

	describe('Updating with a Single Item', function() {

		beforeEach(function() {
			this.itemsView = new ItemsView([ new Item({ title: 'First Name' }), new Item({ title: 'Last Name' }), new Item({ title: 'Hometown' }), new Item({ title: 'Age' }) ]);
		});

		it('should append a new item', function() {
			this.itemsView._updateWithItem( new Item({ title: 'School' }) );
			expect( this.itemsView.items.length ).toBe( 5 );
			expect( this.itemsView.items ).toEqual( [
				new Item({ title: 'First Name' }),
				new Item({ title: 'Last Name' }),
				new Item({ title: 'Hometown' }),
				new Item({ title: 'Age' }),
				new Item({ title: 'School' }),
			] );
		});

		it('should ignore duplicate items', function() {
			this.itemsView._updateWithItem( new Item({ title: 'Hometown' }) );
			expect( this.itemsView.items.length ).toBe( 4 );
			expect( this.itemsView.items ).toEqual( [
				new Item({ title: 'First Name' }),
				new Item({ title: 'Last Name' }),
				new Item({ title: 'Hometown' }),
				new Item({ title: 'Age' }),
			] );
		});

		it('should ignore non-items', function() {
			this.itemsView._updateWithItem( 'hi' );
			expect( this.itemsView.items.length ).toBe( 4 );
			expect( this.itemsView.items ).toEqual( [
				new Item({ title: 'First Name' }),
				new Item({ title: 'Last Name' }),
				new Item({ title: 'Hometown' }),
				new Item({ title: 'Age' }),
			] );
		});
	});

	describe('Get an itemview for a given item', function() {

		beforeEach(function() {
			this.itemsView = new ItemsView([ new Item({ title: 'First Name' }), new Item({ title: 'Last Name' }), new Item({ title: 'Hometown' }), new Item({ title: 'Age' }) ]);
		});

		it('should return the first itemview that matches the given item', function() {
			expect( this.itemsView.itemViewForItem( new Item({ title: 'Last Name' }) ) ).toEqual( this.itemsView.views[ 1 ] );
		});

		it('should return undefined if there is no match', function() {
			expect( this.itemsView.itemViewForItem( new Item({ title: 'Birthday' }) ) ).toBeUndefined();
		});

		it('should return undefined if not passed an item', function() {
			expect( this.itemsView.itemViewForItem( "hi" ) ).toBeUndefined();
		});
	});	

	describe('Responding to Events', function() {

		beforeEach(function() {
			this.itemsView = new ItemsView();
			this.items = [
				new Item({ title: 'First Name' }),
				new Item({ title: 'Last Name' }),
				new Item({ title: 'Hometown' }),
				new Item({ title: 'Age' }),
			];
		});

		describe('Table Change Events', function() {

			it('should update itself with any new items', function() {
				spyOn( this.itemsView, '_updateWithItems' );
				spyOn( this.itemsView, 'render' );

				// var columnsEvent = document.createEvent('CustomEvent');
				// columnsEvent.initCustomEvent('Columns.Table.DidChange', false, false, {
				// 	table: 	new Table({ columns: this.items })
				// });
				// // document.dispatchEvent(columnsEvent);
				// $(document).trigger({
				// 	type: 'Columns.Table.DidChange',
				// 	detail: {
				// 		table: 	new Table({ columns: this.items })
				// 	}
				// })

				ColumnsEvent.send( 'Columns.Table.DidChange', {
					table: 	new Table({ columns: this.items })
				});

				expect( this.itemsView._updateWithItems ).toHaveBeenCalledWith( this.items );
				expect( this.itemsView.render ).toHaveBeenCalled();
			});
		});

		describe('Item Updates', function() {

			beforeEach(function() {
				this.item = new Item({ title: 'Last Name'});
				// this.event = document.createEvent('CustomEvent');
				// this.event.initCustomEvent('Columns.Item.DidChange', false, false, {
				// 	item: 	this.item
				// });

				spyOn( this.itemsView, 'updateItem' );
			});

			it('should update the given item', function() {
				// document.dispatchEvent( this.event );
				ColumnsEvent.send( 'Columns.Item.DidChange', {
					item: 	this.item
				});
				expect( this.itemsView.updateItem ).toHaveBeenCalledWith( this.item );
			});
		});
	});

	describe('Emitting Change Events', function() {

		beforeEach(function() {
			this.itemsView = new ItemsView();
			spyOn( ColumnsEvent, 'send' );
		});

		it('should emit a change event', function() {
			this.itemsView._emitChange();

			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.ItemsView.DidChange');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].itemsView ).toEqual( this.itemsView );
		});
	});
});
},{}],4:[function(require,module,exports){
jasmine.getFixtures().fixturesPath = 'specs/fixtures';

describe('Style Component View Spec', function() {

	afterEach(function() {
		ColumnsEvent.offAll();
	});

	describe('Initialization', function() {

		beforeEach(function() {
			// this.$groups = 'fake groups';
			// spyOn( TemplateView, 'getGroupsForItem' ).and.returnValue( this.$groups );
		});

		it('should initialize with the correct defaults', function() {
			var componentView = new StyleComponentView();
			expect( componentView.item ).toBeUndefined();
			// expect( componentView.templateGroups ).toEqual( [] );
		});

		it('should optionally initialize with an item', function() {
			var item = new Item({ title: "My Item" });
			var componentView = new StyleComponentView( item );
			expect( componentView.item ).toEqual( item );
		});

		it('should optionally initialize with a TemplateGroupView', function() {
			var item = new TemplateGroupView();
			var componentView = new StyleComponentView( item );
			expect( componentView.item ).toEqual( item );
		});

		xit('should throw an error if initialized with anything other than an Item, ItemView, TemplateValueView or TemplateGroupView', function() {
			expect(function() {
				new StyleComponentView( "nope" );
			}).toThrow("exception: Selection must be an Item, ItemView, TemplateValueView or TemplateGroupView");
		});

		xit('should determine all parent groups', function() {
			var item = new Item({ title: "My Item" });
			var componentView = new StyleComponentView( item );
			expect( TemplateView.getGroupsForItem ).toHaveBeenCalledWith( item );
			expect( componentView.templateGroups ).toEqual( this.$groups );
		});
	});

	xdescribe('Getting an Item from a Selection', function() {

		beforeEach(function() {
			this.componentView = new StyleComponentView();
		});

		it('should return an item if passed an item', function() {
			var item = new Item({ title: "My Item" });
			expect( this.componentView.getItemForSelection( item ) ).toEqual( item );
		});

		it('should return an item if passed an item view', function() {
			var item = new Item({ title: "My Item" });
			var itemView = new ItemView( item );
			expect( this.componentView.getItemForSelection( itemView ) ).toEqual( item );
		});

		it('should return an item if passed a value view', function() {
			var item = new Item({ title: "My Item" });
			var valueView = new TemplateValueView( item );
			expect( this.componentView.getItemForSelection( valueView ) ).toEqual( item );
		});

		it('should return the group view if passed a TemplateGroupView', function() {
			var item = new TemplateGroupView();
			expect( this.componentView.getItemForSelection( item ) ).toEqual( item );
		});

		it('should throw an error if passed anything other than an Item, ItemView, TemplateValueView or TemplateGroupView', function() {
			expect(function() {
				this.componentView.getItemForSelection("hi");
			}.bind( this ))
			.toThrow("exception: Selection must be an Item, ItemView, TemplateValueView or TemplateGroupView");
		});
	});

	xdescribe('Getting Current Values', function() {

		beforeEach(function() {
			this.item = new Item({
				title: 'My Item',
				style: 'font-size:14px;color:#3a3a3a;margin-left:12px;'
			});
			this.valueView = new TemplateValueView( this.item );
			this.componentView = new StyleComponentView();
		});

		describe('Get Single Current Value', function() {

			it('should accept a jQuery object representing either a value or group', function() {
				expect(function() {
					this.componentView.getCurrentValue( this.valueView.render() );
				}.bind( this ))
				.not.toThrow();
			});

			it('should get the current value of a layout property', function() {
				expect( this.componentView.getCurrentValue( this.valueView.render() ) ).toBe()
			});

			it('should get the current value of a style property', function() {

			});

			it('should return undefined if the value has not been set', function() {

			});
		});

		describe('Get All Current Values', function() {

		});
	});

	describe('Rendering', function() {

		beforeEach(function() {
			loadFixtures('style-bare.html');

			var item = new Item({
				title: 'My Item',
				style: 'font-size:14px;color:#3a3a3a;margin-left:12px;'
			});
			var group = new TemplateGroupView({
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

			// spyOn( this.groupStyleView, 'getStyle' );
			// spyOn( this.groupStyleView, 'getStyle' );

			this.$itemStyle = new StyleComponentView( item ).render();
			
			group.render();
			this.groupStyleView = new StyleComponentView( group );
			spyOn( group, 'title' ).and.returnValue('Group');
			spyOn( this.groupStyleView, '_setupEventListeners' );
			spyOn( this.groupStyleView, 'updateAlignmentButtons' );
			this.$groupStyle = this.groupStyleView.render();
		});

		it('should have the correct class', function() {
			expect( this.$itemStyle ).toHaveClass('style-component');
			expect( this.$groupStyle ).toHaveClass('style-component');
		});

		it('should render component with the correct item title', function() {
			expect( this.$itemStyle.find('.style-component-header-title') ).toHaveText('My Item');
			expect( this.$groupStyle.find('.style-component-header-title') ).toHaveText('Group');
		});

		it('should render the correct sub-components for text', function() {
			expect( this.$itemStyle.find('.style-component-section').length ).toBe( 2 );
			expect( this.$itemStyle.find('.style-component-section-row').length ).toBe( 4 );
			expect( this.$itemStyle.find('.style-component-section-row-input').length ).toBe( 6 );
			expect( this.$itemStyle.find('.style-component-section-row-segmented-button').length ).toBe( 1 );
			expect( this.$itemStyle.find('.style-component-section-row-multiple-segmented-button').length ).toBe( 1 );
		});

		it('should render the correct sub-components for a group', function() {
			expect( this.$groupStyle.find('.style-component-section').length ).toBe( 1 );
			expect( this.$groupStyle.find('.style-component-section-row').length ).toBe( 1 );
			expect( this.$groupStyle.find('.style-component-section-row-segmented-button').length ).toBe( 2 );
		});

		xit('should render sub-components with the correct default values', function() {

		});

		xit('should clear existing components on item rendering', function() {
			expect( this.$itemStyle.prevAll().length ).toBe( 0 );
		});

		xit('should append to existing components on group rendering', function() {
			expect( this.$groupStyle.prevAll().length ).toBe( 1 );
		});

		it('should update the alignment buttons for the flex-direction', function() {
			expect( this.groupStyleView.updateAlignmentButtons ).toHaveBeenCalled();
		});
	});

	describe('Rotating Alignment Buttons For Layout Changes', function() {

		beforeEach(function() {
			loadFixtures('style-bare.html');
			this.group = new TemplateGroupView({
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

			this.groupStyleView = new StyleComponentView( this.group );

			spyOn( this.group, 'title' ).and.returnValue('Group');

			this.$groupStyle = this.groupStyleView.render();
		});

		it('should apply the correct classes to the alignment buttons', function() {
			ColumnsEvent.send( 'Columns.StyleSegmentedButtonView.ValueDidUpdateForPropertyAndItem', {
				item: this.group,
				property: 'flex-direction',
				value: 	'column'
			});

			expect( this.$groupStyle.find('[data-property="align-items"]') ).toHaveClass( 'column' );
			expect( this.$groupStyle.find('[data-property="align-items"]') ).not.toHaveClass( 'row' );
		});
	});

	xdescribe('Updating', function() {

		it('should remove existing components', function() {

		});

		it('should update the item and / or value view and / or group', function() {

		});

		it('should render the new components', function() {

		});
	});

	xdescribe('Determining Parent Selections', function() {

		it('throw an error if not passed an Item, ItemView or TemplateValueView', function() {

		});
	});
});
},{}],5:[function(require,module,exports){
describe('Style Input View', function() {

	afterEach(function() {
		ColumnsEvent.offAll();
	});

	describe('Initialization', function() {

		it('should default to text type', function() {
			var inputView = new StyleInputView();
			expect( inputView.type ).toBe('tel');
			expect( inputView.unit ).toBe( '' );
			expect( inputView.canBeNegative ).toBe( true );
			expect( inputView.canBeDecimal ).toBe( false );
			expect( inputView.property ).toBeUndefined();
			expect( inputView.value ).toBeUndefined();
			expect( inputView.prependIcon ).toBeUndefined();
			expect( inputView.appendControls ).toBe( false );
			expect( inputView.label ).toBeFalsy();
			expect( inputView.item ).toBeUndefined();
		});

		it('should allow a custom type', function() {
			var inputView = new StyleInputView({ type: 'color' });
			expect( inputView.type ).toEqual( 'color' );
		});

		it('should be associated with an object that it styles', function() {
			var item = new Item({ title: "My Item" });
			var inputView = new StyleInputView({ item: item });
			expect( inputView.item ).toEqual( item );
		});

		it('should allow a custom unit', function() {
			var inputView = new StyleInputView({ unit: 'em' });
			expect( inputView.unit ).toBe('em');
		});

		it('should be associated with a css property', function() {
			var inputView = new StyleInputView({ property: 'font-size' });
			expect( inputView.property ).toBe('font-size');
		});

		it('should allow a default value', function() {
			var inputView = new StyleInputView({ unit: 'px', value: '200' });
			expect( inputView.value ).toBe('200px');

			inputView = new StyleInputView({ value: '200px' });
			expect( inputView.value ).toBe('200px');
		});

		it('should allow a prepend icon', function() {
			var inputView = new StyleInputView({ prependIcon: 'margin-top' });
			expect( inputView.prependIcon ).toBe('margin-top');
		});

		it('should increment and decrement optionally', function() {
			var inputView = new StyleInputView({ appendControls: true });
			expect( inputView.appendControls ).toBe( true );
		});

		it('should allow a label', function() {
			var inputView = new StyleInputView({ label: 'Margin Top' });
			expect( inputView.label ).toBe('Margin Top');
		});

		it('should optionally not allow negative values', function() {
			var inputView = new StyleInputView({ canBeNegative: false });
			expect( inputView.canBeNegative ).toBe( false );
		});

		it('should optionally allow decimal values', function() {
			var inputView = new StyleInputView({ canBeDecimal: true });
			expect( inputView.canBeDecimal ).toBe( true );
		});

	});

	describe('Rendering', function() {

		beforeEach(function() {
			this.inputView = new StyleInputView();
		});

		it('should render without any accessories', function() {
			var $input = this.inputView.render();
			expect( $input ).toHaveClass('style-component-section-row-item');
			expect( $input ).toContainElement('.style-component-section-row-input');
			expect( $input ).toContainElement('input');
			expect( $input ).not.toContainElement('.style-component-section-row-input-prepend');
			expect( $input ).not.toContainElement('.style-component-section-row-input-append');
			expect( $input.find('input') ).toHaveValue( '' );
			expect( $input.find('.style-component-section-row-item-label') ).toBeEmpty();
		});

		it('should render with the correct prepend icon', function() {
			this.inputView.prependIcon = 'margin-top';
			var $input = this.inputView.render();
			expect( $input ).toContainElement('.style-component-section-row-input-prepend');
		});

		it('should render with the correct default value', function() {
			this.inputView.value = '20px';
			var $input = this.inputView.render();
			expect( $input.find('input') ).toHaveValue('20px');
		});

		it('should render with the correct label', function() {
			this.inputView.label = 'My Label';
			var $input = this.inputView.render();
			expect( $input.find('.style-component-section-row-item-label') ).toHaveText("My Label");
		});

		it('should render with the increment and decrement controls', function() {
			this.inputView.appendControls = true;
			var $input = this.inputView.render();
			expect( $input ).toContainElement('.style-component-section-row-input-append');
		});
	});

	describe('Updating', function() {

		beforeEach(function() {
			this.inputView = new StyleInputView();
			this.$input = this.inputView.render();
		});

		it('should update the input value', function() {
			this.inputView.update( '4' );
			expect( this.inputView.value ).toBe( '4' );
			expect( this.$input.find('input') ).toHaveValue( '4' );
		});

		it('should fire an update event', function() {
			var item = new Item({ title: "My Item" });
			spyOn( ColumnsEvent, 'send' );
			this.inputView.item = item;
			this.inputView.property = 'font-size';
			this.inputView.update( '4' );

			expect( ColumnsEvent.send.calls.argsFor(0)[0]).toBe('Columns.StyleInputView.ValueDidUpdateForPropertyAndItem');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].item ).toEqual( item );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].property ).toBe( 'font-size' );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].value ).toBe( '4' );
		});

	});

	describe('Handle User Interaction', function() {

		beforeEach(function() {
			this.inputView = new StyleInputView({
				canBeDecimal: false,
				canBeNegative: false,
				appendControls: true
			});
			this.$input = this.inputView.render();
			spyOn( this.inputView, 'update' );
		});

		it('should update upon input event for the color field', function() {
			this.inputView = new StyleInputView({
				canBeDecimal: false,
				canBeNegative: false,
				appendControls: false,
				type: 'color',
				value: '#3a3a3a'
			});
			this.$input = this.inputView.render();
			spyOn( this.inputView, 'update' );

			this.$input.find('input').trigger('input');
			expect( this.inputView.update ).toHaveBeenCalledWith( '#3a3a3a' );
		});

		it('should update upon value change', function() {
			this.$input.find('input').val( 2 );
			this.$input.find('input').trigger('change');
			expect( this.inputView.update ).toHaveBeenCalledWith( '2' );
		});

		it('should update upon keyup', function() {
			this.$input.find('input').val( 2 );
			this.$input.find('input').trigger('change');
			expect( this.inputView.update ).toHaveBeenCalledWith( '2' );
		});

		it('should update when incremented', function() {
			spyOn( this.inputView, 'increment' ).and.returnValue( '3' );
			this.$input.find('input').val( 2 );
			this.$input.find('.increment').trigger('click');
			expect( this.inputView.increment ).toHaveBeenCalledWith( '2' );
			expect( this.inputView.update ).toHaveBeenCalledWith( '3' );
		});

		it('should update when decremented', function() {
			spyOn( this.inputView, 'decrement' ).and.returnValue( '1' );
			this.$input.find('input').val( 2 );
			this.$input.find('.decrement').trigger('click');
			expect( this.inputView.decrement ).toHaveBeenCalledWith( '2' );
			expect( this.inputView.update ).toHaveBeenCalledWith( '1' );
		});
	});

	xdescribe('Incrementing and Decrementing Values', function() {

		beforeEach(function() {
			this.inputView = new StyleInputView({
				canBeDecimal: false,
				canBeNegative: false,
				unit: 'em',
			});
		});

		it('should increment the value when the user clicks the up arrow', function() {
			expect( this.inputView.increment( 2 ) ).toBe( '3em' );
			expect( this.inputView.increment( 2.1 ) ).toBe( '3em' );
			expect( this.inputView.increment( -4 ) ).toBe( '0em' );
			expect( this.inputView.increment( '2px' ) ).toBe( '3px' );
			expect( this.inputView.increment( '2.1px' ) ).toBe( '3px' );
			expect( this.inputView.increment( '-4px' ) ).toBe( '0px' );
		});

		it('should decrement the value when the user clicks the down arrow', function() {
			expect( this.inputView.decrement( 2 ) ).toBe( '1em' );
			expect( this.inputView.decrement( 2.1 ) ).toBe( '1em' );
			expect( this.inputView.decrement( -4 ) ).toBe( '0em' );
			expect( this.inputView.decrement( '2px' ) ).toBe( '1px' );
			expect( this.inputView.decrement( '2.1px' ) ).toBe( '1px' );
			expect( this.inputView.decrement( '-4px' ) ).toBe( '0px' );
		});
	});

	describe('Parsing Values', function() {

		beforeEach(function() {
			this.inputView = new StyleInputView();
		});

		it('should split the value into number and unit', function() {
			expect( this.inputView.parseValue( '200px' ).number ).toBe( '200' );
			expect( this.inputView.parseValue( '200px' ).unit ).toBe( 'px' );
		});

		xit('should ignore anything before the first number', function() {
			expect( this.inputView.parseValue( 'adsf200px' ).number ).toBe( 200 );
			expect( this.inputView.parseValue( 'asdf200px' ).unit ).toBe( 'px' );
		});
	});

	describe('Formatting Values', function() {

		beforeEach(function() {
			this.inputView = new StyleInputView();
		});

		it('should add the unit if one has been specified', function() {
			this.inputView.unit = 'px';
			expect( this.inputView.formatValue( 200 ) ).toBe("200px");
		});

		it('should not add a unit if the user supplied their own', function() {
			this.inputView.unit = 'px';
			expect( this.inputView.formatValue( '200%' ) ).toBe( "200%" );
			expect( this.inputView.formatValue( '200em' ) ).toBe( "200em" );
		});

		it('should do nothing if the field is type color', function() {
			this.inputView.type = 'color';
			expect( this.inputView.formatValue( '#3a3a3a' ) ).toBe( "#3a3a3a" );
		});
	});

	describe('Validating Values', function() {

		beforeEach(function() {
			this.inputView = new StyleInputView();
		});

		it('should allow negative values if that behavior has been specified', function() {
			var value = this.inputView.validateValue( -200 );
			expect( value ).toBe( -200 );
		});

		it('should prevent decimals if that behavior has been specified', function() {
			var value = this.inputView.validateValue( 2.1 );
			expect( value ).toBe( 2 );
		});

		it('should prevent the value from being negative if that behavior has been specified', function() {
			this.inputView.canBeNegative = false;
			var value = this.inputView.validateValue( -200 );
			expect( value ).toBe( 0 );
		});

		it('should allow decimal values if that behavior has been specified', function() {
			this.inputView.canBeDecimal = true;
			var value = this.inputView.validateValue( 2.1 );
			expect( value ).toBe( 2.1 );
		});
	});
});
},{}],6:[function(require,module,exports){
describe('Style Multiple Segmented Button View', function() {

	afterEach(function() {
		ColumnsEvent.offAll();
	});

	describe('Initiation', function() {

		it('should have the correct defaults', function() {
			var buttonsView = new StyleMultipleSegmentedButtonView();
			expect( buttonsView.label ).toBe( '' );
			expect( buttonsView.buttons ).toEqual( [] );
			expect( buttonsView.properties ).toEqual( {} );
			expect( buttonsView.item ).toBeUndefined();
		});

		it('should be associated with an object that it styles', function() {
			var item = new Item({ title: "My Item" });
			var buttonsView = new StyleMultipleSegmentedButtonView({ item: item });
			expect( buttonsView.item ).toEqual( item );
		});

		it('should allow initiation with a label', function() {
			var buttonsView = new StyleMultipleSegmentedButtonView({ label: 'My Label' });
			expect( buttonsView.label ).toBe( 'My Label' );
		});

		it('should allow initiation with a set of buttons, each with icon, property and active, inactive and current values', function() {
			var buttons = [{
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
			}];
			var buttonsView = new StyleMultipleSegmentedButtonView({ buttons: buttons });
			expect( buttonsView.buttons ).toEqual( buttons );
		});

		it('should create a properties hash from the buttons', function() {
			var buttons = [{
				property: 'font-weight',
				values: {
					active: 'bold',
					inactive: 'normal',
					current: 'bold'
				},
				icon: 'bold'
			}, {
				property: 'font-style',
				values: {
					active: 'italic',
					inactive: 'normal',
					current: 'normal'
				},
				icon: 'italic'
			}, {
				property: 'text-decoration',
				values: {
					active: 'underline',
					inactive: 'none',
					current: 'auto'
				},
				icon: 'underline'
			}];
			var buttonsView = new StyleMultipleSegmentedButtonView({ buttons: buttons });
			expect( buttonsView.properties ).toEqual({
				'font-weight': 'bold',
				'font-style': 'normal',
				'text-decoration': 'auto'
			});
		});
	});

	describe('Rendering', function() {

		beforeEach(function() {

			var buttons = [{
				property: 'font-weight',
				values: {
					active: 'bold',
					inactive: 'normal',
					current: 'bold'
				},
				icon: 'bold'
			}, {
				property: 'font-style',
				values: {
					active: 'italic',
					inactive: 'normal',
					current: 'normal'
				},
				icon: 'italic'
			}, {
				property: 'text-decoration',
				values: {
					active: 'underline',
					inactive: 'none',
					current: 'auto'
				},
				icon: 'underline'
			}];
			this.buttonsView = new StyleMultipleSegmentedButtonView({
				label: "My Segmented Button",
				buttons: buttons
			});
			this.$button = this.buttonsView.render();
		});

		it('should have the right class', function() {
			expect( this.$button ).toHaveClass('style-component-section-row-item');
			expect( this.$button ).toContainElement('.style-component-section-row-multiple-segmented-button');
		});

		it('should have the right label', function() {
			expect( this.$button.find('.style-component-section-row-item-label') ).toHaveText("My Segmented Button");
		});

		it('should have the right number of buttons', function() {
			expect( this.$button.find('button').length ).toBe( 3 );
		});

		it('should render the buttons with the correct attributes', function() {
			expect( this.$button.find('button').eq( 0 ) ).toHaveData('property', 'font-weight');
			expect( this.$button.find('button').eq( 0 ) ).toHaveData('active-value', 'bold');
			expect( this.$button.find('button').eq( 0 ) ).toHaveData('inactive-value', 'normal');
			expect( this.$button.find('button').eq( 1 ) ).toHaveData('property', 'font-style');
			expect( this.$button.find('button').eq( 1 ) ).toHaveData('active-value', 'italic');
			expect( this.$button.find('button').eq( 1 ) ).toHaveData('inactive-value', 'normal');
			expect( this.$button.find('button').eq( 2 ) ).toHaveData('property', 'text-decoration');
			expect( this.$button.find('button').eq( 2 ) ).toHaveData('active-value', 'underline');
			expect( this.$button.find('button').eq( 2 ) ).toHaveData('inactive-value', 'none');
		});

		it('should set the correct button as active', function() {
			expect( this.$button.find('button').eq( 0 ) ).toHaveClass('active');
			expect( this.$button.find('button').eq( 1 ) ).not.toHaveClass('active');
			expect( this.$button.find('button').eq( 2 ) ).not.toHaveClass('active');
		});
	});

	describe('Updating', function() {

		beforeEach(function() {

			var buttons = [{
				property: 'font-weight',
				values: {
					active: 'bold',
					inactive: 'normal',
					current: 'bold'
				},
				icon: 'bold'
			}, {
				property: 'font-style',
				values: {
					active: 'italic',
					inactive: 'normal',
					current: 'normal'
				},
				icon: 'italic'
			}, {
				property: 'text-decoration',
				values: {
					active: 'underline',
					inactive: 'none',
					current: 'auto'
				},
				icon: 'underline'
			}];
			this.buttonsView = new StyleMultipleSegmentedButtonView();
		});

		it('should update its value', function() {
			this.buttonsView.update( 'text-align', 'left' );
			expect( this.buttonsView.properties['text-align'] ).toBe('left');
		});

		it('should notify the app of the new value', function() {
			var item = new Item({ title: "My Item" });
			spyOn( ColumnsEvent, 'send' );
			this.buttonsView.item = item;
			this.buttonsView.update( 'text-align', 'right' );

			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.StyleMultipleSegmentedButtonView.ValueDidUpdateForPropertyAndItem');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].item ).toEqual( item );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].property ).toBe( 'text-align' );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].value ).toBe( 'right' );
		});
	});

	describe('Handing User Interaction', function() {

		beforeEach(function() {

			var buttons = [{
				property: 'font-weight',
				values: {
					active: 'bold',
					inactive: 'normal',
					current: 'bold'
				},
				icon: 'bold'
			}, {
				property: 'font-style',
				values: {
					active: 'italic',
					inactive: 'normal',
					current: 'normal'
				},
				icon: 'italic'
			}, {
				property: 'text-decoration',
				values: {
					active: 'underline',
					inactive: 'none',
					current: 'auto'
				},
				icon: 'underline'
			}];
			this.buttonsView = new StyleMultipleSegmentedButtonView({ buttons: buttons });
			this.$button = this.buttonsView.render();
		});

		it('should select the clicked button if it was inactive', function() {
			this.$button.find('button').eq( 1 ).trigger('click');
			expect( this.$button.find('button').eq( 1 ) ).toHaveClass('active');
		});

		it('should deselect the clicked button if it was active', function() {
			this.$button.find('button').eq( 0 ).trigger('click');
			expect( this.$button.find('button').eq( 0 ) ).not.toHaveClass('active');
		});

		it('should call the update method with the correct property and value', function() {
			spyOn( this.buttonsView, 'update' );
			this.$button.find('button').eq( 0 ).trigger('click');
			this.$button.find('button').eq( 1 ).trigger('click');
			expect( this.buttonsView.update ).toHaveBeenCalledWith( 'font-weight', 'normal' );
			expect( this.buttonsView.update ).toHaveBeenCalledWith( 'font-style', 'italic' );
		});
	});
});
},{}],7:[function(require,module,exports){
describe('Style Segmented Button View', function() {

	afterEach(function() {
		ColumnsEvent.offAll();
	});

	describe('Initiation', function() {

		beforeEach(function() {

			this.buttonsView = new StyleSegmentedButtonView();
		});

		it('should have the correct defaults', function() {
			this.buttonsView = new StyleSegmentedButtonView();
			expect( this.buttonsView.label ).toBe( '' );
			expect( this.buttonsView.property ).toBe( '' );
			expect( this.buttonsView.buttons ).toEqual( [] );
			expect( this.buttonsView.item ).toBeUndefined();
		});

		it('should be associated with an object that it styles', function() {
			var item = new Item({ title: "My Item" });
			var buttonsView = new StyleSegmentedButtonView({ item: item });
			expect( buttonsView.item ).toEqual( item );
		});

		it('should allow initiation with a label', function() {
			this.buttonsView = new StyleSegmentedButtonView({ label: 'My Segmented Button' });
			expect( this.buttonsView.label ).toBe('My Segmented Button');
		});

		it('should allow initiation with a current value', function() {
			this.buttonsView = new StyleSegmentedButtonView({ value: 'left' });
			expect( this.buttonsView.value ).toBe('left');
		});

		it('should allow initiation with a property', function() {
			this.buttonsView = new StyleSegmentedButtonView({ property: 'text-align' });
			expect( this.buttonsView.property ).toBe('text-align');
		});

		it('should allow intiation with a set of buttons, each with icon and value', function() {
			var buttons = [{
				icon: 'icon1',
				value: 'center'
			}, {
				icon: 'icon2',
				value: 'right'
			}];
			this.buttonsView = new StyleSegmentedButtonView({ buttons: buttons });
			expect( this.buttonsView.buttons ).toEqual( buttons );
		});
	});

	describe('Rendering', function() {

		beforeEach(function() {
			var buttons = [{
				icon: 'icon1',
				value: 'center'
			}, {
				icon: 'icon2',
				value: 'right'
			}];
			this.buttonsView = new StyleSegmentedButtonView({
				label: "My Segmented Button",
				property: 'text-align',
				value: 'center',
				buttons: buttons
			});
			this.$button = this.buttonsView.render();
		});

		it('should have the right class', function() {
			expect( this.$button ).toHaveClass('style-component-section-row-item');
			expect( this.$button ).toContainElement('.style-component-section-row-segmented-button');
		});

		it('should have the right label', function() {
			expect( this.$button.find('.style-component-section-row-item-label') ).toHaveText("My Segmented Button");
		});

		it('should have the right property', function() {
			expect( this.$button.find('.style-component-section-row-segmented-button') ).toHaveData('property', 'text-align');
		});

		it('should have the right number of buttons', function() {
			expect( this.$button.find('button').length ).toBe( 2 );
		});

		it('should render the buttons with the correct values', function() {
			expect( this.$button.find('button').eq( 0 ) ).toHaveData('value', 'center');
			expect( this.$button.find('button').eq( 1 ) ).toHaveData('value', 'right');
		});

		it('should set the correct button as active', function() {
			expect( this.$button.find('button').eq( 0 ) ).toHaveClass('active');
			expect( this.$button.find('button').eq( 1 ) ).not.toHaveClass('active');
		});
	});

	describe('Updating', function() {

		beforeEach(function() {
			var buttons = [{
				icon: 'icon1',
				value: 'center'
			}, {
				icon: 'icon2',
				value: 'right'
			}];
			this.buttonsView = new StyleSegmentedButtonView({
				label: "My Segmented Button",
				property: 'text-align',
				value: 'center',
				buttons: buttons
			});
		});

		it('should update its value', function() {
			this.buttonsView.update( 'right' );
			expect( this.buttonsView.value ).toBe('right');
		});

		it('should notify the app of the new value', function() {
			var item = new Item({ title: "My Item" });
			spyOn( ColumnsEvent, 'send' );
			this.buttonsView.item = item;
			this.buttonsView.update( 'right' );

			expect( ColumnsEvent.send.calls.argsFor(0)[0]).toBe('Columns.StyleSegmentedButtonView.ValueDidUpdateForPropertyAndItem');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].item ).toEqual( item );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].property ).toBe( 'text-align' );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].value ).toBe( 'right' );
		});

	});

	describe('Handling User Interaction', function() {

		beforeEach(function() {
			var buttons = [{
				icon: 'icon1',
				value: 'center'
			}, {
				icon: 'icon2',
				value: 'right'
			}];
			this.buttonsView = new StyleSegmentedButtonView({
				label: "My Segmented Button",
				property: 'text-align',
				value: 'center',
				buttons: buttons
			});
			this.$button = this.buttonsView.render();
		});

		it('should select the clicked button', function() {
			this.$button.find('button').eq( 1 ).trigger('click');
			expect( this.$button.find('button').eq( 1 ) ).toHaveClass('active');
		});

		it('should deselect the other buttons', function() {
			this.$button.find('button').eq( 1 ).trigger('click');
			expect( this.$button.find('button').eq( 0 ) ).not.toHaveClass('active');
		});

		it('should call the update method', function() {
			spyOn( this.buttonsView, 'update' );
			this.$button.find('button').eq( 1 ).trigger('click');
			expect( this.buttonsView.update ).toHaveBeenCalledWith( 'right' );
		});
	});
});
},{}],8:[function(require,module,exports){
jasmine.getFixtures().fixturesPath = 'specs/fixtures';

describe('Style View', function() {

	afterEach(function() {
		ColumnsEvent.offAll();
	});

	beforeEach(function() {
		loadFixtures('style-bare.html');
	});

	describe('Initalization', function() {

		it('should attach to the #style element already on the page', function() {
			var styleView = new StyleView();
			expect( styleView.$style ).toEqual('#styling');
		});

		xit('should initialize with the row as its default component', function() {
			var styleView = new StyleView();
			console.log( $('#styling').html() );
			expect( styleView.$style.find('.style-component').length ).toBe( 1 );
			expect( styleView.$style.find('.style-component') ).toHaveText( 'Row' );
		});
	});

	describe('Updating Components', function() {

		beforeEach(function() {
			this.styleView = new StyleView();
		});

		it('should replace existing components with item components', function() {
			var selection = new Item({ title: "My Item" });
			this.styleView.updateWithSelection( selection );
			expect( $('.style-component').length ).toBe( 1 );
		});

		it('should append group compoents to existing components ', function() {
			var selection = new TemplateGroupView();
			selection.render();
			this.styleView.updateWithSelection( selection );
			expect( $('.style-component').length ).toBe( 2 );
		});
	});

	describe('Getting an Item from a Selection', function() {

		beforeEach(function() {
			this.styleView = new StyleView();
		});

		it('should return an item if passed an item', function() {
			var item = new Item({ title: "My Item" });
			expect( this.styleView.getItemForSelection( item ) ).toEqual( item );
		});

		it('should return an item if passed an item view', function() {
			var item = new Item({ title: "My Item" });
			var itemView = new ItemView( item );
			expect( this.styleView.getItemForSelection( itemView ) ).toEqual( item );
		});

		it('should return an item if passed a value view', function() {
			var item = new Item({ title: "My Item" });
			var valueView = new TemplateValueView( item );
			expect( this.styleView.getItemForSelection( valueView ) ).toEqual( item );
		});

		it('should return the group view if passed a TemplateGroupView', function() {
			var item = new TemplateGroupView();
			expect( this.styleView.getItemForSelection( item ) ).toEqual( item );
		});

		it('should throw an error if passed anything other than an Item, ItemView, TemplateValueView or TemplateGroupView', function() {
			expect(function() {
				this.styleView.getItemForSelection("hi");
			}.bind( this ))
			.toThrow("exception: Selection must be an Item, ItemView, TemplateValueView or TemplateGroupView");
		});
	});

	describe('Listening to Template Events', function() {

		beforeEach(function() {
			this.styleView = new StyleView();
			spyOn( this.styleView, 'updateWithSelection' );
			spyOn( TemplateView, 'getGroupsForItem' ).and.returnValue([
				new TemplateGroupView(),
				new TemplateGroupView()
			]);
		});

		it('should update the styling item and parent groups on value view selection', function() {
			loadFixtures('template-with-values.html');
			var item = new Item({ title: "My Item"});
			var valueView = new TemplateValueView( item );
			ColumnsEvent.send('Columns.TemplateValueView.ValueDidSelectWithItem', {
				valueView: 	valueView,
				item: 		item
			});
			expect( this.styleView.updateWithSelection.calls.count() ).toBe( 3 );
			expect( this.styleView.updateWithSelection.calls.argsFor(0)[0] ).toEqual( item );
			expect( this.styleView.updateWithSelection.calls.argsFor(1)[0] instanceof TemplateGroupView ).toBeTruthy();
			expect( this.styleView.updateWithSelection.calls.argsFor(2)[0] instanceof TemplateGroupView ).toBeTruthy();
		});

		it('should render the row component when the table initially uploads', function() {
			
			var templateView = new TemplateView();
			var groupView = new TemplateGroupView();
			TemplateView.groups.push( groupView );

			ColumnsEvent.send('Columns.TemplateView.DidRender', {
				templateView: templateView
			});

			expect( this.styleView.updateWithSelection ).toHaveBeenCalledWith( groupView );
		});

	});

	describe('Listening to Items Events', function() {

		beforeEach(function() {
			this.styleView = new StyleView();
			spyOn( this.styleView, 'updateWithSelection' );
			spyOn( TemplateView, 'getGroupsForItem' ).and.returnValue([
				new TemplateGroupView(),
				new TemplateGroupView()
			]);
		});

		it('should update with the item that was selected', function() {
			loadFixtures('template-with-values.html');
			var item = new Item({ title: "My Item" });
			var itemView = new ItemView( item );

			ColumnsEvent.send( 'Columns.ItemView.ItemDidSelect', {
				itemView: 	itemView,
				item: 		item
			});

			expect( this.styleView.updateWithSelection.calls.count() ).toBe( 3 );
			expect( this.styleView.updateWithSelection.calls.argsFor(0)[0] ).toEqual( item );
			expect( this.styleView.updateWithSelection.calls.argsFor(1)[0] instanceof TemplateGroupView ).toBeTruthy();
			expect( this.styleView.updateWithSelection.calls.argsFor(2)[0] instanceof TemplateGroupView ).toBeTruthy();
		});
	});

	describe('Listening to Style Updates', function() {
		beforeEach(function() {
			this.styleView = new StyleView();
			spyOn( this.styleView, '_emitChange');
		});

		it('should respond to input view events', function() {
			var item = new Item({ title: "My Item" });
			// var event = document.createEvent('CustomEvent');
			// event.initCustomEvent('Columns.StyleInputView.ValueDidUpdateForPropertyAndItem', false, false, {
			// 	item: 	item,
			// 	property: 'font-size',
			// 	value: 	'12px'
			// });

			// document.dispatchEvent( event );
			ColumnsEvent.send( 'Columns.StyleInputView.ValueDidUpdateForPropertyAndItem', {
				item: 	item,
				property: 'font-size',
				value: 	'12px'
			});
			expect( this.styleView._emitChange ).toHaveBeenCalledWith( item, 'font-size', '12px' );
		});

		it('should respond to segmented button view events', function() {
			var item = new Item({ title: "My Item" });
			// var event = document.createEvent('CustomEvent');
			// event.initCustomEvent('Columns.StyleSegmentedButtonView.ValueDidUpdateForPropertyAndItem', false, false, {
			// 	item: 	item,
			// 	property: 'font-size',
			// 	value: 	'12px'
			// });

			// document.dispatchEvent( event );
			ColumnsEvent.send( 'Columns.StyleSegmentedButtonView.ValueDidUpdateForPropertyAndItem', {
				item: 	item,
				property: 'font-size',
				value: 	'12px'
			});

			expect( this.styleView._emitChange ).toHaveBeenCalledWith( item, 'font-size', '12px' );
		});

		it('should respond to multiple segmented button view events', function() {
			var item = new Item({ title: "My Item" });
			// var event = document.createEvent('CustomEvent');
			// event.initCustomEvent('Columns.StyleMultipleSegmentedButtonView.ValueDidUpdateForPropertyAndItem', false, false, {
			// 	item: 	item,
			// 	property: 'font-size',
			// 	value: 	'12px'
			// });

			// document.dispatchEvent( event );
			ColumnsEvent.send('Columns.StyleMultipleSegmentedButtonView.ValueDidUpdateForPropertyAndItem', {
				item: 	item,
				property: 'font-size',
				value: 	'12px'
			});

			expect( this.styleView._emitChange ).toHaveBeenCalledWith( item, 'font-size', '12px' );
		});
	});

	describe('Emitting Change Events', function() {

		beforeEach(function() {
			this.styleView = new StyleView();
			spyOn( ColumnsEvent, 'send' );
		});

		it('should alert the app of the style changes for a TemplateGroupView', function() {
			var item = new TemplateGroupView();
			this.styleView._emitChange( item, 'align-items', 'center' );
			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.StyleView.PropertyDidUpdateWithValueForGroupView');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].groupView ).toEqual( item );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].property ).toBe( 'align-items' );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].value ).toBe( 'center' );
		});

		it('should alert the app of the style changes for an Item', function() {
			var item = new Item({ title: "My Item" });
			this.styleView._emitChange( item, 'text-align', 'left' );
			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.StyleView.PropertyDidUpdateWithValueForItem');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].item ).toEqual( item );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].property ).toBe( 'text-align' );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].value ).toBe( 'left' );
		});

		it('should do nothing if the item is not a TemplateGroupView or Item', function() {
			var item = 'Hi';
			this.styleView._emitChange( item, 'text-align', 'left' );
			expect( ColumnsEvent.send ).not.toHaveBeenCalled();
		});
	});
});
},{}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
describe('Template Value View', function() {

	afterEach(function() {
		ColumnsEvent.offAll();
	});

	describe('Initiation', function() {

		it('should initiate with an item', function() {
			var item = new Item({ title: "My Item" });
			var valueView = new TemplateValueView( item );
			expect( valueView.item ).toEqual( item );
		});

		it('should initiate without an item', function() {
			var valueView = new TemplateValueView();
			expect( valueView.itemId ).toBeUndefined();
		});

		it('should not accept anything other than an item', function() {
			expect(function() {
				new TemplateValueView({});
			})
			.toThrow("exception: item must be of type Item");
		});

		it('should initiate with the correct template', function() {
			var valueView = new TemplateValueView();
			expect( valueView.template ).toEqual( Columns.Templates['templates/layout/row-value.hbs'] );
		});

		it('should optionally instaniate as a placeholder', function() {
			var item = new Item({ title: "My Item" });
			var valueView = new TemplateValueView( item, true );
			expect( valueView.placeholder ).toBe( true );
		});
	});

	describe('Rendering', function() {
		
		beforeEach(function() {
			this.item = new Item({
				title: 'My Item',
				style: 'font-size:14px;color:#3a3a3a;margin-left:12px;'
			});
			this.valueView = new TemplateValueView( this.item );
		});

		it('should render the formatted item title', function() {
			var $value = this.valueView.render();
			expect( $value ).toContainText("My Item");
		});

		it('should render the item with the correct styling', function() {
			var $value = this.valueView.render();
			expect( $value ).toHaveCss({
				'font-size': 	'14px',
				'color': 		'rgb(58, 58, 58)',
				'margin-left': 	'12px'
			});
		});

		it('should render as a placeholder when apppropriate', function() {
			var valueView = new TemplateValueView( this.item, true );
			var $value = valueView.render();
			expect( $value ).toHaveClass('placeholder');
		});

		it('should not render as a placeholder when normal', function() {
			var valueView = new TemplateValueView( this.item );
			var $value = valueView.render();
			expect( $value ).not.toHaveClass('placeholder');
		});

		it('should create a reference to its UI', function() {
			var $value = this.valueView.render();
			expect( this.valueView.$value ).toEqual( $value );
		});
	});

	describe('Updating', function() {

		beforeEach(function() {
			this.valueView = new TemplateValueView( new Item({
				title: 'My Item',
				style: 'font-size:14px;color:#3a3a3a;margin-left:12px;'
			}));
			this.valueView.render();
		});

		it('should render the item with the correct updated styling', function() {
			this.valueView.item = new Item({
				title: 'My Item',
				style: 'font-size:16px;color:#888888;margin-left:14px;'
			});
			var $value = this.valueView.update();
			expect( $value ).toHaveCss({
				'font-size': 	'16px',
				'color': 		'rgb(136, 136, 136)',
				'margin-left': 	'14px'
			});
		});

		it('should create a reference to its UI', function() {
			this.valueView.item = new Item({
				title: 'My Item',
				style: 'font-size:16px;color:#888888;margin-left:14px;'
			});
			var $value = this.valueView.update();
			expect( this.valueView.$value ).toEqual( $value );
		});

		it('should emit an event once the update has finished', function() {
			spyOn( ColumnsEvent, 'send' );
			this.valueView.item = new Item({
				title: 'My Item',
				style: 'font-size:16px;color:#888888;margin-left:14px;'
			});
			var $value = this.valueView.update();
			expect( ColumnsEvent.send ).toHaveBeenCalled();
			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.TemplateValueView.DidChange');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].valueView ).toEqual( this.valueView );
		});
	});

	describe('Responding to Events', function() {

		beforeEach(function() {
			this.item = new Item({
				title: 'My Item',
				style: 'font-size:14px;color:#3a3a3a;margin-left:12px;'
			});
			this.valueView = new TemplateValueView( this.item );
			this.valueView.render();
			this.spy = spyOn(this.valueView, 'update');
		});

		it('should respond to Item change events for the item it owns', function() {
			var newItem = new Item({
				title: 'My Item',
				style: 'font-size:16px;color:#3a3a3a;margin-left:12px;'
			});

			// var event = document.createEvent('CustomEvent');
			// event.initCustomEvent('Columns.Item.DidChange', false, false, { item: newItem });
			// document.dispatchEvent( event );
			ColumnsEvent.send( 'Columns.Item.DidChange', { item: newItem } );

			expect( this.spy ).toHaveBeenCalled();
			expect( this.valueView.item ).toEqual( newItem );
		});

		it('should ignore Item change events for other items', function() {
			var newItem = new Item({
				title: 'Other Item',
				style: 'font-size:16px;color:#3a3a3a;margin-left:12px;'
			});

			// var event = document.createEvent('CustomEvent');
			// event.initCustomEvent('Columns.Item.DidChange', false, false, { item: newItem });
			// document.dispatchEvent( event );
			ColumnsEvent.send( 'Columns.Item.DidChange', { item: newItem } );

			expect( this.spy ).not.toHaveBeenCalled();
			expect( this.valueView.item ).toEqual( this.item );
		});
	});

	describe('Dragging', function() {

		beforeEach(function() {
			this.valueView	= new TemplateValueView( new Item({ title: "My Item" }) );
			this.$value		= this.valueView.render();
			this.fakeUI		= {};

			spyOn( ColumnsEvent, 'send' );
		});

		it('should be draggable', function() {
			expect( this.$value.draggable('instance') ).toBeDefined();
		});

		describe('Drag Start', function() {

			it('should emit an event on drag start', function() {
				this.$value.trigger('dragstart', this.fakeUI);
				expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.TemplateValueView.ValueDidBeginDragWithItem');
				expect( ColumnsEvent.send.calls.argsFor(0)[1].valueView ).toEqual( this.valueView );
				expect( ColumnsEvent.send.calls.argsFor(0)[1].item ).toEqual( this.valueView.item );
				expect( ColumnsEvent.send.calls.argsFor(0)[1].ui ).toEqual( this.fakeUI );
			});

			it('should become inactive on drag start', function() {
				this.$value.trigger('dragstart', this.fakeUI);
				expect( this.valueView.$value ).toHaveClass('inactive');
			});
		});

		it('should emit an event on drag stop', function() {
			this.$value.trigger('dragstop', this.fakeUI);
			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.TemplateValueView.ValueDidEndDragWithItem');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].valueView ).toEqual( this.valueView );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].item ).toEqual( this.valueView.item );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].ui ).toEqual( this.fakeUI );
		});

		describe('Drag Stop', function() {

			it('should emit an event on drag', function() {
				this.$value.trigger('drag', this.fakeUI);
				expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.TemplateValueView.ValueDidDragWithItem');
				expect( ColumnsEvent.send.calls.argsFor(0)[1].valueView ).toEqual( this.valueView );
				expect( ColumnsEvent.send.calls.argsFor(0)[1].item ).toEqual( this.valueView.item );
				expect( ColumnsEvent.send.calls.argsFor(0)[1].ui ).toEqual( this.fakeUI );
			});

			xit('should remove itself from the template', function() {
				this.$value.trigger('drag', this.fakeUI);
				expect( this.valueView.$value ).not.toBeInDOM();
			});
		});
			
	});

	describe('Clicking', function() {

		beforeEach(function() {
			this.valueView	= new TemplateValueView( new Item({ title: "My Item" }) );
			this.$value		= this.valueView.render();
			spyOn( ColumnsEvent, 'send' );
		});

		it('should emit an event on click', function() {
			this.$value.trigger('click');
			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.TemplateValueView.ValueDidSelectWithItem');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].valueView ).toEqual( this.valueView );
			expect( ColumnsEvent.send.calls.argsFor(0)[1].item ).toEqual( this.valueView.item );
		});

		it('should get selected on click', function() {
			this.$value.trigger('click');
			expect( this.$value ).toHaveClass('selected');
		});
	});

	// afterEach(function() {
	// 	document.removeEventListener( 'Columns.Item.DidChange', TemplateValueView._onItemDidChange.bind, false);
	// });
});
},{}],11:[function(require,module,exports){
jasmine.getFixtures().fixturesPath = 'specs/fixtures';

describe('Template View', function() {

	beforeEach(function() {
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

		it('should render the preview', function() {
			loadFixtures('layout.html');
			var templateView = new TemplateView( this.defaultLayout );
			expect( $('#layout .layout-table-preview')[0] ).toBeInDOM();
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
			it('should render the template', function() {
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
});
},{}],12:[function(require,module,exports){
jasmine.getFixtures().fixturesPath = 'specs/fixtures';

describe('Upload View', function() {

	afterEach(function() {
		ColumnsEvent.offAll();
	});

	beforeEach(function() {
		loadFixtures('upload.html');
		this.upload = new UploadView();
	});

	describe('Initialization', function() {

		it('should initialize with 0 parsed rows', function() {
			expect( this.upload.parsedRows ).toBe( 0 );
		});
	});

	describe('Rendering', function() {

		it('should attatch to the correct part of the DOM', function() {
			expect( this.upload.render() ).toEqual('#upload');
		});
	});

	describe('Listening to User Events', function() {

		beforeEach(function() {
			this.upload.render();
		});

		describe('Upload Button', function() {

			xit('should trigger a click on the file input field', function() {
				$('.columns-upload-button').trigger('click');
				// expect(  )
			});

			xit('should send an analytics event', function() {

			});
		});

		it('should respond to clicks on the upload button', function() {
			spyOn( this.upload, '_onUploadClick' );
			$('.columns-upload-button').trigger('click');

			// expect( this.upload._onUploadClick ).toHaveBeenCalled();
			// expect( this.upload._onFileChoice ).toHaveBeenCalled();
		});

		describe('Choosing a File', function() {

			beforeEach(function() {
				spyOn( this.upload, '_setLoading' );
				spyOn( this.upload, '_parseFile' );
				spyOn( ColumnsEvent, 'send' );	
			});

			it('should set the loading message with the file name', function() {				
				var file = { name: 'test.csv' };
				$('input[type="file"]').triggerHandler({
					type: 'change',
					target: {
						files: [ file ]
					}
				});

				expect( this.upload._setLoading ).toHaveBeenCalledWith( true, 'Uploading test.csv...' );
			});

			it('should set the loading message without the file name if one is not available', function() {
				var file = {};
				$('input[type="file"]').triggerHandler({
					type: 'change',
					target: {
						files: [ file ]
					}
				});

				expect( this.upload._setLoading ).toHaveBeenCalledWith( true, 'Uploading file...' );
			});

			it('should parse the file', function() {
				var file = { name: 'test.csv' };
				$('input[type="file"]').triggerHandler({
					type: 'change',
					target: {
						files: [ file ]
					}
				});

				expect( this.upload._parseFile ).toHaveBeenCalledWith( file );
			});

			it('should emit an event', function() {
				var file = { name: 'test.csv' };
				$('input[type="file"]').triggerHandler({
					type: 'change',
					target: {
						files: [ file ]
					}
				});

				expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.UploadView.DidChooseFile');
				expect( ColumnsEvent.send.calls.argsFor(0)[1].uploadView ).toEqual( this.upload );
				expect( ColumnsEvent.send.calls.argsFor(0)[1].file ).toEqual( file );
			});

			xit('should respond to the user choosing a file', function() {
				spyOn( this.upload, '_onFileChoice' );
				$('input[type="file"]').trigger('change');

				expect( this.upload._onFileChoice ).toHaveBeenCalled();

			});
		});

		xit('should respond to window resize events', function() {
			spyOn( this.upload, '_onWindowResize' );
			$(window).trigger('resize');

			expect( this.upload._onWindowResize ).toHaveBeenCalled();
		});
	});

	describe('Responding to Table Events', function() {

		describe('Upload Success', function() {

			beforeEach(function() {
				// this.columnsEvent = document.createEvent('CustomEvent');
				// this.columnsEvent.initCustomEvent('Columns.Table.DidUploadWithSuccess', false, false, {
				// 	table: 	new Table()
				// });
				this.upload.render();
			});

			it('should turn off the loading message', function() {
				spyOn( this.upload, '_setLoading' );

				ColumnsEvent.send('Columns.Table.DidUploadWithSuccess', {
					table: 	new Table()
				});

				expect( this.upload._setLoading ).toHaveBeenCalledWith( false );
			});

			it('should hide', function() {
				spyOn( this.upload, 'hide' );
				
				ColumnsEvent.send('Columns.Table.DidUploadWithSuccess', {
					table: 	new Table()
				});

				expect( this.upload.hide ).toHaveBeenCalled();
			});
		});

		describe('Upload Failure', function() {

			beforeEach(function() {
				// this.columnsEvent = document.createEvent('CustomEvent');
				// this.columnsEvent.initCustomEvent('Columns.Table.DidUploadWithFailure', false, false, {
				// 	table: 	new Table()
				// });
				this.upload.render();
			});

			it('should update the loading message', function() {
				spyOn( this.upload, '_setLoading' );
				
				ColumnsEvent.send('Columns.Table.DidUploadWithFailure', {
					table: 	new Table()
				});

				expect( this.upload._setLoading ).toHaveBeenCalledWith( false, "Shoot, something went wrong. Mind trying a different .csv?" );
			});

		});
	});

	describe('Parsing a CSV', function() {

		beforeEach(function() {
			spyOn( Papa, 'parse' );
		});

		describe('Using Papa Parse', function() {

			it('should pass the file', function() {
				var file = { name: 'test.csv' };
				this.upload._parseFile( file );
				expect( Papa.parse.calls.argsFor(0)[0] ).toEqual( file );
			});

			xit('should pass the correct step callback', function() {
				var file = { name: 'test.csv' };
				var step = function( row, handle ) { this._parseRow( row, handle, fileName ) }.bind( this.upload );
				this.upload._parseFile( file );
				expect( Papa.parse.calls.argsFor(0)[1].step ).toEqual( step );
			});

			xit('should pass the correct complete callback', function() {

			});
		});

		describe('Parsing a Row', function() {

			beforeEach(function() {
				this.handle = { abort: function() {} };
				spyOn( this.upload, '_createColumnItems' );
				spyOn( this.upload, '_createRow' );
				spyOn( this.handle, 'abort' );
			});

			it('should identify the header row and create items from the column names', function() {
				var row = { data: [ 'data' ] };
				this.upload._parseRow( row, this.handle, 'test.csv' );
				expect( this.upload._createColumnItems ).toHaveBeenCalledWith( row.data[ 0 ], 'test.csv' );
			});

			it('should identify subsequent rows and compile them as data points', function() {
				this.upload.parsedRows = 1;
				var row = { data: [ 'data' ] };
				this.upload._parseRow( row, this.handle, 'test.csv' );
				expect( this.upload._createRow ).toHaveBeenCalledWith( row.data[ 0 ], 'test.csv' );
			});

			it('should stop after the first 20 rows', function() {
				this.upload.parsedRows = 21;
				var row = { data: {} };
				this.upload._parseRow( row, this.handle, 'test.csv' );
				expect( this.upload._createRow ).not.toHaveBeenCalled();
				expect( this.handle.abort ).toHaveBeenCalled();
			});

		});

		describe('Create Column Items', function() {

			beforeEach(function() {
				spyOn( ColumnsEvent, 'send' );
			});

			it('should emit an event announcing the parsing of column items', function() {
				var columnNames = [
					'First Name',
					'Last Name',
					'Hometown'
				];
				this.upload._createColumnItems( columnNames, 'test.csv' );
				expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.UploadView.DidParseColumnNamesForFile');
				expect( ColumnsEvent.send.calls.argsFor(0)[1].uploadView ).toEqual( this.upload );
				expect( ColumnsEvent.send.calls.argsFor(0)[1].fileName ).toEqual( 'test.csv' );
				expect( ColumnsEvent.send.calls.argsFor(0)[1].columns ).toEqual( columnNames );
			});
		});

		describe('Create Data Row', function() {

			beforeEach(function() {
				spyOn( ColumnsEvent, 'send' );
			});

			it('should emit an event announcing the parsing of a data row', function() {
				var row = {
					data: [
						'Jeremy',
						'Lubin',
						'Princeton'
					]
				};
				this.upload._createRow( row, 'test.csv' );
				expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.UploadView.DidParseDataRowForFile');
				expect( ColumnsEvent.send.calls.argsFor(0)[1].uploadView ).toEqual( this.upload );
				expect( ColumnsEvent.send.calls.argsFor(0)[1].fileName ).toEqual( 'test.csv' );
				expect( ColumnsEvent.send.calls.argsFor(0)[1].row ).toEqual( row );
			});
		});

		describe('Completion of Parsing', function() {

			beforeEach(function() {
				spyOn( ColumnsEvent, 'send' );
			});

			it('should emit an event with the data', function() {
				var results = {};
				var file = { name: 'test.csv' };
				this.upload._onParseComplete( results, file );
				expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.UploadView.DidCompleteParseForFile');
				expect( ColumnsEvent.send.calls.argsFor(0)[1].uploadView ).toEqual( this.upload );
				expect( ColumnsEvent.send.calls.argsFor(0)[1].file ).toEqual( file );
			});
		});
	});

	xdescribe('Hiding the Upload View', function() {

		beforeEach(function( done ) {
			this.upload.render();
			this.upload.hide();
			setTimeout(function() {
				done();
			}, 300);
		});

		// TODO figure out why this test doesn't work
		it('should have no opacity', function( done ) {
			expect( this.upload.$upload ).toHaveCss({ opacity: '0' });
			done();
		});

		it('should not be active', function( done ) {
			expect( this.upload.$upload ).not.toHaveClass('active');
			done();
		});
	});

	describe('Showing the Upload View', function() {

		beforeEach(function( done ) {
			this.upload.render();
			this.upload.show();
			setTimeout(function() {
				done();
			}, 300);
		});

		it('should have full opacity', function( done ) {
			expect( this.upload.$upload ).toHaveCss({ opacity: '1' });
			done();
		});

		it('should not be active', function( done ) {
			expect( this.upload.$upload ).toHaveClass('active');
			done();
		});
	});

	describe('Updating the Loading Message', function() {

		beforeEach(function() {
			this.upload.render();
			this.$button = $('.columns-upload-button');
		});

		it('should update the message text with a user provided string', function() {
			this.upload._setLoading( true, "hi" );
			expect( this.$button ).toHaveText( "hi" );
		});

		it('should use a default message text if none was provided', function() {
			this.upload._setLoading( true );
			expect( this.$button ).toHaveText( "Upload a .csv" );
		});

		it('should use a default message text if the one provided is not a string', function() {
			this.upload._setLoading( true, {} );
			expect( this.$button ).toHaveText( "Upload a .csv" );
		});

		it('should optionally turn on the loading animation', function() {
			this.upload._setLoading( true );
			expect( this.upload.$upload ).toHaveClass( 'loading' );
			expect( this.$button ).toHaveProp( 'disabled', true );
		});

		it('should optionally turn off the loading animation', function() {
			this.upload._setLoading( false );
			expect( this.upload.$upload ).not.toHaveClass( 'loading' );
			expect( this.$button ).toHaveProp( 'disabled', false );
		});
	});
});
},{}],13:[function(require,module,exports){

// var API_HOST = 'http://127.0.0.1:8080';
// var ROOT_PATH = 'http://127.0.0.1';
// var EMBED_PATH = ROOT_PATH + '/public/embed-table.js';
// var CSS_PATH = ROOT_PATH + '/css/embed-table.css';
// var IMG_PATH = ROOT_PATH + '/images/';

// var Velocity = require('../../bower_components/velocity/velocity.js');
// var Hammer = require('../../vendor/hammer.js');
// var PreventGhostClick = require('../../vendor/prevent-ghost-click.js');

// $$ = $;
// var Columnsbars = require('../../javascripts/embed-handlebars.js'),
// 	ColumnsTable = require('../../javascripts/models/ColumnsTable.js');

// jasmine.getFixtures().fixturesPath = 'specs/fixtures';

xdescribe('Embeddable Table', function() {

	beforeEach(function() {
		loadFixtures('embed-script.html');

		var scriptTags = document.getElementsByTagName('script'),
			script = scriptTags[ scriptTags.length - 1];

		this.embed = new ColumnsTable( script );
	});

	describe('Initialization', function() {

		it('should be in preview mode when in the app', function() {
			var embed = new ColumnsTable('<script type="text/javascript" src="http://colum.nz/public/embed-table.js" data-preview="true" async></script>');
			expect( embed.preview ).toBe( true );
		});

		it('should not be in preview mode when embedded', function() {
			var embed = new ColumnsTable('<script type="text/javascript" src="http://colum.nz/public/embed-table.js" async></script>');
			expect( embed.preview ).toBeUndefined();
		});
	});

	describe('Listening to Editor Events', function() {

		beforeEach(function() {			
			this.embed.render();
		});

		it('should re-render when table details are udpated', function() {
			// spyOn( this.embed, 'generateLayout' );
			// spyOn( this.embed, 'renderData' );

			ColumnsEvent.send( 'Columns.Table.DidChange', {
				table: new Table({ title: 'My Table' })
			});

			expect( this.embed.$$table.find('.columns-table-title') ).toHaveText('My Table');
		});
	});
});
},{}],14:[function(require,module,exports){
describe('Columns Events', function() {

	describe('Sending Events', function() {

		beforeEach(function() {
			
		});

		it('should accept a mandatory type and detail object', function() {
			spyOn( $.fn, 'trigger' );
			ColumnsEvent.send( 'my.type', {} );
			expect( $.fn.trigger ).toHaveBeenCalledWith( 'my.type', {} );
		});

		it('should call the correct callbacks', function() {
			var callback = jasmine.createSpy('callback');
			$(document).on( 'my.type', callback );
			ColumnsEvent.send( 'my.type', {} );
			expect( callback ).toHaveBeenCalled();
		});
	});

	describe('Registering Event Listeners', function() {

		beforeEach(function() {
			spyOn( $.fn, 'on' );
		});

		it('should accept a mandatory type and callback', function() {
			var callback = {};
			ColumnsEvent.on( 'my.type', callback );
			expect( $.fn.on ).toHaveBeenCalledWith( 'my.type', callback );
		});

	});

	describe('Removing Event Listeners', function() {

		it('should accept a type and callback', function() {
			spyOn( $.fn, 'off' );
			ColumnsEvent.off( 'my.type', {} );
			expect( $.fn.off ).toHaveBeenCalledWith( 'my.type', {} );
		});

		it('should no longer call the callback', function() {
			var callback = jasmine.createSpy('callback');
			$(document).on( 'my.type', callback );
			ColumnsEvent.off( 'my.type', callback );
			$(document).trigger( 'my.type' );
			expect( callback ).not.toHaveBeenCalled();
		});
	});

	describe('Removing All Event Listeners', function() {

		it('should no longer call any callbacks', function() {
			var callback1 = jasmine.createSpy('callback1');
			var callback2 = jasmine.createSpy('callback2');
			$(document).on( 'my.type', callback1 );
			$(document).on( 'other.type', callback2 );

			ColumnsEvent.offAll();

			$(document).trigger('my.type');
			$(document).trigger('other.type');

			expect( callback1 ).not.toHaveBeenCalled();
			expect( callback2 ).not.toHaveBeenCalled();

		});
	});
});
},{}],15:[function(require,module,exports){
describe('Item Model', function() {

	afterEach(function() {
		ColumnsEvent.offAll();
	});

	describe('Construction', function() {

		it ('should allow construction with no parameters', function() {
			var item = new Item();
			expect(item.title).toBeUndefined();
			expect(item.style).toBeUndefined();
		});

		it('should default to the active state', function() {
			var item = new Item();
			expect( item.active ).toBeTruthy();
		});

		it('should allow construction with a title, style and active state', function() {
			var item = new Item({
				title: "My Item",
				style: 'font-size:14px;color:#3a3a3a;',
				active: false
			});
			expect(item.title).toBe('My Item');
			expect(item.style.styles).toEqual([{
				property: 'font-size',
				value: '14px'
			}, {
				property: 'color',
				value: '#3a3a3a'
			}]);
			expect( item.active ).toBe( false );
		});

		xit('should assign itself an id based on the unformatted item name', function() {
			var item = new Item({ title: "My Item" });
			expect( item.id ).toBe('my_item');
		});
	});

	describe('Title Formatting', function() {

		it('should uppercase titles and replace underscores with spaces', function() {
			var item = new Item({title: "my_column"});
			expect(item.formattedTitle()).toBe('My Column');
		});

		it('should replace empty titles with an underscore', function() {
			var item = new Item({title: ''});
			expect(item.formattedTitle()).toBe('_');
		});

		it('should return a single unscore as is', function() {
			var item = new Item({title: '_'});
			expect(item.formattedTitle()).toBe('_');
		});
	});

	describe('Title Unformatting', function() {

		it('should lowercase titles and replace spaces with an underscore', function() {
			var item = new Item({title: "My Column"});
			expect(item.unformattedTitle()).toBe('my_column');
		});

		it('should replace empty titles with an underscore', function() {
			var item = new Item({title: ''});
			expect(item.unformattedTitle()).toBe('_');
		});
	});

	describe('Getting Style Attributes', function() {

		beforeEach(function() {
			this.item = new Item({
				title: "My Item",
				style: 'font-size:14px;color:#3a3a3a;'
			});
		});

		it('should return the style value of a property if it is part of the style object', function() {
			expect( this.item.getStyle( 'font-size' ) ).toBe('14px');
		});

		xit('should return the default css value of a property that is not part of the style object', function() {
			expect( this.item.getStyle( 'text-align' ) ).toBe( 'left' );
		});
	});

	describe('Comparing Items', function() {

		beforeEach(function() {
			this.item = new Item({ title: 'My Item' });
		});

		it('should return true if the passed in item is equal to this one', function() {
			var otherItem = new Item({ title: 'My Item' });
			expect( this.item.is( otherItem ) ).toBe(true);
		});

		it('should return false if the passed in Item is not equal to this one', function() {
			var otherItem = new Item({ title: 'Other Item' });
			expect( this.item.is( otherItem ) ).toBe(false);
		});

		it('should throw an error if the passed in object is not an Item', function() {
			var otherItem = {};
			expect(function() {
				this.item.is( otherItem );
			}.bind( this ))
			.toThrow("exception: Comparison must be with another Item");
		});
	});

	describe('Responding to Events', function() {

		beforeEach(function() {
			this.item = new Item({ title: "My Item" });
			spyOn( this.item, '_emitChange' );
		});

		describe('Style Events', function() {

			beforeEach(function() {
				spyOn( this.item.style, 'update');
			});

			it('should respond to style change events for itself', function() {
				// var event = document.createEvent('CustomEvent');
				// event.initCustomEvent('Columns.StyleView.PropertyDidUpdateWithValueForItem', false, false, {
				// 	item: this.item,
				// 	property: 'font-size',
				// 	value: '12px'
				// });
				// document.dispatchEvent( event );
				ColumnsEvent.send('Columns.StyleView.PropertyDidUpdateWithValueForItem', {
					item: this.item,
					property: 'font-size',
					value: '12px'
				});

				expect( this.item.style.update ).toHaveBeenCalledWith( [{ property: 'font-size', value: '12px' }] );
				expect( this.item._emitChange ).toHaveBeenCalled();
			});

			it('should ignore Item change events for other items', function() {
				var newItem = new Item({ title: "Other Item" });
				// var event = document.createEvent('CustomEvent');
				// event.initCustomEvent('Columns.StyleView.PropertyDidUpdateWithValueForGroupItem', false, false, {
				// 	item: newItem,
				// 	property: 'font-size',
				// 	value: '12px'
				// });
				// document.dispatchEvent( event );
				ColumnsEvent.send('Columns.StyleView.PropertyDidUpdateWithValueForGroupItem', {
					item: newItem,
					property: 'font-size',
					value: '12px'
				});

				expect( this.item.style.update ).not.toHaveBeenCalled();
				expect( this.item._emitChange ).not.toHaveBeenCalled();
			});
		});

		describe('Template Events', function() {

			beforeEach(function() {
				spyOn( this.item, '_setActive' );
				// this.event = document.createEvent('CustomEvent');
				// this.event.initCustomEvent('Columns.TemplateView.DidChange', false, false, {
				// 	templateView: 	new TemplateView()
				// });
			});

			it('should set itself as inactive if found in the template', function() {
				spyOn( TemplateView, 'getValueForItem' ).and.returnValue( undefined );

				ColumnsEvent.send('Columns.TemplateView.DidChange', {
					templateView: 	new TemplateView()
				});

				expect( this.item._setActive ).toHaveBeenCalledWith( true );
			});

			it('should set itself as active if not found in the template', function() {
				spyOn( TemplateView, 'getValueForItem' ).and.returnValue( new TemplateValueView( this.item ) );

				ColumnsEvent.send('Columns.TemplateView.DidChange', {
					templateView: 	new TemplateView()
				});

				expect( this.item._setActive ).toHaveBeenCalledWith( false );
			});
		});
	});

	describe('Managing Active State', function() {

		beforeEach(function() {
			this.item = new Item({ title: "My Item" });
			spyOn( this.item, '_emitChange' );
		});

		it('should set active attribute to true', function() {
			this.item._setActive( true );
			expect( this.item.active ).toBe( true );
		});

		it('should set active attribute to false', function() {
			this.item._setActive( false );
			expect( this.item.active ).toBe( false );
		});

		it('should emit a change event if the active state was changed', function() {
			this.item._setActive( false );
			expect( this.item._emitChange ).toHaveBeenCalled();
		});

		it('should not emit a change event if the active state was not changed', function() {
			this.item._setActive( true );
			expect( this.item._emitChange ).not.toHaveBeenCalled();
		});

	});

	describe('Emitting Change Events', function() {

		it('should alert the app that it has been updated', function() {
			var item = new Item({ title: "My Item" });
			spyOn( ColumnsEvent, 'send' );
			item._emitChange();

			expect( ColumnsEvent.send ).toHaveBeenCalled();
			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.Item.DidChange');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].item ).toEqual( item );
		});
	});
});
},{}],16:[function(require,module,exports){
jasmine.getFixtures().fixturesPath = 'specs/fixtures';

var DEFAULTS = {
	styles: [
		[{
			property: 'color',
			value: '#3a3a3a'
		}],
		[{
			property: 'color',
			value: '#888'
		},{
			property: 'font-size',
			value: '14px'
		}, {
			property: 'margin-top',
			value: '4px'
		}],
		[{
			property: 'color',
			value: '#3a3a3a'
		},{
			property: 'font-size',
			value: '24px'
		}]	
	],
	layouts: [
		[{
			property: 'flex-direction',
			value: 'column'
		}, {
			property: 'align-items',
			value: 'flex-start'
		}]
	]
};

describe('Layout', function() {

	afterEach(function() {
		ColumnsEvent.offAll();
	});

	describe('Initialization', function() {

		it('should initialize with a default layout given no items', function() {
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

		it('should initialize with a default layout given 1 item', function() {
			var items = [ new Item({ title: "My Item" }) ];
			this.layout = new Layout( items );

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

		it('should initialize with a default layout given 2 items', function() {
			var items = [ new Item({ title: "First Item" }), new Item({ title: "Second Item" }) ];
			this.layout = new Layout( items );

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

		it('should initialize with a default layout given 3 items', function() {
			var items = [
				new Item({ title: "First Item" }),
				new Item({ title: "Second Item" }),
				new Item({ title: "Third Item" })
			];
			this.layout = new Layout( items );

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

		it('should initialize with a default layout given more than 3 items', function() {
			var items = [
				new Item({ title: "First Item" }),
				new Item({ title: "Second Item" }),
				new Item({ title: "Third Item" }),
				new Item({ title: "Fourth Item" }),
				new Item({ title: "Fifth Item" }),
			];
			this.layout = new Layout( items );

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

		it('should throw an error if any of the items are not of type Item', function() {
			var items = [ "hi" ];
			expect(function() {
				this.layout = new Layout( items );
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
},{}],17:[function(require,module,exports){
describe('Style Model', function() {

	afterEach(function() {
		ColumnsEvent.offAll();
	});

	describe('Construction', function() {

		it('should allow construction without a style object', function() {
			var style = new Style();
			expect( style.styles ).toEqual( [] );
		});	

		it('should allow construction with a string', function() {
			var style = new Style( 'font-size:14px;color:#3a3a3a;' );
			expect(style.styles).toEqual([{
				property: 'font-size',
				value: '14px'
			}, {
				property: 'color',
				value: '#3a3a3a'
			}]);
		});

		it('should allow construction with an array', function() {
			var styles = [{
				property: 'font-size',
				value: '14px'
			}, {
				property: 'color',
				value: '#3a3a3a'
			}];
			var style = new Style( styles );
			expect( style.styles ).toEqual( styles );
		});

		it('should allow construction with an object', function() {
			var styles = {
				property: 'font-size',
				value: '14px'
			};
			var style = new Style( styles );
			expect( style.styles ).toEqual([ styles ]);
		});
	});

	describe('Parsing', function() {

		beforeEach(function() {
			this.style = new Style();
		});

		it('should not accept non-string css', function() {
			var css = { hello:'there' };
			expect(function() {
				this.style._parseCSS( css )
			}.bind(this) )
			.toThrow("exception: CSS must be in string format");
		});

		it('should convert CSS to an object', function() {
			var css = 'font-size:14px;color:#3a3a3a;';
			var obj = this.style._parseCSS(css);
			expect(obj).toEqual([{
				property: 'font-size',
				value: '14px'
			}, {
				property: 'color',
				value: '#3a3a3a'
			}]);
		});
	});

	describe('Converting to CSS', function() {

		it('should convert styles to css', function() {
			var style = new Style([{
				property: 'font-size',
				value: '12px'
			}, {
				property: 'color',
				value: '#888'
			}, {
				property: 'font-weight',
				value: '300'
			}, {
				property: 'margin-right',
				value: '10px'
			}]);
			expect( style.css() ).toBe('font-size:12px;color:#888;font-weight:300;margin-right:10px;')
		});
	});

	describe('Querying', function() {

		beforeEach(function() {
			this.style = new Style([{
				property: 'font-size',
				value: '12px'
			}, {
				property: 'color',
				value: '#888'
			}, {
				property: 'font-weight',
				value: '300'
			}, {
				property: 'margin-right',
				value: '10px'
			}]);
		})
		
		it('should return the style attribute for a given property', function() {
			expect( this.style.get('font-size') ).toBe('12px');
		});

		it('should return undefined if the item does not have the property set', function() {
			expect( this.style.get('text-align') ).toBeUndefined();
		});
	});

	describe('Merging', function() {

		beforeEach(function() {
			this.style = new Style([{
				property: 'font-size',
				value: '12px'
			}, {
				property: 'color',
				value: '#888'
			}, {
				property: 'font-weight',
				value: '300'
			}, {
				property: 'margin-right',
				value: '10px'
			}]);
		});

		it('should only merge arrays of style objects', function() {
			expect(function() {
				this.style._mergeCSS('font-size:14px;color:#3a3a3a;');
			}.bind(this) )
			.toThrow("exception: CSS must be an array");
		});

		it('should replace existing styles and append new ones', function() {
			this.style._mergeCSS([{
				property: 'font-size',
				value: '14px'
			}, {
				property: 'font-weight',
				value: '400'
			}]);
			expect(this.style.styles).toEqual([{
				property: 'font-size',
				value: '14px'
			}, {
				property: 'color',
				value: '#888'
			}, {
				property: 'font-weight',
				value: '400'
			}, {
				property: 'margin-right',
				value: '10px'
			}]);
		});
	});

	describe('Updating', function() {

		beforeEach(function() {
			this.style = new Style([{
				property: 'font-size',
				value: '12px'
			}, {
				property: 'color',
				value: '#888'
			}]);
		});

		it('should accept a css string', function() {
			this.style.update('font-size:14px;color:#3a3a3a;');
			expect(this.style.styles).toEqual([{
				property: 'font-size',
				value: '14px'
			}, {
				property: 'color',
				value: '#3a3a3a'
			}]);
		});

		it('should accept an object of styles', function() {
			this.style.update({
				property: 'font-size',
				value: '14px'
			});
			expect(this.style.styles).toEqual([{
				property: 'font-size',
				value: '14px'
			}, {
				property: 'color',
				value: '#888'
			}]);
		});

		it('should accept an array of style objects', function() {
			this.style.update([{
				property: 'font-size',
				value: '14px'
			}, {
				property: 'color',
				value: '#3a3a3a'
			}]);
			expect(this.style.styles).toEqual([{
				property: 'font-size',
				value: '14px'
			}, {
				property: 'color',
				value: '#3a3a3a'
			}]);
		});

		it('should update when there is no existing style data', function() {
			this.style.styles = [];
			this.style.update('font-size:14px;color:#3a3a3a;');
			expect(this.style.styles).toEqual([{
				property: 'font-size',
				value: '14px'
			}, {
				property: 'color',
				value: '#3a3a3a'
			}]);
		});

		it('should throw when it is passed an undefined value', function() {
			expect(function() {
				this.style.update( undefined )
			}.bind(this) )
			.toThrow("exception: CSS must be a string, array or object");
		})
	});
});
},{}],18:[function(require,module,exports){
describe('Table', function () {

	afterEach(function() {
		ColumnsEvent.offAll();
	});

	describe('Initialization', function() {

		it('should initialize with the correct defaults', function() {
			var table = new Table();
			expect( table.data ).toEqual( [] );
			expect( table.title ).toBe( '' );
			expect( table.source ).toBe( '' );
			expect( table.source_url ).toBe( '' );
			expect( table.columns ).toEqual( [] );
			expect( table.layout ).toBeUndefined();
			expect( table.id ).toBeUndefined();
		});

		it('should initialize with a data array', function() {
			var data = [
				[ 'Jeremy', 'Lubin', 'Princeton' ],
				[ 'Jess', 'Schwartz', 'Mechanicsburg' ],
				[ 'Amir', 'Kanpurwala', 'West Windsor' ]
			];
			var table = new Table( { data: data } );
			expect( table.data ).toEqual( data );
		});

		it('should initialize with a title', function() {
			var meta = { title: "My Table" };
			var table = new Table( meta );
			expect( table.title ).toBe("My Table");
		});

		it('should initialize with a source', function() {
			var meta = { source: "My Source" };
			var table = new Table( meta );
			expect( table.source ).toBe("My Source");
		});

		it('should initialize with a source url', function() {
			var meta = { source_url: "https://mysource.com/my-table" };
			var table = new Table( meta );
			expect( table.source_url ).toBe("https://mysource.com/my-table");
		});

		it('should initialize with columns', function () {
			var meta = { columns: [ "First Name", "Last Name", "Hometown" ] };
			var table = new Table( meta );
			expect( table.columns[ 0 ].title ).toEqual("First Name");
			expect( table.columns[ 1 ].title ).toEqual("Last Name");
			expect( table.columns[ 2 ].title ).toEqual("Hometown");
		});

		it('should initialize with a layout', function() {
			var meta = { columns: [ "First Name", "Last Name", "Hometown" ] };
			var table = new Table( meta );
			expect( table.layout instanceof Layout ).toBeTruthy();
		});

		xit('should initialize with event listeners', function() {
			var table = new Table();
			spyOn( table, '_setupEventListeners' );
			expect( table._setupEventListeners ).toHaveBeenCalled();
		});
	});

	describe('Updating Table Properties', function() {

		beforeEach(function() {
			this.table = new Table();
		});

		it('should merge the passed in properties with the existing ones', function() {
			var data = [
				[ 'Jeremy', 'Lubin', 'Princeton' ],
				[ 'Jess', 'Schwartz', 'Mechanicsburg' ],
				[ 'Amir', 'Kanpurwala', 'West Windsor' ]
			];
			var props = {
				data: data,
      			title: "My Table",
      			source: "The Noun Project",
      			source_url: "https://thenounproject.com/my-table",
      			columns: [ "First Name", "Last Name", "Hometown" ],
      			id: 4
      		}

      		this.table._update( props );
      		expect( this.table.data ).toEqual( data );
      		expect( this.table.title ).toBe("My Table");
      		expect( this.table.source ).toBe("The Noun Project");
      		expect( this.table.source_url ).toBe("https://thenounproject.com/my-table");
      		expect( this.table.columns[ 0 ].title ).toEqual("First Name");
			expect( this.table.columns[ 1 ].title ).toEqual("Last Name");
			expect( this.table.columns[ 2 ].title ).toEqual("Hometown");
			expect( this.table.id ).toBe( 4 );
			expect( this.table.layout instanceof Layout ).toBeTruthy();
		});

		xit('should update the layout with new columns', function() {
			var props = {
      			columns: [ "First Name", "Last Name", "Hometown" ]
      		}
      		this.table._udpate( props  );
      		expect( this.table.layout instanceof Layout ).toBeTruthy();
		});

		it('should not properties that are not provided', function() {
			this.table._update();
			expect( this.table.data ).toEqual( [] );
			expect( this.table.title ).toBe( '' );
			expect( this.table.source ).toBe( '' );
			expect( this.table.source_url ).toBe( '' );
			expect( this.table.columns ).toEqual( [] );
			expect( this.table.layout ).toBeUndefined();
			expect( this.table.id ).toBeUndefined();
		});

		it('should emit an update event', function() {
			spyOn( this.table, '_emitChange' );
			this.table._update( {} );

			expect( this.table._emitChange ).toHaveBeenCalled();
		});

		it('should not emit an update event if there were no params', function() {
			spyOn( this.table, '_emitChange' );
			this.table._update();

			expect( this.table._emitChange ).not.toHaveBeenCalled();
		});
	});

	describe('Emitting Events', function() {

		beforeEach(function() {
			this.table = new Table();
		});

		it('should emit a change event', function() {
			spyOn( ColumnsEvent, 'send' );
			this.table._emitChange();

			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.Table.DidChange');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].table ).toEqual( this.table );
		});

		it('should emit an upload success event', function() {
			spyOn( ColumnsEvent, 'send' );
			this.table._emitUploadSuccess();

			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.Table.DidUploadWithSuccess');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].table ).toEqual( this.table );
		});

		it('should emit an upload failure event', function() {
			spyOn( ColumnsEvent, 'send' );
			this.table._emitUploadFail();

			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.Table.DidUploadWithFailure');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].table ).toEqual( this.table );
		});

		it('should emit an update success event', function() {
			spyOn( ColumnsEvent, 'send' );
			this.table._emitUpdateSuccess();

			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.Table.DidUpdateWithSuccess');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].table ).toEqual( this.table );
		});

		it('should emit an update failure event', function() {
			spyOn( ColumnsEvent, 'send' );
			this.table._emitUpdateFail();

			expect( ColumnsEvent.send.calls.argsFor(0)[0] ).toBe('Columns.Table.DidUpdateWithFailure');
			expect( ColumnsEvent.send.calls.argsFor(0)[1].table ).toEqual( this.table );
		});
	});

	describe('Creating Items', function() {

		beforeEach(function() {
			this.table = new Table();
		})

		it('should create items from an array of column names', function() {
			var names = [ "First Name", "Last Name", "Hometown" ];
			var columns = this.table.itemsFromColumnNames( names );
			expect( columns[ 0 ].title ).toEqual("First Name");
			expect( columns[ 1 ].title ).toEqual("Last Name");
			expect( columns[ 2 ].title ).toEqual("Hometown");
		});

		it('should create an item from a single column name', function() {
			var names = "First Name";
			var columns = this.table.itemsFromColumnNames( names );
			expect( columns[ 0 ].title ).toEqual("First Name");
		});

		it('should attach default styles to the first three items', function() {
			var names = [ "First Name", "Last Name", "Hometown", "Age" ];
			var columns = this.table.itemsFromColumnNames( names );
			expect( columns[ 0 ].style.styles ).toEqual( DEFAULTS.styles[0] );
			expect( columns[ 1 ].style.styles ).toEqual( DEFAULTS.styles[1] );
			expect( columns[ 2 ].style.styles ).toEqual( DEFAULTS.styles[2] );
			expect( columns[ 3 ].style.styles ).toEqual( [] );
		});

		it('should return items if passed an array of items', function() {
			var items = [ new Item({ title: 'First Name' }), new Item({ title: 'Last Name' }), new Item({ title: 'Hometown' }), new Item({ title: 'Age' }) ];
			var columns = this.table.itemsFromColumnNames( items );
			expect( columns.length ).toBe( 4 );
			expect( columns ).toEqual([ new Item({ title: 'First Name' }), new Item({ title: 'Last Name' }), new Item({ title: 'Hometown' }), new Item({ title: 'Age' })] );
		});

		it('should return an item if passed a single item', function() {
			var item = new Item({ title: "My Item" });
			var columns = this.table.itemsFromColumnNames( item );
			expect( columns[ 0 ].title ).toEqual("My Item");
		});

		it('should throw an error if sent anything other than an array or a string', function() {
			var names = 5;
			expect(function() {
				this.table.itemsFromColumnNames( names );
			}.bind( this )).toThrow("exception: Column names must be a string or an array of strings");
		});
	});

	describe('Listening for Table Events', function() {

		beforeEach(function() {
			this.table = new Table();
		});

		it('should listen for item creation', function() {
			spyOn( this.table, 'itemsFromColumnNames' ).and.callThrough();
			var columns = [ "First Name", "Last Name", "Hometown" ];
			// var columnsEvent = document.createEvent('CustomEvent');
			// columnsEvent.initCustomEvent('Columns.UploadView.DidParseColumnNamesForFile', false, false, {
			// 	uploadView: 	new UploadView(),
			// 	fileName: 		"My File",
			// 	columns: 		columns
			// });
			// document.dispatchEvent(columnsEvent);

			ColumnsEvent.send('Columns.UploadView.DidParseColumnNamesForFile', {
				uploadView: 	new UploadView(),
				fileName: 		"My File",
				columns: 		columns
			});

			expect( this.table.itemsFromColumnNames ).toHaveBeenCalledWith( columns );
			expect( this.table.columns[ 0 ].title ).toEqual("First Name");
			expect( this.table.columns[ 1 ].title ).toEqual("Last Name");
			expect( this.table.columns[ 2 ].title ).toEqual("Hometown");
		});

		it('should listen for row creation', function() {
			this.table.columns = [ new Item({ title: 'First Name' }), new Item({ title: 'Last Name' }), new Item({ title: 'Hometown' }), new Item({ title: 'Age' }) ];
			this.table.data = [{
				'first_name': 'Jeremy',
				'last_name': 'Lubin',
				'hometown': 'Princeton'				
			}, {
				'first_name': 'Jess',
				'last_name': 'Schwartz',
				'hometown': 'Mechanicsburg'	
			}];
			var row = [ 'Amir', 'Kanpurwala', 'West Windsor' ];
			// var columnsEvent = document.createEvent('CustomEvent');
			// columnsEvent.initCustomEvent('Columns.UploadView.DidParseDataRowForFile', false, false, {
			// 	uploadView: 	this,
			// 	fileName: 		"My File",
			// 	row: 			row
			// });
			// document.dispatchEvent(columnsEvent);

			ColumnsEvent.send('Columns.UploadView.DidParseDataRowForFile', {
				uploadView: 	this,
				fileName: 		"My File",
				row: 			row
			});

			// expect( this.table.data ).toEqual([
			// 	[ 'Jeremy', 'Lubin', 'Princeton' ],
			// 	[ 'Jess', 'Schwartz', 'Mechanicsburg' ],
			// 	[ 'Amir', 'Kanpurwala', 'West Windsor' ]
			// ]);
			expect( this.table.data ).toEqual([{
				'first_name': 'Jeremy',
				'last_name': 'Lubin',
				'hometown': 'Princeton'				
			}, {
				'first_name': 'Jess',
				'last_name': 'Schwartz',
				'hometown': 'Mechanicsburg'	
			}, {
				'first_name': 'Amir',
				'last_name': 'Kanpurwala',
				'hometown': 'West Windsor'	
			}]);
		});

		it('should listen for parsing completion', function() {
			spyOn( this.table, '_uploadFile' );
			var file = { name: 'test.csv' };
			// var columnsEvent = document.createEvent('CustomEvent');
			// columnsEvent.initCustomEvent('Columns.UploadView.DidCompleteParseForFile', false, false, {
			// 	uploadView: 	this,
			// 	file: 			file
			// });
			
			ColumnsEvent.send('Columns.UploadView.DidCompleteParseForFile', {
				uploadView: 	this,
				file: 			file
			});

			expect( this.table._uploadFile ).toHaveBeenCalledWith( file );
		});

		it('should listen to layout updates', function() {
			spyOn( this.table, '_update' );
			spyOn( this.table, '_updateTable' );
				
			var layout = new Layout();

			ColumnsEvent.send('Columns.Layout.DidChange', {
				layout: 	layout
			});

			expect( this.table._update ).toHaveBeenCalledWith({ layout: layout });
			expect( this.table._updateTable ).toHaveBeenCalled();
		});

		it('should listen for updates to table meta-data', function() {
			spyOn( this.table, '_update' );
			spyOn( this.table, '_updateTable' );

			// var columnsEvent = document.createEvent('CustomEvent');
			// columnsEvent.initCustomEvent('Columns.EmbedDetailsView.DidUpdatePropertyWithValue', false, false, {
			// 	embed: 	new EmbedDetailsView(),
			// 	property: 'title',
			// 	value: 'My New Table Name'
			// });
			
			ColumnsEvent.send('Columns.EmbedDetailsView.DidUpdatePropertyWithValue', {
				embed: 	new EmbedDetailsView(),
				property: 'title',
				value: 'My New Table Name'
			});

			expect( this.table._update ).toHaveBeenCalledWith({ title: 'My New Table Name' });
			expect( this.table._updateTable ).toHaveBeenCalled();
		});

	});

	xdescribe('Uploading a File', function() {

		beforeEach(function() {
      		jasmine.Ajax.install();
      		this.table = new Table({
      			title: "My Table",
      			source: "The Noun Project",
      			source_url: "https://thenounproject.com/my-table"
      		});
    	});

	    afterEach(function() {
	    	jasmine.Ajax.uninstall();
	    });

		it('should upload a file to the api with the correct parameters', function() {
			var file = { name: 'test.csv' };

			this.table._uploadFile( file );

			expect( jasmine.Ajax.requests.mostRecent().url ).toBe( config.api.host + '/columns/table' );
		});

		it('should set a table id on success', function() {
			spyOn( this.table, '_update' );
			spyOn( this.table, '_emitUploadSuccess' );
			var data = {
				status: 'success',
				data: {
					table_id: 4
				}
			};
			this.table._onUploadSuccess( data );

			expect( this.table._update ).toHaveBeenCalledWith({ id: 4 });
			expect( this.table._emitUploadSuccess ).toHaveBeenCalled();
		});

		it('should redirect to the failure function when an error is returned from the server', function() {
			spyOn( this.table, '_update' );
			spyOn( this.table, '_onUploadFail' );
			var data = {
				status: 'fail',
				message: 'problemz'
			};
			this.table._onUploadSuccess( data, 'status', 'request' );

			expect( this.table._update ).not.toHaveBeenCalled();
			expect( this.table._onUploadFail ).toHaveBeenCalledWith( 'request', 'status', 'problemz' );
		});

		it('should notify the app on failure', function() {
			spyOn( this.table, '_emitUploadFail' );

			this.table._onUploadFail( 'request', 'status', 'problemz' );

			expect( this.table._emitUploadFail ).toHaveBeenCalled();
		});

	});

	describe('Uploading Updated Table Meta-Data', function() {

		beforeEach(function() {
      		// jasmine.Ajax.install();
      		spyOn( $, 'post' );
      		this.table = new Table({
      			title: "My Table",
      			source: "The Noun Project",
      			source_url: "https://thenounproject.com/my-table",
      			columns: [ "First Name", "Last Name", "Hometown" ],
      			id: 4
      		});
    	});

	    afterEach(function() {
	    	// jasmine.Ajax.uninstall();
	    });

		it('should upload meta-data to the api with the correct table id and data', function() {
			this.table._updateTable();

      		expect( $.post.calls.mostRecent().args[0] ).toEqual( config.api.host + '/columns/table/4' );
      		expect( $.post.calls.mostRecent().args[1] ).toEqual({
      			title: "My Table",
      			source: "The Noun Project",
      			source_url: "https://thenounproject.com/my-table",
      			layout: JSON.stringify( new Layout( this.table.columns ).model ),
      			columns: "First Name,Last Name,Hometown"
      		});
		});

		it('should notify the app on success', function() {
			spyOn( this.table, '_emitUpdateSuccess' );

			this.table._onUpdateSuccess({ status: 'success' });

			expect( this.table._emitUpdateSuccess ).toHaveBeenCalled();
		});

		it('should notify the app on failure', function() {
			spyOn( this.table, '_emitUpdateFail' );
			spyOn( this.table, '_emitUpdateSuccess' );

			this.table._onUpdateSuccess({ status: 'fail', message: 'problemz' });

			expect( this.table._emitUpdateFail ).toHaveBeenCalled();
			expect( this.table._emitUpdateSuccess ).not.toHaveBeenCalled();
		});
	});

	describe('Get Item for column name', function() {

		beforeEach(function() {
			this.table = new Table({
      			columns: [ "First Name", "Last Name", "Hometown" ],
      		});
		});

		it('should return the correct item given an unformatted name', function() {
			expect( this.table.getItemForData( 'first_name' ) ).toEqual( this.table.columns[ 0 ] );
			expect( this.table.getItemForData( 'hometown' ) ).toEqual( this.table.columns[ 2 ] );
		});

		it('should return undefined if there is no item match', function() {
			expect( this.table.getItemForData( 'hello' ) ).toBeUndefined();
		});

		it('should return undefined if there are no items', function() {
			this.table.columns = undefined;
			expect( this.table.getItemForData( 'first_name' ) ).toBeUndefined();
		});

		it('should return undefined if there is no data passed in', function() {
			expect( this.table.getItemForData() ).toBeUndefined();
		});
	});

	describe('Get String from Column Names', function() {

		beforeEach(function() {
			this.table = new Table({
				columns: [ "First Name", "Last Name", "Hometown" ]
			});
		});

		it('should return a string from column names', function() {
			var string = this.table.stringFromColumns( this.table.columns );
			expect( string ).toBe( "First Name,Last Name,Hometown" );
		});
	});
});
},{}],19:[function(require,module,exports){
xdescribe('Group Model', function() {

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
			}]
		});

		it('should initialize without any properties', function() {
			var group = new TemplateGroup();
			expect( group.layout ).toBeUndefined();
			expect( group.placeholder ).toBe( false );
		});

		it('should iniialize with a layout', function() {
			// var layout = 
			var group = new TemplateGroup({ layout: this.layout });
			expect( group.layout ).toEqual( this.layout );
			expect( group.placeholder ).toBe( false );
		});

		it('should optionally iniialize as a placeholder', function() {


		});
	});
});
},{}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]);
