/*
   --------------------------------
   Mason JS
   --------------------------------
   + https://github.com/olofbjerke/Mason
   + version 0.8
   + Copyright 2013 Olof Bjerke & Rostislav Raykov
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

		var $this				= $(this);				// To be able to address the masonry
		var images				= [];					// Array with all images
		var row					= [];					// Current row containing images
		var rowWidth			= 0;					// Used to calculate the row width
		var columnWidth			= $this.width() - 1;	// 1 is subtracted for subpixel problems
		var windowWidth			= window.innerWidth;	// Look for resizes
		var imageDenominator	= 3.5;					// Divided of
		var border				= 0;					// Border, padding and margin. Calculated in collect
		var resizeSingles		= true;					// Set to false if single image rows should not scale
		var height				= 0;					// Height of image
		var w					= 0;					// Width of image
		var rowRatio			= 0;					// Ratio of all images in a row combined

		var collect = function() {
			$this.find('img').each(function(){
				images.push($(this));
				height = Math.floor(window.innerHeight / imageDenominator);
				$(this).height(height)
					.css({display: 'block', float: 'left'})
					.data('top', $(this).position().top);
			});
			border = images[0].outerWidth(true) - images[0].width();
		};

		var resize_row = function() {
			rowWidth = 0;
			rowRatio = 0;

			// don't resize if only one image on the row
			if (row.length === 1) {
				if(resizeSingles)
				{
					row[0].width(columnWidth - border).height("auto");
				}
				return;
			}

			// Set up the current row ratio
			for(var i = 0; i < row.length; i++)
			{
				rowRatio += row[i].width() / row[i].height();
			}

			// The new height for all images in the row
			height = (columnWidth - border * row.length) / rowRatio;

			for(i = 0; i < row.length; i++)
			{
				row[i].height(height);
				w = row[i].width();		// This is done to get a int value as a width and not a float
				row[i].width(w);		// This takes a lot of time
				rowWidth += w + border;	// Counting the row width for the fix at the end
			}

			// Fix last image to get better row endings.
			if(rowWidth !== columnWidth)
			{
				w = row[(row.length - 1)].width() + ((columnWidth - rowWidth));
				row[(row.length - 1)].width(w);
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

				if (prevPosition !== position)
				{
					resize_row();

					// Reset row
					row			= [];
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
			row			= [];
			rowCounter	= 0;
			rowWidth	= 0;
			currentImg	= 0;
		};

		var resetHeight = function () {
			for(var i = 0; i < images.length; i++)
			{
				images[i].height(window.innerHeight/ imageDenominator).
					width("auto").data('top', images[i].position().top);
			}
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

					columnWidth	= $this.width() - 1;
					windowWidth = window.innerWidth;

					options.onResizeEndBeforeMasonry.call($this);
					resetHeight();
					masonry();
					options.onResizeEndAfterMasonry.call($this);
				}, 500);
			});
		});
	};
})(jQuery);
