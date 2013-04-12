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
	var current			= 0;	// Current image of all images
	var rowWidth		= 0;	// combined width of images in a row
	var step			= 1;	// how many pixels the height is changed by
	var diff			= 300;	// Images +- diff is added even if combined width is more than columnWidth 
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
		images.push($(this));
	});

	// Go through all images and create rows
	while(current < images.length)
	{
		//Current row width
		rowWidth += images[current].width() + border;
		row.push(images[current]);

		// More images in array and one more can be added to the current row?
		if(((current + 1) != images.length) && (rowWidth + images[(current + 1)].width() + border) < (columnWidth + diff))
		{
			current++;
			continue;
		}

		fixate(row, columnWidth, step);

		// Reset row
		row			= [];
		rowWidth	= 0;
		// Go to next image
		current++;
	}
}

function fixate (row, targetWidth, step) {
	// This border does not work in firefox
	var border		= 0 + (parseInt(row[0].css('border-width'), 10) +
		parseInt(row[0].css('margin-left'), 10)) * 2;
	var rowWidth	= 0;

	// Set up the current row width
	for(var i = 0; i < row.length; i++)
		rowWidth += row[i].width() + border;

	// Row needs to be become smaller
	if((rowWidth > targetWidth))
	{
		// Is it wide enough?
		while(rowWidth > targetWidth)
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
	else if((rowWidth < targetWidth))
	{
		// Is it wide enough?
		while(rowWidth < targetWidth)
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