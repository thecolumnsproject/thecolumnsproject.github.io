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