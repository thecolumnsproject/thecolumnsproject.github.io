jasmine.getFixtures().fixturesPath = 'specs/fixtures';

describe('Embed Details View', function() {

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
			this.embed = new EmbedDetailsView( new Table({ id: 4 }));
			this.embed.render();
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

		it('should show when the Embed button is clicked', function() {

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

	describe('Emitting Update Events', function() {

		beforeEach(function() {
			this.embed = new EmbedDetailsView( new Table({ id: 4 }));
			this.embed.render();
		});

		it('should emit an event on change', function() {
			spyOn( document, 'dispatchEvent' );
			this.embed._emitChange( 'property', 'value' );

			expect( document.dispatchEvent.calls.argsFor(0)[0].type ).toBe('Columns.EmbedDetailsView.DidUpdatePropertyWithValue');
			expect( document.dispatchEvent.calls.argsFor(0)[0].detail.embed ).toEqual( this.embed );
			expect( document.dispatchEvent.calls.argsFor(0)[0].detail.property ).toBe( 'property' );
			expect( document.dispatchEvent.calls.argsFor(0)[0].detail.value ).toBe( 'value' );
		});
	});

});