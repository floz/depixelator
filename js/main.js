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
		_ctx.fillStyle = "#ffffff";
		_ctx.fillRect( 0, 0, _canvas.width, _canvas.height );

		showImage();
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

				if( a != 0 )
					pixels.push( new Pixel( x, y, pw, ph, r, g, b, a ) );
			}
		}
		return pixels;
	}

	function showImage() {
		var delay = 0, x = 0, y = 0;
		for( var i = 0, n = _pixels.length; i < n; i++ ) {
			pixel = _pixels[ i ];
			x = pixel.x;
			y = pixel.y;

			TweenLite.set( pixel, { 
				a: 0, 
				x: x + ( Math.random() * 60 - 30 ),
				y: y + ( Math.random() * 60 - 30 )
			} );

			delay = Math.random() * .25
			TweenLite.to( pixel, .1, {
				delay: delay,
				a: .8,
				x: pixel.x + ( x - pixel.x ) * .8,
				y: pixel.y + ( y - pixel.y ) * .8,
				ease: Sine.easeIn
			})
			TweenLite.to( pixel, .25, { 
				delay: .1 + delay,
				a: 1,
				x: x,
				y: y,
				ease: Cubic.easeOut
			} );
			// delay += .01;
		}

		update();
	}

	function update() {
		_ctx.fillStyle = "#ffffff";
		_ctx.fillRect( 0, 0, _canvas.width, _canvas.height );

		var pixel = null;
		for( var i = 0, n = _pixels.length; i < n; i++ ) {
			pixel = _pixels[ i ];
			
			_ctx.beginPath();
			_ctx.fillStyle = "rgba( " + pixel.r + ", " + pixel.g + ", " + pixel.b + ", " + pixel.a + " )";
			_ctx.rect( pixel.x, pixel.y, pixel.w, pixel.h );
			_ctx.fill();
			_ctx.closePath();
		}

		requestAnimationFrame( update );
	}

	$( document ).ready( init );

})();

var Pixel = ( function Pixel() {

	function Pixel( x, y, w, h, r, g, b, a ) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a / 255;
	}
	Pixel.prototype.constructor = Pixel;

	return Pixel;

})();