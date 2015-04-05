var ColumnsEvent 		= require('../../javascripts/models/ColumnsEvent.js');
var Table 				= require('../../javascripts/models/Table.js');
var ItemsView 			= require('../../javascripts/controllers/ItemsView.js');

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

			it('should update the given item on change events', function() {
				// document.dispatchEvent( this.event );
				ColumnsEvent.send( 'Columns.Item.DidChange', {
					item: 	this.item
				});
				expect( this.itemsView.updateItem ).toHaveBeenCalledWith( this.item );
			});

			it('should update the given item on active state change events', function() {
				// document.dispatchEvent( this.event );
				ColumnsEvent.send( 'Columns.Item.ActiveStateDidChange', {
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