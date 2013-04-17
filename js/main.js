jQuery(document).ready(function() {
	$('.popup').hide();
});

jQuery(window).load(function() {
	console.time('mason');
	$(".masonry").mason({
		onResizeStart: function() {
			$('.masonry img').stop().animate({opacity: 0}, 500);
		},
		onResizeEndAfterMasonry: function() {
			$('.masonry img').stop().animate({opacity: 1}, 500);
		}
	});
	console.timeEnd('mason');

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