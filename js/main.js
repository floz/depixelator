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
		_canvas.width = 211;
		_canvas.height = 305;
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
		var delay = 0, x = 0, y = 0, dx = 0, dyFromBot = 0, dyFromMid = 0, percent = 0;
		for( var i = 0, n = _pixels.length; i < n; i++ ) {
			pixel = _pixels[ i ];
			x = pixel.x + 50;
			y = pixel.y + 100;
			dx = 105 - x;
			dyFromMid = 202 - y;
			dyFromBot = 305 - y;
			percent = dyFromBot / 305;

			TweenLite.set( pixel, { 
				a: 0
				, x: x// - dx + Math.random() * 10 - 5//x + ( Math.random() * 60 - 30 ),
				, y: y - dyFromMid * .5 + Math.random() * 10 - 5//( Math.random() * 60 - 30 )
				, scale: .75
			} );

			delay = Math.random() * .25
			TweenLite.to( pixel, .15, {
				delay: .5 * percent,
				a: .8,
				x: pixel.x + ( x - pixel.x ) * .8,
				y: pixel.y + ( y - pixel.y ) * .8,
				scale: 2.3,
				ease: Sine.easeIn
			})
			TweenLite.to( pixel, .34, { 
				delay: .15 + .5 * percent,
				a: 1,
				x: x,
				y: y,
				scale: 1,
				ease: Expo.easeOut
			} );
			// delay += .01;
		}

		update();
	}

	function update() {
		_ctx.fillStyle = "rgba( 255, 255, 255, .8 )";
		_ctx.fillRect( 0, 0, _canvas.width, _canvas.height );

		var pixel = null;
		for( var i = 0, n = _pixels.length; i < n; i++ ) {
			pixel = _pixels[ i ];
			
			// _ctx.save();
			// _ctx.scale( pixel.scale, pixel.scale );
			_ctx.beginPath();
			_ctx.fillStyle = "rgba( " + pixel.r + ", " + pixel.g + ", " + pixel.b + ", " + pixel.a + " )";
			_ctx.rect( pixel.x - pixel.w * pixel.scale * .5, pixel.y - pixel.w * pixel.scale * .5, pixel.w * pixel.scale, pixel.h * pixel.scale );
			_ctx.fill();
			_ctx.closePath();
			// _ctx.restore();
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
		this.scale = 1;
	}
	Pixel.prototype.constructor = Pixel;

	return Pixel;

})();