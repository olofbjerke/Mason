# Mason
=====

Display multiple images with various proportions in rows of equal height and width.

## Calling

Calling Mason is done after all images are loaded.

```js
jQuery(window).load(function() {

	$(".masonry").mason();

});	
```

## HTML

```html
<div class="masonry">
	<img src="imagefile">
	<img src="imagefile">
	<img src="imagefile">
	<img src="imagefile">
</div>
```

### example
```js
jQuery(window).load(function() {
	$(".masonry").mason({
		onResizeStart: function() {
			$('.masonry img').stop().animate({opacity: 0}, 500);
		},
		onResizeEndAfterMasonry: function() {
			$('.masonry img').stop().animate({opacity: 1}, 500);
		}
	});
});
```