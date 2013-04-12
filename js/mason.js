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
	var images			= [];

	var image			= [];
	var row				= [];
	var ri				= 0;
	var current			= 0;
	var imgCounter		= 0;
	var rH				= 0;
	var rW				= 0;
	var step			= 1;
	var diff			= 100;
	// var border			= 0 + (parseInt($('.masonry img:first').css('border-width'), 10) +
	//	parseInt($('.masonry img:first').css('margin-left'), 10)) * 2;
	border = 50;
	var orientation		= '';
	var columnWidth		= $('.masonry').width() - 20;
	var windowHeight	= $(window).height();

	// save all images in an array
	// 
	$('.masonry img').each(function() {
		images[imgCounter++] = $(this);
	}).height(windowHeight / 3);

	// all images
	while(current < imgCounter)
	{
		//Current row width
		rW += images[current].width() + border;
		row[ri++] = images[current];

		// More images to go
		if((current + 1) != imgCounter)
		{
			// Can one more be added?
			if(
				(((rW + images[(current + 1)].width() + border) < (columnWidth + diff)) &&
				((rW + images[(current + 1)].width() + border) > (columnWidth - diff))) ||
					((rW + images[(current + 1)].width() + border) < (columnWidth))
				)
			{
				current++;
				continue;
			}
		}

		// Row border color 
		// color = get_rand_color();
		// for(i = 0; i < row.length; i++)
		// {
		// 	row[i].css("border-color", color);
		// }

		// Row needs to be become smaller
		if((rW > columnWidth))
		{
			// Is it wide enough?
			while(rW > columnWidth)
			{
				rW = 0;
				// Go through all images in the row
				for(i = 0; i < row.length; i++)
				{
					h = row[i].height() - step;
					row[i].height(h);
					rW += row[i].width() + border;
				}
			}
		}
		// Row needs to be higher and wider
		else if((rW < columnWidth))
		{
			// Is it wide enough?
			while(rW < columnWidth)
			{
				rW = 0;
				// Go through all images in the row
				for(i = 0; i < row.length; i++)
				{
					h = row[i].height() + step;
					row[i].height(h);
					rW += row[i].width() + border;
				}
			}
		}

		// Reset row
		row		= [];
		ri		= 0;
		rW		= 0;
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