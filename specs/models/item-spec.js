describe('Item Model', function() {

	describe('Construction', function() {

		it ('should allow construction with no parameters', function() {
			var item = new Item();
			expect(item.title).toBeUndefined();
			expect(item.style).toBeUndefined();
		});

		it('should allow construction with a title and style', function() {
			var item = new Item({
				title: "My Item",
				style: 'font-size:14px;color:#3a3a3a;'
			});
			expect(item.title).toBe('My Item');
			expect(item.style.styles).toEqual([{
				property: 'font-size',
				value: '14px'
			}, {
				property: 'color',
				value: '#3a3a3a'
			}]);
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
	})
});