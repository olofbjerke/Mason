<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="description" content="Display multiple images with various proportions in rows of equal height and width.">
	<meta name="viewport" content="width=device-width">
	<link rel="stylesheet" href="styles/mason.css">
	<title>Mason JS</title>
</head>
<body>
	<header>
		<section>
			<hgroup>
				<h1>Mason JS</h1>
				<h2>Display multiple images with various proportions in rows of equal height and width.</h2>
			</hgroup>
		</section>
	</header>

	<section>
		<article>
			<div class="masonry">
				<? if ($handle = opendir('img/album/thailand_2013/thumbs/')): ?>
					<? while (false !== ($entry = readdir($handle))): ?>
						<? if ($entry != "." && $entry != ".."): ?>
							<a href="img/album/thailand_2013/large/<?= $entry ?>">
								<img src="img/album/thailand_2013/thumbs/<?= $entry ?>" class="brick" alt="">
							</a>
						<? endif; ?>
					<? endwhile; ?>
					<? closedir($handle); ?>
				<? endif; ?>
				<div style="clear:both"></div>
			</div>
		</article>		
	</section>
	<div class="popup"></div>

	<footer>
		<script type="text/javascript" src="js/jquery-1.9.0.min.js"></script>
		<script type="text/javascript" src="js/jquery.mason.js"></script>
		<script type="text/javascript" src="js/main.js"></script>
	</footer>
</body>
<html>