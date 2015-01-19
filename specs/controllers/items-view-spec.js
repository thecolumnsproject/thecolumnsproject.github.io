jasmine.getFixtures().fixturesPath = 'specs/fixtures';

describe('Items Contoller', function() {

	describe('Initialization', function() {

		beforeEach(function() {
			var items = [new Item({title: 'First Name'}), new Item({title: 'Last Name'}), new Item({title: 'Hometown'}), new Item({title: 'Age'})];
			Columns.Items.init(items);
		});

		it('should accept an array of items', function() {
			var items = [new Item({title: 'First Name'}), new Item({title: 'Last Name'}), new Item({title: 'Hometown'}), new Item({title: 'Age'})];
			Columns.Items.init(items);
			expect(Columns.Items.items).toEqual(items);
		});

		it ('shoud accept no items', function() {
			Columns.Items.init();
			expect(Columns.Items.items).toBeUndefined();
		});
	});

	describe('Rendering', function() {

		beforeEach(function() {
			this.items = [new Item({title: 'First Name'}), new Item({title: 'Last Name'}), new Item({title: 'Hometown'}), new Item({title: 'Age'})];
		});

		it('should contain a column for each item', function() {
			loadFixtures('columns.html');
			var $items = Columns.Items.render( this.items ).find('.layout-column');
			expect( $items.length ).toBe(4);
		});
	});
});