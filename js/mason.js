/*
	Mason JS
 */
(function( $ ){

	$.fn.mason = function() {

		var images			= [];	// Array with all images
		var row				= [];	// Current row containing images
		var current			= 0;	// Current image of all images
		var rowWidth		= 0;	// combined width of images in a row
		var step			= 1;	// how many pixels the height is changed by
		var diff			= 300;	// Images +- diff is added even if combined width is more than columnWidth
		var border			= 50;	// Border + margin around an image
		var columnWidth		= this.width() - 12; // Width of the column
		var windowHeight	= $(window).height(); // Height of the viewport for standard size of the images

		// This does not work in firefox by some reason
		// var border			= 0 + (parseInt($(classNameimg:first').css('border-width'), 10) +
		//	parseInt($(classNameimg:first').css('margin-left'), 10)) * 2;


		// Fix the height and width of the row
		function fixate (row, targetWidth, step) {

			var height		= 0;
			var rowWidth	= 0;
			// This border does not work in firefox
			var border		= 0 + (parseInt(row[0].css('border-width'), 10) +
				parseInt(row[0].css('margin-left'), 10)) * 2;

			// Set up the current row width
			for(var i = 0; i < row.length; i++)
			{
				rowWidth += row[i].width() + border;
			}

			// Row needs to be become smaller
			if((rowWidth > targetWidth))
			{
				// Is it wide enough?
				while(rowWidth > targetWidth)
				{
					// Width of the row images together is reset after each iteration
					rowWidth = 0;
					// The new height
					height = row[0].height() - step;
					// Go through all images in the row
					for(i = 0; i < row.length; i++)
					{
						row[i].height(height);
						rowWidth += row[i].width() + border;
					}
				}
			}
			// Row needs to be higher and wider
			else if((rowWidth < targetWidth))
			{
				// Is it wide enough?
				while(rowWidth < targetWidth)
				{
					// Width of the row images together is reset after each iteration
					rowWidth = 0;
					// The new height
					height = row[0].height() + step;
					// Go through all images in the row
					for(i = 0; i < row.length; i++)
					{
						row[i].height(height);
						rowWidth += row[i].width() + border;
					}
				}
			}
		}

		// Set the same height for every image
		this.find("img").height(windowHeight / 3.2);

		// save all images in an array
		this.find("img").each(function() {
			images.push($(this));
		});


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

jQuery(document).ready(function() {
	$('.popup').hide();
});

jQuery(window).load(function() {

	$(".masonry").mason();

	$('.masonry a').click(function(event)
	{
		return false;
	});

	$('.masonry img').click(function()
	{
		var alt = '';
		if($(this).attr('alt') !== "")
			alt = '<div class="alttext">'+ $(this).attr('alt') +'</div>';
		$('.popup').css('height', ($(window).height() - 60));
		$('.popup').html(alt + '<img src="' + $(this).parent().attr('href') +'">');
		$('.popup').fadeIn('1500');
		$(this).addClass('active');

		$('.popup img').load(function() {

			if($('.popup img').width() > $(window).width())
			{
				$('.popup img').width( ($(window).width() - 60));
				$('.popup img').css('height', 'auto');
			}

			var b = 0 + (parseInt($('.popup img').css('border-width'), 10) * 2);

			$('.popup .alttext').width($('.popup img:first').width() - b);
			$('.popup .alttext').css('margin-left', -($('.popup img').width() / 2) );

		});

	});

	$('.popup').bind('click', function(event)
	{
		$(this).fadeOut(500);
		$('.active').removeClass('active');
	});

});