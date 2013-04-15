/*
   --------------------------------
   Mason JS
   --------------------------------
   + https://github.com/olofbjerke/Mason
   + version 0.6
   + Copyright 2013 Olof Bjerke
   + Licensed under the MIT license
*/
(function($) {
	$.fn.mason = function(opts) {
	    var options = $.extend({},
	        {
	        	onResizeStart:            function() {},
	        	onResizeEnd:              function() {},
	        	onResizeEndBeforeMasonry: function() {},
	        	onResizeEndAfterMasonry:  function() {}
	        },
	        opts || {}
	    );

	    var $this           = $(this); // To be able to address the masonry
	    var images			= []; // Array with all images
		var row				= []; // Current row containing images
		var rowWidth		= 0;
		var columnWidth	    = $this.width();
		var windowWidth     = window.innerWidth;
		var windowHeight	= window.innerHeight;

		var $this = $(this);

		var collect = function() {
			$this.find('img').each(function(){
				images.push($(this));

				$(this).height(windowHeight / 3.5)
					.css({display: 'block', float: 'left'})
					.data('top', $(this).position().top);
			});
		};

		var resize_row = function() {
			// don't resize if only one image on the row
			if (row.length == 1) {
				return;
			}

			// calculate the needed resize step to fit the row width
			var remaining_width = columnWidth - rowWidth;
			// use 1px less than the column width cause sometimes the column overflows otherwise
			var step = (remaining_width - 1) / row.length;
			if (step == 0) {
				return;
			}

			// iterate over the row images and resize them
			for(i = 0; i < row.length; i++) {
				w = row[i].width() + step;
				h = row[i].height() + step;
				
				row[i].width(w);
				row[i].height(h);
			}
		};

		var masonry = function() {
			var prevPosition  = images[0].data('top');
			var position      = prevPosition;
			var totalImages   = images.length;
			var currentImg    = 0;
			var rowCounter    = 0;

			while(currentImg < totalImages) {
				position = images[currentImg].data('top');

				if (prevPosition != position)
				{
					resize_row();

					// Reset row
					row 		= [];
					rowCounter	= 0;
					rowWidth   = 0;
				}

				//Current row width
				rowWidth         += images[currentImg].outerWidth(true);
				row[rowCounter++] = images[currentImg];
				prevPosition      = position;
				
				// Go to next image
				currentImg++;
			}

			resize_row();

			row		   	= [];
			rowCounter	= 0;
			rowWidth	= 0;
			currentImg	= 0;
		};
		
		return this.each(function(){
			collect();
			masonry();

			var resizeTimer;
			$(window).resize(function(){
				options.onResizeStart.call($this);

				// don't trigger resize event unless the resize has stopped 
				// for at least half a second and the window width is different
				clearTimeout(resizeTimer);
				resizeTimer = setTimeout(function() {
					options.onResizeEnd.call($this);

					if (windowWidth == window.innerWidth)
					{
						return;
					}

					columnWidth	= $this.width();
					windowWidth = window.innerWidth;

					options.onResizeEndBeforeMasonry.call($this);
					masonry();
					options.onResizeEndAfterMasonry.call($this);
				}, 500);
			});
		});
	};
})(jQuery);
