describe('Items Contoller', function() {

	describe('Initialization', function() {

		beforeEach(function() {
			var items = [new Item({title: 'First Name'}, {title: 'Last Name'}, {title: 'Hometown'}, {title: 'Age'})];
			Columns.Items.init(items);
		});

		it('should accept an array of items', function() {
			var items = [new Item({title: 'First Name'}, {title: 'Last Name'}, {title: 'Hometown'}, {title: 'Age'})];
			Columns.Items.init(items);
			expect(Columns.Items.items).toEqual(items);
		});

		it ('shoud accept no items', function() {
			Columns.Items.init();
			expect(Columns.Items.items).toBeUndefined();
		});

	});
});