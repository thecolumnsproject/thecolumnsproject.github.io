describe('Style Model', function() {

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