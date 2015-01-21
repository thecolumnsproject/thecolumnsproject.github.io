jasmine.getFixtures().fixturesPath = 'specs/fixtures';

describe('Items View', function() {

	describe('Initialization', function() {

		it('should accept an array of Items', function() {
			var items = [ new Item({ title: 'First Name' }), new Item({ title: 'Last Name' }), new Item({ title: 'Hometown' }), new Item({ title: 'Age' }) ];
			var itemsView = new ItemsView( items );
			expect( itemsView.items ).toEqual( items );
		});

		it ('shoud accept no items', function() {
			var itemsView = new ItemsView();
			expect(itemsView.items).toBeUndefined();
		});

		it('should initiatize with the correct template', function() {
			var itemsView = new ItemsView();
			expect( itemsView.template ).toEqual( Columns.Templates['templates/layout/columns.hbs'] );
		});
	});

	describe('Rendering', function() {

		beforeEach(function() {
			this.items = [ new Item({ title: 'First Name' }), new Item({ title: 'Last Name' }), new Item({ title: 'Hometown' }), new Item({ title: 'Age' }) ];
		});

		it('should contain a column for each item', function() {
			loadFixtures('columns.html');
			var itemsView = new ItemsView().render( this.items );
			expect( $('.layout-column').length ).toBe(4);
		});

		it('should remove any old items', function() {
			loadFixtures('columns.html');
			var itemsView = new ItemsView();
			itemsView.render( this.items );

			var newItems = [ new Item({ title: 'Batting Average' }), new Item({ title: 'Baseball Player' }), new Item({ title: 'Season' }), new Item({ title: 'Team' }), new Item({ title: 'Coach' }) ];
			itemsView.render( newItems );

			var $columns = $('.layout-column');
			expect( $columns.length ).toBe(5);
			expect( $columns.first() ).toContainText('Batting Average');
			expect( $columns ).not.toContainText('First Name');
		});
	});
});