/*
   --------------------------------
   Mason JS
   --------------------------------
   + https://github.com/olofbjerke/Mason
   + version 0.5
   + Copyright 2013 Olof Bjerke
   + Licensed under the MIT license
*/
(function( $ ){

	$.fn.mason = function() {

		var images			= [];	// Array with all images
		var row				= [];	// Current row containing images
		var current			= 0;	// Current image of all images
		var rowWidth		= 0;	// combined width of images in a row
		var step			= 1;	// how many pixels the height is changed by
		var diff			= 300;	// Images +- diff is added even if combined width is more than columnWidth
		var border			= 0;	// Border + margin around an image
		var columnWidth		= this.width(); // Width of the column
		var windowHeight	= $(window).height(); // Height of the viewport for standard size of the images

		// Fix the height and width of the row
		function fixate (row, targetWidth, step) {

			var height			= 0;
			var rowWidth		= 0;
			var rowWidth2		= 0;
			var rowRatio		= 0;
			var distanceLeft	= 0;
			targetWidth			-= 1; // Fix for sub pixel rendering issues
			var border			= 0 + row[0].outerWidth(true) - row[0].width();

			// Fix width if row has only one image
			if(row.length === 1)
			{
				return;
			}

			// Set up the current row ratio
			for(var i = 0; i < row.length; i++)
			{
				rowRatio += row[i].width() / row[i].height();
			}

			// The new height for all images in the row
			height = Math.floor((targetWidth - border * row.length) / rowRatio);

			for(i = 0; i < row.length; i++)
			{
				row[i].height(height);
				w = row[i].width();
				row[i].width(w);
				rowWidth += row[i].width() + border;
			}

			// Fix last image to get better row endings.
			if(rowWidth != targetWidth)
			{
				width = row[(row.length - 1)].width() + ((targetWidth - rowWidth));
				row[(row.length - 1)].width(width);
			}

		}

		// Set the same height for every image
		this.find("img").height(windowHeight / 3.2);

		// save all images in an array
		this.find("img").each(function() {
			images.push($(this));
		});

		border			= 0 + images[0].outerWidth(true) - images[0].width();
		// Go through all images and create rows
		while(current < images.length)
		{
			//Current row width
			rowWidth += images[current].width() + border;
			row.push(images[current]);

			// More images in array and one more can be added to the current row?
			if(((current + 1) !== images.length) &&
				(rowWidth + images[(current + 1)].width() + border) < (columnWidth + diff))
			{
				current++;
				continue;
			}

			// Fix the width and height of the row
			fixate(row, columnWidth, step);

			// Reset row
			row			= [];
			rowWidth	= 0;
			// Go to next image
			current++;
		}
	};
})( jQuery );