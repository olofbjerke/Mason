jQuery(document).ready(function() {
	$('.popup').hide();
});

function get_rand_color()
{
	var color = Math.floor(Math.random() * Math.pow(256, 3)).toString(16);
	while(color.length < 6)
		color = "0" + color;
	return "#" + color;
}

function masonry (className) {

	var images			= [];	// Array with all images
	var row				= [];	// Current row containing images
	var rowIndex		= 0;	// Used when iterating through the images in a row
	var current			= 0;	// Current image of all images
	var imgCounter		= 0;	// Number of images in the masonry
	var rowWidth		= 0;	// combined width of images in a row
	var step			= 1;	// how many pixels the height is changed by
	var diff			= 100;	// Images +- diff is added even if combined width is more than columnwidth 
	var border			= 50;	// Border + margin around an image
	var columnWidth		= $('.masonry').width() - 20; // Width of the column
	var windowHeight	= $(window).height(); // Height of the viewport for standard size of the images

	// This does not work in firefox by some reason
	// var border			= 0 + (parseInt($('.masonry img:first').css('border-width'), 10) +
	//	parseInt($('.masonry img:first').css('margin-left'), 10)) * 2;

	// Set the same height for every image
	$(".masonry img").height(windowHeight / 4);

	// save all images in an array
	$('.masonry img').each(function() {
		images[imgCounter++] = $(this);
	});

	// all images
	while(current < imgCounter)
	{
		//Current row width
		rowWidth += images[current].width() + border;
		row[rowIndex++] = images[current];

		// More images to go
		if((current + 1) != imgCounter)
		{
			// Can one more be added?
			if(
				(((rowWidth + images[(current + 1)].width() + border) < (columnWidth + diff)) &&
				((rowWidth + images[(current + 1)].width() + border) > (columnWidth - diff))) ||
					((rowWidth + images[(current + 1)].width() + border) < (columnWidth))
				)
			{
				current++;
				continue;
			}
		}

		// Row needs to be become smaller
		if((rowWidth > columnWidth))
		{
			// Is it wide enough?
			while(rowWidth > columnWidth)
			{
				// Width of the row images together is reset after each iteration
				rowWidth = 0;
				// The new height
				h = row[0].height() - step;
				// Go through all images in the row
				for(i = 0; i < row.length; i++)
				{
					row[i].height(h);
					rowWidth += row[i].width() + border;
				}
			}
		}
		// Row needs to be higher and wider
		else if((rowWidth < columnWidth))
		{
			// Is it wide enough?
			while(rowWidth < columnWidth)
			{
				// Width of the row images together is reset after each iteration
				rowWidth = 0;
				// The new height
				h = row[0].height() + step;
				// Go through all images in the row
				for(i = 0; i < row.length; i++)
				{
					row[i].height(h);
					rowWidth += row[i].width() + border;
				}
			}
		}

		// Reset row
		row			= [];
		rowIndex	= 0;
		rowWidth	= 0;
		// Go to next image
		current++;
	}
}

jQuery(window).load(function() {

	masonry(".masonry");

	$('.masonry a').click(function(event)
	{
		return false;
	});

	$('.masonry img').click(function()
	{
		var alt = '';
		// alert($(this).attr('alt'));
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