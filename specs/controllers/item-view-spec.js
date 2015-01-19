describe('Item View', function() {

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
	});

	describe('Rendering', function() {

		beforeEach(function() {
			var item = new Item({
				title: 'My Item',
				style: 'font-size:14px;color:#3a3a3a;margin-left:12px;'
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
	});
});