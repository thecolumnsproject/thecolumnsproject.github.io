describe('Style Model', function() {

	describe('Construction', function() {

		it('should allow construction without a style object', function() {
			var style = new Style();
			expect( style.styles ).toEqual( [] );
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

	describe('Updating', function() {
		
	});
});