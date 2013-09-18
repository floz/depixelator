var Main = Main || ( function () {

	var _img = null,
		_canvas = null, _ctx = null, _imageData = null,
		_pixels = null;

	function init() {
		loadImage();
	}

	function loadImage() {
		_img = new Image();
		$( _img ).load( onImageLoaded );
		_img.src = "img/tree.png";
	}

	function onImageLoaded() {
		createScene();
	}

	function createScene() {
		_canvas = document.createElement( "canvas" );
		_canvas.setAttribute( "id", "tree" );
		_canvas.width = 111;
		_canvas.height = 205;
		$( "body" ).append( _canvas );

		_ctx = _canvas.getContext( "2d" );
		_ctx.drawImage( _img, 0, 0 );

		_imageData = _ctx.getImageData( 0, 0, _canvas.width, _canvas.height ).data;

		_pixels = findPixels( _imageData, _canvas.width, _canvas.height, 8, 8 );
	}

	function findPixels( data, w, h, pw, ph ) {
		var pixels = [],
			y = 0, x = 0, idx = 0,
			r = 0, g = 0, b = 0, a = 0;
		for( ; y < h; y += ph ) {
			for( x = 0; x < w; x += pw ) {
				idx = ( y * w + x ) * 4;

				r = data[ idx ];
				g = data[ idx + 1 ];
				b = data[ idx + 2 ];
				a = data[ idx + 3 ];

				console.log( x, y, "", a );
			}
		}
	}

	$( document ).ready( init );

})();